import { format, parseISO } from 'date-fns'
import { Rate } from 'antd'

import { GenresConsumer } from '../../context/GernesContext'
import { CardProps, Genre } from '../../types/types'
import { ellipsedText } from '../../utils/EllipsedText'
import './card/card.sass'
import './card/__stars/card__stars.sass'

const Card: React.FC<CardProps> = ({ data, ratedMovies, rateMovie }) => {
  const setColor = (rating: number) => {
    if (rating < 3) {
      return '#E90000'
    } else if (rating < 5) {
      return '#E97E00'
    } else if (rating < 7) {
      return '#E9D100'
    } else {
      return '#66E900'
    }
  }

  const checkRating = (id: number) => {
    let result = 0
    ratedMovies?.forEach((element) => {
      if (element.id === id) {
        result = element.rating
      }
    })
    return result
  }

  const handleRating = (rate: number, id: number) => {
    rateMovie(rate, id)
  }
  return (
    <GenresConsumer>
      {(genres: Genre[]) => {
        return (
          <div className="card">
            <img
              className="card__cover"
              src={
                data.poster_path === null
                  ? './images/placeholder.png'
                  : `https://image.tmdb.org/t/p/w500${data.poster_path}`
              }
              alt="picture"
            />
            <div className="card__info">
              <h2 className="card__title">{data.title}</h2>
              <div className="card__rating" style={{ borderColor: `${setColor(data.vote_average)}` }}>
                {data.vote_average.toFixed(1)}
              </div>
              <p className="card__date">
                {data.release_date === '' ? '' : format(new Date(parseISO(data.release_date)), 'MMMM dd, yyyy')}
              </p>
              <div className="card__genres">
                {genres.map((element) => {
                  if (data.genre_ids.includes(element.id)) {
                    return (
                      <div className="card__genre" key={element.id}>
                        {element.name}
                      </div>
                    )
                  }
                })}
              </div>
            </div>
            <p className="card__description">{ellipsedText(data.overview, data.genre_ids.length)}</p>
            <Rate
              allowHalf
              defaultValue={checkRating(data.id)}
              value={data.rating}
              count={10}
              className="card__stars"
              onChange={(rate) => handleRating(rate, data.id)}
            />
          </div>
        )
      }}
    </GenresConsumer>
  )
}

export default Card
