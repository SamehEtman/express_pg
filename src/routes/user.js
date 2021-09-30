const express = require('express');
const userRepo = require('../repos/user-repos');

const router = express.Router();

router.get('/user', async (req, res, next) => {
  const users = await userRepo.find();
  
  res.send(users)
});

module.exports = router;
