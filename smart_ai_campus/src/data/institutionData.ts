// ─── Institutional Management Data ──────────────────────────────────────────

export type PolicyStatus = 'Draft' | 'Under Review' | 'Published' | 'Archived'
export type AccreditationStatus = 'Active' | 'Pending Renewal' | 'Expired' | 'Not Applicable' | 'In Progress'
export type ApprovalStatus = 'Pending' | 'Approved' | 'Rejected' | 'Returned'
export type DeptStatus = 'Active' | 'Inactive'
export type DocStatus = 'Valid' | 'Expiring Soon' | 'Expired' | 'Pending Upload'

// ─── Departments ──────────────────────────────────────────────────────────────
export interface Department {
  id: string
  name: string
  code: string
  type: 'Academic' | 'Administrative' | 'Support' | 'Research'
  campus: string
  hod: string
  contact: string
  email: string
  facultyCount: number
  studentCount: number
  programs: string[]
  established: string
  status: DeptStatus
  description: string
}

export const DEPARTMENTS: Department[] = [
  { id: 'DEPT-001', name: 'Computer Science & Engineering', code: 'CSE', type: 'Academic', campus: 'Main Campus', hod: 'Dr. Suresh Rajan', contact: '+91 44 2345 6701', email: 'cse@dpa.edu.in', facultyCount: 18, studentCount: 420, programs: ['B.Tech CSE', 'M.Tech CSE', 'MCA'], established: '1998-07-01', status: 'Active', description: 'Department of Computer Science and Engineering offering undergraduate and postgraduate programs in computing, AI, and software engineering.' },
  { id: 'DEPT-002', name: 'Electronics & Communication Engineering', code: 'ECE', type: 'Academic', campus: 'Main Campus', hod: 'Dr. Kavitha Sundaram', contact: '+91 44 2345 6702', email: 'ece@dpa.edu.in', facultyCount: 14, studentCount: 320, programs: ['B.Tech ECE', 'M.Tech VLSI'], established: '1998-07-01', status: 'Active', description: 'Department focusing on electronics, communication systems, signal processing, and embedded systems.' },
  { id: 'DEPT-003', name: 'Mechanical Engineering', code: 'ME', type: 'Academic', campus: 'Main Campus', hod: 'Prof. Ramesh Iyer', contact: '+91 44 2345 6703', email: 'me@dpa.edu.in', facultyCount: 16, studentCount: 280, programs: ['B.Tech ME', 'M.Tech Thermal'], established: '1998-07-01', status: 'Active', description: 'Department covering mechanical design, manufacturing, thermodynamics, and industrial engineering.' },
  { id: 'DEPT-004', name: 'Mathematics & Statistics', code: 'MATH', type: 'Academic', campus: 'Main Campus', hod: 'Mrs. Radha Krishnan', contact: '+91 44 2345 6704', email: 'math@dpa.edu.in', facultyCount: 10, studentCount: 180, programs: ['B.Sc Mathematics', 'M.Sc Statistics'], established: '2001-07-01', status: 'Active', description: 'Offers foundational and applied mathematics courses for all engineering departments and standalone programs.' },
  { id: 'DEPT-005', name: 'Physics & Applied Sciences', code: 'PHY', type: 'Academic', campus: 'Main Campus', hod: 'Dr. Meena Pillai', contact: '+91 44 2345 6705', email: 'physics@dpa.edu.in', facultyCount: 8, studentCount: 120, programs: ['B.Sc Physics'], established: '2001-07-01', status: 'Active', description: 'Department offering physics and applied sciences courses supporting all engineering and science programs.' },
  { id: 'DEPT-006', name: 'Central Administration', code: 'ADMIN', type: 'Administrative', campus: 'Main Campus', hod: 'Mr. Gopal Krishnaswamy', contact: '+91 44 2345 6700', email: 'admin@dpa.edu.in', facultyCount: 0, studentCount: 0, programs: [], established: '1998-06-01', status: 'Active', description: 'Manages institutional administration, admissions, examinations, records, and official communications.' },
  { id: 'DEPT-007', name: 'Finance & Accounts', code: 'FIN', type: 'Administrative', campus: 'Main Campus', hod: 'Mrs. Priya Balakrishnan', contact: '+91 44 2345 6710', email: 'finance@dpa.edu.in', facultyCount: 0, studentCount: 0, programs: [], established: '1998-06-01', status: 'Active', description: 'Manages all financial operations including fee collection, payroll, procurement, and budgeting.' },
  { id: 'DEPT-008', name: 'Library & Knowledge Resources', code: 'LIB', type: 'Support', campus: 'Main Campus', hod: 'Mrs. Kamala Devi', contact: '+91 44 2345 6720', email: 'library@dpa.edu.in', facultyCount: 0, studentCount: 0, programs: [], established: '1998-07-01', status: 'Active', description: 'Manages the central library, digital resources, knowledge commons, and institutional repository.' },
  { id: 'DEPT-009', name: 'Sports & Co-Curricular', code: 'SPORTS', type: 'Support', campus: 'Main Campus', hod: 'Mr. Vijay Kumar', contact: '+91 44 2345 6730', email: 'sports@dpa.edu.in', facultyCount: 0, studentCount: 0, programs: [], established: '2005-07-01', status: 'Active', description: 'Oversees sports facilities, athletic programs, cultural activities, and student clubs.' },
  { id: 'DEPT-010', name: 'Research & Innovation Cell', code: 'RIC', type: 'Research', campus: 'Main Campus', hod: 'Dr. Suresh Rajan', contact: '+91 44 2345 6740', email: 'research@dpa.edu.in', facultyCount: 5, studentCount: 45, programs: ['Ph.D CSE', 'Ph.D ECE'], established: '2010-07-01', status: 'Active', description: 'Promotes research activities, industry collaboration, patents, and PhD programs.' },
]

// ─── Academic Programs ────────────────────────────────────────────────────────
export interface AcademicProgram {
  id: string
  name: string
  code: string
  degree: string
  department: string
  duration: string
  totalSeats: number
  currentEnrollment: number
  semesterCount: number
  affiliation: string
  accreditedBy: string
  status: 'Active' | 'Phasing Out' | 'Discontinued'
  startYear: number
}

export const ACADEMIC_PROGRAMS: AcademicProgram[] = [
  { id: 'PROG-001', name: 'Bachelor of Technology — Computer Science', code: 'BTECHCSE', degree: 'B.Tech', department: 'CSE', duration: '4 Years', totalSeats: 120, currentEnrollment: 420, semesterCount: 8, affiliation: 'Anna University', accreditedBy: 'NBA', status: 'Active', startYear: 1998 },
  { id: 'PROG-002', name: 'Master of Technology — Computer Science', code: 'MTECHCSE', degree: 'M.Tech', department: 'CSE', duration: '2 Years', totalSeats: 30, currentEnrollment: 52, semesterCount: 4, affiliation: 'Anna University', accreditedBy: 'Anna University', status: 'Active', startYear: 2005 },
  { id: 'PROG-003', name: 'Master of Computer Applications', code: 'MCA', degree: 'MCA', department: 'CSE', duration: '2 Years', totalSeats: 60, currentEnrollment: 98, semesterCount: 4, affiliation: 'Anna University', accreditedBy: 'Anna University', status: 'Active', startYear: 2003 },
  { id: 'PROG-004', name: 'Bachelor of Technology — Electronics & Communication', code: 'BTECECE', degree: 'B.Tech', department: 'ECE', duration: '4 Years', totalSeats: 90, currentEnrollment: 320, semesterCount: 8, affiliation: 'Anna University', accreditedBy: 'NBA', status: 'Active', startYear: 1998 },
  { id: 'PROG-005', name: 'Bachelor of Technology — Mechanical', code: 'BTECHME', degree: 'B.Tech', department: 'ME', duration: '4 Years', totalSeats: 90, currentEnrollment: 280, semesterCount: 8, affiliation: 'Anna University', accreditedBy: 'NBA', status: 'Active', startYear: 1998 },
  { id: 'PROG-006', name: 'Bachelor of Science — Mathematics', code: 'BSCMATH', degree: 'B.Sc', department: 'MATH', duration: '3 Years', totalSeats: 60, currentEnrollment: 120, semesterCount: 6, affiliation: 'Anna University', accreditedBy: 'UGC', status: 'Active', startYear: 2001 },
  { id: 'PROG-007', name: 'Doctor of Philosophy — CSE', code: 'PHDCSE', degree: 'Ph.D', department: 'RIC', duration: '3–5 Years', totalSeats: 10, currentEnrollment: 25, semesterCount: 0, affiliation: 'Anna University', accreditedBy: 'UGC', status: 'Active', startYear: 2010 },
]

// ─── Academic Calendar ────────────────────────────────────────────────────────
export interface AcademicSemester {
  id: string
  name: string
  academicYear: string
  startDate: string
  endDate: string
  examStart: string
  examEnd: string
  resultDate: string
  status: 'Upcoming' | 'Ongoing' | 'Exam Period' | 'Completed'
  programs: string[]
}

export const ACADEMIC_SEMESTERS: AcademicSemester[] = [
  { id: 'SEM-001', name: 'Odd Semester (Semester I / III / V / VII)', academicYear: '2025-2026', startDate: '2025-07-15', endDate: '2025-11-30', examStart: '2025-12-01', examEnd: '2025-12-20', resultDate: '2026-01-15', status: 'Ongoing', programs: ['BTECHCSE', 'BTECECE', 'BTECHME', 'BSCMATH'] },
  { id: 'SEM-002', name: 'Even Semester (Semester II / IV / VI / VIII)', academicYear: '2025-2026', startDate: '2026-01-20', endDate: '2026-05-31', examStart: '2026-06-01', examEnd: '2026-06-20', resultDate: '2026-07-15', status: 'Upcoming', programs: ['BTECHCSE', 'BTECECE', 'BTECHME', 'BSCMATH'] },
  { id: 'SEM-003', name: 'Odd Semester 2024-25', academicYear: '2024-2025', startDate: '2024-07-15', endDate: '2024-11-30', examStart: '2024-12-02', examEnd: '2024-12-22', resultDate: '2025-01-20', status: 'Completed', programs: ['BTECHCSE', 'BTECECE', 'BTECHME', 'BSCMATH'] },
]

// ─── Institutional Policies ───────────────────────────────────────────────────
export interface InstitutionalPolicy {
  id: string
  title: string
  category: string
  version: string
  status: PolicyStatus
  owner: string
  department: string
  effectiveDate: string
  reviewDate: string
  approvedBy: string
  description: string
  fileSize: string
  lastUpdated: string
  acknowledgedBy: number
}

export const INSTITUTIONAL_POLICIES: InstitutionalPolicy[] = [
  { id: 'POL-001', title: 'Academic Integrity and Examination Policy', category: 'Academic', version: '3.2', status: 'Published', owner: 'Dr. Suresh Rajan', department: 'Central Administration', effectiveDate: '2024-07-01', reviewDate: '2025-06-30', approvedBy: 'Principal', description: 'Defines academic honesty standards, examination conduct, plagiarism penalties, and grade appeal procedures.', fileSize: '248 KB', lastUpdated: '2024-06-15', acknowledgedBy: 1248 },
  { id: 'POL-002', title: 'Student Attendance Regulations', category: 'Attendance', version: '2.1', status: 'Published', owner: 'Mr. Gopal Krishnaswamy', department: 'Central Administration', effectiveDate: '2024-07-01', reviewDate: '2025-06-30', approvedBy: 'Principal', description: 'Minimum 75% attendance requirement, leave application procedures, medical leave allowances, and condonation rules.', fileSize: '156 KB', lastUpdated: '2024-06-10', acknowledgedBy: 1450 },
  { id: 'POL-003', title: 'Hostel Rules and Residential Regulations', category: 'Hostel', version: '1.8', status: 'Published', owner: 'Mr. Kannan Warden', department: 'Hostel Administration', effectiveDate: '2024-07-01', reviewDate: '2025-06-30', approvedBy: 'Dean of Students', description: 'Governs hostel admission, room allocation, visitor policy, curfew timings, disciplinary procedures, and mess regulations.', fileSize: '312 KB', lastUpdated: '2024-06-20', acknowledgedBy: 468 },
  { id: 'POL-004', title: 'Library Usage and Borrowing Policy', category: 'Library', version: '2.0', status: 'Published', owner: 'Mrs. Kamala Devi', department: 'Library & Knowledge Resources', effectiveDate: '2024-07-01', reviewDate: '2025-06-30', approvedBy: 'Librarian-in-Chief', description: 'Library membership rules, borrowing limits, fine rates, digital resource access policies, and study space regulations.', fileSize: '124 KB', lastUpdated: '2024-06-08', acknowledgedBy: 890 },
  { id: 'POL-005', title: 'Data Privacy and Acceptable Use Policy', category: 'Data Privacy', version: '1.2', status: 'Under Review', owner: 'IT Administration', department: 'Central Administration', effectiveDate: '2024-09-01', reviewDate: '2025-08-31', approvedBy: 'Pending Review', description: 'Defines institutional data handling, student and staff privacy rights, digital resource acceptable use, and breach response procedures.', fileSize: '198 KB', lastUpdated: '2025-09-15', acknowledgedBy: 0 },
  { id: 'POL-006', title: 'Anti-Ragging and Student Safety Policy', category: 'Student Discipline', version: '4.0', status: 'Published', owner: 'Dean of Students', department: 'Central Administration', effectiveDate: '2024-07-01', reviewDate: '2026-06-30', approvedBy: 'Principal & Governing Board', description: 'Zero-tolerance ragging policy as per UGC regulations, student safety committee composition, reporting mechanisms, and penalties.', fileSize: '276 KB', lastUpdated: '2024-06-01', acknowledgedBy: 1560 },
  { id: 'POL-007', title: 'Staff Conduct and Professional Ethics Policy', category: 'Staff Policy', version: '2.3', status: 'Draft', owner: 'HR Department', department: 'Central Administration', effectiveDate: 'Pending', reviewDate: '2026-12-31', approvedBy: 'Pending', description: 'Defines professional conduct expectations, conflict of interest declarations, social media guidelines, and grievance procedures for staff.', fileSize: '—', lastUpdated: '2025-10-01', acknowledgedBy: 0 },
]

// ─── Accreditation Records ─────────────────────────────────────────────────────
export interface AccreditationRecord {
  id: string
  body: string
  framework: string
  scope: string
  status: AccreditationStatus
  grade?: string
  validFrom: string
  validUntil: string
  lastReview: string
  nextReview: string
  responsibleDept: string
  evidenceStatus: 'Complete' | 'Partial' | 'Not Submitted'
  remarks: string
  daysUntilExpiry: number
}

export const ACCREDITATION_RECORDS: AccreditationRecord[] = [
  { id: 'ACC-001', body: 'NAAC', framework: 'NAAC Accreditation', scope: 'Institution-wide', status: 'Active', grade: 'A+', validFrom: '2022-06-01', validUntil: '2027-05-31', lastReview: '2022-05-20', nextReview: '2027-03-01', responsibleDept: 'Central Administration', evidenceStatus: 'Complete', remarks: 'Grade A+ with CGPA 3.52/4.0 awarded in June 2022.', daysUntilExpiry: 592 },
  { id: 'ACC-002', body: 'NBA', framework: 'NBA Program Accreditation', scope: 'B.Tech CSE, B.Tech ECE, B.Tech ME', status: 'Pending Renewal', validFrom: '2021-04-01', validUntil: '2024-03-31', lastReview: '2021-03-10', nextReview: '2025-01-15', responsibleDept: 'Academic Affairs', evidenceStatus: 'Partial', remarks: 'Renewal application submitted. Awaiting NBA inspection schedule. SAR under preparation.', daysUntilExpiry: -198 },
  { id: 'ACC-003', body: 'Anna University', framework: 'University Affiliation', scope: 'All UG/PG Programs', status: 'Active', validFrom: '2024-07-01', validUntil: '2025-06-30', lastReview: '2024-06-01', nextReview: '2025-04-01', responsibleDept: 'Central Administration', evidenceStatus: 'Complete', remarks: 'Annual affiliation renewed. All compliance requirements met.', daysUntilExpiry: 258 },
  { id: 'ACC-004', body: 'UGC', framework: 'UGC 2(f) & 12B Recognition', scope: 'Institution-wide', status: 'Active', validFrom: '2000-01-01', validUntil: '2030-12-31', lastReview: '2000-01-01', nextReview: '2029-06-01', responsibleDept: 'Central Administration', evidenceStatus: 'Complete', remarks: 'Permanent recognition under UGC Act. Annual compliance reports submitted.', daysUntilExpiry: 1908 },
  { id: 'ACC-005', body: 'ISO', framework: 'ISO 9001:2015 Quality Management', scope: 'Administrative Processes', status: 'Active', validFrom: '2023-03-15', validUntil: '2026-03-14', lastReview: '2024-03-15', nextReview: '2026-01-01', responsibleDept: 'Quality Assurance Cell', evidenceStatus: 'Complete', remarks: 'Surveillance audit passed in March 2024. No non-conformities raised.', daysUntilExpiry: 515 },
]

// ─── Institutional Documents ──────────────────────────────────────────────────
export interface InstitutionalDocument {
  id: string
  title: string
  category: string
  issueDate: string
  expiryDate?: string
  uploadedBy: string
  fileType: string
  fileSize: string
  version: string
  status: DocStatus
  accessLevel: 'Public' | 'Internal' | 'Restricted' | 'Confidential'
  description: string
  tags: string[]
}

export const INSTITUTIONAL_DOCUMENTS: InstitutionalDocument[] = [
  { id: 'DOC-001', title: 'NAAC A+ Accreditation Certificate', category: 'Accreditation', issueDate: '2022-06-15', expiryDate: '2027-05-31', uploadedBy: 'Admin Office', fileType: 'PDF', fileSize: '2.4 MB', version: '1.0', status: 'Valid', accessLevel: 'Public', description: 'Official NAAC accreditation certificate with A+ grade awarded in June 2022.', tags: ['NAAC', 'Accreditation', 'Grade A+'] },
  { id: 'DOC-002', title: 'Anna University Affiliation Letter 2025-26', category: 'Affiliation', issueDate: '2025-07-01', expiryDate: '2026-06-30', uploadedBy: 'Principal Office', fileType: 'PDF', fileSize: '1.1 MB', version: '28th', status: 'Valid', accessLevel: 'Internal', description: 'Annual affiliation renewal letter from Anna University for the academic year 2025-26.', tags: ['Anna University', 'Affiliation', '2025-26'] },
  { id: 'DOC-003', title: 'Trust Deed and Institutional Registration', category: 'Registration', issueDate: '1998-04-12', uploadedBy: 'Admin Office', fileType: 'PDF', fileSize: '4.8 MB', version: 'Original', status: 'Valid', accessLevel: 'Restricted', description: 'Original Trust Deed and Government of Tamil Nadu institutional registration documents.', tags: ['Registration', 'Trust Deed', 'Foundation'] },
  { id: 'DOC-004', title: 'NBA Renewal Application — SAR 2025', category: 'Accreditation', issueDate: '2025-09-01', uploadedBy: 'Academic Affairs', fileType: 'PDF', fileSize: '18.2 MB', version: '1.0 (Draft)', status: 'Valid', accessLevel: 'Internal', description: 'Self-Assessment Report submitted to NBA for renewal of B.Tech program accreditation.', tags: ['NBA', 'SAR', 'Renewal', '2025'] },
  { id: 'DOC-005', title: 'Annual Report 2024-25', category: 'Annual Report', issueDate: '2025-07-15', uploadedBy: 'Principal Office', fileType: 'PDF', fileSize: '12.6 MB', version: '2024-25', status: 'Valid', accessLevel: 'Public', description: 'Comprehensive annual report covering academic performance, research output, financial highlights, and institutional achievements.', tags: ['Annual Report', '2024-25', 'Public'] },
  { id: 'DOC-006', title: 'UGC 2(f) and 12B Certificate', category: 'Recognition', issueDate: '2000-01-20', uploadedBy: 'Admin Office', fileType: 'PDF', fileSize: '0.8 MB', version: 'Original', status: 'Valid', accessLevel: 'Public', description: 'UGC recognition certificate under sections 2(f) and 12B of the UGC Act, 1956.', tags: ['UGC', '2f', '12B', 'Recognition'] },
  { id: 'DOC-007', title: 'Fire Safety Compliance Certificate', category: 'Safety & Emergency', issueDate: '2024-11-01', expiryDate: '2025-10-31', uploadedBy: 'Facilities Management', fileType: 'PDF', fileSize: '0.5 MB', version: '2024', status: 'Expiring Soon', accessLevel: 'Internal', description: 'Fire Safety NOC from the Tamil Nadu Fire and Rescue Services Department.', tags: ['Fire Safety', 'NOC', 'Compliance'] },
  { id: 'DOC-008', title: 'Environment Impact Assessment Certificate', category: 'Compliance', issueDate: '2023-03-01', expiryDate: '2026-02-28', uploadedBy: 'Facilities Management', fileType: 'PDF', fileSize: '3.2 MB', version: '2023', status: 'Valid', accessLevel: 'Internal', description: 'Environmental clearance and impact assessment certificate from State Pollution Control Board.', tags: ['Environment', 'EIA', 'Compliance'] },
]

// ─── Institutional Calendar ────────────────────────────────────────────────────
export interface CalendarEvent {
  id: string
  title: string
  date: string
  endDate?: string
  category: 'Academic' | 'Examination' | 'Holiday' | 'Administrative' | 'Accreditation' | 'Event' | 'Deadline'
  department: string
  campus: string
  description: string
  priority: 'Low' | 'Medium' | 'High' | 'Critical'
  responsible: string
  isAllDay: boolean
}

export const CALENDAR_EVENTS: CalendarEvent[] = [
  { id: 'CAL-001', title: 'Odd Semester End', date: '2025-11-30', category: 'Academic', department: 'All Departments', campus: 'All', description: 'Last day of instruction for Odd Semester 2025-26.', priority: 'High', responsible: 'Academic Office', isAllDay: true },
  { id: 'CAL-002', title: 'End Semester Examinations', date: '2025-12-01', endDate: '2025-12-20', category: 'Examination', department: 'All Departments', campus: 'All', description: 'Odd Semester end-semester theory and practical examinations.', priority: 'Critical', responsible: 'Exam Controller', isAllDay: true },
  { id: 'CAL-003', title: 'NBA Inspection Visit', date: '2025-11-10', endDate: '2025-11-12', category: 'Accreditation', department: 'Academic Affairs', campus: 'Main Campus', description: 'NBA peer team inspection for B.Tech program accreditation renewal.', priority: 'Critical', responsible: 'Principal', isAllDay: true },
  { id: 'CAL-004', title: 'Diwali Holiday', date: '2025-10-20', category: 'Holiday', department: 'All', campus: 'All', description: 'Institution closed for Diwali celebration.', priority: 'Low', responsible: 'Admin Office', isAllDay: true },
  { id: 'CAL-005', title: 'Annual Sports Day', date: '2025-11-22', category: 'Event', department: 'Sports & Co-Curricular', campus: 'Main Campus', description: 'Annual inter-departmental sports meet and athletic competitions.', priority: 'Medium', responsible: 'Mr. Vijay Kumar', isAllDay: true },
  { id: 'CAL-006', title: 'Anna University Affiliation Renewal Deadline', date: '2026-04-01', category: 'Deadline', department: 'Central Administration', campus: 'Main Campus', description: 'Deadline to submit affiliation renewal documents for 2026-27 academic year.', priority: 'Critical', responsible: 'Principal', isAllDay: true },
  { id: 'CAL-007', title: 'NAAC Peer Team Visit (Pre-Assessment)', date: '2026-11-15', endDate: '2026-11-17', category: 'Accreditation', department: 'IQAC', campus: 'Main Campus', description: 'NAAC pre-assessment peer team visit ahead of 2027 reaccreditation.', priority: 'Critical', responsible: 'IQAC Coordinator', isAllDay: true },
  { id: 'CAL-008', title: 'Even Semester Commencement', date: '2026-01-20', category: 'Academic', department: 'All Departments', campus: 'All', description: 'Start of Even Semester 2025-26 classes.', priority: 'High', responsible: 'Academic Office', isAllDay: true },
  { id: 'CAL-009', title: 'Board of Governors Meeting', date: '2025-12-28', category: 'Administrative', department: 'Central Administration', campus: 'Main Campus', description: 'Quarterly Board of Governors meeting to review institutional performance and approve major decisions.', priority: 'High', responsible: 'Chairman, Board of Governors', isAllDay: false },
  { id: 'CAL-010', title: 'Convocation Ceremony', date: '2026-02-14', category: 'Event', department: 'Central Administration', campus: 'Main Campus', description: 'Annual convocation for graduating students of 2024-25 batch.', priority: 'High', responsible: 'Principal', isAllDay: true },
]

// ─── Approval Requests ────────────────────────────────────────────────────────
export interface InstitutionalApproval {
  id: string
  title: string
  type: string
  requestedBy: string
  department: string
  requestDate: string
  description: string
  status: ApprovalStatus
  approver: string
  reviewedDate?: string
  reviewNotes?: string
  priority: 'Low' | 'Medium' | 'High' | 'Urgent'
}

export const INSTITUTIONAL_APPROVALS: InstitutionalApproval[] = [
  { id: 'IA-001', title: 'New Department — Artificial Intelligence & Data Science', type: 'Department Creation', requestedBy: 'Dr. Suresh Rajan', department: 'CSE', requestDate: '2025-10-01', description: 'Proposal to establish a dedicated AI & Data Science department with 3 UG programs from academic year 2026-27.', status: 'Pending', approver: 'Board of Governors', priority: 'High' },
  { id: 'IA-002', title: 'Data Privacy Policy — Publication Approval', type: 'Policy Publication', requestedBy: 'IT Administration', department: 'Central Administration', requestDate: '2025-09-20', description: 'Updated Data Privacy and Acceptable Use Policy v1.2 ready for institutional publication.', status: 'Pending', approver: 'Principal', priority: 'High' },
  { id: 'IA-003', title: 'Research Innovation Lab — Budget Approval', type: 'Campus Configuration', requestedBy: 'Dr. Suresh Rajan', department: 'Research & Innovation Cell', requestDate: '2025-09-15', description: 'Request to allocate ₹45L for a dedicated AI/ML research lab in the Engineering Block.', status: 'Pending', approver: 'Finance Committee', priority: 'Medium' },
  { id: 'IA-004', title: 'Institution Logo Update', type: 'Profile Change', requestedBy: 'Admin Office', department: 'Central Administration', requestDate: '2025-08-01', description: 'Modernize the institutional logo design while retaining the emblem and color scheme.', status: 'Approved', approver: 'Chairman, Board of Governors', reviewedDate: '2025-08-20', reviewNotes: 'Approved. New logo to be implemented from November 2025.', priority: 'Low' },
  { id: 'IA-005', title: 'B.Tech Civil Engineering — New Program', type: 'Academic Program', requestedBy: 'Prof. Ramesh Iyer', department: 'Mechanical Engineering', requestDate: '2025-10-10', description: 'Proposal to launch a B.Tech Civil Engineering program with 60 seats from 2026-27.', status: 'Pending', approver: 'Academic Council', priority: 'Urgent' },
]

// ─── Org Hierarchy ────────────────────────────────────────────────────────────
export interface OrgNode {
  id: string
  name: string
  title: string
  department: string
  reportsTo?: string
  level: number
  type: 'Leadership' | 'Academic' | 'Administrative' | 'Support'
  since: string
  email: string
}

export const ORG_HIERARCHY: OrgNode[] = [
  { id: 'ORG-001', name: 'Dr. Rajaram Venkataraman', title: 'Chairman, Board of Governors', department: 'Board of Governors', level: 1, type: 'Leadership', since: '1998-06-01', email: 'chairman@dpa.edu.in' },
  { id: 'ORG-002', name: 'Dr. Anand Krishnamurthy', title: 'Principal', department: 'Central Administration', reportsTo: 'ORG-001', level: 2, type: 'Leadership', since: '2015-07-01', email: 'principal@dpa.edu.in' },
  { id: 'ORG-003', name: 'Dr. Nalini Subramanian', title: 'Dean — Academic Affairs', department: 'Central Administration', reportsTo: 'ORG-002', level: 3, type: 'Academic', since: '2018-07-01', email: 'dean.academic@dpa.edu.in' },
  { id: 'ORG-004', name: 'Mr. Gopal Krishnaswamy', title: 'Registrar', department: 'Central Administration', reportsTo: 'ORG-002', level: 3, type: 'Administrative', since: '2010-06-01', email: 'registrar@dpa.edu.in' },
  { id: 'ORG-005', name: 'Dr. Suresh Rajan', title: 'Head of Department — CSE', department: 'CSE', reportsTo: 'ORG-003', level: 4, type: 'Academic', since: '2020-07-01', email: 'hod.cse@dpa.edu.in' },
  { id: 'ORG-006', name: 'Dr. Kavitha Sundaram', title: 'Head of Department — ECE', department: 'ECE', reportsTo: 'ORG-003', level: 4, type: 'Academic', since: '2019-07-01', email: 'hod.ece@dpa.edu.in' },
  { id: 'ORG-007', name: 'Prof. Ramesh Iyer', title: 'Head of Department — ME', department: 'ME', reportsTo: 'ORG-003', level: 4, type: 'Academic', since: '2017-07-01', email: 'hod.me@dpa.edu.in' },
  { id: 'ORG-008', name: 'Mrs. Priya Balakrishnan', title: 'Finance Officer', department: 'Finance & Accounts', reportsTo: 'ORG-004', level: 4, type: 'Administrative', since: '2012-06-01', email: 'finance@dpa.edu.in' },
  { id: 'ORG-009', name: 'Mrs. Kamala Devi', title: 'Chief Librarian', department: 'Library & Knowledge Resources', reportsTo: 'ORG-004', level: 4, type: 'Support', since: '2005-06-01', email: 'librarian@dpa.edu.in' },
  { id: 'ORG-010', name: 'Dr. Meena Pillai', title: 'IQAC Coordinator', department: 'Quality Assurance Cell', reportsTo: 'ORG-002', level: 3, type: 'Academic', since: '2022-07-01', email: 'iqac@dpa.edu.in' },
]
