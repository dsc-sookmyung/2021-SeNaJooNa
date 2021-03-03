const express = require('express');
const router = express.Router();
const { PlaceCollection } = require("../models/PlaceCollection");
const mongoose = require('mongoose');
const { Place } = require('../models/Place');

router.get("/:collectionId", (req, res) => {
    PlaceCollection.find({collectionId: mongoose.Types.ObjectId(req.params.collectionId)})
    .populate('placeId').exec( (err, doc) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send(doc);
        })
});

router.post("/", (req, res) => {

    const place = new PlaceCollection(req.body);

    place.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.delete("/:collectionId/:placeId", (req, res) => {

    PlaceCollection.deleteOne({ placeId:req.params.placeId, collectionId:req.params.collectionId }, function (err) {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    })
});

module.exports = router;