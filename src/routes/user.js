const express = require('express');
const userRepo = require('../repos/user-repos');

const router = express.Router();

router.get('/users', async (req, res, next) => {
  const users = await userRepo.find();

  res.send(users);
});
router.get('/users/:id', async (req, res, next) => {
  const user = await userRepo.findById(req.params.id);
  if (!user) return res.status(400).send();
  res.send(user);
});

module.exports = router;
