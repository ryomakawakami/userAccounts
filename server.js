const express = require('express');
const path = require('path')
const app = express();


const port = 3000;

app.listen(port, () => console.log('Listening at port ' + port));
app.use(express.static('public'));

app.get('/login', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'loginForm.html'));
});

app.get('/signup', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'createAccount.html'));
});

app.get('/test', (req, res) =>{

    res.send('This is TOTALLY a test');

});