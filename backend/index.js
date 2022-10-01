const { default: mongoose } = require("mongoose");
const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const app = express();
const PORT = 5000 || process.env.PORT;
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://pranjalsingh:Pranshu2001@cluster1.lwtpixv.mongodb.net/?retryWrites=true&w=majority').then(()=>console.log('database connected'))

app.use('/',require('./AppRoute'))

app.listen(PORT,()=>{
    console.log('listening to port');
})