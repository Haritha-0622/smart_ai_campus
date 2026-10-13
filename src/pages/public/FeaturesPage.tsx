import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PublicNavbar } from '../../components/layout/PublicNavbar'
import { PublicFooter } from '../../components/layout/PublicFooter'
import {
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
  ArrowRight
} from 'lucide-react'

export const FeaturesPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'academic' | 'operations' | 'governance'>('all')

  const modules = [
    { id: '01', title: 'Institution & Campus Setup', desc: 'Multi-campus structures, schools/colleges profiles, board regulations, academic terms.', path: '/app/institution-setup', cat: 'operations', icon: Building },
    { id: '02', title: 'Identity & ID Card Lifecycle', desc: 'Central student & staff identity registry, barcode/RFID issuance, document completeness.', path: '/app/identity-management', cat: 'operations', icon: CreditCard },
    { id: '03', title: 'RFID & Attendance Operations', desc: 'Millisecond RFID turnstile ingest, manual overrides with reasons, parent SMS triggers.', path: '/app/rfid-attendance', cat: 'operations', icon: Radio },
    { id: '04', title: 'Student 360° Portal', desc: 'Academic performance, attendance records, digital fees, wallet, library, and no-due status.', path: '/app/student-portal', cat: 'academic', icon: GraduationCap },
    { id: '05', title: 'Teacher & Marks Portal', desc: 'Assigned classes, attendance entry, timetable, invigilation duty, student feedback.', path: '/app/teacher-portal', cat: 'academic', icon: Users },
    { id: '06', title: 'Staff Dashboard & HR', desc: 'Employee master data, document verification, induction checklists, training progress.', path: '/app/staff', cat: 'operations', icon: Briefcase },
    { id: '07', title: 'Academic Management', desc: 'Syllabus structures, timetable scheduler, conflict detection, substitute allocations.', path: '/app/academics', cat: 'academic', icon: BookOpen },
    { id: '08', title: 'Transport & GPS Fleet', desc: 'Live vehicle tracking, student RFID boarding logs, fuel telematics, parent notifications.', path: '/app/transport', cat: 'operations', icon: Bus },
    { id: '09', title: 'Learning Management System', desc: 'Course material, digital assignments, project submissions including Thirukkural studies.', path: '/app/lms', cat: 'academic', icon: Library },
    { id: '10', title: 'Gadget & Asset Tracking', desc: 'Tagged campus hardware, custodians, lab apparatus, maintenance history, return tracking.', path: '/app/assets', cat: 'operations', icon: Laptop },
    { id: '11', title: 'Communication Hub', desc: 'Targeted circulars, AI draft assistant, parent-teacher messaging, read receipt receipts.', path: '/app/communication', cat: 'academic', icon: MessageSquare },
    { id: '12', title: 'Examination Management', desc: 'Exam schedules, hall allocations, primary & backup invigilators, conflict checks.', path: '/app/examinations', cat: 'academic', icon: FileSpreadsheet },
    { id: '13', title: 'Finance, Fees & Budgeting', desc: 'Fee structures, student dues, parent payment receipts, departmental budget vs actuals.', path: '/app/finance', cat: 'operations', icon: DollarSign },
    { id: '14', title: 'Inventory & Procurement', desc: 'Item masters, Smart Purchase Alarms, purchase requests, maker-checker workflows.', path: '/app/inventory', cat: 'operations', icon: Package },
    { id: '15', title: 'Canteen & Cashless Campus', desc: 'Digital menus, nutritional tags, campus wallet checkout, parent spending limits.', path: '/app/canteen', cat: 'operations', icon: Coffee },
    { id: '16', title: 'Hostel & Residential Care', desc: 'Hostel blocks, room allocations, digital weekend outpasses, parent SMS verifications.', path: '/app/hostel', cat: 'operations', icon: Home },
    { id: '17', title: 'Library Commons & NAAC', desc: 'Catalog, book issues, due dates, RFID misplaced locator, NAAC accreditation evidence.', path: '/app/library', cat: 'academic', icon: Bookmark },
    { id: '18', title: 'Analytics & Dashboards', desc: '5-Second read traffic-light indicators, cross-campus trends, drill-down tables.', path: '/app/analytics', cat: 'governance', icon: BarChart3 },
    { id: '19', title: 'Institutional HR & Pipeline', desc: 'Recruitment backlog, candidate interview scoring, document checks, induction.', path: '/app/hr', cat: 'operations', icon: UserPlus },
    { id: '20', title: 'Approvals & Workflow Engine', desc: 'Unified inbox: TC No-Due clearances, PO approvals, hostel outpasses, SLA timers.', path: '/app/approvals', cat: 'governance', icon: CheckSquare },
    { id: '21', title: 'Notifications & Alerts', desc: 'Urgent operational notifications, SMS/push dispatch logs, escalation tracking.', path: '/app/notifications', cat: 'governance', icon: Bell },
    { id: '22', title: 'AI Assistant & Copilot Hub', desc: 'Context-aware intelligence, attendance anomaly summaries, budget explanations.', path: '/app/copilot-hub', cat: 'governance', icon: Sparkles },
    { id: '23', title: 'Reports & Exports', desc: 'Operational summaries, date filters, functional CSV downloads and printable previews.', path: '/app/reports', cat: 'governance', icon: DownloadCloud },
    { id: '24', title: 'Security, Audit & Retention', desc: 'RBAC permissions matrix, immutable audit log, data retention policies, AI governance.', path: '/app/security', cat: 'governance', icon: ShieldCheck },
    { id: '25', title: 'Integrations Center', desc: 'Enterprise connectors for RFID, GPS, Biometrics, Razorpay, Tally ERP, and Google SSO.', path: '/app/integrations', cat: 'governance', icon: Cpu },
    { id: '26', title: 'SaaS Administration', desc: 'Multi-tenant overview, onboarding wizard, subscription tiers, platform usage metrics.', path: '/app/saas-admin', cat: 'governance', icon: Settings }
  ]

  const filtered = filter === 'all' ? modules : modules.filter((m) => m.cat === filter)

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B1120] text-slate-800 dark:text-slate-100 flex flex-col font-sans">
      <PublicNavbar />

      <section className="py-14 border-b border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-[#0D1527]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Enterprise Module Catalog
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#101A33] dark:text-white mt-2">
            26 Unified Operational Modules
          </h1>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Every module in Smart AI Campus is fully designed with rich mock datasets, interactive workflows, and instant role responsiveness.
          </p>

          <div className="mt-8 flex justify-center gap-2">
            {[
              { key: 'all', label: 'All 26 Modules' },
              { key: 'academic', label: 'Academic & Learning' },
              { key: 'operations', label: 'Campus Operations' },
              { key: 'governance', label: 'Intelligence & Governance' }
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setFilter(t.key as any)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  filter === t.key
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((m) => {
              const Icon = m.icon
              return (
                <div
                  key={m.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-slate-400">
                        MOD {m.id}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                      {m.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                    <Link
                      to={m.path}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      <span>Open Workspace Screen</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
