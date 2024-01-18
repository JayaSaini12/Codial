const express = require("express");
const app = express();
const port = 2000;
const db = require("./config/mongoose");
const expresslayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passport_local = require('./config/passport_local');
const MongoStore=require('connect-mongo')(session);//to permanently store session like after refresh  it should not go out
const saasMiddleware=require('node-sass-middleware');


app.use(saasMiddleware({
  src:'./assets/scss',
  dest:'./assets/css',
  debug:true,
  outputStyle:'extended',
  prefix:'/css'//where should sever look for css files
}));//before other use as we want template earlier

app.use(express.static("./assets"));
app.use(expresslayouts);
app.use(express.urlencoded());
app.use(cookieParser());
//  extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);


// it assumes that there is an index.js file inside the routes directly.
// when you require a directory, Node.js will automatically look for an index.js file
//common hai isliye routes me bhej diya

app.set("view engine", "ejs");
app.set("views", "./views");

//mongo store is used the session cookie int the db

app.use(session({
  name: 'codeial',
  // Todo change the secret before deployment in profuction code
  secret: 'blahsomething',//this key is used to encrpt the identity of key
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: (1000 * 60 * 100) //this is specified in milliseconds
  },
  store: new MongoStore({
    mongooseConnection:db,
    autoRemove:'disabled',
  },
  function(err){
    console.log(err||'connect-mongodb setup ok');
  }
  )
}));


// middleware should be before router
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error: ", err);
    console.log("Error: ${port}"); //another way to write variable
  }
  console.log(`Server is running on port: ${port}`);
  // console.log(Server is running on port: ${port});
});
