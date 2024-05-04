import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    maxLength: [200, "Product name cannot exceed more then 200 characters"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    maxLength: [6, "Product price cannot more then 100,0000"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    maxLength: [
      1000,
      "Product description cannot exceed more then 1000 characters",
    ],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    enum: {
      values: [
        "Electronics",
        "Cameras",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Sports",
        "Outdoor",
        "Home",
        "Other",
      ],
      message: "Please Select Product Category",
    },
  },
  seller: {
    type: String,
    required: [true, "Product seller name is requried"],
  },
  stock: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required : true
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
}, {timestamps : true});


const productModel = mongoose.model("product" , productSchema)

export default productModel;