const Post=require('../models/post');
const Comment=require('../models/comment');
const Like = require('../models/like');

module.exports.create= async function(req,res){
    try{
        await Post.create({//action of the form
        content:req.body.content,//creating an action to submit the data of the form and save in db
        user:req.user._id//to those users
    });

    if(req.xhr){
        post = await post.populate('user', 'name').execPopulate();
        return res.status(200).json({
            data:{
                post: Post
            },
            message:"Post created"
        })
    }

    req.flash('success', 'Post published!');
    return res.redirect('back');
}catch(err){
    req.flash('error', err);
    // console.log('Error',err);
            return res.redirect('back');
    }
    // function(err,post){
        // if(err){
            
        // }
        
    // });
}

module.exports.destroy= async function(req,res){

    try{
        let post = await Post.findById(req.params.id);//find if post is there or not
        //.id means converting the object id into string
        if(post.user==req.user.id){//if post is created by this user then only it should be deleted

            //CHANGE:: deleted the associated likes for the post and all the comments likes too
            await Like.deleteMany({likeable:post,onModel:'Post'});
            await Like.deleteMany({_id:{$in:post.comments}});

            post.remove();

            await Comment.deleteMany({post:req.params.id});//then delete comment also if post is deleted

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Post deleted"
                });
            }
            req.flash('success', 'Post and associated comments deleted!');
                return res.redirect('back');
        // });
    }
    else{
        req.flash('error', 'You cannot delete this post!');
        return res.redirect('back');
    }
    
    }
    catch(err)
    {
        req.flash('error', err);
        // console.log('Error', err);
        return res.redirect('back');
    }
}