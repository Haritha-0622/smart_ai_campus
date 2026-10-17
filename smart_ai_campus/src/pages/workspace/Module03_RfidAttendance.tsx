import React, { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import { Radio, CheckCircle2, Clock, AlertTriangle, Search, Zap, Users, Wifi } from 'lucide-react'

type Tab = 'live-feed' | 'daily-log' | 'analytics' | 'exceptions' | 'reader-status'

const TABS: { key: Tab; label: string }[] = [
  { key: 'live-feed', label: 'Live Feed' },
  { key: 'daily-log', label: 'Daily Log' },
  { key: 'analytics', label: 'Analytics' },
  { key: 'exceptions', label: 'Exceptions' },
  { key: 'reader-status', label: 'Reader Status' },
]

const READERS = [
  { id: 'RDR-01', name: 'Main Gate (Entry)', location: 'Front Entrance', status: 'Online', lastPing: '2 sec ago', reads: 142 },
  { id: 'RDR-02', name: 'Main Gate (Exit)', location: 'Front Entrance', status: 'Online', lastPing: '3 sec ago', reads: 138 },
  { id: 'RDR-03', name: 'Bus Bay', location: 'Rear Parking', status: 'Online', lastPing: '5 sec ago', reads: 87 },
  { id: 'RDR-04', name: 'Library Entry', location: 'Block B Ground', status: 'Online', lastPing: '1 sec ago', reads: 34 },
  { id: 'RDR-05', name: 'Hostel Gate', location: 'Hostel Block A', status: 'Offline', lastPing: '14 min ago', reads: 0 },
  { id: 'RDR-06', name: 'Sports Complex', location: 'Sports Ground', status: 'Online', lastPing: '8 sec ago', reads: 19 },
]

export const Module03_RfidAttendance: React.FC = () => {
  const { students, staffList, attendance, recordAttendance, showToast, institution } = useApp()
  const [tab, setTab] = useState<Tab>('live-feed')
  const [searchLog, setSearchLog] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'student' | 'staff'>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [simStudentId, setSimStudentId] = useState('')
  const [simReader, setSimReader] = useState('RDR-01')
  const [showSimForm, setShowSimForm] = useState(false)

  const todayStr = new Date().toISOString().split('T')[0]

  const presentToday = useMemo(() => attendance.filter(a => a.status === 'Present' && a.date === todayStr).length, [attendance, todayStr])
  const lateToday = useMemo(() => attendance.filter(a => a.status === 'Late' && a.date === todayStr).length, [attendance, todayStr])
  const absentToday = useMemo(() => attendance.filter(a => a.status === 'Absent' && a.date === todayStr).length, [attendance, todayStr])
  const totalRecords = attendance.length

  const recentFeed = useMemo(() => [...attendance].reverse().slice(0, 20), [attendance])

  const filteredLog = useMemo(() => attendance.filter(a => {
    const matchSearch = a.entityName.toLowerCase().includes(searchLog.toLowerCase())
    const matchType = typeFilter === 'all' || a.type === typeFilter
    const matchStatus = statusFilter === 'all' || a.status === statusFilter
    return matchSearch && matchType && matchStatus
  }), [attendance, searchLog, typeFilter, statusFilter])

  const exceptions = useMemo(() => attendance.filter(a => a.status === 'Absent' || a.status === 'Late'), [attendance])

  const gradeBreakdown = useMemo(() => {
    const map: Record<string, { present: number; late: number; absent: number; total: number }> = {}
    students.forEach(s => {
      if (!map[s.gradeOrDept]) map[s.gradeOrDept] = { present: 0, late: 0, absent: 0, total: 0 }
      map[s.gradeOrDept].total++
      const att = attendance.find(a => a.entityId === s.id)
      if (att?.status === 'Present') map[s.gradeOrDept].present++
      else if (att?.status === 'Late') map[s.gradeOrDept].late++
      else map[s.gradeOrDept].absent++
    })
    return Object.entries(map).map(([grade, v]) => ({ grade, ...v }))
  }, [students, attendance])

  const handleSimulate = () => {
    if (!simStudentId) { showToast('Please select a student', 'warning'); return }
    const student = students.find(s => s.id === simStudentId)
    const reader = READERS.find(r => r.id === simReader)
    if (!student || !reader) return
    recordAttendance({
      entityId: student.id,
      entityName: student.name,
      type: 'student',
      date: todayStr,
      time: new Date().toTimeString().slice(0, 5),
      status: 'Present',
      mode: 'RFID Reader',
      readerId: simReader,
      location: reader.location,
    })
    showToast(`RFID scan recorded: ${student.name} at ${reader.name}`, 'success')
    setShowSimForm(false)
    setSimStudentId('')
  }

  const statusColor = (s: string) => {
    if (s === 'Present') return 'teal'
    if (s === 'Late') return 'amber'
    if (s === 'Absent') return 'rose'
    return 'indigo'
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <Radio className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <h1 className="text-xl font-extrabold text-[#101A33] dark:text-white">RFID Gate & Bus Attendance Terminal</h1>
              <Badge variant="teal" dot>Live</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{institution.name} &bull; {READERS.filter(r => r.status === 'Online').length}/{READERS.length} Readers Online</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShowSimForm(!showSimForm)}
              className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
              <Zap className="w-3.5 h-3.5" /> Simulate RFID Scan
            </button>
            <ExportButton filename="attendance_log" data={attendance.map(a => ({ name: a.entityName, date: a.date, status: a.status }))} label="Export" />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          <StatCard title="Present Today" value={presentToday + 2700} subtext={`of ${institution.studentCount + staffList.length}`} icon={CheckCircle2} status="healthy" />
          <StatCard title="Late Arrivals" value={lateToday + 12} subtext="This session" icon={Clock} status="warning" />
          <StatCard title="Absent" value={absentToday + 45} subtext="Flagged for follow-up" icon={AlertTriangle} status="critical" />
          <StatCard title="Total Records" value={totalRecords} subtext="In system" icon={Radio} status="healthy" />
        </div>

        {showSimForm && (
          <div className="mb-5 p-4 rounded-xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800">
            <p className="text-xs font-bold text-teal-700 dark:text-teal-300 mb-3">Simulate RFID Gate Scan</p>
            <div className="flex flex-wrap gap-3">
              <select value={simStudentId} onChange={e => setSimStudentId(e.target.value)}
                className="px-3 py-2 rounded-lg border border-teal-300 dark:border-teal-700 bg-white dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="">Select Student</option>
                {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.regNo})</option>)}
              </select>
              <select value={simReader} onChange={e => setSimReader(e.target.value)}
                className="px-3 py-2 rounded-lg border border-teal-300 dark:border-teal-700 bg-white dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500">
                {READERS.filter(r => r.status === 'Online').map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
              <button onClick={handleSimulate}
                className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold cursor-pointer">
                Record Scan
              </button>
              <button onClick={() => setShowSimForm(false)}
                className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs cursor-pointer">
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${tab === t.key ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'live-feed' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Real-time Attendance Feed (Last 20)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Name', 'Type', 'Date', 'Time', 'Status', 'Mode', 'Location'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentFeed.map(r => (
                  <tr key={r.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{r.entityName}</td>
                    <td className="py-2 pr-4"><Badge variant={r.type === 'student' ? 'indigo' : 'teal'}>{r.type}</Badge></td>
                    <td className="py-2 pr-4 text-slate-500">{r.date}</td>
                    <td className="py-2 pr-4 text-slate-500">{r.time}</td>
                    <td className="py-2 pr-4"><Badge variant={statusColor(r.status) as any}>{r.status}</Badge></td>
                    <td className="py-2 pr-4 text-slate-500">{r.mode}</td>
                    <td className="py-2 pr-4 text-slate-500">{r.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'daily-log' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={searchLog} onChange={e => setSearchLog(e.target.value)} placeholder="Search name..."
                className="pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48" />
            </div>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as any)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none">
              <option value="all">All Types</option>
              <option value="student">Students</option>
              <option value="staff">Staff</option>
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none">
              <option value="all">All Status</option>
              <option value="Present">Present</option>
              <option value="Late">Late</option>
              <option value="Absent">Absent</option>
              <option value="Excused">Excused</option>
            </select>
            <span className="text-xs text-slate-500">{filteredLog.length} records</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Name', 'Type', 'Date', 'Time', 'Status', 'Mode', 'Location'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredLog.slice(0, 50).map(r => (
                  <tr key={r.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{r.entityName}</td>
                    <td className="py-2 pr-4"><Badge variant={r.type === 'student' ? 'indigo' : 'teal'}>{r.type}</Badge></td>
                    <td className="py-2 pr-4 text-slate-500">{r.date}</td>
                    <td className="py-2 pr-4 text-slate-500">{r.time}</td>
                    <td className="py-2 pr-4"><Badge variant={statusColor(r.status) as any}>{r.status}</Badge></td>
                    <td className="py-2 pr-4 text-slate-500">{r.mode}</td>
                    <td className="py-2 pr-4 text-slate-500">{r.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'analytics' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Attendance by Grade / Department</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    {['Grade / Dept', 'Total', 'Present', 'Late', 'Absent', 'Rate', 'Health'].map(h => (
                      <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {gradeBreakdown.map(g => {
                    const rate = g.total > 0 ? Math.round(((g.present + g.late * 0.5) / g.total) * 100) : 0
                    return (
                      <tr key={g.grade} className="border-b border-slate-50 dark:border-slate-800/50">
                        <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{g.grade}</td>
                        <td className="py-2 pr-4 text-slate-600">{g.total}</td>
                        <td className="py-2 pr-4 text-teal-600 font-semibold">{g.present}</td>
                        <td className="py-2 pr-4 text-amber-600 font-semibold">{g.late}</td>
                        <td className="py-2 pr-4 text-rose-600 font-semibold">{g.absent}</td>
                        <td className="py-2 pr-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700">
                              <div className={`h-1.5 rounded-full ${rate > 90 ? 'bg-teal-500' : rate > 75 ? 'bg-amber-400' : 'bg-rose-500'}`} style={{ width: `${rate}%` }} />
                            </div>
                            <span className="font-semibold">{rate}%</span>
                          </div>
                        </td>
                        <td className="py-2 pr-4">
                          <Badge variant={rate > 90 ? 'teal' : rate > 75 ? 'amber' : 'rose'}>
                            {rate > 90 ? 'Good' : rate > 75 ? 'Watch' : 'Critical'}
                          </Badge>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === 'exceptions' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Attendance Exceptions — Absent & Late</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Name', 'Grade/Dept', 'Date', 'Status', 'Parent Contact', 'Action'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {exceptions.slice(0, 30).map(r => {
                  const student = students.find(s => s.id === r.entityId)
                  return (
                    <tr key={r.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{r.entityName}</td>
                      <td className="py-2 pr-4 text-slate-500">{student?.gradeOrDept || '—'}</td>
                      <td className="py-2 pr-4 text-slate-500">{r.date}</td>
                      <td className="py-2 pr-4"><Badge variant={statusColor(r.status) as any}>{r.status}</Badge></td>
                      <td className="py-2 pr-4 text-slate-500">{student?.parentPhone || '—'}</td>
                      <td className="py-2 pr-4">
                        <button onClick={() => showToast(`${r.entityName} marked as Excused`, 'success')}
                          className="px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-[10px] font-semibold hover:bg-indigo-100 cursor-pointer">
                          Mark Excused
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'reader-status' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">RFID Reader Network Status</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {READERS.map(r => (
              <div key={r.id} className={`p-4 rounded-xl border ${r.status === 'Online' ? 'border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-950/10' : 'border-rose-200 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/10'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${r.status === 'Online' ? 'bg-teal-500 animate-pulse' : 'bg-rose-500'}`} />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{r.name}</span>
                  </div>
                  <Badge variant={r.status === 'Online' ? 'teal' : 'rose'}>{r.status}</Badge>
                </div>
                <p className="text-[10px] text-slate-500 mb-1">{r.location}</p>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>Last ping: {r.lastPing}</span>
                  <span>{r.reads} reads today</span>
                </div>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => showToast(`Ping sent to ${r.name}`, 'info')}
                    className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] cursor-pointer hover:bg-slate-300">
                    Ping
                  </button>
                  <button onClick={() => showToast(`Restarting ${r.name}...`, 'warning')}
                    className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] cursor-pointer hover:bg-slate-300">
                    Restart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
