import type Stripe from "stripe";
import type {
  CheckOutInput,
  OrderItem,
  QueryOrderManagement,
  SourceOrderCreatedInput,
} from "../interface/order.interface.js";
import { OrderReposioty } from "../repository/order.repository.js";
import Order from "../schema/order.schema.js";
import Product from "../schema/product.schema.js";
import User from "../schema/user.schema.js";
import Variant from "../schema/variant.schema.js";
import Voucher from "../schema/voucher.schema.js";
import { string } from "zod";
import { stripe } from "../config/stripe.js";
import { ENV } from "../config/env.js";

export const OrderService = {
  getAllOrders: async (userId: string, query: QueryOrderManagement) => {
    const existingUser = await User.findById(userId);
    if (!existingUser || existingUser.role !== "ADMIN")
      throw new Error("Admin not found");
    const orders = await OrderReposioty.filterAllOrderFromAdmin(query);
    return orders;
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

    for (const item of data.items) {
      const productExisiting = await Product.findById(item.productId);
      if (!productExisiting) throw new Error("ProductId not found");

      const variantExisiting = await Variant.findById(item.variantId);
      if (!variantExisiting) throw new Error("VariantId not found");
      else if (variantExisiting.stock < item.quantity)
        throw new Error("Not enough variant");

      subTotal += variantExisiting.price * item.quantity;
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

    let discountAmount = subTotal * (data.discount / 100);
    let voucherAmount = voucherExsiting ? voucherExsiting.discount : 0;

    totalPrice = subTotal - discountAmount - voucherAmount + data.shippingFee;

    const items = Array.from(itemMap.values());
    const createdOrder = await Order.create({
      user: userId,
      items: items,
      otherPrice: {
        discount: data.discount,
        shippingFee: data.shippingFee,
      },
      voucher: data.voucherId || null,
      totalPrice: totalPrice,
      subTotal: subTotal,
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

  checkoutOrder: async (data: CheckOutInput) => {
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
      data.items.map((item) => ({
        price_data: {
          currency: "vnd",
          product_data: {
            name: item.name,
            images: item.image.length ? [String(item.image[0])] : [],
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${ENV.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${ENV.CLIENT_URL}/cancel`,
      metadata: {
        userId: data.userId,
      },
    });
    console.log(lineItems);
    return session.url;
  },
};
