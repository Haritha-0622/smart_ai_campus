import React, { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import { Bus, MapPin, Users, AlertTriangle, Wifi, Navigation } from 'lucide-react'

type Tab = 'dashboard' | 'routes' | 'riders' | 'drivers' | 'alerts' | 'gps-tracking'

const TABS: { key: Tab; label: string }[] = [
  { key: 'dashboard', label: 'Fleet Dashboard' },
  { key: 'routes', label: 'Routes' },
  { key: 'riders', label: 'Riders' },
  { key: 'drivers', label: 'Drivers' },
  { key: 'alerts', label: 'Alerts' },
  { key: 'gps-tracking', label: 'GPS Tracking' },
]

const FLEET = [
  { id: 'b1', busNo: 'TN-01-AB-1234', route: 'Route A – North Zone', driver: 'Muthu Kumar', driverPhone: '9876543210', capacity: 52, currentRiders: 48, status: 'On Route' as const, lastLocation: 'Korattur Signal', eta: '8 min', speed: 42 },
  { id: 'b2', busNo: 'TN-01-AB-1235', route: 'Route B – South Zone', driver: 'Rajan Pillai', driverPhone: '9876543211', capacity: 52, currentRiders: 44, status: 'On Route' as const, lastLocation: 'Adyar Bridge', eta: '12 min', speed: 35 },
  { id: 'b3', busNo: 'TN-01-AB-1236', route: 'Route C – East Zone', driver: 'Senthil Raja', driverPhone: '9876543212', capacity: 46, currentRiders: 38, status: 'Delayed' as const, lastLocation: 'OMR Toll', eta: '25 min', speed: 18 },
  { id: 'b4', busNo: 'TN-01-AB-1237', route: 'Route D – West Zone', driver: 'Karthik Nair', driverPhone: '9876543213', capacity: 52, currentRiders: 50, status: 'On Route' as const, lastLocation: 'Porur Junction', eta: '6 min', speed: 38 },
  { id: 'b5', busNo: 'TN-01-AB-1238', route: 'Route E – Central', driver: 'Anbu Selvan', driverPhone: '9876543214', capacity: 38, currentRiders: 35, status: 'At School' as const, lastLocation: 'School Campus', eta: 'Arrived', speed: 0 },
  { id: 'b6', busNo: 'TN-01-AB-1239', route: 'Route F – North West', driver: 'Suresh Babu', driverPhone: '9876543215', capacity: 46, currentRiders: 42, status: 'On Route' as const, lastLocation: 'Ambattur Estate', eta: '10 min', speed: 40 },
  { id: 'b7', busNo: 'TN-01-AB-1240', route: 'Route G – Airport Zone', driver: 'Velu Raj', driverPhone: '9876543216', capacity: 52, currentRiders: 40, status: 'On Route' as const, lastLocation: 'Meenambakkam', eta: '15 min', speed: 52 },
  { id: 'b8', busNo: 'TN-01-AB-1241', route: 'Route H – South East', driver: 'Murugan D', driverPhone: '9876543217', capacity: 46, currentRiders: 28, status: 'At School' as const, lastLocation: 'School Campus', eta: 'Arrived', speed: 0 },
]

const TRANSPORT_ALERTS = [
  { id: 'al1', severity: 'Critical', type: 'Speed Alert', message: 'Bus Route G (TN-01-AB-1240) exceeded 50 km/h near Meenambakkam. Speed: 52 km/h.', time: '08:15', ack: false },
  { id: 'al2', severity: 'Warning', type: 'Route Delay', message: 'Bus Route C delayed 18 mins due to OMR flyover diversion. 8 stops affected.', time: '08:02', ack: false },
  { id: 'al3', severity: 'Info', type: 'GPS Signal Lost', message: 'GPS signal lost for Route B for 3 minutes. Signal restored at 07:58.', time: '07:55', ack: true },
  { id: 'al4', severity: 'Warning', type: 'Low Fuel', message: 'Bus Route A fuel level at 18%. Refueling scheduled before evening run.', time: '07:45', ack: false },
  { id: 'al5', severity: 'Info', type: 'Early Arrival', message: 'Bus Route D arrived 5 minutes early. Students boarded at stop 4.', time: '07:30', ack: true },
]

export const Module08_TransportManagement: React.FC = () => {
  const { students, institution, showToast } = useApp()
  const [tab, setTab] = useState<Tab>('dashboard')
  const [alerts, setAlerts] = useState(TRANSPORT_ALERTS)

  const onRoute = FLEET.filter(b => b.status === 'On Route').length
  const delayed = FLEET.filter(b => b.status === 'Delayed').length
  const atSchool = FLEET.filter(b => b.status === 'At School').length

  const riders = useMemo(() => {
    const withRoute = students.filter(s => s.busRoute)
    return withRoute.length > 0 ? withRoute : students.filter(s => s.category === 'Day Scholar').slice(0, 30)
  }, [students])

  const routes = useMemo(() => {
    const routeMap: Record<string, { count: number; buses: typeof FLEET }> = {}
    FLEET.forEach(b => {
      if (!routeMap[b.route]) routeMap[b.route] = { count: 0, buses: [] }
      routeMap[b.route].count += b.currentRiders
      routeMap[b.route].buses.push(b)
    })
    return Object.entries(routeMap).map(([route, data]) => ({
      route,
      buses: data.buses.length,
      riders: data.count,
      status: data.buses.some(b => b.status === 'Delayed') ? 'Delayed' : 'On Schedule',
    }))
  }, [])

  const ackAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, ack: true } : a))
    showToast('Alert acknowledged', 'success')
  }

  const statusBadge = (s: string) => {
    if (s === 'On Route') return 'teal'
    if (s === 'Delayed') return 'rose'
    if (s === 'At School') return 'indigo'
    return 'amber'
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <Bus className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-xl font-extrabold text-[#101A33] dark:text-white">Transport Fleet & GPS Management</h1>
              <Badge variant="teal" dot>Live</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{institution.name} &bull; {FLEET.length} Buses &bull; {FLEET.reduce((a, b) => a + b.currentRiders, 0)} Students On-board</p>
          </div>
          <ExportButton filename="transport_fleet" data={FLEET.map(b => ({ busNo: b.busNo, route: b.route, driver: b.driver, status: b.status }))} label="Export" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          <StatCard title="Total Buses" value={FLEET.length} subtext="Fleet size" icon={Bus} status="healthy" />
          <StatCard title="On Route" value={onRoute} subtext="Currently running" icon={Navigation} status="healthy" />
          <StatCard title="Delayed" value={delayed} subtext="Needs attention" icon={AlertTriangle} status={delayed > 0 ? 'critical' : 'healthy'} />
          <StatCard title="At School" value={atSchool} subtext="Arrived / Ready" icon={MapPin} status="healthy" />
        </div>
        <div className="flex flex-wrap gap-2">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${tab === t.key ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'dashboard' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Fleet Status Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FLEET.map(bus => (
              <div key={bus.id} className={`p-4 rounded-xl border ${bus.status === 'Delayed' ? 'border-rose-200 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-950/10' : bus.status === 'At School' ? 'border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/10' : 'border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-950/10'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-500">{bus.busNo}</span>
                  <Badge variant={statusBadge(bus.status) as any}>{bus.status}</Badge>
                </div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1 truncate">{bus.route}</p>
                <p className="text-[10px] text-slate-500 mb-2">Driver: {bus.driver}</p>
                <div className="flex justify-between text-[10px] text-slate-500 mb-2">
                  <span>📍 {bus.lastLocation}</span>
                  <span>⏱ {bus.eta}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-500">Riders: <strong className="text-slate-700 dark:text-slate-300">{bus.currentRiders}/{bus.capacity}</strong></span>
                  <span className="text-slate-500">Speed: <strong className="text-slate-700 dark:text-slate-300">{bus.speed} km/h</strong></span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700">
                  <div className="h-1.5 rounded-full bg-indigo-500" style={{ width: `${(bus.currentRiders / bus.capacity) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'routes' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Route Overview</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Route', 'Buses Assigned', 'Total Riders', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {routes.map(r => (
                  <tr key={r.route} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{r.route}</td>
                    <td className="py-2 pr-4 text-center text-slate-600">{r.buses}</td>
                    <td className="py-2 pr-4 text-center text-slate-600">{r.riders}</td>
                    <td className="py-2 pr-4"><Badge variant={r.status === 'On Schedule' ? 'teal' : 'rose'}>{r.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'riders' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Student Riders ({riders.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Name', 'Reg No', 'Grade/Dept', 'Bus Route', 'Bus Stop', 'Category'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {riders.map(s => (
                  <tr key={s.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{s.name}</td>
                    <td className="py-2 pr-4 text-slate-500">{s.regNo}</td>
                    <td className="py-2 pr-4 text-slate-500">{s.gradeOrDept}</td>
                    <td className="py-2 pr-4 text-slate-600 dark:text-slate-300">{s.busRoute || 'Route A'}</td>
                    <td className="py-2 pr-4 text-slate-500">{s.busStop || 'Stop 3'}</td>
                    <td className="py-2 pr-4"><Badge variant="indigo">{s.category}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'drivers' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Driver Records</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Driver Name', 'Phone', 'Bus No', 'Route', 'License No', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FLEET.map(b => (
                  <tr key={b.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{b.driver}</td>
                    <td className="py-2 pr-4 text-slate-500">{b.driverPhone}</td>
                    <td className="py-2 pr-4 font-mono text-slate-600 dark:text-slate-300">{b.busNo}</td>
                    <td className="py-2 pr-4 text-slate-500">{b.route}</td>
                    <td className="py-2 pr-4 font-mono text-slate-500">TN{b.id}DL2020</td>
                    <td className="py-2 pr-4"><Badge variant={b.status === 'Delayed' ? 'rose' : 'teal'}>Active</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'alerts' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Transport Alerts</h2>
          <div className="space-y-3">
            {alerts.map(a => (
              <div key={a.id} className={`flex items-start gap-3 p-3.5 rounded-xl border ${a.ack ? 'opacity-60 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30' : a.severity === 'Critical' ? 'border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/20' : a.severity === 'Warning' ? 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20' : 'border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/20'}`}>
                <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${a.severity === 'Critical' ? 'text-rose-500' : a.severity === 'Warning' ? 'text-amber-500' : 'text-indigo-400'}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={a.severity === 'Critical' ? 'rose' : a.severity === 'Warning' ? 'amber' : 'indigo'}>{a.severity}</Badge>
                    <span className="text-[10px] font-bold text-slate-500">{a.type}</span>
                    <span className="text-[10px] text-slate-400 ml-auto">{a.time}</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300">{a.message}</p>
                </div>
                {!a.ack && (
                  <button onClick={() => ackAlert(a.id)}
                    className="px-2 py-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 cursor-pointer shrink-0">
                    Acknowledge
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'gps-tracking' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Real-time GPS Simulation</h2>
            <button onClick={() => showToast('GPS ping sent to all buses. Awaiting response...', 'info')}
              className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
              <Wifi className="w-3.5 h-3.5" /> Ping All Buses
            </button>
          </div>
          <div className="space-y-3">
            {FLEET.map(bus => (
              <div key={bus.id} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className={`w-3 h-3 rounded-full shrink-0 ${bus.status === 'On Route' ? 'bg-teal-500 animate-pulse' : bus.status === 'Delayed' ? 'bg-rose-500 animate-pulse' : 'bg-slate-400'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{bus.busNo}</span>
                    <Badge variant={statusBadge(bus.status) as any}>{bus.status}</Badge>
                  </div>
                  <p className="text-[10px] text-slate-500 truncate">{bus.route}</p>
                </div>
                <div className="text-right text-[10px] text-slate-500 shrink-0">
                  <div className="font-semibold text-slate-700 dark:text-slate-300">📍 {bus.lastLocation}</div>
                  <div>ETA: {bus.eta} &bull; {bus.speed} km/h</div>
                  <div>{bus.currentRiders}/{bus.capacity} riders</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
