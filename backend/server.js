const multer = require("multer");
const path = require("path");
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("dashboard"));

/* ===============================
   Temporary Admin (for testing)
   =============================== */

const adminUser = {
    email: "admin@dentalsystems.co.ke",
    // password: 123456 (hashed)
    password: bcrypt.hashSync("123456", 10)
};

/* ===============================
   Admin Login Route
   =============================== */

app.post("/admin/login", async (req, res) => {
    const { email, password } = req.body;

    if (email !== adminUser.email) {
        return res.status(401).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, adminUser.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
        { email: adminUser.email },
        "supersecretkey",
        { expiresIn: "2h" }
    );

    res.json({ token });
});

/* ===============================
   Protected Dashboard Route
   =============================== */

app.get("/admin/dashboard", (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        jwt.verify(token, "supersecretkey");
        res.json({ message: "Welcome to Admin Dashboard" });
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
});

app.listen(5000, () => {
    console.log("Clinic backend running on port 5000");
});