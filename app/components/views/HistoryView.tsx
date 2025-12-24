"use client"

import { useEffect, useRef, useState } from 'react'
import { FaFilter, FaDownload, FaArrowTrendUp, FaChartLine, FaFire } from 'react-icons/fa6'
import Image from 'next/image'
import Chart from 'chart.js/auto'
import { db, auth } from '@/lib/firebase'
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import Log from "@/public/image.jpg"

type View = 'dashboard' | 'upload' | 'processing' | 'results' | 'history' | 'profile' | 'athletes'

interface HistoryViewProps {
  setCurrentView: (view: View) => void
}

export default function HistoryView({ setCurrentView }: HistoryViewProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const [analyses, setAnalyses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const chartInstance = useRef<Chart | null>(null)

  // 1. Fetch History from Firestore
  useEffect(() => {
    const user = auth.currentUser
    if (!user) return

    const q = query(
      collection(db, "analyses"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Format date for the table
        formattedDate: doc.data().createdAt?.toDate().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }) || 'Processing...'
      }))
      setAnalyses(data)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // 2. Initialize Chart with Real/Simulated Data
  useEffect(() => {
    if (chartRef.current && !loading) {
      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        if (chartInstance.current) chartInstance.current.destroy()

        // We'll reverse the analyses to show chronological progress on chart
        const chartData = [...analyses].reverse()
        const labels = chartData.map(a => a.formattedDate)
        const scores = chartData.map(a => a.performanceScore || 0)

        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels.length > 0 ? labels : ['No Data'],
            datasets: [{
              label: 'Technique Score',
              data: scores.length > 0 ? scores : [0],
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              fill: true,
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: '#3b82f6'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: { beginAtZero: true, max: 100, grid: { color: '#f1f5f9' } },
              x: { grid: { display: false } }
            }
          }
        })
      }
    }
  }, [analyses, loading])

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Performance History</h1>
          <p className="text-slate-500 mt-1">Track your growth from {analyses.length} total sessions.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm flex items-center gap-2">
            <FaFilter /> Filter
          </button>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium text-sm flex items-center gap-2">
            <FaDownload /> Export PDF
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:border-blue-500 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <FaChartLine className="text-xl" />
            </div>
            <div>
              <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Avg Score</h3>
              <p className="text-2xl font-bold text-slate-900">
                {analyses.length > 0 
                  ? Math.round(analyses.reduce((acc, curr) => acc + (curr.performanceScore || 0), 0) / analyses.length) 
                  : 0}%
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <FaArrowTrendUp className="text-xl" />
            </div>
            <div>
              <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Sessions</h3>
              <p className="text-2xl font-bold text-slate-900">{analyses.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
              <FaFire className="text-xl" />
            </div>
            <div>
              <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Activity Streak</h3>
              <p className="text-2xl font-bold text-slate-900">12 Days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-900">Technique Progression</h3>
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Last {analyses.length} Uploads</span>
        </div>
        <div className="h-72 relative w-full">
          {loading ? (
             <div className="absolute inset-0 flex items-center justify-center bg-slate-50 rounded-xl">
                <div className="animate-pulse text-slate-400 font-medium text-sm">Loading graph data...</div>
             </div>
          ) : (
            <canvas ref={chartRef}></canvas>
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Recent Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 text-slate-500 text-[10px] uppercase font-bold tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Session Info</th>
                <th className="px-6 py-4">Sport</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Score</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {analyses.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-10 bg-slate-200 rounded-lg overflow-hidden relative flex-shrink-0 shadow-sm border border-white">
                        <Image src={Log} fill className="object-cover" alt="Thumb" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 line-clamp-1">{item.fileName || 'Video Analysis'}</p>
                        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{item.formattedDate}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">{item.sport}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase">
                      {item.activityType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${item.performanceScore > 85 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                            style={{ width: `${item.performanceScore}%` }}
                          />
                       </div>
                       <span className="text-xs font-black text-slate-700">{item.performanceScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setCurrentView('results')}
                      className="px-4 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
              {analyses.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                    No history found. Upload your first video to see your progress!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}