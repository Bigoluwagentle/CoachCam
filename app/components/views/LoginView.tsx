"use client"

import { FaBolt, FaStar } from 'react-icons/fa'
import Image from 'next/image'
import Log from "@/public/image.jpg"
import bg from "@/public/bg.jpg"

interface LoginViewProps {
  onSuccess: () => void
}

export default function LoginView({ onSuccess }: LoginViewProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-white flex flex-col justify-center p-8 md:p-16 lg:p-24">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-blue-600 mb-6">
            <FaBolt className="text-3xl" />
            <span className="text-2xl font-bold tracking-tight">CoachCam</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
          <p className="text-slate-500">Enter your details to access your performance analytics.</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={onSuccess}
            className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-lg py-3 hover:bg-slate-50 transition-colors"
          >
            <Image 
              src={Log} 
              width={20} 
              height={20} 
              alt="Google"
            />
            <span className="font-medium text-slate-700">Continue with Google</span>
          </button>
          
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink-0 mx-4 text-slate-400 text-sm">Or continue with email</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); onSuccess(); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
              <input 
                type="email" 
                className="w-full rounded-lg border-slate-300 border px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
                placeholder="athlete@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input 
                type="password" 
                className="w-full rounded-lg border-slate-300 border px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" 
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500 border-slate-300" />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">Forgot password?</a>
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-3 transition-colors shadow-lg shadow-blue-500/30"
            >
              Sign In
            </button>
          </form>
          <p className="text-center text-sm text-slate-500 mt-6">
            Don't have an account? <a href="#" className="text-blue-600 font-medium">Sign up</a>
          </p>
        </div>
      </div>

      {/* Right Side - Testimonial */}
      <div className="hidden md:block md:w-1/2 bg-slate-900 relative overflow-hidden">
        <Image 
          src={bg}
          fill
          className="object-cover opacity-60" 
          alt="Sports background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-16 text-white">
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
          </div>
          <blockquote className="text-2xl font-medium leading-relaxed mb-4">
            "This platform completely transformed how I analyze my swing. The AI insights are incredibly accurate."
          </blockquote>
          <div className="flex items-center gap-4">
            <Image 
              src={Log}
              width={48} 
              height={48} 
              className="rounded-full border-2 border-white/20" 
              alt="User"
            />
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