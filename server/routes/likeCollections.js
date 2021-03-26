const express = require('express');
const router = express.Router();
const { CollectionLike } = require('../models/CollectionLike');
const { Collection } = require('../models/Collection');
const { auth } = require('../middleware/auth');
//로그인한 사람이 좋아요를 누른 목록
router.get('/', auth, (req, res) => {
  CollectionLike.find({ userId: req.user._id })
    .populate('collectionId')
    .exec((err, doc) => {
      if (err) return res.json({ success: false, err });
      // console.log(doc);
      return res.status(200).send(doc);
    });
});

//해당 콜렉션 좋아요를 눌렀는지
router.get('/:userId/:collectionId', (req, res) => {
  // console.log(req.body);
  CollectionLike.findOne(
    { userId: req.params.userId, collectionId: req.params.collectionId },
    function (err, doc) {
      if (err) return res.status(500).send({ success: false, err });
      else if (!doc)
        return res.status(200).json({ success: false, like: false });
      return res.status(200).json({ success: true, like: true });
    }
  );
});

//좋아요 하기
router.post('/', (req, res) => {
  const collectionLike = new CollectionLike(req.body);
  console.log(collectionLike);
  collectionLike.save((err, like) => {
    if (err) return res.json({ success: false, err });
    Collection.findByIdAndUpdate(
      { _id: req.body.collectionId },
      {
        $inc: {
          like: 1,
        },
      },
      { new: true }
    ).exec((err, doc) => {
      if (err) return res.status(500).send(err);
      res.status(200).send({ success: true, doc });
    });
    // return res.status(200).json({
    //     success: true,
    // });
  });
});

//좋아요 취소
router.delete('/', (req, res) => {
  CollectionLike.deleteOne(req.body, (err, doc) => {
    if (err) return res.json({ success: false, err });
    Collection.findByIdAndUpdate(
      { _id: req.body.collectionId },
      {
        $inc: {
          like: -1,
        },
      },
      { new: true }
    ).exec((err, doc) => {
      if (err)
        return res.status(500).json({ message: 'Like Update failed', err });
      res.status(200).send({ success: true, doc });
    });
    // return res.status(200).json({
    //     success: true
    // })
  });
});

module.exports = router;
