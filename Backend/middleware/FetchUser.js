var jwt = require('jsonwebtoken');
const jwtToken = 'qwertyUIOP@asdfgHJKL#zxcv$bnm';

const fetchUser = (req, res, next) => {
    const token = req.header('authToken');
    if (!token) {
        return res.status(401).send({error: "Please authenticate by using valid token!!!"});
    }
    try {
        const data = jwt.verify(token, jwtToken);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate by using valid token!!!"});
    }
};

module.exports = fetchUser;