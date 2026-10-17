import React, { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import { BookOpen, Calendar, BarChart2, Building2, Users, Settings } from 'lucide-react'

type Tab = 'timetable' | 'curriculum' | 'grades' | 'academic-year' | 'departments'

const TABS: { key: Tab; label: string }[] = [
  { key: 'timetable', label: 'Timetable' },
  { key: 'curriculum', label: 'Curriculum' },
  { key: 'grades', label: 'Grade Reports' },
  { key: 'academic-year', label: 'Academic Year' },
  { key: 'departments', label: 'Departments' },
]

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const PERIODS = ['8:00–9:00', '9:00–10:00', '10:00–11:00', '11:15–12:15', '12:15–1:15', '2:00–3:00', '3:00–4:00', '4:00–5:00']

const SUBJECTS_POOL = [
  { name: 'Mathematics', code: 'MA' },
  { name: 'Physics', code: 'PH' },
  { name: 'Chemistry', code: 'CH' },
  { name: 'English', code: 'EN' },
  { name: 'Tamil', code: 'TA' },
  { name: 'History', code: 'HI' },
  { name: 'Biology', code: 'BI' },
  { name: 'Computer Science', code: 'CS' },
  { name: 'Economics', code: 'EC' },
  { name: 'Physical Ed', code: 'PE' },
]

const GRADES_LIST = ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12', 'B.Sc', 'B.Com', 'B.A', 'M.Sc']

const ACADEMIC_EVENTS = [
  { label: 'Academic Year Start', date: '2025-06-02', status: 'Completed' },
  { label: 'Term 1 End', date: '2025-09-30', status: 'Completed' },
  { label: 'Term 2 Start', date: '2025-10-01', status: 'Active' },
  { label: 'Mid-Term Examinations', date: '2025-11-15', status: 'Upcoming' },
  { label: 'Quarterly Result Publication', date: '2025-12-05', status: 'Upcoming' },
  { label: 'Annual Examination', date: '2026-03-10', status: 'Upcoming' },
  { label: 'Result Day', date: '2026-04-15', status: 'Upcoming' },
  { label: 'Academic Year End', date: '2026-05-31', status: 'Upcoming' },
]

export const Module07_AcademicManagement: React.FC = () => {
  const { students, staffList, institution, showToast } = useApp()
  const [tab, setTab] = useState<Tab>('timetable')
  const [selectedClass, setSelectedClass] = useState(GRADES_LIST[0])

  const uniqueDepts = useMemo(() => Array.from(new Set(staffList.map(s => s.department))), [staffList])

  const curriculum = useMemo(() => SUBJECTS_POOL.map((subj, i) => ({
    ...subj,
    grade: GRADES_LIST[i % GRADES_LIST.length],
    teacher: staffList[i % staffList.length]?.name || 'TBD',
    periodsPerWeek: 5 - (i % 3),
    completion: 40 + (i * 7) % 55,
    status: i % 5 === 0 ? 'Behind Schedule' : i % 4 === 0 ? 'On Track' : 'Ahead',
  })), [staffList])

  const timetable = useMemo(() => PERIODS.map((p, pi) =>
    DAYS.map((_, di) => {
      const idx = (pi * 5 + di) % SUBJECTS_POOL.length
      return { subject: SUBJECTS_POOL[idx].name, teacher: staffList[(pi + di) % Math.max(1, staffList.length)]?.name?.split(' ')[0] || 'TBD' }
    })
  ), [staffList])

  const gradeReport = useMemo(() => students.map(s => ({
    ...s,
    resultStatus:
      s.academicGrade === 'A' ? 'Distinction' :
      s.academicGrade === 'B' ? 'First Class' :
      s.academicGrade === 'C' ? 'Pass' : 'Needs Improvement',
  })), [students])

  const deptSummary = useMemo(() => uniqueDepts.map(dept => {
    const deptStaff = staffList.filter(s => s.department === dept)
    const hod = deptStaff[0]
    const deptStudents = students.filter(s => s.gradeOrDept === dept || s.gradeOrDept.includes(dept.split(' ')[0]))
    return { dept, staff: deptStaff.length, students: deptStudents.length, hod: hod?.name || 'Not Assigned' }
  }), [uniqueDepts, staffList, students])

  const subjectCount = useMemo(() => new Set(SUBJECTS_POOL.map(s => s.name)).size, [])
  const completionAvg = useMemo(() => Math.round(curriculum.reduce((a, c) => a + c.completion, 0) / Math.max(1, curriculum.length)), [curriculum])

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-xl font-extrabold text-[#101A33] dark:text-white">Academic Management</h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{institution.name} &bull; {institution.currentYear} &bull; Curriculum & Timetable Operations</p>
          </div>
          <ExportButton filename="academic_report" data={curriculum.map(c => ({ subject: c.name, grade: c.grade, teacher: c.teacher, completion: `${c.completion}%` }))} label="Export" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          <StatCard title="Subjects Offered" value={subjectCount} subtext="Across all grades" icon={BookOpen} status="healthy" />
          <StatCard title="Departments" value={uniqueDepts.length} subtext="Academic & admin" icon={Building2} status="healthy" />
          <StatCard title="Students Enrolled" value={students.length} subtext="Active enrollment" icon={Users} status="healthy" />
          <StatCard title="Avg Syllabus Completion" value={`${completionAvg}%`} subtext="Across all subjects" icon={BarChart2} status={completionAvg > 70 ? 'healthy' : 'warning'} />
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

      {tab === 'timetable' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Weekly Timetable</h2>
            <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none ml-auto">
              {GRADES_LIST.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Showing timetable for: <strong>{selectedClass}</strong></p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr>
                  <th className="p-2 text-left font-semibold text-slate-500 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 w-24">Period</th>
                  {DAYS.map(d => (
                    <th key={d} className="p-2 text-center font-semibold text-slate-500 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERIODS.map((period, pi) => (
                  <tr key={pi}>
                    <td className="p-2 text-[10px] font-semibold text-slate-500 border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30">{period}</td>
                    {timetable[pi].map((cell, di) => (
                      <td key={di} className="p-2 border border-slate-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-colors">
                        <div className="text-[10px] font-semibold text-slate-800 dark:text-slate-200">{cell.subject}</div>
                        <div className="text-[9px] text-indigo-500 dark:text-indigo-400 mt-0.5">{cell.teacher}</div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'curriculum' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Curriculum & Syllabus Progress</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Subject', 'Code', 'Grade/Dept', 'Teacher', 'Periods/Wk', 'Completion', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {curriculum.map((c, i) => (
                  <tr key={i} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{c.name}</td>
                    <td className="py-2 pr-4"><Badge variant="indigo">{c.code}</Badge></td>
                    <td className="py-2 pr-4 text-slate-500">{c.grade}</td>
                    <td className="py-2 pr-4 text-slate-500">{c.teacher}</td>
                    <td className="py-2 pr-4 text-center text-slate-600">{c.periodsPerWeek}</td>
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700">
                          <div className={`h-1.5 rounded-full ${c.completion > 70 ? 'bg-teal-500' : c.completion > 50 ? 'bg-amber-400' : 'bg-rose-500'}`} style={{ width: `${c.completion}%` }} />
                        </div>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{c.completion}%</span>
                      </div>
                    </td>
                    <td className="py-2 pr-4">
                      <Badge variant={c.status === 'Ahead' ? 'teal' : c.status === 'On Track' ? 'indigo' : 'rose'}>{c.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'grades' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Student Grade Reports</h2>
            <ExportButton filename="grades_report" data={gradeReport.map(s => ({ regNo: s.regNo, name: s.name, grade: s.academicGrade, result: s.resultStatus }))} label="Export" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Reg No', 'Name', 'Grade/Dept', 'Academic Grade', 'Attendance', 'Fee Status', 'Result Status', 'Action'].map(h => (
                    <th key={h} className="text-left py-2 pr-3 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {gradeReport.map(s => (
                  <tr key={s.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-3 text-slate-500">{s.regNo}</td>
                    <td className="py-2 pr-3 font-medium text-slate-800 dark:text-slate-200">{s.name}</td>
                    <td className="py-2 pr-3 text-slate-500">{s.gradeOrDept}</td>
                    <td className="py-2 pr-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        s.academicGrade === 'A' ? 'bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300' :
                        s.academicGrade === 'B' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300' :
                        s.academicGrade === 'C' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300' :
                        'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300'
                      }`}>{s.academicGrade}</span>
                    </td>
                    <td className="py-2 pr-3 text-slate-500">{s.attendanceRate}%</td>
                    <td className="py-2 pr-3">
                      <Badge variant={s.feePending === 0 ? 'teal' : 'amber'}>{s.feePending === 0 ? 'Cleared' : 'Pending'}</Badge>
                    </td>
                    <td className="py-2 pr-3">
                      <Badge variant={s.resultStatus === 'Distinction' ? 'teal' : s.resultStatus === 'First Class' ? 'indigo' : s.resultStatus === 'Pass' ? 'amber' : 'rose'}>
                        {s.resultStatus}
                      </Badge>
                    </td>
                    <td className="py-2 pr-3">
                      <button onClick={() => showToast(`Opening report card for ${s.name}`, 'info')}
                        className="px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-[10px] hover:bg-indigo-100 cursor-pointer">
                        Report Card
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'academic-year' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Academic Year Configuration — {institution.currentYear}</h2>
            <button onClick={() => showToast('Opening academic year editor...', 'info')}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
              <Settings className="w-3.5 h-3.5" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { label: 'Current Academic Year', value: institution.currentYear },
              { label: 'Board / University', value: institution.boardOrUniversity },
              { label: 'Institution Type', value: institution.type === 'school' ? 'School (K-12)' : 'College / University' },
              { label: 'Total Students', value: institution.studentCount.toLocaleString() },
            ].map(f => (
              <div key={f.label} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">{f.label}</p>
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">{f.value}</p>
              </div>
            ))}
          </div>
          <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-3">Key Academic Dates & Milestones</h3>
          <div className="space-y-2">
            {ACADEMIC_EVENTS.map(ev => (
              <div key={ev.label} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{ev.label}</p>
                    <p className="text-[10px] text-slate-500">{ev.date}</p>
                  </div>
                </div>
                <Badge variant={ev.status === 'Completed' ? 'teal' : ev.status === 'Active' ? 'indigo' : 'amber'}>{ev.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'departments' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Department Directory</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {deptSummary.map(d => (
              <div key={d.dept} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/40 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">{d.dept}</h3>
                </div>
                <div className="space-y-1 text-[10px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">HoD:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[120px]">{d.hod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Staff Count:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{d.staff}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Students:</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{d.students}</span>
                  </div>
                </div>
                <button onClick={() => showToast(`Viewing ${d.dept} department details`, 'info')}
                  className="mt-3 w-full py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-[10px] font-semibold hover:bg-indigo-100 cursor-pointer">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
