const express = require('express');
const router = express.Router();
const taskController = require('../controllers/extaskController');
const db = require('../models/db');

// Define the route to handle the task form submission
router.post('/add', taskController.addTask);
router.get('/get', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM executiveTask'); // Replace with your actual SQL query
        res.json(rows);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).send('Server error');
    }
});

router.get('/get',taskController.getexecutiveDetail);

module.exports = router;
