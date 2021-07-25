const socket = io()



socket.on('message' , message =>{
    console.log(message)
})






var movie
var res 
var list
var c = 0
var img


window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

  fetch('https://api.themoviedb.org/3/discover/movie?api_key=56c5269c916c25edf98a04f984705750&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate')
  .then(response => response.json())
  .then(data =>{
      list = data
      img_no(c++)
  })

  

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


});


function sbtn_fun(){
    var umovie = document.getElementById("input_id").value
    document.getElementById("input_id").value = ""
    if(movie.original_title == umovie){
        alert("Correct")
        document.getElementById('image_id').removeChild(img);
        img_no(c++)
    }
    else{
        alert("not at all Correct")
    }
}


function img_no(i){
    console.log("hu")
    console.log(list)
    movie = list.results[i] 
    load_img(movie)
}

function load_img(m){
        // getting the poster and movie name using themoviedb api
    fetch('https://api.themoviedb.org/3/search/movie?api_key=56c5269c916c25edf98a04f984705750&query=' + m.original_title)
  .then(response => response.json())
  .then(data => {
    
      res = data
      var pp = data.results[0].poster_path 
      var name = data.results[0].original_title
      img = document.createElement('img'); 
      img.src = 'https://image.tmdb.org/t/p/w500'+pp; 
      document.getElementById('image_id').appendChild(img);
      console.log(pp + " " + name)
  });
}