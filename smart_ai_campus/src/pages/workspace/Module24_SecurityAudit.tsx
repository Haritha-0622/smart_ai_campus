import React, { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import {
  ShieldCheck, Eye, Lock, AlertCircle, Users, Globe, Key,
  Monitor, LogIn, LogOut, Clock, Filter, Trash2, Plus,
  CheckCircle2, XCircle, Settings, Activity
} from 'lucide-react'

type Tab = 'dashboard' | 'login-audit' | 'sessions' | 'roles' | 'ip-allowlist' | 'alerts'

interface LoginAuditEntry {
  id: string; user: string; role: string; action: 'Login' | 'Logout' | 'Failed'
  ip: string; device: string; timestamp: string; location: string
}

interface ActiveSession {
  id: string; user: string; role: string; ip: string; device: string
  loginTime: string; lastActivity: string; status: 'Active' | 'Idle'
}

interface SecurityAlert {
  id: string; type: string; severity: 'High' | 'Medium' | 'Low'
  description: string; timestamp: string; status: 'Open' | 'Resolved'
  ip?: string; user?: string
}

interface IPRule {
  id: string; ip: string; label: string; type: 'Allow' | 'Block'; addedBy: string; addedOn: string
}

export const Module24_SecurityAudit: React.FC = () => {
  const { institution, showToast, staffList } = useApp()
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [actionFilter, setActionFilter] = useState<'All' | 'Login' | 'Logout' | 'Failed'>('All')

  const loginAudit: LoginAuditEntry[] = [
    { id: 'LA001', user: 'Dr. Principal Suresh', role: 'Principal', action: 'Login', ip: '192.168.1.10', device: 'Windows PC — Chrome', timestamp: '2026-10-17 09:02', location: 'School Campus' },
    { id: 'LA002', user: 'Mrs. Finance Officer', role: 'Finance', action: 'Login', ip: '192.168.1.45', device: 'MacBook — Safari', timestamp: '2026-10-17 08:55', location: 'School Campus' },
    { id: 'LA003', user: 'Unknown', role: '—', action: 'Failed', ip: '103.45.82.19', device: 'Unknown — Unknown', timestamp: '2026-10-17 08:47', location: 'External IP' },
    { id: 'LA004', user: 'Mr. Ramesh HOD', role: 'HOD', action: 'Login', ip: '192.168.2.30', device: 'Android — Mobile App', timestamp: '2026-10-17 08:30', location: 'School Campus' },
    { id: 'LA005', user: 'Mrs. Librarian Nair', role: 'Library Staff', action: 'Login', ip: '192.168.1.22', device: 'Windows PC — Firefox', timestamp: '2026-10-17 08:15', location: 'Library' },
    { id: 'LA006', user: 'Dr. Principal Suresh', role: 'Principal', action: 'Logout', ip: '192.168.1.10', device: 'Windows PC — Chrome', timestamp: '2026-10-16 17:45', location: 'School Campus' },
    { id: 'LA007', user: 'Unknown', role: '—', action: 'Failed', ip: '45.33.32.156', device: 'Bot', timestamp: '2026-10-16 23:12', location: 'External IP — Suspected Bot' },
    { id: 'LA008', user: 'Mr. Transport Mgr', role: 'Transport', action: 'Login', ip: '192.168.3.10', device: 'iPhone — Mobile App', timestamp: '2026-10-16 17:00', location: 'Transport Office' },
  ]

  const activeSessions: ActiveSession[] = [
    { id: 'S001', user: 'Dr. Principal Suresh', role: 'Principal', ip: '192.168.1.10', device: 'Windows PC — Chrome 128', loginTime: '2026-10-17 09:02', lastActivity: '2026-10-17 09:41', status: 'Active' },
    { id: 'S002', user: 'Mrs. Finance Officer', role: 'Finance', ip: '192.168.1.45', device: 'MacBook — Safari 17', loginTime: '2026-10-17 08:55', lastActivity: '2026-10-17 09:38', status: 'Active' },
    { id: 'S003', user: 'Mr. Ramesh HOD', role: 'HOD', ip: '192.168.2.30', device: 'Android — SAC App', loginTime: '2026-10-17 08:30', lastActivity: '2026-10-17 09:10', status: 'Idle' },
    { id: 'S004', user: 'Mrs. Librarian Nair', role: 'Library Staff', ip: '192.168.1.22', device: 'Windows PC — Firefox 119', loginTime: '2026-10-17 08:15', lastActivity: '2026-10-17 09:35', status: 'Active' },
  ]

  const securityAlerts: SecurityAlert[] = [
    { id: 'SA001', type: 'Brute Force Attempt', severity: 'High', description: '12 failed login attempts from IP 103.45.82.19 within 5 minutes. Possible brute-force attack.', timestamp: '2026-10-17 08:47', status: 'Open', ip: '103.45.82.19' },
    { id: 'SA002', type: 'Bot Access Detected', severity: 'High', description: 'Automated access pattern detected from 45.33.32.156 — no user agent. Access blocked.', timestamp: '2026-10-16 23:12', status: 'Resolved', ip: '45.33.32.156' },
    { id: 'SA003', type: 'Idle Session', severity: 'Low', description: 'User Mr. Ramesh HOD session idle for >30 minutes. Auto-lock advisory.', timestamp: '2026-10-17 09:10', status: 'Open', user: 'Mr. Ramesh HOD' },
    { id: 'SA004', type: 'Password Change Alert', severity: 'Medium', description: 'Admin password changed. Confirmation email sent to registered email.', timestamp: '2026-10-15 14:30', status: 'Resolved', user: 'System Admin' },
    { id: 'SA005', type: 'Role Escalation Detected', severity: 'Medium', description: 'User attempted to access Management Dashboard without authorization. Access denied.', timestamp: '2026-10-14 16:22', status: 'Resolved' },
  ]

  const ipRules: IPRule[] = [
    { id: 'IP001', ip: '192.168.1.0/24', label: 'Main Campus LAN', type: 'Allow', addedBy: 'System Admin', addedOn: '2026-01-01' },
    { id: 'IP002', ip: '192.168.2.0/24', label: 'Staff Block LAN', type: 'Allow', addedBy: 'System Admin', addedOn: '2026-01-01' },
    { id: 'IP003', ip: '192.168.3.0/24', label: 'Transport & Hostel', type: 'Allow', addedBy: 'System Admin', addedOn: '2026-01-01' },
    { id: 'IP004', ip: '103.45.82.19', label: 'Blocked — Brute force', type: 'Block', addedBy: 'Dr. Principal Suresh', addedOn: '2026-10-17' },
    { id: 'IP005', ip: '45.33.32.156', label: 'Blocked — Bot', type: 'Block', addedBy: 'System Admin', addedOn: '2026-10-17' },
  ]

  const roles = [
    { role: 'Super Admin', permissions: ['All Modules', 'System Config', 'Tenant Mgmt'], users: 1, sensitive: true },
    { role: 'Management / Correspondent', permissions: ['All Dashboards', 'Reports', 'Finance View'], users: 2, sensitive: true },
    { role: 'Principal', permissions: ['Academic Mgmt', 'Staff View', 'Reports', 'Approvals'], users: 1, sensitive: false },
    { role: 'HOD', permissions: ['Department View', 'Timetable', 'Attendance', 'Exam'], users: 8, sensitive: false },
    { role: 'Teacher', permissions: ['Class Attendance', 'Marks Entry', 'LMS', 'Timetable View'], users: staffList.length, sensitive: false },
    { role: 'Finance Officer', permissions: ['Fees', 'Payroll', 'Ledger', 'Reports'], users: 2, sensitive: true },
    { role: 'Library Staff', permissions: ['Library Module', 'Student View (read)'], users: 2, sensitive: false },
    { role: 'Hostel Warden', permissions: ['Hostel Module', 'Student View', 'Visitor Log'], users: 3, sensitive: false },
    { role: 'Transport Manager', permissions: ['Transport Module', 'Student View (read)'], users: 1, sensitive: false },
    { role: 'Parent', permissions: ['Child Profile', 'Attendance View', 'Fees View', 'Transport View'], users: 0, sensitive: false },
    { role: 'Student', permissions: ['Student Portal', 'LMS', 'Timetable View', 'Library View'], users: 0, sensitive: false },
  ]

  const filteredAudit = useMemo(() => actionFilter === 'All' ? loginAudit : loginAudit.filter(a => a.action === actionFilter), [actionFilter])

  const openAlerts = securityAlerts.filter(a => a.status === 'Open').length
  const failedLogins = loginAudit.filter(a => a.action === 'Failed').length

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: <Activity size={14} /> },
    { key: 'login-audit', label: 'Login Audit', icon: <LogIn size={14} /> },
    { key: 'sessions', label: 'Active Sessions', icon: <Monitor size={14} /> },
    { key: 'roles', label: 'Roles & Permissions', icon: <Users size={14} /> },
    { key: 'ip-allowlist', label: 'IP Rules', icon: <Globe size={14} /> },
    { key: 'alerts', label: 'Security Alerts', icon: <AlertCircle size={14} /> },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck size={24} className="text-indigo-500" />
            Security & Audit
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {institution?.name} — Access control, audit logs, and security monitoring
          </p>
        </div>
        <ExportButton label="Export Audit" onClick={() => showToast('Security audit exported', 'success')} />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all relative ${
              activeTab === t.key ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
            }`}>
            {t.icon}{t.label}
            {t.key === 'alerts' && openAlerts > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{openAlerts}</span>
            )}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Active Sessions" value={activeSessions.filter(s => s.status === 'Active').length} subtext="Currently logged in" icon={<Monitor size={18} />} status="healthy" />
            <StatCard title="Failed Logins (24h)" value={failedLogins} subtext="Possible threats" icon={<AlertCircle size={18} />} status={failedLogins > 2 ? 'critical' : 'healthy'} />
            <StatCard title="Open Alerts" value={openAlerts} subtext="Security incidents" icon={<AlertCircle size={18} />} status={openAlerts > 0 ? 'warning' : 'healthy'} />
            <StatCard title="Blocked IPs" value={ipRules.filter(r => r.type === 'Block').length} subtext="Active blocks" icon={<Lock size={18} />} status="healthy" />
          </div>

          {/* Security alerts */}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-5">
            <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
              <AlertCircle size={16} className="text-rose-500" /> Open Security Alerts
            </h3>
            <div className="space-y-3">
              {securityAlerts.filter(a => a.status === 'Open').map(a => (
                <div key={a.id} className={`p-4 rounded-xl border flex items-start justify-between gap-4 ${a.severity === 'High' ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800' : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'}`}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={a.severity === 'High' ? 'rose' : 'amber'}>{a.severity}</Badge>
                      <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">{a.type}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">{a.description}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{a.timestamp}{a.ip && ` · IP: ${a.ip}`}</p>
                  </div>
                  <button onClick={() => showToast(`Alert ${a.id} resolved`, 'success')} className="shrink-0 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs hover:bg-indigo-700 transition-colors">Resolve</button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent logins */}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-5">
            <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2"><LogIn size={16} className="text-indigo-500" /> Recent Login Activity</h3>
            <div className="space-y-2">
              {loginAudit.slice(0, 6).map(l => (
                <div key={l.id} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${l.action === 'Failed' ? 'bg-red-100 dark:bg-red-900/30' : l.action === 'Login' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-slate-100 dark:bg-slate-800'}`}>
                      {l.action === 'Login' ? <LogIn size={12} className="text-green-600" /> : l.action === 'Logout' ? <LogOut size={12} className="text-slate-500" /> : <XCircle size={12} className="text-red-500" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{l.user}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{l.ip} · {l.device}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={l.action === 'Failed' ? 'rose' : l.action === 'Login' ? 'teal' : 'indigo'}>{l.action}</Badge>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{l.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Login Audit Tab */}
      {activeTab === 'login-audit' && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {(['All', 'Login', 'Logout', 'Failed'] as const).map(f => (
              <button key={f} onClick={() => setActionFilter(f)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${actionFilter === f ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                {f}
              </button>
            ))}
          </div>
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">User</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Role</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Action</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">IP Address</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Device</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Timestamp</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAudit.map(l => (
                    <tr key={l.id} className={`border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${l.action === 'Failed' ? 'bg-red-50/30 dark:bg-red-900/10' : ''}`}>
                      <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">{l.user}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{l.role}</td>
                      <td className="px-4 py-3"><Badge variant={l.action === 'Failed' ? 'rose' : l.action === 'Login' ? 'teal' : 'indigo'}>{l.action}</Badge></td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-600 dark:text-slate-300">{l.ip}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs">{l.device}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs">{l.timestamp}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 text-xs">{l.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sessions Tab */}
      {activeTab === 'sessions' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">{activeSessions.length} active sessions</p>
            <button onClick={() => showToast('All idle sessions terminated', 'warning')} className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-medium hover:bg-red-600 transition-colors">Terminate Idle Sessions</button>
          </div>
          <div className="space-y-3">
            {activeSessions.map(s => (
              <div key={s.id} className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-4 flex items-center justify-between hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-4">
                  <div className={`w-2.5 h-2.5 rounded-full ${s.status === 'Active' ? 'bg-green-500' : 'bg-amber-500'}`} />
                  <div>
                    <p className="font-semibold text-slate-700 dark:text-slate-200">{s.user}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{s.role} · {s.device}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">IP: {s.ip} · Login: {s.loginTime} · Last: {s.lastActivity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  <Badge variant={s.status === 'Active' ? 'teal' : 'amber'}>{s.status}</Badge>
                  <button onClick={() => showToast(`Session for ${s.user} terminated`, 'warning')} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"><XCircle size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Roles & Permissions Tab */}
      {activeTab === 'roles' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">{roles.length} role definitions</p>
            <button onClick={() => showToast('New role created', 'success')} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
              <Plus size={14} />Add Role
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map(r => (
              <div key={r.role} className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-700 dark:text-slate-200">{r.role}</p>
                    {r.sensitive && <Lock size={12} className="text-rose-500" />}
                  </div>
                  <button onClick={() => showToast(`Editing permissions for ${r.role}`, 'info')} className="p-1.5 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"><Settings size={12} /></button>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {r.permissions.map(p => (
                    <span key={p} className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full">{p}</span>
                  ))}
                </div>
                {r.users > 0 && <p className="text-xs text-slate-400 dark:text-slate-500">{r.users} staff member(s) assigned</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* IP Rules Tab */}
      {activeTab === 'ip-allowlist' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">{ipRules.filter(r => r.type === 'Allow').length} allowed · {ipRules.filter(r => r.type === 'Block').length} blocked</p>
            <button onClick={() => showToast('New IP rule added', 'success')} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
              <Plus size={14} />Add Rule
            </button>
          </div>
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">IP / Range</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Label</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Type</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Added By</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Date</th>
                    <th className="text-left px-4 py-3 font-semibold text-slate-600 dark:text-slate-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {ipRules.map(r => (
                    <tr key={r.id} className={`border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors ${r.type === 'Block' ? 'bg-red-50/30 dark:bg-red-900/10' : ''}`}>
                      <td className="px-4 py-3 font-mono text-xs text-slate-700 dark:text-slate-200">{r.ip}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{r.label}</td>
                      <td className="px-4 py-3"><Badge variant={r.type === 'Allow' ? 'teal' : 'rose'}>{r.type}</Badge></td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{r.addedBy}</td>
                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{r.addedOn}</td>
                      <td className="px-4 py-3">
                        <button onClick={() => showToast(`IP rule for ${r.ip} removed`, 'warning')} className="p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"><Trash2 size={14} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Alerts Tab */}
      {activeTab === 'alerts' && (
        <div className="space-y-3">
          {securityAlerts.map(a => (
            <div key={a.id} className={`bg-white dark:bg-[#131B2E] border rounded-2xl shadow-xs p-4 hover:shadow-sm transition-shadow ${a.severity === 'High' ? 'border-rose-200 dark:border-rose-800' : a.severity === 'Medium' ? 'border-amber-200 dark:border-amber-800' : 'border-slate-200 dark:border-slate-800'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={a.severity === 'High' ? 'rose' : a.severity === 'Medium' ? 'amber' : 'indigo'}>{a.severity}</Badge>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{a.type}</span>
                    <Badge variant={a.status === 'Open' ? 'amber' : 'teal'}>{a.status}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{a.description}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{a.timestamp}{a.ip && ` · IP: ${a.ip}`}{a.user && ` · User: ${a.user}`}</p>
                </div>
                {a.status === 'Open' && (
                  <button onClick={() => showToast(`Alert ${a.id} resolved and logged`, 'success')} className="shrink-0 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-medium hover:bg-indigo-700 transition-colors">
                    Resolve
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
