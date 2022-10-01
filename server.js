// Required packages
const express = require('express');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

// Init express
const app = express();

// Set PORT/default PORT
const PORT = process.env.PORT || 3001;

// Set static route
app.use(express.static('public')) 

app.use(express.json());
// app.use(express.urlencoded({ extended: false}));


// Set Notes GET route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})

// Notes POST route
app.post('/api/notes', (req, res) => {
    console.log(req.body)
    let note = req.body;

    // Read current note list (in contents of db.json)
    let noteArr = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    note.id = uuid;
    noteArr.push(note);

    // Write array with new list back to db.json (overwriting old)
    fs.writeFileSync('db/db.json', JSON.stringify(noteArr));
    res.json(noteArr);
})

// Catch-all route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Listen on PORT
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))