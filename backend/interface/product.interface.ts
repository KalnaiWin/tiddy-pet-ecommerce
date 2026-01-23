export interface childProductInput {
  name: string;
  price: number;
  image: string;
  stock: number;
  status: string;
  discount: number;
}

export interface tagInput {
  name: string;
  slug: string;
  isActive: boolean;
}

export interface productInputInterface {
  name: string;
  description: string;
  total: number;
  minPrice: number;
  maxPrice: number;
  imageProduct: string[];
  childProduct: childProductInput[];
  category: tagInput[];
  brand: tagInput;
  discount: number;
  status: "Available" | "Out of stock" | "Draft";
}

import { Types } from "mongoose";

export interface ProductUpdateDB {
  name: string;
  description: string;
  total: number;
  minPrice: number;
  maxPrice: number;
  imageProduct: string[];
  childProduct: Types.ObjectId[]; 
  category: Types.ObjectId[];
  brand: Types.ObjectId;
  discount: number;
  status: "Available" | "Out of stock" | "Draft";
}
