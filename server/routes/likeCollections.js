const express = require('express');
const router = express.Router();
const { CollectionLike } = require("../models/CollectionLike");
const { Collection } = require("../models/Collection");

//로그인한 사람이 좋아요를 누른 목록
router.get('/', (req, res) => {

    CollectionLike.find({ userId: req.body.userId }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
            doc
        });
    });
});

//해당 콜렉션 좋아요를 눌렀는지
router.get('/:collectionId', (req, res) => {
    CollectionLike.findOne({ userId: req.body._id, placeId: req.params.collectionId }, function (err, doc) {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, like: true });
    })
})

//좋아요 하기
router.post('/', (req, res) => {
    const collectionLike = new CollectionLike(req.body);

    collectionLike.save((err, like) => {
        if (err) return res.json({ success: false, err });
        Collection.findByIdAndUpdate({ _id: req.body.collectionId },
            {
                $inc: {
                    "like": 1
                }
            }, { new: true })
            .exec((err, doc) => {
                if (err) return res.status(500).send("Like Update failed");
                res.status(200).send({ success: true, doc });;
            });
        // return res.status(200).json({
        //     success: true,
        // });
    });



});

//좋아요 취소
router.delete('/', (req, res) => {
    CollectionLike.deleteOne(req.body, (err, doc) => {
        if (err) return res.json({ success: false, err })
        Collection.findByIdAndUpdate({ _id: req.body.collectionId },
            {
                $inc: {
                    "like": -1
                }
            }, { new: true })
            .exec((err, doc) => {
                if (err) return res.status(500).send("Like Update failed");
                res.status(200).send({ success: true, doc });;
            });
        // return res.status(200).json({
        //     success: true
        // })
    })
})

module.exports = router;

