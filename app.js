const http = require('http');

const server =http.createServer((req, res)=>{
    if(req.url==='/'){
        res.write("Hey there you are in root");
        res.end();
    }
    if(req.url==='/customers'){
        res.write("Yayy!! You have made it to customers section");
        res.end();
    }
});

server.listen(1234);