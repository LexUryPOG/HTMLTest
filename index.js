const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";

const main = document.getElementById("main");
const form = document.getElementById("form");
const movie_container = document.getElementById("movie-container")

const movArr = [];

getMovies(APIURL);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();

  console.log(respData);
  showMovies(respData.results);

}

function showMovies(movies) {
  movie_container.innerHTML = "";
  movies.forEach((movie) => {
    const { poster_path, title, vote_average, release_date, overview } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");


    movieEl.innerHTML = `
       <img src="${IMGPATH + poster_path}" alt="${title}"/>

     <div class="movie-info">
         <h3>${title}</h3>
         <h5>${release_date}</h5>
         <span class="${getClassByRate(vote_average)}">${vote_average}</span>
     </div> 

     <div class="overview">

     <h2>Overview:</h2>
     ${overview}
     </div>
     `;

    movie_container.appendChild(movieEl)
  });

}

function sortMovie(vote){
  let sortedData = [];
  if(sortResultState === 'Ascending'){
    sortedData = movies.sort((a,b) => b.vote_average - a.vote_average)
  } else if (sortResultState === 'Descending'){
    sortedData = movies.sort((a,b) => a.vote_average - b.vote_average)
  } else  {
    sortedData = movies.sort((a,b) => a.id - b.id);
  }
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange'
  } else {
    return 'red';
  }

}

function changeVisibility() {
  let sortMenu = document.getElementById("sort-option")

  if(sortMenu.style.display == "block") {
    sortMenu.style.display = "none"
  }
  else {
    sortMenu.style.display ="block"
  }
}

