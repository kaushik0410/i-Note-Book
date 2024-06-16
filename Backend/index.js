const connectToMongoDB = require('./db');
var cors = require('cors');
const express = require('express');
const app = express();
const port = 5000;

connectToMongoDB();

app.use(cors());
app.use(express.json());

//Routes for user authentication
app.use('/user/auth', require('./routes/Auth'));
app.use('/user/note', require('./routes/Notes'));

app.listen(port, () => {
    console.log(`iNoteBook at https://localhost: ${port}`);
});