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
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 w-80">
      {toasts.map((toast) => (
        <div key={toast.id} className={`flex items-start gap-3 bg-white dark:bg-[#131B2E] ${borderColors[toast.type]} rounded-xl shadow-lg p-3.5 border border-slate-200 dark:border-slate-800 animate-in slide-in-from-right`}>
          {icons[toast.type]}
          <p className="text-xs text-slate-700 dark:text-slate-200 flex-1 leading-relaxed">{toast.message}</p>
          <button onClick={() => dismissToast(toast.id)} className="text-slate-400 hover:text-slate-600 cursor-pointer shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
