import express from "express";
import { connectToDB } from "../db/connect.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET all users
router.get("/", async (req, res, next) => {
  try {
    const db = await connectToDB();
    const users = await db.collection("users").find().toArray();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET user by ID
router.get("/:id", async (req, res, next) => {
  try {
    const db = await connectToDB();
    const user = await db.collection("users").findOne({ _id: new ObjectId(req.params.id) });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// POST create user
router.post("/", async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: "Name and email are required" });

    const db = await connectToDB();
    const result = await db.collection("users").insertOne({ name, email, createdAt: new Date() });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

// PATCH update user
router.patch("/:id", async (req, res, next) => {
  try {
    const db = await connectToDB();
    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User updated" });
  } catch (err) {
    next(err);
  }
});

// DELETE user
router.delete("/:id", async (req, res, next) => {
  try {
    const db = await connectToDB();
    const result = await db.collection("users").deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
