import { useState } from 'react'
import FacebookProfiel from './facebook-profiel'
import './Facebook.css'

type Page = 'home' | 'profile'

interface PostData {
  id: number
  author: string
  time: string
  text: string
}

// Placeholder user shown in the left menu and the composer.
const USER = { firstName: 'Voornaam', fullName: 'Voornaam Achternaam' }

// Number on the notification badge; the badge is hidden when it is 0.
const NOTIFICATION_COUNT = 0

// Tabs in the top bar; `page` is the page that opens when the tab is clicked.
const NAV_TABS: { id: string; label: string; icon: string; page?: Page }[] = [
  { id: 'home', label: 'Home', icon: '🏠', page: 'home' },
  { id: 'video', label: 'Video', icon: '🎬' },
  { id: 'friends', label: 'Vrienden', icon: '👥' },
  { id: 'marketplace', label: 'Marketplace', icon: '🏪' },
  { id: 'gaming', label: 'Gaming', icon: '🎮' },
]

// Entries in the left menu.
const SIDEBAR_ITEMS: { label: string; icon: string }[] = [
  { label: 'Meta AI', icon: '✨' },
  { label: 'Vrienden', icon: '👥' },
  { label: 'Herinneringen', icon: '🕒' },
  { label: 'Opgeslagen', icon: '🔖' },
  { label: 'Groepen', icon: '🫂' },
  { label: 'Reels', icon: '🎞️' },
  { label: 'Marketplace', icon: '🏪' },
  { label: 'Overzichten', icon: '📊' },
]

// Tabs above the feed.
const FEED_TABS: { id: string; label: string }[] = [
  { id: 'foryou', label: 'Voor jou' },
  { id: 'following', label: 'Volgend' },
]

// Placeholder posts for the feed.
const INITIAL_POSTS: PostData[] = [
  {
    id: 1,
    author: 'Paginanaam',
    time: '1 u',
    text: 'Dit is een placeholder-bericht. Vervang deze tekst door je eigen content.',
  },
]

// Placeholder ads and contacts for the right column.
const ADS: { id: number; title: string; domain: string }[] = [
  { id: 1, title: 'Advertentietitel', domain: 'voorbeeld.com' },
  { id: 2, title: 'Advertentietitel', domain: 'voorbeeld.com' },
]
const CONTACTS: string[] = ['Meta AI', 'Contactnaam']

// One tab in the top bar.
function NavTab({
  label,
  icon,
  active,
  onClick,
}: {
  label: string
  icon: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      className={`nav-tab${active ? ' nav-tab--active' : ''}`}
      aria-label={label}
      onClick={onClick}
    >
      {icon}
    </button>
  )
}

// Top bar with logo, tabs and account buttons; `onNavigate` switches between the feed and the profile.
function TopBar({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <header className="topbar">
      <div className="topbar__left">
        <a
          className="logo"
          href="#"
          aria-label="Home"
          onClick={(e) => {
            e.preventDefault()
            onNavigate('home')
          }}
        >
          f
        </a>
        <button className="icon-btn" aria-label="Zoeken">🔍</button>
      </div>

      <nav className="topbar__nav" aria-label="Hoofdnavigatie">
        {NAV_TABS.map((tab) => (
          <NavTab
            key={tab.id}
            label={tab.label}
            icon={tab.icon}
            active={activeTab === tab.id}
            onClick={() => {
              setActiveTab(tab.id)
              if (tab.page) onNavigate(tab.page)
            }}
          />
        ))}
      </nav>

      <div className="topbar__right">
        <button className="icon-btn" aria-label="Menu">⋮⋮⋮</button>
        <button className="icon-btn" aria-label="Messenger">💬</button>
        <button className="icon-btn icon-btn--badge" aria-label="Meldingen">
          🔔
          {NOTIFICATION_COUNT > 0 && <span className="badge">{NOTIFICATION_COUNT}</span>}
        </button>
        <button
          className="avatar avatar--md"
          aria-label="Profiel"
          onClick={() => onNavigate('profile')}
        />
      </div>
    </header>
  )
}

// One row in the left menu.
function SidebarItem({ label, icon }: { label: string; icon: string }) {
  return (
    <a className="sidebar__item" href="#">
      <span className="sidebar__icon">{icon}</span>
      {label}
    </a>
  )
}

// Left column: the user and the menu entries.
function LeftSidebar() {
  return (
    <aside className="sidebar sidebar--left">
      <a className="sidebar__item" href="#">
        <span className="avatar avatar--sm" />
        {USER.fullName}
      </a>
      {SIDEBAR_ITEMS.map((item) => (
        <SidebarItem key={item.label} label={item.label} icon={item.icon} />
      ))}
    </aside>
  )
}

// A single feed post with placeholder content.
function Post({ post, onDismiss }: { post: PostData; onDismiss: (id: number) => void }) {
  return (
    <article className="card post">
      <header className="post__header">
        <span className="avatar avatar--md" />
        <div className="post__meta">
          <strong className="post__author">{post.author}</strong>
          <a className="post__follow" href="#">Volgen</a>
          <span className="post__time">{post.time}</span>
        </div>
        <button className="icon-btn icon-btn--plain" aria-label="Meer opties">•••</button>
        <button
          className="icon-btn icon-btn--plain"
          aria-label="Sluiten"
          onClick={() => onDismiss(post.id)}
        >
          ✕
        </button>
      </header>
      <p className="post__text">{post.text}</p>
      <div className="post__media" />
    </article>
  )
}

// Center column: tabs, composer, story prompt and posts.
function Feed() {
  const [tab, setTab] = useState('foryou')
  const [posts, setPosts] = useState(INITIAL_POSTS)

  // Remove a post from the feed.
  const dismissPost = (id: number) => setPosts((prev) => prev.filter((p) => p.id !== id))

  return (
    <main className="feed">
      <div className="feed__tabs">
        {FEED_TABS.map((t) => (
          <button
            key={t.id}
            className={`feed__tab${tab === t.id ? ' feed__tab--active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <section className="card composer">
        <span className="avatar avatar--md" />
        <button className="composer__input">Wat ben je aan het doen, {USER.firstName}?</button>
        <span className="composer__actions">🎥 🖼️ 😊</span>
      </section>

      <section className="card story-prompt">
        <button className="story-prompt__add">+</button>
        <div>
          <strong>Verhaal maken</strong>
          <p>Deel een foto of video, of schrijf iets</p>
        </div>
      </section>

      {posts.map((post) => (
        <Post key={post.id} post={post} onDismiss={dismissPost} />
      ))}
    </main>
  )
}

// One sponsored ad in the right column.
function Ad({ title, domain }: { title: string; domain: string }) {
  return (
    <a className="ad" href="#">
      <div className="ad__image" />
      <div className="ad__text">
        <strong>{title}</strong>
        <span>{domain}</span>
      </div>
    </a>
  )
}

// One row in the contacts list.
function Contact({ name }: { name: string }) {
  return (
    <a className="contact" href="#">
      <span className="avatar avatar--sm" />
      {name}
    </a>
  )
}

// Right column: sponsored ads and contacts.
function RightSidebar() {
  return (
    <aside className="sidebar sidebar--right">
      <h3 className="sidebar__title">Gesponsord</h3>
      {ADS.map((ad) => (
        <Ad key={ad.id} title={ad.title} domain={ad.domain} />
      ))}

      <hr className="divider" />

      <div className="contacts__header">
        <h3 className="sidebar__title">Contacten</h3>
        <span>🔍 •••</span>
      </div>
      {CONTACTS.map((name) => (
        <Contact key={name} name={name} />
      ))}

      <button className="fab" aria-label="Nieuw bericht">✎</button>
    </aside>
  )
}

// The page switches between the feed and the profile without a router.
function Facebook() {
  const [page, setPage] = useState<Page>('home')

  return (
    <div className="facebook">
      <TopBar onNavigate={setPage} />
      {page === 'profile' ? (
        <FacebookProfiel />
      ) : (
        <div className="layout">
          <LeftSidebar />
          <Feed />
          <RightSidebar />
        </div>
      )}
    </div>
  )
}

export default Facebook