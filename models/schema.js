const mongo = require('mongoose')
const schema = new mongo.Schema({
    title:{
        type: String,
        required: true,
    },
    budget:{
        type: Number,
        required: true,
    },
    color:{
        type: String,
        required: true,
        match: /^#[0-9A-Fa-f]{6}$/,
    }
},{collection: 'nbadDb'})

module.exports = mongo.model('nbadDb', schema)