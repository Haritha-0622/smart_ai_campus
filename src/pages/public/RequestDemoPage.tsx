import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { PublicNavbar } from '../../components/layout/PublicNavbar'
import { PublicFooter } from '../../components/layout/PublicFooter'
import { useApp } from '../../context/AppContext'
import { CheckCircle2, ArrowRight, Calendar, Sparkles } from 'lucide-react'

export const RequestDemoPage: React.FC = () => {
  const { showToast } = useApp()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    institutionName: 'St. Xavier International Academy',
    type: 'school',
    fullName: 'Dr. Ramesh Narayan',
    role: 'Principal',
    email: 'ramesh.n@stxavier.edu.in',
    phone: '+91 98401 99887',
    studentStrength: '1500-3000 students',
    requirements: 'RFID turnstiles, bus GPS, and statutory No-Due clearances'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    showToast('Demo request registered! Priority institutional slot reserved.', 'success')
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B1120] text-slate-800 dark:text-slate-100 flex flex-col font-sans">
      <PublicNavbar />

      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {submitted ? (
          <div className="p-8 sm:p-12 rounded-2xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 text-center shadow-lg space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Institutional Walkthrough Reserved
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{form.fullName}</strong>. Our enterprise solutions team has mapped your requirements for <strong>{form.institutionName}</strong>. A dedicated architecture specialist will contact you shortly.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <Link
                to="/app/executive"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md inline-flex items-center gap-2"
              >
                <span>Launch Interactive Prototype Immediately</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#131B2E] p-6 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Institutional Consultation
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#101A33] dark:text-white mt-1">
                Schedule a 30-Minute Executive Walkthrough
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                See how Smart AI Campus transforms child safety, parent trust, and 5-second executive decisions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Institution Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.institutionName}
                    onChange={(e) => setForm({ ...form, institutionName: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Institution Category *
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
                  >
                    <option value="school">K-12 School (CBSE / ICSE / State)</option>
                    <option value="college">College / Technical University (NAAC / AICTE)</option>
                    <option value="group">Multi-Institution Educational Trust</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name & Designation *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Enrolled Student Strength *
                  </label>
                  <select
                    value={form.studentStrength}
                    onChange={(e) => setForm({ ...form, studentStrength: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
                  >
                    <option value="500-1500 students">500 - 1,500 Students</option>
                    <option value="1500-3000 students">1,500 - 3,000 Students</option>
                    <option value="3000+ students">3,000+ Students (Large / Multi-Campus)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Official Work Email ID *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Direct Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Primary Campus Challenges & Goals
                </label>
                <textarea
                  rows={3}
                  value={form.requirements}
                  onChange={(e) => setForm({ ...form, requirements: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Link
                  to="/app/executive"
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                  Or jump directly into the interactive workspace &rarr;
                </Link>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  Submit & Confirm Walkthrough
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <PublicFooter />
    </div>
  )
}
