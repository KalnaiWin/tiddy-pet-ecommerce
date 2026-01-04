import { ca } from "zod/locales";
import type mongoose from "mongoose";
import type { tagInput } from "../interface/product.interface.js";
import Brand from "../schema/brand.schema.js";
import Product from "../schema/product.schema.js";
import Category from "../schema/category.schema.js";
import { _discriminatedUnion } from "zod/v4/core";

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

  findAlNamelCategoryExist: async () => {
    const products = await Product.find();
    const categoryMap = new Map<string, string>();

    for (const product of products) {
      for (const cateId of product.category) {
        const id = cateId.toString();

        if (!categoryMap.has(id)) {
          const category = await Category.findById(cateId);
          if (category) {
            categoryMap.set(category._id.toString(), category.name);
          }
        }
      }
    }

    return Array.from(categoryMap, ([_id, name]) => ({ _id, name }));
  },

  findAllNameBrandExist: async () => {
    const products = await Product.find();
    const brandMap = new Map<string, string>();

    for (const product of products) {
      const brandId = product.brand.toString();

      if (!brandMap.has(brandId)) {
        const brand = await Brand.findById(brandId);
        if (brand) {
          brandMap.set(brand._id.toString(), brand.name);
        }
      }
    }
    return Array.from(brandMap, ([_id, name]) => ({
      _id,
      name,
    }));
  },
};
