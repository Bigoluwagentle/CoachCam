"use client"

import { ReactNode } from 'react'
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
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} role={role} />
      <MobileNav currentView={currentView} setCurrentView={setCurrentView} role={role} />
      
      <main className="flex-1 flex flex-col min-w-0 bg-slate-50 pb-20 md:pb-0 overflow-y-auto">
        <Header />
        
        {currentView === 'dashboard' && <DashboardView role={role} setCurrentView={setCurrentView} />}
        {currentView === 'upload' && <UploadView setCurrentView={setCurrentView} />}
        {currentView === 'processing' && <ProcessingView setCurrentView={setCurrentView} />}
        {currentView === 'results' && <ResultsView setCurrentView={setCurrentView} />}
        {currentView === 'history' && <HistoryView setCurrentView={setCurrentView} />}
        {currentView === 'profile' && <ProfileView />}
        {currentView === 'athletes' && <AthletesView />}
      </main>
    </div>
  )
}