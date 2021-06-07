const jwt = require('jsonwebtoken');

exports.tokenVerify = function (req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err) throw new Error('You need generete a token at -> http://localhost:3000/v1/token');
        req.userId = decoded.userId;
        next();
    } )
};
