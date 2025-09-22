import express from "express";
import dotenv from "dotenv";

import usersRoute from "./routes/users.mjs";
import productsRoute from "./routes/products.mjs";
import ordersRoute from "./routes/orders.mjs";
import globalErr from "./middleware/globalErr.mjs";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;// Start Server


//middleware
app.use(express.json());

// Routes
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/orders", ordersRoute);

// Global Error Handler
app.use(globalErr);

// Listen
app.listen(PORT, () => {
  console.log(`Server Runing on Port: ${PORT}`);
});