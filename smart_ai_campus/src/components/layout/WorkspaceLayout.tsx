import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { WorkspaceHeader } from './WorkspaceHeader'
import { WorkspaceSidebar } from './WorkspaceSidebar'
import { GlobalSearchModal } from '../search/GlobalSearchModal'
import { AICopilotDrawer } from '../copilot/AICopilotDrawer'
import { ToastContainer } from '../common/ToastContainer'
import { useApp } from '../../context/AppContext'
import { UserCheck, Sparkles } from 'lucide-react'

export const WorkspaceLayout: React.FC = () => {
  const { currentRole, persona } = useApp()

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B1120] text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors">
      <div className="bg-indigo-50/80 dark:bg-slate-900 text-indigo-950 dark:text-slate-300 text-xs px-4 py-1.5 flex flex-col sm:flex-row items-center justify-between gap-1 border-b border-indigo-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <UserCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Active Persona: <strong className="text-indigo-700 dark:text-indigo-300">{persona.name}</strong> · {persona.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="w-3 h-3 text-indigo-500 animate-pulse" />
          <span className="text-indigo-600 dark:text-indigo-400 font-semibold">Prototype Demo Mode – All data is illustrative</span>
        </div>
      </div>

      <WorkspaceHeader />

      <div className="flex flex-1 overflow-hidden">
        <WorkspaceSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 max-w-screen-2xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <GlobalSearchModal />
      <AICopilotDrawer />
      <ToastContainer />
    </div>
  )
}
