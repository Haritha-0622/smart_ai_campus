import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  Institution,
  UserRole,
  UserPersona,
  Student,
  Staff,
  AttendanceRecord,
  ExamSession,
  PurchaseRequest,
  OutpassRequest,
  NoDueRecord,
  CircularNotice,
  ApprovalWorkflowItem,
  NotificationItem
} from '../types'
import { INSTITUTIONS, USER_PERSONAS } from '../data/tenants'
import {
  MOCK_STUDENTS,
  MOCK_STAFF,
  MOCK_ATTENDANCE,
  MOCK_EXAMS,
  MOCK_PURCHASE_REQUESTS,
  MOCK_OUTPASSES,
  MOCK_NO_DUE,
  MOCK_CIRCULARS,
  MOCK_APPROVALS,
  MOCK_NOTIFICATIONS
} from '../data/mockData'

interface ToastInfo {
  id: string
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
}

interface AppContextType {
  institution: Institution
  setInstitutionId: (id: string) => void
  campusId: string
  setCampusId: (id: string) => void
  academicYear: string
  setAcademicYear: (year: string) => void
  currentRole: UserRole
  setCurrentRole: (role: UserRole) => void
  persona: UserPersona
  isDarkMode: boolean
  toggleDarkMode: () => void
  isCopilotOpen: boolean
  setIsCopilotOpen: (open: boolean) => void
  isSearchOpen: boolean
  setIsSearchOpen: (open: boolean) => void
  students: Student[]
  addStudent: (student: Omit<Student, 'id'>) => void
  updateStudent: (id: string, updates: Partial<Student>) => void
  staffList: Staff[]
  attendance: AttendanceRecord[]
  recordAttendance: (record: Omit<AttendanceRecord, 'id'>) => void
  exams: ExamSession[]
  addExam: (exam: Omit<ExamSession, 'id'>) => void
  confirmExamDuty: (examId: string) => void
  purchaseRequests: PurchaseRequest[]
  addPurchaseRequest: (pr: Omit<PurchaseRequest, 'id' | 'prNumber'>) => void
  updatePurchaseRequestStatus: (id: string, status: PurchaseRequest['status']) => void
  outpasses: OutpassRequest[]
  addOutpass: (req: Omit<OutpassRequest, 'id'>) => void
  updateOutpassStatus: (id: string, updates: Partial<OutpassRequest>) => void
  noDueRecords: NoDueRecord[]
  toggleNoDueClearance: (studentId: string, department: keyof NoDueRecord['clearances']) => void
  circulars: CircularNotice[]
  addCircular: (circ: Omit<CircularNotice, 'id' | 'circularNo'>) => void
  approvals: ApprovalWorkflowItem[]
  resolveApproval: (id: string, action: 'Approved' | 'Rejected') => void
  notifications: NotificationItem[]
  markNotificationsAsRead: () => void
  toasts: ToastInfo[]
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void
  dismissToast: (id: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [institution, setInstitution] = useState<Institution>(INSTITUTIONS[0])
  const [campusId, setCampusId] = useState<string>(INSTITUTIONS[0].campuses[0].id)
  const [academicYear, setAcademicYear] = useState<string>('2025-2026')
  const [currentRole, setCurrentRole] = useState<UserRole>('principal')
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false)
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)

  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS)
  const [staffList] = useState<Staff[]>(MOCK_STAFF)
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(MOCK_ATTENDANCE)
  const [exams, setExams] = useState<ExamSession[]>(MOCK_EXAMS)
  const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequest[]>(MOCK_PURCHASE_REQUESTS)
  const [outpasses, setOutpasses] = useState<OutpassRequest[]>(MOCK_OUTPASSES)
  const [noDueRecords, setNoDueRecords] = useState<NoDueRecord[]>(MOCK_NO_DUE)
  const [circulars, setCirculars] = useState<CircularNotice[]>(MOCK_CIRCULARS)
  const [approvals, setApprovals] = useState<ApprovalWorkflowItem[]>(MOCK_APPROVALS)
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS)
  const [toasts, setToasts] = useState<ToastInfo[]>([])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const setInstitutionId = (id: string) => {
    const inst = INSTITUTIONS.find((i) => i.id === id)
    if (inst) {
      setInstitution(inst)
      setCampusId(inst.campuses[0].id)
    }
  }

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev)

  const persona: UserPersona =
    USER_PERSONAS.find((p) => p.role === currentRole) ?? USER_PERSONAS[2]

  const addStudent = (student: Omit<Student, 'id'>) => {
    const newStudent: Student = { ...student, id: `stu-${Date.now()}` }
    setStudents((prev) => [newStudent, ...prev])
    showToast(`Student ${student.name} registered successfully`, 'success')
  }

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)))
  }

  const recordAttendance = (record: Omit<AttendanceRecord, 'id'>) => {
    const newRecord: AttendanceRecord = { ...record, id: `att-${Date.now()}` }
    setAttendance((prev) => [newRecord, ...prev])
  }

  const addExam = (exam: Omit<ExamSession, 'id'>) => {
    const newExam: ExamSession = { ...exam, id: `exam-${Date.now()}` }
    setExams((prev) => [...prev, newExam])
    showToast('Exam session scheduled successfully', 'success')
  }

  const confirmExamDuty = (examId: string) => {
    setExams((prev) => prev.map((e) => (e.id === examId ? { ...e, dutyConfirmed: true } : e)))
    showToast('Invigilation duty confirmed', 'success')
  }

  const addPurchaseRequest = (pr: Omit<PurchaseRequest, 'id' | 'prNumber'>) => {
    const prNumber = `PR-2025-${String(Math.floor(Math.random() * 900) + 100).padStart(4, '0')}`
    const newPR: PurchaseRequest = { ...pr, id: `pr-${Date.now()}`, prNumber }
    setPurchaseRequests((prev) => [newPR, ...prev])
    showToast(`Purchase Request ${prNumber} submitted`, 'success')
  }

  const updatePurchaseRequestStatus = (id: string, status: PurchaseRequest['status']) => {
    setPurchaseRequests((prev) => prev.map((pr) => (pr.id === id ? { ...pr, status } : pr)))
  }

  const addOutpass = (req: Omit<OutpassRequest, 'id'>) => {
    const newOutpass: OutpassRequest = { ...req, id: `op-${Date.now()}` }
    setOutpasses((prev) => [newOutpass, ...prev])
    showToast('Outpass request submitted', 'success')
  }

  const updateOutpassStatus = (id: string, updates: Partial<OutpassRequest>) => {
    setOutpasses((prev) => prev.map((op) => (op.id === id ? { ...op, ...updates } : op)))
  }

  const toggleNoDueClearance = (studentId: string, department: keyof NoDueRecord['clearances']) => {
    setNoDueRecords((prev) =>
      prev.map((rec) => {
        if (rec.studentId !== studentId) return rec
        const newClearances = { ...rec.clearances, [department]: !rec.clearances[department] }
        const allCleared = Object.values(newClearances).every(Boolean)
        return {
          ...rec,
          clearances: newClearances,
          overallStatus: allCleared ? '100% Cleared' : 'Pending Clearance',
          completedDate: allCleared ? new Date().toISOString().split('T')[0] : undefined
        }
      })
    )
  }

  const addCircular = (circ: Omit<CircularNotice, 'id' | 'circularNo'>) => {
    const circularNo = `DPA/CIRC/2025/${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`
    const newCircular: CircularNotice = { ...circ, id: `circ-${Date.now()}`, circularNo }
    setCirculars((prev) => [newCircular, ...prev])
    showToast(`Circular ${circularNo} published successfully`, 'success')
  }

  const resolveApproval = (id: string, action: 'Approved' | 'Rejected') => {
    setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status: action } : a)))
    showToast(`Request ${action.toLowerCase()} successfully`, action === 'Approved' ? 'success' : 'info')
  }

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const showToast = (message: string, type: ToastInfo['type'] = 'info') => {
    const id = `toast-${Date.now()}`
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => dismissToast(id), 4500)
  }

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <AppContext.Provider
      value={{
        institution,
        setInstitutionId,
        campusId,
        setCampusId,
        academicYear,
        setAcademicYear,
        currentRole,
        setCurrentRole,
        persona,
        isDarkMode,
        toggleDarkMode,
        isCopilotOpen,
        setIsCopilotOpen,
        isSearchOpen,
        setIsSearchOpen,
        students,
        addStudent,
        updateStudent,
        staffList,
        attendance,
        recordAttendance,
        exams,
        addExam,
        confirmExamDuty,
        purchaseRequests,
        addPurchaseRequest,
        updatePurchaseRequestStatus,
        outpasses,
        addOutpass,
        updateOutpassStatus,
        noDueRecords,
        toggleNoDueClearance,
        circulars,
        addCircular,
        approvals,
        resolveApproval,
        notifications,
        markNotificationsAsRead,
        toasts,
        showToast,
        dismissToast
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = (): AppContextType => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
