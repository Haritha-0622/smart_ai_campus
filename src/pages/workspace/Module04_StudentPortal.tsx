import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { NoDueWorkflowModal } from '../../components/workflows/NoDueWorkflowModal'
import { Badge } from '../../components/common/Badge'
import {
  GraduationCap,
  Calendar,
  Clock,
  BookOpen,
  DollarSign,
  Coffee,
  CheckCircle,
  FileBadge,
  Sparkles,
  Home,
  ShieldCheck
} from 'lucide-react'

export const Module04_StudentPortal: React.FC = () => {
  const { students, noDueRecords } = useApp()
  const student = students[0] // Rohan S. Krishna
  const [noDueOpen, setNoDueOpen] = useState(false)

  const courses = [
    { code: 'PHY-101', name: 'Physics Mechanics & Thermodynamics', teacher: 'Prof. Meenakshi Sundaram', grade: 'A1 (94%)', attendance: '96%' },
    { code: 'MAT-201', name: 'Calculus & Vectors', teacher: 'Dr. Anand Ramanathan', grade: 'A1 (92%)', attendance: '92%' },
    { code: 'ENG-102', name: 'World Literature & Communication', teacher: 'Shalini Sengupta', grade: 'A2 (89%)', attendance: '98%' },
    { code: 'LIT-TAM-3', name: 'Classical Thirukkural Literary Studies', teacher: 'Dr. K. S. Sundaram', grade: 'A1 (96%)', attendance: '95%' }
  ]

  const timetable = [
    { time: '08:30 - 09:30 AM', subject: 'Physics Lab 3A', room: 'Ramanujan Lab', teacher: 'Prof. Meenakshi Sundaram' },
    { time: '09:40 - 10:40 AM', subject: 'Calculus Seminar', room: 'Aryabhata Hall', teacher: 'Dr. Anand Ramanathan' },
    { time: '11:00 - 12:00 PM', subject: 'Thirukkural Project Review', room: 'Central Commons', teacher: 'Dr. K. S. Sundaram' },
    { time: '01:00 - 02:00 PM', subject: 'English Rhetoric', room: 'Tagore Hall', teacher: 'Shalini Sengupta' }
  ]

  return (
    <div className="space-y-6">
      {/* Student Profile Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500 shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
                {student.name}
              </h1>
              <Badge variant="indigo">{student.regNo}</Badge>
              <Badge variant="teal">{student.category}</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {student.gradeOrDept} &bull; {student.sectionOrSem} &bull; Kaveri Hostel Room 304 Bed 2
            </p>
          </div>
        </div>

        <button
          onClick={() => setNoDueOpen(true)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
        >
          <FileBadge className="w-4 h-4" />
          <span>Statutory No-Due Status</span>
        </button>
      </div>

      {/* AI Student Progress Brief */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50/80 to-teal-50/80 dark:from-indigo-950/40 dark:to-teal-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-start gap-3 text-xs">
        <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-slate-800 dark:text-slate-200 leading-relaxed">
          <strong>AI Academic Standing Brief: </strong>
          Rohan is performing in the top 5% of his batch with a 94.2% overall attendance score and zero disciplinary flags. Excellent engagement observed in the Classical Thirukkural Project. Recommended next action: Complete clearance of the 2 borrowed Central Library titles before next week's exam duty roll.
        </div>
      </div>

      {/* Quick Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 uppercase font-bold text-[10px]">Attendance Rate</p>
          <p className="text-xl font-extrabold text-emerald-600 mt-1">{student.attendanceRate}%</p>
          <p className="text-[10px] text-slate-400">Punctual &bull; RFID Verified</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 uppercase font-bold text-[10px]">Academic Standing</p>
          <p className="text-xl font-extrabold text-indigo-600 mt-1">{student.academicGrade}</p>
          <p className="text-[10px] text-slate-400">Class Rank: 3rd / 44</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 uppercase font-bold text-[10px]">Campus Cashless Wallet</p>
          <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">₹{student.walletBalance}</p>
          <p className="text-[10px] text-slate-400">Daily limit: ₹250</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 uppercase font-bold text-[10px]">Outstanding Fee</p>
          <p className="text-xl font-extrabold text-amber-600 mt-1">₹{student.feePending}</p>
          <p className="text-[10px] text-slate-400">Term 2 Hostel Mess Dues</p>
        </div>
      </div>

      {/* Timetable & Course Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Enrolled Courses (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            Enrolled Academic Subjects & Assessments
          </h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {courses.map((c) => (
              <div key={c.code} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{c.name}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {c.code} &bull; {c.teacher}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-indigo-600 dark:text-indigo-400 block">{c.grade}</span>
                  <span className="text-[11px] text-slate-400">{c.attendance} Attendance</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Timetable (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            Today's Schedule & Room Allocations
          </h3>
          <div className="space-y-2.5 text-xs">
            {timetable.map((slot, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 flex items-start gap-3"
              >
                <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 font-bold text-[10px] shrink-0">
                  P{i + 1}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{slot.subject}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {slot.time} &bull; {slot.room}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{slot.teacher}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <NoDueWorkflowModal
        isOpen={noDueOpen}
        onClose={() => setNoDueOpen(false)}
        studentId={student.regNo}
      />
    </div>
  )
}
