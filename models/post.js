const mongoose=require('mongoose');
const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{//post schema is connected to this user schema
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'//schema to which thois post schema is connected
}},{timestamps:true
})

const Post=mongoose.model('Post',postSchema);
module.exports=port;