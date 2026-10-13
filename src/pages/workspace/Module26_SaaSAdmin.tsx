import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { INSTITUTIONS } from '../../data/tenants'
import { Badge } from '../../components/common/Badge'
import { Modal } from '../../components/common/Modal'
import { Settings, Building2, Server, ShieldCheck, Plus, CheckCircle2, ToggleLeft, ToggleRight } from 'lucide-react'

export const Module26_SaaSAdmin: React.FC = () => {
  const { showToast } = useApp()
  const [onboardModalOpen, setOnboardModalOpen] = useState(false)

  const [features, setFeatures] = useState({
    aiCopilot: true,
    cashlessWallet: true,
    gpsFleetTelematics: true,
    biometricFacialTurnstiles: false,
    statutoryTcClearanceEngine: true
  })

  const toggleFeature = (key: keyof typeof features) => {
    setFeatures((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      showToast(`Feature flag "${key}" set to ${next[key] ? 'ENABLED' : 'DISABLED'}`, 'info')
      return next
    })
  }

  const handleOnboardNew = (e: React.FormEvent) => {
    e.preventDefault()
    showToast('New institutional tenant provisioned on multi-tenant cluster!', 'success')
    setOnboardModalOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              26. Platform SuperAdmin & Multi-Tenant Governance
            </h1>
            <Badge variant="indigo">Module 26</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Global cloud instance administration, tenant provisioning, subscription quotas, and platform-wide feature toggles.
          </p>
        </div>

        <button
          onClick={() => setOnboardModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Onboard New Institution Tenant</span>
        </button>
      </div>

      {/* Cloud Cluster Health */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 text-[10px] uppercase font-bold">Active Tenants</p>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">12 Institutions</p>
          <p className="text-emerald-600 font-semibold text-[10px]">100% Isolated Schemas</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 text-[10px] uppercase font-bold">Total Enrolled Population</p>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">34,200 Students</p>
          <p className="text-slate-400 text-[10px]">Across 18 Campuses</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 text-[10px] uppercase font-bold">Telemetry Throughput</p>
          <p className="text-2xl font-extrabold text-teal-600 mt-1">1.8M Events/Day</p>
          <p className="text-teal-600 font-semibold text-[10px]">Avg Latency: 12ms</p>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 text-[10px] uppercase font-bold">Cloud Infrastructure</p>
          <p className="text-2xl font-extrabold text-indigo-600 mt-1">AWS ap-south-1</p>
          <p className="text-indigo-600 font-semibold text-[10px]">Mumbai Data Sovereignty</p>
        </div>
      </div>

      {/* Active Tenants Directory */}
      <div className="bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-xs">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
          Active Institutional Tenant Directory
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {INSTITUTIONS.map((inst) => (
            <div key={inst.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{inst.name}</span>
                  <Badge variant={inst.type === 'school' ? 'teal' : 'indigo'}>
                    {inst.type.toUpperCase()}
                  </Badge>
                  <span className="font-mono text-slate-400 text-[11px] font-semibold">({inst.code})</span>
                </div>
                <p className="text-slate-500 mt-0.5">
                  {inst.tagline} &bull; Campuses: {inst.campuses.length} &bull; Students: {inst.studentCount}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200">
                  Cluster Healthy
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Flag Toggles */}
      <div className="bg-white dark:bg-[#131B2E] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-xs">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">
          Global Feature Toggles & Capabilities Matrix
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {[
            { key: 'aiCopilot' as const, label: 'Context-Aware AI Copilot (SAC Intelligence)' },
            { key: 'cashlessWallet' as const, label: 'Cashless Campus ID Card POS Dining Wallet' },
            { key: 'gpsFleetTelematics' as const, label: 'GPS Live School Bus Telematics for Parents' },
            { key: 'statutoryTcClearanceEngine' as const, label: 'Multi-Department Transfer Certificate Engine' },
            { key: 'biometricFacialTurnstiles' as const, label: 'Biometric Face Recognition Turnstiles' }
          ].map((f) => (
            <div key={f.key} className="py-3 flex items-center justify-between">
              <span className="font-semibold text-slate-900 dark:text-white">{f.label}</span>
              <button
                onClick={() => toggleFeature(f.key)}
                className="cursor-pointer"
              >
                {features[f.key] ? (
                  <ToggleRight className="w-8 h-8 text-indigo-600" />
                ) : (
                  <ToggleLeft className="w-8 h-8 text-slate-400" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Onboarding Wizard Modal */}
      <Modal
        isOpen={onboardModalOpen}
        onClose={() => setOnboardModalOpen(false)}
        title="Provision New Campus Tenant"
        subtitle="Initialize isolated tenant database, academic structure, and root credentials"
        maxWidth="lg"
      >
        <form onSubmit={handleOnboardNew} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Institution Legal Entity Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. National Public Academy"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Category
              </label>
              <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2">
                <option value="school">K-12 School</option>
                <option value="college">Higher Education College</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Affiliation Code
              </label>
              <input
                type="text"
                placeholder="e.g. CBSE-KA-492"
                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-mono"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOnboardModalOpen(false)}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 text-white font-bold rounded-lg"
            >
              Provision Tenant Cloud Instance
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
