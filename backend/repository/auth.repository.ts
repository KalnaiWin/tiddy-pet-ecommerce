import type { authRegisterInterface } from "../interface/auth.interface.js";
import User from "../schema/user.schema.js";

export const authRepository = {
  findUserById: (userId: string) => {
    return User.findById(userId);
  },

  findUserByEmail: (email: string) => {
    return User.findOne({ email });
  },

  createAccount: (data: authRegisterInterface) => {
    return User.create(data);
  },
};
