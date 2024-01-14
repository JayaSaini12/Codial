const User = require("../models/user");
module.exports.profile = function (req, res) {
  return res.render("user_profile", {
    title: "profile",
  });
};

module.exports.signup = function (req, res) {
  return res.render("user_sign_up", {
    title: "Codeial | sign up",
  });
};

module.exports.signin = function (req, res) {
  return res.render("user_sign_in", {
    title: "codeial | sign in",
  });
};

///get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding the signing up");
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user while signing up");
          // return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};
// sign in and
module.exports.createSession = function (req, res) {
  //TO DO later
};
