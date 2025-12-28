import type {
  AccountStatus,
  accountTypeInterface,
  VerifyStatus,
} from "../interface/account.interface.js";
import { AccountRepository } from "../repository/account.repository.js";

export const AccountService = {
  getAllCustomer: async (page: number, limit: number) => {
    if (page < 1 || limit < 1)
      throw new Error("Incorrect page and limit number");

    const skip = (page - 1) * limit;
    const users = await AccountRepository.findAccountByRole(
      "CUSTOMER",
      skip,
      limit
    );

    return users;
  },

  getAllShipper: async (page: number, limit: number) => {
    if (page < 1 || limit < 1)
      throw new Error("Incorrect page and limit number");

    const skip = (page - 1) * limit;
    const users = await AccountRepository.findAccountByRole(
      "SHIPPER",
      skip,
      limit
    );

    return users;
  },

  changeStatusAccount: async (status: AccountStatus, id: string) => {
    const exsistingUser = await AccountRepository.findUserById(id);
    if (!exsistingUser) throw new Error("User is not found");

    exsistingUser.status = status;
    await exsistingUser.save();

    return exsistingUser;
  },
  
  verifyAccountShipper: async (verify: VerifyStatus, id: string) => {
    const exsistingShipper = await AccountRepository.findUserById(id);
    if (!exsistingShipper) throw new Error("User is not found");

    if (exsistingShipper.role !== "SHIPPER")
      throw new Error("User is not shipper");

    if (!exsistingShipper.shipper_info) {
      exsistingShipper.shipper_info = {
        vehicle_type: "BIKE",
        license_number: "",
        verification_status: "PENDING",
      };
    }
    exsistingShipper.shipper_info.verification_status = verify;
    await exsistingShipper.save();
    
    return exsistingShipper;
  },
};
