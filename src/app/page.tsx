'use client'
import { useState, useEffect } from 'react'
import { ConfirmeTab, ItineraireTab, VillesTab, BudgetTab, VolsTab, VehiculesTab, EvenementsTab, CarteTab, ResumeTab, PackingTab, MeteoTab } from '@/components/Tabs'

const tabs = [
  { id: 'confirme', label: 'Confirme', icon: '✅' },
  { id: 'itineraire', label: 'Itineraire', icon: '🗺' },
  { id: 'villes', label: 'Villes', icon: '🏖' },
  { id: 'budget', label: 'Budget', icon: '💰' },
  { id: 'vols', label: 'Vols', icon: '✈' },
  { id: 'vehicules', label: 'Vehicules', icon: '🚐' },
  { id: 'evenements', label: 'Events', icon: '📅' },
  { id: 'carte', label: 'Carte', icon: '📍' },
  { id: 'meteo', label: 'Meteo', icon: '🌤' },
  { id: 'packing', label: 'Valise', icon: '🎒' },
  { id: 'resume', label: 'Resume', icon: '📋' },
]

const DEPARTURE = new Date('2026-05-01T07:00:00+10:00')

function useCountdown() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])
  const diff = DEPARTURE.getTime() - now.getTime()
  if (diff <= 0) return null
  const days = Math.floor(diff / 86_400_000)
  const hours = Math.floor((diff % 86_400_000) / 3_600_000)
  return { days, hours }
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('confirme')
  const countdown = useCountdown()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src="/trip-east-coast/images/hero-banner.png" alt="East Coast Australia" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">East Coast Australia</h1>
          <p className="text-lg md:text-xl mt-2 opacity-90">Mai 2026</p>
          <p className="text-sm md:text-base mt-1 opacity-75">Valentin & Nicolas — 11 jours de Byron Bay aux Whitsundays</p>
          {countdown && (
            <div className="mt-4 flex items-center gap-3 bg-white/15 backdrop-blur-sm rounded-full px-5 py-2">
              <span className="text-2xl md:text-3xl font-bold">{countdown.days}</span>
              <span className="text-sm opacity-80">jours</span>
              <span className="text-2xl md:text-3xl font-bold">{countdown.hours}</span>
              <span className="text-sm opacity-80">heures</span>
              <span className="text-xs opacity-60 ml-2">avant le depart</span>
            </div>
          )}
        </div>
      </div>

      {/* Tab Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto overflow-x-auto">
          <div className="flex min-w-max">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-sky-500 text-sky-600 bg-sky-50/50'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {activeTab === 'confirme' && <ConfirmeTab />}
        {activeTab === 'itineraire' && <ItineraireTab />}
        {activeTab === 'villes' && <VillesTab />}
        {activeTab === 'budget' && <BudgetTab />}
        {activeTab === 'vols' && <VolsTab />}
        {activeTab === 'vehicules' && <VehiculesTab />}
        {activeTab === 'evenements' && <EvenementsTab />}
        {activeTab === 'carte' && <CarteTab />}
        {activeTab === 'meteo' && <MeteoTab />}
        {activeTab === 'packing' && <PackingTab />}
        {activeTab === 'resume' && <ResumeTab />}
      </div>
    </div>
  )
}
