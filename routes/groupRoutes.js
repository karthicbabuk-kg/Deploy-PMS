const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const db = require('../models/db');



router.post('/add',groupController.addGroup);

// router.get('/get', async (req, res) => {
//     try {
//         const [group] = await db.query('SELECT * FROM grp');
//         res.json(group);
//     } catch (error) {
//         console.error('Database fetch error:', error);
//         res.status(500).send('Server error');
//     }
// });

router.get('/companies', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT company_name FROM companies');
      res.json(rows);
    } catch (error) {
      console.error('Database query error:', error);
      res.status(500).json({ error: 'Database error' });
    }
  });
  router.get('/dept', async (req,res)=>{
    try {
        const [departmentCategories] = await db.query('SELECT departmentCategory FROM employees');
        const [departmentNames] = await db.query('SELECT departmentName FROM employees');
        const [departmentDesignations] = await db.query('SELECT departmentDesignation FROM employees');

        res.json({
            departmentCategories,
            departmentNames,
            departmentDesignations
        });
    } catch (error) {
        console.error('Error fetching department details:', error);
        res.status(500).send('Server error');
    }
  });
  router.get('/employees', groupController.getEmployees);
  router.get('/get', groupController.getGroups);

  router.delete('/groups/delete/:id', (req, res) => {
    const groupId = req.params.id;

    // SQL query to delete the group
    const sql = 'DELETE FROM groups WHERE id = ?';
    db.query(sql, [groupId], (err, result) => {
        if (err) {
            console.error('Error deleting group:', err);
            return res.status(500).send('Server error');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Group not found');
        }

        res.status(200).send('Group deleted');
    });
});


module.exports = router;