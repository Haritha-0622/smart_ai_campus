import React from 'react'
import { Link } from 'react-router-dom'
import { PublicNavbar } from '../../components/layout/PublicNavbar'
import { PublicFooter } from '../../components/layout/PublicFooter'
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react'

export const PricingPage: React.FC = () => {
  const plans = [
    { name: 'Foundation', price: '₹2,999', period: '/month/campus', description: 'Perfect for small schools up to 800 students', features: ['Institution & Campus Setup', 'RFID Gate Attendance', 'Student & Staff Portals', 'Finance & Fee Management', 'Communication & Circulars', 'Mobile App Access', 'Email Support'] },
    { name: 'Campus Pro', price: '₹7,499', period: '/month/campus', description: 'Full suite for growing schools & colleges up to 3000 students', features: ['Everything in Foundation', 'Transport GPS Telematics', 'Hostel & Outpass Management', 'Library Management', 'Examination Management', 'AI Copilot Assistant', 'Advanced Analytics', 'Priority Support', 'API Access'], highlighted: true },
    { name: 'Enterprise', price: 'Custom', period: 'pricing', description: 'Multi-campus universities & education groups', features: ['Everything in Campus Pro', 'Unlimited Campuses', 'Custom Integrations', 'White-label Options', 'SaaS Admin Console', 'Dedicated Success Manager', 'SLA Guarantee', 'On-premise Option'] }
  ]

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B1120] flex flex-col font-sans">
      <PublicNavbar />
      <section className="py-16 border-b border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-[#0D1527]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-[#101A33] dark:text-white">Simple, Honest Pricing</h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400">No hidden fees. Cancel anytime. All plans include onboarding support and data migration assistance.</p>
        </div>
      </section>
      <section className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {plans.map((plan) => (
              <div key={plan.name} className={`rounded-2xl p-6 border flex flex-col ${plan.highlighted ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl shadow-indigo-600/30 scale-105' : 'bg-white dark:bg-[#131B2E] border-slate-200 dark:border-slate-800'}`}>
                <div className="mb-6">
                  {plan.highlighted && <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-2"><Sparkles className="w-3 h-3" /> Most Popular</div>}
                  <h2 className={`text-xl font-bold ${plan.highlighted ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{plan.name}</h2>
                  <div className="mt-2 flex items-end gap-1">
                    <span className={`text-3xl font-extrabold ${plan.highlighted ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{plan.price}</span>
                    <span className={`text-sm mb-1 ${plan.highlighted ? 'text-indigo-200' : 'text-slate-500'}`}>{plan.period}</span>
                  </div>
                  <p className={`text-xs mt-1 ${plan.highlighted ? 'text-indigo-200' : 'text-slate-500 dark:text-slate-400'}`}>{plan.description}</p>
                </div>
                <ul className="space-y-2 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.highlighted ? 'text-teal-300' : 'text-teal-500'}`} />
                      <span className={plan.highlighted ? 'text-white' : 'text-slate-700 dark:text-slate-300'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/request-demo" className={`mt-6 w-full py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${plan.highlighted ? 'bg-white text-indigo-600 hover:bg-indigo-50' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}>
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <PublicFooter />
    </div>
  )
}
