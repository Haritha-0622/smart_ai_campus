import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { INSTITUTIONS, USER_PERSONAS } from '../../data/tenants'
import { UserRole } from '../../types'
import {
  Search,
  Bell,
  Sparkles,
  Sun,
  Moon,
  ChevronDown,
  Building2,
  Calendar,
  UserCheck,
  Check,
  ExternalLink,
  ShieldAlert,
  LogOut
} from 'lucide-react'

export const WorkspaceHeader: React.FC = () => {
  const {
    institution,
    setInstitutionId,
    campusId,
    setCampusId,
    academicYear,
    setAcademicYear,
    currentRole,
    setCurrentRole,
    persona,
    isDarkMode,
    toggleDarkMode,
    isCopilotOpen,
    setIsCopilotOpen,
    setIsSearchOpen,
    notifications,
    markNotificationsAsRead
  } = useApp()

  const [institutionDropdownOpen, setInstitutionDropdownOpen] = useState(false)
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false)
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role)
    setRoleDropdownOpen(false)
  }

  return (
    <header className="sticky top-0 z-30 h-16 bg-white dark:bg-[#101A33] border-b border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between transition-colors shadow-xs">
      {/* Left side: Institution & Campus Switchers */}
      <div className="flex items-center gap-3">
        {/* Institution Switcher */}
        <div className="relative">
          <button
            onClick={() => {
              setInstitutionDropdownOpen(!institutionDropdownOpen)
              setRoleDropdownOpen(false)
              setNotifDropdownOpen(false)
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
          >
            <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight truncate max-w-[180px]">
                {institution.name}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                {institution.type === 'school' ? 'K-12 School (CBSE)' : 'College & University'}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </button>

          {/* Institution Menu */}
          {institutionDropdownOpen && (
            <div className="absolute left-0 mt-2 w-72 bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50">
              <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase">
                Select Institutional Tenant
              </div>
              {INSTITUTIONS.map((inst) => (
                <button
                  key={inst.id}
                  onClick={() => {
                    setInstitutionId(inst.id)
                    setInstitutionDropdownOpen(false)
                  }}
                  className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between transition-colors"
                >
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{inst.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {inst.tagline} &bull; {inst.code}
                    </p>
                  </div>
                  {inst.id === institution.id && <Check className="w-4 h-4 text-indigo-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Campus & Academic Year Pills */}
        <div className="hidden md:flex items-center gap-2 text-xs">
          <select
            value={campusId}
            onChange={(e) => setCampusId(e.target.value)}
            className="bg-transparent border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-700 dark:text-slate-300 font-medium text-xs focus:outline-hidden"
          >
            {institution.campuses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className="bg-transparent border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-700 dark:text-slate-300 font-medium text-xs focus:outline-hidden"
          >
            {institution.academicYears.map((yr) => (
              <option key={yr} value={yr}>
                AY: {yr}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Center: Global Search Trigger */}
      <div className="flex-1 max-w-md mx-4 hidden lg:block">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-xs transition-colors"
        >
          <span className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search student records, staff, modules, circulars...</span>
          </span>
          <kbd className="text-[10px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded font-mono">
            Ctrl + K
          </kbd>
        </button>
      </div>

      {/* Right side: Role Switcher, Copilot, Notif, Theme, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Icon */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          title="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* 15 User Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setRoleDropdownOpen(!roleDropdownOpen)
              setInstitutionDropdownOpen(false)
              setNotifDropdownOpen(false)
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 transition-colors text-xs font-semibold cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span className="capitalize">{currentRole.replace('_', ' ')}</span>
            <ChevronDown className="w-3 h-3 ml-0.5 text-indigo-400" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50 max-h-[85vh] overflow-y-auto">
              <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Demo Role Switcher (15 Personas)
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Select any persona to immediately experience their tailored workspace, metrics, and navigation permissions.
                </p>
              </div>

              <div className="py-1">
                {USER_PERSONAS.map((p) => {
                  const isSelected = p.role === currentRole
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleRoleChange(p.role)}
                      className={`w-full text-left px-3.5 py-2 flex items-center justify-between text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                        isSelected ? 'bg-indigo-50/80 dark:bg-indigo-950/50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={p.avatar}
                          alt={p.name}
                          className="w-6 h-6 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white leading-tight">
                            {p.name}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 capitalize">
                            {p.role.replace('_', ' ')} &bull; {p.department}
                          </p>
                        </div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* SAC Copilot Toggle */}
        <button
          onClick={() => setIsCopilotOpen(!isCopilotOpen)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer ${
            isCopilotOpen
              ? 'bg-gradient-to-r from-indigo-600 to-teal-600 text-white shadow-indigo-500/25'
              : 'border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40'
          }`}
          title="Toggle SAC AI Campus Assistant"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="hidden sm:inline">Copilot</span>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifDropdownOpen(!notifDropdownOpen)
              setInstitutionDropdownOpen(false)
              setRoleDropdownOpen(false)
            }}
            className="relative p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-[#101A33]" />
            )}
          </button>

          {notifDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-2 z-50">
              <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Notifications ({unreadCount} New)
                </span>
                <button
                  onClick={markNotificationsAsRead}
                  className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Mark all read
                </button>
              </div>

              <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {n.title}
                      </span>
                      <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {n.message}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t border-slate-100 dark:border-slate-800 text-center">
                <Link
                  to="/app/notifications"
                  onClick={() => setNotifDropdownOpen(false)}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  View Unified Notification Hub &rarr;
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Toggle light / dark mode"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-1 border-l border-slate-200 dark:border-slate-800">
          <img
            src={persona.avatar}
            alt={persona.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
          />
          <div className="hidden xl:block text-left">
            <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
              {persona.name}
            </p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">
              {persona.title}
            </p>
          </div>
          <Link
            to="/"
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            title="Return to Public Website"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  )
}
