export class Movie {
  constructor({ title, director, year, score }) {
    this.title = title;
    this.director = director;
    this.year = year;
    this.score = score;
  }

  render() {
    const card = document.createElement("article");
    const isHighlyRated = this.score >= 8;
    card.className = `movie-card${isHighlyRated ? " movie-card--featured" : ""}`;

    if (isHighlyRated) {
      const badge = document.createElement("span");
      badge.className = "movie-badge";
      badge.textContent = "★ Highly rated";
      card.append(badge);
    }

    const title = document.createElement("h2");
    title.textContent = this.title;

    const director = document.createElement("p");
    director.className = "movie-director";
    director.textContent = `Directed by ${this.director}`;

    const details = document.createElement("div");
    details.className = "movie-details";

    const year = document.createElement("span");
    year.textContent = String(this.year);

    const score = document.createElement("span");
    score.className = "movie-score";
    score.textContent = `★ ${this.score}/10`;

    details.append(year, score);
    card.append(title, director, details);
    return card;
  }
}
