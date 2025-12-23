// components/navigation/Sidebar.tsx
"use client"

import { FaBolt, FaChartPie, FaCloudArrowUp, FaClockRotateLeft, FaUsers, FaGear, FaArrowRightFromBracket } from 'react-icons/fa6'
import Image from 'next/image'
import Log from "@/public/image.jpg"

type View = 'dashboard' | 'upload' | 'processing' | 'results' | 'history' | 'profile' | 'athletes'

interface SidebarProps {
  currentView: View
  setCurrentView: (view: View) => void
  role: 'athlete' | 'coach' | 'team'
}

export default function Sidebar({ currentView, setCurrentView, role }: SidebarProps) {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 z-20">
      <div className="p-6 flex items-center gap-3 text-blue-600">
        <FaBolt className="text-2xl" />
        <span className="text-xl font-bold tracking-tight">SportAI</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
            currentView === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <FaChartPie className="w-5" />
          Dashboard
        </button>
        <button
          onClick={() => setCurrentView('upload')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
            ['upload', 'processing', 'results'].includes(currentView) ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <FaCloudArrowUp className="w-5" />
          Analyze
        </button>
        <button
          onClick={() => setCurrentView('history')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
            currentView === 'history' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <FaClockRotateLeft className="w-5" />
          History
        </button>
        {role === 'coach' && (
          <button
            onClick={() => setCurrentView('athletes')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              currentView === 'athletes' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FaUsers className="w-5" />
            Athletes
          </button>
        )}
      </nav>

      <div className="p-4 border-t border-slate-200">
        <button
          onClick={() => setCurrentView('profile')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors mb-2 ${
            currentView === 'profile' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <FaGear className="w-5" />
          Settings
        </button>
        <div className="flex items-center gap-3 px-4 py-3">
          <Image
            src={Log}
            width={40}
            height={40}
            className="rounded-full border border-slate-200"
            alt="Profile"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">Alex Morgan</p>
            <p className="text-xs text-slate-500 truncate">{role === 'coach' ? 'Head Coach' : 'Pro Athlete'}</p>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <FaArrowRightFromBracket />
          </button>
        </div>
      </div>
    </aside>
  )
}