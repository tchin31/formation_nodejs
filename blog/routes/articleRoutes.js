const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

const Article = require('../models/ArticleModel');


// dashboard
// // isAuthenticated a mettre directement en deuxieme argument (fonction qui passe en callback)
router.get("/dashboard", authController.showDashboard);


module.exports = router;

