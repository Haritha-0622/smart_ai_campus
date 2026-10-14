import {
  CandidatePerson,
  StaffDossier,
  InductionSession,
  StaffTrainingRecord,
  InstitutionalHrTask,
  StaffDocumentRecord,
  OnboardingTaskItem
} from '../types'

const STORAGE_KEY = 'sac_staff_backend_v2'

interface StaffBackendData {
  candidates: CandidatePerson[]
  dossiers: StaffDossier[]
  inductionSessions: InductionSession[]
  trainingRecords: StaffTrainingRecord[]
  hrTasks: InstitutionalHrTask[]
}

const INITIAL_CANDIDATES: CandidatePerson[] = [
  {
    id: 'cand-001',
    name: 'Dr. Aris Thorne',
    email: 'aris.thorne@cambridge-alum.org',
    phone: '+91 98451 22910',
    roleApplied: 'Professor & Head - Quantum & Cloud Computing',
    department: 'Computer Science & AI',
    experienceYears: 12,
    priority: 'Expedited',
    stage: 'Management Review',
    interviewDate: '2026-10-18',
    interviewTime: '10:30 AM',
    interviewPanel: ['Dean Dr. M. Sundaram', 'Prof. Sarah Jenkins', 'HR Director K. Roy'],
    interviewRating: 4.8,
    expectedJoiningDate: '2026-11-01',
    status: 'Active',
    notes: 'Ex-IISc postdoctoral fellow; published 14 IEEE papers in distributed edge security.',
    onboardingTasks: [
      { id: 'ot-101', title: 'Institutional Cloud Sandbox & Server Cluster Provisioning', completed: true, dueDate: '2026-10-25', category: 'IT Setup' },
      { id: 'ot-102', title: 'Faculty Housing & Relocation Allowance Agreement', completed: true, dueDate: '2026-10-26', category: 'HR Formalities' },
      { id: 'ot-103', title: 'Curriculum & NEP 2020 Credit Scheme Alignment Briefing', completed: false, dueDate: '2026-10-30', category: 'Academic Orientation' },
      { id: 'ot-104', title: 'Biometric Access & High-Performance Lab Smart RFID Card', completed: false, dueDate: '2026-11-01', category: 'Campus Security' }
    ]
  },
  {
    id: 'cand-002',
    name: 'Meenakshi Iyer, M.Sc, B.Ed',
    email: 'meenakshi.iyer@edumail.in',
    phone: '+91 97230 44812',
    roleApplied: 'Senior Secondary Physics Faculty (CBSE/ISC)',
    department: 'Department of Physics',
    experienceYears: 8,
    priority: 'High',
    stage: 'Offer Extended',
    interviewDate: '2026-10-12',
    interviewTime: '02:00 PM',
    interviewPanel: ['Academic Vice-Principal V. Sharma', 'HOD Physics Dr. R. Ramanujan'],
    interviewRating: 4.6,
    expectedJoiningDate: '2026-10-27',
    status: 'Active',
    notes: 'National Science Olympiad mentor; high student engagement feedback during sample lecture.',
    onboardingTasks: [
      { id: 'ot-201', title: 'Teacher LMS & Smart Board Interactive Account Creation', completed: true, dueDate: '2026-10-20', category: 'IT Setup' },
      { id: 'ot-202', title: 'Signed Offer Letter & Provident Fund (EPFO) UAN Linkage', completed: true, dueDate: '2026-10-22', category: 'HR Formalities' },
      { id: 'ot-203', title: 'Child Safety (POCSO) & Mandatory Background Verification', completed: true, dueDate: '2026-10-24', category: 'Campus Security' },
      { id: 'ot-204', title: 'Syllabus Micro-planning & Lab Equipment Familiarization', completed: false, dueDate: '2026-10-27', category: 'Academic Orientation' }
    ]
  },
  {
    id: 'cand-003',
    name: 'Rahul V. Deshmukh',
    email: 'rahul.deshmukh@instamail.com',
    phone: '+91 94210 88203',
    roleApplied: 'Senior Systems & Network Security Administrator',
    department: 'Campus IT & Cyber Infrastructure',
    experienceYears: 6,
    priority: 'High',
    stage: 'Panel Technical',
    interviewDate: '2026-10-19',
    interviewTime: '11:15 AM',
    interviewPanel: ['Chief Technology Officer', 'Cyber Threat Lead'],
    interviewRating: 4.2,
    expectedJoiningDate: '2026-11-15',
    status: 'Active',
    notes: 'CCNA & CISSP certified. Expertise in multi-VLAN campus networks and biometric turnstiles.',
    onboardingTasks: [
      { id: 'ot-301', title: 'Campus Core Switch Super-Admin Role Delegation', completed: false, dueDate: '2026-11-10', category: 'IT Setup' },
      { id: 'ot-302', title: 'Confidentiality & Data Protection Non-Disclosure Agreement (NDA)', completed: false, dueDate: '2026-11-12', category: 'HR Formalities' },
      { id: 'ot-303', title: 'Security Clearances & CCTV Surveillance Control Room Keys', completed: false, dueDate: '2026-11-15', category: 'Campus Security' }
    ]
  },
  {
    id: 'cand-004',
    name: 'Ananya Sen, MA, M.Phil',
    email: 'ananya.sen@humanities.ac.in',
    phone: '+91 98301 55621',
    roleApplied: 'Assistant Professor - English & Communication',
    department: 'Humanities & Social Sciences',
    experienceYears: 5,
    priority: 'Normal',
    stage: 'Interview Scheduled',
    interviewDate: '2026-10-21',
    interviewTime: '03:30 PM',
    interviewPanel: ['Dean Humanities', 'Prof. David Vance'],
    interviewRating: 4.1,
    expectedJoiningDate: '2026-11-20',
    status: 'Active',
    notes: 'Shortlisted from 42 applicants. Special focus on ESL remediation and debate coaching.',
    onboardingTasks: [
      { id: 'ot-401', title: 'Faculty Workstation & ERP Login Generation', completed: false, dueDate: '2026-11-18', category: 'IT Setup' },
      { id: 'ot-402', title: 'Original Degree Certificate Verification with University Registrar', completed: false, dueDate: '2026-11-19', category: 'HR Formalities' }
    ]
  },
  {
    id: 'cand-005',
    name: 'Dr. Vikramaditya Rathore',
    email: 'v.rathore@nanomed.org',
    phone: '+91 99102 77304',
    roleApplied: 'Associate Director - Biotechnology & Research Incubation',
    department: 'Bio-Sciences & Research Center',
    experienceYears: 15,
    priority: 'Expedited',
    stage: 'Onboarding Active',
    interviewDate: '2026-10-05',
    interviewTime: '10:00 AM',
    interviewPanel: ['Board of Trustees Chairman', 'Principal Dr. V. Radhakrishnan'],
    interviewRating: 5.0,
    expectedJoiningDate: '2026-10-25',
    status: 'Hired',
    notes: 'Granted 3 patents in biosensor diagnostic kits. Leading the ₹4.2 Cr DST grant project.',
    onboardingTasks: [
      { id: 'ot-501', title: 'Research Grant Co-PI Signature & Treasury Account Opening', completed: true, dueDate: '2026-10-15', category: 'HR Formalities' },
      { id: 'ot-502', title: 'Cleanroom Lab Class 1000 Bio-Safety Access Authorization', completed: true, dueDate: '2026-10-18', category: 'Campus Security' },
      { id: 'ot-503', title: 'High-End Workstation Laptop & GPU Cloud Cluster Access', completed: true, dueDate: '2026-10-20', category: 'IT Setup' },
      { id: 'ot-504', title: 'Presidential Reception & Departmental All-Hands Keynote', completed: false, dueDate: '2026-10-25', category: 'Academic Orientation' }
    ]
  }
]

const INITIAL_DOSSIERS: StaffDossier[] = [
  {
    id: 'dos-001',
    staffId: 'stf-101',
    staffName: 'Dr. Radhakrishnan V.',
    empNo: 'EMP-FAC-0101',
    department: 'Computer Science & AI',
    designation: 'Senior Professor & Dean',
    complianceScore: 100,
    documents: [
      { id: 'doc-1', type: 'Aadhaar / National ID', status: 'Verified', fileName: 'radhakrishnan_aadhaar_verified.pdf', fileSize: '1.4 MB', uploadDate: '2025-06-10', verifiedBy: 'HR Lead Sunita Nair', verifiedAt: '2025-06-12', remarks: 'UIDAI biometric validated' },
      { id: 'doc-2', type: 'Academic Degree & Transcripts', status: 'Verified', fileName: 'phd_degree_iit_madras.pdf', fileSize: '4.2 MB', uploadDate: '2025-06-10', verifiedBy: 'HR Lead Sunita Nair', verifiedAt: '2025-06-12', remarks: 'Apostilled original verified' },
      { id: 'doc-3', type: 'Police Clearance / Child Safety', status: 'Verified', fileName: 'police_clearance_cert_2025.pdf', fileSize: '850 KB', uploadDate: '2025-06-11', verifiedBy: 'Institutional Safety Officer', verifiedAt: '2025-06-13', remarks: 'Clear police background certificate issued' },
      { id: 'doc-4', type: 'Relieving & Experience Cert', status: 'Verified', fileName: 'relieving_order_ex_university.pdf', fileSize: '2.1 MB', uploadDate: '2025-06-11', verifiedBy: 'HR Lead Sunita Nair', verifiedAt: '2025-06-12', remarks: '15 years service record validated' },
      { id: 'doc-5', type: 'PAN & Salary Mandate', status: 'Verified', fileName: 'pan_hdfc_mandate_signed.pdf', fileSize: '620 KB', uploadDate: '2025-06-11', verifiedBy: 'Accounts Officer T. Rao', verifiedAt: '2025-06-12', remarks: 'Direct deposit active' },
      { id: 'doc-6', type: 'Signed Appointment Order', status: 'Verified', fileName: 'appointment_letter_signed_dean.pdf', fileSize: '3.0 MB', uploadDate: '2025-06-12', verifiedBy: 'Registrar Office', verifiedAt: '2025-06-13', remarks: 'Countersigned by Governing Council' }
    ]
  },
  {
    id: 'dos-002',
    staffId: 'stf-102',
    staffName: 'Meenakshi Iyer',
    empNo: 'EMP-FAC-0102',
    department: 'Department of Physics',
    designation: 'Sr. Secondary Physics Lecturer',
    complianceScore: 83,
    documents: [
      { id: 'doc-21', type: 'Aadhaar / National ID', status: 'Verified', fileName: 'm_iyer_national_identity.pdf', fileSize: '1.1 MB', uploadDate: '2026-10-14', verifiedBy: 'HR Executive P. Kumble', verifiedAt: '2026-10-14', remarks: 'Valid document' },
      { id: 'doc-22', type: 'Academic Degree & Transcripts', status: 'Verified', fileName: 'msc_physics_delhi_univ.pdf', fileSize: '3.4 MB', uploadDate: '2026-10-14', verifiedBy: 'HR Executive P. Kumble', verifiedAt: '2026-10-14', remarks: 'First class distinction' },
      { id: 'doc-23', type: 'Police Clearance / Child Safety', status: 'Pending Review', fileName: 'police_verification_receipt_local_ps.pdf', fileSize: '720 KB', uploadDate: '2026-10-14', remarks: 'Official stamping verification underway with Cyber Crime Branch' },
      { id: 'doc-24', type: 'Relieving & Experience Cert', status: 'Verified', fileName: 'experience_dps_rk_puram.pdf', fileSize: '1.8 MB', uploadDate: '2026-10-14', verifiedBy: 'HR Lead Sunita Nair', verifiedAt: '2026-10-14', remarks: 'Clean service certificate' },
      { id: 'doc-25', type: 'PAN & Salary Mandate', status: 'Verified', fileName: 'pan_sbi_cancelled_cheque.pdf', fileSize: '950 KB', uploadDate: '2026-10-14', verifiedBy: 'Accounts Officer T. Rao', verifiedAt: '2026-10-14', remarks: 'IFSC verified' },
      { id: 'doc-26', type: 'Signed Appointment Order', status: 'Verified', fileName: 'sac_faculty_agreement_signed.pdf', fileSize: '2.5 MB', uploadDate: '2026-10-14', verifiedBy: 'Registrar Office', verifiedAt: '2026-10-14', remarks: 'Accepted terms' }
    ]
  },
  {
    id: 'dos-003',
    staffId: 'stf-103',
    staffName: 'Rajesh G. Kulkarni',
    empNo: 'EMP-ADM-0103',
    department: 'Campus IT & Cyber Infrastructure',
    designation: 'Assistant Network Architect',
    complianceScore: 67,
    documents: [
      { id: 'doc-31', type: 'Aadhaar / National ID', status: 'Verified', fileName: 'aadhaar_card_r_kulkarni.pdf', fileSize: '1.2 MB', uploadDate: '2026-09-01', verifiedBy: 'HR Executive P. Kumble', verifiedAt: '2026-09-02' },
      { id: 'doc-32', type: 'Academic Degree & Transcripts', status: 'Verified', fileName: 'btech_cse_degree_cert.pdf', fileSize: '2.9 MB', uploadDate: '2026-09-01', verifiedBy: 'HR Executive P. Kumble', verifiedAt: '2026-09-02' },
      { id: 'doc-33', type: 'Police Clearance / Child Safety', status: 'Rejected', fileName: 'affidavit_notary_only.pdf', fileSize: '450 KB', uploadDate: '2026-09-02', remarks: 'Notary affidavit rejected. Official SP Police Character Certificate is strictly mandatory per POCSO campus norm.' },
      { id: 'doc-34', type: 'Relieving & Experience Cert', status: 'Verified', fileName: 'tcs_service_certificate.pdf', fileSize: '1.9 MB', uploadDate: '2026-09-01', verifiedBy: 'HR Lead Sunita Nair', verifiedAt: '2026-09-03' },
      { id: 'doc-35', type: 'PAN & Salary Mandate', status: 'Missing', remarks: 'Bank passbook copy has blurred IFSC code. Re-upload requested.' },
      { id: 'doc-36', type: 'Signed Appointment Order', status: 'Verified', fileName: 'signed_appointment_kulkarni.pdf', fileSize: '2.2 MB', uploadDate: '2026-09-02', verifiedBy: 'Registrar Office', verifiedAt: '2026-09-03' }
    ]
  },
  {
    id: 'dos-004',
    staffId: 'stf-104',
    staffName: 'Pooja Anand, M.Pharm',
    empNo: 'EMP-FAC-0104',
    department: 'Department of Chemistry & Bio-Tech',
    designation: 'Assistant Professor & Lab Safety Lead',
    complianceScore: 100,
    documents: [
      { id: 'doc-41', type: 'Aadhaar / National ID', status: 'Verified', fileName: 'pan_aadhaar_dossier.pdf', fileSize: '1.8 MB', uploadDate: '2026-08-15', verifiedBy: 'HR Lead Sunita Nair', verifiedAt: '2026-08-16' },
      { id: 'doc-42', type: 'Academic Degree & Transcripts', status: 'Verified', fileName: 'mpharm_manipal_honors.pdf', fileSize: '4.8 MB', uploadDate: '2026-08-15', verifiedBy: 'HR Lead Sunita Nair', verifiedAt: '2026-08-16' },
      { id: 'doc-43', type: 'Police Clearance / Child Safety', status: 'Verified', fileName: 'karnataka_state_police_pcc.pdf', fileSize: '980 KB', uploadDate: '2026-08-15', verifiedBy: 'Campus Safety Officer', verifiedAt: '2026-08-16' },
      { id: 'doc-44', type: 'Relieving & Experience Cert', status: 'Verified', fileName: 'biocon_relieving_letter.pdf', fileSize: '2.3 MB', uploadDate: '2026-08-15', verifiedBy: 'HR Lead Sunita Nair', verifiedAt: '2026-08-16' },
      { id: 'doc-45', type: 'PAN & Salary Mandate', status: 'Verified', fileName: 'icici_direct_salary_mandate.pdf', fileSize: '510 KB', uploadDate: '2026-08-15', verifiedBy: 'Accounts Officer T. Rao', verifiedAt: '2026-08-16' },
      { id: 'doc-46', type: 'Signed Appointment Order', status: 'Verified', fileName: 'appointment_letter_p_anand.pdf', fileSize: '2.8 MB', uploadDate: '2026-08-16', verifiedBy: 'Registrar Office', verifiedAt: '2026-08-17' }
    ]
  }
]

const INITIAL_INDUCTIONS: InductionSession[] = [
  {
    id: 'ind-001',
    code: 'IND-2026-Q4-01',
    title: 'Institutional Ethos, Child Protection (POCSO) & Campus Code of Conduct',
    date: '2026-10-22',
    time: '09:30 AM - 12:30 PM',
    venue: 'Sir C.V. Raman Auditorium / Hybrid Live Stream',
    facilitator: 'Dr. V. Radhakrishnan (Principal) & Adv. Shalini Menon (Legal Head)',
    targetCohort: 'New Academic Joiners (Batch Oct 2026)',
    description: 'Mandatory statutory session on zero-tolerance student protection policies, anti-harassment protocols, ethics, and campus culture.',
    status: 'Upcoming',
    attendees: [
      { staffId: 'cand-001', staffName: 'Dr. Aris Thorne', department: 'Computer Science & AI', role: 'Professor', attended: false },
      { staffId: 'cand-002', staffName: 'Meenakshi Iyer', department: 'Department of Physics', role: 'Sr. Lecturer', attended: false },
      { staffId: 'cand-003', staffName: 'Rahul V. Deshmukh', department: 'Campus IT', role: 'Systems Admin', attended: false },
      { staffId: 'stf-104', staffName: 'Pooja Anand', department: 'Chemistry', role: 'Asst. Professor', attended: true, signedOffAt: '2026-10-14' }
    ]
  },
  {
    id: 'ind-002',
    code: 'IND-2026-Q4-02',
    title: 'Smart AI Campus LMS, Digital Assessment & RFID Biometric Turnstiles',
    date: '2026-10-24',
    time: '02:00 PM - 04:30 PM',
    venue: 'Computing Centre 2 - Lab Alpha',
    facilitator: 'Campus CTO & EdTech Coordinator',
    targetCohort: 'All Teaching & Lab Instructional Faculty',
    description: 'Hands-on workshop on mark entry, OBE (Outcome Based Education), question bank generation, and smart attendance override workflows.',
    status: 'Upcoming',
    attendees: [
      { staffId: 'cand-001', staffName: 'Dr. Aris Thorne', department: 'Computer Science & AI', role: 'Professor', attended: false },
      { staffId: 'cand-002', staffName: 'Meenakshi Iyer', department: 'Department of Physics', role: 'Sr. Lecturer', attended: false },
      { staffId: 'cand-005', staffName: 'Dr. Vikramaditya Rathore', department: 'Bio-Sciences', role: 'Associate Director', attended: false }
    ]
  },
  {
    id: 'ind-003',
    code: 'IND-2026-Q3-09',
    title: 'Campus Emergency Response, Laboratory Chemical Hazard & Fire Drill',
    date: '2026-09-28',
    time: '10:00 AM - 01:00 PM',
    venue: 'Campus Open Ground & Science Block C',
    facilitator: 'Chief Security Officer Col. P. Rawat & Fire Marshal',
    targetCohort: 'Lab Assistants, Chemistry Faculty, Facility Staff',
    description: 'Practical evacuation procedures, acid spill containment, first aid certifications, and fire extinguisher handling.',
    status: 'Completed',
    attendees: [
      { staffId: 'stf-103', staffName: 'Rajesh G. Kulkarni', department: 'Campus IT', role: 'Network Architect', attended: true, signedOffAt: '2026-09-28 01:15 PM' },
      { staffId: 'stf-104', staffName: 'Pooja Anand', department: 'Chemistry', role: 'Asst. Professor', attended: true, signedOffAt: '2026-09-28 01:10 PM' }
    ]
  }
]

const INITIAL_TRAININGS: StaffTrainingRecord[] = [
  {
    id: 'trn-001',
    moduleCode: 'TRN-POCSO-2026',
    title: 'Statutory POCSO Act & Campus Child Protection Framework',
    category: 'Mandatory Child Protection (POCSO)',
    assignedToStaffId: 'stf-101',
    staffName: 'Dr. Radhakrishnan V.',
    department: 'Computer Science & AI',
    progress: 100,
    dueDate: '2026-10-30',
    status: 'Certified',
    certifiedAt: '2026-09-15',
    score: 98
  },
  {
    id: 'trn-002',
    moduleCode: 'TRN-POCSO-2026',
    title: 'Statutory POCSO Act & Campus Child Protection Framework',
    category: 'Mandatory Child Protection (POCSO)',
    assignedToStaffId: 'stf-102',
    staffName: 'Meenakshi Iyer',
    department: 'Department of Physics',
    progress: 85,
    dueDate: '2026-10-31',
    status: 'In Progress',
    score: 88
  },
  {
    id: 'trn-003',
    moduleCode: 'TRN-AI-PED-2026',
    title: 'Generative AI & Ethical Assessment Grading in Higher Education',
    category: 'AI & Pedagogy',
    assignedToStaffId: 'cand-001',
    staffName: 'Dr. Aris Thorne',
    department: 'Computer Science & AI',
    progress: 60,
    dueDate: '2026-11-15',
    status: 'In Progress',
    score: 92
  },
  {
    id: 'trn-004',
    moduleCode: 'TRN-CHEM-FIRE-2026',
    title: 'Chemical Hazard Management & Cleanroom Safety Protocols',
    category: 'Lab & Fire Safety',
    assignedToStaffId: 'stf-104',
    staffName: 'Pooja Anand',
    department: 'Department of Chemistry & Bio-Tech',
    progress: 100,
    dueDate: '2026-10-15',
    status: 'Certified',
    certifiedAt: '2026-10-12',
    score: 95
  },
  {
    id: 'trn-005',
    moduleCode: 'TRN-NEP-2026',
    title: 'NEP 2020 Multi-Disciplinary Curriculum & Academic Bank of Credits (ABC)',
    category: 'NEP 2020 Accreditation',
    assignedToStaffId: 'stf-103',
    staffName: 'Rajesh G. Kulkarni',
    department: 'Campus IT & Cyber Infrastructure',
    progress: 25,
    dueDate: '2026-11-20',
    status: 'In Progress'
  },
  {
    id: 'trn-006',
    moduleCode: 'TRN-CYBER-2026',
    title: 'Student Data Privacy, FERPA/DPDP Compliance & Phishing Defense',
    category: 'Data Privacy',
    assignedToStaffId: 'cand-003',
    staffName: 'Rahul V. Deshmukh',
    department: 'Campus IT & Cyber Infrastructure',
    progress: 10,
    dueDate: '2026-11-30',
    status: 'In Progress'
  }
]

const INITIAL_HR_TASKS: InstitutionalHrTask[] = [
  {
    id: 'hrt-001',
    taskNumber: 'HR-APR-2026-081',
    type: 'Probation Confirmation',
    staffId: 'stf-104',
    staffName: 'Pooja Anand, M.Pharm',
    department: 'Department of Chemistry & Bio-Tech',
    designation: 'Assistant Professor & Lab Safety Lead',
    priority: 'High',
    submittedDate: '2026-10-08',
    slaDeadline: '2026-10-18',
    status: 'Pending HR Review',
    requestedDetails: 'Completion of 1-year probation period. Head of Department has submitted exemplary appraisal (Score: 4.85/5.0). All student feedback exceeds 92%. Recommend confirmation into permanent rolls.',
    reviewedBy: undefined
  },
  {
    id: 'hrt-002',
    taskNumber: 'HR-APR-2026-082',
    type: 'IT & Asset Allocation',
    staffId: 'cand-001',
    staffName: 'Dr. Aris Thorne',
    department: 'Computer Science & AI',
    designation: 'Professor & Head',
    priority: 'Urgent',
    submittedDate: '2026-10-13',
    slaDeadline: '2026-10-16',
    status: 'Pending HR Review',
    requestedDetails: 'Requisition for 1x Apple MacBook Pro M3 Max 64GB Unified Memory and high-security YubiKey hardware tokens for quantum computing cluster access.',
    reviewedBy: undefined
  },
  {
    id: 'hrt-003',
    taskNumber: 'HR-APR-2026-083',
    type: 'Research Publication Grant',
    staffId: 'stf-101',
    staffName: 'Dr. Radhakrishnan V.',
    department: 'Computer Science & AI',
    designation: 'Senior Professor & Dean',
    priority: 'Normal',
    submittedDate: '2026-10-10',
    slaDeadline: '2026-10-25',
    status: 'Approved',
    requestedDetails: 'Grant request of ₹1,45,000 for presenting IEEE International Conference on Pervasive Computing in Tokyo. Airfare & registration clearance.',
    actionRemarks: 'Sanctioned under Institutional Faculty International Research Fund 2026.',
    reviewedBy: 'Governing Council Dean',
    reviewedAt: '2026-10-12 04:30 PM'
  },
  {
    id: 'hrt-004',
    taskNumber: 'HR-APR-2026-084',
    type: 'Salary Revision / Grade Pay',
    staffId: 'stf-102',
    staffName: 'Meenakshi Iyer',
    department: 'Department of Physics',
    designation: 'Sr. Secondary Physics Lecturer',
    priority: 'High',
    submittedDate: '2026-10-11',
    slaDeadline: '2026-10-20',
    status: 'Pending HR Review',
    requestedDetails: 'Recommendation for Grade Pay elevation to Level 11 after achieving 100% board exam distinctions and completing Master Trainer certification.',
    reviewedBy: undefined
  },
  {
    id: 'hrt-005',
    taskNumber: 'HR-APR-2026-085',
    type: 'Maternity / Sabbatical Leave',
    staffId: 'stf-105',
    staffName: 'Dr. Sunita Chandrasekhar',
    department: 'Biotechnology',
    designation: 'Associate Professor',
    priority: 'Normal',
    submittedDate: '2026-10-05',
    slaDeadline: '2026-10-15',
    status: 'Approved',
    requestedDetails: '26-week statutory maternity leave request with full benefits starting Nov 1, 2026. Guest faculty replacement roster submitted and approved by HOD.',
    actionRemarks: 'Statutory leave verified by HR Legal team. Approved with full salary credits.',
    reviewedBy: 'Director of HR',
    reviewedAt: '2026-10-09 11:20 AM'
  }
]

class StaffBackendService {
  private loadData(): StaffBackendData {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (e) {
      console.warn('Could not read staff backend storage, falling back to defaults', e)
    }

    const defaultData: StaffBackendData = {
      candidates: INITIAL_CANDIDATES,
      dossiers: INITIAL_DOSSIERS,
      inductionSessions: INITIAL_INDUCTIONS,
      trainingRecords: INITIAL_TRAININGS,
      hrTasks: INITIAL_HR_TASKS
    }
    this.saveData(defaultData)
    return defaultData
  }

  private saveData(data: StaffBackendData): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (e) {
      console.error('Failed to save staff backend storage', e)
    }
  }

  // ================= 1. CANDIDATES & ONBOARDING TASKS =================
  async getCandidates(): Promise<CandidatePerson[]> {
    return this.loadData().candidates
  }

  async addCandidate(candidate: Omit<CandidatePerson, 'id'>): Promise<CandidatePerson> {
    const data = this.loadData()
    const newCand: CandidatePerson = {
      ...candidate,
      id: `cand-${Date.now()}`
    }
    data.candidates = [newCand, ...data.candidates]
    this.saveData(data)
    return newCand
  }

  async updateCandidateStage(candidateId: string, newStage: CandidatePerson['stage']): Promise<CandidatePerson> {
    const data = this.loadData()
    const idx = data.candidates.findIndex(c => c.id === candidateId)
    if (idx === -1) throw new Error('Candidate not found')

    data.candidates[idx].stage = newStage
    if (newStage === 'Onboarding Active' && data.candidates[idx].status !== 'Hired') {
      data.candidates[idx].status = 'Hired'
    }
    this.saveData(data)
    return data.candidates[idx]
  }

  async updateCandidatePriority(candidateId: string, priority: CandidatePerson['priority']): Promise<CandidatePerson> {
    const data = this.loadData()
    const idx = data.candidates.findIndex(c => c.id === candidateId)
    if (idx === -1) throw new Error('Candidate not found')
    data.candidates[idx].priority = priority
    this.saveData(data)
    return data.candidates[idx]
  }

  async toggleOnboardingTask(candidateId: string, taskId: string): Promise<CandidatePerson> {
    const data = this.loadData()
    const cand = data.candidates.find(c => c.id === candidateId)
    if (!cand) throw new Error('Candidate not found')
    const task = cand.onboardingTasks.find(t => t.id === taskId)
    if (task) {
      task.completed = !task.completed
    }
    this.saveData(data)
    return cand
  }

  async addOnboardingTask(candidateId: string, task: Omit<OnboardingTaskItem, 'id'>): Promise<CandidatePerson> {
    const data = this.loadData()
    const cand = data.candidates.find(c => c.id === candidateId)
    if (!cand) throw new Error('Candidate not found')
    cand.onboardingTasks.push({
      ...task,
      id: `ot-${Date.now()}`
    })
    this.saveData(data)
    return cand
  }

  async scheduleInterview(candidateId: string, date: string, time: string, panel: string[]): Promise<CandidatePerson> {
    const data = this.loadData()
    const cand = data.candidates.find(c => c.id === candidateId)
    if (!cand) throw new Error('Candidate not found')
    cand.interviewDate = date
    cand.interviewTime = time
    cand.interviewPanel = panel
    cand.stage = 'Interview Scheduled'
    this.saveData(data)
    return cand
  }

  // ================= 2. DOCUMENT COLLECTION & VALIDATION =================
  async getDossiers(): Promise<StaffDossier[]> {
    return this.loadData().dossiers
  }

  async validateDocument(dossierId: string, documentId: string, verifiedBy: string = 'Campus HR Auditor'): Promise<StaffDossier> {
    const data = this.loadData()
    const dossier = data.dossiers.find(d => d.id === dossierId)
    if (!dossier) throw new Error('Dossier not found')

    const doc = dossier.documents.find(d => d.id === documentId)
    if (!doc) throw new Error('Document not found')

    doc.status = 'Verified'
    doc.verifiedBy = verifiedBy
    doc.verifiedAt = new Date().toISOString().split('T')[0]
    doc.remarks = 'Statutory compliance & authenticity confirmed'

    // Recalculate compliance score
    const verifiedCount = dossier.documents.filter(d => d.status === 'Verified').length
    dossier.complianceScore = Math.round((verifiedCount / dossier.documents.length) * 100)

    this.saveData(data)
    return dossier
  }

  async rejectDocument(dossierId: string, documentId: string, reason: string): Promise<StaffDossier> {
    const data = this.loadData()
    const dossier = data.dossiers.find(d => d.id === dossierId)
    if (!dossier) throw new Error('Dossier not found')

    const doc = dossier.documents.find(d => d.id === documentId)
    if (!doc) throw new Error('Document not found')

    doc.status = 'Rejected'
    doc.remarks = reason || 'Document rejected. Please upload an official verified copy.'
    doc.verifiedBy = undefined
    doc.verifiedAt = undefined

    const verifiedCount = dossier.documents.filter(d => d.status === 'Verified').length
    dossier.complianceScore = Math.round((verifiedCount / dossier.documents.length) * 100)

    this.saveData(data)
    return dossier
  }

  async uploadOrReplaceDocument(
    dossierId: string,
    docType: StaffDocumentRecord['type'],
    fileName: string,
    fileSize: string = '1.8 MB'
  ): Promise<StaffDossier> {
    const data = this.loadData()
    const dossier = data.dossiers.find(d => d.id === dossierId)
    if (!dossier) throw new Error('Dossier not found')

    let doc = dossier.documents.find(d => d.type === docType)
    if (!doc) {
      doc = {
        id: `doc-${Date.now()}`,
        type: docType,
        status: 'Pending Review',
        fileName,
        fileSize,
        uploadDate: new Date().toISOString().split('T')[0],
        remarks: 'Uploaded by staff. Pending HR validation.'
      }
      dossier.documents.push(doc)
    } else {
      doc.status = 'Pending Review'
      doc.fileName = fileName
      doc.fileSize = fileSize
      doc.uploadDate = new Date().toISOString().split('T')[0]
      doc.remarks = 'Fresh document submitted. Pending HR review.'
    }

    const verifiedCount = dossier.documents.filter(d => d.status === 'Verified').length
    dossier.complianceScore = Math.round((verifiedCount / dossier.documents.length) * 100)

    this.saveData(data)
    return dossier
  }

  // ================= 3. INDUCTION SESSIONS =================
  async getInductionSessions(): Promise<InductionSession[]> {
    return this.loadData().inductionSessions
  }

  async createInductionSession(session: Omit<InductionSession, 'id' | 'code'>): Promise<InductionSession> {
    const data = this.loadData()
    const newSession: InductionSession = {
      ...session,
      id: `ind-${Date.now()}`,
      code: `IND-2026-Q4-${String(data.inductionSessions.length + 1).padStart(2, '0')}`
    }
    data.inductionSessions = [newSession, ...data.inductionSessions]
    this.saveData(data)
    return newSession
  }

  async toggleInductionAttendance(sessionId: string, staffId: string): Promise<InductionSession> {
    const data = this.loadData()
    const sess = data.inductionSessions.find(s => s.id === sessionId)
    if (!sess) throw new Error('Induction session not found')

    const attendee = sess.attendees.find(a => a.staffId === staffId)
    if (attendee) {
      attendee.attended = !attendee.attended
      attendee.signedOffAt = attendee.attended ? new Date().toLocaleString() : undefined
    }
    this.saveData(data)
    return sess
  }

  async completeInductionSession(sessionId: string): Promise<InductionSession> {
    const data = this.loadData()
    const sess = data.inductionSessions.find(s => s.id === sessionId)
    if (!sess) throw new Error('Induction session not found')
    sess.status = 'Completed'
    this.saveData(data)
    return sess
  }

  // ================= 4. TRAINING ASSIGNMENT & TRACKING =================
  async getTrainingRecords(): Promise<StaffTrainingRecord[]> {
    return this.loadData().trainingRecords
  }

  async assignTraining(record: Omit<StaffTrainingRecord, 'id'>): Promise<StaffTrainingRecord> {
    const data = this.loadData()
    const newRecord: StaffTrainingRecord = {
      ...record,
      id: `trn-${Date.now()}`
    }
    data.trainingRecords = [newRecord, ...data.trainingRecords]
    this.saveData(data)
    return newRecord
  }

  async updateTrainingProgress(id: string, progress: number): Promise<StaffTrainingRecord> {
    const data = this.loadData()
    const rec = data.trainingRecords.find(r => r.id === id)
    if (!rec) throw new Error('Training record not found')

    rec.progress = Math.min(100, Math.max(0, progress))
    if (rec.progress === 100) {
      rec.status = 'Certified'
      rec.certifiedAt = new Date().toISOString().split('T')[0]
      if (!rec.score) rec.score = 94
    } else if (rec.progress > 0) {
      rec.status = 'In Progress'
    }
    this.saveData(data)
    return rec
  }

  // ================= 5. INSTITUTIONAL HR TASKS & APPROVALS =================
  async getHrTasks(): Promise<InstitutionalHrTask[]> {
    return this.loadData().hrTasks
  }

  async createHrTask(task: Omit<InstitutionalHrTask, 'id' | 'taskNumber'>): Promise<InstitutionalHrTask> {
    const data = this.loadData()
    const newTask: InstitutionalHrTask = {
      ...task,
      id: `hrt-${Date.now()}`,
      taskNumber: `HR-APR-2026-${String(data.hrTasks.length + 80).padStart(3, '0')}`
    }
    data.hrTasks = [newTask, ...data.hrTasks]
    this.saveData(data)
    return newTask
  }

  async approveHrTask(taskId: string, reviewerName: string = 'Campus HR Director', remarks: string = 'Approved under institutional policies'): Promise<InstitutionalHrTask> {
    const data = this.loadData()
    const task = data.hrTasks.find(t => t.id === taskId)
    if (!task) throw new Error('HR Task not found')

    task.status = 'Approved'
    task.reviewedBy = reviewerName
    task.reviewedAt = new Date().toLocaleString()
    task.actionRemarks = remarks
    this.saveData(data)
    return task
  }

  async rejectHrTask(taskId: string, reviewerName: string = 'Campus HR Director', remarks: string = 'Rejected per management review'): Promise<InstitutionalHrTask> {
    const data = this.loadData()
    const task = data.hrTasks.find(t => t.id === taskId)
    if (!task) throw new Error('HR Task not found')

    task.status = 'Rejected'
    task.reviewedBy = reviewerName
    task.reviewedAt = new Date().toLocaleString()
    task.actionRemarks = remarks
    this.saveData(data)
    return task
  }

  async escalateHrTask(taskId: string, remarks: string = 'Escalated to Institutional Director for special approval'): Promise<InstitutionalHrTask> {
    const data = this.loadData()
    const task = data.hrTasks.find(t => t.id === taskId)
    if (!task) throw new Error('HR Task not found')

    task.status = 'Escalated to Director'
    task.actionRemarks = remarks
    this.saveData(data)
    return task
  }

  // Reset demo storage to fresh defaults if needed
  resetToDefaults(): StaffBackendData {
    const defaultData: StaffBackendData = {
      candidates: INITIAL_CANDIDATES,
      dossiers: INITIAL_DOSSIERS,
      inductionSessions: INITIAL_INDUCTIONS,
      trainingRecords: INITIAL_TRAININGS,
      hrTasks: INITIAL_HR_TASKS
    }
    this.saveData(defaultData)
    return defaultData
  }
}

export const staffBackendService = new StaffBackendService()
