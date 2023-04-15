const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    cardCollection: [
        {
            cardType: {
                type: String,
                required: true
            }
        }
    ]
})

UserSchema.method.addCard = (cardName) => {
    this.cardCollection.push({ cardName });
    return this.save();
}


module.exports = mongoose.model('User', UserSchema);