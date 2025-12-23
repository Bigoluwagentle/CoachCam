// components/views/UploadView.tsx
"use client"

import { FaCloudArrowUp, FaArrowLeft } from 'react-icons/fa6'

type View = 'dashboard' | 'upload' | 'processing' | 'results' | 'history' | 'profile' | 'athletes'

interface UploadViewProps {
  setCurrentView: (view: View) => void
}

export default function UploadView({ setCurrentView }: UploadViewProps) {
  const handleUpload = () => {
    setCurrentView('processing')
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto w-full flex flex-col animate-fade-in">
      <div className="mb-6">
        <button
          onClick={() => setCurrentView('dashboard')}
          className="text-slate-500 hover:text-slate-800 mb-4 flex items-center gap-2"
        >
          <FaArrowLeft /> Back to Dashboard
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">New Analysis</h1>
        <p className="text-slate-500 mt-1">Upload a video to get AI-powered insights.</p>
      </div>

      <div
        onClick={handleUpload}
        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 min-h-[400px] flex flex-col items-center justify-center text-center border-dashed border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50/30 transition-all cursor-pointer group"
      >
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <FaCloudArrowUp className="text-3xl" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Drag & drop your video here</h3>
        <p className="text-slate-500 mb-8 max-w-md">
          Supports MP4, MOV, or AVI up to 500MB. For best results, ensure the full body is visible in the frame.
        </p>
        <button className="bg-white border border-slate-300 text-slate-700 hover:border-blue-500 hover:text-blue-600 px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm">
          Browse Files
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Sport</label>
          <select className="w-full rounded-lg border-slate-300 border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
            <option>Tennis</option>
            <option>Basketball</option>
            <option>Golf</option>
            <option>Soccer</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Activity Type</label>
          <select className="w-full rounded-lg border-slate-300 border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
            <option>Match Play</option>
            <option>Practice Drill</option>
            <option>Technique Isolation</option>
          </select>
        </div>
      </div>
    </div>
  )
}