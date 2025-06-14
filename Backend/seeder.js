const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./Models/Product");
const User = require("./Models/User");
const Cart = require("./Models/Cart");
const products = require("./data/products");

dotenv.config();

// connect to mongo db

mongoose.connect(process.env.MONGO_URI);

// Function to seed the data

const seedData = async () => {
  try {
    // clear the previous data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    //  create a default admin user

    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    // assig the default user ID to each product

    const userID = createdUser._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    // insert the product in the database

    await Product.insertMany(sampleProducts);
    console.log("product data seeded successfully");
    process.exit();
  } catch (error) {
    console.error("error seeding the data:", error);
    process.exit(1)
  }
};

seedData()