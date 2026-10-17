import React, { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import { DollarSign, TrendingUp, AlertTriangle, Search, Plus, Download, CreditCard } from 'lucide-react'

type Tab = 'dashboard' | 'collections' | 'receipts' | 'dues' | 'budget-heads' | 'ledger'

const TABS: { key: Tab; label: string }[] = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'collections', label: 'Fee Collections' },
  { key: 'receipts', label: 'Receipts' },
  { key: 'dues', label: 'Dues & Defaulters' },
  { key: 'budget-heads', label: 'Budget Heads' },
  { key: 'ledger', label: 'Monthly Ledger' },
]

const BUDGET_HEADS = [
  { head: 'Staff Salaries', allocated: 8000000, utilized: 7400000 },
  { head: 'Infrastructure Maintenance', allocated: 1500000, utilized: 980000 },
  { head: 'Library & Books', allocated: 300000, utilized: 210000 },
  { head: 'Sports & Activities', allocated: 400000, utilized: 320000 },
  { head: 'Technology & IT', allocated: 600000, utilized: 540000 },
  { head: 'Transport Operations', allocated: 1200000, utilized: 1100000 },
  { head: 'Canteen Subsidy', allocated: 200000, utilized: 180000 },
  { head: 'Administrative Expenses', allocated: 500000, utilized: 390000 },
]

const LEDGER = [
  { month: 'June 2025', opening: 2400000, collections: 4200000, expenditure: 3800000, closing: 2800000, status: 'Closed' },
  { month: 'July 2025', opening: 2800000, collections: 3600000, expenditure: 3900000, closing: 2500000, status: 'Closed' },
  { month: 'August 2025', opening: 2500000, collections: 5100000, expenditure: 4200000, closing: 3400000, status: 'Closed' },
  { month: 'September 2025', opening: 3400000, collections: 3900000, expenditure: 4000000, closing: 3300000, status: 'Closed' },
  { month: 'October 2025', opening: 3300000, collections: 2100000, expenditure: 2800000, closing: 2600000, status: 'Open' },
]

const PAYMENT_METHODS = ['Cash', 'Online', 'DD', 'Cheque'] as const

export const Module13_FinanceFees: React.FC = () => {
  const { students, institution, showToast } = useApp()
  const [tab, setTab] = useState<Tab>('dashboard')
  const [search, setSearch] = useState('')
  const [collectStudentId, setCollectStudentId] = useState('')
  const [collectAmount, setCollectAmount] = useState('')
  const [collectMethod, setCollectMethod] = useState<typeof PAYMENT_METHODS[number]>('Online')
  const [showCollectForm, setShowCollectForm] = useState(false)

  const totalDue = useMemo(() => students.reduce((a, s) => a + s.feeTotal, 0), [students])
  const totalCollected = useMemo(() => students.reduce((a, s) => a + s.feePaid, 0), [students])
  const totalPending = useMemo(() => students.reduce((a, s) => a + s.feePending, 0), [students])
  const overdueCount = useMemo(() => students.filter(s => s.feePending > s.feeTotal * 0.5).length, [students])

  const filtered = useMemo(() => students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.regNo.toLowerCase().includes(search.toLowerCase())
  ), [students, search])

  const topDefaulters = useMemo(() => [...students].sort((a, b) => b.feePending - a.feePending).slice(0, 5), [students])

  const receipts = useMemo(() => students.filter(s => s.feePaid > 0).map((s, i) => ({
    receiptNo: `RCP-2025-${String(1000 + i).padStart(4, '0')}`,
    studentName: s.name,
    regNo: s.regNo,
    amount: s.feePaid,
    date: `2025-0${6 + (i % 4)}-${String(10 + (i % 15)).padStart(2, '0')}`,
    method: PAYMENT_METHODS[i % 4],
    grade: s.gradeOrDept,
  })), [students])

  const dues = useMemo(() => [...students.filter(s => s.feePending > 0)].sort((a, b) => b.feePending - a.feePending), [students])

  const handleCollect = () => {
    if (!collectStudentId || !collectAmount) { showToast('Select student and enter amount', 'warning'); return }
    const student = students.find(s => s.id === collectStudentId)
    showToast(`Fee of ₹${Number(collectAmount).toLocaleString()} collected from ${student?.name} via ${collectMethod}`, 'success')
    setShowCollectForm(false)
    setCollectStudentId('')
    setCollectAmount('')
  }

  const collectionPct = totalDue > 0 ? Math.round((totalCollected / totalDue) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-xl font-extrabold text-[#101A33] dark:text-white">Finance & Fee Collections</h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{institution.name} &bull; Academic Year {institution.currentYear}</p>
          </div>
          <ExportButton filename="finance_report" data={students.map(s => ({ regNo: s.regNo, name: s.name, paid: s.feePaid, pending: s.feePending }))} label="Export" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          <StatCard title="Total Fees Due" value={`₹${(totalDue / 100000).toFixed(1)}L`} subtext="Full year target" icon={DollarSign} status="healthy" />
          <StatCard title="Collected This Year" value={`₹${(totalCollected / 100000).toFixed(1)}L`} subtext={`${collectionPct}% of target`} icon={TrendingUp} status={collectionPct > 80 ? 'healthy' : 'warning'} />
          <StatCard title="Pending Dues" value={`₹${(totalPending / 100000).toFixed(1)}L`} subtext="Outstanding" icon={AlertTriangle} status="warning" />
          <StatCard title="Overdue Accounts" value={overdueCount} subtext="More than 50% pending" icon={CreditCard} status={overdueCount > 5 ? 'critical' : 'warning'} />
        </div>
        <div className="mb-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between text-xs mb-1">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Collection Progress</span>
            <span className="font-bold text-indigo-600">{collectionPct}% collected</span>
          </div>
          <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700">
            <div className={`h-3 rounded-full transition-all ${collectionPct > 80 ? 'bg-teal-500' : collectionPct > 60 ? 'bg-indigo-500' : 'bg-amber-400'}`} style={{ width: `${collectionPct}%` }} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${tab === t.key ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'dashboard' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Top 5 Defaulters</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Name', 'Reg No', 'Grade/Dept', 'Total Fee', 'Paid', 'Pending', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topDefaulters.map(s => (
                  <tr key={s.id} className="border-b border-rose-50 dark:border-rose-900/20 bg-rose-50/30 dark:bg-rose-950/5">
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{s.name}</td>
                    <td className="py-2 pr-4 text-slate-500">{s.regNo}</td>
                    <td className="py-2 pr-4 text-slate-500">{s.gradeOrDept}</td>
                    <td className="py-2 pr-4">₹{s.feeTotal.toLocaleString()}</td>
                    <td className="py-2 pr-4 text-teal-600">₹{s.feePaid.toLocaleString()}</td>
                    <td className="py-2 pr-4 font-bold text-rose-600">₹{s.feePending.toLocaleString()}</td>
                    <td className="py-2 pr-4"><Badge variant="rose">Overdue</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'collections' && (
        <div className="space-y-4">
          {showCollectForm && (
            <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs max-w-lg">
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Collect Fee Payment</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Select Student</label>
                  <select value={collectStudentId} onChange={e => setCollectStudentId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">-- Select Student --</option>
                    {students.filter(s => s.feePending > 0).map(s => (
                      <option key={s.id} value={s.id}>{s.name} — Pending: ₹{s.feePending.toLocaleString()}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Amount (₹)</label>
                  <input type="number" value={collectAmount} onChange={e => setCollectAmount(e.target.value)} placeholder="Enter amount"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Payment Method</label>
                  <select value={collectMethod} onChange={e => setCollectMethod(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    {PAYMENT_METHODS.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleCollect}
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer">Collect</button>
                  <button onClick={() => setShowCollectForm(false)}
                    className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs cursor-pointer">Cancel</button>
                </div>
              </div>
            </div>
          )}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or reg no..."
                  className="pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 w-52" />
              </div>
              <button onClick={() => setShowCollectForm(true)}
                className="ml-auto px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
                <Plus className="w-3.5 h-3.5" /> Collect Fee
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    {['Reg No', 'Name', 'Grade/Dept', 'Total Fee', 'Paid', 'Pending', 'Status'].map(h => (
                      <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(s => (
                    <tr key={s.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <td className="py-2 pr-4 text-slate-500">{s.regNo}</td>
                      <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{s.name}</td>
                      <td className="py-2 pr-4 text-slate-500">{s.gradeOrDept}</td>
                      <td className="py-2 pr-4">₹{s.feeTotal.toLocaleString()}</td>
                      <td className="py-2 pr-4 text-teal-600 font-semibold">₹{s.feePaid.toLocaleString()}</td>
                      <td className="py-2 pr-4 text-rose-600 font-semibold">₹{s.feePending.toLocaleString()}</td>
                      <td className="py-2 pr-4">
                        <Badge variant={s.feePending === 0 ? 'teal' : s.feePending < s.feeTotal * 0.3 ? 'amber' : 'rose'}>
                          {s.feePending === 0 ? 'Cleared' : s.feePending < s.feeTotal * 0.3 ? 'Partial' : 'Overdue'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === 'receipts' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Fee Receipts</h2>
            <ExportButton filename="receipts" data={receipts.map(r => ({ no: r.receiptNo, student: r.studentName, amount: r.amount, date: r.date }))} label="Export" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Receipt No', 'Student', 'Reg No', 'Grade', 'Date', 'Amount', 'Method', 'Action'].map(h => (
                    <th key={h} className="text-left py-2 pr-3 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {receipts.map(r => (
                  <tr key={r.receiptNo} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-3 font-mono text-slate-500">{r.receiptNo}</td>
                    <td className="py-2 pr-3 font-medium text-slate-800 dark:text-slate-200">{r.studentName}</td>
                    <td className="py-2 pr-3 text-slate-500">{r.regNo}</td>
                    <td className="py-2 pr-3 text-slate-500">{r.grade}</td>
                    <td className="py-2 pr-3 text-slate-500">{r.date}</td>
                    <td className="py-2 pr-3 font-bold text-teal-600">₹{r.amount.toLocaleString()}</td>
                    <td className="py-2 pr-3"><Badge variant={r.method === 'Online' ? 'teal' : r.method === 'Cash' ? 'amber' : 'indigo'}>{r.method}</Badge></td>
                    <td className="py-2 pr-3">
                      <button onClick={() => showToast(`Receipt ${r.receiptNo} downloaded`, 'success')}
                        className="flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] hover:bg-slate-200 cursor-pointer">
                        <Download className="w-3 h-3" /> PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'dues' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Pending Dues — Sorted by Amount</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Reg No', 'Name', 'Grade/Dept', 'Pending Amount', 'Category', 'Action'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dues.map(s => (
                  <tr key={s.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 text-slate-500">{s.regNo}</td>
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{s.name}</td>
                    <td className="py-2 pr-4 text-slate-500">{s.gradeOrDept}</td>
                    <td className="py-2 pr-4 font-bold text-rose-600">₹{s.feePending.toLocaleString()}</td>
                    <td className="py-2 pr-4"><Badge variant={s.category === 'Hosteller' ? 'teal' : 'indigo'}>{s.category}</Badge></td>
                    <td className="py-2 pr-4">
                      <button onClick={() => showToast(`Fee reminder sent to ${s.parentName} for ${s.name}`, 'info')}
                        className="px-2 py-1 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-[10px] hover:bg-amber-100 cursor-pointer">
                        Send Reminder
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'budget-heads' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Budget Head Utilization — {institution.currentYear}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Budget Head', 'Allocated', 'Utilized', 'Remaining', 'Utilization', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BUDGET_HEADS.map(b => {
                  const pct = Math.round((b.utilized / b.allocated) * 100)
                  const remaining = b.allocated - b.utilized
                  return (
                    <tr key={b.head} className="border-b border-slate-50 dark:border-slate-800/50">
                      <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{b.head}</td>
                      <td className="py-2 pr-4 text-slate-600">₹{(b.allocated / 100000).toFixed(1)}L</td>
                      <td className="py-2 pr-4 text-indigo-600 font-semibold">₹{(b.utilized / 100000).toFixed(1)}L</td>
                      <td className="py-2 pr-4 text-teal-600 font-semibold">₹{(remaining / 100000).toFixed(1)}L</td>
                      <td className="py-2 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                            <div className={`h-2 rounded-full ${pct > 90 ? 'bg-rose-500' : pct > 75 ? 'bg-amber-400' : 'bg-teal-500'}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                          </div>
                          <span className="font-semibold">{pct}%</span>
                        </div>
                      </td>
                      <td className="py-2 pr-4">
                        <Badge variant={pct > 90 ? 'rose' : pct > 75 ? 'amber' : 'teal'}>
                          {pct > 90 ? 'Overrun Risk' : pct > 75 ? 'Warning' : 'Healthy'}
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'ledger' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Monthly Financial Ledger</h2>
            <ExportButton filename="ledger" data={LEDGER} label="Export" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Month', 'Opening Balance', 'Collections', 'Expenditure', 'Closing Balance', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {LEDGER.map(l => (
                  <tr key={l.month} className={`border-b border-slate-50 dark:border-slate-800/50 ${l.status === 'Open' ? 'bg-indigo-50/30 dark:bg-indigo-950/10' : ''}`}>
                    <td className="py-2 pr-4 font-semibold text-slate-800 dark:text-slate-200">{l.month}</td>
                    <td className="py-2 pr-4 text-slate-600">₹{(l.opening / 100000).toFixed(1)}L</td>
                    <td className="py-2 pr-4 text-teal-600 font-semibold">₹{(l.collections / 100000).toFixed(1)}L</td>
                    <td className="py-2 pr-4 text-rose-600 font-semibold">₹{(l.expenditure / 100000).toFixed(1)}L</td>
                    <td className="py-2 pr-4 font-bold text-indigo-600">₹{(l.closing / 100000).toFixed(1)}L</td>
                    <td className="py-2 pr-4"><Badge variant={l.status === 'Open' ? 'indigo' : 'teal'}>{l.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
