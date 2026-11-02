import './GoogleResults.css'

const searchTypes = ['All', 'Images', 'Videos', 'Maps', 'News', 'Shopping', 'More']

function SearchBox() {
  return (
    <form className="google-results-search" role="search">
      <label className="visually-hidden" htmlFor="google-results-query">
        Search
      </label>
      <input id="google-results-query" name="q" type="search" autoComplete="off" />
      <button className="results-icon-button" type="button" aria-label="Voice search">
        <img src="/mic-icon.png" alt="" />
      </button>
      <button className="results-icon-button" type="button" aria-label="Search by image">
        <img src="/google-lens-logo-icon.png" alt="" />
      </button>
      <button className="results-search-button" type="submit" aria-label="Search">
        <img src="/search-icon.png" alt="" />
      </button>
    </form>
  )
}

function ResultsHeader() {
  return (
    <header className="google-results-header">
      <div className="google-results-header-main">
        <a className="results-logo-link" href="/" aria-label="Google home">
          <img src="/Google-Logo.png" alt="Google" />
        </a>
        <SearchBox />
        <nav className="results-user-nav" aria-label="Google account">
          <button className="results-apps-button" type="button" aria-label="Google apps">
            <img src="/9dots.png" alt="" />
          </button>
          <img className="results-profile" src="/profile-empty.jpg" alt="Profile" />
        </nav>
      </div>
      <SearchNavigation />
    </header>
  )
}

function SearchNavigation() {
  return (
    <nav className="google-results-navigation" aria-label="Search categories">
      <div className="results-navigation-spacer" />
      <div className="results-navigation-items">
        {searchTypes.map((type, index) => (
          <button
            className={`results-navigation-item${index === 0 ? ' is-active' : ''}`}
            key={type}
            type="button"
            aria-current={index === 0 ? 'page' : undefined}
          >
            {type}
          </button>
        ))}
        <span className="results-navigation-divider" aria-hidden="true" />
        <button className="results-navigation-item" type="button">
          Tools
        </button>
      </div>
    </nav>
  )
}

function GoogleResults() {
  return (
    <div className="google-results-page">
      <ResultsHeader />
      <main className="google-results-content" aria-label="Search results" />
    </div>
  )
}

export default GoogleResults