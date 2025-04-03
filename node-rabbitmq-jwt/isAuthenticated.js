const jwt = require("jsonwebtoken");

module.exports = async function isAuthenticated(req, res, next) {
    var token =  req.headers["authorization"];
    if (!token) return res.status(400).send("Authorization is required");
 
    if (token.length > 1) {
       token = token.split(" ")[1];
    } else {
       return res.status(400).send("Token is missing");
    }
    
    jwt.verify(token, "secret", (err, user) => {
        if (err) {
            return res.json({ message: err });
        } else {
            req.user = user;
            next();
        }
    });

};
