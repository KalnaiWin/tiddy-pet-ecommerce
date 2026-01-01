export interface childProductInput {
  name: string;
  price: number;
  image: string;
  stock: number;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
}

export interface ProductInfo {
  _id: string;
  name: string;
  description: string;
  total: number;
  sold: number,
  minPrice?: number;
  maxPrice: number;
  imageProduct: string[];
  childProduct: childProductInput[];
  category: Category[];
  brand: Brand;
  discount: number;
  status?: "Available" | "Out of stock" | "Draft";
}

export interface ProductState {
  products: ProductInfo[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const SocialNetwork = [
  {
    name: "Facebook",
    link: "http://localhost:5173",
  },
  {
    name: "Zalo",
    link: "http://localhost:5173",
  },
];
