const express = require('express');
const router = express.Router();
const { Place } = require("../models/Place");

router.get("/:placeId", (req, res) => {
    Place.findOne({ placeKakaoId: req.params.placeId }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send(doc);
    });
});

router.post("/", (req, res) => {
    req.body.forEach(element => {
        Place.findOneAndUpdate({placeKakaoId: element.id}, {
            placeKakaoId: element.id,
            name: element.place_name,
            address: element.address_name,
            x: element.x,
            y: element.y
        }, {upsert: true}
        , (err) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).send({ success: true });
        })


    });
});

module.exports = router;