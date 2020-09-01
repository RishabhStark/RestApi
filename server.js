const http=require('http');
const app=require('./app');
const port=process.env.PORT || 3000;
// aceess node js envir var on server
const server=http.createServer(app)
server.listen(port);