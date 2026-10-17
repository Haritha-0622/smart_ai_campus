import React, { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import {
  Cpu, CheckCircle2, XCircle, AlertCircle, Key, Webhook,
  RefreshCw, Plus, Trash2, Eye, Copy, Settings, Activity,
  FileText, Globe, Smartphone, CreditCard, Fingerprint, Wifi
} from 'lucide-react'

type Tab = 'dashboard' | 'integrations' | 'api-keys' | 'webhooks' | 'logs' | 'docs'

interface Integration {
  id: string; name: string; category: string; icon: React.ReactNode
  description: string; status: 'Connected' | 'Disconnected' | 'Error' | 'Not Configured'
  provider: string; lastSync?: string; configKey?: string
}

interface ApiKey {
  id: string; name: string; key: string; scope: string; createdBy: string
  createdOn: string; lastUsed: string; status: 'Active' | 'Revoked'
}

interface WebhookEntry {
  id: string; name: string; url: string; events: string[]; status: 'Active' | 'Inactive'
  lastTriggered: string; successRate: number
}

interface IntegrationLog {
  id: string; integration: string; event: string; status: 'Success' | 'Failed' | 'Warning'
  timestamp: string; message: string
}

export const Module25_IntegrationsCenter: React.FC = () => {
  const { institution, showToast } = useApp()
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [catFilter, setCatFilter] = useState('All')

  const integrations: Integration[] = [
    { id: 'I001', name: 'SMS Gateway', category: 'Communication', icon: <Smartphone size={20} />, description: 'Bulk SMS via Textlocal / MSG91 for attendance alerts, fee reminders, and exam notifications.', status: 'Connected', provider: 'Textlocal', lastSync: '2026-10-17 09:00', configKey: 'sms_gateway_key' },
    { id: 'I002', name: 'Email (SMTP)', category: 'Communication', icon: <Globe size={20} />, description: 'Transactional and bulk email delivery via SMTP for circulars, results, and parent communications.', status: 'Connected', provider: 'Google Workspace SMTP', lastSync: '2026-10-17 08:30', configKey: 'smtp_config' },
    { id: 'I003', name: 'WhatsApp Business API', category: 'Communication', icon: <Smartphone size={20} />, description: 'Rich WhatsApp messages for parent alerts, event notifications, and fee reminders.', status: 'Not Configured', provider: 'Meta / 360dialog', configKey: 'whatsapp_api_key' },
    { id: 'I004', name: 'Payment Gateway', category: 'Finance', icon: <CreditCard size={20} />, description: 'Online fee collection via Razorpay / PayU. UPI, cards, net banking supported.', status: 'Connected', provider: 'Razorpay', lastSync: '2026-10-17 09:10', configKey: 'razorpay_key' },
    { id: 'I005', name: 'Biometric Attendance', category: 'HR', icon: <Fingerprint size={20} />, description: 'Staff attendance sync from biometric terminals via API or local agent.', status: 'Connected', provider: 'ESSL / ZKTeco', lastSync: '2026-10-17 07:00', configKey: 'biometric_api' },
    { id: 'I006', name: 'RFID / Smart Card', category: 'Attendance', icon: <Wifi size={20} />, description: 'Student RFID attendance via readers at entry/exit points and classrooms.', status: 'Connected', provider: 'SAC RFID Module', lastSync: '2026-10-17 09:15', configKey: 'rfid_device_id' },
    { id: 'I007', name: 'Google Workspace', category: 'Productivity', icon: <Globe size={20} />, description: 'Google SSO, Google Classroom sync, and Google Drive document storage.', status: 'Disconnected', provider: 'Google', configKey: 'google_oauth_client' },
    { id: 'I008', name: 'Microsoft 365', category: 'Productivity', icon: <Globe size={20} />, description: 'Microsoft Azure AD SSO and OneDrive document storage integration.', status: 'Not Configured', provider: 'Microsoft', configKey: 'ms365_tenant_id' },
    { id: 'I009', name: 'Tally ERP / Accounting', category: 'Finance', icon: <FileText size={20} />, description: 'Push fee transactions and payroll entries to Tally ERP via ODBC or API bridge.', status: 'Error', provider: 'Tally Solutions', lastSync: '2026-10-16 23:55', configKey: 'tally_api_bridge' },
    { id: 'I010', name: 'DigiLocker / NDEAR', category: 'Government', icon: <Globe size={20} />, description: 'Issue digital certificates and sync student records with DigiLocker and NDEAR frameworks.', status: 'Not Configured', provider: 'NIC / MeitY', configKey: 'digilocker_key' },
    { id: 'I011', name: 'GPS Fleet Tracker', category: 'Transport', icon: <Globe size={20} />, description: 'Real-time bus location from GPS devices on school transport fleet.', status: 'Connected', provider: 'TrackoBit', lastSync: '2026-10-17 09:20', configKey: 'gps_api_key' },
    { id: 'I012', name: 'LMS (Moodle / External)', category: 'Academic', icon: <Globe size={20} />, description: 'Sync course content, assignments, and grades with external LMS platforms.', status: 'Not Configured', provider: 'Moodle / Custom LMS', configKey: 'lms_api_token' },
  ]

  const apiKeys: ApiKey[] = [
    { id: 'K001', name: 'SAC Mobile App — Production', key: 'sac_prod_••••••••••••••••f4a2', scope: 'Read/Write — Student, Attendance, Fees', createdBy: 'System Admin', createdOn: '2026-01-15', lastUsed: '2026-10-17 09:35', status: 'Active' },
    { id: 'K002', name: 'Parent Portal — Web', key: 'sac_ppw_••••••••••••••••b3c9', scope: 'Read — Student (own child only), Fees, Transport', createdBy: 'System Admin', createdOn: '2026-01-15', lastUsed: '2026-10-17 09:40', status: 'Active' },
    { id: 'K003', name: 'Biometric Sync Agent', key: 'sac_bio_••••••••••••••••77e1', scope: 'Write — Staff Attendance only', createdBy: 'System Admin', createdOn: '2026-03-10', lastUsed: '2026-10-17 07:00', status: 'Active' },
    { id: 'K004', name: 'Legacy Import Script', key: 'sac_lgc_••••••••••••••••a94f', scope: 'Write — Student Import (retired)', createdBy: 'System Admin', createdOn: '2025-08-01', lastUsed: '2026-02-28', status: 'Revoked' },
    { id: 'K005', name: 'Tally Bridge Connector', key: 'sac_tal_••••••••••••••••d12b', scope: 'Read — Finance/Ledger export', createdBy: 'Mrs. Finance Officer', createdOn: '2026-05-20', lastUsed: '2026-10-16 23:55', status: 'Active' },
  ]

  const webhooks: WebhookEntry[] = [
    { id: 'WH001', name: 'Payment Success Hook', url: 'https://sac-api.institution.edu/webhooks/payment', events: ['payment.success', 'payment.failed'], status: 'Active', lastTriggered: '2026-10-17 09:12', successRate: 99.2 },
    { id: 'WH002', name: 'Attendance Sync Hook', url: 'https://sac-api.institution.edu/webhooks/attendance', events: ['attendance.recorded'], status: 'Active', lastTriggered: '2026-10-17 09:15', successRate: 100 },
    { id: 'WH003', name: 'Tally Ledger Push', url: 'https://tally-bridge.local:8080/api/push', events: ['fee.collected', 'payroll.disbursed'], status: 'Inactive', lastTriggered: '2026-10-16 23:55', successRate: 84.7 },
    { id: 'WH004', name: 'SMS Delivery Report', url: 'https://sac-api.institution.edu/webhooks/sms-dlr', events: ['sms.delivered', 'sms.failed'], status: 'Active', lastTriggered: '2026-10-17 09:00', successRate: 97.5 },
  ]

  const integrationLogs: IntegrationLog[] = [
    { id: 'LOG001', integration: 'RFID / Smart Card', event: 'Attendance Batch Sync', status: 'Success', timestamp: '2026-10-17 09:15', message: 'Synced 312 attendance records from 4 RFID reader nodes.' },
    { id: 'LOG002', integration: 'Payment Gateway', event: 'Fee Payment Webhook', status: 'Success', timestamp: '2026-10-17 09:12', message: 'Payment ₹12,500 by parent Mrs. Rekha processed. Order ID: RZP_001782.' },
    { id: 'LOG003', integration: 'Biometric Attendance', event: 'Staff Sync', status: 'Success', timestamp: '2026-10-17 07:00', message: 'Synced 44 staff check-in records from biometric terminal.' },
    { id: 'LOG004', integration: 'Tally ERP', event: 'Ledger Push', status: 'Failed', timestamp: '2026-10-16 23:55', message: 'Connection refused — Tally ERP server unreachable at 192.168.1.200:9000. Retry queued.' },
    { id: 'LOG005', integration: 'GPS Fleet Tracker', event: 'Live Location Fetch', status: 'Success', timestamp: '2026-10-17 09:20', message: 'Fetched live location for 6 buses on active routes.' },
    { id: 'LOG006', integration: 'SMS Gateway', event: 'Attendance Alert Bulk Send', status: 'Warning', timestamp: '2026-10-17 09:00', message: '421 SMS sent — 18 failed to deliver (invalid numbers). Delivery rate: 95.7%.' },
  ]

  const categories = useMemo(() => ['All', ...new Set(integrations.map(i => i.category))], [])
  const filtered = useMemo(() => catFilter === 'All' ? integrations : integrations.filter(i => i.category === catFilter), [catFilter])

  const connectedCount = integrations.filter(i => i.status === 'Connected').length
  const errorCount = integrations.filter(i => i.status === 'Error').length

  const statusVariant = (s: string): 'teal' | 'rose' | 'amber' | 'indigo' => {
    if (s === 'Connected') return 'teal'
    if (s === 'Error') return 'rose'
    if (s === 'Disconnected') return 'amber'
    return 'indigo'
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'integrations', label: 'Integrations' },
    { key: 'api-keys', label: 'API Keys' },
    { key: 'webhooks', label: 'Webhooks' },
    { key: 'logs', label: 'Activity Logs' },
    { key: 'docs', label: 'API Docs' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu size={24} className="text-indigo-500" />
            Integrations Center
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            {institution?.name} — Third-party integrations, API management, and webhooks
          </p>
        </div>
        <ExportButton label="Export Config" onClick={() => showToast('Integration config exported', 'success')} />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key as Tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === t.key ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Total Integrations" value={integrations.length} subtext="Configured" icon={<Cpu size={18} />} status="healthy" />
            <StatCard title="Connected" value={connectedCount} subtext="Active integrations" icon={<CheckCircle2 size={18} />} status="healthy" />
            <StatCard title="Errors" value={errorCount} subtext="Needs attention" icon={<AlertCircle size={18} />} status={errorCount > 0 ? 'critical' : 'healthy'} />
            <StatCard title="API Keys" value={apiKeys.filter(k => k.status === 'Active').length} subtext="Active keys" icon={<Key size={18} />} status="healthy" />
          </div>

          {/* Error integrations */}
          {errorCount > 0 && (
            <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-2xl p-5">
              <h3 className="font-semibold text-rose-700 dark:text-rose-300 mb-3 flex items-center gap-2"><AlertCircle size={16} />Integration Errors — Immediate Action Required</h3>
              {integrations.filter(i => i.status === 'Error').map(i => (
                <div key={i.id} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-slate-700 dark:text-slate-200">{i.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Provider: {i.provider} · Last sync: {i.lastSync}</p>
                  </div>
                  <button onClick={() => showToast(`Reconnecting ${i.name}...`, 'info')} className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 text-white rounded-xl text-xs hover:bg-rose-700 transition-colors">
                    <RefreshCw size={12} />Reconnect
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Integration status overview */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {integrations.map(i => (
              <div key={i.id} className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-xl p-3 flex items-center gap-3 hover:shadow-sm transition-shadow">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${i.status === 'Connected' ? 'bg-green-50 dark:bg-green-900/20 text-green-600' : i.status === 'Error' ? 'bg-red-50 dark:bg-red-900/20 text-red-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                  {i.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">{i.name}</p>
                  <Badge variant={statusVariant(i.status)}>{i.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Integrations Tab */}
      {activeTab === 'integrations' && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <button key={c} onClick={() => setCatFilter(c)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${catFilter === c ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(i => (
              <div key={i.id} className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${i.status === 'Connected' ? 'bg-green-50 dark:bg-green-900/20 text-green-600' : i.status === 'Error' ? 'bg-red-50 dark:bg-red-900/20 text-red-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                      {i.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-700 dark:text-slate-200">{i.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{i.provider}</p>
                    </div>
                  </div>
                  <Badge variant={statusVariant(i.status)}>{i.status}</Badge>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{i.description}</p>
                {i.lastSync && <p className="text-xs text-slate-400 dark:text-slate-500">Last sync: {i.lastSync}</p>}
                <div className="flex gap-2 mt-3">
                  <button onClick={() => showToast(`Configuring ${i.name}`, 'info')} className="flex-1 py-1.5 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors flex items-center justify-center gap-1">
                    <Settings size={11} />Configure
                  </button>
                  {i.status === 'Connected' ? (
                    <button onClick={() => showToast(`Testing ${i.name} connection...`, 'info')} className="flex-1 py-1.5 bg-green-600 text-white rounded-xl text-xs hover:bg-green-700 transition-colors flex items-center justify-center gap-1">
                      <Activity size={11} />Test
                    </button>
                  ) : (
                    <button onClick={() => showToast(`Connecting ${i.name}...`, 'success')} className="flex-1 py-1.5 bg-indigo-600 text-white rounded-xl text-xs hover:bg-indigo-700 transition-colors flex items-center justify-center gap-1">
                      <RefreshCw size={11} />Connect
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* API Keys Tab */}
      {activeTab === 'api-keys' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">{apiKeys.filter(k => k.status === 'Active').length} active API keys</p>
            <button onClick={() => showToast('New API key generated', 'success')} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
              <Plus size={14} />Generate Key
            </button>
          </div>
          <div className="space-y-3">
            {apiKeys.map(k => (
              <div key={k.id} className={`bg-white dark:bg-[#131B2E] border rounded-2xl shadow-xs p-4 hover:shadow-sm transition-shadow ${k.status === 'Revoked' ? 'opacity-60' : ''} border-slate-200 dark:border-slate-800`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-slate-700 dark:text-slate-200">{k.name}</p>
                      <Badge variant={k.status === 'Active' ? 'teal' : 'rose'}>{k.status}</Badge>
                    </div>
                    <p className="font-mono text-xs text-slate-500 dark:text-slate-400 mb-1">{k.key}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Scope: {k.scope}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Created by {k.createdBy} on {k.createdOn} · Last used: {k.lastUsed}</p>
                  </div>
                  <div className="flex gap-2 ml-3 shrink-0">
                    <button onClick={() => showToast('API key copied to clipboard', 'success')} className="p-1.5 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"><Copy size={14} /></button>
                    {k.status === 'Active' && (
                      <button onClick={() => showToast(`API key "${k.name}" revoked`, 'warning')} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"><XCircle size={14} /></button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Webhooks Tab */}
      {activeTab === 'webhooks' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">{webhooks.filter(w => w.status === 'Active').length} active webhooks</p>
            <button onClick={() => showToast('New webhook registered', 'success')} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
              <Plus size={14} />Add Webhook
            </button>
          </div>
          <div className="space-y-3">
            {webhooks.map(w => (
              <div key={w.id} className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-slate-700 dark:text-slate-200">{w.name}</p>
                      <Badge variant={w.status === 'Active' ? 'teal' : 'amber'}>{w.status}</Badge>
                    </div>
                    <p className="font-mono text-xs text-slate-500 dark:text-slate-400 mb-2">{w.url}</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {w.events.map(e => <span key={e} className="text-xs px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full">{e}</span>)}
                    </div>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Last triggered: {w.lastTriggered} · Success rate: {w.successRate}%</p>
                  </div>
                  <div className="flex gap-2 ml-3 shrink-0">
                    <button onClick={() => showToast(`Test event sent to ${w.name}`, 'success')} className="p-1.5 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"><Activity size={14} /></button>
                    <button onClick={() => showToast(`Webhook ${w.name} deleted`, 'warning')} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Logs Tab */}
      {activeTab === 'logs' && (
        <div className="space-y-3">
          {integrationLogs.map(l => (
            <div key={l.id} className={`flex items-start gap-4 p-4 rounded-2xl border transition-all hover:shadow-sm ${l.status === 'Failed' ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800' : l.status === 'Warning' ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800' : 'bg-white dark:bg-[#131B2E] border-slate-200 dark:border-slate-800'}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${l.status === 'Failed' ? 'bg-red-100 dark:bg-red-900/30' : l.status === 'Warning' ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-green-100 dark:bg-green-900/30'}`}>
                {l.status === 'Failed' ? <XCircle size={14} className="text-red-500" /> : l.status === 'Warning' ? <AlertCircle size={14} className="text-amber-500" /> : <CheckCircle2 size={14} className="text-green-500" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-slate-700 dark:text-slate-200">{l.integration} — {l.event}</p>
                  <span className="text-xs text-slate-400 dark:text-slate-500">{l.timestamp}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{l.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Docs Tab */}
      {activeTab === 'docs' && (
        <div className="max-w-3xl space-y-5">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-6">
            <h3 className="font-bold text-indigo-700 dark:text-indigo-300 text-lg mb-2">SAC REST API</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">Base URL: <code className="bg-white dark:bg-slate-800 px-2 py-0.5 rounded text-xs font-mono">https://api.smartaicampus.edu/v1/</code></p>
            <div className="space-y-3">
              {[
                { method: 'GET', path: '/students', desc: 'List all students with pagination and filters' },
                { method: 'GET', path: '/attendance/:date', desc: 'Fetch attendance records for a specific date' },
                { method: 'POST', path: '/attendance', desc: 'Record attendance for a student or class' },
                { method: 'GET', path: '/fees/outstanding', desc: 'List students with outstanding fee dues' },
                { method: 'POST', path: '/fees/payment', desc: 'Record a fee payment transaction' },
                { method: 'GET', path: '/exams/results', desc: 'Fetch exam results with filters' },
                { method: 'POST', path: '/notifications/send', desc: 'Send SMS, email, or in-app notification' },
              ].map(ep => (
                <div key={ep.path} className="flex items-start gap-3 py-2 border-b border-indigo-100 dark:border-indigo-800 last:border-0">
                  <span className={`text-xs font-bold px-2 py-1 rounded font-mono ${ep.method === 'GET' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'}`}>{ep.method}</span>
                  <div>
                    <code className="text-xs font-mono text-slate-700 dark:text-slate-200">{ep.path}</code>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{ep.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => showToast('Opening full API documentation', 'info')} className="mt-4 flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
              <Eye size={14} />View Full API Reference
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
