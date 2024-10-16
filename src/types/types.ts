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
}

export interface Movie {
  id: number
  title: string
  release_date: string
  overview: string
  poster_path: string
}

export interface CardProps {
  data: Movie
}

export interface AppState {
  input: string
  pagination: Pagination
  movies: Movie[]
  loader: boolean
  error: Error
}
