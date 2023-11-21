const {getPokemonByIdController, createPokemonController} = require('../controllers/pokemonsController');
// getAllPokemons, getPokemonById, getPokemonByName, postPokemon 

//Ruta por ID
const getPokemonByIdHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "bdd" : "api"; 
    try {
        const pokemonid = await getPokemonByIdController(id , source);
        res.status(200).json(pokemonid);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//Ruta para creacion
const createPokemonHandler = async (req, res) => {
    const { name, img, hp, attack, defense, speed, height, weight, type } = req.body;
    try {
        const createPokemon = await createPokemonController(name, img, hp, attack, defense, speed, height, weight, type);
        res.status(201).json(createPokemon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// const getPokemonsHandler = async (req, res) => {
//     const { name } = req.query;
//     try {
//         if (name) {
//             const response = await getPokemonByName(name);
//             res.status(200).json(response);
//         }
//         const response = await getAllPokemons();
//         res.status(200).json(response);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };



module.exports = {
 //   getPokemonsHandler,
    getPokemonByIdHandler,
    createPokemonHandler,
};