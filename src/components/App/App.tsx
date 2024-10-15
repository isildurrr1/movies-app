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
      page: 0,
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
    const { input } = this.state

    if (input.trim().length === 0) {
      this.setState({ movies: [] }) // Очистка списка фильмов
      return
    }

    this.setState({ loader: true })
    moviesApi
      .search(input)
      .then((res) => {
        this.setState({ movies: res.results, pagination: { page: res.page, totalResults: res.total_results } })
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

  getString = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    this.setState({ input: inputValue }, this.debouncedGetMovies)
  }

  render() {
    const { movies, loader, error } = this.state

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
                      defaultCurrent={this.state.pagination.page}
                      pageSize={20}
                      total={this.state.pagination.totalResults}
                      showSizeChanger={false}
                      onChange={(page) => console.log(page)}
                    />
                  </ConfigProvider>
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
