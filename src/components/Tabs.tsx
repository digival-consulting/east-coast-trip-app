'use client'
import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { cities, itinerary, flights, vehicles, events, segmentTargetDates, type Activity } from '@/data/tripData'

const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false, loading: () => <div className="h-[500px] bg-slate-100 rounded-xl flex items-center justify-center">Chargement de la carte...</div> })

const typeBadge: Record<string, { label: string; color: string }> = {
  free: { label: 'Gratuit', color: 'bg-green-100 text-green-700' },
  surf: { label: 'Surf', color: 'bg-blue-100 text-blue-700' },
  hike: { label: 'Rando', color: 'bg-amber-100 text-amber-700' },
  food: { label: 'Food', color: 'bg-orange-100 text-orange-700' },
  drive: { label: 'Route', color: 'bg-slate-100 text-slate-700' },
  flight: { label: 'Vol', color: 'bg-purple-100 text-purple-700' },
  activity: { label: 'Activité', color: 'bg-pink-100 text-pink-700' },
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

function WarningTooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false)
  return (
    <span className="relative inline-block">
      <button onClick={() => setShow(!show)} className="text-base hover:scale-110 transition-transform" title="Information">ℹ️</button>
      {show && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 shadow-lg">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-amber-200" />
        </div>
      )}
    </span>
  )
}

// ==================== ITINÉRAIRE ====================
export function ItineraireTab() {
  const [openDay, setOpenDay] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-800">Itinéraire jour par jour</h2>
      <div className="flex items-center gap-3 text-sm">
        <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-sky-500" /> Partie 1 — Van Road Trip</span>
        <span className="inline-flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-orange-500" /> Partie 2 — Whitsundays</span>
      </div>
      {itinerary.map((day) => {
        const city = cities.find(c => c.id === day.cityId)
        const isWhitsundays = city?.region === 'whitsundays'
        const isOpen = openDay === day.day

        return (
          <div key={day.day}>
            {day.day === 8 && (
              <div className="my-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-orange-300" />
                <span className="text-orange-600 font-bold text-sm">PARTIE 2 — Whitsundays & Grande Barrière de Corail</span>
                <div className="flex-1 h-px bg-orange-300" />
              </div>
            )}
            <div className={`rounded-xl border overflow-hidden transition-all ${isWhitsundays ? 'border-orange-200' : 'border-sky-200'}`}>
              {/* Header — cliquable */}
              <button onClick={() => setOpenDay(isOpen ? null : day.day)} className="w-full flex flex-col md:flex-row text-left hover:bg-slate-50/50 transition-colors">
                {city && (
                  <div className="relative w-full md:w-48 h-36 md:h-auto shrink-0">
                    <img src={city.image} alt={city.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-4 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${isWhitsundays ? 'bg-orange-500 text-white' : 'bg-sky-500 text-white'}`}>J{day.day}</span>
                    <span className="text-sm text-slate-500">{day.date} 2026</span>
                    {day.driveKm > 0 && <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{day.driveKm} km</span>}
                    <svg className={`w-4 h-4 text-slate-400 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                  <h3 className="font-bold text-lg">{day.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 italic">{day.caption}</p>
                </div>
              </button>

              {/* Contenu expand */}
              {isOpen && (
                <div className="border-t p-4 space-y-3 bg-white">
                  {day.highlights.map((h, j) => (
                    <div key={j} className="flex items-start gap-3 py-2 border-b border-slate-100 last:border-0">
                      {h.image && <img src={h.image} alt={h.name} className="w-16 h-12 rounded-lg object-cover shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-sky-600 font-mono font-medium">{h.time}</div>
                        {h.url ? (
                          <a href={h.url} target="_blank" rel="noopener noreferrer" className="font-medium text-sm hover:text-sky-600 hover:underline">{h.name} ↗</a>
                        ) : (
                          <div className="font-medium text-sm">{h.name}</div>
                        )}
                      </div>
                    </div>
                  ))}
                  {day.overnight !== '—' && (
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <span className="text-xs text-slate-400">Nuit : </span>
                      {day.overnightUrl ? (
                        <a href={day.overnightUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-sky-600 hover:underline">{day.overnight} — Réserver ↗</a>
                      ) : (
                        <span className="text-sm font-medium">{day.overnight}</span>
                      )}
                    </div>
                  )}
                </div>
              )}
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
      <p className="text-slate-500 text-sm">Cliquez sur une ville pour voir toutes les activités avec 3 fourchettes de prix et liens de réservation.</p>
      {cities.map(city => (
        <div key={city.id} className="border rounded-xl">
          <button onClick={() => setOpen(open === city.id ? null : city.id)} className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors text-left rounded-t-xl">
            <img src={city.image} alt={city.name} className="w-16 h-16 rounded-lg object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold">{city.name}</h3>
              <p className="text-sm text-slate-500 truncate">{city.description}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${city.region === 'whitsundays' ? 'bg-orange-100 text-orange-700' : 'bg-sky-100 text-sky-700'}`}>
              {city.region === 'whitsundays' ? 'Whitsundays' : 'Byron Region'}
            </span>
            <svg className={`w-5 h-5 text-slate-400 transition-transform shrink-0 ${open === city.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {open === city.id && (
            <div className="border-t overflow-visible">
              <table className="w-full text-sm overflow-visible">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left p-3 font-medium">Activité</th>
                    <th className="text-left p-3 font-medium max-w-xs">Description</th>
                    <th className="text-center p-3 font-medium text-green-600">Budget</th>
                    <th className="text-center p-3 font-medium text-sky-600">Moyen</th>
                    <th className="text-center p-3 font-medium text-purple-600">Premium</th>
                    <th className="text-center p-3 font-medium w-16">Lien</th>
                    <th className="text-center p-3 w-10"></th>
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
                      <td className="p-3 text-center">
                        {a.url && <a href={a.url} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-700 text-xs">Réserver ↗</a>}
                      </td>
                      <td className="p-3 text-center">
                        {a.warning && <WarningTooltip text={a.warning} />}
                      </td>
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
  const [foodStyle, setFoodStyle] = useState(1)
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

  const paidByCity = useMemo(() => {
    const byCityMap: Record<string, { cityName: string; items: { key: string; name: string; low: number; mid: number; high: number }[] }> = {}
    cities.forEach(c => {
      const items = c.activities.filter(a => a.priceMid > 0).map(a => ({
        key: `${c.id}-${a.name}`, name: a.name, low: a.priceLow * 2, mid: a.priceMid * 2, high: a.priceHigh * 2
      }))
      if (items.length > 0) byCityMap[c.id] = { cityName: c.name, items }
    })
    return byCityMap
  }, [])

  const actTotal = useMemo(() => {
    let low = 0, mid = 0, high = 0
    Object.values(paidByCity).forEach(city => city.items.forEach(a => {
      if (checkedActivities[a.key]) { low += a.low; mid += a.mid; high += a.high }
    }))
    return { low, mid, high }
  }, [checkedActivities, paidByCity])

  const vanLow = 400, vanHigh = 700
  const fuelLow = 120, fuelHigh = 230
  const flightsLow = 420, flightsHigh = 1200
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
      <p className="text-slate-500 text-sm">Tous les prix sont pour 2 personnes. Cochez/décochez les activités pour ajuster le total.</p>

      <div className="bg-white border rounded-xl p-4 space-y-2">
        <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider">Coûts fixes (inclus)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="bg-slate-50 p-3 rounded-lg"><div className="text-slate-500">Van 7 jours</div><div className="font-bold">${vanLow}-${vanHigh}</div></div>
          <div className="bg-slate-50 p-3 rounded-lg"><div className="text-slate-500">Essence</div><div className="font-bold">${fuelLow}-${fuelHigh}</div><div className="text-xs text-amber-600 mt-1">~$2.10-2.30/L (hausse Iran)</div></div>
          <div className="bg-slate-50 p-3 rounded-lg"><div className="text-slate-500">3 vols (SYD↔GC↔PPP)</div><div className="font-bold">${flightsLow}-${flightsHigh}</div></div>
          <div className="bg-slate-50 p-3 rounded-lg"><div className="text-slate-500">Navettes aéroport</div><div className="font-bold">${shuttles}</div></div>
        </div>
        <p className="text-xs text-amber-600 mt-2">⚠ Prix essence indexé sur les tarifs australiens actuels (~$2.10-2.30/L, hausse liée au conflit Iran)</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-xl p-4">
          <h3 className="font-bold text-sm mb-3">🍽 Nourriture (11 jours, 2 pers)</h3>
          {['Budget — $25/j', 'Mix — $60/j', 'Restaurant — $100/j'].map((label, i) => (
            <label key={i} className="flex items-center gap-2 py-1 text-sm cursor-pointer">
              <input type="radio" name="food" checked={foodStyle === i} onChange={() => setFoodStyle(i)} className="accent-sky-500" />
              {label} <span className="text-slate-400 ml-auto">${foodPerDay[i] * 11}</span>
            </label>
          ))}
        </div>
        <div className="bg-white border rounded-xl p-4">
          <h3 className="font-bold text-sm mb-3">🏨 Hébergement Whitsundays (3 nuits)</h3>
          {['Camping — $40/n', 'Hostel — $90/n', 'Hôtel — $160/n'].map((label, i) => (
            <label key={i} className="flex items-center gap-2 py-1 text-sm cursor-pointer">
              <input type="radio" name="accom" checked={accomStyle === i} onChange={() => setAccomStyle(i)} className="accent-sky-500" />
              {label} <span className="text-slate-400 ml-auto">${accomPerNight[i] * 3}</span>
            </label>
          ))}
        </div>
        <div className="bg-white border rounded-xl p-4">
          <h3 className="font-bold text-sm mb-3">🚐 Camping van (7 nuits)</h3>
          {['Spots gratuits — $0', 'Basique — $30/n', 'Confort — $50/n'].map((label, i) => (
            <label key={i} className="flex items-center gap-2 py-1 text-sm cursor-pointer">
              <input type="radio" name="vancamp" checked={vanCamping === i} onChange={() => setVanCamping(i)} className="accent-sky-500" />
              {label} <span className="text-slate-400 ml-auto">${vanCampPerNight[i] * 7}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white border rounded-xl p-4">
        <h3 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-3">Activités par localité (prix pour 2 personnes)</h3>
        {Object.entries(paidByCity).map(([cityId, city]) => (
          <div key={cityId} className="mb-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 mt-3 border-b border-slate-100 pb-1">{city.cityName}</h4>
            {city.items.map(a => (
              <label key={a.key} className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-slate-50 cursor-pointer text-sm">
                <input type="checkbox" checked={!!checkedActivities[a.key]} onChange={() => toggle(a.key)} className="accent-sky-500" />
                <span className="flex-1">{a.name}</span>
                <span className="text-slate-500 tabular-nums">${a.mid}</span>
              </label>
            ))}
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl p-6">
        <h3 className="font-bold text-lg mb-4">Total estimé (2 personnes)</h3>
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
  const segments = ['syd-gc', 'gc-ppp', 'ppp-syd'] as const
  const segmentLabels: Record<string, string> = { 'syd-gc': 'Sydney → Gold Coast (1 mai)', 'gc-ppp': 'Gold Coast → Proserpine (8 mai)', 'ppp-syd': 'Proserpine → Sydney (11 mai)' }
  const [segment, setSegment] = useState<string>('syd-gc')
  const [selectedDate, setSelectedDate] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'price' | 'time' | 'airline'>('time')

  const segFlights = useMemo(() => flights.filter(f => f.segment === segment), [segment])
  const dates = useMemo(() => [...new Set(segFlights.map(f => f.date))], [segFlights])
  const targetDate = segmentTargetDates[segment]

  const filtered = useMemo(() => {
    const base = selectedDate === 'all' ? segFlights : segFlights.filter(f => f.date === selectedDate)
    return base.sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price
      if (sortBy === 'airline') return a.airline.localeCompare(b.airline) || a.departure.localeCompare(b.departure)
      return a.date.localeCompare(b.date) || a.departure.localeCompare(b.departure)
    })
  }, [segFlights, selectedDate, sortBy])

  const minPrice = useMemo(() => Math.min(...segFlights.map(f => f.price)), [segFlights])
  const maxPrice = useMemo(() => Math.max(...segFlights.map(f => f.price)), [segFlights])

  function priceColor(price: number) {
    const ratio = (price - minPrice) / (maxPrice - minPrice || 1)
    if (ratio < 0.33) return 'text-green-600 font-bold'
    if (ratio < 0.66) return 'text-sky-600 font-medium'
    return 'text-red-500 font-medium'
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-2xl font-bold">Comparatif vols</h2>
        <span className="text-xs bg-slate-100 text-slate-500 px-3 py-1 rounded-full">Prix par personne, aller simple</span>
      </div>
      <p className="text-slate-500 text-sm">Plage de dates : 3 jours avant et après la date cible. Prix indicatifs simulés.</p>

      {/* Segment tabs */}
      <div className="flex flex-wrap gap-2">
        {segments.map(s => (
          <button key={s} onClick={() => { setSegment(s); setSelectedDate('all') }} className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${segment === s ? 'bg-sky-500 text-white border-sky-500' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}>{segmentLabels[s]}</button>
        ))}
      </div>

      {/* Date pills */}
      <div className="flex flex-wrap gap-1.5">
        <button onClick={() => setSelectedDate('all')} className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${selectedDate === 'all' ? 'bg-slate-700 text-white border-slate-700' : 'border-slate-200 text-slate-500'}`}>Toutes</button>
        {dates.map(d => {
          const isTarget = d === targetDate
          return (
            <button key={d} onClick={() => setSelectedDate(d)} className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${selectedDate === d ? 'bg-sky-500 text-white border-sky-500' : isTarget ? 'border-sky-300 text-sky-600 bg-sky-50 font-medium' : 'border-slate-200 text-slate-500'}`}>
              {d}{isTarget ? ' *' : ''}
            </button>
          )
        })}
      </div>

      {/* Sort */}
      <div className="flex gap-2 text-xs">
        <span className="text-slate-400">Trier par :</span>
        {(['time', 'price', 'airline'] as const).map(s => (
          <button key={s} onClick={() => setSortBy(s)} className={`px-2 py-0.5 rounded ${sortBy === s ? 'bg-sky-100 text-sky-700 font-medium' : 'text-slate-500 hover:text-slate-700'}`}>
            {s === 'price' ? 'Prix' : s === 'airline' ? 'Compagnie' : 'Horaire'}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border rounded-xl overflow-hidden">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-3">Date</th>
              <th className="text-center p-3">Départ</th>
              <th className="text-left p-3">Compagnie</th>
              <th className="text-left p-3">Trajet</th>
              <th className="text-center p-3">Prix</th>
              <th className="text-center p-3">Durée</th>
              <th className="text-center p-3">Bagage</th>
              <th className="text-center p-3">Réserver</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((f, i) => {
              const isTarget = f.date === targetDate
              return (
                <tr key={i} className={`border-t hover:bg-slate-50/50 ${isTarget ? 'bg-sky-50/50' : ''}`}>
                  <td className={`p-3 text-xs ${isTarget ? 'font-bold text-sky-700' : 'text-slate-500'}`}>{f.date}{isTarget ? ' *' : ''}</td>
                  <td className="p-3 text-center font-mono text-sm">{f.departure}</td>
                  <td className="p-3 font-medium">{f.airline}</td>
                  <td className="p-3 text-slate-600 text-xs">{f.from} → {f.to}</td>
                  <td className={`p-3 text-center ${priceColor(f.price)}`}>${f.price}</td>
                  <td className="p-3 text-center text-xs">{f.duration}</td>
                  <td className="p-3 text-center">{f.baggageIncluded ? <span className="text-green-500 text-xs">Inclus</span> : <span className="text-red-400 text-xs">Payant</span>}</td>
                  <td className="p-3 text-center"><a href={f.bookingUrl} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-700 text-xs font-medium">Réserver ↗</a></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-slate-400 space-y-1">
        <p>* = date cible de l'itinéraire. Vert = bon prix, rouge = prix élevé.</p>
        <p>Les horaires tôt le matin et tard le soir sont généralement moins chers.</p>
      </div>
    </div>
  )
}

// ==================== VÉHICULES ====================
export function VehiculesTab() {
  const vans = vehicles.filter(v => v.type === 'van')
  const cars = vehicles.filter(v => v.type === 'car')

  const VehicleCard = ({ v }: { v: typeof vehicles[0] }) => {
    const [imgIdx, setImgIdx] = useState(0)
    return (
      <div className="border rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow">
        {v.images.length > 0 && (
          <div className="relative h-40 bg-slate-100">
            <img src={v.images[imgIdx] || ''} alt={v.company} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            {v.images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {v.images.map((_, i) => (
                  <button key={i} onClick={() => setImgIdx(i)} className={`w-2 h-2 rounded-full transition-colors ${i === imgIdx ? 'bg-white' : 'bg-white/50'}`} />
                ))}
              </div>
            )}
          </div>
        )}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg">{v.company}</h3>
            <div className="text-amber-400 text-sm">{'★'.repeat(v.rating)}{'☆'.repeat(5 - v.rating)}</div>
          </div>
          <div className="text-2xl font-bold text-sky-600">${v.pricePerDay[0]}-${v.pricePerDay[1]}<span className="text-sm font-normal text-slate-400">/jour</span></div>
          <div className="text-sm text-slate-500 mb-3">7 jours : ${v.total7Days[0]}-${v.total7Days[1]}</div>
          <div className="space-y-1 mb-3">
            {v.includes.map((inc, i) => <div key={i} className="text-sm text-slate-600 flex items-center gap-1"><span className="text-green-500">✓</span> {inc}</div>)}
          </div>
          <div className="text-xs text-slate-400 mb-3">Pickup : {v.pickup.join(', ')}</div>
          <a href={v.bookingUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-sky-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-sky-600 transition-colors">Réserver ↗</a>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Location de véhicules</h2>
      <div>
        <h3 className="text-lg font-bold mb-3">🚐 Campervans</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vans.map(v => <VehicleCard key={v.company} v={v} />)}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-3">🚗 Voitures de location</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.map(v => <VehicleCard key={v.company} v={v} />)}
        </div>
      </div>
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 text-sm">
        <strong>Recommandation :</strong> Jucy ou Spaceships pour le meilleur rapport qualité-prix en van. Pickup à Gold Coast Airport pour récupérer directement après le vol depuis Sydney.
      </div>
    </div>
  )
}

// ==================== ÉVÉNEMENTS ====================
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
      <h2 className="text-2xl font-bold">Événements — 30 avril au 15 mai 2026</h2>
      <p className="text-slate-500 text-sm">Marchés, festivals et événements sur le trajet.</p>
      <div className="space-y-3">
        {events.map((e, i) => (
          <div key={i} className="border rounded-xl overflow-hidden bg-white">
            <div className="flex flex-col md:flex-row">
              {e.image && (
                <div className="w-full md:w-40 h-32 md:h-auto shrink-0">
                  <img src={e.image} alt={e.name} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 p-4">
                <div className="flex flex-col md:flex-row md:items-start gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${eventBadge[e.type] || 'bg-slate-100 text-slate-600'}`}>{e.type}</span>
                      {e.mustSee && <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">A ne pas louper</span>}
                      <span className="text-sm font-bold">{e.name}</span>
                    </div>
                    <p className="text-sm text-slate-500">{e.description}</p>
                    <div className="mt-2 space-y-0.5 text-xs text-slate-400">
                      <div>Lieu : <strong className="text-slate-600">{e.location}</strong></div>
                      <div>Horaires : {e.hours}</div>
                      <div>Prix : {e.price}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0 space-y-1">
                    <div className="text-sm font-medium">{e.date}</div>
                    <div className="text-xs text-slate-400">{e.city}</div>
                    <a href={e.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-1 text-xs text-sky-500 hover:text-sky-700 font-medium">Site officiel ↗</a>
                  </div>
                </div>
              </div>
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
      <p className="text-slate-500 text-sm">Toutes les étapes du voyage avec points d'intérêt. Utilisez les filtres pour afficher/masquer les catégories.</p>
      <MapComponent />
    </div>
  )
}

// ==================== RÉSUMÉ ====================
export function ResumeTab() {
  const highlights = [
    'Vol Sydney → Gold Coast pour démarrer l\'aventure',
    'Surf à Byron Bay — le spot mythique de The Pass',
    'Kayak avec les dauphins au lever du soleil',
    'Nimbin — le village hippie le plus coloré d\'Australie',
    'Crystal Castle — cristaux géants dans un jardin zen',
    'Whitehaven Beach — la plus belle plage du monde',
    'Snorkeling sur la Grande Barrière de Corail',
    'Vol panoramique au-dessus de Heart Reef',
  ]

  const packing = [
    'Passeport + visa eTA', 'Maillot de bain x2', 'Crème solaire SPF50+', 'Chapeau / casquette',
    'Lunettes de soleil', 'Serviette microfibre', 'Tongs + baskets rando', 'Combinaison néoprène courte',
    'Veste légère (soirs frais)', 'Batterie externe', 'Adaptateur prise AU', 'GoPro / caméra étanche',
    'Médicaments de base', 'Anti-moustiques', 'Sac étanche', 'App WikiCamps Australia ($8)',
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
      <h2 className="text-2xl font-bold">Résumé du voyage</h2>

      <div className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl p-6">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div><div className="text-3xl font-bold">11</div><div className="text-sm opacity-75">jours</div></div>
          <div><div className="text-3xl font-bold">10</div><div className="text-sm opacity-75">villes</div></div>
          <div><div className="text-3xl font-bold">3</div><div className="text-sm opacity-75">vols</div></div>
          <div><div className="text-3xl font-bold">~565</div><div className="text-sm opacity-75">km en van</div></div>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-4">
        <h3 className="font-bold mb-3">Points forts</h3>
        <div className="space-y-2">
          {highlights.map((h, i) => <div key={i} className="text-sm flex items-start gap-2"><span className="text-sky-500 mt-0.5">★</span>{h}</div>)}
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
          {links.map((l, i) => <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" className="text-sm text-sky-600 hover:underline">{l.name} ↗</a>)}
        </div>
      </div>
    </div>
  )
}
