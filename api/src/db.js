//IMPORTACIONES NECESARIAS________________________________________________________________________________________________________________________________

require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

//Conexion sequelize con la DB___________________________________________________________________________________________________________________________

const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
   {
      logging: false, // Establezca en console.log para ver las consultas SQL sin procesar.
      native: false, // le permite a Sequelize saber que podemos usar pg-native para ~30% más de velocidad
   }
);

//____________________________________________________________________________________________________________________________________________________________

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
   .filter(
      (file) =>
         file.indexOf('.') !== 0 &&
         file !== basename &&
         file.slice(-3) === '.js'
   )
   .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, '/models', file)));
   });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
   entry[0][0].toUpperCase() + entry[0].slice(1),
   entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Pokemon, Type } = sequelize.models;

// Relaciones de muchos a muchos__________________________________________________________________________________________________________________________

Pokemon.belongsToMany(Type,{through: 'PokemonType'});
Type.belongsToMany(Pokemon,{through: 'PokemonType'});

//____________________________________________________________________________________________________________________________________________________________
// Product.hasMany(Reviews);

module.exports = {
   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
