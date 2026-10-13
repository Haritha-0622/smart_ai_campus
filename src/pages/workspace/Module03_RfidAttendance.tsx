import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { RFIDAttendanceSimulatorModal } from '../../components/workflows/RFIDAttendanceSimulatorModal'
import { Badge } from '../../components/common/Badge'
import { ExportButton } from '../../components/common/ExportButton'
import { Radio, AlertTriangle, CheckCircle, Clock, ShieldCheck, MessageSquare, Plus } from 'lucide-react'

export const Module03_RfidAttendance: React.FC = () => {
  const { attendance, showToast } = useApp()
  const [modalOpen, setModalOpen] = useState(false)
  const [filter, setFilter] = useState<'all' | 'exceptions' | 'students' | 'staff'>('all')

  const filtered = attendance.filter((a) => {
    if (filter === 'exceptions') return a.exceptionFlag
    if (filter === 'students') return a.type === 'student'
    if (filter === 'staff') return a.type === 'staff'
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              03. RFID & Automatic Attendance Terminal
            </h1>
            <Badge variant="teal" dot>Live Telemetry</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time reader ingest, device logs, missed reads, manual overrides, and instant guardian SMS triggers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ExportButton filename="rfid_attendance_log" data={attendance} />
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Radio className="w-3.5 h-3.5" />
            Simulate RFID Reader Swipe
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-semibold">
        {[
          { key: 'all', label: `All Ingested Logs (${attendance.length})` },
          { key: 'exceptions', label: 'Flagged Exceptions & Absences' },
          { key: 'students', label: 'Students Only' },
          { key: 'staff', label: 'Faculty & Staff Biometrics' }
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key as any)}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filter === t.key
                ? 'bg-teal-600 text-white font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Terminal Log Table */}
      <div className="bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 border-b border-slate-200 dark:border-slate-800">
            <tr>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Entity ID & Name</th>
              <th className="py-3 px-4">Classification</th>
              <th className="py-3 px-4">Capture Reader / Device</th>
              <th className="py-3 px-4">Ingestion Mode</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Audit Exception Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((rec) => (
              <tr key={rec.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                  {rec.date}
                </td>
                <td className="py-3 px-4">
                  <span className="font-bold text-slate-900 dark:text-white block">{rec.entityName}</span>
                  <span className="font-mono text-[10px] text-slate-400">{rec.entityId}</span>
                </td>
                <td className="py-3 px-4 capitalize text-slate-600 dark:text-slate-300">
                  {rec.type}
                </td>
                <td className="py-3 px-4 font-mono text-[11px] text-indigo-600 dark:text-indigo-400">
                  {rec.readerId}
                </td>
                <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                  {rec.mode}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      rec.status === 'Present'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : rec.status === 'Late'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}
                  >
                    {rec.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-[11px] text-slate-500 dark:text-slate-400">
                  {rec.exceptionReason ? (
                    <span className="text-amber-600 dark:text-amber-400 font-medium">
                      ⚠️ {rec.exceptionReason}
                    </span>
                  ) : (
                    <span className="text-slate-400">Punctual &bull; Normal Swipe</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RFIDAttendanceSimulatorModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
