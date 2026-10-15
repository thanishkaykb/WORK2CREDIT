import React, { useState } from 'react'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Avatar } from '../components/ui/index'
import { Send, Phone, Video, MoreVertical, Search, Paperclip, CheckCheck, Clock, ShieldCheck } from 'lucide-react'

interface Message {
  id: string
  senderId: string
  text: string
  time: string
  isMe: boolean
}

interface ChatThread {
  id: string
  name: string
  role: string
  avatar?: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  jobRef?: string
}

const DEMO_THREADS: ChatThread[] = [
  {
    id: 't1',
    name: 'Ananya Sharma',
    role: 'Customer',
    lastMessage: 'Great, please come by around 2:30 PM tomorrow.',
    time: '10:45 AM',
    unread: 2,
    online: true,
    jobRef: '#BK-8902 Fan Wiring'
  },
  {
    id: 't2',
    name: 'Vikram Mehta',
    role: 'Customer',
    lastMessage: 'Can you bring extra copper wiring just in case?',
    time: 'Yesterday',
    unread: 0,
    online: false,
    jobRef: '#BK-8841 Inverter Setup'
  },
  {
    id: 't3',
    name: 'Rajesh Kumar (Electrician)',
    role: 'Worker',
    lastMessage: 'I have arrived at your building entrance.',
    time: 'Oct 12',
    unread: 0,
    online: true,
    jobRef: '#BK-8819 MCB Fix'
  }
]

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'm1',
    senderId: 'other',
    text: 'Hello Rajesh! I booked your electrical repair service for tomorrow.',
    time: '10:30 AM',
    isMe: false
  },
  {
    id: 'm2',
    senderId: 'me',
    text: 'Hello Ananya! Yes, I received the booking notification. I will bring the standard testing equipment and heavy-duty wire.',
    time: '10:35 AM',
    isMe: true
  },
  {
    id: 'm3',
    senderId: 'other',
    text: 'Great, please come by around 2:30 PM tomorrow.',
    time: '10:45 AM',
    isMe: false
  }
]

export function MessagesPage() {
  const [threads, setThreads] = useState<ChatThread[]>(DEMO_THREADS)
  const [activeThreadId, setActiveThreadId] = useState<string>('t1')
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES)
  const [inputText, setInputText] = useState('')
  const [search, setSearch] = useState('')

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0]

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'me',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    }

    setMessages(prev => [...prev, newMsg])
    setInputText('')

    // Update last message in thread
    setThreads(prev => prev.map(t =>
      t.id === activeThreadId
        ? { ...t, lastMessage: newMsg.text, time: 'Just now' }
        : t
    ))
  }

  const filteredThreads = threads.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.lastMessage.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col">
        <div className="bg-white rounded-2xl border border-teal-100 shadow-sm flex-1 flex flex-col md:flex-row overflow-hidden min-h-[620px]">
          {/* Threads List Sidebar */}
          <div className="w-full md:w-80 lg:w-96 border-r border-teal-100 flex flex-col bg-white">
            <div className="p-4 border-b border-teal-100">
              <h1 className="text-xl font-bold text-teal-950 mb-3">Messages</h1>
              <div className="relative">
                <Search className="w-4 h-4 text-teal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-cream-50 border border-teal-100 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-teal-50">
              {filteredThreads.map(thread => (
                <button
                  key={thread.id}
                  onClick={() => {
                    setActiveThreadId(thread.id)
                    setThreads(prev => prev.map(t => t.id === thread.id ? { ...t, unread: 0 } : t))
                  }}
                  className={`w-full p-4 text-left flex items-start gap-3 transition-colors ${
                    activeThreadId === thread.id ? 'bg-teal-50/70 border-l-4 border-l-teal-600' : 'hover:bg-teal-50/30'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <Avatar name={thread.name} size="md" />
                    {thread.online && (
                      <span className="w-3 h-3 rounded-full bg-mint-500 border-2 border-white absolute bottom-0 right-0" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-semibold text-teal-900 truncate">{thread.name}</p>
                      <span className="text-[11px] text-teal-400 flex-shrink-0">{thread.time}</span>
                    </div>

                    {thread.jobRef && (
                      <span className="inline-block px-1.5 py-0.5 rounded text-[10px] bg-teal-100/60 text-teal-700 font-medium mb-1">
                        {thread.jobRef}
                      </span>
                    )}

                    <p className="text-xs text-teal-600 truncate">{thread.lastMessage}</p>
                  </div>

                  {thread.unread > 0 && (
                    <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {thread.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Active Chat Conversation */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Header */}
            <div className="p-4 border-b border-teal-100 flex items-center justify-between bg-teal-50/20">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar name={activeThread.name} size="sm" />
                  {activeThread.online && (
                    <span className="w-2.5 h-2.5 rounded-full bg-mint-500 border-2 border-white absolute bottom-0 right-0" />
                  )}
                </div>
                <div>
                  <h2 className="font-bold text-sm text-teal-950 flex items-center gap-1.5">
                    {activeThread.name}
                    <ShieldCheck className="w-4 h-4 text-mint-600" />
                  </h2>
                  <p className="text-xs text-teal-500">
                    {activeThread.online ? 'Online now' : 'Active today'} • {activeThread.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-teal-100 text-teal-600 transition-colors" title="Audio Call">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-teal-100 text-teal-600 transition-colors" title="Video Consultation">
                  <Video className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-teal-100 text-teal-600 transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages body */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-cream-50/40">
              <div className="text-center my-2">
                <span className="text-[11px] bg-teal-100/60 text-teal-700 px-3 py-1 rounded-full font-medium">
                  🔒 Messages are end-to-end secured. Platform rules apply to bookings & payments.
                </span>
              </div>

              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] sm:max-w-[65%] rounded-2xl p-3.5 shadow-sm ${
                      msg.isMe
                        ? 'bg-teal-700 text-white rounded-br-xs'
                        : 'bg-white text-teal-950 border border-teal-100 rounded-bl-xs'
                    }`}
                  >
                    <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>
                    <div className={`flex items-center gap-1 justify-end mt-1 text-[10px] ${
                      msg.isMe ? 'text-teal-200' : 'text-teal-400'
                    }`}>
                      <span>{msg.time}</span>
                      {msg.isMe && <CheckCheck className="w-3.5 h-3.5 text-mint-400" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSend} className="p-3 sm:p-4 border-t border-teal-100 flex items-center gap-2 bg-white">
              <button
                type="button"
                className="p-2 text-teal-500 hover:text-teal-700 hover:bg-teal-50 rounded-xl transition-colors"
                title="Attach photos or documents"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm rounded-xl bg-cream-50 border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-600 text-teal-900"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="btn-primary p-2.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
