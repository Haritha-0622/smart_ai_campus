import React from 'react'
import { Link } from 'react-router-dom'
import { PublicNavbar } from '../../components/layout/PublicNavbar'
import { PublicFooter } from '../../components/layout/PublicFooter'
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Users, Radio, Clock, Eye } from 'lucide-react'

export const LandingPage: React.FC = () => {
  const benefits = [
    { icon: Clock, tagline: 'Traffic-Management Clarity', title: '5-Second Executive Read', description: 'Stop wading through hundred-page spreadsheets. Get immediate green/yellow/red indicators for campus attendance, fee collections, route delays, and urgent approvals.' },
    { icon: Radio, tagline: 'Zero Manual Registers', title: 'Automated RFID & Identity', description: 'Mifare 1K smart credentials track gate attendance, school bus boarding, cafeteria purchases, and library issues with millisecond accuracy.' },
    { icon: Users, tagline: 'Real-time Peace of Mind', title: 'Complete Parent Intimacy', description: 'Live bus telematics with delay notifications, instant attendance timestamps, one-click hostel outpass authorizations, and cashless canteen spending controls.' },
    { icon: Sparkles, tagline: 'Proactive Exception Detection', title: 'Contextual AI Intelligence', description: 'AI that spots anomalies before they become crises: timetable teacher conflicts, inventory stock-out alarms, and student academic performance drifts.' }
  ]

  const modules = [
    '01. Institution & Campus Setup', '02. Identity & ID Card Lifecycle', '03. RFID Gate & Bus Attendance',
    '04. Student 360° Dashboard', '05. Teacher & Faculty Portal', '06. Staff Operations Dashboard',
    '07. Academic Timetabling', '08. Transport Fleet & GPS', '09. LMS & Thirukkural Project',
    '10. Gadget & Asset Tracking', '11. Communication & Circulars', '12. Examination Management',
    '13. Finance & Fee Collections', '14. Inventory & Procurement', '15. Smart Canteen & Wallet',
    '16. Hostel & Outpass', '17. Library Commons', '18. Executive Analytics',
    '19. Institutional HR', '20. Approvals & No-Due', '21. Notifications Hub',
    '22. AI Copilot Assistant', '23. Reports & Exports', '24. Security & Audit',
    '25. API Integrations', '26. SaaS Admin Console'
  ]

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B1120] text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <PublicNavbar />

      {/* HERO */}
      <section className="relative overflow-hidden pt-16 pb-24 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
            <span>Next-Gen Enterprise Campus OS · 80% Customer Benefit Focus</span>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#101A33] dark:text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
            One Intelligent Campus. <br />
            <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-500 bg-clip-text text-transparent">Every Possibility.</span>
          </h1>
          <p className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The unified digital operating system connecting school and college management, principals, teachers, students, parents, and campus logistics with five-second executive clarity.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/app/executive" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" /> Launch Live Demo <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/request-demo" className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-base hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              Request Personalized Demo
            </Link>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 flex-wrap">
            {['SOC 2 Certified', 'ISO 27001', 'DPDP Compliant', '99.97% Uptime SLA'].map((badge) => (
              <div key={badge} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Why Smart AI Campus</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101A33] dark:text-white mt-2">Designed Around the 80/20 Rule</h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-xl mx-auto">80% of campus management value comes from 20% of truly critical workflows. We built exactly that.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="p-6 rounded-2xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center mb-4">
                  <b.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-1">{b.tagline}</p>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{b.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALL MODULES */}
      <section className="py-16 bg-white dark:bg-[#0D1527] border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Complete Module Suite</span>
            <h2 className="text-3xl font-extrabold text-[#101A33] dark:text-white mt-2">26 Integrated Modules</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {modules.map((m) => (
              <div key={m} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{m}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/app/executive" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-600/25 transition-all">
              <Eye className="w-4 h-4" /> Explore All Modules Live
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
