import type Stripe from "stripe";
import type { CheckOutInput } from "../interface/order.interface.js";
import { ENV } from "../config/env.js";
import { stripe } from "../config/stripe.js";
import { getRedis } from "../config/redis.js";
import Order from "../schema/order.schema.js";
import { productRepository } from "../repository/product.repository.js";
import Variant from "../schema/variant.schema.js";
import Product from "../schema/product.schema.js";
import User from "../schema/user.schema.js";

export const PaymentService = {
  checkoutOrder: async (data: CheckOutInput, orderId: string) => {
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
      shipping_address_collection: {
        allowed_countries: ["VN"],
      },
      phone_number_collection: {
        enabled: true,
      },
      line_items: lineItems,
      // success_url: `${ENV.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      success_url: `${ENV.CLIENT_URL}/success`,
      cancel_url: `${ENV.CLIENT_URL}/cancel`,
      metadata: {
        orderId: orderId,
        userId: data.userId,
      },
    });

    const exsitingOrder = await Order.findById(orderId);
    if (!exsitingOrder) throw new Error("Order not found");

    for (const item of exsitingOrder.items) {
      const productExisiting = await productRepository.findSpecificProductById(
        String(item.productId._id),
      );
      if (!productExisiting) throw new Error("ProductId not found");
      else if (productExisiting.status === "Out of stock") continue;
      const variantExisiting = await Variant.findById(item.variantId);
      if (!variantExisiting) throw new Error("VariantId not found");
      else if (variantExisiting.stock < Number(item.quantity))
        throw new Error("Not enough variant");

      await Product.updateOne(
        { _id: item.productId },
        { $inc: { sold: item.quantity } }, // sold + quantity
      );
      const updatedVariant = await Variant.findOneAndUpdate(
        {
          _id: variantExisiting._id,
        },
        {
          $inc: { stock: -Number(item.quantity) },
        },
        { new: true },
      );

      if (!updatedVariant) {
        throw new Error("Not enough stock");
      }

      if (variantExisiting.stock === 0) {
        await Variant.updateOne(
          { _id: item.variantId },
          { $set: { status: "Out of stock" } },
        );
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
    }

    await Order.findByIdAndUpdate(exsitingOrder._id, {
      status: "CONFIRMED",
      payment: {
        method: "ONLINE",
        status: "PAID",
        paidAt: new Date(),
      },
    });
    await User.findOneAndUpdate(
      {
        _id: exsitingOrder.user._id,
      },
      {
        $inc: {
          totalSpend: Number(exsitingOrder.totalPrice),
        },
      },
    );
    await exsitingOrder.save();
    return session.url;
  },

  verifySuccessfulPayment: async (sessionId: string) => {
    if (!sessionId) throw new Error("Invalid session_id");

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
      limit: 100,
    });
    if (session.payment_status !== "paid") throw new Error("Payment failed");

    const orderHistory = {
      sessionId: session.id,
      amountTotal: session.amount_total,
      currency: session.currency,
      paymentStatus: session.payment_status,

      customer: {
        email: session.customer_details?.email,
        phone: session.customer_details?.phone,
        address: session.customer_details?.address,
      },

      items: lineItems.data.map((item) => ({
        name: item.description,
        quantity: item.quantity,
        unitAmount: item.price?.unit_amount,
        total: item.amount_total,
      })),

      createdAt: new Date(session.created * 1000),
    };

    return orderHistory;
  },
};
