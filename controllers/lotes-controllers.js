const express = require("express");
const conn = require("../bd");

exports.getLotes = async (req, res, next) => {
  const {query} = req.body; 
  try {   
    const results = await conn.execute(query);  
    const response ={
      lotes: results
    } 
    return res.status(200).send({ response });
  } catch (error) {
    return res.status(500).send({ message: `Erro: ${error}` });
  }
};

exports.getLoteId = async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await conn.execute(`SELECT * FROM tblimo WHERE imoid = ${id};`); 
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ message: `Erro: ${error}` });
  }
};

exports.pathLote = async (req, res, next) => {
  try {
    const {query} = req.body;    
    console.log(query)
    const result = await conn.execute(query);
    const response = { 
      message: "Cadastro Atualizado com Sucesso!!!"          
      };   
    return res.status(202).send(response.message);
   
  } catch (error) {
    return res.status(500).send({ message: `Erro: ${error}` });
  }
};


exports.deleteLote = async (req, res, next) => {
  try {
    const id = req.params.id;
    let stringQuery = `DELETE FROM tblimo WHERE imoid = ${id};`;
    const result = await conn.execute(stringQuery);
    const response = {
      message: "Lote deletado com sucesso"      
    };
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ message: `Erro: ${error}` });
  }
};

