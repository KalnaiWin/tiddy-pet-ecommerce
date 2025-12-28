import Product from "../schema/product.schema.js";

export const productRepository = {
    findAllProducts: async (skip: number, limit: number) => {
    return Product.find({})
      .populate("category", "slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
  },
}