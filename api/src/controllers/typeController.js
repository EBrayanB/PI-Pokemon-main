const { Type } = require('../db');
const axios = require('axios');

const getTypes = async () => {
    const typesdb = await Type.findAll();
    if (typesdb.length) {
        return typesdb;
    } else {
        const types = (await axios.get('https://pokeapi.co/api/v2/type')).data.results.map((t) => { return { name: t.name } });
        try {
            await Type.bulkCreate(types);
        } catch (error) {
            console.error('Error al crear tipos en la base de datos:', error);
        }
        return await Type.findAll();
    }
};

module.exports = {
    getTypes,
};