const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user

router.get('/', (req, res) => {
    const users = UserService.getAll();
    res.send(users);
});

router.get('/:id', (req, res) => {
    const _id = { id: +req.params.id };
    const user = UserService.search(_id);
    res.send(user);
});

router.post('/', (req, res) => {
    const user = req.body;
    res.send(UserService.create(user));
});

router.put('/:id', (req, res) => {
    const _id = +req.params.id;
    const dataToUpdate = req.body;
    res.send(UserService.update(_id, dataToUpdate));
});

router.delete('/:id', (req, res) => {
    const _id = +req.params.id;
    res.send(UserService.delete(_id));
});

module.exports = router;
