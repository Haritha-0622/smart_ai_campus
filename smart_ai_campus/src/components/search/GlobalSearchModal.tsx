import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { Search, X, User, GraduationCap, LayoutDashboard, Zap, ArrowRight } from 'lucide-react'

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, students, staffList } = useApp()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setIsSearchOpen(true) }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [setIsSearchOpen])

  if (!isSearchOpen) return null

  const modulesList = [
    { title: 'Executive Health (5-Second View)', path: '/app/executive', icon: LayoutDashboard },
    { title: 'RFID & Attendance Terminal', path: '/app/rfid-attendance', icon: LayoutDashboard },
    { title: 'Student Portal & Progress Brief', path: '/app/student-portal', icon: GraduationCap },
    { title: 'Finance, Fees & Budgeting', path: '/app/finance', icon: LayoutDashboard },
    { title: 'Inventory & Smart Purchase Alarms', path: '/app/inventory', icon: LayoutDashboard },
    { title: 'Transport Fleet & GPS', path: '/app/transport', icon: LayoutDashboard },
    { title: 'Hostel Management', path: '/app/hostel', icon: LayoutDashboard },
    { title: 'No-Due & TC Clearance Engine', path: '/app/approvals', icon: LayoutDashboard },
  ]

  const filteredStudents = query.trim()
    ? students.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.regNo.toLowerCase().includes(query.toLowerCase()) || s.gradeOrDept.toLowerCase().includes(query.toLowerCase()))
    : students.slice(0, 3)

  const filteredStaff = query.trim()
    ? staffList.filter((st) => st.name.toLowerCase().includes(query.toLowerCase()) || st.department.toLowerCase().includes(query.toLowerCase()) || st.empNo.toLowerCase().includes(query.toLowerCase()))
    : staffList.slice(0, 2)

  const filteredModules = query.trim()
    ? modulesList.filter((m) => m.title.toLowerCase().includes(query.toLowerCase()))
    : modulesList.slice(0, 5)

  const handleNavigate = (path: string) => { navigate(path); setIsSearchOpen(false); setQuery('') }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4" onClick={() => setIsSearchOpen(false)}>
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#131B2E] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search students, staff, modules..." className="flex-1 text-sm bg-transparent text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none" />
          <button onClick={() => setIsSearchOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"><X className="w-4 h-4 text-slate-400" /></button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800">
          {filteredStudents.length > 0 && (
            <div className="px-3 py-2">
              <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider px-2 mb-1">Students</p>
              {filteredStudents.map((s) => (
                <button key={s.id} onClick={() => handleNavigate('/app/student-portal')} className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-left cursor-pointer">
                  <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center shrink-0"><GraduationCap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{s.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{s.regNo} · {s.gradeOrDept}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                </button>
              ))}
            </div>
          )}

          {filteredStaff.length > 0 && (
            <div className="px-3 py-2">
              <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider px-2 mb-1">Staff</p>
              {filteredStaff.map((st) => (
                <button key={st.id} onClick={() => handleNavigate('/app/staff')} className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-left cursor-pointer">
                  <div className="w-7 h-7 rounded-full bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center shrink-0"><User className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{st.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{st.empNo} · {st.department}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                </button>
              ))}
            </div>
          )}

          {filteredModules.length > 0 && (
            <div className="px-3 py-2">
              <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider px-2 mb-1">Modules</p>
              {filteredModules.map((m) => (
                <button key={m.path} onClick={() => handleNavigate(m.path)} className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-left cursor-pointer">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0"><Zap className="w-3.5 h-3.5 text-slate-500" /></div>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 flex-1 truncate">{m.title}</p>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3 text-[10px] text-slate-400">
          <span>↵ Navigate</span><span>ESC Close</span>
        </div>
      </div>
    </div>
  )
}
