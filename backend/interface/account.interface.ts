export interface accountTypeInterface {
  status: "INACTIVE" | "ACTIVE" | "BANNED" | "BUSY";
}

export type AccountStatus = "INACTIVE" | "ACTIVE" | "BANNED" | "BUSY";
export type VerifyStatus = "PENDING" | "APPROVED" | "REJECTED";
