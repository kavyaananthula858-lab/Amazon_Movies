import {useNavigate} from 'react-router-dom'

import './index.css'

const MovieCard = ({movie}) => {
  const navigate = useNavigate()

  const onClickMovie = () => {
    navigate(`/movies/${movie.id}`)
  }

  return (
    <li className="movie-card" onClick={onClickMovie}>
      <img
        src={movie.poster_path}
        alt={movie.title}
        className="movie-poster"
      />
    </li>
  )
}

export default MovieCard