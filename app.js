const express = require('express');
const session = require('express-session');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const crypto = require('crypto');

const app = express();

// use static code
app.use(express.static(path.join(__dirname, "public")));
// use json
app.use(express.json());
// middleware CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow_Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorisation');
    next();
});
// config session
app.use(session({
    secret: 'SECRET',
    resave: false,
    saveUninitialized: false
}))
//init passport
app.use(passport.initialize());
app.use(passport.session());

// template engine : pug
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

// register
app.get('/login', (req, res) => {
    res.render('login');
});

// TEST user
const user = {
    username: 'toto',
    password: 'password' 
}

// config strategie locale (nom & mdp user)
passport.use(
    new LocalStrategy((username, password, done) => {
        try {
            if (user.password === password) {
                return done(null, user);
            }
        } catch (err) {
            return done(null, false);
        }
    })
);

// serialisation de l'utilisateur pour le stocker en session
passport.serializeUser((user, done) => {
    done(null, user.id);
});
// déseriarisation de l'utilisateur à partir de la session
passport.deserializeUser((id, done) => {
    // recup user en utilisant l'ID session
    // call done(null, user) or done(null, false)
});


// route d'authentification
app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
    })
);


// dashboard
app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        // res.send('Tableau de board');
        res.render('dashboard');
    } else {
        res.redirect('/login');
    }
});

PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening port ${PORT}`);
});

