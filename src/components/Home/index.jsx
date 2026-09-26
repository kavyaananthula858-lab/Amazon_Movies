import {useEffect, useState} from 'react'
import SliderModule from 'react-slick'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'
import MovieCard from '../MovieCard'
import FailureView from '../FailureView'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const Slider = SliderModule.default || SliderModule

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [originalMovies, setOriginalMovies] = useState([])

  const [trendingLoading, setTrendingLoading] = useState(true)
  const [originalLoading, setOriginalLoading] = useState(true)

  const [trendingFailure, setTrendingFailure] = useState(false)
  const [originalFailure, setOriginalFailure] = useState(false)

  const [bannerMovie, setBannerMovie] = useState(null)

  const getTrendingMovies = async () => {
    setTrendingLoading(true)
    setTrendingFailure(false)

    try {
      const response = await fetch('/api/movies-app/trending-movies', {
        headers: {
          Authorization: `Bearer ${Cookies.get('jwt_token')}`,
        },
      })

      console.log('Trending response status:', response.status)

      const data = await response.json()
      console.log('Trending API response data:', data)

      if (!response.ok) {
        throw new Error(data.error_msg || 'Unable to get trending movies')
      }

      setTrendingMovies(data.results)
    } catch (error) {
      console.error('Trending API error:', error)
      setTrendingFailure(true)
    }

    setTrendingLoading(false)
  }

  const getOriginalMovies = async () => {
    setOriginalLoading(true)
    setOriginalFailure(false)

    try {
      const response = await fetch('/api/movies-app/originals', {
        headers: {
          Authorization: `Bearer ${Cookies.get('jwt_token')}`,
        },
      })

      console.log('Originals response status:', response.status)

      const data = await response.json()
      console.log('Originals API response data:', data)

      if (!response.ok) {
        throw new Error(data.error_msg || 'Unable to get original movies')
      }

      setOriginalMovies(data.results)

      if (data.results.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.results.length)
        setBannerMovie(data.results[randomIndex])
      }
    } catch (error) {
      console.error('Originals API error:', error)
      setOriginalFailure(true)
    }

    setOriginalLoading(false)
  }

  useEffect(() => {
    getTrendingMovies()
    getOriginalMovies()
  }, [])

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  }

  return (
    <div className="home-page">
      <Header />

      {bannerMovie !== null && (
        <section
          className="banner"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.2)), url(${bannerMovie.backdrop_path})`,
          }}
        >
          <div className="banner-content">
            <h1>{bannerMovie.title}</h1>

            <p>{bannerMovie.overview}</p>

            <button type="button">Play</button>
          </div>
        </section>
      )}

      <section className="movies-section">
        <h2>Trending Now</h2>

        {trendingLoading && (
          <div className="loader-container" data-testid="loader">
            <div className="movie-loader" />
          </div>
        )}

        {trendingFailure && (
          <FailureView onTryAgain={getTrendingMovies} compact />
        )}

        {!trendingLoading && !trendingFailure && (
          <Slider {...sliderSettings}>
            {trendingMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Slider>
        )}
      </section>

      <section className="movies-section">
        <h2>Originals</h2>

        {originalLoading && (
          <div className="loader-container" data-testid="loader">
            <div className="movie-loader" />
          </div>
        )}

        {originalFailure && (
          <FailureView onTryAgain={getOriginalMovies} compact />
        )}

        {!originalLoading && !originalFailure && (
          <Slider {...sliderSettings}>
            {originalMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Slider>
        )}
      </section>

      <Footer />
    </div>
  )
}

export default Home
