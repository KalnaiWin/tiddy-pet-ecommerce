import mongoose from "mongoose";
import { z } from "zod";

const objectId = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
  });

export const childProduct = z.array(
  z.object({
    name: z.string().max(100),
    price: z.number().min(0),
    image: z.string().url(),
    stock: z.number().min(0),
  })
);

export const tagSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  isActive: z.boolean().default(true),
});

export const createProductSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().min(1),
  total: z.number().min(0).max(1000),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0),
  imageProduct: z.array(z.string().url()).min(1),
  childProduct: childProduct,
  discount: z.number().min(0).max(100).optional(),
  status: z.enum(["Available", "Out of stock", "Draft"]),
});

export const getAllAdminProductSchema = z.array(
  z.object({
    _id: z.unknown(),
    name: z.string().min(2).max(200),
    imageProduct: z.array(z.string()),
    total: z.number().min(0).max(1000),
    sold: z.number().min(0),
    rating: z.number().min(0).max(5),
    minPrice: z.number().min(0),
    maxPrice: z.number().min(0),
    category: z.array(tagSchema).min(1),
    brand: tagSchema,
    discount: z.number().min(0),
    status: z.enum(["Available", "Out of stock", "Draft"]),
  })
);

export type GetAllAdminProductSchema = z.infer<typeof getAllAdminProductSchema>;
