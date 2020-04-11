const express = require('express');
const fs = require('fs');
const readline = require('readline');
const bodyParser = require('body-parser');
const path = require('path');
var spawn = require('child_process').spawn;


const app = express();
const port = 3000;

app.listen(port, () => console.log('Listening at port ' + port));
app.use(express.static(path.join(__dirname, 'public')));
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
    
    createAccount = spawn('python', ['createAccount.py', req.body.username, req.body.password]);

    createAccount.stdout.on('data', (data)=>{
        console.log(data.toString());
        if(data.toString() == "True\n"){
            fs.appendFile("plaintext/accounts", req.body.username+" "+req.body.password+"\n", (err)=>{
                if(err){
                    res.send(err);
                }else{

                    res.send("Your account has been added, "+req.body.username+"! Welcome!");
                }
            });
        }else if(data.toString() == "False\n"){
            res.send("Invalid credentials");
        }
    });
    createAccount.on('close', ()=>{
        console.log("Python process: createAccount.py over");
    });

});