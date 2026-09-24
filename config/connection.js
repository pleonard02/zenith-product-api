require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

mongoose.set("runValidators", true);

mongoose.connection.on("open", () => {
    console.log(`Connected to MongoDB database: ${mongoose.connection.name}`);
});

mongoose.connection.on("error", (error) => {
    console.log("MongoDB connection error ", error);
});

mongoose.connection.on("close", () => {
    console.log("Connection to MongoDB has closed.")
});