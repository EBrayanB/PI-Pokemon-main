const {Router} = require ('express');
const {getPokemonsHandler,getPokemonByIdHandler,postPokemonHandler} = require('../handlers/pokemonsHandler');

const pokemonsRouter = Router();

pokemonsRouter.get('/',getPokemonsHandler);
pokemonsRouter.get('/:id',getPokemonByIdHandler);
pokemonsRouter.post('/',postPokemonHandler);


module.exports = pokemonsRouter;