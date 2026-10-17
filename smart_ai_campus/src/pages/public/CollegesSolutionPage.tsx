import React from 'react'
import { Link } from 'react-router-dom'
import { PublicNavbar } from '../../components/layout/PublicNavbar'
import { PublicFooter } from '../../components/layout/PublicFooter'
import { GraduationCap, BarChart3, Users, BookOpen, Cpu, ArrowRight } from 'lucide-react'

export const CollegesSolutionPage: React.FC = () => {
  const features = [
    { icon: GraduationCap, title: 'Student 360° Dashboard', description: 'Comprehensive academic progress, attendance analytics, fee status, library usage, and co-curricular participation in one view.' },
    { icon: BarChart3, title: 'Executive Analytics', description: 'Department-wise performance trends, NAAC compliance reports, placement statistics, and research output dashboards.' },
    { icon: Users, title: 'Faculty & HR Management', description: 'Staff load management, research project tracking, payroll integration, biometric attendance, and appraisal workflows.' },
    { icon: BookOpen, title: 'Digital Knowledge Commons', description: 'Library catalogue management, digital resource access, inter-library lending, and Thirukkural LMS integration.' },
    { icon: Cpu, title: 'API & ERP Integration', description: 'Connect SAC with your existing ERP, payment gateways, SMS providers, and government reporting portals via REST API.' },
  ]

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B1120] flex flex-col font-sans">
      <PublicNavbar />
      <section className="py-20 border-b border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-[#0D1527]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#101A33] dark:text-white tracking-tight">SAC for Colleges</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">From autonomous engineering colleges to multi-campus universities — SAC scales to handle your NAAC, NBA, and UGC compliance needs.</p>
          <Link to="/app/executive" className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-lg">
            See College Demo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      <section className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="p-6 rounded-2xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center mb-4"><f.icon className="w-5 h-5 text-teal-600 dark:text-teal-400" /></div>
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
