// components/views/AthletesView.tsx
"use client"

import { FaFilter, FaUserPlus } from 'react-icons/fa6'
import Image from 'next/image'
import Log from "@/public/image.jpg"

export default function AthletesView() {
  const athletes = [
    {
      name: 'Sarah Johnson',
      sport: 'Tennis',
      level: 'Advanced',
      status: 'Active',
      newUploads: 2,
      performance: 92,
      lastUpload: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      performanceColor: 'bg-emerald-500'
    },
    {
      name: 'Mike Chen',
      sport: 'Basketball',
      level: 'Intermediate',
      status: 'Active',
      newUploads: 0,
      performance: 85,
      lastUpload: 'Yesterday',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      performanceColor: 'bg-blue-500'
    },
    {
      name: 'Emma Davis',
      sport: 'Soccer',
      level: 'Advanced',
      status: 'Inactive',
      newUploads: 0,
      performance: 78,
      lastUpload: '5 days ago',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      performanceColor: 'bg-yellow-500'
    }
  ]

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">My Athletes</h1>
          <p className="text-slate-500 mt-1">Manage and track your team's performance.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm">
            <FaFilter className="inline mr-2" /> Filter
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-lg shadow-blue-500/20">
            <FaUserPlus className="inline mr-2" /> Add Athlete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {athletes.map((athlete, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Image
                  src={Log}
                  width={64}
                  height={64}
                  className="rounded-full border-2 border-slate-200"
                  alt="Athlete"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 truncate">{athlete.name}</h3>
                  <p className="text-sm text-slate-500">{athlete.sport} • {athlete.level}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`inline-block px-2 py-0.5 text-xs font-bold rounded ${
                      athlete.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {athlete.status}
                    </span>
                    {athlete.newUploads > 0 && (
                      <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                        {athlete.newUploads} New
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Performance</span>
                    <span className="font-bold text-slate-900">{athlete.performance}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className={`${athlete.performanceColor} h-2 rounded-full`}
                      style={{ width: `${athlete.performance}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Last Upload</span>
                  <span className="font-medium text-slate-900">{athlete.lastUpload}</span>
                </div>
              </div>
              <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg font-medium text-sm transition">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}