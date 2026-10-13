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
  exceptionFlag: boolean
  exceptionReason?: string
}

export interface ExamSession {
  id: string
  code: string
  name: string
  gradeOrCourse: string
  subject: string
  date: string
  timeSession: string
  hall: string
  primaryInvigilator: string
  backupInvigilator: string
  confirmed: boolean
  status: 'Scheduled' | 'In Progress' | 'Evaluated' | 'Published'
  enrolledStudents: number
}

export interface FeeTransaction {
  id: string
  receiptNo: string
  studentId: string
  studentName: string
  gradeOrDept: string
  term: string
  category: string
  amount: number
  paymentMethod: 'UPI / NetBanking' | 'Institutional Wallet' | 'Demand Draft' | 'Challan'
  status: 'Paid' | 'Pending' | 'Overdue' | 'Exempt / Scholarship'
  date: string
}

export interface BudgetOverview {
  category: string
  allocated: number
  utilized: number
  variance: number
  status: 'Healthy' | 'Caution' | 'Overrun'
}

export interface InventoryItem {
  id: string
  code: string
  name: string
  category: string
  currentStock: number
  reorderThreshold: number
  unit: string
  location: string
  unitCost: number
  status: 'Optimal' | 'Low Stock' | 'Critical Alarm'
  supplier: string
}

export interface PurchaseRequest {
  id: string
  prNumber: string
  itemCode: string
  itemName: string
  quantity: number
  unit: string
  estimatedCost: number
  requestedBy: string
  department: string
  date: string
  status: 'Pending Approval' | 'PO Issued' | 'Goods Received' | 'Rejected'
  urgency: 'Low' | 'Medium' | 'High' | 'Emergency'
}

export interface TransportFleet {
  id: string
  vehicleNo: string
  busNumber: string
  routeName: string
  driverName: string
  driverPhone: string
  attendantName: string
  capacity: number
  onboardedCount: number
  currentLocation: string
  speedKmH: number
  fuelLevelPercent: number
  status: 'On Route' | 'At Campus' | 'Idle' | 'Maintenance'
  serviceDueInDays: number
}

export interface HostelResident {
  id: string
  studentId: string
  studentName: string
  roomNo: string
  block: string
  wardenName: string
  status: 'In Campus' | 'Outpass Approved' | 'On Weekend Leave' | 'Late Entry'
  lastMovementTime: string
  parentContact: string
}

export interface OutpassRequest {
  id: string
  studentId: string
  studentName: string
  roomNo: string
  passType: 'Day Pass' | 'Weekend Home' | 'Medical / Emergency'
  leaveDate: string
  expectedReturn: string
  reason: string
  parentAcknowledged: boolean
  wardenApproved: boolean
  gateSecurityStatus: 'Pending Verification' | 'Checked Out' | 'Returned'
}

export interface LibraryItem {
  id: string
  accessionNo: string
  isbn: string
  title: string
  author: string
  category: string
  shelfLocation: string
  status: 'Available' | 'Checked Out' | 'Overdue' | 'Misplaced / AI Flag'
  borrowerName?: string
  dueDate?: string
}

export interface NoDueRecord {
  id: string
  studentId: string
  studentName: string
  gradeOrProgram: string
  clearances: {
    library: boolean
    hostel: boolean
    accounts: boolean
    canteen: boolean
    laboratories: boolean
    idCardSurrendered: boolean
  }
  finalStatus: 'In Review' | '100% Cleared' | 'Blocked'
  submittedDate: string
}

export interface CircularNotice {
  id: string
  circularNo: string
  title: string
  category: 'Academic' | 'Administrative' | 'Events' | 'Emergency'
  targetAudience: 'All Campus' | 'Teachers & Staff' | 'Parents Only' | 'Senior Students'
  author: string
  publishedDate: string
  status: 'Draft' | 'Pending Approval' | 'Published'
  readPercentage: number
  acknowledgedCount: number
  totalRecipients: number
}

export interface ApprovalWorkflowItem {
  id: string
  type: 'No-Due / TC' | 'Procurement PO' | 'Hostel Outpass' | 'Special Class' | 'Exam Substitute' | 'Budget Override' | 'Circular Publishing'
  title: string
  requester: string
  department: string
  date: string
  slaHoursLeft: number
  status: 'Pending' | 'Approved' | 'Escalated' | 'Rejected'
  details: Record<string, any>
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  category: 'Attendance' | 'Fees' | 'Approvals' | 'Transport' | 'Exams' | 'Security'
  priority: 'Critical' | 'Warning' | 'Info'
  timestamp: string
  read: boolean
  link?: string
}
