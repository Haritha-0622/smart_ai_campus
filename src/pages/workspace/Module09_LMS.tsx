import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { Library, BookOpen, CheckCircle, FileText, Sparkles, Award, ArrowRight } from 'lucide-react'

export const Module09_LMS: React.FC = () => {
  const { showToast } = useApp()
  const [activeTab, setActiveTab] = useState<'thirukkural' | 'physics' | 'submissions'>('thirukkural')

  const thirukkuralSubmissions = [
    {
      student: 'Rohan S. Krishna (SAC-2025-0842)',
      title: 'Ethical Leadership & Governance in Modern Organizations Through Thirukkural',
      submittedOn: '11-Oct-2026',
      score: '96 / 100',
      status: 'Evaluated & Approved',
      feedback: 'Exceptional depth correlating Kural 391 with corporate decision-making ethics.'
    },
    {
      student: 'Ananya Varma (SAC-2025-0843)',
      title: 'Environmental Ecology and Agricultural Wisdom in Porutpaal',
      submittedOn: '09-Oct-2026',
      score: '98 / 100',
      status: 'Evaluated & Approved',
      feedback: 'Outstanding comparative literature analysis with United Nations SDG goals.'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              09. Learning Management & Cultural Project Studio
            </h1>
            <Badge variant="indigo">Module 09</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Digital coursework, project repositories, rubric assessments, and the benchmark Classical Thirukkural Project.
          </p>
        </div>

        <button
          onClick={() => showToast('Opening Project Rubric Submission Portal', 'info')}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
        >
          Submit New Project Dossier
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('thirukkural')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'thirukkural'
              ? 'bg-indigo-600 text-white font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          📜 Thirukkural Cultural Project
        </button>
        <button
          onClick={() => setActiveTab('physics')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'physics'
              ? 'bg-indigo-600 text-white font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          🔬 STEM Physics Lab Modules
        </button>
        <button
          onClick={() => setActiveTab('submissions')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'submissions'
              ? 'bg-indigo-600 text-white font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          📝 Peer Evaluation Queue
        </button>
      </div>

      {activeTab === 'thirukkural' && (
        <div className="space-y-6">
          {/* Featured Project Showcase */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200 dark:border-amber-900/50 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                Benchmark Institutional Humanities Initiative
              </span>
              <Badge variant="amber">Batch 2026 Mandate</Badge>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Project Thirukkural: Ethics, Governance & Universal Literature
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
              An interdisciplinary research project integrating classical Tamil moral philosophy with contemporary civic duty, ethics, environmental preservation, and leadership. Students analyze curated couplets and publish multimedia analyses.
            </p>

            {/* Featured Couplet Box */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#131B2E] border border-amber-200/80 dark:border-slate-800 shadow-xs space-y-2">
              <p className="text-sm font-bold text-slate-900 dark:text-white font-serif">
                "கற்க கசடறக் கற்பவை கற்றபின் <br /> நிற்க அதற்குத் தக." (குறள் 391)
              </p>
              <p className="text-xs italic text-slate-600 dark:text-slate-300">
                "Learn thoroughly what is worth learning; and having learned, let your conduct strictly conform to your learning."
              </p>
              <p className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400">
                Assigned Subject: Education & Right Living (கல்வி அதிகாரம்)
              </p>
            </div>
          </div>

          {/* Student Submissions Table */}
          <div className="bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Approved Student Submissions & Peer Reviews
            </h4>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {thirukkuralSubmissions.map((sub, i) => (
                <div key={i} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white text-xs">{sub.title}</h5>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      Author: {sub.student} &bull; Submitted: {sub.submittedOn}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-1 italic">
                      Teacher Remark: "{sub.feedback}"
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-extrabold text-emerald-600 text-sm block">{sub.score}</span>
                    <Badge variant="emerald">{sub.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab !== 'thirukkural' && (
        <div className="p-8 bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-3">
          <BookOpen className="w-8 h-8 text-indigo-600 mx-auto" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Coursework Archive</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            18 digital physics simulation modules and 42 peer review rubrics active for the science department.
          </p>
        </div>
      )}
    </div>
  )
}
