var express = require('express');
var router = express.Router();
var db = require('../db');

var
var

router.get('./items',async(req, res) => {
    const [rows] =await db.query(`
        SELECT Dogs.name AS dog_name,
        Dogs.size, Users.username AS owner_username
        From Dogs
        Join Users ON Dogs.owner_id = Users.user_id`);
        res.json(rows);
})