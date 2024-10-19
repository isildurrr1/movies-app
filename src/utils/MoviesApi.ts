import { MoviesApiOptions } from '../types/types'

class MoviesApi {
  private baseUrl: string

  private guestId: string

  private headers: { [key: string]: string }

  constructor(options: MoviesApiOptions) {
    this.baseUrl = options.baseUrl
    this.headers = options.headers
    this.guestId = ''
  }

  _checkResponse(res: Response) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Error: ${res.status}`)
  }

  startGuestSession() {
    fetch(`${this.baseUrl}authentication/guest_session/new?api_key=${process.env.REACT_APP_API_KEY}`, {
      method: 'GET',
      headers: this.headers,
    })
      .then(this._checkResponse)
      .then((id) => (this.guestId = id.guest_session_id))
  }

  getGenres() {
    const response = fetch(`${this.baseUrl}genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`, {
      method: 'GET',
      headers: this.headers,
    }).then(this._checkResponse)
    return response
  }

  search(str: string, page: number) {
    console.log(this.guestId)
    const response = fetch(
      `${this.baseUrl}search/movie?query=${str}&include_adult=false&language=en-US&page=${page}&api_key=${process.env.REACT_APP_API_KEY}`,
      {
        method: 'GET',
        headers: this.headers,
      }
    ).then(this._checkResponse)
    return response
  }

  addRate(rate: number, movieId: number) {
    const responce = fetch(
      `${this.baseUrl}movie/${movieId}/rating?guest_session_id=${this.guestId}&api_key=${process.env.REACT_APP_API_KEY}`,
      {
        method: 'POST',
        headers: this.headers,
        body: `{ "value": ${rate} }`,
      }
    )
    return responce
  }

  getRatedMovies(page: number) {
    console.log(page)
    const responce = fetch(
      `${this.baseUrl}guest_session/${this.guestId}/rated/movies?api_key=${process.env.REACT_APP_API_KEY}`,
      {
        method: 'GET',
        headers: this.headers,
      }
    ).then(this._checkResponse)
    return responce
  }
}

export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json',
  },
})

moviesApi.startGuestSession()
