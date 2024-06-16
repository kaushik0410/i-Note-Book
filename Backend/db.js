const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/iNoteBook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";

const connectTMongoDB = () => {
    mongoose.connect(mongoURI);
    console.log("MongoDB HAS BEEN CONNECTED SUCCESSFUULLY.");
}

module.exports = connectTMongoDB; 