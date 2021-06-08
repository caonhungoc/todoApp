const mongoose = require('mongoose');
const config = require("config");
// const mongoDB = 'mongodb+srv://ngoccao:Pass1234__@cluster0.lanpk.mongodb.net/testDB?retryWrites=true&w=majority';
const mongoDB = config.get("dbUrl");

function connectDB() {
    mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true}).then(() => {
        console.log("connect database sucesssfully");
    });
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = {
    connectDB,
}