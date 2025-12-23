"use client"

import { useEffect, useRef } from 'react'
import { FaGaugeHigh, FaBullseye, FaChartLine, FaUpload, FaPlay, FaUsers, FaBell } from 'react-icons/fa6'
import Image from 'next/image'
import Chart from 'chart.js/auto'
import Log from "@/public/image.jpg"

type View = 'dashboard' | 'upload' | 'processing' | 'results' | 'history' | 'profile' | 'athletes'

interface DashboardViewProps {
  role: 'athlete' | 'coach' | 'team'
  setCurrentView: (view: View) => void
}

export default function DashboardView({ role, setCurrentView }: DashboardViewProps) {
  const performanceChartRef = useRef<HTMLCanvasElement>(null)
  const techniqueChartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
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
  }, [])

  useEffect(() => {
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
  }, [])

  if (role === 'coach') {
    return <CoachDashboard setCurrentView={setCurrentView} />
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back, Alex. You're on a 5-day streak! 🔥</p>
        </div>
        <button
          onClick={() => setCurrentView('upload')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-transform active:scale-95 w-full md:w-auto justify-center"
        >
          <FaUpload />
          Upload Video
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <FaGaugeHigh className="text-xl" />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">+12%</span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Average Speed</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">84 mph</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <FaBullseye className="text-xl" />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">+5%</span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Accuracy Rate</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">92%</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
              <FaChartLine className="text-xl" />
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">0%</span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Consistency Score</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">8.4/10</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-6">Performance Trend</h3>
          <div className="h-64 relative w-full overflow-hidden">
            <canvas ref={performanceChartRef}></canvas>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-900 mb-6">Technique Breakdown</h3>
          <div className="h-64 relative w-full overflow-hidden flex items-center justify-center">
            <canvas ref={techniqueChartRef}></canvas>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Recent Analyses</h3>
          <button onClick={() => setCurrentView('history')} className="text-sm text-blue-600 font-medium hover:text-blue-700">
            View All
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            {
              title: 'Forehand Swing Analysis',
              time: 'Today, 10:23 AM',
              sport: 'Tennis',
              score: '94%',
              image: 'https://images.unsplash.com/photo-1599474924187-334a405be2ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
            },
            {
              title: 'Serve Practice Session',
              time: 'Yesterday, 4:15 PM',
              sport: 'Tennis',
              score: '82%',
              image: 'https://images.unsplash.com/photo-1519861531473-920026393112?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
            },
            {
              title: 'Backhand Drills',
              time: 'Oct 24, 2:00 PM',
              sport: 'Tennis',
              score: '89%',
              image: 'https://images.unsplash.com/photo-1628779238951-be2c9f2a59f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
            }
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => setCurrentView('results')}
              className="p-4 hover:bg-slate-50 transition flex items-center gap-4 cursor-pointer"
            >
              <div className="w-16 h-12 bg-slate-200 rounded overflow-hidden relative flex-shrink-0">
                <Image src={Log} fill className="object-cover" alt="Video thumbnail" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <FaPlay className="text-white text-xs" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-slate-900 truncate">{item.title}</h4>
                <p className="text-xs text-slate-500">{item.time} • {item.sport}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-1 text-xs font-bold rounded ${
                  parseInt(item.score) >= 90 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {item.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CoachDashboard({ setCurrentView }: { setCurrentView: (view: View) => void }) {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Coach Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage your athletes and track team performance.</p>
        </div>
        <button
          onClick={() => setCurrentView('athletes')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-transform active:scale-95 w-full md:w-auto justify-center"
        >
          <FaUsers />
          View All Athletes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <FaUsers className="text-xl" />
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Total Athletes</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">24</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">New Uploads</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">8</p>
          <span className="text-xs text-emerald-600 font-medium">Today</span>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <FaChartLine className="text-xl" />
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Avg Performance</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">87%</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
              <FaBell className="text-xl" />
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Alerts</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">3</p>
          <span className="text-xs text-orange-600 font-medium">Needs attention</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Recent Athlete Activity</h3>
          <button onClick={() => setCurrentView('athletes')} className="text-sm text-blue-600 font-medium hover:text-blue-700">
            View All
          </button>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { name: 'Sarah Johnson', action: 'Uploaded new video', time: '2 hours ago', badge: 'New', badgeColor: 'bg-blue-100 text-blue-700', image: 'photo-1500648767791' },
            { name: 'Mike Chen', action: 'Performance improved by 15%', time: '5 hours ago', badge: '+15%', badgeColor: 'bg-green-100 text-green-700', image: 'photo-1507003211169' },
            { name: 'Emma Davis', action: 'Completed 3 analyses', time: 'Yesterday', badge: '3', badgeColor: 'bg-slate-100 text-slate-700', image: 'photo-1438761681033'}].map((activity, index) => (
            <div key={index} className="p-4 hover:bg-slate-50 transition flex items-center gap-4">
                <Image
                    src={Log}
                    width={48}
                    height={48}
                    className="rounded-full border border-slate-200"
                    alt="Athlete"
                />
                <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-900">{activity.name}</h4>
                    <p className="text-xs text-slate-500">{activity.action} • {activity.time}</p>
                </div>
                <div className="text-right">
                    <span className={`inline-block px-2 py-1 text-xs font-bold rounded ${activity.badgeColor}`}>
                        {activity.badge}
                    </span>
                </div>
            </div>
        ))}
        </div>
    </div>
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-amber-500 text-white rounded-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-slate-900 mb-2">Attention Required</h3>
          <p className="text-sm text-slate-600 mb-4">3 athletes have uploaded videos that need your review. Check their performance and provide feedback.</p>
          <button
            onClick={() => setCurrentView('athletes')}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Review Now
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}