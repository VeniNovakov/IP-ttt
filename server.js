const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
var users = [];

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {

  socket.on('identify', (id, callback) => {
    console.log('ID:', id);

    if (users.length === 0) {
      users.push(id);
      callback({
        message: 'u1',
        status: 'ok'
      });
    } else if (users[0] !== id) {
      users.push(id);
      callback({
        message: 'u2',
        status: 'ok'
      });
    }

    
  });

  socket.on('place', ({ cellId, figure }) => {
    console.log(`Placing ${figure} in cell ${cellId}`);
    
    io.emit('placeFigure', { cellId, figure });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
