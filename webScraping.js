import axios from 'axios';
import Card from './models/Card';

const url = "https://pokeapi.co/api/v2/pokemon/";

const arr = [  "Pikachu",  "Charizard",  "Mewtwo",  "Blastoise",  "Venusaur",  "Gyarados",  "Dragonite",  "Rayquaza",  "Lugia",  "Ho-Oh",  "Typhlosion",  "Tyranitar",  "Salamence",  "Metagross",  "Garchomp",  "Lucario",  "Zoroark",  "Greninja",  "Incineroar",  "Eevee",  "Vaporeon",  "Jolteon",  "Flareon",  "Espeon",  "Umbreon",  "Leafeon",  "Glaceon",  "Sylveon",  "Snorlax",  "Gengar",  "Alakazam",  "Machamp",  "Scyther",  "Lapras",  "Aerodactyl",  "Kangaskhan",  "Tauros",  "Mew",  "Celebi",  "Jirachi",  "Deoxys",  "Dialga",  "Palkia",  "Giratina",  "Arceus",  "Zekrom",  "Reshiram",  "Kyurem",  "Xerneas",  "Yveltal"];
let i = 0;

(async () => {
    const pokemonNames = arr.map(name => name.toLowerCase());
    for(const pokemonName of pokemonNames) {
        i++;
        let newUrl = url + pokemonName;
        const res = await axios.get("https://www.superheroapi.com/api.php/906299160624055/search/Black%20Widow");


        const pokemon = res.data;

        console.log(pokemon.results[0].image.url);
        console.log(pokemon.results[0].powerstats);

        const name = pokemon.name;
        const imageUrl = pokemon.sprites.front_default;
        const stats = pokemon.stats;

        const attributes = [];

        for(const item of stats) {
            const attribute = {};
            attribute.name = item.stat.name;
            attribute.value = item.base_stat;

            attributes.push(attribute);
        }

        const card = ({
            cardType: "pokemon",
            cardName: name,
            imageUrl,
            attributes
        })

        try{

            const response = await card.save();
            console.log("Added card", response);

        }
        catch(err) {
            console.log("Error -> ", err);
        }





        if(i===3 ) break;
    }
})();