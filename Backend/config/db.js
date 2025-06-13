const mongoose = require("mongoose")

connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongo db is connetcted");
        
    } catch (err) {
        console.error("mongodb connection failed", err)
        process.exit(1)
    }
}

module.exports = connectDB