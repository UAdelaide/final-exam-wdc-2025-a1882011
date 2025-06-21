const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Dogs');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});
//add dog name
router.get('/dogname', async(req, res) => {
  const userid = req.query.user_id;
  console.log('userid from session:', userid);

  try{
    const[rows] = await db.query("SELECT dog_id, name FROM Dogs WHERE owner_id =?",
      [userid]);
    res.json(rows);
  }catch (error) {
    res.status(500).json({error: "Failed"});
  }
});


module.exports = router;