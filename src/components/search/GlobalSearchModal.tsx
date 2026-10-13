import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import {
  Search,
  X,
  User,
  GraduationCap,
  LayoutDashboard,
  Zap,
  ArrowRight
} from 'lucide-react'

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, students, staffList } = useApp()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setIsSearchOpen])

  if (!isSearchOpen) return null

  const modulesList = [
    { title: 'Executive Health (5-Second View)', path: '/app/executive', icon: LayoutDashboard },
    { title: 'Institution & Campus Setup', path: '/app/institution-setup', icon: LayoutDashboard },
    { title: 'Identity & ID Card Lifecycle', path: '/app/identity-management', icon: LayoutDashboard },
    { title: 'RFID & Attendance Terminal', path: '/app/rfid-attendance', icon: LayoutDashboard },
    { title: 'Student Portal & Progress Brief', path: '/app/student-portal', icon: GraduationCap },
    { title: 'Academic Timetable & Scheduling', path: '/app/academics', icon: LayoutDashboard },
    { title: 'Examination Management & Invigilation', path: '/app/examinations', icon: LayoutDashboard },
    { title: 'Finance, Fees & Budgeting', path: '/app/finance', icon: LayoutDashboard },
    { title: 'Inventory & Smart Purchase Alarms', path: '/app/inventory', icon: LayoutDashboard },
    { title: 'Transport Fleet & GPS Telematics', path: '/app/transport', icon: LayoutDashboard },
    { title: 'Hostel Management & Outpass Logs', path: '/app/hostel', icon: LayoutDashboard },
    { title: 'Library Commons & Misplaced Tracker', path: '/app/library', icon: LayoutDashboard },
    { title: 'No-Due & TC Clearance Engine', path: '/app/approvals', icon: LayoutDashboard },
    { title: 'Circulars & Official Announcements', path: '/app/communication', icon: LayoutDashboard }
  ]

  const filteredStudents = query.trim()
    ? students.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.regNo.toLowerCase().includes(query.toLowerCase()) ||
          s.gradeOrDept.toLowerCase().includes(query.toLowerCase())
      )
    : students.slice(0, 3)

  const filteredStaff = query.trim()
    ? staffList.filter(
        (st) =>
          st.name.toLowerCase().includes(query.toLowerCase()) ||
          st.department.toLowerCase().includes(query.toLowerCase()) ||
          st.empNo.toLowerCase().includes(query.toLowerCase())
      )
    : staffList.slice(0, 2)

  const filteredModules = query.trim()
    ? modulesList.filter((m) => m.title.toLowerCase().includes(query.toLowerCase()))
    : modulesList.slice(0, 5)

  const handleSelect = (path: string) => {
    navigate(path)
    setIsSearchOpen(false)
    setQuery('')
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-[#131B2E] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
          <Search className="w-5 h-5 text-indigo-500 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Search students, faculty, circulars, modules, or ID cards... (ESC to close)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-0 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded ml-2 font-mono">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="p-3 max-h-[60vh] overflow-y-auto space-y-4">
          {/* Quick Actions if empty */}
          {!query && (
            <div className="px-2">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Suggested Actions
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => handleSelect('/app/identity-management')}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left transition-colors"
                >
                  <span className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
                    <Zap className="w-3.5 h-3.5 text-amber-500" /> Enroll New Student
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button
                  onClick={() => handleSelect('/app/rfid-attendance')}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-left transition-colors"
                >
                  <span className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
                    <Zap className="w-3.5 h-3.5 text-teal-500" /> Mark RFID Gate Punch
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>
          )}

          {/* Students Section */}
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1">
              Students ({filteredStudents.length})
            </p>
            <div className="space-y-1">
              {filteredStudents.map((s) => (
                <div
                  key={s.id}
                  onClick={() => handleSelect('/app/identity-management')}
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={s.avatar}
                      alt={s.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white leading-tight">
                        {s.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {s.regNo} &bull; {s.gradeOrDept} &bull; {s.category}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Wallet: ₹{s.walletBalance}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Faculty / Staff */}
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1">
              Faculty & Staff ({filteredStaff.length})
            </p>
            <div className="space-y-1">
              {filteredStaff.map((st) => (
                <div
                  key={st.id}
                  onClick={() => handleSelect('/app/staff')}
                  className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 text-xs font-bold">
                      {st.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white leading-tight">
                        {st.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {st.empNo} &bull; {st.designation} &bull; {st.department}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">
                    {st.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Modules */}
          <div>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 mb-1">
              Platform Modules
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {filteredModules.map((m) => {
                const Icon = m.icon
                return (
                  <div
                    key={m.path}
                    onClick={() => handleSelect(m.path)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span className="truncate">{m.title}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>Search spans multi-tenant student database and cross-campus records</span>
          <span className="font-mono">Smart AI Campus &trade;</span>
        </div>
      </div>
    </div>
  )
}
