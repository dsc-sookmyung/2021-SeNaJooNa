const express = require('express');
const router = express.Router();
const { Place } = require("../models/Place");
const { auth } = require("../middleware/auth");
const { upload } = require('../middleware/upload');


router.post('/', auth, upload.array('file'), (req, res) => {

    let place = new Place(req.body);
    if (req.files !== undefined) {
        place.thumbnail = req.files.map(img => img.location);
        place.creator = req.user._id

        place.save((err, place) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true,
                place
            });
        });
    }
    else
        return res.status(400).send("Image Upload failed");

});

router.get("/", (req, res) => {
    Place.find({}, function (err, place) {
        if (err) return res.status(500).send("Place failed");
        res.status(200).send({ success: true, place })
    })
});

router.get("/:id", (req, res) => {
    Place.findOne({ _id: req.params.id })
        .exec((err, place) => {
            if (err) return res.status(500).send("Place read failed");
            if (!place) return res.status(404).send("No Place");
            res.status(200).send({ success: true, place });
        });
});

router.put("/:id", upload.array('file'), (req, res) => {
    let place = {};

    place.thumbnail = req.body.existed ? req.body.existed : []
    if (req.files !== undefined) {
        req.files.map(img => place.thumbnail.push(img.location))
    }
    console.log(place)
    
    Place.findByIdAndUpdate({ _id: req.params.id }, place, { new: true })
        .exec((err, place) => {
            // console.log(err)
            if (err) return res.status(500).send("Place Update failed");
            res.status(200).send({ success: true, place });;
        })
})

router.delete("/:id", (req, res) => {
    Place.findByIdAndDelete({ _id: req.params.id })
        .exec((err, place) => {
            if (err) return res.status(500).send("Place Delete failed");
            res.status(200).send({ success: true });
        })
})

module.exports = router;