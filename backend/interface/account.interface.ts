export interface accountTypeInterface {
  status: "INACTIVE" | "ACTIVE" | "BANNED" | "BUSY";
}

export type AccountStatus = "INACTIVE" | "ACTIVE" | "BANNED" | "BUSY";
export type VehicleType = "BIKE" | "MOTORBIKE" | "CAR";
export type VerifyStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface updateProfileInterface {
  name: "";
  email: "";
  status: AccountStatus;
  phone: "";
  address: "";
  shipper_info: {
    vehicle_type: VehicleType;
    license_number: "";
    verification_status: VerifyStatus;
  };
}

export interface editAccountCustomer {
  name: "";
  image_profile: "";
  phone: "";
  address: "";
}

