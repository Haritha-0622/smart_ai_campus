import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { Modal } from '../../components/common/Modal'
import { Cpu, Radio, MapPin, DollarSign, MessageSquare, Shield, CheckCircle, Settings, Plus } from 'lucide-react'

export const Module25_IntegrationsCenter: React.FC = () => {
  const { showToast } = useApp()
  const [activeConfig, setActiveConfig] = useState<string | null>(null)

  const integrations = [
    { id: 'INT-01', name: 'Mifare 1K RFID Gate Turnstiles', vendor: 'SmartID Telematics India', category: 'Physical Security', status: 'Connected (Demo Mode)', pingsToday: '2,732 scans', icon: Radio },
    { id: 'INT-02', name: 'Teltonika FMB920 Fleet GPS Trackers', vendor: 'Teltonika Telematics', category: 'Transport', status: 'Connected (Demo Mode)', pingsToday: '18,420 pings', icon: MapPin },
    { id: 'INT-03', name: 'Razorpay Enterprise Payment Gateway', vendor: 'Razorpay India', category: 'Finance', status: 'Sandbox Mode', pingsToday: '4 transactions', icon: DollarSign },
    { id: 'INT-04', name: 'Tally Prime Institutional Accounts Sync', vendor: 'Tally Solutions', category: 'Accounting ERP', status: 'Ready to Pair', pingsToday: 'Scheduled 11 PM', icon: Cpu },
    { id: 'INT-05', name: 'WhatsApp Business API Gateway', vendor: 'Meta / Gupshup', category: 'Communications', status: 'Connected (Demo Mode)', pingsToday: '428 messages', icon: MessageSquare },
    { id: 'INT-06', name: 'Google Workspace SAML 2.0 SSO', vendor: 'Google Cloud Education', category: 'Identity & SSO', status: 'Connected (Demo Mode)', pingsToday: '1,450 authentications', icon: Shield },
    { id: 'INT-07', name: 'Zebra Handheld RFID Library Wands', vendor: 'Zebra Technologies', category: 'Library Automation', status: 'Connected (Demo Mode)', pingsToday: '24 inventory wands', icon: Radio },
    { id: 'INT-08', name: 'ZKTeco Facial Turnstile Recognition', vendor: 'ZKTeco Biometrics', category: 'Biometrics', status: 'Sandbox Mode', pingsToday: '168 faculty punches', icon: Shield }
  ]

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault()
    showToast(`Integration settings verified and tested successfully`, 'success')
    setActiveConfig(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              25. Enterprise Hardware & API Integrations Center
            </h1>
            <Badge variant="indigo">Module 25</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pre-built enterprise connectors for RFID gate turnstiles, vehicle telematics, ERP ledgers, and identity providers.
          </p>
        </div>

        <button
          onClick={() => showToast('Opening Custom Webhook Connector Dialog', 'info')}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
        >
          Add Custom Webhook Connector
        </button>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {integrations.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between text-xs space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <Badge variant={item.status.includes('Connected') ? 'emerald' : 'amber'}>
                    {item.status}
                  </Badge>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">{item.vendor} &bull; {item.category}</p>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-2 font-mono">
                  Activity: {item.pingsToday}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setActiveConfig(item.name)}
                  className="w-full py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-[11px] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Configure Settings</span>
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Configuration Modal */}
      <Modal
        isOpen={Boolean(activeConfig)}
        onClose={() => setActiveConfig(null)}
        title={`Configure Connector: ${activeConfig}`}
        subtitle="Manage secure endpoint keys, polling frequency, and webhook retry rules"
        maxWidth="md"
      >
        <form onSubmit={handleSaveConfig} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Gateway Endpoint URL
            </label>
            <input
              type="text"
              defaultValue="https://telemetry.smartcampus.io/v2/ingest"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-mono"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              API Client Secret Key (Simulated Token)
            </label>
            <input
              type="password"
              defaultValue="sk_live_sac_998471928374928"
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 font-mono"
            />
          </div>
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Telemetry Ingest Frequency
            </label>
            <select className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2">
              <option>Real-Time Push Webhook (Recommended)</option>
              <option>Every 5 Seconds Polling</option>
              <option>Hourly Batch Settlement</option>
            </select>
          </div>
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setActiveConfig(null)}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 text-white font-bold rounded-lg"
            >
              Test & Save Credentials
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
