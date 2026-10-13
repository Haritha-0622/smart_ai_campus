import React from 'react'
import { Link } from 'react-router-dom'
import { PublicNavbar } from '../../components/layout/PublicNavbar'
import { PublicFooter } from '../../components/layout/PublicFooter'
import { GraduationCap, Award, BookOpen, Layers, CheckCircle, ArrowRight } from 'lucide-react'

export const CollegesSolutionPage: React.FC = () => {
  const collegeFeatures = [
    {
      title: 'NAAC & NBA Accreditation Evidence Checklist',
      desc: 'One-click compliance exports for Criterion 1 through 7, student-faculty ratios, research publications, and campus utilization logs.'
    },
    {
      title: 'Department Autonomy & Lab Tracking',
      desc: 'Department-specific course credit catalogs, laboratory equipment maintenance, STEM sensors inventory, and consumable BOM tracking.'
    },
    {
      title: 'Semester Credit & Elective Management',
      desc: 'Flexible choice-based credit system (CBCS), internal marks weightages, practical evaluation, and automated hall ticket eligibility.'
    },
    {
      title: 'Research & Project Studios (LMS)',
      desc: 'Digital project submissions, peer reviews, literature projects (e.g. classical Thirukkural studies), and dissertation archive.'
    },
    {
      title: 'Campus Hostels & Gate Pass Verification',
      desc: 'Biometric and RFID turnstiles at campus boundaries, late-entry logs, visitor photo logging, and digital warden authorization.'
    },
    {
      title: 'Statutory No-Due Clearance Matrix',
      desc: 'Digital cross-verification across Central Library, Bursar, Hostel, Sports Complex, and smart card surrender before degree convocation.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B1120] text-slate-800 dark:text-slate-100 flex flex-col font-sans">
      <PublicNavbar />

      <section className="py-16 sm:py-24 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
              Higher Education & University Architecture
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#101A33] dark:text-white mt-4 tracking-tight">
              Driving Autonomous Colleges & Technical Universities Forward
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Designed for universities, engineering colleges, and autonomous institutes. Supporting semester credit systems, NAAC A++ evidence gathering, research labs, and multi-department governance.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                to="/app/institution-setup"
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md"
              >
                Switch to College Mode (Apex Institute) &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 bg-white dark:bg-[#0D1527]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
            Specialized Higher Education Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collegeFeatures.map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-[#F7F9FC] dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs mb-3">
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
