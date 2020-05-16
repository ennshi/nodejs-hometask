const { Router } = require('express');
const AuthService = require('../services/authService');
const { responseMiddleware } = require('../middlewares/response.middleware');

const router = Router();

router.post('/login', (req, res, next) => {
    try {
        // TODO: Implement login action (get the user if it exist with entered credentials)
        const data = AuthService.login({ email: req.body.email, password: req.body.password });
        if(data) {
            res.data = data;
        }
    } catch (err) {
        res.err = err.message;
    } finally {
        next();
    }
}, responseMiddleware);

module.exports = router;
