const express = require('express');
const mongoose = require('mongoose');
const asynHandler = require('express-async-handler');
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
app.post('/api/register',asynHandler( async (req, res) => {
    const {username, email, password} = req.body

    if(!username || !email || !password) {
        throw new Error ('Please add all fields')
    }
    
    const userExist = await Users.findOne(req.body);
    if(userExist){
        res.status(400)
        throw new Error('User already exists');
    }

    const user = await Users.create({
        username,
        password,
        email,
    })

    if(user){
        res.status(201).json({
            _id : user.id,
            username : user.username,
            password: user.password,
            email: user.email
        })
    }
    else{
        res.status(400)
        throw new Error ('Invalid user data')
    }
})
)