const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = Schema({
    //front쪽 local에 저장되어 있음
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
    },
    //나중에 따로 처리 경로만 저장
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
    },
    like: {
        type: Number,
        default: 0
    }
});

const Collection = mongoose.model('Collection', collectionSchema, 'Collection');

module.exports = { Collection };