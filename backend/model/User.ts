import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
      trim: true,
    },
    image_profile: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    shipper_info: {
      vehicle_type: {
        type: String,
        enum: ["BIKE", "MOTORBIKE", "CAR"],
        default: "BIKE",
      },
      license_number: {
        type: String,
        default: "",
        trim: true,
      },
      verification_status: {
        type: String,
        enum: ["PENDING", "APPROVED", "REJECTED"],
        default: "PENDING",
      },
    },
    role: {
      type: String,
      enum: ["CUSTOMER", "ADMIN", "SHIPPER"],
      default: "CUSTOMER",
    },
    status: {
      enum: ["INACTIVE", "ACTIVE", "BANNED", "BUSY"],
      default: "INACTIVE",
    },
    toke: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;

export interface InUser {
  id: string;
  role: string;
}
