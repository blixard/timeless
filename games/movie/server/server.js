const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)


// set static folder
app.use(express.static(path.join(__dirname,'../public')))

// run when client connects
io.on('connection', socket=>{
    console.log("connected yoo : " + socket.id )
    socket.emit('message' , 'this is a message')

    socket.on('inputmovie', umovie =>{
        console.log(umovie)
        io.emit('verify_movie' , umovie)
    })

})

// port
const PORT = 3000 || process.env.PORT

server.listen(PORT, ()=>console.log(`server running on port ${PORT}`))