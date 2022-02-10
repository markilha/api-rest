const express = require("express");
const conn = require("../bd");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.getUsers = async (req, res, next) => {
  try {
    const results = await conn.execute("SELECT * FROM tbluser;");
    const response = {
      quantidade: results.length,
      usuarios: results.map((user) => {
        return {
          id: user.userid,
          nome: user.usernome,
          email: user.useremail,  
          nivel: user.userniv,           
          request: {
            tipo: "GET",
            descricao: "Retorna todos usuarios cadastradados",
            url: `http://localhost:3000/usuarios/cadastro/${user.usedi}`,
          },
        };
      }),
    };
    return res.status(200).send({ response });
  } catch (error) {
    return res.status(500).send({ message: `Erro: ${error}` });
  }
}

exports.postUsers = async (req, res, next) => {
  try {
    const { usernome, usersenha, userniv, useremail } = req.body;
    const results = await conn.execute("SELECT * FROM tbluser;");

    bcrypt.hash(usersenha, 5, (errorBcrypt, hash) => {
      if (errorBcrypt) { return res.status(500).send({ error: errorBcrypt }); }
      let stringQuery = `INSERT INTO tbluser (usernome,usersenha,userniv,useremail) VALUES ('${usernome}','${hash}','${userniv}','${useremail}')`;
      conn.execute(stringQuery).then((dados) => {

        const response = {
          message: "Usuário criado com sucesso!!!",
          usuarioCriado: {
            userid: dados.userid,
            user: usernome,
            email: useremail,
          },
        };
        return res.status(201).send(response);
      })
        .catch((err) => {
          return res.status(401).send({ message: "Ops, ocorreu um erro: " + err });
        });
    })

  } catch (error) {
    return res.status(500).send({ message: `Erro: ${error}` });
  }

}

exports.authUser = async (req, res, next) => {
  try {    
    const results = await conn.execute(`SELECT * FROM tbluser WHERE useremail = '${req.body.useremail}'`);  

    console.log(results)

    bcrypt.compare(req.body.usersenha, results[0].usersenha, (err, result) => {
      if (err) { return res.status(500).send({ error: err }); }
      if (result) {
        const token = jwt.sign(
          {
            id_usuario: results[0].userid,
            email: results[0].useremail,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "8h",
          }
        );

        return res.status(200).send({
          id:results[0].userid,
          nome:results[0].usernome,
          email:results[0].useremail,
          nivel:results[0].userniv,
          token: token
        });
      } else {
        return res.status(401).send({ message: "Falha na autenticação!!!" });
      }
    }
    );
  } catch (error) {
    return res.status(500).send({ message: `Erro: ${error}` });
  }

}