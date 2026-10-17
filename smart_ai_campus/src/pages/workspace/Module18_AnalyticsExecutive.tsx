import React, { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import { Link } from 'react-router-dom'
import {
  BarChart3, AlertTriangle, CheckCircle2, Clock, TrendingUp, TrendingDown,
  LayoutDashboard, Sparkles, ShieldCheck, ListTodo, FileText, Settings,
  AlertCircle, Bell, X, ArrowRight, CheckCheck, UserCheck, DollarSign,
  Bus, BookOpen, Home, Users, Package, Calendar, RefreshCw, Eye,
  Target, Zap, Filter, Plus, Send, ToggleRight, ToggleLeft,
  Info, Activity, Radio, GraduationCap, Laptop, Utensils, Cpu,
  Building2, Library, MessageSquare, ClipboardList, Key, Globe,
} from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────
type Tab = 'dashboard' | 'alerts' | 'actions' | 'reports' | 'thresholds' | 'ai'
type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info'
type AlertStatus = 'Open' | 'Acknowledged' | 'Assigned' | 'Resolved'
type ActionStatus = 'Open' | 'Assigned' | 'In Progress' | 'Blocked' | 'Resolved'

interface SAC_Alert {
  id: string
  title: string
  category: string
  severity: Severity
  status: AlertStatus
  detectedAt: string
  module: string
  modulePath: string
  affectedGroup: string
  metric: string
  threshold: string
  observed: string
  impact: string
  recommendedAction: string
  assignedTo?: string
  dueBy?: string
  notes?: string
  acknowledged: boolean
}

interface ActionTask {
  id: string
  title: string
  sourceAlertId?: string
  description: string
  assignedTo: string
  department: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  createdDate: string
  dueDate: string
  status: ActionStatus
  notes?: string
  resolution?: string
}

interface ThresholdRule {
  id: string
  metric: string
  category: string
  operator: '<' | '>' | '='
  threshold: number
  unit: string
  severity: Severity
  enabled: boolean
  description: string
}

interface ModuleHealth {
  id: string
  name: string
  status: 'green' | 'yellow' | 'red' | 'grey'
  path: string
  icon: React.ElementType
  kpi: string
  note: string
}

// ── Initial Data ──────────────────────────────────────────────────────────────
const INITIAL_ALERTS: SAC_Alert[] = [
  {
    id: 'alt-01', title: 'Gate Attendance Below Critical Threshold — Class XII-B',
    category: 'Attendance', severity: 'critical', status: 'Open',
    detectedAt: '2025-10-17 08:42', module: 'RFID Attendance', modulePath: '/app/rfid-attendance',
    affectedGroup: 'Class XII-B (28 students)', metric: 'Daily Attendance Rate',
    threshold: '≥ 85%', observed: '61.4%', acknowledged: false,
    impact: '11 students absent with no parent notification sent. Risk of compliance gap.',
    recommendedAction: 'Trigger automated parent SMS, verify hostel roll call, escalate to class teacher immediately.'
  },
  {
    id: 'alt-02', title: 'Exam Stationery Stock Below Safety Threshold',
    category: 'Inventory', severity: 'critical', status: 'Open',
    detectedAt: '2025-10-17 07:15', module: 'Inventory', modulePath: '/app/inventory',
    affectedGroup: 'Central Stores — Examination Supplies', metric: 'Exam Answer Booklets (Stock)',
    threshold: '≥ 1,000 units', observed: '480 units', acknowledged: false,
    impact: 'Term-end exams begin in 8 days. Stock insufficient for 2,400 students.',
    recommendedAction: 'Raise emergency purchase request for 2,000 booklets. Contact preferred vendor immediately.'
  },
  {
    id: 'alt-03', title: 'Bus #06 GPS Route Deviation — 18-Minute Delay',
    category: 'Transport', severity: 'high', status: 'Acknowledged',
    detectedAt: '2025-10-17 07:58', module: 'Transport', modulePath: '/app/transport',
    affectedGroup: 'Bus #06 — Routes 8–11 (32 students)', metric: 'Route Deviation & ETA',
    threshold: '≤ 5 min delay', observed: '18 min delay', acknowledged: true,
    impact: 'Parents on stops 8–11 not yet notified. Students will arrive after morning assembly.',
    recommendedAction: 'Send automated ETA push notification to 32 parent accounts. Log deviation for fleet report.',
    assignedTo: 'Transport Coordinator'
  },
  {
    id: 'alt-04', title: 'Fee Collection 9% Behind October Target',
    category: 'Finance', severity: 'high', status: 'Assigned',
    detectedAt: '2025-10-16 18:00', module: 'Finance', modulePath: '/app/finance',
    affectedGroup: '214 students with pending fee balances', metric: 'Monthly Fee Collection Rate',
    threshold: '≥ 90%', observed: '81%', acknowledged: true,
    impact: '₹12.4L outstanding. 3 students have ≥90-day overdue balances.',
    recommendedAction: 'Issue automated fee reminders. Flag overdue accounts for finance officer review.',
    assignedTo: 'Finance Officer', dueBy: '2025-10-20'
  },
  {
    id: 'alt-05', title: '6 Students Academically At-Risk — Below 40% Grade',
    category: 'Academics', severity: 'high', status: 'Open',
    detectedAt: '2025-10-15 14:30', module: 'Academics', modulePath: '/app/academics',
    affectedGroup: '6 students in Class X and XI', metric: 'Academic Performance Grade',
    threshold: '≥ 40%', observed: '28–38% range', acknowledged: false,
    impact: 'Risk of detention / supplementary exam. Requires immediate counsellor intervention.',
    recommendedAction: 'Schedule parent-teacher meeting. Assign remedial classes. Notify academic counsellor.'
  },
  {
    id: 'alt-06', title: 'Library Overdue Books — 23 Students',
    category: 'Library', severity: 'medium', status: 'Open',
    detectedAt: '2025-10-16 09:00', module: 'Library', modulePath: '/app/library',
    affectedGroup: '23 students with overdue loans', metric: 'Books Overdue > 7 days',
    threshold: '≤ 5 overdue', observed: '23 overdue', acknowledged: false,
    impact: 'No-due clearance impacted for affected students. Fine revenue not collected.',
    recommendedAction: 'Send automated SMS reminders to borrowers and parents. Block further issues until returned.'
  },
  {
    id: 'alt-07', title: '4 Staff Leave Requests Pending Beyond 48h',
    category: 'Approvals', severity: 'medium', status: 'Open',
    detectedAt: '2025-10-16 17:00', module: 'Approvals', modulePath: '/app/approvals',
    affectedGroup: 'Principal / HOD review queue', metric: 'Approval Turnaround',
    threshold: '≤ 24h response', observed: '48–72h pending', acknowledged: false,
    impact: 'Substitute teacher arrangements cannot be planned without approval status.',
    recommendedAction: 'Notify principal to review and approve / reject pending leave requests.'
  },
  {
    id: 'alt-08', title: 'Hostel Visitor Log Anomaly — Unregistered Entry',
    category: 'Hostel', severity: 'medium', status: 'Acknowledged',
    detectedAt: '2025-10-17 06:30', module: 'Hostel', modulePath: '/app/hostel',
    affectedGroup: 'Kaveri Hostel — Block B', metric: 'Visitor Registration Compliance',
    threshold: '100% registered', observed: '1 unregistered entry', acknowledged: true,
    impact: 'Security policy violation. Parent has not been notified.',
    recommendedAction: 'Warden to verify and record retroactively. Update visitor log. Alert security.'
  },
  {
    id: 'alt-09', title: 'Canteen Wallet Low Balance — 18 Students',
    category: 'Finance', severity: 'low', status: 'Resolved',
    detectedAt: '2025-10-15 12:00', module: 'Canteen', modulePath: '/app/canteen',
    affectedGroup: '18 students with wallet < ₹50', metric: 'Wallet Balance',
    threshold: '≥ ₹100', observed: '₹0–₹48', acknowledged: true,
    impact: 'Students may be unable to access cashless canteen services.',
    recommendedAction: 'Automated low-balance alert sent to parents. Resolved — 12 of 18 topped up.',
    resolution: 'Auto-alert triggered. 12/18 parents topped up wallet within 6 hours.'
  },
]

const INITIAL_ACTIONS: ActionTask[] = [
  {
    id: 'act-01', title: 'Emergency Stationery Purchase Order',
    sourceAlertId: 'alt-02', description: 'Raise emergency PO for 2,000 exam answer booklets from approved vendor — Sunrise Stationery Pvt. Ltd.',
    assignedTo: 'Mr. Rajiv Mohan', department: 'Administration',
    priority: 'critical', createdDate: '2025-10-17', dueDate: '2025-10-18',
    status: 'In Progress', notes: 'Vendor confirmed stock. Awaiting PO approval from Principal.'
  },
  {
    id: 'act-02', title: 'Parent SMS — Attendance Alert XII-B',
    sourceAlertId: 'alt-01', description: 'Send individual SMS to parents of 11 absent students in Class XII-B. Record delivery confirmation.',
    assignedTo: 'Class Teacher — XII-B', department: 'Academics',
    priority: 'critical', createdDate: '2025-10-17', dueDate: '2025-10-17',
    status: 'Assigned'
  },
  {
    id: 'act-03', title: 'Fee Reminder Campaign — Oct Overdue',
    sourceAlertId: 'alt-04', description: 'Email and SMS reminder to 214 parents with pending fee balances. Flag 3 accounts with >90-day overdue to finance head.',
    assignedTo: 'Ms. Priya Iyer', department: 'Finance',
    priority: 'high', createdDate: '2025-10-16', dueDate: '2025-10-20',
    status: 'In Progress', notes: 'First batch of 150 reminders sent. Remaining 64 queued.'
  },
  {
    id: 'act-04', title: 'Remedial Class Schedule — At-Risk Students',
    sourceAlertId: 'alt-05', description: 'Coordinate with subject teachers to schedule 3 additional remedial sessions per week for 6 at-risk students.',
    assignedTo: 'Academic Coordinator', department: 'Academics',
    priority: 'high', createdDate: '2025-10-15', dueDate: '2025-10-22',
    status: 'Open'
  },
  {
    id: 'act-05', title: 'Library Overdue Recall — 23 Borrowers',
    sourceAlertId: 'alt-06', description: 'Send automated recall notices to 23 students with overdue books. Block further borrowing until returned.',
    assignedTo: 'Librarian', department: 'Library',
    priority: 'medium', createdDate: '2025-10-16', dueDate: '2025-10-19',
    status: 'Assigned'
  },
  {
    id: 'act-06', title: 'Pending Leave Approvals — Principal Review',
    sourceAlertId: 'alt-07', description: 'Review and resolve 4 pending staff leave requests in approval queue. Arrange substitutes accordingly.',
    assignedTo: 'Principal', department: 'Administration',
    priority: 'medium', createdDate: '2025-10-16', dueDate: '2025-10-17',
    status: 'Blocked', notes: 'Principal in external meeting until 14:00.'
  },
]

const INITIAL_THRESHOLDS: ThresholdRule[] = [
  { id: 'thr-01', metric: 'Daily Attendance Rate', category: 'Attendance', operator: '<', threshold: 85, unit: '%', severity: 'critical', enabled: true, description: 'Alert when any class or campus daily attendance falls below 85%.' },
  { id: 'thr-02', metric: 'Monthly Fee Collection Rate', category: 'Finance', operator: '<', threshold: 90, unit: '%', severity: 'high', enabled: true, description: 'Alert when monthly fee collection rate falls below 90% of target.' },
  { id: 'thr-03', metric: 'Exam Stationery Stock', category: 'Inventory', operator: '<', threshold: 1000, unit: 'units', severity: 'critical', enabled: true, description: 'Alert when exam booklet stock drops below safety threshold of 1,000.' },
  { id: 'thr-04', metric: 'Bus Route Delay', category: 'Transport', operator: '>', threshold: 5, unit: 'minutes', severity: 'high', enabled: true, description: 'Alert when any bus route reports more than 5 minutes of delay.' },
  { id: 'thr-05', metric: 'Student Academic Grade', category: 'Academics', operator: '<', threshold: 40, unit: '%', severity: 'high', enabled: true, description: 'Flag students with overall academic grade below 40% for counsellor review.' },
  { id: 'thr-06', metric: 'Overdue Library Books', category: 'Library', operator: '>', threshold: 5, unit: 'books', severity: 'medium', enabled: true, description: 'Alert when more than 5 library books are overdue beyond 7 days.' },
  { id: 'thr-07', metric: 'Approval Queue Age', category: 'Approvals', operator: '>', threshold: 24, unit: 'hours', severity: 'medium', enabled: true, description: 'Alert when any pending approval has not been actioned within 24 hours.' },
  { id: 'thr-08', metric: 'Canteen Wallet Balance', category: 'Finance', operator: '<', threshold: 100, unit: '₹', severity: 'low', enabled: false, description: 'Notify parents when student cashless wallet balance drops below ₹100.' },
  { id: 'thr-09', metric: 'RFID Gate Failure Rate', category: 'Infrastructure', operator: '>', threshold: 2, unit: '%', severity: 'high', enabled: true, description: 'Alert when RFID read failure rate at gate exceeds 2%.' },
  { id: 'thr-10', metric: 'Staff Absent Without Notice', category: 'Attendance', operator: '>', threshold: 3, unit: 'staff', severity: 'critical', enabled: true, description: 'Alert when more than 3 teaching staff are absent without pre-approved leave.' },
]

const MODULE_HEALTH: ModuleHealth[] = [
  { id: 'm01', name: '01. Institution Setup', status: 'green', path: '/app/institution-setup', icon: Building2, kpi: '3 campuses', note: 'All profiles active' },
  { id: 'm02', name: '02. Identity & ID Cards', status: 'green', path: '/app/identity-management', icon: Key, kpi: '2,847 IDs issued', note: 'No pending renewals' },
  { id: 'm03', name: '03. RFID Attendance', status: 'red', path: '/app/rfid-attendance', icon: Radio, kpi: '61.4% — XII-B', note: 'Critical: below threshold' },
  { id: 'm04', name: '04. Student Portal', status: 'green', path: '/app/student-portal', icon: GraduationCap, kpi: '2,847 active', note: 'All portals accessible' },
  { id: 'm05', name: '05. Teacher Portal', status: 'green', path: '/app/teacher-portal', icon: Users, kpi: '98 faculty', note: '3 substitutes active' },
  { id: 'm06', name: '06. Staff Dashboard', status: 'yellow', path: '/app/staff', icon: UserCheck, kpi: '4 pending leaves', note: 'Approval queue backlog' },
  { id: 'm07', name: '07. Academic Management', status: 'yellow', path: '/app/academics', icon: BookOpen, kpi: '6 at-risk students', note: 'Remedial action needed' },
  { id: 'm08', name: '08. Transport', status: 'yellow', path: '/app/transport', icon: Bus, kpi: 'Bus #06 delayed', note: '18-min deviation' },
  { id: 'm09', name: '09. LMS', status: 'green', path: '/app/lms', icon: Globe, kpi: '142 courses active', note: 'No exceptions' },
  { id: 'm10', name: '10. Asset Tracking', status: 'green', path: '/app/assets', icon: Laptop, kpi: '384 tracked', note: 'No missing assets' },
  { id: 'm11', name: '11. Communication', status: 'green', path: '/app/communication', icon: MessageSquare, kpi: '12 circulars sent', note: 'This week' },
  { id: 'm12', name: '12. Examinations', status: 'yellow', path: '/app/examinations', icon: ClipboardList, kpi: '8 days to term-end', note: 'Stationery shortage risk' },
  { id: 'm13', name: '13. Finance', status: 'red', path: '/app/finance', icon: DollarSign, kpi: '81% collected', note: '9% behind target' },
  { id: 'm14', name: '14. Inventory', status: 'red', path: '/app/inventory', icon: Package, kpi: '480 booklets left', note: 'Below 1,000 threshold' },
  { id: 'm15', name: '15. Canteen', status: 'green', path: '/app/canteen', icon: Utensils, kpi: '₹48,200 today', note: 'On track' },
  { id: 'm16', name: '16. Hostel', status: 'yellow', path: '/app/hostel', icon: Home, kpi: '1 anomaly', note: 'Visitor log gap' },
  { id: 'm17', name: '17. Library', status: 'yellow', path: '/app/library', icon: Library, kpi: '23 overdue', note: 'Recall in progress' },
  { id: 'm18', name: '18. Analytics', status: 'green', path: '/app/analytics', icon: BarChart3, kpi: '8 active alerts', note: 'This module' },
  { id: 'm19', name: '19. HR', status: 'green', path: '/app/hr', icon: Users, kpi: '134 staff', note: 'Payroll current' },
  { id: 'm20', name: '20. Approvals', status: 'yellow', path: '/app/approvals', icon: CheckCircle2, kpi: '4 pending', note: '>24h in queue' },
  { id: 'm21', name: '21. Notifications', status: 'green', path: '/app/notifications', icon: Bell, kpi: '847 sent today', note: 'All delivered' },
  { id: 'm22', name: '22. AI Copilot', status: 'green', path: '/app/ai-assistant', icon: Sparkles, kpi: '26 queries today', note: 'Operational' },
  { id: 'm23', name: '23. Reports', status: 'green', path: '/app/reports', icon: FileText, kpi: '18 exports', note: 'This week' },
  { id: 'm24', name: '24. Security & Audit', status: 'green', path: '/app/security', icon: ShieldCheck, kpi: '0 violations', note: 'All logs clean' },
  { id: 'm25', name: '25. API Integrations', status: 'green', path: '/app/integrations', icon: Cpu, kpi: '7 connectors', note: 'All active' },
  { id: 'm26', name: '26. SaaS Admin', status: 'green', path: '/app/saas-admin', icon: Settings, kpi: '1 tenant active', note: 'Demo instance' },
]

// ── Helpers ──────────────────────────────────────────────────────────────────
const SEV_COLORS: Record<Severity, string> = {
  critical: 'bg-rose-50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/40',
  high: 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/40',
  medium: 'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900/40',
  low: 'bg-slate-50 border-slate-200 dark:bg-slate-900/40 dark:border-slate-700',
  info: 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/40',
}
const SEV_BADGE: Record<Severity, 'rose' | 'amber' | 'indigo' | 'slate' | 'emerald'> = {
  critical: 'rose', high: 'amber', medium: 'indigo', low: 'slate', info: 'emerald'
}
const ACT_STATUS_COLOR: Record<ActionStatus, string> = {
  Open: 'text-slate-500', Assigned: 'text-blue-500', 'In Progress': 'text-amber-500',
  Blocked: 'text-rose-500', Resolved: 'text-emerald-500'
}
const HEALTH_DOT: Record<string, string> = {
  green: 'bg-emerald-500', yellow: 'bg-amber-400', red: 'bg-rose-500', grey: 'bg-slate-400'
}

// ── Component ─────────────────────────────────────────────────────────────────
export const Module18_AnalyticsExecutive: React.FC = () => {
  const { institution, students, staffList, attendance, approvals, purchaseRequests, showToast } = useApp()

  const [tab, setTab] = useState<Tab>('dashboard')
  const [alerts, setAlerts] = useState<SAC_Alert[]>(INITIAL_ALERTS)
  const [actions, setActions] = useState<ActionTask[]>(INITIAL_ACTIONS)
  const [thresholds, setThresholds] = useState<ThresholdRule[]>(INITIAL_THRESHOLDS)
  const [selectedAlert, setSelectedAlert] = useState<SAC_Alert | null>(null)
  const [alertFilter, setAlertFilter] = useState<{ severity: string; status: string; category: string }>({ severity: '', status: '', category: '' })
  const [actionFilter, setActionFilter] = useState<string>('')
  const [noteInput, setNoteInput] = useState('')
  const [assignInput, setAssignInput] = useState('')

  // ── Derived metrics from AppContext ───────────────────────────────────────
  const presentToday = useMemo(() => attendance.filter((a) => a.status === 'Present').length, [attendance])
  const pendingApprovals = useMemo(() => approvals.filter((a) => a.status === 'Pending').length, [approvals])
  const pendingPRs = useMemo(() => purchaseRequests.filter((p) => p.status === 'Pending').length, [purchaseRequests])
  const atRiskStudents = useMemo(() => students.filter((s) => parseFloat(s.academicGrade || '0') < 40).length, [students])
  const feePendingTotal = useMemo(() => students.reduce((sum, s) => sum + (s.feePending || 0), 0), [students])

  const openAlerts = alerts.filter((a) => a.status !== 'Resolved')
  const criticalCount = openAlerts.filter((a) => a.severity === 'critical').length
  const highCount = openAlerts.filter((a) => a.severity === 'high').length
  const resolvedCount = alerts.filter((a) => a.status === 'Resolved').length

  // ── Alert actions ─────────────────────────────────────────────────────────
  const ackAlert = (id: string) => {
    setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, acknowledged: true, status: 'Acknowledged' } : a))
    showToast('Alert acknowledged', 'info')
  }
  const assignAlert = (id: string, to: string) => {
    if (!to.trim()) return
    setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, assignedTo: to, status: 'Assigned' } : a))
    showToast(`Alert assigned to ${to}`, 'success')
    setAssignInput('')
  }
  const resolveAlert = (id: string) => {
    setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, status: 'Resolved', acknowledged: true } : a))
    showToast('Alert resolved', 'success')
    setSelectedAlert(null)
  }
  const addNoteToAlert = (id: string) => {
    if (!noteInput.trim()) return
    setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, notes: `${a.notes ? a.notes + ' | ' : ''}${noteInput}` } : a))
    showToast('Note added', 'info')
    setNoteInput('')
  }
  const createTaskFromAlert = (alert: SAC_Alert) => {
    const task: ActionTask = {
      id: `act-${Date.now()}`, title: `Action: ${alert.title}`,
      sourceAlertId: alert.id, description: alert.recommendedAction,
      assignedTo: alert.assignedTo || 'Unassigned', department: alert.category,
      priority: alert.severity === 'info' ? 'low' : alert.severity as ActionTask['priority'],
      createdDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
      status: 'Open'
    }
    setActions((prev) => [task, ...prev])
    showToast('Action task created from alert', 'success')
  }

  // ── Action task actions ───────────────────────────────────────────────────
  const updateActionStatus = (id: string, status: ActionStatus) => {
    setActions((prev) => prev.map((a) => a.id === id ? { ...a, status } : a))
    showToast(`Task status updated to ${status}`, 'info')
  }

  // ── Filtered alerts ───────────────────────────────────────────────────────
  const filteredAlerts = useMemo(() => alerts.filter((a) => {
    if (alertFilter.severity && a.severity !== alertFilter.severity) return false
    if (alertFilter.status && a.status !== alertFilter.status) return false
    if (alertFilter.category && a.category !== alertFilter.category) return false
    return true
  }), [alerts, alertFilter])

  // ── Traffic light top bar data ────────────────────────────────────────────
  const trafficLights = [
    { label: 'Gate Attendance', value: `${presentToday + 2700} / ${institution.studentCount}`, status: criticalCount > 0 ? 'red' : 'green' as const, note: criticalCount > 0 ? 'Critical alert active' : 'On target' },
    { label: 'Fee Collection', value: '81% collected', status: 'yellow' as const, note: '₹12.4L outstanding' },
    { label: 'Fleet GPS', value: '8/10 on route', status: 'yellow' as const, note: 'Bus #06 delayed 18 min' },
    { label: 'Open Alerts', value: `${openAlerts.length} open`, status: criticalCount > 0 ? 'red' : highCount > 0 ? 'yellow' : 'green' as const, note: `${criticalCount} critical, ${highCount} high` },
  ]

  // ── Tabs config ───────────────────────────────────────────────────────────
  const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'alerts', label: `Alerts (${openAlerts.length})`, icon: AlertTriangle },
    { id: 'actions', label: `Actions (${actions.filter((a) => a.status !== 'Resolved').length})`, icon: ListTodo },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'thresholds', label: 'Thresholds', icon: Settings },
    { id: 'ai', label: 'AI Briefing', icon: Sparkles },
  ]

  // ── Mini bar chart (pure CSS) ─────────────────────────────────────────────
  const MiniBar = ({ value, max, color }: { value: number; max: number; color: string }) => (
    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 mt-1">
      <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
    </div>
  )

  return (
    <div className="space-y-5">
      {/* ── Header ── */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-5 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-xl font-extrabold text-[#101A33] dark:text-white">18. Analytics &amp; Executive Dashboard</h1>
              <Badge variant="indigo" dot>Live</Badge>
              {criticalCount > 0 && <Badge variant="rose">{criticalCount} Critical</Badge>}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{institution.name} · Control Room View · Academic Year 2025-2026</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => showToast('Dashboard refreshed', 'info')} className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer">
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
            <ExportButton filename="sac_analytics_report" data={alerts.map((a) => ({ id: a.id, title: a.title, severity: a.severity, status: a.status, category: a.category, detectedAt: a.detectedAt }))} label="Export Alerts" />
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="flex flex-wrap gap-1">
          {TABS.map((t) => {
            const Icon = t.icon
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${tab === t.id ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                <Icon className="w-3.5 h-3.5" /> {t.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* TAB: DASHBOARD                                                      */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      {tab === 'dashboard' && (
        <div className="space-y-5">
          {/* Five-Second Traffic Light Bar */}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-indigo-500" />
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Five-Second Campus Health — Traffic Control View</h2>
              <span className="text-[10px] text-slate-400 ml-auto">As of 08:45 today</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {trafficLights.map((tl) => (
                <div key={tl.label} className={`flex items-center gap-3 p-3 rounded-xl border ${tl.status === 'red' ? 'bg-rose-50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/30' : tl.status === 'yellow' ? 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/30' : 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/30'}`}>
                  <div className={`w-3 h-3 rounded-full shrink-0 animate-pulse ${HEALTH_DOT[tl.status]}`} />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{tl.value}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{tl.label}</p>
                    <p className="text-[10px] text-slate-400">{tl.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard title="Students Present Today" value={presentToday + 2700} subtext={`of ${institution.studentCount} enrolled`} icon={Users} status={criticalCount > 0 ? 'warning' : 'healthy'} trend={{ value: '+0.4%', isPositive: true, label: 'vs yesterday' }} />
            <StatCard title="Fee Outstanding" value={`₹${(feePendingTotal / 100000).toFixed(1)}L`} subtext="Oct 2025 — 81% collected" icon={DollarSign} status="warning" trend={{ value: '-9%', isPositive: false, label: 'behind target' }} />
            <StatCard title="Open Exceptions" value={openAlerts.length} subtext={`${criticalCount} critical · ${highCount} high`} icon={AlertTriangle} status={criticalCount > 0 ? 'critical' : 'warning'} actionLabel="Review Alerts" onAction={() => setTab('alerts')} />
            <StatCard title="Actions Pending" value={actions.filter((a) => a.status !== 'Resolved').length} subtext={`${actions.filter((a) => a.status === 'Blocked').length} blocked`} icon={ListTodo} status={actions.filter((a) => a.status === 'Blocked').length > 0 ? 'warning' : 'neutral'} actionLabel="View Actions" onAction={() => setTab('actions')} />
          </div>

          {/* Active Critical & High Alerts Preview */}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Live Exception Intelligence — Requires Attention</h2>
              <button onClick={() => setTab('alerts')} className="ml-auto text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer">
                All Alerts <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {openAlerts.filter((a) => a.severity === 'critical' || a.severity === 'high').slice(0, 4).map((exc) => (
                <div key={exc.id} className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer hover:shadow-sm transition-shadow ${SEV_COLORS[exc.severity]}`}
                  onClick={() => { setSelectedAlert(exc); setTab('alerts') }}>
                  <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${exc.severity === 'critical' ? 'text-rose-500' : 'text-amber-500'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <Badge variant={SEV_BADGE[exc.severity]}>{exc.severity.toUpperCase()}</Badge>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{exc.category}</span>
                      <span className="text-[10px] text-slate-400 ml-auto">{exc.detectedAt}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{exc.title}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{exc.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Module Health Grid */}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <LayoutDashboard className="w-4 h-4 text-indigo-500" />
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">26-Module Health Grid</h2>
              <div className="ml-auto flex items-center gap-3 text-[10px] text-slate-400">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />OK</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />Warning</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />Critical</span>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
              {MODULE_HEALTH.map((m) => {
                const Icon = m.icon
                return (
                  <Link key={m.id} to={m.path} className={`flex items-center gap-2 p-2.5 rounded-xl border hover:shadow-sm transition-all ${m.status === 'red' ? 'border-rose-200 bg-rose-50 dark:bg-rose-950/20 dark:border-rose-900/40' : m.status === 'yellow' ? 'border-amber-200 bg-amber-50 dark:bg-amber-950/10 dark:border-amber-900/30' : 'border-slate-200 bg-slate-50 dark:bg-slate-900/30 dark:border-slate-800'}`}>
                    <div className={`w-2 h-2 rounded-full shrink-0 ${HEALTH_DOT[m.status]}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 truncate leading-tight">{m.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{m.kpi}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Mini Charts Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-indigo-500" />Attendance — Last 7 Days</h3>
              {[['Mon', 94], ['Tue', 96], ['Wed', 91], ['Thu', 88], ['Fri', 93], ['Sat', 97], ['Today', 92]].map(([day, val]) => (
                <div key={day} className="mb-1.5">
                  <div className="flex justify-between text-[10px] text-slate-500 mb-0.5"><span>{day}</span><span>{val}%</span></div>
                  <MiniBar value={val as number} max={100} color={Number(val) < 90 ? 'bg-amber-400' : 'bg-indigo-500'} />
                </div>
              ))}
            </div>
            <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-emerald-500" />Fee Collection by Month</h3>
              {[['Jul', 98], ['Aug', 95], ['Sep', 92], ['Oct', 81]].map(([month, val]) => (
                <div key={month} className="mb-2">
                  <div className="flex justify-between text-[10px] text-slate-500 mb-0.5"><span>{month} 2025</span><span>{val}%</span></div>
                  <MiniBar value={val as number} max={100} color={Number(val) < 90 ? 'bg-rose-400' : 'bg-emerald-500'} />
                </div>
              ))}
            </div>
            <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5 text-purple-500" />Alert Distribution</h3>
              {[
                { label: 'Critical', count: criticalCount, color: 'bg-rose-500' },
                { label: 'High', count: highCount, color: 'bg-amber-400' },
                { label: 'Medium', count: openAlerts.filter((a) => a.severity === 'medium').length, color: 'bg-blue-400' },
                { label: 'Resolved', count: resolvedCount, color: 'bg-emerald-500' },
              ].map((item) => (
                <div key={item.label} className="mb-2">
                  <div className="flex justify-between text-[10px] text-slate-500 mb-0.5"><span>{item.label}</span><span>{item.count}</span></div>
                  <MiniBar value={item.count} max={alerts.length} color={item.color} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* TAB: ALERTS                                                         */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      {tab === 'alerts' && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-wrap gap-3 items-center">
            <Filter className="w-4 h-4 text-slate-400" />
            {[
              { key: 'severity', label: 'Severity', options: ['', 'critical', 'high', 'medium', 'low'] },
              { key: 'status', label: 'Status', options: ['', 'Open', 'Acknowledged', 'Assigned', 'Resolved'] },
              { key: 'category', label: 'Category', options: ['', 'Attendance', 'Finance', 'Transport', 'Inventory', 'Academics', 'Library', 'Approvals', 'Hostel'] },
            ].map(({ key, label, options }) => (
              <select key={key} value={alertFilter[key as keyof typeof alertFilter]}
                onChange={(e) => setAlertFilter((prev) => ({ ...prev, [key]: e.target.value }))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
                <option value="">{label}: All</option>
                {options.filter(Boolean).map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ))}
            <span className="ml-auto text-xs text-slate-400">{filteredAlerts.length} alert{filteredAlerts.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Alert List */}
            <div className="space-y-3">
              {filteredAlerts.length === 0 && (
                <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center">
                  <CheckCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No alerts match the selected filters</p>
                </div>
              )}
              {filteredAlerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-2xl border cursor-pointer transition-all hover:shadow-md ${selectedAlert?.id === alert.id ? 'ring-2 ring-indigo-500' : ''} ${SEV_COLORS[alert.severity]}`}
                  onClick={() => setSelectedAlert(alert)}>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${alert.severity === 'critical' ? 'text-rose-500' : alert.severity === 'high' ? 'text-amber-500' : 'text-blue-500'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <Badge variant={SEV_BADGE[alert.severity]}>{alert.severity.toUpperCase()}</Badge>
                        <Badge variant="slate">{alert.status}</Badge>
                        <span className="text-[10px] text-slate-400 ml-auto">{alert.detectedAt}</span>
                      </div>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">{alert.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{alert.category} · {alert.module}</p>
                      {alert.assignedTo && <p className="text-[11px] text-indigo-600 dark:text-indigo-400 mt-0.5">→ {alert.assignedTo}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Alert Detail Panel */}
            <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
              {!selectedAlert ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <Eye className="w-8 h-8 text-slate-300 mb-3" />
                  <p className="text-sm font-semibold text-slate-500">Select an alert to view details</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-2">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        <Badge variant={SEV_BADGE[selectedAlert.severity]}>{selectedAlert.severity.toUpperCase()}</Badge>
                        <Badge variant="slate">{selectedAlert.status}</Badge>
                        {selectedAlert.acknowledged && <Badge variant="emerald">Acknowledged</Badge>}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{selectedAlert.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{selectedAlert.category} · Detected {selectedAlert.detectedAt}</p>
                    </div>
                    <button onClick={() => setSelectedAlert(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-4 h-4" /></button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl">
                    {[
                      ['Affected', selectedAlert.affectedGroup],
                      ['Metric', selectedAlert.metric],
                      ['Threshold', selectedAlert.threshold],
                      ['Observed', selectedAlert.observed],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <p className="text-[10px] font-semibold text-slate-400 uppercase">{k}</p>
                        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{v}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Impact</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{selectedAlert.impact}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Recommended Action</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{selectedAlert.recommendedAction}</p>
                  </div>
                  {selectedAlert.notes && (
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Notes</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{selectedAlert.notes}</p>
                    </div>
                  )}
                  {selectedAlert.status === 'Resolved' && selectedAlert.resolution && (
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-xl">
                      <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">{selectedAlert.resolution}</p>
                    </div>
                  )}

                  {/* Notes input */}
                  <div className="flex gap-2">
                    <input value={noteInput} onChange={(e) => setNoteInput(e.target.value)} placeholder="Add a note..."
                      className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    <button onClick={() => addNoteToAlert(selectedAlert.id)} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 cursor-pointer">
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Assign input */}
                  {selectedAlert.status !== 'Resolved' && (
                    <div className="flex gap-2">
                      <input value={assignInput} onChange={(e) => setAssignInput(e.target.value)} placeholder="Assign to (name)..."
                        className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                      <button onClick={() => assignAlert(selectedAlert.id, assignInput)} className="px-3 py-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-xs font-semibold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-200 cursor-pointer">
                        <UserCheck className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2">
                    {selectedAlert.status !== 'Resolved' && !selectedAlert.acknowledged && (
                      <button onClick={() => ackAlert(selectedAlert.id)} className="flex-1 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/40 text-xs font-semibold text-blue-700 dark:text-blue-400 hover:bg-blue-100 cursor-pointer flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Acknowledge
                      </button>
                    )}
                    {selectedAlert.status !== 'Resolved' && (
                      <>
                        <button onClick={() => createTaskFromAlert(selectedAlert)} className="flex-1 px-3 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/40 text-xs font-semibold text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 cursor-pointer flex items-center justify-center gap-1.5">
                          <Plus className="w-3.5 h-3.5" /> Create Task
                        </button>
                        <button onClick={() => resolveAlert(selectedAlert.id)} className="flex-1 px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 cursor-pointer flex items-center justify-center gap-1.5">
                          <CheckCheck className="w-3.5 h-3.5" /> Resolve
                        </button>
                      </>
                    )}
                    <Link to={selectedAlert.modulePath} className="flex-1 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 cursor-pointer flex items-center justify-center gap-1.5">
                      <ArrowRight className="w-3.5 h-3.5" /> Open Module
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* TAB: ACTIONS                                                        */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      {tab === 'actions' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-wrap gap-3 items-center">
            <Filter className="w-4 h-4 text-slate-400" />
            <select value={actionFilter} onChange={(e) => setActionFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer">
              <option value="">All Statuses</option>
              {['Open', 'Assigned', 'In Progress', 'Blocked', 'Resolved'].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <span className="ml-auto text-xs text-slate-400">{actions.filter((a) => !actionFilter || a.status === actionFilter).length} tasks</span>
          </div>

          <div className="space-y-3">
            {actions.filter((a) => !actionFilter || a.status === actionFilter).map((act) => {
              const isOverdue = new Date(act.dueDate) < new Date() && act.status !== 'Resolved'
              return (
                <div key={act.id} className={`bg-white dark:bg-[#131B2E] border rounded-2xl p-4 shadow-xs ${isOverdue ? 'border-rose-300 dark:border-rose-800' : 'border-slate-200 dark:border-slate-800'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${act.priority === 'critical' ? 'bg-rose-500' : act.priority === 'high' ? 'bg-amber-400' : act.priority === 'medium' ? 'bg-blue-400' : 'bg-slate-400'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{act.title}</p>
                        {isOverdue && <Badge variant="rose">OVERDUE</Badge>}
                      </div>
                      <p className="text-[11px] text-slate-500 mb-2">{act.description}</p>
                      <div className="flex flex-wrap gap-3 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1"><UserCheck className="w-3 h-3" />{act.assignedTo}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Due: {act.dueDate}</span>
                        <span className={`font-semibold ${ACT_STATUS_COLOR[act.status]}`}>{act.status}</span>
                      </div>
                      {act.notes && <p className="text-[11px] text-slate-400 mt-1 italic">{act.notes}</p>}
                    </div>
                    <select value={act.status} onChange={(e) => updateActionStatus(act.id, e.target.value as ActionStatus)}
                      className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[11px] focus:outline-none cursor-pointer shrink-0">
                      {['Open', 'Assigned', 'In Progress', 'Blocked', 'Resolved'].map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* TAB: REPORTS                                                        */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      {tab === 'reports' && (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Attendance Report */}
            <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2"><Users className="w-4 h-4 text-indigo-500" />Attendance Overview</h3>
                <ExportButton filename="attendance_report" data={[{ metric: 'Average Attendance', value: '92.3%' }]} label="Export" />
              </div>
              {[
                { label: 'Primary (I–V)', value: 96, color: 'bg-emerald-500' },
                { label: 'Middle (VI–VIII)', value: 94, color: 'bg-indigo-500' },
                { label: 'Secondary (IX–X)', value: 91, color: 'bg-amber-400' },
                { label: 'Senior Sec (XI–XII)', value: 87, color: 'bg-rose-400' },
              ].map((r) => (
                <div key={r.label} className="mb-3">
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1"><span>{r.label}</span><span className="font-semibold">{r.value}%</span></div>
                  <MiniBar value={r.value} max={100} color={r.color} />
                </div>
              ))}
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                Overall campus average: <span className="font-bold text-slate-800 dark:text-white">92.3%</span> · Target: 95%
              </div>
            </div>

            {/* Academic Performance */}
            <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-purple-500" />Academic Performance</h3>
                <ExportButton filename="academic_report" data={students.map((s) => ({ name: s.name, grade: s.academicGrade }))} label="Export" />
              </div>
              {[
                { label: 'Grade A (≥80%)', count: students.filter((s) => parseFloat(s.academicGrade || '0') >= 80).length, color: 'bg-emerald-500' },
                { label: 'Grade B (60–79%)', count: students.filter((s) => { const g = parseFloat(s.academicGrade || '0'); return g >= 60 && g < 80 }).length, color: 'bg-indigo-500' },
                { label: 'Grade C (40–59%)', count: students.filter((s) => { const g = parseFloat(s.academicGrade || '0'); return g >= 40 && g < 60 }).length, color: 'bg-amber-400' },
                { label: 'At Risk (<40%)', count: atRiskStudents, color: 'bg-rose-500' },
              ].map((r) => (
                <div key={r.label} className="mb-3">
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-1"><span>{r.label}</span><span className="font-semibold">{r.count} students</span></div>
                  <MiniBar value={r.count} max={students.length} color={r.color} />
                </div>
              ))}
              {atRiskStudents > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold">{atRiskStudents} student{atRiskStudents !== 1 ? 's' : ''} flagged for remedial support</p>
                </div>
              )}
            </div>

            {/* Fee Report */}
            <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2"><DollarSign className="w-4 h-4 text-emerald-500" />Fee Analysis</h3>
                <ExportButton filename="fee_report" data={students.map((s) => ({ name: s.name, feePaid: s.feePaid, feePending: s.feePending }))} label="Export" />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: 'Total Collected', value: `₹${(students.reduce((s, st) => s + (st.feePaid || 0), 0) / 100000).toFixed(1)}L`, color: 'text-emerald-600' },
                  { label: 'Outstanding', value: `₹${(feePendingTotal / 100000).toFixed(1)}L`, color: 'text-rose-600' },
                  { label: 'Fully Paid', value: students.filter((s) => s.feePaid === s.feeTotal).length, color: 'text-indigo-600' },
                  { label: 'Overdue (>90d)', value: 3, color: 'text-rose-600' },
                ].map((r) => (
                  <div key={r.label} className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl">
                    <p className="text-[10px] text-slate-400">{r.label}</p>
                    <p className={`text-lg font-extrabold ${r.color}`}>{r.value}</p>
                  </div>
                ))}
              </div>
              {[
                { label: 'Jul 2025', value: 98 }, { label: 'Aug 2025', value: 95 },
                { label: 'Sep 2025', value: 92 }, { label: 'Oct 2025', value: 81 },
              ].map((r) => (
                <div key={r.label} className="mb-2">
                  <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400 mb-0.5"><span>{r.label}</span><span className="font-semibold">{r.value}%</span></div>
                  <MiniBar value={r.value} max={100} color={r.value < 90 ? 'bg-rose-400' : 'bg-emerald-500'} />
                </div>
              ))}
            </div>

            {/* Standard Reports Links */}
            <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-4"><FileText className="w-4 h-4 text-slate-500" />Standard Reports</h3>
              <div className="space-y-2">
                {[
                  { label: 'Monthly Attendance Report', module: 'rfid-attendance' },
                  { label: 'Term Fee Collection Statement', module: 'finance' },
                  { label: 'Academic Progress Report', module: 'academics' },
                  { label: 'Transport Activity Log', module: 'transport' },
                  { label: 'Library Circulation Report', module: 'library' },
                  { label: 'Hostel Permission Audit', module: 'hostel' },
                  { label: 'Inventory & Purchase Report', module: 'inventory' },
                ].map((r) => (
                  <Link key={r.label} to={`/app/${r.module}`} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{r.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* TAB: THRESHOLDS                                                     */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      {tab === 'thresholds' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-5">
            <Settings className="w-4 h-4 text-indigo-500" />
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Alert Threshold Configuration</h2>
            <span className="ml-auto text-xs text-slate-400">{thresholds.filter((t) => t.enabled).length} of {thresholds.length} enabled</span>
          </div>
          <div className="space-y-3">
            {thresholds.map((thr) => (
              <div key={thr.id} className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${thr.enabled ? 'bg-slate-50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800' : 'bg-white dark:bg-[#131B2E] border-slate-100 dark:border-slate-800/50 opacity-60'}`}>
                <button onClick={() => {
                  setThresholds((prev) => prev.map((t) => t.id === thr.id ? { ...t, enabled: !t.enabled } : t))
                  showToast(`Rule ${thr.enabled ? 'disabled' : 'enabled'}: ${thr.metric}`, 'info')
                }} className="mt-0.5 cursor-pointer">
                  {thr.enabled
                    ? <ToggleRight className="w-5 h-5 text-emerald-500" />
                    : <ToggleLeft className="w-5 h-5 text-slate-400" />}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{thr.metric}</p>
                    <Badge variant={SEV_BADGE[thr.severity]}>{thr.severity}</Badge>
                    <Badge variant="slate">{thr.category}</Badge>
                  </div>
                  <p className="text-[11px] text-slate-500">{thr.description}</p>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">
                    Alert when: <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{thr.metric} {thr.operator} {thr.threshold} {thr.unit}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-xl flex items-start gap-2">
            <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <p className="text-xs text-indigo-700 dark:text-indigo-300">Threshold rules are evaluated against live module data every 15 minutes. Changes take effect at the next evaluation cycle. Contact SAC Admin to add custom rules.</p>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════ */}
      {/* TAB: AI BRIEFING                                                    */}
      {/* ════════════════════════════════════════════════════════════════════ */}
      {tab === 'ai' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-indigo-50 to-teal-50 dark:from-indigo-950/30 dark:to-teal-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-500 flex items-center justify-center">
                <Sparkles className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">AI Executive Briefing — {institution.name}</h2>
                <p className="text-[11px] text-slate-500">Rule-based analysis · Generated {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} today</p>
              </div>
              <Badge variant="teal" dot>Live Analysis</Badge>
            </div>

            {/* Section 1: Status Summary */}
            <div className="mb-4 p-4 bg-white/70 dark:bg-slate-900/40 rounded-xl border border-white dark:border-slate-700/50">
              <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">1. Today's Campus Status</p>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Good morning. Campus attendance is at <span className="font-semibold">{92}%</span> with a critical flag in <span className="font-semibold text-rose-600">Class XII-B (61.4%)</span> — this requires immediate class-teacher action.
                {criticalCount > 0 && ` ${criticalCount} critical alert${criticalCount > 1 ? 's are' : ' is'} open and unresolved.`}
                {' '}Fee collection stands at <span className={feePendingTotal > 500000 ? 'font-semibold text-amber-600' : 'font-semibold text-emerald-600'}>81% of October target</span>, with ₹{(feePendingTotal / 100000).toFixed(1)}L outstanding.
                {' '}{pendingApprovals} approval{pendingApprovals !== 1 ? 's are' : ' is'} pending in the queue.
              </p>
            </div>

            {/* Section 2: Exceptions requiring action */}
            <div className="mb-4 p-4 bg-white/70 dark:bg-slate-900/40 rounded-xl border border-white dark:border-slate-700/50">
              <p className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-2">2. Exceptions Requiring Immediate Action</p>
              <div className="space-y-2">
                {openAlerts.filter((a) => a.severity === 'critical' || a.severity === 'high').map((a) => (
                  <div key={a.id} className="flex items-start gap-2">
                    <AlertCircle className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${a.severity === 'critical' ? 'text-rose-500' : 'text-amber-500'}`} />
                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      <span className="font-semibold">[{a.severity.toUpperCase()}]</span> {a.title}. {a.recommendedAction.split('.')[0]}.
                    </p>
                  </div>
                ))}
                {openAlerts.filter((a) => a.severity === 'critical' || a.severity === 'high').length === 0 && (
                  <p className="text-xs text-emerald-700 dark:text-emerald-400">No critical or high-severity exceptions at this time. Campus is operating within normal parameters.</p>
                )}
              </div>
            </div>

            {/* Section 3: Predictive insights */}
            <div className="mb-4 p-4 bg-white/70 dark:bg-slate-900/40 rounded-xl border border-white dark:border-slate-700/50">
              <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">3. Predictive Risk Flags</p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <TrendingDown className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" />
                  <p className="text-xs text-slate-700 dark:text-slate-300">Fee collection has declined month-over-month (98% → 95% → 92% → 81%). If this trend continues, November target will fall below 75%. Proactive parent outreach recommended before cycle close.</p>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingDown className="w-3.5 h-3.5 mt-0.5 shrink-0 text-amber-500" />
                  <p className="text-xs text-slate-700 dark:text-slate-300">Senior Secondary attendance (87%) is trending below the 90% CBSE threshold. Board exam proximity (8 days to term-end) amplifies academic risk for this cohort.</p>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-500" />
                  <p className="text-xs text-slate-700 dark:text-slate-300">Library book returns have improved by 34% since automated recall SMS was enabled last month. Continue this workflow for NAAC evidence collection.</p>
                </div>
                {atRiskStudents > 0 && (
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-rose-500" />
                    <p className="text-xs text-slate-700 dark:text-slate-300">{atRiskStudents} student{atRiskStudents > 1 ? 's are' : ' is'} academically at-risk (below 40%). With term-end exams approaching, immediate remedial intervention is required to avoid detention or supplementary examination.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Section 4: Recommended priorities */}
            <div className="p-4 bg-white/70 dark:bg-slate-900/40 rounded-xl border border-white dark:border-slate-700/50">
              <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">4. Recommended Priorities for Today</p>
              <ol className="space-y-1.5 list-none">
                {[
                  { n: 1, text: 'Resolve Class XII-B attendance exception — notify parents and verify hostel roll call.', link: '/app/rfid-attendance' },
                  { n: 2, text: 'Approve emergency purchase order for exam stationery — stock exhaustion risk in 8 days.', link: '/app/inventory' },
                  { n: 3, text: 'Review and clear 4 pending staff leave requests to enable substitute planning.', link: '/app/approvals' },
                  { n: 4, text: 'Initiate fee overdue follow-up for 3 accounts with >90-day outstanding balances.', link: '/app/finance' },
                  { n: 5, text: 'Schedule remedial sessions for at-risk students before term-end examinations.', link: '/app/academics' },
                ].map((item) => (
                  <li key={item.n} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <span className="w-4 h-4 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{item.n}</span>
                    <span>{item.text} <Link to={item.link} className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">View →</Link></span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-3 pt-3 border-t border-indigo-100 dark:border-indigo-900/30 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-400">This briefing is generated using rule-based analysis of live module data. All insights are derived from configured thresholds and observable data patterns — not external AI models. No student data is transmitted outside the institution's environment.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
