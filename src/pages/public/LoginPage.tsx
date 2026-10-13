import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { PublicNavbar } from '../../components/layout/PublicNavbar'
import { PublicFooter } from '../../components/layout/PublicFooter'
import { useApp } from '../../context/AppContext'
import { USER_PERSONAS } from '../../data/tenants'
import { UserRole } from '../../types'
import { GraduationCap, ArrowRight, ShieldCheck, Check } from 'lucide-react'

export const LoginPage: React.FC = () => {
  const { setCurrentRole, showToast } = useApp()
  const navigate = useNavigate()
  const [email, setEmail] = useState('principal@dpa.edu.in')
  const [password, setPassword] = useState('••••••••••••')

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault()
    showToast('Authenticated via Institutional SSO Simulation', 'success')
    navigate('/app/executive')
  }

  const handleQuickRoleSelect = (role: UserRole, name: string) => {
    setCurrentRole(role)
    showToast(`Logged in as ${name} (${role.replace('_', ' ')})`, 'success')
    navigate('/app/executive')
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B1120] text-slate-800 dark:text-slate-100 flex flex-col font-sans">
      <PublicNavbar />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
        {/* Top Header */}
        <div className="text-center max-w-xl mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-600 text-white shadow-lg mb-3">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#101A33] dark:text-white">
            Smart AI Campus Access Portal
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Enterprise Single Sign-On & 15 Interactive Demo Roles
          </p>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Standard Mock Form (Left 5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#131B2E] p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Institutional SSO Login
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Sign in using your institutional email ID (@dpa.edu.in or @aits.edu.in)
            </p>

            <form onSubmit={handleStandardLogin} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Institutional Email ID
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Security Password / Passkey
                  </label>
                  <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline text-[11px]">
                    Forgot?
                  </a>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" defaultChecked className="rounded" />
                <label htmlFor="remember" className="text-slate-600 dark:text-slate-400 text-xs">
                  Remember this device for 30 days
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Sign In to Platform &rarr;
              </button>

              <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
                <span>Protected by SAML 2.0 & Role-Based Access Control</span>
              </div>
            </form>
          </div>

          {/* Quick Demo Personas Grid (Right 7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#131B2E] p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                1-Click Quick Demo Personas (All 15 Roles)
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                Interactive Testing
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
              Click any persona below to immediately log in and explore their customized dashboard and permitted modules.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[440px] overflow-y-auto pr-1">
              {USER_PERSONAS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleQuickRoleSelect(p.role, p.name)}
                  className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 text-left transition-all cursor-pointer group"
                >
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                      {p.name}
                    </p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 capitalize truncate">
                      {p.role.replace('_', ' ')} &bull; {p.department}
                    </p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-600 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  )
}
