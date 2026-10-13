import React from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, ShieldCheck } from 'lucide-react'

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Info */}
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              <span>Multi-Tenant RBAC &bull; AES-256 Simulated Encryption</span>
            </div>
          </div>

          {/* Solution Links */}
          <div className="space-y-3">
            <p className="text-slate-900 dark:text-white font-semibold uppercase tracking-wider text-[11px]">Solutions</p>
            <ul className="space-y-2">
              <li><Link to="/solutions/schools" className="hover:text-indigo-600 dark:hover:text-white transition-colors">K-12 Schools (CBSE / ICSE)</Link></li>
              <li><Link to="/solutions/colleges" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Higher Ed & Universities (NAAC)</Link></li>
              <li><Link to="/features" className="hover:text-indigo-600 dark:hover:text-white transition-colors">All 26 Platform Modules</Link></li>
              <li><Link to="/app/rfid-attendance" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Automated RFID Turnstiles</Link></li>
              <li><Link to="/app/transport" className="hover:text-indigo-600 dark:hover:text-white transition-colors">GPS Telematics & Safety</Link></li>
            </ul>
          </div>

          {/* Platform Workspaces */}
          <div className="space-y-3">
            <p className="text-slate-900 dark:text-white font-semibold uppercase tracking-wider text-[11px]">Demo Workspaces</p>
            <ul className="space-y-2">
              <li><Link to="/app/executive" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Executive 5-Sec Health</Link></li>
              <li><Link to="/app/student-portal" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Student 360° Portal</Link></li>
              <li><Link to="/app/teacher-portal" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Teacher & Marks Portal</Link></li>
              <li><Link to="/app/finance" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Fee & Budgeting Hub</Link></li>
              <li><Link to="/app/approvals" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Statutory No-Due Engine</Link></li>
            </ul>
          </div>

          {/* Architecture & Notice */}
          <div className="space-y-3">
            <p className="text-slate-900 dark:text-white font-semibold uppercase tracking-wider text-[11px]">Enterprise SaaS</p>
            <ul className="space-y-2">
              <li><Link to="/pricing" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Transparent Pricing</Link></li>
              <li><Link to="/about" className="hover:text-indigo-600 dark:hover:text-white transition-colors">80/20 Product Philosophy</Link></li>
              <li><Link to="/login" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Role Quick Switcher</Link></li>
              <li><Link to="/request-demo" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Schedule Consultation</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>&copy; {new Date().getFullYear()} Smart AI Campus (SAC) Architecture. All rights reserved.</p>
          <p className="text-slate-500">
            Interactive Prototype Environment &bull; Local State Simulation &bull; Designed for Indian K-12 & Higher Ed
          </p>
        </div>
      </div>
    </footer>
  )
}
