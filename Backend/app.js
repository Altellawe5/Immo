const { checkBlacklist } = require('./middleware/checkBlackList');


require("dotenv").config();


// third party models 
const express = require('express');
const cors = require('cors')



// local models

const usersRouter = require('./routes/users');
const propertyRouter = require('./routes/property');
const agentRouter = require('./routes/agent')


const app = express();

app.use(cors())
app.use(express.json());
app.use(checkBlacklist);

module.exports = app;


// for the images 
//app.use('/uploads', express.static('uploads'));

app.use('/users', usersRouter);
app.use('/property', propertyRouter);
app.use('/agent', agentRouter)

// catch 404 and forward to error handler
app.all("*", (req, res) => {
    res.status(404).send("page not found")
})

