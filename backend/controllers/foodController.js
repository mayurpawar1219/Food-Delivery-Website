import foodModel from "../models/foodModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Add food item
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded" });
    }

    let image_filename = req.file.filename;

    let food = new foodModel({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: image_filename,
      category: req.body.category,
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get list of all food items
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find();
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Remove food item
const removeFood = async (req, res) => {
  try {
    const { id } = req.body; // Get ID from request body

    if (!id) {
      return res.status(400).json({ success: false, message: "Food ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Food ID" });
    }

    // Find the food item by ID
    const food = await foodModel.findById(id);

    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // Remove the image file if it exists
    if (food.image) {
      const imagePath = path.join(__dirname, "../uploads/", food.image);
      fs.unlink(imagePath, (err) => {
        if (err && err.code !== "ENOENT") {
          console.error("Error deleting image:", err);
        }
      });
    }

    // Delete the food item from the database
    await foodModel.findByIdAndDelete(id);

    res.json({ success: true, message: "Food removed successfully" });
  } catch (error) {
    console.error("Error removing food:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { addFood, listFood, removeFood };
