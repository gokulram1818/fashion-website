import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//  REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // check existing user
    const exist = await userModel.findOne({ email })
    if (exist) {
      return res.status(400).json({ success: false, message: "User already exists" })
    }

    
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json({
      success: true,
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }

    // create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};

//  ADMIN LOGIN 
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check email exists
    const admin = await userModel.findOne({ email });
    if (!admin) {
      return res.status(400).json({ success: false, message: "Admin not found" });
    }

    // check role
    if (admin.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not an admin" });
    }

    // compare password
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }

    // create token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      success: true,
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error });
  }
};
