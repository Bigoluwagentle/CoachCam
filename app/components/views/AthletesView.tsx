"use client"

import { useState, useEffect } from 'react'
import { FaFilter, FaUserPlus, FaMagnifyingGlass, FaEllipsisVertical } from 'react-icons/fa6'
import Image from 'next/image'
import { db, auth } from '@/lib/firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import Log from "@/public/image.jpg"

export default function AthletesView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [athletes, setAthletes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = auth.currentUser
    if (!user) return

    // Query athletes assigned to this coach/user
    const q = query(collection(db, "athletes"), where("coachId", "==", user.uid))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const athleteData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setAthletes(athleteData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Filter athletes based on search input
  const filteredAthletes = athletes.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.sport.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-6 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Roster Management</h1>
          <p className="text-slate-500 mt-1">Monitor performance across your active athletes.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative hidden sm:block">
            <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input 
              type="text" 
              placeholder="Search athletes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-sm shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all">
            <FaUserPlus /> <span className="hidden sm:inline">Add Athlete</span>
          </button>
        </div>
      </div>

      {/* Roster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          // Skeleton Loaders
          [1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-slate-100 rounded-2xl animate-pulse border border-slate-200" />
          ))
        ) : filteredAthletes.length > 0 ? (
          filteredAthletes.map((athlete) => (
            <div key={athlete.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-200 transition-all group">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Image
                        src={athlete.image || Log}
                        width={60}
                        height={60}
                        className="rounded-2xl border-2 border-white shadow-sm object-cover"
                        alt={athlete.name}
                      />
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${athlete.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 leading-tight">{athlete.name}</h3>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{athlete.sport} • {athlete.level}</p>
                    </div>
                  </div>
                  <button className="text-slate-300 hover:text-slate-600 p-1">
                    <FaEllipsisVertical />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1.5">
                      <span className="text-slate-400">Avg Technique</span>
                      <span className="text-blue-600">{athlete.performance}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${athlete.performance}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3 border-t border-slate-50">
                    <div className="text-center flex-1 border-r border-slate-50">
                      <p className="text-xs font-bold text-slate-900">{athlete.newUploads || 0}</p>
                      <p className="text-[10px] text-slate-400 uppercase">Pending</p>
                    </div>
                    <div className="text-center flex-1">
                      <p className="text-xs font-bold text-slate-900">{athlete.lastUpload || 'N/A'}</p>
                      <p className="text-[10px] text-slate-400 uppercase">Last Activity</p>
                    </div>
                  </div>

                  <button className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-blue-600 transition-colors">
                    Review Recent Sessions
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 italic">No athletes found in your roster.</p>
          </div>
        )}
      </div>
    </div>
  )
}