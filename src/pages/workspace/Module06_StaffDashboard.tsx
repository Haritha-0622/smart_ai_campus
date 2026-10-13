import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { ExportButton } from '../../components/common/ExportButton'
import { Briefcase, UserCheck, CheckCircle2, Shield, Award, Search } from 'lucide-react'

export const Module06_StaffDashboard: React.FC = () => {
  const { staffList, showToast } = useApp()
  const [search, setSearch] = useState('')

  const trainingModules = [
    { title: 'POCSO Act & Campus Child Protection Protocols', completed: 142, total: 168, status: 'Mandatory' },
    { title: 'Generative AI & Ethical Assessment Grading', completed: 110, total: 168, status: 'Optional' },
    { title: 'Chemical & Fire Safety In Science Laboratories', completed: 48, total: 52, status: 'Departmental' }
  ]

  const filtered = staffList.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase()) ||
      s.empNo.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              06. Staff Management & Onboarding Workspace
            </h1>
            <Badge variant="indigo">Module 06</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Faculty records, biometric credentials, induction sessions, document compliance, and upskilling.
          </p>
        </div>

        <ExportButton filename="campus_staff_roster" data={staffList} />
      </div>

      {/* Mandatory Training Compliance */}
      <div className="bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
          Institutional Faculty Upskilling & Compliance Progress
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trainingModules.map((tm, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <Badge variant={tm.status === 'Mandatory' ? 'rose' : 'teal'}>{tm.status}</Badge>
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {Math.round((tm.completed / tm.total) * 100)}% Complete
                </span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white">{tm.title}</h4>
              <p className="text-[11px] text-slate-500">
                {tm.completed} of {tm.total} staff certified
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Staff Roster Table */}
      <div className="bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Faculty & Administrative Directory</h3>
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter staff by name or dept..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 border-y border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Staff Name</th>
                <th className="py-2.5 px-3">Emp ID</th>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">Designation</th>
                <th className="py-2.5 px-3">Biometric ID</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{s.name}</td>
                  <td className="py-3 px-3 font-mono text-slate-500">{s.empNo}</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{s.department}</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{s.designation}</td>
                  <td className="py-3 px-3 font-mono text-indigo-600">{s.biometricId}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => showToast(`Document file inspected for ${s.name}`, 'info')}
                      className="text-indigo-600 hover:underline font-semibold"
                    >
                      Verify Dossier &rarr;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
