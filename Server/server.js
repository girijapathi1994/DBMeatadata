const express= require('express');
const parser=require('body-parser');
const cors = require('cors')
const port=process.env.PORT || 8080;
const api= require('./routes/api')
const app=express();
app.use(cors())
app.use(parser.json())
app.get('/',function(req,res){
    res.send("successfully working mean");
})
app.use('/api',api);
app.listen(port,function(){
    console.log("server running on port "+ port)
})