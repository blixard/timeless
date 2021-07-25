const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const fetch = require('node-fetch');

const app = express()
const server = http.createServer(app)
const io = socketio(server)

var listOfMovies
var movie

var count = Math.floor(Math.random() * 11)
// set static folder
app.use(express.static(path.join(__dirname,'../public')))

fetch('https://api.themoviedb.org/3/discover/movie?api_key=56c5269c916c25edf98a04f984705750&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate')
.then(response => response.json())
.then(data =>{
    listOfMovies = data
    img_no(count , listOfMovies)
})

function img_no(i, list){
    movie = list.results[i] 
}

function verifyMovie(umovie){
    console.log(movie)
    if(movie.title.toString().toLowerCase() == umovie.toString().toLowerCase() ){
        var temp = count 
        while(count == temp){
            count = Math.floor(Math.random() * 11)
            console.log(count)
        }
        img_no(count, listOfMovies)
        return "correct"

    }
    else{
        return "wrong"
    }
}

// run when client connects
io.on('connection', socket=>{
    socket.emit('message' , formatMessage('timelessBOT' , 'welcome everyone'))

    socket.on('inputmovie', umovie =>{
        console.log(umovie)
        var cor = verifyMovie(umovie)
        io.emit('verify_movie' ,formatMessage('USER' , umovie ) )
        io.emit('message', formatMessage('timelessBOT' , cor))
        if(cor == "correct"){
            io.emit('getImage', movie)
        }
    })



    io.emit('getImage', movie)


})






// port
const PORT = 3000 || process.env.PORT

server.listen(PORT, ()=>console.log(`server running on port ${PORT}`))