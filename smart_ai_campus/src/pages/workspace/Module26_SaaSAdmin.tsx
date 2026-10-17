import React, { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import {
  Building2, Users, CreditCard, Settings, Activity, BarChart2,
  CheckCircle2, AlertCircle, TrendingUp, Plus, Edit, Eye,
  RefreshCw, Download, Shield, Globe, Clock, Package
} from 'lucide-react'

type Tab = 'dashboard' | 'tenants' | 'subscriptions' | 'usage' | 'support' | 'config'

interface Tenant {
  id: string; name: string; type: 'School' | 'College'
  plan: 'Starter' | 'Growth' | 'Professional' | 'Enterprise'
  students: number; staff: number; modules: number
  status: 'Active' | 'Trial' | 'Suspended' | 'Expired'
  city: string; joinedOn: string; renewalDate: string
  monthlyRevenue: number; contact: string
}

interface SupportTicket {
  id: string; tenant: string; subject: string; priority: 'High' | 'Medium' | 'Low'
  status: 'Open' | 'In-Progress' | 'Resolved' | 'Closed'
  openedAt: string; assignedTo: string
}

export const Module26_SaaSAdmin: React.FC = () => {
  const { institution, showToast } = useApp()
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [planFilter, setPlanFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const tenants: Tenant[] = [
    {
      id: 'T001', name: institution?.name ?? 'Demo Institution', type: 'School',
      plan: 'Professional', students: 1250, staff: 78, modules: 22,
      status: 'Active', city: 'Chennai', joinedOn: '2024-06-15', renewalDate: '2027-06-14',
      monthlyRevenue: 45000, contact: 'admin@demo.edu'
    },
    {
      id: 'T002', name: 'Sunrise Public School', type: 'School',
      plan: 'Growth', students: 620, staff: 42, modules: 16,
      status: 'Active', city: 'Coimbatore', joinedOn: '2025-03-01', renewalDate: '2027-02-28',
      monthlyRevenue: 28000, contact: 'admin@sunriseschool.edu'
    },
    {
      id: 'T003', name: 'Velan Engineering College', type: 'College',
      plan: 'Enterprise', students: 3200, staff: 210, modules: 26,
      status: 'Active', city: 'Tiruchirappalli', joinedOn: '2023-11-01', renewalDate: '2027-10-31',
      monthlyRevenue: 120000, contact: 'iqac@velan.edu'
    },
    {
      id: 'T004', name: 'New Horizons School', type: 'School',
      plan: 'Starter', students: 180, staff: 18, modules: 8,
      status: 'Trial', city: 'Madurai', joinedOn: '2026-10-01', renewalDate: '2026-10-31',
      monthlyRevenue: 0, contact: 'principal@newhorizons.edu'
    },
    {
      id: 'T005', name: 'Blue Star Academy', type: 'School',
      plan: 'Growth', students: 890, staff: 61, modules: 18,
      status: 'Suspended', city: 'Salem', joinedOn: '2024-04-01', renewalDate: '2026-09-30',
      monthlyRevenue: 0, contact: 'accounts@bluestar.edu'
    },
  ]

  const supportTickets: SupportTicket[] = [
    { id: 'ST001', tenant: 'Velan Engineering College', subject: 'RFID reader not syncing — Lab Block', priority: 'High', status: 'In-Progress', openedAt: '2026-10-17 08:30', assignedTo: 'Ravi (L2 Support)' },
    { id: 'ST002', tenant: 'Sunrise Public School', subject: 'Parent login OTP not received', priority: 'Medium', status: 'Open', openedAt: '2026-10-17 09:00', assignedTo: 'Unassigned' },
    { id: 'ST003', tenant: 'New Horizons School', subject: 'How to configure fee categories for trial?', priority: 'Low', status: 'Open', openedAt: '2026-10-17 09:15', assignedTo: 'Priya (Onboarding)' },
    { id: 'ST004', tenant: institution?.name ?? 'Demo Institution', subject: 'PDF report not generating — Exam module', priority: 'High', status: 'Resolved', openedAt: '2026-10-16 14:00', assignedTo: 'Karthik (L1 Support)' },
    { id: 'ST005', tenant: 'Blue Star Academy', subject: 'Account suspended — payment not reflecting', priority: 'High', status: 'In-Progress', openedAt: '2026-10-15 11:00', assignedTo: 'Finance Team' },
  ]

  const plans = [
    { name: 'Starter', price: '₹9,999/mo', students: '≤300', modules: 'Core 8', support: 'Email', color: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300' },
    { name: 'Growth', price: '₹24,999/mo', students: '≤1,000', modules: 'Core + 8 Add-ons', support: 'Email + Chat', color: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' },
    { name: 'Professional', price: '₹44,999/mo', students: '≤2,000', modules: '22 Modules', support: 'Priority Chat', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' },
    { name: 'Enterprise', price: 'Custom', students: 'Unlimited', modules: 'All 26 Modules', support: 'Dedicated CSM', color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' },
  ]

  const usageMetrics = [
    { metric: 'Total Students (All Tenants)', value: tenants.reduce((s, t) => s + t.students, 0).toLocaleString(), trend: '+12%', icon: <Users size={18} />, status: 'healthy' as const },
    { metric: 'Total Staff', value: tenants.reduce((s, t) => s + t.staff, 0).toLocaleString(), trend: '+8%', icon: <Users size={18} />, status: 'healthy' as const },
    { metric: 'Monthly Recurring Revenue', value: `₹${(tenants.reduce((s, t) => s + t.monthlyRevenue, 0) / 1000).toFixed(0)}K`, trend: '+5%', icon: <CreditCard size={18} />, status: 'healthy' as const },
    { metric: 'Active API Calls (24h)', value: '1.24M', trend: '+18%', icon: <Activity size={18} />, status: 'healthy' as const },
    { metric: 'Avg Module Utilization', value: '78%', trend: '+3%', icon: <Package size={18} />, status: 'healthy' as const },
    { metric: 'Platform Uptime (30d)', value: '99.97%', trend: 'Stable', icon: <Shield size={18} />, status: 'healthy' as const },
  ]

  const filteredTenants = useMemo(() => {
    return tenants.filter(t => {
      const planMatch = planFilter === 'All' || t.plan === planFilter
      const statusMatch = statusFilter === 'All' || t.status === statusFilter
      return planMatch && statusMatch
    })
  }, [planFilter, statusFilter])

  const activeTenants = tenants.filter(t => t.status === 'Active').length
  const mrr = tenants.reduce((s, t) => s + t.monthlyRevenue, 0)
  const openTickets = supportTickets.filter(t => t.status === 'Open' || t.status === 'In-Progress').length

  const planVariant = (p: string): 'indigo' | 'amber' | 'teal' | 'rose' => {
    if (p === 'Enterprise') return 'amber'
    if (p === 'Professional') return 'indigo'
    if (p === 'Growth') return 'teal'
    return 'rose'
  }

  const statusVariant = (s: string): 'teal' | 'amber' | 'rose' | 'indigo' => {
    if (s === 'Active') return 'teal'
    if (s === 'Trial') return 'indigo'
    if (s === 'Suspended') return 'rose'
    return 'amber'
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: <BarChart2 size={14} /> },
    { key: 'tenants', label: 'Tenants', icon: <Building2 size={14} /> },
    { key: 'subscriptions', label: 'Plans', icon: <CreditCard size={14} /> },
    { key: 'usage', label: 'Usage & MRR', icon: <TrendingUp size={14} /> },
    { key: 'support', label: 'Support', icon: <AlertCircle size={14} /> },
    { key: 'config', label: 'Platform Config', icon: <Settings size={14} /> },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe size={24} className="text-indigo-500" />
            SaaS Administration
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Smart AI Campus Platform — Multi-tenant management console
          </p>
        </div>
        <ExportButton label="Export Report" onClick={() => showToast('SaaS report exported', 'success')} />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all relative ${
              activeTab === t.key ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
            }`}>
            {t.icon}{t.label}
            {t.key === 'support' && openTickets > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{openTickets}</span>
            )}
          </button>
        ))}
      </div>

      {/* Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Total Tenants" value={tenants.length} subtext={`${activeTenants} active`} icon={<Building2 size={18} />} status="healthy" />
            <StatCard title="Monthly Revenue" value={`₹${(mrr / 1000).toFixed(0)}K`} subtext="Recurring" icon={<CreditCard size={18} />} status="healthy" />
            <StatCard title="Trial Tenants" value={tenants.filter(t => t.status === 'Trial').length} subtext="Conversion pending" icon={<Clock size={18} />} status="warning" />
            <StatCard title="Open Tickets" value={openTickets} subtext="Needs resolution" icon={<AlertCircle size={18} />} status={openTickets > 3 ? 'warning' : 'healthy'} />
          </div>

          {/* Tenant health overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-5">
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2"><Building2 size={16} className="text-indigo-500" /> Tenant Status</h3>
              <div className="space-y-3">
                {tenants.map(t => (
                  <div key={t.id} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{t.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t.city} · {t.students} students · {t.plan}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={statusVariant(t.status)}>{t.status}</Badge>
                      {t.monthlyRevenue > 0 && <span className="text-xs font-semibold text-green-600 dark:text-green-400">₹{(t.monthlyRevenue / 1000).toFixed(0)}K/mo</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-5">
              <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2"><AlertCircle size={16} className="text-amber-500" /> Open Support Tickets</h3>
              <div className="space-y-3">
                {supportTickets.filter(t => t.status === 'Open' || t.status === 'In-Progress').map(t => (
                  <div key={t.id} className={`p-3 rounded-xl border ${t.priority === 'High' ? 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800' : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'}`}>
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{t.subject}</p>
                      <Badge variant={t.priority === 'High' ? 'rose' : 'amber'}>{t.priority}</Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{t.tenant} · {t.assignedTo}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Revenue by plan */}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-5">
            <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-indigo-500" /> MRR by Plan</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Starter', 'Growth', 'Professional', 'Enterprise'].map(plan => {
                const planTenants = tenants.filter(t => t.plan === plan)
                const revenue = planTenants.reduce((s, t) => s + t.monthlyRevenue, 0)
                return (
                  <div key={plan} className={`p-4 rounded-xl ${planVariant(plan) === 'amber' ? 'bg-amber-50 dark:bg-amber-900/20' : planVariant(plan) === 'indigo' ? 'bg-indigo-50 dark:bg-indigo-900/20' : planVariant(plan) === 'teal' ? 'bg-teal-50 dark:bg-teal-900/20' : 'bg-slate-50 dark:bg-slate-800'}`}>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{plan}</p>
                    <p className="text-xl font-bold text-slate-700 dark:text-slate-200">₹{(revenue / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{planTenants.length} tenant(s)</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tenants Tab */}
      {activeTab === 'tenants' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {['All', 'Starter', 'Growth', 'Professional', 'Enterprise'].map(p => (
                <button key={p} onClick={() => setPlanFilter(p)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${planFilter === p ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                  {p}
                </button>
              ))}
              {['All', 'Active', 'Trial', 'Suspended'].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${statusFilter === s ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                  {s}
                </button>
              ))}
            </div>
            <button onClick={() => showToast('New tenant provisioned', 'success')} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">
              <Plus size={14} />Add Tenant
            </button>
          </div>

          <div className="space-y-4">
            {filteredTenants.map(t => (
              <div key={t.id} className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <Building2 size={20} className="text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-700 dark:text-slate-200">{t.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{t.type} · {t.city} · {t.contact}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant={planVariant(t.plan)}>{t.plan}</Badge>
                        <Badge variant={statusVariant(t.status)}>{t.status}</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    {t.monthlyRevenue > 0 && (
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">₹{(t.monthlyRevenue / 1000).toFixed(0)}K/mo</p>
                    )}
                    <p className="text-xs text-slate-500 dark:text-slate-400">Renews: {t.renewalDate}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Joined: {t.joinedOn}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-center">
                    <p className="text-xl font-bold text-slate-700 dark:text-slate-200">{t.students.toLocaleString()}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Students</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-slate-700 dark:text-slate-200">{t.staff}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Staff</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-slate-700 dark:text-slate-200">{t.modules}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Modules</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <button onClick={() => showToast(`Viewing ${t.name} portal`, 'info')} className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"><Eye size={11} />View</button>
                  <button onClick={() => showToast(`Editing ${t.name} settings`, 'info')} className="flex items-center gap-1 px-3 py-1.5 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors"><Edit size={11} />Edit</button>
                  {t.status === 'Suspended' && (
                    <button onClick={() => showToast(`${t.name} account reactivated`, 'success')} className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-xl text-xs hover:bg-green-700 transition-colors"><RefreshCw size={11} />Reactivate</button>
                  )}
                  {t.status === 'Trial' && (
                    <button onClick={() => showToast(`${t.name} converted to paid plan`, 'success')} className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs hover:bg-indigo-700 transition-colors"><CheckCircle2 size={11} />Convert to Paid</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Plans Tab */}
      {activeTab === 'subscriptions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {plans.map(p => (
              <div key={p.name} className={`${p.color} border border-current/20 rounded-2xl p-5 relative hover:shadow-md transition-shadow`}>
                {p.name === 'Enterprise' && <span className="absolute -top-2 left-4 text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full font-bold">Most Popular</span>}
                <h3 className="font-bold text-lg mb-1">{p.name}</h3>
                <p className="text-2xl font-extrabold mb-3">{p.price}</p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex items-center gap-2"><CheckCircle2 size={13} />Students: {p.students}</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={13} />Modules: {p.modules}</div>
                  <div className="flex items-center gap-2"><CheckCircle2 size={13} />Support: {p.support}</div>
                </div>
                <button onClick={() => showToast(`Creating ${p.name} plan instance`, 'success')} className="mt-4 w-full py-2 bg-current/10 hover:bg-current/20 rounded-xl text-sm font-medium transition-colors">
                  Configure Plan
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-5">
            <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4">Tenant Plan Distribution</h3>
            <div className="space-y-3">
              {['Starter', 'Growth', 'Professional', 'Enterprise'].map(plan => {
                const count = tenants.filter(t => t.plan === plan).length
                const pct = Math.round((count / tenants.length) * 100)
                return (
                  <div key={plan}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600 dark:text-slate-300">{plan}</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">{count} tenant(s)</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full">
                      <div className="h-2 rounded-full bg-indigo-500" style={{ width: `${pct || 5}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Usage Tab */}
      {activeTab === 'usage' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {usageMetrics.map(m => (
              <div key={m.metric} className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{m.metric}</p>
                <p className="text-2xl font-bold text-slate-700 dark:text-slate-200">{m.value}</p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">{m.trend} vs last month</p>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-5">
            <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4">Module Adoption Rate (Top 10)</h3>
            <div className="space-y-2.5">
              {[
                { module: 'Attendance Management', rate: 98 },
                { module: 'Fee Management', rate: 95 },
                { module: 'Student Portal', rate: 92 },
                { module: 'Parent Portal', rate: 89 },
                { module: 'Examination Management', rate: 87 },
                { module: 'Transport Management', rate: 82 },
                { module: 'Communications', rate: 79 },
                { module: 'Library Management', rate: 74 },
                { module: 'Hostel Management', rate: 65 },
                { module: 'AI Assistant Hub', rate: 58 },
              ].map(m => (
                <div key={m.module}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600 dark:text-slate-300">{m.module}</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{m.rate}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full">
                    <div className={`h-1.5 rounded-full ${m.rate > 90 ? 'bg-green-500' : m.rate > 75 ? 'bg-indigo-500' : 'bg-amber-500'}`} style={{ width: `${m.rate}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Support Tab */}
      {activeTab === 'support' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard title="Open Tickets" value={supportTickets.filter(t => t.status === 'Open').length} subtext="Unassigned" icon={<AlertCircle size={18} />} status="warning" />
            <StatCard title="In Progress" value={supportTickets.filter(t => t.status === 'In-Progress').length} subtext="Being resolved" icon={<Clock size={18} />} status="healthy" />
            <StatCard title="Resolved" value={supportTickets.filter(t => t.status === 'Resolved').length} subtext="This week" icon={<CheckCircle2 size={18} />} status="healthy" />
            <StatCard title="Avg. Resolution" value="4.2h" subtext="This month" icon={<TrendingUp size={18} />} status="healthy" />
          </div>

          <div className="space-y-3">
            {supportTickets.map(t => (
              <div key={t.id} className={`bg-white dark:bg-[#131B2E] border rounded-2xl shadow-xs p-4 hover:shadow-sm transition-shadow ${t.priority === 'High' && t.status !== 'Resolved' && t.status !== 'Closed' ? 'border-rose-200 dark:border-rose-800' : 'border-slate-200 dark:border-slate-800'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge variant={t.priority === 'High' ? 'rose' : t.priority === 'Medium' ? 'amber' : 'indigo'}>{t.priority}</Badge>
                      <Badge variant={t.status === 'Resolved' || t.status === 'Closed' ? 'teal' : t.status === 'In-Progress' ? 'indigo' : 'amber'}>{t.status}</Badge>
                      <span className="text-xs text-slate-400 dark:text-slate-500">{t.id}</span>
                    </div>
                    <p className="font-semibold text-slate-700 dark:text-slate-200">{t.subject}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{t.tenant} · Opened: {t.openedAt}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Assigned to: {t.assignedTo}</p>
                  </div>
                  <div className="flex gap-2 shrink-0 flex-col items-end">
                    {(t.status === 'Open' || t.status === 'In-Progress') && (
                      <>
                        <button onClick={() => showToast(`Ticket ${t.id} resolved`, 'success')} className="px-3 py-1.5 bg-green-600 text-white rounded-xl text-xs hover:bg-green-700 transition-colors">Mark Resolved</button>
                        <button onClick={() => showToast(`Replying to ${t.tenant}`, 'info')} className="px-3 py-1.5 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">Reply</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Config Tab */}
      {activeTab === 'config' && (
        <div className="max-w-2xl space-y-4">
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-6">
            <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-5 flex items-center gap-2"><Settings size={16} className="text-indigo-500" /> Platform Configuration</h3>
            <div className="space-y-4">
              {[
                { label: 'Platform Name', value: 'Smart AI Campus (SAC)', type: 'text' },
                { label: 'Platform Version', value: 'v3.4.2', type: 'text' },
                { label: 'Default Language', value: 'English (en-IN)', type: 'select' },
                { label: 'Max Tenants', value: '100', type: 'text' },
                { label: 'Max Students Per Tenant (Enterprise)', value: 'Unlimited', type: 'text' },
                { label: 'Session Timeout (minutes)', value: '60', type: 'text' },
              ].map(f => (
                <div key={f.label} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800 last:border-0">
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-300">{f.label}</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-700 dark:text-slate-200">{f.value}</span>
                    <button onClick={() => showToast(`Editing ${f.label}`, 'info')} className="p-1.5 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"><Edit size={12} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs p-6">
            <h3 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2"><Shield size={16} className="text-indigo-500" /> Platform Health</h3>
            <div className="space-y-2">
              {[
                { label: 'API Gateway', status: 'Operational', color: 'text-green-600' },
                { label: 'Database Cluster', status: 'Operational', color: 'text-green-600' },
                { label: 'File Storage (S3)', status: 'Operational', color: 'text-green-600' },
                { label: 'Redis Cache', status: 'Operational', color: 'text-green-600' },
                { label: 'SMS Service', status: 'Operational', color: 'text-green-600' },
                { label: 'Email Service', status: 'Operational', color: 'text-green-600' },
                { label: 'Background Jobs', status: 'Operational', color: 'text-green-600' },
              ].map(s => (
                <div key={s.label} className="flex justify-between text-sm py-1.5 border-b border-slate-50 dark:border-slate-800 last:border-0">
                  <span className="text-slate-600 dark:text-slate-300">{s.label}</span>
                  <span className={`font-semibold flex items-center gap-1 ${s.color}`}><CheckCircle2 size={12} />{s.status}</span>
                </div>
              ))}
            </div>
            <button onClick={() => showToast('Health check initiated', 'info')} className="mt-4 flex items-center gap-1.5 px-4 py-2 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 rounded-xl text-sm hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">
              <RefreshCw size={14} />Run Health Check
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
