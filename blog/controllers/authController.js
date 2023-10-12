const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;

// TEST user
const user = {
    username: "toto",
    password: "password",
};

passport.use(
    new LocalStrategy((username, password, done) => {
        console.log('username:', username);
        console.log('password:', password);
        try {
            // TODO implement findOne
            if (user.username === username && user.password === password) {
                return done(null, user);
            }
        } catch (err) {
            return done(null, false, {
                message: "Nom d'utilisateur ou mot de passe incorrect",
                });
            }
        })
);

// serialisation de l'utilisateur pour le stocker en session
passport.serializeUser((user, done) => {
    // mon user n'as pas d'id donc j'envoie l'username ou alors meme l'user complet
    done(null, user.username);
});
// déseriarisation de l'utilisateur à partir de la session
passport.deserializeUser((id, done) => {
    // recup user en utilisant l'ID session
    // il manquais cette partie, pour désérialiser l'user, je renvoie un utilisateur test
    //(attention : pas le meme nom que celui qui a se réussis à se co, c'est de la simulation)
    const user = { name: "par défaut" };
    done(null, user);
});


// j'ai wrappé moi meme isAuthenticated de passport dans une autre fonction nommé isAuthenticated ,
// comme ça je peux la passer en callback pour proteger une route (dans mon cas dashboard)
// const isAuthenticated = (req, res, next) => {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect("/auth/login");
// };
exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/auth/login");
};

// const getLogin = (req, res) => {
//     res.render("login");
// };
exports.getLogin = (req, res) => {
    res.render("login");
};

// const postLogin = passport.authenticate("local", {
//     successRedirect: "/dasgboard",
//     failureRedirect: "/auth/login",
//     // accepte les message d'erreur quand l'authentification echoue
//     failureFlash: true
// });

// const showDashboard = (req, res) => {
//     res.send("je suis sur le dashboard");
// }

// const logout = (req, res) => {
//     req.logout();   // what ?
//     res.redirect('/');
// }
exports.logout = (req, res) => {
    req.logout();   // what ?
    res.redirect('/');
}

// module.exports = {
//     isAuthenticated,
//     getLogin,
//     logout
// }
