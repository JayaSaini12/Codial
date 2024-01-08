module.exports.profile = function(req,res){
    return res.end('<h1>User Profile</h1>');
} 

module.exports.bhalu = function(req, res){
    return res.end('<h1> Hey Bhalu this side</h1>');
}

module.exports.bhais = function(req, res){
    return res.end('<h1> Hey Bhais this side</h1>')
}