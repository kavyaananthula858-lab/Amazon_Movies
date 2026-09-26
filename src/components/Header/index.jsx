import {useState} from 'react'
import {Link, NavLink} from 'react-router-dom'
import {HiOutlineSearch, HiOutlineMenuAlt3, HiX} from 'react-icons/hi'

import logo from '../../assets/movies-logo.svg'
import profileIcon from '../../assets/profile-icon.svg'
import './index.css'

const Header = ({
  mobileMenuDefaultOpen = true,
  overlay = false,
  showSearchForm = false,
  searchValue = '',
  onSearchChange,
  onSearchSubmit,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(
    mobileMenuDefaultOpen,
  )

  return (
    <header className={`site-header${overlay ? ' overlay-header' : ''}`}>
      <nav className="header">
        <div className="header-left">
          <Link to="/">
            <img
              src={logo}
              alt="website logo"
              className="website-logo"
            />
          </Link>

          <div className="desktop-menu">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/popular" className="nav-link">Popular</NavLink>
            <NavLink to="/account" className="nav-link">Account</NavLink>
          </div>
        </div>

        <div className="header-right">
          {showSearchForm ? (
            <form className="header-search-form" onSubmit={onSearchSubmit}>
              <input
                type="search"
                value={searchValue}
                onChange={onSearchChange}
                placeholder="Search"
                aria-label="Search movies"
              />
              <button type="submit" data-testid="searchButton">
                <HiOutlineSearch />
              </button>
            </form>
          ) : (
            <NavLink
              to="/search"
              className="search-header-button"
              data-testid="searchButton"
            >
              <HiOutlineSearch />
            </NavLink>
          )}

          <button
            type="button"
            className="mobile-menu-button"
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen(value => !value)}
          >
            <HiOutlineMenuAlt3 />
          </button>

          <button
            type="button"
            className="close-menu-button"
            aria-label="Close menu"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <HiX />
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="mobile-nav">
          <NavLink to="/" className="mobile-nav-link">Home</NavLink>
          <NavLink to="/popular" className="mobile-nav-link">Popular</NavLink>
          <NavLink to="/account" className="mobile-nav-link">Account</NavLink>
          <button
            type="button"
            className="mobile-nav-close"
            aria-label="Close menu"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <HiX />
          </button>
        </div>
      )}
    </header>
  )
}

export default Header