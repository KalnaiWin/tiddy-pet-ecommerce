import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerInfo: {
      name: String,
      phone: String,
    },
    items: [
      {
        productId: String,
        name: String,
        image: String,
        quantity: Number,
        price: Number,
      },
    ],

    discount: Number,
    totalPrice: Number,
    subTotal: Number,
    shippingFee: Number,

    shipping: {
      address: String,
      note: String,
      shipper: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      assignedAt: Date,
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
      reason: String,
      cancelledBy: String,
      cancelledAt: Date,
    },
    deliveryFailed: {
      reason: String,
      failedAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
