const mongoose=require('mongoose');
const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{//post schema is connected to this user schema
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'//schema to which thois post schema is connected
},
//include the array of its of all comments in this post schema itself
comments:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }
],
likes:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like'
    }
]
},
{timestamps:true
})

const Post=mongoose.model('Post',postSchema);
module.exports=Post;