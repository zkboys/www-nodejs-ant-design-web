var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');

app.listen(8080);
//io.set('log level', 1);//将socket.io中的debug信息关闭

function handler(req, res) {
    fs.readFile(__dirname + '/index.html', function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
    });
}
var socketObj = null;
console.log(io);
io.sockets.on('connection', function (socket) {
    socketObj = socket;
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
var n = 0;
setInterval(function () {
    if (socketObj) {
        socketObj.emit('news', {hello: 'world' + (n++)});
    }
}, 1000);
