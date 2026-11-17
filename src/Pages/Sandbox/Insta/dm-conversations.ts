type Message = {
  sender: 'contact' | 'self'
  text: string
  attachment?: boolean
}

type MessageDay = {
  date: string
  messages: Message[]
}

export type Conversation = {
  id: string
  name: string
  username: string
  initials: string
  preview: string
  days: MessageDay[]
}

export const conversations: Conversation[] = [
  {
    id: 'jamie',
    name: 'Jamie Cole',
    username: 'jamie.collins',
    initials: 'JC',
    preview: 'Okay. Good luck! · Oct 17',
    days: [
      {
        date: 'October 14, 2026',
        messages: [
          { sender: 'contact', text: "Hey Sofia! I've been following you for months. Love your content!" },
          { sender: 'self', text: 'Aww, thank you so much!!' },
          {
            sender: 'contact',
            text: "I work with a new online store called MONA. We're launching a new collection and looking for influencers to promote our products.",
          },
          { sender: 'self', text: 'Oh really? That sounds interesting! What kind of products?' },
          {
            sender: 'contact',
            text: 'Mostly beauty products, skincare and lifestyle accessories. We offer free products and paid promotions.',
          },
          { sender: 'self', text: 'That sounds great! How does the collaboration work?' },
          {
            sender: 'contact',
            text: "It's very simple. We send you our campaign details, you check out the products, and then you post about our website on your social media.",
          },
          { sender: 'self', text: "Okay! Send me the details and I'll have a look." },
        ],
      },
      {
        date: 'October 15, 2026',
        messages: [
          {
            sender: 'contact',
            text: "Hey Sofia! Here's the campaign document. It contains all the information about the products and payment.",
          },
          { sender: 'contact', text: 'MONA_Campaign.pdf.exe', attachment: true },
          { sender: 'self', text: 'Thanks! But why does the file end with .exe? I thought it was a PDF.' },
          {
            sender: 'contact',
            text: "Haha, don't worry! That's just how our system exports the files. It's completely normal.",
          },
          { sender: 'self', text: "Alright, I'll open it on my laptop later." },
          { sender: 'contact', text: "Perfect! Let me know when you've checked everything." },
        ],
      },
      {
        date: 'October 16, 2026',
        messages: [
          {
            sender: 'self',
            text: "Hey! I opened the document yesterday, but my laptop has been acting really strangely since then.",
          },
          { sender: 'contact', text: "Really? That's strange. Maybe it's just a Windows update." },
          {
            sender: 'self',
            text: "I don't know. Some applications opened by themselves, and my laptop was suddenly very slow.",
          },
          { sender: 'contact', text: "Don't worry about it. Anyway, we should start the promotion today!" },
          { sender: 'self', text: 'Sure! Send me the website link.' },
          { sender: 'contact', text: 'Here it is: MONA.' },
          { sender: 'contact', text: 'Website: www.mona-shop.example' },
          { sender: 'self', text: "Looks good! I'll check it out." },
          { sender: 'contact', text: "Great! We'd love to see your first post today." },
        ],
      },
      {
        date: 'October 17, 2026',
        messages: [
          { sender: 'self', text: 'Hey, did you change something on my Instagram account?' },
          { sender: 'contact', text: 'What do you mean?' },
          { sender: 'self', text: "There are posts promoting MONA that I didn't upload myself." },
          { sender: 'contact', text: 'Maybe you scheduled them by accident?' },
          { sender: 'self', text: "No, I definitely didn't. Also, I can't access some of my account settings." },
          { sender: 'contact', text: 'I think you should contact Instagram support.' },
          { sender: 'self', text: "Something is seriously wrong. I'm going to get my laptop checked." },
          { sender: 'contact', text: 'Okay. Good luck!' },
        ],
      },
    ],
  },
]
