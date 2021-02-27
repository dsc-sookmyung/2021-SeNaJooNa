const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
    },
    thumbnail: {
        type: String
    },
    content: {
        type: String,
    },
    color: {
        type: String,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }
});

const Collection = mongoose.model('Collection', collectionSchema, 'Collection');

module.exports = { Collection };