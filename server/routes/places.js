const express = require('express');
const router = express.Router();
const { PlaceCollection } = require('../models/PlaceCollection');

router.get("/:collectionId", (req, res) => {
    PlaceCollection.find({collectionId: req.params.collectionId})
    .populate('placeId')
    .exec( (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send(doc);
    })
});

module.exports = router;