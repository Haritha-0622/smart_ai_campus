import React, { useState } from 'react'
import { Modal } from '../common/Modal'
import { useApp } from '../../context/AppContext'
import { FileText, Send, Users, AlertCircle } from 'lucide-react'

interface Props { isOpen: boolean; onClose: () => void }

export const CircularComposerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { addCircular, institution } = useApp()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [priority, setPriority] = useState<'Routine' | 'Important' | 'Urgent'>('Routine')
  const [audience, setAudience] = useState<string[]>(['students', 'parents'])

  const audienceOptions = ['students', 'parents', 'teachers', 'staff', 'management']

  const toggleAudience = (a: string) => setAudience((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return
    addCircular({ title, content, audience, issuedBy: `Administration, ${institution.name}`, issuedDate: new Date().toISOString().split('T')[0], priority })
    setTitle(''); setContent(''); setPriority('Routine'); setAudience(['students', 'parents'])
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Compose Official Circular" subtitle="Draft and publish a campus-wide communication" maxWidth="2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Circular Title *</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Term-End Examination Schedule – October 2025" required
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Circular Content *</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={5} required placeholder="Type the full circular content here..."
            className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Priority Level</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value as typeof priority)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Routine</option><option>Important</option><option>Urgent</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Audience Groups</label>
            <div className="flex flex-wrap gap-1.5">
              {audienceOptions.map((a) => (
                <button key={a} type="button" onClick={() => toggleAudience(a)}
                  className={`text-xs px-2 py-1 rounded-lg capitalize font-medium transition-colors cursor-pointer ${audience.includes(a) ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}>{a}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <button type="button" onClick={onClose} className="flex-1 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 cursor-pointer">Cancel</button>
          <button type="submit" className="flex-1 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors">
            <Send className="w-4 h-4" /> Publish Circular
          </button>
        </div>
      </form>
    </Modal>
  )
}
