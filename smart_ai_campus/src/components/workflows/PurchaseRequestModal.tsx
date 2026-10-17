import React, { useState } from 'react'
import { Modal } from '../common/Modal'
import { useApp } from '../../context/AppContext'
import { Package, Send } from 'lucide-react'

interface Props { isOpen: boolean; onClose: () => void }

export const PurchaseRequestModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { addPurchaseRequest, persona } = useApp()
  const [item, setItem] = useState('')
  const [category, setCategory] = useState('Stationery')
  const [quantity, setQuantity] = useState(1)
  const [estimatedCost, setEstimatedCost] = useState(0)
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('Medium')
  const [notes, setNotes] = useState('')

  const categories = ['Stationery', 'Examination Supplies', 'Laboratory Equipment', 'IT & Technology', 'Furniture', 'Sports Equipment', 'Transport Maintenance', 'Cleaning Supplies', 'Other']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addPurchaseRequest({ item, category, quantity, estimatedCost, requestedBy: persona.name, department: persona.department, date: new Date().toISOString().split('T')[0], status: 'Pending', priority, notes })
    setItem(''); setQuantity(1); setEstimatedCost(0); setNotes('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Raise Purchase Request" subtitle="Submit procurement request for approval workflow" maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Item Description *</label>
          <input value={item} onChange={(e) => setItem(e.target.value)} placeholder="e.g. Exam Answer Booklets (40-page, 5000 units)" required
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value as typeof priority)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Low</option><option>Medium</option><option>High</option><option>Critical</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Quantity *</label>
            <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} required
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Estimated Cost (₹) *</label>
            <input type="number" min={0} value={estimatedCost} onChange={(e) => setEstimatedCost(Number(e.target.value))} required
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Additional Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Business justification, urgency context..."
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
        </div>
        <div className="flex gap-2 pt-2">
          <button type="button" onClick={onClose} className="flex-1 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold cursor-pointer">Cancel</button>
          <button type="submit" className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold flex items-center justify-center gap-2 cursor-pointer">
            <Package className="w-4 h-4" /> Submit PR
          </button>
        </div>
      </form>
    </Modal>
  )
}
