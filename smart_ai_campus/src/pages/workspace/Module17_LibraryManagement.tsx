import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import {
  BookOpen, Search, Plus, CheckCircle2, AlertTriangle, X,
  Sparkles, LayoutDashboard, MapPin, ShieldCheck, Settings,
  AlertCircle, Scan, Wifi, ArrowRight,
  CheckCheck, BarChart2, Star,
  BookMarked, Users, FileText, ToggleLeft, ToggleRight,
} from 'lucide-react'
import {
  BOOK_INVENTORY, BOOK_LOANS, MISPLACED_BOOKS, LIBRARY_ENTRIES,
  NO_DUE_RECORDS, LIBRARY_RULES, NAAC_RECORDS, CIRCULATION_ANALYTICS,
  AI_RECOMMENDATIONS,
  BookInventory, BookLoan, MisplacedBook, LibraryEntry,
  NoDueRecord, LibraryRule, NAACRecord,
} from '../../data/libraryData'

// ── Types ─────────────────────────────────────────────────────────────────────
type Tab = 'dashboard' | 'inventory' | 'circulation' | 'misplaced' | 'rules' | 'naac' | 'ai'

// ── Status badge helper ───────────────────────────────────────────────────────
const sv = (s: string): 'emerald' | 'amber' | 'rose' | 'slate' | 'teal' | 'indigo' | 'purple' => {
  const m: Record<string, any> = {
    Available: 'teal', Active: 'emerald', Returned: 'slate',
    Overdue: 'rose', Lost: 'rose', Misplaced: 'amber', Damaged: 'rose', Reserved: 'purple',
    Clear: 'emerald', Pending: 'amber', Blocked: 'rose',
    Complete: 'emerald', Partial: 'amber', 'Not Applicable': 'slate',
    'Pre-Registered': 'indigo', 'Checked In': 'teal',
    'RFID Card': 'teal', 'Barcode Scan': 'indigo', Manual: 'slate',
  }
  return m[s] ?? 'slate'
}

const inp = 'w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500'
const lbl = 'block text-[10px] font-semibold text-slate-500 uppercase mb-1'

// ── Add Book Modal ────────────────────────────────────────────────────────────
const AddBookModal: React.FC<{ onClose: () => void; onSave: (d: any) => void }> = ({ onClose, onSave }) => {
  const [form, setForm] = useState({ title: '', authors: '', isbn: '', publisher: '', edition: '', year: '', subject: '', category: 'Textbook', department: '', branch: 'Main Library', section: '', rack: '', shelf: '', copies: '1', rfidTagged: false })
  const u = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }))
  const handleSave = () => {
    if (!form.title || !form.isbn) return
    onSave({ ...form, id: `BK-${Date.now()}`, authors: form.authors.split(',').map(a => a.trim()), totalCopies: Number(form.copies), availableCopies: Number(form.copies), issuedCopies: 0, misplacedCopies: 0, damagedCopies: 0, lostCopies: 0, barcodePrefix: `LIB-${Date.now()}`, lastInventoryDate: new Date().toISOString().slice(0, 10) })
    onClose()
  }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#131B2E] rounded-2xl w-full max-w-xl shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-[#131B2E] z-10">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2"><BookOpen className="w-4 h-4 text-indigo-600" /> Add Book to Inventory</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-5 space-y-3">
          <div>
            <label className={lbl}>Title *</label>
            <input value={form.title} onChange={e => u('title', e.target.value)} placeholder="Full book title" className={inp} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>Authors *</label>
              <input value={form.authors} onChange={e => u('authors', e.target.value)} placeholder="Comma-separated" className={inp} />
            </div>
            <div>
              <label className={lbl}>ISBN *</label>
              <input value={form.isbn} onChange={e => u('isbn', e.target.value)} placeholder="978-XXXXXXXXX" className={inp} />
            </div>
            <div>
              <label className={lbl}>Publisher</label>
              <input value={form.publisher} onChange={e => u('publisher', e.target.value)} placeholder="Publisher name" className={inp} />
            </div>
            <div>
              <label className={lbl}>Edition / Year</label>
              <input value={form.edition} onChange={e => u('edition', e.target.value)} placeholder="e.g. 5th / 2023" className={inp} />
            </div>
            <div>
              <label className={lbl}>Subject</label>
              <input value={form.subject} onChange={e => u('subject', e.target.value)} placeholder="e.g. Mathematics" className={inp} />
            </div>
            <div>
              <label className={lbl}>Category</label>
              <select value={form.category} onChange={e => u('category', e.target.value)} className={inp}>
                {['Textbook', 'Reference', 'Journal', 'Novel', 'Magazine', 'Research'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className={lbl}>Department</label>
              <input value={form.department} onChange={e => u('department', e.target.value)} placeholder="e.g. Engineering" className={inp} />
            </div>
            <div>
              <label className={lbl}>Branch</label>
              <select value={form.branch} onChange={e => u('branch', e.target.value)} className={inp}>
                {['Main Library', 'Engineering Branch', 'Science Resource Centre'].map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className={lbl}>Section / Rack / Shelf</label>
              <input value={form.section} onChange={e => u('section', e.target.value)} placeholder="Section" className={inp} />
            </div>
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <label className={lbl}>Rack</label>
                <input value={form.rack} onChange={e => u('rack', e.target.value)} placeholder="E-01" className={inp} />
              </div>
              <div className="flex-1">
                <label className={lbl}>Shelf</label>
                <input value={form.shelf} onChange={e => u('shelf', e.target.value)} placeholder="S-03" className={inp} />
              </div>
            </div>
            <div>
              <label className={lbl}>No. of Copies</label>
              <input type="number" min="1" value={form.copies} onChange={e => u('copies', e.target.value)} className={inp} />
            </div>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.rfidTagged} onChange={e => u('rfidTagged', e.target.checked)} className="rounded border-slate-300 text-indigo-600" />
            <Wifi className="w-3.5 h-3.5 text-indigo-500" />
            <span className="text-xs text-slate-600 dark:text-slate-300">RFID tagged (handheld scanner compatible)</span>
          </label>
        </div>
        <div className="flex items-center justify-end gap-2 p-5 border-t border-slate-100 dark:border-slate-800">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-600 cursor-pointer">Cancel</button>
          <button onClick={handleSave} className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
            <Plus className="w-3.5 h-3.5" /> Add to Inventory
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Issue Book Modal ──────────────────────────────────────────────────────────
const IssueBookModal: React.FC<{ books: BookInventory[]; onClose: () => void; onSave: (d: any) => void }> = ({ books, onClose, onSave }) => {
  const [form, setForm] = useState({ bookId: books[0]?.id ?? '', memberName: '', memberId: '', memberCategory: 'Student', memberGrade: '', copyBarcode: '' })
  const u = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }))
  const selectedBook = books.find(b => b.id === form.bookId)
  const today = new Date()
  const dueDate = new Date(today)
  dueDate.setDate(dueDate.getDate() + (form.memberCategory === 'Faculty' ? 30 : 14))
  const handleSave = () => {
    if (!form.memberName || !form.bookId) return
    onSave({ ...form, id: `LN-${Date.now()}`, bookTitle: selectedBook?.title ?? '', isbn: selectedBook?.isbn ?? '', issueDate: today.toISOString().slice(0, 10), dueDate: dueDate.toISOString().slice(0, 10), status: 'Active', issuedBy: 'Librarian', renewalCount: 0 })
    onClose()
  }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#131B2E] rounded-2xl w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2"><BookMarked className="w-4 h-4 text-teal-600" /> Issue Book</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-5 space-y-3">
          <div>
            <label className={lbl}>Select Book</label>
            <select value={form.bookId} onChange={e => u('bookId', e.target.value)} className={inp}>
              {books.filter(b => b.availableCopies > 0).map(b => <option key={b.id} value={b.id}>{b.title} ({b.availableCopies} available)</option>)}
            </select>
          </div>
          {selectedBook && (
            <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/40 text-xs text-teal-800 dark:text-teal-300">
              <strong>Location:</strong> {selectedBook.section} → Rack {selectedBook.rack} → Shelf {selectedBook.shelf}
            </div>
          )}
          <div>
            <label className={lbl}>Copy Barcode (scan or enter)</label>
            <div className="relative">
              <Scan className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input value={form.copyBarcode} onChange={e => u('copyBarcode', e.target.value)} placeholder="e.g. LIB-E-001-07" className={`${inp} pl-8`} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>Member Name *</label>
              <input value={form.memberName} onChange={e => u('memberName', e.target.value)} placeholder="Full name" className={inp} />
            </div>
            <div>
              <label className={lbl}>Member ID</label>
              <input value={form.memberId} onChange={e => u('memberId', e.target.value)} placeholder="STU-XXX / FAC-XXX" className={inp} />
            </div>
            <div>
              <label className={lbl}>Member Category</label>
              <select value={form.memberCategory} onChange={e => u('memberCategory', e.target.value)} className={inp}>
                <option>Student</option><option>Faculty</option><option>Staff</option>
              </select>
            </div>
            <div>
              <label className={lbl}>Grade / Dept (optional)</label>
              <input value={form.memberGrade} onChange={e => u('memberGrade', e.target.value)} placeholder="e.g. B.E. II Year" className={inp} />
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/40 text-xs text-indigo-800 dark:text-indigo-300">
            <strong>Due Date:</strong> {dueDate.toLocaleDateString('en-IN', { dateStyle: 'long' })} ({form.memberCategory === 'Faculty' ? '30' : '14'}-day loan period)
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 p-5 border-t border-slate-100 dark:border-slate-800">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-600 cursor-pointer">Cancel</button>
          <button onClick={handleSave} className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
            <BookMarked className="w-3.5 h-3.5" /> Issue Book
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Module ───────────────────────────────────────────────────────────────
export const Module17_LibraryManagement: React.FC = () => {
  const { showToast } = useApp()
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [search, setSearch] = useState('')
  const [addBookModal, setAddBookModal] = useState(false)
  const [issueModal, setIssueModal] = useState(false)

  const [inventory, setInventory] = useState<BookInventory[]>(BOOK_INVENTORY)
  const [loans, setLoans] = useState<BookLoan[]>(BOOK_LOANS)
  const [misplaced, setMisplaced] = useState<MisplacedBook[]>(MISPLACED_BOOKS)
  const [entries] = useState<LibraryEntry[]>(LIBRARY_ENTRIES)
  const [noDue] = useState<NoDueRecord[]>(NO_DUE_RECORDS)
  const [rules, setRules] = useState<LibraryRule[]>(LIBRARY_RULES)

  // ── Stats ──────────────────────────────────────────────────────────────────
  const totalTitles = inventory.length
  const totalCopies = inventory.reduce((s, b) => s + b.totalCopies, 0)
  const totalAvailable = inventory.reduce((s, b) => s + b.availableCopies, 0)
  const activeLoans = loans.filter(l => l.status === 'Active').length
  const overdueLoans = loans.filter(l => l.status === 'Overdue').length
  const unresolvedMisplaced = misplaced.filter(m => !m.resolved).length
  const todayEntries = entries.filter(e => e.date === '2025-10-16').length
  const blockedMembers = noDue.filter(n => n.noDueStatus === 'Blocked' || n.noDueStatus === 'Overdue').length
  const naacComplete = NAAC_RECORDS.filter(n => n.status === 'Complete').length

  // ── Actions ────────────────────────────────────────────────────────────────
  const handleAddBook = (d: BookInventory) => {
    setInventory(prev => [d, ...prev])
    showToast('Book added to inventory!')
  }
  const handleIssueBook = (d: BookLoan) => {
    setLoans(prev => [d, ...prev])
    setInventory(prev => prev.map(b => b.id === d.bookId ? { ...b, availableCopies: b.availableCopies - 1, issuedCopies: b.issuedCopies + 1 } : b))
    showToast(`Book issued to ${d.memberName} — due ${d.dueDate}`)
  }
  const handleReturn = (id: string) => {
    const loan = loans.find(l => l.id === id)
    setLoans(prev => prev.map(l => l.id === id ? { ...l, status: 'Returned', returnDate: new Date().toISOString().slice(0, 10) } : l))
    if (loan) setInventory(prev => prev.map(b => b.id === loan.bookId ? { ...b, availableCopies: b.availableCopies + 1, issuedCopies: b.issuedCopies - 1 } : b))
    showToast('Book returned successfully!')
  }
  const handleResolveMisplaced = (id: string) => {
    setMisplaced(prev => prev.map(m => m.id === id ? { ...m, resolved: true, resolvedAt: new Date().toISOString(), resolvedBy: 'Librarian' } : m))
    showToast('Misplaced book marked as resolved — returned to correct shelf.')
  }
  const toggleRule = (id: string) => {
    setRules(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r))
    showToast('Library rule updated!')
  }

  const tabs: { key: Tab; label: string; icon: React.ElementType; badge?: number }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { key: 'inventory', label: 'Book Inventory', icon: BookOpen },
    { key: 'circulation', label: 'Circulation & No-Due', icon: BookMarked, badge: overdueLoans + blockedMembers || undefined },
    { key: 'misplaced', label: 'Misplaced Books', icon: MapPin, badge: unresolvedMisplaced || undefined },
    { key: 'rules', label: 'Library Rules', icon: Settings },
    { key: 'naac', label: 'NAAC & Accreditation', icon: ShieldCheck },
    { key: 'ai', label: 'AI & Analytics', icon: Sparkles },
  ]

  const filteredInventory = inventory.filter(b =>
    !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.isbn.includes(search) || b.authors.join(' ').toLowerCase().includes(search.toLowerCase())
  )
  const filteredLoans = loans.filter(l =>
    !search || l.memberName.toLowerCase().includes(search.toLowerCase()) || l.bookTitle.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-500 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-extrabold text-[#101A33] dark:text-white">Library Management</h1>
              <Badge variant="indigo" dot>Module 17</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Inventory · Circulation &amp; No-Due · Misplaced Book Assist · Library Rules · NAAC Accreditation · AI Analytics
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={() => setAddBookModal(true)}
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs">
              <Plus className="w-3.5 h-3.5" /> Add Book
            </button>
            <button onClick={() => setIssueModal(true)}
              className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs">
              <BookMarked className="w-3.5 h-3.5" /> Issue Book
            </button>
            <ExportButton filename="library_report"
              data={inventory.map(b => ({ title: b.title, isbn: b.isbn, available: b.availableCopies, issued: b.issuedCopies }))}
              label="Export" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
        {tabs.map(({ key, label, icon: Icon, badge }) => (
          <button key={key} onClick={() => setActiveTab(key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === key ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
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
            <StatCard title="Total Titles" value={totalTitles} subtext={`${totalCopies.toLocaleString()} total copies`} icon={BookOpen} status="healthy" />
            <StatCard title="Available Now" value={totalAvailable.toLocaleString()} subtext={`${activeLoans} currently issued`} icon={CheckCircle2} status="healthy" />
            <StatCard title="Overdue Returns" value={overdueLoans} subtext="Fines may apply" icon={AlertTriangle} status={overdueLoans > 0 ? 'critical' : 'healthy'}
              actionLabel="View" onAction={() => setActiveTab('circulation')} />
            <StatCard title="Misplaced Books" value={unresolvedMisplaced} subtext="Detected by scanner" icon={MapPin} status={unresolvedMisplaced > 0 ? 'warning' : 'healthy'}
              actionLabel="Resolve" onAction={() => setActiveTab('misplaced')} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Today's entries */}
            <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <Users className="w-4 h-4 text-teal-500" /> Today's Library Entries
                </h2>
                <button onClick={() => setActiveTab('circulation')} className="text-xs text-indigo-600 hover:underline cursor-pointer flex items-center gap-1">All <ArrowRight className="w-3 h-3" /></button>
              </div>
              <p className="text-3xl font-extrabold text-teal-600 mb-1">{todayEntries}</p>
              <p className="text-xs text-slate-500 mb-3">students/staff entered today</p>
              <div className="space-y-1.5">
                {entries.filter(e => e.date === '2025-10-16').slice(0, 3).map(e => (
                  <div key={e.id} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <Badge variant={sv(e.entryMethod)}>{e.entryMethod}</Badge>
                    <span className="truncate">{e.memberName}</span>
                    <span className="text-[10px] text-slate-400 ml-auto">{e.entryTime}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* No-due alerts */}
            <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-rose-500" /> No-Due Exceptions
                </h2>
                <button onClick={() => setActiveTab('circulation')} className="text-xs text-indigo-600 hover:underline cursor-pointer flex items-center gap-1">All <ArrowRight className="w-3 h-3" /></button>
              </div>
              <p className="text-3xl font-extrabold text-rose-600 mb-1">{blockedMembers}</p>
              <p className="text-xs text-slate-500 mb-3">members with pending obligations</p>
              <div className="space-y-1.5">
                {noDue.filter(n => n.noDueStatus !== 'Clear').slice(0, 3).map(n => (
                  <div key={n.id} className="flex items-center gap-2 text-xs">
                    <Badge variant={sv(n.noDueStatus)}>{n.noDueStatus}</Badge>
                    <span className="text-slate-700 dark:text-slate-300 truncate">{n.memberName}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* NAAC summary */}
            <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-500" /> NAAC Readiness
                </h2>
                <button onClick={() => setActiveTab('naac')} className="text-xs text-indigo-600 hover:underline cursor-pointer flex items-center gap-1">View <ArrowRight className="w-3 h-3" /></button>
              </div>
              <p className="text-3xl font-extrabold text-indigo-600 mb-1">{naacComplete}/{NAAC_RECORDS.length}</p>
              <p className="text-xs text-slate-500 mb-3">indicators complete</p>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-2 rounded-full bg-indigo-500 transition-all" style={{ width: `${(naacComplete / NAAC_RECORDS.length) * 100}%` }} />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">{Math.round((naacComplete / NAAC_RECORDS.length) * 100)}% complete</p>
            </div>
          </div>

          {/* Misplaced alert banner */}
          {unresolvedMisplaced > 0 && (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-bold text-amber-800 dark:text-amber-200">{unresolvedMisplaced} misplaced books detected by handheld scanner</p>
                <p className="text-xs text-amber-700 dark:text-amber-300">Scan-guided shelf returns are ready. Staff can resolve them with one click.</p>
              </div>
              <button onClick={() => setActiveTab('misplaced')} className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold cursor-pointer shrink-0">
                Resolve Now
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── BOOK INVENTORY ─────────────────────────────────────────────────── */}
      {activeTab === 'inventory' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search title, ISBN, author…"
                className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <ExportButton filename="inventory" data={filteredInventory.map(b => ({ title: b.title, isbn: b.isbn, copies: b.totalCopies, available: b.availableCopies, location: `${b.section} / ${b.rack} / ${b.shelf}` }))} label="Export" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  {['Title / Authors', 'ISBN', 'Category', 'Location', 'Copies', 'RFID', 'Last Audit'].map(h => (
                    <th key={h} className="text-left text-[10px] font-semibold text-slate-500 uppercase pb-2 pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredInventory.map(b => (
                  <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="py-3 pr-4">
                      <p className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">{b.title}</p>
                      <p className="text-[10px] text-slate-400">{b.authors.join(', ')}</p>
                    </td>
                    <td className="py-3 pr-4 text-slate-500 font-mono text-[10px]">{b.isbn}</td>
                    <td className="py-3 pr-4"><Badge variant="indigo">{b.category}</Badge></td>
                    <td className="py-3 pr-4">
                      <p className="text-slate-700 dark:text-slate-300">{b.section}</p>
                      <p className="text-[10px] text-slate-400">Rack {b.rack} · Shelf {b.shelf}</p>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-emerald-600 font-semibold">{b.availableCopies} avail</span>
                        <span className="text-amber-600 text-[10px]">{b.issuedCopies} issued</span>
                        {b.misplacedCopies > 0 && <span className="text-rose-500 text-[10px]">{b.misplacedCopies} misplaced</span>}
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      {b.rfidTagged ? <Badge variant="teal"><Wifi className="w-2.5 h-2.5 inline mr-0.5" />Tagged</Badge> : <Badge variant="slate">Barcode</Badge>}
                    </td>
                    <td className="py-3 text-slate-400 text-[10px]">{b.lastInventoryDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── CIRCULATION & NO-DUE ──────────────────────────────────────────── */}
      {activeTab === 'circulation' && (
        <div className="space-y-4">
          {/* Active / Overdue Loans */}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-teal-500" /> Book Loans — Entry Tracking
              </h2>
              <div className="flex-1" />
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search member or book…"
                  className="pl-8 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-56" />
              </div>
              <ExportButton filename="loans" data={filteredLoans.map(l => ({ member: l.memberName, book: l.bookTitle, issued: l.issueDate, due: l.dueDate, status: l.status }))} label="Export" />
            </div>

            <div className="space-y-2">
              {filteredLoans.map(l => (
                <div key={l.id} className={`p-4 rounded-xl border transition-colors ${l.status === 'Overdue' ? 'bg-rose-50 border-rose-200 dark:bg-rose-950/15 dark:border-rose-900/30' : l.status === 'Returned' ? 'bg-slate-50 border-slate-200 dark:bg-slate-900/20 dark:border-slate-700' : 'bg-teal-50 border-teal-200 dark:bg-teal-950/15 dark:border-teal-900/30'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{l.memberName}</span>
                        <Badge variant="slate">{l.memberCategory}</Badge>
                        {l.memberGrade && <span className="text-[10px] text-slate-400">{l.memberGrade}</span>}
                        <Badge variant={sv(l.status)}>{l.status}</Badge>
                        {l.fineAmount && !l.finePaid && <Badge variant="rose">Fine ₹{l.fineAmount}</Badge>}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{l.bookTitle}</p>
                      <p className="text-[10px] text-slate-400">Barcode: {l.copyBarcode} · Issued: {l.issueDate} · Due: <strong className={l.status === 'Overdue' ? 'text-rose-600' : ''}>{l.dueDate}</strong>{l.returnDate ? ` · Returned: ${l.returnDate}` : ''}</p>
                    </div>
                    {(l.status === 'Active' || l.status === 'Overdue') && (
                      <button onClick={() => handleReturn(l.id)}
                        className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer shrink-0">
                        <CheckCheck className="w-3.5 h-3.5" /> Return
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Library Entry Log */}
            <div>
              <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Library Entry Log — Engagement Tracking
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs min-w-[600px]">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      {['Member', 'Category', 'Entry Method', 'Date', 'In', 'Out', 'Branch', 'Purpose'].map(h => (
                        <th key={h} className="text-left text-[10px] font-semibold text-slate-500 uppercase pb-2 pr-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {entries.map(e => (
                      <tr key={e.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                        <td className="py-2.5 pr-3 font-medium text-slate-800 dark:text-slate-200">{e.memberName}</td>
                        <td className="py-2.5 pr-3"><Badge variant="slate">{e.memberCategory}</Badge></td>
                        <td className="py-2.5 pr-3"><Badge variant={sv(e.entryMethod)}>{e.entryMethod}</Badge></td>
                        <td className="py-2.5 pr-3 text-slate-500">{e.date}</td>
                        <td className="py-2.5 pr-3 text-slate-500">{e.entryTime}</td>
                        <td className="py-2.5 pr-3 text-slate-500">{e.exitTime ?? <span className="text-teal-600 font-semibold">Still In</span>}</td>
                        <td className="py-2.5 pr-3 text-slate-500 text-[10px]">{e.branch}</td>
                        <td className="py-2.5 text-slate-500">{e.purposeTagged ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* No-Due Status */}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-rose-500" /> No-Due Status &amp; Obligations
              </h2>
              <ExportButton filename="no_due" data={noDue.map(n => ({ member: n.memberName, status: n.noDueStatus, overdue: n.overdueBooks, fines: n.unresolvedFines }))} label="Export" />
            </div>
            <div className="space-y-2">
              {noDue.map(n => (
                <div key={n.id} className={`flex items-center gap-3 p-3.5 rounded-xl border ${n.noDueStatus === 'Blocked' ? 'bg-rose-50 border-rose-200 dark:bg-rose-950/15 dark:border-rose-900/30' : n.noDueStatus === 'Overdue' ? 'bg-amber-50 border-amber-200 dark:bg-amber-950/15 dark:border-amber-900/30' : n.noDueStatus === 'Pending' ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/15 dark:border-indigo-900/30' : 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/15 dark:border-emerald-900/30'}`}>
                  {n.noDueStatus === 'Clear' ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> : <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{n.memberName}</span>
                      <Badge variant="slate">{n.memberCategory}</Badge>
                      {n.memberGrade && <span className="text-[10px] text-slate-400">{n.memberGrade}</span>}
                      <Badge variant={sv(n.noDueStatus)}>{n.noDueStatus}</Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-[11px] text-slate-500">
                      <span>Active loans: <strong>{n.activeLoans}</strong></span>
                      <span>Overdue: <strong className={n.overdueBooks > 0 ? 'text-rose-600' : ''}>{n.overdueBooks}</strong></span>
                      <span>Unresolved fines: <strong className={n.unresolvedFines > 0 ? 'text-rose-600' : ''}>{n.unresolvedFines}</strong></span>
                    </div>
                    {n.blockedReason && <p className="text-[10px] text-rose-600 dark:text-rose-400 mt-0.5 italic">{n.blockedReason}</p>}
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">Checked {n.lastChecked}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MISPLACED BOOKS ────────────────────────────────────────────────── */}
      {activeTab === 'misplaced' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
            <Scan className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-sm font-bold text-amber-800 dark:text-amber-200">Handheld Scanner Assistance</p>
              <p className="text-xs text-amber-700 dark:text-amber-300">
                Staff use handheld barcode/RFID scanners during shelf audits to detect misplaced books. The system shows the expected location and the found location so staff can return each book to its correct shelf.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-3 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" /> Unresolved Misplacements ({misplaced.filter(m => !m.resolved).length})
            </h3>
            <div className="space-y-3">
              {misplaced.filter(m => !m.resolved).map(m => (
                <div key={m.id} className="p-4 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50 dark:bg-amber-950/15">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{m.bookTitle}</span>
                        <Badge variant="amber">Misplaced</Badge>
                        <Badge variant={m.detectedBy === 'RFID Reader' ? 'teal' : m.detectedBy === 'Handheld Scanner' ? 'indigo' : 'slate'}>{m.detectedBy}</Badge>
                      </div>
                      <p className="text-[10px] text-slate-400 mb-2">Barcode: {m.copyBarcode} · Detected by {m.detectedBy_name} at {new Date(m.detectedAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/30 text-xs">
                          <p className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Correct Location</p>
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{m.expectedSection}</p>
                          <p className="text-slate-500">Rack {m.expectedRack} · Shelf {m.expectedShelf}</p>
                        </div>
                        <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/30 text-xs">
                          <p className="text-[10px] font-bold text-rose-700 dark:text-rose-300 uppercase mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Found At</p>
                          <p className="font-semibold text-slate-800 dark:text-slate-200">{m.foundSection}</p>
                          <p className="text-slate-500">Rack {m.foundRack} · Shelf {m.foundShelf}</p>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => handleResolveMisplaced(m.id)}
                      className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0">
                      <CheckCheck className="w-3.5 h-3.5" /> Mark Returned
                    </button>
                  </div>
                </div>
              ))}
              {misplaced.filter(m => !m.resolved).length === 0 && (
                <div className="text-center py-6 text-xs text-slate-400">All books are correctly shelved ✅</div>
              )}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Resolved ({misplaced.filter(m => m.resolved).length})
            </h3>
            <div className="space-y-2">
              {misplaced.filter(m => m.resolved).map(m => (
                <div key={m.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/20 opacity-70">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{m.bookTitle} <span className="font-normal text-slate-400">({m.copyBarcode})</span></p>
                      <p className="text-[10px] text-slate-400">Resolved by {m.resolvedBy} at {m.resolvedAt ? new Date(m.resolvedAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }) : '—'}</p>
                    </div>
                    <Badge variant="emerald">Resolved</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── LIBRARY RULES ──────────────────────────────────────────────────── */}
      {activeTab === 'rules' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40">
            <Settings className="w-5 h-5 text-indigo-600 shrink-0" />
            <div>
              <p className="text-sm font-bold text-indigo-800 dark:text-indigo-200">Configurable Library Rules &amp; Protocols</p>
              <p className="text-xs text-indigo-700 dark:text-indigo-300">Toggle rules on/off. Changes are applied immediately to all active transactions and member accounts.</p>
            </div>
          </div>

          <div className="space-y-2">
            {rules.map(r => (
              <div key={r.id} className={`p-4 rounded-xl border transition-all ${r.enabled ? 'bg-white dark:bg-[#131B2E] border-slate-200 dark:border-slate-700' : 'bg-slate-50 dark:bg-slate-900/20 border-slate-200 dark:border-slate-800 opacity-60'}`}>
                <div className="flex items-start gap-3">
                  <button onClick={() => toggleRule(r.id)} className="mt-0.5 shrink-0 cursor-pointer">
                    {r.enabled ? <ToggleRight className="w-6 h-6 text-indigo-600" /> : <ToggleLeft className="w-6 h-6 text-slate-400" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{r.ruleName}</span>
                      <Badge variant={r.scope === 'All' ? 'slate' : r.scope === 'Student' ? 'indigo' : r.scope === 'Faculty' ? 'teal' : 'amber'}>{r.scope}</Badge>
                      {r.enabled ? <Badge variant="emerald">Active</Badge> : <Badge variant="slate">Disabled</Badge>}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{r.description}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Last modified {r.lastModified} by {r.modifiedBy}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-extrabold text-indigo-600">{r.value}</p>
                    <p className="text-[10px] text-slate-400">{r.unit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── NAAC & ACCREDITATION ────────────────────────────────────────────── */}
      {activeTab === 'naac' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40">
            <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
            <div>
              <p className="text-sm font-bold text-indigo-800 dark:text-indigo-200">NAAC Accreditation — Library Evidence Checklist</p>
              <p className="text-xs text-indigo-700 dark:text-indigo-300">Track criterion-wise evidence for library-related NAAC indicators. Upload documents and link evidence for authorized reviewers. Subject to validation with IQAC / accreditation team.</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {(['Complete', 'Partial', 'Pending'] as const).map(status => {
              const count = NAAC_RECORDS.filter(n => n.status === status).length
              return (
                <div key={status} className={`p-4 rounded-xl border text-center ${status === 'Complete' ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/15 dark:border-emerald-900/30' : status === 'Partial' ? 'bg-amber-50 border-amber-200 dark:bg-amber-950/15 dark:border-amber-900/30' : 'bg-rose-50 border-rose-200 dark:bg-rose-950/15 dark:border-rose-900/30'}`}>
                  <p className={`text-2xl font-extrabold ${status === 'Complete' ? 'text-emerald-600' : status === 'Partial' ? 'text-amber-600' : 'text-rose-600'}`}>{count}</p>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">{status}</p>
                </div>
              )
            })}
          </div>

          <div className="space-y-3">
            {NAAC_RECORDS.map(n => (
              <div key={n.id} className={`p-4 rounded-xl border ${n.status === 'Complete' ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/10 dark:border-emerald-900/20' : n.status === 'Partial' ? 'bg-amber-50 border-amber-200 dark:bg-amber-950/10 dark:border-amber-900/20' : 'bg-rose-50 border-rose-200 dark:bg-rose-950/10 dark:border-rose-900/20'}`}>
                <div className="flex items-start gap-3">
                  {n.status === 'Complete' ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> : <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Indicator {n.indicator}</span>
                      <Badge variant={sv(n.status)}>{n.status}</Badge>
                      <span className="text-[10px] text-slate-400">{n.documentsUploaded} doc{n.documentsUploaded !== 1 ? 's' : ''} uploaded</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">{n.description}</p>
                    <p className="text-[10px] text-slate-500 mb-1">{n.criterion}</p>
                    {n.evidenceLinks.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {n.evidenceLinks.map(e => (
                          <span key={e} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300">
                            <FileText className="w-2.5 h-2.5" /> {e}
                          </span>
                        ))}
                      </div>
                    )}
                    {n.notes && <p className="text-[10px] text-slate-400 italic mt-1">{n.notes}</p>}
                    <p className="text-[10px] text-slate-400 mt-1">Updated {n.lastUpdated} by {n.updatedBy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── AI & ANALYTICS ─────────────────────────────────────────────────── */}
      {activeTab === 'ai' && (
        <div className="space-y-4">
          {/* Demand & Circulation Analytics */}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <h2 className="text-sm font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-indigo-500" /> Demand &amp; Circulation Analytics
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    {['Subject', 'Total Issues', 'Total Returns', 'Avg Loan Days', 'Overdue Rate', 'Top Borrowed Title'].map(h => (
                      <th key={h} className="text-left text-[10px] font-semibold text-slate-500 uppercase pb-2 pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {CIRCULATION_ANALYTICS.map(c => (
                    <tr key={c.subject} className="hover:bg-slate-50 dark:hover:bg-slate-900/30">
                      <td className="py-3 pr-4 font-semibold text-slate-800 dark:text-slate-200">{c.subject}</td>
                      <td className="py-3 pr-4 text-teal-600 font-bold">{c.totalIssues}</td>
                      <td className="py-3 pr-4 text-slate-500">{c.totalReturns}</td>
                      <td className="py-3 pr-4 text-slate-500">{c.avgLoanDays} days</td>
                      <td className="py-3 pr-4">
                        <span className={`font-bold ${c.overdueRate > 10 ? 'text-rose-600' : c.overdueRate > 6 ? 'text-amber-600' : 'text-emerald-600'}`}>{c.overdueRate}%</span>
                      </td>
                      <td className="py-3 text-slate-500 text-[11px]">{c.topBorrowedTitle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* No-Due Exception Detection */}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <h2 className="text-sm font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" /> AI — No-Due Exception Detection
            </h2>
            <div className="space-y-2">
              {noDue.filter(n => n.noDueStatus !== 'Clear').map(n => (
                <div key={n.id} className="flex items-start gap-3 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/15 border border-rose-200 dark:border-rose-900/30">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{n.memberName}</span>
                      <Badge variant={sv(n.noDueStatus)}>{n.noDueStatus}</Badge>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {n.overdueBooks > 0 && `${n.overdueBooks} overdue book(s). `}
                      {n.unresolvedFines > 0 && `${n.unresolvedFines} unresolved fine(s). `}
                      {n.blockedReason && n.blockedReason}
                    </p>
                    <p className="text-[10px] text-rose-600 dark:text-rose-400 mt-0.5 font-semibold">
                      ⚠ Cannot issue exam hall ticket / new books until obligations are cleared.
                    </p>
                  </div>
                </div>
              ))}
              {noDue.filter(n => n.noDueStatus !== 'Clear').length === 0 && (
                <p className="text-xs text-slate-400 text-center py-4">No no-due exceptions detected ✅</p>
              )}
            </div>
          </div>

          {/* Personalized Reading Recommendations */}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" /> Personalized Reading Recommendations
              </h2>
              <Badge variant="amber">Optional · Student-Facing</Badge>
            </div>
            <div className="space-y-4">
              {AI_RECOMMENDATIONS.map(r => (
                <div key={r.studentId} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{r.studentName}</span>
                    <Badge variant="slate">{r.grade}</Badge>
                  </div>
                  <div className="space-y-2">
                    {r.recommendations.map(rec => (
                      <div key={rec.bookId} className="flex items-center gap-3 p-2.5 rounded-lg bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-700">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/30 flex items-center justify-center shrink-0">
                          <Star className="w-4 h-4 text-amber-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">{rec.bookTitle}</p>
                          <p className="text-[10px] text-slate-500">{rec.reason}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="flex items-center gap-1">
                            <div className="w-12 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800">
                              <div className="h-1.5 rounded-full bg-amber-400" style={{ width: `${rec.score}%` }} />
                            </div>
                            <span className="text-[10px] font-bold text-amber-600">{rec.score}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Misplaced Book AI */}
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <h2 className="text-sm font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
              <Scan className="w-4 h-4 text-teal-500" /> AI — Misplaced Book Assistance (Barcode / RFID)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
              During handheld scanner shelf audits, the system compares each scanned book's location against its registered shelf. Books found out of place are flagged instantly with their correct destination (section → rack → shelf). Staff see a guided return list sorted by proximity for efficient resolution.
            </p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/30">
                <p className="text-lg font-extrabold text-teal-600">{misplaced.length}</p>
                <p className="text-[10px] text-slate-500">Total detected this cycle</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30">
                <p className="text-lg font-extrabold text-amber-600">{misplaced.filter(m => !m.resolved).length}</p>
                <p className="text-[10px] text-slate-500">Awaiting resolution</p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/30">
                <p className="text-lg font-extrabold text-emerald-600">{misplaced.filter(m => m.resolved).length}</p>
                <p className="text-[10px] text-slate-500">Returned to correct shelf</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Modals ─────────────────────────────────────────────────────────── */}
      {addBookModal && <AddBookModal onClose={() => setAddBookModal(false)} onSave={handleAddBook} />}
      {issueModal && <IssueBookModal books={inventory} onClose={() => setIssueModal(false)} onSave={handleIssueBook} />}
    </div>
  )
}
