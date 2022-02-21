const express = require("express");
const router = express.Router();
const Note = require("../../models/Note");
const validateNote = require("../../validation/note");

router.get("/:email", (req, res) => {
    Note.find({ creator: req.params.email })
    .then(notes => res.json({notes}))
    .catch((err => res.status(404).json({notesEror: "no notes"})))
})

router.post("/", (req,res) => {
    const { errors, isValid } = validateNote(req.body);

    if (!isValid) {
        return res.status(400).json(errors)
    }

    const newNote = new Note ({
        creator: req.body.creator,
        note: req.body.note
    })

    newNote.save().then(note => res.json(note))
})

module.exports = router;