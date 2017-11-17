let http = require('http');
let url = require('url');
let todayUsers = [];
let cookieCount = 0;

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.writeHead(200, {'Access-Control-Allow-Origin': '*'});

    // let q = url.parse(req.url, true).query;
    // if (q.var === 'inc'){
    //     cookieCount++;
    // }
    // res.end(cookieCount + '');

    let body = "";
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        let params = url.parse('http://ex.com?'+body, true).query;
        if (params.var === 'inc'){
            cookieCount++;
        }
        res.end(cookieCount + '');
    });
}).listen(8080, '192.168.0.93');