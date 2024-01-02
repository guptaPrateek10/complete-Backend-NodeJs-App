const express = require('express');
const router = express.Router();
const {authenticate,authenticateAdmin} = require('../middleware/auth');
const {getUserProfile,getAllUserProfiles} = require('../controller/getProfile')

router.get('/profile', authenticate,getUserProfile );
router.get('/allprofiles',authenticateAdmin,getAllUserProfiles)
  
  

module.exports=router;
