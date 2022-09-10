const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('../backend/config/dbConfig')


const app = express();

app.listen(4000, err =>{
    if (err){
        console.log(err);
    }
    else{
        console.log(`Server is running on port: 4000`);
    }
});

app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.post('/api/login', (req,res)=>{
    res.send('Login API call is working')
})

mongoose.connect(dbConfig.MONGODB_URL)
.then(data => console.log(`MONGO DB IS CONNECTED.`))
.catch(err => console.log(`Error while connecting to MONGO DB : ${err}`));