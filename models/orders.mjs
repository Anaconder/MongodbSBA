import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, default: 1, min: 1 }
    }
  ],
  total: { type: Number, required: true, min: 0 },
  status: { 
    type: String, 
    enum: ["pending", "shipped", "delivered"], 
    default: "pending" 
  }
}, { timestamps: true });

// Index for user-based queries
orderSchema.index({ user: 1 });

export default mongoose.model("Order", orderSchema);
