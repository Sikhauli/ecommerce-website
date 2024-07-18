const {
    getCart,
    addCart,
    updateCart,
    deleteCart,
} = require("../controllers/cartController");

const router = require("express").Router();

const { adminAuthentication, customerAuthentication } = require("../middleware/authMiddleware");

router.post("/add", addCart);

router.get("/:id", getCart);

router.patch("/:id", updateCart);

router.delete("/:id", deleteCart);

module.exports = router;
