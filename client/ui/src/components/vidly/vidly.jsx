import React, { Component } from "react";
import { getMovies, deleteMovie } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";
import Pagination from "./common/pagination";
import Filter from "./common/filter";
import { paginate } from "../../utils/paginate";
import { any } from "joi";

class Vidly extends Component {
  state = {
    movies: getMovies(),
    pageSize: 3,
    currentPage: 1,
    genreList: [],
    selectedFilter: any,
  };

  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  componentDidMount() {
    const gList = this.getGenresList();
    this.setState({ genreList: gList, selectedFilter: gList[0] });
  }

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  deleteRecord = (_id) => {
    deleteMovie(_id);
    const movies = this.state.movies.filter((e) => e._id !== _id);
    this.setState({ movies: movies });
  };

  getGenresList() {
    const allGenresObj = { _id: "5b21ca3eeb7f6fbccd47132", name: "All Genres" };
    const genresList = [];
    genresList.push(allGenresObj, ...getGenres());
    return genresList;
  }

  handleFilterChange = (selectedFilter) => {
    this.setState({ selectedFilter: selectedFilter, currentPage: 1 });
  };

  getTable() {
    // filter movies
    let fil_Movies = [];
    if (this.state.genreList.length > 0 && this.state.genreList[0]._id !== this.state.selectedFilter._id) {
      fil_Movies = this.state.movies.filter((e) => e.genre.name === this.state.selectedFilter.name);
    } else {
      fil_Movies = this.state.movies;
    }
    // apply pagination
    const pag_movies = paginate(fil_Movies, this.state.currentPage, this.state.pageSize);

    return (
      <div>
        <div className="row">
          <div className="col-lg-2" style={{ marginTop: 78 }}>
            <Filter filterList={this.state.genreList} selectedFilter={this.state.selectedFilter} onFilterChange={this.handleFilterChange} />
          </div>
          <div className="col-lg-10">
            {fil_Movies.length >= 0 ? <p style={{ marginTop: 20 }}>Showing {fil_Movies.length} movies in the database</p> : <p>No records found in the DB.</p>}
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Rate</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {pag_movies.map((movie) => (
                  <tr key={movie._id}>
                    <td>{movie.title}</td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => this.deleteRecord(movie._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination itemsCount={fil_Movies.length} pageSize={this.state.pageSize} currentPage={this.state.currentPage} onPageChange={this.handlePageChange}></Pagination>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <main className="container">
        <div>{this.getTable()}</div>
      </main>
    );
  }
}

export default Vidly;
