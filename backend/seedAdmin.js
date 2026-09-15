const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/admin");

mongoose.connect(process.env.MONGO_URI)
    .then(async function() {
        console.log("MongoDB connected!");

        const hashedPassword = await bcrypt.hash(
            process.env.ADMIN_PASSWORD,
            10
        );

        await Admin.findOneAndUpdate(
            { email: process.env.ADMIN_EMAIL },
            {
                email: process.env.ADMIN_EMAIL,
                password: hashedPassword
            },
            {
                upsert: true,
                new: true
            }
        );

        console.log("Admin account created successfully!");

        mongoose.connection.close();
    })
    .catch(function(error) {
        console.error("Failed to create admin:", error.message);
    });