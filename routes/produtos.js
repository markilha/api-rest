const express = require("express");
const { route } = require("../app");
const router = express.Router();




//RETORNA TODOS OS PRODUTOS
router.get("/", (req, res, next) => {
  res.status(200).send({
    mensagem: "Usando o GET dentro da rotas de produtos",
  });
});


//INSERI PRODUTOS
router.post("/", (req, res, next) => {

    const produto = {
      nome: req.body.nome,
      preco: req.body.preco
    };

  res.status(201).send({
    mensagem: "Usando o POST dentro da rotas de produtos",
    produtoCriado: produto
  });
});


//RETORNA PRODUTO
router.get("/:id_produto", (req, res, next) => {
  const id = req.params.id_produto;
  if (id === "especial") {
    res.status(200).send({
      mensagem: "Voce descobriu o id especial",
      id: id,
    });
  } else {
    res.status(200).send({
      mensagem: "Voce passou um id: ",
      id: id,
    });
  }
});


//ALTERA UM PRODUTO
router.patch("/", (req, res, next) => {
    res.status(201).send({
      mensagem: "Usando o PATCH dentro da rotas de produtos",
    });
  });


  //DELETA UM PRODUTO
  router.delete("/", (req, res, next) => {
    res.status(201).send({
      mensagem: "Excluindo produtos",
    });
  });

module.exports = router;
