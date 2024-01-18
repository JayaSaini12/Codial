const Post=require('../models/post')

module.exports.create=function(req,res){
    Post.create({
        content:req.body.content,//creating an action to submit the data of the form and save in db
        user:req.user._id,//to those users
    },
    function(err,post){
        if(err){
            console.log('error is creating a post');
            return;
        }
        return res.redirect('back');
    });
}