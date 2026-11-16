import InstaSidebar from './InstaSidebar'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SearchIcon from '@mui/icons-material/Search'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined'
import './insta-dm.css'
import AddIcon from '@mui/icons-material/Add';

type Message = {
  sender: 'jamie' | 'sofia'
  text: string
  attachment?: boolean
}

type MessageDay = {
  date: string
  messages: Message[]
}

const MESSAGE_DAYS: MessageDay[] = [
  {
    date: 'October 14, 2026',
    messages: [
      { sender: 'jamie', text: "Hey Sofia! I've been following you for months. Love your content!" },
      { sender: 'sofia', text: 'Aww, thank you so much!!' },
      {
        sender: 'jamie',
        text: "I work with a new online store called MONA. We're launching a new collection and looking for influencers to promote our products.",
      },
      { sender: 'sofia', text: 'Oh really? That sounds interesting! What kind of products?' },
      {
        sender: 'jamie',
        text: 'Mostly beauty products, skincare and lifestyle accessories. We offer free products and paid promotions.',
      },
      { sender: 'sofia', text: 'That sounds great! How does the collaboration work?' },
      {
        sender: 'jamie',
        text: "It's very simple. We send you our campaign details, you check out the products, and then you post about our website on your social media.",
      },
      { sender: 'sofia', text: "Okay! Send me the details and I'll have a look." },
    ],
  },
  {
    date: 'October 15, 2026',
    messages: [
      {
        sender: 'jamie',
        text: "Hey Sofia! Here's the campaign document. It contains all the information about the products and payment.",
      },
      { sender: 'jamie', text: 'MONA_Campaign.pdf.exe', attachment: true },
      { sender: 'sofia', text: 'Thanks! But why does the file end with .exe? I thought it was a PDF.' },
      {
        sender: 'jamie',
        text: "Haha, don't worry! That's just how our system exports the files. It's completely normal.",
      },
      { sender: 'sofia', text: "Alright, I'll open it on my laptop later." },
      { sender: 'jamie', text: "Perfect! Let me know when you've checked everything." },
    ],
  },
  {
    date: 'October 16, 2026',
    messages: [
      {
        sender: 'sofia',
        text: "Hey! I opened the document yesterday, but my laptop has been acting really strangely since then.",
      },
      { sender: 'jamie', text: "Really? That's strange. Maybe it's just a Windows update." },
      {
        sender: 'sofia',
        text: "I don't know. Some applications opened by themselves, and my laptop was suddenly very slow.",
      },
      { sender: 'jamie', text: "Don't worry about it. Anyway, we should start the promotion today!" },
      { sender: 'sofia', text: 'Sure! Send me the website link.' },
      { sender: 'jamie', text: 'Here it is: MONA.' },
      { sender: 'jamie', text: 'Website: www.mona-shop.example' },
      { sender: 'sofia', text: "Looks good! I'll check it out." },
      { sender: 'jamie', text: "Great! We'd love to see your first post today." },
    ],
  },
  {
    date: 'October 17, 2026',
    messages: [
      { sender: 'sofia', text: 'Hey, did you change something on my Instagram account?' },
      { sender: 'jamie', text: 'What do you mean?' },
      { sender: 'sofia', text: "There are posts promoting MONA that I didn't upload myself." },
      { sender: 'jamie', text: 'Maybe you scheduled them by accident?' },
      { sender: 'sofia', text: "No, I definitely didn't. Also, I can't access some of my account settings." },
      { sender: 'jamie', text: 'I think you should contact Instagram support.' },
      { sender: 'sofia', text: "Something is seriously wrong. I'm going to get my laptop checked." },
      { sender: 'jamie', text: 'Okay. Good luck!' },
    ],
  },
]

function InstaDM() {
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
            <button className="dm-conversation selected" type="button" aria-current="true">
              <div className="dm-avatar">JC</div>
              <div className="dm-info">
                <strong>Jamie Cole</strong>
                <p>Okay. Good luck! · Oct 17</p>
              </div>
            </button>
          </div>
        </section>

        <main className="dm-chat">
          <header className="dm-chat-header">
            <div className="dm-avatar">JC</div>
            <div>
              <strong>Jamie Cole</strong>
              <p>@jamie.collins</p>
            </div>
          </header>

          <section className="dm-messages" aria-label="Conversation with Jamie Cole">
            <div className="dm-profile">
              <div className="dm-avatar">JC</div>
              <strong>Jamie Cole</strong>
              <p>@jamie.collins · Instagram</p>
            </div>

            {MESSAGE_DAYS.map((day) => (
              <div className="dm-message-day" key={day.date}>
                <div className="dm-date">{day.date}</div>
                {day.messages.map((message, index) => (
                  <div className={`dm-message ${message.sender}`} key={`${day.date}-${index}`}>
                    {message.attachment ? (
                      <div className="dm-attachment">
                        <span className="dm-attachment-icon" aria-hidden="true">
                          FILE
                        </span>
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
      </div>
    </div>
  )
}

export default InstaDM
