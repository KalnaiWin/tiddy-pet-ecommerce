import { date, z } from "zod";

export const userAuthResponse = z.object({
  _id: z.unknown(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
});

export const listUserInfoResponse = z.array(
  z.object({
    _id: z.unknown(),
    name: z.string(),
    email: z.string(),
    role: z.string(),
    totalSpend: z.number(),
    phone: z.string(),
    address: z.string(),
    image_profile: z.string(),
    status: z.enum(["INACTIVE", "ACTIVE", "BANNED", "BUSY"]),
    createdAt: z.date(),
  })
);

export const lisShipperInfo = z.array(
  z.object({
    _id: z.unknown(),
    name: z.string(),
    email: z.string(),
    role: z.string(),
    phone: z.string(),
    address: z.string(),
    image_profile: z.string(),
    status: z.enum(["INACTIVE", "ACTIVE", "BANNED", "BUSY"]),
    shipper_info: z.object({
      vehicle_type: z.enum(["BIKE", "MOTORBIKE", "CAR"]),
      license_number: z.string(),
      verification_status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
    }),
    createdAt: z.date(),
  })
);

export const changeStatusResponse = z.object({
  _id: z.unknown(),
  name: z.string(),
  email: z.string(),
  status: z.enum(["INACTIVE", "ACTIVE", "BANNED", "BUSY"]),
});

export const verifyStatusShipperResponse = z.object({
  _id: z.unknown(),
  name: z.string(),
  email: z.string(),
  shipper_info: z.object({
    vehicle_type: z.enum(["BIKE", "MOTORBIKE", "CAR"]),
    license_number: z.string(),
    verification_status: z.enum(["PENDING", "APPROVED", "REJECTED"]),
  }),
  status: z.enum(["INACTIVE", "ACTIVE", "BANNED", "BUSY"]),
});
