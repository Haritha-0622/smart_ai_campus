import React, { useState, useMemo } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { StatCard } from '../../components/common/StatCard'
import { ExportButton } from '../../components/common/ExportButton'
import { UtensilsCrossed, DollarSign, ShoppingBag, Wallet, Plus, Settings } from 'lucide-react'

type Tab = 'dashboard' | 'menu' | 'orders' | 'wallet' | 'revenue' | 'settings-panel'
const TABS: { key: Tab; label: string }[] = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'menu', label: 'Menu' },
  { key: 'orders', label: 'Orders' },
  { key: 'wallet', label: 'Wallet' },
  { key: 'revenue', label: 'Revenue' },
  { key: 'settings-panel', label: 'Settings' },
]

const MENU_ITEMS = [
  { id: 'm1', name: 'Idli Sambar (2 pcs)', category: 'Breakfast', price: 20, qty: 80, status: 'Available' },
  { id: 'm2', name: 'Masala Dosa', category: 'Breakfast', price: 35, qty: 60, status: 'Available' },
  { id: 'm3', name: 'Veg Meals (Full)', category: 'Lunch', price: 60, qty: 150, status: 'Available' },
  { id: 'm4', name: 'Chapati + Dal (3 pcs)', category: 'Lunch', price: 45, qty: 80, status: 'Available' },
  { id: 'm5', name: 'Samosa (2 pcs)', category: 'Snacks', price: 15, qty: 100, status: 'Available' },
  { id: 'm6', name: 'Bread Omelette', category: 'Snacks', price: 25, qty: 0, status: 'Sold Out' },
  { id: 'm7', name: 'Filter Coffee', category: 'Drinks', price: 12, qty: 200, status: 'Available' },
  { id: 'm8', name: 'Cold Horlicks', category: 'Drinks', price: 18, qty: 50, status: 'Available' },
  { id: 'm9', name: 'Curd Rice', category: 'Lunch', price: 40, qty: 40, status: 'Available' },
  { id: 'm10', name: 'Fruit Salad', category: 'Snacks', price: 30, qty: 25, status: 'Available' },
  { id: 'm11', name: 'Poha', category: 'Breakfast', price: 20, qty: 30, status: 'Available' },
  { id: 'm12', name: 'Lemon Rice', category: 'Lunch', price: 35, qty: 0, status: 'Sold Out' },
]

const ORDER_LOG = [
  { id: 'o1', orderNo: 'ORD-001', student: 'Arjun Kumar', items: 'Veg Meals', total: 60, time: '12:15', method: 'Wallet', status: 'Served' },
  { id: 'o2', orderNo: 'ORD-002', student: 'Priya S.', items: 'Idli Sambar + Coffee', total: 32, time: '08:30', method: 'Wallet', status: 'Served' },
  { id: 'o3', orderNo: 'ORD-003', student: 'Staff - Meena', items: 'Masala Dosa', total: 35, time: '09:00', method: 'Cash', status: 'Served' },
  { id: 'o4', orderNo: 'ORD-004', student: 'Ravi M.', items: 'Chapati + Dal', total: 45, time: '12:30', method: 'Wallet', status: 'Served' },
  { id: 'o5', orderNo: 'ORD-005', student: 'Kavya R.', items: 'Samosa + Cold Horlicks', total: 33, time: '10:15', method: 'Wallet', status: 'Served' },
  { id: 'o6', orderNo: 'ORD-006', student: 'Arun T.', items: 'Fruit Salad + Coffee', total: 42, time: '11:00', method: 'Cash', status: 'Pending' },
  { id: 'o7', orderNo: 'ORD-007', student: 'Divya N.', items: 'Curd Rice', total: 40, time: '13:00', method: 'Wallet', status: 'Served' },
]

const MONTHLY_REVENUE = [
  { month: 'Jun 2025', orders: 4200, revenue: 168000, avgOrder: 40, topCategory: 'Lunch' },
  { month: 'Jul 2025', orders: 4500, revenue: 185000, avgOrder: 41, topCategory: 'Lunch' },
  { month: 'Aug 2025', orders: 3900, revenue: 158000, avgOrder: 40, topCategory: 'Breakfast' },
  { month: 'Sep 2025', orders: 4800, revenue: 196000, avgOrder: 41, topCategory: 'Lunch' },
  { month: 'Oct 2025', orders: 2100, revenue: 84000, avgOrder: 40, topCategory: 'Lunch' },
]

const CANTEEN_SETTINGS = [
  { label: 'Operating Hours', value: 'Mon–Fri: 7:30 AM – 5:00 PM, Sat: 8:00 AM – 1:00 PM' },
  { label: 'Maximum Wallet Balance', value: '₹2,000 per student' },
  { label: 'Low Balance Alert Threshold', value: '₹50 (auto-alert to parent)' },
  { label: 'Daily Spend Limit', value: '₹200 per student per day' },
  { label: 'Cashless Mode', value: 'Enabled (Wallet + RFID tap)' },
  { label: 'Staff Subsidy', value: '20% discount on all items' },
]

export const Module15_CanteenManagement: React.FC = () => {
  const { students, institution, showToast, updateStudent } = useApp()
  const [tab, setTab] = useState<Tab>('dashboard')
  const [topupStudentId, setTopupStudentId] = useState('')
  const [topupAmount, setTopupAmount] = useState('')

  const todayRevenue = ORDER_LOG.filter(o => o.status === 'Served').reduce((a, o) => a + o.total, 0)
  const todayOrders = ORDER_LOG.length
  const walletOrders = ORDER_LOG.filter(o => o.method === 'Wallet').length
  const totalBalance = useMemo(() => students.reduce((a, s) => a + s.walletBalance, 0), [students])

  const handleTopup = () => {
    if (!topupStudentId || !topupAmount) { showToast('Select student and enter amount', 'warning'); return }
    const student = students.find(s => s.id === topupStudentId)
    const amt = Number(topupAmount)
    updateStudent(topupStudentId, { walletBalance: (student?.walletBalance || 0) + amt })
    showToast(`₹${amt} topped up to ${student?.name}'s wallet`, 'success')
    setTopupStudentId('')
    setTopupAmount('')
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-xl font-extrabold text-[#101A33] dark:text-white">Smart Canteen & Wallet</h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{institution.name} &bull; Cashless Campus Canteen</p>
          </div>
          <ExportButton filename="canteen_revenue" data={MONTHLY_REVENUE} label="Export" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          <StatCard title="Today's Revenue" value={`₹${todayRevenue}`} subtext="Orders served" icon={DollarSign} status="healthy" />
          <StatCard title="Orders Today" value={todayOrders} subtext="All items" icon={ShoppingBag} status="healthy" />
          <StatCard title="Wallet Transactions" value={walletOrders} subtext="Cashless orders" icon={Wallet} status="healthy" />
          <StatCard title="Total Wallet Balance" value={`₹${totalBalance.toLocaleString()}`} subtext="All students" icon={Wallet} status="healthy" />
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
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Today's Order Summary & Top Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-3">Top Selling Items</h3>
              {[
                { item: 'Veg Meals (Full)', count: 142, revenue: 8520 },
                { item: 'Idli Sambar', count: 98, revenue: 1960 },
                { item: 'Filter Coffee', count: 210, revenue: 2520 },
                { item: 'Masala Dosa', count: 76, revenue: 2660 },
                { item: 'Samosa', count: 88, revenue: 1320 },
              ].map(item => (
                <div key={item.item} className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-slate-600 dark:text-slate-300 w-40 shrink-0">{item.item}</span>
                  <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                    <div className="h-2 rounded-full bg-indigo-500" style={{ width: `${Math.min(100, (item.count / 210) * 100)}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 w-16 text-right">{item.count} sold</span>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-3">Weekly Revenue (₹)</h3>
              {[
                { day: 'Monday', rev: 18200 },
                { day: 'Tuesday', rev: 21000 },
                { day: 'Wednesday', rev: 19500 },
                { day: 'Thursday', rev: 22400 },
                { day: 'Friday', rev: 16800 },
              ].map(d => (
                <div key={d.day} className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-slate-600 dark:text-slate-300 w-20 shrink-0">{d.day}</span>
                  <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700">
                    <div className="h-2 rounded-full bg-teal-500" style={{ width: `${(d.rev / 22400) * 100}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-teal-600 w-16 text-right">₹{(d.rev / 1000).toFixed(1)}K</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'menu' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">Menu Management</h2>
            <button onClick={() => showToast('Opening add menu item form...', 'info')}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer">
              <Plus className="w-3.5 h-3.5" /> Add Item
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Item Name', 'Category', 'Price (₹)', 'Qty Available', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MENU_ITEMS.map(item => (
                  <tr key={item.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{item.name}</td>
                    <td className="py-2 pr-4"><Badge variant="indigo">{item.category}</Badge></td>
                    <td className="py-2 pr-4 font-bold text-teal-600">₹{item.price}</td>
                    <td className="py-2 pr-4 text-center text-slate-600">{item.qty}</td>
                    <td className="py-2 pr-4"><Badge variant={item.status === 'Available' ? 'teal' : 'rose'}>{item.status}</Badge></td>
                    <td className="py-2 pr-4 flex gap-1">
                      <button onClick={() => showToast(`Editing ${item.name}...`, 'info')} className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] hover:bg-slate-200 cursor-pointer">Edit</button>
                      <button onClick={() => showToast(`${item.name} removed from menu`, 'warning')} className="px-2 py-1 rounded bg-rose-50 dark:bg-rose-950/40 text-rose-700 text-[10px] hover:bg-rose-100 cursor-pointer">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Today's Order Log</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Order No', 'Customer', 'Items', 'Total', 'Time', 'Payment', 'Status'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ORDER_LOG.map(o => (
                  <tr key={o.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="py-2 pr-4 font-mono text-slate-500">{o.orderNo}</td>
                    <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{o.student}</td>
                    <td className="py-2 pr-4 text-slate-500">{o.items}</td>
                    <td className="py-2 pr-4 font-bold text-teal-600">₹{o.total}</td>
                    <td className="py-2 pr-4 text-slate-500">{o.time}</td>
                    <td className="py-2 pr-4"><Badge variant={o.method === 'Wallet' ? 'indigo' : 'amber'}>{o.method}</Badge></td>
                    <td className="py-2 pr-4"><Badge variant={o.status === 'Served' ? 'teal' : 'amber'}>{o.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'wallet' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs max-w-md">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
              <Wallet className="w-4 h-4 text-indigo-600" /> Top-Up Student Wallet
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Select Student</label>
                <select value={topupStudentId} onChange={e => setTopupStudentId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">-- Select Student --</option>
                  {students.map(s => <option key={s.id} value={s.id}>{s.name} — Balance: ₹{s.walletBalance}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Top-Up Amount (₹)</label>
                <input type="number" value={topupAmount} onChange={e => setTopupAmount(e.target.value)} placeholder="Enter amount (max ₹2000)"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <button onClick={handleTopup}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs cursor-pointer">
                Top Up Wallet
              </button>
            </div>
          </div>
          <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
            <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Student Wallet Balances</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    {['Reg No', 'Name', 'Grade', 'Wallet Balance', 'Status', 'Action'].map(h => (
                      <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {students.map(s => (
                    <tr key={s.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                      <td className="py-2 pr-4 text-slate-500">{s.regNo}</td>
                      <td className="py-2 pr-4 font-medium text-slate-800 dark:text-slate-200">{s.name}</td>
                      <td className="py-2 pr-4 text-slate-500">{s.gradeOrDept}</td>
                      <td className="py-2 pr-4 font-bold text-indigo-600">₹{s.walletBalance}</td>
                      <td className="py-2 pr-4">
                        <Badge variant={s.walletBalance < 50 ? 'rose' : s.walletBalance < 100 ? 'amber' : 'teal'}>
                          {s.walletBalance < 50 ? 'Low' : s.walletBalance < 100 ? 'Moderate' : 'OK'}
                        </Badge>
                      </td>
                      <td className="py-2 pr-4">
                        <button onClick={() => { setTopupStudentId(s.id); setTab('wallet') }}
                          className="px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-[10px] hover:bg-indigo-100 cursor-pointer">Top Up</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === 'revenue' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Monthly Revenue Report</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  {['Month', 'Orders', 'Revenue', 'Avg Order Value', 'Top Category', 'Growth'].map(h => (
                    <th key={h} className="text-left py-2 pr-4 font-semibold text-slate-500 dark:text-slate-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MONTHLY_REVENUE.map((r, i) => {
                  const prev = MONTHLY_REVENUE[i - 1]
                  const growth = prev ? ((r.revenue - prev.revenue) / prev.revenue * 100).toFixed(1) : null
                  return (
                    <tr key={r.month} className="border-b border-slate-50 dark:border-slate-800/50">
                      <td className="py-2 pr-4 font-semibold text-slate-800 dark:text-slate-200">{r.month}</td>
                      <td className="py-2 pr-4 text-slate-600">{r.orders.toLocaleString()}</td>
                      <td className="py-2 pr-4 font-bold text-teal-600">₹{(r.revenue / 1000).toFixed(0)}K</td>
                      <td className="py-2 pr-4 text-slate-600">₹{r.avgOrder}</td>
                      <td className="py-2 pr-4"><Badge variant="indigo">{r.topCategory}</Badge></td>
                      <td className="py-2 pr-4">
                        {growth ? (
                          <span className={`text-xs font-bold ${Number(growth) >= 0 ? 'text-teal-600' : 'text-rose-600'}`}>
                            {Number(growth) >= 0 ? '▲' : '▼'} {Math.abs(Number(growth))}%
                          </span>
                        ) : <span className="text-slate-400 text-xs">—</span>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'settings-panel' && (
        <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Canteen Configuration</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CANTEEN_SETTINGS.map(s => (
              <div key={s.label} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{s.label}</p>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">{s.value}</p>
                  </div>
                  <button onClick={() => showToast(`Editing: ${s.label}`, 'info')}
                    className="px-2 py-1 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-[10px] hover:bg-indigo-100 cursor-pointer shrink-0">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
