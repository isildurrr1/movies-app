import { ConfigProvider, Input, Pagination, Tabs } from 'antd'
import { ChangeEvent, Component } from 'react'
import { debounce } from 'lodash'

import './app/app.sass'
import { MoviesList } from '../MoviesList/MoviesList'
import { AppState } from '../../types/types'
import { moviesApi } from '../../utils/MoviesApi'
import { GenresProvider } from '../../context/GernesContext'

export default class App extends Component {
  state: AppState = {
    movies: [],
    genres: [],
    searchPagination: {
      page: 1,
      totalResults: 0,
    },
    input: '',
    loader: false,
    error: {
      status: false,
    },
    ratedMovies: [],
    ratePagination: {
      page: 1,
      totalResults: 0,
    },
  }

  debouncedGetMovies = debounce(() => {
    const { input, searchPagination } = this.state
    if (input.trim().length === 0) {
      this.setState({ movies: [] })
      return
    }

    this.setState({ loader: true, error: { status: false } })
    moviesApi
      .search(input, searchPagination.page)
      .then((res) => {
        if (res.results.length !== 0) {
          this.setState({
            movies: res.results,
            searchPagination: { page: searchPagination.page, totalResults: res.total_results },
            error: { status: false },
          })
        } else {
          this.setState({
            error: { status: true, name: 'Not found', description: 'Movies matching your request - not found. : (' },
          })
        }
      })
      .catch((error) => {
        this.setState({
          error: { status: true, name: error.name, description: 'Something went wrong. : (' },
        })
      })
      .finally(() => {
        this.setState({ loader: false })
      })
  }, 800)

  handleSearchPagination = (page: number) => {
    this.setState(
      (prevState: Readonly<AppState>) => ({ searchPagination: { ...prevState.searchPagination, page } }),
      this.debouncedGetMovies
    )
  }

  handleRatePagination = (page: number) => {
    this.setState(
      (prevState: Readonly<AppState>) => ({ ratePagination: { ...prevState.ratePagination, page } }),
      this.getRatedMovies
    )
  }

  getString = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (inputValue.trim().length === 0) {
      this.setState(
        {
          input: inputValue,
          movies: [],
          searchPagination: { page: 1, totalResults: 0 },
          error: { status: false },
        },
        this.debouncedGetMovies
      )
    } else {
      this.setState(
        {
          input: inputValue,
          searchPagination: { ...this.state.searchPagination, page: 1 },
        },
        this.debouncedGetMovies
      )
    }
  }

  getRatedMovies = (): void => {
    const { ratePagination } = this.state
    moviesApi
      .getRatedMovies(ratePagination.page)
      .then((res) => {
        this.setState(() => {
          return {
            ratedMovies: res.results,
            ratePagination: { page: ratePagination.page, totalResults: res.total_results },
          }
        })
      })
      .catch(() => {
        this.setState({
          error: { status: true, name: 'Rating Error', description: 'The rating is not counted. Try again. : (' },
        })
      })
  }

  rateMovie = (rate: number, id: number) => {
    moviesApi.addRate(rate, id).then(() => {
      this.getRatedMovies()
    })
  }

  handleTab = (tabNum: string) => {
    this.setState(() => {
      return { error: { status: false } }
    })
    if (tabNum === '2') {
      this.getRatedMovies()
    }
  }

  componentDidMount(): void {
    moviesApi.getGenres().then((res) => {
      this.setState(() => {
        return { genres: res.genres }
      })
    })
  }

  render() {
    const { movies, loader, ratedMovies, error, searchPagination, ratePagination } = this.state

    return (
      <GenresProvider value={this.state.genres}>
        <div className="app">
          <Tabs
            onChange={(e) => this.handleTab(e)}
            centered
            destroyInactiveTabPane
            items={[
              {
                label: 'Search',
                key: '1',
                children: (
                  <>
                    <Input placeholder="Type to search..." onChange={this.getString} disabled={loader} />
                    <MoviesList movies={movies} rateMovie={this.rateMovie} loader={loader} error={error} />
                    {movies.length > 0 && (
                      <ConfigProvider
                        theme={{
                          components: {
                            Pagination: {
                              itemActiveBg: '#1890FF',
                              colorPrimary: 'white',
                              colorPrimaryHover: 'white',
                            },
                          },
                        }}
                      >
                        <Pagination
                          align="center"
                          current={searchPagination.page}
                          pageSize={20}
                          total={searchPagination.totalResults}
                          showSizeChanger={false}
                          onChange={this.handleSearchPagination}
                        />
                      </ConfigProvider>
                    )}
                  </>
                ),
              },
              {
                label: 'Rated',
                key: '2',
                children: (
                  <>
                    <MoviesList
                      movies={ratedMovies}
                      rateMovie={this.rateMovie}
                      loader={loader}
                      error={error}
                    ></MoviesList>
                    {ratedMovies.length > 0 && (
                      <ConfigProvider
                        theme={{
                          components: {
                            Pagination: {
                              itemActiveBg: '#1890FF',
                              colorPrimary: 'white',
                              colorPrimaryHover: 'white',
                            },
                          },
                        }}
                      >
                        <Pagination
                          align="center"
                          current={ratePagination.page}
                          pageSize={20}
                          total={ratePagination.totalResults}
                          showSizeChanger={false}
                          onChange={this.handleRatePagination}
                        />
                      </ConfigProvider>
                    )}
                  </>
                ),
              },
            ]}
          />
        </div>
      </GenresProvider>
    )
  }
}
