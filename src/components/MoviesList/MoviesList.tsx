import { Component } from 'react'
import { Spin } from 'antd'

import './movies-list/movies-list.sass'
import { moviesApi } from '../../utils/MoviesApi'
import Card from '../Card/Card'
import { Movie } from '../../types/types'

type MoviesListState = {
  movies: Movie[]
}

export class MoviesList extends Component {
  state: MoviesListState = {
    movies: [],
  }

  getData = () => {
    moviesApi
      .getMovies()
      .then((res) => {
        this.setState({ movies: res })
      })
      .catch((error) => {
        console.error('Error fetching movies:', error)
      })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    return (
      <div className="movies-list">
        {this.state.movies.length === 0 ? (
          <Spin size="large" style={{ margin: 'auto', paddingTop: '200px' }} />
        ) : (
          this.state.movies.map((element) => <Card key={element.id} data={element} />)
        )}
      </div>
    )
  }
}
