
const express = require('express');
const router = express.Router();

const { CollectionLike } = require("../models/CollectionLike");

router.get('/', (req, res) => {
    CollectionLike.find({ userId: req.body.userId }, (err, doc) => {
        if(err) return res.status(500).send(err);
        res.status(200).send({ success: true, doc });
    });
});
