import z from "zod";

export const authRegisterForm = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().min(6),
  role: z.enum(["ADMIN", "CUSTOMER", "SHIPPER"]),
});

