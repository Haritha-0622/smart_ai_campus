import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { Sparkles, Bot, ShieldCheck, ArrowRight, FileText, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const Module22_AIAssistantHub: React.FC = () => {
  const { setIsCopilotOpen, showToast } = useApp()
  const navigate = useNavigate()

  const aiCapabilities = [
    {
      title: 'Attendance Anomaly & Late Pattern Detection',
      domain: 'Student Life & Security',
      desc: 'Correlates gate RFID turnstile timestamps with bus route arrivals. Detects unexcused absences and drafts parent SMS notifications.',
      actionPath: '/app/rfid-attendance',
      actionLabel: 'Inspect Ingest Terminal'
    },
    {
      title: 'Transport Fleet Fuel & Overrun Explanations',
      domain: 'Finance & Supply Chain',
      desc: 'Explains Q3 fuel expense deviation (-₹1.5L) due to engine overhauls on Bus #04 and diesel market price index shift.',
      actionPath: '/app/finance',
      actionLabel: 'Inspect Budget Ledger'
    },
    {
      title: 'Smart Purchase Replenishment Forecasts',
      domain: 'Central Inventory',
      desc: 'Predicts stock exhaustion for security exam answer booklets using lead-time algorithms and historical consumption rates.',
      actionPath: '/app/inventory',
      actionLabel: 'Inspect Reorder Queue'
    },
    {
      title: 'Timetable Teacher Conflict & Substitution Suggestion',
      domain: 'Academic Management',
      desc: 'Generates non-overlapping invigilation rosters and suggests qualified faculty replacements when teachers are on medical leave.',
      actionPath: '/app/academics',
      actionLabel: 'View Timetable Matrix'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              22. SAC Copilot & Institutional Intelligence Hub
            </h1>
            <Badge variant="indigo">Module 22</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Deterministic, grounded AI assistants designed to eliminate administrative fatigue while preserving human governance.
          </p>
        </div>

        <button
          onClick={() => setIsCopilotOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-600 text-white font-bold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Launch Docked Copilot Drawer</span>
        </button>
      </div>

      {/* Governance & Safety Accordion */}
      <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex items-start gap-3 text-xs">
        <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-slate-700 dark:text-slate-200 space-y-1">
          <h4 className="font-bold text-indigo-950 dark:text-indigo-200 text-sm">
            Ethical AI Governance & RBAC Isolation
          </h4>
          <p className="leading-relaxed">
            Every SAC Copilot inference is deterministic, strictly grounded in visible tenant records, and restricted by the active user persona’s authorization level. AI suggestions remain advisory recommendations and never execute high-impact financial or disciplinary actions without human sign-off.
          </p>
        </div>
      </div>

      {/* AI Capability Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {aiCapabilities.map((cap, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between text-xs space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="teal">{cap.domain}</Badge>
                <span className="text-[10px] font-mono font-bold text-slate-400">Model: SAC-Advisory-2.0</span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">{cap.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-2">{cap.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => navigate(cap.actionPath)}
                className="inline-flex items-center gap-1.5 font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                <span>{cap.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
