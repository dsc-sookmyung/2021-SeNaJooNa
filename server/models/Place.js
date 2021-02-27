const mongoose = require('mongoose');

const PlaceSchema = mongoose.Schema({
    placeId: {
        type:String
    },
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
    },
    thumbnail: String
})



const Place = mongoose.model('Place', PlaceSchema, 'Place');

module.exports = { Place }