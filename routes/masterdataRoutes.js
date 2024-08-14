const express = require('express');
const router = express.Router();
const masterDataController = require('../controllers/masterdataController')
const db = require('../models/db')

// Route to handle creating master data
router.post('/masterdata', masterDataController.createMasterData);
router.get('/get', (req, res) => {
    const sqlQuery = 'SELECT * FROM masterdata'; // Replace 'master_data' with your actual table name
    db.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.render('masterdata', { data: results });
    });
});

module.exports = router;
