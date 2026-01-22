import { productRepository } from "./../repository/product.repository.js";
import { getRedis } from "../config/redis.js";
import {
  createProductSchema,
  getAllAdminProductSchema,
  getSpecificProduct,
} from "../model/product.model.js";
import type { productInputInterface } from "../interface/product.interface.js";
import Product from "../schema/product.schema.js";
import Variant from "../schema/variant.schema.js";
import Brand from "../schema/brand.schema.js";
import Category from "../schema/category.schema.js";

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
      normalizedName === "ALL" ? "" : normalizedName,
    );
    const parsedProducts = getAllAdminProductSchema.parse(productsFromDb);
    await redis.set(cacheKey, JSON.stringify(parsedProducts), { EX: 60 });
    return parsedProducts;
  },

  getProductDetail: async (productId: string) => {
    const product = await productRepository.findSpecificProductById(productId);
    if (!product) throw new Error("Product is not found");
    return product;
  },

  findAllCategoriesName: async () => {
    const arrayCategoryName =
      await productRepository.findAlNamelCategoryExist();
    return arrayCategoryName;
  },

  findAllBrandsName: async () => {
    const arrayBrandName = await productRepository.findAllNameBrandExist();
    return arrayBrandName;
  },

  addNewProduct: async (data: productInputInterface) => {
    if (!createProductSchema.parse(data))
      throw new Error("Error input product");
    const redis = getRedis();
    let maxDiscount = 0;
    let total = 0;
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
      total += item.stock;
      maxDiscount = Math.max(maxDiscount, item.discount);
    });
    const brandId = await productRepository.findOrCreateBrand(data.brand);
    const categoryIds = await productRepository.findOrCreateCategory(
      data.category,
    );

    if (total !== data.total)
      throw new Error("Sum total of child should be equal to product stock");
    else if (maxDiscount > data.discount)
      throw new Error(
        "Max discount of child should be less than product discount",
      );

    const product = await Product.create({
      name: data.name,
      description: data.description,
      total: data.total,
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
      imageProduct: data.imageProduct,
      brand: brandId,
      category: categoryIds,
      discount: data.discount,
      status: data.status,
    });

    const variants = await Variant.insertMany(
      data.childProduct.map((item) => ({
        productId: product._id,
        name: item.name,
        price: item.price,
        image: item.image,
        stock: item.stock,
        status: item.status,
        discount: item.discount,
      })),
    );

    product.childProduct = variants.map((v) => v._id);

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
    const products = await Product.findById(productId);
    if (!products) throw new Error("Product not found");

    // Delete variant
    for (const variant of products?.childProduct) {
      await Variant.findByIdAndDelete(variant._id);
    }

    await Product.findByIdAndDelete(productId);

    // Deleye brand
    const countBrand = await Product.countDocuments({
      brand: products.brand._id,
    });
    if (countBrand <= 0) await Brand.findByIdAndDelete(products.brand._id);

    // Deleye category
    for (const cate of products.category) {
      const countCategory = await Product.countDocuments({
        category: cate._id,
      });
      if (countCategory <= 0) await Category.findByIdAndDelete(cate._id);
    }
    return true;
  },
};
