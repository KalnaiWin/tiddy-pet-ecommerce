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

  findUserById: async (userId: string) => {
    return User.findById(userId).populate("status shipper_info");
  },
};
