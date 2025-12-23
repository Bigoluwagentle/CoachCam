// components/views/HistoryView.tsx
"use client"

import { useEffect, useRef } from 'react'
import { FaFilter, FaDownload, FaArrowTrendUp, FaChartLine, FaFire, FaPlay } from 'react-icons/fa6'
import Image from 'next/image'
import Chart from 'chart.js/auto'
import Log from "@/public/image.jpg"

type View = 'dashboard' | 'upload' | 'processing' | 'results' | 'history' | 'profile' | 'athletes'

interface HistoryViewProps {
  setCurrentView: (view: View) => void
}

export default function HistoryView({ setCurrentView }: HistoryViewProps) {
  const chartRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        const chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
            datasets: [
              {
                label: 'Speed',
                data: [65, 68, 72, 75, 78, 80, 82, 84],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4
              },
              {
                label: 'Accuracy',
                data: [70, 72, 75, 78, 82, 85, 88, 92],
                borderColor: '#8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                tension: 0.4
              },
              {
                label: 'Consistency',
                data: [60, 65, 68, 72, 75, 78, 82, 84],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: { padding: 20 }
              }
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: { color: '#f1f5f9' }
              },
              x: {
                grid: { display: false }
              }
            }
          }
        })
        return () => chart.destroy()
      }
    }
  }, [])

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Performance History</h1>
          <p className="text-slate-500 mt-1">Track your progress and compare past performances.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm">
            <FaFilter className="inline mr-2" /> Filter
          </button>
          <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm">
            <FaDownload className="inline mr-2" /> Export
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-900 mb-6">Performance Trends</h3>
        <div className="h-80 relative w-full overflow-hidden">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <FaArrowTrendUp className="text-xl" />
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Total Analyses</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">47</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">+8 this week</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <FaChartLine className="text-xl" />
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Avg Improvement</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">+18%</p>
          <p className="text-xs text-blue-600 font-medium mt-1">Last 30 days</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <FaFire className="text-xl" />
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Current Streak</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">5 days</p>
          <p className="text-xs text-purple-600 font-medium mt-1">Keep it up!</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-bold text-slate-900">Past Uploads</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Video</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Sport</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                {
                  title: 'Forehand Swing',
                  date: 'Oct 26, 2023',
                  sport: 'Tennis',
                  score: '94%',
                  image: {Log},
                },
                {
                  title: 'Serve Practice',
                  date: 'Oct 25, 2023',
                  sport: 'Tennis',
                  score: '82%',
                  image: 'https://images.unsplash.com/photo-1519861531473-920026393112?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
                },
                {
                  title: 'Backhand Drills',
                  date: 'Oct 24, 2023',
                  sport: 'Tennis',
                  score: '89%',
                  image: 'https://images.unsplash.com/photo-1628779238951-be2c9f2a59f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
                }
              ].map((item, index) => (
                <tr key={index} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-slate-200 rounded overflow-hidden relative flex-shrink-0">
                        <Image src={Log} fill className="object-cover" alt="Video" />
                      </div>
                      <span className="font-medium text-slate-900">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{item.date}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{item.sport}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 text-xs font-bold rounded ${
                      parseInt(item.score) >= 90 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.score}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setCurrentView('results')}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}