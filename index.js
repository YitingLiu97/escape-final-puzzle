let port = process.env.PORT || 80;
let express = require('express');
let app = express();
let server = require('http').createServer(app).listen(port, function () {
  console.log('Server listening at port: ', port);
});

let io = require('socket.io').listen(server);

io.sockets.on('connection',
  function (socket) {

    console.log("We have a new client: " + socket.id);

    socket.on('command', function (command) {
      io.sockets.emit('command', command);
    });

    socket.on('disconnect', function () {
      console.log("Client has disconnected " + socket.id);
    });
  }
);

app.use(express.static('public'));