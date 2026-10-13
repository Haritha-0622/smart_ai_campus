import React, { useState } from 'react'
import { Modal } from '../common/Modal'
import { useApp } from '../../context/AppContext'
import { MOCK_INVENTORY } from '../../data/mockData'
import { ShoppingCart, AlertCircle } from 'lucide-react'

interface PurchaseRequestModalProps {
  isOpen: boolean
  onClose: () => void
  defaultItemCode?: string
}

export const PurchaseRequestModal: React.FC<PurchaseRequestModalProps> = ({
  isOpen,
  onClose,
  defaultItemCode
}) => {
  const { addPurchaseRequest, persona } = useApp()

  const defaultItem = MOCK_INVENTORY.find((i) => i.code === defaultItemCode) || MOCK_INVENTORY[0]
  const [selectedCode, setSelectedCode] = useState(defaultItem.code)
  const [quantity, setQuantity] = useState(1000)
  const [urgency, setUrgency] = useState<'High' | 'Medium' | 'Low' | 'Emergency'>('High')
  const [justification, setJustification] = useState(
    'Stock dipped below safety threshold prior to upcoming mid-term examinations'
  )

  const currentItem = MOCK_INVENTORY.find((i) => i.code === selectedCode) || defaultItem
  const estimatedCost = quantity * currentItem.unitCost

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addPurchaseRequest({
      itemCode: currentItem.code,
      itemName: currentItem.name,
      quantity,
      unit: currentItem.unit,
      estimatedCost,
      requestedBy: `${persona.name} (${persona.title})`,
      department: persona.department,
      date: 'Just now',
      status: 'Pending Approval',
      urgency
    })
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Institutional Purchase Request (PR)"
      subtitle="Smart Purchase Alarm replenishment & maker-checker procurement workflow"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Catalog Item Master
          </label>
          <select
            value={selectedCode}
            onChange={(e) => setSelectedCode(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
          >
            {MOCK_INVENTORY.map((item) => (
              <option key={item.code} value={item.code}>
                [{item.code}] {item.name} (Stock: {item.currentStock} {item.unit})
              </option>
            ))}
          </select>
        </div>

        <div className="p-3 bg-amber-50/70 dark:bg-amber-950/40 rounded-xl border border-amber-200/80 dark:border-amber-900/60 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-[11px] text-amber-900 dark:text-amber-200">
            <p className="font-semibold">Current Stock Level: {currentItem.currentStock} {currentItem.unit}</p>
            <p className="mt-0.5">
              Configured Reorder Threshold: {currentItem.reorderThreshold} {currentItem.unit} &bull; Unit Cost: ₹{currentItem.unitCost} &bull; Supplier: {currentItem.supplier}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Quantity to Procure ({currentItem.unit}) *
            </label>
            <input
              type="number"
              min="1"
              required
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Estimated Total Outlay (INR)
            </label>
            <div className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white font-bold font-mono">
              ₹{estimatedCost.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Urgency Classification
            </label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value as any)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
            >
              <option value="High">High (Impending Stock-out)</option>
              <option value="Emergency">Emergency (Immediate Class Blocker)</option>
              <option value="Medium">Medium (Regular Cycle)</option>
              <option value="Low">Low (Buffer Stock)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Procuring Department
            </label>
            <input
              type="text"
              disabled
              value={persona.department}
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-500 dark:text-slate-400"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Operational Justification *
          </label>
          <textarea
            rows={2}
            required
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1.5 shadow-xs"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Route for CFO Approval
          </button>
        </div>
      </form>
    </Modal>
  )
}
