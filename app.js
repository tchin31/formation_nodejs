const express = require('express');
const path = require('path');

const app = express();

// middleware CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow_Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorisation');
    next();
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// route simple
app.get('/', (req, res) => {
    res.send('Hello World !');
});

// home
app.get('/home', (req, res) => {
    res.render('home');
});

PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening port ${PORT}`);
});

