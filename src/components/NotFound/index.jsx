import './index.css'

const NotFound = () => (
  <div className="not-found-page">
    <div className="not-found-content">
      <h1>Lost Your Way ?</h1>

      <p>
        we are sorry, the page you requested
        <br />
        could not be found
        <br />
        Please go back to the homepage
      </p>

      <button type="button" onClick={() => (window.location.href = '/')}>
        Go to Home
      </button>
    </div>
  </div>
)

export default NotFound