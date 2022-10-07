const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const asynHandler = require('express-async-handler');
const dbConfig = require('./backend/config/dbConfig');
const Users = require('./backend/models/userModel');
const SERVER = require('./backend/config/server');
const jwt = require('jsonwebtoken');


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
app.use(cors());

mongoose.connect(dbConfig.MONGODB_URL)
    .then(data => console.log(`MONGO DB IS CONNECTED.`))
    .catch(err => console.log(`Error while connecting to MONGO DB : ${err}`));


// LOGIN API CALL
app.post('/api/login', asynHandler(async (req, res) => {
    const { username, email, passowrd } = req.body

    const user = await Users.findOne(req.body)
    if (user) {        
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        res.status(400).send('Invalid data')
    }
})
)

// REGISTER API CALL
app.post('/api/register', asynHandler(async (req, res) => {
    const { username, email, password } = req.body
    

    if (!username || !email || !password) {
        res.status(400).send('Please add all fields')
    }

    const userExist = await Users.findOne(req.body);
    const userEmailUsed = await Users.findOne({email});
    const userUsernameUsed = await Users.findOne({username});
    if (userExist) {        
        res.status(400).send('User already exists');
    }
    if(userEmailUsed || userUsernameUsed){
        res.status(400).send('User with same data already exists');
    }

    const user = await Users.create({
        username,
        password,
        email,

    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            username: user.username,
            password: user.password,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400).send('Invalid user data')
    }
})
)

// NEW TRANSACTION API CALL
app.post('/api/new-transaction', (req, res) => {
    const amount = parseInt(req.body.transaction.amount);
    const text = req.body.transaction.text;
    const user = req.body.user
    // console.log(req.body);
    // console.log(user);

    if (req.body) {
        Users.updateOne(
            { username: user }, { $push: { transactions: { text: text, amounts: amount } } },
            null, (error, data) => {
                if (error) throw new Error('Error on transaction');
                if (data) {
                    res.send('Transaction succeed')
                }
            })
    }
    else {
        res.status(400)
        throw new Error('Transaction failed')
    }
})


// GET ALL TRANSACTIONS
app.get('/api/get-transactions/:user', (req, res) => {
    const user = req.params.user;
    // console.log('user---', user);

    Users.findOne({ username: user }, (err, data) => {
        if (err) {
            console.log(err);
        }
        if (data) {
            // console.log('122--', data.transactions);
            res.status(200).send(data.transactions)
        }
    });


})

// RESET BALANCE API CALL
app.delete('/api/reset-balance/:user', (req,res)=>{
    const user = req.params.user;

    Users.findOneAndUpdate({username:user},{transactions: []},(err,data)=>{
        if(err){
            console.log('greska', err);
        }
        if(data){
            console.log('data',data);
            res.send(data)
        }
    })

})


// GENERATE JWT
const generateToken = (id) => {
    return jwt.sign({ id }, SERVER.JWT_SECRET, {
        expiresIn: '30d',
    })
}