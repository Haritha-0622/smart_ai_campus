import React, { useState } from 'react'
import { Modal } from '../common/Modal'
import { useApp } from '../../context/AppContext'
import { Radio, AlertTriangle, CheckCircle2 } from 'lucide-react'

interface RFIDAttendanceSimulatorModalProps {
  isOpen: boolean
  onClose: () => void
}

export const RFIDAttendanceSimulatorModal: React.FC<RFIDAttendanceSimulatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const { students, recordAttendance } = useApp()

  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '')
  const [readerId, setReaderId] = useState('GATE-01-NORTH-TURNSTILE')
  const [mode, setMode] = useState<'RFID Reader' | 'Manual Override'>('RFID Reader')
  const [status, setStatus] = useState<'Present' | 'Late' | 'Absent'>('Present')
  const [exceptionReason, setExceptionReason] = useState('')

  const student = students.find((s) => s.id === selectedStudentId) || students[0]

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!student) return

    const now = new Date()
    const timeStr = now.toLocaleTimeString()

    recordAttendance({
      entityId: student.regNo,
      entityName: student.name,
      type: 'student',
      date: `Today, ${timeStr}`,
      time: timeStr,
      status,
      mode,
      readerId,
      exceptionFlag: status !== 'Present',
      exceptionReason: status !== 'Present' ? exceptionReason || 'Logged during demo simulation' : undefined
    })

    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="RFID Gate Terminal & Manual Attendance Simulator"
      subtitle="Simulate real-time gate turnstile swipes, device exceptions, and parent alerts"
      maxWidth="md"
    >
      <form onSubmit={handleSimulate} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Target Student
          </label>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.regNo}) &bull; {s.gradeOrDept} &bull; {s.rfidTag}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Capture Device / Reader
            </label>
            <select
              value={readerId}
              onChange={(e) => setReaderId(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
            >
              <option value="GATE-01-NORTH-TURNSTILE">Gate 01 North Turnstile</option>
              <option value="GATE-02-SOUTH-TURNSTILE">Gate 02 South Turnstile</option>
              <option value="BUS-04-RFID-BOARD">Bus #04 RFID Onboard Scanner</option>
              <option value="SECURITY-DESK-MANUAL">Security Gate Manual Terminal</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Scan Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
            >
              <option value="Present">Present (Punctual Arrival)</option>
              <option value="Late">Late (Flagged with Exception)</option>
              <option value="Absent">Absent (Trigger Parent WhatsApp/SMS)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Data Ingestion Mode
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="mode"
                checked={mode === 'RFID Reader'}
                onChange={() => setMode('RFID Reader')}
              />
              <span>Automatic RFID Telemetry</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="mode"
                checked={mode === 'Manual Override'}
                onChange={() => setMode('Manual Override')}
              />
              <span>Manual Admin Override</span>
            </label>
          </div>
        </div>

        {status !== 'Present' && (
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Exception Note / Reason
            </label>
            <input
              type="text"
              placeholder="e.g. Bus delayed, medical note, or gate malfunction"
              value={exceptionReason}
              onChange={(e) => setExceptionReason(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
            />
          </div>
        )}

        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
          <p className="font-semibold text-slate-800 dark:text-white">Live Parent Notification Simulation:</p>
          <p className="mt-0.5">
            Will trigger simulated SMS to <span className="font-mono text-indigo-600 dark:text-indigo-400">{student?.parentPhone}</span> ({student?.parentName}).
          </p>
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
            <Radio className="w-3.5 h-3.5" />
            Simulate Gate Punch
          </button>
        </div>
      </form>
    </Modal>
  )
}
