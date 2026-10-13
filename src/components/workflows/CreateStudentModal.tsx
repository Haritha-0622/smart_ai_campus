import React, { useState } from 'react'
import { Modal } from '../common/Modal'
import { useApp } from '../../context/AppContext'
import { Student } from '../../types'

interface CreateStudentModalProps {
  isOpen: boolean
  onClose: () => void
}

export const CreateStudentModal: React.FC<CreateStudentModalProps> = ({ isOpen, onClose }) => {
  const { addStudent, institution } = useApp()

  const [name, setName] = useState('')
  const [gradeOrDept, setGradeOrDept] = useState(
    institution.type === 'school' ? 'Grade 11-A (Science)' : 'B.Tech CSE (Semester 5)'
  )
  const [category, setCategory] = useState<'Day Scholar' | 'Hosteller'>('Day Scholar')
  const [parentName, setParentName] = useState('')
  const [parentPhone, setParentPhone] = useState('')
  const [parentEmail, setParentEmail] = useState('')
  const [busRoute, setBusRoute] = useState('Route 04 (South Green Line)')
  const [hostelBlock, setHostelBlock] = useState('Block B (Kaveri Hall)')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !parentName || !parentPhone) return

    const randomIdSuffix = Math.floor(1000 + Math.random() * 9000)
    const newStudent: Omit<Student, 'id'> = {
      regNo: `SAC-2025-${randomIdSuffix}`,
      name,
      gradeOrDept,
      sectionOrSem: institution.type === 'school' ? 'Section A / Term 2' : 'Sem 5 / Sec B',
      category,
      rfidTag: `RFID-${randomIdSuffix}-900`,
      parentName,
      parentPhone,
      parentEmail: parentEmail || `${name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      busRoute: category === 'Day Scholar' ? busRoute : undefined,
      hostelBlock: category === 'Hosteller' ? hostelBlock : undefined,
      walletBalance: 2000,
      attendanceRate: 100,
      feeTotal: 145000,
      feePaid: 145000,
      feePending: 0,
      libraryBooksCount: 0,
      noDueStatus: 'Not Initiated',
      academicGrade: 'A1 (Provisional)',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    }

    addStudent(newStudent)
    onClose()
    // Reset form
    setName('')
    setParentName('')
    setParentPhone('')
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Enroll New Student & Issue Institutional ID"
      subtitle={`Enrolling under ${institution.name} (${institution.boardOrUniversity})`}
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Full Student Legal Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Aditi Sundaram"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {institution.type === 'school' ? 'Class & Stream *' : 'Department & Degree *'}
            </label>
            <input
              type="text"
              required
              value={gradeOrDept}
              onChange={(e) => setGradeOrDept(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Residential Status *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
            >
              <option value="Day Scholar">Day Scholar (Campus Transport)</option>
              <option value="Hosteller">Hosteller (Campus Residential)</option>
            </select>
          </div>

          {category === 'Day Scholar' ? (
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Assigned Bus Route
              </label>
              <select
                value={busRoute}
                onChange={(e) => setBusRoute(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
              >
                <option value="Route 04 (South Green Line)">Route 04 (South Green Line)</option>
                <option value="Route 02 (North Express)">Route 02 (North Express)</option>
                <option value="Route 06 (East Circular)">Route 06 (East Circular)</option>
              </select>
            </div>
          ) : (
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Hostel Hall Allocation
              </label>
              <select
                value={hostelBlock}
                onChange={(e) => setHostelBlock(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
              >
                <option value="Block B (Kaveri Boys Hall)">Block B (Kaveri Boys Hall)</option>
                <option value="Block D (Yamuna Girls Hall)">Block D (Yamuna Girls Hall)</option>
              </select>
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-3">
          <p className="font-bold text-slate-900 dark:text-white mb-2">Guardian & Contact Verification</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Parent / Guardian Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. K. Sundaram"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Mobile Number (SMS/WhatsApp) *
              </label>
              <input
                type="tel"
                required
                placeholder="+91 98400 00000"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Parent Email
              </label>
              <input
                type="email"
                placeholder="parent@domain.com"
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="bg-indigo-50/70 dark:bg-indigo-950/40 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/60 text-[11px] text-indigo-800 dark:text-indigo-300">
          Enrolling will automatically generate an institutional barcode, provision a Mifare 1K RFID reference, and initialize the campus cashless wallet with a ₹2,000 opening credit.
        </div>

        <div className="pt-2 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold cursor-pointer shadow-xs"
          >
            Enroll & Generate ID Card
          </button>
        </div>
      </form>
    </Modal>
  )
}
