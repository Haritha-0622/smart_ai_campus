import React, { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import { Library, BookOpen, Search, Plus, RotateCcw, AlertTriangle, CheckCircle2, Settings } from 'lucide-react'

type Tab = 'dashboard' | 'catalog' | 'issue-return' | 'overdue' | 'inventory' | 'no-due' | 'rules' | 'analytics'

const TABS: { key: Tab; label: string }[] = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'catalog', label: 'Book Catalog' },
  { key: 'issue-return', label: 'Issue / Return' },
  { key: 'overdue', label: 'Overdue' },
  { key: 'inventory', label: 'Inventory' },
  { key: 'no-due', label: 'No-Due' },
  { key: 'rules', label: 'Library Rules' },
  { key: 'analytics', label: 'Analytics' },
]

const LIBRARY_BOOKS = [
  { id: 'lb01', isbn: '978-0-06-112008-4', title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', totalCopies: 5, availableCopies: 3, borrowedBy: 'Priya S.', dueDate: '2025-10-18', status: 'Borrowed' as const, location: 'Shelf A2' },
  { id: 'lb02', isbn: '978-0-14-028329-7', title: 'Organic Chemistry — Morrison', author: 'R.T. Morrison', category: 'Science', totalCopies: 8, availableCopies: 8, borrowedBy: undefined, dueDate: undefined, status: 'Available' as const, location: 'Shelf C1' },
  { id: 'lb03', isbn: '978-0-07-182521-5', title: 'Higher Engineering Mathematics', author: 'B.S. Grewal', category: 'Mathematics', totalCopies: 12, availableCopies: 4, borrowedBy: 'Arjun K.', dueDate: '2025-10-08', status: 'Borrowed' as const, location: 'Shelf B3' },
  { id: 'lb04', isbn: '978-93-5143-097-3', title: 'NCERT Physics Part II', author: 'NCERT', category: 'Science', totalCopies: 20, availableCopies: 12, borrowedBy: undefined, dueDate: undefined, status: 'Available' as const, location: 'Shelf C2' },
  { id: 'lb05', isbn: '978-0-19-852777-1', title: 'Introduction to Algorithms', author: 'Cormen et al.', category: 'Computer Science', totalCopies: 6, availableCopies: 0, borrowedBy: 'Multiple', dueDate: '2025-10-12', status: 'Borrowed' as const, location: 'Shelf D1' },
  { id: 'lb06', isbn: '978-81-7808-474-5', title: 'Thirukkural with Commentary', author: 'Thiruvalluvar', category: 'Tamil Literature', totalCopies: 15, availableCopies: 10, borrowedBy: undefined, dueDate: undefined, status: 'Available' as const, location: 'Shelf A1' },
  { id: 'lb07', isbn: '978-0-674-73700-1', title: 'The Elements of Style', author: 'Strunk & White', category: 'English', totalCopies: 4, availableCopies: 2, borrowedBy: 'Meera V.', dueDate: '2025-10-05', status: 'Borrowed' as const, location: 'Shelf A3' },
  { id: 'lb08', isbn: '978-81-265-1771-5', title: 'NCERT Biology Class 12', author: 'NCERT', category: 'Science', totalCopies: 18, availableCopies: 10, borrowedBy: undefined, dueDate: undefined, status: 'Available' as const, location: 'Shelf C3' },
  { id: 'lb09', isbn: '978-0-521-38381-7', title: 'Cambridge Advanced English', author: 'Leo Jones', category: 'English', totalCopies: 5, availableCopies: 3, borrowedBy: 'Suresh D.', dueDate: '2025-10-15', status: 'Borrowed' as const, location: 'Shelf A4' },
  { id: 'lb10', isbn: '978-0-89871-526-6', title: 'Numerical Methods for Engineers', author: 'Chapra', category: 'Mathematics', totalCopies: 7, availableCopies: 5, borrowedBy: undefined, dueDate: undefined, status: 'Available' as const, location: 'Shelf B1' },
  { id: 'lb11', isbn: '978-0-07-029158-7', title: 'Fundamentals of Physics', author: 'Halliday', category: 'Science', totalCopies: 10, availableCopies: 2, borrowedBy: 'Kavya M.', dueDate: '2025-10-10', status: 'Borrowed' as const, location: 'Shelf C4' },
  { id: 'lb12', isbn: '978-0-13-110362-7', title: 'The C Programming Language', author: 'Kernighan & Ritchie', category: 'Computer Science', totalCopies: 6, availableCopies: 4, borrowedBy: undefined, dueDate: undefined, status: 'Available' as const, location: 'Shelf D2' },
  { id: 'lb13', isbn: '978-81-7992-461-8', title: 'Indian History', author: 'Bipan Chandra', category: 'History', totalCopies: 8, availableCopies: 6, borrowedBy: undefined, dueDate: undefined, status: 'Available' as const, location: 'Shelf E1' },
  { id: 'lb14', isbn: '978-0-674-63700-1', title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', totalCopies: 3, availableCopies: 1, borrowedBy: 'Ananya S.', dueDate: '2025-10-20', status: 'Borrowed' as const, location: 'Shelf C5' },
  { id: 'lb15', isbn: '978-93-5057-591-4', title: 'Business Studies Class 12', author: 'NCERT', category: 'Commerce', totalCopies: 15, availableCopies: 12, borrowedBy: undefined, dueDate: undefined, status: 'Available' as const, location: 'Shelf F1' },
]

const LIBRARY_RULES = [
  { rule: 'Loan Period', value: '14 days for students, 30 days for staff', icon: '📅' },
  { rule: 'Maximum Books', value: '3 books per student, 5 books per staff', icon: '📚' },
  { rule: 'Fine per Day', value: '₹2 per day after due date', icon: '💰' },
  { rule: 'Renewal Policy', value: 'One renewal allowed, 14 additional days, no renewals for overdue books', icon: '🔄' },
  { rule: 'Reservation Policy', value: 'Books can be reserved online. Reserved books held for 2 days', icon: '📋' },
  { rule: 'Lost Book Policy', value: 'Replacement cost + ₹100 processing fee. No-due block until resolved', icon: '⚠️' },
  { rule: 'Library Hours', value: 'Mon–Fri: 8:00 AM – 6:00 PM, Sat: 9:00 AM – 1:00 PM', icon: '🕐' },
  { rule: 'Holiday Schedule', value: 'Closed on government holidays and exam weeks', icon: '🏖️' },
]

const NAAC_CHECKLIST = [
  { item: 'Library usage records maintained', done: true },
  { item: 'Digital catalog accessible to students', done: true },
  { item: 'Inter-library lending policy documented', done: false },
  { item: 'Annual stock verification completed', done: true },
  { item: 'Book procurement policy approved', done: true },
  { item: 'E-resources subscription active', done: false },
  { item: 'Reading room capacity documented', done: true },
  { item: 'Librarian qualification record updated', done: true },
]

export const Module10_LibraryManagement: React.FC = () => {
  const { students, showToast, updateStudent, institution } = useApp()
  const [tab, setTab] = useState<Tab>('dashboard')
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [issueStudent, setIssueStudent] = useState('')
  const [issueBook, setIssueBook] = useState('')
  const [issueDue, setIssueDue] = useState('')
  const [books, setBooks] = useState(LIBRARY_BOOKS)

  const categories = useMemo(() => ['all', ...Array.from(new Set(LIBRARY_BOOKS.map(b => b.category)))], [])

  const filteredBooks = useMemo(() => books.filter(b => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.isbn.includes(search)
    const matchCat = categoryFilter === 'all' || b.category === categoryFilter
    return matchSearch && matchCat
  }), [books, search, categoryFilter])

  const totalBooks = useMemo(() => books.reduce((a, b) => a + b.totalCopies, 0), [books])
  const borrowed = useMemo(() => books.reduce((a, b) => a + (b.totalCopies - b.availableCopies), 0), [books])
  const available = totalBooks - borrowed
  const today = new Date()

  const overdueBooks = useMemo(() => books.filter(b => {
    if (!b.dueDate) return false
    return new Date(b.dueDate) < today
  }), [books])

  const studentsWithDues = useMemo(() => students.filter(s => s.libraryBooksCount > 0), [students])

  const handleIssue = () => {
    if (!issueStudent || !issueBook || !issueDue) {
      showToast('Please fill all issue fields', 'warning')
      return
    }
    showToast(`Book "${issueBook}" issued to student successfully. Due: ${issueDue}`, 'success')
    setIssueStudent('')
    setIssueBook('')
    setIssueDue('')
  }

  const handleReturn = (bookId: string) => {
    setBooks(prev => prev.map(b => b.id === bookId ? { ...b, availableCopies: b.availableCopies + 1, status: b.availableCopies + 1 >= b.totalCopies ? 'Available' : b.status, borrowedBy: undefined, dueDate: undefined } : b))
    showToast('Book returned successfully', 'success')
  }

  const handleLibraryClearance = (studentId: string, name: string) => {
    updateStudent(studentId, { libraryBooksCount: 0, noDueStatus: 'Pending Clearance' })
    showToast(`Library clearance granted for ${name}`, 'success')
  }

  const calcFine = (dueDate: string) => {
    const days = Math.floor((today.getTime() - new Date(dueDate).getTime()) / (1000 * 60 * 60 * 24))
    return Math.max(0, days) * 2
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <Library className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-xl font-extrabold text-[#101A33] dark:text-white">Library Management & Tracker</h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{institution.name} &bull; {books.length} Titles &bull; {totalBooks} Total Copies</p>
          </div>
          <ExportButton filename="library_catalog" data={books.map(b => ({ isbn: b.isbn, title: b.title, author: b.author, available: b.availableCopies, status: b.status }))} label="Export" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          <StatCard title="Total Books" value={totalBooks} subtext={`${books.length} unique titles`} icon={BookOpen} status="healthy" />
          <StatCard title="Borrowed" value={borrowed} subtext="Currently issued" icon={Library} status="warning" />
          <StatCard title="Available" value={available} subtext="Ready to issue" icon={CheckCircle2} status="healthy" />
          <StatCard title="Overdue Returns" value={overdueBooks.length} subtext="Pending return" icon={AlertTriangle} status={overdueBooks.length > 0 ? 'critical' : 'healthy'} />
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
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Currently Issued Books</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Book Title', 'Author', 'Category', 'Borrowed By', 'Due Date', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {books.filter(b => b.status === 'Borrowed').map(b => (
                  <tr key={b.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{b.title}</td>
                    <td className="py-2 pr-4 text-slate-500">{b.author}</td>
                    <td className="py-2 pr-4"><Badge variant="indigo">{b.category}</Badge></td>
                    <td className="py-2 pr-4 text-slate-600 dark:text-slate-300">{b.borrowedBy}</td>
                    <td className="py-2 pr-4 text-slate-500">{b.dueDate}</td>
                    <td className="py-2 pr-4">
                      <Badge variant={b.dueDate && new Date(b.dueDate) < today ? 'rose' : 'amber'}>
                        {b.dueDate && new Date(b.dueDate) < today ? 'Overdue' : 'On Loan'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'catalog' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Title, author, ISBN..."
                className="pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 w-52" />
            </div>
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none">
              {categories.map(c => <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>)}
            </select>
            <span className="text-xs text-slate-500 ml-auto">{filteredBooks.length} books</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['ISBN', 'Title', 'Author', 'Category', 'Total', 'Available', 'Location', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 pr-3 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredBooks.map(b => (
                  <tr key={b.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-3 font-mono text-[10px] text-slate-500">{b.isbn}</td>
                    <td className="py-2 pr-3 font-medium text-slate-800 dark:text-slate-200 max-w-[140px] truncate">{b.title}</td>
                    <td className="py-2 pr-3 text-slate-500">{b.author}</td>
                    <td className="py-2 pr-3"><Badge variant="indigo">{b.category}</Badge></td>
                    <td className="py-2 pr-3 text-center text-slate-600">{b.totalCopies}</td>
                    <td className="py-2 pr-3 text-center font-semibold text-teal-600">{b.availableCopies}</td>
                    <td className="py-2 pr-3 text-slate-500">{b.location}</td>
                    <td className="py-2 pr-3"><Badge variant={b.status === 'Available' ? 'teal' : b.availableCopies === 0 ? 'rose' : 'amber'}>{b.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'issue-return' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs max-w-xl">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-indigo-600" /> Issue a Book
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Select Student</label>
                <select value={issueStudent} onChange={e => setIssueStudent(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">-- Select Student --</option>
                  {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.regNo})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Book Title</label>
                <select value={issueBook} onChange={e => setIssueBook(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">-- Select Book --</option>
                  {books.filter(b => b.availableCopies > 0).map(b => <option key={b.id} value={b.title}>{b.title} ({b.availableCopies} available)</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Due Date</label>
                <input type="date" value={issueDue} onChange={e => setIssueDue(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <button onClick={handleIssue}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer">
                <Library className="w-4 h-4" /> Issue Book
              </button>
            </div>
          </div>
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Books Currently on Loan</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    {['Title', 'Borrowed By', 'Due Date', 'Status', 'Action'].map(h => (
                      <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {books.filter(b => b.status === 'Borrowed').map(b => (
                    <tr key={b.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{b.title}</td>
                      <td className="py-2 pr-4 text-slate-500">{b.borrowedBy}</td>
                      <td className="py-2 pr-4 text-slate-500">{b.dueDate}</td>
                      <td className="py-2 pr-4">
                        <Badge variant={b.dueDate && new Date(b.dueDate) < today ? 'rose' : 'amber'}>
                          {b.dueDate && new Date(b.dueDate) < today ? 'Overdue' : 'On Loan'}
                        </Badge>
                      </td>
                      <td className="py-2 pr-4">
                        <button onClick={() => handleReturn(b.id)}
                          className="flex items-center gap-1 px-2 py-1 rounded bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 hover:bg-teal-100 cursor-pointer">
                          <RotateCcw className="w-3 h-3" /> Return
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === 'overdue' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Overdue Books</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Book Title', 'Borrowed By', 'Due Date', 'Days Overdue', 'Fine (₹)', 'Action'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {overdueBooks.length === 0 && (
                  <tr><td colSpan={6} className="py-8 text-center text-slate-400 text-xs">No overdue books 🎉</td></tr>
                )}
                {overdueBooks.map(b => {
                  const fine = calcFine(b.dueDate!)
                  const days = Math.floor((today.getTime() - new Date(b.dueDate!).getTime()) / (1000 * 60 * 60 * 24))
                  return (
                    <tr key={b.id} className="border-b border-rose-50 dark:border-rose-900/20 bg-rose-50/30 dark:bg-rose-950/10 hover:bg-rose-50 dark:hover:bg-rose-950/20">
                      <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{b.title}</td>
                      <td className="py-2 pr-4 text-slate-500">{b.borrowedBy}</td>
                      <td className="py-2 pr-4 text-rose-600">{b.dueDate}</td>
                      <td className="py-2 pr-4 font-bold text-rose-600">{days} days</td>
                      <td className="py-2 pr-4 font-bold text-amber-600">₹{fine}</td>
                      <td className="py-2 pr-4">
                        <button onClick={() => showToast(`Reminder sent for "${b.title}"`, 'info')}
                          className="px-2 py-1 rounded bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-[10px] hover:bg-rose-100 cursor-pointer">
                          Send Reminder
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'inventory' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Library Inventory</h2>
            <button onClick={() => showToast('Opening add book form...', 'info')}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> Add Book
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Title', 'Author', 'Category', 'Total Copies', 'Available', 'Borrowed', 'Location', 'Action'].map(h => (
                    <th key={h} className="text-left py-2 pr-3 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {books.map(b => (
                  <tr key={b.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-3 font-medium text-slate-800 dark:text-slate-200 max-w-[120px] truncate">{b.title}</td>
                    <td className="py-2 pr-3 text-slate-500">{b.author}</td>
                    <td className="py-2 pr-3"><Badge variant="indigo">{b.category}</Badge></td>
                    <td className="py-2 pr-3 text-center">{b.totalCopies}</td>
                    <td className="py-2 pr-3 text-center text-teal-600 font-semibold">{b.availableCopies}</td>
                    <td className="py-2 pr-3 text-center text-amber-600 font-semibold">{b.totalCopies - b.availableCopies}</td>
                    <td className="py-2 pr-3 text-slate-500">{b.location}</td>
                    <td className="py-2 pr-3">
                      <button onClick={() => showToast(`Editing "${b.title}"...`, 'info')}
                        className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] hover:bg-slate-200 cursor-pointer">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'no-due' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">Library No-Due Clearance</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{studentsWithDues.length} students have pending library books</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Reg No', 'Name', 'Grade/Dept', 'Books Borrowed', 'No Due Status', 'Action'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 text-slate-500">{s.regNo}</td>
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{s.name}</td>
                    <td className="py-2 pr-4 text-slate-500">{s.gradeOrDept}</td>
                    <td className="py-2 pr-4 text-center font-semibold text-slate-700 dark:text-slate-300">{s.libraryBooksCount}</td>
                    <td className="py-2 pr-4">
                      <Badge variant={s.noDueStatus === '100% Cleared' ? 'teal' : s.libraryBooksCount > 0 ? 'rose' : 'teal'}>
                        {s.libraryBooksCount > 0 ? 'Books Pending' : 'Clear'}
                      </Badge>
                    </td>
                    <td className="py-2 pr-4">
                      {s.libraryBooksCount > 0 && (
                        <button onClick={() => handleLibraryClearance(s.id, s.name)}
                          className="flex items-center gap-1 px-2 py-1 rounded bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 text-[10px] hover:bg-teal-100 cursor-pointer">
                          <CheckCircle2 className="w-3 h-3" /> Grant Clearance
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'rules' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Library Rules & Policies</h2>
            <button onClick={() => showToast('Opening library rules editor...', 'info')}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
              <Settings className="w-3.5 h-3.5" /> Edit Rules
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {LIBRARY_RULES.map(r => (
              <div key={r.rule} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">{r.icon}</span>
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">{r.rule}</h3>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">{r.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'analytics' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Most Borrowed Categories</h2>
              {[
                { cat: 'Science', count: 48, pct: 75 },
                { cat: 'Mathematics', count: 32, pct: 50 },
                { cat: 'Fiction', count: 28, pct: 44 },
                { cat: 'Computer Science', count: 24, pct: 38 },
                { cat: 'English', count: 18, pct: 28 },
                { cat: 'Tamil Literature', count: 15, pct: 23 },
              ].map(c => (
                <div key={c.cat} className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-slate-600 dark:text-slate-300 w-32 shrink-0">{c.cat}</span>
                  <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                    <div className="h-2 rounded-full bg-indigo-500" style={{ width: `${c.pct}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 w-8 text-right">{c.count}</span>
                </div>
              ))}
            </div>
            <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
              <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">NAAC Accreditation Checklist</h2>
              <div className="space-y-2">
                {NAAC_CHECKLIST.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className={`w-4 h-4 rounded shrink-0 flex items-center justify-center mt-0.5 ${item.done ? 'bg-teal-500' : 'bg-slate-200 dark:bg-slate-700'}`}>
                      {item.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <span className={`text-xs ${item.done ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400'}`}>{item.item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-2 rounded-lg bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800">
                <p className="text-xs font-semibold text-teal-700 dark:text-teal-300">
                  {NAAC_CHECKLIST.filter(i => i.done).length}/{NAAC_CHECKLIST.length} criteria met
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
