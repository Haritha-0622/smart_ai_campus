// ─── Module 17: Library Management — Focused Data ───────────────────────────
// Scope: Inventory · Circulation & No-Due · Misplaced Books · Entry Tracking
//        Library Rules · NAAC Accreditation · AI Analytics & Recommendations

// ── Types ────────────────────────────────────────────────────────────────────
export type BookStatus = 'Available' | 'Issued' | 'Reserved' | 'Overdue' | 'Misplaced' | 'Damaged' | 'Lost'
export type LoanStatus = 'Active' | 'Returned' | 'Overdue' | 'Lost'
export type NoDueStatus = 'Clear' | 'Pending' | 'Overdue' | 'Blocked'
export type EntryMethod = 'RFID Card' | 'Barcode Scan' | 'Manual'
export type RuleScope = 'All' | 'Student' | 'Faculty' | 'Staff'

// ── Interfaces ───────────────────────────────────────────────────────────────

export interface BookInventory {
  id: string
  title: string
  authors: string[]
  isbn: string
  publisher: string
  edition: string
  year: number
  subject: string
  category: 'Textbook' | 'Reference' | 'Journal' | 'Novel' | 'Magazine' | 'Research'
  department: string
  branch: string
  section: string
  rack: string
  shelf: string
  totalCopies: number
  availableCopies: number
  issuedCopies: number
  misplacedCopies: number
  damagedCopies: number
  lostCopies: number
  barcodePrefix: string
  rfidTagged: boolean
  lastInventoryDate: string
}

export interface BookLoan {
  id: string
  bookId: string
  bookTitle: string
  isbn: string
  copyBarcode: string
  memberId: string
  memberName: string
  memberCategory: 'Student' | 'Faculty' | 'Staff'
  memberGrade?: string
  issueDate: string
  dueDate: string
  returnDate?: string
  status: LoanStatus
  issuedBy: string
  returnedBy?: string
  fineAmount?: number
  finePaid?: boolean
  renewalCount: number
}

export interface MisplacedBook {
  id: string
  bookId: string
  bookTitle: string
  copyBarcode: string
  isbn: string
  expectedSection: string
  expectedRack: string
  expectedShelf: string
  foundSection?: string
  foundRack?: string
  foundShelf?: string
  detectedBy: 'Handheld Scanner' | 'RFID Reader' | 'Staff Report'
  detectedAt: string
  detectedBy_name: string
  resolved: boolean
  resolvedAt?: string
  resolvedBy?: string
}

export interface LibraryEntry {
  id: string
  memberId: string
  memberName: string
  memberCategory: 'Student' | 'Faculty' | 'Staff'
  memberGrade?: string
  entryMethod: EntryMethod
  entryTime: string
  exitTime?: string
  date: string
  branch: string
  purposeTagged?: string
}

export interface NoDueRecord {
  id: string
  memberId: string
  memberName: string
  memberCategory: 'Student' | 'Faculty' | 'Staff'
  memberGrade?: string
  activeLoans: number
  overdueBooks: number
  unresolvedFines: number
  noDueStatus: NoDueStatus
  lastChecked: string
  clearedAt?: string
  blockedReason?: string
}

export interface LibraryRule {
  id: string
  ruleName: string
  description: string
  scope: RuleScope
  value: string
  unit: string
  enabled: boolean
  lastModified: string
  modifiedBy: string
}

export interface NAACRecord {
  id: string
  criterion: string
  indicator: string
  description: string
  status: 'Complete' | 'Partial' | 'Pending' | 'Not Applicable'
  evidenceLinks: string[]
  documentsUploaded: number
  lastUpdated: string
  updatedBy: string
  notes?: string
}

export interface AIRecommendation {
  studentId: string
  studentName: string
  grade: string
  recommendations: { bookId: string; bookTitle: string; reason: string; score: number }[]
}

export interface CirculationAnalytic {
  subject: string
  totalIssues: number
  totalReturns: number
  avgLoanDays: number
  overdueRate: number
  topBorrowedTitle: string
}

// ── Book Inventory ────────────────────────────────────────────────────────────

export const BOOK_INVENTORY: BookInventory[] = [
  {
    id: 'BK-001', title: 'Engineering Mathematics Volume I', authors: ['B.S. Grewal'], isbn: '978-8174091955',
    publisher: 'Khanna Publishers', edition: '44th', year: 2023, subject: 'Mathematics',
    category: 'Textbook', department: 'Engineering', branch: 'Main Library',
    section: 'Engineering', rack: 'E-01', shelf: 'S-03',
    totalCopies: 30, availableCopies: 18, issuedCopies: 10, misplacedCopies: 1, damagedCopies: 1, lostCopies: 0,
    barcodePrefix: 'LIB-E-001', rfidTagged: true, lastInventoryDate: '2025-10-01',
  },
  {
    id: 'BK-002', title: 'Data Structures and Algorithms', authors: ['Narasimha Karumanchi'], isbn: '978-8192107097',
    publisher: 'CareerMonk Publications', edition: '5th', year: 2022, subject: 'Computer Science',
    category: 'Textbook', department: 'Computer Science', branch: 'Main Library',
    section: 'CS & IT', rack: 'C-02', shelf: 'S-01',
    totalCopies: 25, availableCopies: 12, issuedCopies: 11, misplacedCopies: 2, damagedCopies: 0, lostCopies: 0,
    barcodePrefix: 'LIB-C-002', rfidTagged: true, lastInventoryDate: '2025-10-01',
  },
  {
    id: 'BK-003', title: 'Principles of Management', authors: ['P.C. Tripathi', 'P.N. Reddy'], isbn: '978-0070634350',
    publisher: 'McGraw-Hill', edition: '6th', year: 2021, subject: 'Management',
    category: 'Textbook', department: 'Commerce & Management', branch: 'Main Library',
    section: 'Commerce', rack: 'M-01', shelf: 'S-02',
    totalCopies: 20, availableCopies: 15, issuedCopies: 4, misplacedCopies: 1, damagedCopies: 0, lostCopies: 0,
    barcodePrefix: 'LIB-M-003', rfidTagged: false, lastInventoryDate: '2025-09-15',
  },
  {
    id: 'BK-004', title: 'Organic Chemistry', authors: ['Morrison', 'Boyd'], isbn: '978-8120301047',
    publisher: 'Prentice Hall', edition: '7th', year: 2020, subject: 'Chemistry',
    category: 'Reference', department: 'Science', branch: 'Science Resource Centre',
    section: 'Chemistry', rack: 'S-03', shelf: 'S-01',
    totalCopies: 15, availableCopies: 9, issuedCopies: 5, misplacedCopies: 0, damagedCopies: 1, lostCopies: 0,
    barcodePrefix: 'LIB-S-004', rfidTagged: true, lastInventoryDate: '2025-10-05',
  },
  {
    id: 'BK-005', title: 'The Alchemist', authors: ['Paulo Coelho'], isbn: '978-0062316097',
    publisher: 'HarperOne', edition: '1st', year: 2014, subject: 'Fiction',
    category: 'Novel', department: 'General', branch: 'Main Library',
    section: 'Fiction & Literature', rack: 'F-02', shelf: 'S-04',
    totalCopies: 10, availableCopies: 7, issuedCopies: 3, misplacedCopies: 0, damagedCopies: 0, lostCopies: 0,
    barcodePrefix: 'LIB-F-005', rfidTagged: false, lastInventoryDate: '2025-09-20',
  },
  {
    id: 'BK-006', title: 'Digital Electronics', authors: ['R.P. Jain'], isbn: '978-8122411447',
    publisher: 'S. Chand', edition: '9th', year: 2022, subject: 'Electronics',
    category: 'Textbook', department: 'Engineering', branch: 'Engineering Branch',
    section: 'Electronics', rack: 'E-04', shelf: 'S-02',
    totalCopies: 18, availableCopies: 8, issuedCopies: 8, misplacedCopies: 2, damagedCopies: 0, lostCopies: 0,
    barcodePrefix: 'LIB-E-006', rfidTagged: true, lastInventoryDate: '2025-10-01',
  },
  {
    id: 'BK-007', title: 'Human Anatomy & Physiology', authors: ['Elaine Marieb'], isbn: '978-0134580999',
    publisher: 'Pearson', edition: '10th', year: 2019, subject: 'Biology',
    category: 'Reference', department: 'Science', branch: 'Science Resource Centre',
    section: 'Biology', rack: 'S-01', shelf: 'S-03',
    totalCopies: 12, availableCopies: 10, issuedCopies: 2, misplacedCopies: 0, damagedCopies: 0, lostCopies: 0,
    barcodePrefix: 'LIB-S-007', rfidTagged: true, lastInventoryDate: '2025-10-05',
  },
]

// ── Book Loans ────────────────────────────────────────────────────────────────

export const BOOK_LOANS: BookLoan[] = [
  {
    id: 'LN-001', bookId: 'BK-001', bookTitle: 'Engineering Mathematics Volume I', isbn: '978-8174091955',
    copyBarcode: 'LIB-E-001-07', memberId: 'STU-034', memberName: 'Arjun Menon',
    memberCategory: 'Student', memberGrade: 'B.E. III Year',
    issueDate: '2025-10-01', dueDate: '2025-10-15', status: 'Overdue',
    issuedBy: 'Mrs. Kamala Devi', renewalCount: 0, fineAmount: 20, finePaid: false,
  },
  {
    id: 'LN-002', bookId: 'BK-002', bookTitle: 'Data Structures and Algorithms', isbn: '978-8192107097',
    copyBarcode: 'LIB-C-002-03', memberId: 'STU-081', memberName: 'Divya Nair',
    memberCategory: 'Student', memberGrade: 'B.E. II Year',
    issueDate: '2025-10-08', dueDate: '2025-10-22', status: 'Active',
    issuedBy: 'Mrs. Kamala Devi', renewalCount: 0,
  },
  {
    id: 'LN-003', bookId: 'BK-004', bookTitle: 'Organic Chemistry', isbn: '978-8120301047',
    copyBarcode: 'LIB-S-004-02', memberId: 'STU-056', memberName: 'Priya Sharma',
    memberCategory: 'Student', memberGrade: 'Class XI-B',
    issueDate: '2025-09-28', dueDate: '2025-10-12', status: 'Overdue',
    issuedBy: 'Dr. Meena Pillai', renewalCount: 1, fineAmount: 30, finePaid: false,
  },
  {
    id: 'LN-004', bookId: 'BK-005', bookTitle: 'The Alchemist', isbn: '978-0062316097',
    copyBarcode: 'LIB-F-005-01', memberId: 'FAC-012', memberName: 'Mr. M. Sundaram',
    memberCategory: 'Faculty',
    issueDate: '2025-10-10', dueDate: '2025-10-31', status: 'Active',
    issuedBy: 'Mrs. Kamala Devi', renewalCount: 0,
  },
  {
    id: 'LN-005', bookId: 'BK-006', bookTitle: 'Digital Electronics', isbn: '978-8122411447',
    copyBarcode: 'LIB-E-006-05', memberId: 'STU-088', memberName: 'Rahul Iyer',
    memberCategory: 'Student', memberGrade: 'B.E. II Year',
    issueDate: '2025-10-05', dueDate: '2025-10-19', status: 'Active',
    issuedBy: 'Mr. Rajesh Kumar', renewalCount: 0,
  },
  {
    id: 'LN-006', bookId: 'BK-003', bookTitle: 'Principles of Management', isbn: '978-0070634350',
    copyBarcode: 'LIB-M-003-04', memberId: 'STU-019', memberName: 'Anitha Krishnan',
    memberCategory: 'Student', memberGrade: 'B.Com II Year',
    issueDate: '2025-09-15', dueDate: '2025-09-29', returnDate: '2025-09-28', status: 'Returned',
    issuedBy: 'Mrs. Kamala Devi', returnedBy: 'Mrs. Kamala Devi', renewalCount: 0,
  },
]

// ── Misplaced Books ───────────────────────────────────────────────────────────

export const MISPLACED_BOOKS: MisplacedBook[] = [
  {
    id: 'MP-001', bookId: 'BK-001', bookTitle: 'Engineering Mathematics Volume I',
    copyBarcode: 'LIB-E-001-12', isbn: '978-8174091955',
    expectedSection: 'Engineering', expectedRack: 'E-01', expectedShelf: 'S-03',
    foundSection: 'CS & IT', foundRack: 'C-04', foundShelf: 'S-01',
    detectedBy: 'Handheld Scanner', detectedAt: '2025-10-15T10:30:00', detectedBy_name: 'Librarian Jayanthi',
    resolved: false,
  },
  {
    id: 'MP-002', bookId: 'BK-002', bookTitle: 'Data Structures and Algorithms',
    copyBarcode: 'LIB-C-002-08', isbn: '978-8192107097',
    expectedSection: 'CS & IT', expectedRack: 'C-02', expectedShelf: 'S-01',
    foundSection: 'Engineering', foundRack: 'E-03', foundShelf: 'S-02',
    detectedBy: 'Handheld Scanner', detectedAt: '2025-10-15T10:45:00', detectedBy_name: 'Librarian Jayanthi',
    resolved: false,
  },
  {
    id: 'MP-003', bookId: 'BK-006', bookTitle: 'Digital Electronics',
    copyBarcode: 'LIB-E-006-11', isbn: '978-8122411447',
    expectedSection: 'Electronics', expectedRack: 'E-04', expectedShelf: 'S-02',
    foundSection: 'Electronics', foundRack: 'E-05', foundShelf: 'S-01',
    detectedBy: 'Staff Report', detectedAt: '2025-10-14T14:00:00', detectedBy_name: 'Mr. Rajesh Kumar',
    resolved: false,
  },
  {
    id: 'MP-004', bookId: 'BK-002', bookTitle: 'Data Structures and Algorithms',
    copyBarcode: 'LIB-C-002-15', isbn: '978-8192107097',
    expectedSection: 'CS & IT', expectedRack: 'C-02', expectedShelf: 'S-01',
    foundSection: 'CS & IT', foundRack: 'C-03', foundShelf: 'S-04',
    detectedBy: 'RFID Reader', detectedAt: '2025-10-10T09:00:00', detectedBy_name: 'Gate RFID',
    resolved: true, resolvedAt: '2025-10-10T11:30:00', resolvedBy: 'Librarian Jayanthi',
  },
]

// ── Library Entry Log ─────────────────────────────────────────────────────────

export const LIBRARY_ENTRIES: LibraryEntry[] = [
  { id: 'ENT-001', memberId: 'STU-081', memberName: 'Divya Nair', memberCategory: 'Student', memberGrade: 'B.E. II Year', entryMethod: 'RFID Card', entryTime: '09:15', exitTime: '11:30', date: '2025-10-16', branch: 'Main Library', purposeTagged: 'Study' },
  { id: 'ENT-002', memberId: 'STU-034', memberName: 'Arjun Menon', memberCategory: 'Student', memberGrade: 'B.E. III Year', entryMethod: 'Barcode Scan', entryTime: '10:00', exitTime: '12:00', date: '2025-10-16', branch: 'Engineering Branch', purposeTagged: 'Book Issue' },
  { id: 'ENT-003', memberId: 'FAC-012', memberName: 'Mr. M. Sundaram', memberCategory: 'Faculty', entryMethod: 'RFID Card', entryTime: '11:00', exitTime: undefined, date: '2025-10-16', branch: 'Main Library', purposeTagged: 'Research' },
  { id: 'ENT-004', memberId: 'STU-056', memberName: 'Priya Sharma', memberCategory: 'Student', memberGrade: 'Class XI-B', entryMethod: 'RFID Card', entryTime: '08:30', exitTime: '10:00', date: '2025-10-16', branch: 'Science Resource Centre', purposeTagged: 'Study' },
  { id: 'ENT-005', memberId: 'STU-088', memberName: 'Rahul Iyer', memberCategory: 'Student', memberGrade: 'B.E. II Year', entryMethod: 'Manual', entryTime: '13:00', exitTime: '14:30', date: '2025-10-15', branch: 'Engineering Branch', purposeTagged: 'Book Return' },
  { id: 'ENT-006', memberId: 'STU-019', memberName: 'Anitha Krishnan', memberCategory: 'Student', memberGrade: 'B.Com II Year', entryMethod: 'RFID Card', entryTime: '09:00', exitTime: '10:30', date: '2025-10-15', branch: 'Main Library', purposeTagged: 'Study' },
  { id: 'ENT-007', memberId: 'STU-072', memberName: 'Karthik Rajan', memberCategory: 'Student', memberGrade: 'Class XI-C', entryMethod: 'Barcode Scan', entryTime: '14:00', exitTime: '16:00', date: '2025-10-15', branch: 'Main Library', purposeTagged: 'Reading' },
  { id: 'ENT-008', memberId: 'STU-081', memberName: 'Divya Nair', memberCategory: 'Student', memberGrade: 'B.E. II Year', entryMethod: 'RFID Card', entryTime: '09:10', exitTime: '11:00', date: '2025-10-15', branch: 'Main Library', purposeTagged: 'Study' },
]

// ── No-Due Records ────────────────────────────────────────────────────────────

export const NO_DUE_RECORDS: NoDueRecord[] = [
  { id: 'ND-001', memberId: 'STU-034', memberName: 'Arjun Menon', memberCategory: 'Student', memberGrade: 'B.E. III Year', activeLoans: 1, overdueBooks: 1, unresolvedFines: 1, noDueStatus: 'Blocked', lastChecked: '2025-10-16', blockedReason: '1 overdue book — fine unpaid' },
  { id: 'ND-002', memberId: 'STU-081', memberName: 'Divya Nair', memberCategory: 'Student', memberGrade: 'B.E. II Year', activeLoans: 1, overdueBooks: 0, unresolvedFines: 0, noDueStatus: 'Clear', lastChecked: '2025-10-16' },
  { id: 'ND-003', memberId: 'STU-056', memberName: 'Priya Sharma', memberCategory: 'Student', memberGrade: 'Class XI-B', activeLoans: 0, overdueBooks: 1, unresolvedFines: 1, noDueStatus: 'Overdue', lastChecked: '2025-10-16', blockedReason: '1 overdue, fine ₹30 unpaid' },
  { id: 'ND-004', memberId: 'STU-088', memberName: 'Rahul Iyer', memberCategory: 'Student', memberGrade: 'B.E. II Year', activeLoans: 1, overdueBooks: 0, unresolvedFines: 0, noDueStatus: 'Clear', lastChecked: '2025-10-16' },
  { id: 'ND-005', memberId: 'STU-019', memberName: 'Anitha Krishnan', memberCategory: 'Student', memberGrade: 'B.Com II Year', activeLoans: 0, overdueBooks: 0, unresolvedFines: 0, noDueStatus: 'Clear', lastChecked: '2025-10-16', clearedAt: '2025-09-28' },
  { id: 'ND-006', memberId: 'FAC-012', memberName: 'Mr. M. Sundaram', memberCategory: 'Faculty', activeLoans: 1, overdueBooks: 0, unresolvedFines: 0, noDueStatus: 'Pending', lastChecked: '2025-10-16' },
]

// ── Library Rules ─────────────────────────────────────────────────────────────

export const LIBRARY_RULES: LibraryRule[] = [
  { id: 'LR-001', ruleName: 'Loan Duration — Student', description: 'Maximum number of days a student can borrow a book', scope: 'Student', value: '14', unit: 'days', enabled: true, lastModified: '2025-06-01', modifiedBy: 'Mrs. Kamala Devi' },
  { id: 'LR-002', ruleName: 'Loan Duration — Faculty', description: 'Maximum number of days a faculty member can borrow a book', scope: 'Faculty', value: '30', unit: 'days', enabled: true, lastModified: '2025-06-01', modifiedBy: 'Mrs. Kamala Devi' },
  { id: 'LR-003', ruleName: 'Max Books Per Student', description: 'Maximum number of books a student can borrow at one time', scope: 'Student', value: '3', unit: 'books', enabled: true, lastModified: '2025-06-01', modifiedBy: 'Mrs. Kamala Devi' },
  { id: 'LR-004', ruleName: 'Max Books Per Faculty', description: 'Maximum number of books a faculty member can borrow at one time', scope: 'Faculty', value: '10', unit: 'books', enabled: true, lastModified: '2025-06-01', modifiedBy: 'Mrs. Kamala Devi' },
  { id: 'LR-005', ruleName: 'Overdue Fine Per Day', description: 'Fine charged per day for each overdue book', scope: 'All', value: '2', unit: '₹/day', enabled: true, lastModified: '2025-06-01', modifiedBy: 'Mrs. Kamala Devi' },
  { id: 'LR-006', ruleName: 'Renewal Limit', description: 'Maximum number of times a loan can be renewed', scope: 'All', value: '2', unit: 'renewals', enabled: true, lastModified: '2025-07-10', modifiedBy: 'Mrs. Kamala Devi' },
  { id: 'LR-007', ruleName: 'Silence Policy Enforcement', description: 'Mobile phone and noise restrictions enforced in main reading hall', scope: 'All', value: 'Strict Silence Zone', unit: 'policy', enabled: true, lastModified: '2025-06-01', modifiedBy: 'Principal' },
  { id: 'LR-008', ruleName: 'Lost Book Replacement Charge', description: 'Student/Faculty charged cost price + 20% for lost books', scope: 'All', value: '120', unit: '% of book cost', enabled: true, lastModified: '2025-06-01', modifiedBy: 'Mrs. Kamala Devi' },
  { id: 'LR-009', ruleName: 'No-Due Mandatory for Exam', description: 'Library no-due certificate required before exam hall ticket issuance', scope: 'Student', value: 'Mandatory', unit: 'policy', enabled: true, lastModified: '2025-08-15', modifiedBy: 'Principal' },
  { id: 'LR-010', ruleName: 'Handheld Device Inventory Cycle', description: 'Frequency of full shelf audit using handheld scanners', scope: 'All', value: '1', unit: 'per month', enabled: true, lastModified: '2025-09-01', modifiedBy: 'Mrs. Kamala Devi' },
]

// ── NAAC Records ──────────────────────────────────────────────────────────────

export const NAAC_RECORDS: NAACRecord[] = [
  {
    id: 'NC-001', criterion: 'Criterion 4 — Infrastructure & Learning Resources', indicator: '4.2.1',
    description: 'Library is automated using an integrated Library Management System (LMS) with barcode/RFID',
    status: 'Complete', evidenceLinks: ['LMS Automation Certificate', 'RFID Installation Report'],
    documentsUploaded: 2, lastUpdated: '2025-09-10', updatedBy: 'Mrs. Kamala Devi',
    notes: 'RFID tagging completed for 60% of collection. Handheld scanners operational.',
  },
  {
    id: 'NC-002', criterion: 'Criterion 4 — Infrastructure & Learning Resources', indicator: '4.2.2',
    description: 'The institution has subscription for e-resources and provides access to databases, e-journals and e-books',
    status: 'Partial', evidenceLinks: ['INFLIBNET Subscription Receipt'],
    documentsUploaded: 1, lastUpdated: '2025-09-15', updatedBy: 'Mrs. Kamala Devi',
    notes: 'INFLIBNET NLIST subscribed. JSTOR and Scopus access pending budget approval.',
  },
  {
    id: 'NC-003', criterion: 'Criterion 4 — Infrastructure & Learning Resources', indicator: '4.2.3',
    description: 'Percentage of books and journals available in the library versus total required as per program',
    status: 'Complete', evidenceLinks: ['Accession Register', 'Course-wise Book List', 'Annual Report'],
    documentsUploaded: 3, lastUpdated: '2025-10-01', updatedBy: 'Mrs. Kamala Devi',
  },
  {
    id: 'NC-004', criterion: 'Criterion 4 — Infrastructure & Learning Resources', indicator: '4.2.4',
    description: 'Average number of books/journals available per student',
    status: 'Complete', evidenceLinks: ['Library Statistics Report 2024-25'],
    documentsUploaded: 1, lastUpdated: '2025-10-01', updatedBy: 'Mrs. Kamala Devi',
  },
  {
    id: 'NC-005', criterion: 'Criterion 6 — Governance & Leadership', indicator: '6.5.2',
    description: 'Library practices quality assurance through regular audits, feedback collection and accession planning',
    status: 'Partial', evidenceLinks: ['Library Committee Meeting Minutes'],
    documentsUploaded: 1, lastUpdated: '2025-09-20', updatedBy: 'Principal Office',
    notes: 'Feedback system implemented. Annual audit pending for Oct 2025.',
  },
  {
    id: 'NC-006', criterion: 'Criterion 2 — Teaching-Learning & Evaluation', indicator: '2.3.3',
    description: 'Availability of reading lists and course-specific reference materials curated by faculty',
    status: 'Pending', evidenceLinks: [],
    documentsUploaded: 0, lastUpdated: '2025-08-01', updatedBy: 'IQAC',
    notes: 'Faculty reading list compilation in progress. Target: Nov 2025.',
  },
]

// ── AI: Circulation Analytics ─────────────────────────────────────────────────

export const CIRCULATION_ANALYTICS: CirculationAnalytic[] = [
  { subject: 'Computer Science', totalIssues: 142, totalReturns: 128, avgLoanDays: 11, overdueRate: 8.4, topBorrowedTitle: 'Data Structures and Algorithms' },
  { subject: 'Mathematics', totalIssues: 118, totalReturns: 109, avgLoanDays: 13, overdueRate: 12.1, topBorrowedTitle: 'Engineering Mathematics Volume I' },
  { subject: 'Electronics', totalIssues: 96, totalReturns: 88, avgLoanDays: 10, overdueRate: 9.2, topBorrowedTitle: 'Digital Electronics' },
  { subject: 'Chemistry', totalIssues: 74, totalReturns: 71, avgLoanDays: 9, overdueRate: 5.8, topBorrowedTitle: 'Organic Chemistry' },
  { subject: 'Fiction', totalIssues: 52, totalReturns: 52, avgLoanDays: 7, overdueRate: 1.9, topBorrowedTitle: 'The Alchemist' },
  { subject: 'Management', totalIssues: 45, totalReturns: 43, avgLoanDays: 12, overdueRate: 6.7, topBorrowedTitle: 'Principles of Management' },
]

// ── AI: Recommendations ───────────────────────────────────────────────────────

export const AI_RECOMMENDATIONS: AIRecommendation[] = [
  {
    studentId: 'STU-081', studentName: 'Divya Nair', grade: 'B.E. II Year',
    recommendations: [
      { bookId: 'BK-001', bookTitle: 'Engineering Mathematics Volume I', reason: 'Matches your current semester syllabus (Maths II)', score: 97 },
      { bookId: 'BK-006', bookTitle: 'Digital Electronics', reason: 'Highly borrowed by B.E. II Year peers this month', score: 89 },
      { bookId: 'BK-005', bookTitle: 'The Alchemist', reason: 'Top fiction pick among engineering students', score: 76 },
    ],
  },
  {
    studentId: 'STU-034', studentName: 'Arjun Menon', grade: 'B.E. III Year',
    recommendations: [
      { bookId: 'BK-002', bookTitle: 'Data Structures and Algorithms', reason: 'Core reference for your upcoming placement exams', score: 98 },
      { bookId: 'BK-001', bookTitle: 'Engineering Mathematics Volume I', reason: 'Frequently renewed by B.E. III Year students', score: 85 },
    ],
  },
]
