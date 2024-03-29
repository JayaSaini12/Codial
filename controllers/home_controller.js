const Post=require('../models/post');
const User = require('../models/user'); 


module.exports.home = async function (req, res) {
  try {
    let posts = await Post.find({})
    .sort('-createdAt')//sorting posts
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user'
        },
        populate: {
          path: 'likes'//for count of likes
        }
      }).populate('likes');

    let users = await User.find({});

    return res.render('home', {
      title: "Codeial | Home",
      posts: posts,
      all_users: users
    });
  } catch (err) {
    console.log('Error', err);
    return;
  }
};