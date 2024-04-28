const express = require('express')
const app = express()
const path = require('path')
const port  = 3000;
const { v4: uuid } = require('uuid');


app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.static(path.join(__dirname,"public")));

app.set('view engine', 'ejs');
app.set("views",path.join(__dirname, 'view'));

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const data = [
    {
        id:1,
        username: 'esakkiraja2004',
        password: 'esakkiraja2004',
        email: 'esakkiraja2401@gmail.com',
        aadhar: 399078730909,
        mob:8056591650,
        pan:"A8564568",
        bank: 'state bank of india',
        branch:'Nanguneri',
        accno: 345864258076,
        ifsc:'SBIN0015',
        balance: 500000

    },
    {
        id:2,
        username: 'raja2004',
        password: 'raja2004',
        email: 'esakkiraja2004@gmail.com',
        aadhar: 987078730909,
        mob:8058991650,
        pan:"AD094568",
        bank: 'American bank of india',
        branch:'Nanguneri',
        accno: 345864258076,
        ifsc:'SBIN0015',
        balance: 500000

    }
]

app.get('/login', (req, res) => {

    res.render('login.ejs')
})

app.get('/login/admin/:id', (req, res) => {

    const id = req.params.id;
    const user = data.find(item => item.id === parseInt(id)); 
    res.render('admin.ejs',{user})

})

app.post('/login', (req, res) => {

    const { username, password } = req.body;
    console.log(username, password);

    function checkCredentials(username, password, data) {

        for (let i = 0; i < data.length; i++) {

            if (data[i].username === username && data[i].password === password) {
                return res.render('admin.ejs', { user: data[i] });
            }
        }
        res.render("error.ejs");
    }

    checkCredentials(username, password, data);
});


app.get('/login/admin/:id/balance', (req , res) => {
    
    const id = req.params.id;
    const user = data.find(item => item.id === parseInt(id)); 
    console.log(id);
    res.render("balance.ejs", {user})
})

  
app.listen(port,() => {

    console.log('listening on port');
});