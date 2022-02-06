const express = require("express");
const conn = require("../bd");

exports.getLotes = (req, res, next) => {
  conn
    .execute("SELECT * FROM tblimo")
    .then((result) => {
      const response = {
        quantidade: result.length,
        lotes: result.map((lote) => {
          return {
            imoid: lote.imoid,
            imoset: lote.imoset,
            imoqua: lote.imoqua,
            imolot: lote.imolot,
            request: {
              tipo: "GET",
              descricao: "Retorna todos lotes cadastradados",
              url: `http://localhost:3000/lotes/${lote.imoid}`,
            },
          };
        }),
      };
      return res.status(200).send({ response });
    })
    .catch((err) => {
      return res.status(500).send({ erro: err });
    });
};

exports.getLoteId = (req, res, next) => {
  const id = req.params.id_lote;
  conn
    .execute(`SELECT * FROM tblimo WHERE imoid = ${id};`)
    .then((result) => {
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
    })
    .catch((err) => {
      return res
        .status(404)
        .send({ message: "Não foi encontrado lote com este id!!!" });
    });
};

exports.pathLote = (req, res, next) => {
  const { imoid, imoset, imoqua, imolot } = req.body;
  let stringQuery = `UPDATE tblimo SET 
      imoset = '${imoset}',
      imoqua = '${imoqua}',
      imolot = '${imolot}'
      WHERE imoid = ${imoid}`;
  conn
    .execute(stringQuery)
    .then((result) => {
      const response = {
        message: "Lote atualizado com sucesso",
        lote: {
          id: imoid,
          setor: imoset,
          quadra: imoqua,
          lote: imolot,
          request: {
            tipo: "GET",
            descricao: "Lote atualizado com sucesso!!!",
            url: `http://localhost:3000/lotes/${imoid}`,
          },
        },
      };
      return res.status(202).send(response);
    })
    .catch((err) => {
      return res.status(500).send({ erro: err });
    });
};

exports.deleteLote = (req, res, next) => {
  const id = req.body.imoid;
  let stringQuery = `DELETE FROM tblimo WHERE imoid = ${id};`;
  conn
    .execute(stringQuery)
    .then((result) => {
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
    })
    .catch((err) => {
      return res.status(500).send({ erro: err });
    });
};

