const mongoose = require('mongoose')

const Schema = mongoose.Schema
const RecordSchema = new Schema({
    id: {  // 在需要取出来的值后面加上require
        type: String,
        unique: true,
        require: true
    },
    status: {
        type: String
      },
    target: {
        type: String,
        require: true
    },
    author: {
        type: String
    },
    authorName: {
        type: String
    },
    authorHeader: {
        type: String
    },
    title: {
        type: String
    },
    words: {
        type: String
    },
    images: {
        type: Array
    },
    time: {
        type: String
    },
    publishTime: {
        required: true,
        type: String
    }
}, { collection: 'record', versionKey: false})

module.exports = mongoose.model('record', RecordSchema);