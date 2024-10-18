import { format, parseISO } from 'date-fns'
import { Rate } from 'antd'

import { CardProps } from '../../types/types'
import { ellipsedText } from '../../utils/EllipsedText'

import './card/card.sass'

const Card: React.FC<CardProps> = ({ data }) => {
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
  return (
    <div className="card">
      <img
        className="card__cover"
        src={
          data.poster_path === null ? './images/placeholder.png' : `https://image.tmdb.org/t/p/w500${data.poster_path}`
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
          {data.genre_ids.map((element, index) => {
            return (
              <span key={index} className="card__genre">
                {element}
              </span>
            )
          })}
        </div>
        <p className="card__description">{ellipsedText(data.overview)}</p>
        <Rate allowHalf defaultValue={2.5} count={10} style={{ marginTop: 'auto', fontSize: '16px' }} />
      </div>
    </div>
  )
}

export default Card
