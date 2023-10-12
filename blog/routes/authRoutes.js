const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// page connexion
router.get("/login", authController.getLogin);
// router.post("/login", authController.postLogin);
// router.get('/dashboard', authController.showDashboard);

module.exports = router;
