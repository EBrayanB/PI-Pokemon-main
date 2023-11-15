// Importaciones Necesarias___________________________________________________________________________________________________________

const server = require('./src/app.js');
const { conn } = require('./src/db.js');

//Sincronizando todos los modelos a la vez_________________________________________________________________________________________

conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('Conectada DATABASE');
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
