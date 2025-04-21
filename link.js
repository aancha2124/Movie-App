let searchForm = document.querySelector("form");
let movieContainer = document.querySelector(".movie-container");
let input = document.querySelector(".input");

let showMovieData = (data) => {
    movieContainer.innerHTML = ""; // Clear previous results
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Director, Year, Plot, Poster } = data;

    // Movie details section
    let movieDetail = document.createElement('div');
    movieDetail.classList.add('movie-detail');
    
    movieDetail.innerHTML = `
        <h2><strong>Title:</strong> ${Title}</h2>
        <p><strong>IMDb Rating:</strong> &#11088; ${imdbRating}</p>
        <p><strong>Genre:</strong> ${Genre}</p>
        <p><strong>Released:</strong> ${Released}</p>
        <p><strong>Runtime:</strong> ${Runtime}</p>
        <p><strong>Cast:</strong> ${Actors}</p>
        <p><strong>Director:</strong> ${Director}</p>
        <p><strong>Year:</strong> ${Year}</p>
        <p><strong>Plot:</strong> ${Plot}</p>
    `;
    movieContainer.appendChild(movieDetail);

    // Movie poster section
    let moviePoster = document.createElement('img');
    moviePoster.classList.add('movie-poster');
    moviePoster.src = Poster;
    moviePoster.alt = `${Title} Poster`;
    movieContainer.appendChild(moviePoster);
}

let fetchMovie = async (movieName) => {
    let myApiKey = "c04d96db";
    let url = `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movieName}`;

    let response = await fetch(url);
    let data = await response.json();
    if (data.Title !== "undefined") {
        console.log(data);
        showMovieData(data);
    } else {
        movieContainer.innerHTML = "";
        alert("Movie not found");
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let movieName = input.value.trim();
    if (movieName === "") {
        alert("Please write something");
    } else {
        fetchMovie(movieName);
    }
});
