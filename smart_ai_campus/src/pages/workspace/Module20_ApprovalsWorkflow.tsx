import React, { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import {
  CheckCircle2, XCircle, Clock, AlertCircle, ClipboardList,
  ShieldCheck, FileText, Users, Filter, Eye, RotateCcw, ChevronRight
} from 'lucide-react'

type Tab = 'dashboard' | 'pending' | 'approved' | 'rejected' | 'no-due' | 'audit-trail'

interface AuditEntry {
  id: string; action: string; performedBy: string; role: string
  module: string; timestamp: string; details: string
}

export const Module20_ApprovalsWorkflow: React.FC = () => {
  const { approvals, resolveApproval, noDueRecords, toggleNoDueClearance, institution, showToast, students } = useApp()
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [selectedApproval, setSelectedApproval] = useState<string | null>(null)
  const [typeFilter, setTypeFilter] = useState('All')

  const auditTrail: AuditEntry[] = [
    { id: 'A001', action: 'Leave Approved', performedBy: 'Dr. Principal Suresh', role: 'Principal', module: 'HR', timestamp: '2026-10-17 09:45', details: 'Approved 2-day casual leave for Anbu Selvam' },
    { id: 'A002', action: 'Purchase Approved', performedBy: 'Mr. Correspondent', role: 'Management', module: 'Inventory', timestamp: '2026-10-17 09:30', details: 'Approved lab equipment purchase ₹45,000' },
    { id: 'A003', action: 'No-Due Cleared', performedBy: 'Mrs. Librarian Nair', role: 'Library Staff', module: 'Library', timestamp: '2026-10-17 09:15', details: 'Cleared library no-due for Ajay Kumar (STU003)' },
    { id: 'A004', action: 'Approval Rejected', performedBy: 'Mr. HOD Commerce', role: 'HOD', module: 'Finance', timestamp: '2026-10-17 08:55', details: 'Rejected out-of-budget travel request' },
    { id: 'A005', action: 'Outpass Approved', performedBy: 'Mr. Hostel Warden', role: 'Warden', module: 'Hostel', timestamp: '2026-10-17 08:40', details: 'Approved weekend outpass for Priya (STU007)' },
    { id: 'A006', action: 'Exam Schedule Approved', performedBy: 'Dr. Principal Suresh', role: 'Principal', module: 'Examination', timestamp: '2026-10-16 17:20', details: 'Approved mid-term exam timetable for Semester 3' },
    { id: 'A007', action: 'Circular Published', performedBy: 'Mrs. Admin Officer', role: 'Admin', module: 'Communications', timestamp: '2026-10-16 16:45', details: 'Published holiday announcement circular' },
    { id: 'A008', action: 'No-Due Cleared', performedBy: 'Mr. Sports Coordinator', role: 'Sports Staff', module: 'Sports', timestamp: '2026-10-16 14:30', details: 'Cleared sports no-due for batch 2024 students' },
  ]

  const pending = useMemo(() => approvals.filter(a => a.status === 'Pending'), [approvals])
  const approved = useMemo(() => approvals.filter(a => a.status === 'Approved'), [approvals])
  const rejected = useMemo(() => approvals.filter(a => a.status === 'Rejected'), [approvals])

  const allTypes = useMemo(() => ['All', ...new Set(approvals.map(a => a.type))], [approvals])
  const filteredPending = useMemo(() => typeFilter === 'All' ? pending : pending.filter(a => a.type === typeFilter), [pending, typeFilter])

  const handleResolve = (id: string, action: 'Approved' | 'Rejected') => {
    resolveApproval(id, action)
    showToast(`Request ${action.toLowerCase()} successfully`, action === 'Approved' ? 'success' : 'warning')
    setSelectedApproval(null)
  }

  const clearanceDepts = ['library', 'hostel', 'finance', 'sports', 'laboratory', 'transport', 'canteen'] as const

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'pending', label: 'Pending', count: pending.length },
    { key: 'approved', label: 'Approved', count: approved.length },
    { key: 'rejected', label: 'Rejected', count: rejected.length },
    { key: 'no-due', label: 'No-Due', count: noDueRecords.length },
    { key: 'audit-trail', label: 'Audit Trail' },
  ]

  const priorityVariant = (p: string) => p === 'High' ? 'rose' : p === 'Medium' ? 'amber' : 'indigo'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ClipboardList size={24} className="text-indigo-500" />
            Approvals & Workflow
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {institution?.name} — Centralized approval management
          </p>
        </div>
        <ExportButton label="Export Log" onClick={() => showToast('Approval log exported', 'success')} />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === t.key
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
            }`}>
            {t.label}
            {t.count !== undefined && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeTab === t.key ? 'bg-white/20 text-white' : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'}`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Pending" value={pending.length} subtext="Awaiting action" icon={<Clock size={20} />} status={pending.length > 5 ? 'warning' : 'healthy'} />
            <StatCard title="Approved Today" value={approved.length} subtext="This cycle" icon={<CheckCircle2 size={20} />} status="healthy" />
            <StatCard title="Rejected" value={rejected.length} subtext="This cycle" icon={<XCircle size={20} />} status={rejected.length > 0 ? 'warning' : 'healthy'} />
            <StatCard title="No-Due Pending" value={noDueRecords.filter(r => r.overallStatus !== '100% Cleared').length} subtext="Students" icon={<ShieldCheck size={20} />} status="healthy" />
          </div>

          {/* High priority pending */}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-5">
            <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
              <AlertCircle size={16} className="text-rose-500" /> High Priority — Awaiting Action
            </h3>
            <div className="space-y-3">
              {pending.filter(a => a.priority === 'High').slice(0, 5).map(a => (
                <div key={a.id} className="flex items-start justify-between p-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl">
                  <div className="flex-1">
                    <p className="font-medium text-slate-700 dark:text-slate-200 text-sm">{a.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{a.requestedBy} · {a.department} · {a.date}</p>
                    {a.amount && <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">Amount: ₹{a.amount.toLocaleString()}</p>}
                  </div>
                  <div className="flex gap-2 ml-3 shrink-0">
                    <button onClick={() => handleResolve(a.id, 'Approved')} className="p-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"><CheckCircle2 size={14} /></button>
                    <button onClick={() => handleResolve(a.id, 'Rejected')} className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"><XCircle size={14} /></button>
                  </div>
                </div>
              ))}
              {pending.filter(a => a.priority === 'High').length === 0 && (
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">No high-priority items pending</p>
              )}
            </div>
          </div>

          {/* Approval stats by type */}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-5">
            <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
              <FileText size={16} className="text-indigo-500" /> By Category
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {allTypes.filter(t => t !== 'All').map(type => {
                const total = approvals.filter(a => a.type === type).length
                const pend = approvals.filter(a => a.type === type && a.status === 'Pending').length
                return (
                  <div key={type} className="border border-slate-200 dark:border-slate-700 rounded-xl p-3 hover:shadow-sm transition-shadow">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{type}</p>
                    <div className="flex justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
                      <span>Total: <strong className="text-slate-700 dark:text-slate-200">{total}</strong></span>
                      <span className={pend > 0 ? 'text-amber-600 font-semibold' : ''}>Pending: {pend}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Pending Tab */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {allTypes.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${typeFilter === t ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                {t}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {filteredPending.map(a => (
              <div key={a.id} className={`bg-white dark:bg-[#131B2E] border rounded-2xl shadow-xs p-4 hover:shadow-md transition-shadow ${selectedApproval === a.id ? 'border-indigo-400 dark:border-indigo-600' : 'border-slate-200 dark:border-slate-800'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1 cursor-pointer" onClick={() => setSelectedApproval(selectedApproval === a.id ? null : a.id)}>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <Badge variant={priorityVariant(a.priority)}>{a.priority}</Badge>
                      <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{a.type}</span>
                    </div>
                    <p className="font-semibold text-slate-700 dark:text-slate-200">{a.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      {a.requestedBy} · {a.department} · {a.date}
                      {a.amount && <span className="ml-2 font-semibold text-indigo-600 dark:text-indigo-400">₹{a.amount.toLocaleString()}</span>}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <button onClick={() => setSelectedApproval(selectedApproval === a.id ? null : a.id)} className="p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"><Eye size={14} /></button>
                    <button onClick={() => handleResolve(a.id, 'Approved')} className="flex items-center gap-1 px-3 py-1.5 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600 transition-colors"><CheckCircle2 size={12} />Approve</button>
                    <button onClick={() => handleResolve(a.id, 'Rejected')} className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg text-xs font-medium hover:bg-red-600 transition-colors"><XCircle size={12} />Reject</button>
                  </div>
                </div>
                {selectedApproval === a.id && (
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-600 dark:text-slate-300">{a.description}</p>
                  </div>
                )}
              </div>
            ))}
            {filteredPending.length === 0 && (
              <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                <CheckCircle2 size={40} className="mx-auto mb-3 text-green-500 opacity-60" />
                <p className="font-medium">All clear! No pending approvals.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Approved Tab */}
      {activeTab === 'approved' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Title</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Requested By</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Amount</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {approved.map(a => (
                  <tr key={a.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">{a.title}</td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{a.type}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{a.requestedBy}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{a.amount ? `₹${a.amount.toLocaleString()}` : '—'}</td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{a.date}</td>
                    <td className="px-4 py-3"><Badge variant="teal">Approved</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {approved.length === 0 && <p className="text-center py-8 text-slate-500 dark:text-slate-400">No approved records yet</p>}
        </div>
      )}

      {/* Rejected Tab */}
      {activeTab === 'rejected' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Title</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Requested By</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Priority</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Date</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {rejected.map(a => (
                  <tr key={a.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">{a.title}</td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{a.type}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{a.requestedBy}</td>
                    <td className="px-4 py-3"><Badge variant={priorityVariant(a.priority)}>{a.priority}</Badge></td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{a.date}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => showToast('Request reopened for review', 'info')} className="flex items-center gap-1 px-2 py-1 text-xs text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">
                        <RotateCcw size={10} />Reopen
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rejected.length === 0 && <p className="text-center py-8 text-slate-500 dark:text-slate-400">No rejected records</p>}
        </div>
      )}

      {/* No-Due Tab */}
      {activeTab === 'no-due' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">{noDueRecords.length} student no-due records</p>
            <ExportButton label="Export No-Due" onClick={() => showToast('No-due report exported', 'success')} />
          </div>
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Student</th>
                    {clearanceDepts.map(d => (
                      <th key={d} className="text-center px-3 py-3 font-semibold text-slate-600 dark:text-slate-300 capitalize">{d}</th>
                    ))}
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {noDueRecords.map(r => (
                    <tr key={r.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-700 dark:text-slate-200">{r.studentName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{r.regNo} · {r.gradeOrDept}</p>
                      </td>
                      {clearanceDepts.map(dept => (
                        <td key={dept} className="px-3 py-3 text-center">
                          <button onClick={() => { toggleNoDueClearance(r.studentId, dept); showToast(`${dept} clearance toggled for ${r.studentName}`, 'success') }}
                            className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto transition-colors ${r.clearances[dept] ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200' : 'bg-red-100 dark:bg-red-900/30 text-red-500 dark:text-red-400 hover:bg-red-200'}`}>
                            {r.clearances[dept] ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                          </button>
                        </td>
                      ))}
                      <td className="px-4 py-3">
                        <Badge variant={r.overallStatus === '100% Cleared' ? 'teal' : r.overallStatus === 'Pending Clearance' ? 'amber' : 'rose'}>{r.overallStatus}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Audit Trail Tab */}
      {activeTab === 'audit-trail' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">Complete audit log of approval actions</p>
            <ExportButton label="Export Audit" onClick={() => showToast('Audit trail exported', 'success')} />
          </div>
          <div className="space-y-2">
            {auditTrail.map(entry => (
              <div key={entry.id} className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:shadow-sm transition-shadow flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                  <ClipboardList size={16} className="text-indigo-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-slate-700 dark:text-slate-200">{entry.action}</p>
                    <span className="text-xs text-slate-400 dark:text-slate-500">{entry.timestamp}</span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{entry.details}</p>
                  <div className="flex gap-3 mt-1.5">
                    <span className="text-xs text-slate-400 dark:text-slate-500">{entry.performedBy}</span>
                    <span className="text-xs text-slate-300 dark:text-slate-600">·</span>
                    <span className="text-xs text-indigo-500">{entry.role}</span>
                    <span className="text-xs text-slate-300 dark:text-slate-600">·</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">{entry.module}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
