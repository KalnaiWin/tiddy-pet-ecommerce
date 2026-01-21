import { z } from "zod";

export const ItemOrderSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().min(1),
  quantity: z.number().int().min(1),
});

export const CreateOrderInputSchema = z.object({
  items: z.array(ItemOrderSchema).min(1),
  shippingFee: z.number(),
  voucherId: z.string(),
});

export type CreateOrderInput = z.infer<typeof CreateOrderInputSchema>;
