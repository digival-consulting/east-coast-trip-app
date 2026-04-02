export interface Activity {
  name: string
  description: string
  priceLow: number
  priceMid: number
  priceHigh: number
  type: 'free' | 'surf' | 'hike' | 'food' | 'drive' | 'flight' | 'activity' | 'culture' | 'water'
  included: boolean
  url: string
  warning?: string
}

export interface City {
  id: string
  name: string
  region: 'byron' | 'whitsundays' | 'transit'
  image: string
  description: string
  lat: number
  lng: number
  activities: Activity[]
}

export interface DayHighlight {
  time: string
  name: string
  image?: string
  url?: string
}

export interface Day {
  day: number
  date: string
  title: string
  cityId: string
  highlights: DayHighlight[]
  overnight: string
  overnightUrl: string
  driveKm: number
  caption: string
}

export interface Flight {
  airline: string
  from: string
  to: string
  segment: 'syd-gc' | 'gc-ppp' | 'ppp-syd'
  date: string
  priceLow: number
  priceHigh: number
  duration: string
  frequency: string
  baggageIncluded: boolean
  bookingUrl: string
}

export interface Vehicle {
  company: string
  type: 'van' | 'car'
  pricePerDay: [number, number]
  total7Days: [number, number]
  includes: string[]
  pickup: string[]
  rating: number
  images: string[]
  bookingUrl: string
}

export interface TripEvent {
  name: string
  date: string
  city: string
  location: string
  hours: string
  description: string
  price: string
  type: 'market' | 'festival' | 'sport' | 'nature' | 'food'
  officialUrl: string
  image: string
  mustSee: boolean
  lat: number
  lng: number
}

export interface POI {
  name: string
  lat: number
  lng: number
  category: 'airport' | 'fuel' | 'accommodation' | 'must-see' | 'event' | 'van-rental' | 'warning'
  description: string
}

export const cities: City[] = [
  {
    id: 'gold-coast', name: 'Gold Coast / Burleigh Heads', region: 'byron',
    image: '/images/burleigh-heads.png',
    description: 'Point de départ du road trip. Surf, cafés branchés et parcs nationaux.',
    lat: -28.0836, lng: 153.4311,
    activities: [
      { name: 'Burleigh Heads National Park', description: 'Sentier côtier spectaculaire avec vue sur l\'océan, 30 min de marche', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'hike', included: true, url: 'https://parks.des.qld.gov.au/parks/burleigh-head', warning: 'Sentier glissant après la pluie. Prévoir des chaussures fermées.' },
      { name: 'Tallebudgera Creek', description: 'Baignade dans un creek aux eaux cristallines', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'water', included: true, url: 'https://www.goldcoast.com.au/things-to-do/tallebudgera-creek' },
      { name: 'Currumbin Wildlife Sanctuary', description: 'Zoo emblématique avec koalas, kangourous et show de rapaces', priceLow: 55, priceMid: 60, priceHigh: 65, type: 'activity', included: false, url: 'https://currumbinsanctuary.com.au', warning: 'Réserver en ligne pour -10%. Show lorikeets à 8h et 16h.' },
      { name: 'SkyPoint Observation Deck', description: 'Vue panoramique 360° sur la Gold Coast depuis le 77e étage', priceLow: 29, priceMid: 31, priceHigh: 32, type: 'activity', included: false, url: 'https://www.skypoint.com.au' },
      { name: 'Cours de surf Burleigh', description: 'Cours de 2h avec équipement fourni, tous niveaux', priceLow: 60, priceMid: 75, priceHigh: 90, type: 'surf', included: true, url: 'https://www.getwetsturfschool.com.au', warning: 'Meilleur créneau tôt le matin quand les vagues sont plus régulières.' },
    ]
  },
  {
    id: 'springbrook', name: 'Springbrook / Hinterland', region: 'byron',
    image: '/images/springbrook.png',
    description: 'Forêt tropicale classée UNESCO, cascades et vers luisants.',
    lat: -28.2340, lng: 153.2700,
    activities: [
      { name: 'Natural Bridge (Springbrook)', description: 'Grotte naturelle avec cascade et vers luisants la nuit', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'hike', included: true, url: 'https://parks.des.qld.gov.au/parks/springbrook', warning: 'Les vers luisants ne sont visibles qu\'à la tombée de la nuit. Prévoir une lampe torche.' },
      { name: 'Best of All Lookout', description: 'Panorama exceptionnel sur la côte et la forêt tropicale', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'hike', included: true, url: 'https://parks.des.qld.gov.au/parks/springbrook' },
      { name: 'Tamborine Mountain Gallery Walk', description: 'Village artisanal avec galeries, chocolateries et vins', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'culture', included: false, url: 'https://www.tamborinemountain.com.au' },
    ]
  },
  {
    id: 'byron-bay', name: 'Byron Bay', region: 'byron',
    image: '/images/byron-bay.png',
    description: 'Icône de la côte est. Surf, phare, dauphins et marchés.',
    lat: -28.6437, lng: 153.6120,
    activities: [
      { name: 'Cape Byron Lighthouse', description: 'Point le plus à l\'est de l\'Australie, marche de 45 min, vue imprenable', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'hike', included: true, url: 'https://www.nationalparks.nsw.gov.au/things-to-do/walking-tracks/cape-byron-walking-track', warning: 'Parking $8-10/h. Préférer venir à pied depuis la ville (45 min).' },
      { name: 'Cours de surf 2h', description: 'Mojosurf, Byron Bay Surf School ou Let\'s Go Surfing', priceLow: 65, priceMid: 75, priceHigh: 85, type: 'surf', included: true, url: 'https://mojosurf.com/byron-bay', warning: 'Réserver la veille. Créneaux populaires : 9h et 14h.' },
      { name: 'Kayak avec dauphins', description: 'Cape Byron Kayaks, sortie matinale 2h30, dauphins et tortues', priceLow: 69, priceMid: 75, priceHigh: 79, type: 'water', included: true, url: 'https://www.capebayronkayaks.com', warning: 'Sortie annulée si mer agitée. Départ 6h30 en été.' },
      { name: 'Byron Farmers Market (jeudi)', description: 'Marché fermier local, 7h-11h, Butler Street Reserve', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'food', included: true, url: 'https://www.byronfarmersmarket.com.au' },
      { name: 'The Pass (surf)', description: 'Spot de surf mythique de Byron, droite parfaite', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'surf', included: true, url: 'https://www.visitbyronbay.com/things-to-do/the-pass' },
      { name: 'Coucher de soleil Main Beach', description: 'Sunset iconique sur la plage principale', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'free', included: true, url: 'https://www.visitbyronbay.com' },
      { name: 'Arakwal National Park', description: 'Plage sauvage de Tallow Beach et sentier nature', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'hike', included: false, url: 'https://www.nationalparks.nsw.gov.au/visit-a-park/parks/arakwal-national-park' },
    ]
  },
  {
    id: 'nimbin', name: 'Nimbin & Hinterland', region: 'byron',
    image: '/images/nimbin.png',
    description: 'Village hippie légendaire. Street art, cascades et forêt tropicale.',
    lat: -28.5960, lng: 153.2230,
    activities: [
      { name: 'Nimbin village', description: 'Rue principale colorée, boutiques alternatives, Rainbow Cafe', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'culture', included: true, url: 'https://www.visitnimbin.com.au' },
      { name: 'Nimbin Museum', description: 'Musée psychédélique unique en son genre', priceLow: 5, priceMid: 5, priceHigh: 5, type: 'culture', included: true, url: 'https://www.nimbinmuseum.com', warning: 'Horaires variables. Vérifier avant de s\'y rendre.' },
      { name: 'Minyon Falls', description: 'Cascade spectaculaire de 100m, Nightcap National Park', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'hike', included: true, url: 'https://www.nationalparks.nsw.gov.au/things-to-do/lookouts/minyon-falls-lookout' },
      { name: 'Protesters Falls', description: 'Balade facile en forêt tropicale jusqu\'à une cascade cachée', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'hike', included: true, url: 'https://www.nationalparks.nsw.gov.au/things-to-do/walking-tracks/protesters-falls-walk' },
      { name: 'Bangalow village', description: 'Village charmant avec d\'excellents cafés', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'food', included: true, url: 'https://www.bangalowmarket.com.au' },
    ]
  },
  {
    id: 'crystal-castle', name: 'Crystal Castle / Mullumbimby', region: 'byron',
    image: '/images/crystal-castle.png',
    description: 'Jardins zen avec cristaux géants et vue sur l\'hinterland.',
    lat: -28.5500, lng: 153.4800,
    activities: [
      { name: 'Crystal Castle & Shambhala Gardens', description: 'Cristaux d\'améthyste géants, Bouddha, jardins tropicaux zen', priceLow: 35, priceMid: 37, priceHigh: 39, type: 'activity', included: true, url: 'https://crystalcastle.com.au', warning: 'Réserver en ligne obligatoire. Fermé les jours de forte pluie.' },
      { name: 'Mullumbimby town', description: 'Village bohème avec cafés bio et boutiques artisanales', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'culture', included: false, url: 'https://www.discovermullumbimby.com.au' },
    ]
  },
  {
    id: 'cabarita', name: 'Cabarita Beach / Kingscliff', region: 'byron',
    image: '/images/cabarita-beach.png',
    description: 'Plages secrètes et villages côtiers authentiques.',
    lat: -28.3340, lng: 153.5700,
    activities: [
      { name: 'Cabarita Beach', description: 'Plage dorée peu fréquentée, idéale pour le surf', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'free', included: true, url: 'https://www.visitnsw.com/destinations/north-coast/tweed-area/cabarita-beach' },
      { name: 'Norries Head walk', description: 'Sentier côtier avec vue panoramique', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'hike', included: true, url: 'https://www.visitnsw.com/destinations/north-coast/tweed-area/cabarita-beach' },
      { name: 'Kingscliff Salt Village', description: 'Restaurants, boutiques, baignade dans Cudgen Creek', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'food', included: true, url: 'https://www.kingscliff.com.au' },
      { name: 'Fingal Head Lighthouse', description: 'Phare historique et colonnes de basalte uniques', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'hike', included: true, url: 'https://www.visitnsw.com/destinations/north-coast/tweed-area/fingal-head' },
    ]
  },
  {
    id: 'lennox', name: 'Lennox Head / Ballina', region: 'byron',
    image: '/images/lennox-head.png',
    description: 'Le secret le mieux gardé de la côte. Surf, lac et lookouts.',
    lat: -28.7990, lng: 153.5900,
    activities: [
      { name: 'Pat Morton Lookout', description: 'Point d\'observation des baleines (saison juin-novembre)', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'hike', included: true, url: 'https://www.visitnsw.com/destinations/north-coast/ballina-area/lennox-head', warning: 'Baleines visibles de mi-mai à novembre. En mai c\'est le tout début de saison.' },
      { name: 'Lake Ainsworth', description: 'Lac d\'eau douce couleur thé (tanins de tea-tree), baignade unique', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'water', included: true, url: 'https://www.visitnsw.com/destinations/north-coast/ballina-area/lennox-head' },
      { name: 'Lennox Head surf', description: 'Spot de surf prisé des locaux, moins bondé que Byron', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'surf', included: true, url: 'https://www.visitnsw.com/destinations/north-coast/ballina-area/lennox-head' },
      { name: 'Seven Mile Beach', description: 'Immense plage de sable, parfaite pour une longue marche', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'free', included: false, url: 'https://www.visitnsw.com/destinations/north-coast/ballina-area/lennox-head' },
    ]
  },
  {
    id: 'airlie', name: 'Airlie Beach', region: 'whitsundays',
    image: '/images/airlie-beach.png',
    description: 'Porte d\'entrée des Whitsundays. Lagoon tropicale et vie nocturne.',
    lat: -20.2690, lng: 148.7180,
    activities: [
      { name: 'Airlie Beach Lagoon', description: 'Piscine publique tropicale gratuite face à la mer', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'free', included: true, url: 'https://www.airliebeach.com/things-to-do/airlie-beach-lagoon' },
      { name: 'Bicentennial Walkway', description: 'Promenade côtière avec vue sur les îles', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'hike', included: true, url: 'https://www.airliebeach.com' },
      { name: 'Jet ski tour 1h', description: 'Safari jet ski, 2 personnes par machine', priceLow: 75, priceMid: 85, priceHigh: 93, type: 'water', included: false, url: 'https://www.whitsundayjetski.com.au', warning: 'Minimum 2 participants. Annulation gratuite 24h avant.' },
      { name: 'Skydiving 15000ft', description: 'Saut en parachute au-dessus des Whitsunday Islands', priceLow: 299, priceMid: 339, priceHigh: 369, type: 'activity', included: false, url: 'https://www.skydive.com.au/airlie-beach' },
    ]
  },
  {
    id: 'whitsundays', name: 'Whitsunday Islands', region: 'whitsundays',
    image: '/images/whitehaven-aerial.png',
    description: 'Whitehaven Beach, Hill Inlet et 74 îles paradisiaques.',
    lat: -20.1500, lng: 148.9500,
    activities: [
      { name: 'Ocean Rafting (Whitehaven + snorkel)', description: 'Journée complète : Hill Inlet, Whitehaven Beach, snorkeling, déjeuner inclus', priceLow: 199, priceMid: 229, priceHigh: 229, type: 'water', included: true, url: 'https://www.oceanrafting.com.au', warning: 'Réserver 1 semaine à l\'avance en haute saison. Combinaison anti-méduses fournie.' },
      { name: 'Thundercat Whitsundays', description: 'Catamaran rapide vers Whitehaven Beach et spots de snorkeling', priceLow: 179, priceMid: 199, priceHigh: 220, type: 'water', included: false, url: 'https://www.thundercat.com.au' },
      { name: 'Croisière voile 2 jours', description: 'Nuit en bateau, tout inclus : repas, snorkeling, Whitehaven Beach', priceLow: 379, priceMid: 499, priceHigh: 699, type: 'water', included: false, url: 'https://sailing-whitsundays.com/tours/short-on-time', warning: 'Mal de mer possible. Prévoir du Dramamine.' },
    ]
  },
  {
    id: 'gbr', name: 'Grande Barrière de Corail', region: 'whitsundays',
    image: '/images/great-barrier-reef.png',
    description: 'Le plus grand récif corallien du monde. Snorkeling, plongée et vols panoramiques.',
    lat: -19.7260, lng: 149.1780,
    activities: [
      { name: 'Red Cat Adventures (récif)', description: 'Journée récif extérieur : snorkel + déjeuner inclus', priceLow: 289, priceMid: 299, priceHigh: 299, type: 'water', included: true, url: 'https://redcatadventures.com.au', warning: 'Crème solaire reef-safe uniquement. Fournie à bord.' },
      { name: 'Cruise Whitsundays Reefworld', description: 'Ponton sur Hardy Reef : snorkel, semi-sous-marin, déjeuner', priceLow: 289, priceMid: 320, priceHigh: 350, type: 'water', included: false, url: 'https://www.cruisewhitsundays.com' },
      { name: 'Baptême de plongée', description: 'Intro dive sur le récif, aucune expérience requise', priceLow: 80, priceMid: 115, priceHigh: 150, type: 'water', included: false, url: 'https://redcatadventures.com.au', warning: 'Certificat médical requis si problèmes respiratoires.' },
      { name: 'Vol panoramique Heart Reef (avion)', description: 'Vol de 1h au-dessus de Heart Reef et Whitehaven Beach', priceLow: 329, priceMid: 332, priceHigh: 335, type: 'flight', included: true, url: 'https://www.gslaviation.com.au' },
      { name: 'Hélicoptère Heart Reef', description: '30min Whitehaven / 45min Heart Reef / 60min combo', priceLow: 550, priceMid: 815, priceHigh: 1095, type: 'flight', included: false, url: 'https://www.helireef.com.au', warning: 'Minimum 2 passagers. Prix par personne. Réserver 48h avant.' },
    ]
  },
]

export const itinerary: Day[] = [
  { day: 1, date: '1 mai', title: 'Sydney → Gold Coast', cityId: 'gold-coast', caption: 'Vue aérienne de Burleigh Heads et de son headland emblématique',
    highlights: [
      { time: '7h00-9h30', name: 'Vol aller Sydney → Gold Coast', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=200&h=150&fit=crop', url: 'https://www.jetstar.com' },
      { time: '10h30-11h30', name: 'Récupération du campervan', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=200&h=150&fit=crop', url: 'https://www.jucy.com.au' },
      { time: '12h00-13h30', name: 'Burleigh Heads National Park', image: '/images/burleigh-heads.png', url: 'https://parks.des.qld.gov.au/parks/burleigh-head' },
      { time: '14h00-15h30', name: 'Tallebudgera Creek — baignade', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop', url: 'https://www.goldcoast.com.au/things-to-do/tallebudgera-creek' },
    ], overnight: 'BIG4 Gold Coast Holiday Park', overnightUrl: 'https://www.big4.com.au/caravan-parks/qld/gold-coast/gold-coast-holiday-park', driveKm: 0 },
  { day: 2, date: '2 mai', title: 'Hinterland → Byron Bay', cityId: 'springbrook', caption: 'Natural Bridge : la grotte aux vers luisants de Springbrook National Park',
    highlights: [
      { time: '8h00-10h00', name: 'Natural Bridge (Springbrook)', image: '/images/springbrook.png', url: 'https://parks.des.qld.gov.au/parks/springbrook' },
      { time: '10h30-11h30', name: 'Best of All Lookout', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=200&h=150&fit=crop', url: 'https://parks.des.qld.gov.au/parks/springbrook' },
      { time: '12h00-14h00', name: 'Route vers Byron Bay (1h30)', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=200&h=150&fit=crop', url: '' },
      { time: '16h00-18h00', name: 'Sunset à The Pass, Byron Bay', image: 'https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=200&h=150&fit=crop', url: 'https://www.visitbyronbay.com' },
    ], overnight: 'Broken Head Holiday Park', overnightUrl: 'https://www.brokenheadholidaypark.com.au', driveKm: 130 },
  { day: 3, date: '3 mai', title: 'Byron Bay', cityId: 'byron-bay', caption: 'Le phare de Cape Byron au lever du soleil — point le plus à l\'est de l\'Australie',
    highlights: [
      { time: '6h30-8h00', name: 'Cape Byron Lighthouse walk', image: '/images/byron-bay.png', url: 'https://www.nationalparks.nsw.gov.au/things-to-do/walking-tracks/cape-byron-walking-track' },
      { time: '9h00-11h00', name: 'Cours de surf 2h', image: 'https://images.unsplash.com/photo-1502680390548-bdbac40a5519?w=200&h=150&fit=crop', url: 'https://mojosurf.com/byron-bay' },
      { time: '14h00-16h30', name: 'Kayak avec dauphins', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=150&fit=crop', url: 'https://www.capebayronkayaks.com' },
      { time: '17h00-18h30', name: 'Coucher de soleil Main Beach', image: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=200&h=150&fit=crop', url: '' },
    ], overnight: 'First Sun Holiday Park Byron Bay', overnightUrl: 'https://www.firstsunholidaypark.com.au', driveKm: 15 },
  { day: 4, date: '4 mai', title: 'Nimbin & Cascades', cityId: 'nimbin', caption: 'Nimbin : murales psychédéliques et ambiance hippie sur la rue principale',
    highlights: [
      { time: '8h30-10h30', name: 'Route vers Nimbin + visite village', image: '/images/nimbin.png', url: 'https://www.visitnimbin.com.au' },
      { time: '11h00-12h30', name: 'Minyon Falls — randonnée', image: 'https://images.unsplash.com/photo-1432405972618-c6b0cfba8b1f?w=200&h=150&fit=crop', url: 'https://www.nationalparks.nsw.gov.au/things-to-do/lookouts/minyon-falls-lookout' },
      { time: '13h00-14h00', name: 'Protesters Falls', image: 'https://images.unsplash.com/photo-1476611338391-6f395a0ebc7b?w=200&h=150&fit=crop', url: 'https://www.nationalparks.nsw.gov.au/things-to-do/walking-tracks/protesters-falls-walk' },
      { time: '15h00-16h00', name: 'Bangalow — café et village', image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=200&h=150&fit=crop', url: 'https://www.bangalowmarket.com.au' },
    ], overnight: 'First Sun Holiday Park Byron Bay', overnightUrl: 'https://www.firstsunholidaypark.com.au', driveKm: 140 },
  { day: 5, date: '5 mai', title: 'Crystal Castle & Plages', cityId: 'crystal-castle', caption: 'Les cristaux d\'améthyste géants du Crystal Castle dans les jardins tropicaux',
    highlights: [
      { time: '9h00-12h00', name: 'Crystal Castle & Shambhala Gardens', image: '/images/crystal-castle.png', url: 'https://crystalcastle.com.au' },
      { time: '13h00-15h00', name: 'Cabarita Beach — surf et détente', image: '/images/cabarita-beach.png', url: '' },
      { time: '16h00-17h30', name: 'Fingal Head Lighthouse — colonnes de basalte', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=200&h=150&fit=crop', url: '' },
    ], overnight: 'Kingscliff Beach Holiday Park', overnightUrl: 'https://www.kingscliffbeachholidaypark.com.au', driveKm: 90 },
  { day: 6, date: '6 mai', title: 'Lennox Head & Côte sud', cityId: 'lennox', caption: 'Vue spectaculaire depuis Pat Morton Lookout sur Seven Mile Beach',
    highlights: [
      { time: '8h30-9h30', name: 'Pat Morton Lookout', image: '/images/lennox-head.png', url: '' },
      { time: '10h00-12h00', name: 'Lake Ainsworth — baignade tea-tree', image: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=200&h=150&fit=crop', url: '' },
      { time: '13h00-15h00', name: 'Lennox Head surf', image: 'https://images.unsplash.com/photo-1502680390548-bdbac40a5519?w=200&h=150&fit=crop', url: '' },
      { time: '15h30-17h00', name: 'Seven Mile Beach — promenade', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop', url: '' },
    ], overnight: 'Lennox Head Reflections Holiday Park', overnightUrl: 'https://www.reflectionsholidayparks.com.au/park/lennox-head', driveKm: 70 },
  { day: 7, date: '7 mai', title: 'Retour Gold Coast', cityId: 'gold-coast', caption: 'Snapper Rocks et Rainbow Bay — dernière session surf avant le vol',
    highlights: [
      { time: '8h00-9h30', name: 'Dernière plage favorite', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=200&h=150&fit=crop', url: '' },
      { time: '10h00-11h00', name: 'Coolangatta / Snapper Rocks', image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=150&fit=crop', url: '' },
      { time: '12h00-13h00', name: 'Rendu du campervan', image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=200&h=150&fit=crop', url: 'https://www.jucy.com.au' },
    ], overnight: '—', overnightUrl: '', driveKm: 120 },
  { day: 8, date: '8 mai', title: 'Vol → Whitsundays', cityId: 'airlie', caption: 'L\'Airlie Beach Lagoon : piscine tropicale gratuite face à la marina',
    highlights: [
      { time: '8h00-9h30', name: 'Vol Gold Coast → Proserpine', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=200&h=150&fit=crop', url: 'https://www.jetstar.com' },
      { time: '10h00-11h00', name: 'Shuttle aéroport → Airlie Beach', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&h=150&fit=crop', url: 'https://www.whitsundaytransit.com.au' },
      { time: '12h00-14h00', name: 'Airlie Beach Lagoon', image: '/images/airlie-beach.png', url: 'https://www.airliebeach.com/things-to-do/airlie-beach-lagoon' },
      { time: '18h00-20h00', name: 'Dîner en ville', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=150&fit=crop', url: '' },
    ], overnight: 'Nomads Airlie Beach', overnightUrl: 'https://nomadsworld.com/australia/airlie-beach', driveKm: 0 },
  { day: 9, date: '9 mai', title: 'Whitehaven Beach', cityId: 'whitsundays', caption: 'Vue aérienne de Hill Inlet — le sable blanc et l\'eau turquoise des Whitsundays',
    highlights: [
      { time: '7h30-17h00', name: 'Ocean Rafting full day — Hill Inlet + Whitehaven + snorkel', image: '/images/whitehaven-aerial.png', url: 'https://www.oceanrafting.com.au' },
    ], overnight: 'Nomads Airlie Beach', overnightUrl: 'https://nomadsworld.com/australia/airlie-beach', driveKm: 0 },
  { day: 10, date: '10 mai', title: 'Grande Barrière de Corail', cityId: 'gbr', caption: 'Snorkeling sur la Grande Barrière : coraux, tortues et poissons tropicaux',
    highlights: [
      { time: '7h00-17h00', name: 'Red Cat Adventures — journée récif extérieur', image: '/images/great-barrier-reef.png', url: 'https://redcatadventures.com.au' },
    ], overnight: 'Nomads Airlie Beach', overnightUrl: 'https://nomadsworld.com/australia/airlie-beach', driveKm: 0 },
  { day: 11, date: '11 mai', title: 'Vol panoramique & Retour', cityId: 'gbr', caption: 'Heart Reef vu du ciel — le récif en forme de coeur iconique',
    highlights: [
      { time: '8h00-9h00', name: 'Vol panoramique Heart Reef', image: '/images/helicopter-whitsundays.png', url: 'https://www.gslaviation.com.au' },
      { time: '10h00-11h00', name: 'Shuttle → aéroport Proserpine', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=200&h=150&fit=crop', url: 'https://www.whitsundaytransit.com.au' },
      { time: '12h00-15h00', name: 'Vol retour Proserpine → Sydney', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=200&h=150&fit=crop', url: 'https://www.jetstar.com' },
    ], overnight: '—', overnightUrl: '', driveKm: 0 },
]

export const flights: Flight[] = [
  // Sydney → Gold Coast — 1 mai
  { airline: 'Jetstar', from: 'Sydney (SYD)', to: 'Gold Coast (OOL)', segment: 'syd-gc', date: '1 mai 2026', priceLow: 49, priceHigh: 150, duration: '1h25', frequency: '~15 vols/jour', baggageIncluded: false, bookingUrl: 'https://www.jetstar.com' },
  { airline: 'Virgin Australia', from: 'Sydney (SYD)', to: 'Gold Coast (OOL)', segment: 'syd-gc', date: '1 mai 2026', priceLow: 79, priceHigh: 180, duration: '1h25', frequency: '~10 vols/jour', baggageIncluded: true, bookingUrl: 'https://www.virginaustralia.com' },
  { airline: 'Qantas', from: 'Sydney (SYD)', to: 'Gold Coast (OOL)', segment: 'syd-gc', date: '1 mai 2026', priceLow: 99, priceHigh: 220, duration: '1h25', frequency: '~8 vols/jour', baggageIncluded: true, bookingUrl: 'https://www.qantas.com' },
  // Gold Coast → Proserpine — 8 mai
  { airline: 'Jetstar', from: 'Gold Coast (OOL)', to: 'Proserpine (PPP)', segment: 'gc-ppp', date: '8 mai 2026', priceLow: 69, priceHigh: 190, duration: '1h40', frequency: '~5 vols/semaine', baggageIncluded: false, bookingUrl: 'https://www.jetstar.com' },
  { airline: 'Virgin Australia', from: 'Brisbane (BNE)', to: 'Proserpine (PPP)', segment: 'gc-ppp', date: '8 mai 2026', priceLow: 80, priceHigh: 200, duration: '1h20', frequency: '~8 vols/semaine', baggageIncluded: true, bookingUrl: 'https://www.virginaustralia.com' },
  { airline: 'Qantas', from: 'Brisbane (BNE)', to: 'Proserpine (PPP)', segment: 'gc-ppp', date: '8 mai 2026', priceLow: 120, priceHigh: 250, duration: '1h20', frequency: '~5 vols/semaine', baggageIncluded: true, bookingUrl: 'https://www.qantas.com' },
  // Proserpine → Sydney — 11 mai
  { airline: 'Jetstar', from: 'Proserpine (PPP)', to: 'Sydney (SYD)', segment: 'ppp-syd', date: '11 mai 2026', priceLow: 89, priceHigh: 220, duration: '2h15', frequency: '~5 vols/semaine', baggageIncluded: false, bookingUrl: 'https://www.jetstar.com' },
  { airline: 'Virgin Australia', from: 'Proserpine (PPP)', to: 'Sydney (SYD)', segment: 'ppp-syd', date: '11 mai 2026', priceLow: 110, priceHigh: 260, duration: '2h15', frequency: '~4 vols/semaine', baggageIncluded: true, bookingUrl: 'https://www.virginaustralia.com' },
  { airline: 'Qantas', from: 'Proserpine (PPP)', to: 'Sydney (SYD)', segment: 'ppp-syd', date: '11 mai 2026', priceLow: 140, priceHigh: 300, duration: '2h10', frequency: '~3 vols/semaine', baggageIncluded: true, bookingUrl: 'https://www.qantas.com' },
]

export const vehicles: Vehicle[] = [
  { company: 'Jucy', type: 'van', pricePerDay: [65, 95], total7Days: [455, 665], includes: ['Lit 2 places', 'Cuisine (réchaud, frigo)', 'Assurance de base'], pickup: ['Brisbane Airport', 'Gold Coast Airport'], rating: 4, images: ['https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1531356599078-eed5c5095db5?w=600&h=400&fit=crop'], bookingUrl: 'https://www.jucy.com.au/campervans/crib' },
  { company: 'Spaceships', type: 'van', pricePerDay: [55, 85], total7Days: [385, 595], includes: ['Lit 2 places', 'Cuisine complète', 'Panneau solaire', 'WiFi'], pickup: ['Brisbane'], rating: 4, images: ['https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=400&fit=crop'], bookingUrl: 'https://www.spaceshipsrentals.com.au' },
  { company: 'Britz', type: 'van', pricePerDay: [80, 120], total7Days: [560, 840], includes: ['Lit 2 places', 'Cuisine', 'Douche extérieure', 'Assurance premium'], pickup: ['Brisbane', 'Gold Coast'], rating: 5, images: ['https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=600&h=400&fit=crop'], bookingUrl: 'https://www.britz.com.au' },
  { company: 'Wicked Campers', type: 'van', pricePerDay: [45, 75], total7Days: [315, 525], includes: ['Lit 2 places', 'Cuisine basique'], pickup: ['Brisbane', 'Gold Coast'], rating: 3, images: ['https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&h=400&fit=crop'], bookingUrl: 'https://www.wickedcampers.com.au' },
  { company: 'Travellers Autobarn', type: 'van', pricePerDay: [50, 80], total7Days: [350, 560], includes: ['Lit 2 places', 'Cuisine', 'Kilométrage illimité'], pickup: ['Brisbane', 'Surfers Paradise'], rating: 4, images: ['https://images.unsplash.com/photo-1551524559-8af4e6624178?w=600&h=400&fit=crop', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&h=400&fit=crop'], bookingUrl: 'https://www.travellers-autobarn.com.au' },
  { company: 'Budget', type: 'car', pricePerDay: [45, 70], total7Days: [315, 490], includes: ['Compact auto', 'Kilométrage illimité', 'Assurance de base'], pickup: ['Brisbane', 'Gold Coast', 'Byron Bay'], rating: 3, images: ['https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=600&h=400&fit=crop'], bookingUrl: 'https://www.budget.com.au' },
  { company: 'Hertz', type: 'car', pricePerDay: [50, 80], total7Days: [350, 560], includes: ['Compact/SUV', 'GPS inclus', 'Kilométrage illimité'], pickup: ['Brisbane', 'Gold Coast'], rating: 4, images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop'], bookingUrl: 'https://www.hertz.com.au' },
  { company: 'Avis', type: 'car', pricePerDay: [55, 85], total7Days: [385, 595], includes: ['Compact/SUV', 'Kilométrage illimité', 'Assistance 24/7'], pickup: ['Brisbane', 'Gold Coast', 'Ballina'], rating: 4, images: ['https://images.unsplash.com/photo-1533473359331-2969f3c6b1d7?w=600&h=400&fit=crop'], bookingUrl: 'https://www.avis.com.au' },
  { company: 'Thrifty', type: 'car', pricePerDay: [40, 65], total7Days: [280, 455], includes: ['Compact auto', 'Kilométrage illimité'], pickup: ['Brisbane', 'Gold Coast'], rating: 3, images: ['https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=600&h=400&fit=crop'], bookingUrl: 'https://www.thrifty.com.au' },
]

export const events: TripEvent[] = [
  { name: 'Byron Farmers Market', date: '1 mai (jeudi)', city: 'Byron Bay', location: 'Butler Street Reserve, Byron Bay', hours: '7h00-11h00', description: 'Marché fermier local avec producteurs bio de la région', price: 'Gratuit', type: 'market', officialUrl: 'https://www.byronfarmersmarket.com.au', image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=300&h=200&fit=crop', mustSee: true, lat: -28.6437, lng: 153.6120 },
  { name: 'Nimbin MardiGrass', date: '2-4 mai (ven-dim)', city: 'Nimbin', location: 'Nimbin Community Centre & rues de Nimbin', hours: '10h00-22h00', description: 'Festival annuel emblématique de Nimbin — musique, parades, culture alternative', price: 'Gratuit', type: 'festival', officialUrl: 'https://www.nimbinmardigrass.com', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=200&fit=crop', mustSee: true, lat: -28.5960, lng: 153.2230 },
  { name: 'Byron Community Market', date: '4 mai (dimanche)', city: 'Byron Bay', location: 'Butler Street Reserve, Byron Bay', hours: '8h00-15h00', description: 'Grand marché artisanal mensuel (1er dimanche du mois)', price: 'Gratuit', type: 'market', officialUrl: 'https://www.byronmarkets.com.au', image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=300&h=200&fit=crop', mustSee: true, lat: -28.6437, lng: 153.6120 },
  { name: 'Byron Farmers Market', date: '8 mai (jeudi)', city: 'Byron Bay', location: 'Butler Street Reserve, Byron Bay', hours: '7h00-11h00', description: 'Marché fermier local avec producteurs bio', price: 'Gratuit', type: 'market', officialUrl: 'https://www.byronfarmersmarket.com.au', image: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=300&h=200&fit=crop', mustSee: false, lat: -28.6437, lng: 153.6120 },
  { name: 'Airlie Beach Markets', date: '10 mai (samedi)', city: 'Airlie Beach', location: 'Airlie Beach Foreshore', hours: '7h00-13h00', description: 'Marché artisanal avec produits locaux et artisanat', price: 'Gratuit', type: 'market', officialUrl: 'https://www.airliebeach.com', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&h=200&fit=crop', mustSee: false, lat: -20.2690, lng: 148.7180 },
  { name: 'The Channon Market', date: '11 mai (dimanche)', city: 'The Channon (près Nimbin)', location: 'Coronation Park, The Channon', hours: '8h00-14h00', description: 'Marché hippie artisanal dans la forêt (2e dimanche du mois)', price: 'Gratuit', type: 'market', officialUrl: 'https://www.thechannonmarket.org.au', image: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=300&h=200&fit=crop', mustSee: true, lat: -28.6800, lng: 153.2300 },
  { name: 'Début saison des baleines', date: 'Mi-mai à novembre', city: 'Toute la côte est', location: 'Pat Morton Lookout, Cape Byron Lighthouse', hours: 'Toute la journée', description: 'Les baleines à bosse commencent leur migration vers le nord. Observation gratuite depuis la côte.', price: 'Gratuit (depuis la côte)', type: 'nature', officialUrl: 'https://www.visitnsw.com/things-to-do/nature-and-parks/whale-watching', image: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=300&h=200&fit=crop', mustSee: true, lat: -28.7990, lng: 153.5900 },
  { name: 'Sunset Cinema Byron Bay', date: 'Mai (vérifier dates)', city: 'Byron Bay', location: 'Byron Bay Recreation Grounds', hours: '19h00-22h00', description: 'Cinéma en plein air sur la plage — films indépendants et classiques', price: '$18-25', type: 'festival', officialUrl: 'https://www.sunsetcinema.com.au/byron-bay', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300&h=200&fit=crop', mustSee: false, lat: -28.6437, lng: 153.6120 },
]

export const pois: POI[] = [
  // Aéroports
  { name: 'Sydney Airport (SYD)', lat: -33.9461, lng: 151.1772, category: 'airport', description: 'Aéroport de départ' },
  { name: 'Gold Coast Airport (OOL)', lat: -28.1644, lng: 153.5047, category: 'airport', description: 'Aéroport côte est sud' },
  { name: 'Proserpine Airport (PPP)', lat: -20.4950, lng: 148.5520, category: 'airport', description: 'Whitsunday Coast Airport' },
  // Essence
  { name: 'BP Burleigh Heads', lat: -28.0900, lng: 153.4400, category: 'fuel', description: 'Station essence Gold Coast' },
  { name: 'Caltex Byron Bay', lat: -28.6500, lng: 153.6100, category: 'fuel', description: 'Station essence Byron Bay' },
  { name: 'Shell Ballina', lat: -28.8660, lng: 153.5660, category: 'fuel', description: 'Station essence Ballina' },
  { name: '7-Eleven Airlie Beach', lat: -20.2700, lng: 148.7190, category: 'fuel', description: 'Station essence Airlie Beach' },
  // Hébergement
  { name: 'BIG4 Gold Coast', lat: -28.0750, lng: 153.4300, category: 'accommodation', description: 'Holiday Park — Van camping $40-55/nuit' },
  { name: 'Broken Head Holiday Park', lat: -28.7100, lng: 153.5800, category: 'accommodation', description: 'Camping Byron sud — $40-55/nuit' },
  { name: 'First Sun Byron Bay', lat: -28.6430, lng: 153.6130, category: 'accommodation', description: 'Holiday Park central — $50-70/nuit' },
  { name: 'Nomads Airlie Beach', lat: -20.2690, lng: 148.7180, category: 'accommodation', description: 'Hostel — $65-110/nuit chambre double' },
  // Spots incontournables
  { name: 'Cape Byron Lighthouse', lat: -28.6383, lng: 153.6389, category: 'must-see', description: 'Point le plus à l\'est de l\'Australie' },
  { name: 'Whitehaven Beach', lat: -20.2827, lng: 149.0370, category: 'must-see', description: 'Plus belle plage du monde — sable blanc 98% silice' },
  { name: 'Heart Reef', lat: -19.7260, lng: 149.2450, category: 'must-see', description: 'Récif en forme de coeur — visible uniquement en vol' },
  // Location van
  { name: 'Jucy — Gold Coast Airport', lat: -28.1644, lng: 153.5047, category: 'van-rental', description: 'Location de campervans Jucy' },
  { name: 'Spaceships — Brisbane', lat: -27.4698, lng: 153.0251, category: 'van-rental', description: 'Location de campervans Spaceships' },
  // Avertissements
  { name: 'Zone méduses (stingers)', lat: -20.2000, lng: 148.8000, category: 'warning', description: 'Saison des méduses jusqu\'à fin avril. Combinaison anti-méduses fournie sur les tours.' },
  { name: 'Crocodiles — ne pas nager', lat: -20.0000, lng: 148.7000, category: 'warning', description: 'Zone de crocodiles d\'eau salée. Ne jamais nager dans les rivières ou mangroves.' },
]
