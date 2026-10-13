import React from 'react'
import { Link } from 'react-router-dom'
import { PublicNavbar } from '../../components/layout/PublicNavbar'
import { PublicFooter } from '../../components/layout/PublicFooter'
import { School, CheckCircle, Bus, Radio, Coffee, Users, ArrowRight, ShieldCheck } from 'lucide-react'

export const SchoolsSolutionPage: React.FC = () => {
  const schoolFeatures = [
    {
      title: 'CBSE & ICSE Academic Compliance',
      desc: 'Automatic report card generation adhering to CCE standards, term exam grading formulas, and syllabus track logs.'
    },
    {
      title: 'Automated School Bus Boarding',
      desc: 'RFID tap at bus door gives parents instantaneous alerts: "Rohan boarded Bus 04 at Hauz Khas Metro, 08:08 AM".'
    },
    {
      title: 'Healthy Canteen Wallet Limits',
      desc: 'Parents set daily spending caps (e.g. ₹100/day) and review nutritional meal logs via their mobile parent portal.'
    },
    {
      title: 'Instant Parent-Teacher Circulars',
      desc: 'Publish emergency weather closures, field trip consent forms, and homework updates with real-time read receipts.'
    },
    {
      title: 'Hostel & Residential Care',
      desc: 'Weekend gate outpass workflows requiring explicit digital SMS verification from parents before security release.'
    },
    {
      title: 'Statutory Transfer Certificate (TC)',
      desc: 'Multi-office clearance checks across library books, sports room, cafeteria, and fee balance before TC seal.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B1120] text-slate-800 dark:text-slate-100 flex flex-col font-sans">
      <PublicNavbar />

      <section className="py-16 sm:py-24 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-bold border border-teal-200 dark:border-teal-800">
              K-12 Education Architecture
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#101A33] dark:text-white mt-4 tracking-tight">
              Empowering Schools with Child Safety, Parental Trust & Effortless Administration
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Engineered specifically for schools following CBSE, ICSE, and State Boards. Connecting morning bus pickups, classroom attendance, cafeteria safety, and parent communication into a seamless experience.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                to="/app/institution-setup"
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md"
              >
                Explore School Mode Workspace &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 bg-white dark:bg-[#0D1527]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
            Specialized School Operational Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schoolFeatures.map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-[#F7F9FC] dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-xs mb-3">
                  0{i + 1}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
