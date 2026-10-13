import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { CircularComposerModal } from '../../components/workflows/CircularComposerModal'
import { Badge } from '../../components/common/Badge'
import { ExportButton } from '../../components/common/ExportButton'
import { MessageSquare, Send, CheckCircle2, Eye, Bell, Sparkles, Plus } from 'lucide-react'

export const Module11_CommunicationManagement: React.FC = () => {
  const { circulars, showToast } = useApp()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              11. Communication Hub & Circular Dispatch
            </h1>
            <Badge variant="indigo">Module 11</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Official circulars, targeted parent broadcasts, AI drafting assistant, delivery verification, and read receipt metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ExportButton filename="campus_circulars_analytics" data={circulars} />
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Compose Official Circular</span>
          </button>
        </div>
      </div>

      {/* Circular Cards */}
      <div className="space-y-4">
        {circulars.map((circ) => (
          <div
            key={circ.id}
            className="bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <Badge variant={circ.category === 'Academic' ? 'indigo' : 'teal'}>{circ.category}</Badge>
                <span className="font-mono text-slate-400 font-semibold">{circ.circularNo}</span>
                <span className="text-slate-400">&bull;</span>
                <span className="text-slate-500 font-medium">Audience: <strong>{circ.targetAudience}</strong></span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Published: {circ.publishedDate}</span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">{circ.title}</h3>
            <p className="text-slate-500 text-[11px]">Author / Signatory: {circ.author}</p>

            {/* Read Receipts Progress Bar */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-semibold text-emerald-600">
                  <Eye className="w-3.5 h-3.5" /> {circ.readPercentage}% Read Receipts
                </span>
                <span className="flex items-center gap-1.5 text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /> {circ.acknowledgedCount} / {circ.totalRecipients} Digital Acknowledgements
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast(`Resent SMS push reminder for ${circ.circularNo}`, 'info')}
                  className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-[11px] font-semibold"
                >
                  Resend SMS Reminder
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CircularComposerModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
