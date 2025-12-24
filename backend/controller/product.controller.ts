import type { Request, Response } from "express";
import Product from "../model/Product.js";
import {
  createProductSchema,
  getAllAdminProductSchema,
} from "../schema/product.schema.js";
import { ZodError } from "zod";

export const getAllProducts = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  try {
    if (page < 1 || limit < 1)
      return res
        .status(400)
        .json({ message: "\nIncorrect page and limit number\n" });

    const skip = (page - 1) * limit;

    const allProducts = await Product.find({})
      .populate("category", "slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const products = getAllAdminProductSchema.parse(allProducts);

    res.status(200).json(products);
  } catch (error) {
    console.log("\nError at get all products: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllProductsByCategory = async (
  req: Request,
  res: Response
) => {};

export const getAllProductsByBrand = async (req: Request, res: Response) => {};

export const addNewProduct = async (req: Request, res: Response) => {
  try {
    const parsed = createProductSchema.parse(req.body);

    const product = new Product(parsed);
    const savedProduct = await product.save();

    return res.status(201).json(savedProduct);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const EditProduct = async (req: Request, res: Response) => {};

export const DeleteProduct = async (req: Request, res: Response) => {};
