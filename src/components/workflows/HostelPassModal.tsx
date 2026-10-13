import React, { useState } from 'react'
import { Modal } from '../common/Modal'
import { useApp } from '../../context/AppContext'
import { ShieldCheck, UserCheck, QrCode } from 'lucide-react'

interface HostelPassModalProps {
  isOpen: boolean
  onClose: () => void
}

export const HostelPassModal: React.FC<HostelPassModalProps> = ({ isOpen, onClose }) => {
  const { students, addOutpass } = useApp()

  const hostellers = students.filter((s) => s.category === 'Hosteller')
  const defaultStudent = hostellers[0] || students[0]

  const [studentId, setStudentId] = useState(defaultStudent.id)
  const [passType, setPassType] = useState<'Day Pass' | 'Weekend Home' | 'Medical / Emergency'>('Weekend Home')
  const [leaveDate, setLeaveDate] = useState('Tomorrow 04:30 PM')
  const [returnDate, setReturnDate] = useState('Monday 07:30 AM')
  const [reason, setReason] = useState('Family festival visit and local guardian residence stay')
  const [parentAcknowledged, setParentAcknowledged] = useState(true)

  const selectedStudent = students.find((s) => s.id === studentId) || defaultStudent

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addOutpass({
      studentId: selectedStudent.regNo,
      studentName: selectedStudent.name,
      roomNo: selectedStudent.hostelRoom || 'Block B / Room 304',
      passType,
      leaveDate,
      expectedReturn: returnDate,
      reason,
      parentAcknowledged,
      wardenApproved: true,
      gateSecurityStatus: 'Pending Verification'
    })
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Hostel Digital Outpass & Gate Pass"
      subtitle="Parent SMS 2-way acknowledgement & residential security dispatch"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Hostel Resident Student
          </label>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
          >
            {hostellers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.regNo}) &bull; {s.hostelBlock} {s.hostelRoom}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Pass Classification
            </label>
            <select
              value={passType}
              onChange={(e) => setPassType(e.target.value as any)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
            >
              <option value="Weekend Home">Weekend Home Visit</option>
              <option value="Day Pass">Day Town Pass (4 Hours)</option>
              <option value="Medical / Emergency">Medical / Emergency Escort</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Departure Schedule
            </label>
            <input
              type="text"
              value={leaveDate}
              onChange={(e) => setLeaveDate(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Mandatory Expected Return Time
          </label>
          <input
            type="text"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Reason & Destination Address *
          </label>
          <textarea
            rows={2}
            required
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
          />
        </div>

        {/* Parent Acknowledgement Checkbox Simulation */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={parentAcknowledged}
              onChange={(e) => setParentAcknowledged(e.target.checked)}
              className="mt-0.5"
            />
            <div>
              <span className="font-semibold text-slate-900 dark:text-white">
                Simulate Instant Parent SMS / WhatsApp Verification
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                OTP dispatched to {selectedStudent.parentPhone} ({selectedStudent.parentName}).
              </p>
            </div>
          </label>
        </div>

        <div className="pt-2 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold flex items-center gap-1.5 shadow-xs"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Issue Digital Gate Pass
          </button>
        </div>
      </form>
    </Modal>
  )
}
