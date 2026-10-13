import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { ExportButton } from '../../components/common/ExportButton'
import { DownloadCloud, FileSpreadsheet, Calendar, Filter, Printer } from 'lucide-react'

export const Module23_ReportsExports: React.FC = () => {
  const { students, attendance, purchaseRequests, exams, outpasses } = useApp()
  const [dateRange, setDateRange] = useState('Current Term (Term 2)')

  const reportPresets = [
    {
      title: 'Student Enrollment & Smart ID Master Register',
      desc: 'Complete student directory with registration IDs, RFID card numbers, and guardian details.',
      data: students,
      filename: 'student_enrollment_master'
    },
    {
      title: 'Automated RFID Gate & Bus Attendance Telemetry',
      desc: 'Millisecond attendance punches, device reader IDs, and flagged exceptions.',
      data: attendance,
      filename: 'rfid_attendance_telemetry'
    },
    {
      title: 'Central Store Purchase Requisitions & Smart POs',
      desc: 'Replenishment requests, item codes, estimated outlays, and maker-checker status.',
      data: purchaseRequests,
      filename: 'procurement_purchase_orders'
    },
    {
      title: 'Examination Schedules & Faculty Invigilation Master',
      desc: 'Exam dates, halls, primary & backup invigilators, and confirmation states.',
      data: exams,
      filename: 'examination_invigilation_master'
    },
    {
      title: 'Residential Hostel Digital Gatepass Audit Trail',
      desc: 'Hostel outpasses, parent SMS authorizations, and security check-in/out logs.',
      data: outpasses,
      filename: 'hostel_gatepass_audit'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              23. Comprehensive Institutional Reports & Data Exports
            </h1>
            <Badge variant="indigo">Module 23</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Official operational reports with date filters, live tabular preview, and functional CSV downloads.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-semibold"
          >
            <option>Today Only</option>
            <option>Current Week</option>
            <option>Current Term (Term 2)</option>
            <option>Entire Academic Year 2025-26</option>
          </select>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {reportPresets.map((rep, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between text-xs space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[11px] text-slate-400 font-bold">REP-{idx + 1}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                  {rep.data.length} Total Records
                </span>
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">{rep.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{rep.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">Format: RFC 4180 CSV / Print</span>
              <ExportButton filename={rep.filename} data={rep.data} label="Download CSV" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
