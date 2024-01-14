const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
const expresslayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
app.use(express.static("./assets"));
app.use(expresslayouts);
app.use(express.urlencoded());
app.use(cookieParser());
//  extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// use express router
app.use("/", require("./routes"));
// it assumes that there is an index.js file inside the routes directly.
// when you require a directory, Node.js will automatically look for an index.js file
//common hai isliye routes me bhej diya

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log("Error: ", err);
    console.log("Error: ${port}"); //another way to write variable
  }
  console.log(`Server is running on port: ${port}`);
  // console.log(Server is running on port: ${port});
});
