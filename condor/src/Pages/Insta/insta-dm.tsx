import InstaSidebar from './InstaSidebar'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SearchIcon from '@mui/icons-material/Search'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import './insta-dm.css'

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

function InstaDM() {
  return (
    <div className="insta insta-dm">
      <div className="dm-layout">
        <InstaSidebar />



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
