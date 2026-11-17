import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import type { Conversation } from './dm-conversations'

function DMConversation({ conversation }: { conversation: Conversation }) {
  return (
    <main className="dm-chat">
      <header className="dm-chat-header">
        <div className="dm-avatar">{conversation.initials}</div>
        <div>
          <strong>{conversation.name}</strong>
          <p>@{conversation.username}</p>
        </div>
      </header>

      <section className="dm-messages" aria-label={`Conversation with ${conversation.name}`}>
        <div className="dm-profile">
          <div className="dm-avatar">{conversation.initials}</div>
          <strong>{conversation.name}</strong>
          <p>@{conversation.username} · Instagram</p>
        </div>

        {conversation.days.map((day, dayIndex) => (
          <div className="dm-message-day" key={`${day.date}-${dayIndex}`}>
            <div className="dm-date">{day.date}</div>
            {day.messages.map((message, index) => (
              <div className={`dm-message ${message.sender}`} key={index}>
                {message.attachment ? (
                  <div className="dm-attachment">
                    <span className="dm-attachment-icon" aria-hidden="true">FILE</span>
                    <span>📎 Attachment: {message.text}</span>
                  </div>
                ) : (
                  message.text
                )}
              </div>
            ))}
          </div>
        ))}
      </section>

      <div className="dm-reply" aria-label="Message composer">
        <span>Message...</span>
        <SendOutlinedIcon aria-label="Send message" />
      </div>
    </main>
  )
}

export default DMConversation
