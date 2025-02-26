import express from "express";
import Product from "../models/productModels.js";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router(); // ✅ Khai báo router

// Lấy danh sách sản phẩm
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
});

// Tạo sản phẩm mới
router.post("/", async (req, res) => {
  try {
    const { name, description, price, image, stock, category } = req.body;
    const product = new Product({
      name,
      description,
      price,
      image,
      stock,
      category,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: "Lỗi khi tạo sản phẩm" });
  }
});

export default router;
