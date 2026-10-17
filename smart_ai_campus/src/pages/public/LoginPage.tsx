import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GraduationCap, Sparkles, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); navigate('/app/executive') }

  const demoRoles = [
    { label: 'Principal', email: 'principal@dpa.edu.in' },
    { label: 'Admin', email: 'admin.office@dpa.edu.in' },
    { label: 'Teacher', email: 'm.sundaram@dpa.edu.in' },
    { label: 'Finance', email: 'finance@dpa.edu.in' },
  ]

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B1120] flex items-center justify-center px-4 font-sans">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 justify-center mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#101A33] via-[#635BFF] to-[#16B8A6] flex items-center justify-center shadow-lg">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
          </Link>
          <h1 className="text-2xl font-extrabold text-[#101A33] dark:text-white">Sign in to SAC</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Smart AI Campus — Institutional Portal</p>
        </div>
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-6">
          <div className="mb-4 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/60">
            <p className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Demo Mode – Use any credentials to access</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Institutional Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.name@institution.edu.in"
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer">
              Sign In to Campus <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-4">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">Quick Demo Logins:</p>
            <div className="grid grid-cols-2 gap-2">
              {demoRoles.map((r) => (
                <button key={r.label} onClick={() => { setEmail(r.email); navigate('/app/executive') }}
                  className="py-1.5 px-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 cursor-pointer">
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> SOC 2 Type II Certified · DPDP Compliant
        </div>
        <p className="text-center text-xs text-slate-400 mt-3"><Link to="/" className="hover:text-indigo-600">← Back to product overview</Link></p>
      </div>
    </div>
  )
}
