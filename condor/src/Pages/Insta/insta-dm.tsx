import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SearchIcon from '@mui/icons-material/Search'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import './insta-dm.css'

// Sidebar entries; `path` is the SVG path data for each icon.
const NAV_ITEMS: { label: string; path: string; to?: string }[] = [
  { label: 'Home', path: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z', to: '/sandbox/instagram' },
  {
    label: 'Reels',
    path: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zm-9-2 5-3-5-3v6z',
  },
  {
    label: 'Messages',
    path: 'M2.01 21 23 12 2.01 3 2 10l15 2-15 2z',
    to: '/sandbox/instagram/messages',
  },
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

type Conversation = {
  preview: string
  time?: string
  unread?: boolean
  ring?: boolean
  active?: boolean
}

// Placeholder conversations; no real names or photos.
const CONVERSATIONS: Conversation[] = [
  { preview: 'Sent an attachment.', time: '9h', unread: true },
  { preview: 'Sent an attachment.', time: '1d', unread: true, ring: true },
  { preview: 'Active now', active: true },
  { preview: 'Active 2h ago' },
  { preview: 'Active 1d ago' },
  { preview: 'Active 2h ago' },
  { preview: 'Active 52m ago' },
  { preview: 'Active now', active: true },
  { preview: 'You: sent a message.', time: '35w' },
  { preview: 'You sent an attachment.', time: '36w' },
  { preview: 'Sent an attachment.', time: '50w', ring: true },
  { preview: 'Sent an attachment.', time: '1y' },
  { preview: 'Sent an attachment.', time: '1y' },
]

// One row in the conversation list.
function ConversationRow({ conversation }: { conversation: Conversation }) {
  return (
    <div className="dm-conversation">
      <div className={`dm-avatar${conversation.ring ? ' ring' : ''}`}>
        {conversation.active && <span className="dm-active-dot"></span>}
      </div>
      <div className="dm-info">
        <strong>username</strong>
        <p>
          {conversation.preview}
          {conversation.time && ` · ${conversation.time}`}
        </p>
      </div>
      {conversation.unread && <span className="dm-unread"></span>}
    </div>
  )
}

// The sidebar expands on mouse hover or keyboard focus.
function InstaDM() {
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const expanded = hovered || focused
  const location = useLocation()

  return (
    <div className="insta insta-dm">
      <div className={`dm-layout${expanded ? ' sidebar-expanded' : ''}`}>
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
            {NAV_ITEMS.map((item) => {
              const className = item.to === location.pathname ? 'active' : undefined
              const content = (
                <>
                  <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={item.path} />
                  </svg>
                  <span className="nav-label">{item.label}</span>
                </>
              )
              return item.to ? (
                <Link key={item.label} className={className} to={item.to}>
                  {content}
                </Link>
              ) : (
                <a key={item.label} className={className} href="#">
                  {content}
                </a>
              )
            })}
          </nav>

          <div className="more">
            <svg className="more-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
            </svg>
            <span className="more-label">More</span>
          </div>
        </aside>

        <section className="dm-list">
          <header className="dm-header">
            <button className="dm-user" type="button">
              username
              <KeyboardArrowDownIcon />
            </button>
            <CreateOutlinedIcon className="dm-compose" aria-label="New message" />
          </header>

          <div className="dm-search">
            <SearchIcon />
            <input type="text" placeholder="Search" />
          </div>

          <div className="dm-note">
            <span className="dm-note-bubble">What's new...</span>
            <div className="dm-avatar"></div>
            <p>Your note</p>
          </div>

          <div className="dm-tabs">
            <strong>Messages</strong>
            <a href="#">Requests</a>
          </div>

          <div className="dm-conversations">
            {CONVERSATIONS.map((conversation, index) => (
              <ConversationRow key={index} conversation={conversation} />
            ))}
          </div>
        </section>

        <main className="dm-empty">
          <div className="dm-empty-icon">
            <SendOutlinedIcon />
          </div>
          <h2>Your messages</h2>
          <p>Send a message to start a chat.</p>
          <button className="dm-send" type="button">
            Send message
          </button>
        </main>
      </div>
    </div>
  )
}

export default InstaDM
