import express from "express";
import User from "../models/userModels.js";

const router = express.Router();

// Lấy danh sách user
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Tạo user mới
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi tạo user" });
  }
});

export default router;
