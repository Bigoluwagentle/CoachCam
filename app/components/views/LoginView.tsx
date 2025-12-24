"use client"

import { useState } from 'react'
import { FaBolt, FaStar } from 'react-icons/fa'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Log from "@/public/image.jpg"
import bg from "@/public/bg.jpg"
import { auth, db } from '@/lib/firebase' // 1. Added db
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore' // 2. Added Firestore functions

interface LoginViewProps {
  // We update this to accept a "view" string so the parent knows where to send the user
  onSuccess: (targetView: 'dashboard' | 'onboarding') => void 
}

export default function LoginView({ onSuccess }: LoginViewProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Helper function to check if user has a profile
  const checkUserRoute = async (uid: string) => {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return 'dashboard';
    } else {
      return 'onboarding';
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Attempt login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const nextView = await checkUserRoute(userCredential.user.uid);
      onSuccess(nextView);
      
    } catch (signInError: any) {
      // 2. If login fails because user doesn't exist, try Registering
      if (signInError.code === 'auth/user-not-found' || signInError.code === 'auth/invalid-credential') {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          // New users definitely go to onboarding
          onSuccess('onboarding');
        } catch (signUpError: any) {
          if (signUpError.code === 'auth/weak-password') {
            setError("Password must be at least 6 characters.");
          } else {
            setError(signUpError.message);
          }
        }
      } else {
        setError("Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-white flex flex-col justify-center p-8 md:p-16 lg:p-24">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-blue-600 mb-6">
            <FaBolt className="text-3xl" />
            <span className="text-2xl font-bold tracking-tight">CoachCam</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome</h1>
          <p className="text-slate-500">Sign in to your account or register a new one instantly.</p>
        </div>

        <div className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
              {error}
            </div>
          )}

          <button 
            type="button"
            className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-lg py-3 hover:bg-slate-50 transition-colors"
          >
            <Image src={Log} width={20} height={20} alt="Google" />
            <span className="font-medium text-slate-700">Continue with Google</span>
          </button>
          
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-4 text-slate-400 text-sm">Or use email</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border-slate-300 border px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
                placeholder="athlete@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border-slate-300 border px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
                placeholder="••••••••"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Checking Profile...
                </>
              ) : (
                "Sign In / Register"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Testimonial Section */}
      <div className="hidden md:block md:w-1/2 bg-slate-900 relative overflow-hidden">
        <Image 
          src={bg}
          fill
          className="object-cover opacity-60" 
          alt="Sports background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-16 text-white z-10">
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
          </div>
          <blockquote className="text-2xl font-medium leading-relaxed mb-4">
            "This platform completely transformed how I analyze my swing. The AI insights are incredibly accurate."
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12">
               <Image 
                src={Log}
                fill
                className="rounded-full border-2 border-white/20 object-cover" 
                alt="User"
              />
            </div>
            <div>
              <p className="font-semibold">Alex Morgan</p>
              <p className="text-slate-400 text-sm">Pro Tennis Player</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}