const express = require('express');
const userRepo = require('../user-repo/userRepo')

const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await userRepo.find()
    res.send(users)
});

router.get('/users/:id', async (req, res) => {
    const user = await userRepo.findById(req.params.id);
    if (!user)
        return res.status (404).send()
    res.send(user);
});

router.post('/users', async (req, res) => {
    const {username , bio} = req.body;
    const user = await userRepo.insert({username , bio})
    res.send(user)
});

router.put('/users/:id', async (req, res) => {
    const id = req.params.id
    const {username , bio} = req.body;
    const user = await userRepo.update({id ,username , bio})
    if (!user)
        return res.status(404).send('not found !')
    res.send(user);
});

router.delete('/users/:id', async (req, res) => {
    const id = req.params.id
    const user = await userRepo.delete(id)
    if (!user) 
    return res.status (404).send('not found!');
    res.send (user)
});

module.exports = router;
