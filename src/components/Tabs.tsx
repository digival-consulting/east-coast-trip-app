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

// ==================== CONFIRMÉ ====================
const confirmedPart1 = [
  { day: 'J0 — 30 avr', title: 'Vol Sydney → Gold Coast', camp: '—', campPrice: 0, activities: [
    { name: 'Vol Jetstar SYD→OOL 07h00', price: 49, status: 'confirme' as const },
    { name: 'Pickup campervan Gold Coast Airport', price: 0, status: 'confirme' as const },
    { name: 'Installation + courses supermarche', price: 60, status: 'estime' as const },
  ]},
  { day: 'J1 — 1 mai', title: 'Gold Coast / Burleigh Heads', camp: 'BIG4 Gold Coast Holiday Park', campPrice: 50, activities: [
    { name: 'Burleigh Heads National Park (rando)', price: 0, status: 'estime' as const },
    { name: 'Tallebudgera Creek (baignade)', price: 0, status: 'estime' as const },
    { name: 'Byron Farmers Market (matin tot)', price: 0, status: 'estime' as const },
    { name: 'Repas midi + soir', price: 60, status: 'estime' as const },
  ]},
  { day: 'J2 — 2 mai', title: 'Springbrook → Byron Bay', camp: 'Broken Head Holiday Park', campPrice: 50, activities: [
    { name: 'Natural Bridge (Springbrook NP)', price: 0, status: 'estime' as const },
    { name: 'Best of All Lookout', price: 0, status: 'estime' as const },
    { name: 'Sunset a The Pass, Byron Bay', price: 0, status: 'estime' as const },
    { name: 'Repas', price: 60, status: 'estime' as const },
  ]},
  { day: 'J3 — 3 mai', title: 'Byron Bay', camp: 'First Sun Holiday Park', campPrice: 60, activities: [
    { name: 'Cape Byron Lighthouse walk (sunrise)', price: 0, status: 'estime' as const },
    { name: 'Cours de surf 2h', price: 70, status: 'estime' as const },
    { name: 'Kayak avec dauphins', price: 75, status: 'estime' as const },
    { name: 'Repas', price: 60, status: 'estime' as const },
  ]},
  { day: 'J4 — 4 mai', title: 'Nimbin & Cascades', camp: 'First Sun Holiday Park', campPrice: 60, activities: [
    { name: 'Nimbin village (MardiGrass weekend)', price: 0, status: 'estime' as const },
    { name: 'Minyon Falls rando', price: 0, status: 'estime' as const },
    { name: 'Protesters Falls', price: 0, status: 'estime' as const },
    { name: 'Repas', price: 60, status: 'estime' as const },
  ]},
  { day: 'J5 — 5 mai', title: 'Crystal Castle & Plages', camp: 'Kingscliff Beach Holiday Park', campPrice: 50, activities: [
    { name: 'Crystal Castle & Shambhala Gardens', price: 35, status: 'estime' as const },
    { name: 'Cabarita Beach surf/detente', price: 0, status: 'estime' as const },
    { name: 'Fingal Head Lighthouse', price: 0, status: 'estime' as const },
    { name: 'Repas', price: 60, status: 'estime' as const },
  ]},
  { day: 'J6 — 6 mai', title: 'Lennox Head & Cote sud', camp: 'Lennox Head Reflections', campPrice: 50, activities: [
    { name: 'Pat Morton Lookout', price: 0, status: 'estime' as const },
    { name: 'Lake Ainsworth (tea-tree)', price: 0, status: 'estime' as const },
    { name: 'Lennox Head surf', price: 0, status: 'estime' as const },
    { name: 'Repas', price: 60, status: 'estime' as const },
  ]},
  { day: 'J7 — 7 mai', title: 'Retour Gold Coast → Brisbane', camp: '—', campPrice: 0, activities: [
    { name: 'Coolangatta / Snapper Rocks (matin)', price: 0, status: 'estime' as const },
    { name: 'Drive Gold Coast → Brisbane (1h)', price: 0, status: 'estime' as const },
    { name: 'Brisbane : South Bank, GOMA, Eat Street', price: 30, status: 'estime' as const },
    { name: 'Repas Brisbane', price: 70, status: 'estime' as const },
  ]},
]

const fraserSimulation = {
  title: 'Fraser Island (K\'gari) — Simulation tour guide',
  duration: '3 jours / 2 nuits',
  itinerary: [
    { day: 'J8 — 8 mai', desc: 'Bus Brisbane → Hervey Bay (Greyhound, ~4h). Check-in hostel Hervey Bay.' },
    { day: 'J9-10 — 9-10 mai', desc: 'Tour guide 4WD Fraser Island 2j/1n (Cool Dingo ou Dropbear). Lake McKenzie, Eli Creek, 75 Mile Beach, Maheno Shipwreck, Indian Head, Champagne Pools. Nuit en camp sur l\'ile.' },
    { day: 'J11 — 11 mai', desc: 'Retour ferry + bus Hervey Bay → Brisbane. Recuperer le van. Drive Brisbane → Gold Coast (1h). Rendu du van.' },
  ],
  costs: [
    { item: 'Bus Brisbane → Hervey Bay (aller)', price: 55 },
    { item: 'Hostel Hervey Bay (1 nuit)', price: 45 },
    { item: 'Tour Fraser Island 2j/1n (Cool Dingo)', price: 480 },
    { item: 'Bus Hervey Bay → Brisbane (retour)', price: 55 },
    { item: 'Repas J8 + J11 (hors tour)', price: 80 },
    { item: 'Essence Brisbane → GC (rendu van)', price: 25 },
    { item: 'Parking van Brisbane (~3 jours)', price: 45 },
  ],
  note: 'Le van reste gare a Brisbane (parking Wilson ou similaire ~$15/j). On fait Fraser en tour organise (4WD, camping, guide, repas inclus). Retour a Brisbane pour recuperer le van et le rendre a Gold Coast.',
}

const whitsundaysPadi = {
  title: 'Whitsundays + PADI Open Water',
  options: [
    {
      name: 'Option A : PADI integre (recommande)',
      duration: '5 jours sur place (J12-J16)',
      desc: 'Combiner Whitehaven Beach + PADI sur un liveaboard. Plusieurs operateurs proposent des 3-day/2-night sailing trips avec PADI Open Water inclus.',
      itinerary: [
        'J12 : Vol BNE→PPP, arrivee Airlie Beach, briefing PADI theorie',
        'J13-14 : Liveaboard voilier — Whitehaven Beach + Hill Inlet + 4 plongees PADI sur le recif',
        'J15 : Derniere plongee certification + journee libre Airlie Beach',
        'J16 : Vol panoramique Heart Reef (optionnel) + vol PPP→SYD',
      ],
      cost: [
        { item: 'Vol BNE→PPP (Jetstar)', price: 89 },
        { item: 'Liveaboard 3j/2n + PADI Open Water (Wings Diving)', price: 850 },
        { item: 'Hostel Airlie Beach (2 nuits : J12 + J15)', price: 130 },
        { item: 'Vol panoramique Heart Reef (optionnel)', price: 250 },
        { item: 'Vol PPP→SYD (Jetstar)', price: 99 },
        { item: 'Repas (5 jours, hors liveaboard)', price: 180 },
        { item: 'Navettes aeroport', price: 44 },
      ],
      extra: '+2 jours vs plan actuel (4 jours → 5 jours). Retour Sydney le 16 mai au lieu du 11.',
    },
    {
      name: 'Option B : PADI separe + Whitehaven day trip',
      duration: '5 jours sur place (J12-J16)',
      desc: 'Faire le PADI en pool/shore dives a Airlie Beach (3 jours), puis Whitehaven en day trip separe.',
      itinerary: [
        'J12 : Vol BNE→PPP, arrivee Airlie Beach',
        'J13-15 : PADI Open Water cours 3 jours (Pro Dive Whitsundays)',
        'J15 aprem : Ocean Rafting half-day Whitehaven',
        'J16 : Vol panoramique + vol retour PPP→SYD',
      ],
      cost: [
        { item: 'Vol BNE→PPP', price: 89 },
        { item: 'PADI Open Water 3 jours (Pro Dive)', price: 650 },
        { item: 'Ocean Rafting half-day Whitehaven', price: 155 },
        { item: 'Hostel Airlie Beach (4 nuits)', price: 260 },
        { item: 'Vol panoramique (optionnel)', price: 250 },
        { item: 'Vol PPP→SYD', price: 99 },
        { item: 'Repas (5 jours)', price: 300 },
        { item: 'Navettes', price: 44 },
      ],
      extra: '+2 jours vs plan actuel. Moins immersif mais PADI + Whitehaven garantis meme si meteo change.',
    },
    {
      name: 'Option C : Sans PADI (plan actuel)',
      duration: '4 jours (J12-J15)',
      desc: 'Garder le plan original — snorkeling (pas de plongee) + Whitehaven + Great Barrier Reef.',
      extra: 'Pas de jours supplementaires. Retour le 15 mai. PADI possible plus tard (Sydney, Cairns, ou a l\'etranger).',
    },
  ],
  padiInfo: 'Le PADI Open Water prend 3-4 jours : theorie (en ligne avant le voyage possible), plongees confinées (piscine), 4 plongees en eau libre. Age minimum 10 ans. Pas de contre-indication medicale. Certification valable a vie, reconnue mondialement.',
}

export function ConfirmeTab() {
  // Part 1 totals
  const vanPrice = 1200
  const flightPrice = 49 * 2 // 2 personnes
  const campTotal = confirmedPart1.reduce((s, d) => s + d.campPrice, 0)
  const actTotal = confirmedPart1.reduce((s, d) => s + d.activities.reduce((a, act) => a + act.price, 0), 0)
  const actTotalX2 = confirmedPart1.reduce((s, d) => s + d.activities.reduce((a, act) => a + (act.name.includes('Repas') || act.name.includes('courses') ? act.price : act.price * 2), 0), 0)
  const part1Total = vanPrice + flightPrice + campTotal + actTotalX2

  // Fraser totals
  const fraserTotal = fraserSimulation.costs.reduce((s, c) => s + c.price, 0)
  const fraserTotalX2 = fraserSimulation.costs.reduce((s, c) => s + (c.item.includes('Parking') || c.item.includes('Essence') || c.item.includes('Repas') ? c.price : c.price * 2), 0)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Plan confirme — Partie 1 : Byron Region</h2>
        <p className="text-slate-500 text-sm mt-1">Vol + Van + Camps + Activites au prix moyen, pour 2 personnes.</p>
      </div>

      {/* Vol confirme */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-2 py-1 rounded bg-green-500 text-white">CONFIRME</span>
          <span className="font-bold">Vol aller — 30 avril 2026</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div><span className="text-slate-400">Compagnie</span><div className="font-medium">Jetstar</div></div>
          <div><span className="text-slate-400">Trajet</span><div className="font-medium">SYD → OOL</div></div>
          <div><span className="text-slate-400">Depart</span><div className="font-medium">07h00</div></div>
          <div><span className="text-slate-400">Prix (x2)</span><div className="font-bold text-green-600">${flightPrice}</div></div>
        </div>
      </div>

      {/* Van confirme */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold px-2 py-1 rounded bg-green-500 text-white">CONFIRME</span>
          <span className="font-bold">Campervan — 7 jours</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div><span className="text-slate-400">Pickup</span><div className="font-medium">Gold Coast Airport</div></div>
          <div><span className="text-slate-400">Rendu</span><div className="font-medium">Gold Coast Airport</div></div>
          <div><span className="text-slate-400">Duree</span><div className="font-medium">30 avr → 7 mai</div></div>
          <div><span className="text-slate-400">Prix total</span><div className="font-bold text-green-600">${vanPrice}</div></div>
        </div>
      </div>

      {/* Itineraire jour par jour */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold">Itineraire jour par jour (prix moyen, x2 pers)</h3>
        {confirmedPart1.map((day, i) => {
          const dayActivities = day.activities.reduce((s, a) => s + (a.name.includes('Repas') || a.name.includes('courses') ? a.price : a.price * 2), 0)
          const dayTotal = day.campPrice + dayActivities
          return (
            <div key={i} className="border rounded-xl p-4 bg-white">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-xs font-bold px-2 py-1 rounded bg-sky-500 text-white mr-2">{day.day.split(' — ')[0]}</span>
                  <span className="font-bold">{day.title}</span>
                </div>
                <span className="font-bold text-sky-600">${dayTotal}</span>
              </div>
              {day.camp !== '—' && (
                <div className="text-sm text-slate-500 mb-2">Nuit : {day.camp} — <span className="font-medium text-slate-700">${day.campPrice}/nuit</span></div>
              )}
              <div className="space-y-1">
                {day.activities.map((a, j) => (
                  <div key={j} className="flex items-center justify-between text-sm py-0.5">
                    <div className="flex items-center gap-2">
                      {a.status === 'confirme' ? (
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                      )}
                      <span>{a.name}</span>
                    </div>
                    <span className={a.price === 0 ? 'text-green-600' : 'text-slate-600'}>{a.price === 0 ? 'Gratuit' : `$${a.name.includes('Repas') || a.name.includes('courses') ? a.price : a.price * 2}`}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Total Part 1 */}
      <div className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl p-6">
        <h3 className="font-bold text-lg mb-4">Total Partie 1 — Byron Region (2 personnes)</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
          <div className="text-center"><div className="opacity-75">Vol</div><div className="text-xl font-bold">${flightPrice}</div></div>
          <div className="text-center"><div className="opacity-75">Van 7j</div><div className="text-xl font-bold">${vanPrice}</div></div>
          <div className="text-center"><div className="opacity-75">Camps ({confirmedPart1.filter(d => d.campPrice > 0).length} nuits)</div><div className="text-xl font-bold">${campTotal}</div></div>
          <div className="text-center"><div className="opacity-75">Activites + repas</div><div className="text-xl font-bold">${actTotalX2}</div></div>
          <div className="text-center border-l border-white/30"><div className="opacity-75">TOTAL</div><div className="text-2xl font-bold">${part1Total}</div><div className="text-xs opacity-75">${Math.round(part1Total / 2)}/pers</div></div>
        </div>
      </div>

      {/* ==================== FRASER ISLAND ==================== */}
      <div className="border-t-2 border-amber-300 pt-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold px-2 py-1 rounded bg-amber-500 text-white">SIMULATION</span>
          <h2 className="text-2xl font-bold">{fraserSimulation.title}</h2>
        </div>
        <p className="text-slate-500 text-sm mb-4">{fraserSimulation.duration} — Tour guide 4WD, pas d'avion. Van gare a Brisbane pendant Fraser.</p>

        <div className="space-y-2 mb-4">
          {fraserSimulation.itinerary.map((step, i) => (
            <div key={i} className="border rounded-lg p-3 bg-amber-50/50">
              <span className="text-xs font-bold text-amber-700">{step.day}</span>
              <p className="text-sm mt-0.5">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white border rounded-xl p-4 mb-4">
          <h4 className="font-bold text-sm mb-2">Couts estimes (par personne sauf mention)</h4>
          <div className="space-y-1">
            {fraserSimulation.costs.map((c, i) => (
              <div key={i} className="flex justify-between text-sm py-0.5 border-b border-slate-50 last:border-0">
                <span>{c.item}</span>
                <span className="font-medium">${c.price}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm font-bold pt-2 border-t">
              <span>Total par personne</span>
              <span className="text-amber-600">${fraserTotal}</span>
            </div>
            <div className="flex justify-between text-sm font-bold">
              <span>Total 2 personnes</span>
              <span className="text-amber-600">${fraserTotalX2}</span>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <p><strong>Logistique :</strong> {fraserSimulation.note}</p>
          <p className="mt-2"><strong>Impact calendrier :</strong> +4 jours (J8-J11). Le vol vers les Whitsundays passe au J12 au lieu du J8.</p>
        </div>
      </div>

      {/* ==================== WHITSUNDAYS + PADI ==================== */}
      <div className="border-t-2 border-purple-300 pt-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold px-2 py-1 rounded bg-purple-500 text-white">RECOS</span>
          <h2 className="text-2xl font-bold">{whitsundaysPadi.title}</h2>
        </div>
        <p className="text-slate-500 text-sm mb-4">{whitsundaysPadi.padiInfo}</p>

        <div className="space-y-4">
          {whitsundaysPadi.options.map((opt, i) => {
            const optTotal = opt.cost?.reduce((s, c) => s + c.price, 0) || 0
            const optTotalX2 = opt.cost?.reduce((s, c) => s + (c.item.includes('Repas') || c.item.includes('Navettes') || c.item.includes('Hostel') ? c.price : c.price * 2), 0) || 0
            return (
              <div key={i} className={`border rounded-xl p-4 ${i === 0 ? 'border-purple-300 bg-purple-50/30' : 'bg-white'}`}>
                <div className="flex items-center gap-2 mb-1">
                  {i === 0 && <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">Recommande</span>}
                  <h4 className="font-bold">{opt.name}</h4>
                </div>
                <p className="text-sm text-slate-500 mb-2">{opt.duration} — {opt.desc}</p>

                {opt.itinerary && (
                  <div className="space-y-1 mb-3">
                    {opt.itinerary.map((step, j) => (
                      <div key={j} className="text-sm flex items-start gap-2">
                        <span className="text-purple-400 mt-0.5">›</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                )}

                {opt.cost && (
                  <div className="bg-white border rounded-lg p-3 mb-2">
                    {opt.cost.map((c, j) => (
                      <div key={j} className="flex justify-between text-xs py-0.5">
                        <span>{c.item}</span>
                        <span>${c.price}</span>
                      </div>
                    ))}
                    <div className="flex justify-between text-sm font-bold pt-2 mt-1 border-t">
                      <span>Total 2 pers</span>
                      <span className="text-purple-600">~${optTotalX2}</span>
                    </div>
                  </div>
                )}

                <p className="text-xs text-slate-500 italic">{opt.extra}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* ==================== GRAND TOTAL ==================== */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-xl p-6">
        <h3 className="font-bold text-lg mb-4">Estimation grand total (2 personnes)</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="opacity-75">Partie 1 — Byron Region (J0-J7)</span><span className="font-bold">${part1Total}</span></div>
          <div className="flex justify-between"><span className="opacity-75">Fraser Island (J8-J11)</span><span className="font-bold">${fraserTotalX2}</span></div>
          <div className="flex justify-between"><span className="opacity-75">Whitsundays + PADI Option A (J12-J16)</span><span className="font-bold">~${whitsundaysPadi.options[0].cost?.reduce((s, c) => s + (c.item.includes('Repas') || c.item.includes('Navettes') || c.item.includes('Hostel') ? c.price : c.price * 2), 0)}</span></div>
          <div className="flex justify-between pt-2 mt-2 border-t border-white/20 text-lg">
            <span className="font-bold">TOTAL ESTIME</span>
            <span className="font-bold">${part1Total + fraserTotalX2 + (whitsundaysPadi.options[0].cost?.reduce((s, c) => s + (c.item.includes('Repas') || c.item.includes('Navettes') || c.item.includes('Hostel') ? c.price : c.price * 2), 0) || 0)}</span>
          </div>
          <div className="text-right text-xs opacity-60">${Math.round((part1Total + fraserTotalX2 + (whitsundaysPadi.options[0].cost?.reduce((s, c) => s + (c.item.includes('Repas') || c.item.includes('Navettes') || c.item.includes('Hostel') ? c.price : c.price * 2), 0) || 0)) / 2)} par personne</div>
        </div>
        <p className="text-xs opacity-50 mt-4">Voyage total : 17 jours (30 avril → 16 mai). Prix indicatifs, activites au tarif moyen.</p>
      </div>
    </div>
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

// ==================== METEO ====================
const weatherData = [
  { city: 'Gold Coast', temp: '20-25', water: '23', rain: '80mm (5j)', uv: 'Modéré', note: 'Doux et ensoleillé, parfait pour la plage' },
  { city: 'Byron Bay', temp: '18-24', water: '22', rain: '100mm (7j)', uv: 'Modéré', note: 'Légèrement plus frais, brises côtières' },
  { city: 'Springbrook', temp: '14-20', water: '—', rain: '120mm (8j)', uv: 'Faible', note: 'Altitude 900m, brouillard matinal fréquent' },
  { city: 'Nimbin', temp: '15-23', water: '—', rain: '90mm (6j)', uv: 'Modéré', note: 'Hinterland, nuits fraîches' },
  { city: 'Lennox Head', temp: '17-23', water: '22', rain: '100mm (7j)', uv: 'Modéré', note: 'Comme Byron, vents de sud possibles' },
  { city: 'Airlie Beach', temp: '22-27', water: '25', rain: '50mm (3j)', uv: 'Élevé', note: 'Tropical, saison sèche commence — idéal' },
  { city: 'Whitsundays', temp: '23-28', water: '25', rain: '40mm (3j)', uv: 'Élevé', note: 'Conditions parfaites pour snorkeling, visibilité 15-20m' },
]

export function MeteoTab() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Meteo — Mai 2026</h2>
      <p className="text-slate-500 text-sm">Moyennes saisonnieres pour chaque etape du voyage. Mai = debut de l'automne en Australie, mais climat subtropical sur la cote est.</p>

      <div className="grid gap-3">
        {weatherData.map((w, i) => (
          <div key={i} className="border rounded-xl p-4 bg-white">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div className="flex-1">
                <h3 className="font-bold text-lg">{w.city}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{w.note}</p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="text-center"><div className="text-xs text-slate-400">Air</div><div className="font-bold text-orange-500">{w.temp}°C</div></div>
                <div className="text-center"><div className="text-xs text-slate-400">Eau</div><div className="font-bold text-sky-500">{w.water}{w.water !== '—' ? '°C' : ''}</div></div>
                <div className="text-center"><div className="text-xs text-slate-400">Pluie</div><div className="font-bold text-blue-500">{w.rain}</div></div>
                <div className="text-center"><div className="text-xs text-slate-400">UV</div><div className="font-bold text-amber-500">{w.uv}</div></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 space-y-1">
        <p><strong>A emporter :</strong> Veste legere pour les soirees (14-18°C a Byron/Springbrook), mais shorts et t-shirt suffisent en journee.</p>
        <p><strong>Meduses :</strong> Saison terminee fin avril aux Whitsundays, mais combinaisons stinger fournies sur les tours.</p>
        <p><strong>Coucher de soleil :</strong> ~17h15 debut mai (jours courts, prevoir les activites en consequence).</p>
      </div>
    </div>
  )
}

// ==================== PACKING / VALISE ====================
const packingCategories = [
  { name: 'Papiers & tech', items: ['Passeport + visa eTA', 'Permis de conduire international', 'Copies passeport (email + cloud)', 'Telephone + chargeur', 'Batterie externe 20000mAh', 'Adaptateur prise AU (type I)', 'GoPro + cartes SD + perche', 'Ecouteurs'] },
  { name: 'Vetements', items: ['T-shirts x5', 'Short x3', 'Pantalon leger x1', 'Veste coupe-vent legere', 'Pull polaire leger (soirees)', 'Maillot de bain x2', 'Sous-vetements x7', 'Chaussettes x5'] },
  { name: 'Chaussures', items: ['Tongs / sandales', 'Baskets rando legeres', 'Chaussures aquatiques (recif)'] },
  { name: 'Plage & eau', items: ['Serviette microfibre x2', 'Creme solaire SPF50+', 'Apres-soleil / aloe vera', 'Chapeau / casquette', 'Lunettes de soleil polarisees', 'Sac etanche (telephone)', 'Combinaison neoprene courte (optionnel)'] },
  { name: 'Sante & hygiene', items: ['Trousse de toilette', 'Medicaments de base (doliprane, imodium)', 'Anti-moustiques tropical', 'Pansements / desinfectant', 'Creme anti-irritations'] },
  { name: 'Camping van', items: ['Sac de couchage leger', 'Oreiller compressible', 'Lampe frontale', 'Couteau suisse', 'Sacs poubelle', 'Lingettes nettoyantes', 'App WikiCamps Australia ($8)'] },
]

export function PackingTab() {
  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    if (typeof window === 'undefined') return {}
    try { return JSON.parse(localStorage.getItem('packing-checked') || '{}') } catch { return {} }
  })

  const toggle = (item: string) => {
    setChecked(prev => {
      const next = { ...prev, [item]: !prev[item] }
      localStorage.setItem('packing-checked', JSON.stringify(next))
      return next
    })
  }

  const totalItems = packingCategories.reduce((sum, c) => sum + c.items.length, 0)
  const checkedCount = Object.values(checked).filter(Boolean).length
  const pct = Math.round((checkedCount / totalItems) * 100)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-2xl font-bold">Checklist valise</h2>
        <span className="text-sm text-slate-500">{checkedCount}/{totalItems} — {pct}%</span>
      </div>

      {/* Barre de progression */}
      <div className="w-full bg-slate-100 rounded-full h-3">
        <div className="h-3 rounded-full bg-gradient-to-r from-sky-500 to-green-500 transition-all" style={{ width: `${pct}%` }} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {packingCategories.map((cat, i) => {
          const catChecked = cat.items.filter(item => checked[item]).length
          return (
            <div key={i} className="border rounded-xl p-4 bg-white">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm">{cat.name}</h3>
                <span className="text-xs text-slate-400">{catChecked}/{cat.items.length}</span>
              </div>
              <div className="space-y-1">
                {cat.items.map((item, j) => (
                  <label key={j} className="flex items-center gap-2 py-1 text-sm cursor-pointer hover:bg-slate-50 rounded px-1">
                    <input type="checkbox" checked={!!checked[item]} onChange={() => toggle(item)} className="accent-sky-500" />
                    <span className={checked[item] ? 'line-through text-slate-400' : ''}>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <button onClick={() => { setChecked({}); localStorage.removeItem('packing-checked') }} className="text-xs text-red-400 hover:text-red-600">
        Tout decocher
      </button>
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
