export interface InAdminProductResponse {
  name: string;
  imageProduct: string[];
  total: string;
  sold: number;
  rating: number;
  minPrice: number;
  maxPrice: number;
  brand: string;
  discount: number;
  status: string;
}

export interface InNewProductResponse {
  name: string;
  description: string;
  total: number;
  minPrice: number;
  maxPrice: number;
  brand: string;
  status: string;
  discount: number;
}
