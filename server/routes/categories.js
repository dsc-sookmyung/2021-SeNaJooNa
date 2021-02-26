const express = require('express');
const router = express.Router();
const { Category } = require('../models/Category');

router.get("/", (req, res) => {
    Category.find({}, function (err, Category) {
        if (err) return res.status(500).send("Category failed");
        res.status(200).send(Category);
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