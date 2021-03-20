const express = require('express');
const router = express.Router();
const { PlaceComment } = require("../models/PlaceComment");
const { auth } = require("../middleware/auth");

router.get("/:placeId", (req, res) => {
    PlaceComment.find({ placeId: req.params.placeId }).populate({path:'userId', select:'name'}).sort('-created_date').exec((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send(doc);
    });
});

router.post("/", auth, (req, res) => {
    const comment = new PlaceComment({ ...req.body, userId:req.user._id });

    comment.save((err, comment) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
            comment
        });
    });
});

router.put("/:commentId", (req, res) => {
    PlaceComment.findOneAndUpdate({ _id:req.params.commentId }, { content: req.body.content }, {new:true}, function (err, comment) {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
            comment
        });
    })
});

router.delete("/:commentId", (req, res) => {

    PlaceComment.deleteOne({ _id:req.params.commentId }, function (err) {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    })
});

module.exports = router;