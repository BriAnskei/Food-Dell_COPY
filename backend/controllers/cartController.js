import userModel from "../models/userModel.js";
import user from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
  try {
    // Access userId and itemId from request body
    let userData = await userModel.findById(req.body.userId); // userId comes from the middleware
    let cartData = await userData.cartData; // Get user's cart data

    // Access itemId sent in the request body
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1; // Add item to cart if not present
    } else {
      cartData[req.body.itemId] += 1; // Increment quantity if item exists
    }

    // Update the user's cart in the database
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to Cart" }); // Send success response
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" }); // Send error response
  }
};

// Remove Items in cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    console.log(cartData);

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Removed from Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Fetch userCart Data
const getCart = async (req, res) => {
  try {
    // get by middleware
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart };
