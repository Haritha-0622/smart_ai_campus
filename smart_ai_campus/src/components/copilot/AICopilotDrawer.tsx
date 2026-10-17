import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Sparkles, X, Send, Bot, User, AlertCircle, FileText, DollarSign, Clock, CheckCircle, ExternalLink, ShieldAlert } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Message {
  id: string
  sender: 'user' | 'assistant'
  text: string
  timestamp: string
  sourceCard?: { type: 'attendance' | 'finance' | 'student' | 'inventory' | 'circular'; title: string; details: string; actionLabel: string; actionPath: string }
}

export const AICopilotDrawer: React.FC = () => {
  const { isCopilotOpen, setIsCopilotOpen, students, attendance, showToast } = useApp()
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([{
    id: 'msg-01', sender: 'assistant',
    text: "Hello! I am SAC Campus Intelligence. I monitor operational signals across attendance, academics, procurement, and student lifecycle. How can I assist you today?",
    timestamp: '10:00 AM'
  }])

  if (!isCopilotOpen) return null

  const suggestedPrompts = [
    'Summarize attendance anomalies today',
    'Explain fleet budget variance',
    'Student progress brief for Rohan Krishna',
    'Draft circular for Diwali term break',
    'Review inventory reorder warnings'
  ]

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input
    if (!query.trim()) return
    const userMsg: Message = { id: `usr-${Date.now()}`, sender: 'user', text: query, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInput('')

    setTimeout(() => {
      let responseText = ''
      let sourceCard: Message['sourceCard'] = undefined
      const lower = query.toLowerCase()

      if (lower.includes('attendance') || lower.includes('anomal')) {
        responseText = "Analysis of today's 2,840 student records shows 96.2% normal gate arrival. Two exceptions detected: Divya Nair (SAC-2025-0846) missed Kaveri Hostel morning muster, and Karthik Raja was delayed due to Ring Road bus diversion."
        sourceCard = { type: 'attendance', title: 'Morning Gate Exception #2', details: 'Divya Nair (Grade 12-A) • Kaveri Hostel muster absent • Automated parent notification triggered.', actionLabel: 'View Attendance Terminal', actionPath: '/app/rfid-attendance' }
      } else if (lower.includes('budget') || lower.includes('fleet') || lower.includes('finance')) {
        responseText = 'Transport Fleet operations show an overrun of -₹1,50,000 against the Q3 allocation of ₹38,00,000. Primary driver: 3 bus engine fuel injector overhauls and diesel price index adjustment. STEM lab budget remains healthy with ₹3,20,000 surplus.'
        sourceCard = { type: 'finance', title: 'Budget Variance: Fleet Head', details: 'Utilized: ₹39,50,000 vs Budgeted: ₹38,00,000 (Overrun -3.9%). Human review recommended.', actionLabel: 'Inspect Financial Ledger', actionPath: '/app/finance' }
      } else if (lower.includes('rohan') || lower.includes('progress') || lower.includes('brief')) {
        const rohan = students[0]
        responseText = `Student Progress Brief for ${rohan.name} (${rohan.regNo}): Maintains high attendance at ${rohan.attendanceRate}%, academic standing A1 (92.4%). Active in Physics Science Club & Thirukkural project. Current open items: Outstanding fee of ₹12,500 and 2 borrowed library titles.`
        sourceCard = { type: 'student', title: '360° Academic & Conduct Profile', details: 'Grade 11-A • Kaveri Hostel Bed 2 • No-Due Status: In Review pending library returns.', actionLabel: 'Open Student 360 Dashboard', actionPath: '/app/student-portal' }
      } else if (lower.includes('diwali') || lower.includes('circular') || lower.includes('draft')) {
        responseText = "I've drafted a Diwali term break circular for your review. It covers campus closure dates (Oct 28 – Nov 3), hostel exit formalities deadline (Oct 27, 5 PM), emergency contact protocols, and reopening procedures. Shall I publish this to all stakeholder groups?"
        sourceCard = { type: 'circular', title: 'Draft Circular: Diwali Term Break 2025', details: 'Audience: All students, parents, and staff • Priority: Important • Estimated reach: 7,400 recipients.', actionLabel: 'Review & Publish Circular', actionPath: '/app/communication' }
      } else if (lower.includes('inventory') || lower.includes('reorder') || lower.includes('stock')) {
        responseText = 'Smart Purchase Alarm triggered: Exam Answer Booklets at 480 units vs 1,000 safety minimum. At current consumption (18 booklets/day), stockout in 27 days — insufficient for term exams starting Oct 18. Recommend immediate PR for 5,000 units at estimated ₹37,500.'
        sourceCard = { type: 'inventory', title: 'Smart Alarm: Exam Booklets Critical', details: '480 units remaining. 3 other items in Low Stock status: Whiteboard Markers, Lab Chemicals (Grade 11), Printer Paper.', actionLabel: 'Open Inventory & Raise PR', actionPath: '/app/inventory' }
      } else {
        responseText = `I analyzed your query across ${attendance.length} attendance records, ${students.length} student profiles, and live campus operational signals. Could you please clarify your request? I can help with: attendance analysis, financial variance, student progress briefs, circular drafts, or inventory reorder assessments.`
      }

      const assistantMsg: Message = {
        id: `ast-${Date.now()}`, sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceCard
      }
      setMessages((prev) => [...prev, assistantMsg])
    }, 800)
  }

  const cardIcons = { attendance: <Clock className="w-4 h-4" />, finance: <DollarSign className="w-4 h-4" />, student: <CheckCircle className="w-4 h-4" />, inventory: <AlertCircle className="w-4 h-4" />, circular: <FileText className="w-4 h-4" /> }

  return (
    <div className="fixed inset-y-0 right-0 z-40 w-full sm:w-96 bg-white dark:bg-[#0D1527] border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-indigo-600 to-indigo-700">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-white animate-pulse" />
          <div>
            <p className="text-sm font-bold text-white">SAC Campus Intelligence</p>
            <p className="text-[10px] text-indigo-200">AI Copilot · Grounded Signals Mode</p>
          </div>
        </div>
        <button onClick={() => setIsCopilotOpen(false)} className="p-1.5 rounded-lg hover:bg-indigo-500 text-white transition-colors cursor-pointer"><X className="w-4 h-4" /></button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'assistant' ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
              {msg.sender === 'assistant' ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
            </div>
            <div className={`flex flex-col gap-1.5 max-w-[80%] ${msg.sender === 'user' ? 'items-end' : ''}`}>
              <div className={`px-3 py-2 rounded-xl text-xs leading-relaxed ${msg.sender === 'assistant' ? 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-700' : 'bg-indigo-600 text-white'}`}>
                {msg.text}
              </div>
              {msg.sourceCard && (
                <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-700 rounded-xl p-3 space-y-2 w-full">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                    {cardIcons[msg.sourceCard.type]}
                    <span className="text-[11px] font-bold">{msg.sourceCard.title}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: msg.sourceCard.details }} />
                  <button onClick={() => { navigate(msg.sourceCard!.actionPath); setIsCopilotOpen(false) }} className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
                    {msg.sourceCard.actionLabel} <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              )}
              <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
        <div className="flex flex-wrap gap-1.5">
          {suggestedPrompts.slice(0, 3).map((p) => (
            <button key={p} onClick={() => handleSend(p)} className="text-[10px] px-2 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800/60 hover:bg-indigo-100 transition-colors cursor-pointer truncate max-w-[140px]">{p}</button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask campus intelligence..."
            className="flex-1 text-xs px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button onClick={() => handleSend()} className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer shrink-0">
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
          <ShieldAlert className="w-3 h-3" />
          <span>Grounded on live campus data · Not financial/legal advice</span>
        </div>
      </div>
    </div>
  )
}
