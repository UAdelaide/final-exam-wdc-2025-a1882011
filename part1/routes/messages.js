var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/dogs',async(req, res) => {
    const [rows] =await db.query(`
        SELECT Dogs.name AS dog_name,
        Dogs.size, Users.username AS owner_username
        From Dogs
        Join Users ON Dogs.owner_id = Users.user_id`);
        res.json(rows);
});

router.get('/walkrequests/open',async(req, res) => {
    const[rows] = await db.query(`
        SELECT  WalkRequests.request_id, Dogs.name As dog_name,  WalkRequests.requested_time,
        WalkRequests.duration_minutes,  WalkRequests.location, Users.username As owner_username
        From  WalkRequests
        Join Dogs ON  WalkRequests.dog_id=Dogs.dog_id
        Join Users ON Dogs.owner_id = Users.user_id
        Where  WalkRequests.status = 'open'`);
        res.json(rows);
});

router.post('/message', async(req, res) => {
    const {request_id, walker_id, owner_id, rating, comments} = req.body;
    await db.query(`INSERT INTO WalkRatings(request_id, walker_id, owner_id, rating, comments)
        VALUES(?,?,?,?,?)`,[request_id, walker_id, owner_id, rating, comments]);
        res.status(201).json({message: "Message sent!"});
});

router.get('/walkers/summary', async(req, res) => {
    const[rows] = await db.query(`
        SELECT U.username AS walker_username,
               COUNT(r.rating_id) AS total_ratings,
               AVG(r.rating_id) AS average_rating,
               COUNT(wr.request_id) AS completed_walks From Users U
        JOIN WalkRequests wr ON U.user_id = wr.walker_id
        JOIN WalkRatings r on wr.request_id = r.request_id
        WHERE wr.status = 'completed'
        GROUP BY
        U.username`);
});
module.exports = router;