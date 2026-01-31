import { getRedis } from "../config/redis.js";
import {
  ORDER_STATUSES,
  type OrderItem,
  type OrderStatus,
  type QueryOrderManagement,
  type SourceOrderCreatedInput,
} from "../interface/order.interface.js";
import { OrderReposioty } from "../repository/order.repository.js";
import { productRepository } from "../repository/product.repository.js";
import Order from "../schema/order.schema.js";
import Product from "../schema/product.schema.js";
import User from "../schema/user.schema.js";
import Variant from "../schema/variant.schema.js";
import Voucher from "../schema/voucher.schema.js";

export const OrderService = {
  getAllOrdersForRole: async (userId: string, query: QueryOrderManagement) => {
    const existingUser = await User.findById(userId);
    if (!existingUser) throw new Error("User not found");
    if (existingUser.role === "ADMIN") {
      return await OrderReposioty.filterAllOrderForAdmin(query);
    } else if (existingUser.role === "CUSTOMER") {
      return await OrderReposioty.filterAllOrdersForCustomer(query, userId);
    }
  },

  getSpecificOrderForAdmin: async (orderId: string) => {
    const exsitingOrder = await Order.findById(orderId);
    if (!exsitingOrder) throw new Error("Order not found");
    const result = await OrderReposioty.findSpecificOrderForAdmin(orderId);
    return result;
  },

  createNewOrder: async (userId: string, data: SourceOrderCreatedInput) => {
    let subTotal = 0,
      totalPrice = 0;

    const userExisting = await User.findById(userId);
    if (!userExisting) throw new Error("UserId not found");

    let voucherExsiting = null;
    if (data.voucherId !== "") {
      voucherExsiting = await Voucher.findOne({ code: data.voucherId });
      if (!voucherExsiting) throw new Error("VoucherId not found");
    }

    const itemMap = new Map<string, OrderItem>();
    let discountAmount = 0;
    for (const item of data.items) {
      const productExisiting = await productRepository.findSpecificProductById(
        item.productId,
      );
      if (!productExisiting) throw new Error("ProductId not found");
      else if (productExisiting.status === "Out of stock") continue;

      const variantExisiting = await Variant.findById(item.variantId);
      if (!variantExisiting) throw new Error("VariantId not found");
      else if (variantExisiting.stock < item.quantity)
        throw new Error("Not enough variant");

      subTotal += variantExisiting.price * item.quantity;

      discountAmount +=
        variantExisiting.price *
        item.quantity *
        (variantExisiting.discount / 100);

      const key = item.variantId;

      if (itemMap.has(key)) {
        itemMap.get(key)!.quantity += item.quantity;
      } else {
        itemMap.set(key, {
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          price: variantExisiting.price,
        });
      }
    }

    let voucherAmount = voucherExsiting
      ? subTotal * (voucherExsiting.discount / 100)
      : 0;
    totalPrice = subTotal - discountAmount - voucherAmount + data.shippingFee;

    await User.updateOne({ _id: userId }, { $inc: { totalSpend: totalPrice } });

    const items = Array.from(itemMap.values());
    const createdOrder = await Order.create({
      user: userId,
      items: items,
      otherPrice: {
        discount: discountAmount,
        shippingFee: data.shippingFee,
      },
      voucher: voucherExsiting ? voucherExsiting._id : null,
      totalPrice: totalPrice,
      subTotal: subTotal,
      payment: {
        method: "COD",
        status: "UNPAID",
        paidAt: new Date(),
      },
      status: "PENDING",
      shipping: {
        address: userExisting.address,
        phone: userExisting.phone,
      },
      predictedDayShipping: new Date(
        new Date().setMonth(new Date().getMonth() + 1),
      ),
    });

    const redis = getRedis();
    await redis.del(`cart:user:${userId}`);

    return createdOrder;
  },

  selectShipper: async (orderId: string, shipperId: string) => {
    const exsitingShipper = await User.findById(shipperId);
    if (!exsitingShipper) throw new Error("Shipper not found");
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        $set: {
          "shipping.shipper": exsitingShipper._id,
          "shipping.assignedAt": new Date(),
          status: "ASSIGNED",
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return updatedOrder;
  },

  dropShipperSelected: async (orderId: string) => {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        $set: {
          "shipping.shipper": null,
          "shipping.assignedAt": new Date(),
          status: "CONFIRMED",
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return updatedOrder;
  },

  cancelOrder: async (orderId: string, reason: string, userId: string) => {
    const existingUser = await User.findById(userId);
    if (!existingUser) throw new Error("User not found");
    const existingOrder = await Order.findById(orderId);
    if (!existingOrder) throw new Error("Order not found");
    if (
      existingOrder.status === "SHIPPING" ||
      existingOrder.status === "DELIVERED"
    )
      throw new Error("Can not cancel this order");

    for (const item of existingOrder.items) {
      const productExisiting = await productRepository.findSpecificProductById(
        String(item.productId._id),
      );
      if (!productExisiting) throw new Error("ProductId not found");
      const variantExisiting = await Variant.findById(item.variantId);
      if (!variantExisiting) throw new Error("VariantId not found");
      await Product.updateOne(
        { _id: item.productId },
        { $inc: { sold: -Number(item.quantity) } },
      );
      await Variant.findOneAndUpdate(
        {
          _id: variantExisiting._id,
        },
        {
          $inc: { stock: Number(item.quantity) },
        },
        { new: true },
      );

      if (variantExisiting.stock > 0) {
        await Variant.updateOne(
          { _id: item.variantId },
          { $set: { status: "Available" } },
        );
      }
      let totalVariantAvailable = 0;

      for (const child of productExisiting.childProduct) {
        const variant = await Variant.findById(child);
        if (variant && variant.stock < 0) {
          totalVariantAvailable++;
        }
      }

      if (totalVariantAvailable === 0) {
        productExisiting.status = "Available";
        await productExisiting.save();
      }
    }

    const order = await Order.findByIdAndUpdate(orderId, {
      status: "CANCELLED",
      payment: {
        status:
          existingOrder.payment?.status === "PAID" ? "REFUNDED" : "UNPAID",
      },
      cancel: {
        reason: reason,
        cancellBy: existingUser.name,
        cancelledAt: new Date(),
      },
    });

    await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $inc: {
          totalSpend: -Number(existingOrder.totalPrice),
        },
      },
    );

    if (!order) throw new Error("Update failed");
    await order.save();

    return order;
  },

  getOrderForShipper: async (
    shipperId: string,
    page: number,
    status: string,
  ) => {
    const existingShipper = await User.findById(shipperId).select("_id role");
    if (!existingShipper || existingShipper.role !== "SHIPPER")
      throw new Error("Shipper not found");
    const result = await OrderReposioty.findOrderForShipper(
      String(existingShipper._id),
      page,
      status,
    );
    return result;
  },

  changeStatusOrder: async (
    userId: string,
    orderId: string,
    status: string,
  ) => {
    const existingUser = await User.findById(userId).select("_id role");
    if (!existingUser || existingUser.role === "CUSTOMER")
      throw new Error("User not found");
    if (!ORDER_STATUSES.includes(status as OrderStatus))
      throw new Error("Invalid Status");
    return await OrderReposioty.changeStatusOrder(orderId, status);
  },
};
