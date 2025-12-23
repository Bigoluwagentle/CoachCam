// components/views/ResultsView.tsx
"use client"

import { FaArrowLeft, FaShareNodes, FaRotateRight, FaDownload, FaPlay, FaRobot } from 'react-icons/fa6'
import Image from 'next/image'

type View = 'dashboard' | 'upload' | 'processing' | 'results' | 'history' | 'profile' | 'athletes'

interface ResultsViewProps {
  setCurrentView: (view: View) => void
}

export default function ResultsView({ setCurrentView }: ResultsViewProps) {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="text-slate-500 hover:text-slate-800 mb-2 flex items-center gap-2 text-sm"
          >
            <FaArrowLeft /> Back to Dashboard
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Analysis Results</h1>
          <p className="text-slate-500">Forehand Swing • Oct 26, 2023</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm">
            <FaShareNodes className="inline mr-2" /> Share
          </button>
          <button
            onClick={() => setCurrentView('upload')}
            className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium text-sm"
          >
            <FaRotateRight className="inline mr-2" /> Re-analyze
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm shadow-lg shadow-blue-500/20">
            <FaDownload className="inline mr-2" /> Save
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-black rounded-xl overflow-hidden aspect-video relative group">
            <Image
              src="https://images.unsplash.com/photo-1599474924187-334a405be2ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              fill
              className="object-cover opacity-80"
              alt="Analysis Video"
            />
            
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-32 h-48 border-2 border-green-400 opacity-60 rounded-lg"></div>
            <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-green-500 rounded-full"></div>
            <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-green-500 rounded-full"></div>
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <line x1="50%" y1="25%" x2="33%" y2="33%" stroke="#4ade80" strokeWidth="2" />
              <line x1="50%" y1="25%" x2="66%" y2="33%" stroke="#4ade80" strokeWidth="2" />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center group-hover:opacity-100 opacity-0 transition-opacity bg-black/30">
              <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition">
                <FaPlay className="text-white text-2xl ml-1" />
              </button>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md rounded-lg p-3 flex items-center gap-4">
              <button className="text-white hover:text-blue-400"><FaPlay /></button>
              <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-blue-500"></div>
              </div>
              <span className="text-xs text-white font-mono">00:12 / 00:45</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">Key Moments</h3>
            <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
              {[
                { time: '00:04 - Late Prep', badge: 'Error', color: 'bg-red-500' },
                { time: '00:12 - Impact Point', badge: 'Good', color: 'bg-green-500' },
                { time: '00:18 - Follow Through', badge: 'Tip', color: 'bg-yellow-500' }
              ].map((moment, index) => (
                <div key={index} className="flex-shrink-0 w-40 cursor-pointer group">
                  <div className="aspect-video bg-slate-200 rounded-lg mb-2 overflow-hidden relative border-2 border-transparent group-hover:border-blue-500 transition">
                    <Image
                      src="https://images.unsplash.com/photo-1599474924187-334a405be2ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                      fill
                      className="object-cover"
                      alt="Key moment"
                    />
                    <div className={`absolute top-1 right-1 ${moment.color} text-white text-[10px] px-1.5 py-0.5 rounded font-bold`}>
                      {moment.badge}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-slate-900">{moment.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
            <h3 className="text-slate-500 text-sm font-medium mb-2">Overall Technique Score</h3>
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" stroke="#f1f5f9" strokeWidth="12" fill="none" />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  stroke="#3b82f6"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray="351.86"
                  strokeDashoffset="70"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-3xl font-bold text-slate-900">82</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              {[
                { label: 'Racket Speed', value: '72 mph', width: '75%', color: 'bg-blue-500' },
                { label: 'Hip Rotation', value: '45°', width: '60%', color: 'bg-purple-500' },
                { label: 'Impact Height', value: 'Optimal', width: '90%', color: 'bg-emerald-500' }
              ].map((metric, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-500">{metric.label}</span>
                    <span className="font-bold text-slate-900">{metric.value}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className={`${metric.color} h-2 rounded-full`} style={{ width: metric.width }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl shadow-lg text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <FaRobot className="text-white text-sm" />
              </div>
              <h3 className="font-bold">AI Coach Insights</h3>
            </div>
            <div className="space-y-4 text-sm text-slate-300">
              <p>
                <strong className="text-white">Strength:</strong> Great contact point consistency. You're hitting the ball in the sweet spot 90% of the time.
              </p>
              <div className="h-px bg-white/10"></div>
              <p>
                <strong className="text-yellow-400">Improvement:</strong> Your backswing is slightly late on fast incoming balls. Try preparing earlier by rotating your shoulders as soon as you see the ball direction.
              </p>
              <div className="h-px bg-white/10"></div>
              <p>
                <strong className="text-blue-400">Tip:</strong> Focus on maintaining consistent follow-through. Your best shots have a full extension.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}