import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { NoDueWorkflowModal } from '../../components/workflows/NoDueWorkflowModal'
import { Badge } from '../../components/common/Badge'
import { CheckSquare, Clock, CheckCircle2, XCircle, FileText, AlertTriangle } from 'lucide-react'

export const Module20_ApprovalsWorkflow: React.FC = () => {
  const { approvals, resolveApproval } = useApp()
  const [noDueModalOpen, setNoDueModalOpen] = useState(false)
  const [selectedStudentForTC, setSelectedStudentForTC] = useState('SAC-2025-0842')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              20. Central Approvals & Cross-Module Workflow Engine
            </h1>
            <Badge variant="indigo">Module 20</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Maker-checker approval queues for Transfer Certificates, purchase orders, special coaching classes, and residential gate passes.
          </p>
        </div>

        <Badge variant="amber">
          {approvals.filter((a) => a.status === 'Pending').length} Pending Tasks
        </Badge>
      </div>

      {/* Approvals List */}
      <div className="space-y-4">
        {approvals.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Badge variant={item.type === 'No-Due / TC' ? 'rose' : item.type === 'Procurement PO' ? 'amber' : 'teal'}>
                  {item.type}
                </Badge>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] text-slate-500">
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-amber-500" /> SLA: {item.slaHoursLeft}h Remaining
                </span>
                <span>{item.date}</span>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300">
              Requested by: <strong>{item.requester}</strong> &bull; Department: {item.department}
            </p>

            {/* Render Details */}
            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl text-[11px] space-y-1 font-mono text-slate-700 dark:text-slate-300">
              {Object.entries(item.details).map(([k, v]) => (
                <div key={k}>
                  <span className="text-slate-400 capitalize">{k}: </span>
                  <span className="font-semibold">{String(v)}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    item.status === 'Approved'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : item.status === 'Rejected'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}
                >
                  Status: {item.status}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {item.type === 'No-Due / TC' && (
                  <button
                    onClick={() => {
                      setSelectedStudentForTC(item.details.studentId || 'SAC-2025-0842')
                      setNoDueModalOpen(true)
                    }}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 font-bold"
                  >
                    Inspect 6-Dept Matrix
                  </button>
                )}

                {item.status === 'Pending' && (
                  <>
                    <button
                      onClick={() => resolveApproval(item.id, 'Rejected')}
                      className="px-3.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 font-bold cursor-pointer"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => resolveApproval(item.id, 'Approved')}
                      className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer shadow-xs"
                    >
                      Approve & Seal
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <NoDueWorkflowModal
        isOpen={noDueModalOpen}
        onClose={() => setNoDueModalOpen(false)}
        studentId={selectedStudentForTC}
      />
    </div>
  )
}
