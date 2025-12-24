"use client"

import { useState, useEffect } from 'react'
import { FaWandMagicSparkles, FaMicrochip, FaPersonRunning, FaChartLine } from 'react-icons/fa6'
import { db } from '@/lib/firebase'
import { doc, onSnapshot } from 'firebase/firestore' // 1. Changed to 'doc'
import { auth } from '@/lib/firebase'

type View = 'dashboard' | 'upload' | 'processing' | 'results' | 'history' | 'profile' | 'athletes'

interface ProcessingViewProps {
  analysisId: string;
  setCurrentView: (view: View) => void;
}

// 2. Added analysisId here inside the curly braces!
export default function ProcessingView({ setCurrentView, analysisId }: ProcessingViewProps) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Initializing AI...')

  useEffect(() => {
    // 3. Optimized Listener: Listen to the specific document ID we just created
    if (!analysisId) return;

    const unsubscribe = onSnapshot(doc(db, "analyses", analysisId), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        
        // If the status changes to completed, finish the bar and move on
        if (data.status === 'completed') {
          setProgress(100);
          setStatus('Analysis Complete!');
          setTimeout(() => setCurrentView('results'), 1000);
        }
      }
    });

    // 4. Visual Progress Simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95; 
        const newProgress = prev + 1;
        
        if (newProgress < 25) setStatus('Initializing Neural Network...')
        else if (newProgress < 50) setStatus('Identifying Body Keypoints...')
        else if (newProgress < 75) setStatus('Calculating Biometric Data...')
        else setStatus('Finalizing Technique Report...')

        return newProgress;
      });
    }, 150);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [analysisId, setCurrentView]); // Added analysisId to dependency array

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto w-full flex flex-col items-center justify-center min-h-[70vh] animate-in fade-in duration-700">
      
      {/* AI Scanning Animation */}
      <div className="relative w-48 h-48 mb-12">
        <div className="absolute inset-0 border-b-2 border-l-2 border-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-4 bg-slate-50 rounded-2xl border-2 border-slate-200 overflow-hidden flex items-center justify-center shadow-inner">
           <div className="absolute w-full h-1 bg-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-bounce top-0" />
           <div className="flex flex-col items-center gap-2">
             {progress < 40 ? <FaMicrochip className="text-4xl text-slate-300 animate-pulse" /> : 
              progress < 80 ? <FaPersonRunning className="text-4xl text-blue-500 animate-bounce" /> :
              <FaChartLine className="text-4xl text-emerald-500" />}
           </div>
        </div>
        <div className="absolute -top-2 -right-2">
           <FaWandMagicSparkles className="text-2xl text-amber-400 animate-pulse" />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">AI Analysis in Progress</h2>
        <p className="text-slate-500 font-medium h-6">{status}</p>
      </div>
      
      <div className="w-full max-w-md mt-10">
        <div className="flex justify-between mb-2 px-1">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Processing Power: High</span>
            <span className="text-xs font-bold text-slate-600">{progress}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3 p-1 border border-slate-200">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.4)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <p className="mt-12 text-xs text-slate-400 max-w-xs text-center leading-relaxed">
        ID: <span className="font-mono">{analysisId}</span><br/>
        Our Vision AI is processing your movement at 30 frames per second.
      </p>
    </div>
  )
}