import { useState } from 'react'
import './facebook-profiel.css'

/* ===== Profile page ===== */
const profile = { name: 'Voornaam Achternaam', friendCount: 1, birthday: '1 januari 2000', gender: 'Geslacht' }
const suggestions = [1, 2, 3, 4, 5].map((n) => ({
  id: n,
  name: `Voorbeeldnaam ${n}`,
  mutual: n === 1 ? 'Gevolgd door 12' : '1 gemeenschappelijke vriend',
}))
const profileTabs = ['Alles', 'Info', 'Vrienden', "Foto's", 'Reels', 'Meer ▾']
const profilePosts = [
  { id: 1, date: '2 oktober 2022', text: '', link: { domain: 'VOORBEELD.COM', title: 'Titel van een gedeelde link' } },
  { id: 2, date: '2 februari 2021', text: 'Dit is een placeholder-bericht.', link: null },
]

export default function FacebookProfiel() {
  const [tab, setTab] = useState('Alles')
  const [view, setView] = useState<'list' | 'grid'>('list')
  const [people, setPeople] = useState(suggestions)
  const [showTip, setShowTip] = useState(true)

  return (
    <div className="profile">
      <section className="profile__header">
        <span className="avatar profile__avatar" />
        <div className="profile__id">
          <h1 className="profile__name">{profile.name}</h1>
          <span className="profile__friends">{profile.friendCount} vriend</span>
        </div>
        <div className="profile__actions">
          <button className="btn btn--primary">+ Toevoegen aan verhaal</button>
          <button className="btn">✎ Profiel bewerken</button>
          <button className="btn" aria-label="Meer">⌃</button>
        </div>
      </section>

      <section className="card people">
        <header className="people__header">
          <strong>Mensen die je misschien kent</strong>
          <a href="#">Alles weergeven</a>
        </header>
        <div className="people__row">
          {people.map((p) => (
            <div key={p.id} className="person-card">
              <button
                className="person-card__close"
                aria-label="Verwijderen"
                onClick={() => setPeople((prev) => prev.filter((x) => x.id !== p.id))}
              >
                ✕
              </button>
              <div className="person-card__photo" />
              <div className="person-card__body">
                <strong>{p.name}</strong>
                <span>{p.mutual}</span>
                <button className="btn btn--soft">👤 Vriend toevoegen</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <nav className="profile__tabs" aria-label="Profiel">
        {profileTabs.map((t) => (
          <button
            key={t}
            className={`profile__tab ${tab === t ? 'profile__tab--active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
        <button className="btn profile__more" aria-label="Meer opties">•••</button>
      </nav>

      <div className="profile__columns">
        <div className="profile__side">
          {showTip && (
            <section className="card">
              <div className="side-card__head">
                <strong>Haal meer uit Facebook</strong>
                <button className="icon-btn icon-btn--plain" aria-label="Sluiten" onClick={() => setShowTip(false)}>✕</button>
              </div>
              <p className="muted">We hebben het makkelijker gemaakt om de dingen waarin je geïnteresseerd bent toe te voegen.</p>
              <button className="btn btn--soft btn--block">Je profiel bijwerken</button>
            </section>
          )}

          <section className="card">
            <div className="side-card__head">
              <strong>Persoonlijke gegevens</strong>
              <span className="muted">✎</span>
            </div>
            <p className="side-card__row">🎂 {profile.birthday}</p>
            <p className="side-card__row">⚥ {profile.gender}</p>
          </section>

          <section className="card">
            <strong>Hoogtepunten</strong>
            <button className="btn btn--block">Hoogtepunten toevoegen</button>
          </section>

          <section className="card">
            <div className="side-card__head">
              <strong>Vrienden</strong>
              <a className="link" href="#">Alle vrienden weergeven</a>
            </div>
            <p className="muted">{profile.friendCount} vriend</p>
            <div className="friend-tile">
              <div className="friend-tile__photo" />
              <span>Vriendnaam</span>
            </div>
          </section>

          <section className="card">
            <div className="side-card__head">
              <strong>Foto's</strong>
              <a className="link" href="#">Alle foto's weergeven</a>
            </div>
          </section>

          <footer className="profile__footer">Privacy · Voorwaarden · Adverteren · Cookies · Meer</footer>
        </div>

        <div className="profile__main">
          <section className="card composer">
            <span className="avatar avatar--md" />
            <button className="composer__input">Wat ben je aan het doen?</button>
          </section>

          <section className="card posts-head">
            <div className="side-card__head">
              <strong>Berichten</strong>
              <div className="posts-head__buttons">
                <button className="btn">⇅ Filters</button>
                <button className="btn">⚙ Berichten beheren</button>
              </div>
            </div>
            <div className="view-toggle">
              <button className={view === 'list' ? 'view-toggle__btn view-toggle__btn--active' : 'view-toggle__btn'} onClick={() => setView('list')}>Lijstweergave</button>
              <button className={view === 'grid' ? 'view-toggle__btn view-toggle__btn--active' : 'view-toggle__btn'} onClick={() => setView('grid')}>Rasterweergave</button>
            </div>
          </section>

          <div className={view === 'grid' ? 'profile__posts profile__posts--grid' : 'profile__posts'}>
            {profilePosts.map((post) => (
              <article key={post.id} className="card post">
                <header className="post__header">
                  <span className="avatar avatar--sm" />
                  <div className="post__meta">
                    <strong>{profile.name}</strong>
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
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
