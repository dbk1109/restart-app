import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./Movie.css";

class App extends React.Component {
  state = {
    isloading: true,
    movies: [],
  };
  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts.mx/api/v2/list_movies.json?sort_by=rating"
    );
    this.setState({ movies, isloading: false });
  };
  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { isloading, movies } = this.state;
    return (
      <section className="container">
        {isloading ? (
          <div className="loader">
            <img
              src="https://blog.teamtreehouse.com/wp-content/uploads/2015/05/InternetSlowdown_Day.gif"
              alt="Loading..."
              className="loader__img"
            />
          </div>
        ) : (
          <div className="movies">
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
                rating={movie.rating}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default App;
