import React, { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import {
  Bell, Mail, MessageSquare, Send, Clock, Settings, CheckCheck,
  AlertCircle, Trash2, Filter, Phone, Users, Zap, ToggleLeft, ToggleRight
} from 'lucide-react'

type Tab = 'inbox' | 'compose' | 'sms' | 'email' | 'whatsapp' | 'scheduled' | 'settings'

interface SmsLog { id: string; recipient: string; message: string; sent: string; status: 'Delivered' | 'Failed' | 'Pending'; type: string }
interface EmailLog { id: string; to: string; subject: string; sent: string; status: 'Delivered' | 'Bounced' | 'Pending'; type: string }
interface WhatsAppLog { id: string; to: string; message: string; sent: string; status: 'Read' | 'Delivered' | 'Failed'; type: string }
interface ScheduledMsg { id: string; channel: string; target: string; subject: string; scheduledFor: string; status: 'Scheduled' | 'Sent' | 'Cancelled' }

export const Module21_NotificationsAlerts: React.FC = () => {
  const { notifications, markNotificationsAsRead, institution, showToast, students } = useApp()
  const [activeTab, setActiveTab] = useState<Tab>('inbox')
  const [catFilter, setCatFilter] = useState('All')
  const [composeChannel, setComposeChannel] = useState<'SMS' | 'Email' | 'WhatsApp' | 'In-App'>('In-App')
  const [composeTarget, setComposeTarget] = useState('All Students')
  const [composeSubject, setComposeSubject] = useState('')
  const [composeBody, setComposeBody] = useState('')
  const [alertSettings, setAlertSettings] = useState({
    attendanceSMS: true, feeDueSMS: true, examResultEmail: true,
    disciplineAlert: true, transportDelay: false, libraryOverdue: true,
    parentWhatsApp: true, staffLeaveApproval: true
  })

  const smsLogs: SmsLog[] = [
    { id: 'S001', recipient: 'All Parents (421)', message: 'Attendance alert: Your ward was absent today 16-Oct-2026', sent: '2026-10-16 10:15', status: 'Delivered', type: 'Attendance' },
    { id: 'S002', recipient: 'Fee Defaulters (38)', message: 'Reminder: Outstanding fee of ₹12,500 due by 31-Oct-2026', sent: '2026-10-15 09:00', status: 'Delivered', type: 'Finance' },
    { id: 'S003', recipient: 'Bus Route 3 Parents (62)', message: 'Bus delayed by 20 mins due to road maintenance near Railway station', sent: '2026-10-15 07:50', status: 'Delivered', type: 'Transport' },
    { id: 'S004', recipient: 'Hostel Warden', message: 'Maintenance alert: Water pump failure in Block C — immediate attention required', sent: '2026-10-14 22:10', status: 'Delivered', type: 'Hostel' },
    { id: 'S005', recipient: 'Exam Coordinators (4)', message: 'Mid-term exam schedule approved. Please coordinate with departments.', sent: '2026-10-14 16:30', status: 'Failed', type: 'Exam' },
  ]

  const emailLogs: EmailLog[] = [
    { id: 'E001', to: 'All Staff (47)', subject: 'Staff Meeting — Thursday 21 Oct 2026 at 4:00 PM', sent: '2026-10-16 11:00', status: 'Delivered', type: 'General' },
    { id: 'E002', to: 'Parents of Semester 3 (134)', subject: 'Mid-Term Exam Results Published — Login to SAC Portal', sent: '2026-10-15 15:45', status: 'Delivered', type: 'Academic' },
    { id: 'E003', to: 'HODs (8)', subject: 'Budget Submission Deadline: 25-Oct-2026', sent: '2026-10-14 10:00', status: 'Delivered', type: 'Admin' },
    { id: 'E004', to: 'New Admissions (26)', subject: 'Welcome to ' + (institution?.name ?? 'SAC') + ' — Account Setup Instructions', sent: '2026-10-10 09:00', status: 'Delivered', type: 'Admission' },
    { id: 'E005', to: 'Library Members (312)', subject: 'Overdue Book Reminder — Please Return or Renew Immediately', sent: '2026-10-13 14:00', status: 'Bounced', type: 'Library' },
  ]

  const whatsAppLogs: WhatsAppLog[] = [
    { id: 'W001', to: 'Class 10-A Parents (34)', message: '📢 Parent-Teacher Meeting on 22-Oct. Please confirm attendance via portal.', sent: '2026-10-16 09:30', status: 'Read', type: 'Event' },
    { id: 'W002', to: 'Hostel Students (89)', message: '🏠 Hostel fee for Nov 2026 due by 30-Oct. Pay online via SAC app.', sent: '2026-10-15 18:00', status: 'Delivered', type: 'Finance' },
    { id: 'W003', to: 'All Parents', message: '🎉 Sports Day — 28-Oct-2026. Students should wear sports uniform.', sent: '2026-10-14 11:00', status: 'Read', type: 'Event' },
    { id: 'W004', to: 'Absent Students (12)', message: '⚠️ You were marked absent today. Please submit leave application on the portal.', sent: '2026-10-16 10:20', status: 'Delivered', type: 'Attendance' },
  ]

  const scheduledMsgs: ScheduledMsg[] = [
    { id: 'SC001', channel: 'SMS', target: 'All Parents', subject: 'Monthly attendance summary for October 2026', scheduledFor: '2026-11-01 08:00', status: 'Scheduled' },
    { id: 'SC002', channel: 'Email', target: 'Fee Defaulters', subject: 'November fee payment reminder', scheduledFor: '2026-11-01 09:00', status: 'Scheduled' },
    { id: 'SC003', channel: 'WhatsApp', target: 'All Students', subject: 'Exam schedule — November 2026', scheduledFor: '2026-10-25 10:00', status: 'Scheduled' },
    { id: 'SC004', channel: 'Email', target: 'All Staff', subject: 'October payslip ready for download', scheduledFor: '2026-11-03 09:00', status: 'Scheduled' },
    { id: 'SC005', channel: 'SMS', target: 'Bus Students', subject: 'Bus schedule change for Diwali week', scheduledFor: '2026-10-31 07:00', status: 'Cancelled' },
  ]

  const unread = useMemo(() => notifications.filter(n => !n.read).length, [notifications])
  const categories = useMemo(() => ['All', ...new Set(notifications.map(n => n.type))], [notifications])
  const filteredNotifs = useMemo(() => catFilter === 'All' ? notifications : notifications.filter(n => n.type === catFilter), [notifications, catFilter])

  const typeVariant = (t: string): 'rose' | 'amber' | 'indigo' | 'teal' => {
    if (t === 'error') return 'rose'
    if (t === 'warning') return 'amber'
    if (t === 'success') return 'teal'
    return 'indigo'
  }

  const handleSend = () => {
    if (!composeBody.trim()) { showToast('Please enter a message body', 'error'); return }
    showToast(`${composeChannel} notification sent to ${composeTarget}`, 'success')
    setComposeBody('')
    setComposeSubject('')
  }

  const toggleSetting = (key: keyof typeof alertSettings) => {
    setAlertSettings(prev => ({ ...prev, [key]: !prev[key] }))
    showToast('Setting updated', 'success')
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'inbox', label: 'Inbox', icon: <Bell size={14} /> },
    { key: 'compose', label: 'Compose', icon: <Send size={14} /> },
    { key: 'sms', label: 'SMS Log', icon: <Phone size={14} /> },
    { key: 'email', label: 'Email Log', icon: <Mail size={14} /> },
    { key: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare size={14} /> },
    { key: 'scheduled', label: 'Scheduled', icon: <Clock size={14} /> },
    { key: 'settings', label: 'Settings', icon: <Settings size={14} /> },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Bell size={24} className="text-indigo-500" />
            Notifications & Alerts
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {institution?.name} — Multi-channel communication hub
          </p>
        </div>
        <ExportButton label="Export" onClick={() => showToast('Log exported', 'success')} />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all relative ${
              activeTab === t.key ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
            }`}>
            {t.icon}{t.label}
            {t.key === 'inbox' && unread > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{unread}</span>
            )}
          </button>
        ))}
      </div>

      {/* Stats */}
      {activeTab === 'inbox' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total Notifications" value={notifications.length} subtext="All channels" icon={<Bell size={18} />} status="healthy" />
          <StatCard title="Unread" value={unread} subtext="Needs attention" icon={<AlertCircle size={18} />} status={unread > 5 ? 'warning' : 'healthy'} />
          <StatCard title="SMS Sent" value={smsLogs.length} subtext="This week" icon={<Phone size={18} />} status="healthy" />
          <StatCard title="Emails Sent" value={emailLogs.length} subtext="This week" icon={<Mail size={18} />} status="healthy" />
        </div>
      )}

      {/* Inbox */}
      {activeTab === 'inbox' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex gap-2 flex-wrap">
              {categories.map(c => (
                <button key={c} onClick={() => setCatFilter(c)}
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all ${catFilter === c ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                  {c}
                </button>
              ))}
            </div>
            {unread > 0 && (
              <button onClick={() => { markNotificationsAsRead(); showToast('All notifications marked as read', 'success') }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">
                <CheckCheck size={14} />Mark All Read
              </button>
            )}
          </div>
          <div className="space-y-2">
            {filteredNotifs.map(n => (
              <div key={n.id} className={`flex items-start gap-4 p-4 rounded-2xl border transition-all hover:shadow-sm ${n.read ? 'bg-white dark:bg-[#131B2E] border-slate-200 dark:border-slate-800' : 'bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-800'}`}>
                <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${n.read ? 'bg-slate-300 dark:bg-slate-600' : 'bg-indigo-500'}`} />
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-medium ${n.read ? 'text-slate-600 dark:text-slate-300' : 'text-slate-800 dark:text-white'}`}>{n.message}</p>
                    <Badge variant={typeVariant(n.type)}>{n.type}</Badge>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{new Date(n.timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                </div>
              </div>
            ))}
            {filteredNotifs.length === 0 && <p className="text-center py-8 text-slate-500 dark:text-slate-400">No notifications found</p>}
          </div>
        </div>
      )}

      {/* Compose */}
      {activeTab === 'compose' && (
        <div className="max-w-2xl">
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-6 space-y-5">
            <h3 className="font-semibold text-slate-700 dark:text-slate-200">Send New Notification</h3>

            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Channel</label>
              <div className="flex gap-2 flex-wrap">
                {(['In-App', 'SMS', 'Email', 'WhatsApp'] as const).map(ch => (
                  <button key={ch} onClick={() => setComposeChannel(ch)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${composeChannel === ch ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'}`}>
                    {ch}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Target Audience</label>
              <select value={composeTarget} onChange={e => setComposeTarget(e.target.value)}
                className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>All Students</option>
                <option>All Parents</option>
                <option>All Staff</option>
                <option>Fee Defaulters</option>
                <option>Hostel Students</option>
                <option>Bus Students</option>
                <option>Library Members</option>
                <option>Custom Group</option>
              </select>
            </div>

            {(composeChannel === 'Email' || composeChannel === 'In-App') && (
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Subject</label>
                <input type="text" value={composeSubject} onChange={e => setComposeSubject(e.target.value)}
                  placeholder="Enter subject line..."
                  className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Message Body</label>
              <textarea value={composeBody} onChange={e => setComposeBody(e.target.value)} rows={5}
                placeholder="Type your message here..."
                className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
              {composeChannel === 'SMS' && <p className="text-xs text-slate-400 mt-1">{composeBody.length}/160 characters</p>}
            </div>

            <div className="flex gap-3">
              <button onClick={handleSend} className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
                <Send size={14} />Send Now
              </button>
              <button onClick={() => showToast('Message scheduled', 'success')} className="flex items-center gap-2 px-5 py-2.5 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 rounded-xl text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">
                <Clock size={14} />Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SMS Log */}
      {activeTab === 'sms' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Recipient</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Message</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Sent At</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {smsLogs.map(s => (
                  <tr key={s.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">{s.recipient}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300 max-w-xs truncate">{s.message}</td>
                    <td className="px-4 py-3"><Badge variant="indigo">{s.type}</Badge></td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs">{s.sent}</td>
                    <td className="px-4 py-3"><Badge variant={s.status === 'Delivered' ? 'teal' : s.status === 'Failed' ? 'rose' : 'amber'}>{s.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Email Log */}
      {activeTab === 'email' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">To</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Subject</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Sent At</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {emailLogs.map(e => (
                  <tr key={e.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">{e.to}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{e.subject}</td>
                    <td className="px-4 py-3"><Badge variant="indigo">{e.type}</Badge></td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs">{e.sent}</td>
                    <td className="px-4 py-3"><Badge variant={e.status === 'Delivered' ? 'teal' : e.status === 'Bounced' ? 'rose' : 'amber'}>{e.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* WhatsApp Log */}
      {activeTab === 'whatsapp' && (
        <div className="space-y-3">
          {whatsAppLogs.map(w => (
            <div key={w.id} className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-slate-700 dark:text-slate-200">{w.to}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{w.sent}</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="teal">{w.type}</Badge>
                  <Badge variant={w.status === 'Read' ? 'teal' : w.status === 'Delivered' ? 'indigo' : 'rose'}>{w.status}</Badge>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl">{w.message}</p>
            </div>
          ))}
        </div>
      )}

      {/* Scheduled */}
      {activeTab === 'scheduled' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">{scheduledMsgs.filter(s => s.status === 'Scheduled').length} pending scheduled messages</p>
            <button onClick={() => showToast('New schedule created', 'success')} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
              <Clock size={14} /> Schedule Message
            </button>
          </div>
          <div className="space-y-3">
            {scheduledMsgs.map(m => (
              <div key={m.id} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${m.status === 'Cancelled' ? 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700 opacity-60' : 'bg-white dark:bg-[#131B2E] border-slate-200 dark:border-slate-800 hover:shadow-sm'}`}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={m.channel === 'SMS' ? 'teal' : m.channel === 'Email' ? 'indigo' : 'amber'}>{m.channel}</Badge>
                    <p className="font-medium text-slate-700 dark:text-slate-200 text-sm">{m.subject}</p>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{m.target} · Scheduled for {m.scheduledFor}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={m.status === 'Scheduled' ? 'indigo' : m.status === 'Sent' ? 'teal' : 'rose'}>{m.status}</Badge>
                  {m.status === 'Scheduled' && (
                    <button onClick={() => showToast('Schedule cancelled', 'warning')} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl space-y-4">
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-6">
            <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-5 flex items-center gap-2">
              <Zap size={16} className="text-amber-500" /> Automated Alert Settings
            </h3>
            <div className="space-y-4">
              {(Object.keys(alertSettings) as (keyof typeof alertSettings)[]).map(key => {
                const labels: Record<keyof typeof alertSettings, { label: string; desc: string }> = {
                  attendanceSMS: { label: 'Attendance SMS to Parents', desc: 'Send SMS when student marked absent' },
                  feeDueSMS: { label: 'Fee Due SMS', desc: 'Automated reminder 7 days before due date' },
                  examResultEmail: { label: 'Exam Result Email', desc: 'Email parents when results are published' },
                  disciplineAlert: { label: 'Discipline Alerts', desc: 'Notify management for discipline incidents' },
                  transportDelay: { label: 'Transport Delay SMS', desc: 'Alert parents when bus delayed >15 minutes' },
                  libraryOverdue: { label: 'Library Overdue Reminder', desc: 'Remind students of overdue books weekly' },
                  parentWhatsApp: { label: 'Parent WhatsApp Notifications', desc: 'Send key alerts via WhatsApp' },
                  staffLeaveApproval: { label: 'Staff Leave Approval Alerts', desc: 'Email HOD for leave approval requests' },
                }
                const { label, desc } = labels[key]
                return (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{desc}</p>
                    </div>
                    <button onClick={() => toggleSetting(key)} className={`shrink-0 ml-4 transition-colors ${alertSettings[key] ? 'text-indigo-600' : 'text-slate-400'}`}>
                      {alertSettings[key] ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
