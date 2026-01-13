export type Cart = {
  userId: string;
  item: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
};

export interface cartAddedItem {
  userId: string;
  productId: string;
  quantity: number;
}
