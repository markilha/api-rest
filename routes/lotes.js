const express = require("express");
const router = express.Router();
const conn = require('../bd');




// //RETORNA TODOS OS PRODUTOS
// router.get("/", (req, res, next) => {
//   res.status(200).send({
//     mensagem: "Usando o GET dentro da rotas de produtos",
//   });
// });


//INSERI LOTES
router.post("/", (req, res, next) => {
  
  const { imoset, imoqua, imolot } = req.body;
  let stringQuery = `INSERT INTO tblimo (imoset,imoqua,imolot) VALUES ('${imoset}','${imoqua}','${imolot}')`;
  conn.query(stringQuery, (error, results)=>{
    console.log(conn.status)
    conn.end;
    if(error){
     return res.status(500).send({
        error: error,
        response: null
      })
    }
    res.status(201).send({
      mensagem: "Lote inserido com sucesso!!!",
      loteCriado: results.imoid
    });
  })  
});


// //RETORNA PRODUTO
// router.get("/:id_produto", (req, res, next) => {
//   const id = req.params.id_produto;
//   if (id === "especial") {
//     res.status(200).send({
//       mensagem: "Voce descobriu o id especial",
//       id: id,
//     });
//   } else {
//     res.status(200).send({
//       mensagem: "Voce passou um id: ",
//       id: id,
//     });
//   }
// });


// //ALTERA UM PRODUTO
// router.patch("/", (req, res, next) => {
//     res.status(201).send({
//       mensagem: "Usando o PATCH dentro da rotas de produtos",
//     });
//   });


//   //DELETA UM PRODUTO
//   router.delete("/", (req, res, next) => {
//     res.status(201).send({
//       mensagem: "Excluindo produtos",
//     });
//   });

module.exports = router;
