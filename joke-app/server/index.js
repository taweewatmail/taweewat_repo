const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const passport = require('passport');
const users = require('./routes/api/users');

const db = require('./db')
const jokeRouter = require('./routes/joke-router')

const app = express()
const apiPort = 5000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use('/api', jokeRouter)
app.listen(apiPort, () => console.log('Server running on port ${apiPort}'))

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);