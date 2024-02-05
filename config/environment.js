const development={
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'codeial_new',
    google_clientID:"311007338612-es6v27b3tbi46hnb8d096iei6pvf73cd.apps.googleusercontent.com",
    google_clientSecret:"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",
    google_callbackURL:"http://localhost:2000/users/auth/google/callback",
    jwt_secret:'codeial',
}
const production={
    name:'production'
}
module.exports=development;