import type {
  AccountStatus,
  editAccountCustomer,
  updateProfileInterface,
  VerifyStatus,
} from "../interface/account.interface.js";
import { AccountRepository } from "../repository/account.repository.js";

export const AccountService = {
  getAllCustomer: async (page: number, limit: number, email: string) => {
    if (page < 1 || limit < 1)
      throw new Error("Incorrect page and limit number");
    const skip = (page - 1) * limit;
    const users = await AccountRepository.findAccountByRole(
      "CUSTOMER",
      skip,
      limit,
      email,
      "",
    );
    return users;
  },

  getAllShipper: async (
    page: number,
    limit: number,
    email: string,
    verify: string,
  ) => {
    if (page < 1 || limit < 1)
      throw new Error("Incorrect page and limit number");

    const skip = (page - 1) * limit;
    const users = await AccountRepository.findAccountByRole(
      "SHIPPER",
      skip,
      limit,
      email,
      verify,
    );

    return users;
  },

  getSpecificAccount: async (userId: string) => {
    const existingUser = await AccountRepository.findUserById(userId);
    if (!existingUser) throw new Error("User is not found");
    return existingUser;
  },

  updateProfile: async (
    adminId: string,
    userId: string,
    data: updateProfileInterface,
  ) => {
    const adminAccount = await AccountRepository.findUserById(adminId);
    if (!adminAccount || adminAccount.role !== "ADMIN")
      throw new Error("You are not allowed");

    const user = await AccountRepository.findUserById(userId);
    if (!user) throw new Error("The user not found");

    const emailExists = await AccountRepository.findByEmailExceptUser(
      user.email,
      userId,
    );
    const nameExists = await AccountRepository.findByNameExceptUser(
      data.name,
      userId,
    );
    if (nameExists || emailExists) {
      throw new Error("Name or Email has already taken");
    }

    await AccountRepository.findUserByIdAndUpdateProfile(userId, data);
    return 1;
  },

  updateUserProfile: async (userId: string, data: editAccountCustomer) => {
    const user = await AccountRepository.findUserById(userId);
    if (!user) throw new Error("User not found");

    const nameExists = await AccountRepository.findByNameExceptUser(
      data.name,
      userId,
    );
    if (nameExists) {
      throw new Error("Name has already taken");
    }
    await AccountRepository.findUserByIdAndUpdateProfile(userId, data);

    return 1;
  },

  deleteAccount: async (userId: string) => {
    const deletedUser =
      await AccountRepository.findAccountByIdAndDelete(userId);
    if (!deletedUser) throw new Error("User is not found");
    return deletedUser;
  },
};
