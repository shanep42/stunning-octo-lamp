// Required packages
const express = require('express');
const path = require('path');

// Init express
const app = express();

// Set PORT/default PORT
const PORT = process.env.PORT || 3001;

// Set static route
// TODO: Learn why normal routing (I think) doesn't seem to display properly - must be static?
app.use(express.static('public'))

// Set Notes route
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})



// Listen on PORT
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))