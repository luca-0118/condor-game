import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SearchIcon from '@mui/icons-material/Search'
import DMConversation from './DMConversation'
import { conversations } from './dm-conversations'
import InstaSidebar from './InstaSidebar'
import './insta-dm.css'

function InstaDM() {
  const [selectedId, setSelectedId] = useState(conversations[0]?.id)
  const selectedConversation = conversations.find((conversation) => conversation.id === selectedId)

  return (
    <div className="insta insta-dm">
      <div className="dm-layout">
        <InstaSidebar />

        <section className="dm-list">
          <header className="dm-header">
            <button className="dm-user" type="button">
              <span>
                <strong>Sofia Vale</strong>
                <small>@sofia.vale</small>
              </span>
              <KeyboardArrowDownIcon />
            </button>
            <CreateOutlinedIcon className="dm-compose" aria-label="New message" />
          </header>

          <div className="dm-search">
            <SearchIcon />
            <input type="text" placeholder="Search" aria-label="Search messages" />
          </div>

          <div className="dm-note">
            <span className="dm-note-bubble">What's new...</span>
            <div className="dm-avatar sofia-avatar"><AddIcon /></div>
            <p>Your note</p>
          </div>

          <div className="dm-tabs">
            <strong>Messages</strong>
            <a href="#">Requests</a>
          </div>

          <div className="dm-conversations">
            {conversations.map((conversation) => {
              const selected = conversation.id === selectedId
              return (
                <button
                  className={`dm-conversation${selected ? ' selected' : ''}`}
                  type="button"
                  aria-current={selected ? 'true' : undefined}
                  key={conversation.id}
                  onClick={() => setSelectedId(conversation.id)}
                >
                  <div className="dm-avatar">{conversation.initials}</div>
                  <div className="dm-info">
                    <strong>{conversation.name}</strong>
                    <p>{conversation.preview}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {selectedConversation ? (
          <DMConversation key={selectedConversation.id} conversation={selectedConversation} />
        ) : (
          <main className="dm-no-conversation">No conversations yet.</main>
        )}
      </div>
    </div>
  )
}

export default InstaDM
