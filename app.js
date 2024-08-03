const express = require('express');
const { userInfo } = require('os');
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
        salary:100000,
        ifsc:'SBIN0015',
        balance: 500000,
        code:2401

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
        salary:100000,
        ifsc:'SBIN0015',
        balance: 500000,
        code:1234

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
                // Redirect to the admin page with the user's ID
                return res.redirect(`/login/admin/${data[i].id}`);
            }
        }
        res.render("error.ejs");
    }

    checkCredentials(username, password, data);
});


app.get('/login/admin/:id/balance', (req, res) => {


    const id = req.params.id;
    const user = data.find(item => item.id === parseInt(id)); 
    console.log(user); // Log the user object
    res.render("pass.ejs", { user });
});


app.post('/login/admin/:id/balance', (req, res) => {


    const digit1 = parseInt(req.body.digit1);
    const digit2 = parseInt(req.body.digit2);
    const digit3 = parseInt(req.body.digit3);
    const digit4 = parseInt(req.body.digit4);
  
    // Check if all digits are valid integers
    if (!isNaN(digit1) && !isNaN(digit2) && !isNaN(digit3) && !isNaN(digit4)) {
      // Extract the PIN entered in the form
      const pin = digit1 * 1000 + digit2 * 100 + digit3 * 10 + digit4;
      
      // Find the user based on the id in the route parameter
      const id = parseInt(req.params.id);
      const user = data.find(item => item.id === id);
    
      // Check if the user and PIN match the code in the data array
      if (user && pin === user.code) {
        res.render('balance.ejs', { user });
      } else {
        res.render('error.ejs')
      }
    } else {
        res.render('error.ejs')
    }
});

app.get('/login/admin/:id/profile', (req,res) =>{

    const id = parseInt(req.params.id);
    const user = data.find(item => item.id === id);
    res.render('profile.ejs',{ user})
})


app.get('/login/admin/:id/transactions', (req,res) =>{

    const id = parseInt(req.params.id);
    const user = data.find(item => item.id === id);
    res.render('trans.ejs',{user})
});

app.get('/login/admin/:id/service', (req,res) =>{

    const id = parseInt(req.params.id);
    const user = data.find(item => item.id === id);
    res.render('service.ejs',{user})
});
  
  
app.listen(port,() => {

    console.log('listening on port');
});