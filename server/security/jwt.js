const jwt = require('jsonwebtoken');

exports.tokenVerify = function (req, res, next) {
    const token = req.headers['x-access-token'];
    try {
        jwt.verify(token, global.SECRET, (err, decoded) => {
            if (err) throw new Error('You need generete a token at -> http://localhost:3000/token');
            req.userId = decoded.userID;
        } )
    } catch (e) {
        next(e);
    }
    
};

