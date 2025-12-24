"use client"

import { useState, useRef, useEffect } from 'react'
import { FaCloudArrowUp, FaArrowLeft } from 'react-icons/fa6'
import { Loader2 } from 'lucide-react'
import { auth, db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

type View = 'dashboard' | 'upload' | 'processing' | 'results' | 'history' | 'profile' | 'athletes'

interface UploadViewProps {
  setCurrentView: (view: View) => void
  setAnalysisId: (id: string) => void
}

export default function UploadView({ setCurrentView, setAnalysisId }: UploadViewProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [sport, setSport] = useState('Tennis')
  const [activityType, setActivityType] = useState('Practice Drill')
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const CLOUD_NAME = "db1uamf9c" 
  const UPLOAD_PRESET = "ml_default" 

  const onFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Simple validation
    if (file.size > 50 * 1024 * 1024) { // 50MB limit
        alert("Video file is too large. Please upload a file under 50MB.")
        return
    }

    handleUpload(file)
  }

  const handleUpload = async (file: File) => {
    const user = auth.currentUser
    if (!user) {
      alert("Session expired. Please log in again.")
      return
    }

    setUploading(true)
    setProgress(10) // Start
    
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", UPLOAD_PRESET)
    formData.append("folder", `coachcam_uploads/${user.uid}`)

    try {
      console.log("Starting Cloudinary Upload...");
      setProgress(30)
      
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`,
        {
          method: "POST",
          body: formData,
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || "Cloudinary Upload Failed")
      }
      
      const data = await response.json()
      console.log("Cloudinary Upload Success:", data.secure_url);
      setProgress(80)

      // 2. Create the Analysis Record in Firestore
      console.log("Creating Firestore Document...");
      const docRef = await addDoc(collection(db, "analyses"), {
        userId: user.uid,
        videoUrl: data.secure_url, 
        publicId: data.public_id,
        fileName: file.name,
        sport: sport,
        activityType: activityType,
        status: 'processing',
        createdAt: serverTimestamp(),
        performanceScore: 0,
        aiFeedback: [],
        rawPoseData: null
      })

      console.log("Firestore Document Created ID:", docRef.id);
      setProgress(95)

      // 3. Complete and Transition
      // We call setAnalysisId FIRST to ensure the state is ready
      setAnalysisId(docRef.id) 
      setProgress(100)
      
      // Small delay so the user sees the 100% success
      setTimeout(() => {
        setUploading(false)
        console.log("Transitioning to Processing View...");
        setCurrentView('processing')
      }, 800)

    } catch (error: any) {
      console.error("CRITICAL UPLOAD ERROR:", error)
      alert(`Upload Failed: ${error.message}`)
      setUploading(false)
      setProgress(0)
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto w-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-6 flex items-center justify-between">
        <div>
            <button
            onClick={() => setCurrentView('dashboard')}
            className="text-slate-500 hover:text-blue-600 mb-2 flex items-center gap-2 transition-colors font-semibold text-sm group"
            >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Upload Session</h1>
            <p className="text-slate-500 mt-1">AI will analyze joint angles and posture.</p>
        </div>
        <div className="hidden md:block">
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-bold border border-blue-100">
                MAX 50MB
            </div>
        </div>
      </div>

      <div
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`bg-white rounded-[2rem] shadow-sm border-2 border-dashed p-12 min-h-[380px] flex flex-col items-center justify-center text-center transition-all cursor-pointer group ${
          uploading ? 'border-blue-300 bg-blue-50/10' : 'border-slate-200 hover:border-blue-500 hover:bg-blue-50/40'
        }`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={onFileSelect} 
          accept="video/*" 
          className="hidden" 
        />

        {uploading ? (
          <div className="flex flex-col items-center w-full max-w-xs">
            <div className="relative mb-8">
               <Loader2 className="w-20 h-20 text-blue-600 animate-spin opacity-20" />
               <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-blue-600">
                 {progress}%
               </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Syncing with AI</h3>
            <p className="text-sm text-slate-500 mb-8 font-medium">Please do not close this window</p>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <>
            <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-2 transition-all duration-300 shadow-sm">
              <FaCloudArrowUp className="text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Drop your video here</h3>
            <p className="text-slate-500 mb-10 max-w-sm leading-relaxed">
              Ensure the camera is stable and your <b>entire body</b> is visible for accurate scoring.
            </p>
            <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95">
              Select Video File
            </button>
          </>
        )}
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Discipline</label>
          <select 
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            disabled={uploading}
            className="w-full rounded-2xl border-slate-200 border-2 px-5 py-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none bg-white font-bold text-slate-700 transition-all appearance-none cursor-pointer"
          >
            <option>Tennis</option>
            <option>Basketball</option>
            <option>Golf</option>
            <option>Soccer</option>
          </select>
        </div>
        <div className="space-y-3">
          <label className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Training Focus</label>
          <select 
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
            disabled={uploading}
            className="w-full rounded-2xl border-slate-200 border-2 px-5 py-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none bg-white font-bold text-slate-700 transition-all appearance-none cursor-pointer"
          >
            <option>Practice Drill</option>
            <option>Real-game Analysis</option>
            <option>Technique Refinement</option>
            <option>Stance Check</option>
          </select>
        </div>
      </div>
    </div>
  )
}