const express = require('express');
const router = express.Router();
const { Place } = require('../models/Place');

router.get("/:collectionId", (req, res) => {
    Place.find({collectionId: req.params.collectionId})
    .exec( (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send(doc);
    })
});

module.exports = router;