import express from "express";
import { connectToDB } from "../db/connect.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET all orders
router.get("/", async (req, res, next) => {
  try {
    const db = await connectToDB();
    const orders = await db.collection("orders").find().toArray();
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// POST create order
router.post("/", async (req, res, next) => {
  try {
    const { userId, products } = req.body;
    if (!userId || !products || !Array.isArray(products))
      return res.status(400).json({ error: "userId and products array are required" });

    const db = await connectToDB();
    const result = await db.collection("orders").insertOne({
      userId,
      products,
      createdAt: new Date(),
    });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

// PATCH update order
router.patch("/:id", async (req, res, next) => {
  try {
    const db = await connectToDB();
    const result = await db.collection("orders").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order updated" });
  } catch (err) {
    next(err);
  }
});

// DELETE order
router.delete("/:id", async (req, res, next) => {
  try {
    const db = await connectToDB();
    const result = await db.collection("orders").deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
