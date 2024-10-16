import { ConfigProvider, Input, Pagination, Tabs } from 'antd'
import { ChangeEvent, Component } from 'react'
import { debounce } from 'lodash'

import { MoviesList } from '../MoviesList/MoviesList'
import './app/app.sass'
import { AppState } from '../../types/types'
import { moviesApi } from '../../utils/MoviesApi'

export default class App extends Component {
  state: AppState = {
    movies: [],
    pagination: {
      page: 1,
      totalResults: 0,
    },
    input: '',
    loader: false,
    error: {
      status: false,
    },
  }

  // Создаем дебоунс-функцию для поиска фильмов
  debouncedGetMovies = debounce(() => {
    const { input, pagination } = this.state
    if (input.trim().length === 0) {
      this.setState({ movies: [] }) // Очистка списка фильмов
      return
    }

    this.setState({ loader: true })
    moviesApi
      .search(input, pagination.page)
      .then((res) => {
        console.log(this.state.pagination)
        this.setState({ movies: res.results, pagination: { page: pagination.page, totalResults: res.total_results } })
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

  handlePagination = (page: number) => {
    this.setState(
      (prevState: Readonly<AppState>) => ({ pagination: { ...prevState.pagination, page } }),
      this.debouncedGetMovies
    )
  }

  updateState = (newState: Partial<AppState>) => {
    this.setState((prevState) => ({ ...prevState, ...newState }), this.debouncedGetMovies)
  }

  getString = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (inputValue.trim().length === 0) {
      this.updateState({
        input: inputValue,
        movies: [],
        pagination: { page: 1, totalResults: 0 },
      })
    } else {
      this.updateState({
        input: inputValue,
        pagination: { ...this.state.pagination, page: 1 },
      })
    }
  }

  render() {
    const { movies, loader, error, pagination } = this.state

    return (
      <div className="app">
        <Tabs
          centered
          items={[
            {
              label: 'Search',
              key: '1',
              children: (
                <>
                  <Input placeholder="Type to search..." onChange={this.getString} disabled={loader} />
                  <MoviesList movies={movies} loader={loader} error={error} />
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
                        current={pagination.page}
                        pageSize={20}
                        total={pagination.totalResults}
                        showSizeChanger={false}
                        onChange={this.handlePagination}
                      />
                    </ConfigProvider>
                  )}
                </>
              ),
            },
            { label: 'Rated', key: '2' },
          ]}
        />
      </div>
    )
  }
}
