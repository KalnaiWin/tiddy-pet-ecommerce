import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    default: 0,
    require: true,
  },
  image: {
    type: String,
    default: "/frontend/src/asset/Empty.webp",
  },
  stock: {
    type: Number,
    default: 0,
  },
});

const Variant = mongoose.model("Variant", variantSchema);
export default Variant;
