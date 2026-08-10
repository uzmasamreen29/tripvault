console.log("TripVault index.js loaded");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const tripRoutes = require("./routes/tripRoutes");
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Mongodb connected");
})
.catch((err)=>{
    console.log("mongodb connection error:",err);
});


app.get("/",(req,res)=>{
    res.send("TripVault Backend Running");
});


app.listen(5000,()=>{
    console.log("Server is running on port 5000");
});