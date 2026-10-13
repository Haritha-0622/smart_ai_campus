import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { ExportButton } from '../../components/common/ExportButton'
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, AlertCircle } from 'lucide-react'

export const Module24_SecurityAudit: React.FC = () => {
  const { showToast } = useApp()
  const [activeTab, setActiveTab] = useState<'audit' | 'rbac' | 'retention'>('audit')

  const auditLogs = [
    { id: 'LOG-891', timestamp: 'Today, 11:32 AM', user: 'Dr. Ananya Sengupta (Principal)', action: 'Approved Circular #CIR/2026/ACAD/42', module: 'Communication Hub', ip: '192.168.1.104 (Campus VLAN)', status: 'Success' },
    { id: 'LOG-892', timestamp: 'Today, 11:15 AM', user: 'S. K. Subramanian (Parent)', action: 'Digitally verified OTP for Weekend Outpass (Rohan S. Krishna)', module: 'Hostel Outpass', ip: '49.207.182.12 (Airtel 5G)', status: 'Success' },
    { id: 'LOG-893', timestamp: 'Today, 10:45 AM', user: 'Farhan Ahmed (Dining Lead)', action: 'Processed RFID Cashless Tap: ₹65 (Millet Thali)', module: 'Canteen POS', ip: '192.168.4.12 (Canteen POS 1)', status: 'Success' },
    { id: 'LOG-894', timestamp: 'Today, 08:46 AM', user: 'Security Guard Gate 2', action: 'Manual Late Override: Student Karthik Raja (Delayed Bus 06)', module: 'Attendance Terminal', ip: '192.168.2.04 (Gate Desk)', status: 'Audit Flagged' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              24. Security, Governance & Immutable Audit Logs
            </h1>
            <Badge variant="indigo">Module 24</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Least-privilege role matrix, encrypted transit logs, immutable transaction references, and data retention policies.
          </p>
        </div>

        <ExportButton filename="security_audit_trail" data={auditLogs} />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'audit'
              ? 'bg-indigo-600 text-white font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          🔒 Real-Time Audit Log Trail
        </button>
        <button
          onClick={() => setActiveTab('rbac')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'rbac'
              ? 'bg-indigo-600 text-white font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          🛡️ Role-Based Access Control (RBAC)
        </button>
        <button
          onClick={() => setActiveTab('retention')}
          className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
            activeTab === 'retention'
              ? 'bg-indigo-600 text-white font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          📜 Statutory Retention Rules
        </button>
      </div>

      {activeTab === 'audit' && (
        <div className="bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 border-y border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Log ID</th>
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Actor Persona</th>
                  <th className="py-2.5 px-3">Operational Action</th>
                  <th className="py-2.5 px-3">Module Affected</th>
                  <th className="py-2.5 px-3">Network IP / Node</th>
                  <th className="py-2.5 px-3">Audit State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-mono font-bold text-indigo-600">{log.id}</td>
                    <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">{log.timestamp}</td>
                    <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{log.user}</td>
                    <td className="py-3 px-3 text-slate-700 dark:text-slate-200">{log.action}</td>
                    <td className="py-3 px-3 font-mono text-slate-500">{log.module}</td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-400">{log.ip}</td>
                    <td className="py-3 px-3">
                      <Badge variant={log.status === 'Success' ? 'emerald' : 'amber'}>
                        {log.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'rbac' && (
        <div className="p-6 bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            Privilege Isolation Matrix Across 15 Demo Personas
          </h3>
          <p className="text-slate-500 leading-relaxed">
            Students cannot access other students' confidential medical or financial files. Teachers only see marks entry for assigned grade sections. High-impact financial disbursement requires Bursar/CFO maker-checker sign-off.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white block">SuperAdmin</span>
              <span className="text-[11px] text-slate-500">Cross-tenant cloud governance & onboarding</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white block">Principal / Head</span>
              <span className="text-[11px] text-slate-500">Full institutional overview & approval authority</span>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white block">Student / Parent</span>
              <span className="text-[11px] text-slate-500">Strictly self-scoped marks, fees, and outpasses</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'retention' && (
        <div className="p-6 bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            Statutory Student Data Retention & Archival Policies
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Transfer Certificates and Academic Marksheets: Retained permanently (100 Years) in immutable digital vaults.</li>
            <li>Daily RFID Turnstile Punctuality Logs: Retained for 3 academic years for attendance trend analysis.</li>
            <li>Bus GPS Telematics & Telemetry: Aggregated into daily summaries; high-frequency pings purged after 90 days.</li>
          </ul>
        </div>
      )}
    </div>
  )
}
