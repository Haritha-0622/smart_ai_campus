import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { Modal } from '../../components/common/Modal'
import { Users, BookOpen, CheckCircle, Clock, FileSpreadsheet, Send, MessageSquare, AlertCircle } from 'lucide-react'

export const Module05_TeacherPortal: React.FC = () => {
  const { staffList, students, showToast } = useApp()
  const teacher = staffList[0] // Prof. Meenakshi Sundaram

  const [marksModalOpen, setMarksModalOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState('Grade 11-A')
  const [studentMarks, setStudentMarks] = useState<Record<string, number>>({
    'SAC-2025-0842': 94,
    'SAC-2025-0843': 96,
    'SAC-2025-0845': 92
  })

  const handleSaveMarks = (e: React.FormEvent) => {
    e.preventDefault()
    setMarksModalOpen(false)
    showToast('Internal evaluation marks committed to Examination Cell', 'success')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 font-bold flex items-center justify-center text-xl">
            MS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
                05. Teacher Portal: {teacher.name}
              </h1>
              <Badge variant="teal">{teacher.empNo}</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {teacher.designation} &bull; {teacher.department} &bull; Teaching Load: {teacher.teachingLoadHours} Hrs/Week
            </p>
          </div>
        </div>

        <button
          onClick={() => setMarksModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Enter Assessment Marks</span>
        </button>
      </div>

      {/* Assigned Classes Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {teacher.assignedClasses.map((cls, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">{cls}</h3>
              <Badge variant="indigo">42 Students</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Subject: Physics Theory & Mechanics Lab &bull; Syllabus: 78% Completed
            </p>
            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-emerald-600 font-bold">96.4% Class Attendance</span>
              <button
                onClick={() => showToast(`Opening roster for ${cls}`, 'info')}
                className="text-indigo-600 hover:underline font-semibold"
              >
                View Roster &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Invigilation Responsibilities */}
      <div className="p-5 bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-600" />
          <span>Upcoming Examination Invigilation Roster</span>
        </h3>
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <div>
            <p className="font-bold text-slate-900 dark:text-white">
              Physics Mid-Term Assessment II (Grade 11-A & 11-B)
            </p>
            <p className="text-slate-500 mt-0.5">
              18-Oct-2026 &bull; 09:30 AM - 12:30 PM &bull; Ramanujan Exam Hall 3A
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200">
            Duty Confirmed
          </span>
        </div>
      </div>

      {/* Marks Entry Modal */}
      <Modal
        isOpen={marksModalOpen}
        onClose={() => setMarksModalOpen(false)}
        title="Enter Class Assessment Marks"
        subtitle="Grade 11-A &bull; Physics Mid-Term Evaluation (Max Marks: 100)"
        maxWidth="lg"
      >
        <form onSubmit={handleSaveMarks} className="space-y-4 text-xs">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {students.slice(0, 4).map((s) => (
              <div key={s.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{s.name}</p>
                  <p className="text-[11px] text-slate-400 font-mono">{s.regNo}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    defaultValue={studentMarks[s.regNo] || 88}
                    className="w-18 p-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-center font-bold text-xs"
                  />
                  <span className="text-slate-400">/ 100</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setMarksModalOpen(false)}
              className="px-4 py-2 border rounded-lg text-slate-600 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 text-white font-bold rounded-lg"
            >
              Submit Marks to Controller
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
