import React, { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { ExportButton } from '../../components/common/ExportButton'
import {
  Briefcase,
  UserCheck,
  CheckCircle2,
  Shield,
  Award,
  Search,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Filter,
  Upload,
  Eye,
  BookOpen,
  TrendingUp,
  FileCheck,
  UserPlus,
  Download,
  AlertCircle,
  Sparkles,
  Laptop,
  GraduationCap,
  ChevronRight,
  FileText,
  User,
  Flame
} from 'lucide-react'
import {
  CandidatePerson,
  StaffDossier,
  InductionSession,
  StaffTrainingRecord,
  InstitutionalHrTask,
  StaffDocumentRecord,
  OnboardingTaskItem
} from '../../types'
import { staffBackendService } from '../../services/staffBackendService'

export const Module06_StaffDashboard: React.FC = () => {
  const { staffList, showToast } = useApp()

  // Active Tab: 1: Candidates, 2: Documents, 3: Induction, 4: Training, 5: HR Tasks, 6: Directory
  const [activeTab, setActiveTab] = useState<'candidates' | 'documents' | 'induction' | 'training' | 'hr-tasks' | 'directory'>('candidates')

  // Data states from staffBackendService
  const [candidates, setCandidates] = useState<CandidatePerson[]>([])
  const [dossiers, setDossiers] = useState<StaffDossier[]>([])
  const [inductionSessions, setInductionSessions] = useState<InductionSession[]>([])
  const [trainingRecords, setTrainingRecords] = useState<StaffTrainingRecord[]>([])
  const [hrTasks, setHrTasks] = useState<InstitutionalHrTask[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Filters
  const [candidatePriorityFilter, setCandidatePriorityFilter] = useState<string>('All')
  const [candidateStageFilter, setCandidateStageFilter] = useState<string>('All')
  const [docSearch, setDocSearch] = useState<string>('')
  const [trainingCategoryFilter, setTrainingCategoryFilter] = useState<string>('All')
  const [hrTaskStatusFilter, setHrTaskStatusFilter] = useState<string>('All')
  const [directorySearch, setDirectorySearch] = useState<string>('')

  // Modals
  const [selectedDossier, setSelectedDossier] = useState<StaffDossier | null>(null)
  const [isAddCandidateOpen, setIsAddCandidateOpen] = useState<boolean>(false)
  const [isScheduleInterviewOpen, setIsScheduleInterviewOpen] = useState<CandidatePerson | null>(null)
  const [isScheduleInductionOpen, setIsScheduleInductionOpen] = useState<boolean>(false)
  const [isAssignTrainingOpen, setIsAssignTrainingOpen] = useState<boolean>(false)
  const [isCreateHrTaskOpen, setIsCreateHrTaskOpen] = useState<boolean>(false)

  // Form states
  const [newCandidateForm, setNewCandidateForm] = useState({
    name: '',
    email: '',
    phone: '',
    roleApplied: '',
    department: 'Computer Science & AI',
    experienceYears: 5,
    priority: 'High' as CandidatePerson['priority'],
    stage: 'Interview Scheduled' as CandidatePerson['stage'],
    expectedJoiningDate: '2026-11-15',
    notes: ''
  })

  const [interviewForm, setInterviewForm] = useState({
    date: '2026-10-25',
    time: '11:00 AM',
    panel: 'Dean Academic & HOD'
  })

  const [newInductionForm, setNewInductionForm] = useState({
    title: '',
    date: '2026-10-30',
    time: '10:00 AM - 01:00 PM',
    venue: 'Sir C.V. Raman Hall',
    facilitator: 'Principal & HR Lead',
    targetCohort: 'Batch Nov 2026',
    description: ''
  })

  const [newTrainingForm, setNewTrainingForm] = useState({
    staffId: '',
    moduleCode: 'TRN-POCSO-2026',
    title: 'Statutory POCSO Act & Campus Child Protection Framework',
    category: 'Mandatory Child Protection (POCSO)' as StaffTrainingRecord['category'],
    dueDate: '2026-11-30'
  })

  const [newHrTaskForm, setNewHrTaskForm] = useState({
    staffId: '',
    type: 'Probation Confirmation' as InstitutionalHrTask['type'],
    priority: 'High' as InstitutionalHrTask['priority'],
    requestedDetails: '',
    slaDeadline: '2026-10-25'
  })

  // Load data on mount
  useEffect(() => {
    refreshAllData()
  }, [])

  const refreshAllData = async () => {
    setIsLoading(true)
    try {
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
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  // Candidate Handlers
  const handleToggleOnboardingTask = async (candidateId: string, taskId: string) => {
    try {
      await staffBackendService.toggleOnboardingTask(candidateId, taskId)
      const updated = await staffBackendService.getCandidates()
      setCandidates(updated)
      showToast('Onboarding milestone status updated', 'success')
    } catch {
      showToast('Failed to update task', 'error')
    }
  }

  const handleAdvanceStage = async (candidateId: string, nextStage: CandidatePerson['stage']) => {
    try {
      await staffBackendService.updateCandidateStage(candidateId, nextStage)
      const updated = await staffBackendService.getCandidates()
      setCandidates(updated)
      showToast(`Candidate advanced to ${nextStage}`, 'success')
    } catch {
      showToast('Error updating stage', 'error')
    }
  }

  const handleUpdatePriority = async (candidateId: string, priority: CandidatePerson['priority']) => {
    try {
      await staffBackendService.updateCandidatePriority(candidateId, priority)
      const updated = await staffBackendService.getCandidates()
      setCandidates(updated)
      showToast(`Priority updated to ${priority}`, 'info')
    } catch {
      showToast('Error updating priority', 'error')
    }
  }

  const handleAddCandidate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCandidateForm.name || !newCandidateForm.roleApplied) {
      showToast('Please fill in candidate name and role', 'warning')
      return
    }
    try {
      await staffBackendService.addCandidate({
        ...newCandidateForm,
        status: 'Active',
        onboardingTasks: [
          { id: `ot-${Date.now()}-1`, title: 'Offer Acceptance & Background Check Submission', completed: false, dueDate: '2026-11-05', category: 'HR Formalities' },
          { id: `ot-${Date.now()}-2`, title: 'IT Credentials & Workstation Requisition', completed: false, dueDate: '2026-11-10', category: 'IT Setup' },
          { id: `ot-${Date.now()}-3`, title: 'Biometric Access Registration & ID Card Printing', completed: false, dueDate: '2026-11-15', category: 'Campus Security' }
        ]
      })
      setIsAddCandidateOpen(false)
      setNewCandidateForm({
        name: '',
        email: '',
        phone: '',
        roleApplied: '',
        department: 'Computer Science & AI',
        experienceYears: 5,
        priority: 'High',
        stage: 'Interview Scheduled',
        expectedJoiningDate: '2026-11-15',
        notes: ''
      })
      const updated = await staffBackendService.getCandidates()
      setCandidates(updated)
      showToast('New candidate added to interview pipeline', 'success')
    } catch {
      showToast('Failed to add candidate', 'error')
    }
  }

  const handleScheduleInterview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isScheduleInterviewOpen) return
    try {
      const panelList = interviewForm.panel.split(',').map((p) => p.trim())
      await staffBackendService.scheduleInterview(
        isScheduleInterviewOpen.id,
        interviewForm.date,
        interviewForm.time,
        panelList
      )
      setIsScheduleInterviewOpen(null)
      const updated = await staffBackendService.getCandidates()
      setCandidates(updated)
      showToast(`Interview scheduled for ${isScheduleInterviewOpen.name}`, 'success')
    } catch {
      showToast('Failed to schedule interview', 'error')
    }
  }

  // Document Validation Handlers
  const handleValidateDoc = async (dossierId: string, docId: string) => {
    try {
      const updated = await staffBackendService.validateDocument(dossierId, docId, 'Campus HR Auditor')
      const updatedDossiers = await staffBackendService.getDossiers()
      setDossiers(updatedDossiers)
      setSelectedDossier(updated)
      showToast('Document marked as Verified & Statutory Compliant', 'success')
    } catch {
      showToast('Failed to validate document', 'error')
    }
  }

  const handleRejectDoc = async (dossierId: string, docId: string) => {
    const reason = prompt('Please enter reason for rejection (sent to staff for re-upload):', 'Invalid or uncertified copy. Please provide original stamped certificate.')
    if (reason === null) return
    try {
      const updated = await staffBackendService.rejectDocument(dossierId, docId, reason)
      const updatedDossiers = await staffBackendService.getDossiers()
      setDossiers(updatedDossiers)
      setSelectedDossier(updated)
      showToast('Document marked as Rejected. Re-upload notification dispatched.', 'warning')
    } catch {
      showToast('Failed to reject document', 'error')
    }
  }

  const handleSimulateUploadDoc = async (dossierId: string, docType: StaffDocumentRecord['type']) => {
    const fakeFileName = `${docType.toLowerCase().replace(/[^a-z0-9]/g, '_')}_signed_verified.pdf`
    try {
      const updated = await staffBackendService.uploadOrReplaceDocument(dossierId, docType, fakeFileName, '2.4 MB')
      const updatedDossiers = await staffBackendService.getDossiers()
      setDossiers(updatedDossiers)
      setSelectedDossier(updated)
      showToast(`Uploaded ${fakeFileName} for verification`, 'info')
    } catch {
      showToast('Upload failed', 'error')
    }
  }

  // Induction Handlers
  const handleToggleInductionAttendance = async (sessionId: string, staffId: string) => {
    try {
      await staffBackendService.toggleInductionAttendance(sessionId, staffId)
      const updated = await staffBackendService.getInductionSessions()
      setInductionSessions(updated)
      showToast('Induction attendance attendance record updated', 'success')
    } catch {
      showToast('Failed to update attendance', 'error')
    }
  }

  const handleCompleteInduction = async (sessionId: string) => {
    try {
      await staffBackendService.completeInductionSession(sessionId)
      const updated = await staffBackendService.getInductionSessions()
      setInductionSessions(updated)
      showToast('Induction session marked as Completed', 'success')
    } catch {
      showToast('Failed to complete session', 'error')
    }
  }

  const handleCreateInduction = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newInductionForm.title) {
      showToast('Please provide an induction title', 'warning')
      return
    }
    try {
      await staffBackendService.createInductionSession({
        ...newInductionForm,
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
      const updated = await staffBackendService.getInductionSessions()
      setInductionSessions(updated)
      showToast('New induction session scheduled successfully', 'success')
    } catch {
      showToast('Failed to create induction session', 'error')
    }
  }

  // Training Handlers
  const handleUpdateProgress = async (id: string, newProgress: number) => {
    try {
      await staffBackendService.updateTrainingProgress(id, newProgress)
      const updated = await staffBackendService.getTrainingRecords()
      setTrainingRecords(updated)
      showToast(newProgress === 100 ? 'Training 100% completed & Certificate issued!' : `Progress updated to ${newProgress}%`, 'success')
    } catch {
      showToast('Failed to update training progress', 'error')
    }
  }

  const handleAssignTraining = async (e: React.FormEvent) => {
    e.preventDefault()
    const targetStaff = staffList.find((s) => s.id === newTrainingForm.staffId) || staffList[0]
    try {
      await staffBackendService.assignTraining({
        moduleCode: newTrainingForm.moduleCode,
        title: newTrainingForm.title,
        category: newTrainingForm.category,
        assignedToStaffId: targetStaff.id,
        staffName: targetStaff.name,
        department: targetStaff.department,
        progress: 0,
        dueDate: newTrainingForm.dueDate,
        status: 'Not Started'
      })
      setIsAssignTrainingOpen(false)
      const updated = await staffBackendService.getTrainingRecords()
      setTrainingRecords(updated)
      showToast(`Assigned ${newTrainingForm.title} to ${targetStaff.name}`, 'success')
    } catch {
      showToast('Failed to assign training', 'error')
    }
  }

  // HR Task Handlers
  const handleApproveHrTask = async (taskId: string) => {
    try {
      await staffBackendService.approveHrTask(taskId, 'Campus HR Director', 'Sanctioned per institutional governing board approval')
      const updated = await staffBackendService.getHrTasks()
      setHrTasks(updated)
      showToast('Institutional HR Requisition Approved', 'success')
    } catch {
      showToast('Approval failed', 'error')
    }
  }

  const handleRejectHrTask = async (taskId: string) => {
    const reason = prompt('Reason for rejection:', 'Budget cap reached for current fiscal quarter.')
    if (reason === null) return
    try {
      await staffBackendService.rejectHrTask(taskId, 'Campus HR Director', reason)
      const updated = await staffBackendService.getHrTasks()
      setHrTasks(updated)
      showToast('HR Requisition Rejected', 'warning')
    } catch {
      showToast('Rejection failed', 'error')
    }
  }

  const handleEscalateHrTask = async (taskId: string) => {
    try {
      await staffBackendService.escalateHrTask(taskId, 'Escalated to Institutional Director for special budget clearance')
      const updated = await staffBackendService.getHrTasks()
      setHrTasks(updated)
      showToast('Requisition Escalated to Director of Campus', 'info')
    } catch {
      showToast('Escalation failed', 'error')
    }
  }

  const handleCreateHrTask = async (e: React.FormEvent) => {
    e.preventDefault()
    const staff = staffList.find((s) => s.id === newHrTaskForm.staffId) || staffList[0]
    if (!newHrTaskForm.requestedDetails) {
      showToast('Please provide requisition justification', 'warning')
      return
    }
    try {
      await staffBackendService.createHrTask({
        type: newHrTaskForm.type,
        staffId: staff.id,
        staffName: staff.name,
        department: staff.department,
        designation: staff.designation,
        priority: newHrTaskForm.priority,
        submittedDate: new Date().toISOString().split('T')[0],
        slaDeadline: newHrTaskForm.slaDeadline,
        status: 'Pending HR Review',
        requestedDetails: newHrTaskForm.requestedDetails
      })
      setIsCreateHrTaskOpen(false)
      setNewHrTaskForm({
        staffId: '',
        type: 'Probation Confirmation',
        priority: 'High',
        requestedDetails: '',
        slaDeadline: '2026-10-25'
      })
      const updated = await staffBackendService.getHrTasks()
      setHrTasks(updated)
      showToast('Institutional HR requisition submitted for Maker-Checker review', 'success')
    } catch {
      showToast('Failed to create HR task', 'error')
    }
  }

  // Filtered views
  const filteredCandidates = candidates.filter((c) => {
    const matchPriority = candidatePriorityFilter === 'All' || c.priority === candidatePriorityFilter
    const matchStage = candidateStageFilter === 'All' || c.stage === candidateStageFilter
    return matchPriority && matchStage
  })

  const filteredDossiers = dossiers.filter((d) =>
    d.staffName.toLowerCase().includes(docSearch.toLowerCase()) ||
    d.department.toLowerCase().includes(docSearch.toLowerCase()) ||
    d.empNo.toLowerCase().includes(docSearch.toLowerCase())
  )

  const filteredTrainings = trainingRecords.filter((t) =>
    trainingCategoryFilter === 'All' || t.category === trainingCategoryFilter
  )

  const filteredHrTasks = hrTasks.filter((t) =>
    hrTaskStatusFilter === 'All' || t.status === hrTaskStatusFilter
  )

  const filteredDirectory = staffList.filter((s) =>
    s.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
    s.department.toLowerCase().includes(directorySearch.toLowerCase()) ||
    s.empNo.toLowerCase().includes(directorySearch.toLowerCase())
  )

  // Calculations for summary stats
  const expeditedCandidatesCount = candidates.filter((c) => c.priority === 'Expedited' || c.priority === 'High').length
  const avgComplianceScore = dossiers.length
    ? Math.round(dossiers.reduce((acc, d) => acc + d.complianceScore, 0) / dossiers.length)
    : 85
  const pendingHrTasksCount = hrTasks.filter((t) => t.status === 'Pending HR Review').length
  const certifiedTrainingsCount = trainingRecords.filter((t) => t.status === 'Certified').length

  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33]">
              06. Staff Management & Onboarding Workspace
            </h1>
            <Badge variant="indigo">FDD 2.5 Complete</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Prioritized candidate interview pipelines, statutory document validation, induction cohorts, training & LMS tracking, and institutional HR approvals.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsAddCandidateOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
          >
            <UserPlus className="w-3.5 h-3.5" />
            + Prioritize Candidate
          </button>
          <button
            onClick={() => setIsCreateHrTaskOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            + Raise HR Task
          </button>
          <ExportButton filename="staff_onboarding_hr_records" data={candidates} />
        </div>
      </div>

      {/* Top Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Candidate Pipeline</span>
            <Flame className="w-4 h-4 text-rose-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{candidates.length}</span>
            <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
              {expeditedCandidatesCount} Urgent
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Active interview & onboarding</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Doc Compliance</span>
            <Shield className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{avgComplianceScore}%</span>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              Verified
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">UGC & POCSO dossier rate</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Induction Sessions</span>
            <Calendar className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{inductionSessions.length}</span>
            <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
              {inductionSessions.filter((s) => s.status === 'Upcoming').length} Upcoming
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Orientation & lab drills</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Training Tracking</span>
            <GraduationCap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{certifiedTrainingsCount}</span>
            <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
              / {trainingRecords.length} Certified
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">POCSO, AI & safety certs</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">HR Approvals</span>
            <CheckCircle2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{pendingHrTasksCount}</span>
            <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
              Pending SLA
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Probation, assets & grants</p>
        </div>
      </div>

      {/* Tab Navigation Pill Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-1.5 shadow-xs flex flex-wrap gap-1">
        <button
          onClick={() => setActiveTab('candidates')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'candidates'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <UserPlus className="w-4 h-4" />
          1. Prioritized Candidates & Onboarding
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'candidates' ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-700'}`}>
            {candidates.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('documents')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'documents'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          2. Document Collection & Validation
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'documents' ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-700'}`}>
            {dossiers.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('induction')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'induction'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          3. Induction Sessions
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'induction' ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-700'}`}>
            {inductionSessions.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('training')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'training'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          4. Training & Upskilling Tracking
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${activeTab === 'training' ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-700'}`}>
            {trainingRecords.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('hr-tasks')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'hr-tasks'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          5. Institutional HR Tasks & Approvals
          {pendingHrTasksCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-rose-500 text-white animate-pulse">
              {pendingHrTasksCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('directory')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'directory'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          Faculty Directory
        </button>
      </div>

      {/* TAB 1: PRIORITIZED CANDIDATES & ONBOARDING */}
      {activeTab === 'candidates' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-500 font-bold flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Priority:
              </span>
              {['All', 'Expedited', 'High', 'Normal'].map((p) => (
                <button
                  key={p}
                  onClick={() => setCandidatePriorityFilter(p)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    candidatePriorityFilter === p
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-bold">Stage:</span>
              <select
                value={candidateStageFilter}
                onChange={(e) => setCandidateStageFilter(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs font-medium focus:outline-indigo-500"
              >
                <option value="All">All Hiring Stages</option>
                <option value="Interview Scheduled">Interview Scheduled</option>
                <option value="Panel Technical">Panel Technical</option>
                <option value="Management Review">Management Review</option>
                <option value="Offer Extended">Offer Extended</option>
                <option value="Onboarding Active">Onboarding Active</option>
              </select>
            </div>
          </div>

          {/* Candidate Pipeline Cards */}
          <div className="grid grid-cols-1 gap-4">
            {filteredCandidates.map((cand) => {
              const completedTasksCount = cand.onboardingTasks.filter((t) => t.completed).length
              const totalTasksCount = cand.onboardingTasks.length
              const onboardingPercent = totalTasksCount ? Math.round((completedTasksCount / totalTasksCount) * 100) : 0

              return (
                <div
                  key={cand.id}
                  className="bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-5 shadow-xs transition-all space-y-4"
                >
                  {/* Top Bar of Candidate */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-black text-sm shrink-0">
                        {cand.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-slate-900 text-base">{cand.name}</h3>
                          <Badge
                            variant={
                              cand.priority === 'Expedited' ? 'rose' : cand.priority === 'High' ? 'amber' : 'slate'
                            }
                          >
                            {cand.priority === 'Expedited' && <Flame className="w-3 h-3 inline mr-1 text-rose-500" />}
                            {cand.priority} Priority
                          </Badge>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                            {cand.stage}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">
                          <span className="font-semibold text-slate-800">{cand.roleApplied}</span> &bull; {cand.department} &bull; {cand.experienceYears} Years Exp.
                        </p>
                      </div>
                    </div>

                    {/* Quick Stage Progression */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsScheduleInterviewOpen(cand)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        {cand.interviewDate ? 'Reschedule Interview' : 'Schedule Interview'}
                      </button>

                      <select
                        value={cand.stage}
                        onChange={(e) => handleAdvanceStage(cand.id, e.target.value as CandidatePerson['stage'])}
                        className="px-2.5 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-lg text-xs font-bold"
                      >
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Panel Technical">Panel Technical</option>
                        <option value="Management Review">Management Review</option>
                        <option value="Offer Extended">Offer Extended</option>
                        <option value="Onboarding Active">Onboarding Active</option>
                      </select>
                    </div>
                  </div>

                  {/* Interview & Notes Strip */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                    <div>
                      <span className="text-slate-400 font-bold block text-[10px] uppercase">Interview Schedule</span>
                      {cand.interviewDate ? (
                        <div className="font-medium text-slate-800 mt-0.5">
                          {cand.interviewDate} at {cand.interviewTime}
                          <p className="text-[11px] text-slate-500">Panel: {cand.interviewPanel?.join(', ')}</p>
                        </div>
                      ) : (
                        <span className="text-amber-600 font-medium">Pending schedule</span>
                      )}
                    </div>

                    <div>
                      <span className="text-slate-400 font-bold block text-[10px] uppercase">Expected Joining Date</span>
                      <span className="font-medium text-slate-800 mt-0.5 block">{cand.expectedJoiningDate}</span>
                      <p className="text-[11px] text-slate-500">Contact: {cand.phone} &bull; {cand.email}</p>
                    </div>

                    <div>
                      <span className="text-slate-400 font-bold block text-[10px] uppercase">Evaluation Notes</span>
                      <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">{cand.notes || 'Interview evaluation in progress.'}</p>
                    </div>
                  </div>

                  {/* Onboarding Checklist Section */}
                  <div className="space-y-2 pt-1 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">Onboarding Formalities & IT Provisioning Tasks:</span>
                        <span className="text-slate-500 font-semibold">({completedTasksCount} of {totalTasksCount} completed)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-indigo-700">{onboardingPercent}% Complete</span>
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 transition-all" style={{ width: `${onboardingPercent}%` }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                      {cand.onboardingTasks.map((task) => (
                        <button
                          key={task.id}
                          onClick={() => handleToggleOnboardingTask(cand.id, task.id)}
                          className={`p-2.5 rounded-xl border text-left transition-all flex items-start gap-2 ${
                            task.completed
                              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                          }`}
                        >
                          <div className="mt-0.5">
                            {task.completed ? (
                              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : (
                              <div className="w-4 h-4 rounded border-2 border-slate-300 shrink-0" />
                            )}
                          </div>
                          <div>
                            <p className={`text-xs font-semibold leading-tight ${task.completed ? 'line-through text-emerald-800' : 'text-slate-800'}`}>
                              {task.title}
                            </p>
                            <span className="text-[10px] text-slate-400 mt-1 block">
                              {task.category} &bull; Due {task.dueDate}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* TAB 2: DOCUMENT COLLECTION & VALIDATION */}
      {activeTab === 'documents' && (
        <div className="space-y-4">
          {/* Statutory Mandate Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
            <Shield className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-950">Statutory Institutional Dossier Compliance Mandate</h4>
              <p className="mt-0.5 text-amber-800">
                In compliance with UGC and statutory POCSO campus safety guidelines, all academic and administrative personnel must possess validated Identity, Police Background Clearance, and Educational Degree Credentials before class allotment.
              </p>
            </div>
          </div>

          {/* Dossiers List Header & Search */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-bold text-slate-900 text-sm">Staff Document Dossiers & Auditor Validation</h3>
            <div className="relative w-72">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search faculty or emp no..."
                value={docSearch}
                onChange={(e) => setDocSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          {/* Dossier Cards */}
          <div className="grid grid-cols-1 gap-4">
            {filteredDossiers.map((dossier) => (
              <div
                key={dossier.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:border-indigo-300 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-base">{dossier.staffName}</h4>
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                        {dossier.empNo}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {dossier.designation} &bull; <span className="font-medium text-slate-700">{dossier.department}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Compliance</span>
                      <div className="text-sm font-black text-slate-900">{dossier.complianceScore}%</div>
                    </div>
                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          dossier.complianceScore === 100
                            ? 'bg-emerald-500'
                            : dossier.complianceScore >= 75
                            ? 'bg-indigo-600'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${dossier.complianceScore}%` }}
                      ></div>
                    </div>

                    <button
                      onClick={() => setSelectedDossier(dossier)}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Inspect & Validate Dossier
                    </button>
                  </div>
                </div>

                {/* Quick Status Pills of Documents */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
                  {dossier.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className={`p-2 rounded-xl border text-[11px] ${
                        doc.status === 'Verified'
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                          : doc.status === 'Pending Review'
                          ? 'bg-amber-50 border-amber-200 text-amber-900'
                          : doc.status === 'Rejected'
                          ? 'bg-rose-50 border-rose-200 text-rose-900'
                          : 'bg-slate-50 border-slate-200 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold line-clamp-1">{doc.type.split('/')[0]}</span>
                        {doc.status === 'Verified' ? (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        ) : doc.status === 'Pending Review' ? (
                          <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        ) : doc.status === 'Rejected' ? (
                          <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        )}
                      </div>
                      <span className="font-semibold block">{doc.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: INDUCTION SESSIONS */}
      {activeTab === 'induction' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">New Joinee Orientation & Induction Cohorts</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Statutory POCSO compliance briefings, digital LMS workflows, laboratory safety drills, and attendance sign-offs.
              </p>
            </div>

            <button
              onClick={() => setIsScheduleInductionOpen(true)}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              + Schedule Induction Session
            </button>
          </div>

          {/* Sessions Grid */}
          <div className="grid grid-cols-1 gap-4">
            {inductionSessions.map((session) => {
              const attendedCount = session.attendees.filter((a) => a.attended).length
              const totalAttendees = session.attendees.length
              const attendanceRate = totalAttendees ? Math.round((attendedCount / totalAttendees) * 100) : 0

              return (
                <div
                  key={session.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 hover:border-indigo-300 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                          {session.code}
                        </span>
                        <h4 className="font-bold text-slate-900 text-base">{session.title}</h4>
                        <Badge variant={session.status === 'Completed' ? 'teal' : 'indigo'}>
                          {session.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600">{session.description}</p>
                    </div>

                    {session.status !== 'Completed' && (
                      <button
                        onClick={() => handleCompleteInduction(session.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs shrink-0 flex items-center gap-1"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Mark Session Complete
                      </button>
                    )}
                  </div>

                  {/* Metadata Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                    <div>
                      <span className="text-slate-400 font-bold block text-[10px] uppercase">Date & Session Time</span>
                      <div className="font-medium text-slate-800 mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                        {session.date} &bull; {session.time}
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-400 font-bold block text-[10px] uppercase">Venue & Facilitator</span>
                      <div className="font-medium text-slate-800 mt-0.5">
                        {session.venue}
                        <p className="text-[11px] text-slate-500">By: {session.facilitator}</p>
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-400 font-bold block text-[10px] uppercase">Target Cohort</span>
                      <div className="font-medium text-slate-800 mt-0.5">
                        {session.targetCohort}
                        <p className="text-[11px] text-indigo-600 font-semibold">
                          Attendance: {attendedCount}/{totalAttendees} ({attendanceRate}%)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Attendees Attendance Roster */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-900 block">Inductee Attendance Sign-Off Checklist:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                      {session.attendees.map((attendee) => (
                        <button
                          key={attendee.staffId}
                          onClick={() => handleToggleInductionAttendance(session.id, attendee.staffId)}
                          className={`p-2.5 rounded-xl border text-left flex items-start gap-2 transition-all ${
                            attendee.attended
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                              : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                          }`}
                        >
                          <div className="mt-0.5">
                            {attendee.attended ? (
                              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : (
                              <div className="w-4 h-4 rounded border-2 border-slate-300 shrink-0" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-xs">{attendee.staffName}</p>
                            <p className="text-[10px] text-slate-500">
                              {attendee.department} &bull; {attendee.role}
                            </p>
                            {attendee.attended && attendee.signedOffAt && (
                              <span className="text-[9px] text-emerald-700 font-semibold block mt-0.5">
                                Verified: {attendee.signedOffAt}
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* TAB 4: TRAINING ASSIGNMENT & COMPLETION TRACKING */}
      {activeTab === 'training' && (
        <div className="space-y-4">
          {/* Header & Filter */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Faculty Professional Development & Mandatory Training</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Statutory POCSO Act child protection, AI ethics in pedagogy, NEP 2020 credit frameworks, and laboratory chemical safety.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={trainingCategoryFilter}
                onChange={(e) => setTrainingCategoryFilter(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
              >
                <option value="All">All Module Categories</option>
                <option value="Mandatory Child Protection (POCSO)">Mandatory Child Protection (POCSO)</option>
                <option value="AI & Pedagogy">AI & Pedagogy</option>
                <option value="Lab & Fire Safety">Lab & Fire Safety</option>
                <option value="NEP 2020 Accreditation">NEP 2020 Accreditation</option>
                <option value="Data Privacy">Data Privacy</option>
              </select>

              <button
                onClick={() => setIsAssignTrainingOpen(true)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1 shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5" />
                + Assign Module
              </button>
            </div>
          </div>

          {/* Training Records Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Faculty Member</th>
                    <th className="py-3 px-4">Training Module</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Progress / Score</th>
                    <th className="py-3 px-4">Due Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredTrainings.map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-50/60">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900">{rec.staffName}</div>
                        <span className="text-[11px] text-slate-500">{rec.department}</span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800">{rec.title}</div>
                        <span className="font-mono text-[10px] text-slate-400">{rec.moduleCode}</span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                          {rec.category}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800">{rec.progress}%</span>
                          <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${rec.progress === 100 ? 'bg-emerald-500' : 'bg-indigo-600'}`}
                              style={{ width: `${rec.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        {rec.score && (
                          <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
                            Exam Score: {rec.score}%
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-4 font-medium text-slate-600">{rec.dueDate}</td>

                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            rec.status === 'Certified' ? 'teal' : rec.status === 'In Progress' ? 'indigo' : 'slate'
                          }
                        >
                          {rec.status}
                        </Badge>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {rec.progress < 100 ? (
                            <button
                              onClick={() => handleUpdateProgress(rec.id, Math.min(100, rec.progress + 25))}
                              className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-lg text-[11px]"
                            >
                              +25% Progress
                            </button>
                          ) : (
                            <button
                              onClick={() => showToast(`Certificate downloaded for ${rec.staffName} (${rec.moduleCode})`, 'success')}
                              className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg text-[11px] flex items-center gap-1"
                            >
                              <Download className="w-3 h-3" />
                              Certificate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: INSTITUTIONAL HR TASKS & APPROVALS */}
      {activeTab === 'hr-tasks' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Maker-Checker Institutional HR Task Approvals</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Faculty probation clearances, high-end asset allocations, salary grade revisions, maternity leaves, and research publication grants.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={hrTaskStatusFilter}
                onChange={(e) => setHrTaskStatusFilter(e.target.value)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium"
              >
                <option value="All">All Task Statuses</option>
                <option value="Pending HR Review">Pending HR Review</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Escalated to Director">Escalated to Director</option>
              </select>

              <button
                onClick={() => setIsCreateHrTaskOpen(true)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                + Raise Requisition
              </button>
            </div>
          </div>

          {/* HR Tasks Cards */}
          <div className="grid grid-cols-1 gap-4">
            {filteredHrTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 hover:border-indigo-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                        {task.taskNumber}
                      </span>
                      <h4 className="font-bold text-slate-900 text-base">{task.type}</h4>
                      <Badge
                        variant={
                          task.status === 'Approved'
                            ? 'teal'
                            : task.status === 'Rejected'
                            ? 'rose'
                            : task.status === 'Escalated to Director'
                            ? 'amber'
                            : 'indigo'
                        }
                      >
                        {task.status}
                      </Badge>
                      <Badge variant={task.priority === 'Urgent' ? 'rose' : 'slate'}>
                        {task.priority} Priority
                      </Badge>
                    </div>

                    <p className="text-xs text-slate-600 mt-1">
                      Submitted for: <span className="font-bold text-slate-900">{task.staffName}</span> ({task.designation}, {task.department})
                    </p>
                  </div>

                  <div className="text-right text-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">SLA Target Date</span>
                    <span className="font-bold text-slate-800">{task.slaDeadline}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Requisition Details & Justification</span>
                  {task.requestedDetails}
                </div>

                {task.reviewedBy && (
                  <div className="p-2.5 bg-emerald-50/60 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-center justify-between">
                    <div>
                      <span className="font-bold">Auditor Review:</span> {task.actionRemarks}
                    </div>
                    <span className="text-[10px] text-emerald-700 font-semibold">
                      By {task.reviewedBy} at {task.reviewedAt}
                    </span>
                  </div>
                )}

                {/* Maker-Checker Action Buttons */}
                {task.status === 'Pending HR Review' && (
                  <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handleEscalateHrTask(task.id)}
                      className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-xl text-xs font-semibold"
                    >
                      Escalate to Director &rarr;
                    </button>
                    <button
                      onClick={() => handleRejectHrTask(task.id)}
                      className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-semibold"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleApproveHrTask(task.id)}
                      className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      Approve Requisition
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: ALL FACULTY & STAFF DIRECTORY (Existing Roster) */}
      {activeTab === 'directory' && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Faculty & Administrative Master Directory</h3>
              <p className="text-xs text-slate-500">Biometric turnstile mapping, qualifications, and role assignments.</p>
            </div>
            <div className="relative w-72">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Filter staff by name or dept..."
                value={directorySearch}
                onChange={(e) => setDirectorySearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Staff Name</th>
                  <th className="py-2.5 px-3">Emp ID</th>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">Designation</th>
                  <th className="py-2.5 px-3">Biometric ID</th>
                  <th className="py-2.5 px-3">Qualification</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDirectory.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-bold text-slate-900">{s.name}</td>
                    <td className="py-3 px-3 font-mono text-slate-500">{s.empNo}</td>
                    <td className="py-3 px-3 text-slate-600">{s.department}</td>
                    <td className="py-3 px-3 text-slate-600">{s.designation}</td>
                    <td className="py-3 px-3 font-mono text-indigo-600 font-semibold">{s.biometricId}</td>
                    <td className="py-3 px-3 text-slate-500">{s.qualification}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          const dos = dossiers.find((d) => d.staffId === s.id || d.empNo === s.empNo) || dossiers[0]
                          setSelectedDossier(dos)
                        }}
                        className="text-indigo-600 hover:underline font-semibold"
                      >
                        Inspect Dossier &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= MODAL: DOSSIER VALIDATION & INSPECTION ================= */}
      {selectedDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    Statutory Document Dossier & Auditor Validation
                  </h3>
                  <span className="px-2 py-0.5 rounded text-xs font-mono bg-indigo-50 text-indigo-700 font-bold">
                    {selectedDossier.empNo}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {selectedDossier.staffName} &bull; {selectedDossier.designation} &bull; {selectedDossier.department}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Score</span>
                  <div className="text-sm font-black text-indigo-700">{selectedDossier.complianceScore}% Compliant</div>
                </div>
                <button
                  onClick={() => setSelectedDossier(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Checklist of 6 Statutory Documents */}
            <div className="space-y-3">
              {selectedDossier.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3.5 border rounded-xl bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{doc.type}</span>
                      <Badge
                        variant={
                          doc.status === 'Verified'
                            ? 'teal'
                            : doc.status === 'Pending Review'
                            ? 'amber'
                            : doc.status === 'Rejected'
                            ? 'rose'
                            : 'slate'
                        }
                      >
                        {doc.status}
                      </Badge>
                    </div>

                    {doc.fileName ? (
                      <p className="text-slate-600 font-mono text-[11px] flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-indigo-600" />
                        {doc.fileName} ({doc.fileSize || '1.8 MB'}) &bull; Uploaded on {doc.uploadDate}
                      </p>
                    ) : (
                      <p className="text-rose-600 text-[11px] font-medium">Missing file. Not yet provided by candidate.</p>
                    )}

                    {doc.remarks && (
                      <p className="text-[11px] text-slate-500 italic">
                        Note: {doc.remarks}
                        {doc.verifiedBy && ` (Validated by ${doc.verifiedBy} on ${doc.verifiedAt})`}
                      </p>
                    )}
                  </div>

                  {/* Actions for this document */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleSimulateUploadDoc(selectedDossier.id, doc.type)}
                      className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg text-[11px] flex items-center gap-1"
                      title="Upload new file version"
                    >
                      <Upload className="w-3 h-3" />
                      Re-upload
                    </button>

                    {doc.status !== 'Verified' && (
                      <button
                        onClick={() => handleValidateDoc(selectedDossier.id, doc.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] flex items-center gap-1 shadow-xs"
                      >
                        <CheckCircle className="w-3 h-3" />
                        Approve & Validate
                      </button>
                    )}

                    {doc.status !== 'Rejected' && (
                      <button
                        onClick={() => handleRejectDoc(selectedDossier.id, doc.id)}
                        className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-lg text-[11px]"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedDossier(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD CANDIDATE ================= */}
      {isAddCandidateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-base">Prioritize New Candidate for Interview & Onboarding</h3>
              <button onClick={() => setIsAddCandidateOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCandidate} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Candidate Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Malini Sengupta"
                  value={newCandidateForm.name}
                  onChange={(e) => setNewCandidateForm({ ...newCandidateForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="malini@example.com"
                    value={newCandidateForm.email}
                    onChange={(e) => setNewCandidateForm({ ...newCandidateForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Contact Phone</label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={newCandidateForm.phone}
                    onChange={(e) => setNewCandidateForm({ ...newCandidateForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Role Applied *</label>
                  <input
                    type="text"
                    required
                    placeholder="Associate Professor / HOD"
                    value={newCandidateForm.roleApplied}
                    onChange={(e) => setNewCandidateForm({ ...newCandidateForm, roleApplied: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Department</label>
                  <select
                    value={newCandidateForm.department}
                    onChange={(e) => setNewCandidateForm({ ...newCandidateForm, department: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  >
                    <option value="Computer Science & AI">Computer Science & AI</option>
                    <option value="Department of Physics">Department of Physics</option>
                    <option value="Campus IT & Cyber Infrastructure">Campus IT & Cyber Infrastructure</option>
                    <option value="Humanities & Social Sciences">Humanities & Social Sciences</option>
                    <option value="Bio-Sciences & Research Center">Bio-Sciences & Research Center</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Priority Classification</label>
                  <select
                    value={newCandidateForm.priority}
                    onChange={(e) => setNewCandidateForm({ ...newCandidateForm, priority: e.target.value as CandidatePerson['priority'] })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-bold text-indigo-700"
                  >
                    <option value="Expedited">Expedited (Dean Priority)</option>
                    <option value="High">High</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Initial Stage</label>
                  <select
                    value={newCandidateForm.stage}
                    onChange={(e) => setNewCandidateForm({ ...newCandidateForm, stage: e.target.value as CandidatePerson['stage'] })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  >
                    <option value="Interview Scheduled">Interview Scheduled</option>
                    <option value="Panel Technical">Panel Technical</option>
                    <option value="Management Review">Management Review</option>
                    <option value="Offer Extended">Offer Extended</option>
                    <option value="Onboarding Active">Onboarding Active</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Expected Joining Date</label>
                <input
                  type="date"
                  value={newCandidateForm.expectedJoiningDate}
                  onChange={(e) => setNewCandidateForm({ ...newCandidateForm, expectedJoiningDate: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCandidateOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xs"
                >
                  Add to Interview Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: SCHEDULE INTERVIEW ================= */}
      {isScheduleInterviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-base">Schedule Interview & Evaluation Panel</h3>
              <button onClick={() => setIsScheduleInterviewOpen(null)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Candidate: <span className="font-bold text-slate-900">{isScheduleInterviewOpen.name}</span> ({isScheduleInterviewOpen.roleApplied})
            </p>

            <form onSubmit={handleScheduleInterview} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Interview Date</label>
                <input
                  type="date"
                  required
                  value={interviewForm.date}
                  onChange={(e) => setInterviewForm({ ...interviewForm, date: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Interview Time</label>
                <input
                  type="text"
                  placeholder="11:30 AM"
                  value={interviewForm.time}
                  onChange={(e) => setInterviewForm({ ...interviewForm, time: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Panel Members (comma-separated)</label>
                <input
                  type="text"
                  placeholder="Dean Academics, Prof. Raman, HR Lead"
                  value={interviewForm.panel}
                  onChange={(e) => setInterviewForm({ ...interviewForm, panel: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsScheduleInterviewOpen(null)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xs"
                >
                  Confirm & Send Invites
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: SCHEDULE INDUCTION SESSION ================= */}
      {isScheduleInductionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-base">Schedule New Induction / Orientation Session</h3>
              <button onClick={() => setIsScheduleInductionOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateInduction} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Session Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Outcome Based Education (OBE) & NEP Credit Mapping"
                  value={newInductionForm.title}
                  onChange={(e) => setNewInductionForm({ ...newInductionForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date</label>
                  <input
                    type="date"
                    value={newInductionForm.date}
                    onChange={(e) => setNewInductionForm({ ...newInductionForm, date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={newInductionForm.time}
                    onChange={(e) => setNewInductionForm({ ...newInductionForm, time: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Venue / Online Link</label>
                  <input
                    type="text"
                    value={newInductionForm.venue}
                    onChange={(e) => setNewInductionForm({ ...newInductionForm, venue: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Cohort</label>
                  <input
                    type="text"
                    value={newInductionForm.targetCohort}
                    onChange={(e) => setNewInductionForm({ ...newInductionForm, targetCohort: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Session Description & Key Takeaways</label>
                <textarea
                  rows={2}
                  placeholder="Topics covered, mandatory reading, attendance prerequisites..."
                  value={newInductionForm.description}
                  onChange={(e) => setNewInductionForm({ ...newInductionForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsScheduleInductionOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xs"
                >
                  Publish Induction Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ASSIGN TRAINING ================= */}
      {isAssignTrainingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-base">Assign Training / Upskilling Module</h3>
              <button onClick={() => setIsAssignTrainingOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAssignTraining} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Faculty Member</label>
                <select
                  value={newTrainingForm.staffId}
                  onChange={(e) => setNewTrainingForm({ ...newTrainingForm, staffId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                >
                  <option value="">Choose faculty from roster...</option>
                  {staffList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.empNo} - {s.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Training Module Curriculum</label>
                <select
                  value={newTrainingForm.moduleCode}
                  onChange={(e) => {
                    const code = e.target.value
                    if (code === 'TRN-POCSO-2026') {
                      setNewTrainingForm({
                        ...newTrainingForm,
                        moduleCode: code,
                        title: 'Statutory POCSO Act & Campus Child Protection Framework',
                        category: 'Mandatory Child Protection (POCSO)'
                      })
                    } else if (code === 'TRN-AI-PED-2026') {
                      setNewTrainingForm({
                        ...newTrainingForm,
                        moduleCode: code,
                        title: 'Generative AI & Ethical Assessment Grading in Higher Education',
                        category: 'AI & Pedagogy'
                      })
                    } else if (code === 'TRN-CHEM-FIRE-2026') {
                      setNewTrainingForm({
                        ...newTrainingForm,
                        moduleCode: code,
                        title: 'Chemical Hazard Management & Cleanroom Safety Protocols',
                        category: 'Lab & Fire Safety'
                      })
                    } else {
                      setNewTrainingForm({
                        ...newTrainingForm,
                        moduleCode: code,
                        title: 'Student Data Privacy, FERPA/DPDP Compliance & Phishing Defense',
                        category: 'Data Privacy'
                      })
                    }
                  }}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-medium"
                >
                  <option value="TRN-POCSO-2026">TRN-POCSO: Campus Child Protection (Mandatory)</option>
                  <option value="TRN-AI-PED-2026">TRN-AI-PED: Generative AI & Ethical Assessment</option>
                  <option value="TRN-CHEM-FIRE-2026">TRN-CHEM: Lab Chemical Hazard & Fire Safety</option>
                  <option value="TRN-CYBER-2026">TRN-CYBER: DPDP Student Data Privacy & Defense</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Completion Deadline</label>
                <input
                  type="date"
                  value={newTrainingForm.dueDate}
                  onChange={(e) => setNewTrainingForm({ ...newTrainingForm, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAssignTrainingOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xs"
                >
                  Assign & Dispatch Notification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: CREATE HR TASK ================= */}
      {isCreateHrTaskOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-base">Raise Institutional HR Requisition</h3>
              <button onClick={() => setIsCreateHrTaskOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateHrTask} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Staff Member</label>
                <select
                  value={newHrTaskForm.staffId}
                  onChange={(e) => setNewHrTaskForm({ ...newHrTaskForm, staffId: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                >
                  <option value="">Select faculty/staff...</option>
                  {staffList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.department} - {s.designation})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Requisition Type</label>
                  <select
                    value={newHrTaskForm.type}
                    onChange={(e) => setNewHrTaskForm({ ...newHrTaskForm, type: e.target.value as InstitutionalHrTask['type'] })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-medium"
                  >
                    <option value="Probation Confirmation">Probation Confirmation</option>
                    <option value="IT & Asset Allocation">IT & Asset Allocation</option>
                    <option value="Salary Revision / Grade Pay">Salary Revision / Grade Pay</option>
                    <option value="Maternity / Sabbatical Leave">Maternity / Sabbatical Leave</option>
                    <option value="Research Publication Grant">Research Publication Grant</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Priority</label>
                  <select
                    value={newHrTaskForm.priority}
                    onChange={(e) => setNewHrTaskForm({ ...newHrTaskForm, priority: e.target.value as InstitutionalHrTask['priority'] })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-bold"
                  >
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">SLA Target Clearance Date</label>
                <input
                  type="date"
                  value={newHrTaskForm.slaDeadline}
                  onChange={(e) => setNewHrTaskForm({ ...newHrTaskForm, slaDeadline: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Justification & Requisition Details *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide HOD appraisal details, asset specifications, or research conference grant details..."
                  value={newHrTaskForm.requestedDetails}
                  onChange={(e) => setNewHrTaskForm({ ...newHrTaskForm, requestedDetails: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateHrTaskOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xs"
                >
                  Submit for Maker-Checker Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
