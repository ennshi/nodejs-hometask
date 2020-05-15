const { Router } = require('express');
const UserService = require('../services/userService');
const { createUserValid, updateUserValid } = require('../middlewares/user.validation.middleware');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

// TODO: Implement route controllers for user

router.get('/', (req, res) => {
    try {
        const users = UserService.getAll();
        res.send(users);
    } catch(e) {
        res.status(500).send({
            error: true,
            message: "Internal server error"
        });
    }
});

router.get('/:id', (req, res) => {
    const _id = { id: req.params.id };
    try {
        const user = UserService.search(_id);
        if (!user) {
            res.status(404).send({
                error: true,
                message: 'User not found'
            });
        }
        res.send(user);
    } catch(e) {
        res.status(500).send({
            error: true,
            message: "Internal server error"
        });
    }
});

router.post('/', (req, res) => {
    const user = req.body;
    try {
        res.send(UserService.create(user));
    } catch(e) {
        res.status(500).send({
            error: true,
            message: "Internal server error"
        });
    }
});

router.put('/:id', (req, res) => {
    const _id = req.params.id;
    const dataToUpdate = req.body;
    try {
        res.send(UserService.update(_id, dataToUpdate));
    } catch(e) {
        res.status(500).send({
            error: true,
            message: "Internal server error"
        });
    }
});

router.delete('/:id', (req, res) => {
    const _id = req.params.id;
    try {
        const user = UserService.delete(_id);
        if (!user) {
            res.status(404).send({
                error: true,
                message: 'User not found'
            });
        }
        res.send(user);
    } catch(e) {
        res.status(500).send({
            error: true,
            message: "Internal server error"
        });
    }
});

module.exports = router;
