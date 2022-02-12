const express = require("express");
const conn = require("../bd");

exports.getLotes = async (req, res, next) => {
  try {
    const results = await conn.execute("SELECT * FROM tblimo;");    
    const response = {
      quantidade: results.length,
      lote: results.map((lote) => {
        return {
          imoid: lote.imoid,
          imoset: lote.imoset,
          imoqua: lote.imoqua,
          imolot: lote.imolot        
        };
      }),
    };
    return res.status(200).send({ response });

  } catch (error) {
    return res.status(500).send({ message: `Erro: ${error}` });
  }
};

exports.getLoteId = async (req, res, next) => {
  try {
    const id = req.params.id_lote;
    const result = await conn.execute(`SELECT * FROM tblimo WHERE imoid = ${id};`);
    const response = {
      lote: {
        id: result[0].imoid,
        setor: result[0].imoset,
        quadra: result[0].imoqua,
        lote: result[0].imolot,
        request: {
          tipo: "GET",
          descricao: "Retorna um lote especifico!!!",
          url: `http://localhost:3000/lotes}`,
        },
      },
    };
    return res.status(200).send(response);
  } catch (error) {
    return res.status(500).send({ message: `Erro: ${error}` });
  }
};

exports.pathLote = async (req, res, next) => {
  try {
    const { imoid, imoset, imoqua, imolot } = req.body;
    let stringQuery = `UPDATE tblimo SET 
        imoset = '${imoset}',
        imoqua = '${imoqua}',
        imolot = '${imolot}'
        WHERE imoid = ${imoid}`;
    const result = await conn.execute(stringQuery);
    const response = { 
        id: imoid,
        setor: imoset,
        quadra: imoqua,
        lote: imolot       
      };   
    return res.status(202).send(response);
  } catch (error) {
    return res.status(500).send({ message: `Erro: ${error}` });
  }
};

exports.deleteLote = async (req, res, next) => {
  try {
    const id = req.body.imoid;
    let stringQuery = `DELETE FROM tblimo WHERE imoid = ${id};`;
    const result = await conn.execute(stringQuery);
    const response = {
      message: "Lote deletado com sucesso",
      request: {
        tipo: "POST",
        descricao: "Lote deletado com sucesso!!!",
        url: `http://localhost:3000/lotes`,
        body: {
          imoid: "number",
          imoset: "string",
          imoqua: "string",
        },
      },
    };
    return res.status(201).send(response);
  } catch (error) {
    return res.status(500).send({ message: `Erro: ${error}` });
  }
};

