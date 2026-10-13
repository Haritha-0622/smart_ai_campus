import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import {
  LayoutDashboard,
  Building,
  CreditCard,
  Radio,
  GraduationCap,
  Users,
  Briefcase,
  BookOpen,
  Bus,
  Library,
  Laptop,
  MessageSquare,
  FileSpreadsheet,
  DollarSign,
  Package,
  Coffee,
  Home,
  Bookmark,
  BarChart3,
  UserPlus,
  CheckSquare,
  Bell,
  Sparkles,
  DownloadCloud,
  ShieldCheck,
  Cpu,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

export const WorkspaceSidebar: React.FC = () => {
  const { approvals } = useApp()
  const [collapsed, setCollapsed] = useState(false)

  const pendingApprovalsCount = approvals.filter((a) => a.status === 'Pending').length

  const navigationSections = [
    {
      heading: 'Executive & Core',
      items: [
        { title: 'Executive Health (5-Sec)', path: '/app/executive', icon: LayoutDashboard },
        { title: '01. Institution Setup', path: '/app/institution-setup', icon: Building },
        { title: '02. Identity & ID Cards', path: '/app/identity-management', icon: CreditCard },
        { title: '03. RFID & Attendance', path: '/app/rfid-attendance', icon: Radio }
      ]
    },
    {
      heading: 'Portals & Personas',
      items: [
        { title: '04. Student Dashboard', path: '/app/student-portal', icon: GraduationCap },
        { title: '05. Teacher Dashboard', path: '/app/teacher-portal', icon: Users },
        { title: '06. Staff Dashboard', path: '/app/staff', icon: Briefcase }
      ]
    },
    {
      heading: 'Academic & Learning',
      items: [
        { title: '07. Academic Management', path: '/app/academics', icon: BookOpen },
        { title: '08. Transport Management', path: '/app/transport', icon: Bus },
        { title: '09. LMS (Thirukkural Project)', path: '/app/lms', icon: Library },
        { title: '10. Gadget & Asset Tracking', path: '/app/assets', icon: Laptop },
        { title: '11. Communication Hub', path: '/app/communication', icon: MessageSquare },
        { title: '12. Examination Management', path: '/app/examinations', icon: FileSpreadsheet }
      ]
    },
    {
      heading: 'Operations & Campus',
      items: [
        { title: '13. Finance & Fees', path: '/app/finance', icon: DollarSign },
        { title: '14. Inventory & Procurement', path: '/app/inventory', icon: Package },
        { title: '15. Canteen Management', path: '/app/canteen', icon: Coffee },
        { title: '16. Hostel Management', path: '/app/hostel', icon: Home },
        { title: '17. Library Management', path: '/app/library', icon: Bookmark }
      ]
    },
    {
      heading: 'Intelligence & Governance',
      items: [
        { title: '18. Analytics & Dashboards', path: '/app/analytics', icon: BarChart3 },
        { title: '19. Institutional HR', path: '/app/hr', icon: UserPlus },
        {
          title: '20. Approvals & Workflows',
          path: '/app/approvals',
          icon: CheckSquare,
          badge: pendingApprovalsCount > 0 ? String(pendingApprovalsCount) : undefined
        },
        { title: '21. Notifications & Alerts', path: '/app/notifications', icon: Bell },
        { title: '22. AI Assistant Hub', path: '/app/copilot-hub', icon: Sparkles },
        { title: '23. Reports & Exports', path: '/app/reports', icon: DownloadCloud },
        { title: '24. Security & Audit', path: '/app/security', icon: ShieldCheck },
        { title: '25. Integrations Center', path: '/app/integrations', icon: Cpu },
        { title: '26. SaaS Administration', path: '/app/saas-admin', icon: Settings }
      ]
    }
  ]

  return (
    <aside
      className={`relative z-20 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D1527] transition-all duration-300 flex flex-col ${
        collapsed ? 'w-18' : 'w-72'
      }`}
    >
      {/* Sidebar Top / Brand Collapse Toggle */}
      <div className="h-14 px-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tracking-wider uppercase">
              All 26 Campus Modules
            </span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 ml-auto"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-6">
        {navigationSections.map((sec, secIdx) => (
          <div key={secIdx}>
            {!collapsed && (
              <p className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-2">
                {sec.heading}
              </p>
            )}
            <div className="space-y-1">
              {sec.items.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                      }`
                    }
                    title={collapsed ? item.title : undefined}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {!collapsed && <span className="truncate">{item.title}</span>}
                    {!collapsed && item.badge && (
                      <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500 text-white">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sticky Bottom Quick Status */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30">
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>Platform Status</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> 100% Operational
            </span>
          </div>
        </div>
      )}
    </aside>
  )
}
