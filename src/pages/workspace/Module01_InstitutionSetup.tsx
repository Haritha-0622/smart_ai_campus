import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { INSTITUTIONS } from '../../data/tenants'
import { Badge } from '../../components/common/Badge'
import { Building, MapPin, Calendar, BookOpen, Check, Plus, Settings } from 'lucide-react'

export const Module01_InstitutionSetup: React.FC = () => {
  const { institution, setInstitutionId, showToast } = useApp()

  const [activeTab, setActiveTab] = useState<'profile' | 'campuses' | 'departments' | 'rules'>('profile')
  const [passingPercentage, setPassingPercentage] = useState(40)
  const [minAttendance, setMinAttendance] = useState(75)

  const handleSaveRules = (e: React.FormEvent) => {
    e.preventDefault()
    showToast('Institutional governance rules updated successfully', 'success')
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              01. Institution & Campus Configuration
            </h1>
            <Badge variant="indigo">Module 01</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Configure multi-campus structures, academic affiliations, department boundaries, and institutional regulations.
          </p>
        </div>

        {/* Tenant Switcher Buttons */}
        <div className="flex items-center gap-2">
          {INSTITUTIONS.map((inst) => (
            <button
              key={inst.id}
              onClick={() => setInstitutionId(inst.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                inst.id === institution.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {inst.type === 'school' ? '🏫 School Mode (DPA)' : '🎓 College Mode (AITS)'}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-semibold">
        {[
          { key: 'profile', label: 'Institutional Profile' },
          { key: 'campuses', label: 'Campus Locations & Wings' },
          { key: 'departments', label: institution.type === 'school' ? 'Grades & Sections' : 'Departments & Programs' },
          { key: 'rules', label: 'Academic Rules & Regulations' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              activeTab === tab.key
                ? 'bg-indigo-600 text-white font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content based on tab */}
      {activeTab === 'profile' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#131B2E] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Entity Details</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-slate-500 mb-1">Official Legal Name</label>
                <input
                  type="text"
                  disabled
                  value={institution.name}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-semibold text-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1">Board / University Affiliation</label>
                <input
                  type="text"
                  disabled
                  value={institution.boardOrUniversity}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-semibold text-slate-800 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 mb-1">Institutional Code</label>
                  <input
                    type="text"
                    disabled
                    value={institution.code}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Operating Mode</label>
                  <span className="inline-block mt-1 px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold capitalize">
                    {institution.type}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#131B2E] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Academic Enrollment Summary</h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-between">
                <span>Active Student Strength:</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  {institution.studentCount} Students
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-between">
                <span>Approved Faculty & Staff:</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  {institution.staffCount} Members
                </span>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-between">
                <span>Active Academic Session:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                  {institution.currentYear}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'campuses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {institution.campuses.map((c) => (
            <div
              key={c.id}
              className="bg-white dark:bg-[#131B2E] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">{c.name}</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{c.location}</p>
              <div className="pt-2 flex items-center gap-2">
                <Badge variant="teal">RFID Turnstiles Active</Badge>
                <Badge variant="indigo">GPS Geofence Synced</Badge>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'departments' && (
        <div className="bg-white dark:bg-[#131B2E] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            {institution.type === 'school' ? 'Enrolled Grade Divisions' : 'Academic Departments & Degree Programs'}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {institution.type === 'school' ? (
              ['Grade 9-A', 'Grade 9-B', 'Grade 10-A', 'Grade 10-B', 'Grade 11-A (Science)', 'Grade 11-B (Commerce)', 'Grade 12-A (Science)', 'Grade 12-B (Humanities)'].map((g, i) => (
                <div key={i} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                  {g}
                </div>
              ))
            ) : (
              ['Computer Science & Eng (CSE)', 'Electronics & Comm (ECE)', 'Artificial Intelligence & DS', 'Mechanical Engineering', 'Information Technology', 'Civil & Environmental', 'MBA Management', 'M.Tech Cyber Security'].map((d, i) => (
                <div key={i} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                  {d}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'rules' && (
        <form onSubmit={handleSaveRules} className="bg-white dark:bg-[#131B2E] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-w-xl text-xs">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Regulatory Thresholds</h3>
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Minimum Statutory Attendance for Exam Eligibility (%)
            </label>
            <input
              type="number"
              value={minAttendance}
              onChange={(e) => setMinAttendance(Number(e.target.value))}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-mono font-bold"
            />
          </div>
          <div>
            <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
              Subject Pass Mark Threshold (%)
            </label>
            <input
              type="number"
              value={passingPercentage}
              onChange={(e) => setPassingPercentage(Number(e.target.value))}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-mono font-bold"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer"
          >
            Save Institutional Policy
          </button>
        </form>
      )}
    </div>
  )
}
