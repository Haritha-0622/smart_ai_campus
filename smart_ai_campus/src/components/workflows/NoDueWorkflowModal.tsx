import React, { useState } from 'react'
import { Modal } from '../common/Modal'
import { useApp } from '../../context/AppContext'
import { CheckSquare, Check, X } from 'lucide-react'
import { NoDueRecord } from '../../types'

interface Props { isOpen: boolean; onClose: () => void }

export const NoDueWorkflowModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { students, noDueRecords, toggleNoDueClearance } = useApp()
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '')
  const student = students.find((s) => s.id === selectedStudentId)
  const record = noDueRecords.find((r) => r.studentId === selectedStudentId)

  const departments: { key: keyof NoDueRecord['clearances']; label: string }[] = [
    { key: 'library', label: 'Library & Knowledge Commons' },
    { key: 'hostel', label: 'Hostel & Residential' },
    { key: 'finance', label: 'Finance & Fee Accounts' },
    { key: 'sports', label: 'Sports & Co-curricular' },
    { key: 'laboratory', label: 'Laboratories & STEM' },
    { key: 'transport', label: 'Transport Department' },
    { key: 'canteen', label: 'Canteen & Wallet' },
  ]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="No-Due Clearance Workflow" subtitle="Departmental clearance engine for student exit processing" maxWidth="lg">
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Select Student</label>
          <select value={selectedStudentId} onChange={(e) => setSelectedStudentId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {students.map((s) => <option key={s.id} value={s.id}>{s.name} – {s.regNo}</option>)}
          </select>
        </div>

        {student && record && (
          <div className="space-y-2">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold ${record.overallStatus === '100% Cleared' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'}`}>
              <CheckSquare className="w-3.5 h-3.5" />
              Overall Status: {record.overallStatus}
            </div>
            <div className="space-y-1.5">
              {departments.map(({ key, label }) => (
                <button key={key} onClick={() => toggleNoDueClearance(selectedStudentId, key)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${record.clearances[key] ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-300' : 'bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 hover:bg-slate-100'}`}>
                  <span>{label}</span>
                  {record.clearances[key] ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-slate-400" />}
                </button>
              ))}
            </div>
          </div>
        )}

        <button onClick={onClose} className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold cursor-pointer">Close</button>
      </div>
    </Modal>
  )
}
