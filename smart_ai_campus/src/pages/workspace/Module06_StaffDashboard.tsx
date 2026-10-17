import React, { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import { Briefcase, Users, Clock, Building2, Search, CheckCircle2, XCircle, DollarSign } from 'lucide-react'

type Tab = 'directory' | 'attendance' | 'leave' | 'payroll' | 'departments'

const TABS: { key: Tab; label: string }[] = [
  { key: 'directory', label: 'Directory' },
  { key: 'attendance', label: 'Attendance' },
  { key: 'leave', label: 'Leave Tracker' },
  { key: 'payroll', label: 'Payroll' },
  { key: 'departments', label: 'Departments' },
]

const LEAVE_TYPES = ['CL', 'EL', 'ML', 'OD', 'SL']
const LEAVE_STATUSES = ['Pending', 'Approved', 'Rejected'] as const

function generateLeaveRecords(staffList: any[]) {
  return staffList.slice(0, 15).map((s, i) => ({
    id: `lv-${s.id}`,
    staffName: s.name,
    staffId: s.id,
    leaveType: LEAVE_TYPES[i % LEAVE_TYPES.length],
    fromDate: `2025-10-${String(i + 1).padStart(2, '0')}`,
    toDate: `2025-10-${String(i + 2).padStart(2, '0')}`,
    days: 1 + (i % 3),
    status: LEAVE_STATUSES[i % 3],
    reason: ['Medical', 'Personal', 'Family Emergency', 'Training', 'Urgent Work'][i % 5],
  }))
}

export const Module06_StaffDashboard: React.FC = () => {
  const { staffList, attendance, institution, showToast } = useApp()
  const [tab, setTab] = useState<Tab>('directory')
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [leaveRecords, setLeaveRecords] = useState(() => generateLeaveRecords(staffList))

  const departments = useMemo(() => ['all', ...Array.from(new Set(staffList.map(s => s.department)))], [staffList])
  const uniqueDepts = useMemo(() => Array.from(new Set(staffList.map(s => s.department))), [staffList])

  const filtered = useMemo(() => staffList.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.empNo.toLowerCase().includes(search.toLowerCase())
    const matchDept = deptFilter === 'all' || s.department === deptFilter
    const matchStatus = statusFilter === 'all' || s.status === statusFilter
    return matchSearch && matchDept && matchStatus
  }), [staffList, search, deptFilter, statusFilter])

  const active = useMemo(() => staffList.filter(s => s.status === 'Active').length, [staffList])
  const onLeave = useMemo(() => staffList.filter(s => s.status === 'On Leave').length, [staffList])
  const staffAttendance = useMemo(() => attendance.filter(a => a.type === 'staff'), [attendance])

  const payroll = useMemo(() => staffList.map((s, i) => {
    const basic = 30000 + (i * 3000) % 50000
    const hra = Math.round(basic * 0.2)
    const transport = 5000
    const total = basic + hra + transport
    return { ...s, basic, hra, transport, total, payStatus: i % 4 === 0 ? 'Pending' : 'Processed' }
  }), [staffList])

  const deptStats = useMemo(() => uniqueDepts.map(dept => ({
    dept,
    count: staffList.filter(s => s.department === dept).length,
    active: staffList.filter(s => s.department === dept && s.status === 'Active').length,
    avgLoad: Math.round(
      staffList.filter(s => s.department === dept).reduce((a, s) => a + s.teachingLoadHours, 0) /
      Math.max(1, staffList.filter(s => s.department === dept).length)
    ),
  })), [staffList, uniqueDepts])

  const handleLeaveAction = (id: string, action: 'Approved' | 'Rejected') => {
    setLeaveRecords(prev => prev.map(l => l.id === id ? { ...l, status: action } : l))
    showToast(`Leave ${action.toLowerCase()} successfully`, 'success')
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-xl font-extrabold text-[#101A33] dark:text-white">Staff Operations Dashboard</h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{institution.name} &bull; HR & Staff Management</p>
          </div>
          <ExportButton filename="staff_export" data={staffList.map(s => ({ empNo: s.empNo, name: s.name, dept: s.department, status: s.status }))} label="Export" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          <StatCard title="Total Staff" value={staffList.length} subtext="All employees" icon={Users} status="healthy" />
          <StatCard title="Active" value={active} subtext="On duty today" icon={CheckCircle2} status="healthy" />
          <StatCard title="On Leave" value={onLeave} subtext="Today" icon={Clock} status="warning" />
          <StatCard title="Departments" value={uniqueDepts.length} subtext="Academic & admin" icon={Building2} status="healthy" />
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

      {tab === 'directory' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or emp no..."
                className="pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 w-52" />
            </div>
            <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none">
              {departments.map(d => <option key={d} value={d}>{d === 'all' ? 'All Departments' : d}</option>)}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none">
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Probation">Probation</option>
            </select>
            <span className="text-xs text-slate-500 ml-auto">{filtered.length} employees</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Employee', 'Emp No', 'Department', 'Designation', 'Email', 'Phone', 'Join Date', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 pr-3 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-[10px]">{s.name[0]}</div>
                        <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[90px]">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-2 pr-3 text-slate-500">{s.empNo}</td>
                    <td className="py-2 pr-3 text-slate-600 dark:text-slate-300">{s.department}</td>
                    <td className="py-2 pr-3 text-slate-500">{s.designation}</td>
                    <td className="py-2 pr-3 text-slate-500 truncate max-w-[120px]">{s.email}</td>
                    <td className="py-2 pr-3 text-slate-500">{s.phone}</td>
                    <td className="py-2 pr-3 text-slate-500">{s.joinDate}</td>
                    <td className="py-2 pr-3"><Badge variant={s.status === 'Active' ? 'teal' : s.status === 'On Leave' ? 'amber' : 'rose'}>{s.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'attendance' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Staff Attendance Log</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Name', 'Date', 'Time', 'Status', 'Mode', 'Location'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staffAttendance.slice(0, 40).map(r => (
                  <tr key={r.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{r.entityName}</td>
                    <td className="py-2 pr-4 text-slate-500">{r.date}</td>
                    <td className="py-2 pr-4 text-slate-500">{r.time}</td>
                    <td className="py-2 pr-4"><Badge variant={r.status === 'Present' ? 'teal' : r.status === 'Late' ? 'amber' : 'rose'}>{r.status}</Badge></td>
                    <td className="py-2 pr-4 text-slate-500">{r.mode}</td>
                    <td className="py-2 pr-4 text-slate-500">{r.location}</td>
                  </tr>
                ))}
                {staffAttendance.length === 0 && (
                  <tr><td colSpan={6} className="py-8 text-center text-slate-400 text-xs">No staff attendance records</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'leave' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Leave Tracker — October 2025</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Staff Name', 'Type', 'From', 'To', 'Days', 'Reason', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left py-2 pr-3 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leaveRecords.map(l => (
                  <tr key={l.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-3 font-medium text-slate-800 dark:text-slate-200">{l.staffName}</td>
                    <td className="py-2 pr-3"><Badge variant="indigo">{l.leaveType}</Badge></td>
                    <td className="py-2 pr-3 text-slate-500">{l.fromDate}</td>
                    <td className="py-2 pr-3 text-slate-500">{l.toDate}</td>
                    <td className="py-2 pr-3 text-center text-slate-600">{l.days}</td>
                    <td className="py-2 pr-3 text-slate-500">{l.reason}</td>
                    <td className="py-2 pr-3">
                      <Badge variant={l.status === 'Approved' ? 'teal' : l.status === 'Rejected' ? 'rose' : 'amber'}>{l.status}</Badge>
                    </td>
                    <td className="py-2 pr-3">
                      {l.status === 'Pending' && (
                        <div className="flex gap-1">
                          <button onClick={() => handleLeaveAction(l.id, 'Approved')}
                            className="p-1 rounded bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 hover:bg-teal-100 cursor-pointer">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleLeaveAction(l.id, 'Rejected')}
                            className="p-1 rounded bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 cursor-pointer">
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'payroll' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Payroll — October 2025</h2>
            <div className="flex gap-2">
              <button onClick={() => showToast('Processing payroll for all staff...', 'info')}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5" /> Process All
              </button>
              <ExportButton filename="payroll_oct2025" data={payroll.map(p => ({ empNo: p.empNo, name: p.name, basic: p.basic, total: p.total }))} label="Export" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Emp No', 'Name', 'Designation', 'Department', 'Basic', 'HRA', 'Transport', 'Total CTC', 'Status', 'Action'].map(h => (
                    <th key={h} className="text-left py-2 pr-3 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {payroll.map(p => (
                  <tr key={p.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-3 text-slate-500">{p.empNo}</td>
                    <td className="py-2 pr-3 font-medium text-slate-800 dark:text-slate-200">{p.name}</td>
                    <td className="py-2 pr-3 text-slate-500">{p.designation}</td>
                    <td className="py-2 pr-3 text-slate-500">{p.department}</td>
                    <td className="py-2 pr-3 text-slate-600">₹{p.basic.toLocaleString()}</td>
                    <td className="py-2 pr-3 text-slate-600">₹{p.hra.toLocaleString()}</td>
                    <td className="py-2 pr-3 text-slate-600">₹{p.transport.toLocaleString()}</td>
                    <td className="py-2 pr-3 font-bold text-slate-800 dark:text-slate-200">₹{p.total.toLocaleString()}</td>
                    <td className="py-2 pr-3"><Badge variant={p.payStatus === 'Processed' ? 'teal' : 'amber'}>{p.payStatus}</Badge></td>
                    <td className="py-2 pr-3">
                      <button onClick={() => showToast(`Payslip downloaded for ${p.name}`, 'success')}
                        className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] hover:bg-slate-200 cursor-pointer">
                        Payslip
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'departments' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Department Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {deptStats.map(d => (
              <div key={d.dept} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">{d.dept}</h3>
                  <Building2 className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">{d.count}</p>
                    <p className="text-[9px] text-slate-500">Total Staff</p>
                  </div>
                  <div>
                    <p className="text-lg font-extrabold text-teal-600 dark:text-teal-400">{d.active}</p>
                    <p className="text-[9px] text-slate-500">Active</p>
                  </div>
                  <div>
                    <p className="text-lg font-extrabold text-amber-600 dark:text-amber-400">{d.avgLoad}h</p>
                    <p className="text-[9px] text-slate-500">Avg Load</p>
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
