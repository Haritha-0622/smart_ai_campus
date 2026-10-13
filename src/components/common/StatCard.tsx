import React from 'react'
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  subtext?: string
  trend?: {
    value: string
    isPositive?: boolean
    label?: string
  }
  icon: LucideIcon
  status?: 'healthy' | 'warning' | 'critical' | 'neutral'
  actionLabel?: string
  onAction?: () => void
  badge?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtext,
  trend,
  icon: Icon,
  status = 'neutral',
  actionLabel,
  onAction,
  badge
}) => {
  const statusBorder = {
    healthy: 'border-l-4 border-l-emerald-500',
    warning: 'border-l-4 border-l-amber-500',
    critical: 'border-l-4 border-l-rose-500',
    neutral: 'border-l-4 border-l-indigo-500'
  }

  const iconBg = {
    healthy: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
    warning: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400',
    critical: 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400',
    neutral: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400'
  }

  return (
    <div
      className={`bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs hover:shadow-md transition-all ${statusBorder[status]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {title}
            </p>
            {badge && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                {badge}
              </span>
            )}
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1.5 tracking-tight">
            {value}
          </h3>
        </div>
        <div className={`p-2.5 rounded-lg ${iconBg[status]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(subtext || trend) && (
        <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
          {trend ? (
            <div className="flex items-center gap-1.5">
              <span
                className={`font-semibold ${
                  trend.isPositive
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {trend.value}
              </span>
              <span className="text-slate-500 dark:text-slate-400">{trend.label || 'vs last month'}</span>
            </div>
          ) : (
            <span className="text-slate-500 dark:text-slate-400 truncate">{subtext}</span>
          )}

          {actionLabel && onAction && (
            <button
              onClick={onAction}
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-medium hover:underline cursor-pointer"
            >
              {actionLabel} &rarr;
            </button>
          )}
        </div>
      )}
    </div>
  )
}
