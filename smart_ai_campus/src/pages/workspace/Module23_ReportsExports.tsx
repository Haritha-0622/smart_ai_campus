import React, { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import {
  DownloadCloud, FileText, Clock, CheckCircle2, Calendar,
  BarChart2, Users, TrendingUp, Filter, Play, Trash2, Plus
} from 'lucide-react'

type Tab = 'dashboard' | 'generate' | 'templates' | 'scheduled' | 'history'

interface ReportTemplate {
  id: string; name: string; category: string; description: string
  frequency: string; lastGenerated: string; format: 'PDF' | 'Excel' | 'CSV'
}

interface GeneratedReport {
  id: string; name: string; category: string; generatedAt: string
  generatedBy: string; size: string; format: string; status: 'Ready' | 'Processing' | 'Failed'
}

interface ScheduledReport {
  id: string; name: string; frequency: string; nextRun: string
  recipients: string; format: string; status: 'Active' | 'Paused'
}

export const Module23_ReportsExports: React.FC = () => {
  const { institution, showToast, students, staffList, attendance } = useApp()
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [catFilter, setCatFilter] = useState('All')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState('this-month')
  const [reportFormat, setReportFormat] = useState<'PDF' | 'Excel' | 'CSV'>('PDF')

  const templates: ReportTemplate[] = [
    { id: 'T001', name: 'Student Attendance Report', category: 'Academic', description: 'Detailed daily/monthly attendance for all students with percentage, shortfall, and parent alerts.', frequency: 'Monthly', lastGenerated: '2026-10-01', format: 'PDF' },
    { id: 'T002', name: 'Fee Collection Summary', category: 'Finance', description: 'Category-wise fee collection, outstanding dues, concession applied, and defaulter list.', frequency: 'Weekly', lastGenerated: '2026-10-14', format: 'Excel' },
    { id: 'T003', name: 'Examination Result Analysis', category: 'Academic', description: 'Subject-wise result analysis with pass/fail statistics, toppers, and below-cut-off list.', frequency: 'Per Exam', lastGenerated: '2026-10-10', format: 'PDF' },
    { id: 'T004', name: 'Staff Attendance & Leave Register', category: 'HR', description: 'Daily staff attendance, leave balance, substitute arrangements, and absentee summary.', frequency: 'Monthly', lastGenerated: '2026-10-01', format: 'Excel' },
    { id: 'T005', name: 'Library Circulation Report', category: 'Library', description: 'Books issued, returned, overdue, and demand analysis for the reporting period.', frequency: 'Monthly', lastGenerated: '2026-10-01', format: 'PDF' },
    { id: 'T006', name: 'Transport Route Utilization', category: 'Transport', description: 'Route-wise student count, bus utilization percentage, and delay incidents.', frequency: 'Monthly', lastGenerated: '2026-10-01', format: 'Excel' },
    { id: 'T007', name: 'Hostel Occupancy Report', category: 'Hostel', description: 'Block-wise occupancy, vacant rooms, maintenance requests, and incident log.', frequency: 'Monthly', lastGenerated: '2026-10-01', format: 'PDF' },
    { id: 'T008', name: 'Inventory & Procurement Summary', category: 'Inventory', description: 'Purchase requests processed, stock levels, low-stock alerts, and expenditure.', frequency: 'Monthly', lastGenerated: '2026-10-01', format: 'Excel' },
    { id: 'T009', name: 'Parent Communication Log', category: 'Communication', description: 'SMS, email, and WhatsApp messages sent, delivery rates, and parent engagement.', frequency: 'Monthly', lastGenerated: '2026-10-01', format: 'PDF' },
    { id: 'T010', name: 'NAAC Compliance Checklist', category: 'Accreditation', description: 'NAAC criteria-wise data collection and evidence checklist for college accreditation.', frequency: 'Annual', lastGenerated: '2026-04-01', format: 'PDF' },
    { id: 'T011', name: 'Student Ledger & No-Due Certificate', category: 'Finance', description: 'Individual student fee ledger and no-due clearance status across departments.', frequency: 'On Demand', lastGenerated: '2026-10-15', format: 'PDF' },
    { id: 'T012', name: 'AI Exception Dashboard Export', category: 'Analytics', description: 'Weekly AI-generated exception report with anomalies, risks, and recommended actions.', frequency: 'Weekly', lastGenerated: '2026-10-13', format: 'PDF' },
  ]

  const generatedHistory: GeneratedReport[] = [
    { id: 'R001', name: 'Student Attendance Report — October 2026', category: 'Academic', generatedAt: '2026-10-16 09:30', generatedBy: 'Dr. Principal Suresh', size: '1.4 MB', format: 'PDF', status: 'Ready' },
    { id: 'R002', name: 'Fee Collection Summary — Week 41', category: 'Finance', generatedAt: '2026-10-14 10:00', generatedBy: 'Mrs. Finance Officer', size: '856 KB', format: 'Excel', status: 'Ready' },
    { id: 'R003', name: 'Mid-Term Exam Analysis — Batch 2024', category: 'Academic', generatedAt: '2026-10-12 14:20', generatedBy: 'Mr. Exam Coordinator', size: '2.1 MB', format: 'PDF', status: 'Ready' },
    { id: 'R004', name: 'Staff Payroll Report — September 2026', category: 'HR', generatedAt: '2026-10-05 11:00', generatedBy: 'Mrs. HR Manager', size: '512 KB', format: 'Excel', status: 'Ready' },
    { id: 'R005', name: 'Library Overdue Report', category: 'Library', generatedAt: '2026-10-13 15:30', generatedBy: 'Mrs. Librarian Nair', size: '224 KB', format: 'CSV', status: 'Ready' },
    { id: 'R006', name: 'Transport Utilization — September 2026', category: 'Transport', generatedAt: '2026-10-03 09:00', generatedBy: 'Mr. Transport Manager', size: '378 KB', format: 'Excel', status: 'Ready' },
    { id: 'R007', name: 'AI Exception Report — Week 41', category: 'Analytics', generatedAt: '2026-10-13 08:00', generatedBy: 'System Auto-Generate', size: '945 KB', format: 'PDF', status: 'Ready' },
  ]

  const scheduledReports: ScheduledReport[] = [
    { id: 'SC001', name: 'Weekly Attendance Summary', frequency: 'Every Monday 08:00', nextRun: '2026-10-20 08:00', recipients: 'Principal, HODs', format: 'PDF', status: 'Active' },
    { id: 'SC002', name: 'Monthly Fee Collection', frequency: '1st of every month', nextRun: '2026-11-01 09:00', recipients: 'Finance Officer, Correspondent', format: 'Excel', status: 'Active' },
    { id: 'SC003', name: 'Daily Exception Report', frequency: 'Daily 07:30', nextRun: '2026-10-18 07:30', recipients: 'Principal', format: 'PDF', status: 'Active' },
    { id: 'SC004', name: 'Quarterly NAAC Data Pack', frequency: 'Quarterly', nextRun: '2027-01-01 09:00', recipients: 'IQAC Coordinator', format: 'PDF', status: 'Paused' },
  ]

  const categories = useMemo(() => ['All', ...new Set(templates.map(t => t.category))], [])
  const filteredTemplates = useMemo(() => catFilter === 'All' ? templates : templates.filter(t => t.category === catFilter), [catFilter])
  const filteredHistory = useMemo(() => catFilter === 'All' ? generatedHistory : generatedHistory.filter(r => r.category === catFilter), [catFilter])

  const stats = {
    total: generatedHistory.length,
    thisWeek: 4,
    scheduled: scheduledReports.filter(s => s.status === 'Active').length,
    templates: templates.length,
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: <BarChart2 size={14} /> },
    { key: 'generate', label: 'Generate Report', icon: <Play size={14} /> },
    { key: 'templates', label: 'Templates', icon: <FileText size={14} /> },
    { key: 'scheduled', label: 'Scheduled', icon: <Calendar size={14} /> },
    { key: 'history', label: 'History', icon: <Clock size={14} /> },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <DownloadCloud size={24} className="text-indigo-500" />
            Reports & Exports
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {institution?.name} — Generate, schedule, and download institutional reports
          </p>
        </div>
        <ExportButton label="Download All" onClick={() => showToast('Downloading report package...', 'info')} />
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

      {/* Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Reports Generated" value={stats.total} subtext="All time" icon={<FileText size={18} />} status="healthy" />
            <StatCard title="This Week" value={stats.thisWeek} subtext="Generated" icon={<TrendingUp size={18} />} status="healthy" />
            <StatCard title="Active Schedules" value={stats.scheduled} subtext="Auto reports" icon={<Calendar size={18} />} status="healthy" />
            <StatCard title="Templates" value={stats.templates} subtext="Available" icon={<BarChart2 size={18} />} status="healthy" />
          </div>

          {/* Quick generate cards */}
          <div>
            <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4">Quick Generate</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Attendance Report', cat: 'Academic', color: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800' },
                { label: 'Fee Collection', cat: 'Finance', color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800' },
                { label: 'Exam Analysis', cat: 'Academic', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800' },
                { label: 'Staff Payroll', cat: 'HR', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800' },
                { label: 'Library Overdue', cat: 'Library', color: 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 border-pink-200 dark:border-pink-800' },
                { label: 'Transport Report', cat: 'Transport', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800' },
                { label: 'Hostel Occupancy', cat: 'Hostel', color: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 border-teal-200 dark:border-teal-800' },
                { label: 'AI Exception Report', cat: 'Analytics', color: 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800' },
              ].map(item => (
                <button key={item.label} onClick={() => showToast(`${item.label} generated successfully`, 'success')}
                  className={`p-3 rounded-xl border text-sm font-medium transition-all hover:shadow-sm text-left ${item.color}`}>
                  <DownloadCloud size={16} className="mb-2 opacity-70" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Recent reports */}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-5">
            <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4">Recently Generated</h3>
            <div className="space-y-2">
              {generatedHistory.slice(0, 5).map(r => (
                <div key={r.id} className="flex items-center justify-between py-2.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                      <FileText size={14} className="text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{r.name}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{r.generatedAt} · {r.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="indigo">{r.format}</Badge>
                    <button onClick={() => showToast(`Downloading ${r.name}`, 'success')} className="p-1.5 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors">
                      <DownloadCloud size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Generate */}
      {activeTab === 'generate' && (
        <div className="max-w-2xl space-y-5">
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-6 space-y-5">
            <h3 className="font-semibold text-slate-700 dark:text-slate-200">Generate Custom Report</h3>

            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Report Template</label>
              <select value={selectedTemplate ?? ''} onChange={e => setSelectedTemplate(e.target.value)}
                className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">Select a template...</option>
                {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Date Range</label>
              <select value={dateRange} onChange={e => setDateRange(e.target.value)}
                className="w-full border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="today">Today</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                <option value="this-quarter">This Quarter</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">Export Format</label>
              <div className="flex gap-2">
                {(['PDF', 'Excel', 'CSV'] as const).map(f => (
                  <button key={f} onClick={() => setReportFormat(f)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${reportFormat === f ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => { if (!selectedTemplate) { showToast('Please select a template', 'error'); return }; showToast('Report generated and ready to download', 'success') }}
                className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                <Play size={14} />Generate Now
              </button>
              <button onClick={() => showToast('Report scheduled', 'success')}
                className="flex-1 py-2.5 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 rounded-xl text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors flex items-center justify-center gap-2">
                <Calendar size={14} />Schedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Templates */}
      {activeTab === 'templates' && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <button key={c} onClick={() => setCatFilter(c)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${catFilter === c ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map(t => (
              <div key={t.id} className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold text-slate-700 dark:text-slate-200">{t.name}</p>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="indigo">{t.category}</Badge>
                      <Badge variant="teal">{t.format}</Badge>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{t.description}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-xs text-slate-400 dark:text-slate-500">Last: {t.lastGenerated} · {t.frequency}</span>
                  <div className="flex gap-2">
                    <button onClick={() => showToast(`${t.name} generated`, 'success')} className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs hover:bg-indigo-700 transition-colors">
                      <Play size={10} />Generate
                    </button>
                    <button onClick={() => showToast(`${t.name} scheduled`, 'success')} className="flex items-center gap-1 px-3 py-1.5 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">
                      <Calendar size={10} />Schedule
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Scheduled */}
      {activeTab === 'scheduled' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">{scheduledReports.filter(s => s.status === 'Active').length} active schedules</p>
            <button onClick={() => showToast('New schedule created', 'success')} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
              <Plus size={14} />Add Schedule
            </button>
          </div>
          <div className="space-y-3">
            {scheduledReports.map(s => (
              <div key={s.id} className={`flex items-center justify-between p-4 rounded-2xl border transition-all hover:shadow-sm ${s.status === 'Paused' ? 'opacity-60' : ''} bg-white dark:bg-[#131B2E] border-slate-200 dark:border-slate-800`}>
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-200">{s.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.frequency} · Next: {s.nextRun}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Recipients: {s.recipients} · {s.format}</p>
                </div>
                <div className="flex items-center gap-2 ml-4 shrink-0">
                  <Badge variant={s.status === 'Active' ? 'teal' : 'amber'}>{s.status}</Badge>
                  <button onClick={() => showToast(`Schedule ${s.status === 'Active' ? 'paused' : 'resumed'}`, 'info')} className="p-1.5 text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors">
                    {s.status === 'Active' ? <Clock size={14} /> : <Play size={14} />}
                  </button>
                  <button onClick={() => showToast('Schedule deleted', 'warning')} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {categories.map(c => (
                <button key={c} onClick={() => setCatFilter(c)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${catFilter === c ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                  {c}
                </button>
              ))}
            </div>
            <ExportButton label="Export Index" onClick={() => showToast('Report index exported', 'success')} />
          </div>
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Report Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Category</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Generated At</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">By</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Size</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Format</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.map(r => (
                    <tr key={r.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200 max-w-xs">{r.name}</td>
                      <td className="px-4 py-3"><Badge variant="indigo">{r.category}</Badge></td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs">{r.generatedAt}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{r.generatedBy}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{r.size}</td>
                      <td className="px-4 py-3"><Badge variant="teal">{r.format}</Badge></td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => showToast(`Downloading ${r.name}`, 'success')} className="p-1.5 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"><DownloadCloud size={14} /></button>
                          <button onClick={() => showToast('Report deleted', 'warning')} className="p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
