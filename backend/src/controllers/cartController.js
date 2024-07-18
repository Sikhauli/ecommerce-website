
const Cart = require("../models/Cart.ts");
const User = require("../models/User.js");
const { routeErrors, documentExists } = require("../utils/helpers");
const { newFilePaths, deleteFiles } = require("../utils/filehandler");


const addCart = async (req, res) => {

  const { userId, productId, quantity } = req.body;
  try {
    let cartItem = await Cart.findOne({  userId, productId });
    if (cartItem) {
      cartItem.quantity += quantity;
      cartItem = await cartItem.save();
    } else {
      cartItem = await Cart.create({ userId, productId, quantity });
    }
    res.status(201).json(cartItem);
  } catch (error) {
    console.log("error");
    res.status(500).json({ error: error.message });
  }
};

const getCart = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await documentExists(res, id, User);
        if (!user) return;
        const cartItems = await Cart.find({ userId: id }).populate('productId');
        res.status(200).json(cartItems);
    } catch (error) {
        routeErrors(res, error, "Unable to retrieve cart items.");
    }
};

const updateCart = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        const cartItem = await documentExists(res, id, Cart);
        if (!cartItem) return;

        cartItem.quantity = quantity;
        await cartItem.save();
        res.status(200).json(cartItem);
    } catch (error) {
        routeErrors(res, error, "Unable to update cart item.");
    }
};

const deleteCart = async (req, res) => {
    try {
        // Check if document exists
        const productExists = await documentExists(res, req.params.id, Cart);
        if (!productExists) return routeErrors(res, "", "Product does not exist in Cart.");

        await Cart.findByIdAndDelete(req.params.id);
        res.send("Product deleted from cart!");
    } catch (error) {
        routeErrors(res, error, "Unable to delete Product from Cart!");
    }
};


module.exports = {
  addCart,
  getCart,
  updateCart,
  deleteCart
};
