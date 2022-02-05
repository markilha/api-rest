const express = require("express");
const { route } = require("../app");
const router = express.Router();


//RETORNA TODOS OS PRODUTOS
router.get("/", (req, res, next) => {
  res.status(200).send({
    mensagem: "Usando o GET dentro da rotas de pedidos",
  });
});


//INSERI PRODUTOS
router.post("/", (req, res, next) => {
  const pedido = {
    id_produto: req.body.id_produto,
    quantidade: req.body.quantidade
  }

  res.status(201).send({
    mensagem: "Usando o POST dentro da rotas de pedidos",
    pedidoCriado: pedido
  });
});


//RETORNA PRODUTO
router.get("/:id_pedido", (req, res, next) => {
  const id = req.params.id_pedido;
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
      mensagem: "Usando o PATCH dentro da rotas de pedidos",
    });
  });


  //DELETA UM PRODUTO
  router.delete("/", (req, res, next) => {
    res.status(201).send({
      mensagem: "Usando o DELETE dentro da rotas de pedidos",
    });
  });

module.exports = router;
