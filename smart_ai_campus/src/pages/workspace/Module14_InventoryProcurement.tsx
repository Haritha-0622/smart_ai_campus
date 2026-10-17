import React, { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import { Package, AlertTriangle, ShoppingCart, CheckCircle2, XCircle, Plus, Search } from 'lucide-react'

type Tab = 'dashboard' | 'inventory' | 'purchase-requests' | 'vendors' | 'goods-received'
const TABS: { key: Tab; label: string }[] = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'inventory', label: 'Inventory' },
  { key: 'purchase-requests', label: 'Purchase Requests' },
  { key: 'vendors', label: 'Vendors' },
  { key: 'goods-received', label: 'Goods Received' },
]

const INVENTORY_ITEMS = [
  { id: 'inv01', name: 'A4 Copier Paper (Ream)', category: 'Stationery', currentStock: 120, minimumStock: 50, unit: 'Reams', location: 'Store Room 1', lastRestocked: '2025-10-01', status: 'Adequate' as const },
  { id: 'inv02', name: 'Exam Answer Booklets', category: 'Examination', currentStock: 480, minimumStock: 1000, unit: 'Nos', location: 'Central Stores', lastRestocked: '2025-09-15', status: 'Low Stock' as const },
  { id: 'inv03', name: 'Whiteboard Markers (Box)', category: 'Teaching Aids', currentStock: 8, minimumStock: 10, unit: 'Boxes', location: 'Store Room 2', lastRestocked: '2025-09-20', status: 'Low Stock' as const },
  { id: 'inv04', name: 'Printer Toner Cartridge', category: 'IT Consumables', currentStock: 2, minimumStock: 5, unit: 'Nos', location: 'IT Room', lastRestocked: '2025-10-05', status: 'Critical' as const },
  { id: 'inv05', name: 'Sanitizer (5L Can)', category: 'Housekeeping', currentStock: 18, minimumStock: 10, unit: 'Cans', location: 'Housekeeping Store', lastRestocked: '2025-10-10', status: 'Adequate' as const },
  { id: 'inv06', name: 'Laboratory Glassware Set', category: 'Lab Equipment', currentStock: 12, minimumStock: 8, unit: 'Sets', location: 'Science Lab', lastRestocked: '2025-08-01', status: 'Adequate' as const },
  { id: 'inv07', name: 'Sports Equipment Kit', category: 'Sports', currentStock: 5, minimumStock: 5, unit: 'Kits', location: 'Sports Room', lastRestocked: '2025-07-15', status: 'Adequate' as const },
  { id: 'inv08', name: 'First Aid Kit', category: 'Medical', currentStock: 3, minimumStock: 5, unit: 'Kits', location: 'Sick Room', lastRestocked: '2025-09-01', status: 'Low Stock' as const },
  { id: 'inv09', name: 'Projector Lamp', category: 'IT Equipment', currentStock: 0, minimumStock: 2, unit: 'Nos', location: 'AV Room', lastRestocked: '2025-06-10', status: 'Out of Stock' as const },
  { id: 'inv10', name: 'Chairs (Plastic)', category: 'Furniture', currentStock: 45, minimumStock: 20, unit: 'Nos', location: 'Store Room 3', lastRestocked: '2025-05-20', status: 'Adequate' as const },
  { id: 'inv11', name: 'Chalk (White, Box)', category: 'Teaching Aids', currentStock: 30, minimumStock: 20, unit: 'Boxes', location: 'Store Room 1', lastRestocked: '2025-10-08', status: 'Adequate' as const },
  { id: 'inv12', name: 'Cleaning Mop Set', category: 'Housekeeping', currentStock: 4, minimumStock: 6, unit: 'Sets', location: 'Housekeeping Store', lastRestocked: '2025-09-28', status: 'Low Stock' as const },
]

const VENDORS = [
  { id: 'v1', name: 'Sundaram Office Supplies', category: 'Stationery', contact: '9876543200', rating: 4.5, lastOrder: '2025-10-01', status: 'Active' },
  { id: 'v2', name: 'TechPro IT Solutions', category: 'IT Equipment', contact: '9876543201', rating: 4.2, lastOrder: '2025-09-15', status: 'Active' },
  { id: 'v3', name: 'LabEquip India', category: 'Lab Equipment', contact: '9876543202', rating: 4.8, lastOrder: '2025-08-01', status: 'Active' },
  { id: 'v4', name: 'CleanCo Housekeeping', category: 'Housekeeping', contact: '9876543203', rating: 3.9, lastOrder: '2025-10-10', status: 'Active' },
  { id: 'v5', name: 'PrintMaster Consumables', category: 'IT Consumables', contact: '9876543204', rating: 4.1, lastOrder: '2025-10-05', status: 'Active' },
  { id: 'v6', name: 'SportZone Equipment', category: 'Sports', contact: '9876543205', rating: 4.4, lastOrder: '2025-07-15', status: 'Inactive' },
]

const GRN_LIST = [
  { id: 'grn01', grnNo: 'GRN-2025-001', prNo: 'PR-2025-001', vendor: 'Sundaram Office Supplies', item: 'A4 Paper', qty: 100, date: '2025-10-02', inspector: 'Stores Mgr', status: 'Accepted' },
  { id: 'grn02', grnNo: 'GRN-2025-002', prNo: 'PR-2025-003', vendor: 'TechPro IT Solutions', item: 'Printer Toner', qty: 5, date: '2025-10-06', inspector: 'IT Head', status: 'Accepted' },
  { id: 'grn03', grnNo: 'GRN-2025-003', prNo: 'PR-2025-005', vendor: 'CleanCo Housekeeping', item: 'Sanitizer 5L', qty: 20, date: '2025-10-11', inspector: 'Housekeeping', status: 'Accepted' },
  { id: 'grn04', grnNo: 'GRN-2025-004', prNo: 'PR-2025-007', vendor: 'LabEquip India', item: 'Glassware Set', qty: 6, date: '2025-08-02', inspector: 'Science HOD', status: 'Partial' },
  { id: 'grn05', grnNo: 'GRN-2025-005', prNo: 'PR-2025-009', vendor: 'SportZone Equipment', item: 'Sports Kit', qty: 5, date: '2025-07-16', inspector: 'PT Teacher', status: 'Accepted' },
  { id: 'grn06', grnNo: 'GRN-2025-006', prNo: 'PR-2025-012', vendor: 'PrintMaster Consumables', item: 'Projector Lamp', qty: 2, date: '2025-06-11', inspector: 'AV Coordinator', status: 'Rejected' },
  { id: 'grn07', grnNo: 'GRN-2025-007', prNo: 'PR-2025-015', vendor: 'Sundaram Office Supplies', item: 'Exam Booklets', qty: 500, date: '2025-09-16', inspector: 'Exam Controller', status: 'Accepted' },
  { id: 'grn08', grnNo: 'GRN-2025-008', prNo: 'PR-2025-018', vendor: 'CleanCo Housekeeping', item: 'Mop Sets', qty: 4, date: '2025-09-29', inspector: 'Stores Mgr', status: 'Accepted' },
]

export const Module14_InventoryProcurement: React.FC = () => {
  const { purchaseRequests, updatePurchaseRequestStatus, institution, showToast } = useApp()
  const [tab, setTab] = useState<Tab>('dashboard')
  const [invSearch, setInvSearch] = useState('')
  const [invCatFilter, setInvCatFilter] = useState('all')
  const [prStatusFilter, setPrStatusFilter] = useState('all')

  const lowStock = INVENTORY_ITEMS.filter(i => i.status === 'Low Stock' || i.status === 'Critical' || i.status === 'Out of Stock')
  const pending = purchaseRequests.filter(p => p.status === 'Pending').length
  const categories = ['all', ...Array.from(new Set(INVENTORY_ITEMS.map(i => i.category)))]

  const filteredInv = useMemo(() => INVENTORY_ITEMS.filter(i => {
    const ms = i.name.toLowerCase().includes(invSearch.toLowerCase())
    const mc = invCatFilter === 'all' || i.category === invCatFilter
    return ms && mc
  }), [invSearch, invCatFilter])

  const filteredPR = useMemo(() => purchaseRequests.filter(p =>
    prStatusFilter === 'all' || p.status === prStatusFilter
  ), [purchaseRequests, prStatusFilter])

  const statusColor = (s: string) => {
    if (s === 'Adequate') return 'teal'
    if (s === 'Low Stock') return 'amber'
    if (s === 'Critical') return 'rose'
    if (s === 'Out of Stock') return 'rose'
    return 'indigo'
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-xl font-extrabold text-[#101A33] dark:text-white">Inventory & Procurement</h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{institution.name} &bull; Stock Management & Purchase Orders</p>
          </div>
          <ExportButton filename="inventory" data={INVENTORY_ITEMS.map(i => ({ name: i.name, stock: i.currentStock, status: i.status }))} label="Export" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          <StatCard title="Total Items" value={INVENTORY_ITEMS.length} subtext="In catalog" icon={Package} status="healthy" />
          <StatCard title="Low / Critical" value={lowStock.length} subtext="Need reorder" icon={AlertTriangle} status={lowStock.length > 3 ? 'critical' : 'warning'} />
          <StatCard title="Out of Stock" value={INVENTORY_ITEMS.filter(i => i.status === 'Out of Stock').length} subtext="Zero stock" icon={AlertTriangle} status="critical" />
          <StatCard title="Pending PRs" value={pending} subtext="Awaiting approval" icon={ShoppingCart} status={pending > 0 ? 'warning' : 'healthy'} />
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
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Stock Alerts — Requires Reorder</h2>
          <div className="space-y-3">
            {lowStock.map(item => (
              <div key={item.id} className={`flex items-center gap-4 p-3 rounded-xl border ${item.status === 'Out of Stock' || item.status === 'Critical' ? 'border-rose-200 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/10' : 'border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/10'}`}>
                <AlertTriangle className={`w-4 h-4 shrink-0 ${item.status === 'Out of Stock' || item.status === 'Critical' ? 'text-rose-500' : 'text-amber-500'}`} />
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.name}</p>
                  <p className="text-[10px] text-slate-500">{item.category} &bull; {item.location}</p>
                </div>
                <div className="text-right text-[10px]">
                  <p className="font-bold text-rose-600">Stock: {item.currentStock} {item.unit}</p>
                  <p className="text-slate-400">Min: {item.minimumStock}</p>
                </div>
                <Badge variant={statusColor(item.status) as any}>{item.status}</Badge>
                <button onClick={() => showToast(`Purchase request raised for ${item.name}`, 'success')}
                  className="px-2 py-1 rounded bg-indigo-600 text-white text-[10px] hover:bg-indigo-700 cursor-pointer shrink-0">
                  Raise PR
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'inventory' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={invSearch} onChange={e => setInvSearch(e.target.value)} placeholder="Search items..."
                className="pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48" />
            </div>
            <select value={invCatFilter} onChange={e => setInvCatFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none">
              {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>)}
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Item Name', 'Category', 'Stock', 'Min Stock', 'Unit', 'Location', 'Last Restocked', 'Status', 'Action'].map(h => (
                    <th key={h} className="text-left py-2 pr-3 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredInv.map(item => (
                  <tr key={item.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-3 font-medium text-slate-800 dark:text-slate-200">{item.name}</td>
                    <td className="py-2 pr-3"><Badge variant="indigo">{item.category}</Badge></td>
                    <td className={`py-2 pr-3 font-bold ${item.currentStock === 0 ? 'text-rose-600' : item.currentStock < item.minimumStock ? 'text-amber-600' : 'text-teal-600'}`}>{item.currentStock}</td>
                    <td className="py-2 pr-3 text-slate-500">{item.minimumStock}</td>
                    <td className="py-2 pr-3 text-slate-500">{item.unit}</td>
                    <td className="py-2 pr-3 text-slate-500">{item.location}</td>
                    <td className="py-2 pr-3 text-slate-500">{item.lastRestocked}</td>
                    <td className="py-2 pr-3"><Badge variant={statusColor(item.status) as any}>{item.status}</Badge></td>
                    <td className="py-2 pr-3">
                      <button onClick={() => showToast(`Stock updated for ${item.name}`, 'success')}
                        className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] hover:bg-slate-200 cursor-pointer">Update</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'purchase-requests' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <select value={prStatusFilter} onChange={e => setPrStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none">
              <option value="all">All Status</option>
              {['Pending', 'Approved', 'Rejected', 'Ordered', 'Received'].map(s => <option key={s}>{s}</option>)}
            </select>
            <button onClick={() => showToast('Opening PR form...', 'info')}
              className="ml-auto px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> New PR
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['PR No', 'Item', 'Qty', 'Est Cost', 'Requested By', 'Priority', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left py-2 pr-3 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredPR.map(pr => (
                  <tr key={pr.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-3 font-mono text-slate-500">{pr.prNumber}</td>
                    <td className="py-2 pr-3 font-medium text-slate-800 dark:text-slate-200">{pr.item}</td>
                    <td className="py-2 pr-3 text-center text-slate-600">{pr.quantity}</td>
                    <td className="py-2 pr-3 text-slate-600">₹{pr.estimatedCost.toLocaleString()}</td>
                    <td className="py-2 pr-3 text-slate-500">{pr.requestedBy}</td>
                    <td className="py-2 pr-3"><Badge variant={pr.priority === 'Critical' ? 'rose' : pr.priority === 'High' ? 'amber' : 'indigo'}>{pr.priority}</Badge></td>
                    <td className="py-2 pr-3"><Badge variant={pr.status === 'Approved' ? 'teal' : pr.status === 'Rejected' ? 'rose' : 'amber'}>{pr.status}</Badge></td>
                    <td className="py-2 pr-3">
                      {pr.status === 'Pending' && (
                        <div className="flex gap-1">
                          <button onClick={() => { updatePurchaseRequestStatus(pr.id, 'Approved'); showToast(`PR ${pr.prNumber} approved`, 'success') }}
                            className="p-1 rounded bg-teal-50 dark:bg-teal-950/40 text-teal-700 cursor-pointer hover:bg-teal-100">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => { updatePurchaseRequestStatus(pr.id, 'Rejected'); showToast(`PR ${pr.prNumber} rejected`, 'warning') }}
                            className="p-1 rounded bg-rose-50 dark:bg-rose-950/40 text-rose-700 cursor-pointer hover:bg-rose-100">
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'vendors' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Approved Vendor List</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Vendor Name', 'Category', 'Contact', 'Rating', 'Last Order', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {VENDORS.map(v => (
                  <tr key={v.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{v.name}</td>
                    <td className="py-2 pr-4"><Badge variant="indigo">{v.category}</Badge></td>
                    <td className="py-2 pr-4 text-slate-500">{v.contact}</td>
                    <td className="py-2 pr-4">
                      <span className="text-amber-500 font-bold">{'★'.repeat(Math.floor(v.rating))}</span>
                      <span className="text-slate-300 dark:text-slate-600">{'★'.repeat(5 - Math.floor(v.rating))}</span>
                      <span className="text-slate-500 ml-1">{v.rating}</span>
                    </td>
                    <td className="py-2 pr-4 text-slate-500">{v.lastOrder}</td>
                    <td className="py-2 pr-4"><Badge variant={v.status === 'Active' ? 'teal' : 'amber'}>{v.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'goods-received' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Goods Received Notes (GRN)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['GRN No', 'PR No', 'Vendor', 'Item', 'Qty', 'Date', 'Inspector', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 pr-3 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {GRN_LIST.map(g => (
                  <tr key={g.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-3 font-mono text-slate-500">{g.grnNo}</td>
                    <td className="py-2 pr-3 font-mono text-slate-500">{g.prNo}</td>
                    <td className="py-2 pr-3 text-slate-600 dark:text-slate-300">{g.vendor}</td>
                    <td className="py-2 pr-3 font-medium text-slate-800 dark:text-slate-200">{g.item}</td>
                    <td className="py-2 pr-3 text-center text-slate-600">{g.qty}</td>
                    <td className="py-2 pr-3 text-slate-500">{g.date}</td>
                    <td className="py-2 pr-3 text-slate-500">{g.inspector}</td>
                    <td className="py-2 pr-3"><Badge variant={g.status === 'Accepted' ? 'teal' : g.status === 'Partial' ? 'amber' : 'rose'}>{g.status}</Badge></td>
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
