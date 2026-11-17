import { useState } from 'react'
import type { SocialUser } from '../../../data/socialUser'
import './facebook-profiel.css'

const PROFILE_TABS = ['All', 'About', 'Friends', 'Photos', 'Reels', 'More ▾']

const SUGGESTIONS = ['Emma de Vries', 'Liam Jansen', 'Mila van Dijk', 'Noah Bakker']

function FacebookTemporaryProfile({
  user,
  onBack,
}: {
  user: SocialUser
  onBack: () => void
}) {
  const [activeTab, setActiveTab] = useState('All')
  const avatarStyle = user.avatar
    ? {
        backgroundImage: `url("${user.avatar}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }
    : undefined

  return (
    <div className="profile">
      <section className="profile__header">
        <span className="avatar profile__avatar" style={avatarStyle}>
          {!user.avatar && user.name.slice(0, 1)}
        </span>
        <div className="profile__id">
          <h1 className="profile__name">{user.name}</h1>
          <span className="profile__friends">@{user.username} · {user.followers.toLocaleString()} followers</span>
        </div>
        <div className="profile__actions">
          <button className="btn btn--primary" type="button">👤 Add friend</button>
          <button className="btn" type="button">💬 Message</button>
          <button className="btn" type="button" onClick={onBack}>Back to feed</button>
        </div>
      </section>

      <section className="card people">
        <header className="people__header">
          <strong>People you may know</strong>
          <a href="#">See all</a>
        </header>
        <div className="people__row">
          {SUGGESTIONS.map((name) => (
            <div className="person-card" key={name}>
              <div className="person-card__photo" />
              <div className="person-card__body">
                <strong>{name}</strong>
                <span>Suggested for you</span>
                <button className="btn btn--soft" type="button">👤 Add friend</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <nav className="profile__tabs" aria-label="Profile">
        {PROFILE_TABS.map((tab) => (
          <button
            key={tab}
            className={`profile__tab${activeTab === tab ? ' profile__tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <button className="btn profile__more" aria-label="More options">•••</button>
      </nav>

      <div className="profile__columns">
        <aside className="profile__side">
          <section className="card">
            <div className="side-card__head"><strong>Intro</strong></div>
            <p className="muted">{user.bio || 'No bio available.'}</p>
            <button className="btn btn--block" type="button">Edit details</button>
          </section>

          <section className="card">
            <div className="side-card__head">
              <strong>Friends</strong>
              <a className="link" href="#">See all friends</a>
            </div>
            <p className="muted">{user.followers.toLocaleString()} followers</p>
            <div className="friend-tile">
              <div className="friend-tile__photo" />
              <span>People you may know</span>
            </div>
          </section>

          <section className="card">
            <div className="side-card__head">
              <strong>Photos</strong>
              <a className="link" href="#">See all photos</a>
            </div>
          </section>
          <footer className="profile__footer">Privacy · Terms · Advertising · Cookies · More</footer>
        </aside>

        <main className="profile__main">
          <section className="card composer">
            <span className="avatar avatar--md" />
            <button className="composer__input">What&apos;s on your mind?</button>
          </section>

          <section className="card posts-head">
            <div className="side-card__head">
              <strong>Posts</strong>
              <div className="posts-head__buttons">
                <button className="btn" type="button">⇅ Filters</button>
                <button className="btn" type="button">⚙ Manage posts</button>
              </div>
            </div>
            <div className="view-toggle">
              <button className="view-toggle__btn view-toggle__btn--active">List view</button>
              <button className="view-toggle__btn">Grid view</button>
            </div>
          </section>

          <article className="card post">
            <header className="post__header">
              <span className="avatar avatar--sm" style={avatarStyle} />
              <div className="post__meta">
                <strong>{user.name}</strong>
                <span className="post__time">Profile</span>
              </div>
              <button className="icon-btn icon-btn--plain" aria-label="More options">•••</button>
            </header>
            <p className="post__text">{user.bio || `${user.name} joined Facebook.`}</p>
            <div className="post__actions">
              <button type="button">👍 Like</button>
              <button type="button">💬 Comment</button>
              <button type="button">↪ Share</button>
            </div>
            <div className="post__comment">
              <span className="avatar avatar--sm" />
              <button className="composer__input">Write a comment…</button>
            </div>
          </article>
        </main>
      </div>
    </div>
  )
}

export default FacebookTemporaryProfile
