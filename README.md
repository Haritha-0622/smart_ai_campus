# Smart AI Campus (SAC) 🎓

> **One Intelligent Campus. Every Possibility.**  
> An enterprise-grade, multi-tenant digital operating system for schools and colleges built around an **80% customer benefit / 20% feature** philosophy and a **5-second traffic-light executive clarity** model.

---

## 🌟 Key Features

- **Multi-Tenant Architecture**: Switch between K-12 School Mode (*Delhi Public Academy*, CBSE) and College/University Mode (*Apex Institute of Technology*, NAAC A++).
- **15 User Roles**: Tailored workspaces for *Super Admin, Correspondent, Principal, Admin, Teacher, Student, Parent, HR, Finance, Stores, Librarian, Hostel Warden, Canteen Operator, Transport Manager, and Vendor*.
- **26 Operational Modules**: Fully functional modules covering Identity, RFID Attendance, Exams, Finance, Transport Telematics, LMS (Thirukkural Project), Hostel Outpass, Library, Analytics, Workflows, and more.
- **5-Second Executive Health**: Immediate status indicators for attendance, fleet operations, fee inflows, and pending approvals.
- **SAC Copilot Intelligence**: Context-aware, deterministic AI assistant drawer with grounded explanation cards and advisory guardrails.
- **Real-Time Workflows**:
  - Student enrollment and instant RFID badge provisioning
  - RFID turnstile attendance ingest & automated parent SMS triggers
  - Statutory 6-Department No-Due & TC Clearance Matrix
  - Smart Purchase Alarms & Stores PO approval
  - Digital hostel outpass with 2-way guardian verification
  - Canteen RFID cashless tap-to-pay simulator

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Routing**: [React Router v7](https://reactrouter.com/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Haritha-0622/smart_ai_campus.git
   cd smart_ai_campus
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```

4. Open your browser at `http://localhost:5173/`.

---

## 📂 Project Structure

```
smart-ai-campus/
├── src/
│   ├── components/
│   │   ├── common/        # Badges, StatCards, Modals, CSV Exporters, Toasts
│   │   ├── copilot/       # SAC Copilot Intelligence Drawer
│   │   ├── layout/        # Navbar, Header, Sidebar, App Shell
│   │   ├── search/        # Global Search Modal (Ctrl + K)
│   │   └── workflows/     # Interactive simulation modals
│   ├── context/           # AppContext state & multi-tenancy management
│   ├── data/              # Linked mock datasets, institutions, 15 personas
│   ├── pages/
│   │   ├── public/        # Landing page, solution pages, pricing, login
│   │   └── workspace/     # All 26 modular SaaS dashboard screens
│   └── types/             # TypeScript interfaces and domain models
├── public/                # Static assets & favicons
└── vite.config.ts         # Vite configuration with Tailwind CSS v4
```

---

## 📄 License

This project is licensed under the MIT License.
