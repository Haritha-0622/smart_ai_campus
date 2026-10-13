import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PublicNavbar } from '../../components/layout/PublicNavbar'
import { PublicFooter } from '../../components/layout/PublicFooter'
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Users,
  Radio,
  Clock,
  Layers,
  Award,
  ChevronRight,
  Cpu,
  BarChart2,
  Building2,
  Eye,
  GraduationCap
} from 'lucide-react'

export const LandingPage: React.FC = () => {
  const [activePreviewTab, setActivePreviewTab] = useState<'executive' | 'student' | 'transport'>('executive')

  const benefits = [
    {
      icon: Clock,
      title: '5-Second Executive Read',
      tagline: 'Traffic-Management Clarity',
      description:
        'Stop wading through hundred-page spreadsheets. Get immediate green/yellow/red indicators for campus attendance, fee collections, route delays, and urgent staff approvals.'
    },
    {
      icon: Radio,
      title: 'Automated RFID & Identity',
      tagline: 'Zero Manual Registers',
      description:
        'Mifare 1K smart credentials track gate attendance, school bus boarding, cafeteria purchases, and library issues with millisecond accuracy and zero paper friction.'
    },
    {
      icon: Users,
      title: 'Complete Parent Intimacy',
      tagline: 'Real-time Peace of Mind',
      description:
        'Live bus telematics with delay notifications, instant attendance timestamps, one-click hostel outpass authorizations, and cashless canteen spending controls.'
    },
    {
      icon: Sparkles,
      title: 'Contextual AI Intelligence',
      tagline: 'Proactive Exception Detection',
      description:
        'AI that spots anomalies before they become crises: timetable teacher conflicts, inventory stock-out alarms, and student academic performance drifts.'
    }
  ]

  const roleHighlights = [
    {
      role: 'Correspondent & Board',
      highlight: 'Multi-campus financial burn, admissions trends, and regulatory compliance audit trail at a single glance.'
    },
    {
      role: 'Principals & Heads',
      highlight: 'Teacher substitution suggestion, class syllabus pacing, and immediate morning attendance exceptions.'
    },
    {
      role: 'Teachers & Faculty',
      highlight: 'One-click marks entry, automated student feedback, exam invigilation schedules, and zero administrative drudgery.'
    },
    {
      role: 'Students & Parents',
      highlight: 'Transparent timetables, digital fee receipts, library book due reminders, and verified gatepass workflows.'
    },
    {
      role: 'Campus Operations',
      highlight: 'Hostel outpass verification, bus speed telemetry, smart purchase reorder alarms, and cashless dining wallets.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B1120] text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <PublicNavbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-slate-200/60 dark:border-slate-800/60">
        {/* Soft Background Accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-teal-500/10 dark:bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
            <span>Next-Gen Enterprise Campus OS &bull; 80% Customer Benefit Focus</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#101A33] dark:text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
            One Intelligent Campus. <br />
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-500 bg-clip-text text-transparent">
              Every Possibility.
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The unified digital operating system connecting school and college management, principals, teachers, students, parents, and campus logistics with five-second executive clarity.
          </p>

          {/* Primary CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/app/executive"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Live Platform</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/request-demo"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#131B2E] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-base transition-colors"
            >
              Request Institutional Demo
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Multi-Tenant (Schools & Colleges)
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 15 Interactive User Roles
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> RFID & GPS Real-Time Telematics
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Statutory No-Due & TC Workflow
            </span>
          </div>

          {/* INTERACTIVE DASHBOARD PREVIEW */}
          <div className="mt-14 max-w-5xl mx-auto bg-white dark:bg-[#101A33] rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden text-left">
            {/* Window bar */}
            <div className="px-5 py-3.5 bg-slate-100/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs font-semibold text-slate-500 dark:text-slate-400 font-mono">
                  Smart AI Campus &bull; Delhi Public Academy (CBSE)
                </span>
              </div>

              {/* Preview Tabs */}
              <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold">
                <button
                  onClick={() => setActivePreviewTab('executive')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activePreviewTab === 'executive'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600'
                  }`}
                >
                  Executive Health (5-Sec)
                </button>
                <button
                  onClick={() => setActivePreviewTab('student')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activePreviewTab === 'student'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600'
                  }`}
                >
                  Student 360° Profile
                </button>
                <button
                  onClick={() => setActivePreviewTab('transport')}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    activePreviewTab === 'transport'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600'
                  }`}
                >
                  Transport & Telematics
                </button>
              </div>
            </div>

            {/* Preview Content */}
            <div className="p-6 bg-slate-50/50 dark:bg-[#0B1120]/50">
              {activePreviewTab === 'executive' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-4 rounded-xl bg-white dark:bg-[#131B2E] border-l-4 border-l-emerald-500 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <p className="text-slate-500 dark:text-slate-400 uppercase font-bold text-[10px]">Today's Gate Arrival</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">96.2%</p>
                      <p className="text-emerald-600 font-semibold text-[11px] mt-1">✓ 2,732 / 2,840 On Campus</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-[#131B2E] border-l-4 border-l-emerald-500 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <p className="text-slate-500 dark:text-slate-400 uppercase font-bold text-[10px]">Term Fee Collection</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">₹3.84 Cr</p>
                      <p className="text-emerald-600 font-semibold text-[11px] mt-1">✓ 91.4% Target Achieved</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-[#131B2E] border-l-4 border-l-amber-500 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <p className="text-slate-500 dark:text-slate-400 uppercase font-bold text-[10px]">Smart Inventory Alarm</p>
                      <p className="text-2xl font-bold text-amber-600 mt-1">1 Critical</p>
                      <p className="text-amber-600 font-semibold text-[11px] mt-1">⚠️ Exam Answer Booklets</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white dark:bg-[#131B2E] border-l-4 border-l-indigo-500 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <p className="text-slate-500 dark:text-slate-400 uppercase font-bold text-[10px]">Pending Approvals</p>
                      <p className="text-2xl font-bold text-indigo-600 mt-1">4 Actions</p>
                      <p className="text-indigo-600 font-semibold text-[11px] mt-1">TC, PO, Outpass & Class</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between text-xs">
                    <span className="font-semibold text-indigo-900 dark:text-indigo-200">
                      ⚡ 5-Second Traffic Light Executive Status: <strong>STABLE & OPERATIONAL</strong> across all 4 gate readers and 3 bus lines.
                    </span>
                    <Link
                      to="/app/executive"
                      className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                    >
                      Open Live Dashboard &rarr;
                    </Link>
                  </div>
                </div>
              )}

              {activePreviewTab === 'student' && (
                <div className="p-4 bg-white dark:bg-[#131B2E] rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 font-bold flex items-center justify-center">
                        RK
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">Rohan S. Krishna</h4>
                        <p className="text-xs text-slate-500">SAC-2025-0842 &bull; Grade 11-A (Science) &bull; Kaveri Hostel Bed 2</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                      Active Hosteller
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <p className="text-slate-400 text-[10px] uppercase font-bold">Attendance Rate</p>
                      <p className="text-base font-bold text-slate-800 dark:text-white">94.2%</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <p className="text-slate-400 text-[10px] uppercase font-bold">Cashless Wallet</p>
                      <p className="text-base font-bold text-slate-800 dark:text-white">₹3,450</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                      <p className="text-slate-400 text-[10px] uppercase font-bold">Academic Standing</p>
                      <p className="text-base font-bold text-emerald-600">A1 (92.4%)</p>
                    </div>
                  </div>
                </div>
              )}

              {activePreviewTab === 'transport' && (
                <div className="p-4 bg-white dark:bg-[#131B2E] rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="font-bold text-xs text-slate-900 dark:text-white">Bus 04 (South Green Line) - Live GPS</span>
                    </div>
                    <span className="text-xs font-mono text-slate-500">Speed: 28 km/h &bull; Fuel: 78%</span>
                  </div>
                  <div className="p-3 bg-slate-100 dark:bg-slate-900 rounded-lg text-xs font-mono text-slate-600 dark:text-slate-300">
                    Location: Hauz Khas Metro ↔ AIIMS &bull; 38/44 Students Onboarded via RFID &bull; Driver: Surinder Pal Singh (+91 98110 54321)
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 80/20 CUSTOMER BENEFIT SECTION */}
      <section className="py-20 bg-white dark:bg-[#0D1527] border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              The 80/20 Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101A33] dark:text-white mt-2">
              Built for Tangible Outcomes, Not Administrative Clutter
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mt-4 text-sm sm:text-base">
              Traditional school ERPs overwhelm staff with dozens of nested menus. Smart AI Campus focuses relentlessly on reducing operational friction and helping campus leaders make sound decisions in five seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon
              return (
                <div
                  key={i}
                  className="p-6 rounded-2xl bg-[#F7F9FC] dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                    {b.tagline}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2">
                    {b.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ROLE-BASED TAILORED WORKSPACES */}
      <section className="py-20 bg-[#F7F9FC] dark:bg-[#0B1120] border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Role-Specific Workspaces
            </span>
            <h2 className="text-3xl font-extrabold text-[#101A33] dark:text-white mt-2">
              Every Campus Stakeholder Gets Exactly What They Need
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roleHighlights.map((r, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 shadow-xs"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">{r.role}</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {r.highlight}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <span>Test All 15 Roles in the Interactive Demo Switcher</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 via-indigo-700 to-[#101A33] text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
            Enterprise-Grade Multi-Tenant Cloud Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to Experience the Smart AI Campus OS?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Launch the interactive prototype immediately. Explore all 26 operational modules, RFID simulation terminals, statutory TC clearances, and AI Copilot.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/app/executive"
              className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              <span>Launch Live Workspace Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/request-demo"
              className="px-7 py-3.5 rounded-xl border border-slate-600 hover:bg-slate-800 text-slate-200 font-semibold text-sm transition-colors"
            >
              Schedule Stakeholder Walkthrough
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
