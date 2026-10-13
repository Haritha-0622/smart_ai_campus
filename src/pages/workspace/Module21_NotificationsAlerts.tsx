import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { Bell, AlertTriangle, CheckCircle, Info, ShieldAlert, Check } from 'lucide-react'

export const Module21_NotificationsAlerts: React.FC = () => {
  const { notifications, markNotificationsAsRead } = useApp()
  const [filter, setFilter] = useState<'all' | 'Critical' | 'Warning' | 'Info'>('all')

  const filtered = filter === 'all' ? notifications : notifications.filter((n) => n.priority === filter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              21. Notifications, Urgent Alerts & Escalations
            </h1>
            <Badge variant="indigo">Module 21</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time multi-channel incident center (Push, SMS, WhatsApp, and automated guardian voice calls).
          </p>
        </div>

        <button
          onClick={markNotificationsAsRead}
          className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 font-bold text-xs cursor-pointer"
        >
          Mark All As Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-semibold">
        {[
          { key: 'all', label: `All Alerts (${notifications.length})` },
          { key: 'Critical', label: 'Critical Incident Alerts' },
          { key: 'Warning', label: 'Operational Warnings' },
          { key: 'Info', label: 'Informational Broadcasts' }
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key as any)}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filter === t.key
                ? 'bg-indigo-600 text-white font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl bg-white dark:bg-[#131B2E] border flex items-start justify-between gap-4 text-xs shadow-xs ${
              item.priority === 'Critical'
                ? 'border-rose-300 dark:border-rose-900/60'
                : item.priority === 'Warning'
                ? 'border-amber-300 dark:border-amber-900/60'
                : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    item.priority === 'Critical'
                      ? 'rose'
                      : item.priority === 'Warning'
                      ? 'amber'
                      : 'indigo'
                  }
                >
                  {item.priority}
                </Badge>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</h4>
                <span className="text-[10px] text-slate-400 font-mono">({item.category})</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item.message}</p>
            </div>
            <span className="text-[11px] text-slate-400 shrink-0 font-mono">{item.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
