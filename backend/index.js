const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('../backend/config/dbConfig');
const Users = require('./models/userModel');
const SERVER = require('./config/server');


const app = express();

app.listen(SERVER.port, err => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`Server is running on port: ${SERVER.port}`);
    }
});

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect(dbConfig.MONGODB_URL)
    .then(data => console.log(`MONGO DB IS CONNECTED.`))
    .catch(err => console.log(`Error while connecting to MONGO DB : ${err}`));


// LOGIN API CALL
app.post('/api/login', (req, res) => {
    const reqBody = req.body;
    const foundUser = Users.findOne(reqBody, (err, data) => {
        if (err) {
            const errorMsg = `Error on getting user from DB: ${err}`;
            console.log(errorMsg);
            res.send(errorMsg);
        }
        else {
            res.send(data);            
        }
    })
})


// REGISTER API CALL
app.post('/api/register', (req, res) => {
    const reqBody = req.body;
    Users.findOne(reqBody, async (err, data) => {
        console.log('123');
        if (err) {
            const errorMsg = `Error on register user : ${err}`;
            res.send(errorMsg);            
            return;
        }        
        if (data) {        
            const newUser = new Users(reqBody);
            const saveNewUser = await newUser.save();            
            res.send(saveNewUser || 'User not registered.');
        }
    })
})