import React, { useState } from 'react'
import { Modal } from '../common/Modal'
import { useApp } from '../../context/AppContext'
import { Home, CheckCircle } from 'lucide-react'

interface Props { isOpen: boolean; onClose: () => void }

export const HostelPassModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { students, addOutpass } = useApp()
  const hostelStudents = students.filter((s) => s.category === 'Hosteller')
  const [studentId, setStudentId] = useState(hostelStudents[0]?.id || '')
  const [reason, setReason] = useState('')
  const [destination, setDestination] = useState('')
  const [exitTime, setExitTime] = useState('')
  const [expectedReturn, setExpectedReturn] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const student = students.find((s) => s.id === studentId)
    if (!student) return
    addOutpass({ studentId, studentName: student.name, regNo: student.regNo, reason, destination, exitTime, expectedReturn, status: 'Pending', requestDate: new Date().toISOString().split('T')[0] })
    setReason(''); setDestination(''); setExitTime(''); setExpectedReturn('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Request Hostel Outpass" subtitle="Submit gate pass for hostel resident" maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Select Hostel Resident *</label>
          <select value={studentId} onChange={(e) => setStudentId(e.target.value)} required
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {hostelStudents.map((s) => <option key={s.id} value={s.id}>{s.name} – {s.hostelBlock}</option>)}
          </select>
        </div>
        {[
          { label: 'Reason for Outpass *', value: reason, setter: setReason, placeholder: 'e.g. Medical consultation' },
          { label: 'Destination *', value: destination, setter: setDestination, placeholder: 'e.g. AIIMS Hospital, Ansari Nagar' },
        ].map(({ label, value, setter, placeholder }) => (
          <div key={label}>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{label}</label>
            <input value={value} onChange={(e) => setter(e.target.value)} placeholder={placeholder} required
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        ))}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Exit Date & Time *</label>
            <input type="datetime-local" value={exitTime} onChange={(e) => setExitTime(e.target.value)} required
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Expected Return *</label>
            <input type="datetime-local" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} required
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <button type="button" onClick={onClose} className="flex-1 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold cursor-pointer">Cancel</button>
          <button type="submit" className="flex-1 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold flex items-center justify-center gap-2 cursor-pointer">
            <Home className="w-4 h-4" /> Submit Outpass Request
          </button>
        </div>
      </form>
    </Modal>
  )
}
