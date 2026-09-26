const FailureView = ({onTryAgain, compact = false}) => (
  <div className={`failure-view${compact ? ' failure-view-compact' : ''}`}>
    <div className="failure-alert" aria-label="Something went wrong">
      <div className="failure-icon">!</div>

      <p>Something went wrong. Please try again</p>

      <button type="button" onClick={onTryAgain}>
        Try Again
      </button>
    </div>
  </div>
)

export default FailureView