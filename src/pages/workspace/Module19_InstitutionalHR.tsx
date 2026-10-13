import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { UserPlus, Sparkles, CheckCircle, Clock, ShieldCheck, Briefcase } from 'lucide-react'

export const Module19_InstitutionalHR: React.FC = () => {
  const { showToast } = useApp()

  const [candidates, setCandidates] = useState([
    { id: 'CND-01', name: 'Dr. Vasudevan Pillai', role: 'PGT Senior Physics / STEM Lead', qualification: 'Ph.D Physics (IIT Madras), B.Ed', exp: '12 Yrs', aiFitScore: '94% Match', stage: 'Interview Prioritized' },
    { id: 'CND-02', name: 'Kavitha Jayaraman', role: 'Mathematics Faculty & Olympiad Coach', qualification: 'M.Sc Mathematics, NET', exp: '8 Yrs', aiFitScore: '88% Match', stage: 'Technical Screening' },
    { id: 'CND-03', name: 'Arunmozhi Varman', role: 'AI & Robotics Lab Coordinator', qualification: 'M.Tech Embedded Systems', exp: '5 Yrs', aiFitScore: '92% Match', stage: 'Final Management Review' }
  ])

  const handleAdvanceStage = (name: string) => {
    showToast(`Interview invitation dispatched to ${name}`, 'success')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              19. Institutional HR & Faculty Recruitment
            </h1>
            <Badge variant="indigo">Module 19</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Faculty talent pipeline, interview prioritization, induction tracking, and human-in-the-loop candidate evaluation.
          </p>
        </div>

        <button
          onClick={() => showToast('Opening Vacant Post Requisition Form', 'info')}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
        >
          Post New Faculty Vacancy
        </button>
      </div>

      {/* AI HR Guardrail Banner */}
      <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex items-start gap-3 text-xs">
        <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-slate-700 dark:text-slate-200">
          <strong>Human-in-the-Loop Advisory Guardrail: </strong>
          AI candidate scoring is strictly advisory based on syllabus keywords and pedagogical credentials. All shortlisting, interview selections, and hiring authorizations are governed by institutional HR officers.
        </div>
      </div>

      {/* Candidate Pipeline Table */}
      <div className="bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-xs">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
          Active Recruitment Pipeline & Interview Prioritization
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {candidates.map((c) => (
            <div key={c.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">{c.name}</span>
                  <Badge variant="indigo">{c.role}</Badge>
                </div>
                <p className="text-slate-500 mt-0.5">
                  Qualifications: {c.qualification} &bull; Experience: <strong>{c.exp}</strong>
                </p>
                <p className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold mt-0.5">
                  Pedagogical Match: {c.aiFitScore} &bull; Current Stage: {c.stage}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAdvanceStage(c.name)}
                  className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer text-xs"
                >
                  Schedule Interview &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
