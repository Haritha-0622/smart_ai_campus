import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { MOCK_HOSTEL_RESIDENTS } from '../../data/mockData'
import { HostelPassModal } from '../../components/workflows/HostelPassModal'
import { Badge } from '../../components/common/Badge'
import { ExportButton } from '../../components/common/ExportButton'
import { Home, ShieldCheck, UserCheck, Clock, CheckCircle2, QrCode, Plus } from 'lucide-react'

export const Module16_HostelManagement: React.FC = () => {
  const { outpasses, updateOutpassStatus, showToast } = useApp()
  const [modalOpen, setModalOpen] = useState(false)

  const handleGateCheckout = (passId: string) => {
    updateOutpassStatus(passId, { gateSecurityStatus: 'Checked Out' })
    showToast('Student checked out at Main Security Turnstile. Parent SMS dispatched.', 'success')
  }

  const handleGateReturn = (passId: string) => {
    updateOutpassStatus(passId, { gateSecurityStatus: 'Returned' })
    showToast('Student re-entry logged at Hostel Security Desk.', 'success')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              16. Hostel Management & Residential Outpass Desk
            </h1>
            <Badge variant="indigo">Module 16</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Hostel block occupancy, resident rosters, digital weekend outpasses, and 2-way parent authorizations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ExportButton filename="hostel_outpass_log" data={outpasses} />
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Generate Digital Outpass</span>
          </button>
        </div>
      </div>

      {/* Hostel Blocks Occupancy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900 dark:text-white">Block B (Kaveri Boys Hall)</span>
            <Badge variant="teal">94% Occupancy</Badge>
          </div>
          <p className="text-slate-500">Warden: Col. K. Balaji (Retd.) &bull; 188 / 200 Beds Occupied</p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900 dark:text-white">Block D (Yamuna Girls Hall)</span>
            <Badge variant="indigo">98% Occupancy</Badge>
          </div>
          <p className="text-slate-500">Warden: Mrs. Jayalakshmi Sharma &bull; 196 / 200 Beds Occupied</p>
        </div>
        <div className="p-5 rounded-2xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900 dark:text-white">Campus Residential Security</span>
            <Badge variant="emerald">Gate Cameras 100%</Badge>
          </div>
          <p className="text-slate-500">Turnstile 1 & 2 biometric scanners synced</p>
        </div>
      </div>

      {/* Outpass Table */}
      <div className="bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-xs">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
          Active Outpass Requests & Gate Verification
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {outpasses.map((op) => (
            <div key={op.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{op.studentName}</span>
                  <span className="font-mono text-slate-400 font-semibold">{op.roomNo}</span>
                  <Badge variant={op.passType === 'Weekend Home' ? 'indigo' : 'teal'}>{op.passType}</Badge>
                </div>
                <p className="text-slate-500">
                  Reason: <strong>{op.reason}</strong> &bull; Departs: {op.leaveDate} &bull; Expected: {op.expectedReturn}
                </p>
                <div className="flex items-center gap-3 pt-1 text-[11px]">
                  <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <UserCheck className="w-3.5 h-3.5" /> Parent SMS Verified
                  </span>
                  <span className="flex items-center gap-1 text-indigo-600 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" /> Warden Signed
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    op.gateSecurityStatus === 'Checked Out'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : op.gateSecurityStatus === 'Returned'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {op.gateSecurityStatus}
                </span>

                {op.gateSecurityStatus === 'Pending Verification' && (
                  <button
                    onClick={() => handleGateCheckout(op.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer text-xs"
                  >
                    Scan QR & Check Out
                  </button>
                )}
                {op.gateSecurityStatus === 'Checked Out' && (
                  <button
                    onClick={() => handleGateReturn(op.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer text-xs"
                  >
                    Log Return Entry
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <HostelPassModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
