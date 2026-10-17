import React, { useState } from 'react'
import { Modal } from '../common/Modal'
import { useApp } from '../../context/AppContext'
import { UserPlus } from 'lucide-react'

interface Props { isOpen: boolean; onClose: () => void }

export const CreateStudentModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { addStudent } = useApp()
  const [name, setName] = useState('')
  const [gradeOrDept, setGradeOrDept] = useState('')
  const [category, setCategory] = useState<'Day Scholar' | 'Hosteller'>('Day Scholar')
  const [parentName, setParentName] = useState('')
  const [parentPhone, setParentPhone] = useState('')
  const [parentEmail, setParentEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const regNo = `SAC-2025-${String(Math.floor(Math.random() * 9000) + 1000)}`
    addStudent({
      regNo, name, gradeOrDept, sectionOrSem: 'Section A / Term 2', category,
      rfidTag: `RFID-${Math.floor(Math.random() * 90000) + 10000}`, parentName, parentPhone, parentEmail,
      walletBalance: 0, attendanceRate: 100, feeTotal: 130000, feePaid: 0, feePending: 130000,
      libraryBooksCount: 0, noDueStatus: 'Not Initiated', academicGrade: 'N/A', status: 'Active',
      avatar: `https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80`
    })
    setName(''); setGradeOrDept(''); setParentName(''); setParentPhone(''); setParentEmail('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register New Student" subtitle="Add a student to the campus registry" maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-3">
        {[
          { label: 'Full Name *', value: name, setter: setName, placeholder: 'e.g. Arjun Mehta' },
          { label: 'Grade / Department *', value: gradeOrDept, setter: setGradeOrDept, placeholder: 'e.g. Grade 11-A (Science)' },
          { label: 'Parent / Guardian Name *', value: parentName, setter: setParentName, placeholder: 'e.g. Suresh Mehta' },
          { label: 'Parent Phone *', value: parentPhone, setter: setParentPhone, placeholder: '+91 98XXX XXXXX' },
          { label: 'Parent Email', value: parentEmail, setter: setParentEmail, placeholder: 'parent@email.com' },
        ].map(({ label, value, setter, placeholder }) => (
          <div key={label}>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{label}</label>
            <input value={value} onChange={(e) => setter(e.target.value)} placeholder={placeholder} required={label.includes('*')}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        ))}
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value as typeof category)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Day Scholar</option><option>Hosteller</option>
          </select>
        </div>
        <div className="flex gap-2 pt-2">
          <button type="button" onClick={onClose} className="flex-1 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold cursor-pointer">Cancel</button>
          <button type="submit" className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold flex items-center justify-center gap-2 cursor-pointer">
            <UserPlus className="w-4 h-4" /> Register Student
          </button>
        </div>
      </form>
    </Modal>
  )
}
