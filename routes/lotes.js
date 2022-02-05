const express = require("express");
const router = express.Router();
const conn = require("../bd");

router.get("/", (req, res, next) => {
  conn.query("SELECT * FROM tblimo;", (error, results) => {
    conn.end;
    if (error) {
      return res.status(500).send({ error: error });
    }
    const response = {
      quantidade: results.rows.length,
      lotes: results.rows.map((lote) => {
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
  });
});

router.post("/", (req, res, next) => {
  const { imoset, imoqua, imolot } = req.body;
  let stringQuery = `INSERT INTO tblimo (imoset,imoqua,imolot) VALUES ('${imoset}','${imoqua}','${imolot}')`;
  conn.query(stringQuery, (error, result) => {
    conn.end;
    if (error) {
      return res.status(500).send({ error: error });
    }
    const response = {
      message: "Lote inserido com sucesso",
      loteCriado: {
        imoid: result.imoid,
        setor: imoset,
        quadra: imoqua,
        lote: imolot,
        request: {
          tipo: "POST",
          descricao: "Lote cadastrado com sucesso!!!",
          url: `http://localhost:3000/lotes`,
        },
      },
    };
    return res.status(201).send(response);
  });
});

router.get("/:id_lote", (req, res, next) => {
  const id = req.params.id_lote;
  conn.query(`SELECT * FROM tblimo WHERE imoid = ${id};`, (error, result) => {
    conn.end;
    if (error) {
      return res.status(500).send({ error: error });
    }
    if (result.rows.length == 0) {
      return res.status(404).send({
        message: "Não foi encontrado lote com este id!!!",
      });
    }
    const response = {
      lote: {
        id: result.rows[0].imoid,
        setor: result.rows[0].imoset,
        quadra: result.rows[0].imoqua,
        lote: result.rows[0].imolot,
        request: {
          tipo: "GET",
          descricao: "Retorna um lote especifico!!!",
          url: `http://localhost:3000/lotes}`,
        },
      },
    };
    return res.status(200).send(response);
  });
});

router.patch("/", (req, res, next) => {
  const { imoid, imoset, imoqua, imolot } = req.body;
  let stringQuery = `UPDATE tblimo SET 
  imoset = '${imoset}',
  imoqua = '${imoqua}',
  imolot = '${imolot}'
  WHERE imoid = ${imoid}`;

  conn.query(stringQuery, (error, results) => {
    conn.end;
    if (error) {
      return res.status(500).send({ error: error });
    }
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
  });
});

router.delete("/", (req, res, next) => {
  const id = req.body.imoid;
  let stringQuery = `DELETE FROM tblimo WHERE imoid = ${id};`;
  conn.query(stringQuery, (error, results) => {
    conn.end;
    if (error) {
      return res.status(500).send({ error: error });
    }
    const response = {
      message: 'Lote deletado com sucesso',
      request: {
        tipo: "POST",
        descricao: "Lote deletado com sucesso!!!",
        url: `http://localhost:3000/lotes`,
        body:{
          imoid: 'number',
          imoset: 'string',
          imoqua: 'string'
        }
      },
    }
   return res.status(201).send(response);
  });
});

module.exports = router;
