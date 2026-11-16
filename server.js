
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// User Schema
const User = mongoose.model("User", {
    name: String,
    email: { type: String, unique: true },
    password: String
});

// Register
app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password || password.length < 8) {
            return res.status(400).json({
                message: "Fill all fields. Password needs 8 characters."
            });
        }

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hash
        });

        res.json({ message: "Registration successful!" });

    } catch (err) {
        res.status(500).json({ message: "Registration failed" });
    }
});

// Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600000
        });

        res.json({ message: "Login successful!" });

    } catch (err) {
        res.status(500).json({ message: "Login failed" });
    }
});

// Dashboard
app.get("/dashboard", async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Please login first"
            });
        }

        const data = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(data.id).select("-password");

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (err) {
        res.clearCookie("token");
        res.status(401).json({ message: "Please login again" });
    }
});

// Logout
app.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
    });

    res.json({ message: "Logged out successfully" });
});

// Start Server
app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000");
});
