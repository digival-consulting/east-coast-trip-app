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
  region: 'byron' | 'brisbane' | 'whitsundays' | 'transit'
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
  departure: string
  price: number
  duration: string
  baggageIncluded: boolean
  bookingUrl: string
}

// Dates cibles : SYD→GC = 1 mai, GC→PPP = 8 mai, PPP→SYD = 11 mai
// Plage affichee : ±3 jours autour de chaque date cible

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
    image: '/trip-east-coast/images/burleigh-heads.png',
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
    image: '/trip-east-coast/images/springbrook.png',
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
    image: '/trip-east-coast/images/byron-bay.png',
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
    image: '/trip-east-coast/images/nimbin.png',
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
    image: '/trip-east-coast/images/crystal-castle.png',
    description: 'Jardins zen avec cristaux géants et vue sur l\'hinterland.',
    lat: -28.5500, lng: 153.4800,
    activities: [
      { name: 'Crystal Castle & Shambhala Gardens', description: 'Cristaux d\'améthyste géants, Bouddha, jardins tropicaux zen', priceLow: 35, priceMid: 37, priceHigh: 39, type: 'activity', included: true, url: 'https://crystalcastle.com.au', warning: 'Réserver en ligne obligatoire. Fermé les jours de forte pluie.' },
      { name: 'Mullumbimby town', description: 'Village bohème avec cafés bio et boutiques artisanales', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'culture', included: false, url: 'https://www.discovermullumbimby.com.au' },
    ]
  },
  {
    id: 'cabarita', name: 'Cabarita Beach / Kingscliff', region: 'byron',
    image: '/trip-east-coast/images/cabarita-beach.png',
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
    image: '/trip-east-coast/images/lennox-head.png',
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
    id: 'brisbane', name: 'Brisbane', region: 'brisbane',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Brisbane_CBD_skyline_from_Kangaroo_Point_at_sunset%2C_June_2021.jpg/1280px-Brisbane_CBD_skyline_from_Kangaroo_Point_at_sunset%2C_June_2021.jpg',
    description: 'Capitale du Queensland. Escale stratégique entre Byron et les Whitsundays. Point de départ optionnel pour Fraser Island (K\'gari).',
    lat: -27.4698, lng: 153.0251,
    activities: [
      { name: 'South Bank Parklands', description: 'Parc urbain avec Streets Beach (seule plage artificielle de centre-ville en Australie), piscines gratuites', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'free', included: true, url: 'https://www.visitbrisbane.com.au/south-bank' },
      { name: 'Story Bridge Climb', description: 'Ascension guidée du pont emblématique de Brisbane, vue 360° sur la ville', priceLow: 129, priceMid: 149, priceHigh: 179, type: 'activity', included: false, url: 'https://www.storybridgeadventureclimb.com.au', warning: 'Réserver en ligne. Créneau coucher de soleil très prisé.' },
      { name: 'Mt Coot-tha Lookout', description: 'Belvédère avec vue panoramique sur Brisbane et la baie de Moreton', priceLow: 0, priceMid: 0, priceHigh: 0, type: 'hike', included: true, url: 'https://www.visitbrisbane.com.au/mount-coot-tha' },
      { name: 'Lone Pine Koala Sanctuary', description: 'Plus vieux sanctuaire de koalas au monde, possibilité de tenir un koala', priceLow: 49, priceMid: 52, priceHigh: 55, type: 'activity', included: false, url: 'https://lonepinekoalasanctuary.com' },
      { name: 'Fortitude Valley / James Street', description: 'Quartier branché pour dîner et sortir, street art et restaurants', priceLow: 0, priceMid: 25, priceHigh: 50, type: 'food', included: false, url: 'https://www.visitbrisbane.com.au/fortitude-valley' },
      { name: '(Option) Fraser Island — Cool Dingo 2j/1n', description: 'Tour Fraser Island en 4x4 depuis Rainbow Beach ou Hervey Bay : Lake McKenzie, Maheno, Eli Creek, Champagne Pools', priceLow: 449, priceMid: 549, priceHigh: 649, type: 'activity', included: false, url: 'https://www.cooldingotour.com', warning: 'Tour optionnel. Nécessite 2 jours + transport bus Greyhound. Réserver 2 semaines avant.' },
    ]
  },
  {
    id: 'airlie', name: 'Airlie Beach', region: 'whitsundays',
    image: '/trip-east-coast/images/airlie-beach.png',
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
    image: '/trip-east-coast/images/whitehaven-aerial.png',
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
    image: '/trip-east-coast/images/great-barrier-reef.png',
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
  { day: 1, date: '30 avr', title: 'Sydney → Gold Coast', cityId: 'gold-coast', caption: 'Vue aérienne de Burleigh Heads et de son headland emblématique',
    highlights: [
      { time: '7h00-9h30', name: 'Vol aller Sydney → Gold Coast (Jetstar)', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Sydney_Airport.JPG', url: 'https://www.jetstar.com' },
      { time: '10h30-11h30', name: 'Récupération du campervan (Camplify)', image: 'https://storage.googleapis.com/jucy-chilwa-prod-57ad03.appspot.com/Image/623cbb93_59fe_4073_9b15_dc3d44ab4438_ca591bd595/623cbb93_59fe_4073_9b15_dc3d44ab4438_ca591bd595.jpg', url: 'https://www.camplify.com.au' },
      { time: '12h00-13h30', name: 'Burleigh Heads National Park', image: '/trip-east-coast/images/burleigh-heads.png', url: 'https://parks.des.qld.gov.au/parks/burleigh-head' },
      { time: '14h00-15h30', name: 'Tallebudgera Creek — baignade', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Tallebudgera_Creek_and_mouth_with_Burleigh_headland_on_the_left.jpg', url: 'https://www.goldcoast.com.au/things-to-do/tallebudgera-creek' },
    ], overnight: 'BIG4 Gold Coast Holiday Park', overnightUrl: 'https://www.big4.com.au/caravan-parks/qld/gold-coast/gold-coast-holiday-park', driveKm: 0 },
  { day: 2, date: '1 mai', title: 'Hinterland → Byron Bay', cityId: 'springbrook', caption: 'Natural Bridge : la grotte aux vers luisants de Springbrook National Park',
    highlights: [
      { time: '8h00-10h00', name: 'Natural Bridge (Springbrook)', image: '/trip-east-coast/images/springbrook.png', url: 'https://parks.des.qld.gov.au/parks/springbrook' },
      { time: '10h30-11h30', name: 'Best of All Lookout', image: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Best_Of_All_Lookout_Springbrook_National_Park.JPG', url: 'https://parks.des.qld.gov.au/parks/springbrook' },
      { time: '12h00-14h00', name: 'Route vers Byron Bay (1h30)', image: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Gold_Coast_Highway_over_Tallebudgera_Creek.JPG', url: '' },
      { time: '16h00-18h00', name: 'Sunset à The Pass, Byron Bay', image: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Byron_Bay_Main_Beach_Sunset.jpg', url: 'https://www.visitbyronbay.com' },
    ], overnight: 'Broken Head Holiday Park', overnightUrl: 'https://www.brokenheadholidaypark.com.au', driveKm: 130 },
  { day: 3, date: '2 mai', title: 'Byron Bay', cityId: 'byron-bay', caption: 'Le phare de Cape Byron au lever du soleil — point le plus à l\'est de l\'Australie',
    highlights: [
      { time: '6h30-8h00', name: 'Cape Byron Lighthouse walk', image: '/trip-east-coast/images/byron-bay.png', url: 'https://www.nationalparks.nsw.gov.au/things-to-do/walking-tracks/cape-byron-walking-track' },
      { time: '9h00-11h00', name: 'Cours de surf 2h', image: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Clarkes_Beach.jpg', url: 'https://mojosurf.com/byron-bay' },
      { time: '14h00-16h30', name: 'Kayak avec dauphins', image: 'https://wildbyron.com.au/wp-content/uploads/2022/02/whale-watching-close-photo.jpg', url: 'https://www.capebayronkayaks.com' },
      { time: '17h00-18h30', name: 'Coucher de soleil Main Beach', image: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Byron_Bay_Main_Beach_Sunset.jpg', url: '' },
    ], overnight: 'First Sun Holiday Park Byron Bay', overnightUrl: 'https://www.firstsunholidaypark.com.au', driveKm: 15 },
  { day: 4, date: '3 mai', title: 'Nimbin & Cascades', cityId: 'nimbin', caption: 'Nimbin : murales psychédéliques et ambiance hippie sur la rue principale',
    highlights: [
      { time: '8h30-10h30', name: 'Route vers Nimbin + visite village', image: '/trip-east-coast/images/nimbin.png', url: 'https://www.visitnimbin.com.au' },
      { time: '11h00-12h30', name: 'Minyon Falls — randonnée', image: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Minyon_Falls.jpg', url: 'https://www.nationalparks.nsw.gov.au/things-to-do/lookouts/minyon-falls-lookout' },
      { time: '13h00-14h00', name: 'Protesters Falls', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Protestors_Falls_-_panoramio.jpg', url: 'https://www.nationalparks.nsw.gov.au/things-to-do/walking-tracks/protesters-falls-walk' },
      { time: '15h00-16h00', name: 'Bangalow — café et village', image: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Byron_Street%2C_Bangalow_NSW_2014.jpg', url: 'https://www.bangalowmarket.com.au' },
    ], overnight: 'First Sun Holiday Park Byron Bay', overnightUrl: 'https://www.firstsunholidaypark.com.au', driveKm: 140 },
  { day: 5, date: '4 mai', title: 'Crystal Castle & Plages', cityId: 'crystal-castle', caption: 'Les cristaux d\'améthyste géants du Crystal Castle dans les jardins tropicaux',
    highlights: [
      { time: '9h00-12h00', name: 'Crystal Castle & Shambhala Gardens', image: '/trip-east-coast/images/crystal-castle.png', url: 'https://crystalcastle.com.au' },
      { time: '13h00-15h00', name: 'Cabarita Beach — surf et détente', image: '/trip-east-coast/images/cabarita-beach.png', url: '' },
      { time: '16h00-17h30', name: 'Fingal Head Lighthouse — colonnes de basalte', image: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Basalt_columns%2C_Fingal_Head%2C_New_South_Wales.jpg', url: '' },
    ], overnight: 'Kingscliff Beach Holiday Park', overnightUrl: 'https://www.kingscliffbeachholidaypark.com.au', driveKm: 90 },
  { day: 6, date: '5 mai', title: 'Lennox Head & Côte sud', cityId: 'lennox', caption: 'Vue spectaculaire depuis Pat Morton Lookout sur Seven Mile Beach',
    highlights: [
      { time: '8h30-9h30', name: 'Pat Morton Lookout', image: '/trip-east-coast/images/lennox-head.png', url: '' },
      { time: '10h00-12h00', name: 'Lake Ainsworth — baignade tea-tree', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Lake_Ainsworth_-_panoramio.jpg', url: '' },
      { time: '13h00-15h00', name: 'Lennox Head surf', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Snapper_Rocks%2C_Coolangatta%2C_Australia_%28Unsplash%29.jpg', url: '' },
      { time: '15h30-17h00', name: 'Seven Mile Beach — promenade', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/2020-12-20_Cabarita_Beach.jpg', url: '' },
    ], overnight: 'Lennox Head Reflections Holiday Park', overnightUrl: 'https://www.reflectionsholidayparks.com.au/park/lennox-head', driveKm: 70 },
  { day: 7, date: '6 mai', title: 'Brisbane demi-journée', cityId: 'brisbane', caption: 'Skyline de Brisbane au coucher du soleil vue depuis Kangaroo Point',
    highlights: [
      { time: '9h00-11h00', name: 'Route Lennox → Brisbane (2h30)', image: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Gold_Coast_Highway_over_Tallebudgera_Creek.JPG', url: '' },
      { time: '12h00-14h00', name: 'South Bank Parklands + Streets Beach', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Brisbane_CBD_skyline_from_Kangaroo_Point_at_sunset%2C_June_2021.jpg/1280px-Brisbane_CBD_skyline_from_Kangaroo_Point_at_sunset%2C_June_2021.jpg', url: 'https://www.visitbrisbane.com.au/south-bank' },
      { time: '14h30-16h00', name: 'Mt Coot-tha Lookout', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Brisbane_CBD_skyline_from_Kangaroo_Point_at_sunset%2C_June_2021.jpg/1280px-Brisbane_CBD_skyline_from_Kangaroo_Point_at_sunset%2C_June_2021.jpg', url: 'https://www.visitbrisbane.com.au/mount-coot-tha' },
      { time: '18h00-20h00', name: 'Dîner Fortitude Valley', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Brisbane_CBD_skyline_from_Kangaroo_Point_at_sunset%2C_June_2021.jpg/1280px-Brisbane_CBD_skyline_from_Kangaroo_Point_at_sunset%2C_June_2021.jpg', url: 'https://www.visitbrisbane.com.au/fortitude-valley' },
    ], overnight: 'Camping Brisbane (van)', overnightUrl: 'https://www.bigbrisbanetouristpark.com.au', driveKm: 180 },
  { day: 8, date: '7 mai', title: '(Option) Fraser Island — Transit', cityId: 'brisbane', caption: 'Rainbow Beach : point de départ du tour Cool Dingo vers Fraser Island',
    highlights: [
      { time: '7h00-11h00', name: '(Option) Bus Greyhound Brisbane → Rainbow Beach', image: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Gold_Coast_Highway_over_Tallebudgera_Creek.JPG', url: 'https://www.greyhound.com.au' },
      { time: '12h00-13h30', name: '(Option) Check-in Cool Dingo tour', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Lake_Mckenzie_Fraser_Island.jpg/1280px-Lake_Mckenzie_Fraser_Island.jpg', url: 'https://www.cooldingotour.com' },
      { time: '14h00-17h00', name: '(Alternative) Journée chill Brisbane — Lone Pine', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Brisbane_CBD_skyline_from_Kangaroo_Point_at_sunset%2C_June_2021.jpg/1280px-Brisbane_CBD_skyline_from_Kangaroo_Point_at_sunset%2C_June_2021.jpg', url: 'https://lonepinekoalasanctuary.com' },
    ], overnight: 'Kingfisher Bay Resort (option) / Camping Brisbane', overnightUrl: 'https://www.kingfisherbay.com', driveKm: 0 },
  { day: 9, date: '8 mai', title: '(Option) Fraser Jour 1 — Lake McKenzie', cityId: 'brisbane', caption: 'Lake McKenzie : eau turquoise et sable de silice pure sur Fraser Island',
    highlights: [
      { time: '8h00-10h30', name: '(Option) Lake McKenzie — baignade eau douce', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Lake_Mckenzie_Fraser_Island.jpg/1280px-Lake_Mckenzie_Fraser_Island.jpg', url: 'https://www.cooldingotour.com' },
      { time: '11h00-13h00', name: '(Option) Central Station — forêt tropicale', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Lake_Mckenzie_Fraser_Island.jpg/1280px-Lake_Mckenzie_Fraser_Island.jpg', url: '' },
      { time: '14h30-17h00', name: '(Alternative) Brisbane — South Bank + shopping Queen St', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Brisbane_CBD_skyline_from_Kangaroo_Point_at_sunset%2C_June_2021.jpg/1280px-Brisbane_CBD_skyline_from_Kangaroo_Point_at_sunset%2C_June_2021.jpg', url: '' },
    ], overnight: 'Eurong Beach Resort (option) / Camping Brisbane', overnightUrl: 'https://www.eurong.com.au', driveKm: 0 },
  { day: 10, date: '9 mai', title: '(Option) Fraser Jour 2 — Maheno & Eli Creek', cityId: 'brisbane', caption: 'L\'épave du SS Maheno sur 75 Mile Beach, Fraser Island',
    highlights: [
      { time: '8h00-10h00', name: '(Option) SS Maheno wreck + 75 Mile Beach', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Maheno_Shipwreck_Fraser_Island.jpg/1280px-Maheno_Shipwreck_Fraser_Island.jpg', url: '' },
      { time: '10h30-12h00', name: '(Option) Eli Creek — ruisseau cristallin', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Maheno_Shipwreck_Fraser_Island.jpg/1280px-Maheno_Shipwreck_Fraser_Island.jpg', url: '' },
      { time: '13h00-15h00', name: '(Option) Champagne Pools', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Maheno_Shipwreck_Fraser_Island.jpg/1280px-Maheno_Shipwreck_Fraser_Island.jpg', url: '' },
      { time: '16h00-19h00', name: '(Option) Retour bus Rainbow Beach → Brisbane', image: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Gold_Coast_Highway_over_Tallebudgera_Creek.JPG', url: 'https://www.greyhound.com.au' },
    ], overnight: 'Camping Brisbane (van)', overnightUrl: 'https://www.bigbrisbanetouristpark.com.au', driveKm: 0 },
  { day: 11, date: '10 mai', title: 'Retour Gold Coast — rendu van', cityId: 'gold-coast', caption: 'Snapper Rocks et Rainbow Bay — dernière session surf avant le vol',
    highlights: [
      { time: '9h00-11h00', name: 'Route Brisbane → Gold Coast (1h)', image: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Gold_Coast_Highway_over_Tallebudgera_Creek.JPG', url: '' },
      { time: '11h30-13h00', name: 'Dernière session surf Snapper Rocks', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Snapper_Rocks%2C_Coolangatta%2C_Australia_%28Unsplash%29.jpg', url: '' },
      { time: '14h00-15h00', name: 'Rendu du campervan Camplify', image: 'https://storage.googleapis.com/jucy-chilwa-prod-57ad03.appspot.com/Image/623cbb93_59fe_4073_9b15_dc3d44ab4438_ca591bd595/623cbb93_59fe_4073_9b15_dc3d44ab4438_ca591bd595.jpg', url: 'https://www.camplify.com.au' },
      { time: '16h00-18h00', name: 'Transfert Gold Coast → Brisbane (train)', image: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Gold_Coast_Highway_over_Tallebudgera_Creek.JPG', url: 'https://translink.com.au' },
    ], overnight: 'Hostel Brisbane aéroport', overnightUrl: '', driveKm: 100 },
  { day: 12, date: '11 mai', title: 'Vol Brisbane → Whitsundays', cityId: 'airlie', caption: 'L\'Airlie Beach Lagoon : piscine tropicale gratuite face à la marina',
    highlights: [
      { time: '8h00-9h30', name: 'Vol Brisbane → Proserpine', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Sydney_Airport.JPG', url: 'https://www.jetstar.com' },
      { time: '10h00-11h00', name: 'Shuttle aéroport → Airlie Beach', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Airlie_Beach_Lagoon.JPG', url: 'https://www.whitsundaytransit.com.au' },
      { time: '12h00-14h00', name: 'Airlie Beach Lagoon', image: '/trip-east-coast/images/airlie-beach.png', url: 'https://www.airliebeach.com/things-to-do/airlie-beach-lagoon' },
      { time: '18h00-20h00', name: 'Briefing PADI Open Water', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Airlie_Beach_Lagoon.JPG', url: 'https://redcatadventures.com.au' },
    ], overnight: 'Nomads Airlie Beach', overnightUrl: 'https://nomadsworld.com/australia/airlie-beach', driveKm: 0 },
  { day: 13, date: '12 mai', title: 'Whitehaven Beach', cityId: 'whitsundays', caption: 'Vue aérienne de Hill Inlet — le sable blanc et l\'eau turquoise des Whitsundays',
    highlights: [
      { time: '7h30-17h00', name: 'Ocean Rafting full day — Hill Inlet + Whitehaven + snorkel', image: '/trip-east-coast/images/whitehaven-aerial.png', url: 'https://www.oceanrafting.com.au' },
    ], overnight: 'Nomads Airlie Beach', overnightUrl: 'https://nomadsworld.com/australia/airlie-beach', driveKm: 0 },
  { day: 14, date: '13 mai', title: 'PADI Jour 1 — Théorie & confined', cityId: 'airlie', caption: 'Centre de plongée PADI à Airlie Beach : théorie et piscine',
    highlights: [
      { time: '8h00-12h00', name: 'Théorie PADI + vidéos', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Airlie_Beach_Lagoon.JPG', url: 'https://redcatadventures.com.au' },
      { time: '13h00-17h00', name: 'Confined water — exercices piscine', image: '/trip-east-coast/images/great-barrier-reef.png', url: 'https://redcatadventures.com.au' },
    ], overnight: 'Nomads Airlie Beach', overnightUrl: 'https://nomadsworld.com/australia/airlie-beach', driveKm: 0 },
  { day: 15, date: '14 mai', title: 'PADI Jour 2 — Liveaboard', cityId: 'gbr', caption: 'Liveaboard sur la Grande Barrière de Corail — plongées de certification',
    highlights: [
      { time: '7h00-20h00', name: 'Départ liveaboard — 2 plongées certification', image: '/trip-east-coast/images/great-barrier-reef.png', url: 'https://redcatadventures.com.au' },
      { time: '20h00-22h00', name: 'Nuit à bord sous les étoiles', image: '/trip-east-coast/images/great-barrier-reef.png', url: '' },
    ], overnight: 'Liveaboard (nuit à bord)', overnightUrl: 'https://redcatadventures.com.au', driveKm: 0 },
  { day: 16, date: '15 mai', title: 'PADI Jour 3 & Vol Heart Reef', cityId: 'gbr', caption: 'Heart Reef vu du ciel — le récif en forme de coeur iconique',
    highlights: [
      { time: '7h00-12h00', name: '2 plongées finales + certification PADI Open Water', image: '/trip-east-coast/images/great-barrier-reef.png', url: 'https://redcatadventures.com.au' },
      { time: '14h00-15h00', name: 'Retour Airlie Beach', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Airlie_Beach_Lagoon.JPG', url: '' },
      { time: '16h00-17h00', name: 'Vol panoramique Heart Reef', image: '/trip-east-coast/images/helicopter-whitsundays.png', url: 'https://www.gslaviation.com.au' },
    ], overnight: 'Nomads Airlie Beach', overnightUrl: 'https://nomadsworld.com/australia/airlie-beach', driveKm: 0 },
  { day: 17, date: '16 mai', title: 'Vol retour Sydney', cityId: 'airlie', caption: 'Fin du trip — vol Proserpine → Sydney, retour à la maison',
    highlights: [
      { time: '9h00-10h00', name: 'Shuttle → aéroport Proserpine', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Airlie_Beach_Lagoon.JPG', url: 'https://www.whitsundaytransit.com.au' },
      { time: '11h00-13h30', name: 'Vol Proserpine → Sydney', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Sydney_Airport.JPG', url: 'https://www.jetstar.com' },
    ], overnight: '—', overnightUrl: '', driveKm: 0 },
]

// Generateur de vols : ±3 jours autour de la date cible, horaires realistes, prix variables
type FlightTemplate = { airline: string; from: string; to: string; segment: Flight['segment']; duration: string; baggageIncluded: boolean; bookingUrl: string; departures: string[]; basePrice: number; targetDateIdx: number }

const segmentDates: Record<string, string[]> = {
  'syd-gc': ['27 avr', '28 avr', '29 avr', '30 avr', '1 mai', '2 mai', '3 mai'],
  'gc-ppp': ['8 mai', '9 mai', '10 mai', '11 mai', '12 mai', '13 mai', '14 mai'],
  'ppp-syd': ['13 mai', '14 mai', '15 mai', '16 mai', '17 mai', '18 mai', '19 mai'],
}
export const segmentTargetDates: Record<string, string> = { 'syd-gc': '30 avr', 'gc-ppp': '11 mai', 'ppp-syd': '16 mai' }

const templates: FlightTemplate[] = [
  // SYD → GC
  { airline: 'Jetstar', from: 'Sydney (SYD)', to: 'Gold Coast (OOL)', segment: 'syd-gc', duration: '1h25', baggageIncluded: false, bookingUrl: 'https://www.jetstar.com', departures: ['06:00', '10:30', '15:00', '19:30'], basePrice: 49, targetDateIdx: 3 },
  { airline: 'Virgin Australia', from: 'Sydney (SYD)', to: 'Gold Coast (OOL)', segment: 'syd-gc', duration: '1h25', baggageIncluded: true, bookingUrl: 'https://www.virginaustralia.com', departures: ['07:15', '12:00', '17:30'], basePrice: 79, targetDateIdx: 3 },
  { airline: 'Qantas', from: 'Sydney (SYD)', to: 'Gold Coast (OOL)', segment: 'syd-gc', duration: '1h25', baggageIncluded: true, bookingUrl: 'https://www.qantas.com', departures: ['08:00', '13:30', '18:00'], basePrice: 99, targetDateIdx: 3 },
  // GC → PPP
  { airline: 'Jetstar', from: 'Brisbane (BNE)', to: 'Proserpine (PPP)', segment: 'gc-ppp', duration: '1h30', baggageIncluded: false, bookingUrl: 'https://www.jetstar.com', departures: ['07:00', '14:00'], basePrice: 69, targetDateIdx: 3 },
  { airline: 'Virgin Australia', from: 'Brisbane (BNE)', to: 'Proserpine (PPP)', segment: 'gc-ppp', duration: '1h20', baggageIncluded: true, bookingUrl: 'https://www.virginaustralia.com', departures: ['08:30', '16:00'], basePrice: 89, targetDateIdx: 3 },
  { airline: 'Qantas', from: 'Brisbane (BNE)', to: 'Proserpine (PPP)', segment: 'gc-ppp', duration: '1h20', baggageIncluded: true, bookingUrl: 'https://www.qantas.com', departures: ['09:00'], basePrice: 129, targetDateIdx: 3 },
  // PPP → SYD
  { airline: 'Jetstar', from: 'Proserpine (PPP)', to: 'Sydney (SYD)', segment: 'ppp-syd', duration: '2h15', baggageIncluded: false, bookingUrl: 'https://www.jetstar.com', departures: ['08:00', '15:30'], basePrice: 89, targetDateIdx: 3 },
  { airline: 'Virgin Australia', from: 'Proserpine (PPP)', to: 'Sydney (SYD)', segment: 'ppp-syd', duration: '2h15', baggageIncluded: true, bookingUrl: 'https://www.virginaustralia.com', departures: ['10:00', '17:00'], basePrice: 119, targetDateIdx: 3 },
  { airline: 'Qantas', from: 'Proserpine (PPP)', to: 'Sydney (SYD)', segment: 'ppp-syd', duration: '2h10', baggageIncluded: true, bookingUrl: 'https://www.qantas.com', departures: ['11:30'], basePrice: 149, targetDateIdx: 3 },
]

function generateFlights(): Flight[] {
  const result: Flight[] = []
  for (const t of templates) {
    const dates = segmentDates[t.segment]
    for (let d = 0; d < dates.length; d++) {
      const distFromTarget = Math.abs(d - t.targetDateIdx)
      for (const dep of t.departures) {
        // Prix : plus cher le jour cible, moins cher en s'eloignant. Matin tot/soir tard = moins cher.
        const hour = parseInt(dep.split(':')[0])
        const timeBonus = (hour < 7 || hour >= 18) ? -15 : (hour >= 10 && hour <= 14) ? 10 : 0
        const dateFactor = distFromTarget === 0 ? 1.6 : distFromTarget === 1 ? 1.2 : distFromTarget === 2 ? 0.9 : 0.8
        const price = Math.round(t.basePrice * dateFactor + timeBonus + (Math.random() * 10 - 5))
        result.push({
          airline: t.airline, from: t.from, to: t.to, segment: t.segment,
          date: dates[d], departure: dep, price: Math.max(price, t.basePrice - 10),
          duration: t.duration, baggageIncluded: t.baggageIncluded, bookingUrl: t.bookingUrl,
        })
      }
    }
  }
  return result.sort((a, b) => a.date.localeCompare(b.date) || a.departure.localeCompare(b.departure))
}

export const flights: Flight[] = generateFlights()

export const vehicles: Vehicle[] = [
  { company: 'Jucy', type: 'van', pricePerDay: [65, 95], total7Days: [455, 665], includes: ['Lit 2 places', 'Cuisine (réchaud, frigo)', 'Assurance de base'], pickup: ['Brisbane Airport', 'Gold Coast Airport'], rating: 4, images: ['https://storage.googleapis.com/jucy-chilwa-prod-57ad03.appspot.com/Image/623cbb93_59fe_4073_9b15_dc3d44ab4438_ca591bd595/623cbb93_59fe_4073_9b15_dc3d44ab4438_ca591bd595.jpg', 'https://storage.googleapis.com/jucy-chilwa-prod-57ad03.appspot.com/Image/Condo_Email_Header_ee5e3b8f32/Condo_Email_Header_ee5e3b8f32.png'], bookingUrl: 'https://www.jucy.com.au/campervans/crib' },
  { company: 'Spaceships', type: 'van', pricePerDay: [55, 85], total7Days: [385, 595], includes: ['Lit 2 places', 'Cuisine complète', 'Panneau solaire', 'WiFi'], pickup: ['Brisbane'], rating: 4, images: ['https://spaceshipsrentals.com.au/assets/Uploads/Beta-2S-rear-awning__FocusFillWyIwLjAwIiwiMC4wMCIsMzgwLDI1NF0.jpg', 'https://spaceshipsrentals.com.au/assets/Uploads/Beta-campervan-hero-compare-image__FocusFillWyIwLjAwIiwiMC4wMCIsMzgwLDI1NF0.jpg'], bookingUrl: 'https://www.spaceshipsrentals.com.au' },
  { company: 'Britz', type: 'van', pricePerDay: [80, 120], total7Days: [560, 840], includes: ['Lit 2 places', 'Cuisine', 'Douche extérieure', 'Assurance premium'], pickup: ['Brisbane', 'Gold Coast'], rating: 5, images: ['https://www.campervanfinder.com.au/wp-content/uploads/2014/10/Britz-HiTop-Campervan-2-Berth.jpg', 'https://www.campervanfinder.com.au/wp-content/uploads/2014/10/Britz-HiTop-Campervan-%E2%80%93-2-Berth-Side-View.jpg'], bookingUrl: 'https://www.britz.com.au' },
  { company: 'Wicked Campers', type: 'van', pricePerDay: [45, 75], total7Days: [315, 525], includes: ['Lit 2 places', 'Cuisine basique'], pickup: ['Brisbane', 'Gold Coast'], rating: 3, images: ['https://cdn.wickedcampers.com/au/vehicles/galleries/jfg/1.jpg', 'https://cdn.wickedcampers.com/au/vehicles/galleries/wicked-van-2/1.webp'], bookingUrl: 'https://www.wickedcampers.com.au' },
  { company: 'Travellers Autobarn', type: 'van', pricePerDay: [50, 80], total7Days: [350, 560], includes: ['Lit 2 places', 'Cuisine', 'Kilométrage illimité'], pickup: ['Brisbane', 'Surfers Paradise'], rating: 4, images: ['https://www.travellers-autobarn.com.au/wp-content/uploads/2024/01/AUS-Kuga-Campervan.jpg', 'https://www.travellers-autobarn.com.au/wp-content/uploads/2024/01/AUS-Kuga-Campervan-2.jpg'], bookingUrl: 'https://www.travellers-autobarn.com.au' },
  { company: 'Budget', type: 'car', pricePerDay: [45, 70], total7Days: [315, 490], includes: ['Compact auto', 'Kilométrage illimité', 'Assurance de base'], pickup: ['Brisbane', 'Gold Coast', 'Byron Bay'], rating: 3, images: ['https://files.vroomvroomvroom.com/fleet/AU/BG_CCAR.jpg'], bookingUrl: 'https://www.budget.com.au' },
  { company: 'Hertz', type: 'car', pricePerDay: [50, 80], total7Days: [350, 560], includes: ['Compact/SUV', 'GPS inclus', 'Kilométrage illimité'], pickup: ['Brisbane', 'Gold Coast'], rating: 4, images: ['https://images.hertz.com/vehicles/220x128/ZEAUCCAR999.jpg'], bookingUrl: 'https://www.hertz.com.au' },
  { company: 'Avis', type: 'car', pricePerDay: [55, 85], total7Days: [385, 595], includes: ['Compact/SUV', 'Kilométrage illimité', 'Assistance 24/7'], pickup: ['Brisbane', 'Gold Coast', 'Ballina'], rating: 4, images: ['https://files.vroomvroomvroom.com/fleet/AU/AV_CCAR.jpg'], bookingUrl: 'https://www.avis.com.au' },
  { company: 'Thrifty', type: 'car', pricePerDay: [40, 65], total7Days: [280, 455], includes: ['Compact auto', 'Kilométrage illimité'], pickup: ['Brisbane', 'Gold Coast'], rating: 3, images: ['https://files.vroomvroomvroom.com/fleet/AU/HT_CDAR.jpg'], bookingUrl: 'https://www.thrifty.com.au' },
]

export const events: TripEvent[] = [
  { name: 'Byron Farmers Market', date: '1 mai (jeudi)', city: 'Byron Bay', location: 'Butler Street Reserve, Byron Bay', hours: '7h00-11h00', description: 'Marché fermier local avec producteurs bio de la région', price: 'Gratuit', type: 'market', officialUrl: 'https://www.byronfarmersmarket.com.au', image: 'https://byronfarmersmarket.com.au/wp-content/uploads/2025/12/Fresh-Produce.jpg', mustSee: true, lat: -28.6437, lng: 153.6120 },
  { name: 'Nimbin MardiGrass', date: '2-4 mai (ven-dim)', city: 'Nimbin', location: 'Nimbin Community Centre & rues de Nimbin', hours: '10h00-22h00', description: 'Festival annuel emblématique de Nimbin — musique, parades, culture alternative', price: 'Gratuit', type: 'festival', officialUrl: 'https://www.nimbinmardigrass.com', image: 'https://nimbinmardigrass.com/wp-content/uploads/2025/07/16NimbinMardigrass2025@reelpixs-copy.jpg', mustSee: true, lat: -28.5960, lng: 153.2230 },
  { name: 'Byron Community Market', date: '4 mai (dimanche)', city: 'Byron Bay', location: 'Butler Street Reserve, Byron Bay', hours: '8h00-15h00', description: 'Grand marché artisanal mensuel (1er dimanche du mois)', price: 'Gratuit', type: 'market', officialUrl: 'https://www.byronmarkets.com.au', image: 'https://cdn.prod.website-files.com/632be859f2cd4f7f329317aa/633ce1e396698884ff7cf970_ByronBeachMarkets-HiRez-20201004-101848-KHPphoto.jpg', mustSee: true, lat: -28.6437, lng: 153.6120 },
  { name: 'Byron Farmers Market', date: '8 mai (jeudi)', city: 'Byron Bay', location: 'Butler Street Reserve, Byron Bay', hours: '7h00-11h00', description: 'Marché fermier local avec producteurs bio', price: 'Gratuit', type: 'market', officialUrl: 'https://www.byronfarmersmarket.com.au', image: 'https://byronfarmersmarket.com.au/wp-content/uploads/2025/12/Flowers.jpg', mustSee: false, lat: -28.6437, lng: 153.6120 },
  { name: 'Airlie Beach Markets', date: '10 mai (samedi)', city: 'Airlie Beach', location: 'Airlie Beach Foreshore', hours: '7h00-13h00', description: 'Marché artisanal avec produits locaux et artisanat', price: 'Gratuit', type: 'market', officialUrl: 'https://www.airliebeach.com', image: 'https://assets.atdw-online.com.au/images/9d6e366f2900a238c267dea3fa237091.jpeg', mustSee: false, lat: -20.2690, lng: 148.7180 },
  { name: 'The Channon Market', date: '11 mai (dimanche)', city: 'The Channon (près Nimbin)', location: 'Coronation Park, The Channon', hours: '8h00-14h00', description: 'Marché hippie artisanal dans la forêt (2e dimanche du mois)', price: 'Gratuit', type: 'market', officialUrl: 'https://www.thechannonmarket.org.au', image: 'https://thechannonmarket.org.au/wp-content/uploads/2013/08/slide1.jpg', mustSee: true, lat: -28.6800, lng: 153.2300 },
  { name: 'Début saison des baleines', date: 'Mi-mai à novembre', city: 'Toute la côte est', location: 'Pat Morton Lookout, Cape Byron Lighthouse', hours: 'Toute la journée', description: 'Les baleines à bosse commencent leur migration vers le nord. Observation gratuite depuis la côte.', price: 'Gratuit (depuis la côte)', type: 'nature', officialUrl: 'https://www.visitnsw.com/things-to-do/nature-and-parks/whale-watching', image: 'https://wildbyron.com.au/wp-content/uploads/2022/02/whale-watching-calf-breach.jpg', mustSee: true, lat: -28.7990, lng: 153.5900 },
  { name: 'Sunset Cinema Byron Bay', date: 'Mai (vérifier dates)', city: 'Byron Bay', location: 'Byron Bay Recreation Grounds', hours: '19h00-22h00', description: 'Cinéma en plein air sur la plage — films indépendants et classiques', price: '$18-25', type: 'festival', officialUrl: 'https://www.sunsetcinema.com.au/byron-bay', image: 'https://media.timeout.com/images/106071966/750/422/image.jpg', mustSee: false, lat: -28.6437, lng: 153.6120 },
]

export const pois: POI[] = [
  // Aéroports
  { name: 'Sydney Airport (SYD)', lat: -33.9461, lng: 151.1772, category: 'airport', description: 'Aéroport de départ' },
  { name: 'Gold Coast Airport (OOL)', lat: -28.1644, lng: 153.5047, category: 'airport', description: 'Aéroport côte est sud' },
  { name: 'Proserpine Airport (PPP)', lat: -20.4950, lng: 148.5520, category: 'airport', description: 'Whitsunday Coast Airport' },
  { name: 'Brisbane Airport (BNE)', lat: -27.3942, lng: 153.1218, category: 'airport', description: 'Aéroport principal — vol BNE→PPP J12' },
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
  { name: 'Brisbane — South Bank', lat: -27.4795, lng: 153.0201, category: 'must-see', description: 'Streets Beach, parklands et piétonnier en bord de fleuve' },
  { name: '(Option) Fraser Island — Lake McKenzie', lat: -25.4433, lng: 153.0500, category: 'must-see', description: 'Lac d\'eau douce, sable de silice pure (option J8-J10)' },
  { name: '(Option) Rainbow Beach — départ Fraser', lat: -25.9031, lng: 153.0917, category: 'must-see', description: 'Point de départ bus Greyhound → Fraser Island tour Cool Dingo' },
  // Location van
  { name: 'Jucy — Gold Coast Airport', lat: -28.1644, lng: 153.5047, category: 'van-rental', description: 'Location de campervans Jucy' },
  { name: 'Spaceships — Brisbane', lat: -27.4698, lng: 153.0251, category: 'van-rental', description: 'Location de campervans Spaceships' },
  // Avertissements
  { name: 'Zone méduses (stingers)', lat: -20.2000, lng: 148.8000, category: 'warning', description: 'Saison des méduses jusqu\'à fin avril. Combinaison anti-méduses fournie sur les tours.' },
  { name: 'Crocodiles — ne pas nager', lat: -20.0000, lng: 148.7000, category: 'warning', description: 'Zone de crocodiles d\'eau salée. Ne jamais nager dans les rivières ou mangroves.' },
]
