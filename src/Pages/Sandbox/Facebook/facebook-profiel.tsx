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
  name: 'First Last',
  friendCount: 1,
  birthday: 'January 1, 2000',
  gender: 'Gender',
}

// "People you may know" cards.
const SUGGESTIONS: Suggestion[] = [1, 2, 3, 4, 5].map((n) => ({
  id: n,
  name: `Example name ${n}`,
  mutual: n === 1 ? 'Followed by 12' : '1 mutual friend',
}))

// Tabs under the profile header.
const PROFILE_TABS: string[] = ['All', 'About', 'Friends', 'Photos', 'Reels', 'More ▾']

// Placeholder posts; `link` adds a link preview under the post.
const PROFILE_POSTS: ProfilePostData[] = [
  {
    id: 1,
    date: 'October 2, 2022',
    text: '',
    link: { domain: 'EXAMPLE.COM', title: 'Title of a shared link' },
  },
  { id: 2, date: 'February 2, 2021', text: 'This is a placeholder post.', link: null },
]

// Header: large avatar, name, friend count and action buttons.
function ProfileHeader({ name, friendCount }: { name: string; friendCount: number }) {
  return (
    <section className="profile__header">
      <span className="avatar profile__avatar" />
      <div className="profile__id">
        <h1 className="profile__name">{name}</h1>
        <span className="profile__friends">{friendCount} {friendCount === 1 ? 'friend' : 'friends'}</span>
      </div>
      <div className="profile__actions">
        <button className="btn btn--primary">+ Add to story</button>
        <button className="btn">✎ Edit profile</button>
        <button className="btn" aria-label="More">⌃</button>
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
        aria-label="Remove"
        onClick={() => onDismiss(person.id)}
      >
        ✕
      </button>
      <div className="person-card__photo" />
      <div className="person-card__body">
        <strong>{person.name}</strong>
        <span>{person.mutual}</span>
        <button className="btn btn--soft">👤 Add friend</button>
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
        <strong>People you may know</strong>
        <a href="#">See all</a>
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
    <nav className="profile__tabs" aria-label="Profile">
      {PROFILE_TABS.map((tab) => (
        <button
          key={tab}
          className={`profile__tab${active === tab ? ' profile__tab--active' : ''}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
      <button className="btn profile__more" aria-label="More options">•••</button>
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
          title="Get more out of Facebook"
          action={
            <button
              className="icon-btn icon-btn--plain"
              aria-label="Close"
              onClick={() => setShowTip(false)}
            >
              ✕
            </button>
          }
        >
          <p className="muted">
            We have made it easier to add the things you are interested in.
          </p>
          <button className="btn btn--soft btn--block">Update your profile</button>
        </SideCard>
      )}

      <SideCard title="Personal details" action={<span className="muted">✎</span>}>
        <p className="side-card__row">🎂 {PROFILE.birthday}</p>
        <p className="side-card__row">⚥ {PROFILE.gender}</p>
      </SideCard>

      <SideCard title="Highlights">
        <button className="btn btn--block">Add highlights</button>
      </SideCard>

      <SideCard
        title="Friends"
        action={<a className="link" href="#">See all friends</a>}
      >
        <p className="muted">{PROFILE.friendCount} {PROFILE.friendCount === 1 ? 'friend' : 'friends'}</p>
        <div className="friend-tile">
          <div className="friend-tile__photo" />
          <span>Friend name</span>
        </div>
      </SideCard>

      <SideCard
        title="Photos"
        action={<a className="link" href="#">See all photos</a>}
      />

      <footer className="profile__footer">Privacy · Terms · Advertising · Cookies · More</footer>
    </div>
  )
}

// "Posts" card with the filter buttons and the list/grid switch.
function PostsHeader({ view, onChange }: { view: PostsView; onChange: (view: PostsView) => void }) {
  return (
    <section className="card posts-head">
      <div className="side-card__head">
        <strong>Posts</strong>
        <div className="posts-head__buttons">
          <button className="btn">⇅ Filters</button>
          <button className="btn">⚙ Manage posts</button>
        </div>
      </div>
      <div className="view-toggle">
        <button
          className={`view-toggle__btn${view === 'list' ? ' view-toggle__btn--active' : ''}`}
          onClick={() => onChange('list')}
        >
          List view
        </button>
        <button
          className={`view-toggle__btn${view === 'grid' ? ' view-toggle__btn--active' : ''}`}
          onClick={() => onChange('grid')}
        >
          Grid view
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
        <button className="icon-btn icon-btn--plain" aria-label="More options">•••</button>
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
        <button>👍 Like</button>
        <button>💬 Comment</button>
        <button>↪ Share</button>
      </div>

      <div className="post__comment">
        <span className="avatar avatar--sm" />
        <button className="composer__input">Write a comment…</button>
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
        <button className="composer__input">What&apos;s on your mind?</button>
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
  const [tab, setTab] = useState('All')

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