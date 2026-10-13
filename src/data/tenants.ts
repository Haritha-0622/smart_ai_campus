import { Institution, UserPersona } from '../types'

export const INSTITUTIONS: Institution[] = [
  {
    id: 'delhi-public-academy',
    name: 'Delhi Public Academy',
    type: 'school',
    code: 'DPA-DL',
    boardOrUniversity: 'CBSE Affiliation #213084',
    campuses: [
      { id: 'dpa-main', name: 'Main Campus (Vasant Kunj)', location: 'Sector C, Vasant Kunj, New Delhi' },
      { id: 'dpa-south', name: 'South Extension Wing', location: 'Ring Road, South Ext-II, New Delhi' }
    ],
    academicYears: ['2024-2025', '2025-2026', '2026-2027'],
    currentYear: '2025-2026',
    currency: '₹',
    studentCount: 2840,
    staffCount: 168,
    tagline: 'Excellence in K-12 Foundations & Character Building'
  },
  {
    id: 'apex-institute-tech',
    name: 'Apex Institute of Technology & Sciences',
    type: 'college',
    code: 'AITS-BLR',
    boardOrUniversity: 'Autonomous | NAAC A++ (CGPA 3.82) | NBA Accredited',
    campuses: [
      { id: 'aits-techcity', name: 'Tech City Campus (Electronic City)', location: 'Phase 1, Hosur Road, Bengaluru' },
      { id: 'aits-innovation', name: 'Innovation & Research Hub', location: 'Whitefield Cyber Park, Bengaluru' }
    ],
    academicYears: ['2024-2025', '2025-2026', '2026-2027'],
    currentYear: '2025-2026',
    currency: '₹',
    studentCount: 4620,
    staffCount: 310,
    tagline: 'Leading Engineering, AI Innovations & Higher Research'
  }
]

export const USER_PERSONAS: UserPersona[] = [
  {
    id: 'super-admin-01',
    role: 'super_admin',
    name: 'Dr. Vikram Malhotra',
    title: 'Platform Chief Architect & SuperAdmin',
    department: 'Cloud Platform Operations',
    email: 'v.malhotra@smartcampus.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    institutionId: 'delhi-public-academy',
    campusId: 'dpa-main',
    badgeColor: 'bg-purple-600 text-white'
  },
  {
    id: 'correspondent-01',
    role: 'correspondent',
    name: 'Er. S. R. Chidambaram',
    title: 'Managing Trustee & Correspondent',
    department: 'Board of Governors',
    email: 'correspondent@dpa.edu.in',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    institutionId: 'delhi-public-academy',
    campusId: 'dpa-main',
    badgeColor: 'bg-indigo-700 text-white'
  },
  {
    id: 'principal-01',
    role: 'principal',
    name: 'Dr. Ananya Sengupta',
    title: 'Principal & Academic Director',
    department: 'Office of the Principal',
    email: 'principal@dpa.edu.in',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    institutionId: 'delhi-public-academy',
    campusId: 'dpa-main',
    badgeColor: 'bg-blue-600 text-white'
  },
  {
    id: 'admin-01',
    role: 'admin',
    name: 'Rajesh Varma',
    title: 'Chief Administrative Officer',
    department: 'Central Administration & Registrar',
    email: 'admin.office@dpa.edu.in',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    institutionId: 'delhi-public-academy',
    campusId: 'dpa-main',
    badgeColor: 'bg-slate-700 text-white'
  },
  {
    id: 'teacher-01',
    role: 'teacher',
    name: 'Prof. Meenakshi Sundaram',
    title: 'Senior Faculty & Academic Coordinator',
    department: 'Physics & STEM Sciences',
    email: 'm.sundaram@dpa.edu.in',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    institutionId: 'delhi-public-academy',
    campusId: 'dpa-main',
    badgeColor: 'bg-teal-600 text-white'
  },
  {
    id: 'student-01',
    role: 'student',
    name: 'Rohan S. Krishna',
    title: 'Senior Student (ID: SAC-2025-0842)',
    department: 'Grade 11-A (Science Stream)',
    email: 'rohan.k@student.dpa.edu.in',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    institutionId: 'delhi-public-academy',
    campusId: 'dpa-main',
    badgeColor: 'bg-emerald-600 text-white'
  },
  {
    id: 'parent-01',
    role: 'parent',
    name: 'S. K. Subramanian',
    title: 'Parent (Guardian of Rohan S. Krishna)',
    department: 'Parent-Teacher Association Wing',
    email: 'subramanian.sk@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    institutionId: 'delhi-public-academy',
    campusId: 'dpa-main',
    badgeColor: 'bg-cyan-600 text-white'
  },
  {
    id: 'hr-01',
    role: 'hr',
    name: 'Sunita Deshmukh',
    title: 'Head of Human Resources',
    department: 'Talent Acquisition & Faculty Welfare',
    email: 'hr.head@dpa.edu.in',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    institutionId: 'delhi-public-academy',
    campusId: 'dpa-main',
    badgeColor: 'bg-rose-600 text-white'
  },
  {
    id: 'finance-01',
    role: 'finance',
    name: 'K. Ramanathan, CA',
    title: 'Chief Financial Officer',
    department: 'Bursar & Treasury Operations',
    email: 'accounts@dpa.edu.in',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    institutionId: 'delhi-public-academy',
    campusId: 'dpa-main',
    badgeColor: 'bg-amber-600 text-white'
  },
  {
    id: 'stores-01',
    role: 'stores',
    name: 'Gurpreet Singh',
    title: 'Central Stores & Procurement Officer',
    department: 'Inventory & Materials Logistics',
    email: 'procurement@dpa.edu.in',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    institutionId: 'delhi-public-academy',
    campusId: 'dpa-main',
    badgeColor: 'bg-orange-600 text-white'
  },
  {
    id: 'librarian-01',
    role: 'librarian',
    name: 'Dr. M. Jayashree',
    title: 'Chief Information & Library Officer',
    department: 'Central Knowledge Commons',
    email: 'library@dpa.edu.in',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
    institutionId: 'delhi-public-academy',
    campusId: 'dpa-main',
    badgeColor: 'bg-teal-700 text-white'
  },
  {
    id: 'hostel-01',
    role: 'hostel',
    name: 'Col. K. Balaji (Retd.)',
    title: 'Chief Residential Warden',
    department: 'Campus Hostels & Residential Security',
    email: 'hostel.warden@dpa.edu.in',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    institutionId: 'delhi-public-academy',
    campusId: 'dpa-main',
    badgeColor: 'bg-stone-700 text-white'
  },
  {
    id: 'canteen-01',
    role: 'canteen',
    name: 'Farhan Ahmed',
    title: 'Campus Food & Dining Supervisor',
    department: 'Dining Services & Cashless Cafeteria',
    email: 'dining@dpa.edu.in',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    institutionId: 'delhi-public-academy',
    campusId: 'dpa-main',
    badgeColor: 'bg-lime-700 text-white'
  },
  {
    id: 'transport-01',
    role: 'transport',
    name: 'M. Selvakumar',
    title: 'Fleet Operations & Transport Manager',
    department: 'Campus Transport Services',
    email: 'transport@dpa.edu.in',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    institutionId: 'delhi-public-academy',
    campusId: 'dpa-main',
    badgeColor: 'bg-blue-700 text-white'
  },
  {
    id: 'vendor-01',
    role: 'vendor',
    name: 'Arvind Narang',
    title: 'Authorized Institutional Supplier',
    department: 'Apex Scientific Instruments & Lab Supplies',
    email: 'orders@apexlabs.in',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
    institutionId: 'delhi-public-academy',
    campusId: 'dpa-main',
    badgeColor: 'bg-emerald-700 text-white'
  }
]
