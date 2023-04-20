import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
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


export default mongoose.model('User', UserSchema);