import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sparkles, ArrowRight, Menu, X, Sun, Moon, GraduationCap } from 'lucide-react'
import { useApp } from '../../context/AppContext'

export const PublicNavbar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useApp()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { label: 'Overview', path: '/' },
    { label: 'For Schools', path: '/solutions/schools' },
    { label: 'For Colleges', path: '/solutions/colleges' },
    { label: 'All Modules', path: '/features' },
    { label: 'Pricing Plans', path: '/pricing' },
    { label: 'About Product', path: '/about' }
  ]

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-[#101A33]/85 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#101A33] via-[#635BFF] to-[#16B8A6] flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white font-sans">Smart AI Campus</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-600 text-white">SAC</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-none">Enterprise Campus OS</p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.path ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={toggleDarkMode} className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Link to="/login" className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            Sign In
          </Link>
          <Link to="/app/executive" className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-sm shadow-indigo-600/20 transition-colors">
            <Sparkles className="w-3.5 h-3.5" /> Live Demo <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#101A33] px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2.5 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium">
              {link.label}
            </Link>
          ))}
          <Link to="/app/executive" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2.5 mt-2 rounded-xl bg-indigo-600 text-white text-sm font-bold">
            <Sparkles className="w-4 h-4" /> Launch Live Demo
          </Link>
        </div>
      )}
    </header>
  )
}
