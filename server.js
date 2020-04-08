const express = require('express');
const fs = require('fs');
const readline = require('readline');
const bodyParser = require('body-parser');
const path = require('path');
const myParser = require('./userParser.js');
const app = express();


const port = 3000;

app.listen(port, () => console.log('Listening at port ' + port));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'loginForm.html'));
});

app.get('/signup', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'createAccount.html'));
});

app.post('/login/auth', (req, res) => {
    res.send(`User: ${req.body.username} Pass: ${req.body.password}`);
});

app.post('/signup/createNew', (req, res)=>{
    
    isValid = true;
    
    if(req.body.password == req.body.confirmPassword){
        readInterface = readline.createInterface({
            input : fs.createReadStream('./plaintext/accounts'),
            output: process.stdout,
            console: false
        });

        readInterface.on('line', (line)=>{
            console.log(line);
        });
    }
    

});