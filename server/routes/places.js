const express = require('express');
const router = express.Router();
const { PlaceCollection } = require('../models/PlaceCollection');
const { Place } = require('../models/Place');

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

    PlaceCollection.findOneAndDelete({ placeId:req.params.placeId, collectionId:req.params.collectionId }, function (err, place) {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
            place
        });
    })
});

router.delete("/creator/:placeId/:collectionId", (req, res) => {

    PlaceCollection.deleteMany({ placeId:req.params.placeId }, function (err) {
        if (err) return res.json({ success: false, err });
        Place.findByIdAndDelete(req.params.placeId)
        .exec((err, place) => {
            if (err) return res.status(500).send("Place Delete failed");
            res.status(200).send({ success: true, place });
        })
    })
});

module.exports = router;