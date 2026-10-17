import React, { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { INSTITUTIONS } from '../../data/tenants'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import {
  Building2, MapPin, Users, BookOpen, Calendar, Settings,
  Search, Plus, Eye, Edit2, CheckCircle2, AlertTriangle, Clock,
  X, ChevronDown, ChevronUp, FileText, Shield, Layers,
  Globe, Mail, Phone, Award, BarChart2, Sparkles, Send,
  Building, GraduationCap, Briefcase, ArrowRight, LayoutDashboard,
  Cpu, ClipboardList, GitBranch, CheckCheck, XCircle, Star,
  Archive, Lock, Download, Bell, ChevronRight, Hash, Info
} from 'lucide-react'
import {
  DEPARTMENTS, ACADEMIC_PROGRAMS, ACADEMIC_SEMESTERS,
  INSTITUTIONAL_POLICIES, ACCREDITATION_RECORDS, INSTITUTIONAL_DOCUMENTS,
  CALENDAR_EVENTS, INSTITUTIONAL_APPROVALS, ORG_HIERARCHY,
  Department, InstitutionalPolicy, AccreditationRecord,
  InstitutionalDocument, InstitutionalApproval, CalendarEvent
} from '../../data/institutionData'

// ─── Tab types ────────────────────────────────────────────────────────────────
type Tab = 'dashboard' | 'profile' | 'campuses' | 'departments' | 'programs'
  | 'calendar' | 'policies' | 'accreditation' | 'documents' | 'orgchart'
  | 'approvals' | 'ai'

// ─── Helpers ──────────────────────────────────────────────────────────────────
const inp = 'w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500'
const lbl = 'block text-[10px] font-semibold text-slate-500 uppercase mb-1'

const statusBadge = (s: string): 'emerald' | 'teal' | 'amber' | 'rose' | 'slate' | 'indigo' | 'purple' => {
  const m: Record<string, any> = {
    Published: 'teal', Active: 'emerald', Valid: 'emerald', Complete: 'emerald', Approved: 'emerald', Ongoing: 'teal',
    Draft: 'slate', Upcoming: 'indigo', Archived: 'slate', Inactive: 'slate', Completed: 'slate', 'Not Applicable': 'slate',
    'Under Review': 'amber', Pending: 'amber', 'Pending Renewal': 'amber', 'Partial': 'amber', 'Expiring Soon': 'amber', 'In Progress': 'amber',
    Expired: 'rose', Rejected: 'rose', Returned: 'rose', 'Not Submitted': 'rose',
    Confidential: 'rose', Restricted: 'amber', Internal: 'indigo', Public: 'teal',
  }
  return m[s] ?? 'slate'
}

const priorityColor: Record<string, string> = { Low: 'text-slate-500', Medium: 'text-amber-600', High: 'text-orange-600', Urgent: 'text-rose-600', Critical: 'text-rose-700' }

// ─── Modal: Add Department ────────────────────────────────────────────────────
const AddDepartmentModal: React.FC<{ onClose: () => void; onSave: (d: any) => void }> = ({ onClose, onSave }) => {
  const [form, setForm] = useState({ name: '', code: '', type: 'Academic', campus: 'Main Campus', hod: '', contact: '', email: '', description: '' })
  const u = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#131B2E] rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2"><Building className="w-4 h-4 text-indigo-600" /> Create Department</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-5 space-y-3">
          {[{ label: 'Department Name *', key: 'name', ph: 'e.g. Computer Science & Engineering' }, { label: 'Department Code *', key: 'code', ph: 'e.g. CSE' }, { label: 'Head of Department', key: 'hod', ph: 'Dr. Name' }, { label: 'Contact Number', key: 'contact', ph: '+91 44 XXXX XXXX' }, { label: 'Email', key: 'email', ph: 'dept@institution.edu.in' }].map(f => (
            <div key={f.key}>
              <label className={lbl}>{f.label}</label>
              <input value={form[f.key as keyof typeof form]} onChange={e => u(f.key, e.target.value)} placeholder={f.ph} className={inp} />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>Type</label>
              <select value={form.type} onChange={e => u('type', e.target.value)} className={inp}>
                {['Academic', 'Administrative', 'Support', 'Research'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={lbl}>Campus</label>
              <select value={form.campus} onChange={e => u('campus', e.target.value)} className={inp}>
                {['Main Campus', 'Engineering Block', 'Science Block'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className={lbl}>Description</label>
            <textarea value={form.description} onChange={e => u('description', e.target.value)} rows={3} placeholder="Department overview..." className={inp + ' resize-none'} />
          </div>
        </div>
        <div className="flex gap-2 justify-end p-5 border-t border-slate-100 dark:border-slate-800">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer hover:bg-slate-50">Cancel</button>
          <button onClick={() => { if (form.name && form.code) { onSave(form); onClose() } }} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Create Department</button>
        </div>
      </div>
    </div>
  )
}

// ─── Modal: Policy Detail ─────────────────────────────────────────────────────
const PolicyDetailModal: React.FC<{ policy: InstitutionalPolicy; onClose: () => void; onPublish: (id: string) => void; showToast: (m: string) => void }> = ({ policy, onClose, onPublish, showToast }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div className="bg-white dark:bg-[#131B2E] rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2"><FileText className="w-4 h-4 text-indigo-600" /> Policy Details</h2>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-4 h-4" /></button>
      </div>
      <div className="p-5 space-y-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <Badge variant={statusBadge(policy.status)}>{policy.status}</Badge>
            <Badge variant="indigo">{policy.category}</Badge>
            <Badge variant="slate">v{policy.version}</Badge>
          </div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{policy.title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{policy.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          {[['Owner', policy.owner], ['Department', policy.department], ['Approved By', policy.approvedBy], ['Effective Date', policy.effectiveDate], ['Review Date', policy.reviewDate], ['File Size', policy.fileSize], ['Last Updated', policy.lastUpdated], ['Acknowledged By', `${policy.acknowledgedBy} users`]].map(([k, v]) => (
            <div key={k} className="bg-slate-50 dark:bg-slate-900/40 rounded-lg p-2.5">
              <p className="text-[10px] font-bold text-slate-500 uppercase">{k}</p>
              <p className="text-slate-800 dark:text-slate-200 font-medium mt-0.5">{v}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          {policy.status === 'Under Review' && <button onClick={() => { onPublish(policy.id); onClose() }} className="flex-1 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Publish Policy</button>}
          <button onClick={() => { showToast('Downloading policy document...'); onClose() }} className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer flex items-center justify-center gap-1.5"><Download className="w-3.5 h-3.5" /> Download</button>
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer hover:bg-slate-50">Close</button>
        </div>
      </div>
    </div>
  </div>
)

// ═══════════════════════════════════════════════════════════════════════════════
// ─── TAB PANELS ──────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Dashboard Tab ────────────────────────────────────────────────────────────
const DashboardTab: React.FC<{ onNavigate: (t: Tab) => void; showToast: (m: string) => void }> = ({ onNavigate, showToast }) => {
  const { institution, students, staffList } = useApp()
  const activeDepts = DEPARTMENTS.filter(d => d.status === 'Active').length
  const activeProgs = ACADEMIC_PROGRAMS.filter(p => p.status === 'Active').length
  const pendingApprovals = INSTITUTIONAL_APPROVALS.filter(a => a.status === 'Pending').length
  const expiringDocs = INSTITUTIONAL_DOCUMENTS.filter(d => d.status === 'Expiring Soon').length
  const expiringAccred = ACCREDITATION_RECORDS.filter(a => a.status === 'Pending Renewal' || a.daysUntilExpiry < 180).length
  const currentSem = ACADEMIC_SEMESTERS.find(s => s.status === 'Ongoing')
  const upcomingEvents = CALENDAR_EVENTS.filter(e => e.priority === 'Critical' || e.priority === 'High').slice(0, 5)

  const completenessChecks = [
    { label: 'Institution Profile', complete: true, detail: 'All fields populated' },
    { label: 'Campus Information', complete: true, detail: `${institution.campuses.length} campus(es) configured` },
    { label: 'Department Setup', complete: activeDepts >= 5, detail: `${activeDepts} active departments` },
    { label: 'Academic Programs', complete: activeProgs >= 3, detail: `${activeProgs} programs registered` },
    { label: 'Academic Calendar', complete: !!currentSem, detail: currentSem ? `Ongoing: ${currentSem.name}` : 'No active semester' },
    { label: 'Policy Repository', complete: INSTITUTIONAL_POLICIES.filter(p => p.status === 'Published').length >= 3, detail: `${INSTITUTIONAL_POLICIES.filter(p => p.status === 'Published').length} published policies` },
    { label: 'Accreditation Records', complete: ACCREDITATION_RECORDS.filter(a => a.status === 'Active').length >= 2, detail: `${ACCREDITATION_RECORDS.filter(a => a.status === 'Active').length} active accreditations` },
    { label: 'Org Hierarchy', complete: ORG_HIERARCHY.length >= 5, detail: `${ORG_HIERARCHY.length} roles mapped` },
  ]
  const completedCount = completenessChecks.filter(c => c.complete).length
  const completeness = Math.round(completedCount / completenessChecks.length * 100)

  return (
    <div className="space-y-5">
      {/* KPI Row 1 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard title="Active Departments" value={activeDepts} subtext={`${DEPARTMENTS.filter(d => d.type === 'Academic').length} academic`} icon={Building} status="healthy" actionLabel="Manage" onAction={() => onNavigate('departments')} />
        <StatCard title="Academic Programs" value={activeProgs} subtext={`${ACADEMIC_PROGRAMS.filter(p => p.degree === 'B.Tech').length} B.Tech programs`} icon={GraduationCap} status="neutral" actionLabel="View All" onAction={() => onNavigate('programs')} />
        <StatCard title="Pending Approvals" value={pendingApprovals} subtext="Awaiting decision" icon={ClipboardList} status={pendingApprovals > 2 ? 'warning' : 'neutral'} actionLabel="Review" onAction={() => onNavigate('approvals')} />
        <StatCard title="Profile Completeness" value={`${completeness}%`} subtext={`${completedCount}/${completenessChecks.length} sections complete`} icon={CheckCircle2} status={completeness >= 90 ? 'healthy' : completeness >= 70 ? 'warning' : 'critical'} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard title="Total Students" value={students.length + 1240} subtext={`${institution.studentCount.toLocaleString()} enrolled`} icon={Users} status="healthy" />
        <StatCard title="Total Staff" value={staffList.length + 52} subtext={`${DEPARTMENTS.reduce((s, d) => s + d.facultyCount, 0)} teaching`} icon={Briefcase} status="healthy" />
        <StatCard title="Docs Expiring" value={expiringDocs} subtext="Renewal required" icon={AlertTriangle} status={expiringDocs > 0 ? 'warning' : 'healthy'} actionLabel="View Docs" onAction={() => onNavigate('documents')} />
        <StatCard title="Accreditation Alerts" value={expiringAccred} subtext="Renewal pending" icon={Award} status={expiringAccred > 0 ? 'critical' : 'healthy'} actionLabel="View" onAction={() => onNavigate('accreditation')} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Profile Completeness */}
        <div className="bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-teal-500" /> Profile Completeness</h3>
            <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">{completeness}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mb-4">
            <div className="bg-indigo-500 h-2 rounded-full transition-all" style={{ width: `${completeness}%` }} />
          </div>
          <div className="space-y-2">
            {completenessChecks.map(c => (
              <div key={c.label} className="flex items-center gap-2">
                {c.complete ? <CheckCheck className="w-3.5 h-3.5 text-teal-500 shrink-0" /> : <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">{c.label}</p>
                  <p className="text-[10px] text-slate-400">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2"><Calendar className="w-4 h-4 text-indigo-500" /> Key Upcoming Events</h3>
            <button onClick={() => onNavigate('calendar')} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">View All →</button>
          </div>
          <div className="space-y-2.5">
            {upcomingEvents.map(ev => (
              <div key={ev.id} className={`p-3 rounded-xl border ${ev.priority === 'Critical' ? 'bg-rose-50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/40' : 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/40'}`}>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{ev.title}</p>
                  <Badge variant={ev.priority === 'Critical' ? 'rose' : 'amber'}>{ev.priority}</Badge>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{ev.date} · {ev.responsible}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Accreditation at a Glance */}
        <div className="bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2"><Award className="w-4 h-4 text-amber-500" /> Accreditation Status</h3>
            <button onClick={() => onNavigate('accreditation')} className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">Details →</button>
          </div>
          <div className="space-y-2.5">
            {ACCREDITATION_RECORDS.map(acc => (
              <div key={acc.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{acc.body}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{acc.grade ? `Grade ${acc.grade} · ` : ''}{acc.validUntil}</p>
                </div>
                <Badge variant={statusBadge(acc.status)}>{acc.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions + Dept Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2"><Cpu className="w-4 h-4 text-teal-500" /> Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Edit Institution Profile', icon: Edit2, color: 'bg-indigo-600 hover:bg-indigo-700', tab: 'profile' },
              { label: 'Manage Departments', icon: Building, color: 'bg-teal-600 hover:bg-teal-700', tab: 'departments' },
              { label: 'Academic Calendar', icon: Calendar, color: 'bg-amber-600 hover:bg-amber-700', tab: 'calendar' },
              { label: 'Policy Repository', icon: FileText, color: 'bg-purple-600 hover:bg-purple-700', tab: 'policies' },
              { label: 'Accreditation', icon: Award, color: 'bg-rose-600 hover:bg-rose-700', tab: 'accreditation' },
              { label: 'Document Store', icon: Archive, color: 'bg-slate-600 hover:bg-slate-700', tab: 'documents' },
              { label: 'Org Hierarchy', icon: GitBranch, color: 'bg-blue-600 hover:bg-blue-700', tab: 'orgchart' },
              { label: 'AI Institutional Intelligence', icon: Sparkles, color: 'bg-pink-600 hover:bg-pink-700', tab: 'ai' },
            ].map(a => (
              <button key={a.label} onClick={() => onNavigate(a.tab as Tab)}
                className={`${a.color} text-white text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center gap-2 cursor-pointer transition-all`}>
                <a.icon className="w-3.5 h-3.5" /> {a.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2"><BarChart2 className="w-4 h-4 text-indigo-500" /> Department-wise Strength</h3>
          <div className="space-y-2.5">
            {DEPARTMENTS.filter(d => d.facultyCount > 0 || d.studentCount > 0).map(dept => (
              <div key={dept.id} className="flex items-center gap-3">
                <p className="text-[11px] text-slate-700 dark:text-slate-300 w-32 shrink-0 truncate">{dept.code}</p>
                <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${Math.min(100, (dept.studentCount / 500) * 100)}%` }} />
                </div>
                <p className="text-[11px] text-slate-500 w-24 text-right shrink-0">{dept.studentCount} students · {dept.facultyCount} faculty</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Approvals Summary */}
      {INSTITUTIONAL_APPROVALS.filter(a => a.status === 'Pending').length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-amber-800 dark:text-amber-200 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Pending Administrative Approvals</h3>
            <button onClick={() => onNavigate('approvals')} className="text-xs font-semibold text-amber-700 dark:text-amber-300 hover:underline cursor-pointer">View All →</button>
          </div>
          <div className="space-y-2">
            {INSTITUTIONAL_APPROVALS.filter(a => a.status === 'Pending').map(ap => (
              <div key={ap.id} className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#131B2E] border border-amber-200 dark:border-amber-800">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{ap.title}</p>
                  <p className="text-[11px] text-slate-500">{ap.type} · Requested by {ap.requestedBy} · {ap.requestDate}</p>
                </div>
                <Badge variant={ap.priority === 'Urgent' ? 'rose' : ap.priority === 'High' ? 'amber' : 'slate'}>{ap.priority}</Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Profile Tab ───────────────────────────────────────────────────────────────
const ProfileTab: React.FC<{ showToast: (m: string) => void }> = ({ showToast }) => {
  const { institution, setInstitutionId } = useApp()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: institution.name, code: institution.code, type: institution.type === 'school' ? 'School' : 'College',
    established: '1998', affiliation: institution.boardOrUniversity, website: 'https://www.dpa.edu.in',
    email: 'info@dpa.edu.in', phone: '+91 44 2345 6700',
    address: 'NH-48, Tambaram', city: 'Chennai', state: 'Tamil Nadu', country: 'India', pincode: '600045',
    description: 'Delhi Public Academy is a premier educational institution committed to holistic development of students through academic excellence, innovation, and value-based education.',
    vision: 'To be a globally recognized centre of excellence in education, research, and innovation.',
    mission: 'To nurture technically competent, ethically grounded, and socially responsible professionals.',
    principal: 'Dr. Anand Krishnamurthy', website2: '', twitter: '', linkedin: ''
  })
  const u = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2"><Building2 className="w-4 h-4 text-indigo-500" /> Institutional Profile</h3>
          <div className="flex items-center gap-2">
            {!editing
              ? <button onClick={() => setEditing(true)} className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5"><Edit2 className="w-3.5 h-3.5" /> Edit Profile</button>
              : <>
                <button onClick={() => { showToast('Institutional profile saved successfully!'); setEditing(false) }} className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Save Changes</button>
                <button onClick={() => setEditing(false)} className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs font-semibold cursor-pointer hover:bg-slate-50">Cancel</button>
              </>
            }
          </div>
        </div>

        {/* Logo + Mode Switcher */}
        <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-teal-500 flex items-center justify-center shadow-lg shrink-0">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-base font-extrabold text-slate-900 dark:text-white">{institution.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{institution.code} · {institution.type === 'school' ? 'K-12 School' : 'Degree College'} · Est. 1998</p>
            <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5 italic">"{institution.tagline}"</p>
          </div>
          <div className="flex flex-col gap-1.5 shrink-0">
            {INSTITUTIONS.map(inst => (
              <button key={inst.id} onClick={() => setInstitutionId(inst.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${inst.id === institution.id ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300'}`}>
                {inst.type === 'school' ? '🏫 School Mode' : '🎓 College Mode'}
              </button>
            ))}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Official Institution Name', key: 'name' }, { label: 'Institution Code', key: 'code' },
            { label: 'Year of Establishment', key: 'established' }, { label: 'Affiliation / University', key: 'affiliation' },
            { label: 'Official Website', key: 'website' }, { label: 'Official Email', key: 'email' },
            { label: 'Contact Number', key: 'phone' }, { label: 'Principal / Head', key: 'principal' },
          ].map(f => (
            <div key={f.key}>
              <label className={lbl}>{f.label}</label>
              <input value={form[f.key as keyof typeof form]} onChange={e => u(f.key, e.target.value)} disabled={!editing} className={inp + (!editing ? ' opacity-70 cursor-default' : '')} />
            </div>
          ))}
        </div>

        <div className="mt-4">
          <label className={lbl}>Institution Type</label>
          {editing
            ? <select value={form.type} onChange={e => u('type', e.target.value)} className={inp + ' max-w-xs'}>
              {['School', 'College', 'University', 'Deemed University', 'Other'].map(t => <option key={t}>{t}</option>)}
            </select>
            : <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">{form.type}</p>
          }
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={lbl}>Description</label>
            <textarea value={form.description} onChange={e => u('description', e.target.value)} disabled={!editing} rows={3} className={inp + ' resize-none' + (!editing ? ' opacity-70 cursor-default' : '')} />
          </div>
          <div className="space-y-3">
            <div>
              <label className={lbl}>Vision</label>
              <textarea value={form.vision} onChange={e => u('vision', e.target.value)} disabled={!editing} rows={2} className={inp + ' resize-none' + (!editing ? ' opacity-70 cursor-default' : '')} />
            </div>
            <div>
              <label className={lbl}>Mission</label>
              <textarea value={form.mission} onChange={e => u('mission', e.target.value)} disabled={!editing} rows={2} className={inp + ' resize-none' + (!editing ? ' opacity-70 cursor-default' : '')} />
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[{ label: 'Address', key: 'address' }, { label: 'City', key: 'city' }, { label: 'State', key: 'state' }, { label: 'Pin Code', key: 'pincode' }].map(f => (
            <div key={f.key}>
              <label className={lbl}>{f.label}</label>
              <input value={form[f.key as keyof typeof form]} onChange={e => u(f.key, e.target.value)} disabled={!editing} className={inp + (!editing ? ' opacity-70 cursor-default' : '')} />
            </div>
          ))}
        </div>

        <p className="text-[10px] text-slate-400 mt-4">Last updated: 15 Oct 2025 · Changes require approval before taking effect on public pages.</p>
      </div>
    </div>
  )
}

// ─── Campuses Tab ─────────────────────────────────────────────────────────────
const CampusesTab: React.FC<{ showToast: (m: string) => void }> = ({ showToast }) => {
  const { institution } = useApp()
  const [addModal, setAddModal] = useState(false)
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2"><MapPin className="w-4 h-4 text-teal-500" /> Campus & Branch Management</h3>
          <button onClick={() => setAddModal(true)} className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Add Campus</button>
        </div>
        {addModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-[#131B2E] rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-700 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">Add New Campus</h2>
                <button onClick={() => setAddModal(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-4 h-4" /></button>
              </div>
              <div className="space-y-3">
                {[{ label: 'Campus Name *', ph: 'e.g. North Campus' }, { label: 'Campus Code', ph: 'NCC' }, { label: 'Location / Address', ph: 'Full address' }, { label: 'Campus Administrator', ph: 'Name' }, { label: 'Contact', ph: '+91 44 XXXX XXXX' }].map(f => (
                  <div key={f.label}>
                    <label className={lbl}>{f.label}</label>
                    <input placeholder={f.ph} className={inp} />
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <button onClick={() => { showToast('New campus added successfully!'); setAddModal(false) }} className="flex-1 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold cursor-pointer">Add Campus</button>
                <button onClick={() => setAddModal(false)} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-400 cursor-pointer">Cancel</button>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {institution.campuses.map(campus => (
            <div key={campus.id} className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-teal-300 dark:hover:border-teal-700 transition-all bg-slate-50 dark:bg-slate-900/40">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/40 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{campus.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{campus.location}</p>
                  </div>
                </div>
                <Badge variant="teal">Active</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white dark:bg-slate-800 rounded-lg p-2">
                  <p className="text-[10px] font-bold text-slate-500">Students</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{Math.floor(Math.random() * 800 + 600).toLocaleString()}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-lg p-2">
                  <p className="text-[10px] font-bold text-slate-500">Staff</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{Math.floor(Math.random() * 80 + 40)}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button onClick={() => showToast(`Viewing ${campus.name} details...`)} className="flex-1 py-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-[11px] font-semibold cursor-pointer hover:bg-indigo-200">View Details</button>
                <button onClick={() => showToast(`Editing ${campus.name}...`)} className="flex-1 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold cursor-pointer hover:bg-slate-200">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Departments Tab ───────────────────────────────────────────────────────────
const DepartmentsTab: React.FC<{ showToast: (m: string) => void }> = ({ showToast }) => {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [addModal, setAddModal] = useState(false)
  const [depts, setDepts] = useState(DEPARTMENTS)
  const [selected, setSelected] = useState<Department | null>(null)

  const filtered = depts.filter(d => {
    const q = search.toLowerCase()
    const matchQ = !q || d.name.toLowerCase().includes(q) || d.code.toLowerCase().includes(q) || d.hod.toLowerCase().includes(q)
    const matchType = typeFilter === 'All' || d.type === typeFilter
    return matchQ && matchType
  })

  return (
    <div className="space-y-4">
      {addModal && <AddDepartmentModal onClose={() => setAddModal(false)} onSave={d => { setDepts(p => [{ id: `DEPT-${Date.now()}`, ...d, facultyCount: 0, studentCount: 0, programs: [], established: new Date().toISOString().split('T')[0], status: 'Active', description: d.description || '' }, ...p]); showToast(`Department "${d.name}" created!`) }} />}

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#131B2E] rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">{selected.name}</h2>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant={statusBadge(selected.status)}>{selected.status}</Badge>
                <Badge variant={selected.type === 'Academic' ? 'indigo' : selected.type === 'Administrative' ? 'amber' : selected.type === 'Research' ? 'purple' : 'slate'}>{selected.type}</Badge>
                <Badge variant="slate">{selected.code}</Badge>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">{selected.description}</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {[['HOD', selected.hod], ['Campus', selected.campus], ['Contact', selected.contact], ['Email', selected.email], ['Established', selected.established], ['Programs', selected.programs.join(', ') || '—']].map(([k, v]) => (
                  <div key={k} className="bg-slate-50 dark:bg-slate-900/40 rounded-lg p-2.5">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">{k}</p>
                    <p className="text-slate-800 dark:text-slate-200 font-medium mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-indigo-50 dark:bg-indigo-950/20 rounded-xl p-3 text-center">
                  <p className="text-xl font-extrabold text-indigo-700 dark:text-indigo-300">{selected.facultyCount}</p>
                  <p className="text-[10px] text-slate-500">Faculty Members</p>
                </div>
                <div className="bg-teal-50 dark:bg-teal-950/20 rounded-xl p-3 text-center">
                  <p className="text-xl font-extrabold text-teal-700 dark:text-teal-300">{selected.studentCount}</p>
                  <p className="text-[10px] text-slate-500">Students</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { showToast(`Editing ${selected.name}...`); setSelected(null) }} className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer">Edit Department</button>
                {selected.status === 'Active' && <button onClick={() => { setDepts(p => p.map(d => d.id === selected.id ? { ...d, status: 'Inactive' as any } : d)); showToast('Department deactivated. Historical records preserved.'); setSelected(null) }} className="px-3 py-2 rounded-lg border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-semibold cursor-pointer hover:bg-rose-50">Deactivate</button>}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2"><Building className="w-4 h-4 text-indigo-500" /> Departments ({filtered.length})</h3>
          <div className="flex items-center gap-2">
            <ExportButton filename="departments" data={DEPARTMENTS.map(d => ({ name: d.name, code: d.code, type: d.type, hod: d.hod, faculty: d.facultyCount, students: d.studentCount, status: d.status }))} label="Export" />
            <button onClick={() => setAddModal(true)} className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Add Department</button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search department, code, HOD..." className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200" />
          </div>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {['All', 'Academic', 'Administrative', 'Support', 'Research'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                {['Code', 'Department Name', 'Type', 'HOD', 'Faculty', 'Students', 'Programs', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left py-2 px-3 text-slate-500 dark:text-slate-400 font-semibold uppercase text-[10px] tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(dept => (
                <tr key={dept.id} className="border-b border-slate-50 dark:border-slate-900 hover:bg-slate-50 dark:hover:bg-slate-900/40 cursor-pointer" onClick={() => setSelected(dept)}>
                  <td className="py-2.5 px-3 font-mono text-[11px] font-bold text-indigo-700 dark:text-indigo-400">{dept.code}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200 max-w-[180px] truncate">{dept.name}</td>
                  <td className="py-2.5 px-3"><Badge variant={dept.type === 'Academic' ? 'indigo' : dept.type === 'Research' ? 'purple' : dept.type === 'Administrative' ? 'amber' : 'slate'}>{dept.type}</Badge></td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400 max-w-[130px] truncate">{dept.hod || '—'}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-200">{dept.facultyCount || '—'}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-200">{dept.studentCount || '—'}</td>
                  <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">{dept.programs.length || '—'}</td>
                  <td className="py-2.5 px-3"><Badge variant={statusBadge(dept.status)}>{dept.status}</Badge></td>
                  <td className="py-2.5 px-3"><button onClick={e => { e.stopPropagation(); setSelected(dept) }} className="px-2 py-1 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-[10px] font-semibold cursor-pointer hover:bg-indigo-200">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <p className="text-center text-xs text-slate-400 py-8">No departments match your search.</p>}
        </div>
      </div>
    </div>
  )
}

// ─── Programs Tab ──────────────────────────────────────────────────────────────
const ProgramsTab: React.FC<{ showToast: (m: string) => void }> = ({ showToast }) => {
  const [programs] = useState(ACADEMIC_PROGRAMS)
  const [semesters, setSemesters] = useState(ACADEMIC_SEMESTERS)
  const [view, setView] = useState<'programs' | 'semesters'>('programs')

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setView('programs')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${view === 'programs' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>Academic Programs</button>
        <button onClick={() => setView('semesters')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${view === 'semesters' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>Semesters & Academic Years</button>
      </div>

      {view === 'programs' && (
        <div className="bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-purple-500" /> Academic Programs ({programs.length})</h3>
            <div className="flex gap-2">
              <ExportButton filename="academic_programs" data={programs.map(p => ({ name: p.name, code: p.code, degree: p.degree, dept: p.department, seats: p.totalSeats, enrolled: p.currentEnrollment, status: p.status }))} label="Export" />
              <button onClick={() => showToast('New program creation form...')} className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> New Program</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Program', 'Code', 'Degree', 'Dept', 'Duration', 'Seats', 'Enrolled', 'Semesters', 'Affiliation', 'Accredited By', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 px-3 text-slate-500 dark:text-slate-400 font-semibold uppercase text-[10px] tracking-wide whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {programs.map(prog => (
                  <tr key={prog.id} className="border-b border-slate-50 dark:border-slate-900 hover:bg-slate-50 dark:hover:bg-slate-900/40">
                    <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200 max-w-[200px]">{prog.name}</td>
                    <td className="py-2.5 px-3 font-mono text-[10px] text-indigo-600 dark:text-indigo-400">{prog.code}</td>
                    <td className="py-2.5 px-3"><Badge variant="indigo">{prog.degree}</Badge></td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">{prog.department}</td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">{prog.duration}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-800 dark:text-slate-200">{prog.totalSeats}</td>
                    <td className="py-2.5 px-3 font-bold text-teal-600 dark:text-teal-400">{prog.currentEnrollment}</td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">{prog.semesterCount || 'Flexible'}</td>
                    <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400 max-w-[120px] truncate">{prog.affiliation}</td>
                    <td className="py-2.5 px-3"><Badge variant="amber">{prog.accreditedBy}</Badge></td>
                    <td className="py-2.5 px-3"><Badge variant={statusBadge(prog.status)}>{prog.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {view === 'semesters' && (
        <div className="space-y-3">
          {semesters.map(sem => (
            <div key={sem.id} className={`bg-white dark:bg-[#131B2E] rounded-2xl border p-5 ${sem.status === 'Ongoing' ? 'border-teal-300 dark:border-teal-700' : 'border-slate-200 dark:border-slate-800'}`}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{sem.name}</p>
                    <Badge variant={statusBadge(sem.status)}>{sem.status}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Academic Year: {sem.academicYear}</p>
                </div>
                {sem.status === 'Ongoing' && <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse" />}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[['Start Date', sem.startDate], ['End Date', sem.endDate], ['Exam Start', sem.examStart], ['Results', sem.resultDate]].map(([k, v]) => (
                  <div key={k} className="bg-slate-50 dark:bg-slate-900/40 rounded-xl p-3 text-xs">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">{k}</p>
                    <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">Programs: {sem.programs.join(', ')}</p>
            </div>
          ))}
          <button onClick={() => showToast('New semester configuration form...')} className="w-full py-3 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 hover:border-indigo-400 hover:text-indigo-600 cursor-pointer transition-colors flex items-center justify-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Configure New Semester</button>
        </div>
      )}
    </div>
  )
}

// ─── Calendar Tab ─────────────────────────────────────────────────────────────
const CalendarTab: React.FC<{ showToast: (m: string) => void }> = ({ showToast }) => {
  const [catFilter, setCatFilter] = useState('All')
  const [search, setSearch] = useState('')
  const categories = ['All', 'Academic', 'Examination', 'Holiday', 'Administrative', 'Accreditation', 'Event', 'Deadline']
  const catColors: Record<string, string> = { Academic: 'indigo', Examination: 'rose', Holiday: 'teal', Administrative: 'slate', Accreditation: 'amber', Event: 'emerald', Deadline: 'purple' }

  const filtered = CALENDAR_EVENTS.filter(e => {
    const q = search.toLowerCase()
    const matchQ = !q || e.title.toLowerCase().includes(q) || e.responsible.toLowerCase().includes(q)
    const matchCat = catFilter === 'All' || e.category === catFilter
    return matchQ && matchCat
  })

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2"><Calendar className="w-4 h-4 text-amber-500" /> Institutional Calendar</h3>
          <div className="flex gap-2">
            <ExportButton filename="institutional_calendar" data={CALENDAR_EVENTS.map(e => ({ title: e.title, date: e.date, category: e.category, priority: e.priority, responsible: e.responsible }))} label="Export" />
            <button onClick={() => showToast('Add event form...')} className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Add Event</button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events..." className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200" />
          </div>
          <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          {filtered.sort((a, b) => a.date.localeCompare(b.date)).map(ev => (
            <div key={ev.id} className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-all">
              <div className={`w-12 h-12 rounded-xl shrink-0 flex flex-col items-center justify-center bg-${catColors[ev.category] || 'slate'}-100 dark:bg-${catColors[ev.category] || 'slate'}-950/30`}>
                <p className="text-[10px] font-bold text-slate-500 uppercase">{new Date(ev.date).toLocaleString('en', { month: 'short' })}</p>
                <p className="text-base font-extrabold text-slate-800 dark:text-slate-200">{new Date(ev.date).getDate()}</p>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{ev.title}</p>
                  <Badge variant={statusBadge(ev.category) || 'slate'}>{ev.category}</Badge>
                  <span className={`text-[10px] font-bold ${priorityColor[ev.priority]}`}>{ev.priority}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{ev.description}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Responsible: {ev.responsible} · {ev.endDate ? `${ev.date} to ${ev.endDate}` : ev.date}</p>
              </div>
              <button onClick={() => showToast(`Editing event: ${ev.title}`)} className="text-slate-400 hover:text-indigo-600 cursor-pointer shrink-0"><Edit2 className="w-3.5 h-3.5" /></button>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-center text-xs text-slate-400 py-8">No events match your filter.</p>}
        </div>
      </div>
    </div>
  )
}

// ─── Policies Tab ─────────────────────────────────────────────────────────────
const PoliciesTab: React.FC<{ showToast: (m: string) => void }> = ({ showToast }) => {
  const [policies, setPolicies] = useState(INSTITUTIONAL_POLICIES)
  const [selected, setSelected] = useState<InstitutionalPolicy | null>(null)
  const [catFilter, setCatFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const cats = ['All', ...Array.from(new Set(INSTITUTIONAL_POLICIES.map(p => p.category)))]

  const filtered = policies.filter(p => {
    const matchCat = catFilter === 'All' || p.category === catFilter
    const matchStatus = statusFilter === 'All' || p.status === statusFilter
    return matchCat && matchStatus
  })

  return (
    <div className="space-y-4">
      {selected && <PolicyDetailModal policy={selected} onClose={() => setSelected(null)} onPublish={id => { setPolicies(p => p.map(pol => pol.id === id ? { ...pol, status: 'Published' as any } : pol)); showToast('Policy published successfully!') }} showToast={showToast} />}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Published', count: policies.filter(p => p.status === 'Published').length, color: 'teal' },
          { label: 'Under Review', count: policies.filter(p => p.status === 'Under Review').length, color: 'amber' },
          { label: 'Draft', count: policies.filter(p => p.status === 'Draft').length, color: 'slate' },
          { label: 'Archived', count: policies.filter(p => p.status === 'Archived').length, color: 'slate' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-[#131B2E] rounded-xl border border-slate-200 dark:border-slate-800 p-4 text-center">
            <p className="text-2xl font-extrabold text-slate-800 dark:text-slate-200">{s.count}</p>
            <p className="text-[10px] text-slate-500 font-semibold mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2"><FileText className="w-4 h-4 text-purple-500" /> Policy Repository</h3>
          <div className="flex gap-2">
            <ExportButton filename="policies" data={policies.map(p => ({ title: p.title, category: p.category, version: p.version, status: p.status, owner: p.owner, reviewDate: p.reviewDate }))} label="Export" />
            <button onClick={() => showToast('New policy form...')} className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Add Policy</button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {cats.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {['All', 'Published', 'Under Review', 'Draft', 'Archived'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          {filtered.map(pol => (
            <div key={pol.id} className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-purple-200 dark:hover:border-purple-700 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-all cursor-pointer" onClick={() => setSelected(pol)}>
              <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{pol.title}</p>
                  <Badge variant={statusBadge(pol.status)}>{pol.status}</Badge>
                  <Badge variant="slate">v{pol.version}</Badge>
                  <Badge variant="indigo">{pol.category}</Badge>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{pol.description}</p>
                <div className="flex items-center gap-4 mt-1 text-[10px] text-slate-400">
                  <span>Owner: {pol.owner}</span>
                  <span>Effective: {pol.effectiveDate}</span>
                  <span>Review: {pol.reviewDate}</span>
                  {pol.acknowledgedBy > 0 && <span>{pol.acknowledgedBy} acknowledged</span>}
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={e => { e.stopPropagation(); showToast(`Downloading ${pol.title}...`) }} className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-600 cursor-pointer"><Download className="w-3.5 h-3.5" /></button>
                <button onClick={e => { e.stopPropagation(); setSelected(pol) }} className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 hover:text-indigo-800 cursor-pointer"><Eye className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Accreditation Tab ─────────────────────────────────────────────────────────
const AccreditationTab: React.FC<{ showToast: (m: string) => void }> = ({ showToast }) => {
  const [records, setRecords] = useState(ACCREDITATION_RECORDS)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Active', count: records.filter(r => r.status === 'Active').length, status: 'healthy' },
          { label: 'Pending Renewal', count: records.filter(r => r.status === 'Pending Renewal').length, status: 'critical' },
          { label: 'Expired', count: records.filter(r => r.status === 'Expired').length, status: 'critical' },
          { label: 'Total Frameworks', count: records.length, status: 'neutral' },
        ].map(s => (
          <StatCard key={s.label} title={s.label} value={s.count} icon={Award} status={s.status as any} />
        ))}
      </div>

      <div className="bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2"><Award className="w-4 h-4 text-amber-500" /> Accreditation & Compliance Records</h3>
          <div className="flex gap-2">
            <ExportButton filename="accreditation" data={records.map(r => ({ body: r.body, framework: r.framework, status: r.status, grade: r.grade, validUntil: r.validUntil, daysLeft: r.daysUntilExpiry }))} label="Export" />
            <button onClick={() => showToast('Add accreditation record...')} className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Add Record</button>
          </div>
        </div>
        <div className="space-y-4">
          {records.map(acc => (
            <div key={acc.id} className={`p-5 rounded-xl border ${acc.status === 'Active' ? 'border-emerald-200 bg-emerald-50 dark:bg-emerald-950/10 dark:border-emerald-900/40' : acc.status === 'Pending Renewal' ? 'border-amber-200 bg-amber-50 dark:bg-amber-950/10 dark:border-amber-900/40' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40'}`}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-extrabold text-slate-800 dark:text-slate-200">{acc.body}</p>
                    {acc.grade && <Badge variant="emerald">Grade {acc.grade}</Badge>}
                    <Badge variant={statusBadge(acc.status)}>{acc.status}</Badge>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">{acc.framework} · Scope: {acc.scope}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-sm font-extrabold ${acc.daysUntilExpiry < 0 ? 'text-rose-600' : acc.daysUntilExpiry < 180 ? 'text-amber-600' : 'text-emerald-600'}`}>{acc.daysUntilExpiry < 0 ? `Expired ${Math.abs(acc.daysUntilExpiry)}d ago` : `${acc.daysUntilExpiry}d remaining`}</p>
                  <p className="text-[10px] text-slate-400">Valid until: {acc.validUntil}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                {[['Valid From', acc.validFrom], ['Valid Until', acc.validUntil], ['Next Review', acc.nextReview], ['Responsible', acc.responsibleDept]].map(([k, v]) => (
                  <div key={k} className="bg-white/70 dark:bg-slate-800/70 rounded-lg p-2 text-xs">
                    <p className="text-[10px] font-bold text-slate-500 uppercase">{k}</p>
                    <p className="font-medium text-slate-800 dark:text-slate-200 mt-0.5">{v}</p>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 italic mb-3">"{acc.remarks}"</p>
              <div className="flex items-center justify-between">
                <Badge variant={acc.evidenceStatus === 'Complete' ? 'emerald' : acc.evidenceStatus === 'Partial' ? 'amber' : 'rose'}>Evidence: {acc.evidenceStatus}</Badge>
                <div className="flex gap-2">
                  <button onClick={() => showToast('Uploading evidence...')} className="px-2 py-1 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-[10px] font-semibold cursor-pointer">Upload Evidence</button>
                  <button onClick={() => showToast('Generating compliance report...')} className="px-2 py-1 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-[10px] font-semibold cursor-pointer">Generate Report</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Documents Tab ─────────────────────────────────────────────────────────────
const DocumentsTab: React.FC<{ showToast: (m: string) => void }> = ({ showToast }) => {
  const [docs, setDocs] = useState(INSTITUTIONAL_DOCUMENTS)
  const [catFilter, setCatFilter] = useState('All')
  const [search, setSearch] = useState('')
  const cats = ['All', ...Array.from(new Set(INSTITUTIONAL_DOCUMENTS.map(d => d.category)))]

  const filtered = docs.filter(d => {
    const q = search.toLowerCase()
    const matchQ = !q || d.title.toLowerCase().includes(q) || d.category.toLowerCase().includes(q) || d.tags.some(t => t.toLowerCase().includes(q))
    const matchCat = catFilter === 'All' || d.category === catFilter
    return matchQ && matchCat
  })

  const accessColors: Record<string, string> = { Public: 'teal', Internal: 'indigo', Restricted: 'amber', Confidential: 'rose' }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Valid Documents', count: docs.filter(d => d.status === 'Valid').length, status: 'healthy' },
          { label: 'Expiring Soon', count: docs.filter(d => d.status === 'Expiring Soon').length, status: 'warning' },
          { label: 'Expired', count: docs.filter(d => d.status === 'Expired').length, status: 'critical' },
          { label: 'Total Documents', count: docs.length, status: 'neutral' },
        ].map(s => (
          <StatCard key={s.label} title={s.label} value={s.count} icon={Archive} status={s.status as any} />
        ))}
      </div>

      <div className="bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2"><Archive className="w-4 h-4 text-slate-500" /> Document Repository ({filtered.length})</h3>
          <div className="flex gap-2">
            <ExportButton filename="institution_documents" data={docs.map(d => ({ title: d.title, category: d.category, status: d.status, access: d.accessLevel, issued: d.issueDate, expiry: d.expiryDate || '—' }))} label="Export" />
            <button onClick={() => showToast('Upload document dialog...')} className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Upload Document</button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search documents, tags..." className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 dark:text-slate-200" />
          </div>
          <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {cats.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          {filtered.map(doc => (
            <div key={doc.id} className={`flex items-start gap-3 p-4 rounded-xl border transition-all hover:bg-slate-50 dark:hover:bg-slate-900/40 ${doc.status === 'Expiring Soon' ? 'border-amber-200 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/10' : 'border-slate-100 dark:border-slate-800'}`}>
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{doc.title}</p>
                  <Badge variant={statusBadge(doc.status)}>{doc.status}</Badge>
                  <Badge variant={accessColors[doc.accessLevel] as any}>{doc.accessLevel}</Badge>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">{doc.description}</p>
                <div className="flex items-center gap-4 mt-1 text-[10px] text-slate-400">
                  <span>{doc.category}</span>
                  <span>v{doc.version}</span>
                  <span>{doc.fileType} · {doc.fileSize}</span>
                  <span>Issued: {doc.issueDate}</span>
                  {doc.expiryDate && <span>Expires: {doc.expiryDate}</span>}
                  <span>By: {doc.uploadedBy}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {doc.tags.map(t => <Badge key={t} variant="slate">{t}</Badge>)}
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => showToast(`Downloading: ${doc.title}`)} className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 cursor-pointer hover:bg-indigo-200"><Download className="w-3.5 h-3.5" /></button>
                <button onClick={() => showToast(`Editing: ${doc.title}`)} className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-pointer hover:bg-slate-200"><Edit2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-center text-xs text-slate-400 py-8">No documents match your search.</p>}
        </div>
      </div>
    </div>
  )
}

// ─── Org Chart Tab ────────────────────────────────────────────────────────────
const OrgChartTab: React.FC<{ showToast: (m: string) => void }> = ({ showToast }) => {
  const levels = [1, 2, 3, 4]
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2"><GitBranch className="w-4 h-4 text-blue-500" /> Organizational Hierarchy</h3>
          <button onClick={() => showToast('Edit hierarchy...')} className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5"><Edit2 className="w-3.5 h-3.5" /> Edit</button>
        </div>
        {levels.map(level => {
          const nodes = ORG_HIERARCHY.filter(n => n.level === level)
          const levelLabels: Record<number, string> = { 1: 'Level 1 — Governing Board', 2: 'Level 2 — Institution Head', 3: 'Level 3 — Senior Leadership', 4: 'Level 4 — Department Heads & Officers' }
          return (
            <div key={level} className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                <p className="text-[10px] font-bold text-slate-500 uppercase whitespace-nowrap">{levelLabels[level]}</p>
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {nodes.map(node => {
                  const parent = node.reportsTo ? ORG_HIERARCHY.find(n => n.id === node.reportsTo) : null
                  const typeColors: Record<string, string> = { Leadership: 'indigo', Academic: 'teal', Administrative: 'amber', Support: 'slate' }
                  return (
                    <div key={node.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 hover:border-blue-300 dark:hover:border-blue-700 transition-all">
                      <div className="flex items-start gap-3">
                        <div className={`w-9 h-9 rounded-xl bg-${typeColors[node.type] || 'slate'}-100 dark:bg-${typeColors[node.type] || 'slate'}-950/40 flex items-center justify-center shrink-0`}>
                          <Users className={`w-4 h-4 text-${typeColors[node.type] || 'slate'}-600 dark:text-${typeColors[node.type] || 'slate'}-400`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{node.name}</p>
                          <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">{node.title}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">{node.department}</p>
                          {parent && <p className="text-[10px] text-slate-400 mt-0.5">Reports to: {parent.name}</p>}
                          <p className="text-[10px] text-slate-400">{node.email} · Since {node.since.split('-')[0]}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <Badge variant={typeColors[node.type] as any || 'slate'}>{node.type}</Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Approvals Tab ─────────────────────────────────────────────────────────────
const ApprovalsTab: React.FC<{ showToast: (m: string) => void }> = ({ showToast }) => {
  const [approvals, setApprovals] = useState(INSTITUTIONAL_APPROVALS)
  const update = (id: string, status: InstitutionalApproval['status'], notes?: string) => {
    setApprovals(p => p.map(a => a.id === id ? { ...a, status, reviewedDate: new Date().toISOString().split('T')[0], reviewNotes: notes } : a))
    showToast(`Approval ${status.toLowerCase()} successfully.`)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Pending', count: approvals.filter(a => a.status === 'Pending').length, status: 'warning' },
          { label: 'Approved', count: approvals.filter(a => a.status === 'Approved').length, status: 'healthy' },
          { label: 'Rejected', count: approvals.filter(a => a.status === 'Rejected').length, status: 'critical' },
          { label: 'Returned', count: approvals.filter(a => a.status === 'Returned').length, status: 'neutral' },
        ].map(s => (
          <StatCard key={s.label} title={s.label} value={s.count} icon={ClipboardList} status={s.status as any} />
        ))}
      </div>

      <div className="bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2"><ClipboardList className="w-4 h-4 text-amber-500" /> Administrative Approval Requests</h3>
          <ExportButton filename="approvals" data={approvals.map(a => ({ title: a.title, type: a.type, requestedBy: a.requestedBy, status: a.status, priority: a.priority, date: a.requestDate }))} label="Export" />
        </div>
        <div className="space-y-3">
          {approvals.map(ap => (
            <div key={ap.id} className={`p-4 rounded-xl border ${ap.status === 'Pending' ? 'border-amber-200 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/10' : ap.status === 'Approved' ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/10' : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40'}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{ap.title}</p>
                    <Badge variant={statusBadge(ap.status)}>{ap.status}</Badge>
                    <Badge variant={ap.priority === 'Urgent' ? 'rose' : ap.priority === 'High' ? 'amber' : 'slate'}>{ap.priority}</Badge>
                    <Badge variant="indigo">{ap.type}</Badge>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 italic">"{ap.description}"</p>
                  <div className="flex items-center gap-4 mt-1 text-[10px] text-slate-400">
                    <span>By: {ap.requestedBy} ({ap.department})</span>
                    <span>Date: {ap.requestDate}</span>
                    <span>Approver: {ap.approver}</span>
                  </div>
                  {ap.reviewNotes && <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 p-2 rounded-lg bg-white/70 dark:bg-slate-800/70">Decision note: "{ap.reviewNotes}"</p>}
                </div>
                {ap.status === 'Pending' && (
                  <div className="flex flex-col gap-1 shrink-0">
                    <button onClick={() => update(ap.id, 'Approved', 'Reviewed and approved by Principal.')} className="px-3 py-1 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-[10px] font-semibold cursor-pointer hover:bg-emerald-200">Approve</button>
                    <button onClick={() => update(ap.id, 'Rejected', 'Request does not meet current institutional requirements.')} className="px-3 py-1 rounded bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 text-[10px] font-semibold cursor-pointer hover:bg-rose-200">Reject</button>
                    <button onClick={() => update(ap.id, 'Returned', 'Please provide additional documentation.')} className="px-3 py-1 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-[10px] font-semibold cursor-pointer hover:bg-amber-200">Return</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── AI Tab ────────────────────────────────────────────────────────────────────
const AITab: React.FC<{ showToast: (m: string) => void }> = ({ showToast }) => {
  const { institution, students, staffList } = useApp()
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: `Hello! I'm the SAC Institutional Intelligence Assistant. I have access to your institutional profile, departments, programs, calendar, policies, accreditation records, and documents.\n\nTry asking:\n• *"How many active departments do we have?"*\n• *"Which accreditation records are expiring soon?"*\n• *"What are the pending institutional approvals?"*\n• *"Show current academic year configuration."*` }
  ])
  const [input, setInput] = useState('')

  const respond = (q: string): string => {
    const ql = q.toLowerCase()
    if (ql.includes('department')) {
      const active = DEPARTMENTS.filter(d => d.status === 'Active')
      return `🏛️ **Departments — ${institution.name}**\n\nTotal Active: **${active.length} departments**\n\n${active.map(d => `• **${d.code}** — ${d.name} (${d.type}) · HOD: ${d.hod || 'Not assigned'}`).join('\n')}\n\nAcademic: ${active.filter(d => d.type === 'Academic').length} · Administrative: ${active.filter(d => d.type === 'Administrative').length} · Support: ${active.filter(d => d.type === 'Support').length}`
    }
    if (ql.includes('accreditation') || ql.includes('expir')) {
      const expiring = ACCREDITATION_RECORDS.filter(r => r.status === 'Pending Renewal' || r.daysUntilExpiry < 365)
      return `⚠️ **Accreditation Status:**\n\n${ACCREDITATION_RECORDS.map(r => `• **${r.body}** — ${r.status}${r.grade ? ` (Grade ${r.grade})` : ''}\n  Valid until: ${r.validUntil} · ${r.daysUntilExpiry > 0 ? `${r.daysUntilExpiry} days remaining` : `Expired ${Math.abs(r.daysUntilExpiry)}d ago`}`).join('\n\n')}\n\n🚨 **Requires Immediate Attention:** NBA accreditation renewal is overdue.`
    }
    if (ql.includes('pending') || ql.includes('approval')) {
      const pending = INSTITUTIONAL_APPROVALS.filter(a => a.status === 'Pending')
      return `📋 **Pending Institutional Approvals (${pending.length})**\n\n${pending.map(a => `• **${a.title}**\n  Type: ${a.type} · Priority: ${a.priority}\n  Requested by: ${a.requestedBy} on ${a.requestDate}\n  Awaiting: ${a.approver}`).join('\n\n')}`
    }
    if (ql.includes('academic year') || ql.includes('semester')) {
      const current = ACADEMIC_SEMESTERS.find(s => s.status === 'Ongoing')
      const upcoming = ACADEMIC_SEMESTERS.find(s => s.status === 'Upcoming')
      return `📅 **Academic Year Configuration:**\n\n**Current Semester (Ongoing):**\n${current ? `• ${current.name}\n• ${current.academicYear}\n• Classes: ${current.startDate} to ${current.endDate}\n• Examinations: ${current.examStart} to ${current.examEnd}\n• Results: ${current.resultDate}` : '• No ongoing semester configured'}\n\n**Next Semester:**\n${upcoming ? `• ${upcoming.name} starts on ${upcoming.startDate}` : '• Not configured yet'}`
    }
    if (ql.includes('program') || ql.includes('course')) {
      const active = ACADEMIC_PROGRAMS.filter(p => p.status === 'Active')
      const totalSeats = active.reduce((s, p) => s + p.totalSeats, 0)
      const totalEnrolled = active.reduce((s, p) => s + p.currentEnrollment, 0)
      return `🎓 **Academic Programs:**\n\nActive Programs: **${active.length}**\nTotal Authorized Seats: **${totalSeats}**\nCurrent Enrollment: **${totalEnrolled}**\n\n${active.map(p => `• **${p.code}** — ${p.name} (${p.degree})\n  Seats: ${p.totalSeats} · Enrolled: ${p.currentEnrollment} · Accredited: ${p.accreditedBy}`).join('\n\n')}`
    }
    if (ql.includes('document') || ql.includes('expire')) {
      const expiring = INSTITUTIONAL_DOCUMENTS.filter(d => d.status === 'Expiring Soon')
      const expired = INSTITUTIONAL_DOCUMENTS.filter(d => d.status === 'Expired')
      return `📂 **Document Repository Status:**\n\nTotal Documents: **${INSTITUTIONAL_DOCUMENTS.length}**\nValid: ${INSTITUTIONAL_DOCUMENTS.filter(d => d.status === 'Valid').length} · Expiring Soon: **${expiring.length}** · Expired: **${expired.length}**\n\n${expiring.length > 0 ? `⚠️ **Expiring Soon:**\n${expiring.map(d => `• ${d.title}\n  Expires: ${d.expiryDate} · Category: ${d.category}`).join('\n')}` : '✅ All documents are within validity dates.'}`
    }
    if (ql.includes('policy') || ql.includes('policies')) {
      const pub = INSTITUTIONAL_POLICIES.filter(p => p.status === 'Published').length
      const review = INSTITUTIONAL_POLICIES.filter(p => p.status === 'Under Review').length
      const draft = INSTITUTIONAL_POLICIES.filter(p => p.status === 'Draft').length
      return `📜 **Policy Repository Summary:**\n\nTotal Policies: **${INSTITUTIONAL_POLICIES.length}**\n• Published: ${pub} · Under Review: ${review} · Draft: ${draft}\n\n${INSTITUTIONAL_POLICIES.filter(p => p.status === 'Draft' || p.status === 'Under Review').length > 0 ? `⚠️ **Action Required:**\n${INSTITUTIONAL_POLICIES.filter(p => p.status !== 'Published' && p.status !== 'Archived').map(p => `• "${p.title}" — ${p.status}`).join('\n')}` : '✅ All policies are up to date.'}`
    }
    if (ql.includes('student') || ql.includes('staff') || ql.includes('strength')) {
      return `👥 **Institutional Strength:**\n\nTotal Students: **${institution.studentCount.toLocaleString()}**\nTotal Staff: **${institution.staffCount}** (${DEPARTMENTS.reduce((s, d) => s + d.facultyCount, 0)} teaching)\n\nDepartment-wise breakdown:\n${DEPARTMENTS.filter(d => d.studentCount > 0).map(d => `• ${d.code}: ${d.studentCount} students, ${d.facultyCount} faculty`).join('\n')}`
    }
    return `I searched institutional records for: *"${q}"*\n\nNo direct match found. Try asking about:\n• Departments and academic programs\n• Accreditation and compliance status\n• Pending approvals and administrative tasks\n• Academic calendar and semester configuration\n• Document expiry and policy status\n• Institutional strength and statistics`
  }

  const send = () => {
    if (!input.trim()) return
    const msg = input.trim()
    setMessages(p => [...p, { role: 'user', text: msg }])
    setInput('')
    setTimeout(() => setMessages(p => [...p, { role: 'ai', text: respond(msg) }]), 400)
  }

  const suggestions = ['How many active departments?', 'Accreditation records expiring soon', 'Show pending approvals', 'Current academic year configuration', 'Document expiry status', 'Academic programs summary']

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { title: '⚠ NBA Renewal', desc: 'Overdue — Application filed', severity: 'critical' },
          { title: '📋 3 Pending Approvals', desc: 'Including urgent B.Tech Civil proposal', severity: 'warning' },
          { title: '📄 1 Doc Expiring', desc: 'Fire Safety Certificate — Oct 2025', severity: 'warning' },
          { title: '✅ NAAC Grade A+', desc: '592 days remaining', severity: 'healthy' },
        ].map(i => (
          <div key={i.title} className={`p-4 rounded-xl border ${i.severity === 'critical' ? 'bg-rose-50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900' : i.severity === 'warning' ? 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900' : 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900'}`}>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{i.title}</p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">{i.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col" style={{ height: '60vh' }}>
        <div className="flex items-center gap-3 p-4 border-b border-slate-100 dark:border-slate-800">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center"><Sparkles className="w-5 h-5 text-white" /></div>
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">SAC Institutional Intelligence</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Rule-based · Actual records · No hallucinations</p>
          </div>
          <Badge variant="teal" dot className="ml-auto">Active</Badge>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-sm'}`}>{m.text}</div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {suggestions.map(s => (
              <button key={s} onClick={() => { const msg = s; setMessages(p => [...p, { role: 'user', text: msg }]); setTimeout(() => setMessages(p => [...p, { role: 'ai', text: respond(msg) }]), 400) }}
                className="px-2 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-[10px] font-semibold hover:bg-indigo-100 cursor-pointer border border-indigo-200 dark:border-indigo-800">
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask about your institution..." className="flex-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button onClick={send} className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"><Send className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── MAIN MODULE ──────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════
export const Module01_InstitutionSetup: React.FC = () => {
  const { institution, showToast } = useApp()
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')

  const tabs: { id: Tab; label: string; icon: React.FC<any>; badge?: number }[] = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'Institution Profile', icon: Building2 },
    { id: 'campuses', label: 'Campuses', icon: MapPin },
    { id: 'departments', label: 'Departments', icon: Building },
    { id: 'programs', label: 'Programs & Academic Structure', icon: GraduationCap },
    { id: 'calendar', label: 'Institutional Calendar', icon: Calendar },
    { id: 'policies', label: 'Policy Repository', icon: FileText },
    { id: 'accreditation', label: 'Accreditation', icon: Award, badge: ACCREDITATION_RECORDS.filter(r => r.status === 'Pending Renewal').length },
    { id: 'documents', label: 'Documents', icon: Archive, badge: INSTITUTIONAL_DOCUMENTS.filter(d => d.status === 'Expiring Soon').length },
    { id: 'orgchart', label: 'Org Hierarchy', icon: GitBranch },
    { id: 'approvals', label: 'Approvals', icon: ClipboardList, badge: INSTITUTIONAL_APPROVALS.filter(a => a.status === 'Pending').length },
    { id: 'ai', label: 'AI Intelligence', icon: Sparkles },
  ]

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-teal-500 flex items-center justify-center shadow-sm">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold text-[#101A33] dark:text-white">01. Institutional Management</h1>
                <Badge variant="indigo">Module 01</Badge>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{institution.name} · {institution.type === 'school' ? 'K-12 School' : 'Degree College'} · {institution.code}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setActiveTab('ai')} className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> AI Intelligence</button>
            <button onClick={() => setActiveTab('approvals')} className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5">
              <ClipboardList className="w-3.5 h-3.5" /> Approvals
              {INSTITUTIONAL_APPROVALS.filter(a => a.status === 'Pending').length > 0 && <span className="bg-white text-amber-700 rounded-full text-[10px] px-1.5 font-bold">{INSTITUTIONAL_APPROVALS.filter(a => a.status === 'Pending').length}</span>}
            </button>
            <ExportButton filename="institution_overview" data={DEPARTMENTS.map(d => ({ dept: d.name, code: d.code, hod: d.hod, faculty: d.facultyCount, students: d.studentCount }))} label="Export" />
          </div>
        </div>
      </div>

      {/* Tab Nav */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-xs overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === tab.id ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
                {tab.badge && tab.badge > 0 && <span className={`ml-0.5 rounded-full text-[10px] px-1.5 font-bold ${activeTab === tab.id ? 'bg-white text-indigo-700' : 'bg-rose-500 text-white'}`}>{tab.badge}</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'dashboard' && <DashboardTab onNavigate={setActiveTab} showToast={showToast} />}
      {activeTab === 'profile' && <ProfileTab showToast={showToast} />}
      {activeTab === 'campuses' && <CampusesTab showToast={showToast} />}
      {activeTab === 'departments' && <DepartmentsTab showToast={showToast} />}
      {activeTab === 'programs' && <ProgramsTab showToast={showToast} />}
      {activeTab === 'calendar' && <CalendarTab showToast={showToast} />}
      {activeTab === 'policies' && <PoliciesTab showToast={showToast} />}
      {activeTab === 'accreditation' && <AccreditationTab showToast={showToast} />}
      {activeTab === 'documents' && <DocumentsTab showToast={showToast} />}
      {activeTab === 'orgchart' && <OrgChartTab showToast={showToast} />}
      {activeTab === 'approvals' && <ApprovalsTab showToast={showToast} />}
      {activeTab === 'ai' && <AITab showToast={showToast} />}
    </div>
  )
}
