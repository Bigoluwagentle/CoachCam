"use client"

import { useState, useEffect } from 'react'
import { FaArrowLeft, FaShareNodes, FaRotateRight, FaDownload, FaPlay, FaRobot } from 'react-icons/fa6'
import { db, auth } from '@/lib/firebase'
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore'

type View = 'dashboard' | 'upload' | 'processing' | 'results' | 'history' | 'profile' | 'athletes'

interface ResultsViewProps {
  setCurrentView: (view: any) => void;
  analysisId: string; // 1. Add this line to the interface
}

export default function ResultsView({ setCurrentView }: ResultsViewProps) {
  const [analysis, setAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = auth.currentUser
    if (!user) return

    // Fetch the most recent completed analysis for this user
    const q = query(
      collection(db, "analyses"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(1)
    )

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setAnalysis({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() })
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  )

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-6 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="text-slate-500 hover:text-slate-800 mb-2 flex items-center gap-2 text-sm transition-colors"
          >
            <FaArrowLeft /> Back to Dashboard
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Analysis Results</h1>
          <p className="text-slate-500">
            {analysis?.sport || 'General'} • {analysis?.activityType || 'Analysis'}
          </p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm flex items-center gap-2">
            <FaShareNodes /> Share
          </button>
          <button
            onClick={() => setCurrentView('upload')}
            className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm flex items-center gap-2"
          >
            <FaRotateRight /> Re-analyze
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Video & Key Moments */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-black rounded-2xl overflow-hidden aspect-video relative shadow-2xl group">
            {/* REAL VIDEO PLAYER */}
            <video 
              src={analysis?.videoUrl} 
              controls 
              className="w-full h-full object-contain"
              poster={analysis?.videoUrl?.replace('.mp4', '.jpg')}
            />
            
            {/* Simulated AI Overlay (only visible when not playing) */}
            <div className="absolute inset-0 pointer-events-none border-[10px] border-blue-500/10 mix-blend-overlay"></div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">AI Sequence Breakdown</h3>
            <div className="grid grid-cols-3 gap-4">
              {['Preparation', 'Impact', 'Follow-through'].map((phase, i) => (
                <div key={i} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="text-[10px] uppercase font-bold text-blue-600 mb-1">Phase {i+1}</div>
                  <div className="text-sm font-bold text-slate-800">{phase}</div>
                  <div className="text-xs text-slate-500 mt-1">Status: Optimized</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Metrics & Insights */}
        <div className="space-y-6">
          {/* Circular Score */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
            <h3 className="text-slate-500 text-sm font-medium mb-4">Performance Score</h3>
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="64" stroke="#f1f5f9" strokeWidth="12" fill="none" />
                <circle
                  cx="72" cy="72" r="64"
                  stroke={analysis?.performanceScore > 70 ? "#10b981" : "#3b82f6"}
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray="402"
                  strokeDashoffset={402 - (402 * (analysis?.performanceScore || 82)) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black text-slate-900">{analysis?.performanceScore || 82}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Percentile</span>
              </div>
            </div>
          </div>

          {/* Metrics List */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">Biometric Data</h3>
            <div className="space-y-5">
              {[
                { label: 'Movement Speed', value: '8.4 m/s', width: '75%', color: 'bg-blue-500' },
                { label: 'Joint Alignment', value: '92%', width: '92%', color: 'bg-emerald-500' },
                { label: 'Balance Index', value: 'Stable', width: '85%', color: 'bg-purple-500' }
              ].map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between text-xs mb-1.5 uppercase tracking-wide font-bold">
                    <span className="text-slate-400">{metric.label}</span>
                    <span className="text-slate-900">{metric.value}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className={`${metric.color} h-full rounded-full`} style={{ width: metric.width }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Coach Insights */}
          <div className="bg-slate-900 p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <FaRobot size={80} />
            </div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/40">
                <FaRobot className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Coach</h3>
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Active Analysis</p>
              </div>
            </div>
            
            <div className="space-y-4 relative z-10">
              <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <p className="text-sm leading-relaxed italic text-slate-300">
                  "Your kinetic chain looks strong, but your weight transfer is slightly early. Focus on holding your back leg tension 0.2s longer."
                </p>
              </div>
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-900/20">
                Generate Full Training Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}