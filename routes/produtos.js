const express = require('express');
const { route } = require('../app');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).send({
        mensagem: 'Usando o GET dentro da rotas de produtos'
    })
});

router.post('/',(req,res,next)=>{
    res.status(201).send({
        mensagem: 'Usando o POST dentro da rotas de produtos'
    })
});

router.get('/:id_produto',(req,res,next)=>{
    const id = req.params.id_produto;
    if(id==='especial'){
        res.status(200).send({
            mensagem: 'Voce descobriu o id especial',
            id: id
        });
    }else{
        res.status(200).send({
            mensagem: 'Voce passou um id: ',
            id: id
        });
    }  
});

module.exports= router;