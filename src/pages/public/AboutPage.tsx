import React from 'react'
import { Link } from 'react-router-dom'
import { PublicNavbar } from '../../components/layout/PublicNavbar'
import { PublicFooter } from '../../components/layout/PublicFooter'
import { GraduationCap, Award, Compass, Shield, Zap, ArrowRight } from 'lucide-react'

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B1120] text-slate-800 dark:text-slate-100 flex flex-col font-sans">
      <PublicNavbar />

      <section className="py-16 sm:py-24 border-b border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-[#0D1527]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Our Architectural Vision
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#101A33] dark:text-white mt-2 tracking-tight">
            Transforming Indian Campus Governance
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Smart AI Campus was conceived around a fundamental realization: campus administrators don’t need more complex software—they need clarity that reduces administrative drudgery and empowers faster decisions.
          </p>
        </div>
      </section>

      <section className="py-16 flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Card 1: 80/20 Philosophy */}
          <div className="p-8 rounded-2xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              The 80% Customer Benefit / 20% Feature Philosophy
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Most institutional ERPs become shelfware because they build hundreds of unused features while neglecting daily pain points. SAC focuses 80% of its engineering effort on the highest-impact moments:
            </p>
            <ul className="list-disc pl-5 text-xs text-slate-600 dark:text-slate-300 space-y-2">
              <li>Morning gate arrival and instant parent notification for unexplained absence.</li>
              <li>Real-time bus speed and location telematics to eliminate anxious parental calls.</li>
              <li>Statutory Transfer Certificate clearance without running between 6 departmental offices.</li>
              <li>Inventory smart purchase alarms that prevent critical stockouts during examination weeks.</li>
            </ul>
          </div>

          {/* Card 2: 5-Second Traffic Management Metaphor */}
          <div className="p-8 rounded-2xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              The Five-Second Read Metaphor
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Just like an air traffic controller or city traffic management console, a principal or correspondent should not need to query databases. Within five seconds of opening the dashboard, green, yellow, and red status lights communicate the health of student attendance, fleet operations, campus fees, and urgent approval requests.
            </p>
          </div>

          <div className="text-center pt-6">
            <Link
              to="/app/executive"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md"
            >
              <span>Explore the Working Prototype</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
