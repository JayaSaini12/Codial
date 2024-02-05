const Post=require('../../../models/post');
// const { post } = require('../../../routes');
const Comment=require('../../../models/comment');

module.exports.index=async function(req,res){

    let posts = await Post.find({})
    .sort('-createdAt')//sorting posts
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user'
        }
      });

    return res.json(200,{
        message:"List of posts",
        posts: posts
    })
}

module.exports.destroy= async function(req,res){

    try{
        let post = await Post.findById(req.params.id);//find if post is there or not
        //.id means converting the object id into string
        if(post.user==req.user.id){//if post is created by this user then only it should be deleted
            post.remove();

            await Comment.deleteMany({post:req.params.id});//then delete comment also if post is deleted

            // if(req.xhr){
            //     return res.status(200).json({
            //         data:{
            //             post_id:req.params.id
            //         },
            //         message:"Post deleted"
            //     });
            // }
            // req.flash('success', 'Post and associated comments deleted!');
                return res.json(200,{
                    message:"Post and associated comments deleted successfully"
                });
        // });
    }
    // else{
    //     req.flash('error', 'You cannot delete this post!');
    //     return res.redirect('back');
    }
    catch(err)
    {
        // req.flash('error', err);
        // console.log('Error', err);
        return res.json(500,{
            message:"Internal server error"
        });
    }
}