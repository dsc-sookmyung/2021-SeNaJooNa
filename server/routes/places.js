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

router.post("/", (req, res) => {
    const placeCollection = new PlaceCollection(req.body);

    placeCollection.save((err, pcollection) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
            pcollection
        });
    });
});

router.delete("/:placeId/:collectionId", (req, res) => {

    placeCollection.deleteOne({ placeId:req.params.placeId, collectionId:req.params.collectionId }, function (err) {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    })
});

module.exports = router;