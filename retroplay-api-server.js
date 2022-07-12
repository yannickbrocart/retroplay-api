// importe du package HTTP natif de Node
const http = require('http');

// import de l'application retroplay-api-app js
const app = require('./retroplay-api-app');

// configure le port pour l'application express
app.set('port', process.env.PORT || 3000);

// passage de l'application retroplay-api-app.js à la fonction de serveur
const server = http.createServer(app);

// configure le serveur pour qu'il écoute la variable d'environnement du port ou le port 3000
server.listen(process.env.PORT || 3000);