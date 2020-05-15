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
            res.status(400).send({
                error: true,
                message: 'All fields must be filled in.'
            });
        } else {
            const { email, firstName, lastName, password, phoneNumber } = newUser;
            if(!isGmailEmail(email)) {
                errors.push('Please enter a valid email @gmail.com.');
            }
            if(!uniqueEmail(email)) {
                errors.push('The email is already registered. Please sign in.');
            }
            if(!isPhoneNumber(phoneNumber)) {
                errors.push('Please enter a valid phone number (+380*********).');
            }
            if(!minLength(firstName, 2) || !maxLength(firstName, 46)) {
                errors.push('Please enter a correct first name.')
            }
            if(!minLength(lastName, 2) || !maxLength(lastName, 46)) {
                errors.push('Please enter a correct last name.')
            }
            if(!minLength(password, 3) || !maxLength(password, 128)) {
                errors.push('Please enter a password of 3 - 128 characters.')
            }
            if(errors.length) {
                res.status(400).send({
                    error: true,
                    message: errors
                });
            }
            req.newUser = { email, firstName, lastName, password, phoneNumber };
        }
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

    next();
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
