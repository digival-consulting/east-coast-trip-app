'use client'
import { useState, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { cities, pois, events } from '@/data/tripData'

const categoryConfig: Record<string, { emoji: string; label: string; color: string }> = {
  airport: { emoji: '✈️', label: 'Aeroports', color: '#6366f1' },
  fuel: { emoji: '⛽', label: 'Essence', color: '#f59e0b' },
  accommodation: { emoji: '🏕️', label: 'Hebergement', color: '#10b981' },
  'must-see': { emoji: '⭐', label: 'Incontournables', color: '#ef4444' },
  event: { emoji: '🎪', label: 'Evenements', color: '#ec4899' },
  'van-rental': { emoji: '🚐', label: 'Location van', color: '#8b5cf6' },
  warning: { emoji: '⚠️', label: 'Dangers', color: '#f97316' },
}

function makeIcon(emoji: string) {
  return L.divIcon({
    html: `<span style="font-size:22px">${emoji}</span>`,
    className: 'bg-transparent border-none',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  })
}

const cityIcon = L.divIcon({
  html: '<span style="font-size:22px">📍</span>',
  className: 'bg-transparent border-none',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
})

export default function MapComponent() {
  const [activeCategories, setActiveCategories] = useState<Set<string>>(
    () => new Set(Object.keys(categoryConfig))
  )

  const toggleCategory = (cat: string) => {
    setActiveCategories(prev => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }

  const eventPois = useMemo(() =>
    events
      .filter(e => e.lat && e.lng)
      .map(e => ({
        name: e.name,
        lat: e.lat,
        lng: e.lng,
        category: 'event' as const,
        description: `${e.date} — ${e.location}${e.mustSee ? ' (a ne pas louper !)' : ''}`,
        url: e.officialUrl,
      })),
    []
  )

  const allPois = useMemo(() => [
    ...pois.map(p => ({ ...p, url: undefined })),
    ...eventPois,
  ], [eventPois])

  const filteredPois = useMemo(
    () => allPois.filter(p => activeCategories.has(p.category)),
    [allPois, activeCategories]
  )

  const positions = cities.map(c => [c.lat, c.lng] as [number, number])

  return (
    <div className="space-y-3">
      {/* Filtres */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(categoryConfig).map(([key, cfg]) => {
          const active = activeCategories.has(key)
          return (
            <button
              key={key}
              onClick={() => toggleCategory(key)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{
                backgroundColor: active ? cfg.color : '#e5e7eb',
                color: active ? '#fff' : '#6b7280',
                opacity: active ? 1 : 0.6,
              }}
            >
              <span>{cfg.emoji}</span>
              <span>{cfg.label}</span>
            </button>
          )
        })}
      </div>

      {/* Carte */}
      <MapContainer
        center={[-26, 152]}
        zoom={6}
        style={{ height: '550px', width: '100%' }}
        className="rounded-xl z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap"
        />

        {/* Villes */}
        {cities.map(city => (
          <Marker key={city.id} position={[city.lat, city.lng]} icon={cityIcon}>
            <Popup>
              <strong>{city.name}</strong><br />
              <span style={{ fontSize: '12px', color: '#64748b' }}>{city.description}</span><br />
              <span style={{ fontSize: '11px', color: '#0ea5e9' }}>{city.activities.length} activites</span>
            </Popup>
          </Marker>
        ))}

        {/* POIs filtres */}
        {filteredPois.map((poi, i) => {
          const cfg = categoryConfig[poi.category]
          return (
            <Marker key={`poi-${i}`} position={[poi.lat, poi.lng]} icon={makeIcon(cfg.emoji)}>
              <Popup>
                <strong>{poi.name}</strong><br />
                <span style={{ fontSize: '12px', color: '#64748b' }}>{poi.description}</span>
                {poi.url && (
                  <>
                    <br />
                    <a href={poi.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: '#0ea5e9' }}>
                      Site officiel
                    </a>
                  </>
                )}
              </Popup>
            </Marker>
          )
        })}

        <Polyline positions={positions} color="#0ea5e9" weight={3} dashArray="10,10" />
      </MapContainer>
    </div>
  )
}
