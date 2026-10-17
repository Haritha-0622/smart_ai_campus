import React, { useState } from 'react'
import { Modal } from '../common/Modal'
import { useApp } from '../../context/AppContext'
import { Radio, Check, Clock } from 'lucide-react'

interface Props { isOpen: boolean; onClose: () => void }

export const RFIDAttendanceSimulatorModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { students, staffList, recordAttendance, showToast } = useApp()
  const [selectedType, setSelectedType] = useState<'student' | 'staff'>('student')
  const [selectedId, setSelectedId] = useState(students[0]?.id || '')
  const [status, setStatus] = useState<'Present' | 'Late' | 'Absent'>('Present')
  const [readerId, setReaderId] = useState('GATE-MAIN-01')
  const [lastScanned, setLastScanned] = useState<string | null>(null)

  const currentList = selectedType === 'student' ? students : staffList
  const selected = currentList.find((e) => e.id === selectedId)

  const readerOptions = ['GATE-MAIN-01', 'GATE-MAIN-02', 'GATE-SIDE-01', 'BUS-RFID-01', 'HOSTEL-GATE-01', 'CANTEEN-POS-01']

  const handleScan = () => {
    if (!selected) return
    const now = new Date()
    recordAttendance({
      entityId: selected.id,
      entityName: selected.name,
      type: selectedType,
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().slice(0, 8),
      status,
      mode: 'RFID Reader',
      readerId,
      location: readerOptions.find((r) => r === readerId) || 'Main Gate'
    })
    setLastScanned(selected.name)
    showToast(`RFID scan recorded: ${selected.name} – ${status}`, status === 'Present' ? 'success' : 'warning')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Simulate RFID Gate Scan" subtitle="Mifare 1K Reader Terminal – Live Attendance Simulation" maxWidth="md">
      <div className="space-y-4">
        <div className="bg-slate-900 dark:bg-black rounded-xl p-4 font-mono text-xs space-y-1">
          <div className="flex items-center gap-2 text-teal-400"><Radio className="w-3.5 h-3.5 animate-pulse" /> RFID READER ACTIVE</div>
          <p className="text-slate-400">Terminal: {readerId}</p>
          <p className="text-slate-400">Institution: Delhi Public Academy</p>
          {lastScanned && <p className="text-emerald-400">✓ LAST SCAN: {lastScanned}</p>}
          <p className="text-slate-500">{new Date().toLocaleString()}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Entity Type</label>
            <select value={selectedType} onChange={(e) => { setSelectedType(e.target.value as typeof selectedType); setSelectedId(e.target.value === 'student' ? students[0]?.id : staffList[0]?.id) }}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="student">Student</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Reader Terminal</label>
            <select value={readerId} onChange={(e) => setReaderId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {readerOptions.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Select Person</label>
          <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {currentList.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Attendance Status</label>
          <div className="grid grid-cols-3 gap-2">
            {(['Present', 'Late', 'Absent'] as const).map((s) => (
              <button key={s} onClick={() => setStatus(s)} className={`py-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${status === s ? (s === 'Present' ? 'bg-emerald-600 text-white border-emerald-600' : s === 'Late' ? 'bg-amber-500 text-white border-amber-500' : 'bg-rose-600 text-white border-rose-600') : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold cursor-pointer">Close</button>
          <button onClick={handleScan} className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md shadow-teal-600/20">
            <Radio className="w-4 h-4" /> Simulate RFID Scan
          </button>
        </div>
      </div>
    </Modal>
  )
}
