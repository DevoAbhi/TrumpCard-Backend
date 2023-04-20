import mongoose from "mongoose";
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

export default mongoose.model('Card', CardSchema);