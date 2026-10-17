export type InstitutionType = 'school' | 'college'

export type UserRole =
  | 'super_admin'
  | 'correspondent'
  | 'principal'
  | 'admin'
  | 'teacher'
  | 'student'
  | 'parent'
  | 'hr'
  | 'finance'
  | 'stores'
  | 'librarian'
  | 'hostel'
  | 'canteen'
  | 'transport'
  | 'vendor'

export interface Institution {
  id: string
  name: string
  type: InstitutionType
  code: string
  boardOrUniversity: string
  campuses: { id: string; name: string; location: string }[]
  academicYears: string[]
  currentYear: string
  currency: string
  studentCount: number
  staffCount: number
  tagline: string
}

export interface UserPersona {
  id: string
  role: UserRole
  name: string
  title: string
  department: string
  email: string
  avatar: string
  institutionId: string
  campusId: string
  badgeColor: string
}

export interface Student {
  id: string
  regNo: string
  name: string
  gradeOrDept: string
  sectionOrSem: string
  category: 'Day Scholar' | 'Hosteller'
  rfidTag: string
  parentName: string
  parentPhone: string
  parentEmail: string
  busRoute?: string
  busStop?: string
  hostelBlock?: string
  hostelRoom?: string
  walletBalance: number
  attendanceRate: number
  feeTotal: number
  feePaid: number
  feePending: number
  libraryBooksCount: number
  noDueStatus: 'Not Initiated' | 'Pending Clearance' | '100% Cleared'
  academicGrade: string
  status: 'Active' | 'On Leave' | 'Suspended' | 'Alumni'
  avatar: string
}

export interface Staff {
  id: string
  empNo: string
  name: string
  department: string
  role: string
  designation: string
  email: string
  phone: string
  qualification: string
  joinDate: string
  status: 'Active' | 'On Leave' | 'Probation'
  teachingLoadHours: number
  assignedClasses: string[]
  biometricId: string
}

export interface AttendanceRecord {
  id: string
  entityId: string
  entityName: string
  type: 'student' | 'staff'
  date: string
  time: string
  status: 'Present' | 'Late' | 'Absent' | 'Excused'
  mode: 'RFID Reader' | 'Biometric' | 'Manual Override'
  readerId: string
  location: string
}

export interface ExamSession {
  id: string
  subject: string
  gradeOrDept: string
  date: string
  startTime: string
  endTime: string
  venue: string
  invigilator: string
  invigilatorId: string
  dutyConfirmed: boolean
  totalStudents: number
  status: 'Scheduled' | 'Ongoing' | 'Completed'
}

export interface FeeTransaction {
  id: string
  studentId: string
  studentName: string
  regNo: string
  amount: number
  type: string
  date: string
  method: 'Cash' | 'Online' | 'DD' | 'Cheque'
  status: 'Paid' | 'Pending' | 'Overdue'
  receiptNo: string
}

export interface BudgetOverview {
  head: string
  allocated: number
  utilized: number
  remaining: number
  status: 'Healthy' | 'Warning' | 'Overrun'
}

export interface InventoryItem {
  id: string
  name: string
  category: string
  currentStock: number
  minimumStock: number
  unit: string
  location: string
  lastRestocked: string
  status: 'Adequate' | 'Low Stock' | 'Critical' | 'Out of Stock'
}

export interface PurchaseRequest {
  id: string
  prNumber: string
  item: string
  category: string
  quantity: number
  estimatedCost: number
  requestedBy: string
  department: string
  date: string
  status: 'Pending' | 'Approved' | 'Rejected' | 'Ordered' | 'Received'
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  notes?: string
}

export interface TransportFleet {
  id: string
  busNo: string
  route: string
  driver: string
  driverPhone: string
  capacity: number
  currentRiders: number
  status: 'On Route' | 'At School' | 'Delayed' | 'Breakdown' | 'Off Duty'
  lastLocation: string
  eta: string
  speed: number
}

export interface HostelResident {
  id: string
  studentId: string
  studentName: string
  regNo: string
  block: string
  room: string
  bed: string
  checkInDate: string
  parentContact: string
  status: 'Resident' | 'Home Leave' | 'Medical Leave'
}

export interface OutpassRequest {
  id: string
  studentId: string
  studentName: string
  regNo: string
  reason: string
  destination: string
  exitTime: string
  expectedReturn: string
  actualReturn?: string
  approvedBy?: string
  status: 'Pending' | 'Approved' | 'Rejected' | 'Returned' | 'Overdue'
  requestDate: string
}

export interface LibraryItem {
  id: string
  title: string
  author: string
  isbn: string
  category: string
  totalCopies: number
  availableCopies: number
  borrowedBy?: string
  dueDate?: string
  status: 'Available' | 'Borrowed' | 'Reserved' | 'Lost'
}

export interface NoDueRecord {
  id: string
  studentId: string
  studentName: string
  regNo: string
  gradeOrDept: string
  clearances: {
    library: boolean
    hostel: boolean
    finance: boolean
    sports: boolean
    laboratory: boolean
    transport: boolean
    canteen: boolean
  }
  overallStatus: 'Not Initiated' | 'Pending Clearance' | '100% Cleared'
  initiatedDate?: string
  completedDate?: string
}

export interface CircularNotice {
  id: string
  circularNo: string
  title: string
  content: string
  audience: string[]
  issuedBy: string
  issuedDate: string
  priority: 'Routine' | 'Important' | 'Urgent'
  attachments?: string[]
}

export interface ApprovalWorkflowItem {
  id: string
  type: string
  title: string
  requestedBy: string
  department: string
  date: string
  amount?: number
  status: 'Pending' | 'Approved' | 'Rejected'
  priority: 'Low' | 'Medium' | 'High'
  description: string
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  timestamp: string
  read: boolean
  actionPath?: string
}
