import React, { useState } from 'react'
import { Badge } from '../../components/common/Badge'
import {
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Sparkles,
  Users,
  Award,
  AlertTriangle,
  UserCheck,
  Settings,
  Plus
} from 'lucide-react'

interface StudentMark {
  id: string
  studentName: string
  regNo: string
  subject: string
  examType: string
  score: number
  maxScore: number
  grade: string
}

interface SubstituteTeacher {
  id: string
  name: string
  subject: string
  department: string
  workloadHours: number
  status: 'Available' | 'Assigned'
  matchScore: number
}

export const Module07_AcademicManagement: React.FC = () => {
  // Tabs covering all 2.6 requirements
  const [activeTab, setActiveTab] = useState<'timetable' | 'marks' | 'exams' | 'substitute' | 'schedules' | 'config'>('timetable')

  const [notification, setNotification] = useState<string | null>(null)

  const notify = (msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 3000)
  }

  // 1. Timetable State
  const [selectedClass, setSelectedClass] = useState('Grade 11-A')
  const timetableGrid = [
    { period: 'Period 1 (08:30 - 09:20)', mon: 'Physics (Lab 3A)', tue: 'Mathematics', wed: 'Chemistry', thu: 'Physics', fri: 'English' },
    { period: 'Period 2 (09:25 - 10:15)', mon: 'Physics (Lab 3A)', tue: 'Computer Science', wed: 'Mathematics', thu: 'Chemistry', fri: 'Physical Ed' },
    { period: 'Period 3 (10:30 - 11:20)', mon: 'Mathematics', tue: 'Physics', wed: 'English', thu: 'Computer Lab', fri: 'Mathematics' },
    { period: 'Period 4 (11:25 - 12:15)', mon: 'Chemistry', tue: 'English', wed: 'Computer Science', thu: 'Mathematics', fri: 'Chemistry' },
    { period: 'Period 5 (01:00 - 01:50)', mon: 'English', tue: 'Chemistry', wed: 'Physics', thu: 'Computer Science', fri: 'Physics' },
    { period: 'Period 6 (01:55 - 02:45)', mon: 'Computer Science', tue: 'Library Commons', wed: 'Physical Ed', thu: 'Chemistry Lab', fri: 'Guidance' }
  ]

  // 2. Marks State
  const [marksList, setMarksList] = useState<StudentMark[]>([
    { id: 'm-1', studentName: 'Rohan S. Krishna', regNo: 'SAC-2025-0842', subject: 'Advanced Physics', examType: 'Midterm Assessment', score: 92, maxScore: 100, grade: 'A+' },
    { id: 'm-2', studentName: 'Ananya Varma', regNo: 'SAC-2025-0843', subject: 'Advanced Physics', examType: 'Midterm Assessment', score: 88, maxScore: 100, grade: 'A' },
    { id: 'm-3', studentName: 'Karthik Raja', regNo: 'SAC-2025-0844', subject: 'Advanced Physics', examType: 'Midterm Assessment', score: 76, maxScore: 100, grade: 'B+' },
    { id: 'm-4', studentName: 'Priya Sharma', regNo: 'SAC-2025-0845', subject: 'Advanced Physics', examType: 'Midterm Assessment', score: 95, maxScore: 100, grade: 'A+' }
  ])

  // 3. Exam Timetable State
  const [examSchedule, setExamSchedule] = useState([
    { id: 'ex-1', subject: 'Physics (Theory)', date: '2026-11-04', session: '09:30 AM - 12:30 PM', hall: 'Auditorium Hall A', invigilator: 'Dr. Anand R.', students: 120 },
    { id: 'ex-2', subject: 'Mathematics Core', date: '2026-11-06', session: '09:30 AM - 12:30 PM', hall: 'Block B - Rooms 201-204', invigilator: 'Prof. Sarah J.', students: 118 },
    { id: 'ex-3', subject: 'Computer Science & AI', date: '2026-11-09', session: '01:30 PM - 04:30 PM', hall: 'Computing Center 1', invigilator: 'Dr. M. Sundaram', students: 95 }
  ])

  // 4. Substitute Teachers State
  const [substitutes, setSubstitutes] = useState<SubstituteTeacher[]>([
    { id: 'sub-1', name: 'Dr. Anand Ramanathan', subject: 'Physics & Applied Mechanics', department: 'Science', workloadHours: 14, status: 'Available', matchScore: 98 },
    { id: 'sub-2', name: 'Prof. David Vance', subject: 'Mathematics & Computing', department: 'Mathematics', workloadHours: 16, status: 'Available', matchScore: 92 },
    { id: 'sub-3', name: 'Meenakshi Iyer, M.Sc', subject: 'Physics Core', department: 'Science', workloadHours: 18, status: 'Available', matchScore: 89 }
  ])

  // 5. Academic Year Config State
  const [academicConfig, setAcademicConfig] = useState({
    academicYear: '2025-2026',
    term1Start: '2025-06-15',
    term1End: '2025-10-31',
    term2Start: '2025-11-15',
    term2End: '2026-04-10',
    totalWorkingDays: 218,
    periodsPerDay: 6,
    periodDurationMinutes: 50
  })

  // Handlers
  const handleScoreChange = (id: string, newScore: number) => {
    setMarksList((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const score = Math.max(0, Math.min(m.maxScore, newScore))
          const grade = score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B+' : score >= 60 ? 'B' : 'C'
          return { ...m, score, grade }
        }
        return m
      })
    )
    notify('Score updated')
  }

  const handleAssignSubstitute = (sub: SubstituteTeacher) => {
    setSubstitutes((prev) =>
      prev.map((s) => (s.id === sub.id ? { ...s, status: 'Assigned' } : s))
    )
    notify(`Substitute assigned: ${sub.name} allocated to Period 3 Physics`)
  }

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault()
    notify('Academic year configuration saved')
  }

  return (
    <div className="space-y-5">
      {/* Straightforward Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">2.6 Academic Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Marks, timetables, examinations, substitute allocation, schedules, and academic-year setup.
          </p>
        </div>

        {notification && (
          <div className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs rounded-lg font-medium">
            {notification}
          </div>
        )}
      </div>

      {/* Clean Tabs matching 2.6 exactly */}
      <div className="flex flex-wrap border-b border-slate-200 gap-4 text-xs font-semibold text-slate-600 bg-white px-5 rounded-t-xl">
        <button
          onClick={() => setActiveTab('timetable')}
          className={`py-3.5 border-b-2 transition-all ${
            activeTab === 'timetable' ? 'border-indigo-600 text-indigo-600 font-bold' : 'border-transparent hover:text-slate-900'
          }`}
        >
          1. Class & Subject Timetable
        </button>

        <button
          onClick={() => setActiveTab('marks')}
          className={`py-3.5 border-b-2 transition-all ${
            activeTab === 'marks' ? 'border-indigo-600 text-indigo-600 font-bold' : 'border-transparent hover:text-slate-900'
          }`}
        >
          2. Marks & Assessment
        </button>

        <button
          onClick={() => setActiveTab('exams')}
          className={`py-3.5 border-b-2 transition-all ${
            activeTab === 'exams' ? 'border-indigo-600 text-indigo-600 font-bold' : 'border-transparent hover:text-slate-900'
          }`}
        >
          3. Examination Timetable
        </button>

        <button
          onClick={() => setActiveTab('substitute')}
          className={`py-3.5 border-b-2 transition-all ${
            activeTab === 'substitute' ? 'border-indigo-600 text-indigo-600 font-bold' : 'border-transparent hover:text-slate-900'
          }`}
        >
          4. Substitute Teacher Allocation
        </button>

        <button
          onClick={() => setActiveTab('schedules')}
          className={`py-3.5 border-b-2 transition-all ${
            activeTab === 'schedules' ? 'border-indigo-600 text-indigo-600 font-bold' : 'border-transparent hover:text-slate-900'
          }`}
        >
          5. Schedule Visibility
        </button>

        <button
          onClick={() => setActiveTab('config')}
          className={`py-3.5 border-b-2 transition-all ${
            activeTab === 'config' ? 'border-indigo-600 text-indigo-600 font-bold' : 'border-transparent hover:text-slate-900'
          }`}
        >
          6. Academic Year Config
        </button>
      </div>

      {/* 1. CLASS & SUBJECT TIMETABLE */}
      {activeTab === 'timetable' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Select Section:</span>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg font-bold text-slate-800"
              >
                <option value="Grade 11-A">Grade 11-A (CBSE Science)</option>
                <option value="Grade 11-B">Grade 11-B (Commerce)</option>
                <option value="Grade 12-A">Grade 12-A (PCM)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Timetable Conflict Check: 0 collisions detected across rooms & faculty</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Time Period</th>
                  <th className="py-3 px-4">Monday</th>
                  <th className="py-3 px-4">Tuesday</th>
                  <th className="py-3 px-4">Wednesday</th>
                  <th className="py-3 px-4">Thursday</th>
                  <th className="py-3 px-4">Friday</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {timetableGrid.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono font-bold text-slate-600">{row.period}</td>
                    <td className="py-3 px-4 font-medium text-slate-800">{row.mon}</td>
                    <td className="py-3 px-4 font-medium text-slate-800">{row.tue}</td>
                    <td className="py-3 px-4 font-medium text-slate-800">{row.wed}</td>
                    <td className="py-3 px-4 font-medium text-slate-800">{row.thu}</td>
                    <td className="py-3 px-4 font-medium text-slate-800">{row.fri}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. MARKS & ASSESSMENT MANAGEMENT */}
      {activeTab === 'marks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">
              Class assessment marks entry, grade calculation, and trend summaries.
            </span>
            <span className="font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg">
              Class Average: {Math.round(marksList.reduce((acc, m) => acc + m.score, 0) / marksList.length)}%
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Reg No</th>
                  <th className="py-3 px-4">Subject & Assessment</th>
                  <th className="py-3 px-4">Marks (Out of 100)</th>
                  <th className="py-3 px-4">Grade</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {marksList.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">{m.studentName}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{m.regNo}</td>
                    <td className="py-3 px-4 text-slate-700">
                      {m.subject} &bull; <span className="text-slate-500">{m.examType}</span>
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        value={m.score}
                        onChange={(e) => handleScoreChange(m.id, parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 border border-slate-200 rounded text-center font-bold text-slate-900"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">
                        {m.grade}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-emerald-600">Recorded</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. EXAMINATION TIMETABLE MANAGEMENT */}
      {activeTab === 'exams' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">
              Term-end and board examination dates, hall allocations, and invigilator duties.
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Date & Session</th>
                  <th className="py-3 px-4">Examination Hall</th>
                  <th className="py-3 px-4">Invigilator</th>
                  <th className="py-3 px-4">Enrolled Students</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {examSchedule.map((ex) => (
                  <tr key={ex.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">{ex.subject}</td>
                    <td className="py-3 px-4 text-slate-700">
                      {ex.date} &bull; <span className="text-slate-500">{ex.session}</span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-700">{ex.hall}</td>
                    <td className="py-3 px-4 text-indigo-700 font-semibold">{ex.invigilator}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">{ex.students} Students</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. SUBSTITUTE TEACHER ALLOCATION */}
      {activeTab === 'substitute' && (
        <div className="space-y-4">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between">
            <div>
              <span className="font-bold">Absent Teacher Alert: </span>
              Prof. Meenakshi Sundaram is on approved leave today. Substitute required for Period 3 (Physics - Grade 11-A).
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-bold text-[10px]">Action Needed</span>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-900 block">Suggested Substitutes (AI Availability & Subject Fit):</span>

            {substitutes.map((sub) => (
              <div key={sub.id} className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{sub.name}</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">
                      {sub.matchScore}% Match Fit
                    </span>
                  </div>
                  <p className="text-slate-500 mt-0.5">
                    {sub.subject} &bull; Workload: {sub.workloadHours} hrs/week
                  </p>
                </div>

                <div>
                  {sub.status === 'Assigned' ? (
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-lg border border-emerald-200">
                      Assigned to Duty
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAssignSubstitute(sub)}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg"
                    >
                      Allocate Substitute
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. TEACHER / STUDENT SCHEDULE VISIBILITY */}
      {activeTab === 'schedules' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Faculty Schedule & Daily Load Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-900 block">Dr. Radhakrishnan V. (Dean)</span>
                <span className="text-slate-500 text-[11px]">3 Lecture Periods Today &bull; Room 302</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-900 block">Dr. Anand Ramanathan</span>
                <span className="text-slate-500 text-[11px]">4 Lecture Periods Today &bull; Science Lab 3A</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                <span className="font-bold text-slate-900 block">Prof. Sarah Jenkins</span>
                <span className="text-slate-500 text-[11px]">2 Lecture Periods & 1 Lab Duty &bull; Room 104</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. ACADEMIC-YEAR CONFIGURATION */}
      {activeTab === 'config' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 max-w-xl space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 text-sm">Institutional Academic-Year Configuration</h3>

          <form onSubmit={handleSaveConfig} className="space-y-3">
            <div>
              <label className="font-medium text-slate-700 block mb-1">Academic Year</label>
              <input
                type="text"
                value={academicConfig.academicYear}
                onChange={(e) => setAcademicConfig({ ...academicConfig, academicYear: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Term 1 Start</label>
                <input
                  type="date"
                  value={academicConfig.term1Start}
                  onChange={(e) => setAcademicConfig({ ...academicConfig, term1Start: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium text-slate-700 block mb-1">Term 1 End</label>
                <input
                  type="date"
                  value={academicConfig.term1End}
                  onChange={(e) => setAcademicConfig({ ...academicConfig, term1End: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Term 2 Start</label>
                <input
                  type="date"
                  value={academicConfig.term2Start}
                  onChange={(e) => setAcademicConfig({ ...academicConfig, term2Start: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium text-slate-700 block mb-1">Term 2 End</label>
                <input
                  type="date"
                  value={academicConfig.term2End}
                  onChange={(e) => setAcademicConfig({ ...academicConfig, term2End: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Total Annual Working Days</label>
                <input
                  type="number"
                  value={academicConfig.totalWorkingDays}
                  onChange={(e) => setAcademicConfig({ ...academicConfig, totalWorkingDays: parseInt(e.target.value) || 200 })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>
              <div>
                <label className="font-medium text-slate-700 block mb-1">Daily Periods Count</label>
                <input
                  type="number"
                  value={academicConfig.periodsPerDay}
                  onChange={(e) => setAcademicConfig({ ...academicConfig, periodsPerDay: parseInt(e.target.value) || 6 })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>
            </div>

            <div className="pt-2">
              <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg">
                Save Academic Configuration
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
