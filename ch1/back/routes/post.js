const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const {isLoggedIn} = require('./middlewares');
const router = express.Router();

router.post('/', isLoggedIn , (req, res)=>{

})
router.post('/images', isLoggedIn ,(req, res)=>{

})

module.exports = router;