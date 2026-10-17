import React from 'react'
import { Link } from 'react-router-dom'
import { PublicNavbar } from '../../components/layout/PublicNavbar'
import { PublicFooter } from '../../components/layout/PublicFooter'
import { Radio, Bus, Home, BookOpen, DollarSign, ArrowRight } from 'lucide-react'

export const SchoolsSolutionPage: React.FC = () => {
  const features = [
    { icon: Radio, title: 'RFID Gate & Bus Attendance', description: 'Automated entry/exit logging, bus boarding timestamps, and instant parent SMS notifications — zero manual registers.' },
    { icon: Bus, title: 'Transport GPS Telematics', description: 'Real-time bus location tracking, route delay alerts, speed monitoring, and parent-facing live ETA for every bus stop.' },
    { icon: Home, title: 'Hostel & Outpass Management', description: 'Digital outpass requests, warden approval workflow, curfew tracking, and emergency parent escalation protocols.' },
    { icon: BookOpen, title: 'Academic & Examination Suite', description: 'Timetable scheduling, teacher substitution, mark entry, invigilation assignment, and automated progress reports.' },
    { icon: DollarSign, title: 'Finance & Cashless Campus', description: 'Fee collection, payment tracking, canteen wallet top-ups, and comprehensive budget management with audit trails.' },
  ]

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B1120] flex flex-col font-sans">
      <PublicNavbar />
      <section className="py-20 border-b border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-[#0D1527]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#101A33] dark:text-white tracking-tight">SAC for Schools</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">From nursery to Grade 12, SAC manages every operational touchpoint — from morning gate RFID to evening hostel muster roll.</p>
          <Link to="/app/executive" className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg">
            See Live School Demo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      <section className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="p-6 rounded-2xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center mb-4"><f.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /></div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{f.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>
      <PublicFooter />
    </div>
  )
}
