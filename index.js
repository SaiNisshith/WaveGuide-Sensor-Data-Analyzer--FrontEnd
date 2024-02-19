const express = require('express');
const port = process.env.PORT || 5000;
const path = require('path');
const app = express();

const mongoose = require('./config/mongoose');

app.use(express.static(path.join(__dirname,'./assets')));
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'./views'));



app.use('/',require('./routes/index'));
app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`App listening on post ${port}`);
})