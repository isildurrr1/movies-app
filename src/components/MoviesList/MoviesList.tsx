import { Component } from 'react'
import { Spin, Alert } from 'antd'
import { Offline, Online } from 'react-detect-offline'

import './movies-list/movies-list.sass'
import './movies-list/__error/movies-list__error.sass'
import './movies-list/__spin/movies-list__spin.sass'
import Card from '../Card/Card'
import { MoviesListProps } from '../../types/types'

export class MoviesList extends Component<MoviesListProps> {
  render() {
    const { movies, rateMovie, loader, error } = this.props
    return (
      <div className="movies-list">
        <Online>
          {error.status ? (
            <Alert
              message={error.name}
              type="error"
              className="movies-list__error"
              showIcon
              description={error.description}
            />
          ) : loader ? (
            <Spin size="large" className="movies-list__spin" />
          ) : (
            <>
              {movies.map((element) => (
                <Card key={element.id} data={element} rateMovie={rateMovie} />
              ))}
            </>
          )}
        </Online>
        <Offline>
          <Alert
            message="Offline"
            type="error"
            className="movies-list__error"
            showIcon
            description="Check your internet connection"
          />
        </Offline>
      </div>
    )
  }
}
