const express = require('express')
const app = express()
const path = require('path')
const port  = 3000;
const { v4: uuid } = require('uuid');

app.use('view engine', view)

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.listen(port,() => {
    console.log('listening on port');
});