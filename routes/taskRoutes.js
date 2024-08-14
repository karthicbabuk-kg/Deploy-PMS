const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const taskController = require('../controllers/taskController');
const db = require('../models/db')

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const currentDate = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        const originalName = file.originalname; // Original file name
        cb(null, `${currentDate}-${originalName}`);
    }
});

const upload = multer({ storage: storage });

// Route to add a task
router.post('/add', upload.single('ATK_DOC'), taskController.addTask);

// Route to get tasks
router.get('/get', taskController.getTasks);

// Route to delete a task
router.delete('/:id', taskController.deleteTask);

router.get('/tasks', async (req, res) => {
    try {
        const [tasks] = await db.query('SELECT * FROM tasks');
        res.json(tasks);
    } catch (error) {
        console.error('Database fetch error:', error);
        res.status(500).send('Server error');
    }
});

// router.get('/tasks', async (req, res) => {
//     try {
//         const query = `
//             SELECT t.task_id, t.file, t.remarks, t.status, g.executive_name, c.company_name
//             FROM tasks t
//             JOIN grp g ON t.executive_id = g.executive_id
//             JOIN grp c ON t.company_id = c.company_id
//         `;
//         const [rows] = await db.query(query);
//         res.json(rows);
//     } catch (error) {
//         console.error('Error fetching tasks:', error);
//         res.status(500).send('Server error');
//     }
// });

module.exports = router;
