import { Types } from "mongoose";
import type {
  editAccountCustomer,
  updateProfileInterface,
} from "../interface/account.interface.js";
import User from "../schema/user.schema.js";

export const AccountRepository = {
  findAccountByRole: async (
    role: string,
    skip: number,
    limit: number,
    email: string,
    verify: string,
  ) => {
    const filter: any = { role };

    if (email && email.trim() !== "") {
      filter.email = { $regex: email, $options: "i" };
    }
    if (role === "SHIPPER" && verify === "APPROVED") {
      filter["shipper_info.verification_status"] = "APPROVED";
    }

    return User.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
  },

  findByEmailExceptUser: (email: string, userId: string) => {
    return User.findOne({
      email,
      _id: { $ne: new Types.ObjectId(userId) },
    });
  },

  findByNameExceptUser: (name: string, userId: string) => {
    return User.findOne({
      name,
      _id: { $ne: new Types.ObjectId(userId) },
    });
  },

  findUserById: async (userId: string) => {
    return User.findById(userId).populate("status shipper_info");
  },

  findAccountByIdAndDelete: async (userId: string) => {
    return User.findByIdAndDelete(userId);
  },

  findUserByIdAndUpdateProfile: async (
    userId: string,
    data: updateProfileInterface | editAccountCustomer,
  ) => {
    return User.findByIdAndUpdate(userId, data);
  },

  fetchAccountDetail: async (userId: string, role: string) => {
    if (role === "CUSTOMER") {
      return await User.findById(userId)
        .select("_id name email image_profile role address phone totalSpend")
        .lean();
    } else if (role === "SHIPPER") {
      return await User.findById(userId)
        .select("_id name email image_profile role address phone shipper_info")
        .lean();
    } else if (role === "ADMIN") {
      return await User.findById(userId)
        .select("_id name email image_profile role")
        .lean();
    } else {
      throw new Error("Invalid role");
    }
  },
};
