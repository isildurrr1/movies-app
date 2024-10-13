export interface MoviesApiOptions {
  baseUrl: string
  headers: {
    [key: string]: string
  }
}

export interface MoviesListProps {
  moviesArray: Movie[]
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
