const express = require('express');
const router = express.Router();
const { Place } = require("../models/Place");

router.get("/:collectionId", (req, res) => {
    Place.find({ collectionId: req.params.collectionId }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send(doc);
    });
});

router.post("/", (req, res) => {

    const place = new Place(req.body);

    place.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.delete("/", (req, res) => {

    Place.deleteOne({ placeId:req.query.placeId, collectionId:req.query.collectionId }, function (err) {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    })
});

module.exports = router;