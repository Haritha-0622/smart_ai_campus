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
    qualification: 'Ph.D Library & Info Science',
    joinDate: '04-Nov-2016',
    status: 'Active',
    teachingLoadHours: 0,
    assignedClasses: [],
    biometricId: 'BIO-LIB-003'
  }
]

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-01',
    entityId: 'SAC-2025-0842',
    entityName: 'Rohan S. Krishna',
    type: 'student',
    date: 'Today, 08:14 AM',
    time: '08:14:22',
    status: 'Present',
    mode: 'RFID Reader',
    readerId: 'GATE-01-NORTH-TURNSTILE',
    exceptionFlag: false
  },
  {
    id: 'att-02',
    entityId: 'SAC-2025-0843',
    entityName: 'Ananya Varma',
    type: 'student',
    date: 'Today, 08:08 AM',
    time: '08:08:15',
    status: 'Present',
    mode: 'RFID Reader',
    readerId: 'BUS-02-RFID-BOARD',
    exceptionFlag: false
  },
  {
    id: 'att-03',
    entityId: 'SAC-2025-0844',
    entityName: 'Karthik Raja',
    type: 'student',
    date: 'Today, 08:46 AM',
    time: '08:46:10',
    status: 'Late',
    mode: 'Manual Override',
    readerId: 'SECURITY-DESK-MANUAL',
    exceptionFlag: true,
    exceptionReason: 'Bus #06 delayed by 18 mins due to Ring Road flyover diversion'
  },
  {
    id: 'att-04',
    entityId: 'SAC-2025-0845',
    entityName: 'Priya Sharma',
    type: 'student',
    date: 'Today, 08:12 AM',
    time: '08:12:44',
    status: 'Present',
    mode: 'RFID Reader',
    readerId: 'GATE-02-SOUTH-TURNSTILE',
    exceptionFlag: false
  },
  {
    id: 'att-05',
    entityId: 'FAC-PHY-014',
    entityName: 'Prof. Meenakshi Sundaram',
    type: 'staff',
    date: 'Today, 07:55 AM',
    time: '07:55:04',
    status: 'Present',
    mode: 'Biometric',
    readerId: 'STAFF-ENTRY-BIO-01',
    exceptionFlag: false
  },
  {
    id: 'att-06',
    entityId: 'SAC-2025-0846',
    entityName: 'Divya Nair',
    type: 'student',
    date: 'Today, 09:15 AM',
    time: '09:15:00',
    status: 'Absent',
    mode: 'RFID Reader',
    readerId: 'AUTO-EXCEPTION-SCANNER',
    exceptionFlag: true,
    exceptionReason: 'Unexplained morning absence from kaveri hostel muster roll. Parent alert dispatched.'
  }
]

export const MOCK_EXAMS: ExamSession[] = [
  {
    id: 'ex-01',
    code: 'CBSE-MID2-PHY',
    name: 'Physics Mid-Term Assessment II',
    gradeOrCourse: 'Grade 11-A & 11-B',
    subject: 'Physics (Theory & Numerical)',
    date: '18-Oct-2026',
    timeSession: '09:30 AM - 12:30 PM (3 Hrs)',
    hall: 'Ramanujan Examination Hall - 3A',
    primaryInvigilator: 'Prof. Meenakshi Sundaram',
    backupInvigilator: 'Dr. Anand Ramanathan',
    confirmed: true,
    status: 'Scheduled',
    enrolledStudents: 78
  },
  {
    id: 'ex-02',
    code: 'CBSE-MID2-MAT',
    name: 'Advanced Calculus & Analytical Geometry',
    gradeOrCourse: 'Grade 12-A & 12-B',
    subject: 'Pure Mathematics',
    date: '20-Oct-2026',
    timeSession: '09:30 AM - 12:30 PM (3 Hrs)',
    hall: 'Aryabhata Academic Complex - 1B',
    primaryInvigilator: 'Dr. Anand Ramanathan',
    backupInvigilator: 'Shalini Sengupta',
    confirmed: true,
    status: 'Scheduled',
    enrolledStudents: 82
  },
  {
    id: 'ex-03',
    code: 'CBSE-MID2-ENG',
    name: 'English Core & Literature Comprehension',
    gradeOrCourse: 'Grade 11-A, B & C',
    subject: 'English Core Language',
    date: '23-Oct-2026',
    timeSession: '02:00 PM - 05:00 PM (3 Hrs)',
    hall: 'Tagore Memorial Hall',
    primaryInvigilator: 'Shalini Sengupta',
    backupInvigilator: 'Prof. Meenakshi Sundaram',
    confirmed: false,
    status: 'Scheduled',
    enrolledStudents: 120
  }
]

export const MOCK_FEES: FeeTransaction[] = [
  {
    id: 'tx-01',
    receiptNo: 'REC-2026-9041',
    studentId: 'SAC-2025-0842',
    studentName: 'Rohan S. Krishna',
    gradeOrDept: 'Grade 11-A',
    term: 'Term 2 (Oct 2026 - Jan 2027)',
    category: 'Tuition & STEM Lab Fee',
    amount: 45000,
    paymentMethod: 'UPI / NetBanking',
    status: 'Paid',
    date: '02-Oct-2026'
  },
  {
    id: 'tx-02',
    receiptNo: 'REC-2026-9042',
    studentId: 'SAC-2025-0842',
    studentName: 'Rohan S. Krishna',
    gradeOrDept: 'Grade 11-A',
    term: 'Term 2 (Oct 2026 - Jan 2027)',
    category: 'Hostel & Boarding Dues (Quarterly)',
    amount: 12500,
    paymentMethod: 'UPI / NetBanking',
    status: 'Pending',
    date: 'Due: 25-Oct-2026'
  },
  {
    id: 'tx-03',
    receiptNo: 'REC-2026-8890',
    studentId: 'SAC-2025-0844',
    studentName: 'Karthik Raja',
    gradeOrDept: 'Grade 12-B',
    term: 'Term 2 Installment',
    category: 'Comprehensive Fee',
    amount: 40000,
    paymentMethod: 'Demand Draft',
    status: 'Overdue',
    date: 'Overdue since: 30-Sep-2026'
  },
  {
    id: 'tx-04',
    receiptNo: 'REC-2026-9112',
    studentId: 'SAC-2025-0843',
    studentName: 'Ananya Varma',
    gradeOrDept: 'Grade 11-A',
    term: 'Annual Academic 2026-27',
    category: 'Merit Scholarship Concession',
    amount: 25000,
    paymentMethod: 'Challan',
    status: 'Exempt / Scholarship',
    date: '15-Aug-2026'
  }
]

export const MOCK_BUDGET: BudgetOverview[] = [
  { category: 'STEM Laboratories & Robotics Kits', allocated: 2500000, utilized: 2180000, variance: 320000, status: 'Healthy' },
  { category: 'Digital Library & International Journals', allocated: 800000, utilized: 760000, variance: 40000, status: 'Healthy' },
  { category: 'Transport Fleet, Fuel & GPS Telematics', allocated: 3800000, utilized: 3950000, variance: -150000, status: 'Overrun' },
  { category: 'Campus Hostels & Residential Facilities', allocated: 4200000, utilized: 3850000, variance: 350000, status: 'Healthy' },
  { category: 'Faculty Professional Upskilling & AI Training', allocated: 1200000, utilized: 1050000, variance: 150000, status: 'Healthy' },
  { category: 'Campus Security, RFID Turnstiles & CCTV', allocated: 1500000, utilized: 1420000, variance: 80000, status: 'Healthy' }
]

export const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-01',
    code: 'STN-EXAM-A4',
    name: 'Security Barcoded Examination Answer Sheets (32 Pages)',
    category: 'Academic Stationery',
    currentStock: 480,
    reorderThreshold: 1000,
    unit: 'Booklets',
    location: 'Central Store Bay 3B',
    unitCost: 18.5,
    status: 'Critical Alarm',
    supplier: 'Navneet Education Supplies Ltd'
  },
  {
    id: 'inv-02',
    code: 'LAB-CHEM-HCL',
    name: 'Hydrochloric Acid GR Grade (500ml Bottled)',
    category: 'Science Chemistry Lab',
    currentStock: 24,
    reorderThreshold: 15,
    unit: 'Bottles',
    location: 'Chemistry Hazard Locker A',
    unitCost: 340,
    status: 'Optimal',
    supplier: 'Apex Scientific Instruments'
  },
  {
    id: 'inv-03',
    code: 'RFID-STU-CARD',
    name: 'Mifare 1K Smart RFID Campus Cards (Encoded)',
    category: 'Identity Hardware',
    currentStock: 185,
    reorderThreshold: 250,
    unit: 'Cards',
    location: 'IT Cell Vault 2',
    unitCost: 65,
    status: 'Low Stock',
    supplier: 'SmartID Telematics India'
  },
  {
    id: 'inv-04',
    code: 'MED-KIT-FIRST',
    name: 'Emergency Medical Trauma Kits & Antiseptic Packs',
    category: 'Health Center',
    currentStock: 42,
    reorderThreshold: 20,
    unit: 'Kits',
    location: 'Infirmary Store 1',
    unitCost: 850,
    status: 'Optimal',
    supplier: 'Apollo Pharmacy Corporate'
  }
]

export const MOCK_PURCHASE_REQUESTS: PurchaseRequest[] = [
  {
    id: 'pr-01',
    prNumber: 'PO-2026-0892',
    itemCode: 'STN-EXAM-A4',
    itemName: 'Security Barcoded Examination Answer Sheets (5,000 Pcs)',
    quantity: 5000,
    unit: 'Booklets',
    estimatedCost: 92500,
    requestedBy: 'Rajesh Varma (Admin)',
    department: 'Central Examination Cell',
    date: 'Yesterday, 04:30 PM',
    status: 'Pending Approval',
    urgency: 'High'
  },
  {
    id: 'pr-02',
    prNumber: 'PO-2026-0891',
    itemCode: 'ROBO-KIT-ARDUINO',
    itemName: 'Arduino Mega STEM Robotics Sensor Kits (Classroom Pack)',
    quantity: 30,
    unit: 'Kits',
    estimatedCost: 105000,
    requestedBy: 'Prof. Meenakshi Sundaram',
    department: 'Physics & STEM Sciences',
    date: '10-Oct-2026',
    status: 'PO Issued',
    urgency: 'Medium'
  },
  {
    id: 'pr-03',
    prNumber: 'PO-2026-0889',
    itemCode: 'RFID-STU-CARD',
    itemName: 'Mifare 1K Encoded RFID Student Identity Cards',
    quantity: 500,
    unit: 'Cards',
    estimatedCost: 32500,
    requestedBy: 'Gurpreet Singh',
    department: 'Central Stores',
    date: '08-Oct-2026',
    status: 'Goods Received',
    urgency: 'Medium'
  }
]

export const MOCK_TRANSPORT: TransportFleet[] = [
  {
    id: 'bus-01',
    vehicleNo: 'DL 1P C 8402',
    busNumber: 'Bus 04 (South Green Line)',
    routeName: 'Vasant Kunj ↔ Hauz Khas ↔ AIIMS ↔ Lajpat Nagar',
    driverName: 'Surinder Pal Singh',
    driverPhone: '+91 98110 54321',
    attendantName: 'Kamlesh Rani',
    capacity: 44,
    onboardedCount: 38,
    currentLocation: 'Near Aurobindo Marg (Speed: 28 km/h)',
    speedKmH: 28,
    fuelLevelPercent: 78,
    status: 'On Route',
    serviceDueInDays: 24
  },
  {
    id: 'bus-02',
    vehicleNo: 'DL 1P C 8405',
    busNumber: 'Bus 02 (North Express)',
    routeName: 'Civil Lines ↔ Connaught Place ↔ Chanakyapuri ↔ Campus',
    driverName: 'Mohd. Rafiq',
    driverPhone: '+91 98110 54322',
    attendantName: 'Suresh Kumar',
    capacity: 44,
    onboardedCount: 42,
    currentLocation: 'Campus North Bus Bay 2',
    speedKmH: 0,
    fuelLevelPercent: 62,
    status: 'At Campus',
    serviceDueInDays: 45
  },
  {
    id: 'bus-03',
    vehicleNo: 'DL 1P C 8410',
    busNumber: 'Bus 06 (East Circular)',
    routeName: 'Mayur Vihar ↔ Noida Sec 15 ↔ Akshardham ↔ Campus',
    driverName: 'Satish Chand',
    driverPhone: '+91 98110 54323',
    attendantName: 'Meena Kumari',
    capacity: 44,
    onboardedCount: 40,
    currentLocation: 'Near Barapullah Elevated Road',
    speedKmH: 34,
    fuelLevelPercent: 44,
    status: 'On Route',
    serviceDueInDays: 8
  }
]

export const MOCK_HOSTEL_RESIDENTS: HostelResident[] = [
  {
    id: 'hst-01',
    studentId: 'SAC-2025-0842',
    studentName: 'Rohan S. Krishna',
    roomNo: 'Room 304',
    block: 'Block B (Kaveri Boys Hall)',
    wardenName: 'Col. K. Balaji (Retd.)',
    status: 'In Campus',
    lastMovementTime: 'Today 08:14 AM (Gate 01 North)',
    parentContact: '+91 98401 23456 (S. K. Subramanian)'
  },
  {
    id: 'hst-02',
    studentId: 'SAC-2025-0846',
    studentName: 'Divya Nair',
    roomNo: 'Room 214',
    block: 'Block D (Yamuna Girls Hall)',
    wardenName: 'Mrs. Jayalakshmi Sharma',
    status: 'Outpass Approved',
    lastMovementTime: 'Yesterday 05:40 PM',
    parentContact: '+91 98405 67890 (R. K. Nair)'
  }
]

export const MOCK_OUTPASSES: OutpassRequest[] = [
  {
    id: 'out-01',
    studentId: 'SAC-2025-0842',
    studentName: 'Rohan S. Krishna',
    roomNo: 'Block B / 304',
    passType: 'Weekend Home',
    leaveDate: '17-Oct-2026 04:00 PM',
    expectedReturn: '19-Oct-2026 07:30 AM',
    reason: 'Family Diwali festival visit to ancestral home in Gurgaon',
    parentAcknowledged: true,
    wardenApproved: true,
    gateSecurityStatus: 'Pending Verification'
  },
  {
    id: 'out-02',
    studentId: 'SAC-2025-0846',
    studentName: 'Divya Nair',
    roomNo: 'Block D / 214',
    passType: 'Day Pass',
    leaveDate: '15-Oct-2026 02:00 PM',
    expectedReturn: '15-Oct-2026 07:00 PM',
    reason: 'IIT Delhi STEM Research Open House symposium attendance',
    parentAcknowledged: true,
    wardenApproved: false,
    gateSecurityStatus: 'Pending Verification'
  }
]

export const MOCK_LIBRARY: LibraryItem[] = [
  {
    id: 'lib-01',
    accessionNo: 'ACC-89201',
    isbn: '978-0133591620',
    title: 'Modern Operating Systems (4th Global Edition)',
    author: 'Andrew S. Tanenbaum & Herbert Bos',
    category: 'Computer Science & Systems',
    shelfLocation: 'Stack CS-04 / Shelf B',
    status: 'Checked Out',
    borrowerName: 'Rohan S. Krishna (SAC-2025-0842)',
    dueDate: '24-Oct-2026'
  },
  {
    id: 'lib-02',
    accessionNo: 'ACC-89202',
    isbn: '978-8120348762',
    title: 'Thirukkural: The Universal Ethics with Contemporary English Translation',
    author: 'G. U. Pope & Prof. K. S. Sundaram',
    category: 'Classical Indian Literature & Ethics',
    shelfLocation: 'Stack LIT-02 / Shelf A',
    status: 'Checked Out',
    borrowerName: 'Rohan S. Krishna (SAC-2025-0842)',
    dueDate: '28-Oct-2026'
  },
  {
    id: 'lib-03',
    accessionNo: 'ACC-89203',
    isbn: '978-8177091878',
    title: 'Concepts of Physics (Volume 1 & 2 Complete)',
    author: 'Dr. H. C. Verma',
    category: 'Physics & STEM',
    shelfLocation: 'Stack PHY-01 / Shelf C',
    status: 'Available'
  },
  {
    id: 'lib-04',
    accessionNo: 'ACC-89204',
    isbn: '978-0262033848',
    title: 'Introduction to Algorithms (CLRS)',
    author: 'Cormen, Leiserson, Rivest, Stein',
    category: 'Computer Science',
    shelfLocation: 'Stack CS-01 / Shelf A',
    status: 'Misplaced / AI Flag'
  }
]

export const MOCK_NO_DUE: NoDueRecord[] = [
  {
    id: 'nodue-01',
    studentId: 'SAC-2025-0842',
    studentName: 'Rohan S. Krishna',
    gradeOrProgram: 'Grade 11-A (Science)',
    clearances: {
      library: false, // has 2 books borrowed
      hostel: true,
      accounts: false, // ₹12,500 pending
      canteen: true,
      laboratories: true,
      idCardSurrendered: false
    },
    finalStatus: 'In Review',
    submittedDate: '11-Oct-2026'
  },
  {
    id: 'nodue-02',
    studentId: 'SAC-2025-0843',
    studentName: 'Ananya Varma',
    gradeOrProgram: 'Grade 11-A (Science)',
    clearances: {
      library: true,
      hostel: true,
      accounts: true,
      canteen: true,
      laboratories: true,
      idCardSurrendered: true
    },
    finalStatus: '100% Cleared',
    submittedDate: '04-Oct-2026'
  }
]

export const MOCK_CIRCULARS: CircularNotice[] = [
  {
    id: 'cir-01',
    circularNo: 'CIR/2026/ACAD/42',
    title: 'Mid-Term Assessment Examination Timetable & Seating Guidelines',
    category: 'Academic',
    targetAudience: 'All Campus',
    author: 'Office of the Principal (Dr. Ananya Sengupta)',
    publishedDate: '12-Oct-2026',
    status: 'Published',
    readPercentage: 92.4,
    acknowledgedCount: 2620,
    totalRecipients: 2840
  },
  {
    id: 'cir-02',
    circularNo: 'CIR/2026/EVNT/19',
    title: 'Annual Inter-Campus STEM & AI Robotics Exposition 2026',
    category: 'Events',
    targetAudience: 'Senior Students',
    author: 'Prof. Meenakshi Sundaram (Dept. Coordinator)',
    publishedDate: '09-Oct-2026',
    status: 'Published',
    readPercentage: 86.1,
    acknowledgedCount: 1420,
    totalRecipients: 1650
  },
  {
    id: 'cir-03',
    circularNo: 'CIR/2026/TRANS/08',
    title: 'Notification of Revised Bus Route 06 Timings During Metro Flyover Work',
    category: 'Administrative',
    targetAudience: 'Parents Only',
    author: 'M. Selvakumar (Transport Manager)',
    publishedDate: 'Yesterday, 06:00 PM',
    status: 'Published',
    readPercentage: 78.5,
    acknowledgedCount: 380,
    totalRecipients: 480
  }
]

export const MOCK_APPROVALS: ApprovalWorkflowItem[] = [
  {
    id: 'appr-01',
    type: 'No-Due / TC',
    title: 'Transfer Certificate & No-Due Clearance (Student Rohan S. Krishna)',
    requester: 'Rajesh Varma (Registrar)',
    department: 'Central Administration',
    date: 'Today, 10:15 AM',
    slaHoursLeft: 14,
    status: 'Pending',
    details: {
      studentId: 'SAC-2025-0842',
      reason: 'Family relocation to Bengaluru Tech Corridor',
      pendingBlockers: '2 Library books to return, ₹12,500 hostel mess dues'
    }
  },
  {
    id: 'appr-02',
    type: 'Procurement PO',
    title: 'Purchase Order #892: 5,000 Barcoded Exam Answer Booklets',
    requester: 'Gurpreet Singh (Central Stores)',
    department: 'Examination Cell',
    date: 'Yesterday, 04:30 PM',
    slaHoursLeft: 6,
    status: 'Pending',
    details: {
      supplier: 'Navneet Education Supplies Ltd',
      amount: '₹92,500',
      budgetHead: 'STEM & Academic Examination Stationery'
    }
  },
  {
    id: 'appr-03',
    type: 'Hostel Outpass',
    title: 'Weekend Outpass Request: Rohan S. Krishna (Block B / 304)',
    requester: 'Col. K. Balaji (Retd.)',
    department: 'Campus Hostels',
    date: 'Today, 11:30 AM',
    slaHoursLeft: 22,
    status: 'Approved',
    details: {
      parentVerified: 'Parent S.K. Subramanian verified via digital OTP at 11:15 AM',
      destination: 'Gurgaon Family Residence'
    }
  },
  {
    id: 'appr-04',
    type: 'Special Class',
    title: 'Weekend Physics Board-Prep Remedial & JEE Advanced Masterclass',
    requester: 'Prof. Meenakshi Sundaram',
    department: 'Physics & STEM Sciences',
    date: 'Today, 09:00 AM',
    slaHoursLeft: 18,
    status: 'Pending',
    details: {
      proposedTiming: 'Saturday 08:30 AM - 11:30 AM',
      hall: 'Ramanujan Lab 3A',
      targetedStudents: '42 Enrolled Science Students'
    }
  }
]

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    title: 'Parent Verified Outpass',
    message: 'Guardian S. K. Subramanian digitally signed weekend outpass for Rohan S. Krishna.',
    category: 'Security',
    priority: 'Info',
    timestamp: '15 mins ago',
    read: false,
    link: '/app/hostel'
  },
  {
    id: 'notif-02',
    title: 'Smart Purchase Alarm Triggered',
    message: 'Examination answer booklet stock reached critical threshold (480 units remaining vs 1,000 min).',
    category: 'Approvals',
    priority: 'Critical',
    timestamp: '1 hour ago',
    read: false,
    link: '/app/inventory'
  },
  {
    id: 'notif-03',
    title: 'Morning Gate Attendance Complete',
    message: '96.2% student arrival recorded across 4 automated RFID turnstile gates.',
    category: 'Attendance',
    priority: 'Info',
    timestamp: '2 hours ago',
    read: true,
    link: '/app/rfid-attendance'
  },
  {
    id: 'notif-04',
    title: 'Bus #04 On Route & Punctual',
    message: 'Bus #04 completed Stop 7 (Hauz Khas Metro) on schedule. 38 students boarded.',
    category: 'Transport',
    priority: 'Info',
    timestamp: '3 hours ago',
    read: true,
    link: '/app/transport'
  }
]
