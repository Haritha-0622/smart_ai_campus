import React from 'react'
import { Modal } from '../common/Modal'
import { useApp } from '../../context/AppContext'
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  FileBadge,
  Building,
  BookOpen,
  DollarSign,
  Coffee,
  FlaskConical,
  CreditCard
} from 'lucide-react'

interface NoDueWorkflowModalProps {
  isOpen: boolean
  onClose: () => void
  studentId: string
}

export const NoDueWorkflowModal: React.FC<NoDueWorkflowModalProps> = ({
  isOpen,
  onClose,
  studentId
}) => {
  const { students, noDueRecords, toggleNoDueClearance, showToast } = useApp()

  const student = students.find((s) => s.id === studentId || s.regNo === studentId) || students[0]
  const record = noDueRecords.find((r) => r.studentId === student?.regNo) || noDueRecords[0]

  if (!student || !record) return null

  const clearances = [
    {
      key: 'library' as const,
      label: 'Central Library Knowledge Commons',
      icon: BookOpen,
      cleared: record.clearances.library,
      officer: 'Dr. M. Jayashree (Chief Librarian)',
      note: record.clearances.library ? 'All 2 borrowed titles checked in' : '2 Books currently borrowed (Due Oct 24 & 28)'
    },
    {
      key: 'hostel' as const,
      label: 'Campus Residential Hostel Warden',
      icon: Building,
      cleared: record.clearances.hostel,
      officer: 'Col. K. Balaji (Retd.) (Warden)',
      note: record.clearances.hostel ? 'Room inventory inspected, key returned' : 'Room inspection pending'
    },
    {
      key: 'accounts' as const,
      label: 'Finance, Bursar & Tuition Dues',
      icon: DollarSign,
      cleared: record.clearances.accounts,
      officer: 'K. Ramanathan, CA (CFO)',
      note: record.clearances.accounts ? 'Zero balance confirmed' : `₹${student.feePending.toLocaleString('en-IN')} pending dues outstanding`
    },
    {
      key: 'canteen' as const,
      label: 'Campus Dining & Wallet Settlement',
      icon: Coffee,
      cleared: record.clearances.canteen,
      officer: 'Farhan Ahmed (Dining Supervisor)',
      note: record.clearances.canteen ? 'Wallet balance settled' : 'Wallet balance unredeemed'
    },
    {
      key: 'laboratories' as const,
      label: 'STEM & Science Laboratories',
      icon: FlaskConical,
      cleared: record.clearances.laboratories,
      officer: 'Prof. Meenakshi Sundaram (Lab Head)',
      note: record.clearances.laboratories ? 'Lab glassware and sensors intact' : 'Apparatus checklist pending'
    },
    {
      key: 'idCardSurrendered' as const,
      label: 'Institutional Smart ID Card Surrender',
      icon: CreditCard,
      cleared: record.clearances.idCardSurrendered,
      officer: 'Rajesh Varma (Registrar)',
      note: record.clearances.idCardSurrendered ? 'RFID card deactivated & returned' : 'Mandatory: Physical RFID card must be surrendered'
    }
  ]

  const clearedCount = Object.values(record.clearances).filter(Boolean).length
  const totalCount = clearances.length
  const isAllCleared = clearedCount === totalCount

  const handleIssueTC = () => {
    if (!isAllCleared) {
      showToast('Cannot issue TC: All 6 department clearances are strictly mandatory!', 'error')
      return
    }
    showToast(`Official Transfer Certificate (TC #TC-2026-${student.regNo.slice(-4)}) generated & signed digitally!`, 'success')
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Institutional No-Due & Transfer Certificate Clearance Matrix"
      subtitle={`Student: ${student.name} (${student.regNo}) &bull; ${student.gradeOrDept}`}
      maxWidth="2xl"
    >
      <div className="space-y-4 text-xs">
        {/* Progress Bar */}
        <div className="bg-slate-50 dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-slate-900 dark:text-white">
              Multi-Department Clearance Status: {clearedCount} of {totalCount} Completed
            </span>
            <span
              className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                isAllCleared
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}
            >
              {record.finalStatus}
            </span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                isAllCleared ? 'bg-emerald-500' : 'bg-indigo-600'
              }`}
              style={{ width: `${(clearedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>

        {/* Clearances Checklist */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          {clearances.map((c) => {
            const Icon = c.icon
            return (
              <div
                key={c.key}
                className="p-3.5 flex items-center justify-between bg-white dark:bg-[#131B2E] hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                      c.cleared
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs">{c.label}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Approver: {c.officer}
                    </p>
                    <p
                      className={`text-[11px] font-medium mt-0.5 ${
                        c.cleared
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      {c.note}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleNoDueClearance(student.regNo, c.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors shrink-0 flex items-center gap-1.5 ${
                    c.cleared
                      ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                >
                  {c.cleared ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Cleared
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5 text-slate-400" /> Grant Clearance
                    </>
                  )}
                </button>
              </div>
            )
          })}
        </div>

        {/* Action footer */}
        <div className="pt-2 flex items-center justify-between">
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {isAllCleared
              ? '✓ All 6 mandatory statutory checkpoints verified and sealed.'
              : '⚠️ All 6 clearance checkpoints must be granted before TC generation is unlocked.'}
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              Close
            </button>
            <button
              disabled={!isAllCleared}
              onClick={handleIssueTC}
              className={`px-5 py-2 rounded-lg font-bold flex items-center gap-2 shadow-xs transition-colors ${
                isAllCleared
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
              }`}
            >
              <FileBadge className="w-4 h-4" />
              Generate Official TC
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
