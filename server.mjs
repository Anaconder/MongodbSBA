import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./db/connect.mjs";

import usersRoute from "./routes/users.mjs";
import productsRoute from "./routes/products.mjs";
import ordersRoute from "./routes/orders.mjs";
import globalErr from "./middleware/globalErr.mjs";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/orders", ordersRoute);

// Global Error Handler
app.use(globalErr);

// Start Server after DB connects
const startServer = async () => {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};

startServer();
