// components/navigation/Header.tsx
"use client"

import { FaBolt, FaBell } from 'react-icons/fa6'

export default function Header() {
  return (
    <header className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex justify-between items-center sticky top-0 z-30">
      <div className="flex items-center gap-2 text-blue-600">
        <FaBolt className="text-xl" />
        <span className="text-lg font-bold">CoachCam</span>
      </div>
      <button className="relative p-2 text-slate-500">
        <FaBell className="text-xl" />
        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
      </button>
    </header>
  )
}