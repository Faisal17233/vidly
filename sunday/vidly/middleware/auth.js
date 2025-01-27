// this will be used to authenticate the user by their jwt when they request any operation
// we will use this middleware in the route handler
const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, "heelo"); // jwtPrivateKey is the private key, which is used to create a jwttoken's signature, we will get it from environment variable
        req.user = decoded; // we are storing the decoded payload in the request object
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}

module.exports = auth;