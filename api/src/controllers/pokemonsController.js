const axios = require('axios');
const { Pokemon, Type } = require('../db');

const getPokemonApi = async () => {
    const infoApi = (await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100')).data.results;
    
    const allPokemonsApi = await Promise.all(infoApi.map(async (p) => {
        const pokemonData = (await axios.get(p.url)).data;
        return {
            id: pokemonData.id,
            name: pokemonData.name,
            img: pokemonData.sprites.other.dream_world.front_default,
            hp: pokemonData.stats[0].base_stat,
            attack: pokemonData.stats[1].base_stat,
            defense: pokemonData.stats[2].base_stat,
            speed: pokemonData.stats[5].base_stat,
            height: pokemonData.height,
            weight: pokemonData.weight,
            types: pokemonData.types.map((t) => ({
                name: t.type.name,
            })),
        };
    }));

    return allPokemonsApi;
};

const getPokemonsDb = async () => {
    const response = await Pokemon.findAll({
        include: {
            attributes: ['name'],
            model: Type,
            through: {
                attributes: [],
            },
        }
    });
    return response;
};

const getAllPokemons = async () => {
    const pokemonApi = await getPokemonApi();
    const pokemonDb = await getPokemonsDb();
    return [...pokemonApi, ...pokemonDb];
};

const getPokemonByName = async (name) => {
    const res = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)).data;
    if (res) {
        return [{
            id: res.id,
            name: res.name,
            img: res.sprites.other.dream_world.front_default,
            hp: res.stats[0].base_stat,
            attack: res.stats[1].base_stat,
            defense: res.stats[2].base_stat,
            speed: res.stats[5].base_stat,
            height: res.height,
            weight: res.weight,
            types: res.types.map((t) => ({
                name: t.type.name,
            })),
        }];
    } else {
        throw Error('No existe un Pokemon con ese nombre');
    }
};

const getPokemonById = async (id) => {
    if (isNaN(id)) {
        const response = await Pokemon.findOne({ where: { id } });
        return response;
    }
    const res = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data;
    return {
        id: res.id,
        name: res.name,
        img: res.sprites.other.dream_world.front_default,
        hp: res.stats[0].base_stat,
        attack: res.stats[1].base_stat,
        defense: res.stats[2].base_stat,
        speed: res.stats[5].base_stat,
        height: res.height,
        weight: res.weight,
        types: res.types.map((t) => ({
            name: t.type.name,
        })),
    };
};

const postPokemon = async (name, img, hp, attack, defense, speed, height, weight, type = 'unknown') => {
    if (!name || !img || !hp || !attack || !defense) {
        throw Error('Campos obligatorios están vacíos');
    }
    const pokemon = await Pokemon.create({ name, img, hp, attack, defense, speed, height, weight });
    const typee = type.split(',');
    typee.map(async (t) => {
        const types = await Type.findOne({ where: { name: t } });
        pokemon.addType(types);
    });
    return pokemon;
};

module.exports = {
    getAllPokemons,
    getPokemonById,
    getPokemonByName,
    postPokemon,
};