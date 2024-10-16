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

  async search(str: string, page: number) {
    const response = await fetch(
      `${this.baseUrl}search/movie?query=${str}&include_adult=false&language=en-US&page=${page}`,
      {
        method: 'GET',
        headers: this.headers,
      }
    ).then(this._checkResponse)
    return response
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
  },
})
