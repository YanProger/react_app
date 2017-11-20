let http = require('http');
let url = require('url');

let todayUsers = [];
let lastUser;
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
        let r = getAnswer(params);
        res.end(r);
    });
}).listen(8080, 'localhost');

function getAnswer(params) {
    if (params.t){
        let answer = {};
        switch(params.t){
            case 'login':
                todayUsers.push(params.n);
                answer = {
                    id: todayUsers.indexOf(todayUsers[todayUsers.length - 1])
                };
                return JSON.stringify( answer);
            case 'inc':
                answer = {
                    cc: cookieCount++
                };
                return JSON.stringify( answer);
            case 'check':
            default:
                answer = {
                    cc: cookieCount++,
                    un: todayUsers[parseInt( params.uid)]
                };
                return JSON.stringify( answer);
        }
    }
}
