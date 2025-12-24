"use client"

import { useEffect, useRef, useState } from 'react'
import { FaGaugeHigh, FaBullseye, FaChartLine, FaUpload, FaPlay, FaUsers, FaBell } from 'react-icons/fa6'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Chart from 'chart.js/auto'
import Log from "@/public/image.jpg"
import { auth, db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'

type View = 'dashboard' | 'upload' | 'processing' | 'results' | 'history' | 'profile' | 'athletes'

interface DashboardViewProps {
  role: 'athlete' | 'coach' | 'team'
  setCurrentView: (view: View) => void
}

export default function DashboardView({ role: initialRole, setCurrentView }: DashboardViewProps) {
  const [userName, setUserName] = useState('Athlete')
  const [userRole, setUserRole] = useState(initialRole)
  const [loading, setLoading] = useState(true)
  
  const performanceChartRef = useRef<HTMLCanvasElement>(null)
  const techniqueChartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        // Use display name from Auth or "Athlete" as fallback
        setUserName(user.displayName || user.email?.split('@')[0] || 'Athlete');
        
        // Get the role from Firestore
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setUserRole(docSnap.data().role);
        }
      }
      setLoading(false);
    }

    fetchUserData();
  }, []);

  useEffect(() => {
    if (loading) return; // Don't init charts while loading

    // Performance Chart
    if (performanceChartRef.current) {
      const ctx = performanceChartRef.current.getContext('2d')
      if (ctx) {
        const chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
              label: 'Performance Score',
              data: [65, 72, 70, 81, 86, 82, 90],
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
              fill: true
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: { beginAtZero: true, grid: { display: false } },
              x: { grid: { display: false } }
            }
          }
        })
        return () => chart.destroy()
      }
    }
  }, [loading])

  useEffect(() => {
    if (loading) return;

    // Technique Chart
    if (techniqueChartRef.current) {
      const ctx = techniqueChartRef.current.getContext('2d')
      if (ctx) {
        const chart = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: ['Speed', 'Accuracy', 'Form', 'Power', 'Consistency'],
            datasets: [{
              label: 'Current',
              data: [85, 90, 75, 80, 88],
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
            }, {
              label: 'Last Month',
              data: [70, 80, 70, 75, 80],
              borderColor: '#94a3b8',
              backgroundColor: 'rgba(148, 163, 184, 0.2)',
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } },
            scales: {
              r: {
                angleLines: { color: '#e2e8f0' },
                grid: { color: '#e2e8f0' }
              }
            }
          }
        })
        return () => chart.destroy()
      }
    }
  }, [loading])

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    )
  }

  if (userRole === 'coach') {
    return <CoachDashboard setCurrentView={setCurrentView} userName={userName} />
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back, {userName}. Ready to train? 🔥</p>
        </div>
        <button
          onClick={() => setCurrentView('upload')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-transform active:scale-95 w-full md:w-auto justify-center"
        >
          <FaUpload />
          Upload Video
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard icon={<FaGaugeHigh />} title="Average Speed" value="84 mph" trend="+12%" color="blue" />
        <MetricCard icon={<FaBullseye />} title="Accuracy Rate" value="92%" trend="+5%" color="purple" />
        <MetricCard icon={<FaChartLine />} title="Consistency Score" value="8.4/10" trend="0%" color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-6">Performance Trend</h3>
          <div className="h-64 relative w-full">
            <canvas ref={performanceChartRef}></canvas>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-6">Technique Breakdown</h3>
          <div className="h-64 relative w-full flex items-center justify-center">
            <canvas ref={techniqueChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Recent Analyses</h3>
          <button onClick={() => setCurrentView('history')} className="text-sm text-blue-600 font-medium hover:text-blue-700">
            View All
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {/* Placeholder items - We will populate these from Firestore next */}
          <RecentAnalysisItem title="Forehand Swing Analysis" time="Today, 10:23 AM" score="94%" />
          <RecentAnalysisItem title="Serve Practice Session" time="Yesterday, 4:15 PM" score="82%" />
        </div>
      </div>
    </div>
  )
}

// Sub-components to keep code clean
function MetricCard({ icon, title, value, trend, color }: any) {
  const colorMap: any = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600"
  };
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg ${colorMap[color]}`}>{icon}</div>
        <span className={`text-xs font-bold px-2 py-1 rounded ${trend.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>{trend}</span>
      </div>
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
    </div>
  );
}

function RecentAnalysisItem({ title, time, score }: any) {
  return (
    <div className="p-4 hover:bg-slate-50 transition flex items-center gap-4 cursor-pointer">
      <div className="w-16 h-12 bg-slate-200 rounded overflow-hidden relative flex-shrink-0">
        <Image src={Log} fill className="object-cover" alt="Thumbnail" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20"><FaPlay className="text-white text-xs" /></div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-slate-900 truncate">{title}</h4>
        <p className="text-xs text-slate-500">{time}</p>
      </div>
      <span className={`px-2 py-1 text-xs font-bold rounded ${parseInt(score) >= 90 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{score}</span>
    </div>
  );
}

function CoachDashboard({ setCurrentView, userName }: { setCurrentView: (view: View) => void, userName: string }) {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Coach Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome, Coach {userName}.</p>
        </div>
        <button onClick={() => setCurrentView('athletes')} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2">
          <FaUsers /> View All Athletes
        </button>
      </div>
      {/* ... (rest of your Coach UI) */}
    </div>
  )
}