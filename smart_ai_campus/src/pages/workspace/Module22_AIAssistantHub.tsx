import React, { useState, useMemo, useRef, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import {
  Sparkles, Bot, Zap, MessageSquare, TrendingUp, Settings,
  Send, RotateCcw, ChevronRight, AlertCircle, CheckCircle2,
  BarChart2, Brain, Lightbulb, Target
} from 'lucide-react'

type Tab = 'chat' | 'insights' | 'recommendations' | 'config'

interface ChatMessage { id: string; role: 'user' | 'assistant'; content: string; ts: string }

const AI_RESPONSES: Record<string, string> = {
  attendance: "📊 **Attendance Overview:**\n\nCurrent institution-wide attendance stands at **87.4%** — below the 90% target. Departments with concerning attendance:\n- Commerce: 79.2% (critical)\n- Arts: 82.1% (warning)\n\n**Recommended action:** Schedule parent-teacher meetings for students with <75% attendance and send automated SMS reminders.",
  fee: "💰 **Fee Collection Status:**\n\nTotal fee outstanding: ₹14.2 Lakhs from 43 students.\n- ₹8.1L overdue >30 days (high risk)\n- ₹6.1L due within next 30 days\n\n**Top defaulters by amount** are in Class 12-Commerce.\n\n**Recommended:** Trigger SMS sequence + principal call list for top 10 defaulters.",
  exam: "📝 **Examination Insights:**\n\nMid-term results show **Science average at 72%** (above target). Concern areas:\n- Mathematics: 18 students scored below 40%\n- English: 7 students need supplementary support\n\n**AI Suggestion:** Auto-enroll flagged students in remedial sessions. Generate individualized parent reports.",
  staff: "👩‍🏫 **Staff Analytics:**\n\nOf **47 total staff**, 44 are active today. 3 on approved leave.\n\nTeaching load analysis:\n- 4 staff members at >120% load (burn-out risk)\n- 2 departments have timetable conflicts this week\n\n**Recommended:** Redistribute load for Science HOD and reassign 2 free periods.",
  default: "🤖 **SAC AI Copilot here!**\n\nI can help you analyze:\n- **Attendance** patterns and exceptions\n- **Fee** collection and defaulters\n- **Exam** performance and student risk\n- **Staff** workload and availability\n- **Hostel** occupancy and maintenance\n- **Transport** delays and route efficiency\n\nJust ask me anything about your institution's data!"
}

export const Module22_AIAssistantHub: React.FC = () => {
  const { setIsCopilotOpen, institution, showToast, students, staffList, attendance, approvals, notifications } = useApp()
  const [activeTab, setActiveTab] = useState<Tab>('chat')
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', role: 'assistant', content: AI_RESPONSES.default, ts: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [aiConfig, setAiConfig] = useState({ anomalyDetection: true, autoRemedial: true, feeRiskScoring: true, attendanceAlerts: true, performanceTrend: true, nlpQuery: true })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, isTyping])

  const insights = useMemo(() => {
    const totalStudents = students.length
    const activeStudents = students.filter(s => s.status === 'Active').length
    const avgAttendance = students.length > 0 ? Math.round(students.reduce((s, st) => s + (st.attendanceRate ?? 0), 0) / students.length) : 0
    const feeDefaulters = students.filter(s => (s.feePending ?? 0) > 0).length
    const totalPending = approvals.filter(a => a.status === 'Pending').length
    const unreadNotifs = notifications.filter(n => !n.read).length
    return { totalStudents, activeStudents, avgAttendance, feeDefaulters, totalPending, unreadNotifs }
  }, [students, approvals, notifications])

  const recommendations = [
    { id: 1, priority: 'High', category: 'Attendance', title: 'Initiate attendance recovery for 23 students', description: `${students.filter(s => (s.attendanceRate ?? 100) < 75).length} students have attendance below 75%. Automated parent SMS recommended.`, action: 'Send SMS', icon: <AlertCircle size={16} className="text-rose-500" /> },
    { id: 2, priority: 'High', category: 'Finance', title: 'Fee collection follow-up — 43 defaulters', description: `₹14.2L outstanding. 38 students overdue >30 days. Escalation to principal required for top 10.`, action: 'Generate Call List', icon: <AlertCircle size={16} className="text-rose-500" /> },
    { id: 3, priority: 'Medium', category: 'Academic', title: 'Remedial sessions for Maths underperformers', description: '18 students scored below 40% in mid-term Mathematics. Recommend remedial batches on Saturday.', action: 'Create Batches', icon: <Lightbulb size={16} className="text-amber-500" /> },
    { id: 4, priority: 'Medium', category: 'HR', title: 'Redistribute teaching load — Science HOD overloaded', description: 'Science HOD has 128% load this week. Reassign 2 periods to available staff.', action: 'View Timetable', icon: <Lightbulb size={16} className="text-amber-500" /> },
    { id: 5, priority: 'Low', category: 'Library', title: 'Overdue books — 12 students', description: '12 students have books overdue >14 days. Automated reminder email scheduled.', action: 'Send Reminder', icon: <CheckCircle2 size={16} className="text-teal-500" /> },
    { id: 6, priority: 'Low', category: 'Transport', title: 'Optimize Bus Route 4 — low utilization', description: 'Bus Route 4 is at 38% capacity. Consider merging with Route 7 to save costs.', action: 'View Analytics', icon: <CheckCircle2 size={16} className="text-teal-500" /> },
  ]

  const getAIResponse = (userMsg: string): string => {
    const lower = userMsg.toLowerCase()
    if (lower.includes('attend')) return AI_RESPONSES.attendance
    if (lower.includes('fee') || lower.includes('payment') || lower.includes('default')) return AI_RESPONSES.fee
    if (lower.includes('exam') || lower.includes('result') || lower.includes('test')) return AI_RESPONSES.exam
    if (lower.includes('staff') || lower.includes('teacher') || lower.includes('faculty')) return AI_RESPONSES.staff
    if (lower.includes('student')) return `📚 **Student Analytics:**\n\nTotal enrolled: **${insights.totalStudents}** students (${insights.activeStudents} active).\n\nAverage attendance: **${insights.avgAttendance}%** | Fee defaulters: **${insights.feeDefaulters}**\n\nUse the Insights tab for detailed breakdowns by department, grade, and category.`
    return `I understand you're asking about "${userMsg}". Let me check the SAC database...\n\nHere's what I found:\n- **${insights.totalStudents}** total students across all departments\n- **${insights.avgAttendance}%** average attendance\n- **${insights.totalPending}** pending approvals awaiting action\n- **${insights.unreadNotifs}** unread notifications\n\nCould you be more specific? Try asking about attendance, fees, exams, or staff.`
  }

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input, ts: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    setTimeout(() => {
      const reply: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: getAIResponse(userMsg.content), ts: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }
      setMessages(prev => [...prev, reply])
      setIsTyping(false)
    }, 1200)
  }

  const quickPrompts = ['Show attendance summary', 'Fee defaulters report', 'Exam performance analysis', 'Staff workload overview']

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'chat', label: 'AI Chat', icon: <MessageSquare size={14} /> },
    { key: 'insights', label: 'Smart Insights', icon: <BarChart2 size={14} /> },
    { key: 'recommendations', label: 'Recommendations', icon: <Lightbulb size={14} /> },
    { key: 'config', label: 'AI Config', icon: <Settings size={14} /> },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles size={24} className="text-indigo-500" />
            AI Assistant Hub
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {institution?.name} — Intelligent campus intelligence & automation
          </p>
        </div>
        <button onClick={() => setIsCopilotOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity shadow-md">
          <Bot size={16} />Open AI Copilot
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === t.key ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
            }`}>
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {/* Chat */}
      {activeTab === 'chat' && (
        <div className="flex flex-col h-[600px] bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
          {/* Chat header */}
          <div className="flex items-center gap-3 p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Bot size={18} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-slate-700 dark:text-slate-200">SAC AI Copilot</p>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />Online · Analyzing {insights.totalStudents} students</p>
            </div>
            <button onClick={() => { setMessages([{ id: 'init', role: 'assistant', content: AI_RESPONSES.default, ts: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }]); showToast('Conversation cleared', 'info') }}
              className="ml-auto p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
              <RotateCcw size={14} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(m => (
              <div key={m.id} className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${m.role === 'assistant' ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
                  {m.role === 'assistant' ? <Bot size={14} className="text-white" /> : <span className="text-xs font-bold text-slate-600 dark:text-slate-300">ME</span>}
                </div>
                <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${m.role === 'assistant' ? 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200' : 'bg-indigo-600 text-white'}`}>
                  <p className="text-sm whitespace-pre-line">{m.content}</p>
                  <p className={`text-[10px] mt-1.5 ${m.role === 'assistant' ? 'text-slate-400' : 'text-indigo-200'}`}>{m.ts}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl px-4 py-3">
                  <div className="flex gap-1.5 items-center">
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick prompts */}
          <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 flex gap-2 overflow-x-auto">
            {quickPrompts.map(p => (
              <button key={p} onClick={() => { setInput(p); setTimeout(() => { setInput(''); const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: p, ts: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }; setMessages(prev => [...prev, userMsg]); setIsTyping(true); setTimeout(() => { const reply: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: getAIResponse(p), ts: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }; setMessages(prev => [...prev, reply]); setIsTyping(false) }, 1200) }, 100) }}
                className="shrink-0 px-3 py-1.5 text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 transition-colors">
                {p}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex gap-3">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
              placeholder="Ask about attendance, fees, performance, staff..."
              className="flex-1 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button onClick={handleSend} disabled={!input.trim() || isTyping}
              className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Insights */}
      {activeTab === 'insights' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <StatCard title="Total Students" value={insights.totalStudents} subtext={`${insights.activeStudents} active`} icon={<Brain size={18} />} status="healthy" />
            <StatCard title="Avg Attendance" value={`${insights.avgAttendance}%`} subtext="Institution-wide" icon={<TrendingUp size={18} />} status={insights.avgAttendance < 85 ? 'warning' : 'healthy'} />
            <StatCard title="Fee Defaulters" value={insights.feeDefaulters} subtext="Students with dues" icon={<AlertCircle size={18} />} status={insights.feeDefaulters > 20 ? 'critical' : 'warning'} />
            <StatCard title="Pending Approvals" value={insights.totalPending} subtext="Awaiting action" icon={<Zap size={18} />} status={insights.totalPending > 5 ? 'warning' : 'healthy'} />
            <StatCard title="Unread Alerts" value={insights.unreadNotifs} subtext="Notifications" icon={<AlertCircle size={18} />} status={insights.unreadNotifs > 5 ? 'warning' : 'healthy'} />
            <StatCard title="Staff On Duty" value={staffList.filter(s => s.status === 'Active').length} subtext={`of ${staffList.length} total`} icon={<Target size={18} />} status="healthy" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-5">
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-indigo-500" /> Attendance by Category</h3>
              {['Regular', 'Sports', 'NRI', 'Management', 'SC/ST'].map((cat, i) => {
                const pct = [89, 84, 92, 88, 81][i]
                return (
                  <div key={cat} className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 dark:text-slate-300">{cat}</span>
                      <span className={`font-semibold ${pct < 85 ? 'text-rose-600' : 'text-slate-700 dark:text-slate-200'}`}>{pct}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                      <div className={`h-2 rounded-full ${pct < 85 ? 'bg-rose-500' : 'bg-indigo-500'}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-5">
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2"><BarChart2 size={16} className="text-indigo-500" /> AI Detected Anomalies</h3>
              <div className="space-y-3">
                {[
                  { title: 'Sudden attendance drop — Commerce Sem 3', severity: 'rose', detail: '15% drop vs last week — may indicate timetable issue' },
                  { title: 'Fee collection stalled — Week 3', severity: 'amber', detail: 'Only 23% of target collected this week' },
                  { title: 'Library usage spike on Thursdays', severity: 'indigo', detail: 'Positive trend — 3x normal usage on exam prep days' },
                  { title: 'Hostel Block B — repeated maintenance requests', severity: 'amber', detail: '4 plumbing requests in 7 days — systemic issue likely' },
                ].map((a, i) => (
                  <div key={i} className={`p-3 rounded-xl border ${a.severity === 'rose' ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800' : a.severity === 'amber' ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800' : 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800'}`}>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{a.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{a.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {activeTab === 'recommendations' && (
        <div className="space-y-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">{recommendations.length} AI-generated recommendations — sorted by priority</p>
          {recommendations.map(r => (
            <div key={r.id} className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
                  {r.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Badge variant={r.priority === 'High' ? 'rose' : r.priority === 'Medium' ? 'amber' : 'teal'}>{r.priority} Priority</Badge>
                    <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{r.category}</span>
                  </div>
                  <h3 className="font-semibold text-slate-700 dark:text-slate-200">{r.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{r.description}</p>
                </div>
                <button onClick={() => showToast(`Action initiated: ${r.action}`, 'success')} className="shrink-0 flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white rounded-xl text-xs font-medium hover:bg-indigo-700 transition-colors">
                  {r.action}<ChevronRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Config */}
      {activeTab === 'config' && (
        <div className="max-w-2xl space-y-4">
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-6">
            <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-5 flex items-center gap-2">
              <Settings size={16} className="text-indigo-500" /> AI Module Configuration
            </h3>
            <div className="space-y-4">
              {(Object.keys(aiConfig) as (keyof typeof aiConfig)[]).map(key => {
                const labels: Record<keyof typeof aiConfig, { label: string; desc: string }> = {
                  anomalyDetection: { label: 'Anomaly Detection', desc: 'Detect unusual patterns in attendance, fees, and behavior' },
                  autoRemedial: { label: 'Auto Remedial Grouping', desc: 'Automatically suggest remedial batches for struggling students' },
                  feeRiskScoring: { label: 'Fee Default Risk Scoring', desc: 'Score students by likelihood of fee default using historical data' },
                  attendanceAlerts: { label: 'Predictive Attendance Alerts', desc: 'Alert when student is trending toward absenteeism' },
                  performanceTrend: { label: 'Performance Trend Analysis', desc: 'Track academic progression across exams and semesters' },
                  nlpQuery: { label: 'Natural Language Queries', desc: 'Allow staff to query campus data using plain English' },
                }
                const { label, desc } = labels[key]
                return (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
                    </div>
                    <button onClick={() => { setAiConfig(prev => ({ ...prev, [key]: !prev[key] })); showToast(`${label} ${!aiConfig[key] ? 'enabled' : 'disabled'}`, 'success') }}
                      className={`ml-4 shrink-0 w-12 h-6 rounded-full transition-all relative ${aiConfig[key] ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'}`}>
                      <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow ${aiConfig[key] ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-5">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 mb-2">AI Model Status</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-300">Model Version</span><span className="font-mono text-indigo-600 dark:text-indigo-400">SAC-AI v2.4.1</span></div>
              <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-300">Data Points Analyzed</span><span className="font-semibold text-slate-700 dark:text-slate-200">{(insights.totalStudents * 47).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-300">Last Model Sync</span><span className="text-slate-600 dark:text-slate-300">Today 06:00 AM</span></div>
              <div className="flex justify-between"><span className="text-slate-600 dark:text-slate-300">Prediction Accuracy</span><span className="font-semibold text-green-600">94.2%</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
