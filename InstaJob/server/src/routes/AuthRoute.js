const express = require("express");
const { login, register, getUser } = require("../controllers/AuthController");
const protected = require("../Middleware/authMiddleware");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me", protected, getUser);

module.exports = router;
