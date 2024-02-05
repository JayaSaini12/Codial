const mongoose = require('mongoose');

const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');

const userschema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar:{
        type: String
    }
},{timestamps: true});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"..",AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  })

//statics functions called for whole class
userschema.statics.upload_Avatar=multer({storage:storage}).single('avatar');//only a single file can be saved
userschema.statics.avatarPath=AVATAR_PATH;//AVATAR_PATH to be accsesd publicly

const User = mongoose.model('User', userschema);
module.exports = User;