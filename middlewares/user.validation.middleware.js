const { user } = require('../models/user');
const UserService = require('../services/userService');

const userSchema = Object.assign({}, user);
delete userSchema.id;

const createUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during creation
    const newUser = req.body;
    const errors = [];
    try {
        if (!Object.keys(userSchema).every((key) => newUser.hasOwnProperty(key))) {
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
        const { email, firstName, lastName, password, phoneNumber } = newUser;
        req.newUser = { email, firstName, lastName, password, phoneNumber };
        next();
    } catch(e) {
        res.status(500).send({
            error: true,
            message: e.message
        });
    }
};

const updateUserValid = (req, res, next) => {
    // TODO: Implement validatior for user entity during update
    try {
        if(!userExists({id: req.params.id})) {
            return res.status(404).send({
                error: true,
                message: "User not found"
            });
        }
        const allowedUpdates = Object.keys(userSchema);
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

const fieldsValidation = (user) => {
    const errors = [];
    if(user.hasOwnProperty('email')) {
        if (!isGmailEmail(user.email)) {
            errors.push('Please enter a valid email @gmail.com.');
        }
        if (!uniqueEmail(user.email)) {
            errors.push('The email is already registered. Please sign in.');
        }
    }
    if(user.hasOwnProperty('phoneNumber')) {
        if (!isPhoneNumber(user.phoneNumber)) {
            errors.push('Please enter a valid phone number (+380*********).');
        }
    }
    if(user.hasOwnProperty('firstName')) {
        if (!minLength(user.firstName, 2) || !maxLength(user.firstName, 46)) {
            errors.push('Please enter a correct first name.')
        }
    }
    if(user.hasOwnProperty('lastName')) {
        if (!minLength(user.lastName, 2) || !maxLength(user.lastName, 46)) {
            errors.push('Please enter a correct last name.')
        }
    }
    if(user.hasOwnProperty('password')) {
        if (!minLength(user.password, 3) || !maxLength(user.password, 128)) {
            errors.push('Please enter a password of 3 - 128 characters.')
        }
    }
    return errors;
};

const userExists = (id) => {
    return UserService.search(id);
};

const minLength = (value, validMinLength) => {
    return value.trim().length >= validMinLength;
};

const maxLength = (value, validMaxLength) => {
    return value.trim().length <= validMaxLength;
};

const isGmailEmail = (email) => {
    const reg = /^[a-z0-9]((\.|\+)?[a-z0-9]){5,63}@gmail\.com$/i;
    return email.match(reg);
};

const uniqueEmail = (email) => {
    return !UserService.search({email});
};

const isPhoneNumber = (phone) => {
    const reg = /^\+380[0-9]{9}$/;
    return phone.match(reg);
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
