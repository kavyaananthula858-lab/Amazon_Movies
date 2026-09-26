import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import MovieCard from '../MovieCard'
import FailureView from '../FailureView'

import './index.css'

const MovieItemDetails = () => {
  const {id} = useParams()

  const [movie, setMovie] = useState(null)
  const [similarMovies, setSimilarMovies] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [isFailure, setIsFailure] = useState(false)

  const getMovieDetails = async () => {
    setIsLoading(true)
    setIsFailure(false)

    try {
      const response = await fetch(`/api/movies-app/movies/${id}`, {
        headers: {Authorization: `Bearer ${Cookies.get('jwt_token')}`},
      })

      if (!response.ok) {
        throw new Error()
      }

      const data = await response.json()

      setMovie(data.movie_details)
      setSimilarMovies(data.movie_details.similar_movies || [])
    } catch {
      setIsFailure(true)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    getMovieDetails()
  }, [id])

  const convertRuntime = runtime => {
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60

    return `${hours}h ${minutes}m`
  }

  return (
    <div className="details-page">
      <Header overlay />

      {isLoading && (
        <div className="loader-container details-loader" data-testid="loader">
          <div className="movie-loader" />
        </div>
      )}

      {isFailure && (
        <FailureView onTryAgain={getMovieDetails} />
      )}

      {!isLoading && !isFailure && movie !== null && (
        <>
          <main
            className="movie-details-banner"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.95), rgba(0,0,0,0.3)), url(${movie.backdrop_path})`,
            }}
          >
            <div className="movie-details-content">
              <h1>{movie.title}</h1>

              <div className="movie-info">
                <span>{convertRuntime(movie.runtime)}</span>

                <span className="rating-badge">{movie.adult ? 'A' : 'U/A'}</span>

                <span>{movie.release_date}</span>
              </div>

              <p>{movie.overview}</p>

              <button type="button">Play</button>
            </div>
          </main>

          <section className="details-information">
            <div>
              <h2>Genres</h2>

              <ul>
                {(movie.genres || []).map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2>Audio Available</h2>
              <ul>
                {(movie.spoken_languages || []).map(language => (
                  <li key={language.id}>{language.english_name}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2>Rating Count</h2>
              <p>{movie.vote_count}</p>
            </div>

            <div>
              <h2>Budget</h2>
              <p>{movie.budget}</p>
            </div>

            <div>
              <h2>Release Date</h2>
              <p>{movie.release_date}</p>
            </div>

            <div>
              <h2>Rating Average</h2>
              <p>{movie.vote_average}</p>
            </div>
          </section>

          <section className="similar-section">
            <h2>More Like This</h2>

            <ul className="similar-movies-grid">
              {similarMovies.map(similarMovie => (
                <MovieCard
                  key={similarMovie.id}
                  movie={similarMovie}
                />
              ))}
            </ul>
          </section>
        </>
      )}

      <Footer />
    </div>
  )
}

export default MovieItemDetails