const express = require("express"); // global
const session = require("express-session"); // global
const path = require("path");
const flash = require("express-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require('mongoose');
// const crypto = require('crypto');

// .env file in config folder
require('dotenv').config({ path: path.resolve(__dirname, 'config/.env')});

const app = express();
app.use(express.urlencoded({ extended: true }));
//app.use(express.urlencoded({ extended: true }));
// quand je soumet mon formulaire j'ai besoin de lui préciser qu'il doit accepter ce type de format
// qui n'est pas du json mais du html en format urlencoded
app.use(flash());
// app.use(flash()) => permet d'avoir des messages de notification
app.use(
    session({
        secret: "SECRET",
        resave: false,
        saveUninitialized: false,
    })
);
//init passport
app.use(passport.initialize());
app.use(passport.session());

// connection database
mongoose.connect(
    `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_SERVER_URL}/blog?authSource=admin`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
const db = mongoose.connection;
db.on('error', (err) => {
    console.error('Connection error:', err);
});
db.once('open', () => {
    console.log('Connection successful');
});

// // j'ai wrappé moi meme isAuthenticated de passport dans une autre fonction nommé isAuthenticated ,
// // comme ça je peux la passer en callback pour proteger une route (dans mon cas dashboard)
// const isAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect("/login");
// };

// use static code
app.use(express.static(path.join(__dirname, "public")));
// use json
app.use(express.json());
// middleware CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow_Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorisation");
    next();
});
// config session

// template engine : pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.set('views', './blog/views');

// // route simple
// app.get("/", (req, res) => {
//     res.send("Hello World !");
// });

// // home
// app.get("/home", (req, res) => {
//     res.render("home");
// });

// register
// app.get("/login", (req, res) => {
//     res.render("login");
// });

// // TEST user
// const user = {
//     username: "toto",
//     password: "password",
// };
// // config strategie locale (nom & mdp user)
// passport.use(
//     new LocalStrategy((username, password, done) => {
//         try {
//             if (user.password === password) {
//                 return done(null, user);
//             }
//         } catch (err) {
//             return done(null, false, {
//                 message: "Nom d'utilisateur ou mot de passe incorrect",
//                 });
//             }
//         })
// );

// // serialisation de l'utilisateur pour le stocker en session
// passport.serializeUser((user, done) => {
//     // mon user n'as pas d'id donc j'envoie l'username ou alors meme l'user complet
//     done(null, user.username);
// });
// // déseriarisation de l'utilisateur à partir de la session
// passport.deserializeUser((id, done) => {
//     // recup user en utilisant l'ID session
//     // il manquais cette partie, pour désérialiser l'user, je renvoie un utilisateur test
//     //(attention : pas le meme nom que celui qui a se réussis à se co, c'est de la simulation)
//     const user = { name: "par défaut" };
//     done(null, user);
// });

// route d'authentification
// app.post(
//     "/login",
//     passport.authenticate("local", {
//         successRedirect: "/dashboard",
//         failureRedirect: "/login",
//         // accepte les message d'erreur quand l'authentification echoue
//         failureFlash: true,
//     })
// );

// dashboard
// // isAuthenticated a mettre directement en deuxieme argument (fonction qui passe en callback)
// app.get("/dashboard", isAuthenticated, (req, res) => {
//     res.send("je suis sur le dashboard");
// });

// import routers
const homeRoutes = require('./blog/routes/homeRoutes');
const authRoutes = require('./blog/routes/authRoutes');
// const articleRoutes = require('./blog/routes/articleRoutes');

// use routers
app.use('/', homeRoutes);
app.use('/auth', authRoutes);
// app.use('/articles', articleRoutes);

PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening port ${PORT}`);
});