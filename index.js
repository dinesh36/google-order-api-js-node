'use strict'

require('dotenv').config()

const createError = require('http-errors');
// const bodyParser = require('body-parser');
const express = require('express');
const path = require('path')

const app = express()

app.use(express.json());
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

require('./routes')(app);

app.get('/hi',(req, res)=>{
    res.send('Hello world');
})

app.use(function (req, res, next) {
    next(createError(404))
});

// Start listening.
app.listen(3000, async () => {
    console.log('Server started on http://localhost:3000')
    console.log('Press Ctrl-C to terminate...')
})

module.exports = app
