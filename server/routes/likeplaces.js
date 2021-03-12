const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const { PlaceLike } = require("../models/PlaceLike");
const { Place } = require('../models/Place');
const { auth } = require("../middleware/auth");

router.get('/', auth, (req, res) => {
    // PlaceLike.find({ userId: req.user._id }, function(err, doc) {
    //     if (err) return res.json({ success: false, err });
    //     return res.status(200).json(doc);
    // })
    PlaceLike.find({ userId: req.user._id }).populate('placeId').exec( (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send(doc);
    })
})

router.get('/:placeId', auth, (req, res) => {
    PlaceLike.findOne({ userId:req.user._id, placeId:req.params.placeId }, function(err, doc) {
        if (err) return res.json({ success: false, err });
        if(doc)
            return res.status(200).json({ success: true, like: true });
        return res.status(200).json({ success:true, like: false})
    })
})

router.get('/count/:placeId', (req, res) => {
    PlaceLike.find({ placeId: req.params.placeId }, function(err, doc) {
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
        PlaceLike.countDocuments({placeId: req.body.placeId}).then((count)=>{
            Place.findOneAndUpdate({_id: req.body.placeId}, {$set : {like_count: count}}, (err, doc)=>{
                console.log(err)
                return res.status(200).json({
                    success: true
                });
            })
        })
    });
});

router.delete("/:placeId", auth, (req, res) => {

    PlaceLike.deleteOne({ placeId:req.params.placeId, userId:req.user._id }, function (err) {
        if (err) return res.json({ success: false, err });
        PlaceLike.countDocuments({placeId: req.body.placeId}).then((count)=>{
            Place.findOneAndUpdate({_id: req.body.placeId}, {$set : {like_count: count}}, (err, doc)=>{
                console.log(err)
                return res.status(200).json({
                    success: true
                });
            })
        })
    })
});

module.exports = router;