const mongoose = require('mongoose');

const PlaceLikeSchema = mongoose.Schema({
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})



const PlaceLike = mongoose.model('PlaceLike', PlaceLikeSchema, 'PlaceLike');

module.exports = { PlaceLike }