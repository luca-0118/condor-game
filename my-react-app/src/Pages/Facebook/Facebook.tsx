import { useState } from 'react'
import './Facebook.css'

/* ===== Placeholder data (edit content here) ===== */
const user = { firstName: 'Voornaam', fullName: 'Voornaam Achternaam' }
const notificationCount = 0

const navTabs = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'video', label: 'Video', icon: '🎬' },
  { id: 'friends', label: 'Vrienden', icon: '👥' },
  { id: 'marketplace', label: 'Marketplace', icon: '🏪' },
  { id: 'gaming', label: 'Gaming', icon: '🎮' },
]

const sidebarItems = [
  { label: 'Meta AI', icon: '✨' },
  { label: 'Vrienden', icon: '👥' },
  { label: 'Herinneringen', icon: '🕒' },
  { label: 'Opgeslagen', icon: '🔖' },
  { label: 'Groepen', icon: '🫂' },
  { label: 'Reels', icon: '🎞️' },
  { label: 'Marketplace', icon: '🏪' },
  { label: 'Overzichten', icon: '📊' },
]

const initialPosts = [
  {
    id: 1,
    author: 'Paginanaam',
    time: '1 u',
    text: 'Dit is een placeholder-bericht. Vervang deze tekst door je eigen content.',
  },
]

const ads = [
  { id: 1, title: 'Advertentietitel', domain: 'voorbeeld.com' },
  { id: 2, title: 'Advertentietitel', domain: 'voorbeeld.com' },
]

const contacts = ['Meta AI', 'Contactnaam']

type PostData = (typeof initialPosts)[number]

/* ===== Top bar ===== */
function TopBar() {
  const [activeTab, setActiveTab] = useState('home')

  return (
    <header className="topbar">
      <div className="topbar__left">
        <a className="logo" href="#" aria-label="Home">f</a>
        <button className="icon-btn" aria-label="Zoeken">🔍</button>
      </div>

      <nav className="topbar__nav" aria-label="Hoofdnavigatie">
        {navTabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'nav-tab--active' : ''}`}
            aria-label={tab.label}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
          </button>
        ))}
      </nav>

      <div className="topbar__right">
        <button className="icon-btn" aria-label="Menu">⋮⋮⋮</button>
        <button className="icon-btn" aria-label="Messenger">💬</button>
        <button className="icon-btn icon-btn--badge" aria-label="Meldingen">
          🔔
          {notificationCount > 0 && <span className="badge">{notificationCount}</span>}
        </button>
        <button className="avatar avatar--md" aria-label="Account" />
      </div>
    </header>
  )
}

/* ===== Left sidebar ===== */
function LeftSidebar() {
  return (
    <aside className="sidebar sidebar--left">
      <a className="sidebar__item" href="#">
        <span className="avatar avatar--sm" />
        {user.fullName}
      </a>
      {sidebarItems.map((item) => (
        <a key={item.label} className="sidebar__item" href="#">
          <span className="sidebar__icon">{item.icon}</span>
          {item.label}
        </a>
      ))}
    </aside>
  )
}

/* ===== Post ===== */
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

/* ===== Feed ===== */
function Feed() {
  const [tab, setTab] = useState<'foryou' | 'following'>('foryou')
  const [posts, setPosts] = useState(initialPosts)

  const dismissPost = (id: number) => setPosts((prev) => prev.filter((p) => p.id !== id))

  return (
    <main className="feed">
      <div className="feed__tabs">
        <button
          className={`feed__tab ${tab === 'foryou' ? 'feed__tab--active' : ''}`}
          onClick={() => setTab('foryou')}
        >
          Voor jou
        </button>
        <button
          className={`feed__tab ${tab === 'following' ? 'feed__tab--active' : ''}`}
          onClick={() => setTab('following')}
        >
          Volgend
        </button>
      </div>

      <section className="card composer">
        <span className="avatar avatar--md" />
        <button className="composer__input">Wat ben je aan het doen, {user.firstName}?</button>
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

/* ===== Right sidebar ===== */
function RightSidebar() {
  return (
    <aside className="sidebar sidebar--right">
      <h3 className="sidebar__title">Gesponsord</h3>
      {ads.map((ad) => (
        <a key={ad.id} className="ad" href="#">
          <div className="ad__image" />
          <div className="ad__text">
            <strong>{ad.title}</strong>
            <span>{ad.domain}</span>
          </div>
        </a>
      ))}

      <hr className="divider" />

      <div className="contacts__header">
        <h3 className="sidebar__title">Contacten</h3>
        <span>🔍 •••</span>
      </div>
      {contacts.map((name) => (
        <a key={name} className="contact" href="#">
          <span className="avatar avatar--sm" />
          {name}
        </a>
      ))}
      <button className="fab" aria-label="Nieuw bericht">✎</button>
    </aside>
  )
}

/* ===== Page ===== */
export default function Facebook() {
  return (
    <>
      <TopBar />
      <div className="layout">
        <LeftSidebar />
        <Feed />
        <RightSidebar />
      </div>
    </>
  )
}
