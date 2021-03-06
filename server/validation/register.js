const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.firstname = validText(data.firstname) ? data.firstname : '';
    data.lastname = validText(data.lastname) ? data.lastname : '';
    data.email = validText(data.email) ? data.email : '';
    data.password = validText(data.password) ? data.password : '';
    data.password2 = validText(data.password2) ? data.password2 : '';

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid"
    }
    if (Validator.isEmpty(data.firstname)) {
        errors.firstname = "Firstname field is required";
    }
    if (Validator.isEmpty(data.lastname)) {
        errors.lastname = "Lastname field is required";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be at least 6 characters';
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}