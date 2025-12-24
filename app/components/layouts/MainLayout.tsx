"use client"

import { useState } from 'react' // 1. Added useState
import Sidebar from '@/app/components/navigation/Sidebar'
import MobileNav from '@/app/components/navigation/MobileNav'
import Header from '@/app/components/navigation/Header'
import DashboardView from '@/app/components/views/DashboardView'
import UploadView from '@/app/components/views/UploadView'
import ProcessingView from '@/app/components/views/ProcessingView'
import ResultsView from '@/app/components/views/ResultsView'
import HistoryView from '@/app/components/views/HistoryView'
import ProfileView from '@/app/components/views/ProfileView'
import AthletesView from '@/app/components/views/AthletesView'

type View = 'dashboard' | 'upload' | 'processing' | 'results' | 'history' | 'profile' | 'athletes'

interface MainLayoutProps {
  currentView: View
  setCurrentView: (view: View) => void
  role: 'athlete' | 'coach' | 'team'
}

export default function MainLayout({ currentView, setCurrentView, role }: MainLayoutProps) {
  // 2. Add this state to store the Firebase Document ID
  const [analysisId, setAnalysisId] = useState<string>('')

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} role={role} />
      <MobileNav currentView={currentView} setCurrentView={setCurrentView} role={role} />
      
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 pb-20 md:pb-0 overflow-y-auto">
        <Header />
        
        {currentView === 'dashboard' && <DashboardView role={role} setCurrentView={setCurrentView} />}
        
        {/* 3. Pass setAnalysisId to the UploadView */}
        {currentView === 'upload' && (
          <UploadView 
            setCurrentView={setCurrentView} 
            setAnalysisId={setAnalysisId} 
          />
        )}
        
        {/* 4. Pass the actual analysisId to the ProcessingView */}
        {currentView === 'processing' && (
          <ProcessingView 
            analysisId={analysisId} 
            setCurrentView={setCurrentView} 
          />
        )}

        {currentView === 'results' && (
          <ResultsView 
            analysisId={analysisId} 
            setCurrentView={setCurrentView} 
          />
        )}

        {currentView === 'history' && <HistoryView setCurrentView={setCurrentView} />}
        <ProfileView />
        <AthletesView />
      </main>
    </div>
  )
}