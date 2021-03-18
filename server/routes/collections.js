const express = require('express');
const router = express.Router();
const { Collection } = require('../models/Collection');
const { upload } = require('../middleware/upload');

router.post('/', upload.single('file'), (req, res) => {

    let collection = new Collection(req.body);
    if (req.file !== undefined) {
        collection.thumbnail = req.file.location;

        collection.save((err, collection) => {
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
                success: true,
                collection
            });
        });
    }
    else
        return res.status(400).send("Image Upload failed");

});

router.get("/", (req, res) => {
    if (req.query.user) {
        Collection.find({ 'creator': req.query.user })
            .exec((err, collection) => {
                if (err) return res.status(500).send("Collection Loading failed");
                if (!collection) return res.status(404).send("No Collection");
                res.status(200).send({ success: true, collection });
            })
    }
    else if (req.query.categoryId) {
        Collection.find({ 'categoryId': req.query.categoryId })
            .exec((err, collection) => {
                if (err) return res.status(500).send("Category Collection failed");
                if (!collection) return res.status(404).send("No Collection");
                res.status(200).send({ success: true, collection });
            });
    }
    else {
        Collection.find({}, function (err, Collection) {
            if (err) return res.status(500).send("Collection failed");
            res.status(200).send({ success: true, Collection })
        })
    }
});

router.get("/:id", (req, res) => {
    Collection.findOne({ _id: req.params.id })
        .exec((err, collection) => {
            if (err) return res.status(500).send("Collection read failed");
            if (!collection) return res.status(404).send("No Collection");
            res.status(200).send({ success: true, collection });
        });
});

router.put("/:id", upload.single('file'), (req, res) => {
    let collection = new Collection(req.body);

    if (req.file !== undefined) {
        collection.thumbnail = req.file.location;

    }

    Collection.findByIdAndUpdate({ _id: req.params.id }, collection, { new: true })
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