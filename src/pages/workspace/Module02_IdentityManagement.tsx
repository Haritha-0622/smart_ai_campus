import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { CreateStudentModal } from '../../components/workflows/CreateStudentModal'
import { Badge } from '../../components/common/Badge'
import { ExportButton } from '../../components/common/ExportButton'
import {
  CreditCard,
  UserPlus,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  QrCode,
  ShieldAlert,
  RotateCcw,
  Check
} from 'lucide-react'

export const Module02_IdentityManagement: React.FC = () => {
  const { students, updateStudent, showToast } = useApp()
  const [modalOpen, setModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedStudent, setSelectedStudent] = useState(students[0])

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.regNo.toLowerCase().includes(search.toLowerCase()) ||
      s.rfidTag.toLowerCase().includes(search.toLowerCase())
  )

  const handleDeactivate = (id: string) => {
    updateStudent(id, { status: 'Suspended' })
    showToast('RFID Credential suspended in security database', 'warning')
  }

  const handleReactivate = (id: string) => {
    updateStudent(id, { status: 'Active' })
    showToast('RFID Credential reactivated', 'success')
  }

  const handleIssueReplacement = (id: string) => {
    const newTag = `RFID-${Math.floor(1000 + Math.random() * 9000)}-REP`
    updateStudent(id, { rfidTag: newTag })
    showToast(`Replacement Smart RFID Card issued: ${newTag}`, 'success')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              02. Identity & Smart ID Card Management
            </h1>
            <Badge variant="indigo">Module 02</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Single institutional identity, Mifare 1K RFID reference, document completeness, and lifecycle states.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ExportButton filename="campus_identities" data={students} />
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Enroll Student & Issue Card
          </button>
        </div>
      </div>

      {/* Identity Anomaly Detection Banner */}
      <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex items-start gap-3 text-xs">
        <ShieldAlert className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-indigo-950 dark:text-indigo-200">
          <span className="font-bold">Smart Identity Integrity Guard: </span>
          Zero duplicate RFID references found across 2,840 active badges. All active students mapped to verified guardian phone numbers.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Directory Table (8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, Reg ID, or RFID tag..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
              />
            </div>
            <span className="text-xs text-slate-500">{filtered.length} Records</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 border-y border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Institutional Reg No</th>
                  <th className="py-2.5 px-3">RFID Credential</th>
                  <th className="py-2.5 px-3">Class / Program</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((s) => (
                  <tr
                    key={s.id}
                    onClick={() => setSelectedStudent(s)}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer transition-colors ${
                      selectedStudent?.id === s.id ? 'bg-indigo-50/50 dark:bg-indigo-950/30' : ''
                    }`}
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={s.avatar}
                          alt={s.name}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                        />
                        <span className="font-bold text-slate-900 dark:text-white">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-slate-600 dark:text-slate-300">
                      {s.regNo}
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-indigo-600 dark:text-indigo-400">
                      {s.rfidTag}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{s.gradeOrDept}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          s.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleIssueReplacement(s.id)
                        }}
                        className="p-1 rounded text-slate-400 hover:text-indigo-600"
                        title="Issue Replacement Card"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected ID Card Badge Mockup (Right 4 cols) */}
        {selectedStudent && (
          <div className="lg:col-span-4 bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-5 space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              <span>Smart ID Card Digital Twin</span>
            </h3>

            {/* Visual Smart Card */}
            <div className="rounded-2xl p-5 bg-gradient-to-br from-[#101A33] to-[#1E293B] text-white shadow-xl relative overflow-hidden space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold tracking-wider uppercase text-indigo-400">
                  Delhi Public Academy
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white font-mono">
                  {selectedStudent.category}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="w-14 h-14 rounded-xl object-cover border-2 border-indigo-400 shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-sm leading-tight">{selectedStudent.name}</h4>
                  <p className="text-[11px] text-slate-300">{selectedStudent.gradeOrDept}</p>
                  <p className="font-mono text-[10px] text-indigo-300 mt-1">{selectedStudent.regNo}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                <div>
                  <p className="text-slate-400">RFID Encoded Tag</p>
                  <p className="text-white font-bold">{selectedStudent.rfidTag}</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-400">Wallet Balance</p>
                  <p className="text-emerald-400 font-bold">₹{selectedStudent.walletBalance}</p>
                </div>
              </div>
            </div>

            {/* Lifecycle Controls */}
            <div className="space-y-2 pt-2">
              <p className="font-bold text-slate-900 dark:text-white text-xs">Credential Lifecycle Actions</p>
              <div className="grid grid-cols-2 gap-2">
                {selectedStudent.status === 'Active' ? (
                  <button
                    onClick={() => handleDeactivate(selectedStudent.id)}
                    className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 font-bold text-[11px] hover:bg-rose-100 cursor-pointer"
                  >
                    Deactivate RFID
                  </button>
                ) : (
                  <button
                    onClick={() => handleReactivate(selectedStudent.id)}
                    className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 font-bold text-[11px] hover:bg-emerald-100 cursor-pointer"
                  >
                    Reactivate RFID
                  </button>
                )}
                <button
                  onClick={() => handleIssueReplacement(selectedStudent.id)}
                  className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-[11px] hover:bg-slate-200 cursor-pointer"
                >
                  Issue Duplicate
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <CreateStudentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
