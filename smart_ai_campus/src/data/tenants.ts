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
    badgeColor: 'bg-amber-600 text-white'
  },
  {
    id: 'principal-01',
    role: 'principal',
    name: 'Dr. Kavitha Krishnamurthy',
    title: 'Principal & Academic Director',
    department: 'Academic Council',
    email: 'principal@dpa.edu.in',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    institutionId: 'delhi-public-academy',
    campusId: 'dpa-main',
    badgeColor: 'bg-indigo-600 text-white'
  },
  {
    id: 'admin-01',
    role: 'admin',
    name: 'Rajesh Varma',
    title: 'Chief Administrative Officer',
    department: 'Central Administration',
    email: 'admin.office@dpa.edu.in',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    institutionId: 'delhi-public-academy',
    campusId: 'dpa-main',
    badgeColor: 'bg-slate-600 text-white'
  },
  {
    id: 'teacher-01',
    role: 'teacher',
    name: 'Prof. Meenakshi Sundaram',
    title: 'Senior Faculty / PGT Physics',
    department: 'Physics & STEM Sciences',
    email: 'm.sundaram@dpa.edu.in',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    institutionId: 'delhi-public-academy',
    campusId: 'dpa-main',
    badgeColor: 'bg-teal-600 text-white'
  },
  {
    id: 'finance-01',
    role: 'finance',
    name: 'Mrs. Usha Patel',
    title: 'Head of Finance & Accounts',
    department: 'Finance & Accounts',
    email: 'finance@dpa.edu.in',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    institutionId: 'delhi-public-academy',
    campusId: 'dpa-main',
    badgeColor: 'bg-emerald-600 text-white'
  },
  {
    id: 'librarian-01',
    role: 'librarian',
    name: 'Dr. M. Jayashree',
    title: 'Chief Information & Library Officer',
    department: 'Central Knowledge Commons',
    email: 'library@dpa.edu.in',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    institutionId: 'delhi-public-academy',
    campusId: 'dpa-main',
    badgeColor: 'bg-orange-600 text-white'
  },
  {
    id: 'hostel-01',
    role: 'hostel',
    name: 'Mr. Suresh Kumar',
    title: 'Chief Warden & Hostel Manager',
    department: 'Residential Campus Operations',
    email: 'hostel@dpa.edu.in',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    institutionId: 'delhi-public-academy',
    campusId: 'dpa-main',
    badgeColor: 'bg-rose-600 text-white'
  }
]
