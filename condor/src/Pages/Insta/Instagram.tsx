import { useState } from 'react'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import SendIcon from '@mui/icons-material/Send'
import './instagram.css'

// Sidebar entries; `path` is the SVG path data for each icon.
const NAV_ITEMS = [
  { label: 'Home', active: true, path: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
  {
    label: 'Reels',
    path: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zm-9-2 5-3-5-3v6z',
  },
  { label: 'Messages', path: 'M2.01 21 23 12 2.01 3 2 10l15 2-15 2z' },
  {
    label: 'Search',
    path: 'M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.71.71l.27.28v.78l5 4.99L20.49 19l-4.99-5zm-5 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z',
  },
  {
    label: 'Notifications',
    path: 'M12 21.35 10.55 20C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A5.98 5.98 0 0 1 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.51L12 21.35zM7.5 5C5.5 5 4 6.5 4 8.5c0 2.54 2.7 5.02 8 9.81 5.3-4.79 8-7.27 8-9.81 0-2-1.5-3.5-3.5-3.5-1.54 0-3.04.99-3.57 2.36h-1.87C10.54 5.99 9.04 5 7.5 5z',
  },
  { label: 'Create', path: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z' },
  {
    label: 'Profile',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zm0 15a7.96 7.96 0 0 1-6.32-3.12C6.4 14.93 9 14 12 14s5.6.93 6.32 2.88A7.96 7.96 0 0 1 12 20z',
  },
]

// A single feed post with placeholder content.
function Post() {
  return (
    <article className="post">
      <header className="post-header">
        <div className="avatar"></div>
        <strong>username</strong>
        <MoreHorizIcon className="dots" aria-label="More options" />
      </header>

      <div className="photo">
        <span>▧</span>
      </div>

      <div className="actions">
        <FavoriteBorderOutlinedIcon className="like-icon" aria-label="Like" />
        <ModeCommentOutlinedIcon className="comment-icon" aria-label="Comment" />
        <SendIcon className="share-icon" aria-label="Share" />
        <BookmarkIcon className="bookmark" aria-label="Bookmark" />
      </div>

      <div className="details">
        <strong>0 likes</strong>
        <p>
          <b>username</b> Add a caption...
        </p>
        <p className="muted">View all comments</p>
      </div>

      <div className="comment">
        <input type="text" placeholder="Add a comment..." />
        <button>Post</button>
      </div>
    </article>
  )
}

// One row in the "Suggested for you" list.
function Suggestion() {
  return (
    <div className="suggestion">
      <div className="avatar"></div>
      <div className="user-info">
        <strong>username</strong>
        <p>Suggested for you</p>
      </div>
      <a href="#">Follow</a>
    </div>
  )
}
  // The sidebar expands on mouse hover or keyboard focus.
function Instagram() {
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const expanded = hovered || focused

  return (
    <div className="insta">
      <div className={`layout${expanded ? ' sidebar-expanded' : ''}`}>
        <aside
          className="sidebar"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          // Only collapse when focus leaves the sidebar entirely.
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false)
          }}
        >
          <h1 className="logo" aria-label="Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4zm4.4 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.5-3.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
            </svg>
          </h1>

          <nav>
            {NAV_ITEMS.map((item) => (
              <a key={item.label} className={item.active ? 'active' : undefined} href="#">
                <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path d={item.path} />
                </svg>
                <span className="nav-label">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="more">
            <svg className="more-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
            </svg>
            <span className="more-label">More</span>
          </div>
        </aside>

        <main className="feed">
          <section className="stories">
            <div className="story">
              <div className="story-ring add">+</div>
              <p>Your story</p>
            </div>
            {[1, 2, 3, 4, 5].map((n) => (
              <div className="story" key={n}>
                <div className="story-ring"></div>
                <p>username</p>
              </div>
            ))}
          </section>

          <Post />
          <Post />
        </main>

        <aside className="right-sidebar">
          <div className="my-profile">
            <div className="avatar big"></div>
            <div className="user-info">
              <strong>your_username</strong>
              <p>Your Name</p>
            </div>
            <a href="#">Switch</a>
          </div>

          <div className="suggestion-title">
            <strong>Suggested for you</strong>
            <a href="#">See all</a>
          </div>

          {[1, 2, 3, 4].map((n) => (
            <Suggestion key={n} />
          ))}

          <footer>
            About &nbsp; Help &nbsp; Press &nbsp; Privacy &nbsp; Terms
            <p>© 2026 Web Insta</p>
            <p>Educational simulation</p>
          </footer>
        </aside>
      </div>
    </div>
  )
}

export default Instagram
