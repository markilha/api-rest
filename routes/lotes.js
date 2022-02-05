const express = require("express");
const router = express.Router();
const conn = require("../bd");

router.get("/", (req, res, next) => {
  conn.query("SELECT * FROM tblimo;", (error, results) => {
    conn.end;
    if (error) {
      return res.status(500).send({ error: error });
    }
    res.status(200).send({ response: results.rows });
  });
});

router.post("/", (req, res, next) => {
  const { imoset, imoqua, imolot } = req.body;
  let stringQuery = `INSERT INTO tblimo (imoset,imoqua,imolot) VALUES ('${imoset}','${imoqua}','${imolot}')`;
  conn.query(stringQuery, (error, results) => {
    conn.end;
    if (error) {
      return res.status(500).send({ error: error });
    }
    res.status(201).send({ mensagem: "Lote Inserido com sucesso!!!" });
  });
});

router.get("/:id_lote", (req, res, next) => {
  const id = req.params.id_lote;
  conn.query(`SELECT * FROM tblimo WHERE imoid = ${id};`, (error, results) => {
    conn.end;
    if (error) {
      return res.status(500).send({ error: error });
    }
    res.status(200).send({ response: results.rows });
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
    res.status(201).send({ mensagem: "Lote Atualizado com sucesso!!!" });
  });
});

router.delete("/",(req,res,next)=>{
  const id = req.body.imoid;
  let stringQuery = `DELETE FROM tblimo WHERE imoid = ${id};`;
  conn.query(stringQuery, (error, results) => {
    conn.end;
    if (error) {
      return res.status(500).send({ error: error });
    }
    res.status(201).send({ mensagem: "Lote Deletado com sucesso!!!" });
  });
});

module.exports = router;
