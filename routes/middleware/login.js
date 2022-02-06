const jwt = require('jsonwebtoken');

exports.obrigatorio =(req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1];    
    try{
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.usuario = decode;
        next();
    }catch(error){
        return res.status(401).send({
            message: 'Token incorreto!!!'
        })
    }
}

exports.opcional =(req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1];    
    try{
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.usuario = decode;
        next();
    }catch(error){
       next();
    }
}