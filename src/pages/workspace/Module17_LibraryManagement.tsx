import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { MOCK_LIBRARY } from '../../data/mockData'
import { Badge } from '../../components/common/Badge'
import { ExportButton } from '../../components/common/ExportButton'
import { Bookmark, Search, RotateCcw, AlertTriangle, CheckCircle, Award, Radio } from 'lucide-react'

export const Module17_LibraryManagement: React.FC = () => {
  const { showToast } = useApp()
  const [books, setBooks] = useState(MOCK_LIBRARY)
  const [search, setSearch] = useState('')

  const handleReturnBook = (id: string, title: string) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: 'Available' as const, borrowerName: undefined, dueDate: undefined } : b
      )
    )
    showToast(`Book "${title}" checked in! RFID tag re-shelved in Stack CS-04.`, 'success')
  }

  const handleLocateMisplaced = (id: string) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'Available' as const } : b))
    )
    showToast('Handheld RFID wand detected book on Stack CS-01 Shelf A. Restored to catalog!', 'success')
  }

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.accessionNo.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              17. Library Commons & NAAC Accreditation Records
            </h1>
            <Badge variant="indigo">Module 17</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Automated RFID book circulation, handheld misplaced locator, turnstile footfall logs, and NAAC Criterion 4.2 evidence.
          </p>
        </div>

        <ExportButton filename="library_circulation_master" data={books} />
      </div>

      {/* NAAC Criterion 4.2 Evidence Box */}
      <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-start gap-3">
          <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">
              NAAC Accreditation Evidence Package (Criterion 4.2: Integrated Library Management)
            </h4>
            <p className="text-slate-600 dark:text-slate-300 mt-0.5">
              100% automated with barcoded accessioning, e-ShodhSindhu digital journal links, and turnstile footfall audit records ready for SSR submission.
            </p>
          </div>
        </div>
        <button
          onClick={() => showToast('Generated NAAC Criterion 4.2 Compliance Dossier (PDF Preview)', 'info')}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shrink-0 cursor-pointer"
        >
          Export NAAC Dossier
        </button>
      </div>

      {/* Catalog & Circulation Table */}
      <div className="bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">Central Catalog Circulation</h3>
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search title, author, accession #..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
            />
          </div>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.map((b) => (
            <div key={b.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">{b.title}</span>
                  <span className="font-mono text-slate-400 font-semibold">{b.accessionNo}</span>
                </div>
                <p className="text-slate-500 mt-0.5">
                  Author: {b.author} &bull; Category: {b.category} &bull; Shelf: <strong>{b.shelfLocation}</strong>
                </p>
                {b.borrowerName && (
                  <p className="text-[11px] text-indigo-600 font-semibold mt-0.5">
                    Checked out by: {b.borrowerName} (Due: {b.dueDate})
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Badge
                  variant={
                    b.status === 'Available'
                      ? 'emerald'
                      : b.status === 'Checked Out'
                      ? 'indigo'
                      : 'rose'
                  }
                >
                  {b.status}
                </Badge>

                {b.status === 'Checked Out' && (
                  <button
                    onClick={() => handleReturnBook(b.id, b.title)}
                    className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold cursor-pointer text-xs"
                  >
                    Check In Return
                  </button>
                )}
                {b.status === 'Misplaced / AI Flag' && (
                  <button
                    onClick={() => handleLocateMisplaced(b.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold cursor-pointer text-xs flex items-center gap-1"
                  >
                    <Radio className="w-3.5 h-3.5" />
                    Wand RFID Locate
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
