import {useState} from 'react'

import Header from '../Header'
import Footer from '../Footer'
import MovieCard from '../MovieCard'
import FailureView from '../FailureView'
import Cookies from 'js-cookie'
import noSearchResults from '../../assets/no-search-results.svg'

import './index.css'

const Search = () => {
  const [searchInput, setSearchInput] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFailure, setIsFailure] = useState(false)
  const [isSearched, setIsSearched] = useState(false)

  const getSearchMovies = async value => {
    setIsLoading(true)
    setIsFailure(false)

    try {
      const response = await fetch(
        `/api/movies-app/movies-search?search=${encodeURIComponent(value)}`,
        {headers: {Authorization: `Bearer ${Cookies.get('jwt_token')}`}},
      )

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

  const onSearch = event => {
    event.preventDefault()

    if (searchInput.trim() !== '') {
      setSearchValue(searchInput)
      setIsSearched(true)
      getSearchMovies(searchInput)
    }
  }

  const onTryAgain = () => {
    getSearchMovies(searchValue)
  }

  return (
    <div className="search-page">
      <Header
        showSearchForm
        searchValue={searchInput}
        onSearchChange={event => setSearchInput(event.target.value)}
        onSearchSubmit={onSearch}
      />

      <main className="search-content">
        {isLoading && (
          <div className="loader-container" data-testid="loader">
            <div className="movie-loader" />
          </div>
        )}

        {isFailure && (
          <FailureView onTryAgain={onTryAgain} />
        )}

        {!isLoading &&
          !isFailure &&
          isSearched &&
          movies.length > 0 && (
            <ul className="search-movies-grid">
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}

        {!isLoading &&
          !isFailure &&
          isSearched &&
          movies.length === 0 && (
            <div className="no-results">
              <img
                src={noSearchResults}
                alt="no movies"
              />

              <h1>
                Your search for {searchValue} did not find any matches.
              </h1>
            </div>
          )}
      </main>

      <Footer />
    </div>
  )
}

export default Search