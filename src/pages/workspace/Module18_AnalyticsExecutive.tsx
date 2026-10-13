import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { ExportButton } from '../../components/common/ExportButton'
import { BarChart3, TrendingUp, Users, Calendar, Filter, Download } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts'

export const Module18_AnalyticsExecutive: React.FC = () => {
  const { institution } = useApp()
  const [termFilter, setTermFilter] = useState('AY 2025-2026')

  const gradeDistribution = [
    { grade: 'A1 (91-100%)', count: 480, fill: '#10B981' },
    { grade: 'A2 (81-90%)', count: 820, fill: '#635BFF' },
    { grade: 'B1 (71-80%)', count: 740, fill: '#0EA5E9' },
    { grade: 'B2 (61-70%)', count: 510, fill: '#F59E0B' },
    { grade: 'C1 & Below', count: 290, fill: '#EF4444' }
  ]

  const enrollmentGrowth = [
    { year: '2022-23', students: 2150, faculty: 110 },
    { year: '2023-24', students: 2420, faculty: 128 },
    { year: '2024-25', students: 2680, faculty: 148 },
    { year: '2025-26', students: 2840, faculty: 168 }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              18. Institutional Analytics & Decision Dashboards
            </h1>
            <Badge variant="indigo">Module 18</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Five-second read visual business intelligence across academic yield, faculty workload, and demographic cohorts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={termFilter}
            onChange={(e) => setTermFilter(e.target.value)}
            className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-semibold"
          >
            <option>AY 2025-2026</option>
            <option>AY 2024-2025</option>
          </select>
          <ExportButton filename="executive_analytics_summary" data={gradeDistribution} />
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Grade Distribution */}
        <div className="lg:col-span-6 bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
            Institutional Academic Grade Bell Curve
          </h3>
          <p className="text-xs text-slate-500 mb-4">Board examination performance across all streams</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gradeDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="grade" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" name="Enrolled Candidates" radius={[4, 4, 0, 0]}>
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Enrollment & Faculty Ratio */}
        <div className="lg:col-span-6 bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">
            Multi-Year Student & Faculty Growth
          </h3>
          <p className="text-xs text-slate-500 mb-4">Healthy student-to-teacher ratio maintained at ~17:1</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={enrollmentGrowth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="students" name="Student Intake" stroke="#635BFF" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="faculty" name="Approved Faculty" stroke="#16B8A6" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
