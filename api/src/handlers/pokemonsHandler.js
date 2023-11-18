const {getAllPokemons,getPokemonById,getPokemonByName,postPokemon} = require('../controllers/pokemonsController')

// Handler trae por nombre y ejecuta funcion del controlador 

const getPokemonsHandler = async (req,res) => {
    const {name} = req.query;
    console.log(name);
    try {
        if (name){
            const res = await getPokemonByName(name);
            return res.status(200).json(res);
        }
        const res = await getAllPokemons()
        res.status(200).json(res)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Hanlder por id llamando a la funcion del controlador 

const getPokemonByIdHandler = async(req,res)=>{
    const {id} = req.params;
    try {
        const res = await getPokemonById(id);
        res.status(200).json(res);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

// Handler que llama y ejecuta la funcion del controller post 

const postPokemonHandler = async(req,res) =>{
    const {name,img.hp,attack,defense,speed,heigth,weigth,type} = req.body;
    try {
        const res = await postPokemon(name,img.hp,attack,defense,speed,heigth,weigth,type);
        res.status(2001).json(res);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}


// Exporto 

module.exports ={
    getPokemonsHandler,
    getPokemonByIdHandler,
    postPokemonHandler,
}
