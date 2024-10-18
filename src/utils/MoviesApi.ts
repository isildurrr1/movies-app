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

  startGuestSession() {
    const response = fetch(`${this.baseUrl}authentication/guest_session/new?api_key=${process.env.REACT_APP_API_KEY}`, {
      method: 'GET',
      headers: this.headers,
    }).then(this._checkResponse)
    return response
  }

  getGenres() {
    const response = fetch(`${this.baseUrl}genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`, {
      method: 'GET',
      headers: this.headers,
    }).then(this._checkResponse)
    return response
  }

  search(str: string, page: number, guest_id: string) {
    console.log(guest_id)
    const response = fetch(
      `${this.baseUrl}search/movie?query=${str}&include_adult=false&language=en-US&page=${page}&api_key=${process.env.REACT_APP_API_KEY}`,
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
  },
})
