import React from 'react'
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  subtext?: string
  trend?: { value: string; isPositive?: boolean; label?: string }
  icon: LucideIcon | React.ReactNode
  status?: 'healthy' | 'warning' | 'critical' | 'neutral'
  actionLabel?: string
  onAction?: () => void
  badge?: string
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, subtext, trend, icon, status = 'neutral', actionLabel, onAction, badge }) => {
  const statusBorder = { healthy: 'border-l-4 border-l-emerald-500', warning: 'border-l-4 border-l-amber-500', critical: 'border-l-4 border-l-rose-500', neutral: 'border-l-4 border-l-indigo-500' }
  const iconBg = {
    healthy: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
    warning: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400',
    critical: 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400',
    neutral: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400'
  }

  // Support both LucideIcon component reference and pre-rendered React.ReactNode
  const iconContent = React.isValidElement(icon)
    ? icon
    : (() => { const Icon = icon as LucideIcon; return <Icon className="w-4.5 h-4.5" /> })()

  return (
    <div className={`bg-white dark:bg-[#131B2E] rounded-xl p-4 shadow-xs border border-slate-200 dark:border-slate-800 ${statusBorder[status]} flex flex-col gap-3`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</p>
          {badge && <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded font-semibold">{badge}</span>}
        </div>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconBg[status]}`}>
          {iconContent}
        </div>
      </div>
      <div>
        <p className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">{value}</p>
        {subtext && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtext}</p>}
      </div>
      {trend && (
        <div className="flex items-center gap-1">
          {trend.isPositive ? <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> : <TrendingDown className="w-3.5 h-3.5 text-rose-500" />}
          <span className={`text-xs font-semibold ${trend.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{trend.value}</span>
          {trend.label && <span className="text-xs text-slate-400">{trend.label}</span>}
        </div>
      )}
      {actionLabel && onAction && (
        <button onClick={onAction} className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline text-left cursor-pointer">{actionLabel} →</button>
      )}
    </div>
  )
}
