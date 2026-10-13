import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  AlertCircle,
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  ExternalLink,
  ShieldAlert
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface Message {
  id: string
  sender: 'user' | 'assistant'
  text: string
  timestamp: string
  sourceCard?: {
    type: 'attendance' | 'finance' | 'student' | 'inventory' | 'circular'
    title: string
    details: string
    actionLabel: string
    actionPath: string
  }
}

export const AICopilotDrawer: React.FC = () => {
  const { isCopilotOpen, setIsCopilotOpen, students, attendance, showToast } = useApp()
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-01',
      sender: 'assistant',
      text: "Hello! I am SAC Campus Intelligence. I monitor operational signals across attendance, academics, procurement, and student lifecycle. How can I assist you today?",
      timestamp: '10:00 AM'
    }
  ])

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

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInput('')

    // Generate deterministic intelligent grounded response
    setTimeout(() => {
      let responseText = ''
      let sourceCard: Message['sourceCard'] = undefined

      const lower = query.toLowerCase()

      if (lower.includes('attendance') || lower.includes('anomal')) {
        responseText =
          "Analysis of today's 2,840 student records shows 96.2% normal gate arrival. Two exceptions detected: Divya Nair (SAC-2025-0846) missed Kaveri Hostel morning muster, and Karthik Raja was delayed due to Ring Road bus diversion."
        sourceCard = {
          type: 'attendance',
          title: 'Morning Gate Exception #2',
          details: 'Divya Nair (Grade 12-A) &bull; Kaveri Hostel muster absent &bull; Automated parent notification triggered.',
          actionLabel: 'View Attendance Terminal',
          actionPath: '/app/rfid-attendance'
        }
      } else if (lower.includes('budget') || lower.includes('fleet') || lower.includes('finance')) {
        responseText =
          'Transport Fleet operations show an overrun of -₹1,50,000 against the Q3 allocation of ₹38,00,000. Primary driver: 3 bus engine fuel injector overhauls and diesel price index adjustment. STEM lab budget remains healthy with ₹3,20,000 surplus.'
        sourceCard = {
          type: 'finance',
          title: 'Budget Variance: Fleet Head',
          details: 'Utilized: ₹39,50,000 vs Budgeted: ₹38,00,000 (Overrun -3.9%). Human review recommended.',
          actionLabel: 'Inspect Financial Ledger',
          actionPath: '/app/finance'
        }
      } else if (lower.includes('rohan') || lower.includes('progress') || lower.includes('brief')) {
        const rohan = students[0]
        responseText = `Student Progress Brief for ${rohan.name} (${rohan.regNo}): Maintains high attendance at ${rohan.attendanceRate}%, academic standing A1 (92.4%). Active in Physics Science Club & Thirukkural project. Current open items: Outstanding fee of ₹12,500 and 2 borrowed library titles.`
        sourceCard = {
          type: 'student',
          title: '360° Academic & Conduct Profile',
          details: 'Grade 11-A &bull; Kaveri Hostel Bed 2 &bull; No-Due Status: In Review pending library returns.',
          actionLabel: 'Open Student 360 Dashboard',
          actionPath: '/app/student-portal'
        }
      } else if (lower.includes('circular') || lower.includes('draft') || lower.includes('diwali')) {
        responseText =
          'I have prepared a draft circular: "Notice: Scheduled Diwali Festival Break & Residential Hostel Guidelines (2026)". Target audience: All Parents & Day Scholars. Residential hostels will operate under senior warden coverage.'
        sourceCard = {
          type: 'circular',
          title: 'Draft Circular #CIR-2026-FEST-02',
          details: 'Ready for Principal review & approval before push dispatch.',
          actionLabel: 'Review in Communication Hub',
          actionPath: '/app/communication'
        }
      } else if (lower.includes('inventory') || lower.includes('reorder') || lower.includes('purchase')) {
        responseText =
          'Smart Purchase Alarm: Security Barcoded Examination Answer Sheets are down to 480 booklets (Minimum threshold: 1,000). A high-urgency purchase request PO-2026-0892 has been staged for ₹92,500.'
        sourceCard = {
          type: 'inventory',
          title: 'Smart Purchase Alarm: Exam Booklets',
          details: '480 / 1,000 units in Central Store Bay 3B. Supplier: Navneet Education Supplies Ltd.',
          actionLabel: 'Review in Inventory Hub',
          actionPath: '/app/inventory'
        }
      } else {
        responseText = `Grounded query received: "${query}". SAC Campus Intelligence cross-referenced 15 departmental nodes. No conflicting security alerts found for the current academic session.`
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceCard
      }

      setMessages((prev) => [...prev, botMsg])
    }, 450)
  }

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-white dark:bg-[#101A33] border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              SAC Copilot Intelligence
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-medium">
                Advisory Demo
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Context-Aware Campus Operations Assistant
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsCopilotOpen(false)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Advisory Guardrail Banner */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/50 px-4 py-2 flex items-center gap-2 text-[11px] text-amber-800 dark:text-amber-300">
        <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
        <span>AI outputs are advisory. High-impact campus actions require explicit human sign-off.</span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-start gap-2 max-w-[90%]">
              {msg.sender === 'assistant' && (
                <div className="w-6 h-6 rounded-md bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}
              <div
                className={`p-3 rounded-xl text-xs leading-relaxed shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-100 dark:bg-[#19243E] text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 rounded-tl-none'
                }`}
              >
                {msg.text}

                {/* Grounded Evidence Card */}
                {msg.sourceCard && (
                  <div className="mt-3 p-2.5 rounded-lg bg-white dark:bg-[#101A33] border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white">
                    <p className="font-semibold text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" /> {msg.sourceCard.title}
                    </p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                      {msg.sourceCard.details}
                    </p>
                    <button
                      onClick={() => {
                        navigate(msg.sourceCard!.actionPath)
                        setIsCopilotOpen(false)
                        showToast(`Navigated to ${msg.sourceCard!.title}`, 'info')
                      }}
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                    >
                      {msg.sourceCard.actionLabel} &rarr;
                    </button>
                  </div>
                )}
              </div>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}
      </div>

      {/* Suggested prompts */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
          Suggested Inquiries
        </p>
        <div className="flex flex-wrap gap-1.5">
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="text-[11px] px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-left"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input box */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101A33] flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask Copilot about campus operations..."
          className="flex-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
        />
        <button
          onClick={() => handleSend()}
          className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
