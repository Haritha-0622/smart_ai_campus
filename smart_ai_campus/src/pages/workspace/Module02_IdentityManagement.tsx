import React, { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import { CreditCard, Users, UserCheck, AlertTriangle, Search, Plus, Printer, RefreshCw, Tag } from 'lucide-react'

type Tab = 'dashboard' | 'students' | 'staff' | 'issue-id' | 'lost-damaged'

const TABS: { key: Tab; label: string }[] = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'students', label: 'Student IDs' },
  { key: 'staff', label: 'Staff IDs' },
  { key: 'issue-id', label: 'Issue New ID' },
  { key: 'lost-damaged', label: 'Lost / Damaged' },
]

export const Module02_IdentityManagement: React.FC = () => {
  const { students, staffList, institution, showToast } = useApp()
  const [tab, setTab] = useState<Tab>('dashboard')
  const [search, setSearch] = useState('')
  const [staffSearch, setStaffSearch] = useState('')
  const [issueType, setIssueType] = useState<'student' | 'staff'>('student')
  const [issueEntityId, setIssueEntityId] = useState('')
  const [issueRfid, setIssueRfid] = useState('')
  const [issueReason, setIssueReason] = useState('New Admission')

  const recentIssuances = useMemo(() => {
    return students.slice(0, 10).map((s, i) => ({
      id: s.id,
      name: s.name,
      refNo: s.regNo,
      role: 'Student',
      rfidTag: s.rfidTag,
      issueDate: `2025-${String(10 - (i % 3)).padStart(2, '0')}-${String(15 - i).padStart(2, '0')}`,
      status: i < 8 ? 'Active' : 'Pending',
    }))
  }, [students])

  const filteredStudents = useMemo(() =>
    students.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.regNo.toLowerCase().includes(search.toLowerCase()) ||
      s.rfidTag.toLowerCase().includes(search.toLowerCase())
    ), [students, search])

  const filteredStaff = useMemo(() =>
    staffList.filter(s =>
      s.name.toLowerCase().includes(staffSearch.toLowerCase()) ||
      s.empNo.toLowerCase().includes(staffSearch.toLowerCase())
    ), [staffList, staffSearch])

  const lostDamaged = useMemo(() =>
    students.filter((_, i) => i % 7 === 0).map(s => ({
      ...s,
      reportDate: '2025-09-20',
      reason: ['Lost', 'Damaged', 'Stolen'][Math.floor(Math.random() * 3)],
    })), [students])

  const handleIssue = () => {
    if (!issueEntityId) { showToast('Please select a student or staff member', 'warning'); return }
    if (!issueRfid) { showToast('Please enter RFID tag number', 'warning'); return }
    showToast(`ID Card issued successfully with RFID: ${issueRfid}`, 'success')
    setIssueEntityId('')
    setIssueRfid('')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-xl font-extrabold text-[#101A33] dark:text-white">Identity Management & ID Cards</h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{institution.name} &bull; RFID Smart Card Lifecycle Management</p>
          </div>
          <ExportButton filename="identity_report" data={students.map(s => ({ name: s.name, regNo: s.regNo, rfidTag: s.rfidTag }))} label="Export" />
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          <StatCard title="Total Students" value={students.length} subtext="With ID cards" icon={Users} status="healthy" />
          <StatCard title="Staff IDs Active" value={staffList.length} subtext="Teaching & non-teaching" icon={UserCheck} status="healthy" />
          <StatCard title="Pending Issuance" value={3} subtext="New admissions" icon={CreditCard} status="warning" />
          <StatCard title="Lost / Damaged" value={lostDamaged.length} subtext="Requires reissue" icon={AlertTriangle} status="warning" />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${tab === t.key ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Tab */}
      {tab === 'dashboard' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Recent ID Card Issuances</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Name', 'Reg / Emp No', 'Role', 'RFID Tag', 'Issue Date', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentIssuances.map(r => (
                  <tr key={r.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{r.name}</td>
                    <td className="py-2 pr-4 text-slate-500">{r.refNo}</td>
                    <td className="py-2 pr-4"><Badge variant="indigo">{r.role}</Badge></td>
                    <td className="py-2 pr-4 font-mono text-slate-600 dark:text-slate-300">{r.rfidTag}</td>
                    <td className="py-2 pr-4 text-slate-500">{r.issueDate}</td>
                    <td className="py-2 pr-4"><Badge variant={r.status === 'Active' ? 'teal' : 'amber'}>{r.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Students Tab */}
      {tab === 'students' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, reg no, RFID..."
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <span className="text-xs text-slate-500">{filteredStudents.length} students</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Student', 'Reg No', 'Grade/Dept', 'RFID Tag', 'Category', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(s => (
                  <tr key={s.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-[10px]">
                          {s.name[0]}
                        </div>
                        <span className="font-medium text-slate-800 dark:text-slate-200">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-2 pr-4 text-slate-500">{s.regNo}</td>
                    <td className="py-2 pr-4 text-slate-600 dark:text-slate-300">{s.gradeOrDept}</td>
                    <td className="py-2 pr-4 font-mono text-slate-600 dark:text-slate-300">{s.rfidTag}</td>
                    <td className="py-2 pr-4"><Badge variant={s.category === 'Day Scholar' ? 'indigo' : 'teal'}>{s.category}</Badge></td>
                    <td className="py-2 pr-4"><Badge variant={s.status === 'Active' ? 'teal' : 'amber'}>{s.status}</Badge></td>
                    <td className="py-2 pr-4">
                      <div className="flex gap-2">
                        <button onClick={() => showToast(`Printing ID card for ${s.name}`, 'info')}
                          className="flex items-center gap-1 px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 cursor-pointer">
                          <Printer className="w-3 h-3" /> Print
                        </button>
                        <button onClick={() => showToast(`Update RFID for ${s.name}`, 'info')}
                          className="flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer">
                          <Tag className="w-3 h-3" /> RFID
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Staff Tab */}
      {tab === 'staff' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={staffSearch} onChange={e => setStaffSearch(e.target.value)} placeholder="Search name or emp no..."
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <span className="text-xs text-slate-500">{filteredStaff.length} staff members</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Staff', 'Emp No', 'Department', 'Designation', 'Biometric ID', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map(s => (
                  <tr key={s.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center text-teal-700 dark:text-teal-300 font-bold text-[10px]">
                          {s.name[0]}
                        </div>
                        <span className="font-medium text-slate-800 dark:text-slate-200">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-2 pr-4 text-slate-500">{s.empNo}</td>
                    <td className="py-2 pr-4 text-slate-600 dark:text-slate-300">{s.department}</td>
                    <td className="py-2 pr-4 text-slate-500">{s.designation}</td>
                    <td className="py-2 pr-4 font-mono text-slate-600 dark:text-slate-300">{s.biometricId}</td>
                    <td className="py-2 pr-4"><Badge variant={s.status === 'Active' ? 'teal' : 'amber'}>{s.status}</Badge></td>
                    <td className="py-2 pr-4">
                      <button onClick={() => showToast(`Printing ID card for ${s.name}`, 'info')}
                        className="flex items-center gap-1 px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 cursor-pointer">
                        <Printer className="w-3 h-3" /> Print ID
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Issue New ID Tab */}
      {tab === 'issue-id' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs max-w-lg">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-600" /> Issue New ID Card
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Issue For</label>
              <div className="flex gap-3">
                {(['student', 'staff'] as const).map(t => (
                  <label key={t} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" checked={issueType === t} onChange={() => setIssueType(t)} className="accent-indigo-600" />
                    <span className="text-xs text-slate-700 dark:text-slate-300 capitalize">{t}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                Select {issueType === 'student' ? 'Student' : 'Staff Member'}
              </label>
              <select value={issueEntityId} onChange={e => setIssueEntityId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="">-- Select --</option>
                {(issueType === 'student' ? students : staffList).map(e => (
                  <option key={e.id} value={e.id}>{e.name} ({issueType === 'student' ? (e as any).regNo : (e as any).empNo})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">RFID Tag Number</label>
              <input value={issueRfid} onChange={e => setIssueRfid(e.target.value)} placeholder="e.g. RFID-2025-0042"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Reason for Issue</label>
              <select value={issueReason} onChange={e => setIssueReason(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                {['New Admission', 'Annual Renewal', 'Lost Card', 'Damaged Card', 'RFID Update'].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <button onClick={handleIssue}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer">
              <CreditCard className="w-4 h-4" /> Issue ID Card
            </button>
          </div>
        </div>
      )}

      {/* Lost / Damaged Tab */}
      {tab === 'lost-damaged' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Lost & Damaged ID Reports</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Student', 'Reg No', 'Grade', 'Report Date', 'Reason', 'Parent Phone', 'Action'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {lostDamaged.map(s => (
                  <tr key={s.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{s.name}</td>
                    <td className="py-2 pr-4 text-slate-500">{s.regNo}</td>
                    <td className="py-2 pr-4 text-slate-600 dark:text-slate-300">{s.gradeOrDept}</td>
                    <td className="py-2 pr-4 text-slate-500">{s.reportDate}</td>
                    <td className="py-2 pr-4"><Badge variant={s.reason === 'Lost' ? 'rose' : 'amber'}>{s.reason}</Badge></td>
                    <td className="py-2 pr-4 text-slate-500">{s.parentPhone}</td>
                    <td className="py-2 pr-4">
                      <button onClick={() => showToast(`Reissue initiated for ${s.name}`, 'success')}
                        className="flex items-center gap-1 px-2 py-1 rounded bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 hover:bg-teal-100 cursor-pointer">
                        <RefreshCw className="w-3 h-3" /> Reissue
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
