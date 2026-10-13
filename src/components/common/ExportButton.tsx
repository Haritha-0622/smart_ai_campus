import React, { useState } from 'react'
import { Download, FileSpreadsheet, Printer, Check } from 'lucide-react'
import { useApp } from '../../context/AppContext'

interface ExportButtonProps {
  filename?: string
  data: Record<string, any>[]
  label?: string
  className?: string
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  filename = 'campus_report',
  data,
  label = 'Export CSV',
  className = ''
}) => {
  const { showToast } = useApp()
  const [downloaded, setDownloaded] = useState(false)

  const downloadCSV = () => {
    if (!data || data.length === 0) {
      showToast('No records available to export', 'warning')
      return
    }

    try {
      const headers = Object.keys(data[0])
      const csvRows = []
      csvRows.push(headers.join(','))

      for (const row of data) {
        const values = headers.map((header) => {
          const val = row[header]
          if (val === null || val === undefined) return '""'
          const escaped = String(val).replace(/"/g, '""')
          return `"${escaped}"`
        })
        csvRows.push(values.join(','))
      }

      const csvData = csvRows.join('\n')
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.setAttribute('href', url)
      link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setDownloaded(true)
      showToast(`Exported ${data.length} records to CSV successfully`, 'success')
      setTimeout(() => setDownloaded(false), 2500)
    } catch {
      showToast('Failed to generate export file', 'error')
    }
  }

  const triggerPrint = () => {
    window.print()
  }

  return (
    <div className="inline-flex items-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131B2E] p-0.5 shadow-xs">
      <button
        onClick={downloadCSV}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
          downloaded
            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
        } ${className}`}
        title="Download sanitized institutional records in CSV format"
      >
        {downloaded ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Exported</span>
          </>
        ) : (
          <>
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
            <span>{label}</span>
          </>
        )}
      </button>

      <button
        onClick={triggerPrint}
        className="px-2 py-1.5 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors border-l border-slate-200 dark:border-slate-800"
        title="Print View / PDF preview"
      >
        <Printer className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
