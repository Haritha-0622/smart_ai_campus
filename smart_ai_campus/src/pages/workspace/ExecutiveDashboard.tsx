import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { StatCard } from '../../components/common/StatCard'
import { Badge } from '../../components/common/Badge'
import { ExportButton } from '../../components/common/ExportButton'
import { RFIDAttendanceSimulatorModal } from '../../components/workflows/RFIDAttendanceSimulatorModal'
import { PurchaseRequestModal } from '../../components/workflows/PurchaseRequestModal'
import { CircularComposerModal } from '../../components/workflows/CircularComposerModal'
import { AlertTriangle, CheckCircle2, DollarSign, Bus, Radio, Zap, FileText, ShieldCheck, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export const ExecutiveDashboard: React.FC = () => {
  const { institution, attendance, approvals, showToast } = useApp()
  const [rfidModalOpen, setRfidModalOpen] = useState(false)
  const [prModalOpen, setPrModalOpen] = useState(false)
  const [circularModalOpen, setCircularModalOpen] = useState(false)

  const exceptions = [
    { id: 'exc-01', domain: 'Attendance', severity: 'Critical', title: 'Muster Roll Absence Flag: Divya Nair', detail: 'Student in Kaveri Hostel missed morning gate roll call. Automated parent SMS sent.', actionPath: '/app/rfid-attendance' },
    { id: 'exc-02', domain: 'Supply Chain', severity: 'Warning', title: 'Smart Purchase Alarm: Exam Booklets Under Min Threshold', detail: '480 booklets remaining in Central Stores vs 1,000 safety threshold.', actionPath: '/app/inventory' },
    { id: 'exc-03', domain: 'Fleet GPS', severity: 'Warning', title: 'Bus #06 Ring Road Diversion (18 Mins Delay)', detail: 'Traffic diversion near Barapullah flyover. Parents on stops 8–11 alerted.', actionPath: '/app/transport' }
  ]

  const pendingApprovals = approvals.filter((a) => a.status === 'Pending').length
  const presentToday = attendance.filter((a) => a.status === 'Present').length

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5 mb-5">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">Executive Health Console (5-Second View)</h1>
              <Badge variant="teal" dot>Live Signals</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{institution.name} · {institution.type === 'school' ? 'CBSE K-12' : 'Higher Education'} · Academic Year 2025-2026</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setRfidModalOpen(true)} className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer">
              <Radio className="w-3.5 h-3.5" /> Simulate Gate RFID
            </button>
            <button onClick={() => setPrModalOpen(true)} className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer">
              <Zap className="w-3.5 h-3.5" /> Raise Purchase Request
            </button>
            <button onClick={() => setCircularModalOpen(true)} className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer">
              <FileText className="w-3.5 h-3.5" /> Compose Circular
            </button>
            <ExportButton filename="executive_report" data={exceptions.map((e) => ({ domain: e.domain, severity: e.severity, title: e.title }))} label="Export" />
          </div>
        </div>

        {/* Traffic Light Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {[
            { label: 'Gate Attendance', value: '96.2%', color: 'bg-emerald-500' },
            { label: 'Fee Collection', value: '91% of Target', color: 'bg-amber-400' },
            { label: 'Fleet GPS Status', value: '1 Delay Active', color: 'bg-amber-400' },
            { label: 'Pending Approvals', value: `${pendingApprovals} Pending`, color: pendingApprovals > 2 ? 'bg-rose-500' : 'bg-emerald-500' }
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
              <div className={`w-3 h-3 rounded-full ${item.color} animate-pulse shrink-0`} />
              <div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{item.value}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          <StatCard title="Students Present Today" value={`${presentToday + 2700}`} subtext={`of ${institution.studentCount.toLocaleString()} enrolled`} icon={CheckCircle2} status="healthy" trend={{ value: '+0.4%', isPositive: true, label: 'vs yesterday' }} />
          <StatCard title="Pending Fee Collection" value="₹12.4L" subtext="Oct 2025 target: ₹100L" icon={DollarSign} status="warning" trend={{ value: '-9%', isPositive: false, label: 'behind target' }} />
          <StatCard title="Active Buses On Route" value="8 / 10" subtext="2 at school premises" icon={Bus} status="warning" trend={{ value: '1 delayed', isPositive: false }} />
          <StatCard title="Pending Approvals" value={pendingApprovals} subtext="Requires principal action" icon={AlertTriangle} status={pendingApprovals > 2 ? 'critical' : 'healthy'} actionLabel="Review Now" onAction={() => showToast('Navigate to Approvals module', 'info')} />
        </div>

        {/* Exceptions */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-rose-500" />
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Live Exception Intelligence — Requires Attention</h2>
          </div>
          <div className="space-y-2">
            {exceptions.map((exc) => (
              <div key={exc.id} className={`flex items-start gap-3 p-3.5 rounded-xl border ${exc.severity === 'Critical' ? 'bg-rose-50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/40' : 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/40'}`}>
                <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${exc.severity === 'Critical' ? 'text-rose-500' : 'text-amber-500'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={exc.severity === 'Critical' ? 'rose' : 'amber'}>{exc.severity}</Badge>
                    <span className="text-[10px] font-bold text-slate-500 uppercase">{exc.domain}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">{exc.title}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{exc.detail}</p>
                </div>
                <Link to={exc.actionPath} className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline shrink-0 flex items-center gap-1">
                  Inspect <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <RFIDAttendanceSimulatorModal isOpen={rfidModalOpen} onClose={() => setRfidModalOpen(false)} />
      <PurchaseRequestModal isOpen={prModalOpen} onClose={() => setPrModalOpen(false)} />
      <CircularComposerModal isOpen={circularModalOpen} onClose={() => setCircularModalOpen(false)} />
    </div>
  )
}
