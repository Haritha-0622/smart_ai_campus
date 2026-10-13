import React, { useState } from 'react'
import { Modal } from '../common/Modal'
import { useApp } from '../../context/AppContext'
import { Send, Sparkles, CheckCircle2 } from 'lucide-react'

interface CircularComposerModalProps {
  isOpen: boolean
  onClose: () => void
}

export const CircularComposerModal: React.FC<CircularComposerModalProps> = ({
  isOpen,
  onClose
}) => {
  const { addCircular, persona, institution, showToast } = useApp()

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<'Academic' | 'Administrative' | 'Events' | 'Emergency'>('Academic')
  const [targetAudience, setTargetAudience] = useState<'All Campus' | 'Teachers & Staff' | 'Parents Only' | 'Senior Students'>('All Campus')
  const [content, setContent] = useState('')

  const handleAIDraft = () => {
    setTitle('Scheduled Mid-Term Practical Laboratory Sessions & Reporting Protocols')
    setCategory('Academic')
    setContent(
      `Dear Students and Respected Parents,\n\nThis is to notify that the laboratory practical evaluation for the ongoing term will commence from Monday next week. All students are advised to ensure their scientific journals and observations are verified by the respective department heads prior to the exam hall reporting time.\n\nAutomated attendance will be recorded via RFID laboratory turnstiles at 08:30 AM sharp.\n\nOffice of Academic Coordination,\n${institution.name}`
    )
    showToast('AI Draft generated with formal institutional phrasing!', 'info')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title) return

    addCircular({
      title,
      category,
      targetAudience,
      author: `${persona.name} (${persona.title})`,
      publishedDate: 'Today',
      status: 'Published',
      readPercentage: 100,
      acknowledgedCount: 0,
      totalRecipients: institution.studentCount
    })
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Compose Official Circular & Broadcast Announcement"
      subtitle="Publish cross-campus notices with instant push, SMS & read receipt analytics"
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-700 dark:text-slate-300">Notice Configuration</span>
          <button
            type="button"
            onClick={handleAIDraft}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 font-semibold cursor-pointer transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            AI Auto-Draft Announcement
          </button>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Circular Title / Subject *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Schedule of Annual Athletic Meet & Bus Timings"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
            >
              <option value="Academic">Academic & Exams</option>
              <option value="Administrative">Administrative & Fees</option>
              <option value="Events">Campus Events & Sports</option>
              <option value="Emergency">Emergency Weather / Holiday</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Audience
            </label>
            <select
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value as any)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white"
            >
              <option value="All Campus">All Campus (Staff, Students & Parents)</option>
              <option value="Parents Only">Parents Only (Dedicated Push/SMS)</option>
              <option value="Teachers & Staff">Faculty & Administrative Staff Only</option>
              <option value="Senior Students">Senior Classes & Batches</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Notice Body Content
          </label>
          <textarea
            rows={5}
            placeholder="Write official circular text or click 'AI Auto-Draft' above..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-slate-900 dark:text-white font-sans leading-relaxed"
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center gap-1.5 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            Sign & Publish Broadcast
          </button>
        </div>
      </form>
    </Modal>
  )
}
