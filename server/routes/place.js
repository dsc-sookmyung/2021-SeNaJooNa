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
    function addNewPlace(place) {
        return new Promise(function(resolve, reject){
            Place.findOneAndUpdate({placeKakaoId: place.id}, {
                placeKakaoId: place.id,
                name: place.place_name,
                address: place.address_name,
                x: place.x,
                y: place.y
            }, {upsert: true, new:true, setDefaultsOnInsert: true}, (err, doc) =>{
                if (err) return reject(err);
                resolve(doc)
            } )
        })
    }
    Promise.all(req.body.map(addNewPlace)).then((result)=>{return res.status(200).send(result)})
});

module.exports = router;