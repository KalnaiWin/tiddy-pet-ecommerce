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
    await product.save();

    return res.status(201).json({ productId: product.id, parsed });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const EditProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const existingProduct = await Product.findById(id);
    if (!existingProduct)
      return res.status(400).json({ message: "This product is not found" });

    const parsed = createProductSchema.parse(req.body);

    const updatedProduct = await Product.findByIdAndUpdate(id, parsed, {
      new: true,
      runValidators: true,
    });

    return res
      .status(200)
      .json({ productId: existingProduct.id, updatedProduct });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.message });
    }
    console.error("Error editing product:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const DeleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const existingProduct = await Product.findByIdAndDelete(id);
    if (!existingProduct)
      return res.status(400).json({ message: "This product is not found" });

    return res.status(200).json({ message: "Deleted product successfully" });
  } catch (error) {
    console.error("Error editing product:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
