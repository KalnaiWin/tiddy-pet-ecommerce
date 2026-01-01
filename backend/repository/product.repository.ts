import type mongoose from "mongoose";
import type { tagInput } from "../interface/product.interface.js";
import Brand from "../schema/brand.schema.js";
import Product from "../schema/product.schema.js";
import Category from "../schema/category.schema.js";

export const productRepository = {
  findAllProducts: async (skip: number, limit: number, name: string) => {
    const filter: Record<string, any> = {};

    if (name?.trim()) {
      filter.name = { $regex: name.trim(), $options: "i" };
    }

    return Product.find(filter)
      .populate("category", "slug name")
      .populate("brand", "slug name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
  },

  findOrCreateBrand: async (brand: tagInput) => {
    const existingBrand = await Brand.findOne({ slug: brand.slug });

    if (existingBrand) return existingBrand._id;

    const created = await Brand.create(brand);
    return created._id;
  },

  findOrCreateCategory: async (categories: tagInput[]) => {
    const ids: mongoose.Types.ObjectId[] = [];

    for (const category of categories) {
      const existing = await Category.findOne({ slug: category.slug });

      if (existing) {
        ids.push(existing._id);
      } else {
        const created = await Category.create(category);
        ids.push(created._id);
      }
    }

    return ids;
  },
};
