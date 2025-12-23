
"use client"

import { useState } from 'react'
import { Upload, BarChart3, TrendingUp, Check, Menu, X } from 'lucide-react' // Added Menu and X
import Link from 'next/link'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false) // State for mobile menu

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0d1b2a] to-[#1b263b]">
      <nav className="flex items-center justify-between px-6 py-4 lg:px-16 relative z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#00d9ff] to-[#00ff88] rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-[#0a1628]" />
          </div>
          <span className="text-white font-semibold text-xl">CoachCam</span>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2 focus:outline-none"
          >
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-gray-300 hover:text-[#00d9ff] transition-colors">Features</a>
          <a href="#" className="text-gray-300 hover:text-[#00d9ff] transition-colors">About</a>
          <Link href="/components" className="text-gray-300 hover:text-[#00d9ff] transition-colors">Login</Link>
          <Link href="/components">
            <button className="bg-[#00d9ff] text-[#0a1628] px-6 py-2 rounded-lg font-semibold hover:bg-[#00c4ea] cursor-pointer transition-colors">
              Sign Up
            </button>
          </Link>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#0d1b2a] border-b border-[#2a3f5f] p-6 flex flex-col gap-6 md:hidden animate-in slide-in-from-top duration-300 shadow-2xl">
            <a href="#" onClick={() => setIsMenuOpen(false)} className="text-gray-300 text-lg">Features</a>
            <a href="#" onClick={() => setIsMenuOpen(false)} className="text-gray-300 text-lg">About</a>
            <Link href="/components" onClick={() => setIsMenuOpen(false)} className="text-gray-300 text-lg">Login</Link>
            <Link href="/components" onClick={() => setIsMenuOpen(false)}>
              <button className="bg-[#00d9ff] text-[#0a1628] w-full py-3 rounded-lg font-semibold">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 lg:px-16 text-center max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#1a2942] border border-[#2a3f5f] rounded-full px-4 py-2 mb-8">
          <div className="w-2 h-2 bg-[#00ff88] rounded-full"></div>
          <span className="text-gray-300 text-sm">Powered by Advanced AI Technology</span>
        </div>

        <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          AI-Powered Performance<br />
          Insights for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d9ff] to-[#00ff88]">Athletes & Coaches</span>
        </h1>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
          Upload your training videos and get instant AI-generated performance analysis, personalized feedback, and actionable insights to elevate your game.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/components">
          <button className="bg-[#00d9ff] text-[#0a1628] w-full md:w-60 px-8 py-3 rounded-lg font-semibold hover:bg-[#00c4ea] transition-colors">
            Get Started
          </button>
          </Link>
          <Link href="/components">
          <button className="bg-transparent border-2 w-full md:w-60 border-[#2a3f5f] text-white px-8 py-3 rounded-lg font-semibold hover:border-[#3a4f6f] transition-colors flex items-center justify-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Video
          </button>
          </Link>
        </div>
      </section>

      <section className="px-6 py-20 bg-[#151B3D] lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-gray-400">Three simple steps to transform your performance</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center shadow-10 shadow-gray-100 mb-15">
            <div className="w-20 h-20 bg-gradient-to-br from-[#00d9ff] to-[#0088ff] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Upload className="w-10 h-10 text-white" />
            </div>
            <div className="text-[#00d9ff] text-sm font-semibold mb-2">STEP 1</div>
            <h3 className="text-2xl font-bold text-white mb-4">Upload</h3>
            <p className="text-gray-400">
              Upload your training or match video in any format. Our platform supports all major video types.
            </p>
          </div>

          <div className="text-center shadow-10 shadow-gray-100 mb-15">
            <div className="w-20 h-20 bg-gradient-to-br from-[#00ff88] to-[#00cc66] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-10 h-10 text-[#0a1628]" />
            </div>
            <div className="text-[#00ff88] text-sm font-semibold mb-2">STEP 2</div>
            <h3 className="text-2xl font-bold text-white mb-4">Analyze</h3>
            <p className="text-gray-400">
              Our AI analyzes your movements, techniques, and performance metrics in real-time.
            </p>
          </div>

          <div className="text-center shadow-10 shadow-gray-100 mb-15">
            <div className="w-20 h-20 bg-gradient-to-br from-[#00d9ff] to-[#00ff88] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-10 h-10 text-[#0a1628]" />
            </div>
            <div className="text-[#00d9ff] text-sm font-semibold mb-2">STEP 3</div>
            <h3 className="text-2xl font-bold text-white mb-4">Improve</h3>
            <p className="text-gray-400">
              Get personalized insights, track progress, and receive actionable tips to improve your performance.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-16 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Built For Everyone</h2>
          <p className="text-gray-400">Whether you're an athlete, coach, or team analyst</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#1a2942] to-[#0f1a2e] border border-[#2a3f5f] rounded-2xl p-8 hover:border-[#00d9ff] hover:border-1 ">
            <div className="w-12 h-12 bg-[#1e3a5f] rounded-xl flex items-center justify-center mb-6">
              <Upload className="w-6 h-6 text-[#00d9ff]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Athletes</h3>
            <p className="text-gray-400 mb-6">
              Track your performance, identify weaknesses, and get personalized training recommendations to reach your peak potential.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-5 h-5 text-[#00ff88]" />
                Personal performance tracking
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-5 h-5 text-[#00ff88]" />
                AI-powered feedback
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-5 h-5 text-[#00ff88]" />
                Progress visualization
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#1a2942] to-[#0f1a2e] border border-[#2a3f5f] hover:border-[#00ff88] hover:border-1 rounded-2xl p-8">
            <div className="w-12 h-12 bg-[#1e3a5f] rounded-xl flex items-center justify-center mb-6">
              <BarChart3 className="w-6 h-6 text-[#00ff88]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Coaches</h3>
            <p className="text-gray-400 mb-6">
              Monitor multiple athletes, compare performances, and provide data-driven coaching with comprehensive analytics.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-5 h-5 text-[#00ff88]" />
                Multi-athlete management
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-5 h-5 text-[#00ff88]" />
                Performance comparisons
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-5 h-5 text-[#00ff88]" />
                Team analytics dashboard
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#1a2942] hover:border-[#00ff88] hover:border-1 to-[#0f1a2e] border border-[#2a3f5f] rounded-2xl p-8">
            <div className="w-12 h-12 bg-[#1e3a5f] rounded-xl flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6 text-[#00d9ff]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Teams</h3>
            <p className="text-gray-400 mb-6">
              Analyze team dynamics, optimize strategies, and gain competitive advantages with advanced performance metrics.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-5 h-5 text-[#00ff88]" />
                Team performance metrics
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-5 h-5 text-[#00ff88]" />
                Strategy optimization
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Check className="w-5 h-5 text-[#00ff88]" />
                Competitive analysis
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-16 bg-[#151B3D] max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Powerful Analytics at Your Fingertips</h2>
          <p className="text-gray-400">See the insights that drive performance improvements</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-[#1a2942] to-[#0f1a2e] border border-[#2a3f5f] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">Speed Analysis</span>
              <TrendingUp className="w-5 h-5 text-[#00d9ff]" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">24.8 <span className="text-xl text-gray-400">km/h</span></div>
            <div className="text-[#00ff88] text-sm">+12% from last week</div>
          </div>

          <div className="bg-gradient-to-br from-[#1a2942] to-[#0f1a2e] border border-[#2a3f5f] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">Accuracy</span>
              <TrendingUp className="w-5 h-5 text-[#00d9ff]" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">87<span className="text-xl text-gray-400">%</span></div>
            <div className="text-[#00ff88] text-sm">+5% improvement</div>
          </div>

          <div className="bg-gradient-to-br from-[#1a2942] to-[#0f1a2e] border border-[#2a3f5f] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">Consistency</span>
              <TrendingUp className="w-5 h-5 text-[#00d9ff]" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">92<span className="text-xl text-gray-400">%</span></div>
            <div className="text-[#00ff88] text-sm">+8% this month</div>
          </div>

          <div className="bg-gradient-to-br from-[#1a2942] to-[#0f1a2e] border border-[#2a3f5f] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm">Technique Score</span>
              <TrendingUp className="w-5 h-5 text-[#00d9ff]" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">8.4<span className="text-xl text-gray-400">/10</span></div>
            <div className="text-[#00ff88] text-sm">Excellent form</div>
          </div>
        </div>
      </section>

      <footer className="px-6 py-12 lg:px-16 border-t border-[#2a3f5f]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#00d9ff] to-[#00ff88] rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-[#0a1628]" />
                </div>
                <span className="text-white font-semibold text-xl">CoachCam</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered performance analytics for athletes and coaches.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">API</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Careers</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[#2a3f5f] pt-8 text-center text-gray-400 text-sm">
            © 2024 PerformAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}