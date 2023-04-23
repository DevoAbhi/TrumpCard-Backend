import Card from "../models/Card.js";

export const postCardDeckHandler = async (req, res, next) => {
    const cardType = req.body.cardType;


    const { player1Deck, player2Deck } = await allotCards(cardType);

    if (player1Deck.length === 0 || player2Deck.length === 0) {
        res.status(500).json({
            success: false,
            message: "kuch galti ho gaya"
        })
    }

    return res.status(200).json({
        message: "ho gaya bhai, maje kar",
        player1Deck,
        player2Deck
    })
}

const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}

const allotCards = async (cardType) => {
    try {
        let player1Deck = [];
        let player2Deck = [];
        const cardDeck = await Card.find({ cardType }).lean();
        shuffleArray(cardDeck);
        const n = cardDeck.length;

        for (let i = 0; i < n / 2; i++) {
            const cardItem = cardDeck[i];
            const card = {};
            card.name = cardItem.cardName;
            card.imageUrl = cardItem.imageUrl;
            card.attributes = cardItem.attributes;

            player1Deck.push(card);
        }
        for (let i = n / 2; i < n; i++) {
            const cardItem = cardDeck[i];
            const card = {};
            card.name = cardItem.cardName;
            card.imageUrl = cardItem.imageUrl;
            card.attributes = cardItem.attributes;

            player2Deck.push(card);
        }

        console.log(player1Deck.length);
        console.log(player2Deck.length);

        return { player1Deck, player2Deck };



    }
    catch (err) {
        return res.status(500).json({
            message: "card nikal nahi paya bhai, fir se karo",
            error: err
        })
    }

}