const express = require("express");
const router = express.Router();
const conn = require("../bd");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/cadastro", (req, res, next) => {
  conn.query("SELECT * FROM tbluser;", (error, result) => {
    console.log("passou aqui");
    conn.end;
    if (error) {
      return res.status(500).send({ error: error });
    }
    const response = {
      quantidade: result.rows.length,
      usuarios: result.rows.map((user) => {
        return {
          id: user.userid,
          email: user.useremail,
          request: {
            tipo: "GET",
            descricao: "Retorna todos usuarios cadastradados",
            url: `http://localhost:3000/usuarios/cadastro/${user.userid}`,
          },
        };
      }),
    };
    return res.status(200).send({ response });
  });
});

router.post("/cadastro", (req, res, next) => {
  const { usernome, usersenha, userniv, useremail } = req.body;
  conn.query(
    `SELECT * FROM tbluser WHERE useremail = '${useremail}'`,
    (error, result) => {
      if (error) {
        return res.status(500).send({ error: error });
      }
      if (result.rows.length > 0) {
        return res.status(409).send({ message: "Email já cadastrado!!!" });
      } else {
        bcrypt.hash(usersenha, 5, (errorBcrypt, hash) => {
          if (errorBcrypt) {
            return res.status(500).send({ error: errorBcrypt });
          }
          let stringQuery = `INSERT INTO tbluser (usernome,usersenha,userniv,useremail) VALUES ('${usernome}','${hash}','${userniv}','${useremail}')`;
          console.log(stringQuery);
          conn.query(stringQuery, (error, result) => {
            conn.end;
            if (error) {
              return res.status(500).send({ error: error });
            }
            const response = {
              message: "Usuário criado com sucesso!!!",
              usuarioCriado: {
                userid: result.rows.userid,
                user: usernome,
                email: useremail,
              },
            };
            return res.status(201).send(response);
          });
        });
      }
    }
  );
});

router.post("/login", (req, res, next) => {
  let stringQuery = `SELECT * FROM tbluser WHERE useremail = '${req.body.useremail}'`;
  conn.query(stringQuery, (error, results) => {
    conn.end;
    if (error) {
      return res.status(500).send({ error: error });
    }
    if (results.rows.length < 1) {
      return res.status(401).send({ message: "Falha na autenticação!!!" });
    }

    bcrypt.compare(
      req.body.usersenha,
      results.rows[0].usersenha,
      (err, result) => {
        if (err) {
          return res.status(500).send({ error: err });
        }
        if (result) {
          const token = jwt.sign(
            {
              id_usuario: results.rows[0].userid,
              email: results.rows[0].useremail,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );

          return res
            .status(200)
            .send({ 
              message: "Usuário autenticado com sucesso!!!",
              token: token
             });
        } else {
          return res.status(401).send({ message: "Falha na autenticação!!!" });
        }
      }
    );
  });
});

module.exports = router;
