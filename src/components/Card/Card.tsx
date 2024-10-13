import { format, parseISO } from 'date-fns'

import { CardProps } from '../../types/types'
import { ellipsedText } from '../../utils/EllipsedText'

import './card/card.sass'

const Card: React.FC<CardProps> = ({ data }) => {
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
        <p className="card__date">
          {data.release_date === '' ? '' : format(new Date(parseISO(data.release_date)), 'MMMM dd, yyyy')}
        </p>
        <div className="card__genres">
          <span className="card__genre">Action</span>
          <span className="card__genre">Drama</span>
        </div>
        <p className="card__description">{ellipsedText(data.overview)}</p>
      </div>
    </div>
  )
}

export default Card
