const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken')
require('dotenv').config()
const UserController = require('../controllers/user');
const User = require("../models/user");

router.post("/signup", UserController.user_signup);

router.post('/login',UserController.user_login);

router.delete("/:userId", UserController.user_delete);

module.exports = router;
