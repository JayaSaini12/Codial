const express = require("express");
const env=require('./config/environment');
const app = express();
const port = 2000;
const db = require("./config/mongoose");
const expresslayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passport_local = require('./config/passport_local');
const passportJWT=require('./config/passport-jwt-strategy');
const passportGoogle=require("./config/passport-google-oauth2-strategy");

const MongoStore=require('connect-mongo')(session);//to permanently store session like after refresh  it should not go out
const saasMiddleware=require('node-sass-middleware');
const flash = require('connect-flash');
const customware = require('./config/middleware');

//setup the chat server to be used with socket.io
const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_sockets').chatSocket(chatServer);
chatServer.listen(4000);
console.log('chat server is listening on port 5000');
const path=require('path');


app.use(saasMiddleware({
  src:path.join(__dirname,env.asset_path,'/scss'),
  dest:path.join(__dirname,env.asset_path,'/css'),
  debug:true,
  outputStyle:'extended',
  prefix:'/css'//where should sever look for css files
}));//before other use as we want template earlier
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static(env.asset_path));

// app.use(express.static());
//make the uploads path available to the browser
app.use("/upload",express.static(__dirname+"/uplaods"));
app.use(expresslayouts);


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
  secret: env.session_cookie_key,//this key is used to encrpt the identity of key
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

app.use(flash());
app.use(customware.setFlash);
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
