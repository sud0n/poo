import { Movie } from "./Movie.js";

class Main {
  constructor() {
    this.movies = [];
    this.movieList = document.querySelector("#movie-list");
    this.movieStatus = document.querySelector("#movie-status");
  }

  async load() {
    try {
      const response = await fetch("./data/movies.json");
      if (!response.ok) {
        throw new Error(`Could not load movies (${response.status}).`);
      }

      const movieData = await response.json();
      if (!Array.isArray(movieData)) {
        throw new Error("The movies data must be a JSON array.");
      }

      this.movies = movieData.map((movieDataItem) => new Movie(movieDataItem));
      this.render();
    } catch (error) {
      console.error(error);
      this.movieStatus.textContent = "Movies could not be loaded. Please try again later.";
    }
  }

  render() {
    this.movieList.replaceChildren(...this.movies.map((movie) => movie.render()));
    this.movieStatus.textContent = `${this.movies.length} ${this.movies.length === 1 ? "movie" : "movies"}`;
  }
}

new Main().load();
