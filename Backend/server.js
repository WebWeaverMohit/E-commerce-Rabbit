const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db")
const userRoutes = require('./routes/userRoutes') 
const productRoutes = require('./routes/productRoutes') 
const dotenv = require("dotenv")
const app = express();
app.use(express.json());
app.use(cors())

dotenv.config()

const PORT = process.env.PORT || 3000;

// connect to mongo db database

connectDB()

app.get("/", (req,res) => {
    res.send("welcome")
})

// api Routes

app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)


app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})