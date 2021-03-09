const express = require('express');
const router = express.Router();
const { Collection } = require('../models/Collection');
const { upload } = require('../middleware/upload');

router.post('/', upload.single('file'), (req, res) => {

    let collection = new Collection(req.body);
    collection.thumbnail = req.file.location;

    collection.save((err, collection) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
            collection
        });
    });

});

router.get("/", (req, res) => {
    Collection.find({}, function (err, Collection) {
        if (err) return res.status(500).send("Collection failed");
        res.status(200).send({ success: true, Collection })
    })
});

router.get("/category/", (req, res) => {
    Collection.find({ 'categoryId': req.query.categoryId })
        .exec((err, collection) => {
            if (err) return res.status(500).send("Category Collection failed");
            if (!collection) return res.status(404).send("No Collection");
            res.status(200).send({ success: true, collection });
        });
});

router.get("/:id", (req, res) => {
    Collection.findOne({ _id: req.params.id })
        .exec((err, collection) => {
            if (err) return res.status(500).send("Collection read failed");
            if (!collection) return res.status(404).send("No Collection");
            res.status(200).send({ success: true, collection });
        });
});

router.put("/:id", (req, res) => {
    Collection.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .exec((err, collection) => {
            if (err) return res.status(500).send("Collection Update failed");
            res.status(200).send({ success: true, collection });;
        })
})

router.delete("/:id", (req, res) => {
    Collection.findByIdAndDelete({ _id: req.params.id })
        .exec((err, collection) => {
            if (err) return res.status(500).send("Collection Delete failed");
            res.status(200).send({ success: true });
        })
})

module.exports = router;