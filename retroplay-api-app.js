// importe de l'application express
const express = require('express');
const app = express();

app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !' });
});

// export de l'application retroplay-api-app.js
module.exports = app;