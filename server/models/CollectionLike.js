const mongoose = require('mongoose');

const CollectionLikeSchema = mongoose.Schema({
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})



const CollectionLike = mongoose.model('CollectionLike', CollectionLikeSchema, 'CollectionLike');

module.exports = { CollectionLike }