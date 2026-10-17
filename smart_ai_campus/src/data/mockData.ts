import {
  Student,
  Staff,
  AttendanceRecord,
  ExamSession,
  FeeTransaction,
  BudgetOverview,
  InventoryItem,
  PurchaseRequest,
  TransportFleet,
  HostelResident,
  OutpassRequest,
  LibraryItem,
  NoDueRecord,
  CircularNotice,
  ApprovalWorkflowItem,
  NotificationItem
} from '../types'

export const MOCK_STUDENTS: Student[] = [
  {
    id: 'stu-01',
    regNo: 'SAC-2025-0842',
    name: 'Rohan S. Krishna',
    gradeOrDept: 'Grade 11-A (Science)',
    sectionOrSem: 'Section A / Term 2',
    category: 'Hosteller',
    rfidTag: 'RFID-9942-881',
    parentName: 'S. K. Subramanian',
    parentPhone: '+91 98401 23456',
    parentEmail: 'subramanian.sk@gmail.com',
    busRoute: 'Route 04 (South Green Line)',
    busStop: 'Stop 07 - Hauz Khas Metro',
    hostelBlock: 'Block B (Kaveri Hall)',
    hostelRoom: 'Room 304 (Bed 2)',
    walletBalance: 3450,
    attendanceRate: 94.2,
    feeTotal: 145000,
    feePaid: 132500,
    feePending: 12500,
    libraryBooksCount: 2,
    noDueStatus: 'Pending Clearance',
    academicGrade: 'A1 (92.4%)',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'stu-02',
    regNo: 'SAC-2025-0843',
    name: 'Ananya Varma',
    gradeOrDept: 'Grade 11-A (Science)',
    sectionOrSem: 'Section A / Term 2',
    category: 'Day Scholar',
    rfidTag: 'RFID-9942-882',
    parentName: 'Col. Vikram Varma',
    parentPhone: '+91 98402 34567',
    parentEmail: 'v.varma@gmail.com',
    busRoute: 'Route 02 (North Express)',
    busStop: 'Stop 03 - Vasant Vihar Market',
    walletBalance: 1200,
    attendanceRate: 97.8,
    feeTotal: 145000,
    feePaid: 145000,
    feePending: 0,
    libraryBooksCount: 1,
    noDueStatus: '100% Cleared',
    academicGrade: 'A1 (96.5%)',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'stu-03',
    regNo: 'SAC-2025-0844',
    name: 'Karthik Raja',
    gradeOrDept: 'Grade 12-B (Commerce)',
    sectionOrSem: 'Section B / Term 2',
    category: 'Day Scholar',
    rfidTag: 'RFID-9942-883',
    parentName: 'M. Rajasekaran',
    parentPhone: '+91 98403 45678',
    parentEmail: 'm.rajasekaran@rediffmail.com',
    busRoute: 'Route 06 (East Circular)',
    busStop: 'Stop 11 - Mayur Vihar Phase 1',
    walletBalance: 850,
    attendanceRate: 88.5,
    feeTotal: 135000,
    feePaid: 95000,
    feePending: 40000,
    libraryBooksCount: 0,
    noDueStatus: 'Not Initiated',
    academicGrade: 'B1 (78.2%)',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'stu-04',
    regNo: 'SAC-2025-0845',
    name: 'Priya Sharma',
    gradeOrDept: 'Grade 10-C (Foundations)',
    sectionOrSem: 'Section C / Term 2',
    category: 'Day Scholar',
    rfidTag: 'RFID-9942-884',
    parentName: 'Deepak Sharma',
    parentPhone: '+91 98404 56789',
    parentEmail: 'd.sharma@outlook.com',
    busRoute: 'Route 04 (South Green Line)',
    busStop: 'Stop 05 - Green Park Metro',
    walletBalance: 2100,
    attendanceRate: 98.2,
    feeTotal: 120000,
    feePaid: 120000,
    feePending: 0,
    libraryBooksCount: 3,
    noDueStatus: '100% Cleared',
    academicGrade: 'A1 (94.8%)',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'stu-05',
    regNo: 'SAC-2025-0846',
    name: 'Divya Nair',
    gradeOrDept: 'Grade 12-A (Science)',
    sectionOrSem: 'Section A / Term 2',
    category: 'Hosteller',
    rfidTag: 'RFID-9942-885',
    parentName: 'R. K. Nair',
    parentPhone: '+91 98405 67890',
    parentEmail: 'rknair@keralabio.in',
    hostelBlock: 'Block D (Yamuna Hall)',
    hostelRoom: 'Room 214 (Bed 1)',
    walletBalance: 4200,
    attendanceRate: 91.0,
    feeTotal: 165000,
    feePaid: 140000,
    feePending: 25000,
    libraryBooksCount: 1,
    noDueStatus: 'Pending Clearance',
    academicGrade: 'A2 (89.0%)',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'stu-06',
    regNo: 'SAC-2025-0847',
    name: 'Mohammed Arshad',
    gradeOrDept: 'Grade 11-B (Computer Tech)',
    sectionOrSem: 'Section B / Term 2',
    category: 'Day Scholar',
    rfidTag: 'RFID-9942-886',
    parentName: 'Tariq Arshad',
    parentPhone: '+91 98406 78901',
    parentEmail: 'tarshad@techsol.com',
    busRoute: 'Route 01 (Central Metro Loop)',
    busStop: 'Stop 02 - Pragati Maidan',
    walletBalance: 1750,
    attendanceRate: 96.0,
    feeTotal: 140000,
    feePaid: 140000,
    feePending: 0,
    libraryBooksCount: 2,
    noDueStatus: '100% Cleared',
    academicGrade: 'A1 (95.0%)',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  }
]

export const MOCK_STAFF: Staff[] = [
  {
    id: 'stf-01',
    empNo: 'FAC-PHY-014',
    name: 'Prof. Meenakshi Sundaram',
    department: 'Physics & STEM Sciences',
    role: 'Teacher',
    designation: 'Senior Faculty / PGT Physics',
    email: 'm.sundaram@dpa.edu.in',
    phone: '+91 94441 12345',
    qualification: 'M.Sc Physics, B.Ed, M.Phil',
    joinDate: '12-Jun-2018',
    status: 'Active',
    teachingLoadHours: 24,
    assignedClasses: ['Grade 11-A', 'Grade 11-B', 'Grade 12-A'],
    biometricId: 'BIO-FAC-014'
  },
  {
    id: 'stf-02',
    empNo: 'FAC-MAT-009',
    name: 'Dr. Anand Ramanathan',
    department: 'Mathematics & Statistics',
    role: 'Teacher',
    designation: 'Head of Mathematics Department',
    email: 'a.ramanathan@dpa.edu.in',
    phone: '+91 94442 23456',
    qualification: 'Ph.D Mathematics, M.Sc, NET Qualified',
    joinDate: '01-Aug-2015',
    status: 'Active',
    teachingLoadHours: 22,
    assignedClasses: ['Grade 11-A', 'Grade 12-A', 'Grade 12-B'],
    biometricId: 'BIO-FAC-009'
  },
  {
    id: 'stf-03',
    empNo: 'FAC-ENG-022',
    name: 'Shalini Sengupta',
    department: 'English & World Literature',
    role: 'Teacher',
    designation: 'Faculty & Editor-in-Chief',
    email: 's.sengupta@dpa.edu.in',
    phone: '+91 94443 34567',
    qualification: 'M.A English Literature, B.Ed',
    joinDate: '15-May-2020',
    status: 'Active',
    teachingLoadHours: 26,
    assignedClasses: ['Grade 10-A', 'Grade 11-A', 'Grade 12-C'],
    biometricId: 'BIO-FAC-022'
  },
  {
    id: 'stf-04',
    empNo: 'ADM-REG-001',
    name: 'Rajesh Varma',
    department: 'Central Administration',
    role: 'Admin',
    designation: 'Chief Administrative Officer',
    email: 'admin.office@dpa.edu.in',
    phone: '+91 94444 45678',
    qualification: 'MBA Institutional Governance',
    joinDate: '10-Jan-2014',
    status: 'Active',
    teachingLoadHours: 0,
    assignedClasses: [],
    biometricId: 'BIO-ADM-001'
  },
  {
    id: 'stf-05',
    empNo: 'LIB-SR-003',
    name: 'Dr. M. Jayashree',
    department: 'Central Knowledge Commons',
    role: 'Librarian',
    designation: 'Chief Information & Library Officer',
    email: 'library@dpa.edu.in',
    phone: '+91 94445 56789',
    qualification: 'M.Lib.Sc, Ph.D Library Science',
    joinDate: '20-Jul-2016',
    status: 'Active',
    teachingLoadHours: 0,
    assignedClasses: [],
    biometricId: 'BIO-LIB-003'
  },
  {
    id: 'stf-06',
    empNo: 'HST-WRD-002',
    name: 'Mr. Suresh Kumar',
    department: 'Residential Campus Operations',
    role: 'Hostel',
    designation: 'Chief Warden & Hostel Manager',
    email: 'hostel@dpa.edu.in',
    phone: '+91 94446 67890',
    qualification: 'M.A Sociology, PGDM',
    joinDate: '05-Mar-2017',
    status: 'Active',
    teachingLoadHours: 0,
    assignedClasses: [],
    biometricId: 'BIO-HST-002'
  }
]

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-001',
    entityId: 'stu-01',
    entityName: 'Rohan S. Krishna',
    type: 'student',
    date: '2025-10-13',
    time: '07:42:15',
    status: 'Present',
    mode: 'RFID Reader',
    readerId: 'GATE-MAIN-01',
    location: 'Main Gate Entry'
  },
  {
    id: 'att-002',
    entityId: 'stu-02',
    entityName: 'Ananya Varma',
    type: 'student',
    date: '2025-10-13',
    time: '07:55:30',
    status: 'Present',
    mode: 'RFID Reader',
    readerId: 'GATE-MAIN-01',
    location: 'Main Gate Entry'
  },
  {
    id: 'att-003',
    entityId: 'stu-05',
    entityName: 'Divya Nair',
    type: 'student',
    date: '2025-10-13',
    time: '08:22:10',
    status: 'Late',
    mode: 'RFID Reader',
    readerId: 'GATE-MAIN-01',
    location: 'Main Gate Entry'
  },
  {
    id: 'att-004',
    entityId: 'stf-01',
    entityName: 'Prof. Meenakshi Sundaram',
    type: 'staff',
    date: '2025-10-13',
    time: '08:05:00',
    status: 'Present',
    mode: 'Biometric',
    readerId: 'BIO-STAFF-01',
    location: 'Staff Biometric Terminal'
  },
  {
    id: 'att-005',
    entityId: 'stu-03',
    entityName: 'Karthik Raja',
    type: 'student',
    date: '2025-10-13',
    time: '08:18:45',
    status: 'Late',
    mode: 'RFID Reader',
    readerId: 'GATE-MAIN-01',
    location: 'Main Gate Entry'
  }
]

export const MOCK_EXAMS: ExamSession[] = [
  {
    id: 'exam-01',
    subject: 'Physics (Theory)',
    gradeOrDept: 'Grade 12-A (Science)',
    date: '2025-10-20',
    startTime: '09:00',
    endTime: '12:00',
    venue: 'Examination Hall A (120 seats)',
    invigilator: 'Prof. Meenakshi Sundaram',
    invigilatorId: 'stf-01',
    dutyConfirmed: true,
    totalStudents: 48,
    status: 'Scheduled'
  },
  {
    id: 'exam-02',
    subject: 'Mathematics (Advanced)',
    gradeOrDept: 'Grade 11-A (Science)',
    date: '2025-10-22',
    startTime: '09:00',
    endTime: '12:00',
    venue: 'Examination Hall B (80 seats)',
    invigilator: 'Dr. Anand Ramanathan',
    invigilatorId: 'stf-02',
    dutyConfirmed: false,
    totalStudents: 62,
    status: 'Scheduled'
  },
  {
    id: 'exam-03',
    subject: 'English Literature',
    gradeOrDept: 'Grade 10-C (Foundations)',
    date: '2025-10-18',
    startTime: '10:00',
    endTime: '13:00',
    venue: 'Multi-Purpose Hall (200 seats)',
    invigilator: 'Shalini Sengupta',
    invigilatorId: 'stf-03',
    dutyConfirmed: true,
    totalStudents: 78,
    status: 'Scheduled'
  }
]

export const MOCK_FEE_TRANSACTIONS: FeeTransaction[] = [
  {
    id: 'fee-001',
    studentId: 'stu-01',
    studentName: 'Rohan S. Krishna',
    regNo: 'SAC-2025-0842',
    amount: 45000,
    type: 'Term 2 Tuition',
    date: '2025-07-05',
    method: 'Online',
    status: 'Paid',
    receiptNo: 'REC-2025-4821'
  },
  {
    id: 'fee-002',
    studentId: 'stu-03',
    studentName: 'Karthik Raja',
    regNo: 'SAC-2025-0844',
    amount: 40000,
    type: 'Term 2 Tuition',
    date: '2025-07-10',
    method: 'Cash',
    status: 'Pending',
    receiptNo: 'REC-2025-4835'
  }
]

export const MOCK_BUDGET: BudgetOverview[] = [
  { head: 'Academic Infrastructure', allocated: 4500000, utilized: 3820000, remaining: 680000, status: 'Healthy' },
  { head: 'Transport Fleet Operations', allocated: 3800000, utilized: 3950000, remaining: -150000, status: 'Overrun' },
  { head: 'STEM Lab & Technology', allocated: 2200000, utilized: 1880000, remaining: 320000, status: 'Healthy' },
  { head: 'Hostel & Residential', allocated: 1800000, utilized: 1620000, remaining: 180000, status: 'Healthy' },
  { head: 'Sports & Co-Curricular', allocated: 900000, utilized: 780000, remaining: 120000, status: 'Healthy' },
  { head: 'Library & Knowledge Commons', allocated: 600000, utilized: 580000, remaining: 20000, status: 'Warning' }
]

export const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-001',
    name: 'Exam Answer Booklets (40-page)',
    category: 'Examination Supplies',
    currentStock: 480,
    minimumStock: 1000,
    unit: 'Booklets',
    location: 'Central Stores - Rack A4',
    lastRestocked: '2025-08-15',
    status: 'Critical'
  },
  {
    id: 'inv-002',
    name: 'A4 Printer Paper (500 Sheet Reams)',
    category: 'Stationery',
    currentStock: 85,
    minimumStock: 50,
    unit: 'Reams',
    location: 'Central Stores - Rack B2',
    lastRestocked: '2025-09-20',
    status: 'Adequate'
  },
  {
    id: 'inv-003',
    name: 'Whiteboard Markers (Blue)',
    category: 'Classroom Supplies',
    currentStock: 12,
    minimumStock: 30,
    unit: 'Boxes',
    location: 'Central Stores - Rack C1',
    lastRestocked: '2025-09-01',
    status: 'Low Stock'
  },
  {
    id: 'inv-004',
    name: 'Hand Sanitizer 500ml',
    category: 'Health & Safety',
    currentStock: 45,
    minimumStock: 20,
    unit: 'Bottles',
    location: 'Medical Room Storage',
    lastRestocked: '2025-10-01',
    status: 'Adequate'
  }
]

export const MOCK_PURCHASE_REQUESTS: PurchaseRequest[] = [
  {
    id: 'pr-001',
    prNumber: 'PR-2025-0841',
    item: 'Exam Answer Booklets (40-page, 5000 units)',
    category: 'Examination Supplies',
    quantity: 5000,
    estimatedCost: 37500,
    requestedBy: 'Rajesh Varma',
    department: 'Central Administration',
    date: '2025-10-10',
    status: 'Pending',
    priority: 'Critical',
    notes: 'Term-end exams starting Oct 18. Urgent reorder required.'
  },
  {
    id: 'pr-002',
    prNumber: 'PR-2025-0842',
    item: 'Scientific Calculators - Casio FX-991EX (30 units)',
    category: 'Laboratory Equipment',
    quantity: 30,
    estimatedCost: 54000,
    requestedBy: 'Dr. Anand Ramanathan',
    department: 'Mathematics & Statistics',
    date: '2025-10-08',
    status: 'Approved',
    priority: 'High'
  },
  {
    id: 'pr-003',
    prNumber: 'PR-2025-0839',
    item: 'Bus Fuel Injector Overhaul Kit - Bus #06',
    category: 'Transport Maintenance',
    quantity: 1,
    estimatedCost: 85000,
    requestedBy: 'Transport Department',
    department: 'Campus Transport',
    date: '2025-10-05',
    status: 'Ordered',
    priority: 'Critical',
    notes: 'Bus #06 off-road until repair completion. Affecting Route 06 students.'
  }
]

export const MOCK_TRANSPORT: TransportFleet[] = [
  {
    id: 'bus-01',
    busNo: 'DL-01-AB-1234',
    route: 'Route 01 (Central Metro Loop)',
    driver: 'Ramesh Singh',
    driverPhone: '+91 98111 22233',
    capacity: 52,
    currentRiders: 48,
    status: 'On Route',
    lastLocation: 'Pragati Maidan Flyover',
    eta: '07:55 AM',
    speed: 42
  },
  {
    id: 'bus-02',
    busNo: 'DL-01-CD-5678',
    route: 'Route 02 (North Express)',
    driver: 'Sunil Yadav',
    driverPhone: '+91 98222 33344',
    capacity: 45,
    currentRiders: 42,
    status: 'At School',
    lastLocation: 'School Main Gate',
    eta: 'Arrived',
    speed: 0
  },
  {
    id: 'bus-06',
    busNo: 'DL-01-GH-9012',
    route: 'Route 06 (East Circular)',
    driver: 'Mohan Lal',
    driverPhone: '+91 98666 77788',
    capacity: 48,
    currentRiders: 35,
    status: 'Delayed',
    lastLocation: 'Barapullah Flyover Diversion',
    eta: '08:34 AM (+18 min)',
    speed: 18
  }
]

export const MOCK_HOSTEL_RESIDENTS: HostelResident[] = [
  {
    id: 'hst-01',
    studentId: 'stu-01',
    studentName: 'Rohan S. Krishna',
    regNo: 'SAC-2025-0842',
    block: 'Block B (Kaveri Hall)',
    room: 'Room 304',
    bed: 'Bed 2',
    checkInDate: '2025-06-01',
    parentContact: '+91 98401 23456',
    status: 'Resident'
  },
  {
    id: 'hst-02',
    studentId: 'stu-05',
    studentName: 'Divya Nair',
    regNo: 'SAC-2025-0846',
    block: 'Block D (Yamuna Hall)',
    room: 'Room 214',
    bed: 'Bed 1',
    checkInDate: '2025-06-01',
    parentContact: '+91 98405 67890',
    status: 'Resident'
  }
]

export const MOCK_OUTPASSES: OutpassRequest[] = [
  {
    id: 'op-001',
    studentId: 'stu-01',
    studentName: 'Rohan S. Krishna',
    regNo: 'SAC-2025-0842',
    reason: 'Medical consultation - Endocrinologist',
    destination: 'AIIMS Hospital, Ansari Nagar',
    exitTime: '2025-10-13 14:00',
    expectedReturn: '2025-10-13 18:00',
    status: 'Approved',
    approvedBy: 'Mr. Suresh Kumar',
    requestDate: '2025-10-12'
  },
  {
    id: 'op-002',
    studentId: 'stu-05',
    studentName: 'Divya Nair',
    regNo: 'SAC-2025-0846',
    reason: 'Family visit - Diwali weekend',
    destination: 'Rohini Sector 14, Delhi',
    exitTime: '2025-10-14 09:00',
    expectedReturn: '2025-10-16 20:00',
    status: 'Pending',
    requestDate: '2025-10-13'
  }
]

export const MOCK_LIBRARY: LibraryItem[] = [
  {
    id: 'lib-001',
    title: 'Concepts of Physics Vol. 1',
    author: 'H. C. Verma',
    isbn: '978-8177091878',
    category: 'Science & Technology',
    totalCopies: 15,
    availableCopies: 12,
    borrowedBy: 'Rohan S. Krishna',
    dueDate: '2025-10-20',
    status: 'Borrowed'
  },
  {
    id: 'lib-002',
    title: 'Thirukkural - English Translation',
    author: 'G. U. Pope',
    isbn: '978-8171792337',
    category: 'Literature & Culture',
    totalCopies: 8,
    availableCopies: 8,
    status: 'Available'
  },
  {
    id: 'lib-003',
    title: 'NCERT Mathematics Part II - Class 12',
    author: 'NCERT',
    isbn: '978-8174506276',
    category: 'Academic Textbooks',
    totalCopies: 40,
    availableCopies: 28,
    status: 'Available'
  }
]

export const MOCK_NO_DUE: NoDueRecord[] = [
  {
    id: 'nod-01',
    studentId: 'stu-01',
    studentName: 'Rohan S. Krishna',
    regNo: 'SAC-2025-0842',
    gradeOrDept: 'Grade 11-A (Science)',
    clearances: {
      library: false,
      hostel: true,
      finance: false,
      sports: true,
      laboratory: true,
      transport: true,
      canteen: true
    },
    overallStatus: 'Pending Clearance',
    initiatedDate: '2025-10-01'
  },
  {
    id: 'nod-02',
    studentId: 'stu-02',
    studentName: 'Ananya Varma',
    regNo: 'SAC-2025-0843',
    gradeOrDept: 'Grade 11-A (Science)',
    clearances: {
      library: true,
      hostel: true,
      finance: true,
      sports: true,
      laboratory: true,
      transport: true,
      canteen: true
    },
    overallStatus: '100% Cleared',
    initiatedDate: '2025-09-28',
    completedDate: '2025-10-05'
  }
]

export const MOCK_CIRCULARS: CircularNotice[] = [
  {
    id: 'circ-001',
    circularNo: 'DPA/CIRC/2025/084',
    title: 'Term-End Examination Schedule – October 2025',
    content: 'All students of Grades 10, 11, and 12 are informed that Term-End Examinations will commence from October 18, 2025. Students must report to examination halls 30 minutes before the scheduled start time with valid ID cards. Mobile phones are strictly prohibited.',
    audience: ['students', 'parents', 'teachers'],
    issuedBy: 'Dr. Kavitha Krishnamurthy, Principal',
    issuedDate: '2025-10-10',
    priority: 'Important'
  },
  {
    id: 'circ-002',
    circularNo: 'DPA/CIRC/2025/085',
    title: 'Diwali Term Break – Campus & Hostel Closure Notice',
    content: 'The campus will remain closed from October 28 to November 3, 2025, in observance of Diwali term break. All hostel residents must complete exit formalities by October 27, 5:00 PM. Security staff will be on duty during the break period.',
    audience: ['students', 'parents', 'staff'],
    issuedBy: 'Rajesh Varma, CAO',
    issuedDate: '2025-10-12',
    priority: 'Important'
  }
]

export const MOCK_APPROVALS: ApprovalWorkflowItem[] = [
  {
    id: 'appr-001',
    type: 'Purchase Request',
    title: 'PR-2025-0841: Exam Answer Booklets (5000 units)',
    requestedBy: 'Rajesh Varma',
    department: 'Central Administration',
    date: '2025-10-10',
    amount: 37500,
    status: 'Pending',
    priority: 'High',
    description: 'Critical reorder for Term-end examinations starting October 18.'
  },
  {
    id: 'appr-002',
    type: 'Hostel Outpass',
    title: 'Outpass Request: Divya Nair – Diwali Home Visit',
    requestedBy: 'Divya Nair (via Hostel)',
    department: 'Residential Campus Operations',
    date: '2025-10-13',
    status: 'Pending',
    priority: 'Medium',
    description: 'Student requesting 2-night home visit for Diwali (Oct 14-16). Parent confirmation received.'
  },
  {
    id: 'appr-003',
    type: 'Leave Request',
    title: 'Medical Leave: Prof. Meenakshi Sundaram (3 days)',
    requestedBy: 'Prof. Meenakshi Sundaram',
    department: 'Physics & STEM Sciences',
    date: '2025-10-11',
    status: 'Approved',
    priority: 'Low',
    description: 'Medical leave Oct 14-16. Substitute teacher arranged: Dr. Pranav Sharma.'
  },
  {
    id: 'appr-004',
    type: 'Budget Request',
    title: 'Emergency Fleet Repair Budget Extension – ₹1,50,000',
    requestedBy: 'Transport Department',
    department: 'Campus Transport',
    date: '2025-10-09',
    amount: 150000,
    status: 'Pending',
    priority: 'High',
    description: 'Q3 transport budget overrun due to fuel injector overhaul on 3 buses.'
  }
]

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-001',
    title: 'Attendance Exception Detected',
    message: 'Divya Nair (SAC-2025-0846) missed morning muster at Kaveri Hostel. Automated SMS sent to parent.',
    type: 'warning',
    timestamp: '2025-10-13T08:15:00',
    read: false,
    actionPath: '/app/rfid-attendance'
  },
  {
    id: 'notif-002',
    title: 'Smart Purchase Alarm: Exam Booklets Critical',
    message: 'Exam Answer Booklets stock at 480 units — below safety threshold of 1,000. Immediate reorder required.',
    type: 'error',
    timestamp: '2025-10-13T07:30:00',
    read: false,
    actionPath: '/app/inventory'
  },
  {
    id: 'notif-003',
    title: 'Bus #06 Route Delay – 18 Minutes',
    message: 'Bus DL-01-GH-9012 (Route 06) delayed at Barapullah Flyover. Parent notifications dispatched for stops 8–11.',
    type: 'warning',
    timestamp: '2025-10-13T07:50:00',
    read: false,
    actionPath: '/app/transport'
  },
  {
    id: 'notif-004',
    title: 'Approval Pending: Purchase Request',
    message: 'PR-2025-0841 awaiting your approval. Critical priority – exam booklets needed by Oct 18.',
    type: 'info',
    timestamp: '2025-10-13T09:00:00',
    read: true,
    actionPath: '/app/approvals'
  },
  {
    id: 'notif-005',
    title: 'Term-End Exam Circular Published',
    message: 'Circular DPA/CIRC/2025/084 dispatched to 2,840 students and parents via SMS & App.',
    type: 'success',
    timestamp: '2025-10-10T14:30:00',
    read: true,
    actionPath: '/app/communication'
  }
]
