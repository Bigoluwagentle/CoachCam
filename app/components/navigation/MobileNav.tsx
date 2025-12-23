// components/navigation/MobileNav.tsx
"use client"

import { FaChartPie, FaClockRotateLeft, FaPlus, FaUsers, FaUser } from 'react-icons/fa6'

type View = 'dashboard' | 'upload' | 'processing' | 'results' | 'history' | 'profile' | 'athletes'

interface MobileNavProps {
  currentView: View
  setCurrentView: (view: View) => void
  role: 'athlete' | 'coach' | 'team'
}

export default function MobileNav({ currentView, setCurrentView, role }: MobileNavProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 px-6 py-3 flex justify-between items-center shadow-lg">
      <button
        onClick={() => setCurrentView('dashboard')}
        className={`flex flex-col items-center gap-1 ${currentView === 'dashboard' ? 'text-blue-600' : 'text-slate-400'}`}
      >
        <FaChartPie className="text-xl" />
        <span className="text-[10px] font-medium">Home</span>
      </button>
      <button
        onClick={() => setCurrentView('history')}
        className={`flex flex-col items-center gap-1 ${currentView === 'history' ? 'text-blue-600' : 'text-slate-400'}`}
      >
        <FaClockRotateLeft className="text-xl" />
        <span className="text-[10px] font-medium">History</span>
      </button>
      <button
        onClick={() => setCurrentView('upload')}
        className="flex flex-col items-center gap-1"
      >
        <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center -mt-8 shadow-lg border-4 border-slate-50">
          <FaPlus className="text-xl" />
        </div>
        <span className="text-[10px] font-medium text-slate-400">Analyze</span>
      </button>
      {role === 'coach' && (
        <button
          onClick={() => setCurrentView('athletes')}
          className={`flex flex-col items-center gap-1 ${currentView === 'athletes' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <FaUsers className="text-xl" />
          <span className="text-[10px] font-medium">Athletes</span>
        </button>
      )}
      <button
        onClick={() => setCurrentView('profile')}
        className={`flex flex-col items-center gap-1 ${currentView === 'profile' ? 'text-blue-600' : 'text-slate-400'}`}
      >
        <FaUser className="text-xl" />
        <span className="text-[10px] font-medium">Profile</span>
      </button>
    </div>
  )
}