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
  // Multitenancy & Profile
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

  // AI & Global UI
  isCopilotOpen: boolean
  setIsCopilotOpen: (open: boolean) => void
  isSearchOpen: boolean
  setIsSearchOpen: (open: boolean) => void

  // State entities & Mutations
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

  // Toast
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

  // Interactive Live Data Sets
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

  const persona = USER_PERSONAS.find((p) => p.role === currentRole) || USER_PERSONAS[2]

  useEffect(() => {
    // Explicitly enforce clean light theme
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev
      showToast(next ? 'Dark Mode Enabled' : 'Light Mode Enabled', 'info')
      return next
    })
  }

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = 'toast-' + Date.now() + Math.random().toString(36).substring(2, 5)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      dismissToast(id)
    }, 4000)
  }

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const setInstitutionId = (id: string) => {
    const inst = INSTITUTIONS.find((i) => i.id === id) || INSTITUTIONS[0]
    setInstitution(inst)
    setCampusId(inst.campuses[0].id)
    showToast(`Switched workspace tenant to ${inst.name}`, 'info')
  }

  // Workflow Handlers
  const addStudent = (studentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...studentData,
      id: `stu-${Date.now()}`
    }
    setStudents((prev) => [newStudent, ...prev])
    showToast(`Student ${newStudent.name} enrolled and ID ${newStudent.regNo} issued!`, 'success')
  }

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)))
    showToast('Student record updated successfully', 'info')
  }

  const recordAttendance = (recordData: Omit<AttendanceRecord, 'id'>) => {
    const newRecord: AttendanceRecord = {
      ...recordData,
      id: `att-${Date.now()}`
    }
    setAttendance((prev) => [newRecord, ...prev])
    if (newRecord.status === 'Absent' || newRecord.exceptionFlag) {
      showToast(`Attendance recorded with automated parent notification flagged.`, 'warning')
    } else {
      showToast(`Attendance logged via ${newRecord.mode}`, 'success')
    }
  }

  const addExam = (examData: Omit<ExamSession, 'id'>) => {
    const newExam: ExamSession = {
      ...examData,
      id: `ex-${Date.now()}`
    }
    setExams((prev) => [...prev, newExam])
    showToast(`Exam session "${newExam.name}" scheduled and hall allocated!`, 'success')
  }

  const confirmExamDuty = (examId: string) => {
    setExams((prev) =>
      prev.map((e) => (e.id === examId ? { ...e, confirmed: true } : e))
    )
    showToast('Invigilation duty confirmed by faculty.', 'success')
  }

  const addPurchaseRequest = (prData: Omit<PurchaseRequest, 'id' | 'prNumber'>) => {
    const prNumber = `PO-2026-${Math.floor(1000 + Math.random() * 9000)}`
    const newPr: PurchaseRequest = {
      ...prData,
      id: `pr-${Date.now()}`,
      prNumber
    }
    setPurchaseRequests((prev) => [newPr, ...prev])
    setApprovals((prev) => [
      {
        id: `appr-${Date.now()}`,
        type: 'Procurement PO',
        title: `Purchase Order: ${newPr.itemName}`,
        requester: newPr.requestedBy,
        department: newPr.department,
        date: 'Just now',
        slaHoursLeft: 24,
        status: 'Pending',
        details: {
          prNumber: newPr.prNumber,
          cost: `₹${newPr.estimatedCost.toLocaleString('en-IN')}`,
          quantity: `${newPr.quantity} ${newPr.unit}`
        }
      },
      ...prev
    ])
    showToast(`Purchase Request ${prNumber} created & sent for workflow approval!`, 'success')
  }

  const updatePurchaseRequestStatus = (id: string, status: PurchaseRequest['status']) => {
    setPurchaseRequests((prev) => prev.map((pr) => (pr.id === id ? { ...pr, status } : pr)))
    showToast(`PO status updated to: ${status}`, 'info')
  }

  const addOutpass = (reqData: Omit<OutpassRequest, 'id'>) => {
    const newPass: OutpassRequest = {
      ...reqData,
      id: `out-${Date.now()}`
    }
    setOutpasses((prev) => [newPass, ...prev])
    showToast('Hostel outpass submitted. Parent SMS authorization sent.', 'info')
  }

  const updateOutpassStatus = (id: string, updates: Partial<OutpassRequest>) => {
    setOutpasses((prev) => prev.map((op) => (op.id === id ? { ...op, ...updates } : op)))
    showToast('Outpass status updated successfully', 'success')
  }

  const toggleNoDueClearance = (studentId: string, department: keyof NoDueRecord['clearances']) => {
    setNoDueRecords((prev) =>
      prev.map((rec) => {
        if (rec.studentId !== studentId) return rec
        const updatedClearances = {
          ...rec.clearances,
          [department]: !rec.clearances[department]
        }
        const allCleared = Object.values(updatedClearances).every(Boolean)
        return {
          ...rec,
          clearances: updatedClearances,
          finalStatus: allCleared ? '100% Cleared' : 'In Review'
        }
      })
    )
    showToast(`Department clearance updated for ${department}`, 'info')
  }

  const addCircular = (circData: Omit<CircularNotice, 'id' | 'circularNo'>) => {
    const circularNo = `CIR/2026/GEN/${Math.floor(100 + Math.random() * 900)}`
    const newCircular: CircularNotice = {
      ...circData,
      id: `cir-${Date.now()}`,
      circularNo
    }
    setCirculars((prev) => [newCircular, ...prev])
    showToast(`Circular ${circularNo} published to ${newCircular.targetAudience}!`, 'success')
  }

  const resolveApproval = (id: string, action: 'Approved' | 'Rejected') => {
    setApprovals((prev) => prev.map((a) => (a.id === id ? { ...a, status: action } : a)))
    showToast(`Workflow task ${action}! Audit record generated.`, action === 'Approved' ? 'success' : 'warning')
  }

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
    showToast('All notifications marked as read', 'info')
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

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
