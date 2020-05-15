const { Router } = require('express');
const FighterService = require('../services/fighterService');
const { responseMiddleware } = require('../middlewares/response.middleware');
const { createFighterValid, updateFighterValid } = require('../middlewares/fighter.validation.middleware');

const router = Router();

// TODO: Implement route controllers for fighter
router.get('/', (req, res) => {
    try {
        const fighters = FighterService.getAll();
        res.send(fighters);
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
        const fighter = FighterService.search(_id);
        if (!fighter) {
            res.status(404).send({
                error: true,
                message: 'Fighter not found'
            });
        }
        res.send(fighter);
    } catch(e) {
        res.status(500).send({
            error: true,
            message: "Internal server error"
        });
    }
});

router.post('/', createFighterValid, (req, res) => {
    const fighter = req.newFighter;
    try {
        res.send(FighterService.create(fighter));
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
        res.send(FighterService.update(_id, dataToUpdate));
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
        const fighter = FighterService.delete(_id);
        if (!fighter) {
            res.status(404).send({
                error: true,
                message: 'Fighter not found'
            });
        }
        res.send(fighter);
    } catch(e) {
        res.status(500).send({
            error: true,
            message: "Internal server error"
        });
    }
});

module.exports = router;
