const router = require("express").Router();
const { signup, login, verify, logout } = require("../controllers/AuthController");
const auth = require("../middleware/AuthMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify", auth, verify);
router.post("/logout", logout);

module.exports = router;