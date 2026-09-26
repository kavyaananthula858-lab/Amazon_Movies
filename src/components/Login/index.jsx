import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

import logo from '../../assets/movies-logo.svg'
import './index.css'

const Login = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (Cookies.get('jwt_token')) {
      navigate('/', {replace: true})
    }
  }, [navigate])

  const onSubmitLogin = async event => {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch('/api/login', options)
      const data = await response.json()

      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {path: '/'})

        localStorage.setItem('username', username)
        localStorage.setItem('password', password)

        navigate('/')
      } else {
        setErrorMessage(data.error_msg || 'Unable to sign in')
      }
    } catch {
      setErrorMessage('Unable to sign in. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <img
        src={logo}
        alt="login website logo"
        className="login-logo"
      />

      <div className="login-container">
        <form className="login-form" onSubmit={onSubmitLogin}>
          <h1 className="login-heading">Login</h1>

          <div className="input-container">
            <label htmlFor="username">USERNAME</label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={event => setUsername(event.target.value)}
              placeholder="Username"
            />
          </div>

          <div className="input-container">
            <label htmlFor="password">PASSWORD</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              placeholder="Password"
            />
          </div>

          {errorMessage !== '' && (
            <p className="login-error">{errorMessage}</p>
          )}

          <button type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
