const express = require('express');
const readline = require('readline');
const bodyParser = require('body-parser');
const path = require('path');
var spawn = require('child_process').spawn;
const session = require('express-session');

const app = express();
const port = 3000;

app.listen(port, () => console.log('Listening at port ' + port));
app.use('/', express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'Shh, its a secret!',
    resave: false,
    saveUninitialized: false
}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {
        auth: req.session.auth,
        user: req.session.user
    });
});

app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'loginForm.html'));
});

app.get('/signup', (req, res)=>{
    res.sendFile(path.join(__dirname, 'views', 'createAccount.html'));
});

app.post('/login/auth', (req, res) => {
    authorize = spawn('python', [path.join(__dirname, 'pyAuth', 'authorize.py'),
        req.body.username, req.body.password]);

    authorize.stdout.on('data', (data) => {
        console.log(data.toString());
        switch(parseInt(data.toString())) {
            case 0:
                req.session.user = req.body.username;
                req.session.auth = true;
                res.redirect('/user');
                break;
            case 1:
                res.send('Incorrect username or password.');
                break;
            default:
                res.send('Unknown error.');
        }
    })

    authorize.on('close', ()=>{
        console.log('Python process: authorize.py over');
    });
});

app.post('/signup/createNew', (req, res)=>{
    createAccount = spawn('python', [path.join(__dirname, 'pyAuth', 'createAccount.py'),
        req.body.username, req.body.password, req.body.confirmPassword]);

    createAccount.stdout.on('data', (data)=>{
        console.log(data.toString());
        switch(parseInt(data.toString())) {
            case 0:
                res.send('Your account has been added, '+req.body.username+'! Welcome!');
                break;
            case 1:
                res.send('Username already in use.');
                break;
            case 2:
                res.send('Username cannot be empty.');
                break;
            case 3:
                res.send('Password cannot be empty.');
                break;
            case 4:
                res.send('Passwords don\'t match.');
                break;
            default:
                res.send('Unknown error.');
        }
    });
    createAccount.on('close', ()=>{
        console.log('Python process: createAccount.py over');
    });

});

app.get('/user', (req, res) => {
    res.render('user', {
        auth: req.session.auth,
        user: req.session.user
    });
});

app.post('/logout', (req, res) => {
    req.session.auth = false;
    req.session.user = null;
    res.redirect('/');
});