import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { MOCK_FEES, MOCK_BUDGET } from '../../data/mockData'
import { Badge } from '../../components/common/Badge'
import { ExportButton } from '../../components/common/ExportButton'
import { DollarSign, ShieldAlert, CheckCircle, FileText, TrendingUp, AlertTriangle } from 'lucide-react'

export const Module13_FinanceFees: React.FC = () => {
  const { showToast } = useApp()
  const [fees, setFees] = useState(MOCK_FEES)

  const handleSimulatePayment = (id: string, name: string) => {
    setFees((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: 'Paid' as const, date: 'Paid Just Now' } : f))
    )
    showToast(`Simulated Payment of ₹12,500 recorded for ${name}! Receipt generated.`, 'success')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              13. Finance, Fees & Institutional Budgeting
            </h1>
            <Badge variant="indigo">Module 13</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Accounts reconciliation, student dues tracking in INR, scholarship concessions, and budget vs actual audits.
          </p>
        </div>

        <ExportButton filename="finance_fee_transactions" data={fees} />
      </div>

      {/* Clear Demo Payment Disclaimer */}
      <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 flex items-center gap-2 text-xs text-amber-900 dark:text-amber-200">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
        <span>
          Compliance Note: All payment processing operations here are simulated demo transactions. No live payment gateway or banking ledger is connected.
        </span>
      </div>

      {/* Budget vs Actuals Audit View */}
      <div className="bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-xs">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
          Auditor-Recommended Budget Head Review (Budgeted vs Actuals)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 border-y border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Expenditure Head</th>
                <th className="py-2.5 px-3">Allocated Budget</th>
                <th className="py-2.5 px-3">Utilized to Date</th>
                <th className="py-2.5 px-3">Variance (INR)</th>
                <th className="py-2.5 px-3">Fiscal Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {MOCK_BUDGET.map((b, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">{b.category}</td>
                  <td className="py-3 px-3 font-mono font-medium">₹{b.allocated.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3 font-mono font-medium">₹{b.utilized.toLocaleString('en-IN')}</td>
                  <td className="py-3 px-3 font-mono font-bold">
                    <span className={b.variance >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                      {b.variance >= 0 ? `+₹${b.variance.toLocaleString('en-IN')}` : `-₹${Math.abs(b.variance).toLocaleString('en-IN')}`}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <Badge variant={b.status === 'Healthy' ? 'emerald' : 'rose'}>{b.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Fee Ledger */}
      <div className="bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-xs">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
          Student Fee Receivables & Payment Collections
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {fees.map((tx) => (
            <div key={tx.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">{tx.studentName}</span>
                  <span className="font-mono text-slate-400 font-semibold">{tx.receiptNo}</span>
                </div>
                <p className="text-slate-500 mt-0.5">
                  {tx.gradeOrDept} &bull; {tx.term} &bull; {tx.category}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5 font-mono">{tx.date}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-base font-extrabold text-slate-900 dark:text-white block font-mono">
                    ₹{tx.amount.toLocaleString('en-IN')}
                  </span>
                  <Badge
                    variant={
                      tx.status === 'Paid'
                        ? 'emerald'
                        : tx.status === 'Pending'
                        ? 'amber'
                        : tx.status === 'Overdue'
                        ? 'rose'
                        : 'indigo'
                    }
                  >
                    {tx.status}
                  </Badge>
                </div>

                {tx.status === 'Pending' && (
                  <button
                    onClick={() => handleSimulatePayment(tx.id, tx.studentName)}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer shadow-xs text-xs"
                  >
                    Simulate Payment
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
