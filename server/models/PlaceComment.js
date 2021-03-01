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
    },
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
    },

})

PlaceCommentSchema.pre('save', function(next){
    now = new Date();
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

const PlaceComment = mongoose.model('PlaceComment', PlaceCommentSchema, 'PlaceComment');

module.exports = { PlaceComment }