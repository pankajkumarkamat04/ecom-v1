import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    shippingInfo: {
      name: {
        type: String,
        required: [true, "Name is required"],
      },
      phone_no: {
        type: Number,
        required: [true, "Phone No is required"],
      },
      email: {
        type: String,
      },
      address: {
        type: String,
        required: [true, "Address is required"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
      },
      state: {
        type: String,
        required: [true, "State is required"],
      },
      country: {
        type: String,
        required: [true, "Country is required"],
      },
      pinCode: {
        type: Number,
        required: [true, "Pin code is required"],
      },
      landmark: {
        type: String,
      },
      note: {
        type: String,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "user is required"],
      ref: "user",
    },
    orderItems: [
      {
        name: {
          type: String,
          required: [true, "Product name is required"],
        },
        price: {
          type: String,
          required: [true, "Product price is required"],
        },
        image: {
          type: String,
        },
        quantity: {
          type: Number,
          required: [true, "Product quantity is required"],
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: [true, "Product is required"],
          ref: "Product",
        },
      },
    ],
    paymentMethod: {
      type: String,
      required: [true, "Please Select Payemnt Method"],
      enum: {
        values: ["COD", "Stripe"],
        message: "Please Select : COD or Online",
      },
    },
    paymentInfo: {
      id: String,
      status: String,
    },
    itemsPrice: {
      type: Number,
      required: [true, "Items price is required"],
    },
    shippingAmount: {
      type: Number,
    },
    taxAmount: {
      type: Number,
    },
    totalAmount: {
      type: Number,
    },
    orderStatus: {
      type: String,
      default: "Processing",
      enum: {
        values: ["Processing", "Shipping", "Delivered", "Cancelled"],
        message: "Please select correct order status",
      },
      required: [true, "Order Status is required"],
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
