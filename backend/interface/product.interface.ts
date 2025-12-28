export interface childProductInput {
  name: string;
  price: number;
  image: string;
  stock: number;
}

export interface productInputInterface {
  name: string;
  description: string;
  total: number;
  minPrice?: number;
  maxPrice: number;
  imageProduct: string[];
  childProduct: childProductInput[];
  category: string[];
  brand: string;
  discount: number;
  status?: "Available" | "Out of stock" | "Draft";
}