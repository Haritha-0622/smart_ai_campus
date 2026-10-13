import React from 'react'
import { Link } from 'react-router-dom'
import { PublicNavbar } from '../../components/layout/PublicNavbar'
import { PublicFooter } from '../../components/layout/PublicFooter'
import { Check, Info, ArrowRight, ShieldCheck } from 'lucide-react'

export const PricingPage: React.FC = () => {
  const plans = [
    {
      name: 'Campus Starter',
      badge: 'Single Campus',
      tagline: 'Ideal for single-campus schools needing identity, RFID attendance, and fee tracking.',
      features: [
        'Up to 1,500 active students',
        'RFID attendance & gate reader integration',
        'Student & Teacher basic portals',
        'Fee collection & receipt generator',
        'Circular broadcasting with read receipts',
        'Standard email & portal support'
      ],
      cta: 'Explore Starter Modules',
      popular: false
    },
    {
      name: 'Campus Growth (Recommended)',
      badge: 'Multi-Campus',
      tagline: 'Comprehensive operating system for growing schools and colleges with buses and hostels.',
      features: [
        'Up to 5,000 active students',
        'All 26 modular campus capabilities',
        'GPS live bus fleet & parent telematics',
        'Cashless canteen wallet & ID balance',
        'Residential hostel & digital outpass workflow',
        'Statutory No-Due & TC clearance engine',
        'Smart Purchase Alarms for central stores'
      ],
      cta: 'Launch Growth Workspace',
      popular: true
    },
    {
      name: 'Enterprise AI Suite',
      badge: 'University & Group',
      tagline: 'Full autonomous capability for large multi-institution trusts and technical universities.',
      features: [
        'Unlimited students & multiple campus tenants',
        'Context-aware SAC Copilot & AI anomaly engine',
        'NAAC A++ accreditation evidence checklists',
        'Dedicated SLA & custom ERP / Tally connectors',
        'Advanced audit retention & maker-checker controls',
        'On-premise or sovereign private cloud deployment'
      ],
      cta: 'Contact Enterprise Sales',
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B1120] text-slate-800 dark:text-slate-100 flex flex-col font-sans">
      <PublicNavbar />

      <section className="py-16 sm:py-20 border-b border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-[#0D1527]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Illustrative Pricing Structure
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#101A33] dark:text-white mt-2">
            Predictable Plans for Modern Institutions
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Structured around transparent per-student tiers with no hidden hardware lock-in.
          </p>

          <div className="mt-6 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-center gap-2 max-w-xl mx-auto">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Disclaimer: Illustrative tiering demonstration. Actual quotes depend on enrollment volume and hardware integrations.
            </span>
          </div>
        </div>
      </section>

      <section className="py-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((p, idx) => (
              <div
                key={idx}
                className={`relative p-8 rounded-2xl bg-white dark:bg-[#131B2E] border flex flex-col justify-between shadow-xs transition-all ${
                  p.popular
                    ? 'border-indigo-500 ring-2 ring-indigo-500/20 dark:ring-indigo-500/40 shadow-xl'
                    : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 text-white font-bold text-[11px] uppercase tracking-wider shadow-sm">
                    Most Popular Choice
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{p.name}</h3>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {p.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[36px]">{p.tagline}</p>

                  <div className="my-6 py-4 border-y border-slate-100 dark:border-slate-800">
                    <p className="text-2xl font-extrabold text-slate-900 dark:text-white">Custom Campus Quote</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Billed annually per enrolled student</p>
                  </div>

                  <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                    {p.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <Link
                    to="/app/executive"
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors ${
                      p.popular
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-white'
                    }`}
                  >
                    <span>{p.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
