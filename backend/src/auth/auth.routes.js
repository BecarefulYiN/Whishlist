const express = require('express')
const router = express.Router();
const controller = require('./auth.controller.js')

//create account
router.post('/signUp', controller.createAccount)

//login account
router.post('/login', controller.loginAccount)

module.exports= router