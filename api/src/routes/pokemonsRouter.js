const {Router} = require ('express');
const {getPokemonByIdHandler,createPokemonHandler} = require('../handlers/pokemonsHandler');
//getPokemonsHandler,

const pokemonsRouter = Router();

//pokemonsRouter.get('/',getPokemonsHandler);
pokemonsRouter.get('/:id',getPokemonByIdHandler);
pokemonsRouter.post('/',createPokemonHandler);


module.exports = pokemonsRouter;