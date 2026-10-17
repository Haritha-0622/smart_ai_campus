// ─── Module 16: Hostel Management — Focused Data ────────────────────────────
// Scope: Permission Requests · Visitor Management · Wallet/Cashless · AI Alerts

// ── Types ────────────────────────────────────────────────────────────────────

export type PermissionStatus = 'Pending Parent Ack' | 'Approved' | 'Active' | 'Completed' | 'Rejected'
export type PermissionType = 'Day Leave' | 'Weekend Leave' | 'Overnight Leave' | 'Medical Leave' | 'Emergency Leave'
export type VisitorStatus = 'Pre-Registered' | 'Checked In' | 'Checked Out' | 'Rejected'
export type WalletTxType = 'Credit' | 'Debit'

// ── Interfaces ───────────────────────────────────────────────────────────────

export interface PermissionRequest {
  id: string
  studentName: string
  regNo: string
  grade: string
  hostelBlock: string
  roomNo: string
  type: PermissionType
  reason: string
  destination: string
  requestedBy: 'Student' | 'Warden'
  requestDate: string
  exitDate: string
  expectedReturn: string
  actualReturn?: string
  parentName: string
  parentContact: string
  parentAcknowledged: boolean
  parentAckAt?: string
  wardenApproved?: boolean
  status: PermissionStatus
  gatePassCode?: string
  photoAttached: boolean
  notes?: string
}

export interface VisitorRecord {
  id: string
  visitorName: string
  visitorPhone: string
  visitorRelation: string
  studentName: string
  regNo: string
  hostelBlock: string
  visitDate: string
  visitPurpose: string
  parentApprovalRequired: boolean
  parentApproved?: boolean
  parentApprovedBy?: string
  status: VisitorStatus
  checkInTime?: string
  checkOutTime?: string
  photoAttached: boolean
  passCode?: string
  approvedBy?: string
}

export interface WalletAccount {
  studentId: string
  studentName: string
  regNo: string
  grade: string
  hostelBlock: string
  parentName: string
  parentContact: string
  balance: number
  lowBalanceThreshold: number
  lastTopUp: string
  lastTopUpAmount: number
  transactions: WalletTransaction[]
}

export interface WalletTransaction {
  id: string
  date: string
  time: string
  type: WalletTxType
  amount: number
  description: string
  balance: number
  category: 'Top-up' | 'Canteen' | 'Hostel Service' | 'Library' | 'Stationery' | 'Other'
}

export interface AuditLog {
  id: string
  timestamp: string
  actor: string
  actorRole: string
  action: string
  entity: string
  entityId: string
  detail: string
  module: 'Permission' | 'Visitor' | 'Wallet' | 'System'
}

export interface AIAlert {
  id: string
  type: 'anomaly' | 'reminder' | 'summary'
  severity: 'info' | 'warning' | 'critical'
  title: string
  detail: string
  timestamp: string
  dismissed: boolean
  relatedStudents?: string[]
}

// ── Permission Requests ───────────────────────────────────────────────────────

export const PERMISSION_REQUESTS: PermissionRequest[] = [
  {
    id: 'PR-001',
    studentName: 'Divya Nair',
    regNo: 'DPA2024081',
    grade: 'Class XI-A',
    hostelBlock: 'Kaveri Block (Girls)',
    roomNo: 'K-204',
    type: 'Weekend Leave',
    reason: 'Sister\'s wedding ceremony in Chennai',
    destination: 'Chennai, Tamil Nadu',
    requestedBy: 'Student',
    requestDate: '2025-10-14',
    exitDate: '2025-10-18',
    expectedReturn: '2025-10-20',
    parentName: 'Meena Nair',
    parentContact: '+91 98401 11223',
    parentAcknowledged: false,
    wardenApproved: undefined,
    status: 'Pending Parent Ack',
    photoAttached: true,
    notes: 'Wedding invitation attached as photo',
  },
  {
    id: 'PR-002',
    studentName: 'Arjun Menon',
    regNo: 'DPA2024034',
    grade: 'Class XII-B',
    hostelBlock: 'Godavari Block (Boys)',
    roomNo: 'G-110',
    type: 'Medical Leave',
    reason: 'Dental extraction follow-up at Apollo Hospitals',
    destination: 'Apollo Hospitals, Greams Road',
    requestedBy: 'Warden',
    requestDate: '2025-10-15',
    exitDate: '2025-10-15',
    expectedReturn: '2025-10-15',
    parentName: 'Suresh Menon',
    parentContact: '+91 94440 22334',
    parentAcknowledged: true,
    parentAckAt: '2025-10-15T09:12:00',
    wardenApproved: true,
    status: 'Active',
    gatePassCode: 'GP-2025-A002',
    photoAttached: false,
  },
  {
    id: 'PR-003',
    studentName: 'Priya Sharma',
    regNo: 'DPA2024056',
    grade: 'Class X-C',
    hostelBlock: 'Kaveri Block (Girls)',
    roomNo: 'K-118',
    type: 'Day Leave',
    reason: 'College application interview at a university open day',
    destination: 'Anna University Campus, Guindy',
    requestedBy: 'Student',
    requestDate: '2025-10-13',
    exitDate: '2025-10-16',
    expectedReturn: '2025-10-16',
    parentName: 'Rekha Sharma',
    parentContact: '+91 73580 33445',
    parentAcknowledged: true,
    parentAckAt: '2025-10-13T20:45:00',
    wardenApproved: true,
    status: 'Completed',
    actualReturn: '2025-10-16',
    gatePassCode: 'GP-2025-A003',
    photoAttached: false,
  },
  {
    id: 'PR-004',
    studentName: 'Karthik Rajan',
    regNo: 'DPA2024072',
    grade: 'Class XI-C',
    hostelBlock: 'Godavari Block (Boys)',
    roomNo: 'G-205',
    type: 'Overnight Leave',
    reason: 'Family festival — Karthigai Deepam at ancestral home',
    destination: 'Tiruvannamalai, Tamil Nadu',
    requestedBy: 'Student',
    requestDate: '2025-10-15',
    exitDate: '2025-10-25',
    expectedReturn: '2025-10-26',
    parentName: 'Vijaya Rajan',
    parentContact: '+91 90000 44556',
    parentAcknowledged: false,
    status: 'Pending Parent Ack',
    photoAttached: false,
  },
  {
    id: 'PR-005',
    studentName: 'Anitha Krishnan',
    regNo: 'DPA2024019',
    grade: 'Class XII-A',
    hostelBlock: 'Kaveri Block (Girls)',
    roomNo: 'K-301',
    type: 'Emergency Leave',
    reason: 'Grandmother hospitalised — critical condition',
    destination: 'AIIMS, New Delhi',
    requestedBy: 'Warden',
    requestDate: '2025-10-16',
    exitDate: '2025-10-16',
    expectedReturn: '2025-10-19',
    parentName: 'Rajesh Krishnan',
    parentContact: '+91 98110 55667',
    parentAcknowledged: true,
    parentAckAt: '2025-10-16T06:30:00',
    wardenApproved: true,
    status: 'Active',
    gatePassCode: 'GP-2025-A005',
    photoAttached: true,
    notes: 'Hospital admission letter photo uploaded',
  },
  {
    id: 'PR-006',
    studentName: 'Rahul Iyer',
    regNo: 'DPA2024088',
    grade: 'Class X-A',
    hostelBlock: 'Godavari Block (Boys)',
    roomNo: 'G-102',
    type: 'Weekend Leave',
    reason: 'Father\'s birthday — family celebration',
    destination: 'Coimbatore, Tamil Nadu',
    requestedBy: 'Student',
    requestDate: '2025-10-12',
    exitDate: '2025-10-13',
    expectedReturn: '2025-10-14',
    parentName: 'Anand Iyer',
    parentContact: '+91 88800 66778',
    parentAcknowledged: true,
    parentAckAt: '2025-10-12T19:20:00',
    wardenApproved: false,
    status: 'Rejected',
    photoAttached: false,
    notes: 'Warden denied: academic test on Mon 14 Oct',
  },
]

// ── Visitor Records ───────────────────────────────────────────────────────────

export const VISITOR_RECORDS: VisitorRecord[] = [
  {
    id: 'VIS-001',
    visitorName: 'Meena Nair',
    visitorPhone: '+91 98401 11223',
    visitorRelation: 'Mother',
    studentName: 'Divya Nair',
    regNo: 'DPA2024081',
    hostelBlock: 'Kaveri Block (Girls)',
    visitDate: '2025-10-14',
    visitPurpose: 'Drop off clothing and medicines before weekend leave',
    parentApprovalRequired: false,
    status: 'Checked Out',
    checkInTime: '11:00',
    checkOutTime: '12:30',
    photoAttached: true,
    passCode: 'VIS-PASS-001',
    approvedBy: 'Warden Santha',
  },
  {
    id: 'VIS-002',
    visitorName: 'Rohan Patel',
    visitorPhone: '+91 97002 33445',
    visitorRelation: 'Friend (External)',
    studentName: 'Arjun Menon',
    regNo: 'DPA2024034',
    hostelBlock: 'Godavari Block (Boys)',
    visitDate: '2025-10-16',
    visitPurpose: 'Return borrowed notes',
    parentApprovalRequired: true,
    parentApproved: false,
    status: 'Rejected',
    photoAttached: false,
    approvedBy: undefined,
  },
  {
    id: 'VIS-003',
    visitorName: 'Rajesh Krishnan',
    visitorPhone: '+91 98110 55667',
    visitorRelation: 'Father',
    studentName: 'Anitha Krishnan',
    regNo: 'DPA2024019',
    hostelBlock: 'Kaveri Block (Girls)',
    visitDate: '2025-10-16',
    visitPurpose: 'Collect student for emergency travel',
    parentApprovalRequired: false,
    status: 'Checked In',
    checkInTime: '07:00',
    photoAttached: true,
    passCode: 'VIS-PASS-003',
    approvedBy: 'Warden Santha',
  },
  {
    id: 'VIS-004',
    visitorName: 'Suresh Menon',
    visitorPhone: '+91 94440 22334',
    visitorRelation: 'Father',
    studentName: 'Arjun Menon',
    regNo: 'DPA2024034',
    hostelBlock: 'Godavari Block (Boys)',
    visitDate: '2025-10-15',
    visitPurpose: 'Accompany student to hospital appointment',
    parentApprovalRequired: false,
    status: 'Checked Out',
    checkInTime: '09:00',
    checkOutTime: '14:00',
    photoAttached: false,
    passCode: 'VIS-PASS-004',
    approvedBy: 'Warden Kumar',
  },
  {
    id: 'VIS-005',
    visitorName: 'Rekha Sharma',
    visitorPhone: '+91 73580 33445',
    visitorRelation: 'Mother',
    studentName: 'Priya Sharma',
    regNo: 'DPA2024056',
    hostelBlock: 'Kaveri Block (Girls)',
    visitDate: '2025-10-17',
    visitPurpose: 'Monthly visit + delivering home-cooked food',
    parentApprovalRequired: false,
    status: 'Pre-Registered',
    photoAttached: false,
    approvedBy: undefined,
  },
]

// ── Wallet Accounts ───────────────────────────────────────────────────────────

export const WALLET_ACCOUNTS: WalletAccount[] = [
  {
    studentId: 'STU-081',
    studentName: 'Divya Nair',
    regNo: 'DPA2024081',
    grade: 'Class XI-A',
    hostelBlock: 'Kaveri Block (Girls)',
    parentName: 'Meena Nair',
    parentContact: '+91 98401 11223',
    balance: 1240,
    lowBalanceThreshold: 500,
    lastTopUp: '2025-10-10',
    lastTopUpAmount: 2000,
    transactions: [
      { id: 'TXN-001', date: '2025-10-10', time: '10:30', type: 'Credit', amount: 2000, description: 'Parent top-up via UPI', balance: 3240, category: 'Top-up' },
      { id: 'TXN-002', date: '2025-10-11', time: '13:15', type: 'Debit', amount: 85, description: 'Canteen lunch — rice & dal', balance: 3155, category: 'Canteen' },
      { id: 'TXN-003', date: '2025-10-12', time: '08:00', type: 'Debit', amount: 60, description: 'Canteen breakfast — idli & sambar', balance: 3095, category: 'Canteen' },
      { id: 'TXN-004', date: '2025-10-13', time: '14:20', type: 'Debit', amount: 320, description: 'Hostel laundry service — Oct batch', balance: 2775, category: 'Hostel Service' },
      { id: 'TXN-005', date: '2025-10-14', time: '11:00', type: 'Debit', amount: 45, description: 'Canteen snack — tea & biscuits', balance: 2730, category: 'Canteen' },
      { id: 'TXN-006', date: '2025-10-15', time: '09:30', type: 'Debit', amount: 990, description: 'Stationery — exam supplies set', balance: 1740, category: 'Stationery' },
      { id: 'TXN-007', date: '2025-10-16', time: '07:45', type: 'Debit', amount: 500, description: 'Library resource access fee — Oct', balance: 1240, category: 'Library' },
    ],
  },
  {
    studentId: 'STU-034',
    studentName: 'Arjun Menon',
    regNo: 'DPA2024034',
    grade: 'Class XII-B',
    hostelBlock: 'Godavari Block (Boys)',
    parentName: 'Suresh Menon',
    parentContact: '+91 94440 22334',
    balance: 380,
    lowBalanceThreshold: 500,
    lastTopUp: '2025-10-05',
    lastTopUpAmount: 1500,
    transactions: [
      { id: 'TXN-011', date: '2025-10-05', time: '16:00', type: 'Credit', amount: 1500, description: 'Parent top-up via net banking', balance: 2300, category: 'Top-up' },
      { id: 'TXN-012', date: '2025-10-06', time: '13:00', type: 'Debit', amount: 90, description: 'Canteen lunch', balance: 2210, category: 'Canteen' },
      { id: 'TXN-013', date: '2025-10-08', time: '08:10', type: 'Debit', amount: 65, description: 'Canteen breakfast', balance: 2145, category: 'Canteen' },
      { id: 'TXN-014', date: '2025-10-10', time: '19:00', type: 'Debit', amount: 1765, description: 'Hostel monthly fee deduction — Oct', balance: 380, category: 'Hostel Service' },
    ],
  },
  {
    studentId: 'STU-056',
    studentName: 'Priya Sharma',
    regNo: 'DPA2024056',
    grade: 'Class X-C',
    hostelBlock: 'Kaveri Block (Girls)',
    parentName: 'Rekha Sharma',
    parentContact: '+91 73580 33445',
    balance: 2750,
    lowBalanceThreshold: 500,
    lastTopUp: '2025-10-12',
    lastTopUpAmount: 3000,
    transactions: [
      { id: 'TXN-021', date: '2025-10-12', time: '11:00', type: 'Credit', amount: 3000, description: 'Parent top-up via UPI', balance: 3570, category: 'Top-up' },
      { id: 'TXN-022', date: '2025-10-13', time: '13:00', type: 'Debit', amount: 80, description: 'Canteen lunch', balance: 3490, category: 'Canteen' },
      { id: 'TXN-023', date: '2025-10-14', time: '17:30', type: 'Debit', amount: 740, description: 'Hostel laundry + ironing service', balance: 2750, category: 'Hostel Service' },
    ],
  },
]

// ── Audit Log ────────────────────────────────────────────────────────────────

export const AUDIT_LOG: AuditLog[] = [
  { id: 'AUD-001', timestamp: '2025-10-16T07:05:22', actor: 'Warden Santha', actorRole: 'Warden', action: 'Approved Visitor Pass', entity: 'VisitorRecord', entityId: 'VIS-003', detail: 'Approved father Rajesh Krishnan to collect Anitha Krishnan for emergency travel.', module: 'Visitor' },
  { id: 'AUD-002', timestamp: '2025-10-16T06:31:00', actor: 'System', actorRole: 'Automated', action: 'Parent SMS Dispatched', entity: 'PermissionRequest', entityId: 'PR-005', detail: 'Emergency leave request for Anitha Krishnan — parent Rajesh Krishnan notified via SMS and app push.', module: 'Permission' },
  { id: 'AUD-003', timestamp: '2025-10-16T06:30:15', actor: 'Warden Kumar', actorRole: 'Warden', action: 'Created Permission Request', entity: 'PermissionRequest', entityId: 'PR-005', detail: 'Emergency leave raised on behalf of student Anitha Krishnan. Photo of hospital letter uploaded.', module: 'Permission' },
  { id: 'AUD-004', timestamp: '2025-10-15T09:12:00', actor: 'Suresh Menon', actorRole: 'Parent', action: 'Acknowledged Permission Request', entity: 'PermissionRequest', entityId: 'PR-002', detail: 'Parent acknowledged and approved medical leave for Arjun Menon via parent portal.', module: 'Permission' },
  { id: 'AUD-005', timestamp: '2025-10-15T08:55:00', actor: 'Warden Kumar', actorRole: 'Warden', action: 'Approved Permission Request', entity: 'PermissionRequest', entityId: 'PR-002', detail: 'Medical leave approved. Gate pass GP-2025-A002 generated for Arjun Menon.', module: 'Permission' },
  { id: 'AUD-006', timestamp: '2025-10-14T11:00:00', actor: 'Warden Santha', actorRole: 'Warden', action: 'Approved Visitor Pass', entity: 'VisitorRecord', entityId: 'VIS-001', detail: 'Mother Meena Nair checked in to Kaveri Block.', module: 'Visitor' },
  { id: 'AUD-007', timestamp: '2025-10-14T12:30:00', actor: 'Warden Santha', actorRole: 'Warden', action: 'Visitor Checked Out', entity: 'VisitorRecord', entityId: 'VIS-001', detail: 'Meena Nair checked out from Kaveri Block after 90-minute visit.', module: 'Visitor' },
  { id: 'AUD-008', timestamp: '2025-10-13T20:45:00', actor: 'Rekha Sharma', actorRole: 'Parent', action: 'Acknowledged Permission Request', entity: 'PermissionRequest', entityId: 'PR-003', detail: 'Parent acknowledged day leave for Priya Sharma via parent portal.', module: 'Permission' },
  { id: 'AUD-009', timestamp: '2025-10-12T19:20:00', actor: 'Anand Iyer', actorRole: 'Parent', action: 'Acknowledged Permission Request', entity: 'PermissionRequest', entityId: 'PR-006', detail: 'Parent acknowledged weekend leave request for Rahul Iyer.', module: 'Permission' },
  { id: 'AUD-010', timestamp: '2025-10-12T20:00:00', actor: 'Warden Kumar', actorRole: 'Warden', action: 'Rejected Permission Request', entity: 'PermissionRequest', entityId: 'PR-006', detail: 'Warden denied weekend leave for Rahul Iyer due to Monday academic test.', module: 'Permission' },
  { id: 'AUD-011', timestamp: '2025-10-10T10:30:00', actor: 'Meena Nair', actorRole: 'Parent', action: 'Wallet Top-up', entity: 'WalletAccount', entityId: 'STU-081', detail: 'Parent topped up Divya Nair\'s wallet with ₹2,000 via UPI.', module: 'Wallet' },
  { id: 'AUD-012', timestamp: '2025-10-16T08:00:00', actor: 'System', actorRole: 'Automated', action: 'Low Balance Alert Sent', entity: 'WalletAccount', entityId: 'STU-034', detail: 'Arjun Menon\'s wallet balance (₹380) fell below threshold of ₹500. Parent Suresh Menon notified.', module: 'Wallet' },
]

// ── AI Alerts ────────────────────────────────────────────────────────────────

export const AI_ALERTS: AIAlert[] = [
  {
    id: 'AI-001',
    type: 'reminder',
    severity: 'warning',
    title: 'Pending Parent Acknowledgement — 2 Requests',
    detail: 'Permission requests PR-001 (Divya Nair, Weekend Leave) and PR-004 (Karthik Rajan, Overnight Leave) have been awaiting parent acknowledgement for more than 12 hours. Automated reminder SMS dispatched. Manual follow-up recommended.',
    timestamp: '2025-10-16T07:00:00',
    dismissed: false,
    relatedStudents: ['Divya Nair', 'Karthik Rajan'],
  },
  {
    id: 'AI-002',
    type: 'anomaly',
    severity: 'critical',
    title: 'Visitor Anomaly Detected — Non-Family External Visitor',
    detail: 'Rohan Patel (Friend, non-family) attempted to visit Arjun Menon (Godavari Block) without parent pre-approval. The visit was rejected. Configurable rule: External non-family visitors require parent approval 24h in advance.',
    timestamp: '2025-10-16T09:30:00',
    dismissed: false,
    relatedStudents: ['Arjun Menon'],
  },
  {
    id: 'AI-003',
    type: 'summary',
    severity: 'info',
    title: 'Weekly Hostel Occupancy & Exception Summary',
    detail: 'Week of 14–20 Oct 2025: Kaveri Block (Girls) — 96% occupied, 3 active permissions, 2 visitor passes. Godavari Block (Boys) — 91% occupied, 2 active permissions, 1 visitor pass. 1 overdue return not yet flagged. 2 wallet accounts below threshold.',
    timestamp: '2025-10-14T08:00:00',
    dismissed: false,
  },
  {
    id: 'AI-004',
    type: 'anomaly',
    severity: 'warning',
    title: 'Low Wallet Balance — Arjun Menon',
    detail: 'Arjun Menon\'s cashless campus wallet balance is ₹380, below the configured threshold of ₹500. Student may be unable to make canteen or hostel service payments. Parent Suresh Menon has been notified via SMS.',
    timestamp: '2025-10-16T08:00:00',
    dismissed: false,
    relatedStudents: ['Arjun Menon'],
  },
  {
    id: 'AI-005',
    type: 'reminder',
    severity: 'info',
    title: 'Recurring Visitor Policy Reminder',
    detail: 'Rekha Sharma (Mother of Priya Sharma) has a pre-registered visit scheduled for 2025-10-17. All visitor check-in photos should be captured at the gate per institutional policy.',
    timestamp: '2025-10-16T18:00:00',
    dismissed: true,
    relatedStudents: ['Priya Sharma'],
  },
]
