import React, { useState } from 'react'
import { Badge } from '../../components/common/Badge'
import {
  Bus,
  MapPin,
  Radio,
  Gauge,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Clock,
  Plus,
  ShieldAlert,
  Wrench,
  Fuel
} from 'lucide-react'

interface BusAsset {
  id: string
  busNumber: string
  regNo: string
  route: string
  driver: string
  phone: string
  speedKmH: number
  fuelLevelPercent: number
  odometerKm: number
  location: string
  status: 'On Route' | 'At Depot' | 'Maintenance'
  capacity: number
  insuranceExpiry: string
  fitnessCertValidTill: string
  gpsDeviceId: string
}

interface StudentBoardingRecord {
  id: string
  studentName: string
  regNo: string
  busRoute: string
  busStop: string
  boardingTime: string
  rfidTag: string
  status: 'Boarded via RFID' | 'Not Boarded (Exception)' | 'Alighted'
}

interface ServiceBill {
  id: string
  billNo: string
  busNumber: string
  date: string
  serviceType: string
  amount: number
  workshop: string
  status: 'Paid' | 'Pending Audit'
}

export const Module08_TransportManagement: React.FC = () => {
  // Tabs matching 2.7 requirements
  const [activeTab, setActiveTab] = useState<'gps' | 'rfid' | 'asset' | 'maintenance'>('gps')

  const [notification, setNotification] = useState<string | null>(null)

  const notify = (msg: string) => {
    setNotification(msg)
    setTimeout(() => setNotification(null), 3000)
  }

  // 1. Fleet & GPS Data
  const [buses, setBuses] = useState<BusAsset[]>([
    {
      id: 'bus-1',
      busNumber: 'Bus 04 (DL-01-AB-4021)',
      regNo: 'DL-01-AB-4021',
      route: 'Route 12 - South Campus to Vasant Kunj',
      driver: 'M. Selvakumar',
      phone: '+91 98410 55210',
      speedKmH: 42,
      fuelLevelPercent: 78,
      odometerKm: 34210,
      location: 'Near Hauz Khas Metro (Stop 7)',
      status: 'On Route',
      capacity: 48,
      insuranceExpiry: '2026-12-31',
      fitnessCertValidTill: '2027-04-15',
      gpsDeviceId: 'GPS-TEL-9904'
    },
    {
      id: 'bus-2',
      busNumber: 'Bus 07 (DL-01-CD-8192)',
      regNo: 'DL-01-CD-8192',
      route: 'Route 08 - Dwarka Sector 14 Express',
      driver: 'Rameshwar Singh',
      phone: '+91 94210 33812',
      speedKmH: 38,
      fuelLevelPercent: 62,
      odometerKm: 28450,
      location: 'Dwarka Expressway Crossing',
      status: 'On Route',
      capacity: 52,
      insuranceExpiry: '2026-11-20',
      fitnessCertValidTill: '2027-03-10',
      gpsDeviceId: 'GPS-TEL-9907'
    },
    {
      id: 'bus-3',
      busNumber: 'Bus 02 (DL-01-EF-1102)',
      regNo: 'DL-01-EF-1102',
      route: 'Route 03 - Noida City Center Depot',
      driver: 'Harpreet Singh',
      phone: '+91 97110 88204',
      speedKmH: 0,
      fuelLevelPercent: 45,
      odometerKm: 42100,
      location: 'Depot Yard Bay 3',
      status: 'At Depot',
      capacity: 48,
      insuranceExpiry: '2027-01-15',
      fitnessCertValidTill: '2027-05-20',
      gpsDeviceId: 'GPS-TEL-9902'
    }
  ])

  // 2. Student RFID Boarding Data
  const [boardingRecords, setBoardingRecords] = useState<StudentBoardingRecord[]>([
    { id: 'b-1', studentName: 'Rohan S. Krishna', regNo: 'SAC-2025-0842', busRoute: 'Route 12', busStop: 'Stop 07 - Hauz Khas Metro', boardingTime: '08:08 AM', rfidTag: 'RFID-STU-8842', status: 'Boarded via RFID' },
    { id: 'b-2', studentName: 'Ananya Varma', regNo: 'SAC-2025-0843', busRoute: 'Route 12', busStop: 'Stop 03 - Vasant Vihar Market', boardingTime: '08:14 AM', rfidTag: 'RFID-STU-8843', status: 'Boarded via RFID' },
    { id: 'b-3', studentName: 'Priya Sharma', regNo: 'SAC-2025-0845', busRoute: 'Route 12', busStop: 'Stop 05 - Green Park Metro', boardingTime: '08:12 AM', rfidTag: 'RFID-STU-8845', status: 'Boarded via RFID' },
    { id: 'b-4', studentName: 'Aditya Narayanan', regNo: 'SAC-2025-0848', busRoute: 'Route 12', busStop: 'Stop 02 - Munirka Flyover', boardingTime: 'Not Logged', rfidTag: 'RFID-STU-8848', status: 'Not Boarded (Exception)' }
  ])

  // 3. Service Bills & Maintenance Data
  const [serviceBills, setServiceBills] = useState<ServiceBill[]>([
    { id: 'sb-1', billNo: 'BILL-SRV-2026-104', busNumber: 'Bus 04 (DL-01-AB-4021)', date: '2026-10-02', serviceType: 'Engine Oil & Filter Change', amount: 8400, workshop: 'Ashok Leyland Authorized Garage', status: 'Paid' },
    { id: 'sb-2', billNo: 'BILL-SRV-2026-105', busNumber: 'Bus 07 (DL-01-CD-8192)', date: '2026-09-24', serviceType: 'Brake Pad Replacement & Air System Audit', amount: 12600, workshop: 'Apex Heavy Vehicles Workshop', status: 'Paid' },
    { id: 'sb-3', billNo: 'BILL-SRV-2026-106', busNumber: 'Bus 02 (DL-01-EF-1102)', date: '2026-10-12', serviceType: 'Front Axle Alignment & Tyre Balancing', amount: 6500, workshop: 'MRF Fleet Care Centre', status: 'Pending Audit' }
  ])

  // New Service Bill Modal
  const [isAddBillOpen, setIsAddBillOpen] = useState(false)
  const [billForm, setBillForm] = useState({
    busNumber: 'Bus 04 (DL-01-AB-4021)',
    serviceType: 'Preventative Inspection',
    amount: 5000,
    workshop: 'Ashok Leyland Garage'
  })

  // Handlers
  const handleToggleBoarding = (id: string) => {
    setBoardingRecords((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const newStatus = r.status === 'Boarded via RFID' ? 'Not Boarded (Exception)' : 'Boarded via RFID'
          const time = newStatus === 'Boarded via RFID' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Not Logged'
          return { ...r, status: newStatus, boardingTime: time }
        }
        return r
      })
    )
    notify('Boarding status updated')
  }

  const handleAddBill = (e: React.FormEvent) => {
    e.preventDefault()
    setServiceBills([
      {
        id: `sb-${Date.now()}`,
        billNo: `BILL-SRV-2026-${serviceBills.length + 107}`,
        busNumber: billForm.busNumber,
        date: new Date().toISOString().split('T')[0],
        serviceType: billForm.serviceType,
        amount: billForm.amount,
        workshop: billForm.workshop,
        status: 'Pending Audit'
      },
      ...serviceBills
    ])
    setIsAddBillOpen(false)
    notify('Service bill recorded into inventory records')
  }

  return (
    <div className="space-y-5">
      {/* Straightforward Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">2.7 Transport Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            GPS tracking, RFID student boarding, bus operational assets, service bills, fuel telematics, and parent alerts.
          </p>
        </div>

        {notification && (
          <div className="px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs rounded-lg font-medium">
            {notification}
          </div>
        )}
      </div>

      {/* 4 Clean Tabs strictly for 2.7 */}
      <div className="flex flex-wrap border-b border-slate-200 gap-4 text-xs font-semibold text-slate-600 bg-white px-5 rounded-t-xl">
        <button
          onClick={() => setActiveTab('gps')}
          className={`py-3.5 border-b-2 transition-all ${
            activeTab === 'gps' ? 'border-indigo-600 text-indigo-600 font-bold' : 'border-transparent hover:text-slate-900'
          }`}
        >
          1. GPS Tracking & Telematics
        </button>

        <button
          onClick={() => setActiveTab('rfid')}
          className={`py-3.5 border-b-2 transition-all ${
            activeTab === 'rfid' ? 'border-indigo-600 text-indigo-600 font-bold' : 'border-transparent hover:text-slate-900'
          }`}
        >
          2. RFID Student Boarding & Exceptions
        </button>

        <button
          onClick={() => setActiveTab('asset')}
          className={`py-3.5 border-b-2 transition-all ${
            activeTab === 'asset' ? 'border-indigo-600 text-indigo-600 font-bold' : 'border-transparent hover:text-slate-900'
          }`}
        >
          3. Bus Assets & Operational Inventory
        </button>

        <button
          onClick={() => setActiveTab('maintenance')}
          className={`py-3.5 border-b-2 transition-all ${
            activeTab === 'maintenance' ? 'border-indigo-600 text-indigo-600 font-bold' : 'border-transparent hover:text-slate-900'
          }`}
        >
          4. Service Bills & Maintenance Records
        </button>
      </div>

      {/* 1. GPS TRACKING, TELEMATICS & PARENT ALERTS */}
      {activeTab === 'gps' && (
        <div className="space-y-4">
          {/* Parent-facing Transport Status Alert */}
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-950 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-indigo-600 animate-pulse" />
              <span>
                <strong>Parent-Facing Transport Alert: </strong>
                Bus 04 is currently approaching Stop 07 (Hauz Khas Metro). Estimated arrival in <strong>6 minutes</strong>.
              </span>
            </div>
            <span className="font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200 text-[10px]">
              Live GPS Synced
            </span>
          </div>

          {/* Fleet Cards with Fuel & Speedometer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {buses.map((b) => (
              <div key={b.id} className="bg-white border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">{b.busNumber}</h3>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      b.status === 'On Route' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <p className="font-medium text-slate-800">{b.route}</p>
                  <p className="text-[11px] text-slate-500">
                    Driver: {b.driver} &bull; {b.phone}
                  </p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-indigo-600" />
                    {b.location}
                  </p>
                </div>

                {/* Telematics Bar: Speedometer & Fuel */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-400 font-bold block flex items-center gap-1">
                      <Gauge className="w-3 h-3 text-indigo-600" /> Speedometer
                    </span>
                    <span className="font-bold text-slate-900 text-sm">{b.speedKmH} km/h</span>
                  </div>

                  <div className="p-2 bg-slate-50 rounded-lg">
                    <span className="text-[10px] text-slate-400 font-bold block flex items-center gap-1">
                      <Fuel className="w-3 h-3 text-emerald-600" /> Fuel Gauge
                    </span>
                    <span className="font-bold text-slate-900 text-sm">{b.fuelLevelPercent}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Route Anomaly Alert */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Route & Speed Integrity: </strong>
              Zero prolonged stoppages or unauthorized deviations detected. Fleet traveling within institutional 45 km/h safety limit.
            </span>
          </div>
        </div>
      )}

      {/* 2. RFID STUDENT BOARDING LOGS & EXCEPTION DETECTION */}
      {activeTab === 'rfid' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">
              Real-time student boarding capture via mapped RFID credentials and missed-stop exception tracking.
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Reg No</th>
                  <th className="py-3 px-4">Assigned Stop</th>
                  <th className="py-3 px-4">Mapped RFID Card</th>
                  <th className="py-3 px-4">Boarding Timestamp</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {boardingRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">{r.studentName}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{r.regNo}</td>
                    <td className="py-3 px-4 text-slate-700">{r.busStop}</td>
                    <td className="py-3 px-4 font-mono text-indigo-600 font-semibold">{r.rfidTag}</td>
                    <td className="py-3 px-4 font-medium text-slate-700">{r.boardingTime}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          r.status === 'Boarded via RFID'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleToggleBoarding(r.id)}
                        className="text-indigo-600 hover:text-indigo-800 font-bold"
                      >
                        Toggle Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. BUS ASSETS & OPERATIONAL INVENTORY */}
      {activeTab === 'asset' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">
              Bus fleet tracked as institutional capital assets with registration, insurance, and device telemetry mapping.
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Bus Identification</th>
                  <th className="py-3 px-4">Vehicle Reg No</th>
                  <th className="py-3 px-4">Capacity</th>
                  <th className="py-3 px-4">Odometer Reading</th>
                  <th className="py-3 px-4">Insurance Expiry</th>
                  <th className="py-3 px-4">Fitness Certificate (FC)</th>
                  <th className="py-3 px-4">GPS Device IMEI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {buses.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900">{b.busNumber.split('(')[0]}</td>
                    <td className="py-3 px-4 font-mono text-slate-600 font-semibold">{b.regNo}</td>
                    <td className="py-3 px-4 text-slate-700">{b.capacity} Seats</td>
                    <td className="py-3 px-4 font-mono text-slate-700">{b.odometerKm.toLocaleString()} km</td>
                    <td className="py-3 px-4 text-slate-700">{b.insuranceExpiry}</td>
                    <td className="py-3 px-4 font-medium text-emerald-700">{b.fitnessCertValidTill}</td>
                    <td className="py-3 px-4 font-mono text-indigo-600">{b.gpsDeviceId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. SERVICE BILLS & MAINTENANCE RECORDS */}
      {activeTab === 'maintenance' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">
              Maintenance service records, workshop bills, and preventative maintenance logs.
            </span>
            <button
              onClick={() => setIsAddBillOpen(true)}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              + Record Service Bill
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Bill Reference</th>
                  <th className="py-3 px-4">Bus Vehicle</th>
                  <th className="py-3 px-4">Service Performed</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Amount (₹)</th>
                  <th className="py-3 px-4">Authorized Workshop</th>
                  <th className="py-3 px-4 text-right">Payment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {serviceBills.map((sb) => (
                  <tr key={sb.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">{sb.billNo}</td>
                    <td className="py-3 px-4 text-slate-700">{sb.busNumber}</td>
                    <td className="py-3 px-4 font-medium text-slate-800">{sb.serviceType}</td>
                    <td className="py-3 px-4 text-slate-500">{sb.date}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">₹{sb.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-slate-600">{sb.workshop}</td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          sb.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {sb.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Add Service Bill */}
      {isAddBillOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 space-y-3 shadow-xl text-xs">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-slate-900 text-sm">Record Maintenance / Service Bill</h3>
              <button onClick={() => setIsAddBillOpen(false)} className="text-slate-400 hover:text-slate-600">
                &times;
              </button>
            </div>

            <form onSubmit={handleAddBill} className="space-y-3">
              <div>
                <label className="font-medium text-slate-700 block mb-1">Bus Vehicle</label>
                <select
                  value={billForm.busNumber}
                  onChange={(e) => setBillForm({ ...billForm, busNumber: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                >
                  <option value="Bus 04 (DL-01-AB-4021)">Bus 04 (DL-01-AB-4021)</option>
                  <option value="Bus 07 (DL-01-CD-8192)">Bus 07 (DL-01-CD-8192)</option>
                  <option value="Bus 02 (DL-01-EF-1102)">Bus 02 (DL-01-EF-1102)</option>
                </select>
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">Service Type</label>
                <input
                  type="text"
                  required
                  value={billForm.serviceType}
                  onChange={(e) => setBillForm({ ...billForm, serviceType: e.target.value })}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    required
                    value={billForm.amount}
                    onChange={(e) => setBillForm({ ...billForm, amount: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-bold"
                  />
                </div>
                <div>
                  <label className="font-medium text-slate-700 block mb-1">Workshop / Vendor</label>
                  <input
                    type="text"
                    required
                    value={billForm.workshop}
                    onChange={(e) => setBillForm({ ...billForm, workshop: e.target.value })}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button
                  type="button"
                  onClick={() => setIsAddBillOpen(false)}
                  className="px-3 py-1.5 bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button type="submit" className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg font-semibold">
                  Record Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
