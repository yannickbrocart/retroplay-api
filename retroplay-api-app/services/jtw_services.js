// Chargement des modules
const express = require('express')
const jwt = require('jsonwebtoken')
const connection = require("./mysql_connection");
const req = require("express/lib/request");
const res = require("express/lib/response");

require('dotenv').config();
const jwtExpirySeconds = 60;          // 1 heure
const jwtRefreshExpirySeconds = 86400;  // 1 jour
const refreshTokens = [];
var user = null;

// initialisation de Express
const app = express();


// activation des modules importés
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// liste des utilisateurs
const users = [
    {
        user_id: 1,
        user_name: 'retroplay',
        user_password: '8i7F1vB&%KVbSifi'
    },
    {
        user_id: 2,
        user_name: 'public',
        user_password: 'Hv7b8CH5sEfhJCqQ'
    }
];


// register
async function jwtRegister(login, res) {
    // si pas d'information à traiter
    if (!login.username || !login.password) {
        return res.status(400).json({ message: 'Erreur. Entrez un identifiant et un mot de passe' })
    }
    // vérifications
    const userExisting = users.find(u => u.user_name === login.username)
    // si mauvaises informations
    if (userExisting) {
        return res.status(400).json({ message: `Erreur. Utilisateur ${login.username} existe déjà` })
    }
    // nouvel utilisateur
    const id = users[users.length - 1].id + 1
    const newUser = {
        user_id: id,
        user_name: login.username,
        user_password: login.password
    }
    // insertion dans le tableau des utilisateurs
    users.push(newUser);
    return res.status(201).json({ message: `Utilisateur ${id} créé` })
}


// login
async function jwtLogin(login, res) {
    // si pas d'information à traiter
    if (!login.username || !login.password) {
        return res.status(400).json({ message: 'Erreur. Entrez un identifiant et un mot de passe' })
    }
    // vérifications
    user = users.find(u => u.user_name === login.username && u.user_password === login.password)
    // si mauvaises informations
    if (!user) {
        return res.status(400).json({ message: 'Erreur. Mauvais identifiant ou mot de passe' })
    }
    // login utilisateur
    const accessToken = jwt.sign(
        { user_id: user.user_id,
          user_name: user.user_name },
        process.env.ACCESS_TOKEN_SECRET,
        { algorithm: 'HS256' },
        { expiresIn: '60s' })
    const refreshToken = jwt.sign(
        { user_id: user.user_id,
          user_name: user.user_name },
        process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken);
    return res.status(201).json({ accessToken, refreshToken })
}


// récupération du header bearer
const extractBearerToken = function(headerValue) {
    if (typeof headerValue !== 'string') {
        return false
    }
    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}


// vérification du token
async function checkTokenMiddleware(req, res) {
    // récupération du token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization);
    // présence d'un token
    if (!token) {
        return res.status(401).json({ message: 'Erreur. Un jeton est nécessaire' })
    }
    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403).json({ message: 'Erreur. Un jeton d\'actualisation est nécessaire' });
    }
    // véracité du token
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET_TOKEN_SECRET, { algorithm: 'HS256' }, function(err, user) {
        if (err) {
            return res.status(403).json({message: 'Erreur. Mauvais jeton'})
        }
        // vérifications
        user = users.find(u => u.user_name === req.body.username && u.user_password === req.body.password);
        // login utilisateur
        const accessToken = jwt.sign(
            { user_id: user.user_id,
                user_name: user.user_name },
            process.env.ACCESS_TOKEN_SECRET,
            { algorithm: 'HS256' },
            { expiresIn: '60s' });
       res.status(200).json({ accessToken });
        });
}


// vérification des routes avec le token
async function checkTokenForRoutes(req) {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization);
    const decoded = jwt.decode(token, { complete: false });
    return decoded;
}


module.exports = {
    jwtRegister,
    jwtLogin,
    checkTokenForRoutes,
    checkTokenMiddleware
}