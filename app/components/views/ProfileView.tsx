"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { auth, db } from '@/lib/firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { FaCrown, FaCheck, FaUserSlash, FaCloudArrowUp } from 'react-icons/fa6'
import { Loader2 } from 'lucide-react'
import Log from "@/public/image.jpg"

export default function ProfileView() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    sport: 'Tennis',
    skillLevel: 'Intermediate'
  })

  // 1. Load User Data from Auth and Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser
      if (user) {
        // Try to get extended profile from Firestore
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)
        
        setUserProfile({
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ')[1] || '',
          email: user.email || '',
          sport: docSnap.exists() ? docSnap.data().sport : 'Tennis',
          skillLevel: docSnap.exists() ? docSnap.data().skillLevel : 'Intermediate'
        })
      }
      setLoading(false)
    }
    fetchUserData()
  }, [])

  // 2. Handle Save
  const handleSave = async () => {
    setSaving(true)
    const user = auth.currentUser
    if (user) {
      const docRef = doc(db, "users", user.uid)
      await updateDoc(docRef, {
        sport: userProfile.sport,
        skillLevel: userProfile.skillLevel,
        updatedAt: new Date()
      })
      alert("Settings saved successfully!")
    }
    setSaving(false)
  }

  if (loading) return (
    <div className="flex h-[60vh] items-center justify-center">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
    </div>
  )

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Account Settings</h1>
          <p className="text-slate-500">Manage your profile and AI subscription.</p>
        </div>
        <div className="hidden md:block">
           <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100">
             Free Plan
           </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center gap-6">
              <div className="relative group">
                <Image
                  src={auth.currentUser?.photoURL || Log}
                  width={80}
                  height={80}
                  className="rounded-full border-4 border-slate-50 shadow-sm object-cover"
                  alt="Profile"
                />
                <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity">
                   <FaCloudArrowUp className="text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">{userProfile.firstName} {userProfile.lastName}</h2>
                <p className="text-sm text-slate-500">{userProfile.email}</p>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={userProfile.email}
                  className="w-full rounded-xl border-slate-200 border px-4 py-3 bg-slate-50 text-slate-500 cursor-not-allowed"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Primary Sport</label>
                <select 
                  value={userProfile.sport}
                  onChange={(e) => setUserProfile({...userProfile, sport: e.target.value})}
                  className="w-full rounded-xl border-slate-200 border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white transition-all"
                >
                  <option>Tennis</option>
                  <option>Basketball</option>
                  <option>Golf</option>
                  <option>Soccer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Skill Level</label>
                <select 
                  value={userProfile.skillLevel}
                  onChange={(e) => setUserProfile({...userProfile, skillLevel: e.target.value})}
                  className="w-full rounded-xl border-slate-200 border px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white transition-all"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>Professional</option>
                </select>
              </div>
            </div>

            <div className="bg-slate-50 px-6 py-4 flex justify-end gap-3">
              <button 
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <FaCheck />}
                Save Settings
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
             <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
               <FaUserSlash className="text-slate-400" /> Danger Zone
             </h3>
             <p className="text-sm text-slate-500 mb-4">Once you delete your account, there is no going back. All your AI analysis history will be permanently wiped.</p>
             <button className="text-red-500 text-sm font-bold hover:underline">Delete my account and data</button>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-6">
          {/* Subscription Card */}
          <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
            <FaCrown className="absolute -right-4 -top-4 text-white/10 text-9xl rotate-12 group-hover:rotate-0 transition-transform duration-700" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Pro Plan</h3>
              <p className="text-blue-100 text-sm mb-6">Unlock side-by-side pro comparisons and unlimited uploads.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-xs font-medium">
                  <FaCheck className="text-blue-300" /> Unlimited AI Analysis
                </li>
                <li className="flex items-center gap-2 text-xs font-medium">
                  <FaCheck className="text-blue-300" /> Pro Athlete Ghosting
                </li>
                <li className="flex items-center gap-2 text-xs font-medium">
                  <FaCheck className="text-blue-300" /> 4K Video Support
                </li>
              </ul>
              <button className="w-full py-3 bg-white text-blue-700 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors shadow-lg">
                Upgrade Now
              </button>
            </div>
          </div>

          {/* Usage Tracker */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
             <h3 className="font-bold text-slate-900 mb-4">Credits Used</h3>
             <div className="space-y-4">
                <div>
                   <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-400 uppercase tracking-wider">AI Processing</span>
                      <span className="text-slate-900">3 / 5 Videos</span>
                   </div>
                   <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full w-[60%]"></div>
                   </div>
                </div>
                <p className="text-[10px] text-slate-400 italic">Your free credits reset in 4 days.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}