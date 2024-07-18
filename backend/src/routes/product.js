const {
    getProducts,
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");

const { FILE_STORAGE_PATH } = require("../utils/constants");
const uploadFiles = require("../middleware/upload");

const router = require("express").Router();

const { adminAuthentication, customerAuthentication } = require("../middleware/authMiddleware");

router.get("/", getProducts);

router.post("/add",
    uploadFiles(FILE_STORAGE_PATH.sneakerImages).array("images[]"),
    addProduct);

router.get("/:id", getProduct);

router.patch(
    "/:id",
    uploadFiles(FILE_STORAGE_PATH.sneakerImages).array("images[]"),
    updateProduct
);

router.delete("/:id", deleteProduct);

module.exports = router;
