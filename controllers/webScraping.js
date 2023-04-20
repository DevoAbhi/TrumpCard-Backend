import axios from 'axios';
import Card from '../models/Card.js';

export const postScraping = async (req, res, next) => {
    try {

        const url = "https://www.superheroapi.com/api.php/906299160624055/search/";
        // const url = "https://pokeapi.co/api/v2/pokemon/";

        const arr = [  "Iron Man",  "Captain America",  "Thor",  "Hulk",  "Black Widow",  "Hawkeye",  "Vision",  "Scarlet Witch",  "Ant-Man",  "Wasp",  "Black Panther",  "Captain Marvel",  "Falcon",  "War Machine",  "Winter Soldier",  "Spider-Man",  "Doctor Strange",  "Quicksilver",  "Maria Hill",  "Nick Fury",  "Peggy Carter",  "Hank Pym",  "Janet van Dyne",  "Heimdall",  "Wong",  "Okoye",  "Shuri",  "Korg",  "Gamora",  "Nebula",  "Mantis",  "Drax the Destroyer",  "Star-Lord",  "Rocket Raccoon",  "Groot",  "The Ancient One",  "Rescue",  "Sif",  "Yondu Udonta",  "Grandmaster",  "Skurge",  "Eitri",  "Jane Foster",  "Agent Coulson",  "Luis",  "Happy Hogan",  "Jimmy Woo",  "Valentina Allegra de Fontaine",  "U.S. Agent",  "Erik Selvig"];
        // const arr = ["Pikachu", "Charizard", "Mewtwo", "Blastoise", "Venusaur", "Gyarados", "Dragonite", "Rayquaza", "Lugia", "Ho-Oh", "Typhlosion", "Tyranitar", "Salamence", "Metagross", "Garchomp", "Lucario", "Zoroark", "Greninja", "Incineroar", "Eevee", "Vaporeon", "Jolteon", "Flareon", "Espeon", "Umbreon", "Leafeon", "Glaceon", "Sylveon", "Snorlax", "Gengar", "Alakazam", "Machamp", "Scyther", "Lapras", "Aerodactyl", "Kangaskhan", "Tauros", "Mew", "Celebi", "Jirachi", "Eternatus", "Dialga", "Palkia", "Giratina", "Arceus", "Zekrom", "Reshiram", "Kyurem", "Xerneas", "Yveltal"];
        const avengerNames = arr.map(name => name.toLowerCase());

        for (const avengerName of avengerNames) {

            let newUrl = url + avengerName;
            let res;
            try {

                res = await axios.get(newUrl);
                const avenger = res.data;

                const name = avengerName;
                const imageUrl = avenger.results[0].image.url;
                const stats = avenger.results[0].powerstats;
                const attributes = [];

                for (const item in stats) {
                    const attribute = {};
                    attribute.name = item;
                    attribute.value = stats[item];

                    attributes.push(attribute);
                }



                const card = new Card({
                    cardType: "avengers",
                    cardName: name,
                    imageUrl,
                    attributes
                })

                try {


                    const response = await card.save();
                    console.log("Added card", response);
                }
                catch (err) {
                    console.log("Error -> ", err);

                }
        // const pokemonNames = arr.map(name => name.toLowerCase());
        // for (const pokemonName of pokemonNames) {
        //     let newUrl = url + pokemonName;
        //     let res;
        //     try {

        //         res = await axios.get(newUrl);
        //         const pokemon = res.data;

        //         const name = pokemon.name;
        //         const imageUrl = pokemon.sprites.front_default;
        //         const stats = pokemon.stats;
        //         const attributes = [];

        //         for (const item of stats) {
        //             const attribute = {};
        //             attribute.name = item.stat.name;
        //             attribute.value = item.base_stat;

        //             attributes.push(attribute);
        //         }

        //         const card = new Card({
        //             cardType: "pokemon",
        //             cardName: name,
        //             imageUrl,
        //             attributes
        //         })

        //         try {


        //             const response = await card.save();
        //             console.log("Added card", response);
        //         }
        //         catch (err) {
        //             console.log("Error -> ", err);

        //         }

            }

            catch (err) {
                console.log("Error abhinab", err);
            }







        }

        res.status(200).json({
            message: "success"
        })

    }
    catch (err) {
        console.log("Error main -> ", err)

    }

}