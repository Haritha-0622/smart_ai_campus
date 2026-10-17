import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { INSTITUTIONS, USER_PERSONAS } from '../../data/tenants'
import { UserRole } from '../../types'
import { Search, Bell, Sparkles, Sun, Moon, ChevronDown, Building2, Calendar, UserCheck, Check, LogOut } from 'lucide-react'

export const WorkspaceHeader: React.FC = () => {
  const { institution, setInstitutionId, academicYear, setAcademicYear, currentRole, setCurrentRole, persona, isDarkMode, toggleDarkMode, setIsCopilotOpen, setIsSearchOpen, notifications, markNotificationsAsRead } = useApp()
  const [institutionDropdownOpen, setInstitutionDropdownOpen] = useState(false)
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false)
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false)
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className="sticky top-0 z-30 h-16 bg-white dark:bg-[#101A33] border-b border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between transition-colors shadow-xs">
      <div className="flex items-center gap-3">
        <div className="relative">
          <button onClick={() => { setInstitutionDropdownOpen(!institutionDropdownOpen); setRoleDropdownOpen(false); setNotifDropdownOpen(false) }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight truncate max-w-[180px]">{institution.name}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">{institution.type === 'school' ? 'K-12 School (CBSE)' : 'College & University'}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </button>
          {institutionDropdownOpen && (
            <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50">
              <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase">Select Institutional Tenant</div>
              {INSTITUTIONS.map((inst) => (
                <button key={inst.id} onClick={() => { setInstitutionId(inst.id); setInstitutionDropdownOpen(false) }}
                  className="w-full text-left px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${inst.id === institution.id ? 'bg-indigo-600' : 'bg-slate-300'}`} />
                  <div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{inst.name}</p>
                    <p className="text-[10px] text-slate-400">{inst.type === 'school' ? '🏫 CBSE K-12' : '🎓 College/University'} · {inst.studentCount.toLocaleString()} students</p>
                  </div>
                  {inst.id === institution.id && <Check className="w-3.5 h-3.5 text-indigo-600 ml-auto" />}
                </button>
              ))}
              <div className="px-3 pt-2 border-t border-slate-100 dark:border-slate-800 mt-1">
                <p className="text-[10px] text-slate-400 font-semibold uppercase mb-1">Academic Year</p>
                {institution.academicYears.map((y) => (
                  <button key={y} onClick={() => setAcademicYear(y)} className="w-full text-left px-2 py-1.5 text-xs rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> {y}
                    {y === academicYear && <Check className="w-3.5 h-3.5 text-indigo-600 ml-auto" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button onClick={() => { setRoleDropdownOpen(!roleDropdownOpen); setInstitutionDropdownOpen(false); setNotifDropdownOpen(false) }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <UserCheck className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
            <span className="hidden sm:block text-xs font-semibold text-slate-700 dark:text-slate-300 capitalize">{currentRole.replace('_', ' ')}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
          {roleDropdownOpen && (
            <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50 max-h-80 overflow-y-auto">
              <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase">Switch Persona</div>
              {USER_PERSONAS.map((p) => (
                <button key={p.role} onClick={() => { setCurrentRole(p.role as UserRole); setRoleDropdownOpen(false) }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${p.role === currentRole ? 'bg-teal-500' : 'bg-slate-300'}`} />
                  <div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 capitalize">{p.role.replace('_', ' ')}</p>
                    <p className="text-[10px] text-slate-400">{p.name}</p>
                  </div>
                  {p.role === currentRole && <Check className="w-3.5 h-3.5 text-teal-600 ml-auto" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => setIsSearchOpen(true)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 text-xs hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer">
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:block">Search campus...</span>
          <kbd className="hidden sm:block text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700">⌘K</kbd>
        </button>

        <div className="relative">
          <button onClick={() => { setNotifDropdownOpen(!notifDropdownOpen); setInstitutionDropdownOpen(false); setRoleDropdownOpen(false); markNotificationsAsRead() }}
            className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors cursor-pointer">
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />}
          </button>
          {notifDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <p className="text-xs font-bold text-slate-800 dark:text-white">Campus Notifications</p>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800">
                {notifications.slice(0, 5).map((n) => (
                  <div key={n.id} className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{n.title}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button onClick={() => setIsCopilotOpen(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs shadow-indigo-600/20">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span className="hidden sm:block">AI Copilot</span>
        </button>

        <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors cursor-pointer">
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <Link to="/" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors" title="Exit to public site">
          <LogOut className="w-4 h-4" />
        </Link>
      </div>
    </header>
  )
}
