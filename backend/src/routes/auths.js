const {
  login,
  register,
  logout,
  authenticateUser,
} = require("../controllers/authController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/logout", logout);
router.get("/authenticate", authenticateUser);


module.exports = router;
