import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { MOCK_TRANSPORT } from '../../data/mockData'
import { Badge } from '../../components/common/Badge'
import { ExportButton } from '../../components/common/ExportButton'
import { Bus, MapPin, Radio, ShieldCheck, Gauge, AlertTriangle, Phone, CheckCircle2 } from 'lucide-react'

export const Module08_TransportManagement: React.FC = () => {
  const { showToast } = useApp()
  const [selectedBus, setSelectedBus] = useState(MOCK_TRANSPORT[0])

  const boardingLogs = [
    { student: 'Rohan S. Krishna (SAC-2025-0842)', stop: 'Stop 07 - Hauz Khas Metro', time: '08:08 AM', status: 'Boarded via RFID' },
    { student: 'Ananya Varma (SAC-2025-0843)', stop: 'Stop 03 - Vasant Vihar Market', time: '08:14 AM', status: 'Boarded via RFID' },
    { student: 'Priya Sharma (SAC-2025-0845)', stop: 'Stop 05 - Green Park Metro', time: '08:12 AM', status: 'Boarded via RFID' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              08. Transport Fleet & GPS Telematics
            </h1>
            <Badge variant="teal" dot>Live Geofence Synced</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time GPS vehicle telematics, RFID student boarding timestamps, fuel readings, and parent trip alerts.
          </p>
        </div>

        <ExportButton filename="fleet_telematics_log" data={MOCK_TRANSPORT} />
      </div>

      {/* Fleet Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {MOCK_TRANSPORT.map((b) => (
          <div
            key={b.id}
            onClick={() => setSelectedBus(b)}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              selectedBus.id === b.id
                ? 'border-indigo-600 bg-white dark:bg-[#131B2E] ring-2 ring-indigo-500/20 shadow-md'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131B2E] hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-900 dark:text-white text-sm">{b.busNumber}</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  b.status === 'On Route'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {b.status}
              </span>
            </div>
            <p className="font-mono text-xs text-indigo-600 font-semibold">{b.vehicleNo}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{b.routeName}</p>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                {b.onboardedCount} / {b.capacity} Students Boarded
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">{b.speedKmH} km/h</span>
            </div>
          </div>
        ))}
      </div>

      {/* GPS Mock Map & Telematics (Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Visual Simulated Map (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                <span>Simulated Route Geofence: {selectedBus.busNumber}</span>
              </h3>
              <p className="text-xs text-slate-500">Live GPS update frequency: 2 seconds</p>
            </div>
            <Badge variant="indigo">{selectedBus.vehicleNo}</Badge>
          </div>

          {/* Graphic Map Canvas */}
          <div className="h-72 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 relative overflow-hidden flex flex-col items-center justify-center p-6 text-center">
            {/* Soft grid background */}
            <div className="absolute inset-0 bg-[radial-gradient(#635BFF_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

            {/* Simulated Route Line */}
            <div className="w-4/5 h-1 bg-indigo-500/40 relative flex items-center justify-between">
              <div className="w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" title="Start Stop" />
              <div className="w-3 h-3 rounded-full bg-slate-400" title="Stop 2" />
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg animate-pulse" title="Current Bus Location">
                <Bus className="w-4 h-4" />
              </div>
              <div className="w-3 h-3 rounded-full bg-slate-400" title="Stop 4" />
              <div className="w-4 h-4 rounded-full bg-teal-500 ring-4 ring-teal-500/20" title="Campus Destination" />
            </div>

            <div className="mt-12 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs shadow-md max-w-sm">
              <p className="font-bold text-slate-900 dark:text-white">{selectedBus.currentLocation}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Driver: {selectedBus.driverName} ({selectedBus.driverPhone})
              </p>
            </div>
          </div>
        </div>

        {/* Boarding Activity & Telematics (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#131B2E] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-5 space-y-4 text-xs">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm">
            Live RFID Boarding Feed ({selectedBus.busNumber})
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <p className="text-slate-500 text-[10px] uppercase font-bold">Speedometer</p>
              <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">{selectedBus.speedKmH} km/h</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <p className="text-slate-500 text-[10px] uppercase font-bold">Fuel Level</p>
              <p className="text-xl font-extrabold text-emerald-600 mt-0.5">{selectedBus.fuelLevelPercent}%</p>
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {boardingLogs.map((log, i) => (
              <div key={i} className="py-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">{log.student}</span>
                  <span className="text-[10px] font-mono text-emerald-600 font-bold">{log.time}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">{log.stop}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => showToast('Simulated push SMS sent to all parents on this route', 'info')}
            className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs"
          >
            Dispatch Route Delay Alert to Parents
          </button>
        </div>
      </div>
    </div>
  )
}
