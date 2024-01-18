const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeial');

const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to mongodb"));
db.once('open', function(){
    console.log('Connected to database :: mongodb');
});

module.exports = db;