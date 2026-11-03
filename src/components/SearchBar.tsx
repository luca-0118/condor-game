import { useMemo, useState } from 'react'
import type { MockUser } from '../data/mockUsers'
import './SearchBar.css'

type SearchBarProps = {
  // The list of users to search through (e.g. mockUsers).
  users: MockUser[]
  placeholder?: string
  // Called when a result is clicked.
  onSelect?: (user: MockUser) => void
}

// Reusable user search bar with a live results dropdown.
// Works on any page: <SearchBar users={mockUsers} />
function SearchBar({ users, placeholder = 'Search', onSelect }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(q) || user.username.toLowerCase().includes(q),
    )
  }, [query, users])

  const initials = (name: string) =>
    name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase()

  return (
    <div className="search-bar">
      <svg className="search-bar__icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.71.71l.27.28v.78l5 4.99L20.49 19l-4.99-5zm-5 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z" />
      </svg>
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query.trim() !== '' && (
        <ul className="search-bar__results">
          {results.length === 0 && (
            <li className="search-bar__empty">No results for “{query}”</li>
          )}
          {results.map((user) => (
            <li key={user.id}>
              <button
                type="button"
                className="search-bar__result"
                onClick={() => onSelect?.(user)}
              >
                <span className="search-bar__avatar" aria-hidden="true">
                  {user.avatar ? <img src={user.avatar} alt="" /> : initials(user.name)}
                </span>
                <span className="search-bar__info">
                  <strong>
                    {user.username}
                    {user.verified && (
                      <span className="search-bar__verified" title="Verified">
                        ✔
                      </span>
                    )}
                  </strong>
                  <span>
                    {user.name} · {user.followers.toLocaleString()} followers
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
