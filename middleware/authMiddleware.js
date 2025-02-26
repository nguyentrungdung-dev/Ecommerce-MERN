import jwt from "jsonwebtoken";
import User from "../models/userModels.js";
import dotenv from "dotenv";

dotenv.config();

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Token không hợp lệ!" });
    }
  } else {
    res.status(401).json({ message: "Không có token!" });
  }
};

export { protect };
