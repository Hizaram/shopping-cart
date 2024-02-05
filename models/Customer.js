const mongoose = require('mongoose');
const validator = require('validator');


const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Pls, provide your username'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Kindly provide a password'],
        minLength: [8, 'Minimum length should be 8'],
        select: false,
    },
    passwordConfirmation: {
        type: String,
        required: [true, 'Kindly re-enter your password'],
        validate: {
            validator(el) {
                return this.password === el;
            },
            message: 'Password are not the same!',
        },
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    }
});
    /**customerSchema.pre('save', async function (next) {
        if (!this.isModified('password')) return next();

        this.password = sha1(this.password);

        this.passwordConfirmation = undefined;
        next();
    });**/

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
