const Product = require("../models/Product");
const { routeErrors, documentExists } = require("../utils/helpers");
const { newFilePaths, deleteFiles } = require("../utils/filehandler");

const getProducts = async (req, res) => {

    const keyword = req.query.keyword || "";

    try {

        let filters = {};

        if (keyword) {
          filters = {
            $or: [
                { brand: { $regex: keyword, $options: "i" } },
                { category: { $regex: keyword, $options: "i" } },
                { size: { $regex: keyword, $options: "i" } },
                { label: { $regex: keyword, $options: "i" } },
                { color: { $regex: keyword, $options: "i" } },
                { manufacturer: { $regex: keyword, $options: "i" } }
            ]
        }
    };

        const products = await Product.find(filters).lean();

        res.send({ products });
    } catch (error) {
        routeErrors(res, error, "Unable to get Products!");
    }
};

const addProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        if (req.files) newProduct.images = newFilePaths(req.files);
        await newProduct.save(newProduct);
        res.send("Product added successfully!");
    } catch (error) {
        routeErrors(res, error, "Unable to add a Product!");
    }
};

const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.send(product);
    } catch (error) {
        routeErrors(res, error, "Unable to get Product!");
    }
};

const updateProduct = async (req, res) => {
  
    const productExists = await documentExists(res, req.params.id, Product);
        if (!productExists) return routeErrors(res, "", "Product does not exist.");
        if (req.files) req.body.images = newFilePaths(req.files);

        //find old pic to delete
    const oldImages = productExists?.images;
        Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((response) => {
            if (req.files) deleteFiles(oldImages);

            res.send(response);
        })
        .catch((error) => {
            routeErrors(res, error, "Unable to update Product!");
        });
};

const deleteProduct = async (req, res) => {
    try {
        // Check if document exists
        const productExists = await documentExists(res, req.params.id, Product);
        if (!productExists) return routeErrors(res, "", "Product does not exist.");

        await Product.findByIdAndDelete(req.params.id);
        res.send("Product deleted!");
    } catch (error) {
        routeErrors(res, error, "Unable to delete a Product!");
    }
};

module.exports = {
  getProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
