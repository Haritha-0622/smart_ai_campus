import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { WorkspaceHeader } from './WorkspaceHeader'
import { WorkspaceSidebar } from './WorkspaceSidebar'
import { GlobalSearchModal } from '../search/GlobalSearchModal'
import { AICopilotDrawer } from '../copilot/AICopilotDrawer'
import { ToastContainer } from '../common/ToastContainer'
import { useApp } from '../../context/AppContext'
import { UserCheck, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'

export const WorkspaceLayout: React.FC = () => {
  const { currentRole, persona, institution } = useApp()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B1120] text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Banner indicating Active Persona and Prototype Mode */}
      <div className="bg-indigo-50/80 dark:bg-slate-900 text-indigo-950 dark:text-slate-300 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-indigo-100 dark:border-slate-800 gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-semibold text-slate-800 dark:text-white">Active Demo Persona:</span>
          <span className="text-indigo-600 dark:text-indigo-300 font-bold">{persona.name}</span>
          <span className="text-slate-500 dark:text-slate-400">({persona.title} &bull; {persona.department})</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="text-slate-600 dark:text-slate-400">
            Tenant: <strong className="text-slate-900 dark:text-white">{institution.name}</strong> ({institution.type.toUpperCase()})
          </span>
          <Link
            to="/login"
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-semibold underline"
          >
            Switch Role &rarr;
          </Link>
        </div>
      </div>

      {/* Global Top App Bar */}
      <WorkspaceHeader />

      {/* Main Container with Sidebar + Outlet */}
      <div className="flex-1 flex overflow-hidden">
        <WorkspaceSidebar />

        <main className="flex-1 overflow-y-auto bg-[#F7F9FC] dark:bg-[#0B1120] p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global Drawers & Modals */}
      <GlobalSearchModal />
      <AICopilotDrawer />
      <ToastContainer />
    </div>
  )
}
