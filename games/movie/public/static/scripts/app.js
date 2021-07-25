
const socket = io()
const {username , room} = Qs.parse(location.search, {
    ignoreQueryPrefix:true
})

var movie
var res 
var list
var c = 0
var img 


// message from server
socket.on('message' , message =>{
    outputmsg(message)
    // verifyMovie(message)
})

// message from server that contains the movie name 
socket.on('verify_movie' , message =>{
    console.log("vmovie " +  message)
    outputmsg(message)
})


// function correctAns(){
//     outputmsg("correct")
//     socket.emit('correctness',"correct")

// }

// function wrongAns(){
//     socket.emit('correctness',"wrong")
// }

// puts msg in the DOM
function outputmsg(msg){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${msg.username}<span>${msg.time}</span></p>
    <p class="text">
    ${msg.text}
    </p>`;
    document.getElementById('dis_msg').appendChild(div);
}



window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    img = document.createElement('img'); 
    img.src = '../res/tbz logo.png'
    document.getElementById('image_id').appendChild(img);
//   fetch('https://api.themoviedb.org/3/discover/movie?api_key=56c5269c916c25edf98a04f984705750&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate')
//   .then(response => response.json())
//   .then(data =>{
//       list = data
//       img_no(c++)  
//   })

  

    //   input
    var input = document.getElementById("input_id");

    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.key === 'Enter') {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("sbtn_id").click();
    }
    });

    socket.on('getImage', m=>{
        movie = m
        loadImg(movie)
    })


});

// when the user enters the submit button , takes the input from user
function sbtn_fun(){
    var umovie = document.getElementById("input_id").value
    document.getElementById("input_id").value = ""
    
    socket.emit('inputmovie', umovie)
}


// function img_no(i){
//     movie = list.results[i] 
//     load_img(movie)
// }

function loadImg(m){
        // getting the poster and movie name using themoviedb api
    fetch('https://api.themoviedb.org/3/search/movie?api_key=56c5269c916c25edf98a04f984705750&query=' + m.original_title)
  .then(response => response.json())
  .then(data => {
    
      res = data
      var pp = data.results[0].poster_path 
      var name = data.results[0].original_title
      document.getElementById('image_id').removeChild(img)
      img = document.createElement('img'); 
      img.src = 'https://image.tmdb.org/t/p/w500'+pp; 
      document.getElementById('image_id').appendChild(img);
  });
}