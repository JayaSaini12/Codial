module.exports.home = function(req,res){
    return res.render('home', {
        title: 'home'
    })
}
// above code will show you what to return when home page is called