import { Types } from "mongoose";
import type { updateProfileInterface } from "../interface/account.interface.js";
import User from "../schema/user.schema.js";

export const AccountRepository = {
  findAccountByRole: async (
    role: string,
    skip: number,
    limit: number,
    email: string
  ) => {
    const filter: any = { role };

    if (email && email.trim() !== "") {
      filter.email = { $regex: email, $options: "i" };
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
    data: updateProfileInterface
  ) => {
    return User.findByIdAndUpdate(userId, data);
  },
};
