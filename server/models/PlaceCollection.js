const mongoose = require('mongoose');

const PlaceCollectionSchema = mongoose.Schema({
    placeId: {
        type:String
    },
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
    }
})



const PlaceCollection = mongoose.model('PlaceCollection', PlaceCollectionSchema, 'PlaceCollection');

module.exports = { PlaceCollection }