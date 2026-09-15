const express = require("express");

const cors = require("cors");

require("dotenv").config();

const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const Transfer = require("./models/Transfer");

const Admin = require("./models/admin");

const authenticateAdmin = require("./middleware/auth");

const app = express();
const PORT = 5000;


// Middleware
app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(function() {
        console.log("MongoDB connected successfully!");
    })
    .catch(function(error) {
        console.error("MongoDB connection failed:", error.message);
    });


    // Admin Login
app.post("/api/auth/login", async function(req, res) {
    try {
        const { email, password } = req.body;

        // Check if email and password were provided
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find admin by email
        const admin = await Admin.findOne({
            email: email
        });

        if (!admin) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                adminId: admin._id,
                email: admin.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        res.json({
            message: "Login successful",
            token: token
        });

    } catch (error) {
        console.error("Login error:", error.message);

        res.status(500).json({
            message: "Login failed"
        });
    }
});

// Home Route
app.get("/", function(req, res) {
    res.send("Football Transfer Tracker API is running!");
});


// GET - Get all transfers
app.get("/api/transfers", async function(req, res) {
    try {
        const transfers = await Transfer.find();

        res.json(transfers);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch transfers"
        });
    }
});


// POST - Create new transfer
app.post("/api/transfers", authenticateAdmin, async function(req, res) {
    try {
        const newTransfer = new Transfer(req.body);

        const savedTransfer = await newTransfer.save();

        res.status(201).json(savedTransfer);

    } catch (error) {
        res.status(500).json({
            message: "Failed to create transfer",
            error: error.message
        });
    }
});


// GET - Get one transfer by MongoDB ID
app.get("/api/transfers/id/:id", async function(req, res) {
    try {
        const transfer = await Transfer.findById(req.params.id);

        if (!transfer) {
            return res.status(404).json({
                message: "Transfer not found"
            });
        }

        res.json(transfer);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch transfer",
            error: error.message
        });
    }
});


// PUT - Update transfer
app.put("/api/transfers/:id", authenticateAdmin, async function(req, res) {
    try {
        const updatedTransfer = await Transfer.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedTransfer) {
            return res.status(404).json({
                message: "Transfer not found"
            });
        }

        res.json(updatedTransfer);

    } catch (error) {
        res.status(500).json({
            message: "Failed to update transfer",
            error: error.message
        });
    }
});


// DELETE - Delete transfer
app.delete("/api/transfers/:id", authenticateAdmin, async function(req, res) {
    try {
        const deletedTransfer = await Transfer.findByIdAndDelete(
            req.params.id
        );

        if (!deletedTransfer) {
            return res.status(404).json({
                message: "Transfer not found"
            });
        }

        res.json({
            message: "Transfer deleted successfully",
            deletedTransfer: deletedTransfer
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete transfer",
            error: error.message
        });
    }
});


// GET - Get transfers by player name
app.get("/api/transfers/:player", async function(req, res) {
    try {
        const playerName = req.params.player;

        const playerTransfers = await Transfer.find({
            player: {
                $regex: `^${playerName}$`,
                $options: "i"
            }
        });

        res.json(playerTransfers);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch player transfers"
        });
    }
});


// Start Server
app.listen(PORT, "0.0.0.0", function() {
    console.log(`Server running on port ${PORT}`);
});