import { z } from "zod";

export const InputVoucher = z.object({
  code: z.string().min(6).max(20),
  discount: z.number().min(1).max(99),
  validDay: z.object({
    dateFrom: z.coerce.date(),
    dateTo: z.coerce.date(),
  }),
});
