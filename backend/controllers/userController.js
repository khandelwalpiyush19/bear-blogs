import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
      
        //validation

        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        await User.create({ fullName, email, password: hashedPassword });
        return res.status(201).json({
            success: true,
            message: "User created successfully"
        });
    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        return res.status(200).cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            "maxAge": 24 * 60 * 60 * 1000
        }).json({
            success: true,
            message: "Logged in successfully",
        });
    } catch (error) {
        console.log(error);
    }
}
export const logout = async (_, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        console.log(error);
    }
}