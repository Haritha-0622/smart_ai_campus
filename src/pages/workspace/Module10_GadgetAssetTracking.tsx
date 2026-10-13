import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { ExportButton } from '../../components/common/ExportButton'
import { Laptop, Cpu, CheckCircle, AlertTriangle, RotateCcw, Search, Plus } from 'lucide-react'

export const Module10_GadgetAssetTracking: React.FC = () => {
  const { showToast } = useApp()
  const [search, setSearch] = useState('')

  const [assets, setAssets] = useState([
    { id: 'AST-01', code: 'DEV-LAP-042', name: 'Lenovo ThinkPad E14 Gen 4', category: 'Computing Hardware', custodian: 'Prof. Meenakshi Sundaram', location: 'Physics Dept Office', condition: 'Optimal', returnDate: 'Annual Retention' },
    { id: 'AST-02', code: 'PROJ-OPT-012', name: 'Epson 4K Laser Projector', category: 'Smart Classroom', custodian: 'Rajesh Varma (Admin)', location: 'Ramanujan Hall 3A', condition: 'Optimal', returnDate: 'Fixed Installation' },
    { id: 'AST-03', code: 'VR-HEAD-008', name: 'Meta Quest 2 STEM VR Headset', category: 'Robotics Lab', custodian: 'Dr. Anand Ramanathan', location: 'Innovation Hub', condition: 'Service Due', returnDate: '15-Oct-2026' },
    { id: 'AST-04', code: 'MIC-DIGI-019', name: 'Olympus Digital Binocular Microscope', category: 'Biology Lab', custodian: 'Mrs. Shanthi Roy', location: 'Bio Lab Bay 2', condition: 'Optimal', returnDate: 'Permanent Lab Asset' }
  ])

  const handleReturnCheck = (code: string) => {
    showToast(`Asset ${code} verified and inventory condition signed`, 'success')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              10. Gadget & Tagged Asset Tracking
            </h1>
            <Badge variant="indigo">Module 10</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Barcode tagged institutional devices, faculty laptops, smart room beacons, custodian logs, and service audits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ExportButton filename="tagged_assets_registry" data={assets} />
          <button
            onClick={() => showToast('Opening Asset Tagging Dialog', 'info')}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
          >
            Register New Device Tag
          </button>
        </div>
      </div>

      {/* Asset Table */}
      <div className="bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Central Asset Registry</h3>
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search asset or custodian..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 border-y border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Asset Tag ID</th>
                <th className="py-2.5 px-3">Device Name & Category</th>
                <th className="py-2.5 px-3">Custodian Officer</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Condition Status</th>
                <th className="py-2.5 px-3 text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {assets.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-mono font-bold text-indigo-600">{a.code}</td>
                  <td className="py-3 px-3">
                    <p className="font-bold text-slate-900 dark:text-white">{a.name}</p>
                    <p className="text-[11px] text-slate-400">{a.category}</p>
                  </td>
                  <td className="py-3 px-3 text-slate-700 dark:text-slate-300 font-medium">{a.custodian}</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-400">{a.location}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        a.condition === 'Optimal'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}
                    >
                      {a.condition}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleReturnCheck(a.code)}
                      className="text-indigo-600 hover:underline font-semibold"
                    >
                      Verify Audit &rarr;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
