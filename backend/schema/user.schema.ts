import { z } from "zod";

export const userAuthResponse = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.string(),
});

export type UserAuthResponse = z.infer<typeof userAuthResponse>;
