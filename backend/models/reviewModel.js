import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "product",
  },
},{timestamps : true});

export default mongoose.model("review", reviewSchema);
