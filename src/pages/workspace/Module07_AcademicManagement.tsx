import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { BookOpen, Sparkles, AlertTriangle, CheckCircle, Clock, Calendar, Users } from 'lucide-react'

export const Module07_AcademicManagement: React.FC = () => {
  const { institution, showToast } = useApp()
  const [selectedClass, setSelectedClass] = useState('Grade 11-A')
  const [showSubstituteModal, setShowSubstituteModal] = useState(false)

  const scheduleGrid = [
    { period: 'Period 1 (08:30 - 09:20)', mon: 'Physics (Lab 3A)', tue: 'Mathematics', wed: 'Chemistry', thu: 'Physics', fri: 'English' },
    { period: 'Period 2 (09:25 - 10:15)', mon: 'Physics (Lab 3A)', tue: 'Computer Science', wed: 'Mathematics', thu: 'Chemistry', fri: 'Physical Ed' },
    { period: 'Period 3 (10:30 - 11:20)', mon: 'Mathematics', tue: 'Physics', wed: 'English', thu: 'Thirukkural Project', fri: 'Mathematics' },
    { period: 'Period 4 (11:25 - 12:15)', mon: 'Chemistry', tue: 'English', wed: 'Computer Science', thu: 'Mathematics', fri: 'Chemistry' },
    { period: 'Period 5 (01:00 - 01:50)', mon: 'English', tue: 'Chemistry', wed: 'Physics', thu: 'Computer Science', fri: 'Physics' },
    { period: 'Period 6 (01:55 - 02:45)', mon: 'Computer Science', tue: 'Library Commons', wed: 'Physical Ed', thu: 'Chemistry Lab', fri: 'Guidance' }
  ]

  const handleAllocateSubstitute = () => {
    showToast('AI Substitute Allocated: Dr. Anand Ramanathan assigned to Period 3 Physics', 'success')
    setShowSubstituteModal(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              07. Academic Management & Scheduling
            </h1>
            <Badge variant="indigo">Module 07</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Weekly timetable grid, AI room conflict detector, and substitute teacher allocation.
          </p>
        </div>

        <button
          onClick={() => setShowSubstituteModal(true)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>AI Substitute Suggestion</span>
        </button>
      </div>

      {/* AI Timetable Integrity Banner */}
      <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="text-emerald-950 dark:text-emerald-200">
            <strong>Timetable Conflict Check Passed: </strong>
            Zero room collisions detected across all 44 sections and 12 laboratories for AY 2025-2026.
          </span>
        </div>
        <Badge variant="emerald">100% Conflict Free</Badge>
      </div>

      {/* Class Selector & Timetable Grid */}
      <div className="bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Active Roster:</span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs font-bold"
            >
              <option value="Grade 11-A">Grade 11-A (Science Stream)</option>
              <option value="Grade 11-B">Grade 11-B (Commerce Stream)</option>
              <option value="Grade 12-A">Grade 12-A (Advanced Physics)</option>
            </select>
          </div>

          <span className="text-xs text-slate-500">30 Hours / Week &bull; Room: Ramanujan Lab 3A</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
              <tr>
                <th className="py-2.5 px-3 border-r border-slate-200 dark:border-slate-800">Period</th>
                <th className="py-2.5 px-3">Monday</th>
                <th className="py-2.5 px-3">Tuesday</th>
                <th className="py-2.5 px-3">Wednesday</th>
                <th className="py-2.5 px-3">Thursday</th>
                <th className="py-2.5 px-3">Friday</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {scheduleGrid.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-semibold text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800">
                    {row.period}
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-900 dark:text-white">{row.mon}</td>
                  <td className="py-3 px-3 font-medium text-slate-900 dark:text-white">{row.tue}</td>
                  <td className="py-3 px-3 font-medium text-slate-900 dark:text-white">{row.wed}</td>
                  <td className="py-3 px-3 font-medium text-slate-900 dark:text-white">{row.thu}</td>
                  <td className="py-3 px-3 font-medium text-slate-900 dark:text-white">{row.fri}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Substitute Allocation Interactive Dialog */}
      {showSubstituteModal && (
        <div className="p-5 rounded-2xl bg-indigo-50/90 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 text-xs space-y-3">
          <h4 className="font-bold text-indigo-950 dark:text-indigo-200 text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>AI Automated Substitute Recommendation</span>
          </h4>
          <p className="text-slate-600 dark:text-slate-300">
            Prof. Meenakshi Sundaram has requested planned leave for Thursday Period 1 & 2. The AI algorithm analyzed timetable workloads, subject competencies, and room availability.
          </p>
          <div className="p-3 bg-white dark:bg-[#131B2E] rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900 dark:text-white">Recommended: Dr. Anand Ramanathan</p>
              <p className="text-[11px] text-slate-500">Free during Period 1 & 2 &bull; Mathematics & STEM Faculty</p>
            </div>
            <button
              onClick={handleAllocateSubstitute}
              className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white font-bold cursor-pointer"
            >
              Approve Assignment
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
