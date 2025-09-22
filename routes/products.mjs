import express from "express";
import { connectToDB } from "../db/connect.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET all products
router.get("/", async (req, res, next) => {
  try {
    const db = await connectToDB();
    const products = await db.collection("products").find().toArray();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET product by ID
router.get("/:id", async (req, res, next) => {
  try {
    const db = await connectToDB();
    const product = await db.collection("products").findOne({ _id: new ObjectId(req.params.id) });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST create product
router.post("/", async (req, res, next) => {
  try {
    const { name, price, stock } = req.body;
    if (!name || price == null || stock == null)
      return res.status(400).json({ error: "Name, price, and stock are required" });

    const db = await connectToDB();
    const result = await db.collection("products").insertOne({ name, price, stock, createdAt: new Date() });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

// PATCH update product
router.patch("/:id", async (req, res, next) => {
  try {
    const db = await connectToDB();
    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product updated" });
  } catch (err) {
    next(err);
  }
});

// DELETE product
router.delete("/:id", async (req, res, next) => {
  try {
    const db = await connectToDB();
    const result = await db.collection("products").deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
