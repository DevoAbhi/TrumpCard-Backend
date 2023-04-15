const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
    cardType: {
        type: String,
        required: true
    },
    cardName: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    attributes: [
        {
            name: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model('Card', CardSchema);