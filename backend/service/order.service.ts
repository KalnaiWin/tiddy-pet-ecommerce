import type {
  OrderItem,
  QueryOrderManagement,
  SourceOrderCreatedInput,
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

  getSpecificOrderForAdmin: async (customerId: string) => {
    const exsitingOrder = await Order.findById(customerId);
    if (!exsitingOrder) throw new Error("Order not found");
    const result = await OrderReposioty.findSpecificOrderForAdmin(customerId);
    return result;
  },

  createNewOrder: async (userId: string, data: SourceOrderCreatedInput) => {
    let subTotal = 0,
      totalPrice = 0;

    const userExisting = await User.findById(userId);
    if (!userExisting) throw new Error("UserId not found");

    let voucherExsiting = null;
    if (data.voucherId !== "") {
      voucherExsiting = await Voucher.findById(data.voucherId);
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
      console.log(subTotal);

      discountAmount +=
        variantExisiting.price *
        item.quantity *
        (variantExisiting.discount / 100);

      const key = item.variantId;
      console.log(discountAmount);

      await Product.updateOne(
        { _id: item.productId },
        { $inc: { sold: item.quantity } }, // sold + quantity
      );
      await Variant.updateOne(
        { _id: item.variantId },
        { $inc: { stock: -item.quantity } },
      ); // stock -= quantity

      if (variantExisiting.stock <= 0) {
        variantExisiting.status = "Out of stock";
        await variantExisiting.save();
      }

      let totalVariantAvailable = 0;

      for (const child of productExisiting.childProduct) {
        const variant = await Variant.findById(child);
        if (variant && variant.stock > 0) {
          totalVariantAvailable++;
        }
      }

      if (totalVariantAvailable === 0) {
        productExisiting.status = "Out of stock";
        await productExisiting.save();
      }

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

    let voucherAmount = voucherExsiting ? voucherExsiting.discount : 0;
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
      voucher: data.voucherId || null,
      totalPrice: totalPrice,
      subTotal: subTotal,
      payment: {
        method: "ONLINE",
        status: "PAID",
        paidAt: new Date(),
      },
      status: "CONFIRMED",
      shipping: {
        address: userExisting.address,
        phone: userExisting.phone,
      },
      predictedDayShipping: new Date(
        new Date().setMonth(new Date().getMonth() + 1),
      ),
    });

    console.log(createdOrder);

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
};
