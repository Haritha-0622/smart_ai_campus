import React from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, ShieldCheck } from 'lucide-react'

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-xs">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-slate-900 dark:text-white text-lg font-bold">Smart AI Campus</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Enterprise-grade multi-tenant digital operating system for forward-thinking schools and colleges. Delivering 80% customer benefit through actionable five-second executive intelligence.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[11px] font-semibold">SOC 2 Type II · ISO 27001 · DPDP Compliant</span>
            </div>
          </div>
          <div className="space-y-3">
            <p className="font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider text-[11px]">Solutions</p>
            {[['For Schools', '/solutions/schools'], ['For Colleges', '/solutions/colleges'], ['All Modules', '/features'], ['Pricing Plans', '/pricing']].map(([label, path]) => (
              <Link key={path} to={path} className="block hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{label}</Link>
            ))}
          </div>
          <div className="space-y-3">
            <p className="font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider text-[11px]">Company</p>
            {[['About Product', '/about'], ['Request Demo', '/request-demo'], ['Login to Campus', '/login']].map(([label, path]) => (
              <Link key={path} to={path} className="block hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{label}</Link>
            ))}
          </div>
          <div className="space-y-3">
            <p className="font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider text-[11px]">Modules</p>
            {['RFID & Attendance', 'Finance & Fees', 'Transport GPS', 'Hostel Management', 'Library & LMS', 'AI Copilot'].map((m) => (
              <span key={m} className="block text-slate-400">{m}</span>
            ))}
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-400">© 2025 Smart AI Campus Pvt. Ltd. All rights reserved. Reg. No. U72200DL2024PTC000000</p>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((t) => (
              <span key={t} className="hover:text-indigo-600 cursor-pointer">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
