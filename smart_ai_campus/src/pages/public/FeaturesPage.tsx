import React from 'react'
import { Link } from 'react-router-dom'
import { PublicNavbar } from '../../components/layout/PublicNavbar'
import { PublicFooter } from '../../components/layout/PublicFooter'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export const FeaturesPage: React.FC = () => {
  const moduleGroups = [
    { group: 'Executive & Core', modules: ['01. Institution & Campus Configuration', '02. Identity Management & ID Cards', '03. RFID Gate & Bus Attendance Terminal'] },
    { group: 'Portals & Personas', modules: ['04. Student 360° Dashboard', '05. Teacher & Faculty Portal', '06. Staff Operations Dashboard'] },
    { group: 'Academic & Learning', modules: ['07. Academic Timetabling & Syllabus', '08. Transport Fleet & GPS Telematics', '09. LMS & Thirukkural Digital Library', '10. Gadget & Asset Tracking', '11. Communication & Circulars Hub', '12. Examination Management & Invigilation'] },
    { group: 'Operations & Campus', modules: ['13. Finance & Fee Collections', '14. Inventory & Smart Procurement', '15. Cashless Canteen & Wallet', '16. Hostel & Outpass Management', '17. Library Commons & Tracker'] },
    { group: 'Intelligence & Admin', modules: ['18. Executive Analytics & Reports', '19. Institutional HR', '20. Approvals & No-Due Workflow', '21. Notifications & Alerts Engine', '22. AI Copilot Assistant', '23. Reports & Data Exports', '24. Security & Audit Logs', '25. API Integrations Center', '26. SaaS Admin Console'] }
  ]

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B1120] flex flex-col font-sans">
      <PublicNavbar />
      <section className="py-16 border-b border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-[#0D1527]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-[#101A33] dark:text-white">26 Integrated Campus Modules</h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400">Every module is deeply integrated, sharing a unified data layer for real-time intelligence across the entire campus ecosystem.</p>
        </div>
      </section>
      <section className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {moduleGroups.map((grp) => (
            <div key={grp.group}>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">{grp.group}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {grp.modules.map((m) => (
                  <div key={m} className="flex items-center gap-2 p-3 rounded-xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="text-center pt-4">
            <Link to="/app/executive" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg transition-all">
              Explore All Modules Live <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      <PublicFooter />
    </div>
  )
}
