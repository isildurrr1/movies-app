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
  }

  getData = () => {
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
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    return (
      <div className="movies-list">
        <Online>
          {this.state.movies.length === 0 ? (
            this.state.error.status ? (
              <Alert
                message={this.state.error.name}
                type="error"
                style={{ width: '50%', margin: '200px auto 0 auto' }}
                showIcon
                description={this.state.error.description}
              />
            ) : (
              <Spin size="large" style={{ margin: 'auto', paddingTop: '200px' }} />
            )
          ) : (
            this.state.movies.map((element) => <Card key={element.id} data={element} />)
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
