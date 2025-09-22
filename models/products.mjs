import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2 },
  price: { type: Number, required: true, min: 0 },
  category: { 
    type: String, 
    enum: ["electronics", "clothing", "food", "other"], 
    default: "other" 
  },
  stock: { type: Number, default: 0 }
}, { timestamps: true });

// Index for price queries
productSchema.index({ price: 1 });

export default mongoose.model("Product", productSchema);
