const express = require('express');
const router = express.Router();
var fetchUser = require('../middleware/FetchUser');
const Notes = require('../Models/Notes');
const {body, validationResult} = require('express-validator');

//Fetch all notes
router.get('/fetchAllNotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

//Add new note
router.post('/addNote', fetchUser, [
    body('title', 'Enter a valid Title').isLength({min: 3}),
    body('description', 'Description can not be empty').exists(),
], async (req, res) => {
    try {
        const {title, description, tag} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save();
        res.json(savedNote);
    }catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

//Update existing note
router.put('/updateNote/:id', fetchUser, [
    body('title', 'Enter valid title').isLength({min: 3}),
    body('description', 'Description can not be empty').exists()
], async (req, res) => {

    const {title, description, tag} = req.body;
    const newNote = {};

    if (title) {newNote.title = title};
    if (description) {newNote.description = description};
    if (tag) {newNote.tag = tag};

    let note = await Notes.findById(req.params.id);

    if (!note) {
        return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Bad Request!!!");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
    res.json({note});
});

//Delete existing note
router.delete('/deleteNote/:id', fetchUser, async (req, res) => {

    let note = await Notes.findById(req.params.id);
    if (!note) {
        return res.status(404).send("Not Found");
    }   

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Bad Request!!!");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"success": "Your Note has been deleted successfully."});

});

module.exports = router;