const mongoose = require('mongoose');

const PlaceSchema = mongoose.Schema({
    name: String,
    address: String,
    thumbnail: [String],
    description: String,
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    like_count: {
        type: Number,
        default: 0
    }
})



const Place = mongoose.model('Place', PlaceSchema, 'Place');

module.exports = { Place }