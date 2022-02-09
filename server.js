const http = require('http');
const app = require('./app')
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port,function(){
    console.log(`Server running o port: ${5000}`)
});

