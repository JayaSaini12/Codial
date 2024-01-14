module.exports.home = function (req, res) {
  console.log(req.cookies);
  return res.render("home", {
    title: "home",
  });
};
// above code will show you what to return when home page is called
