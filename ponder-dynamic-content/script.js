// Made by Adrian Hernandez
const movies = [
  {
    title: "Spider-Man: Into the Spider-Verse",
    date: "Dec 14, 2018",
    description: "Miles Morales becomes the Spider-Man of his reality and crosses paths with others from the multiverse.",
    imgSrc: "https://wddbyui.github.io/wdd131/images/spiderman.png",
    imgAlt: "Miles Morales swinging through the city",
    ages: "10+",
    genre: "Action/Adventure",
    stars: "⭐⭐⭐⭐⭐",
    starCount: 5
  },
  {
    title: "The Other Side of Heaven",
    date: "December 14, 2001",
    description: "Based on the true story of Elder John H. Groberg, a missionary in Tonga in the 1950s, this film tells a powerful story of faith, hardship, and miracles.",
    imgSrc: "https://wddbyui.github.io/wdd131/images/heaven.png",
    imgAlt: "Poster for The Other Side of Heaven showing a missionary and tropical landscape",
    ages: "10+",
    genre: "Drama/Religious",
    stars: "⭐⭐⭐⭐",
    starCount: 4
  },
  {
    title: "Luca",
    date: "June 18, 2021",
    description: "Two sea monsters experience a life-changing summer on the Italian Riviera.",
    imgSrc: "https://wddbyui.github.io/wdd131/images/luca.png",
    imgAlt: "Luca and Alberto standing on the beach",
    ages: "6+",
    genre: "Family/Fantasy",
    stars: "⭐⭐⭐⭐",
    starCount: 4
  },
  {
    title: "17 Miracles",
    date: "June 3, 2011",
    description: "A moving depiction of the Willie Handcart Company's journey west in 1856, focusing on the miraculous events that helped early pioneers survive one of the harshest migrations in history.",
    imgSrc: "https://wddbyui.github.io/wdd131/images/miracles.jpg",
    imgAlt: "Movie poster for 17 Miracles showing handcart pioneers walking through snow",
    ages: "12+",
    genre: "Historical/Religious",
    stars: "⭐⭐⭐⭐",
    starCount: 4
  }
];

const originalMovies = [...movies];

let sortAscending = false; 

function renderMovies(moviesArray) {
  const movieList = document.getElementById("movie-list");
  movieList.innerHTML = "";
  moviesArray.forEach(movie => {
    const movieCard = `
      <article class="movie">
        <img class="movie-img" src="${movie.imgSrc}" alt="${movie.imgAlt}">
        <div class="movie-details">
          <h2>${movie.title}</h2>
          <p><strong>Release Date:</strong> ${movie.date}</p>
          <p><strong>Recommended Age:</strong> ${movie.ages}</p>
          <p><strong>Genre:</strong> ${movie.genre}</p>
          <p><strong>Rating:</strong> ${movie.stars}</p>
          <p class="movie-description">${movie.description}</p>
        </div>
      </article>
    `;
    movieList.innerHTML += movieCard;
  });
}

// Initial render
renderMovies(movies);

// Sort button logic for funsies
const sortBtn = document.getElementById("sortBtn");
let sorted = false;

sortBtn.addEventListener("click", () => {
  if (!sorted) {
    // Sort by starCount descending (most stars first)
    const sortedMovies = [...movies].sort((a, b) => b.starCount - a.starCount);
    renderMovies(sortedMovies);
    sorted = true;
    sortBtn.textContent = "Reset to Original Order";
  } else {
    renderMovies(originalMovies);
    sorted = false;
    sortBtn.textContent = "Sort by Rating ★";
  }
});