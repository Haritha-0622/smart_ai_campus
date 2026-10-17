import React, { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import { ClipboardList, Calendar, Users, CheckCircle2, FileText, Download, Plus } from 'lucide-react'

type Tab = 'dashboard' | 'schedule' | 'hall-tickets' | 'mark-entry' | 'results' | 'invigilation'

const TABS: { key: Tab; label: string }[] = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'schedule', label: 'Exam Schedule' },
  { key: 'hall-tickets', label: 'Hall Tickets' },
  { key: 'mark-entry', label: 'Mark Entry' },
  { key: 'results', label: 'Results' },
  { key: 'invigilation', label: 'Invigilation' },
]

export const Module12_ExaminationManagement: React.FC = () => {
  const { exams, students, staffList, institution, showToast, addExam, confirmExamDuty } = useApp()
  const [tab, setTab] = useState<Tab>('dashboard')
  const [selectedExam, setSelectedExam] = useState(exams[0]?.id || '')
  const [gradeFilter, setGradeFilter] = useState('all')
  const [marks, setMarks] = useState<Record<string, number>>({})
  const [showAddForm, setShowAddForm] = useState(false)
  const [newExam, setNewExam] = useState({ subject: '', gradeOrDept: '', date: '', startTime: '09:00', endTime: '12:00', venue: '', invigilator: '', totalStudents: 30 })

  const scheduled = useMemo(() => exams.filter(e => e.status === 'Scheduled').length, [exams])
  const completed = useMemo(() => exams.filter(e => e.status === 'Completed').length, [exams])
  const ongoing = useMemo(() => exams.filter(e => e.status === 'Ongoing').length, [exams])

  const grades = useMemo(() => ['all', ...Array.from(new Set(exams.map(e => e.gradeOrDept)))], [exams])

  const filteredExams = useMemo(() => exams.filter(e => gradeFilter === 'all' || e.gradeOrDept === gradeFilter), [exams, gradeFilter])

  const selectedExamData = useMemo(() => exams.find(e => e.id === selectedExam), [exams, selectedExam])

  const resultsData = useMemo(() => students.map((s, i) => {
    const scores = [70 + (i * 7) % 30, 65 + (i * 11) % 35, 75 + (i * 3) % 25, 80 + (i * 5) % 20]
    const avg = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    return {
      ...s,
      scores,
      avg,
      resultLabel: avg >= 85 ? 'Distinction' : avg >= 70 ? 'First Class' : avg >= 50 ? 'Pass' : 'Fail',
    }
  }), [students])

  const handleAddExam = () => {
    if (!newExam.subject || !newExam.date || !newExam.venue) { showToast('Subject, date and venue are required', 'warning'); return }
    const invigilator = staffList[0]
    addExam({
      subject: newExam.subject,
      gradeOrDept: newExam.gradeOrDept || 'Grade 10',
      date: newExam.date,
      startTime: newExam.startTime,
      endTime: newExam.endTime,
      venue: newExam.venue,
      invigilator: invigilator?.name || 'TBD',
      invigilatorId: invigilator?.id || '',
      dutyConfirmed: false,
      totalStudents: newExam.totalStudents,
      status: 'Scheduled',
    })
    showToast(`Exam "${newExam.subject}" scheduled successfully`, 'success')
    setShowAddForm(false)
    setNewExam({ subject: '', gradeOrDept: '', date: '', startTime: '09:00', endTime: '12:00', venue: '', invigilator: '', totalStudents: 30 })
  }

  const handleSaveMarks = () => {
    showToast(`Marks saved for ${Object.keys(marks).length} students in ${selectedExamData?.subject || 'selected exam'}`, 'success')
    setMarks({})
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-xl font-extrabold text-[#101A33] dark:text-white">Examination Management</h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{institution.name} &bull; Exam Scheduling, Hall Tickets & Results</p>
          </div>
          <ExportButton filename="exams_export" data={exams.map(e => ({ subject: e.subject, grade: e.gradeOrDept, date: e.date, venue: e.venue, status: e.status }))} label="Export" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          <StatCard title="Total Exams" value={exams.length} subtext="Scheduled" icon={Calendar} status="healthy" />
          <StatCard title="Completed" value={completed} subtext="Done" icon={CheckCircle2} status="healthy" />
          <StatCard title="Upcoming" value={scheduled} subtext="This term" icon={ClipboardList} status="warning" />
          <StatCard title="Ongoing" value={ongoing} subtext="Live now" icon={Users} status={ongoing > 0 ? 'critical' : 'healthy'} />
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
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Upcoming Exams Timeline</h2>
          {exams.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-8">No exams scheduled</p>
          ) : (
            <div className="space-y-3">
              {exams.slice(0, 8).map(e => (
                <div key={e.id} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                  <div className="text-center w-14 shrink-0">
                    <div className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">{e.date.slice(8)}</div>
                    <div className="text-[9px] text-slate-400 uppercase">{new Date(e.date).toLocaleString('default', { month: 'short' })}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{e.subject}</p>
                    <p className="text-[10px] text-slate-500">{e.gradeOrDept} &bull; {e.venue} &bull; {e.startTime}–{e.endTime}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge variant={e.status === 'Completed' ? 'teal' : e.status === 'Ongoing' ? 'rose' : 'indigo'}>{e.status}</Badge>
                    <span className="text-[9px] text-slate-400">{e.totalStudents} students</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'schedule' && (
        <div className="space-y-4">
          {showAddForm && (
            <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Schedule New Exam</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Subject', key: 'subject', placeholder: 'e.g. Mathematics' },
                  { label: 'Grade/Dept', key: 'gradeOrDept', placeholder: 'e.g. Grade 10' },
                  { label: 'Venue', key: 'venue', placeholder: 'e.g. Hall A' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{f.label}</label>
                    <input value={(newExam as any)[f.key]} onChange={e => setNewExam(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Date</label>
                  <input type="date" value={newExam.date} onChange={e => setNewExam(p => ({ ...p, date: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Start Time</label>
                  <input type="time" value={newExam.startTime} onChange={e => setNewExam(p => ({ ...p, startTime: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">End Time</label>
                  <input type="time" value={newExam.endTime} onChange={e => setNewExam(p => ({ ...p, endTime: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={handleAddExam}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer">Schedule Exam</button>
                <button onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs cursor-pointer">Cancel</button>
              </div>
            </div>
          )}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <select value={gradeFilter} onChange={e => setGradeFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none">
                {grades.map(g => <option key={g} value={g}>{g === 'all' ? 'All Grades' : g}</option>)}
              </select>
              <button onClick={() => setShowAddForm(true)}
                className="ml-auto px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
                <Plus className="w-3.5 h-3.5" /> Add Exam
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    {['Subject', 'Grade/Dept', 'Date', 'Time', 'Venue', 'Invigilator', 'Students', 'Status', 'Duty'].map(h => (
                      <th key={h} className="text-left py-2 pr-3 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredExams.map(e => (
                    <tr key={e.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <td className="py-2 pr-3 font-medium text-slate-800 dark:text-slate-200">{e.subject}</td>
                      <td className="py-2 pr-3 text-slate-500">{e.gradeOrDept}</td>
                      <td className="py-2 pr-3 text-slate-500">{e.date}</td>
                      <td className="py-2 pr-3 text-slate-500">{e.startTime}–{e.endTime}</td>
                      <td className="py-2 pr-3 text-slate-500">{e.venue}</td>
                      <td className="py-2 pr-3 text-slate-500 max-w-[100px] truncate">{e.invigilator}</td>
                      <td className="py-2 pr-3 text-center text-slate-600">{e.totalStudents}</td>
                      <td className="py-2 pr-3"><Badge variant={e.status === 'Completed' ? 'teal' : e.status === 'Ongoing' ? 'rose' : 'indigo'}>{e.status}</Badge></td>
                      <td className="py-2 pr-3">
                        <Badge variant={e.dutyConfirmed ? 'teal' : 'amber'}>{e.dutyConfirmed ? 'Confirmed' : 'Pending'}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === 'hall-tickets' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Hall Tickets</h2>
            <button onClick={() => showToast('Generating all hall tickets...', 'info')}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
              <FileText className="w-3.5 h-3.5" /> Generate All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Reg No', 'Student Name', 'Grade/Dept', 'Hall Ticket No', 'Issue Date', 'Action'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={s.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 text-slate-500">{s.regNo}</td>
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{s.name}</td>
                    <td className="py-2 pr-4 text-slate-500">{s.gradeOrDept}</td>
                    <td className="py-2 pr-4 font-mono text-slate-600 dark:text-slate-300">HT-2025-{String(1000 + i).padStart(4, '0')}</td>
                    <td className="py-2 pr-4 text-slate-500">2025-10-15</td>
                    <td className="py-2 pr-4">
                      <button onClick={() => showToast(`Hall ticket downloaded for ${s.name}`, 'success')}
                        className="flex items-center gap-1 px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-[10px] hover:bg-indigo-100 cursor-pointer">
                        <Download className="w-3 h-3" /> Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'mark-entry' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Select Exam:</label>
            <select value={selectedExam} onChange={e => setSelectedExam(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none">
              {exams.map(e => <option key={e.id} value={e.id}>{e.subject} — {e.gradeOrDept} ({e.date})</option>)}
            </select>
          </div>
          {selectedExamData && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300">Enter Marks for: {selectedExamData.subject} — Max: 100</h3>
                <button onClick={handleSaveMarks}
                  className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold cursor-pointer">
                  Save All Marks
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      {['Reg No', 'Student Name', 'Grade/Dept', 'Marks (0-100)'].map(h => (
                        <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {students.slice(0, 15).map(s => (
                      <tr key={s.id} className="border-b border-slate-50 dark:border-slate-800/50">
                        <td className="py-2 pr-4 text-slate-500">{s.regNo}</td>
                        <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{s.name}</td>
                        <td className="py-2 pr-4 text-slate-500">{s.gradeOrDept}</td>
                        <td className="py-2 pr-4">
                          <input type="number" min="0" max="100" value={marks[s.id] ?? ''}
                            onChange={e => setMarks(p => ({ ...p, [s.id]: Number(e.target.value) }))}
                            className="w-20 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'results' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Examination Results</h2>
            <ExportButton filename="results_export" data={resultsData.map(s => ({ regNo: s.regNo, name: s.name, avg: s.avg, result: s.resultLabel }))} label="Export" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Reg No', 'Name', 'Grade/Dept', 'Math', 'Physics', 'CS', 'English', 'Avg %', 'Result'].map(h => (
                    <th key={h} className="text-left py-2 pr-3 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {resultsData.map(s => (
                  <tr key={s.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-3 text-slate-500">{s.regNo}</td>
                    <td className="py-2 pr-3 font-medium text-slate-800 dark:text-slate-200">{s.name}</td>
                    <td className="py-2 pr-3 text-slate-500">{s.gradeOrDept}</td>
                    {s.scores.map((sc, i) => (
                      <td key={i} className={`py-2 pr-3 font-semibold ${sc >= 80 ? 'text-teal-600' : sc >= 60 ? 'text-indigo-600' : 'text-rose-600'}`}>{sc}</td>
                    ))}
                    <td className="py-2 pr-3 font-bold text-slate-800 dark:text-slate-200">{s.avg}%</td>
                    <td className="py-2 pr-3">
                      <Badge variant={s.resultLabel === 'Distinction' ? 'teal' : s.resultLabel === 'First Class' ? 'indigo' : s.resultLabel === 'Pass' ? 'amber' : 'rose'}>
                        {s.resultLabel}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'invigilation' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Invigilation Duty Roster</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Invigilator', 'Exam', 'Grade/Dept', 'Date', 'Venue', 'Duty Status', 'Action'].map(h => (
                    <th key={h} className="text-left py-2 pr-3 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {exams.map(e => (
                  <tr key={e.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-3 font-medium text-slate-800 dark:text-slate-200">{e.invigilator}</td>
                    <td className="py-2 pr-3 text-slate-500">{e.subject}</td>
                    <td className="py-2 pr-3 text-slate-500">{e.gradeOrDept}</td>
                    <td className="py-2 pr-3 text-slate-500">{e.date}</td>
                    <td className="py-2 pr-3 text-slate-500">{e.venue}</td>
                    <td className="py-2 pr-3"><Badge variant={e.dutyConfirmed ? 'teal' : 'amber'}>{e.dutyConfirmed ? 'Confirmed' : 'Pending'}</Badge></td>
                    <td className="py-2 pr-3">
                      {!e.dutyConfirmed && (
                        <button onClick={() => { confirmExamDuty(e.id); showToast(`Duty confirmed for ${e.subject}`, 'success') }}
                          className="flex items-center gap-1 px-2 py-1 rounded bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 text-[10px] hover:bg-teal-100 cursor-pointer">
                          <CheckCircle2 className="w-3 h-3" /> Confirm
                        </button>
                      )}
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
