import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'

// Layout
import { WorkspaceLayout } from './components/layout/WorkspaceLayout'

// Public Pages
import { LandingPage } from './pages/public/LandingPage'
import { SchoolsSolutionPage } from './pages/public/SchoolsSolutionPage'
import { CollegesSolutionPage } from './pages/public/CollegesSolutionPage'
import { FeaturesPage } from './pages/public/FeaturesPage'
import { PricingPage } from './pages/public/PricingPage'
import { AboutPage } from './pages/public/AboutPage'
import { LoginPage } from './pages/public/LoginPage'
import { RequestDemoPage } from './pages/public/RequestDemoPage'

// Workspace Modules
import { ExecutiveDashboard } from './pages/workspace/ExecutiveDashboard'
import { Module01_InstitutionSetup } from './pages/workspace/Module01_InstitutionSetup'
import { Module02_IdentityManagement } from './pages/workspace/Module02_IdentityManagement'
import { Module03_RfidAttendance } from './pages/workspace/Module03_RfidAttendance'
import { Module04_StudentPortal } from './pages/workspace/Module04_StudentPortal'
import { Module05_TeacherPortal } from './pages/workspace/Module05_TeacherPortal'
import { Module06_StaffDashboard } from './pages/workspace/Module06_StaffDashboard'
import { Module07_AcademicManagement } from './pages/workspace/Module07_AcademicManagement'
import { Module08_TransportManagement } from './pages/workspace/Module08_TransportManagement'
import { Module09_LMS } from './pages/workspace/Module09_LMS'
import { Module10_GadgetAssetTracking } from './pages/workspace/Module10_GadgetAssetTracking'
import { Module11_CommunicationManagement } from './pages/workspace/Module11_CommunicationManagement'
import { Module12_ExaminationManagement } from './pages/workspace/Module12_ExaminationManagement'
import { Module13_FinanceFees } from './pages/workspace/Module13_FinanceFees'
import { Module14_InventoryProcurement } from './pages/workspace/Module14_InventoryProcurement'
import { Module15_CanteenManagement } from './pages/workspace/Module15_CanteenManagement'
import { Module16_HostelManagement } from './pages/workspace/Module16_HostelManagement'
import { Module17_LibraryManagement } from './pages/workspace/Module17_LibraryManagement'
import { Module18_AnalyticsExecutive } from './pages/workspace/Module18_AnalyticsExecutive'
import { Module19_InstitutionalHR } from './pages/workspace/Module19_InstitutionalHR'
import { Module20_ApprovalsWorkflow } from './pages/workspace/Module20_ApprovalsWorkflow'
import { Module21_NotificationsAlerts } from './pages/workspace/Module21_NotificationsAlerts'
import { Module22_AIAssistantHub } from './pages/workspace/Module22_AIAssistantHub'
import { Module23_ReportsExports } from './pages/workspace/Module23_ReportsExports'
import { Module24_SecurityAudit } from './pages/workspace/Module24_SecurityAudit'
import { Module25_IntegrationsCenter } from './pages/workspace/Module25_IntegrationsCenter'
import { Module26_SaaSAdmin } from './pages/workspace/Module26_SaaSAdmin'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Marketing Website */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/solutions/schools" element={<SchoolsSolutionPage />} />
          <Route path="/solutions/colleges" element={<CollegesSolutionPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/request-demo" element={<RequestDemoPage />} />

          {/* SaaS Workspace App Shell with Nested Modules */}
          <Route path="/app" element={<WorkspaceLayout />}>
            <Route index element={<Navigate to="/app/executive" replace />} />
            <Route path="executive" element={<ExecutiveDashboard />} />
            <Route path="institution-setup" element={<Module01_InstitutionSetup />} />
            <Route path="identity-management" element={<Module02_IdentityManagement />} />
            <Route path="rfid-attendance" element={<Module03_RfidAttendance />} />
            <Route path="student-portal" element={<Module04_StudentPortal />} />
            <Route path="teacher-portal" element={<Module05_TeacherPortal />} />
            <Route path="staff" element={<Module06_StaffDashboard />} />
            <Route path="academics" element={<Module07_AcademicManagement />} />
            <Route path="transport" element={<Module08_TransportManagement />} />
            <Route path="lms" element={<Module09_LMS />} />
            <Route path="assets" element={<Module10_GadgetAssetTracking />} />
            <Route path="communication" element={<Module11_CommunicationManagement />} />
            <Route path="examinations" element={<Module12_ExaminationManagement />} />
            <Route path="finance" element={<Module13_FinanceFees />} />
            <Route path="inventory" element={<Module14_InventoryProcurement />} />
            <Route path="canteen" element={<Module15_CanteenManagement />} />
            <Route path="hostel" element={<Module16_HostelManagement />} />
            <Route path="library" element={<Module17_LibraryManagement />} />
            <Route path="analytics" element={<Module18_AnalyticsExecutive />} />
            <Route path="hr" element={<Module19_InstitutionalHR />} />
            <Route path="approvals" element={<Module20_ApprovalsWorkflow />} />
            <Route path="notifications" element={<Module21_NotificationsAlerts />} />
            <Route path="copilot-hub" element={<Module22_AIAssistantHub />} />
            <Route path="reports" element={<Module23_ReportsExports />} />
            <Route path="security" element={<Module24_SecurityAudit />} />
            <Route path="integrations" element={<Module25_IntegrationsCenter />} />
            <Route path="saas-admin" element={<Module26_SaaSAdmin />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
