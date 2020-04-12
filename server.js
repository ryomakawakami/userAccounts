const express = require('express');
const fs = require('fs');
const readline = require('readline');
const bodyParser = require('body-parser');
const path = require('path');
var spawn = require('child_process').spawn;

const app = express();
const port = 3000;

app.listen(port, () => console.log('Listening at port ' + port));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'loginForm.html'));
});

app.get('/signup', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'createAccount.html'));
});

app.post('/login/auth', (req, res) => {
    authorize = spawn('python', [path.join(__dirname, 'pyAuth', 'authorize.py'),
        req.body.username, req.body.password]);

    authorize.stdout.on('data', (data) => {
        console.log(data.toString());
        switch(parseInt(data.toString())) {
            case 0:
                res.send("Welcome, " + req.body.username + "!");
                break;
            case 1:
                res.send("Incorrect username or password.");
                break;
            default:
                res.send("Unknown error.");
        }
    })

    authorize.on('close', ()=>{
        console.log("Python process: authorize.py over");
    });
});

app.post('/signup/createNew', (req, res)=>{
    createAccount = spawn('python', [path.join(__dirname, 'pyAuth', 'createAccount.py'),
        req.body.username, req.body.password, req.body.confirmPassword]);

    createAccount.stdout.on('data', (data)=>{
        console.log(data.toString());
        switch(parseInt(data.toString())) {
            case 0:
                fs.appendFile("admin/accounts", req.body.username+" "+req.body.password+"\n", (err)=>{
                    if(err){
                        res.send(err);
                    }else{
                        res.send("Your account has been added, "+req.body.username+"! Welcome!");
                    }
                });
                break;
            case 1:
                res.send("Username already in use.");
                break;
            case 2:
                res.send("Username cannot be empty.");
                break;
            case 3:
                res.send("Password cannot be empty.");
                break;
            case 4:
                res.send("Passwords don't match.");
                break;
            default:
                res.send("Unknown error.");
        }
    });
    createAccount.on('close', ()=>{
        console.log("Python process: createAccount.py over");
    });

});