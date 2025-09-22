import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3 },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /.+\@.+\..+/ 
  },
  password: { type: String, required: true, minlength: 6 }
}, { timestamps: true });

// Index for fast email lookup
userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("User", userSchema);
