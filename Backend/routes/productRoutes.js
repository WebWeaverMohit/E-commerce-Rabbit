const express = require("express");
const Product = require("../Models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// route - POST /api/producrs
// desc- create a new product
// access- private/admin

router.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimentions,
      weight,
      sku,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimentions,
      weight,
      sku,
      user: req.user._id, // reference to admin user who created it
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});

// route - put /api/products/:id
// desc- update an existing product by an id
// access private/admin

router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimentions,
      weight,
      sku,
    } = req.body;

    // find the product in the databse
    const product = await Product.findById(req.params.id);

    if (product) {
      // update products field
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimentions = dimentions || product.dimentions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      //    save the updated product
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});

// route - delete api/products/:id
// desc - delete the product by ID
// acess - private/admin

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    // find the product in the database
    const product = await Product.findById(req.params.id)
    
    if(product) {
        // remove from the database
        await product.deleteOne()
        res.json({messsage: "product removed"})
    } else { 
        res.status(404).json({message: "product not found"})
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("server error")
  }
});

// route - get /api/products
// desc - 

module.exports = router;
