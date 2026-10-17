import React, { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import {
  Users, UserPlus, Calendar, DollarSign, Star, Briefcase,
  CheckCircle2, AlertCircle, Clock, TrendingUp, Filter,
  Download, Eye, Edit, XCircle, Award, BarChart2, ChevronRight
} from 'lucide-react'

type Tab = 'dashboard' | 'employees' | 'recruitment' | 'leave' | 'payroll' | 'appraisal'

const DEPT_COLORS: Record<string, string> = {
  'Science': '#6366f1', 'Mathematics': '#0ea5e9', 'English': '#10b981',
  'Commerce': '#f59e0b', 'Arts': '#f43f5e', 'Physical Education': '#8b5cf6',
  'Administration': '#14b8a6', 'Library': '#ec4899', 'Counselling': '#64748b',
}

interface LeaveRecord {
  id: string; empNo: string; name: string; department: string
  type: string; from: string; to: string; days: number; reason: string
  status: 'Pending' | 'Approved' | 'Rejected'
}

interface PayrollRow {
  empNo: string; name: string; department: string; designation: string
  basic: number; hra: number; da: number; gross: number; pf: number; tds: number; net: number
}

interface Recruitment {
  id: string; position: string; department: string; openings: number
  applied: number; shortlisted: number; status: 'Open' | 'In-Progress' | 'Closed'
  postedOn: string
}

interface Appraisal {
  empNo: string; name: string; department: string; designation: string
  rating: number; kra: string; remarks: string; cycleYear: string
}

export const Module19_InstitutionalHR: React.FC = () => {
  const { staffList, institution, showToast } = useApp()
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [deptFilter, setDeptFilter] = useState('All')
  const [leaveFilter, setLeaveFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All')
  const [leaveRecords, setLeaveRecords] = useState<LeaveRecord[]>([
    { id: 'L001', empNo: 'EMP001', name: 'Dr. Meena Rajan', department: 'Science', type: 'Medical', from: '2026-10-20', to: '2026-10-22', days: 3, reason: 'Medical appointment', status: 'Pending' },
    { id: 'L002', empNo: 'EMP003', name: 'Sathish Kumar', department: 'Mathematics', type: 'Casual', from: '2026-10-18', to: '2026-10-18', days: 1, reason: 'Personal work', status: 'Approved' },
    { id: 'L003', empNo: 'EMP005', name: 'Priya Anand', department: 'English', type: 'Earned', from: '2026-11-01', to: '2026-11-05', days: 5, reason: 'Family function', status: 'Pending' },
    { id: 'L004', empNo: 'EMP007', name: 'Ramesh Iyer', department: 'Commerce', type: 'Medical', from: '2026-10-10', to: '2026-10-12', days: 3, reason: 'Illness', status: 'Rejected' },
    { id: 'L005', empNo: 'EMP009', name: 'Kavitha Suresh', department: 'Arts', type: 'Casual', from: '2026-10-25', to: '2026-10-25', days: 1, reason: 'Bank work', status: 'Pending' },
    { id: 'L006', empNo: 'EMP002', name: 'Anbu Selvam', department: 'Administration', type: 'Maternity', from: '2026-11-10', to: '2027-02-10', days: 90, reason: 'Maternity leave', status: 'Approved' },
  ])

  const recruitments: Recruitment[] = [
    { id: 'R001', position: 'Physics Lecturer', department: 'Science', openings: 2, applied: 38, shortlisted: 12, status: 'In-Progress', postedOn: '2026-09-15' },
    { id: 'R002', position: 'Accounts Manager', department: 'Administration', openings: 1, applied: 24, shortlisted: 6, status: 'Open', postedOn: '2026-10-01' },
    { id: 'R003', position: 'PT Instructor', department: 'Physical Education', openings: 1, applied: 18, shortlisted: 5, status: 'In-Progress', postedOn: '2026-09-20' },
    { id: 'R004', position: 'Commerce Faculty', department: 'Commerce', openings: 2, applied: 45, shortlisted: 14, status: 'Closed', postedOn: '2026-08-01' },
    { id: 'R005', position: 'Librarian', department: 'Library', openings: 1, applied: 11, shortlisted: 4, status: 'Open', postedOn: '2026-10-05' },
  ]

  const appraisals: Appraisal[] = useMemo(() => staffList.slice(0, 12).map((s, i) => ({
    empNo: s.empNo, name: s.name, department: s.department, designation: s.designation,
    rating: [4.8, 4.5, 4.2, 3.9, 4.7, 4.0, 3.7, 4.4, 4.6, 4.1, 3.8, 4.3][i % 12],
    kra: ['Teaching Excellence', 'Student Outcomes', 'Attendance & Punctuality', 'Research Output', 'Extracurricular'][i % 5],
    remarks: ['Outstanding performance', 'Meets expectations', 'Needs improvement in research', 'Excellent mentoring', 'Consistent contributor'][i % 5],
    cycleYear: '2025-2026'
  })), [staffList])

  const payroll: PayrollRow[] = useMemo(() => staffList.map(s => {
    const basic = 30000 + Math.floor(Math.random() * 40000)
    const hra = Math.round(basic * 0.4)
    const da = Math.round(basic * 0.18)
    const gross = basic + hra + da
    const pf = Math.round(basic * 0.12)
    const tds = Math.round(gross * 0.08)
    return { empNo: s.empNo, name: s.name, department: s.department, designation: s.designation, basic, hra, da, gross, pf, tds, net: gross - pf - tds }
  }), [staffList])

  const depts = useMemo(() => ['All', ...new Set(staffList.map(s => s.department))], [staffList])
  const filteredStaff = useMemo(() => deptFilter === 'All' ? staffList : staffList.filter(s => s.department === deptFilter), [staffList, deptFilter])
  const filteredLeave = useMemo(() => leaveFilter === 'All' ? leaveRecords : leaveRecords.filter(l => l.status === leaveFilter), [leaveRecords, leaveFilter])
  const filteredPayroll = useMemo(() => deptFilter === 'All' ? payroll : payroll.filter(p => p.department === deptFilter), [payroll, deptFilter])

  const totalStaff = staffList.length
  const activeStaff = staffList.filter(s => s.status === 'Active').length
  const pendingLeaves = leaveRecords.filter(l => l.status === 'Pending').length
  const totalPayroll = payroll.reduce((sum, r) => sum + r.net, 0)
  const openPositions = recruitments.filter(r => r.status !== 'Closed').length

  const handleLeaveAction = (id: string, action: 'Approved' | 'Rejected') => {
    setLeaveRecords(prev => prev.map(l => l.id === id ? { ...l, status: action } : l))
    showToast(`Leave ${action.toLowerCase()} successfully`, 'success')
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: <BarChart2 size={14} /> },
    { key: 'employees', label: 'Employees', icon: <Users size={14} /> },
    { key: 'recruitment', label: 'Recruitment', icon: <UserPlus size={14} /> },
    { key: 'leave', label: 'Leave Management', icon: <Calendar size={14} /> },
    { key: 'payroll', label: 'Payroll', icon: <DollarSign size={14} /> },
    { key: 'appraisal', label: 'Appraisal', icon: <Star size={14} /> },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase size={24} className="text-indigo-500" />
            Institutional HR
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {institution?.name} — Employee management, payroll & appraisals
          </p>
        </div>
        <ExportButton label="Export HR Report" onClick={() => showToast('HR report exported', 'success')} />
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
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Total Staff" value={totalStaff} subtext={`${activeStaff} active`} icon={<Users size={20} />} status="healthy" />
            <StatCard title="Pending Leaves" value={pendingLeaves} subtext="Awaiting approval" icon={<Calendar size={20} />} status={pendingLeaves > 3 ? 'warning' : 'healthy'} />
            <StatCard title="Open Positions" value={openPositions} subtext="Active recruitment" icon={<UserPlus size={20} />} status="healthy" />
            <StatCard title="Monthly Payroll" value={`₹${(totalPayroll / 100000).toFixed(1)}L`} subtext="Net disbursable" icon={<DollarSign size={20} />} status="healthy" />
          </div>

          {/* Department distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-5">
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-indigo-500" /> Department Headcount</h3>
              <div className="space-y-3">
                {depts.filter(d => d !== 'All').map(dept => {
                  const count = staffList.filter(s => s.department === dept).length
                  const pct = Math.round((count / totalStaff) * 100)
                  return (
                    <div key={dept}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-600 dark:text-slate-300">{dept}</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-200">{count}</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-2 rounded-full" style={{ width: `${pct}%`, backgroundColor: DEPT_COLORS[dept] ?? '#6366f1' }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-5">
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2"><AlertCircle size={16} className="text-amber-500" /> Pending Actions</h3>
              <div className="space-y-3">
                {leaveRecords.filter(l => l.status === 'Pending').map(l => (
                  <div key={l.id} className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{l.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{l.type} leave · {l.days} day(s) · {l.from}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleLeaveAction(l.id, 'Approved')} className="p-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"><CheckCircle2 size={14} /></button>
                      <button onClick={() => handleLeaveAction(l.id, 'Rejected')} className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"><XCircle size={14} /></button>
                    </div>
                  </div>
                ))}
                {leaveRecords.filter(l => l.status === 'Pending').length === 0 && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-6">No pending leave requests</p>
                )}
              </div>
            </div>
          </div>

          {/* Recent recruitments */}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-5">
            <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2"><UserPlus size={16} className="text-indigo-500" /> Active Recruitments</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {recruitments.filter(r => r.status !== 'Closed').map(r => (
                <div key={r.id} className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-medium text-slate-700 dark:text-slate-200 text-sm">{r.position}</p>
                    <Badge variant={r.status === 'Open' ? 'teal' : 'amber'}>{r.status}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{r.department} · {r.openings} opening(s)</p>
                  <div className="flex justify-between mt-3 text-xs text-slate-500 dark:text-slate-400">
                    <span>Applied: <strong className="text-slate-700 dark:text-slate-200">{r.applied}</strong></span>
                    <span>Shortlisted: <strong className="text-slate-700 dark:text-slate-200">{r.shortlisted}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Employees Tab */}
      {activeTab === 'employees' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {depts.map(d => (
                <button key={d} onClick={() => setDeptFilter(d)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${deptFilter === d ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                  {d}
                </button>
              ))}
            </div>
            <ExportButton label="Export" onClick={() => showToast('Employee list exported', 'success')} />
          </div>
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Emp No</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Name</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Department</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Designation</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Qualification</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Status</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.map((s, i) => (
                    <tr key={s.id} className={`border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30 dark:bg-slate-800/20'}`}>
                      <td className="px-4 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">{s.empNo}</td>
                      <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">{s.name}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{s.department}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{s.designation}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{s.qualification}</td>
                      <td className="px-4 py-3"><Badge variant={s.status === 'Active' ? 'teal' : 'rose'}>{s.status}</Badge></td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => showToast(`Viewing ${s.name}'s profile`, 'info')} className="p-1.5 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"><Eye size={14} /></button>
                          <button onClick={() => showToast(`Editing ${s.name}'s record`, 'info')} className="p-1.5 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-lg transition-colors"><Edit size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
              Showing {filteredStaff.length} of {staffList.length} employees
            </div>
          </div>
        </div>
      )}

      {/* Recruitment Tab */}
      {activeTab === 'recruitment' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-slate-700 dark:text-slate-200">Active Job Postings</h2>
            <button onClick={() => showToast('New position created', 'success')} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
              <UserPlus size={14} /> Post New Position
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recruitments.map(r => (
              <div key={r.id} className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-700 dark:text-slate-200">{r.position}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{r.department} · Posted {r.postedOn}</p>
                  </div>
                  <Badge variant={r.status === 'Open' ? 'teal' : r.status === 'In-Progress' ? 'amber' : 'rose'}>{r.status}</Badge>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center text-sm my-3">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                    <p className="text-2xl font-bold text-indigo-600">{r.applied}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Applied</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                    <p className="text-2xl font-bold text-amber-600">{r.shortlisted}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Shortlisted</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3">
                    <p className="text-2xl font-bold text-slate-600 dark:text-slate-300">{r.openings}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Openings</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => showToast(`Viewing applicants for ${r.position}`, 'info')} className="flex-1 py-2 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 rounded-xl text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">View Applicants</button>
                  <button onClick={() => showToast('Shortlist updated', 'success')} className="flex-1 py-2 bg-indigo-600 text-white rounded-xl text-sm hover:bg-indigo-700 transition-colors">Schedule Interview</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leave Management Tab */}
      {activeTab === 'leave' && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {(['All', 'Pending', 'Approved', 'Rejected'] as const).map(f => (
              <button key={f} onClick={() => setLeaveFilter(f)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${leaveFilter === f ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                {f} {f !== 'All' && <span className="ml-1">({leaveRecords.filter(l => l.status === f).length})</span>}
              </button>
            ))}
          </div>
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Employee</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Dept.</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Type</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">From</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">To</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Days</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Status</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeave.map(l => (
                    <tr key={l.id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-700 dark:text-slate-200">{l.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{l.reason}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{l.department}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{l.type}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{l.from}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{l.to}</td>
                      <td className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-200">{l.days}</td>
                      <td className="px-4 py-3">
                        <Badge variant={l.status === 'Approved' ? 'teal' : l.status === 'Pending' ? 'amber' : 'rose'}>{l.status}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        {l.status === 'Pending' ? (
                          <div className="flex gap-1">
                            <button onClick={() => handleLeaveAction(l.id, 'Approved')} className="p-1.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-lg hover:bg-green-200 transition-colors"><CheckCircle2 size={14} /></button>
                            <button onClick={() => handleLeaveAction(l.id, 'Rejected')} className="p-1.5 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg hover:bg-red-200 transition-colors"><XCircle size={14} /></button>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 dark:text-slate-500">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Payroll Tab */}
      {activeTab === 'payroll' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {depts.map(d => (
                <button key={d} onClick={() => setDeptFilter(d)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${deptFilter === d ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                  {d}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => showToast('Payroll processing initiated for October 2026', 'success')} className="px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors">Process Payroll</button>
              <ExportButton label="Export" onClick={() => showToast('Payroll exported', 'success')} />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Gross Payroll" value={`₹${(filteredPayroll.reduce((s, r) => s + r.gross, 0) / 100000).toFixed(1)}L`} subtext="This month" icon={<DollarSign size={18} />} status="healthy" />
            <StatCard title="PF Deductions" value={`₹${(filteredPayroll.reduce((s, r) => s + r.pf, 0) / 1000).toFixed(0)}K`} subtext="Employee PF" icon={<DollarSign size={18} />} status="healthy" />
            <StatCard title="TDS" value={`₹${(filteredPayroll.reduce((s, r) => s + r.tds, 0) / 1000).toFixed(0)}K`} subtext="Tax deducted" icon={<DollarSign size={18} />} status="healthy" />
            <StatCard title="Net Disbursable" value={`₹${(filteredPayroll.reduce((s, r) => s + r.net, 0) / 100000).toFixed(1)}L`} subtext="After deductions" icon={<DollarSign size={18} />} status="healthy" />
          </div>

          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Employee</th>
                    <th className="text-right px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Basic</th>
                    <th className="text-right px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">HRA</th>
                    <th className="text-right px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">DA</th>
                    <th className="text-right px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Gross</th>
                    <th className="text-right px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">PF</th>
                    <th className="text-right px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">TDS</th>
                    <th className="text-right px-4 py-3 font-semibold text-slate-600 dark:text-slate-300 text-green-600">Net</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayroll.map((p, i) => (
                    <tr key={p.empNo} className={`border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/30 dark:bg-slate-800/20'}`}>
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-700 dark:text-slate-200">{p.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{p.department} · {p.empNo}</p>
                      </td>
                      <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">₹{p.basic.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">₹{p.hra.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">₹{p.da.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-200">₹{p.gross.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-red-600 dark:text-red-400">₹{p.pf.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-red-600 dark:text-red-400">₹{p.tds.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right font-bold text-green-600 dark:text-green-400">₹{p.net.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Appraisal Tab */}
      {activeTab === 'appraisal' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-slate-700 dark:text-slate-200">Annual Appraisal Cycle 2025–2026</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">{appraisals.length} reviews completed</p>
            </div>
            <button onClick={() => showToast('Appraisal report generated', 'success')} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
              <Download size={14} /> Generate Report
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {appraisals.map(a => (
              <div key={a.empNo} className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-slate-700 dark:text-slate-200">{a.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{a.designation} · {a.department}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg">
                    <Star size={12} className="text-amber-500 fill-amber-500" />
                    <span className="text-sm font-bold text-amber-600">{a.rating}</span>
                  </div>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                  <p><span className="font-medium text-slate-600 dark:text-slate-300">KRA:</span> {a.kra}</p>
                  <p><span className="font-medium text-slate-600 dark:text-slate-300">Remarks:</span> {a.remarks}</p>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <span>Performance Score</span>
                    <span>{Math.round(a.rating * 20)}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                    <div className="h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: `${a.rating * 20}%` }} />
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => showToast(`Appraisal finalized for ${a.name}`, 'success')} className="flex-1 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs hover:bg-indigo-100 transition-colors">Finalize</button>
                  <button onClick={() => showToast(`Increment letter for ${a.name} generated`, 'success')} className="flex-1 py-1.5 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-xs hover:bg-green-100 transition-colors">Issue Increment</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
