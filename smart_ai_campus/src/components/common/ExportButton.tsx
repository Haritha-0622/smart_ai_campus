import React, { useState } from 'react'
import { Download, Check } from 'lucide-react'
import { useApp } from '../../context/AppContext'

interface ExportButtonProps {
  filename?: string
  data?: Record<string, unknown>[]
  label?: string
  className?: string
  onClick?: () => void
}

export const ExportButton: React.FC<ExportButtonProps> = ({ filename = 'campus_report', data, label = 'Export CSV', className = '', onClick }) => {
  const { showToast } = useApp()
  const [downloaded, setDownloaded] = useState(false)

  const handleClick = () => {
    // If custom onClick provided, use it
    if (onClick) {
      onClick()
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 3000)
      return
    }
    // Otherwise do CSV export
    if (!data || data.length === 0) { showToast('No records available to export', 'warning'); return }
    try {
      const headers = Object.keys(data[0])
      const csvRows = [headers.join(',')]
      for (const row of data) {
        const values = headers.map((header) => {
          const val = row[header]
          if (val === null || val === undefined) return '""'
          const escaped = String(val).replace(/"/g, '""')
          return `"${escaped}"`
        })
        csvRows.push(values.join(','))
      }
      const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      setDownloaded(true)
      showToast(`Exported ${data.length} records to CSV`, 'success')
      setTimeout(() => setDownloaded(false), 3000)
    } catch {
      showToast('Export failed. Please try again.', 'error')
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
        downloaded
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300'
          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
      } ${className}`}
    >
      {downloaded ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
      {downloaded ? 'Exported!' : label}
    </button>
  )
}
