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

export interface GetCategoryAndBrand {
  _id: string;
  name: string;
}

export interface ProductInfo {
  _id: string;
  name: string;
  description: string;
  total: number;
  sold: number;
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
  categories: GetCategoryAndBrand[] | null;
  categoriesStatus: "idle" | "loading" | "succeeded" | "failed";
  brands: GetCategoryAndBrand[] | null;
  brandsStatus: "idle" | "loading" | "succeeded" | "failed";
  creatingStatus: "idle" | "loading" | "succeeded" | "failed";
  deletingStaus: "idle" | "loading" | "succeeded" | "failed";
  detail: ProductInfo | null;
  detailStatus: "idle" | "loading" | "succeeded" | "failed";
}

export interface CreateProductPayload {
  name: string;
  status: string;
  description: string;
  imageProduct: string[];
  minPrice: number;
  maxPrice: number;
  total: number;
  discount: number;
  childProduct: {
    name: string;
    price: number;
    image: string;
    stock: number;
  }[];
  category: {
    name: string;
    slug: string;
    isActive: boolean;
  }[];
  brand: {
    name: string;
    slug: string;
    isActive: boolean;
  };
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
