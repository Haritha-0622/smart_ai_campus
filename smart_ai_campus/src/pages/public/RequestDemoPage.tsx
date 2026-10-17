import React, { useState } from 'react'
import { PublicNavbar } from '../../components/layout/PublicNavbar'
import { PublicFooter } from '../../components/layout/PublicFooter'
import { CheckCircle2, Send } from 'lucide-react'

export const RequestDemoPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', institution: '', email: '', phone: '', type: 'School', size: '', message: '' })
  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }))
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true) }

  if (submitted) return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B1120] flex flex-col font-sans">
      <PublicNavbar />
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-8 h-8 text-emerald-500" /></div>
          <h1 className="text-2xl font-extrabold text-[#101A33] dark:text-white mb-2">Demo Requested!</h1>
          <p className="text-slate-500 dark:text-slate-400">Our campus success team will reach out within 24 hours to schedule your personalized walkthrough.</p>
        </div>
      </div>
      <PublicFooter />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#0B1120] flex flex-col font-sans">
      <PublicNavbar />
      <section className="flex-1 py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-[#101A33] dark:text-white">Request a Personalized Demo</h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">See Smart AI Campus tailored to your institution's specific workflow and scale.</p>
          </div>
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { label: 'Your Full Name *', field: 'name', placeholder: 'Dr. Kavitha Krishnamurthy' },
                { label: 'Institution Name *', field: 'institution', placeholder: 'Delhi Public Academy' },
                { label: 'Email Address *', field: 'email', placeholder: 'principal@institution.edu.in' },
                { label: 'Phone Number *', field: 'phone', placeholder: '+91 98XXX XXXXX' },
              ].map(({ label, field, placeholder }) => (
                <div key={field}>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">{label}</label>
                  <input value={form[field as keyof typeof form]} onChange={(e) => update(field, e.target.value)} placeholder={placeholder} required={label.includes('*')}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Institution Type</label>
                  <select value={form.type} onChange={(e) => update('type', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option>School</option><option>College</option><option>University</option><option>Education Group</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Student Strength</label>
                  <select value={form.size} onChange={(e) => update('size', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">Select range</option>
                    <option>Under 500</option><option>500 – 2,000</option><option>2,000 – 5,000</option><option>5,000+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Any specific requirements?</label>
                <textarea value={form.message} onChange={(e) => update('message', e.target.value)} rows={3} placeholder="e.g. Interested in RFID attendance and transport tracking..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer">
                <Send className="w-4 h-4" /> Submit Demo Request
              </button>
            </form>
          </div>
        </div>
      </section>
      <PublicFooter />
    </div>
  )
}
