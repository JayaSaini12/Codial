const express = require('express');
const app= express();
const port = 8000;
app.listen(port, function(err){
    if(err){
        console.log('Error: ', err);
        console.log('Error: ${port}');  //another way to write variable
    }
    console.log(`Server is running on port: ${port}`);
    // console.log(Server is running on port: ${port});

})