const express = require("express");
const app = express();
const morgan = require("morgan");
var cors = require('cors')
const bodyParser = require("body-parser");

const rotaLotes = require("./routes/lotes");
const rotaUsers = require("./routes/users");


app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false })); //apenas dados simpres
app.use(bodyParser.json()); //jsona de entrada jsonno

app.use((req, res,next)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","*");
  res.header("Access-Control-Allow-Methods","*"); 
  app.use(cors());
  next();
})


app.use("/lotes", rotaLotes);
app.use("/usuarios",rotaUsers);


app.use((req, res, next) => {
  const erro = new Error("Ops! Página não encontrado...");
  erro.status = 404;
  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.message,
    },
  });
});

module.exports = app;
