import { MoviesApiOptions } from '../types/types'

class MoviesApi {
  private baseUrl: string

  private headers: { [key: string]: string }

  constructor(options: MoviesApiOptions) {
    this.baseUrl = options.baseUrl
    this.headers = options.headers
  }

  _checkResponse(res: Response) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  async getMovies() {
    const response = await fetch(`${this.baseUrl}`, {
      method: 'GET',
      headers: this.headers,
    }).then(this._checkResponse)
    return response.results
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
  },
})
