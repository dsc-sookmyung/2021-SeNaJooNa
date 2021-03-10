const mongoose = require('mongoose');

const PlaceCommentSchema = mongoose.Schema({
    placeId: {
        type:String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    content: String,
    created_date: {
        type: Date,
        default: Date.now
    }

})

const PlaceComment = mongoose.model('PlaceComment', PlaceCommentSchema, 'PlaceComment');

module.exports = { PlaceComment }