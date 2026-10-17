import React, { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import { Users, UserCheck, Home, BookOpen, Search, Plus, Eye, DollarSign, CheckCircle2 } from 'lucide-react'

type Tab = 'registry' | 'profile' | 'add-student' | 'fee-status' | 'no-due'

const TABS: { key: Tab; label: string }[] = [
  { key: 'registry', label: 'Student Registry' },
  { key: 'profile', label: 'Student Profile' },
  { key: 'add-student', label: 'Add Student' },
  { key: 'fee-status', label: 'Fee Status' },
  { key: 'no-due', label: 'No-Due Status' },
]

export const Module04_StudentPortal: React.FC = () => {
  const { students, institution, showToast, addStudent, updateStudent } = useApp()
  const [tab, setTab] = useState<Tab>('registry')
  const [search, setSearch] = useState('')
  const [gradeFilter, setGradeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '')
  const [noDueFilter, setNoDueFilter] = useState('all')

  const [form, setForm] = useState({
    name: '', regNo: '', gradeOrDept: '', sectionOrSem: '', category: 'Day Scholar' as 'Day Scholar' | 'Hosteller',
    rfidTag: '', parentName: '', parentPhone: '', parentEmail: '',
  })

  const grades = useMemo(() => ['all', ...Array.from(new Set(students.map(s => s.gradeOrDept)))], [students])

  const filtered = useMemo(() => students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.regNo.toLowerCase().includes(search.toLowerCase())
    const matchGrade = gradeFilter === 'all' || s.gradeOrDept === gradeFilter
    const matchStatus = statusFilter === 'all' || s.status === statusFilter
    const matchCat = categoryFilter === 'all' || s.category === categoryFilter
    return matchSearch && matchGrade && matchStatus && matchCat
  }), [students, search, gradeFilter, statusFilter, categoryFilter])

  const selectedStudent = useMemo(() => students.find(s => s.id === selectedStudentId), [students, selectedStudentId])

  const dayScholars = useMemo(() => students.filter(s => s.category === 'Day Scholar').length, [students])
  const hostellars = useMemo(() => students.filter(s => s.category === 'Hosteller').length, [students])
  const active = useMemo(() => students.filter(s => s.status === 'Active').length, [students])

  const totalFeesDue = useMemo(() => students.reduce((a, s) => a + s.feePending, 0), [students])
  const totalFeesPaid = useMemo(() => students.reduce((a, s) => a + s.feePaid, 0), [students])

  const filteredNoDue = useMemo(() => students.filter(s =>
    noDueFilter === 'all' || s.noDueStatus === noDueFilter
  ), [students, noDueFilter])

  const handleAdd = () => {
    if (!form.name || !form.regNo) { showToast('Name and Reg No are required', 'warning'); return }
    addStudent({
      ...form,
      walletBalance: 500,
      attendanceRate: 85,
      feeTotal: 50000,
      feePaid: 25000,
      feePending: 25000,
      libraryBooksCount: 0,
      noDueStatus: 'Not Initiated',
      academicGrade: 'B',
      status: 'Active',
      avatar: '',
    })
    showToast(`Student ${form.name} added successfully`, 'success')
    setForm({ name: '', regNo: '', gradeOrDept: '', sectionOrSem: '', category: 'Day Scholar', rfidTag: '', parentName: '', parentPhone: '', parentEmail: '' })
  }

  const noDueBadge = (s: string) => s === '100% Cleared' ? 'teal' : s === 'Pending Clearance' ? 'amber' : 'rose'

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-xl font-extrabold text-[#101A33] dark:text-white">Student 360° Portal</h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{institution.name} &bull; Complete Student Lifecycle Management</p>
          </div>
          <ExportButton filename="students_export" data={students.map(s => ({ regNo: s.regNo, name: s.name, grade: s.gradeOrDept, status: s.status }))} label="Export" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          <StatCard title="Total Students" value={students.length} subtext="Enrolled" icon={Users} status="healthy" />
          <StatCard title="Active" value={active} subtext="Currently active" icon={UserCheck} status="healthy" />
          <StatCard title="Day Scholars" value={dayScholars} subtext="Commuters" icon={Home} status="healthy" />
          <StatCard title="Hostellars" value={hostellars} subtext="Residential" icon={BookOpen} status="healthy" />
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

      {tab === 'registry' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name or reg no..."
                className="pl-9 pr-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 w-52" />
            </div>
            <select value={gradeFilter} onChange={e => setGradeFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none">
              {grades.map(g => <option key={g} value={g}>{g === 'all' ? 'All Grades' : g}</option>)}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none">
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Suspended">Suspended</option>
            </select>
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none">
              <option value="all">All Categories</option>
              <option value="Day Scholar">Day Scholar</option>
              <option value="Hosteller">Hosteller</option>
            </select>
            <span className="text-xs text-slate-500 ml-auto">{filtered.length} students</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Student', 'Reg No', 'Grade/Dept', 'Category', 'Attendance', 'Fee Status', 'Library', 'No Due', 'Action'].map(h => (
                    <th key={h} className="text-left py-2 pr-3 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-[10px]">{s.name[0]}</div>
                        <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[100px]">{s.name}</span>
                      </div>
                    </td>
                    <td className="py-2 pr-3 text-slate-500">{s.regNo}</td>
                    <td className="py-2 pr-3 text-slate-600 dark:text-slate-300">{s.gradeOrDept}</td>
                    <td className="py-2 pr-3"><Badge variant={s.category === 'Day Scholar' ? 'indigo' : 'teal'}>{s.category}</Badge></td>
                    <td className="py-2 pr-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700">
                          <div className={`h-1.5 rounded-full ${s.attendanceRate > 85 ? 'bg-teal-500' : s.attendanceRate > 75 ? 'bg-amber-400' : 'bg-rose-500'}`} style={{ width: `${s.attendanceRate}%` }} />
                        </div>
                        <span className="text-[10px] text-slate-500">{s.attendanceRate}%</span>
                      </div>
                    </td>
                    <td className="py-2 pr-3">
                      <Badge variant={s.feePending === 0 ? 'teal' : s.feePending < s.feeTotal * 0.5 ? 'amber' : 'rose'}>
                        {s.feePending === 0 ? 'Cleared' : `₹${(s.feePending / 1000).toFixed(0)}K due`}
                      </Badge>
                    </td>
                    <td className="py-2 pr-3 text-center text-slate-600 dark:text-slate-300">{s.libraryBooksCount}</td>
                    <td className="py-2 pr-3"><Badge variant={noDueBadge(s.noDueStatus) as any}>{s.noDueStatus === '100% Cleared' ? 'Cleared' : s.noDueStatus === 'Pending Clearance' ? 'Pending' : 'N/A'}</Badge></td>
                    <td className="py-2 pr-3">
                      <button onClick={() => { setSelectedStudentId(s.id); setTab('profile') }}
                        className="flex items-center gap-1 px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 cursor-pointer">
                        <Eye className="w-3 h-3" /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'profile' && selectedStudent && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-indigo-700 dark:text-indigo-300 text-2xl font-extrabold">
              {selectedStudent.name[0]}
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">{selectedStudent.name}</h2>
              <p className="text-xs text-slate-500">{selectedStudent.regNo} &bull; {selectedStudent.gradeOrDept} &bull; {selectedStudent.sectionOrSem}</p>
              <div className="flex gap-2 mt-1">
                <Badge variant={selectedStudent.status === 'Active' ? 'teal' : 'amber'}>{selectedStudent.status}</Badge>
                <Badge variant={selectedStudent.category === 'Day Scholar' ? 'indigo' : 'teal'}>{selectedStudent.category}</Badge>
              </div>
            </div>
            <button onClick={() => showToast('Opening student edit form...', 'info')}
              className="ml-auto px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer">
              Edit Profile
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'RFID Tag', value: selectedStudent.rfidTag },
              { label: 'Academic Grade', value: selectedStudent.academicGrade },
              { label: 'Attendance Rate', value: `${selectedStudent.attendanceRate}%` },
              { label: 'Wallet Balance', value: `₹${selectedStudent.walletBalance}` },
              { label: 'Total Fee', value: `₹${selectedStudent.feeTotal.toLocaleString()}` },
              { label: 'Fee Paid', value: `₹${selectedStudent.feePaid.toLocaleString()}` },
              { label: 'Fee Pending', value: `₹${selectedStudent.feePending.toLocaleString()}` },
              { label: 'Library Books', value: selectedStudent.libraryBooksCount },
              { label: 'No Due Status', value: selectedStudent.noDueStatus },
              { label: 'Parent Name', value: selectedStudent.parentName },
              { label: 'Parent Phone', value: selectedStudent.parentPhone },
              { label: 'Parent Email', value: selectedStudent.parentEmail },
              ...(selectedStudent.hostelBlock ? [{ label: 'Hostel Block', value: selectedStudent.hostelBlock }, { label: 'Hostel Room', value: selectedStudent.hostelRoom || '—' }] : []),
              ...(selectedStudent.busRoute ? [{ label: 'Bus Route', value: selectedStudent.busRoute }, { label: 'Bus Stop', value: selectedStudent.busStop || '—' }] : []),
            ].map(f => (
              <div key={f.label} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{f.label}</p>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">{String(f.value)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Select Different Student</label>
            <select value={selectedStudentId} onChange={e => setSelectedStudentId(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.regNo})</option>)}
            </select>
          </div>
        </div>
      )}

      {tab === 'add-student' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs max-w-2xl">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-indigo-600" /> Add New Student
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Full Name *', key: 'name', placeholder: 'e.g. Arjun Sharma' },
              { label: 'Registration No *', key: 'regNo', placeholder: 'e.g. DPA-2025-001' },
              { label: 'Grade / Dept', key: 'gradeOrDept', placeholder: 'e.g. Grade 10 / B.Com' },
              { label: 'Section / Semester', key: 'sectionOrSem', placeholder: 'e.g. A / Sem 3' },
              { label: 'RFID Tag', key: 'rfidTag', placeholder: 'e.g. RFID-2025-0101' },
              { label: 'Parent Name', key: 'parentName', placeholder: 'e.g. Mr. Suresh Sharma' },
              { label: 'Parent Phone', key: 'parentPhone', placeholder: '+91 98XXX XXXXX' },
              { label: 'Parent Email', key: 'parentEmail', placeholder: 'parent@email.com' },
            ].map(f => (
              <div key={f.key}>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{f.label}</label>
                <input value={(form as any)[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Category</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value as any }))}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="Day Scholar">Day Scholar</option>
                <option value="Hosteller">Hosteller</option>
              </select>
            </div>
          </div>
          <button onClick={handleAdd}
            className="mt-5 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer">
            <Plus className="w-4 h-4" /> Add Student
          </button>
        </div>
      )}

      {tab === 'fee-status' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Fee Status — All Students</h2>
            <div className="flex gap-4 text-xs">
              <span className="text-teal-600 font-semibold">Paid: ₹{(totalFeesPaid / 100000).toFixed(1)}L</span>
              <span className="text-rose-600 font-semibold">Pending: ₹{(totalFeesDue / 100000).toFixed(1)}L</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Name', 'Grade/Dept', 'Total Fee', 'Paid', 'Pending', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{s.name}</td>
                    <td className="py-2 pr-4 text-slate-500">{s.gradeOrDept}</td>
                    <td className="py-2 pr-4 text-slate-600">₹{s.feeTotal.toLocaleString()}</td>
                    <td className="py-2 pr-4 text-teal-600 font-semibold">₹{s.feePaid.toLocaleString()}</td>
                    <td className="py-2 pr-4 text-rose-600 font-semibold">₹{s.feePending.toLocaleString()}</td>
                    <td className="py-2 pr-4">
                      <Badge variant={s.feePending === 0 ? 'teal' : s.feePending < s.feeTotal * 0.3 ? 'amber' : 'rose'}>
                        {s.feePending === 0 ? 'Cleared' : s.feePending < s.feeTotal * 0.3 ? 'Partial' : 'Overdue'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                  <td className="py-2 pr-4 font-bold text-slate-800 dark:text-slate-200" colSpan={2}>Total</td>
                  <td className="py-2 pr-4 font-bold text-slate-700 dark:text-slate-300">₹{students.reduce((a, s) => a + s.feeTotal, 0).toLocaleString()}</td>
                  <td className="py-2 pr-4 font-bold text-teal-600">₹{totalFeesPaid.toLocaleString()}</td>
                  <td className="py-2 pr-4 font-bold text-rose-600">₹{totalFeesDue.toLocaleString()}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}

      {tab === 'no-due' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center gap-3 mb-4">
            <select value={noDueFilter} onChange={e => setNoDueFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none">
              <option value="all">All Status</option>
              <option value="100% Cleared">100% Cleared</option>
              <option value="Pending Clearance">Pending Clearance</option>
              <option value="Not Initiated">Not Initiated</option>
            </select>
            <span className="text-xs text-slate-500">{filteredNoDue.length} students</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Reg No', 'Name', 'Grade/Dept', 'Books Borrowed', 'No Due Status'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredNoDue.map(s => (
                  <tr key={s.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 text-slate-500">{s.regNo}</td>
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{s.name}</td>
                    <td className="py-2 pr-4 text-slate-500">{s.gradeOrDept}</td>
                    <td className="py-2 pr-4 text-center">{s.libraryBooksCount}</td>
                    <td className="py-2 pr-4"><Badge variant={noDueBadge(s.noDueStatus) as any}>{s.noDueStatus}</Badge></td>
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
