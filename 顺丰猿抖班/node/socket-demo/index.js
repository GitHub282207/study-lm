const http = require('http')

// 搭建一个web服务
var server = http.createServer(function(req,res){
    if(res.url !== '/favicon.ico'){
        res.writeHead(200,{"Content-type":"text/html"})
    }
})