import {useEffect, useState} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import MovieCard from '../MovieCard'
import FailureView from '../FailureView'

import './index.css'

const Popular = () => {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFailure, setIsFailure] = useState(false)

  const getPopularMovies = async () => {
    setIsLoading(true)
    setIsFailure(false)

    try {
      const response = await fetch('/api/movies-app/popular-movies', {
        headers: {Authorization: `Bearer ${Cookies.get('jwt_token')}`},
      })

      if (!response.ok) {
        throw new Error()
      }

      const data = await response.json()

      setMovies(data.results)
    } catch {
      setIsFailure(true)
    }

    setIsLoading(false)
  }

  useEffect(() => {
    getPopularMovies()
  }, [])

  return (
    <div className="popular-page">
      <Header mobileMenuDefaultOpen />

      <main className="popular-content">
        <h1>Popular</h1>

        {isLoading && (
          <div className="loader-container" data-testid="loader">
            <div className="movie-loader" />
          </div>
        )}

        {isFailure && (
          <FailureView onTryAgain={getPopularMovies} />
        )}

        {!isLoading && !isFailure && (
          <ul className="movies-grid">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default Popular
