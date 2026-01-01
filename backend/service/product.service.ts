import { productRepository } from "./../repository/product.repository.js";
import { getRedis } from "../config/redis.js";
import {
  createProductSchema,
  getAllAdminProductSchema,
} from "../model/product.model.js";
import type { productInputInterface } from "../interface/product.interface.js";
import Product from "../schema/product.schema.js";

export const productService = {
  getAllProducts: async (page: number, limit: number, name: string) => {
    const redis = getRedis();
    const skip = (page - 1) * limit;
    const normalizedName =
      typeof name === "string" && name.trim() !== "" ? name.trim() : "ALL";

    const cacheKey = `products:${page}:${limit}:${normalizedName}`;
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const productsFromDb = await productRepository.findAllProducts(
      skip,
      limit,
      normalizedName === "ALL" ? "" : normalizedName
    );
    const parsedProducts = getAllAdminProductSchema.parse(productsFromDb);
    await redis.set(cacheKey, JSON.stringify(parsedProducts), { EX: 60 });
    return parsedProducts;
  },

  addNewProduct: async (data: productInputInterface) => {
    if (!createProductSchema.parse(data))
      throw new Error("Error input product");
    const redis = getRedis();
    if (data.minPrice && data?.minPrice > data.maxPrice)
      throw new Error("Invalid min, max price");
    else if (data.discount < 0 || data.discount > 100 || data.total < 0)
      throw new Error("Invalid number discount or total");
    data.childProduct.forEach((item) => {
      if (
        (data.minPrice && item.price < data?.minPrice) ||
        item.price > data.maxPrice
      ) {
        throw new Error("Invalid price of child product");
      }
    });
    const brandId = await productRepository.findOrCreateBrand(data.brand);
    const categoryIds = await productRepository.findOrCreateCategory(
      data.category
    );

    const product = await Product.create({
      ...data,
      brand: brandId,
      category: categoryIds,
    });

    await product.save();
    const keys = await redis.keys("products:page=*");
    if (keys.length > 0) {
      await redis.del(keys);
    }
    return product;
  },

  editOldProduct: async (productId: string, data: productInputInterface) => {
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) throw new Error("This product is not found");

    const parsed = createProductSchema.parse(data);
    const updatedProduct = await Product.findByIdAndUpdate(productId, parsed, {
      new: true,
      runValidators: true,
    });

    return updatedProduct;
  },

  deleteOldProduct: async (productId: string) => {
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) throw new Error("This product is not found");
    existingProduct.deleteOne();
    return 1;
  },
};
