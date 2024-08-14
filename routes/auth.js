const express = require('express');
const path = require('path');
const router = express.Router();
const authController = require('../controllers/authController');
const app = express();

router.get('/authenticate', authController.authenticateUser);
app.use(express.static(path.join(__dirname, 'public')));

router.get('/admin', authController.ensureAuthenticated, (req, res) => {
    if (req.session.user.role === 'admin') {
        res.sendFile(path.join(__dirname, '..', 'public', 'ADMIN', 'home.html'));
    } else {
        res.redirect('/');
    }
});

router.get('/tl', authController.ensureAuthenticated, (req, res) => {
    if (req.session.user.role === 'tl') {
        res.sendFile(path.join(__dirname, '..','public', 'TL', 'home.html'));
    } else {
        res.redirect('/');
    }
});

router.get('/executive', authController.ensureAuthenticated, (req, res) => {
    if (req.session.user.role === 'executive') {
        res.sendFile(path.join(__dirname, '..','public', 'EXECUTIVE', 'home.html'));
    } else {
        res.redirect('/');
    }
});

module.exports = router;
