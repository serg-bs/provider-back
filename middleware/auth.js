const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
    if (config.AUTH_ENABLED !== 'true') {
        return next();
    }

    const token = req.headers.authorization ? req.headers.authorization.replace(/^Bearer\s+/, "") : null;

    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.clientId = decoded.clientId;
        req.type = decoded.type;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};

module.exports = verifyToken;