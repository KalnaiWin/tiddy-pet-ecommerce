import { getRedis } from "../config/redis.js";
import type {
  cartAddedItem,
  VariantWithProduct,
} from "../interface/cart.interface.js";
import Product from "../schema/product.schema.js";
import Variant from "../schema/variant.schema.js";

export const CartService = {
  addCart: async (data: cartAddedItem) => {
    const redis = getRedis();
    const cartKey = `cart:user:${data.userId}`;

    await redis.hIncrBy(cartKey, data.variantId, data.quantity);
    await redis.expire(cartKey, 60 * 60 * 24 * 7);

    const cart = await redis.hGetAll(cartKey);

    return Object.entries(cart).map(([variantId, qty]) => ({
      variantId,
      quantity: Number(qty),
    }));
  },

  removeItemInCart: async (userId: string, variantId: string) => {
    const redis = getRedis();
    const cartKey = `cart:user:${userId}`;

    const cart = await redis.hGetAll(cartKey);

    const result = await redis.hDel(cartKey, variantId);

    return result;
  },

  getAllFromCart: async (userId: string) => {
    const redis = getRedis();
    const cartKey = `cart:user:${userId}`;

    const cart = await redis.hGetAll(cartKey);

    if (Object.keys(cart).length === 0) {
      return [];
    }

    const variantIds = Object.keys(cart);

    const variants = await Variant.find({
      _id: { $in: variantIds },
    })
      .populate({
        path: "productId",
        select: "discount brand category",
        populate: [
          { path: "brand", select: "name slug isActive" },
          { path: "category", select: "name slug isActive" },
        ],
      })
      .lean<VariantWithProduct[]>();

    return variants.map((variant) => ({
      productId: variant.productId._id,
      productDiscount: variant.productId.discount,
      variantId: variant._id,
      variantName: variant.name,
      price: variant.price,
      image: variant.image,
      brand: variant.productId.brand,
      category: variant.productId.category,
      quantity: Number(cart[variant._id.toString()]),
    }));
  },
};

// error: get all products from cart
