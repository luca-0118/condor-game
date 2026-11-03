import './GoogleResults.css'
import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { mockSearchResults, searchResults, type SearchResult as SearchResultData } from '../searchData'

const searchTypes = ['All', 'Images', 'Videos', 'Maps', 'News', 'Shopping', 'More']

type SearchBoxProps = {
  query: string
  onSearch: (query: string) => void
}

function SearchBox({ query, onSearch }: SearchBoxProps) {
  const [value, setValue] = useState(query)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch(value.trim())
  }

  return (
    <form className="google-results-search" role="search" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="google-results-query">
        Search
      </label>
      <input
        id="google-results-query"
        name="q"
        type="search"
        autoComplete="off"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
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

function ResultsHeader({ query, onSearch }: SearchBoxProps) {
  return (
    <header className="google-results-header">
      <div className="google-results-header-main">
        <a className="results-logo-link" href="/" aria-label="Google home">
          <img src="/Google-Logo.png" alt="Google" />
        </a>
        <SearchBox key={query} query={query} onSearch={onSearch} />
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

function SearchResult({ result }: { result: SearchResultData }) {
  return (
    <article className="google-result">
      <div className="result-source">
        <span className="result-favicon" aria-hidden="true">
          {result.domain.charAt(0)}
        </span>
        <div className="result-source-text">
          <div className="result-domain">{result.domain}</div>
          <div className="result-url">{result.url}</div>
        </div>
        <button className="result-options" type="button" aria-label="Result options">
          ⋮
        </button>
      </div>
      <a className="result-title" href={result.url}>
        {result.title}
      </a>
      <p className="result-description">{result.description}</p>
    </article>
  )
}

function GoogleResults() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const results = searchResults(query, mockSearchResults)

  const handleSearch = (nextQuery: string) => {
    setSearchParams(nextQuery ? { q: nextQuery } : {})
  }

  return (
    <div className="google-results-page">
      <ResultsHeader query={query} onSearch={handleSearch} />
      <main className="google-results-content" aria-label="Search results">
        {query.trim() ? (
          results.length > 0 ? (
            results.map((result) => <SearchResult key={result.url} result={result} />)
          ) : (
            <p role="status">No results found for “{query}”.</p>
          )
        ) : (
          <p role="status">Enter a search term to see results.</p>
        )}
      </main>
    </div>
  )
}

export default GoogleResults