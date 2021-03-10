const express = require('express');
const router = express.Router();
const { Category } = require('../models/Category');

router.get("/", (req, res) => {
    Category.find({}, function (err, categories) {
        if (err) return res.status(500).send("Category failed");
        res.status(200).send(categories);
    });
});

router.get("/title", (req, res) => {
    Category.find({}, { "title": true, "_id": true }, function (err, categories) {
        if (err) return res.status(500).send("Category failed");
        res.status(200).send({
            success: true,
            categories
        });
    });
});

router.post("/", (req, res) => {

    const category = new Category(req.body);

    category.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

module.exports = router;