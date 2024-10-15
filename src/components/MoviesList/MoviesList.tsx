import { Component } from 'react'
import { Spin, Alert } from 'antd'
import { Offline, Online } from 'react-detect-offline'

import './movies-list/movies-list.sass'
import { moviesApi } from '../../utils/MoviesApi'
import Card from '../Card/Card'
import { MoviesListState } from '../../types/types'

export class MoviesList extends Component {
  state: MoviesListState = {
    movies: [],
    error: {
      status: false,
    },
    loader: false,
  }

  getData = () => {
    this.setState({ loader: true })
    moviesApi
      .getMovies()
      .then((res) => {
        this.setState({ movies: res })
      })
      .catch((error) => {
        console.log(error.text)
        this.setState({
          error: { status: true, name: error.name, description: 'Something went wrong. : (' },
        })
      })
      .finally(() => {
        this.setState({ loader: false })
      })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    return (
      <div className="movies-list">
        <Online>
          {this.state.error.status ? ( // Ошибка есть?
            <Alert // рендерим Alert
              message={this.state.error.name}
              type="error"
              style={{ width: '50%', margin: '200px auto 0 auto' }}
              showIcon
              description={this.state.error.description}
            />
          ) : this.state.loader ? ( // Ошибки нет - проверяем лоадер и что загрузка идет
            <Spin size="large" style={{ margin: 'auto', paddingTop: '200px' }} /> // рендерим Spin
          ) : (
            <>
              {this.state.movies.map((element) => (
                <Card key={element.id} data={element} /> // данные пришли и рендерим карточки
              ))}
            </>
          )}
        </Online>
        <Offline>
          <Alert
            message="Offline"
            type="error"
            style={{ width: '50%', margin: '200px auto 0 auto' }}
            showIcon
            description="Check your internet connection"
          />
        </Offline>
      </div>
    )
  }
}
