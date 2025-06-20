var express = require('express');
var router = express.Router();
var db = require('../db');

var
var

router.get('./items',async(req, res) => {
    const [rows] =await db.query(`
        SELECT Dogs.name AS dog_name,
        Dogs.size, User`)
})