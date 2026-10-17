import React, { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import { MessageSquare, Send, Bell, Mail, FileText, Plus, Pin } from 'lucide-react'

type Tab = 'dashboard' | 'circulars' | 'notices' | 'sms-log' | 'email-log' | 'templates'

const TABS: { key: Tab; label: string }[] = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'circulars', label: 'Circulars' },
  { key: 'notices', label: 'Notice Board' },
  { key: 'sms-log', label: 'SMS Log' },
  { key: 'email-log', label: 'Email Log' },
  { key: 'templates', label: 'Templates' },
]

const SMS_LOG = [
  { id: 's1', group: 'All Parents', message: 'Reminder: Term 2 fee due on Oct 31. Pay online at...', sentAt: '2025-10-15 09:00', count: 1240, deliveryRate: 98, status: 'Delivered' },
  { id: 's2', group: 'Grade 10 Parents', message: 'Board exam schedule released. Check portal for details...', sentAt: '2025-10-14 11:30', count: 120, deliveryRate: 100, status: 'Delivered' },
  { id: 's3', group: 'All Staff', message: 'Staff meeting on Oct 18 at 4:30 PM in seminar hall...', sentAt: '2025-10-13 08:00', count: 85, deliveryRate: 97, status: 'Delivered' },
  { id: 's4', group: 'Hostel Parents', message: 'Outpass requests now available on parent portal...', sentAt: '2025-10-12 10:00', count: 340, deliveryRate: 95, status: 'Delivered' },
  { id: 's5', group: 'Bus Route C Parents', message: 'Bus Route C delayed 20 mins today due to traffic...', sentAt: '2025-10-11 07:45', count: 68, deliveryRate: 100, status: 'Delivered' },
  { id: 's6', group: 'Grade 12 Students', message: 'Hall tickets for term exam available for download...', sentAt: '2025-10-10 12:00', count: 165, deliveryRate: 94, status: 'Delivered' },
  { id: 's7', group: 'All Parents', message: 'School will remain closed on Oct 24 (National Holiday)...', sentAt: '2025-10-09 15:00', count: 1240, deliveryRate: 99, status: 'Delivered' },
]

const EMAIL_LOG = [
  { id: 'e1', toGroup: 'All Staff', subject: 'Staff Meeting Agenda — October 18', sentAt: '2025-10-13 07:00', opened: 78, clicked: 45, status: 'Sent' },
  { id: 'e2', toGroup: 'Management', subject: 'Monthly Executive Report — September 2025', sentAt: '2025-10-05 10:00', opened: 12, clicked: 10, status: 'Sent' },
  { id: 'e3', toGroup: 'Grade 12 Parents', subject: 'Board Exam Preparation Guidelines', sentAt: '2025-10-14 09:00', opened: 145, clicked: 98, status: 'Sent' },
  { id: 'e4', toGroup: 'Finance Team', subject: 'Fee Collection Summary — Q2 2025', sentAt: '2025-10-03 11:00', opened: 8, clicked: 7, status: 'Sent' },
  { id: 'e5', toGroup: 'All Parents', subject: 'Annual Day Invitation — November 15, 2025', sentAt: '2025-10-01 16:00', opened: 980, clicked: 720, status: 'Sent' },
]

const BOARD_NOTICES = [
  { id: 'n1', date: '2025-10-15', category: 'Academic', notice: 'Syllabus completion deadline for Term 2 is November 15. All teachers to update pacing charts by Oct 20.', postedBy: 'Academic Dean', pinned: true },
  { id: 'n2', date: '2025-10-14', category: 'Exam', notice: 'Practical examinations for Class 12 will be held November 1–10. Schedules available on portal.', postedBy: 'Exam Controller', pinned: true },
  { id: 'n3', date: '2025-10-13', category: 'Holiday', notice: 'School holiday declared on October 24 (Dussehra). Classes resume October 25.', postedBy: 'Principal', pinned: false },
  { id: 'n4', date: '2025-10-12', category: 'Event', notice: 'Annual Science Exhibition on November 8. All departments to submit participation forms by October 22.', postedBy: 'Science HOD', pinned: false },
  { id: 'n5', date: '2025-10-10', category: 'Academic', notice: 'Parent-Teacher Meeting for Classes 9 and 10 scheduled on October 26 from 10 AM to 1 PM.', postedBy: 'Vice Principal', pinned: false },
  { id: 'n6', date: '2025-10-08', category: 'General', notice: 'Library will remain closed October 21 for annual stock-taking. Resume October 22.', postedBy: 'Librarian', pinned: false },
]

const TEMPLATES = [
  { id: 't1', name: 'Attendance Alert', category: 'Attendance', preview: 'Dear Parent, your ward [Name] was absent on [Date]. Please contact the school if this is unexpected.' },
  { id: 't2', name: 'Fee Payment Reminder', category: 'Finance', preview: 'Dear Parent, fee payment of ₹[Amount] is due on [Date]. Pay online via portal or at the cash counter.' },
  { id: 't3', name: 'Event Notification', category: 'Event', preview: 'We are pleased to invite you to [Event Name] on [Date] at [Time] at [Venue]. RSVP by [RSVP Date].' },
  { id: 't4', name: 'Exam Schedule', category: 'Exam', preview: '[Student Name]\'s [Exam Name] begins on [Date]. Hall ticket available for download on the student portal.' },
  { id: 't5', name: 'Result Published', category: 'Academic', preview: 'The results for [Exam Name] are now published. [Student Name] scored [Score]% with grade [Grade].' },
  { id: 't6', name: 'Bus Delay Alert', category: 'Transport', preview: 'Bus Route [X] is delayed approximately [N] minutes today due to [Reason]. We apologize for the inconvenience.' },
  { id: 't7', name: 'Holiday Announcement', category: 'General', preview: 'The school will remain closed on [Date] on account of [Occasion]. Classes resume on [Next Day].' },
  { id: 't8', name: 'Emergency Circular', category: 'Emergency', preview: 'URGENT: [Emergency description]. Please [Action Required] immediately. Contact: [Contact Number].' },
]

export const Module11_CommunicationManagement: React.FC = () => {
  const { circulars, addCircular, institution, showToast } = useApp()
  const [tab, setTab] = useState<Tab>('dashboard')
  const [showComposeForm, setShowComposeForm] = useState(false)
  const [composeForm, setComposeForm] = useState({ title: '', content: '', priority: 'Routine' as 'Routine' | 'Important' | 'Urgent', audience: [] as string[] })
  const [notices, setNotices] = useState(BOARD_NOTICES)
  const [circularSearch, setCircularSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('all')

  const filteredCirculars = useMemo(() => circulars.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(circularSearch.toLowerCase())
    const matchPriority = priorityFilter === 'all' || c.priority === priorityFilter
    return matchSearch && matchPriority
  }), [circulars, circularSearch, priorityFilter])

  const handleSendCircular = () => {
    if (!composeForm.title || !composeForm.content) { showToast('Title and content are required', 'warning'); return }
    if (composeForm.audience.length === 0) { showToast('Please select at least one audience', 'warning'); return }
    addCircular({
      title: composeForm.title,
      content: composeForm.content,
      priority: composeForm.priority,
      audience: composeForm.audience,
      issuedBy: 'Principal',
      issuedDate: new Date().toISOString().split('T')[0],
    })
    showToast('Circular published and sent to selected audience', 'success')
    setShowComposeForm(false)
    setComposeForm({ title: '', content: '', priority: 'Routine', audience: [] })
  }

  const togglePin = (id: string) => {
    setNotices(prev => prev.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n))
    showToast('Notice pin status updated', 'success')
  }

  const toggleAudience = (a: string) => {
    setComposeForm(prev => ({
      ...prev,
      audience: prev.audience.includes(a) ? prev.audience.filter(x => x !== a) : [...prev.audience, a],
    }))
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-xl font-extrabold text-[#101A33] dark:text-white">Communication & Circulars Hub</h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{institution.name} &bull; SMS, Email, Notices & Circulars</p>
          </div>
          <ExportButton filename="circulars_export" data={circulars.map(c => ({ no: c.circularNo, title: c.title, priority: c.priority, date: c.issuedDate }))} label="Export" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          <StatCard title="Total Circulars" value={circulars.length} subtext="Published" icon={FileText} status="healthy" />
          <StatCard title="SMS Sent" value={SMS_LOG.reduce((a, s) => a + s.count, 0).toLocaleString()} subtext="This month" icon={MessageSquare} status="healthy" />
          <StatCard title="Emails Sent" value={EMAIL_LOG.reduce((a, e) => a + e.opened, 0)} subtext="Opened this month" icon={Mail} status="healthy" />
          <StatCard title="Notice Board" value={notices.filter(n => n.pinned).length} subtext="Pinned notices" icon={Bell} status="healthy" />
        </div>
        <div className="flex flex-wrap gap-2">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${tab === t.key ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'dashboard' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Recent Circulars</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Circular No', 'Title', 'Audience', 'Issued By', 'Date', 'Priority'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {circulars.slice(0, 10).map(c => (
                  <tr key={c.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 font-mono text-slate-500">{c.circularNo}</td>
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{c.title}</td>
                    <td className="py-2 pr-4 text-slate-500">{c.audience.join(', ')}</td>
                    <td className="py-2 pr-4 text-slate-500">{c.issuedBy}</td>
                    <td className="py-2 pr-4 text-slate-500">{c.issuedDate}</td>
                    <td className="py-2 pr-4">
                      <Badge variant={c.priority === 'Urgent' ? 'rose' : c.priority === 'Important' ? 'amber' : 'indigo'}>{c.priority}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'circulars' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <input value={circularSearch} onChange={e => setCircularSearch(e.target.value)} placeholder="Search by title..."
                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48" />
              <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none">
                <option value="all">All Priorities</option>
                <option value="Routine">Routine</option>
                <option value="Important">Important</option>
                <option value="Urgent">Urgent</option>
              </select>
              <button onClick={() => setShowComposeForm(!showComposeForm)}
                className="ml-auto px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
                <Plus className="w-3.5 h-3.5" /> New Circular
              </button>
            </div>

            {showComposeForm && (
              <div className="mb-4 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 space-y-3">
                <p className="text-xs font-bold text-indigo-700 dark:text-indigo-300">Compose New Circular</p>
                <input value={composeForm.title} onChange={e => setComposeForm(p => ({ ...p, title: e.target.value }))} placeholder="Circular title..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <textarea value={composeForm.content} onChange={e => setComposeForm(p => ({ ...p, content: e.target.value }))} placeholder="Circular content..." rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
                <div className="flex flex-wrap gap-4">
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 mb-1">Priority</p>
                    <select value={composeForm.priority} onChange={e => setComposeForm(p => ({ ...p, priority: e.target.value as any }))}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none">
                      <option>Routine</option>
                      <option>Important</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold text-slate-500 mb-1">Audience</p>
                    <div className="flex gap-2 flex-wrap">
                      {['Students', 'Parents', 'Staff', 'Management'].map(a => (
                        <label key={a} className="flex items-center gap-1 cursor-pointer text-xs text-slate-700 dark:text-slate-300">
                          <input type="checkbox" checked={composeForm.audience.includes(a)} onChange={() => toggleAudience(a)} className="accent-indigo-600" />
                          {a}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleSendCircular}
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
                    <Send className="w-3.5 h-3.5" /> Publish & Send
                  </button>
                  <button onClick={() => setShowComposeForm(false)}
                    className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs cursor-pointer">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    {['No.', 'Title', 'Audience', 'Issued By', 'Date', 'Priority'].map(h => (
                      <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredCirculars.map(c => (
                    <tr key={c.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <td className="py-2 pr-4 font-mono text-slate-500">{c.circularNo}</td>
                      <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{c.title}</td>
                      <td className="py-2 pr-4 text-slate-500">{c.audience.join(', ')}</td>
                      <td className="py-2 pr-4 text-slate-500">{c.issuedBy}</td>
                      <td className="py-2 pr-4 text-slate-500">{c.issuedDate}</td>
                      <td className="py-2 pr-4">
                        <Badge variant={c.priority === 'Urgent' ? 'rose' : c.priority === 'Important' ? 'amber' : 'indigo'}>{c.priority}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === 'notices' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Notice Board</h2>
            <button onClick={() => showToast('Opening add notice form...', 'info')}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> Post Notice
            </button>
          </div>
          <div className="space-y-3">
            {[...notices].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)).map(n => (
              <div key={n.id} className={`p-4 rounded-xl border ${n.pinned ? 'border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/10' : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {n.pinned && <Pin className="w-3 h-3 text-indigo-500" />}
                      <Badge variant={n.category === 'Exam' ? 'rose' : n.category === 'Academic' ? 'indigo' : n.category === 'Holiday' ? 'teal' : 'amber'}>{n.category}</Badge>
                      <span className="text-[10px] text-slate-400">{n.date}</span>
                      <span className="text-[10px] text-slate-400">By: {n.postedBy}</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{n.notice}</p>
                  </div>
                  <button onClick={() => togglePin(n.id)}
                    className={`px-2 py-1 rounded text-[10px] font-semibold cursor-pointer shrink-0 ${n.pinned ? 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    {n.pinned ? 'Unpin' : 'Pin'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'sms-log' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">SMS Broadcast Log</h2>
            <button onClick={() => showToast('Opening SMS compose...', 'info')}
              className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
              <Send className="w-3.5 h-3.5" /> Send SMS
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Recipient Group', 'Message', 'Sent At', 'Count', 'Delivery Rate', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SMS_LOG.map(s => (
                  <tr key={s.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{s.group}</td>
                    <td className="py-2 pr-4 text-slate-500 max-w-[180px] truncate">{s.message}</td>
                    <td className="py-2 pr-4 text-slate-500">{s.sentAt}</td>
                    <td className="py-2 pr-4 text-center font-semibold text-slate-700 dark:text-slate-300">{s.count.toLocaleString()}</td>
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-1">
                        <div className="w-10 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700">
                          <div className="h-1.5 rounded-full bg-teal-500" style={{ width: `${s.deliveryRate}%` }} />
                        </div>
                        <span className="text-[10px] font-semibold text-teal-600">{s.deliveryRate}%</span>
                      </div>
                    </td>
                    <td className="py-2 pr-4"><Badge variant="teal">{s.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'email-log' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Email Campaign Log</h2>
            <button onClick={() => showToast('Opening email compose...', 'info')}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
              <Mail className="w-3.5 h-3.5" /> Send Email
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['To Group', 'Subject', 'Sent At', 'Opened', 'Clicked', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EMAIL_LOG.map(e => (
                  <tr key={e.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{e.toGroup}</td>
                    <td className="py-2 pr-4 text-slate-500 max-w-[200px] truncate">{e.subject}</td>
                    <td className="py-2 pr-4 text-slate-500">{e.sentAt}</td>
                    <td className="py-2 pr-4 text-center font-semibold text-indigo-600">{e.opened}</td>
                    <td className="py-2 pr-4 text-center font-semibold text-teal-600">{e.clicked}</td>
                    <td className="py-2 pr-4"><Badge variant="teal">{e.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'templates' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Message Templates</h2>
            <button onClick={() => showToast('Opening template editor...', 'info')}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> Add Template
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEMPLATES.map(t => (
              <div key={t.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={t.category === 'Finance' ? 'amber' : t.category === 'Emergency' ? 'rose' : t.category === 'Attendance' ? 'teal' : 'indigo'}>{t.category}</Badge>
                </div>
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">{t.name}</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed flex-1 line-clamp-3">{t.preview}</p>
                <button onClick={() => showToast(`Using template: ${t.name}`, 'info')}
                  className="mt-3 w-full py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-[10px] font-semibold hover:bg-indigo-100 cursor-pointer">
                  Use Template
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
