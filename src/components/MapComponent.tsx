'use client'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { cities } from '@/data/tripData'

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: string })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function MapComponent() {
  const positions = cities.map(c => [c.lat, c.lng] as [number, number])

  return (
    <MapContainer center={[-24, 151]} zoom={5} style={{ height: '500px', width: '100%' }} className="rounded-xl z-0">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
      {cities.map(city => (
        <Marker key={city.id} position={[city.lat, city.lng]}>
          <Popup>
            <strong>{city.name}</strong><br />
            <span style={{ fontSize: '12px', color: '#64748b' }}>{city.description}</span><br />
            <span style={{ fontSize: '11px', color: '#0ea5e9' }}>{city.activities.length} activites</span>
          </Popup>
        </Marker>
      ))}
      <Polyline positions={positions} color="#0ea5e9" weight={3} dashArray="10,10" />
    </MapContainer>
  )
}
