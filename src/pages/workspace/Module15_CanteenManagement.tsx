import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { Badge } from '../../components/common/Badge'
import { Coffee, CreditCard, CheckCircle2, ShieldCheck, ShoppingBag, Plus, Utensils } from 'lucide-react'

export const Module15_CanteenManagement: React.FC = () => {
  const { students, updateStudent, showToast } = useApp()
  const student = students[0] // Rohan S. Krishna

  const [menuItems, setMenuItems] = useState([
    { id: 'FD-01', name: 'South Indian Wholesome Millet Thali', category: 'Nutritious Lunch', price: 65, calories: '480 kcal', available: true },
    { id: 'FD-02', name: 'Steamed Organic Idli (3 Pcs) with Sambar', category: 'Breakfast / Snack', price: 35, calories: '240 kcal', available: true },
    { id: 'FD-03', name: 'Fresh Seasonal Fruit Bowl & Sprouted Salad', category: 'Healthy Choice', price: 40, calories: '160 kcal', available: true },
    { id: 'FD-04', name: 'Tender Coconut & Natural Fruit Smoothie', category: 'Beverage', price: 30, calories: '110 kcal', available: true }
  ])

  const handleCheckout = (itemName: string, price: number) => {
    if (student.walletBalance < price) {
      showToast('Insufficient wallet balance on smart card', 'error')
      return
    }
    const newBal = student.walletBalance - price
    updateStudent(student.id, { walletBalance: newBal })
    showToast(`Cashless RFID Tap: Deducted ₹${price} for ${itemName}. New balance: ₹${newBal}`, 'success')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#101A33] dark:text-white">
              15. Canteen Management & Cashless Dining
            </h1>
            <Badge variant="teal" dot>Cashless POS Active</Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Nutritional menus, RFID campus wallet tap checkout, parent daily caps, and meal demand forecasting.
          </p>
        </div>

        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900/60 flex items-center gap-3 text-xs">
          <div>
            <p className="text-slate-500 text-[10px] uppercase font-bold">Active POS Student Wallet</p>
            <p className="font-extrabold text-slate-900 dark:text-white text-sm">
              {student.name}: <span className="text-emerald-600 font-mono">₹{student.walletBalance}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Menu & POS simulator */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white dark:bg-[#131B2E] border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4 text-xs"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</span>
                <Badge variant="teal">{item.category}</Badge>
              </div>
              <p className="text-slate-500 text-[11px]">
                Nutritional rating: <strong>{item.calories}</strong> &bull; Zero Refined Sugar
              </p>
              <p className="text-base font-extrabold text-slate-900 dark:text-white mt-2 font-mono">
                ₹{item.price}
              </p>
            </div>

            <button
              onClick={() => handleCheckout(item.name, item.price)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>RFID Tap Pay</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
