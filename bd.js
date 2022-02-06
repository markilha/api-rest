const { Pool } = require("pg");

 var connection = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
});

exports.connection = connection;

exports.execute = (query,params=[])=>{
  return new Promise((resolve,reject)=>{    
    connection.query(query, (error, result) => {
        connection.end;     
        if(error){
          reject(error);
        }else{          
          resolve(result.rows);
        }
    })
  });
}


//module.exports = connection;