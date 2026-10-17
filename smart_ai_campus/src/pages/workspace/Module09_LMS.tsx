import React, { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import { BookOpen, FileText, CheckSquare, Star, Download, Plus } from 'lucide-react'

type Tab = 'dashboard' | 'courses' | 'assignments' | 'submissions' | 'gradebook' | 'resources'

const TABS: { key: Tab; label: string }[] = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'courses', label: 'Courses' },
  { key: 'assignments', label: 'Assignments' },
  { key: 'submissions', label: 'Submissions' },
  { key: 'gradebook', label: 'Grade Book' },
  { key: 'resources', label: 'Resources' },
]

const COURSES = [
  { id: 'c1', code: 'MA-101', name: 'Advanced Mathematics', teacher: 'Dr. Sharma', grade: 'Grade 12', duration: '180 hrs', progress: 62, enrolled: 42, nextAssignment: '2025-10-20', status: 'Active' },
  { id: 'c2', code: 'PH-201', name: 'Applied Physics', teacher: 'Prof. Menon', grade: 'Grade 11', duration: '160 hrs', progress: 45, enrolled: 38, nextAssignment: '2025-10-18', status: 'Active' },
  { id: 'c3', code: 'CS-301', name: 'Computer Science & AI', teacher: 'Ms. Kavitha', grade: 'Grade 12', duration: '140 hrs', progress: 78, enrolled: 35, nextAssignment: '2025-10-22', status: 'Active' },
  { id: 'c4', code: 'EN-101', name: 'English Literature', teacher: 'Mr. John', grade: 'Grade 10', duration: '120 hrs', progress: 55, enrolled: 50, nextAssignment: '2025-10-19', status: 'Active' },
  { id: 'c5', code: 'CH-201', name: 'Organic Chemistry', teacher: 'Dr. Priya', grade: 'Grade 11', duration: '150 hrs', progress: 30, enrolled: 40, nextAssignment: '2025-10-25', status: 'Active' },
  { id: 'c6', code: 'BI-101', name: 'Human Biology', teacher: 'Ms. Anita', grade: 'Grade 10', duration: '130 hrs', progress: 90, enrolled: 45, nextAssignment: 'Completed', status: 'Completed' },
]

const ASSIGNMENTS = [
  { id: 'a1', title: 'Calculus Problem Set 5', course: 'MA-101', dueDate: '2025-10-20', total: 42, submitted: 38, pending: 4, status: 'Open' },
  { id: 'a2', title: 'Newton Laws Lab Report', course: 'PH-201', dueDate: '2025-10-18', total: 38, submitted: 38, pending: 0, status: 'Closed' },
  { id: 'a3', title: 'AI Ethics Essay', course: 'CS-301', dueDate: '2025-10-22', total: 35, submitted: 20, pending: 15, status: 'Open' },
  { id: 'a4', title: 'Shakespeare Analysis', course: 'EN-101', dueDate: '2025-10-19', total: 50, submitted: 44, pending: 6, status: 'Open' },
  { id: 'a5', title: 'Organic Reactions Worksheet', course: 'CH-201', dueDate: '2025-10-25', total: 40, submitted: 10, pending: 30, status: 'Open' },
  { id: 'a6', title: 'Cell Structure Diagram', course: 'BI-101', dueDate: '2025-10-10', total: 45, submitted: 45, pending: 0, status: 'Graded' },
]

const RESOURCES = [
  { id: 'r1', title: 'Calculus — NCERT Solutions', type: 'PDF', subject: 'Mathematics', uploadedBy: 'Dr. Sharma', date: '2025-09-15' },
  { id: 'r2', title: 'Physics Lab Manual 2025', type: 'PDF', subject: 'Physics', uploadedBy: 'Prof. Menon', date: '2025-09-10' },
  { id: 'r3', title: 'Introduction to Machine Learning', type: 'Video', subject: 'Computer Science', uploadedBy: 'Ms. Kavitha', date: '2025-10-01' },
  { id: 'r4', title: 'English Grammar & Usage Guide', type: 'PDF', subject: 'English', uploadedBy: 'Mr. John', date: '2025-09-20' },
  { id: 'r5', title: 'Organic Chemistry Reactions Chart', type: 'PDF', subject: 'Chemistry', uploadedBy: 'Dr. Priya', date: '2025-10-05' },
  { id: 'r6', title: 'Human Body Systems — Animated', type: 'Video', subject: 'Biology', uploadedBy: 'Ms. Anita', date: '2025-09-25' },
  { id: 'r7', title: 'SAC Academic Calendar 2025-26', type: 'PDF', subject: 'General', uploadedBy: 'Admin', date: '2025-06-01' },
  { id: 'r8', title: 'Exam Preparation Strategy Guide', type: 'Link', subject: 'General', uploadedBy: 'Principal', date: '2025-10-10' },
]

export const Module09_LMS: React.FC = () => {
  const { students, staffList, institution, showToast } = useApp()
  const [tab, setTab] = useState<Tab>('dashboard')
  const [selectedAssignment, setSelectedAssignment] = useState(ASSIGNMENTS[0].id)

  const totalSubmitted = useMemo(() => ASSIGNMENTS.reduce((a, x) => a + x.submitted, 0), [])
  const totalPending = useMemo(() => ASSIGNMENTS.reduce((a, x) => a + x.pending, 0), [])

  const submissions = useMemo(() => {
    const asgn = ASSIGNMENTS.find(a => a.id === selectedAssignment)
    return students.slice(0, asgn?.submitted || 10).map((s, i) => ({
      student: s.name,
      assignment: asgn?.title || '',
      course: asgn?.course || '',
      submittedDate: `2025-10-${String(15 + i).padStart(2, '0')}`,
      grade: ['A', 'B+', 'A-', 'B', 'A+', 'C+', 'B-'][i % 7],
      status: i < (asgn?.submitted || 0) - 3 ? 'Graded' : 'Pending Review',
    }))
  }, [students, selectedAssignment])

  const gradebook = useMemo(() => students.map((s, i) => ({
    ...s,
    math: 70 + (i * 7) % 30,
    physics: 65 + (i * 11) % 35,
    cs: 75 + (i * 3) % 25,
    english: 80 + (i * 5) % 20,
    chemistry: 60 + (i * 9) % 40,
  })).map(s => ({
    ...s,
    average: Math.round((s.math + s.physics + s.cs + s.english + s.chemistry) / 5),
    gradeLabel: s.academicGrade,
  })), [students])

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-xl font-extrabold text-[#101A33] dark:text-white">Learning Management System</h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{institution.name} &bull; Digital Classroom & Academic Resources</p>
          </div>
          <ExportButton filename="lms_courses" data={COURSES.map(c => ({ code: c.code, name: c.name, teacher: c.teacher, progress: `${c.progress}%` }))} label="Export" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          <StatCard title="Active Courses" value={COURSES.filter(c => c.status === 'Active').length} subtext="Running now" icon={BookOpen} status="healthy" />
          <StatCard title="Assignments Due" value={ASSIGNMENTS.filter(a => a.status === 'Open').length} subtext="This week" icon={FileText} status="warning" />
          <StatCard title="Submissions Received" value={totalSubmitted} subtext="Across all courses" icon={CheckSquare} status="healthy" />
          <StatCard title="Pending Review" value={totalPending} subtext="Needs grading" icon={Star} status="warning" />
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
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Active Course Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COURSES.map(c => (
              <div key={c.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="indigo">{c.code}</Badge>
                  <Badge variant={c.status === 'Active' ? 'teal' : 'amber'}>{c.status}</Badge>
                </div>
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">{c.name}</h3>
                <p className="text-[10px] text-slate-500 mb-1">👨‍🏫 {c.teacher} &bull; {c.grade}</p>
                <p className="text-[10px] text-slate-500 mb-2">👥 {c.enrolled} students &bull; 📅 Next: {c.nextAssignment}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700">
                    <div className={`h-1.5 rounded-full ${c.progress > 70 ? 'bg-teal-500' : c.progress > 40 ? 'bg-indigo-500' : 'bg-amber-400'}`} style={{ width: `${c.progress}%` }} />
                  </div>
                  <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">{c.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'courses' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">All Courses</h2>
            <button onClick={() => showToast('Opening add course form...', 'info')}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> Add Course
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Code', 'Course Name', 'Teacher', 'Grade/Dept', 'Duration', 'Progress', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COURSES.map(c => (
                  <tr key={c.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4"><Badge variant="indigo">{c.code}</Badge></td>
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{c.name}</td>
                    <td className="py-2 pr-4 text-slate-500">{c.teacher}</td>
                    <td className="py-2 pr-4 text-slate-500">{c.grade}</td>
                    <td className="py-2 pr-4 text-slate-500">{c.duration}</td>
                    <td className="py-2 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700">
                          <div className="h-1.5 rounded-full bg-indigo-500" style={{ width: `${c.progress}%` }} />
                        </div>
                        <span>{c.progress}%</span>
                      </div>
                    </td>
                    <td className="py-2 pr-4"><Badge variant={c.status === 'Active' ? 'teal' : 'amber'}>{c.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'assignments' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Assignment Tracker</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Title', 'Course', 'Due Date', 'Total', 'Submitted', 'Pending', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ASSIGNMENTS.map(a => (
                  <tr key={a.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{a.title}</td>
                    <td className="py-2 pr-4"><Badge variant="indigo">{a.course}</Badge></td>
                    <td className="py-2 pr-4 text-slate-500">{a.dueDate}</td>
                    <td className="py-2 pr-4 text-center text-slate-600">{a.total}</td>
                    <td className="py-2 pr-4 text-center text-teal-600 font-semibold">{a.submitted}</td>
                    <td className="py-2 pr-4 text-center text-rose-600 font-semibold">{a.pending}</td>
                    <td className="py-2 pr-4">
                      <Badge variant={a.status === 'Graded' ? 'teal' : a.status === 'Closed' ? 'indigo' : 'amber'}>{a.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'submissions' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Filter by Assignment:</label>
            <select value={selectedAssignment} onChange={e => setSelectedAssignment(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none">
              {ASSIGNMENTS.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Student', 'Assignment', 'Course', 'Submitted', 'Grade', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {submissions.map((s, i) => (
                  <tr key={i} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{s.student}</td>
                    <td className="py-2 pr-4 text-slate-500 truncate max-w-[120px]">{s.assignment}</td>
                    <td className="py-2 pr-4"><Badge variant="indigo">{s.course}</Badge></td>
                    <td className="py-2 pr-4 text-slate-500">{s.submittedDate}</td>
                    <td className="py-2 pr-4 font-bold text-indigo-600 dark:text-indigo-400">{s.grade}</td>
                    <td className="py-2 pr-4"><Badge variant={s.status === 'Graded' ? 'teal' : 'amber'}>{s.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'gradebook' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Grade Book — All Students</h2>
            <ExportButton filename="gradebook" data={gradebook.map(s => ({ regNo: s.regNo, name: s.name, avg: s.average }))} label="Export" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Reg No', 'Name', 'Math', 'Physics', 'CS', 'English', 'Chemistry', 'Average', 'Grade'].map(h => (
                    <th key={h} className="text-left py-2 pr-3 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {gradebook.map(s => (
                  <tr key={s.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-3 text-slate-500">{s.regNo}</td>
                    <td className="py-2 pr-3 font-medium text-slate-800 dark:text-slate-200">{s.name}</td>
                    {[s.math, s.physics, s.cs, s.english, s.chemistry].map((score, i) => (
                      <td key={i} className={`py-2 pr-3 font-semibold ${score >= 80 ? 'text-teal-600' : score >= 65 ? 'text-indigo-600' : 'text-amber-600'}`}>{score}</td>
                    ))}
                    <td className="py-2 pr-3 font-bold text-slate-800 dark:text-slate-200">{s.average}</td>
                    <td className="py-2 pr-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        s.gradeLabel === 'A' ? 'bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300' :
                        s.gradeLabel === 'B' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300' :
                        'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'
                      }`}>{s.gradeLabel}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'resources' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Learning Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RESOURCES.map(r => (
              <div key={r.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={r.type === 'PDF' ? 'rose' : r.type === 'Video' ? 'indigo' : 'teal'}>{r.type}</Badge>
                  <span className="text-[9px] text-slate-400">{r.date}</span>
                </div>
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1 flex-1">{r.title}</h3>
                <p className="text-[10px] text-slate-500 mb-3">Subject: {r.subject}</p>
                <p className="text-[9px] text-slate-400 mb-2">By: {r.uploadedBy}</p>
                <button onClick={() => showToast(`Opening "${r.title}"...`, 'info')}
                  className="w-full py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-[10px] font-semibold hover:bg-indigo-100 cursor-pointer flex items-center justify-center gap-1">
                  <Download className="w-3 h-3" /> {r.type === 'Video' ? 'Watch' : r.type === 'Link' ? 'Open Link' : 'Download'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
