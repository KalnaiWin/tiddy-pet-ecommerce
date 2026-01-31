import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        variantId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Variant",
          required: true,
        },
        quantity: Number,
        price: Number,
      },
    ],
    otherPrice: {
      discount: {
        type: Number,
        default: 0,
      },
      shippingFee: {
        type: Number,
        default: 0,
      },
    },
    voucher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Voucher",
      default: null,
    },
    totalPrice: Number,
    subTotal: Number,

    payment: {
      method: {
        type: String,
        enum: ["COD", "ONLINE"],
        required: true,
        default: "COD",
      },
      status: {
        type: String,
        enum: ["UNPAID", "PAID", "REFUNDED"],
        default: "UNPAID",
      },
      paidAt: {
        type: Date,
        default: null,
      },
    },

    shipping: {
      address: {
        type: String,
        require: true,
      },
      phone: {
        type: String,
        require: true,
      },
      note: {
        type: String,
        default: "",
      },
      shipper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
      assignedAt: {
        type: Date,
        default: null,
      },
    },

    predictedDayShipping: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "PENDING",
        "CONFIRMED",
        "ASSIGNED",
        "PICKING",
        "SHIPPING",
        "DELIVERED",
        "FAILED",
        "CANCELLED",
      ],
      default: "PENDING",
    },

    cancel: {
      reason: {
        type: String,
        default: "",
      },
      cancelledBy: {
        type: String,
        default: "",
      },
      cancelledAt: {
        type: Date,
        default: "",
      },
    },
    deliveryFailed: {
      reason: {
        type: String,
        default: "",
      },
      failedAt: {
        type: Date,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
