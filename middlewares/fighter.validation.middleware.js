const { fighter } = require('../models/fighter');
const FighterService = require('../services/fighterService');

const fighterSchema = Object.assign({}, fighter);
delete fighterSchema.id;

const createFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during creation
    const newFighter = req.body;
    try {
        if (!Object.keys(fighterSchema).every((key) => newFighter.hasOwnProperty(key))) {
            return res.status(400).send({
                error: true,
                message: 'All fields must be filled in.'
            });
        }
        const errors = fieldsValidation(req.body);
        if(errors.length) {
            return res.status(400).send({
                error: true,
                message: errors
            });
        }
        const { name, power, health, defense } = newFighter;
        req.newFighter = { name, power, health, defense };
        next();
    } catch(e) {
        res.status(500).send({
            error: true,
            message: e.message
        });
    }
};

const updateFighterValid = (req, res, next) => {
    // TODO: Implement validatior for fighter entity during update
    try {
        if(!fighterExists({id: req.params.id})) {
            return res.status(404).send({
                error: true,
                message: "Fighter not found"
            });
        }
        const allowedUpdates = Object.keys(fighterSchema);
        const reqUpdates = Object.keys(req.body);
        const isValidUpdate = reqUpdates.every((field) => allowedUpdates.includes(field));
        if (!isValidUpdate) {
            return res.status(400).send({
                error: true,
                message: "Invalid updates"
            });
        }
        const errors = fieldsValidation(req.body);
        if(errors.length) {
            return res.status(400).send({
                error: true,
                message: errors
            });
        }
        next();
    } catch(e) {
        res.status(500).send({
            error: true,
            message: e.message
        });
    }
};

const fieldsValidation = (fighter) => {
    const errors = [];
    if(fighter.hasOwnProperty('name')) {
        if(!minLength(fighter.name, 2) || !maxLength(fighter.name, 46)) {
            errors.push('Please enter a name of 2 - 46 characters.');
        }
    }
    if(fighter.hasOwnProperty('health')) {
        if(!checkValueLimits(fighter.health, 10, 100)) {
            errors.push('Health value should be 10...100');
        }
    }
    if(fighter.hasOwnProperty('power')) {
        if(!checkValueLimits(fighter.power, 1, 10)) {
            errors.push('Power value should be 1...10');
        }
    }
    if(fighter.hasOwnProperty('defense')) {
        if(!checkValueLimits(fighter.defense, 1, 10)) {
            errors.push('Defense value should be 1...10');
        }
    }
    return errors;
};

const fighterExists = (id) => {
    return FighterService.search(id);
};

const minLength = (value, validMinLength) => {
    return value.trim().length >= validMinLength;
};

const maxLength = (value, validMaxLength) => {
    return value.trim().length <= validMaxLength;
};

const checkValueLimits = (value, min, max) => {
    if(!isNaN(value/1)) {
        return !(value < min || value > max);
    }
    return false;
};

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
