import React, { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import { GraduationCap, Users, Clock, Search, Eye, BarChart2 } from 'lucide-react'

type Tab = 'directory' | 'profile' | 'assignments' | 'attendance' | 'timetable' | 'workload'

const TABS: { key: Tab; label: string }[] = [
  { key: 'directory', label: 'Directory' },
  { key: 'profile', label: 'Staff Profile' },
  { key: 'assignments', label: 'Class Assignments' },
  { key: 'attendance', label: 'Attendance' },
  { key: 'timetable', label: 'Timetable' },
  { key: 'workload', label: 'Workload' },
]

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const PERIODS = ['P1 (8:00)', 'P2 (9:00)', 'P3 (10:00)', 'P4 (11:00)', 'P5 (12:00)', 'P6 (1:00)', 'P7 (2:00)', 'P8 (3:00)']

const TIMETABLE_SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'English', 'History',
  'Biology', 'Computer Science', 'Economics', 'Tamil', 'Physical Ed',
]

export const Module05_TeacherPortal: React.FC = () => {
  const { staffList, attendance, institution, showToast } = useApp()
  const [tab, setTab] = useState<Tab>('directory')
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(staffList[0]?.id || '')
  const [classFilter, setClassFilter] = useState('all')

  const departments = useMemo(() => ['all', ...Array.from(new Set(staffList.map(s => s.department)))], [staffList])

  const filtered = useMemo(() => staffList.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.empNo.toLowerCase().includes(search.toLowerCase())
    const matchDept = deptFilter === 'all' || s.department === deptFilter
    return matchSearch && matchDept
  }), [staffList, search, deptFilter])

  const selectedStaff = useMemo(() => staffList.find(s => s.id === selectedId), [staffList, selectedId])

  const active = useMemo(() => staffList.filter(s => s.status === 'Active').length, [staffList])
  const onLeave = useMemo(() => staffList.filter(s => s.status === 'On Leave').length, [staffList])
  const avgLoad = useMemo(() => staffList.length > 0 ? Math.round(staffList.reduce((a, s) => a + s.teachingLoadHours, 0) / staffList.length) : 0, [staffList])

  const staffAttendance = useMemo(() => attendance.filter(a => a.type === 'staff'), [attendance])

  // Generate deterministic timetable
  const timetable = useMemo(() => {
    return PERIODS.map((p, pi) =>
      DAYS.map((_, di) => {
        const subjectIdx = (pi * 5 + di) % TIMETABLE_SUBJECTS.length
        const staffIdx = (pi * 5 + di) % staffList.length
        return {
          subject: TIMETABLE_SUBJECTS[subjectIdx],
          teacher: staffList[staffIdx]?.name?.split(' ')[0] || 'TBD',
        }
      })
    )
  }, [staffList])

  const allClasses = useMemo(() => Array.from(new Set(staffList.flatMap(s => s.assignedClasses))), [staffList])
  const filteredAssignments = useMemo(() => {
    return staffList.flatMap(s =>
      s.assignedClasses
        .filter(cls => classFilter === 'all' || cls === classFilter)
        .map(cls => ({ staffId: s.id, staffName: s.name, department: s.department, designation: s.designation, cls }))
    )
  }, [staffList, classFilter])

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-xl font-extrabold text-[#101A33] dark:text-white">Teacher & Faculty Portal</h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{institution.name} &bull; Faculty Management & Teaching Operations</p>
          </div>
          <ExportButton filename="teachers_export" data={staffList.map(s => ({ empNo: s.empNo, name: s.name, dept: s.department, designation: s.designation }))} label="Export" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          <StatCard title="Total Faculty" value={staffList.length} subtext="Teaching staff" icon={Users} status="healthy" />
          <StatCard title="Active" value={active} subtext="Currently on duty" icon={GraduationCap} status="healthy" />
          <StatCard title="On Leave" value={onLeave} subtext="Today" icon={Clock} status="warning" />
          <StatCard title="Avg Teaching Load" value={`${avgLoad}h`} subtext="Per week" icon={BarChart2} status={avgLoad > 35 ? 'warning' : 'healthy'} />
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
            <span className="text-xs text-slate-500 ml-auto">{filtered.length} faculty</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Staff', 'Emp No', 'Department', 'Designation', 'Qualification', 'Load (hrs)', 'Status', 'Action'].map(h => (
                    <th key={h} className="text-left py-2 pr-3 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center text-teal-700 dark:text-teal-300 font-bold text-[10px]">{s.name[0]}</div>
                        <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[90px]">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-2 pr-3 text-slate-500">{s.empNo}</td>
                    <td className="py-2 pr-3 text-slate-600 dark:text-slate-300">{s.department}</td>
                    <td className="py-2 pr-3 text-slate-500">{s.designation}</td>
                    <td className="py-2 pr-3 text-slate-500">{s.qualification}</td>
                    <td className="py-2 pr-3 text-center font-semibold text-slate-700 dark:text-slate-300">{s.teachingLoadHours}</td>
                    <td className="py-2 pr-3"><Badge variant={s.status === 'Active' ? 'teal' : 'amber'}>{s.status}</Badge></td>
                    <td className="py-2 pr-3">
                      <button onClick={() => { setSelectedId(s.id); setTab('profile') }}
                        className="flex items-center gap-1 px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 cursor-pointer">
                        <Eye className="w-3 h-3" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'profile' && selectedStaff && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center text-teal-700 dark:text-teal-300 text-2xl font-extrabold">
              {selectedStaff.name[0]}
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">{selectedStaff.name}</h2>
              <p className="text-xs text-slate-500">{selectedStaff.empNo} &bull; {selectedStaff.designation} &bull; {selectedStaff.department}</p>
              <Badge variant={selectedStaff.status === 'Active' ? 'teal' : 'amber'} className="mt-1">{selectedStaff.status}</Badge>
            </div>
            <select value={selectedId} onChange={e => setSelectedId(e.target.value)}
              className="ml-auto px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none">
              {staffList.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'Employee No', value: selectedStaff.empNo },
              { label: 'Department', value: selectedStaff.department },
              { label: 'Designation', value: selectedStaff.designation },
              { label: 'Role', value: selectedStaff.role },
              { label: 'Email', value: selectedStaff.email },
              { label: 'Phone', value: selectedStaff.phone },
              { label: 'Qualification', value: selectedStaff.qualification },
              { label: 'Join Date', value: selectedStaff.joinDate },
              { label: 'Biometric ID', value: selectedStaff.biometricId },
              { label: 'Teaching Load', value: `${selectedStaff.teachingLoadHours} hrs/week` },
              { label: 'Assigned Classes', value: selectedStaff.assignedClasses.join(', ') || 'None' },
            ].map(f => (
              <div key={f.label} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{f.label}</p>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1 break-words">{f.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'assignments' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <select value={classFilter} onChange={e => setClassFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none">
              <option value="all">All Classes</option>
              {allClasses.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <span className="text-xs text-slate-500">{filteredAssignments.length} assignments</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Teacher', 'Department', 'Designation', 'Assigned Class'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredAssignments.map((a, i) => (
                  <tr key={i} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{a.staffName}</td>
                    <td className="py-2 pr-4 text-slate-500">{a.department}</td>
                    <td className="py-2 pr-4 text-slate-500">{a.designation}</td>
                    <td className="py-2 pr-4"><Badge variant="indigo">{a.cls}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'attendance' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Staff Attendance Records</h2>
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
                    <td className="py-2 pr-4">
                      <Badge variant={r.status === 'Present' ? 'teal' : r.status === 'Late' ? 'amber' : 'rose'}>{r.status}</Badge>
                    </td>
                    <td className="py-2 pr-4 text-slate-500">{r.mode}</td>
                    <td className="py-2 pr-4 text-slate-500">{r.location}</td>
                  </tr>
                ))}
                {staffAttendance.length === 0 && (
                  <tr><td colSpan={6} className="py-8 text-center text-slate-400 text-xs">No staff attendance records found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'timetable' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Master Weekly Timetable</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr>
                  <th className="p-2 text-left font-semibold text-slate-500 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 w-20">Period</th>
                  {DAYS.map(d => (
                    <th key={d} className="p-2 text-center font-semibold text-slate-500 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERIODS.map((period, pi) => (
                  <tr key={pi}>
                    <td className="p-2 font-semibold text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 text-[10px]">{period}</td>
                    {timetable[pi].map((cell, di) => (
                      <td key={di} className="p-2 border border-slate-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/20">
                        <div className="text-[10px] font-semibold text-slate-800 dark:text-slate-200">{cell.subject}</div>
                        <div className="text-[9px] text-slate-400 mt-0.5">{cell.teacher}</div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'workload' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Faculty Teaching Workload</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Name', 'Department', 'Load (hrs/wk)', 'Workload Bar', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staffList.map(s => {
                  const pct = Math.min(100, Math.round((s.teachingLoadHours / 40) * 100))
                  return (
                    <tr key={s.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{s.name}</td>
                      <td className="py-2 pr-4 text-slate-500">{s.department}</td>
                      <td className="py-2 pr-4 font-semibold text-slate-700 dark:text-slate-300">{s.teachingLoadHours}</td>
                      <td className="py-2 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                            <div className={`h-2 rounded-full ${pct > 90 ? 'bg-rose-500' : pct > 75 ? 'bg-amber-400' : 'bg-teal-500'}`} style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-[10px] text-slate-500">{pct}%</span>
                        </div>
                      </td>
                      <td className="py-2 pr-4">
                        <Badge variant={pct > 90 ? 'rose' : pct > 75 ? 'amber' : 'teal'}>
                          {pct > 90 ? 'Overloaded' : pct > 75 ? 'High Load' : 'Normal'}
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
