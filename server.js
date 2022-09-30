// Required packages
const express = require('express');
const fs = require('fs');
const path = require('path');

// Init express
const app = express();

// Set PORT/default PORT
const PORT = process.env.PORT || 3001;

// Set static route
// TODO: Learn why normal routing (I think) doesn't seem to display properly - must be static?
app.use(express.static('public'))

// Set Notes GET route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

// Notes POST route
app.post('/api/notes', (req, res) => {
    var note = req.body;
    var noteArr = fs.readFileSync('./db/db.json');
    noteArr.push(note);
    fs.writeFileSync('.db/db.json', noteArr);
    res.json(noteArr);
    //TODO: Why is noteArr.push() "not a function?"
})

// Catch-all route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Listen on PORT
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))