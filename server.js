const express = require('express');
const path = require('path')
const app = express();

const port = 3000;

// Hello

app.listen(port, () => console.log('Listening at port ' + port));
app.use(express.static('public'));

app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'loginForm.html'));
});

app.get('/signup', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'createAccount.html'));
});

app.post('/login/auth', (req, res) => {
    res.redirect('/');
})