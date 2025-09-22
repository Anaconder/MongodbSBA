import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.mjs";
import Product from "./models/Product.mjs";
import Order from "./models/Order.mjs";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear old data
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    // Insert users
    const users = await User.insertMany([
      { name: "Alice", email: "alice@example.com", password: "secret123" },
      { name: "Bob", email: "bob@example.com", password: "secret123" },
      { name: "Charlie", email: "charlie@example.com", password: "secret123" },
      { name: "Diana", email: "diana@example.com", password: "secret123" },
      { name: "Eve", email: "eve@example.com", password: "secret123" }
    ]);

    // Insert products
    const products = await Product.insertMany([
      { name: "Laptop", price: 1200, category: "electronics", stock: 10 },
      { name: "T-Shirt", price: 20, category: "clothing", stock: 50 },
      { name: "Pizza", price: 15, category: "food", stock: 30 },
      { name: "Headphones", price: 100, category: "electronics", stock: 25 },
      { name: "Book", price: 12, category: "other", stock: 100 }
    ]);

    // Insert orders
    await Order.insertMany([
      { user: users[0]._id, products: [{ product: products[0]._id, quantity: 1 }], total: 1200 },
      { user: users[1]._id, products: [{ product: products[2]._id, quantity: 2 }], total: 30 },
      { user: users[2]._id, products: [{ product: products[1]._id, quantity: 3 }], total: 60 },
      { user: users[3]._id, products: [{ product: products[4]._id, quantity: 5 }], total: 60 },
      { user: users[4]._id, products: [{ product: products[3]._id, quantity: 1 }], total: 100 }
    ]);

    console.log("Database seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
}

seed();
