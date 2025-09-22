import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./db/connect.mjs";

import usersRoute from "./routes/users.mjs";
import productsRoute from "./routes/products.mjs";
import ordersRoute from "./routes/orders.mjs";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/orders", ordersRoute);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start Server
const PORT = process.env.PORT || 5000;

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("❌ DB Connection Error:", err));
