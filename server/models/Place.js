const mongoose = require('mongoose');

const PlaceSchema = mongoose.Schema({
    placeKakaoId: {
        type:String
    },
    name: String,
    address: String,
    x: Number,
    y: Number,
    thumbnail: String,
    like_count: {
        type: Number,
        default: 0
    }
})



const Place = mongoose.model('Place', PlaceSchema, 'Place');

module.exports = { Place }