import User from "../schema/user.schema.js";

export const AccountRepository = {
  findAccountByRole: async (role: string, skip: number, limit: number) => {
    return User.find({ role: role })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();
  },

  findUserById: async (userId: string) => {
    return User.findById(userId).populate("status shipper_info");
  },
};
