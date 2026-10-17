import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import { LayoutDashboard, Building, CreditCard, Radio, GraduationCap, Users, Briefcase, BookOpen, Bus, Library, Laptop, MessageSquare, FileSpreadsheet, DollarSign, Package, Coffee, Home, Bookmark, BarChart3, UserPlus, CheckSquare, Bell, Sparkles, DownloadCloud, ShieldCheck, Cpu, ChevronLeft, ChevronRight } from 'lucide-react'

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
      heading: 'Intelligence & Admin',
      items: [
        { title: '18. Analytics & Reports', path: '/app/analytics', icon: BarChart3 },
        { title: '19. Institutional HR', path: '/app/hr', icon: UserPlus },
        { title: '20. Approvals & Workflows', path: '/app/approvals', icon: CheckSquare, badge: pendingApprovalsCount },
        { title: '21. Notifications & Alerts', path: '/app/notifications', icon: Bell },
        { title: '22. AI Assistant Hub', path: '/app/ai-assistant', icon: Sparkles },
        { title: '23. Reports & Exports', path: '/app/reports', icon: DownloadCloud },
        { title: '24. Security & Audit', path: '/app/security', icon: ShieldCheck },
        { title: '25. Integrations Center', path: '/app/integrations', icon: Cpu },
        { title: '26. SaaS Admin', path: '/app/saas-admin', icon: LayoutDashboard }
      ]
    }
  ]

  return (
    <aside className={`${collapsed ? 'w-14' : 'w-64'} shrink-0 bg-white dark:bg-[#101A33] border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-200 overflow-hidden`}>
      <div className="flex items-center justify-end px-2 py-2 border-b border-slate-100 dark:border-slate-800">
        <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors cursor-pointer">
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        {navigationSections.map((section) => (
          <div key={section.heading} className="mb-2">
            {!collapsed && (
              <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">{section.heading}</p>
            )}
            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                title={item.title}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors relative ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-r-2 border-r-indigo-600'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                  }`
                }
              >
                <item.icon className="w-4 h-4 shrink-0" />
                {!collapsed && <span className="truncate">{item.title}</span>}
                {!collapsed && 'badge' in item && item.badge > 0 && (
                  <span className="ml-auto bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}
