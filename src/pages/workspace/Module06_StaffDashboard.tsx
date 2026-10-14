import React, { useState, useEffect } from 'react'
import { Badge } from '../../components/common/Badge'
import {
  UserCheck,
  CheckCircle2,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  FileCheck,
  GraduationCap,
  FileText,
  UserPlus
} from 'lucide-react'
import {
  CandidatePerson,
  StaffDossier,
  InductionSession,
  StaffTrainingRecord,
  InstitutionalHrTask,
  StaffDocumentRecord
} from '../../types'
import { staffBackendService } from '../../services/staffBackendService'

export const Module06_StaffDashboard: React.FC = () => {
  // 5 client requirement tabs only
  const [activeTab, setActiveTab] = useState<'candidates' | 'documents' | 'induction' | 'training' | 'hr-tasks'>('candidates')

  // Live state from backend service
  const [candidates, setCandidates] = useState<CandidatePerson[]>([])
  const [dossiers, setDossiers] = useState<StaffDossier[]>([])
  const [inductionSessions, setInductionSessions] = useState<InductionSession[]>([])
  const [trainingRecords, setTrainingRecords] = useState<StaffTrainingRecord[]>([])
  const [hrTasks, setHrTasks] = useState<InstitutionalHrTask[]>([])

  // Simple feedback message
  const [feedback, setFeedback] = useState<string | null>(null)

  // Lightweight modals
  const [isAddCandidateOpen, setIsAddCandidateOpen] = useState(false)
  const [isScheduleInterviewOpen, setIsScheduleInterviewOpen] = useState<CandidatePerson | null>(null)
  const [selectedDossier, setSelectedDossier] = useState<StaffDossier | null>(null)
  const [isScheduleInductionOpen, setIsScheduleInductionOpen] = useState(false)
  const [isAssignTrainingOpen, setIsAssignTrainingOpen] = useState(false)
  const [isCreateHrTaskOpen, setIsCreateHrTaskOpen] = useState(false)

  // Form states
  const [candidateForm, setCandidateForm] = useState({
    name: '',
    roleApplied: '',
    department: 'Computer Science & AI',
    priority: 'High' as CandidatePerson['priority'],
    stage: 'Interview Scheduled' as CandidatePerson['stage'],
    expectedJoiningDate: '2026-11-01'
  })

  const [interviewDate, setInterviewDate] = useState('2026-10-25')
  const [interviewTime, setInterviewTime] = useState('11:00 AM')

  const [inductionForm, setInductionForm] = useState({
    title: '',
    date: '2026-10-30',
    time: '10:00 AM - 12:30 PM',
    venue: 'Sir C.V. Raman Auditorium',
    facilitator: 'Principal & HR Lead',
    targetCohort: 'New Joiners'
  })

  const [trainingForm, setTrainingForm] = useState({
    staffName: 'Dr. Aris Thorne',
    department: 'Computer Science & AI',
    moduleTitle: 'Statutory POCSO Act & Campus Child Protection Framework',
    category: 'Mandatory Child Protection (POCSO)' as StaffTrainingRecord['category'],
    dueDate: '2026-11-30'
  })

  const [hrTaskForm, setHrTaskForm] = useState({
    staffName: 'Pooja Anand, M.Pharm',
    department: 'Department of Chemistry',
    designation: 'Assistant Professor',
    type: 'Probation Confirmation' as InstitutionalHrTask['type'],
    priority: 'High' as InstitutionalHrTask['priority'],
    requestedDetails: '',
    slaDeadline: '2026-10-25'
  })

  useEffect(() => {
    loadData()
  }, [])

  const notify = (msg: string) => {
    setFeedback(msg)
    setTimeout(() => setFeedback(null), 3500)
  }

  const loadData = async () => {
    const [c, d, ind, trn, hr] = await Promise.all([
      staffBackendService.getCandidates(),
      staffBackendService.getDossiers(),
      staffBackendService.getInductionSessions(),
      staffBackendService.getTrainingRecords(),
      staffBackendService.getHrTasks()
    ])
    setCandidates(c)
    setDossiers(d)
    setInductionSessions(ind)
    setTrainingRecords(trn)
    setHrTasks(hr)
  }

  // 1. Candidate Handlers
  const handleToggleTask = async (candidateId: string, taskId: string) => {
    await staffBackendService.toggleOnboardingTask(candidateId, taskId)
    const updated = await staffBackendService.getCandidates()
    setCandidates(updated)
    notify('Onboarding task updated')
  }

  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!candidateForm.name || !candidateForm.roleApplied) return
    await staffBackendService.addCandidate({
      name: candidateForm.name,
      email: `${candidateForm.name.toLowerCase().replace(/[^a-z]/g, '')}@campus.edu`,
      phone: '+91 98765 43210',
      roleApplied: candidateForm.roleApplied,
      department: candidateForm.department,
      experienceYears: 6,
      priority: candidateForm.priority,
      stage: candidateForm.stage,
      expectedJoiningDate: candidateForm.expectedJoiningDate,
      status: 'Active',
      onboardingTasks: [
        { id: `t1-${Date.now()}`, title: 'Signed Appointment Order', completed: false, dueDate: '2026-11-05', category: 'HR Formalities' },
        { id: `t2-${Date.now()}`, title: 'IT Credentials & Workstation Requisition', completed: false, dueDate: '2026-11-10', category: 'IT Setup' },
        { id: `t3-${Date.now()}`, title: 'Biometric Access & ID Card Printing', completed: false, dueDate: '2026-11-15', category: 'Campus Security' }
      ]
    })
    setIsAddCandidateOpen(false)
    setCandidateForm({
      name: '',
      roleApplied: '',
      department: 'Computer Science & AI',
      priority: 'High',
      stage: 'Interview Scheduled',
      expectedJoiningDate: '2026-11-01'
    })
    await loadData()
    notify('Candidate added successfully')
  }

  const handleSaveInterview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isScheduleInterviewOpen) return
    await staffBackendService.scheduleInterview(
      isScheduleInterviewOpen.id,
      interviewDate,
      interviewTime,
      ['Dean Academics', 'HOD']
    )
    setIsScheduleInterviewOpen(null)
    await loadData()
    notify('Interview scheduled')
  }

  // 2. Document Handlers
  const handleValidateDoc = async (dossierId: string, docId: string) => {
    const updated = await staffBackendService.validateDocument(dossierId, docId, 'HR Officer')
    await loadData()
    setSelectedDossier(updated)
    notify('Document verified')
  }

  const handleRejectDoc = async (dossierId: string, docId: string) => {
    const reason = prompt('Reason for rejection:', 'Unclear copy. Please provide original stamped certificate.')
    if (!reason) return
    const updated = await staffBackendService.rejectDocument(dossierId, docId, reason)
    await loadData()
    setSelectedDossier(updated)
    notify('Document rejected and re-upload requested')
  }

  // 3. Induction Handlers
  const handleToggleInduction = async (sessionId: string, staffId: string) => {
    await staffBackendService.toggleInductionAttendance(sessionId, staffId)
    await loadData()
    notify('Attendance marked')
  }

  const handleAddInduction = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inductionForm.title) return
    await staffBackendService.createInductionSession({
      title: inductionForm.title,
      date: inductionForm.date,
      time: inductionForm.time,
      venue: inductionForm.venue,
      facilitator: inductionForm.facilitator,
      targetCohort: inductionForm.targetCohort,
      description: 'Orientation and institutional compliance session.',
      status: 'Upcoming',
      attendees: candidates.slice(0, 3).map((c) => ({
        staffId: c.id,
        staffName: c.name,
        department: c.department,
        role: c.roleApplied,
        attended: false
      }))
    })
    setIsScheduleInductionOpen(false)
    setInductionForm({
      title: '',
      date: '2026-10-30',
      time: '10:00 AM - 12:30 PM',
      venue: 'Sir C.V. Raman Auditorium',
      facilitator: 'Principal & HR Lead',
      targetCohort: 'New Joiners'
    })
    await loadData()
    notify('Induction session scheduled')
  }

  // 4. Training Handlers
  const handleUpdateProgress = async (id: string, newProgress: number) => {
    await staffBackendService.updateTrainingProgress(id, newProgress)
    await loadData()
    notify(newProgress === 100 ? 'Training 100% completed' : `Progress updated to ${newProgress}%`)
  }

  const handleAssignTraining = async (e: React.FormEvent) => {
    e.preventDefault()
    await staffBackendService.assignTraining({
      moduleCode: 'TRN-2026',
      title: trainingForm.moduleTitle,
      category: trainingForm.category,
      assignedToStaffId: 'stf-custom',
      staffName: trainingForm.staffName,
      department: trainingForm.department,
      progress: 0,
      dueDate: trainingForm.dueDate,
      status: 'Not Started'
    })
    setIsAssignTrainingOpen(false)
    await loadData()
    notify('Training module assigned')
  }

  // 5. HR Task Handlers
  const handleApproveHrTask = async (taskId: string) => {
    await staffBackendService.approveHrTask(taskId, 'Campus HR Director', 'Approved')
    await loadData()
    notify('HR Task approved')
  }

  const handleRejectHrTask = async (taskId: string) => {
    const reason = prompt('Reason for rejection:', 'Budget cap reached.')
    if (!reason) return
    await staffBackendService.rejectHrTask(taskId, 'Campus HR Director', reason)
    await loadData()
    notify('HR Task rejected')
  }

  const handleCreateHrTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!hrTaskForm.requestedDetails) return
    await staffBackendService.createHrTask({
      type: hrTaskForm.type,
      staffId: 'stf-custom',
      staffName: hrTaskForm.staffName,
      department: hrTaskForm.department,
      designation: hrTaskForm.designation,
      priority: hrTaskForm.priority,
      submittedDate: new Date().toISOString().split('T')[0],
      slaDeadline: hrTaskForm.slaDeadline,
      status: 'Pending HR Review',
      requestedDetails: hrTaskForm.requestedDetails
    })
    setIsCreateHrTaskOpen(false)
    setHrTaskForm({
      staffName: 'Pooja Anand, M.Pharm',
      department: 'Department of Chemistry',
      designation: 'Assistant Professor',
      type: 'Probation Confirmation',
      priority: 'High',
      requestedDetails: '',
      slaDeadline: '2026-10-25'
    })
    await loadData()
    notify('HR Task submitted')
  }

  return (
    <div className="space-y-5">
      {/* Decent, Clean Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Staff Dashboard</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage candidates, document validation, induction, training, and HR approvals.
          </p>
        </div>

        {feedback && (
          <div className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs rounded-lg font-medium">
            {feedback}
          </div>
        )}
      </div>

      {/* 5 Clear Tabs matching the 5 requirements exactly */}
      <div className="flex border-b border-slate-200 gap-6 text-xs font-semibold text-slate-600 bg-white px-5 rounded-t-xl">
        <button
          onClick={() => setActiveTab('candidates')}
          className={`py-3.5 border-b-2 transition-all ${
            activeTab === 'candidates'
              ? 'border-indigo-600 text-indigo-600 font-bold'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          1. Candidates & Onboarding ({candidates.length})
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`py-3.5 border-b-2 transition-all ${
            activeTab === 'documents'
              ? 'border-indigo-600 text-indigo-600 font-bold'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          2. Document Validation ({dossiers.length})
        </button>

        <button
          onClick={() => setActiveTab('induction')}
          className={`py-3.5 border-b-2 transition-all ${
            activeTab === 'induction'
              ? 'border-indigo-600 text-indigo-600 font-bold'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          3. Induction Sessions ({inductionSessions.length})
        </button>

        <button
          onClick={() => setActiveTab('training')}
          className={`py-3.5 border-b-2 transition-all ${
            activeTab === 'training'
              ? 'border-indigo-600 text-indigo-600 font-bold'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          4. Training Tracking ({trainingRecords.length})
        </button>

        <button
          onClick={() => setActiveTab('hr-tasks')}
          className={`py-3.5 border-b-2 transition-all ${
            activeTab === 'hr-tasks'
              ? 'border-indigo-600 text-indigo-600 font-bold'
              : 'border-transparent hover:text-slate-900'
          }`}
        >
          5. Institutional HR Tasks ({hrTasks.filter((t) => t.status === 'Pending HR Review').length} Pending)
        </button>
      </div>

      {/* ================= 1. PRIORITIZED CANDIDATES & ONBOARDING ================= */}
      {activeTab === 'candidates' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              Prioritized candidates for interview and onboarding tasks.
            </span>
            <button
              onClick={() => setIsAddCandidateOpen(true)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <UserPlus className="w-3.5 h-3.5" />
              + Add Candidate
            </button>
          </div>

          <div className="space-y-3">
            {candidates.map((cand) => (
              <div key={cand.id} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm">{cand.name}</h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          cand.priority === 'Expedited'
                            ? 'bg-rose-100 text-rose-800'
                            : cand.priority === 'High'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {cand.priority} Priority
                      </span>
                      <span className="text-[11px] text-slate-500 font-medium">&bull; {cand.stage}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {cand.roleApplied} &bull; {cand.department}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsScheduleInterviewOpen(cand)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg flex items-center gap-1"
                    >
                      <Calendar className="w-3 h-3" />
                      {cand.interviewDate ? `${cand.interviewDate} (${cand.interviewTime})` : 'Schedule Interview'}
                    </button>
                  </div>
                </div>

                {/* Clean Onboarding Checklist */}
                <div className="bg-slate-50 rounded-lg p-3 space-y-2 border border-slate-100">
                  <div className="text-[11px] font-bold text-slate-700 flex justify-between">
                    <span>Onboarding Tasks:</span>
                    <span className="text-slate-500 font-normal">
                      {cand.onboardingTasks.filter((t) => t.completed).length} of {cand.onboardingTasks.length} done
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                    {cand.onboardingTasks.map((task) => (
                      <button
                        key={task.id}
                        onClick={() => handleToggleTask(cand.id, task.id)}
                        className={`p-2 rounded-lg border text-left flex items-start gap-2 text-xs transition-colors ${
                          task.completed
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="mt-0.5">
                          {task.completed ? (
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <div className="w-3.5 h-3.5 rounded border border-slate-300" />
                          )}
                        </div>
                        <span className={`text-[11px] leading-tight ${task.completed ? 'line-through text-slate-500' : ''}`}>
                          {task.title}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 2. DOCUMENT COLLECTION & VALIDATION ================= */}
      {activeTab === 'documents' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              Document collection, authenticity review, and verification.
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Staff Member</th>
                  <th className="py-3 px-4">Emp No</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Compliance Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dossiers.map((dossier) => (
                  <tr key={dossier.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">{dossier.staffName}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{dossier.empNo}</td>
                    <td className="py-3 px-4 text-slate-600">{dossier.department}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800 mr-2">{dossier.complianceScore}% Verified</span>
                      <span className="text-[10px] text-slate-400">
                        ({dossier.documents.filter((d) => d.status === 'Verified').length}/{dossier.documents.length} docs)
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedDossier(dossier)}
                        className="text-indigo-600 hover:text-indigo-800 font-bold"
                      >
                        Inspect & Validate &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= 3. INDUCTION SESSIONS ================= */}
      {activeTab === 'induction' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              Orientation, code of conduct, and institutional induction sessions.
            </span>
            <button
              onClick={() => setIsScheduleInductionOpen(true)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              + Schedule Session
            </button>
          </div>

          <div className="space-y-3">
            {inductionSessions.map((session) => (
              <div key={session.id} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{session.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {session.date} at {session.time} &bull; {session.venue} &bull; Facilitator: {session.facilitator}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded self-start ${
                      session.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-indigo-50 text-indigo-700'
                    }`}
                  >
                    {session.status}
                  </span>
                </div>

                <div className="bg-slate-50 rounded-lg p-3 space-y-2 border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-700 block">Inductees Attendance:</span>
                  <div className="flex flex-wrap gap-2">
                    {session.attendees.map((attendee) => (
                      <button
                        key={attendee.staffId}
                        onClick={() => handleToggleInduction(session.id, attendee.staffId)}
                        className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-2 transition-colors ${
                          attendee.attended
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-semibold'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {attendee.attended ? (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded border border-slate-300" />
                        )}
                        <span>{attendee.staffName}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 4. TRAINING ASSIGNMENT & TRACKING ================= */}
      {activeTab === 'training' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              Training assignment and completion tracking.
            </span>
            <button
              onClick={() => setIsAssignTrainingOpen(true)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              + Assign Training
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Staff Member</th>
                  <th className="py-3 px-4">Training Module</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Progress</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {trainingRecords.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {t.staffName}
                      <span className="block text-[11px] text-slate-500 font-normal">{t.department}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      {t.title}
                      <span className="block text-[10px] text-slate-400">{t.category}</span>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{t.dueDate}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{t.progress}%</span>
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${t.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-600'}`}
                            style={{ width: `${t.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {t.progress < 100 ? (
                        <button
                          onClick={() => handleUpdateProgress(t.id, Math.min(100, t.progress + 25))}
                          className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded text-[11px]"
                        >
                          +25% Progress
                        </button>
                      ) : (
                        <span className="text-emerald-700 font-bold text-[11px]">Certified</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= 5. INSTITUTIONAL HR TASKS & APPROVALS ================= */}
      {activeTab === 'hr-tasks' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              Institutional HR tasks, confirmations, and approvals.
            </span>
            <button
              onClick={() => setIsCreateHrTaskOpen(true)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              + Raise Task
            </button>
          </div>

          <div className="space-y-3">
            {hrTasks.map((task) => (
              <div key={task.id} className="bg-white border border-slate-200 rounded-xl p-4 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{task.type}</h4>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          task.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : task.status === 'Rejected'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      For: <span className="font-semibold">{task.staffName}</span> ({task.designation}, {task.department})
                    </p>
                  </div>

                  <span className="text-[11px] text-slate-500">Target SLA: {task.slaDeadline}</span>
                </div>

                <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {task.requestedDetails}
                </p>

                {task.status === 'Pending HR Review' && (
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => handleRejectHrTask(task.id)}
                      className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs rounded-lg"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApproveHrTask(task.id)}
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg"
                    >
                      Approve
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= LIGHTWEIGHT MODAL: DOSSIER INSPECTOR ================= */}
      {selectedDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="bg-white rounded-xl max-w-xl w-full p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Document Validation: {selectedDossier.staffName}
                </h3>
                <p className="text-xs text-slate-500">{selectedDossier.empNo} &bull; {selectedDossier.department}</p>
              </div>
              <button onClick={() => setSelectedDossier(null)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              {selectedDossier.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-2.5 border border-slate-200 rounded-lg flex items-center justify-between text-xs bg-slate-50"
                >
                  <div>
                    <span className="font-semibold text-slate-900 block">{doc.type}</span>
                    <span
                      className={`text-[10px] font-bold ${
                        doc.status === 'Verified'
                          ? 'text-emerald-700'
                          : doc.status === 'Rejected'
                          ? 'text-rose-700'
                          : 'text-amber-700'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {doc.status !== 'Verified' && (
                      <button
                        onClick={() => handleValidateDoc(selectedDossier.id, doc.id)}
                        className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium text-[11px]"
                      >
                        Verify
                      </button>
                    )}
                    {doc.status !== 'Rejected' && (
                      <button
                        onClick={() => handleRejectDoc(selectedDossier.id, doc.id)}
                        className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded font-medium text-[11px]"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-200">
              <button
                onClick={() => setSelectedDossier(null)}
                className="px-4 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= LIGHTWEIGHT MODAL: ADD CANDIDATE ================= */}
      {isAddCandidateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 space-y-3 shadow-xl text-xs">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-slate-900 text-sm">Add Candidate</h3>
              <button onClick={() => setIsAddCandidateOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCandidate} className="space-y-3">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Malini Sengupta"
                  value={candidateForm.name}
                  onChange={(e) => setCandidateForm({ ...candidateForm, name: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Role Applied</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Senior Secondary Lecturer"
                  value={candidateForm.roleApplied}
                  onChange={(e) => setCandidateForm({ ...candidateForm, roleApplied: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Priority</label>
                  <select
                    value={candidateForm.priority}
                    onChange={(e) => setCandidateForm({ ...candidateForm, priority: e.target.value as CandidatePerson['priority'] })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  >
                    <option value="Expedited">Expedited</option>
                    <option value="High">High</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Stage</label>
                  <select
                    value={candidateForm.stage}
                    onChange={(e) => setCandidateForm({ ...candidateForm, stage: e.target.value as CandidatePerson['stage'] })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  >
                    <option value="Interview Scheduled">Interview Scheduled</option>
                    <option value="Panel Technical">Panel Technical</option>
                    <option value="Offer Extended">Offer Extended</option>
                    <option value="Onboarding Active">Onboarding Active</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsAddCandidateOpen(false)}
                  className="px-3 py-1.5 bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg font-semibold">
                  Add Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= LIGHTWEIGHT MODAL: SCHEDULE INTERVIEW ================= */}
      {isScheduleInterviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 space-y-3 shadow-xl text-xs">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-slate-900 text-sm">Schedule Interview: {isScheduleInterviewOpen.name}</h3>
              <button onClick={() => setIsScheduleInterviewOpen(null)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveInterview} className="space-y-3">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Date</label>
                <input
                  type="date"
                  value={interviewDate}
                  onChange={(e) => setInterviewDate(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Time</label>
                <input
                  type="text"
                  value={interviewTime}
                  onChange={(e) => setInterviewTime(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsScheduleInterviewOpen(null)}
                  className="px-3 py-1.5 bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg font-semibold">
                  Save Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= LIGHTWEIGHT MODAL: SCHEDULE INDUCTION ================= */}
      {isScheduleInductionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 space-y-3 shadow-xl text-xs">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-slate-900 text-sm">Schedule Induction Session</h3>
              <button onClick={() => setIsScheduleInductionOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddInduction} className="space-y-3">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Session Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. POCSO Child Protection & Campus Conduct"
                  value={inductionForm.title}
                  onChange={(e) => setInductionForm({ ...inductionForm, title: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Date</label>
                  <input
                    type="date"
                    value={inductionForm.date}
                    onChange={(e) => setInductionForm({ ...inductionForm, date: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Time</label>
                  <input
                    type="text"
                    value={inductionForm.time}
                    onChange={(e) => setInductionForm({ ...inductionForm, time: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Venue</label>
                <input
                  type="text"
                  value={inductionForm.venue}
                  onChange={(e) => setInductionForm({ ...inductionForm, venue: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsScheduleInductionOpen(false)}
                  className="px-3 py-1.5 bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg font-semibold">
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= LIGHTWEIGHT MODAL: ASSIGN TRAINING ================= */}
      {isAssignTrainingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 space-y-3 shadow-xl text-xs">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-slate-900 text-sm">Assign Training Module</h3>
              <button onClick={() => setIsAssignTrainingOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAssignTraining} className="space-y-3">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Staff Member Name</label>
                <input
                  type="text"
                  required
                  value={trainingForm.staffName}
                  onChange={(e) => setTrainingForm({ ...trainingForm, staffName: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Module Title</label>
                <input
                  type="text"
                  required
                  value={trainingForm.moduleTitle}
                  onChange={(e) => setTrainingForm({ ...trainingForm, moduleTitle: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Due Date</label>
                <input
                  type="date"
                  value={trainingForm.dueDate}
                  onChange={(e) => setTrainingForm({ ...trainingForm, dueDate: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsAssignTrainingOpen(false)}
                  className="px-3 py-1.5 bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg font-semibold">
                  Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= LIGHTWEIGHT MODAL: RAISE HR TASK ================= */}
      {isCreateHrTaskOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 space-y-3 shadow-xl text-xs">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-slate-900 text-sm">Raise Institutional HR Task</h3>
              <button onClick={() => setIsCreateHrTaskOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateHrTask} className="space-y-3">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Staff Member Name</label>
                <input
                  type="text"
                  required
                  value={hrTaskForm.staffName}
                  onChange={(e) => setHrTaskForm({ ...hrTaskForm, staffName: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Task Type</label>
                  <select
                    value={hrTaskForm.type}
                    onChange={(e) => setHrTaskForm({ ...hrTaskForm, type: e.target.value as InstitutionalHrTask['type'] })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  >
                    <option value="Probation Confirmation">Probation Confirmation</option>
                    <option value="IT & Asset Allocation">IT & Asset Allocation</option>
                    <option value="Salary Revision / Grade Pay">Salary Revision</option>
                    <option value="Maternity / Sabbatical Leave">Leave Request</option>
                    <option value="Research Publication Grant">Research Grant</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium text-slate-700 block mb-1">Priority</label>
                  <select
                    value={hrTaskForm.priority}
                    onChange={(e) => setHrTaskForm({ ...hrTaskForm, priority: e.target.value as InstitutionalHrTask['priority'] })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  >
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Details & Justification</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Appraisal details or requisition justification..."
                  value={hrTaskForm.requestedDetails}
                  onChange={(e) => setHrTaskForm({ ...hrTaskForm, requestedDetails: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsCreateHrTaskOpen(false)}
                  className="px-3 py-1.5 bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg font-semibold">
                  Submit Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
