const {JWT_SECRET} = require('./config');
const jwt = require('jsonwebtoken');

const authMiddleware = (req,res,next) => {
    const authHeader = req.header.authorization;

    if(!authHeader || !authHeader.startWith('Bearer ')){
        return res.status(403).json({

        })
    }

    const token = authHeader.split(' ')[1];

    try{
        const decode = jwt.verify(token, JWT_SECRET);

        if(decode.userId){
            req.userId = decode.userId;
            next();
        } else {
            return res.status(403).json({})
        }
    }catch (err){
        return res.status(403).json({})
    }
};

module.exports = {
    authMiddleware
}