import React from 'react'
import { useApp } from '../../context/AppContext'
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react'

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp()

  if (toasts.length === 0) return null

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-500 shrink-0" />
  }

  const borderColors = {
    success: 'border-l-4 border-l-emerald-500',
    warning: 'border-l-4 border-l-amber-500',
    error: 'border-l-4 border-l-rose-500',
    info: 'border-l-4 border-l-indigo-500'
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-3.5 flex items-start gap-3 transition-all animate-in slide-in-from-right-5 fade-in duration-200 ${borderColors[toast.type]}`}
        >
          {icons[toast.type]}
          <div className="flex-1 text-xs font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
            {toast.message}
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
