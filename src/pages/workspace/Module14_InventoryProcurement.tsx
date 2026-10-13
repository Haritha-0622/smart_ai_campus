import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { MOCK_INVENTORY } from '../../data/mockData'
import { PurchaseRequestModal } from '../../components/workflows/PurchaseRequestModal'
import { Badge } from '../../components/common/Badge'
import { ExportButton } from '../../components/common/ExportButton'
import { Package, AlertCircle, ShoppingCart, CheckCircle, Plus, Zap } from 'lucide-react'

export const Module14_InventoryProcurement: React.FC = () => {
  const { purchaseRequests, updatePurchaseRequestStatus, showToast } = useApp()
  const [prModalOpen, setPrModalOpen] = useState(false)
  const [inventoryList, setInventoryList] = useState(MOCK_INVENTORY)

  const handleSimulateGoodsReceipt = (prId: string, itemCode: string, qty: number) => {
    updatePurchaseRequestStatus(prId, 'Goods Received')
    setInventoryList((prev) =>
      prev.map((item) =>
        item.code === itemCode
          ? {
              ...item,
              currentStock: item.currentStock + qty,
              status: 'Optimal' as const
            }
          : item
      )
    )
    showToast(`Goods Receipt signed! Central Store stock increased by ${qty} units.`, 'success')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              14. Inventory, Stores & Smart Purchase Alarms
            </h1>
            <Badge variant="indigo">Module 14</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Bill of Materials (BOM), central store stock points, replenishment triggers, and PO issuance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ExportButton filename="inventory_stock_master" data={inventoryList} />
          <button
            onClick={() => setPrModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Raise Purchase Request</span>
          </button>
        </div>
      </div>

      {/* SMART PURCHASE ALARM HIGHLIGHT */}
      <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-extrabold text-amber-900 dark:text-amber-200 uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-600 animate-pulse" />
            <span>Smart Purchase Alarm Triggered</span>
          </span>
          <Badge variant="amber">Replenishment Priority: High</Badge>
        </div>
        <p className="text-amber-900 dark:text-amber-300">
          Security Barcoded Examination Answer Sheets (STN-EXAM-A4) has fallen to 480 booklets. Minimum critical buffer is 1,000 booklets. Mid-term examination commences in 5 days.
        </p>
      </div>

      {/* Item Master Table */}
      <div className="bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-xs">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
          Central Store Catalog & Safety Thresholds
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-500 border-y border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Item Code</th>
                <th className="py-2.5 px-3">Item Name & Category</th>
                <th className="py-2.5 px-3">Current Stock</th>
                <th className="py-2.5 px-3">Safety Threshold</th>
                <th className="py-2.5 px-3">Storage Bay</th>
                <th className="py-2.5 px-3">Unit Cost</th>
                <th className="py-2.5 px-3">Stock Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {inventoryList.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-3 font-mono font-bold text-indigo-600">{item.code}</td>
                  <td className="py-3 px-3">
                    <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                    <p className="text-[11px] text-slate-400">{item.category}</p>
                  </td>
                  <td className="py-3 px-3 font-bold font-mono">
                    {item.currentStock} {item.unit}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-500">
                    {item.reorderThreshold} {item.unit}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{item.location}</td>
                  <td className="py-3 px-3 font-mono">₹{item.unitCost}</td>
                  <td className="py-3 px-3">
                    <Badge
                      variant={
                        item.status === 'Optimal'
                          ? 'emerald'
                          : item.status === 'Low Stock'
                          ? 'amber'
                          : 'rose'
                      }
                    >
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Purchase Requests & Goods Receipt */}
      <div className="bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-xs">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
          Active Purchase Requisitions & Goods Receipt
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {purchaseRequests.map((pr) => (
            <div key={pr.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">{pr.itemName}</span>
                  <span className="font-mono text-indigo-600 font-bold">{pr.prNumber}</span>
                </div>
                <p className="text-slate-500 mt-0.5">
                  Requested by: {pr.requestedBy} &bull; Qty: {pr.quantity} {pr.unit} &bull; Outlay: ₹{pr.estimatedCost.toLocaleString('en-IN')}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Badge
                  variant={
                    pr.status === 'Goods Received'
                      ? 'emerald'
                      : pr.status === 'PO Issued'
                      ? 'indigo'
                      : 'amber'
                  }
                >
                  {pr.status}
                </Badge>

                {pr.status === 'PO Issued' && (
                  <button
                    onClick={() => handleSimulateGoodsReceipt(pr.id, pr.itemCode, pr.quantity)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer shadow-xs"
                  >
                    Receive Goods Into Stock
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <PurchaseRequestModal isOpen={prModalOpen} onClose={() => setPrModalOpen(false)} />
    </div>
  )
}
