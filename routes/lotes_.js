var conn = require("../bd");
module.exports = {
  getLotes() {
    return new Promise((resolve, reject) => {
      let stringQuery = "SELECT * FROM tblimo ORDER BY imogeo;";
      conn.query(stringQuery, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          resolve(results.rows);
        }
      });
    });
  },
  getLote(geo) {
    return new Promise((resolve, reject) => {
      let stringQuery = `SELECT * FROM tblimo WHERE imogeo = '${geo}';`;
      conn.query(stringQuery, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          resolve(results.rows);
        }
      });
    });
  },
  deleteLote(id) {
    return new Promise((resolve, reject) => {
      let stringQuery = `DELETE FROM tblimo WHERE imoid = ${id};`;
      conn.query(stringQuery, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          resolve({ "result":"Lote deletado com sucesso" });
        }
      });
    });
  },
  insertLote(req) {
    const { imoset, imoqua, imolot } = req.body;
    let stringQuery = `INSERT INTO tblimo (imoset,imoqua,imolot) VALUES ('${imoset}',${imoqua}',${imolot}',)`;
    return new Promise((resolve, reject) => {
      conn.query(stringQuery, (err, results)=>{
        if(err){
          console.log(err);
        }else{
          resolve({"result":"Lote inserido com sucesso!!!"})
        }
      })
    });   
  },
  updateLote(req) {
    const {imoid, imoset, imoqua, imolot } = req.body;
    let stringQuery = `UPDATE tblimo SET (imoset='${imoset}',imoqua,imolot) WHERE imoid = ${imoid}`;
    return new Promise((resolve, reject) => {
      conn.query(stringQuery, (err, results)=>{
        if(err){
          console.log(err);
        }else{
          resolve({"result":"Lote atualizado com sucesso!!!"})
        }
      })
    });   
  }
}

 
