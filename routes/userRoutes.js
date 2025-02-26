import express from "express";
import User from "../models/userModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { protect } from "../middleware/authMiddleware.js";
import {
  authUser,
  registerUser,
  getUserProfile,
} from "../controllers/userController.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Tạo token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

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

// 📌 API Đăng ký User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Email đã tồn tại!" });
    }

    const user = await User.create({ name, email, password });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Không thể tạo user!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!" });
  }
});

// 📌 API Đăng nhập User
router.post("/login", authUser);
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Sai email hoặc mật khẩu!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!" });
  }
});

// 📌 API Lấy thông tin user (Yêu cầu đăng nhập)
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
});

router.post("/", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);

export default router;
