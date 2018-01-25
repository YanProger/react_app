let http = require('http');
let url = require('url');

let todayUsers = [];
let clicker;
let cookieCount = 0;

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.writeHead(200, {'Access-Control-Allow-Origin': '*'});

    let remIP = req.connection.remoteAddress;

    let body = "";
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        let params = url.parse('http://ex.com?'+body, true).query;
        params.remIP = remIP;
        let r = JSON.stringify( getAnswer(params));
        res.end(r);
    });
//}).listen(8080, '192.168.0.103');
}).listen(8080, '192.168.1.70');

function getAnswer(params) {
    if (params.t){
        switch(params.t){
            case 'login':
                if (!getUser(params.remIP)){
                    todayUsers.push({
                        name: params.n,
                        uid: params.remIP
                    });
                    return{
                        code: 0,
                        message: 'new user added',
                        object: todayUsers[todayUsers.length - 1]
                    }
                } else {
                    return{
                        code: 1,
                        message: 'this user already logged in!',
                        object: null
                    }
                }
            case 'inc':
                if (getUser(params.remIP)){
                    cookieCount++;
                    let usr = getUser(params.remIP);
                    clicker = usr ? usr.name : undefined;
                    return{
                        code: 0,
                        message: 'increased',
                        object: {
                            cc: cookieCount,
                            un: clicker || ''
                        }
                    };
                }
                else{
                    return{
                        code: 1,
                        message: 'you need to login!',
                        object: null
                    }
                }

            case 'check':
            default:
                if (getUser(params.remIP)){
                    return{
                        code: 0,
                        message: 'current value',
                        object: {
                            cc: cookieCount,
                            un: clicker || ''
                        }
                    };
                } else{
                    return{
                        code: 1,
                        message: 'you need to login!',
                        object: null
                    }
                }
        }
    }
}

function getUser(uid) {
    return todayUsers.find(function (item) {
        return item.uid === uid;
    });
}