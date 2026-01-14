import type { Request, Response } from "express";
import { createProductSchema } from "../model/product.model.js";
import { ZodError } from "zod";
import { productService } from "../service/product.service.js";

export const getAllProducts = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const name = String(req.query.name) || "";
  try {
    if (page < 1 || limit < 1) {
      return res.status(400).json({
        message: "Incorrect page or limit number",
      });
    }
    const products = await productService.getAllProducts(page, limit, name);
    res.status(200).json(products);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        errors: error.message,
      });
    }

    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const allCategory = await productService.findAllCategoriesName();
    return res.status(200).json(allCategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllBrands = async (req: Request, res: Response) => {
  try {
    const allBrand = await productService.findAllBrandsName();
    return res.status(200).json(allBrand);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(404).json({ message: "Id not found" });
    const product = await productService.getProductDetail(id);
    // const response =
    return res.status(200).json(product);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ message: "Error from client" });
    } else {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const addNewProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.addNewProduct(req.body);
    const response = createProductSchema.parse(product);

    return res.status(201).json(product);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        errors: error.message,
      });
    }

    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const EditProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(404).json({ message: "Id not found" });

    const editedProduct = await productService.editOldProduct(id, req.body);

    const response = createProductSchema.parse(editedProduct);

    return res.status(201).json(response);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        errors: error.message,
      });
    }
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};

export const DeleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id) return res.status(404).json({ message: "Id not found" });
    const result = await productService.deleteOldProduct(id);
    if (result)
      return res.status(200).json({ message: "Deleted product successfully" });
    else return res.status(400).json({ message: "Deleted product failed" });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        errors: error.message,
      });
    }
    return res.status(500).json({
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
};
