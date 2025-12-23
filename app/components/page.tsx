"use client"

import { useState, useEffect } from 'react'
import LoginView from '@/app/components/views/LoginView'
import OnboardingView from '@/app/components/views/OnboardingView'
import MainLayout from '@/app/components/layouts/MainLayout'

type View = 'login' | 'onboarding' | 'dashboard' | 'upload' | 'processing' | 'results' | 'history' | 'profile' | 'athletes'

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('login')
  const [role, setRole] = useState<'athlete' | 'coach' | 'team'>('athlete')

  return (
    <>
      {currentView === 'login' && (
        <LoginView onSuccess={() => setCurrentView('onboarding')} />
      )}
      
      {currentView === 'onboarding' && (
        <OnboardingView 
          role={role}
          setRole={setRole}
          onComplete={() => setCurrentView('dashboard')} 
        />
      )}
      
      {['dashboard', 'upload', 'processing', 'results', 'history', 'profile', 'athletes'].includes(currentView) && (
        <MainLayout 
          currentView={currentView} 
          setCurrentView={setCurrentView}
          role={role}
        />
      )}
    </>
  )
}