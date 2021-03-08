const mongoose = require('mongoose');

const CollectionLikeSchema = mongoose.Schema({
    collectionId: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const CollectionLike = mongoose.model('CollectionLike', CollectionLikeSchema, 'CollectionLike');

module.exports = { CollectionLike };