const {Router} = require ('express');
const pokemonsRouter = Router();

pokemonsRouter.get('/',getPokemonsHandler);

pokemonsRouter.get('/:id',getPokemonByIdHandler);

pokemonsRouter.post('/',postPokemonHandler);


module.exports = pokemonsRouter;