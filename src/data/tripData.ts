export interface Activity {
  name: string
  description: string
  priceLow: number
  priceMid: number
  priceHigh: number
  type: 'free' | 'surf' | 'hike' | 'food' | 'drive' | 'flight' | 'activity' | 'culture' | 'water'
  included: boolean
}

export interface City {
  id: string
  name: string
  region: 'byron' | 'whitsundays'
  image: string
  description: string
  lat: number
  lng: number
  activities: Activity[]
}

export interface Day {
  day: number
  date: string
  title: string
  cityId: string
  highlights: string[]
  overnight: string
  driveKm: number
}

export interface Flight {
  airline: string
  from: string
  to: string
  priceLow: number
  priceHigh: number
  duration: string
  frequency: string
}

export interface Vehicle {
  company: string
  type: 'van' | 'car'
  pricePerDay: [number, number]
  total7Days: [number, number]
  includes: string[]
  pickup: string[]
  rating: number
}

export interface TripEvent {
  name: string
  date: string
  city: string
  description: string
  price: string
  type: 'market' | 'festival' | 'sport' | 'nature' | 'food'
}

export const cities: City[] = [
  {
    id: 'gold-coast', name: 'Gold Coast / Burleigh Heads', region: 'byron',
    image: '/images/burleigh-heads.png',
    description: 'Point de depart du road trip. Surf, cafes branches et parcs nationaux.',
    lat: -28.0836, lng: 153.4311,
    activities: [
      { name: 'Burleigh Heads National Park', description: 'Sentier cotier spectaculaire avec vue sur l\'ocean, 30 min de marche', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'hike', included: true },
      { name: 'Tallebudgera Creek', description: 'Baignade dans un creek aux eaux cristallines', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'water', included: true },
      { name: 'Currumbin Wildlife Sanctuary', description: 'Zoo emblematique avec koalas, kangourous et show de rapaces', priceLow: 55, priceMid: 60, priceHigh: 65, type: 'activity', included: false },
      { name: 'SkyPoint Observation Deck', description: 'Vue panoramique 360 sur la Gold Coast depuis le 77e etage', priceLow: 29, priceMid: 31, priceHigh: 32, type: 'activity', included: false },
      { name: 'Cours de surf Burleigh', description: 'Cours de 2h avec equipement fourni, tous niveaux', priceLow: 60, priceMid: 75, priceHigh: 90, type: 'surf', included: true },
    ]
  },
  {
    id: 'springbrook', name: 'Springbrook / Hinterland', region: 'byron',
    image: '/images/springbrook.png',
    description: 'Foret tropicale classee UNESCO, cascades et vers luisants.',
    lat: -28.2340, lng: 153.2700,
    activities: [
      { name: 'Natural Bridge (Springbrook)', description: 'Grotte naturelle avec cascade et vers luisants la nuit', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'hike', included: true },
      { name: 'Best of All Lookout', description: 'Panorama exceptionnel sur la cote et la foret tropicale', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'hike', included: true },
      { name: 'Tamborine Mountain Gallery Walk', description: 'Village artisanal avec galeries, chocolateries et vins', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'culture', included: false },
    ]
  },
  {
    id: 'byron-bay', name: 'Byron Bay', region: 'byron',
    image: '/images/byron-bay.png',
    description: 'Icone de la cote est. Surf, phare, dauphins et marches.',
    lat: -28.6437, lng: 153.6120,
    activities: [
      { name: 'Cape Byron Lighthouse', description: 'Point le plus a l\'est de l\'Australie, marche de 45 min, vue imprenable', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'hike', included: true },
      { name: 'Cours de surf 2h', description: 'Mojosurf, Byron Bay Surf School ou Let\'s Go Surfing', priceLow: 65, priceMid: 75, priceHigh: 85, type: 'surf', included: true },
      { name: 'Kayak avec dauphins', description: 'Cape Byron Kayaks, sortie matinale 2h30, dauphins et tortues', priceLow: 69, priceMid: 75, priceHigh: 79, type: 'water', included: true },
      { name: 'Byron Farmers Market (jeudi)', description: 'Marche fermier local, 7h-11h, Butler Street Reserve', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'food', included: true },
      { name: 'The Pass (surf)', description: 'Spot de surf mythique de Byron, droite parfaite', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'surf', included: true },
      { name: 'Coucher de soleil Main Beach', description: 'Sunset iconique sur la plage principale', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'free', included: true },
      { name: 'Arakwal National Park', description: 'Plage sauvage de Tallow Beach et sentier nature', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'hike', included: false },
    ]
  },
  {
    id: 'nimbin', name: 'Nimbin & Hinterland', region: 'byron',
    image: '/images/nimbin.png',
    description: 'Village hippie legendaire. Street art, cascades et foret tropicale.',
    lat: -28.5960, lng: 153.2230,
    activities: [
      { name: 'Nimbin village', description: 'Rue principale coloree, boutiques alternatives, Rainbow Cafe', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'culture', included: true },
      { name: 'Nimbin Museum', description: 'Musee psychedelique unique en son genre', priceLow: 5, priceMid: 5, priceHigh: 5, type: 'culture', included: true },
      { name: 'Minyon Falls', description: 'Cascade spectaculaire de 100m, Nightcap National Park', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'hike', included: true },
      { name: 'Protesters Falls', description: 'Balade facile en foret tropicale jusqu\'a une cascade cachee', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'hike', included: true },
      { name: 'Bangalow village', description: 'Village charmant avec d\'excellents cafes', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'food', included: true },
    ]
  },
  {
    id: 'crystal-castle', name: 'Crystal Castle / Mullumbimby', region: 'byron',
    image: '/images/crystal-castle.png',
    description: 'Jardins zen avec cristaux geants et vue sur l\'hinterland.',
    lat: -28.5500, lng: 153.4800,
    activities: [
      { name: 'Crystal Castle & Shambhala Gardens', description: 'Cristaux d\'amethyste geants, Bouddha, jardins tropicaux zen', priceLow: 35, priceMid: 37, priceHigh: 39, type: 'activity', included: true },
      { name: 'Mullumbimby town', description: 'Village boheme avec cafes bio et boutiques artisanales', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'culture', included: false },
    ]
  },
  {
    id: 'cabarita', name: 'Cabarita Beach / Kingscliff', region: 'byron',
    image: '/images/cabarita-beach.png',
    description: 'Plages secretes et villages cotiers authentiques.',
    lat: -28.3340, lng: 153.5700,
    activities: [
      { name: 'Cabarita Beach', description: 'Plage doree peu frequentee, ideale pour le surf', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'free', included: true },
      { name: 'Norries Head walk', description: 'Sentier cotier avec vue panoramique', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'hike', included: true },
      { name: 'Kingscliff Salt Village', description: 'Restaurants, boutiques, baignade dans Cudgen Creek', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'food', included: true },
      { name: 'Fingal Head Lighthouse', description: 'Phare historique et colonnes de basalte uniques', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'hike', included: true },
    ]
  },
  {
    id: 'lennox', name: 'Lennox Head / Ballina', region: 'byron',
    image: '/images/lennox-head.png',
    description: 'Le secret le mieux garde de la cote. Surf, lac et lookouts.',
    lat: -28.7990, lng: 153.5900,
    activities: [
      { name: 'Pat Morton Lookout', description: 'Point d\'observation des baleines (saison juin-novembre)', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'hike', included: true },
      { name: 'Lake Ainsworth', description: 'Lac d\'eau douce couleur the (tanins de tea-tree), baignade unique', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'water', included: true },
      { name: 'Lennox Head surf', description: 'Spot de surf prise des locaux, moins bonde que Byron', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'surf', included: true },
      { name: 'Seven Mile Beach', description: 'Immense plage de sable, parfaite pour une longue marche', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'free', included: false },
    ]
  },
  {
    id: 'airlie', name: 'Airlie Beach', region: 'whitsundays',
    image: '/images/airlie-beach.png',
    description: 'Porte d\'entree des Whitsundays. Lagoon tropicale et vie nocturne.',
    lat: -20.2690, lng: 148.7180,
    activities: [
      { name: 'Airlie Beach Lagoon', description: 'Piscine publique tropicale gratuite face a la mer', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'free', included: true },
      { name: 'Bicentennial Walkway', description: 'Promenade cotiere avec vue sur les iles', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'hike', included: true },
      { name: 'Jet ski tour 1h', description: 'Safari jet ski, 2 personnes par machine', priceLow: 75, priceMid: 85, priceHigh: 93, type: 'water', included: false },
      { name: 'Skydiving 15000ft', description: 'Saut en parachute au-dessus des Whitsunday Islands', priceLow: 299, priceMid: 339, priceHigh: 369, type: 'activity', included: false },
    ]
  },
  {
    id: 'whitsundays', name: 'Whitsunday Islands', region: 'whitsundays',
    image: '/images/whitehaven-aerial.png',
    description: 'Whitehaven Beach, Hill Inlet et 74 iles paradisiaques.',
    lat: -20.1500, lng: 148.9500,
    activities: [
      { name: 'Ocean Rafting (Whitehaven + snorkel)', description: 'Journee complete : Hill Inlet, Whitehaven Beach, snorkeling, dejeuner inclus', priceLow: 199, priceMid: 229, priceHigh: 229, type: 'water', included: true },
      { name: 'Thundercat Whitsundays', description: 'Catamaran rapide vers Whitehaven Beach et spots de snorkeling', priceLow: 179, priceMid: 199, priceHigh: 220, type: 'water', included: false },
      { name: 'Croisiere voile 2 jours', description: 'Nuit en bateau, tout inclus : repas, snorkeling, Whitehaven Beach', priceLow: 379, priceMid: 499, priceHigh: 699, type: 'water', included: false },
    ]
  },
  {
    id: 'gbr', name: 'Grande Barriere de Corail', region: 'whitsundays',
    image: '/images/great-barrier-reef.png',
    description: 'Le plus grand recif corallien du monde. Snorkeling, plongee et vols panoramiques.',
    lat: -19.7260, lng: 149.1780,
    activities: [
      { name: 'Red Cat Adventures (recif)', description: 'Journee recif exterieur : snorkel + dejeuner inclus', priceLow: 289, priceMid: 299, priceHigh: 299, type: 'water', included: true },
      { name: 'Cruise Whitsundays Reefworld', description: 'Ponton sur Hardy Reef : snorkel, semi-sous-marin, dejeuner', priceLow: 289, priceMid: 320, priceHigh: 350, type: 'water', included: false },
      { name: 'Bapteme de plongee', description: 'Intro dive sur le recif, aucune experience requise', priceLow: 80, priceMid: 115, priceHigh: 150, type: 'water', included: false },
      { name: 'Vol panoramique Heart Reef (avion)', description: 'Vol de 1h au-dessus de Heart Reef et Whitehaven Beach', priceLow: 329, priceMid: 332, priceHigh: 335, type: 'flight', included: true },
      { name: 'Helicoptere Heart Reef', description: '30min Whitehaven / 45min Heart Reef / 60min combo', priceLow: 550, priceMid: 815, priceHigh: 1095, type: 'flight', included: false },
    ]
  },
]

export const itinerary: Day[] = [
  { day: 1, date: '1 mai', title: 'Gold Coast — Burleigh Heads', cityId: 'gold-coast', highlights: ['Pick up campervan', 'Burleigh Heads National Park', 'Tallebudgera Creek'], overnight: 'Van — Holiday Park Gold Coast ($40-55)', driveKm: 0 },
  { day: 2, date: '2 mai', title: 'Hinterland puis Byron Bay', cityId: 'springbrook', highlights: ['Natural Bridge (Springbrook)', 'Best of All Lookout', 'Route vers Byron Bay'], overnight: 'Van — Broken Head Holiday Park ($40-55)', driveKm: 130 },
  { day: 3, date: '3 mai', title: 'Byron Bay', cityId: 'byron-bay', highlights: ['Cape Byron Lighthouse', 'Cours de surf 2h', 'Kayak avec dauphins'], overnight: 'Van — Byron Bay ($40-70)', driveKm: 15 },
  { day: 4, date: '4 mai', title: 'Nimbin & Cascades', cityId: 'nimbin', highlights: ['Nimbin village', 'Minyon Falls', 'Protesters Falls', 'Bangalow'], overnight: 'Van — Byron Bay ($40-70)', driveKm: 140 },
  { day: 5, date: '5 mai', title: 'Crystal Castle & Plages', cityId: 'crystal-castle', highlights: ['Crystal Castle & Shambhala Gardens', 'Cabarita Beach', 'Fingal Head Lighthouse'], overnight: 'Van — Kingscliff ($40-55)', driveKm: 90 },
  { day: 6, date: '6 mai', title: 'Lennox Head & Cote sud', cityId: 'lennox', highlights: ['Pat Morton Lookout', 'Lake Ainsworth', 'Lennox Head surf'], overnight: 'Van — Lennox Head ($40-60)', driveKm: 70 },
  { day: 7, date: '7 mai', title: 'Retour Gold Coast', cityId: 'gold-coast', highlights: ['Plage favorite au matin', 'Coolangatta / Snapper Rocks', 'Rendu du van'], overnight: '—', driveKm: 120 },
  { day: 8, date: '8 mai', title: 'Vol vers Whitsundays', cityId: 'airlie', highlights: ['Vol Brisbane vers Proserpine', 'Shuttle Airlie Beach', 'Airlie Beach Lagoon'], overnight: 'Hostel Airlie Beach ($65-110)', driveKm: 0 },
  { day: 9, date: '9 mai', title: 'Whitehaven Beach', cityId: 'whitsundays', highlights: ['Ocean Rafting full day', 'Hill Inlet Lookout', 'Whitehaven Beach', 'Snorkeling'], overnight: 'Hostel Airlie Beach ($65-110)', driveKm: 0 },
  { day: 10, date: '10 mai', title: 'Grande Barriere de Corail', cityId: 'gbr', highlights: ['Red Cat Adventures reef day', 'Snorkeling recif exterieur', 'Optional: bapteme plongee'], overnight: 'Hostel Airlie Beach ($65-110)', driveKm: 0 },
  { day: 11, date: '11 mai', title: 'Vol panoramique & Retour', cityId: 'gbr', highlights: ['Vol panoramique Heart Reef', 'Shuttle aeroport', 'Vol Proserpine vers Brisbane'], overnight: '—', driveKm: 0 },
]

export const flights: Flight[] = [
  { airline: 'Jetstar', from: 'Brisbane (BNE)', to: 'Proserpine (PPP)', priceLow: 58, priceHigh: 180, duration: '1h20', frequency: '~10 vols/semaine' },
  { airline: 'Virgin Australia', from: 'Brisbane (BNE)', to: 'Proserpine (PPP)', priceLow: 80, priceHigh: 200, duration: '1h20', frequency: '~8 vols/semaine' },
  { airline: 'Qantas', from: 'Brisbane (BNE)', to: 'Proserpine (PPP)', priceLow: 120, priceHigh: 250, duration: '1h20', frequency: '~5 vols/semaine' },
  { airline: 'Jetstar', from: 'Brisbane (BNE)', to: 'Hamilton Island (HTI)', priceLow: 124, priceHigh: 200, duration: '1h45', frequency: '~7 vols/semaine' },
  { airline: 'Virgin Australia', from: 'Brisbane (BNE)', to: 'Hamilton Island (HTI)', priceLow: 128, priceHigh: 250, duration: '1h45', frequency: '~6 vols/semaine' },
  { airline: 'Qantas', from: 'Brisbane (BNE)', to: 'Hamilton Island (HTI)', priceLow: 150, priceHigh: 300, duration: '1h45', frequency: '~4 vols/semaine' },
]

export const vehicles: Vehicle[] = [
  { company: 'Jucy', type: 'van', pricePerDay: [65, 95], total7Days: [455, 665], includes: ['Lit 2 places', 'Cuisine (rechaud, frigo)', 'Assurance de base'], pickup: ['Brisbane Airport', 'Gold Coast Airport'], rating: 4 },
  { company: 'Spaceships', type: 'van', pricePerDay: [55, 85], total7Days: [385, 595], includes: ['Lit 2 places', 'Cuisine complete', 'Panneau solaire', 'WiFi'], pickup: ['Brisbane'], rating: 4 },
  { company: 'Britz', type: 'van', pricePerDay: [80, 120], total7Days: [560, 840], includes: ['Lit 2 places', 'Cuisine', 'Douche exterieure', 'Assurance premium'], pickup: ['Brisbane', 'Gold Coast'], rating: 5 },
  { company: 'Wicked Campers', type: 'van', pricePerDay: [45, 75], total7Days: [315, 525], includes: ['Lit 2 places', 'Cuisine basique'], pickup: ['Brisbane', 'Gold Coast'], rating: 3 },
  { company: 'Travellers Autobarn', type: 'van', pricePerDay: [50, 80], total7Days: [350, 560], includes: ['Lit 2 places', 'Cuisine', 'Kilometrage illimite'], pickup: ['Brisbane', 'Surfers Paradise'], rating: 4 },
  { company: 'Budget', type: 'car', pricePerDay: [45, 70], total7Days: [315, 490], includes: ['Compact auto', 'Kilometrage illimite', 'Assurance de base'], pickup: ['Brisbane', 'Gold Coast', 'Byron Bay'], rating: 3 },
  { company: 'Hertz', type: 'car', pricePerDay: [50, 80], total7Days: [350, 560], includes: ['Compact/SUV', 'GPS inclus', 'Kilometrage illimite'], pickup: ['Brisbane', 'Gold Coast'], rating: 4 },
  { company: 'Avis', type: 'car', pricePerDay: [55, 85], total7Days: [385, 595], includes: ['Compact/SUV', 'Kilometrage illimite', 'Assistance 24/7'], pickup: ['Brisbane', 'Gold Coast', 'Ballina'], rating: 4 },
  { company: 'Thrifty', type: 'car', pricePerDay: [40, 65], total7Days: [280, 455], includes: ['Compact auto', 'Kilometrage illimite'], pickup: ['Brisbane', 'Gold Coast'], rating: 3 },
]

export const events: TripEvent[] = [
  { name: 'Byron Farmers Market', date: '1 mai (jeudi)', city: 'Byron Bay', description: 'Marche fermier local avec producteurs bio', price: 'Gratuit', type: 'market' },
  { name: 'Nimbin MardiGrass', date: '2-4 mai (ven-dim)', city: 'Nimbin', description: 'Festival annuel emblematique de Nimbin', price: 'Gratuit', type: 'festival' },
  { name: 'Byron Community Market', date: '4 mai (dimanche)', city: 'Byron Bay', description: 'Grand marche artisanal mensuel (1er dimanche)', price: 'Gratuit', type: 'market' },
  { name: 'Byron Farmers Market', date: '8 mai (jeudi)', city: 'Byron Bay', description: 'Marche fermier local avec producteurs bio', price: 'Gratuit', type: 'market' },
  { name: 'Airlie Beach Markets', date: '10 mai (samedi)', city: 'Airlie Beach', description: 'Marche artisanal et produits locaux', price: 'Gratuit', type: 'market' },
  { name: 'The Channon Market', date: '11 mai (dimanche)', city: 'The Channon (pres Nimbin)', description: 'Marche hippie artisanal dans la foret (2e dimanche)', price: 'Gratuit', type: 'market' },
  { name: 'Debut saison des baleines', date: 'Mi-mai a novembre', city: 'Toute la cote est', description: 'Les baleines a bosse commencent leur migration vers le nord', price: 'Gratuit (depuis la cote)', type: 'nature' },
  { name: 'Byron Farmers Market', date: '15 mai (jeudi)', city: 'Byron Bay', description: 'Marche fermier local avec producteurs bio', price: 'Gratuit', type: 'market' },
  { name: 'Sunset Cinema Byron Bay', date: 'Mai (verifier dates)', city: 'Byron Bay', description: 'Cinema en plein air sur la plage', price: '$18-25', type: 'festival' },
]
