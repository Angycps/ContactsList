const app = require('./app');
const http = require('http');


const server = http.createServer(app);

server.listen(3007, () => {
    console.log('El servidor esta corriendo');
})