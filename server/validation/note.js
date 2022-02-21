const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function (data) {
    let errors = {};

    data.note = validText(data.note) ? data.note : '';

    if (Validator.isEmpty(data.note)) {
        errors.note = "note can not be empty";
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}