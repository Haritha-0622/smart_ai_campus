import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { StatCard } from '../../components/common/StatCard'
import { Badge } from '../../components/common/Badge'
import { ExportButton } from '../../components/common/ExportButton'
import { RFIDAttendanceSimulatorModal } from '../../components/workflows/RFIDAttendanceSimulatorModal'
import { PurchaseRequestModal } from '../../components/workflows/PurchaseRequestModal'
import { CircularComposerModal } from '../../components/workflows/CircularComposerModal'
import {
  Radio,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Bus,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck,
  FileText,
  ArrowRight
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts'
import { Link } from 'react-router-dom'

export const ExecutiveDashboard: React.FC = () => {
  const { institution, currentRole, persona, attendance, approvals, showToast } = useApp()

  const [rfidModalOpen, setRfidModalOpen] = useState(false)
  const [prModalOpen, setPrModalOpen] = useState(false)
  const [circularModalOpen, setCircularModalOpen] = useState(false)

  const attendanceData = [
    { day: 'Mon', attendance: 95.8, busPunctual: 98 },
    { day: 'Tue', attendance: 96.2, busPunctual: 96 },
    { day: 'Wed', attendance: 94.9, busPunctual: 92 },
    { day: 'Thu', attendance: 97.1, busPunctual: 99 },
    { day: 'Fri (Today)', attendance: 96.2, busPunctual: 95 }
  ]

  const feeCollectionData = [
    { month: 'Jun', target: 80, collected: 84 },
    { month: 'Jul', target: 90, collected: 92 },
    { month: 'Aug', target: 75, collected: 78 },
    { month: 'Sep', target: 95, collected: 89 },
    { month: 'Oct', target: 100, collected: 91 }
  ]

  const exceptions = [
    {
      id: 'exc-01',
      domain: 'Attendance',
      severity: 'Critical',
      title: 'Muster Roll Absence Flag: Divya Nair',
      detail: 'Student in Kaveri Hostel missed morning gate roll call. Automated parent SMS sent.',
      actionPath: '/app/rfid-attendance'
    },
    {
      id: 'exc-02',
      domain: 'Supply Chain',
      severity: 'Warning',
      title: 'Smart Purchase Alarm: Exam Booklets Under Min Threshold',
      detail: '480 booklets remaining in Central Stores vs 1,000 safety threshold.',
      actionPath: '/app/inventory'
    },
    {
      id: 'exc-03',
      domain: 'Fleet GPS',
      severity: 'Warning',
      title: 'Bus #06 Ring Road Diversion (18 Mins Delay)',
      detail: 'Traffic diversion near Barapullah flyover. Parents on stops 8-11 alerted.',
      actionPath: '/app/transport'
    }
  ]

  return (
    <div className="space-y-6">
      {/* 5-SECOND TRAFFIC LIGHT STATUS HEADER */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
                Executive Health Console (5-Second View)
              </h1>
              <Badge variant="teal" dot>
                Live Signals Ingest
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {institution.name} &bull; {institution.type === 'school' ? 'CBSE K-12 Model' : 'Higher Education Model'} &bull; Academic Year: 2025-2026
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setRfidModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5" />
              Simulate Gate RFID
            </button>
            <button
              onClick={() => setPrModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              Trigger Purchase PO
            </button>
            <button
              onClick={() => setCircularModalOpen(true)}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              Broadcast Notice
            </button>
          </div>
        </div>

        {/* Traffic Light Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-5">
          <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/60 flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300">
                Gate Arrival
              </p>
              <p className="text-sm font-extrabold text-slate-900 dark:text-white">96.2% On Campus</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Normal punctuality</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/60 flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20 shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300">
                Bus Fleet Status
              </p>
              <p className="text-sm font-extrabold text-slate-900 dark:text-white">All 3 Routes Active</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">1 minor traffic delay</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-amber-500/20 shrink-0 animate-pulse" />
            <div>
              <p className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300">
                Supply Chain Alarm
              </p>
              <p className="text-sm font-extrabold text-amber-700 dark:text-amber-300">1 Item Low Stock</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Exam sheets threshold</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/60 flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20 shrink-0" />
            <div>
              <p className="text-[10px] uppercase font-bold text-indigo-800 dark:text-indigo-300">
                Workflows & TC
              </p>
              <p className="text-sm font-extrabold text-indigo-700 dark:text-indigo-300">
                {approvals.filter((a) => a.status === 'Pending').length} Pending Tasks
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">SLA: All &lt; 24h</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Campus Enrollment"
          value={institution.studentCount.toLocaleString('en-IN')}
          subtext="2,840 Enrolled across 44 Sections"
          icon={TrendingUp}
          status="healthy"
          trend={{ value: '+4.2%', isPositive: true, label: 'AY intake' }}
          actionLabel="View Directory"
          onAction={() => showToast('Opening Student Directory', 'info')}
        />
        <StatCard
          title="Daily RFID Punches"
          value="2,732"
          subtext="Gate turnstiles & Bus onboard readers"
          icon={Radio}
          status="healthy"
          trend={{ value: '96.2%', isPositive: true, label: 'Punctual' }}
          actionLabel="Terminal Logs"
          onAction={() => showToast('Opening Attendance Terminal', 'info')}
        />
        <StatCard
          title="Term Fee Inflow"
          value="₹3.84 Cr"
          subtext="Target: ₹4.20 Cr (Term 2 dues)"
          icon={DollarSign}
          status="neutral"
          trend={{ value: '91.4%', isPositive: true, label: 'Realized' }}
          actionLabel="Bursar Ledger"
          onAction={() => showToast('Opening Financial Ledger', 'info')}
        />
        <StatCard
          title="Pending Approvals"
          value={String(approvals.filter((a) => a.status === 'Pending').length)}
          subtext="No-Due TC, Stores PO, Hostel Outpass"
          icon={AlertTriangle}
          status="warning"
          trend={{ value: '4 Tasks', isPositive: false, label: 'Action required' }}
          actionLabel="Open Inbox"
          onAction={() => showToast('Navigating to Approvals Inbox', 'info')}
        />
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Attendance & Bus Punctuality Trends */}
        <div className="lg:col-span-7 bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Weekly Attendance & Fleet Punctuality Trend
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Cross-verified against automated RFID turnstiles and GPS stop geofences
              </p>
            </div>
            <ExportButton filename="attendance_telematics_trend" data={attendanceData} />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="attColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#635BFF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#635BFF" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="busColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16B8A6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#16B8A6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis domain={[85, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="attendance" name="Gate Attendance %" stroke="#635BFF" strokeWidth={2} fillOpacity={1} fill="url(#attColor)" />
                <Area type="monotone" dataKey="busPunctual" name="Bus Punctuality %" stroke="#16B8A6" strokeWidth={2} fillOpacity={1} fill="url(#busColor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fee Collection Pace */}
        <div className="lg:col-span-5 bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Quarterly Fee Realization (%)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Target vs Collected across Academic & Transport Heads
              </p>
            </div>
            <Badge variant="emerald" dot>91% Target</Badge>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feeCollectionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[60, 105]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="collected" name="Realized %" fill="#635BFF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" name="Target %" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ACTIONABLE EXCEPTIONS SECTION (What needs immediate attention) */}
      <div className="bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Prioritized Operational Exceptions (Requires Attention)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Filtered in real time from RFID gate turnstiles, telemetry, and central stores
            </p>
          </div>
          <Link
            to="/app/approvals"
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Open Approvals Matrix &rarr;
          </Link>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {exceptions.map((exc) => (
            <div
              key={exc.id}
              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold mt-0.5 shrink-0 ${
                    exc.severity === 'Critical'
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                  }`}
                >
                  {exc.severity}
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{exc.title}</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                    {exc.detail}
                  </p>
                </div>
              </div>

              <Link
                to={exc.actionPath}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-slate-700 dark:text-slate-200 shrink-0 self-start sm:self-auto flex items-center gap-1"
              >
                <span>Investigate</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* WORKFLOW MODALS */}
      <RFIDAttendanceSimulatorModal
        isOpen={rfidModalOpen}
        onClose={() => setRfidModalOpen(false)}
      />
      <PurchaseRequestModal
        isOpen={prModalOpen}
        onClose={() => setPrModalOpen(false)}
        defaultItemCode="STN-EXAM-A4"
      />
      <CircularComposerModal
        isOpen={circularModalOpen}
        onClose={() => setCircularModalOpen(false)}
      />
    </div>
  )
}
