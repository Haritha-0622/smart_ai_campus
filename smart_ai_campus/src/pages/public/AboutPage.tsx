import React from 'react'
import { Link } from 'react-router-dom'
import { PublicNavbar } from '../../components/layout/PublicNavbar'
import { PublicFooter } from '../../components/layout/PublicFooter'
import { Zap, Compass, Shield, Award, ArrowRight } from 'lucide-react'

export const AboutPage: React.FC = () => {
  const pillars = [
    { icon: Zap, title: '80/20 Philosophy', description: 'We identified the 20% of campus workflows that deliver 80% of administrative value. Every feature earned its place by solving a real, daily pain point for campus managers.' },
    { icon: Compass, title: 'Five-Second Executive Clarity', description: 'Principals and correspondents should understand campus health in 5 seconds — not after 30 minutes of report mining. Our traffic-light dashboard is the core design principle.' },
    { icon: Shield, title: 'Enterprise-Grade Security', description: 'Multi-tenant data isolation, SOC 2 Type II certification, end-to-end encryption, and DPDP compliance are built-in — not bolt-on. Your institutional data is sacrosanct.' },
    { icon: Award, title: 'Indian Education Context', description: 'Built for CBSE, ICSE, State Board schools and UGC/AICTE-affiliated colleges. We understand RFID gate management, hostel outpass culture, and term-end examination workflows.' }
  ]

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B1120] flex flex-col font-sans">
      <PublicNavbar />
      <section className="py-16 sm:py-24 border-b border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-[#0D1527]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-[#101A33] dark:text-white tracking-tight">Transforming Indian Campus Governance</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 leading-relaxed">Smart AI Campus was conceived around a fundamental realization: campus administrators don't need more complex software — they need clarity that reduces administrative drudgery and empowers faster decisions.</p>
        </div>
      </section>
      <section className="py-16 flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="p-8 rounded-2xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{p.title}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/request-demo" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg transition-all">
              Schedule a Product Walkthrough <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      <PublicFooter />
    </div>
  )
}
