import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import SendIcon from '@mui/icons-material/Send'
import SearchBar from '../../../components/SearchBar'
import type { SocialUser } from '../../../data/socialUser'
import InstaSidebar from './InstaSidebar'
import { loadInstagramUsers } from '../Databases/instagramDatabase'
import './instagram.css'

// Initials shown inside avatar placeholders.
function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

// Round avatar: the user's picture when available, otherwise their initials.
function Avatar({ user, className = 'avatar' }: { user: SocialUser; className?: string }) {
  return (
    <div className={className}>
      {user.avatar ? <img src={user.avatar} alt={user.name} /> : initials(user.name)}
    </div>
  )
}

// A single feed post from a mock user.
function Post({ user }: { user: SocialUser }) {
  return (
    <article className="post">
      <header className="post-header">
        <Avatar user={user} />
        <strong>{user.username}</strong>
        <MoreHorizIcon className="dots" aria-label="More options" />
      </header>

      <div className="photo">
        {user.avatar ? <img src={user.avatar} alt={`Post by ${user.name}`} /> : <span>▧</span>}
      </div>

      <div className="actions">
        <FavoriteBorderOutlinedIcon className="like-icon" aria-label="Like" />
        <ModeCommentOutlinedIcon className="comment-icon" aria-label="Comment" />
        <SendIcon className="share-icon" aria-label="Share" />
        <BookmarkIcon className="bookmark" aria-label="Bookmark" />
      </div>

      <div className="details">
        <strong>{user.followers.toLocaleString()} likes</strong>
        <p>
          <b>{user.username}</b> {user.bio}
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
function Suggestion({ user }: { user: SocialUser }) {
  return (
    <div className="suggestion">
      <Avatar user={user} />
      <div className="user-info">
        <strong>{user.username}</strong>
        <p>Suggested for you</p>
      </div>
      <a href="#">Follow</a>
    </div>
  )
}

function Instagram() {
  // The search view is driven by the URL (?search=true) so other pages can link to it.
  const [searchParams, setSearchParams] = useSearchParams()
  const searchOpen = searchParams.get('search') === 'true'
  const [exploreTab, setExploreTab] = useState<'foryou' | 'unpersonalized'>('foryou')
  const [users, setUsers] = useState<SocialUser[]>([])
  const [usersLoading, setUsersLoading] = useState(true)
  const [databaseError, setDatabaseError] = useState<string | null>(null)

  useEffect(() => {
    loadInstagramUsers().then(
      (loadedUsers) => {
        setUsers(loadedUsers)
        setUsersLoading(false)
      },
      (error: unknown) => {
        setDatabaseError(
          error instanceof Error ? error.message : 'An unknown database error occurred.',
        )
        setUsersLoading(false)
      },
    )
  }, [])

  const exploreTiles = users.map((user, i) => ({
    user,
    video: i % 3 !== 2,
    hue: (i * 47) % 360,
  }))

  const setSearchOpen = (open: boolean) => {
    setSearchParams(open ? { search: 'true' } : {})
  }

  return (
    <div className="insta">
      <div className={`layout${searchOpen ? ' search-open' : ''}`}>
        <InstaSidebar
          onSearchClick={() => setSearchOpen(!searchOpen)}
          onNavigate={() => setSearchOpen(false)}
        />

        {searchOpen ? (
          <main className="explore">
            {usersLoading && <p role="status">Loading Instagram data…</p>}
            {databaseError && <p role="alert">Could not load Instagram data: {databaseError}</p>}
            <div className="explore-search">
              <SearchBar users={users} placeholder="Zoeken" />
            </div>

            <div className="explore-tabs">
              <button
                type="button"
                className={exploreTab === 'foryou' ? 'active' : undefined}
                onClick={() => setExploreTab('foryou')}
              >
                Voor jou
              </button>
              <button
                type="button"
                className={exploreTab === 'unpersonalized' ? 'active' : undefined}
                onClick={() => setExploreTab('unpersonalized')}
              >
                Niet gepersonaliseerd
              </button>
            </div>

            <div className="explore-grid">
              {exploreTiles.map((tile) => (
                <div
                  key={tile.user.id}
                  className="explore-tile"
                  style={
                    tile.user.avatar
                      ? {
                          backgroundImage: `url(${tile.user.avatar})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }
                      : {
                          background: `linear-gradient(135deg, hsl(${tile.hue} 40% 30%), hsl(${(tile.hue + 60) % 360} 45% 18%))`,
                        }
                  }
                >
                  <span className="tile-username">@{tile.user.username}</span>
                  {tile.video && (
                    <svg className="tile-icon" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </main>
        ) : (
          <>
            <main className="feed">
              {usersLoading && <p role="status">Loading Instagram data…</p>}
              {databaseError && <p role="alert">Could not load Instagram data: {databaseError}</p>}
              <section className="stories">
                <div className="story">
                  <div className="story-ring add">+</div>
                  <p>Your story</p>
                </div>
                {users.slice(0, 5).map((user) => (
                  <div className="story" key={user.id}>
                    <Avatar user={user} className="story-ring" />
                    <p>{user.username}</p>
                  </div>
                ))}
              </section>

              {users.slice(0, 3).map((user) => (
                <Post key={user.id} user={user} />
              ))}
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

              {users.slice(3, 7).map((user) => (
                <Suggestion key={user.id} user={user} />
              ))}

              <footer>
                About &nbsp; Help &nbsp; Press &nbsp; Privacy &nbsp; Terms
                <p>© 2026 Web Insta</p>
                <p>Educational simulation</p>
              </footer>
            </aside>
          </>
        )}
      </div>
    </div>
  )
}

export default Instagram
