// components/views/ProcessingView.tsx
"use client"

import { useState, useEffect } from 'react'
import { FaWandMagicSparkles } from 'react-icons/fa6'

type View = 'dashboard' | 'upload' | 'processing' | 'results' | 'history' | 'profile' | 'athletes'

interface ProcessingViewProps {
  setCurrentView: (view: View) => void
}

export default function ProcessingView({ setCurrentView }: ProcessingViewProps) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Initializing...')

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2
        
        if (newProgress < 30) {
          setStatus('Uploading video securely...')
        } else if (newProgress < 60) {
          setStatus('Analyzing skeletal movement...')
        } else if (newProgress < 90) {
          setStatus('Extracting performance metrics...')
        } else {
          setStatus('Generating AI insights...')
        }

        if (newProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setCurrentView('results')
          }, 500)
        }

        return newProgress
      })
    }, 80)

    return () => clearInterval(interval)
  }, [setCurrentView])

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto w-full flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <FaWandMagicSparkles className="text-3xl text-blue-600 animate-pulse" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-slate-900 mb-2">Analyzing Movement</h2>
      <p className="text-slate-500 mb-8 text-center max-w-md">{status}</p>
      
      <div className="w-full max-w-md bg-slate-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-blue-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}