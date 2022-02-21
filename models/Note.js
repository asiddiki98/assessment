const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    note: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Note = mongoose.model('note', NoteSchema);
module.exports = Note;