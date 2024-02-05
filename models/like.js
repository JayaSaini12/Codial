const  mongoose=require('mongoose');

const likeSchema=new mongoose.Schema({
    //defines object id of the liked object
    user:{
        type:mongoose.Schema.ObjectId
    },
    likable:{//field used for defining the type of the liked object since this is a dynamic reference
        type:mongoose.Schema.ObjectId,
        require:true,
        refPath:'onModel'
    },
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
})


const Like=mongoose.model('Like',likeSchema);
module.exports=Like;