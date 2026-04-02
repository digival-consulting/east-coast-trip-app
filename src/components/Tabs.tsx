'use client'
import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { cities, itinerary, flights, vehicles, events, type City, type Activity } from '@/data/tripData'

const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false, loading: () => <div className="h-[500px] bg-slate-100 rounded-xl flex items-center justify-center">Chargement de la carte...</div> })

const typeBadge: Record<string, { label: string; color: string }> = {
  free: { label: 'Gratuit', color: 'bg-green-100 text-green-700' },
  surf: { label: 'Surf', color: 'bg-blue-100 text-blue-700' },
  hike: { label: 'Rando', color: 'bg-amber-100 text-amber-700' },
  food: { label: 'Food', color: 'bg-orange-100 text-orange-700' },
  drive: { label: 'Route', color: 'bg-slate-100 text-slate-700' },
  flight: { label: 'Vol', color: 'bg-purple-100 text-purple-700' },
  activity: { label: 'Activite', color: 'bg-pink-100 text-pink-700' },
  culture: { label: 'Culture', color: 'bg-indigo-100 text-indigo-700' },
  water: { label: 'Aqua', color: 'bg-cyan-100 text-cyan-700' },
}

function Badge({ type }: { type: string }) {
  const b = typeBadge[type] || { label: type, color: 'bg-slate-100 text-slate-600' }
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${b.color}`}>{b.label}</span>
}

function Price({ amount }: { amount: number }) {
  return amount === 0 ? <span className="text-green-600 font-medium">Gratuit</span> : <span>${amount}</span>
}

// ==================== ITINERAIRE ====================
export function ItineraireTab() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-800">Itineraire jour par jour</h2>
      <div className="flex items-center gap-3 text-sm">
        <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-sky-500" /> Partie 1 — Van Road Trip</span>
        <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-orange-500" /> Partie 2 — Whitsundays</span>
      </div>
      {itinerary.map((day, i) => {
        const city = cities.find(c => c.id === day.cityId)
        const isWhitsundays = city?.region === 'whitsundays'
        return (
          <div key={day.day}>
            {day.day === 8 && (
              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-orange-300" />
                <span className="text-orange-600 font-bold text-sm">PARTIE 2 — Whitsundays & Grande Barriere de Corail</span>
                <div className="flex-1 h-px bg-orange-300" />
              </div>
            )}
            <div className={`rounded-xl border overflow-hidden ${isWhitsundays ? 'border-orange-200' : 'border-sky-200'}`}>
              <div className="flex flex-col md:flex-row">
                {city && <img src={city.image} alt={city.name} className="w-full md:w-48 h-36 md:h-auto object-cover" />}
                <div className="p-4 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${isWhitsundays ? 'bg-orange-500 text-white' : 'bg-sky-500 text-white'}`}>J{day.day}</span>
                    <span className="text-sm text-slate-500">{day.date} 2026</span>
                    {day.driveKm > 0 && <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{day.driveKm} km</span>}
                  </div>
                  <h3 className="font-bold text-lg">{day.title}</h3>
                  <ul className="mt-2 space-y-1">
                    {day.highlights.map((h, j) => <li key={j} className="text-sm text-slate-600 flex items-start gap-1.5"><span className="mt-1 text-sky-400">&#9679;</span>{h}</li>)}
                  </ul>
                  {day.overnight !== '—' && <p className="mt-2 text-xs text-slate-400">Nuit : {day.overnight}</p>}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ==================== VILLES ====================
export function VillesTab() {
  const [open, setOpen] = useState<string | null>(null)
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Explorer par ville</h2>
      <p className="text-slate-500 text-sm">Cliquez sur une ville pour voir toutes les activites avec 3 fourchettes de prix.</p>
      {cities.map(city => (
        <div key={city.id} className="border rounded-xl overflow-hidden">
          <button onClick={() => setOpen(open === city.id ? null : city.id)} className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors text-left">
            <img src={city.image} alt={city.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
            <div className="flex-1">
              <h3 className="font-bold">{city.name}</h3>
              <p className="text-sm text-slate-500">{city.description}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${city.region === 'whitsundays' ? 'bg-orange-100 text-orange-700' : 'bg-sky-100 text-sky-700'}`}>
              {city.region === 'whitsundays' ? 'Whitsundays' : 'Byron Region'}
            </span>
            <svg className={`w-5 h-5 text-slate-400 transition-transform ${open === city.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {open === city.id && (
            <div className="border-t overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-3 font-medium">Activite</th>
                    <th className="text-left p-3 font-medium">Description</th>
                    <th className="text-center p-3 font-medium text-green-600">Budget</th>
                    <th className="text-center p-3 font-medium text-sky-600">Moyen</th>
                    <th className="text-center p-3 font-medium text-purple-600">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  {city.activities.map((a, i) => (
                    <tr key={i} className="border-t hover:bg-slate-50/50">
                      <td className="p-3 font-medium whitespace-nowrap"><Badge type={a.type} /> <span className="ml-1">{a.name}</span></td>
                      <td className="p-3 text-slate-500 text-xs max-w-xs">{a.description}</td>
                      <td className="p-3 text-center"><Price amount={a.priceLow} /></td>
                      <td className="p-3 text-center"><Price amount={a.priceMid} /></td>
                      <td className="p-3 text-center"><Price amount={a.priceHigh} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ==================== BUDGET ====================
export function BudgetTab() {
  const [foodStyle, setFoodStyle] = useState(1) // 0=budget, 1=mix, 2=resto
  const [accomStyle, setAccomStyle] = useState(1)
  const [vanCamping, setVanCamping] = useState(1)
  const [checkedActivities, setCheckedActivities] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {}
    cities.forEach(c => c.activities.forEach(a => { if (a.priceMid > 0) init[`${c.id}-${a.name}`] = a.included }))
    return init
  })

  const toggle = (key: string) => setCheckedActivities(prev => ({ ...prev, [key]: !prev[key] }))

  const foodPerDay = [25, 60, 100]
  const accomPerNight = [40, 90, 160]
  const vanCampPerNight = [0, 30, 50]

  const paidActivities = useMemo(() => {
    const list: { key: string; name: string; city: string; low: number; mid: number; high: number }[] = []
    cities.forEach(c => c.activities.forEach(a => {
      if (a.priceMid > 0) list.push({ key: `${c.id}-${a.name}`, name: a.name, city: c.name, low: a.priceLow * 2, mid: a.priceMid * 2, high: a.priceHigh * 2 })
    }))
    return list
  }, [])

  const actTotal = useMemo(() => {
    let low = 0, mid = 0, high = 0
    paidActivities.forEach(a => {
      if (checkedActivities[a.key]) { low += a.low; mid += a.mid; high += a.high }
    })
    return { low, mid, high }
  }, [checkedActivities, paidActivities])

  const vanLow = 400, vanHigh = 700
  const fuelLow = 100, fuelHigh = 200
  const flightsLow = 260, flightsHigh = 800
  const shuttles = 88

  const foodTotal = foodPerDay[foodStyle] * 11
  const accomTotal = accomPerNight[accomStyle] * 3
  const vanCampTotal = vanCampPerNight[vanCamping] * 7

  const fixedLow = vanLow + fuelLow + flightsLow + shuttles
  const fixedHigh = vanHigh + fuelHigh + flightsHigh + shuttles
  const totalLow = fixedLow + foodTotal + accomTotal + vanCampTotal + actTotal.low
  const totalMid = (vanLow + vanHigh) / 2 + (fuelLow + fuelHigh) / 2 + (flightsLow + flightsHigh) / 2 + shuttles + foodTotal + accomTotal + vanCampTotal + actTotal.mid
  const totalHigh = fixedHigh + foodTotal + accomTotal + vanCampTotal + actTotal.high

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Calculateur de budget</h2>
      <p className="text-slate-500 text-sm">Tous les prix sont pour 2 personnes. Cochez/decochez les activites pour ajuster le total.</p>

      {/* Fixed costs */}
      <div className="bg-white border rounded-xl p-4 space-y-2">
        <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider">Couts fixes (inclus)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="bg-slate-50 p-3 rounded-lg"><div className="text-slate-500">Van 7 jours</div><div className="font-bold">${vanLow}-${vanHigh}</div></div>
          <div className="bg-slate-50 p-3 rounded-lg"><div className="text-slate-500">Essence</div><div className="font-bold">${fuelLow}-${fuelHigh}</div></div>
          <div className="bg-slate-50 p-3 rounded-lg"><div className="text-slate-500">Vols A/R x2</div><div className="font-bold">${flightsLow}-${flightsHigh}</div></div>
          <div className="bg-slate-50 p-3 rounded-lg"><div className="text-slate-500">Navettes</div><div className="font-bold">${shuttles}</div></div>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-xl p-4">
          <h3 className="font-bold text-sm mb-3">Nourriture (11 jours, 2 pers)</h3>
          {['Budget — $25/j', 'Mix — $60/j', 'Restaurant — $100/j'].map((label, i) => (
            <label key={i} className="flex items-center gap-2 py-1 text-sm cursor-pointer">
              <input type="radio" name="food" checked={foodStyle === i} onChange={() => setFoodStyle(i)} className="accent-sky-500" />
              {label} <span className="text-slate-400 ml-auto">${foodPerDay[i] * 11}</span>
            </label>
          ))}
        </div>
        <div className="bg-white border rounded-xl p-4">
          <h3 className="font-bold text-sm mb-3">Hebergement Whitsundays (3 nuits)</h3>
          {['Camping — $40/n', 'Hostel — $90/n', 'Hotel — $160/n'].map((label, i) => (
            <label key={i} className="flex items-center gap-2 py-1 text-sm cursor-pointer">
              <input type="radio" name="accom" checked={accomStyle === i} onChange={() => setAccomStyle(i)} className="accent-sky-500" />
              {label} <span className="text-slate-400 ml-auto">${accomPerNight[i] * 3}</span>
            </label>
          ))}
        </div>
        <div className="bg-white border rounded-xl p-4">
          <h3 className="font-bold text-sm mb-3">Camping van (7 nuits)</h3>
          {['Spots gratuits — $0', 'Basique — $30/n', 'Confort — $50/n'].map((label, i) => (
            <label key={i} className="flex items-center gap-2 py-1 text-sm cursor-pointer">
              <input type="radio" name="vancamp" checked={vanCamping === i} onChange={() => setVanCamping(i)} className="accent-sky-500" />
              {label} <span className="text-slate-400 ml-auto">${vanCampPerNight[i] * 7}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div className="bg-white border rounded-xl p-4">
        <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-3">Activites (prix pour 2 personnes)</h3>
        <div className="space-y-1">
          {paidActivities.map(a => (
            <label key={a.key} className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-slate-50 cursor-pointer text-sm">
              <input type="checkbox" checked={!!checkedActivities[a.key]} onChange={() => toggle(a.key)} className="accent-sky-500" />
              <span className="flex-1">{a.name} <span className="text-slate-400">— {a.city}</span></span>
              <span className="text-slate-500 tabular-nums">${a.mid}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl p-6">
        <h3 className="font-bold text-lg mb-4">Total estime (2 personnes)</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div><div className="text-sm opacity-75">Bas</div><div className="text-2xl font-bold">${totalLow.toLocaleString()}</div><div className="text-sm opacity-75">${Math.round(totalLow / 2)}/pers</div></div>
          <div className="border-x border-white/20"><div className="text-sm opacity-75">Moyen</div><div className="text-2xl font-bold">${Math.round(totalMid).toLocaleString()}</div><div className="text-sm opacity-75">${Math.round(totalMid / 2)}/pers</div></div>
          <div><div className="text-sm opacity-75">Haut</div><div className="text-2xl font-bold">${totalHigh.toLocaleString()}</div><div className="text-sm opacity-75">${Math.round(totalHigh / 2)}/pers</div></div>
        </div>
      </div>
    </div>
  )
}

// ==================== VOLS ====================
export function VolsTab() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Comparatif vols</h2>
      <p className="text-slate-500 text-sm">Prix pour 1 personne, aller simple. Multiplier x4 pour A/R 2 personnes.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border rounded-xl overflow-hidden">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-3">Compagnie</th>
              <th className="text-left p-3">De</th>
              <th className="text-left p-3">Vers</th>
              <th className="text-center p-3">Prix</th>
              <th className="text-center p-3">Duree</th>
              <th className="text-center p-3">Frequence</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((f, i) => (
              <tr key={i} className="border-t hover:bg-slate-50/50">
                <td className="p-3 font-medium">{f.airline}</td>
                <td className="p-3 text-slate-600">{f.from}</td>
                <td className="p-3 text-slate-600">{f.to}</td>
                <td className="p-3 text-center font-medium text-sky-600">${f.priceLow}-${f.priceHigh}</td>
                <td className="p-3 text-center">{f.duration}</td>
                <td className="p-3 text-center text-slate-500">{f.frequency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm">
        <strong>Conseil :</strong> Jetstar vers Proserpine (PPP) offre le meilleur rapport qualite-prix. Reserver tot pour les meilleurs tarifs.
      </div>
    </div>
  )
}

// ==================== VEHICULES ====================
export function VehiculesTab() {
  const vans = vehicles.filter(v => v.type === 'van')
  const cars = vehicles.filter(v => v.type === 'car')

  const VehicleCard = ({ v }: { v: typeof vehicles[0] }) => (
    <div className="border rounded-xl p-4 bg-white hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-lg">{v.company}</h3>
        <div className="text-amber-400">{'★'.repeat(v.rating)}{'☆'.repeat(5 - v.rating)}</div>
      </div>
      <div className="text-2xl font-bold text-sky-600">${v.pricePerDay[0]}-${v.pricePerDay[1]}<span className="text-sm font-normal text-slate-400">/jour</span></div>
      <div className="text-sm text-slate-500 mb-3">7 jours : ${v.total7Days[0]}-${v.total7Days[1]}</div>
      <div className="space-y-1 mb-3">
        {v.includes.map((inc, i) => <div key={i} className="text-sm text-slate-600 flex items-center gap-1"><span className="text-green-500">&#10003;</span> {inc}</div>)}
      </div>
      <div className="text-xs text-slate-400">Pickup : {v.pickup.join(', ')}</div>
    </div>
  )

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Location de vehicules</h2>
      <div>
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2"><span>🚐</span> Campervans</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vans.map(v => <VehicleCard key={v.company} v={v} />)}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-3 flex items-center gap-2"><span>🚗</span> Voitures de location</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.map(v => <VehicleCard key={v.company} v={v} />)}
        </div>
      </div>
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-sm">
        <strong>Recommandation :</strong> Jucy ou Spaceships pour le meilleur rapport qualite-prix en van. Pickup a Brisbane Airport pour plus de choix.
      </div>
    </div>
  )
}

// ==================== EVENEMENTS ====================
export function EvenementsTab() {
  const eventBadge: Record<string, string> = {
    market: 'bg-green-100 text-green-700',
    festival: 'bg-purple-100 text-purple-700',
    sport: 'bg-blue-100 text-blue-700',
    nature: 'bg-amber-100 text-amber-700',
    food: 'bg-orange-100 text-orange-700',
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Evenements — 30 avril au 15 mai 2026</h2>
      <p className="text-slate-500 text-sm">Marches, festivals et evenements sur le trajet.</p>
      <div className="space-y-3">
        {events.map((e, i) => (
          <div key={i} className="border rounded-xl p-4 bg-white flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${eventBadge[e.type] || 'bg-slate-100 text-slate-600'}`}>{e.type}</span>
                <span className="text-sm font-bold">{e.name}</span>
              </div>
              <p className="text-sm text-slate-500">{e.description}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-sm font-medium">{e.date}</div>
              <div className="text-xs text-slate-400">{e.city}</div>
              <div className="text-xs font-medium text-sky-600 mt-1">{e.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ==================== CARTE ====================
export function CarteTab() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Carte interactive</h2>
      <p className="text-slate-500 text-sm">Toutes les etapes du voyage avec points d'interet.</p>
      <MapComponent />
    </div>
  )
}

// ==================== RESUME ====================
export function ResumeTab() {
  const highlights = [
    'Surf a Byron Bay — le spot mythique de The Pass',
    'Kayak avec les dauphins au lever du soleil',
    'Nimbin — le village hippie le plus colore d\'Australie',
    'Crystal Castle — cristaux geants dans un jardin zen',
    'Whitehaven Beach — la plus belle plage du monde',
    'Snorkeling sur la Grande Barriere de Corail',
    'Vol panoramique au-dessus de Heart Reef',
  ]

  const packing = [
    'Passeport + visa eTA', 'Maillot de bain x2', 'Creme solaire SPF50+', 'Chapeau / casquette',
    'Lunettes de soleil', 'Serviette microfibre', 'Tongs + baskets rando', 'Combinaison neoprene courte',
    'Veste legere (soirs frais)', 'Batterie externe', 'Adaptateur prise AU', 'Gopro / camera etanche',
    'Medicaments de base', 'Anti-moustiques', 'Sac etanche', 'App WikiCamps Australia ($8)',
  ]

  const links = [
    { name: 'WikiCamps Australia', url: 'https://wikicamps.com.au' },
    { name: 'Jucy Campervans', url: 'https://jucy.com.au' },
    { name: 'Spaceships Rentals', url: 'https://spaceshipsrentals.com.au' },
    { name: 'Ocean Rafting', url: 'https://oceanrafting.com.au' },
    { name: 'Cape Byron Kayaks', url: 'https://capebayronkayaks.com' },
    { name: 'Jetstar', url: 'https://jetstar.com' },
    { name: 'Crystal Castle', url: 'https://crystalcastle.com.au' },
    { name: 'NSW National Parks', url: 'https://nationalparks.nsw.gov.au' },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Resume du voyage</h2>

      <div className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl p-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div><div className="text-3xl font-bold">11</div><div className="text-sm opacity-75">jours</div></div>
          <div><div className="text-3xl font-bold">10</div><div className="text-sm opacity-75">villes</div></div>
          <div><div className="text-3xl font-bold">~565</div><div className="text-sm opacity-75">km en van</div></div>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-4">
        <h3 className="font-bold mb-3">Points forts</h3>
        <div className="space-y-2">
          {highlights.map((h, i) => <div key={i} className="text-sm flex items-start gap-2"><span className="text-sky-500 mt-0.5">&#9733;</span>{h}</div>)}
        </div>
      </div>

      <div className="bg-white border rounded-xl p-4">
        <h3 className="font-bold mb-3">Checklist bagages</h3>
        <div className="grid grid-cols-2 gap-1">
          {packing.map((p, i) => <label key={i} className="text-sm flex items-center gap-2 py-0.5"><input type="checkbox" className="accent-sky-500" />{p}</label>)}
        </div>
      </div>

      <div className="bg-white border rounded-xl p-4">
        <h3 className="font-bold mb-3">Liens utiles</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {links.map((l, i) => <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" className="text-sm text-sky-600 hover:underline">{l.name} &#8599;</a>)}
        </div>
      </div>
    </div>
  )
}
