const express = require('express');
const router = express.Router();

const { PlaceLike } = require("../models/PlaceLike");
const { auth } = require("../middleware/auth");

router.get('/', auth, (req, res) => {
    PlaceLike.findOne({ userId:req.user._id, placeId:req.query.placeId }, function(err, doc) {
        if (err) return res.json({ success: false, err });
        return res.status(200).json(doc);
    })
})

router.get('/getPlaces', auth, (req, res) => {
    PlaceLike.find({ userId:req.user._id }, function(err, doc) {
        if (err) return res.json({ success: false, err });
        return res.status(200).json(doc);
    })
})

router.get('/count', (req, res) => {
    PlaceLike.find({ placeId: req.query.placeId }, function(err, doc) {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            count: doc.length
        });
    })
})

router.post("/", auth, (req, res) => {
    req.body.userId = req.user._id
    const placeLike = new PlaceLike(req.body);

    placeLike.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.delete("/", auth, (req, res) => {

    PlaceLike.deleteOne({ placeId:req.query.placeId, userId:req.user._id }, function (err) {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    })
});