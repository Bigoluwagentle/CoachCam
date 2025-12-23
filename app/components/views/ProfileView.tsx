// components/views/ProfileView.tsx
"use client"

import Image from 'next/image'
import Log from "@/public/image.jpg"

export default function ProfileView() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto w-full animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">Settings</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Profile Information</h2>
          <p className="text-sm text-slate-500">Update your personal details and public profile.</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-6">
            <Image
              src={Log}
              width={80}
              height={80}
              className="rounded-full border-2 border-white shadow-md"
              alt="Profile"
            />
            <button className="text-blue-600 font-medium hover:text-blue-700 text-sm">
              Change Photo
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
              <input
                type="text"
                defaultValue="Alex"
                className="w-full rounded-lg border-slate-300 border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
              <input
                type="text"
                defaultValue="Morgan"
                className="w-full rounded-lg border-slate-300 border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                defaultValue="alex.morgan@example.com"
                className="w-full rounded-lg border-slate-300 border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Sport</label>
              <select className="w-full rounded-lg border-slate-300 border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                <option>Tennis</option>
                <option>Basketball</option>
                <option>Golf</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Skill Level</label>
              <select className="w-full rounded-lg border-slate-300 border px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option selected>Advanced</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bg-slate-50 px-6 py-4 flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-8">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Notifications</h2>
          <p className="text-sm text-slate-500">Manage how you receive updates and alerts.</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-slate-900">Email Notifications</h3>
              <p className="text-sm text-slate-500">Receive weekly performance summaries.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-slate-900">Push Notifications</h3>
              <p className="text-sm text-slate-500">Get notified when analysis is complete.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Privacy & Account</h2>
          <p className="text-sm text-slate-500">Control your data and account settings.</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-slate-900">Public Profile</h3>
              <p className="text-sm text-slate-500">Allow coaches to find your profile.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="pt-4 border-t border-slate-100">
            <button className="text-red-600 hover:text-red-700 font-medium text-sm">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}