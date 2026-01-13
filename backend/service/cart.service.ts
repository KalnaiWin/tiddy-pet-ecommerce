import { getRedis } from "../config/redis.js";
import type { cartAddedItem } from "../interface/cart.interface.js";
import Product from "../schema/product.schema.js";

export const CartService = {
  addCart: async (data: cartAddedItem) => {
    const redis = getRedis();
    const cartKey = `cart:user:${data.userId}`;

    await redis.hIncrBy(cartKey, data.productId, data.quantity);
    await redis.expire(cartKey, 60 * 60 * 24 * 7);

    const cart = await redis.hGetAll(cartKey);

    return Object.entries(cart).map(([productId, qty]) => ({
      productId,
      quantity: Number(qty),
    }));
  },

  removeItemInCart: async (userId: string, productId: string) => {
    const redis = getRedis();
    const cartKey = `cart:user:${userId}`;

    const result = await redis.hDel(cartKey, productId);

    const cart = await redis.hGetAll(cartKey);

    return result;
  },

  getAllFromCart: async (userId: string) => {
    const redis = getRedis();
    const cartKey = `cart:user:${userId}`;

    const cart = await redis.hGetAll(cartKey);

    if (Object.keys(cart).length === 0) {
      return [];
    }

    const productIds = Object.keys(cart);

    const products = await Product.find({
      _id: { $in: productIds },
    }).lean();

    return products.map((product) => ({
      product,
      quantity: Number(cart[product._id.toString()]),
    }));
  },
};
