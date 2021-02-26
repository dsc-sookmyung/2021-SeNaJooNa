const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = Schema({
    categoryID: {
        type: String,
    },
    title: {
        type: String,
    },

    thumbnail: {
        type: String
    }
});

const Category = mongoose.model('Category', categorySchema, 'Category');

module.exports = { Category };