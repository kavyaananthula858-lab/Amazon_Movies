import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Account = () => {
  const navigate = useNavigate()

  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')

  const onLogout = () => {
    Cookies.remove('jwt_token', {path: '/'})
    localStorage.removeItem('username')
    localStorage.removeItem('password')

    navigate('/login')
  }

  return (
    <div className="account-page">
      <Header mobileMenuDefaultOpen />

      <main className="account-content">
        <h1>Account</h1>

        <div className="account-card">
          <section className="account-section">
            <h2>Membership</h2>
            <div className="account-detail">
              <span>Username</span>
              <strong>{username || 'Guest'}</strong>
            </div>
            <div className="account-detail">
              <span>Password</span>
              <strong>{'*'.repeat(password ? password.length : 8)}</strong>
            </div>
          </section>

          <section className="account-section plan-section">
            <h2>Plan Details</h2>
            <div className="account-detail">
              <span>Premium</span>
              <strong>Ultra HD</strong>
            </div>
            <div className="account-detail">
              <span>Monthly plan</span>
              <strong>Active</strong>
            </div>
          </section>

          <button type="button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Account