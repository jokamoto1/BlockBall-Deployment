// server.js
const express = require('express');
// const { Socket } = require('socket.io');
const app = express();
 
const server = app.listen(8000,"0.0.0.0",() =>
  console.log('The server is all fired up on port 8000')
);

// To initialize the socket, we need to
// invoke the socket.io library
// and pass it our Express server
const io = require('socket.io')(server, { cors: true });

io.on("connection", socket =>{

    socket.on("positionFromClient", data =>{
      socket.broadcast.to(data[6]).emit("positionFromServer", data)
      // console.log(data)
    }),
    socket.on("startGameFromClient", (data) =>{
      io.to(data).emit("startGameFromServer")
      // console.log(data)
    })
    
    socket.on("roomFromClient", async(room) =>{
      socket.join(room)
      // if (sockets.length < 2){
      const clients = await io.sockets.adapter.rooms.get(room);
      const sockets = [...clients]
      if (sockets.length > 2){
        socket.emit("leave")
        socket.disconnect()
      }
    })
    
     
    // console.log(socketArr)
    socket.on("connectionFromClient", async(room) =>{
      const clients = await io.sockets.adapter.rooms.get(room);
      const sockets = [...clients]

      io.to(room).emit("socketArrFromServer", sockets)
    })
    socket.on('disconnect', () => {
      io.emit('leaverFromServer', socket.id)
    
    })

})