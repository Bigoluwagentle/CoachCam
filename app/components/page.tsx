"use client"

import { useState } from 'react'
import LoginView from '@/app/components/views/LoginView'
import OnboardingView from '@/app/components/views/OnboardingView'
import MainLayout from '@/app/components/layouts/MainLayout'

export type View = 'login' | 'onboarding' | 'dashboard' | 'upload' | 'processing' | 'results' | 'history' | 'profile' | 'athletes'

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('login')
  const [role, setRole] = useState<'athlete' | 'coach' | 'team'>('athlete')

  // This function now accepts the target decided by the login logic
  const handleLoginSuccess = (targetView: 'dashboard' | 'onboarding') => {
    setCurrentView(targetView)
  }

  return (
    <>
      {currentView === 'login' && (
        <LoginView onSuccess={handleLoginSuccess} />
      )}
      
      {currentView === 'onboarding' && (
        <OnboardingView 
          role={role}
          setRole={setRole}
          onComplete={() => setCurrentView('dashboard')} 
        />
      )}
      
      {/* If the view is anything else, show the MainLayout */}
      {currentView !== 'login' && currentView !== 'onboarding' && (
        <MainLayout 
          currentView={currentView as any}
          setCurrentView={setCurrentView as any}
          role={role}
        />
      )}
    </>
  )
}