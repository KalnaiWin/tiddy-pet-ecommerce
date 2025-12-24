import mongoose from "mongoose";
import "./Category.js";
import type {
  InAdminProductResponse,
  InNewProductResponse,
} from "../interface/product.interface.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
      max: 1000,
      default: 0,
    },
    sold: {
      type: Number,
      min: 0,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    minPrice: {
      type: Number,
      min: 0,
    },
    maxPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    imageProduct: [
      {
        type: String,
        required: true,
      },
    ],

    childProduct: [
      {
        name: {
          type: String,
          required: true,
          maxlength: 100,
        },
        price: {
          type: Number,
          min: 0,
        },
        image: {
          type: String,
          required: true,
        },
        stock: {
          type: Number,
          min: 0,
        },
      },
    ],
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    brand: {
      type: String,
      trim: true,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Available", "Out of stock", "Draft"],
      default: "Draft",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;

export const toAdminProduct = (product: any): InAdminProductResponse => {
  return {
    name: product.name,
    imageProduct: product.imageProduct,
    total: product.total,
    sold: product.sold,
    rating: product.rating,
    minPrice: product.minPrice,
    maxPrice: product.maxPrice,
    brand: product.brand,
    discount: product.discount,
    status: product.status,
  };
};

export const toNewProduct = (product: any): InNewProductResponse => {
  return {
    name: product.name,
    description: product.description,
    total: product.total,
    minPrice: product.minPrice,
    maxPrice: product.maxPrice,
    brand: product.brand,
    status: product.status,
    discount: product.discount,
  };
};
