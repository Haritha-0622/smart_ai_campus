import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { ExportButton } from '../../components/common/ExportButton'
import { FileSpreadsheet, CheckCircle, Clock, ShieldCheck, AlertCircle, Plus } from 'lucide-react'

export const Module12_ExaminationManagement: React.FC = () => {
  const { exams, confirmExamDuty, showToast } = useApp()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              12. Examination Management & Invigilation Cell
            </h1>
            <Badge variant="indigo">Module 12</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Exam scheduling, hall seating capacity, primary and backup invigilator confirmations, and conflict validation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ExportButton filename="examination_schedule_master" data={exams} />
          <button
            onClick={() => showToast('Opening Exam Session Creation Scheduler', 'info')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
          >
            Create New Exam Paper
          </button>
        </div>
      </div>

      {/* Invigilation Schedule Table */}
      <div className="bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-xs">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
          Active Examination Sessions & Duty Allocations
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {exams.map((ex) => (
            <div key={ex.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{ex.name}</span>
                  <Badge variant="indigo">{ex.code}</Badge>
                </div>
                <p className="text-slate-500">
                  Target: <strong>{ex.gradeOrCourse}</strong> &bull; Subject: {ex.subject} &bull; {ex.enrolledStudents} Candidates
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 font-mono">
                  Date: {ex.date} &bull; Session: {ex.timeSession} &bull; Hall: <strong>{ex.hall}</strong>
                </p>
                <p className="text-[11px] text-indigo-600 dark:text-indigo-400">
                  Primary Invigilator: <strong>{ex.primaryInvigilator}</strong> | Backup: {ex.backupInvigilator}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {ex.confirmed ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Duty Confirmed
                  </span>
                ) : (
                  <button
                    onClick={() => confirmExamDuty(ex.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Confirm Duty Assignment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
