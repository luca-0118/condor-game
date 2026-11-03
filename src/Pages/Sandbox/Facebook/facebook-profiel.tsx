import { useState, type ReactNode } from 'react'
import './facebook-profiel.css'

interface Suggestion {
  id: number
  name: string
  mutual: string
}

interface ProfilePostData {
  id: number
  date: string
  text: string
  link: { domain: string; title: string } | null
}

type PostsView = 'list' | 'grid'

// Placeholder profile data.
const PROFILE = {
  name: 'Voornaam Achternaam',
  friendCount: 1,
  birthday: '1 januari 2000',
  gender: 'Geslacht',
}

// "People you may know" cards.
const SUGGESTIONS: Suggestion[] = [1, 2, 3, 4, 5].map((n) => ({
  id: n,
  name: `Voorbeeldnaam ${n}`,
  mutual: n === 1 ? 'Gevolgd door 12' : '1 gemeenschappelijke vriend',
}))

// Tabs under the profile header.
const PROFILE_TABS: string[] = ['Alles', 'Info', 'Vrienden', "Foto's", 'Reels', 'Meer ▾']

// Placeholder posts; `link` adds a link preview under the post.
const PROFILE_POSTS: ProfilePostData[] = [
  {
    id: 1,
    date: '2 oktober 2022',
    text: '',
    link: { domain: 'VOORBEELD.COM', title: 'Titel van een gedeelde link' },
  },
  { id: 2, date: '2 februari 2021', text: 'Dit is een placeholder-bericht.', link: null },
]

// Header: large avatar, name, friend count and action buttons.
function ProfileHeader({ name, friendCount }: { name: string; friendCount: number }) {
  return (
    <section className="profile__header">
      <span className="avatar profile__avatar" />
      <div className="profile__id">
        <h1 className="profile__name">{name}</h1>
        <span className="profile__friends">{friendCount} vriend</span>
      </div>
      <div className="profile__actions">
        <button className="btn btn--primary">+ Toevoegen aan verhaal</button>
        <button className="btn">✎ Profiel bewerken</button>
        <button className="btn" aria-label="Meer">⌃</button>
      </div>
    </section>
  )
}

// One card in the "People you may know" row.
function PersonCard({
  person,
  onDismiss,
}: {
  person: Suggestion
  onDismiss: (id: number) => void
}) {
  return (
    <div className="person-card">
      <button
        className="person-card__close"
        aria-label="Verwijderen"
        onClick={() => onDismiss(person.id)}
      >
        ✕
      </button>
      <div className="person-card__photo" />
      <div className="person-card__body">
        <strong>{person.name}</strong>
        <span>{person.mutual}</span>
        <button className="btn btn--soft">👤 Vriend toevoegen</button>
      </div>
    </div>
  )
}

// Scrolling row of suggestions; dismissed cards are removed from the row.
function PeopleYouMayKnow() {
  const [people, setPeople] = useState(SUGGESTIONS)

  // Remove a suggestion from the row.
  const dismissPerson = (id: number) => setPeople((prev) => prev.filter((p) => p.id !== id))

  return (
    <section className="card people">
      <header className="people__header">
        <strong>Mensen die je misschien kent</strong>
        <a href="#">Alles weergeven</a>
      </header>
      <div className="people__row">
        {people.map((person) => (
          <PersonCard key={person.id} person={person} onDismiss={dismissPerson} />
        ))}
      </div>
    </section>
  )
}

// Tab bar under the header; the active tab is controlled by the parent.
function ProfileTabs({ active, onChange }: { active: string; onChange: (tab: string) => void }) {
  return (
    <nav className="profile__tabs" aria-label="Profiel">
      {PROFILE_TABS.map((tab) => (
        <button
          key={tab}
          className={`profile__tab${active === tab ? ' profile__tab--active' : ''}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
      <button className="btn profile__more" aria-label="Meer opties">•••</button>
    </nav>
  )
}

// Reusable card for the left column: a title, an optional action on the right and optional content.
function SideCard({
  title,
  action,
  children,
}: {
  title: string
  action?: ReactNode
  children?: ReactNode
}) {
  return (
    <section className="card">
      <div className="side-card__head">
        <strong>{title}</strong>
        {action}
      </div>
      {children}
    </section>
  )
}

// Left column: tip, personal details, highlights, friends and photos.
function ProfileSidebar() {
  const [showTip, setShowTip] = useState(true)

  return (
    <div className="profile__side">
      {showTip && (
        <SideCard
          title="Haal meer uit Facebook"
          action={
            <button
              className="icon-btn icon-btn--plain"
              aria-label="Sluiten"
              onClick={() => setShowTip(false)}
            >
              ✕
            </button>
          }
        >
          <p className="muted">
            We hebben het makkelijker gemaakt om de dingen waarin je geïnteresseerd bent toe te
            voegen.
          </p>
          <button className="btn btn--soft btn--block">Je profiel bijwerken</button>
        </SideCard>
      )}

      <SideCard title="Persoonlijke gegevens" action={<span className="muted">✎</span>}>
        <p className="side-card__row">🎂 {PROFILE.birthday}</p>
        <p className="side-card__row">⚥ {PROFILE.gender}</p>
      </SideCard>

      <SideCard title="Hoogtepunten">
        <button className="btn btn--block">Hoogtepunten toevoegen</button>
      </SideCard>

      <SideCard
        title="Vrienden"
        action={<a className="link" href="#">Alle vrienden weergeven</a>}
      >
        <p className="muted">{PROFILE.friendCount} vriend</p>
        <div className="friend-tile">
          <div className="friend-tile__photo" />
          <span>Vriendnaam</span>
        </div>
      </SideCard>

      <SideCard
        title="Foto's"
        action={<a className="link" href="#">Alle foto's weergeven</a>}
      />

      <footer className="profile__footer">Privacy · Voorwaarden · Adverteren · Cookies · Meer</footer>
    </div>
  )
}

// "Posts" card with the filter buttons and the list/grid switch.
function PostsHeader({ view, onChange }: { view: PostsView; onChange: (view: PostsView) => void }) {
  return (
    <section className="card posts-head">
      <div className="side-card__head">
        <strong>Berichten</strong>
        <div className="posts-head__buttons">
          <button className="btn">⇅ Filters</button>
          <button className="btn">⚙ Berichten beheren</button>
        </div>
      </div>
      <div className="view-toggle">
        <button
          className={`view-toggle__btn${view === 'list' ? ' view-toggle__btn--active' : ''}`}
          onClick={() => onChange('list')}
        >
          Lijstweergave
        </button>
        <button
          className={`view-toggle__btn${view === 'grid' ? ' view-toggle__btn--active' : ''}`}
          onClick={() => onChange('grid')}
        >
          Rasterweergave
        </button>
      </div>
    </section>
  )
}

// A single profile post with placeholder content.
function ProfilePost({ post }: { post: ProfilePostData }) {
  return (
    <article className="card post">
      <header className="post__header">
        <span className="avatar avatar--sm" />
        <div className="post__meta">
          <strong>{PROFILE.name}</strong>
          <span className="post__time">{post.date}</span>
        </div>
        <button className="icon-btn icon-btn--plain" aria-label="Meer opties">•••</button>
      </header>

      {post.text && <p className="post__text">{post.text}</p>}

      {post.link && (
        <>
          <div className="post__media" />
          <div className="link-preview">
            <span>{post.link.domain}</span>
            <strong>{post.link.title}</strong>
          </div>
        </>
      )}

      <div className="post__actions">
        <button>👍 Vind ik leuk</button>
        <button>💬 Reageren</button>
        <button>↪ Delen</button>
      </div>

      <div className="post__comment">
        <span className="avatar avatar--sm" />
        <button className="composer__input">Schrijf een opmerking…</button>
      </div>
    </article>
  )
}

// Right column: composer, posts header and the posts in a list or grid.
function ProfileMain() {
  const [view, setView] = useState<PostsView>('list')

  return (
    <div className="profile__main">
      <section className="card composer">
        <span className="avatar avatar--md" />
        <button className="composer__input">Wat ben je aan het doen?</button>
      </section>

      <PostsHeader view={view} onChange={setView} />

      <div className={`profile__posts${view === 'grid' ? ' profile__posts--grid' : ''}`}>
        {PROFILE_POSTS.map((post) => (
          <ProfilePost key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

// The top bar comes from Facebook.tsx, so this page only renders the profile itself.
function FacebookProfiel() {
  const [tab, setTab] = useState('Alles')

  return (
    <div className="profile">
      <ProfileHeader name={PROFILE.name} friendCount={PROFILE.friendCount} />
      <PeopleYouMayKnow />
      <ProfileTabs active={tab} onChange={setTab} />

      <div className="profile__columns">
        <ProfileSidebar />
        <ProfileMain />
      </div>
    </div>
  )
}

export default FacebookProfiel