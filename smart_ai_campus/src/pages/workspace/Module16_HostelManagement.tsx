import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import {
  Home, Wallet, Sparkles, LayoutDashboard, Plus, Search,
  CheckCircle2, Clock, AlertTriangle, X, Camera, Bell, BellRing, ShieldCheck,
  ArrowRight, CheckCheck, UserCheck, XCircle, CreditCard,
  TrendingUp, History, Send, Banknote, AlertCircle,
} from 'lucide-react'
import {
  PERMISSION_REQUESTS, VISITOR_RECORDS, WALLET_ACCOUNTS, AUDIT_LOG, AI_ALERTS,
  PermissionRequest, VisitorRecord, WalletAccount, AIAlert,
} from '../../data/hostelData'

// ── Types ─────────────────────────────────────────────────────────────────────
type Tab = 'dashboard' | 'permissions' | 'visitors' | 'wallet' | 'ai'

// ── Badge colour map ──────────────────────────────────────────────────────────
const statusVariant = (s: string): 'emerald' | 'amber' | 'rose' | 'indigo' | 'teal' | 'slate' => {
  const m: Record<string, 'emerald' | 'amber' | 'rose' | 'indigo' | 'teal' | 'slate'> = {
    Approved: 'emerald', Active: 'teal', Completed: 'emerald',
    'Pending Parent Ack': 'amber', Rejected: 'rose',
    'Pre-Registered': 'indigo', 'Checked In': 'teal', 'Checked Out': 'slate',
    Credit: 'emerald', Debit: 'rose',
  }
  return m[s] ?? 'slate'
}

// ── New Permission Modal ──────────────────────────────────────────────────────
const NewPermissionModal: React.FC<{ onClose: () => void; onSave: (r: Partial<PermissionRequest>) => void }> = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    studentName: '', regNo: '', grade: '', hostelBlock: 'Kaveri Block (Girls)',
    type: 'Day Leave', reason: '', destination: '', exitDate: '', expectedReturn: '',
    parentName: '', parentContact: '', requestedBy: 'Student', notes: '', photoAttached: false,
  })
  const update = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }))
  const handleSave = () => {
    if (!form.studentName || !form.regNo || !form.reason) return
    onSave({ ...form, status: 'Pending Parent Ack', requestDate: new Date().toISOString().slice(0, 10), id: `PR-${Date.now()}` } as any)
    onClose()
  }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#131B2E] rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-[#131B2E] z-10">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Home className="w-4 h-4 text-indigo-600" /> New Permission / Outpass Request
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Student Name *', key: 'studentName', placeholder: 'Full name' },
              { label: 'Reg. No *', key: 'regNo', placeholder: 'DPA2024XXX' },
              { label: 'Grade / Class', key: 'grade', placeholder: 'Class XI-A' },
              { label: 'Parent Name', key: 'parentName', placeholder: "Parent's full name" },
              { label: 'Parent Contact', key: 'parentContact', placeholder: '+91 9XXXXXXXXX' },
            ].map(({ label, key, placeholder }) => (
              <div key={key} className={key === 'studentName' || key === 'parentName' ? 'col-span-2' : ''}>
                <label className="block text-[10px] font-semibold text-slate-500 mb-1 uppercase">{label}</label>
                <input value={form[key as keyof typeof form] as string} onChange={e => update(key, e.target.value)} placeholder={placeholder}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 mb-1 uppercase">Hostel Block</label>
              <select value={form.hostelBlock} onChange={e => update('hostelBlock', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Kaveri Block (Girls)</option>
                <option>Godavari Block (Boys)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 mb-1 uppercase">Leave Type</label>
              <select value={form.type} onChange={e => update('type', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                {['Day Leave', 'Weekend Leave', 'Overnight Leave', 'Medical Leave', 'Emergency Leave'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 mb-1 uppercase">Requested By</label>
              <select value={form.requestedBy} onChange={e => update('requestedBy', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Student</option><option>Warden</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 mb-1 uppercase">Exit Date</label>
              <input type="date" value={form.exitDate} onChange={e => update('exitDate', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 mb-1 uppercase">Expected Return</label>
              <input type="date" value={form.expectedReturn} onChange={e => update('expectedReturn', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 mb-1 uppercase">Destination</label>
            <input value={form.destination} onChange={e => update('destination', e.target.value)} placeholder="City / Hospital / Address"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 mb-1 uppercase">Reason *</label>
            <textarea value={form.reason} onChange={e => update('reason', e.target.value)} rows={2} placeholder="Brief reason for the permission request"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 mb-1 uppercase">Additional Notes</label>
            <input value={form.notes} onChange={e => update('notes', e.target.value)} placeholder="e.g. Medical certificate attached"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.photoAttached} onChange={e => update('photoAttached', e.target.checked)}
              className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
            <Camera className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-xs text-slate-600 dark:text-slate-300">Photo / document attached</span>
          </label>
          <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
            <Bell className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            Parent will be notified via SMS and app push for acknowledgement before warden approval proceeds.
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 p-5 border-t border-slate-100 dark:border-slate-800">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 cursor-pointer">Cancel</button>
          <button onClick={handleSave} className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
            <Send className="w-3.5 h-3.5" /> Submit & Notify Parent
          </button>
        </div>
      </div>
    </div>
  )
}

// ── New Visitor Modal ─────────────────────────────────────────────────────────
const NewVisitorModal: React.FC<{ onClose: () => void; onSave: (r: Partial<VisitorRecord>) => void }> = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    visitorName: '', visitorPhone: '', visitorRelation: 'Parent / Guardian',
    studentName: '', regNo: '', hostelBlock: 'Kaveri Block (Girls)',
    visitDate: '', visitPurpose: '', parentApprovalRequired: false, photoAttached: false,
  })
  const update = (k: string, v: string | boolean) => setForm(p => ({ ...p, [k]: v }))
  const handleSave = () => {
    if (!form.visitorName || !form.studentName) return
    onSave({ ...form, status: 'Pre-Registered', id: `VIS-${Date.now()}` } as any)
    onClose()
  }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#131B2E] rounded-2xl w-full max-w-lg shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-[#131B2E] z-10">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-teal-600" /> Register Visitor
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Visitor Name *', key: 'visitorName', placeholder: 'Full name' },
              { label: 'Visitor Phone *', key: 'visitorPhone', placeholder: '+91 9XXXXXXXXX' },
              { label: 'Student Name *', key: 'studentName', placeholder: 'Resident student' },
              { label: 'Student Reg. No', key: 'regNo', placeholder: 'DPA2024XXX' },
            ].map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="block text-[10px] font-semibold text-slate-500 mb-1 uppercase">{label}</label>
                <input value={form[key as keyof typeof form] as string} onChange={e => update(key, e.target.value)} placeholder={placeholder}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 mb-1 uppercase">Relation</label>
              <select value={form.visitorRelation} onChange={e => update('visitorRelation', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500">
                {['Parent / Guardian', 'Sibling', 'Relative', 'Friend (External)', 'Official'].map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 mb-1 uppercase">Hostel Block</label>
              <select value={form.hostelBlock} onChange={e => update('hostelBlock', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>Kaveri Block (Girls)</option>
                <option>Godavari Block (Boys)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-500 mb-1 uppercase">Visit Date</label>
              <input type="date" value={form.visitDate} onChange={e => update('visitDate', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 mb-1 uppercase">Visit Purpose</label>
            <input value={form.visitPurpose} onChange={e => update('visitPurpose', e.target.value)} placeholder="e.g. Drop off items, monthly visit"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.parentApprovalRequired} onChange={e => update('parentApprovalRequired', e.target.checked)}
                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
              <span className="text-xs text-slate-600 dark:text-slate-300">Parent approval required for this visitor</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.photoAttached} onChange={e => update('photoAttached', e.target.checked)}
                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
              <Camera className="w-3.5 h-3.5 text-teal-500" />
              <span className="text-xs text-slate-600 dark:text-slate-300">Visitor photo captured / attached</span>
            </label>
          </div>
          {form.parentApprovalRequired && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
              <Bell className="w-3.5 h-3.5 mt-0.5 shrink-0" />
              Parent will be notified immediately for approval before the visitor is allowed entry.
            </div>
          )}
        </div>
        <div className="flex items-center justify-end gap-2 p-5 border-t border-slate-100 dark:border-slate-800">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 cursor-pointer">Cancel</button>
          <button onClick={handleSave} className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
            <UserCheck className="w-3.5 h-3.5" /> Register Visitor
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Top-Up Modal ──────────────────────────────────────────────────────────────
const TopUpModal: React.FC<{ account: WalletAccount; onClose: () => void; onTopUp: (id: string, amount: number) => void }> = ({ account, onClose, onTopUp }) => {
  const [amount, setAmount] = useState('')
  const quickAmounts = [500, 1000, 2000, 5000]
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#131B2E] rounded-2xl w-full max-w-sm shadow-2xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Banknote className="w-4 h-4 text-emerald-600" /> Load Wallet
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700">
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{account.studentName}</p>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">{account.regNo} · {account.hostelBlock}</p>
            <p className="text-lg font-extrabold text-emerald-600 mt-1">₹{account.balance.toLocaleString()}</p>
            <p className="text-[10px] text-slate-400">Current Balance</p>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 mb-1.5 uppercase">Quick Amount</label>
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map(q => (
                <button key={q} onClick={() => setAmount(String(q))}
                  className={`py-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${amount === String(q) ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-400'}`}>
                  ₹{q.toLocaleString()}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-slate-500 mb-1.5 uppercase">Custom Amount (₹)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-xs text-emerald-800 dark:text-emerald-300">
            After top-up: <strong>₹{(account.balance + (Number(amount) || 0)).toLocaleString()}</strong>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 p-5 border-t border-slate-100 dark:border-slate-800">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-600 cursor-pointer">Cancel</button>
          <button onClick={() => { onTopUp(account.studentId, Number(amount) || 0); onClose() }}
            disabled={!amount || Number(amount) <= 0}
            className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
            <Banknote className="w-3.5 h-3.5" /> Confirm Top-Up
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Module ───────────────────────────────────────────────────────────────
export const Module16_HostelManagement: React.FC = () => {
  const { showToast } = useApp()
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [search, setSearch] = useState('')
  const [newPermModal, setNewPermModal] = useState(false)
  const [newVisitorModal, setNewVisitorModal] = useState(false)
  const [topUpAccount, setTopUpAccount] = useState<WalletAccount | null>(null)
  const [selectedWallet, setSelectedWallet] = useState<string>(WALLET_ACCOUNTS[0].studentId)
  const [permissions, setPermissions] = useState<PermissionRequest[]>(PERMISSION_REQUESTS)
  const [visitors, setVisitors] = useState<VisitorRecord[]>(VISITOR_RECORDS)
  const [wallets, setWallets] = useState<WalletAccount[]>(WALLET_ACCOUNTS)
  const [aiAlerts, setAiAlerts] = useState<AIAlert[]>(AI_ALERTS)
  const [permFilter, setPermFilter] = useState('All')
  const [visitorFilter, setVisitorFilter] = useState('All')

  // ── Derived stats ──────────────────────────────────────────────────────────
  const pendingParentAck = permissions.filter(p => p.status === 'Pending Parent Ack').length
  const activePermissions = permissions.filter(p => p.status === 'Active').length
  const checkedInVisitors = visitors.filter(v => v.status === 'Checked In').length
  const lowBalanceStudents = wallets.filter(w => w.balance < w.lowBalanceThreshold).length
  const undismissedAlerts = aiAlerts.filter(a => !a.dismissed).length

  // ── Actions ────────────────────────────────────────────────────────────────
  const handleAddPermission = (r: Partial<PermissionRequest>) => {
    setPermissions(prev => [r as PermissionRequest, ...prev])
    showToast('Permission request submitted — parent notification sent!')
  }
  const handleAddVisitor = (r: Partial<VisitorRecord>) => {
    setVisitors(prev => [r as VisitorRecord, ...prev])
    showToast('Visitor registered successfully!')
  }
  const handleApprovePermission = (id: string) => {
    setPermissions(prev => prev.map(p => p.id === id
      ? { ...p, status: 'Approved', wardenApproved: true, gatePassCode: `GP-2025-${id}` } : p))
    showToast('Permission approved — gate pass generated!')
  }
  const handleRejectPermission = (id: string) => {
    setPermissions(prev => prev.map(p => p.id === id ? { ...p, status: 'Rejected', wardenApproved: false } : p))
    showToast('Permission request rejected.')
  }
  const handleCheckinVisitor = (id: string) => {
    setVisitors(prev => prev.map(v => v.id === id
      ? { ...v, status: 'Checked In', checkInTime: new Date().toTimeString().slice(0, 5) } : v))
    showToast('Visitor checked in — entry recorded!')
  }
  const handleCheckoutVisitor = (id: string) => {
    setVisitors(prev => prev.map(v => v.id === id
      ? { ...v, status: 'Checked Out', checkOutTime: new Date().toTimeString().slice(0, 5) } : v))
    showToast('Visitor checked out — exit recorded!')
  }
  const handleTopUp = (studentId: string, amount: number) => {
    setWallets(prev => prev.map(w => w.studentId === studentId
      ? { ...w, balance: w.balance + amount, lastTopUp: new Date().toISOString().slice(0, 10), lastTopUpAmount: amount } : w))
    showToast(`Wallet topped up with ₹${amount.toLocaleString()}!`)
  }
  const dismissAlert = (id: string) => {
    setAiAlerts(prev => prev.map(a => a.id === id ? { ...a, dismissed: true } : a))
  }

  const tabs: { key: Tab; label: string; icon: React.ElementType; badge?: number }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'permissions', label: 'Permission Requests', icon: Home, badge: pendingParentAck },
    { key: 'visitors', label: 'Visitor Management', icon: UserCheck, badge: checkedInVisitors },
    { key: 'wallet', label: 'Wallet & Cashless', icon: Wallet, badge: lowBalanceStudents > 0 ? lowBalanceStudents : undefined },
    { key: 'ai', label: 'AI & Alerts', icon: Sparkles, badge: undismissedAlerts },
  ]

  const filteredPermissions = permissions.filter(p => {
    const matchSearch = !search || p.studentName.toLowerCase().includes(search.toLowerCase()) || p.regNo.toLowerCase().includes(search.toLowerCase())
    const matchFilter = permFilter === 'All' || p.status === permFilter
    return matchSearch && matchFilter
  })
  const filteredVisitors = visitors.filter(v => {
    const matchSearch = !search || v.visitorName.toLowerCase().includes(search.toLowerCase()) || v.studentName.toLowerCase().includes(search.toLowerCase())
    const matchFilter = visitorFilter === 'All' || v.status === visitorFilter
    return matchSearch && matchFilter
  })
  const currentWallet = wallets.find(w => w.studentId === selectedWallet)!

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-500 flex items-center justify-center">
                <Home className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-extrabold text-[#101A33] dark:text-white">Hostel Management</h1>
              <Badge variant="indigo" dot>Module 16</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Permission Requests · Visitor Approvals · Cashless Campus Wallet · AI Alerts &amp; Audit Trail
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={() => setNewPermModal(true)}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs">
              <Plus className="w-3.5 h-3.5" /> New Permission
            </button>
            <button onClick={() => setNewVisitorModal(true)}
              className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs">
              <UserCheck className="w-3.5 h-3.5" /> Register Visitor
            </button>
            <ExportButton filename="hostel_report"
              data={permissions.map(p => ({ id: p.id, student: p.studentName, type: p.type, status: p.status, exit: p.exitDate }))}
              label="Export" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
        {tabs.map(({ key, label, icon: Icon, badge }) => (
          <button key={key} onClick={() => setActiveTab(key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer relative ${
              activeTab === key
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}>
            <Icon className="w-3.5 h-3.5" /> {label}
            {badge !== undefined && badge > 0 && (
              <span className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeTab === key ? 'bg-white/20 text-white' : 'bg-rose-500 text-white'}`}>{badge}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── DASHBOARD ─────────────────────────────────────────────────────────── */}
      {activeTab === 'dashboard' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard title="Pending Parent Ack" value={pendingParentAck} subtext="Awaiting parent acknowledgement"
              icon={Bell} status={pendingParentAck > 0 ? 'warning' : 'healthy'}
              actionLabel="View All" onAction={() => setActiveTab('permissions')} />
            <StatCard title="Active Permissions" value={activePermissions} subtext="Students currently on leave"
              icon={CheckCircle2} status="healthy"
              actionLabel="View" onAction={() => setActiveTab('permissions')} />
            <StatCard title="Visitors Checked In" value={checkedInVisitors} subtext="Currently on campus"
              icon={UserCheck} status={checkedInVisitors > 0 ? 'warning' : 'healthy'}
              actionLabel="Manage" onAction={() => setActiveTab('visitors')} />
            <StatCard title="Low Wallet Balance" value={lowBalanceStudents} subtext="Below threshold alert"
              icon={Wallet} status={lowBalanceStudents > 0 ? 'critical' : 'healthy'}
              actionLabel="Top Up" onAction={() => setActiveTab('wallet')} />
          </div>

          {/* Pending parent ack list */}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" /> Awaiting Parent Acknowledgement
              </h2>
              <button onClick={() => setActiveTab('permissions')} className="text-xs text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer">
                View All <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            {permissions.filter(p => p.status === 'Pending Parent Ack').length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">No pending acknowledgements 🎉</p>
            ) : (
              <div className="space-y-2">
                {permissions.filter(p => p.status === 'Pending Parent Ack').map(p => (
                  <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40">
                    <Bell className="w-4 h-4 text-amber-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{p.studentName} — <span className="text-amber-700 dark:text-amber-400">{p.type}</span></p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{p.hostelBlock} · Parent: {p.parentName} ({p.parentContact})</p>
                    </div>
                    <Badge variant="amber">Pending</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active visitors */}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-teal-500" /> Active Visitor Passes
              </h2>
              <button onClick={() => setActiveTab('visitors')} className="text-xs text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer">
                Manage <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            {visitors.filter(v => v.status === 'Checked In').length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-4">No visitors currently checked in.</p>
            ) : (
              <div className="space-y-2">
                {visitors.filter(v => v.status === 'Checked In').map(v => (
                  <div key={v.id} className="flex items-center gap-3 p-3 rounded-xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/40">
                    <UserCheck className="w-4 h-4 text-teal-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{v.visitorName} <span className="font-normal text-slate-500">({v.visitorRelation})</span></p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">Visiting {v.studentName} · {v.hostelBlock} · In: {v.checkInTime}</p>
                    </div>
                    <button onClick={() => handleCheckoutVisitor(v.id)}
                      className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-[10px] font-semibold cursor-pointer">
                      Check Out
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI summary */}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" /> AI Exception Summary
              </h2>
              <button onClick={() => setActiveTab('ai')} className="text-xs text-indigo-600 hover:underline flex items-center gap-1 cursor-pointer">
                All Alerts <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {aiAlerts.filter(a => !a.dismissed).slice(0, 3).map(a => (
                <div key={a.id} className={`flex items-start gap-3 p-3 rounded-xl border ${
                  a.severity === 'critical' ? 'bg-rose-50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/40'
                    : a.severity === 'warning' ? 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/40'
                    : 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900/40'
                }`}>
                  <Sparkles className={`w-4 h-4 mt-0.5 shrink-0 ${a.severity === 'critical' ? 'text-rose-500' : a.severity === 'warning' ? 'text-amber-500' : 'text-indigo-500'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{a.title}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{a.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── PERMISSION REQUESTS ────────────────────────────────────────────── */}
      {activeTab === 'permissions' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search student name or reg. no…"
                className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <select value={permFilter} onChange={e => setPermFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {['All', 'Pending Parent Ack', 'Approved', 'Active', 'Completed', 'Rejected'].map(s => <option key={s}>{s}</option>)}
            </select>
            <ExportButton filename="permissions" data={filteredPermissions.map(p => ({ id: p.id, student: p.studentName, type: p.type, status: p.status }))} label="Export" />
          </div>

          <div className="space-y-3">
            {filteredPermissions.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-6">No permission requests match your filters.</p>
            )}
            {filteredPermissions.map(p => (
              <div key={p.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{p.studentName}</span>
                      <span className="text-[10px] text-slate-400">{p.regNo}</span>
                      <Badge variant={statusVariant(p.status)}>{p.status}</Badge>
                      {p.photoAttached && <Badge variant="indigo"><Camera className="w-2.5 h-2.5 inline mr-0.5" />Photo</Badge>}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                      <span><strong>Type:</strong> {p.type}</span>
                      <span><strong>Block:</strong> {p.hostelBlock}</span>
                      <span><strong>By:</strong> {p.requestedBy}</span>
                      <span><strong>Exit:</strong> {p.exitDate}</span>
                      <span><strong>Return:</strong> {p.expectedReturn}</span>
                      <span><strong>Destination:</strong> {p.destination || '—'}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1"><strong>Reason:</strong> {p.reason}</p>
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${p.parentAcknowledged ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'}`}>
                        {p.parentAcknowledged ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        Parent: {p.parentAcknowledged ? `Acknowledged ${p.parentAckAt ? new Date(p.parentAckAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : ''}` : 'Awaiting Acknowledgement'}
                      </span>
                      {p.gatePassCode && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300">
                          <ShieldCheck className="w-3 h-3" /> {p.gatePassCode}
                        </span>
                      )}
                    </div>
                    {p.notes && <p className="text-[10px] text-slate-400 italic mt-1">Note: {p.notes}</p>}
                  </div>
                  {(p.status === 'Pending Parent Ack' || p.status === 'Approved') && p.parentAcknowledged && !p.wardenApproved && (
                    <div className="flex sm:flex-col gap-2">
                      <button onClick={() => handleApprovePermission(p.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
                        <CheckCheck className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button onClick={() => handleRejectPermission(p.id)}
                        className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
                        <XCircle className="w-3.5 h-3.5" /> Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Audit trail excerpt */}
          <div>
            <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5" /> Audit Trail (Latest)
            </h3>
            <div className="space-y-1.5">
              {AUDIT_LOG.filter(a => a.module === 'Permission').slice(0, 5).map(log => (
                <div key={log.id} className="flex items-start gap-2 text-[11px] text-slate-500 dark:text-slate-400 border-l-2 border-slate-200 dark:border-slate-700 pl-3 py-0.5">
                  <span className="text-[10px] text-slate-400 shrink-0">{new Date(log.timestamp).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}</span>
                  <span><strong className="text-slate-700 dark:text-slate-300">{log.actor}</strong> · {log.action} · {log.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── VISITOR MANAGEMENT ─────────────────────────────────────────────── */}
      {activeTab === 'visitors' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search visitor or student name…"
                className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500" />
            </div>
            <select value={visitorFilter} onChange={e => setVisitorFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500">
              {['All', 'Pre-Registered', 'Checked In', 'Checked Out', 'Rejected'].map(s => <option key={s}>{s}</option>)}
            </select>
            <ExportButton filename="visitors" data={filteredVisitors.map(v => ({ visitor: v.visitorName, student: v.studentName, status: v.status, date: v.visitDate }))} label="Export" />
          </div>

          <div className="space-y-3">
            {filteredVisitors.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-6">No visitor records found.</p>
            )}
            {filteredVisitors.map(v => (
              <div key={v.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 hover:border-teal-300 dark:hover:border-teal-700 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{v.visitorName}</span>
                      <span className="text-[10px] text-slate-400">{v.visitorRelation}</span>
                      <Badge variant={statusVariant(v.status)}>{v.status}</Badge>
                      {v.photoAttached && <Badge variant="indigo"><Camera className="w-2.5 h-2.5 inline mr-0.5" />Photo</Badge>}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                      <span><strong>Phone:</strong> {v.visitorPhone}</span>
                      <span><strong>Visiting:</strong> {v.studentName}</span>
                      <span><strong>Block:</strong> {v.hostelBlock}</span>
                      <span><strong>Date:</strong> {v.visitDate}</span>
                      {v.checkInTime && <span><strong>In:</strong> {v.checkInTime}</span>}
                      {v.checkOutTime && <span><strong>Out:</strong> {v.checkOutTime}</span>}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1"><strong>Purpose:</strong> {v.visitPurpose}</p>
                    {v.parentApprovalRequired && (
                      <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1.5 ${v.parentApproved === true ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300' : v.parentApproved === false ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300'}`}>
                        <ShieldCheck className="w-3 h-3" />
                        Parent Approval: {v.parentApproved === true ? 'Granted' : v.parentApproved === false ? 'Denied' : 'Pending'}
                      </span>
                    )}
                    {v.passCode && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 ml-1">
                        <ShieldCheck className="w-3 h-3" /> {v.passCode}
                      </span>
                    )}
                  </div>
                  <div className="flex sm:flex-col gap-2">
                    {v.status === 'Pre-Registered' && (
                      <button onClick={() => handleCheckinVisitor(v.id)}
                        className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
                        <CheckCheck className="w-3.5 h-3.5" /> Check In
                      </button>
                    )}
                    {v.status === 'Checked In' && (
                      <button onClick={() => handleCheckoutVisitor(v.id)}
                        className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
                        <ArrowRight className="w-3.5 h-3.5" /> Check Out
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Audit trail */}
          <div>
            <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5" /> Visitor Audit Trail
            </h3>
            <div className="space-y-1.5">
              {AUDIT_LOG.filter(a => a.module === 'Visitor').map(log => (
                <div key={log.id} className="flex items-start gap-2 text-[11px] text-slate-500 dark:text-slate-400 border-l-2 border-slate-200 dark:border-slate-700 pl-3 py-0.5">
                  <span className="text-[10px] text-slate-400 shrink-0">{new Date(log.timestamp).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}</span>
                  <span><strong className="text-slate-700 dark:text-slate-300">{log.actor}</strong> · {log.action} · {log.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── WALLET & CASHLESS ──────────────────────────────────────────────── */}
      {activeTab === 'wallet' && (
        <div className="space-y-4">
          {/* Student selector */}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
              <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-600" /> Cashless Campus Wallets
              </h2>
              <div className="flex-1" />
              <select value={selectedWallet} onChange={e => setSelectedWallet(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                {wallets.map(w => (
                  <option key={w.studentId} value={w.studentId}>
                    {w.studentName} ({w.regNo}) — ₹{w.balance.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {/* Wallet summary cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              {wallets.map(w => (
                <button key={w.studentId} onClick={() => setSelectedWallet(w.studentId)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${selectedWallet === w.studentId ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 shadow-sm' : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 hover:border-emerald-300'}`}>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{w.studentName}</p>
                  <p className="text-[10px] text-slate-400 truncate">{w.regNo}</p>
                  <p className={`text-base font-extrabold mt-1 ${w.balance < w.lowBalanceThreshold ? 'text-rose-600' : 'text-emerald-600'}`}>
                    ₹{w.balance.toLocaleString()}
                  </p>
                  {w.balance < w.lowBalanceThreshold && (
                    <span className="text-[9px] font-bold text-rose-500 flex items-center gap-0.5">
                      <AlertCircle className="w-2.5 h-2.5" /> Low Balance
                    </span>
                  )}
                </button>
              ))}
            </div>

            {currentWallet && (
              <div className="space-y-4">
                {/* Wallet detail header */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{currentWallet.studentName}</p>
                    <p className="text-[10px] text-slate-500">{currentWallet.regNo} · {currentWallet.grade} · {currentWallet.hostelBlock}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Parent: {currentWallet.parentName} · {currentWallet.parentContact}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-extrabold ${currentWallet.balance < currentWallet.lowBalanceThreshold ? 'text-rose-600' : 'text-emerald-600'}`}>
                      ₹{currentWallet.balance.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-slate-400">Last top-up: ₹{currentWallet.lastTopUpAmount.toLocaleString()} on {currentWallet.lastTopUp}</p>
                  </div>
                  <button onClick={() => setTopUpAccount(currentWallet)}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0">
                    <Banknote className="w-3.5 h-3.5" /> Load Money
                  </button>
                </div>

                {/* Transaction history */}
                <div>
                  <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5" /> Transaction History
                  </h3>
                  <div className="space-y-1.5">
                    {currentWallet.transactions.map(tx => (
                      <div key={tx.id} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${tx.type === 'Credit' ? 'bg-emerald-100 dark:bg-emerald-950/40' : 'bg-rose-100 dark:bg-rose-950/40'}`}>
                          {tx.type === 'Credit' ? <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> : <CreditCard className="w-3.5 h-3.5 text-rose-500" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{tx.description}</p>
                          <p className="text-[10px] text-slate-400">{tx.date} {tx.time} · <Badge variant={tx.type === 'Credit' ? 'emerald' : 'rose'}>{tx.category}</Badge></p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className={`text-sm font-bold ${tx.type === 'Credit' ? 'text-emerald-600' : 'text-rose-500'}`}>
                            {tx.type === 'Credit' ? '+' : '−'}₹{tx.amount.toLocaleString()}
                          </p>
                          <p className="text-[10px] text-slate-400">Bal: ₹{tx.balance.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Wallet audit */}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-3 flex items-center gap-1.5">
              <History className="w-3.5 h-3.5" /> Wallet Audit Trail
            </h3>
            <div className="space-y-1.5">
              {AUDIT_LOG.filter(a => a.module === 'Wallet').map(log => (
                <div key={log.id} className="flex items-start gap-2 text-[11px] text-slate-500 dark:text-slate-400 border-l-2 border-emerald-200 dark:border-emerald-800 pl-3 py-0.5">
                  <span className="text-[10px] text-slate-400 shrink-0">{new Date(log.timestamp).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}</span>
                  <span><strong className="text-slate-700 dark:text-slate-300">{log.actor}</strong> · {log.action} · {log.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── AI & ALERTS ───────────────────────────────────────────────────── */}
      {activeTab === 'ai' && (
        <div className="space-y-3">
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" /> AI Smart Enhancements
              </h2>
              <button onClick={() => setAiAlerts(prev => prev.map(a => ({ ...a, dismissed: true })))}
                className="text-xs text-slate-500 hover:text-rose-500 flex items-center gap-1 cursor-pointer">
                <CheckCheck className="w-3.5 h-3.5" /> Dismiss All
              </button>
            </div>

            <div className="space-y-3">
              {aiAlerts.length === 0 && (
                <p className="text-xs text-slate-400 text-center py-6">No AI alerts configured.</p>
              )}
              {aiAlerts.map(a => (
                <div key={a.id} className={`p-4 rounded-xl border transition-all ${a.dismissed ? 'opacity-40' : ''} ${
                  a.type === 'anomaly' && a.severity === 'critical' ? 'bg-rose-50 border-rose-200 dark:bg-rose-950/20 dark:border-rose-900/40'
                    : a.type === 'anomaly' && a.severity === 'warning' ? 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/40'
                    : a.type === 'reminder' ? 'bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/40'
                    : 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900/40'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      a.type === 'anomaly' ? (a.severity === 'critical' ? 'bg-rose-100 dark:bg-rose-950/40' : 'bg-amber-100 dark:bg-amber-950/40')
                        : a.type === 'reminder' ? 'bg-amber-100 dark:bg-amber-950/40'
                        : 'bg-indigo-100 dark:bg-indigo-950/40'
                    }`}>
                      {a.type === 'anomaly' ? <AlertTriangle className={`w-4 h-4 ${a.severity === 'critical' ? 'text-rose-500' : 'text-amber-500'}`} />
                        : a.type === 'reminder' ? <BellRing className="w-4 h-4 text-amber-500" />
                        : <Sparkles className="w-4 h-4 text-indigo-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{a.title}</span>
                        <Badge variant={a.severity === 'critical' ? 'rose' : a.severity === 'warning' ? 'amber' : 'indigo'}>
                          {a.type === 'anomaly' ? 'Anomaly' : a.type === 'reminder' ? 'Reminder' : 'Summary'}
                        </Badge>
                        {a.dismissed && <Badge variant="slate">Dismissed</Badge>}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{a.detail}</p>
                      {a.relatedStudents && a.relatedStudents.length > 0 && (
                        <div className="flex items-center gap-1 mt-2 flex-wrap">
                          <span className="text-[10px] text-slate-400">Related:</span>
                          {a.relatedStudents.map(s => (
                            <span key={s} className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">{s}</span>
                          ))}
                        </div>
                      )}
                      <p className="text-[10px] text-slate-400 mt-1">{new Date(a.timestamp).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                    </div>
                    {!a.dismissed && (
                      <button onClick={() => dismissAlert(a.id)} className="text-slate-400 hover:text-slate-600 cursor-pointer shrink-0">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full audit log */}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-slate-500" /> Complete Audit History
            </h3>
            <div className="space-y-2">
              {AUDIT_LOG.sort((a, b) => b.timestamp.localeCompare(a.timestamp)).map(log => (
                <div key={log.id} className={`flex items-start gap-3 p-3 rounded-xl border text-[11px] ${
                  log.module === 'Permission' ? 'bg-indigo-50 border-indigo-100 dark:bg-indigo-950/10 dark:border-indigo-900/20'
                    : log.module === 'Visitor' ? 'bg-teal-50 border-teal-100 dark:bg-teal-950/10 dark:border-teal-900/20'
                    : log.module === 'Wallet' ? 'bg-emerald-50 border-emerald-100 dark:bg-emerald-950/10 dark:border-emerald-900/20'
                    : 'bg-slate-50 border-slate-200 dark:bg-slate-900/20 dark:border-slate-700'
                }`}>
                  <Badge variant={log.module === 'Permission' ? 'indigo' : log.module === 'Visitor' ? 'teal' : log.module === 'Wallet' ? 'emerald' : 'slate'}>
                    {log.module}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{log.actor}</span> ({log.actorRole}) · <span className="font-semibold">{log.action}</span>
                    <p className="text-slate-500 dark:text-slate-400 mt-0.5">{log.detail}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{new Date(log.timestamp).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Modals ─────────────────────────────────────────────────────────── */}
      {newPermModal && (
        <NewPermissionModal onClose={() => setNewPermModal(false)} onSave={handleAddPermission} />
      )}
      {newVisitorModal && (
        <NewVisitorModal onClose={() => setNewVisitorModal(false)} onSave={handleAddVisitor} />
      )}
      {topUpAccount && (
        <TopUpModal account={topUpAccount} onClose={() => setTopUpAccount(null)} onTopUp={handleTopUp} />
      )}
    </div>
  )
}
