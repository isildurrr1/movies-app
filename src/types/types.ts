export interface MoviesApiOptions {
  baseUrl: string
  headers: {
    [key: string]: string
  }
}

interface Error {
  status: boolean
  name?: string
  description?: string
}

export interface Pagination {
  page: number
  totalResults: number
}

export interface MoviesListProps {
  movies: Movie[]
  loader: boolean
  error: Error
  rateMovie: (arg0: number, arg1: number) => void
  ratedMovies?: Movie[]
}

export interface Movie {
  id: number
  title: string
  release_date: string
  overview: string
  poster_path: string
  vote_average: number
  genre_ids: number[]
  rating: number
}

export interface CardProps {
  data: Movie
  ratedMovies?: Movie[]
  rateMovie: (arg0: number, arg1: number) => void
}

export interface AppState {
  input: string
  searchPagination: Pagination
  movies: Movie[]
  genres: []
  loader: boolean
  error: Error
  ratedMovies: Movie[]
  ratePagination: Pagination
}

export interface Genre {
  id: number
  name: string
}
