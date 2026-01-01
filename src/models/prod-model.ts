import mongoose from "mongoose";
import { productTypes } from "../types/prod-type";

const productSchema = new mongoose.Schema<productTypes>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      lowercase: true,
      maxlength: 50,
      unique: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      enum: ["electronics", "fashion", "home", "mobile", "uncategorized"],
    },

    tags: {
      type: [String],
      default: [],
    },

    ratings: {
      type: Number,
      min: 1,
      max: 5,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<productTypes>("Product", productSchema);
