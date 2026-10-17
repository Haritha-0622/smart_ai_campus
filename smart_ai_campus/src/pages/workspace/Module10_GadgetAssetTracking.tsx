import React from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { Laptop } from 'lucide-react'

export const Module10_GadgetAssetTracking: React.FC = () => {
  const { gadgets, institution } = useApp()
  const statusVariant: Record<string, 'emerald' | 'amber' | 'rose' | 'slate'> = { 'Assigned': 'emerald', 'In Storage': 'slate', 'Under Repair': 'amber', 'Decommissioned': 'rose', 'Available': 'teal' as any }
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center"><Laptop className="w-5 h-5 text-slate-600 dark:text-slate-400" /></div>
          <div>
            <h1 className="text-xl font-extrabold text-[#101A33] dark:text-white flex items-center gap-2">10. Gadget & Asset Tracking <Badge variant="slate">Module 10</Badge></h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">{institution.name} · {gadgets.length} tracked assets</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead><tr className="border-b border-slate-100 dark:border-slate-800">{['Asset ID', 'Type', 'Model', 'Assigned To', 'Department', 'Status', 'Serial No'].map((h) => <th key={h} className="pb-2 text-left font-semibold text-slate-500 pr-4 whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {gadgets.map((g) => (
                <tr key={g.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 pr-4 font-mono text-[10px] text-slate-400">{g.assetId}</td>
                  <td className="py-2.5 pr-4 font-semibold text-slate-800 dark:text-slate-200">{g.type}</td>
                  <td className="py-2.5 pr-4 text-slate-500">{g.model}</td>
                  <td className="py-2.5 pr-4 text-slate-600 dark:text-slate-400">{g.assignedTo || '—'}</td>
                  <td className="py-2.5 pr-4 text-slate-500">{g.department}</td>
                  <td className="py-2.5 pr-4"><Badge variant={statusVariant[g.status] || 'slate'}>{g.status}</Badge></td>
                  <td className="py-2.5 font-mono text-[10px] text-slate-400">{g.serialNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
