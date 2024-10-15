import { Component } from 'react'
import { Spin, Alert } from 'antd'
import { Offline, Online } from 'react-detect-offline'

import './movies-list/movies-list.sass'
import Card from '../Card/Card'
import { MoviesListProps } from '../../types/types'

export class MoviesList extends Component<MoviesListProps> {
  render() {
    const { movies, loader, error } = this.props
    return (
      <div className="movies-list">
        <Online>
          {error.status ? ( // Ошибка есть?
            <Alert // рендерим Alert
              message={error.name}
              type="error"
              style={{ width: '50%', margin: '200px auto 0 auto' }}
              showIcon
              description={error.description}
            />
          ) : loader ? ( // Ошибки нет - проверяем лоадер и что загрузка идет
            <Spin size="large" style={{ margin: 'auto', paddingTop: '200px' }} /> // рендерим Spin
          ) : (
            <>
              {movies.map((element) => (
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
