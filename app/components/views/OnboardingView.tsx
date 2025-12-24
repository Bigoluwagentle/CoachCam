"use client"

import { useState } from 'react'
import { FaPersonRunning, FaStopwatch, FaUsers } from 'react-icons/fa6'
import { Loader2 } from 'lucide-react'
import { auth, db } from '@/lib/firebase'
import { doc, updateDoc, setDoc } from 'firebase/firestore'

interface OnboardingViewProps {
  role: 'athlete' | 'coach' | 'team'
  setRole: (role: 'athlete' | 'coach' | 'team') => void
  onComplete: () => void
}

export default function OnboardingView({ role, setRole, onComplete }: OnboardingViewProps) {
  const [step, setStep] = useState(1)
  const [selectedSport, setSelectedSport] = useState('')
  const [skillLevel, setSkillLevel] = useState('')
  const [goals, setGoals] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const sports = ['Tennis', 'Basketball', 'Golf', 'Soccer', 'Baseball', 'Running', 'Swimming', 'Other']

  const handleGoalToggle = (goal: string) => {
    setGoals(prev => 
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    )
  }

  const handleComplete = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);
    try {
      // Save all profile data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        role: role,
        sport: selectedSport,
        skillLevel: skillLevel,
        goals: goals,
        onboardingComplete: true,
        updatedAt: new Date()
      }, { merge: true }); // Use merge to avoid overwriting existing fields

      onComplete();
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Progress Bar Header */}
        <div className="bg-blue-600 p-6 text-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Setup your profile</h2>
            <div className="text-blue-200 text-sm">Step {step} of 3</div>
          </div>
          <div className="w-full bg-blue-800 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500" 
              style={{ width: `${step * 33.33}%` }}
            ></div>
          </div>
        </div>

        <div className="p-8">
          {/* Step 1: Role */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">I am a...</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <button 
                  onClick={() => { setRole('athlete'); setStep(2); }}
                  className={`p-6 border-2 rounded-xl text-left hover:border-blue-500 hover:bg-blue-50 transition group ${
                    role === 'athlete' ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
                  }`}
                >
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FaPersonRunning className="text-xl" />
                  </div>
                  <h4 className="font-bold text-slate-900">Athlete</h4>
                  <p className="text-sm text-slate-500 mt-1">I want to improve my performance</p>
                </button>

                <button 
                  onClick={() => { setRole('coach'); setStep(2); }}
                  className={`p-6 border-2 rounded-xl text-left hover:border-blue-500 hover:bg-blue-50 transition group ${
                    role === 'coach' ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
                  }`}
                >
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FaStopwatch className="text-xl" />
                  </div>
                  <h4 className="font-bold text-slate-900">Coach</h4>
                  <p className="text-sm text-slate-500 mt-1">I manage athletes and teams</p>
                </button>

                <button 
                  onClick={() => { setRole('team'); setStep(2); }}
                  className={`p-6 border-2 rounded-xl text-left hover:border-blue-500 hover:bg-blue-50 transition group ${
                    role === 'team' ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
                  }`}
                >
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FaUsers className="text-xl" />
                  </div>
                  <h4 className="font-bold text-slate-900">Team</h4>
                  <p className="text-sm text-slate-500 mt-1">Organization management</p>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Sport & Level */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">What's your main sport?</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {sports.map((sport) => (
                  <button
                    key={sport}
                    onClick={() => setSelectedSport(sport)}
                    className={`py-3 px-4 rounded-lg border font-medium transition text-center ${
                      selectedSport === sport
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-slate-200 hover:border-blue-500 hover:text-blue-600'
                    }`}
                  >
                    {sport}
                  </button>
                ))}
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-4 mt-8">Skill Level</h3>
              <div className="space-y-3">
                {['beginner', 'intermediate', 'advanced'].map((level) => (
                  <label
                    key={level}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-slate-50 transition-colors ${
                      skillLevel === level ? 'border-blue-500 bg-blue-50' : 'border-slate-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="level"
                      checked={skillLevel === level}
                      onChange={() => setSkillLevel(level)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-4">
                      <span className="block font-medium text-slate-900 capitalize">{level}</span>
                      <span className="block text-sm text-slate-500 text-balance">
                        {level === 'beginner' && 'Just starting out, learning basics'}
                        {level === 'intermediate' && 'Competes regularly, refining technique'}
                        {level === 'advanced' && 'Elite performance, minor adjustments'}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
              
              <div className="flex justify-between mt-8">
                <button onClick={() => setStep(1)} className="text-slate-500 font-medium hover:text-slate-800">
                  Back
                </button>
                <button 
                  disabled={!selectedSport || !skillLevel}
                  onClick={() => setStep(3)} 
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-medium transition"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Goals */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">What are your goals?</h3>
              <div className="space-y-3 mb-8">
                {[
                  'Improve technique accuracy',
                  'Increase speed & power',
                  'Prevent injury',
                  'Track progress over time'
                ].map((goal) => (
                  <label key={goal} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                    <input 
                      type="checkbox" 
                      checked={goals.includes(goal)}
                      onChange={() => handleGoalToggle(goal)}
                      className="rounded text-blue-600 w-5 h-5 border-slate-300" 
                    />
                    <span className="text-lg text-slate-700">{goal}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={() => setStep(2)} className="text-slate-500 font-medium hover:text-slate-800">
                  Back
                </button>
                <button 
                  disabled={loading || goals.length === 0}
                  onClick={handleComplete}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-blue-500/30 transition transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                  {loading ? 'Saving Profile...' : 'Complete Setup'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}