import React, { useState, useEffect, useMemo } from 'react'
import {
  Waves,
  Compass,
  MapPin,
  Ticket,
  User,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  ChevronRight,
  Search,
  SlidersHorizontal,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Share2,
  Navigation,
  CreditCard,
  Layers,
  Activity,
  Wind,
  Droplets,
  Thermometer,
  RotateCcw,
  RefreshCw,
  Award,
  Wallet,
  Car,
  ChevronLeft,
  X,
  ExternalLink,
  ChevronDown,
  Info,
  Sliders,
  Check,
  Plane,
  Heart,
  ChevronUp,
  Timer,
  Copy,
  CheckCheck
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

// --- DATA TYPES ---
interface Beach {
  id: string
  name: string
  breakName: string
  city: string
  state: string
  region: string
  waveHeight: string
  waveDesc: string
  waveSub: string
  quality: 'GOOD' | 'FAIR-GOOD' | 'FAIR' | 'POOR-FAIR'
  wind: string
  windSub: string
  windMph: number
  tide: string
  tideSub: string
  waterTemp: string
  airTemp: string
  swell: string
  swellSub: string
  swellPeriod: string
  skill: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'
  distance: string
  vanCount: number
  boardCount: number
  image: string
  description: string
  recommendation: string
  bestWindow: string
  bestWindowSub: string
  hourly: {
    time: string
    hourVal: number
    heightFt: number
    heightLabel: string
    periodSec: number
    tideFt: number
    windDir: string
    windSpeed: number
    quality: string
  }[]
  lat: number
  lng: number
}

interface Van {
  id: string
  fleetNumber: string
  nickname: string
  beachId: string
  beachName: string
  spot: string
  status: 'OPEN' | 'TRANSIT' | 'BUSY'
  distance: string
  walkTime: string
  driveTime: string
  hours: string
  boardsAvailable: number
  longboards: number
  midsAndFun: number
  softTops: number
  shortboards: number
  fish: number
  nextLocation?: string
  eta?: string
  waitMin: number
  lat: number
  lng: number
  mapX: number
  mapY: number
  image: string
}

interface Board {
  id: string
  code: string
  name: string
  nickname?: string
  type: 'Longboard' | 'Mid-Length' | 'Funboard' | 'Fish' | 'Shortboard' | 'Soft-Top'
  dimensions: string
  length: string
  width: string
  thickness: string
  volume: string
  finSetup: string
  skill: 'Beginner' | 'Beginner / Intermediate' | 'Intermediate' | 'Advanced' | 'All Levels'
  recommendedWaves: string
  condition: 'Mint' | 'Excellent' | 'Good'
  vanId: string
  vanName: string
  beachId: string
  beachName: string
  availableCount: number
  totalInVan: number
  personality: string
  whyMatch: string
  pricing: {
    twoHours: number
    fourHours: number
    fullDay: number
  }
  deposit: number
  protectionFee: number
  tag: string
  shapeType: 'long' | 'mid' | 'fish' | 'short' | 'soft'
}

interface RentalPass {
  id: string
  boardName: string
  boardCode: string
  boardType: string
  boardDimensions: string
  boardVolume: string
  vanId: string
  vanName: string
  vanNickname: string
  location: string
  spot: string
  startTime: string
  endTime: string
  durationLabel: string
  paymentMethod: 'USDC' | 'BTC' | 'CARD'
  rentalPrice: number
  protection: number
  deposit: number
  depositStatus: 'HELD' | 'REFUNDED'
  status: 'ACTIVE' | 'UPCOMING' | 'COMPLETED'
  txHash?: string
  createdAt: number
  sessionActive?: boolean
}

// --- ACCURATE REGIONAL DESTINATION DATA ---
const BEACHES: Beach[] = [
  {
    id: 'rockaway',
    name: 'Rockaway Beach',
    breakName: 'Beach 90th Street',
    city: 'Queens',
    state: 'NY',
    region: 'New York',
    waveHeight: '2–3 ft',
    waveDesc: 'Knee to waist high',
    waveSub: 'Clean peeling lines',
    quality: 'GOOD',
    wind: 'NW 6 mph offshore',
    windSub: 'Glassy texture',
    windMph: 6,
    tide: 'Rising',
    tideSub: 'Best push around 9–11 AM',
    waterTemp: '68°F',
    airTemp: '74°F',
    swell: 'SE 2.8 ft',
    swellSub: 'Consistent groundswell',
    swellPeriod: '11s',
    skill: 'Intermediate',
    distance: '0.2 mi',
    vanCount: 3,
    boardCount: 22,
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80',
    description: 'Urban beach-break surfing with multiple jetty sandbar peaks and easy boardwalk access from New York City.',
    recommendation: 'Cleanest conditions before the afternoon wind shift. Longboards, classic mid-lengths, and forgiving fish are catching everything on the incoming push.',
    bestWindow: '8:30 AM – 11:30 AM',
    bestWindowSub: 'Cleanest conditions before the afternoon wind shift.',
    hourly: [
      { time: '6 AM', hourVal: 6, heightFt: 2.3, heightLabel: '2.3 ft', periodSec: 11, tideFt: 1.2, windDir: 'NW', windSpeed: 4, quality: 'FAIR-GOOD' },
      { time: '7 AM', hourVal: 7, heightFt: 2.5, heightLabel: '2.5 ft', periodSec: 11, tideFt: 2.1, windDir: 'NW', windSpeed: 5, quality: 'GOOD' },
      { time: '8 AM', hourVal: 8, heightFt: 2.7, heightLabel: '2.7 ft', periodSec: 11, tideFt: 3.2, windDir: 'NW', windSpeed: 6, quality: 'GOOD' },
      { time: '9 AM', hourVal: 9, heightFt: 2.9, heightLabel: '2.9 ft', periodSec: 11, tideFt: 4.1, windDir: 'NW', windSpeed: 6, quality: 'GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 2.8, heightLabel: '2.8 ft', periodSec: 10, tideFt: 4.6, windDir: 'WNW', windSpeed: 7, quality: 'GOOD' },
      { time: '11 AM', hourVal: 11, heightFt: 2.6, heightLabel: '2.6 ft', periodSec: 10, tideFt: 4.8, windDir: 'W', windSpeed: 8, quality: 'FAIR-GOOD' },
      { time: '12 PM', hourVal: 12, heightFt: 2.3, heightLabel: '2.3 ft', periodSec: 9, tideFt: 4.5, windDir: 'WSW', windSpeed: 10, quality: 'FAIR' },
      { time: '1 PM', hourVal: 13, heightFt: 1.9, heightLabel: '1.9 ft', periodSec: 9, tideFt: 3.8, windDir: 'SW', windSpeed: 12, quality: 'FAIR' },
      { time: '2 PM', hourVal: 14, heightFt: 1.6, heightLabel: '1.6 ft', periodSec: 8, tideFt: 2.9, windDir: 'S', windSpeed: 14, quality: 'POOR-FAIR' },
      { time: '3 PM', hourVal: 15, heightFt: 1.5, heightLabel: '1.5 ft', periodSec: 8, tideFt: 2.0, windDir: 'S', windSpeed: 15, quality: 'POOR-FAIR' },
      { time: '4 PM', hourVal: 16, heightFt: 1.4, heightLabel: '1.4 ft', periodSec: 7, tideFt: 1.4, windDir: 'SSE', windSpeed: 14, quality: 'POOR' },
      { time: '5 PM', hourVal: 17, heightFt: 1.3, heightLabel: '1.3 ft', periodSec: 7, tideFt: 1.1, windDir: 'SSE', windSpeed: 13, quality: 'POOR' }
    ],
    lat: 40.5843,
    lng: -73.8164
  },
  {
    id: 'montauk',
    name: 'Montauk - Ditch Plains',
    breakName: 'Ditch Plains Point',
    city: 'Montauk',
    state: 'NY',
    region: 'New York',
    waveHeight: '3–5 ft',
    waveDesc: 'Chest to head high',
    waveSub: 'Long peeling rights & lefts',
    quality: 'GOOD',
    wind: 'NNW 5 mph light offshore',
    windSub: 'Silky smooth surface',
    windMph: 5,
    tide: 'Incoming Mid-Tide',
    tideSub: 'Optimal depth over cobblestone',
    waterTemp: '64°F',
    airTemp: '69°F',
    swell: 'E 3.8 ft',
    swellSub: 'Well-spaced ocean swell',
    swellPeriod: '12s',
    skill: 'Intermediate',
    distance: '118 mi',
    vanCount: 2,
    boardCount: 19,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'Longer peeling waves and classic Long Island cobblestone point-break character framed by dramatic bluffs.',
    recommendation: 'Cobblestone point breaking clean. High-volume mid-lengths and traditional noseriders are gliding through the full section.',
    bestWindow: '8:00 AM – 1:00 PM',
    bestWindowSub: 'Long incoming tide window with sustained groundswell push.',
    hourly: [
      { time: '7 AM', hourVal: 7, heightFt: 3.8, heightLabel: '3.8 ft', periodSec: 12, tideFt: 2.0, windDir: 'NNW', windSpeed: 4, quality: 'GOOD' },
      { time: '8 AM', hourVal: 8, heightFt: 4.2, heightLabel: '4.2 ft', periodSec: 12, tideFt: 2.8, windDir: 'NNW', windSpeed: 5, quality: 'GOOD' },
      { time: '9 AM', hourVal: 9, heightFt: 4.4, heightLabel: '4.4 ft', periodSec: 12, tideFt: 3.5, windDir: 'NW', windSpeed: 5, quality: 'GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 4.1, heightLabel: '4.1 ft', periodSec: 11, tideFt: 3.9, windDir: 'NW', windSpeed: 6, quality: 'GOOD' },
      { time: '11 AM', hourVal: 11, heightFt: 3.8, heightLabel: '3.8 ft', periodSec: 11, tideFt: 4.1, windDir: 'WNW', windSpeed: 7, quality: 'GOOD' },
      { time: '12 PM', hourVal: 12, heightFt: 3.2, heightLabel: '3.2 ft', periodSec: 10, tideFt: 3.8, windDir: 'W', windSpeed: 9, quality: 'FAIR-GOOD' }
    ],
    lat: 41.0484,
    lng: -71.9169
  },
  {
    id: 'asbury-park',
    name: 'Asbury Park',
    breakName: '8th Avenue Jetty',
    city: 'Asbury Park',
    state: 'NJ',
    region: 'New Jersey',
    waveHeight: '2–3 ft',
    waveDesc: 'Knee to waist high',
    waveSub: 'Fun mellow beach break',
    quality: 'FAIR-GOOD',
    wind: 'W 8 mph offshore',
    windSub: 'Crisp offshore grooming',
    windMph: 8,
    tide: 'Outgoing Mid',
    tideSub: 'Peaking on sandbar shelf',
    waterTemp: '69°F',
    airTemp: '76°F',
    swell: 'ESE 2.4 ft',
    swellSub: 'Mid-period windswell blend',
    swellPeriod: '9s',
    skill: 'Beginner',
    distance: '48 mi',
    vanCount: 2,
    boardCount: 15,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'New Jersey boardwalk, historic stone jetties, and classic East Coast beach-town vibe with punchy inside peaks.',
    recommendation: 'Soft waves right next to the 8th Avenue stone jetty. Perfect for high-volume soft-tops and stable logs.',
    bestWindow: '9:00 AM – 11:30 AM',
    bestWindowSub: 'Mid-tide sweet spot before water gets too shallow on the inside bar.',
    hourly: [
      { time: '8 AM', hourVal: 8, heightFt: 2.4, heightLabel: '2.4 ft', periodSec: 9, tideFt: 3.2, windDir: 'W', windSpeed: 8, quality: 'FAIR' },
      { time: '9 AM', hourVal: 9, heightFt: 2.7, heightLabel: '2.7 ft', periodSec: 9, tideFt: 2.9, windDir: 'W', windSpeed: 8, quality: 'FAIR-GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 2.6, heightLabel: '2.6 ft', periodSec: 9, tideFt: 2.2, windDir: 'W', windSpeed: 9, quality: 'FAIR-GOOD' },
      { time: '11 AM', hourVal: 11, heightFt: 2.1, heightLabel: '2.1 ft', periodSec: 8, tideFt: 1.5, windDir: 'WSW', windSpeed: 11, quality: 'FAIR' }
    ],
    lat: 40.2206,
    lng: -74.0007
  },
  {
    id: 'huntington',
    name: 'Huntington Beach',
    breakName: 'HB Pier Southside',
    city: 'Huntington Beach',
    state: 'CA',
    region: 'California',
    waveHeight: '3–5 ft',
    waveDesc: 'Waist to head high',
    waveSub: 'Punchy pier bowls & rights',
    quality: 'GOOD',
    wind: 'NE 4 mph light offshore',
    windSub: 'Glassy morning texture',
    windMph: 4,
    tide: 'Low rising',
    tideSub: 'Gaining push on outer bar',
    waterTemp: '65°F',
    airTemp: '71°F',
    swell: 'SSW 3.8 ft',
    swellSub: 'Southern hemi groundswell',
    swellPeriod: '14s',
    skill: 'Intermediate',
    distance: 'West Coast Market',
    vanCount: 4,
    boardCount: 38,
    image: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&w=1200&q=80',
    description: 'High-energy Southern California beach breaks with iconic pier backdrop and consistent year-round surf culture.',
    recommendation: 'Consistent pier bowls with good shoulder taper. Twin fish and high-performance daily drivers are ripping.',
    bestWindow: '6:30 AM – 10:30 AM',
    bestWindowSub: 'Glassy morning low-tide push right under the south pier runway.',
    hourly: [
      { time: '6 AM', hourVal: 6, heightFt: 3.8, heightLabel: '3.8 ft', periodSec: 14, tideFt: 1.1, windDir: 'NE', windSpeed: 3, quality: 'GOOD' },
      { time: '7 AM', hourVal: 7, heightFt: 4.2, heightLabel: '4.2 ft', periodSec: 14, tideFt: 1.8, windDir: 'NE', windSpeed: 4, quality: 'GOOD' },
      { time: '8 AM', hourVal: 8, heightFt: 4.5, heightLabel: '4.5 ft', periodSec: 14, tideFt: 2.6, windDir: 'ENE', windSpeed: 4, quality: 'GOOD' },
      { time: '9 AM', hourVal: 9, heightFt: 4.1, heightLabel: '4.1 ft', periodSec: 13, tideFt: 3.4, windDir: 'E', windSpeed: 5, quality: 'GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 3.7, heightLabel: '3.7 ft', periodSec: 13, tideFt: 4.0, windDir: 'SE', windSpeed: 7, quality: 'FAIR-GOOD' }
    ],
    lat: 33.6595,
    lng: -117.9988
  },
  {
    id: 'trestles',
    name: 'San Clemente - Lower Trestles',
    breakName: 'Lowers Rivermouth Peak',
    city: 'San Clemente',
    state: 'CA',
    region: 'California',
    waveHeight: '4–6 ft',
    waveDesc: 'Head high to overhead',
    waveSub: 'World-class A-frame perfection',
    quality: 'GOOD',
    wind: 'Calm 2 mph',
    windSub: 'Sheet of pure glass',
    windMph: 2,
    tide: 'Mid incoming',
    tideSub: 'Reef shelf firing on both sides',
    waterTemp: '66°F',
    airTemp: '73°F',
    swell: 'S 4.6 ft',
    swellSub: 'Long-period Pacific groundswell',
    swellPeriod: '16s',
    skill: 'Advanced',
    distance: 'West Coast Market',
    vanCount: 3,
    boardCount: 26,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'World-famous cobblestone skatepark wave with peeling lefts and rippable rights inside San Onofre State Park.',
    recommendation: 'A-frame perfection with wide open faces. Performance shortboards, step-downs, and refined fish are the weapon of choice.',
    bestWindow: '7:00 AM – 11:30 AM',
    bestWindowSub: 'Peak long-period southern groundswell window before sea breeze.',
    hourly: [
      { time: '7 AM', hourVal: 7, heightFt: 5.0, heightLabel: '5.0 ft', periodSec: 16, tideFt: 2.2, windDir: 'Calm', windSpeed: 2, quality: 'GOOD' },
      { time: '8 AM', hourVal: 8, heightFt: 5.4, heightLabel: '5.4 ft', periodSec: 16, tideFt: 2.9, windDir: 'Calm', windSpeed: 2, quality: 'GOOD' },
      { time: '9 AM', hourVal: 9, heightFt: 5.3, heightLabel: '5.3 ft', periodSec: 16, tideFt: 3.6, windDir: 'NE', windSpeed: 3, quality: 'GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 4.8, heightLabel: '4.8 ft', periodSec: 15, tideFt: 4.1, windDir: 'E', windSpeed: 5, quality: 'GOOD' }
    ],
    lat: 33.3853,
    lng: -117.5886
  },
  {
    id: 'cocoa-beach',
    name: 'Cocoa Beach',
    breakName: 'Cocoa Beach Pier',
    city: 'Cocoa Beach',
    state: 'FL',
    region: 'Florida',
    waveHeight: '2–3 ft',
    waveDesc: 'Knee to thigh high',
    waveSub: 'Gentle warm-water peelers',
    quality: 'FAIR-GOOD',
    wind: 'WNW 6 mph offshore',
    windSub: 'Clean offshore texture',
    windMph: 6,
    tide: 'Mid-tide pushing',
    tideSub: 'Riding over shallow outer sandbar',
    waterTemp: '78°F',
    airTemp: '84°F',
    swell: 'E 2.2 ft',
    swellSub: 'Trade swell lines',
    swellPeriod: '9s',
    skill: 'Beginner',
    distance: 'East Coast Market',
    vanCount: 2,
    boardCount: 18,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'Warm-water Florida surf with approachable beach-break conditions and classic Space Coast surf roots.',
    recommendation: 'Gentle peelers next to the pier. Soft-top logs and high-volume gliders will keep you standing all morning.',
    bestWindow: '8:00 AM – 11:00 AM',
    bestWindowSub: 'Morning offshore wind keeping rolling sandbars clean and fun.',
    hourly: [
      { time: '8 AM', hourVal: 8, heightFt: 2.3, heightLabel: '2.3 ft', periodSec: 9, tideFt: 2.4, windDir: 'WNW', windSpeed: 6, quality: 'FAIR' },
      { time: '9 AM', hourVal: 9, heightFt: 2.5, heightLabel: '2.5 ft', periodSec: 9, tideFt: 3.1, windDir: 'NW', windSpeed: 6, quality: 'FAIR-GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 2.4, heightLabel: '2.4 ft', periodSec: 9, tideFt: 3.6, windDir: 'NNW', windSpeed: 8, quality: 'FAIR-GOOD' }
    ],
    lat: 28.3200,
    lng: -80.6076
  },
  {
    id: 'waikiki',
    name: 'Waikiki - Canoes & Queens',
    breakName: 'Canoes Reef Peak',
    city: 'Honolulu',
    state: 'HI',
    region: 'Hawaii',
    waveHeight: '2–4 ft',
    waveDesc: 'Waist to chest high',
    waveSub: 'Endless rolling tropical walls',
    quality: 'GOOD',
    wind: 'ENE 10 mph trades',
    windSub: 'Gentle trade wind texture',
    windMph: 10,
    tide: 'High incoming',
    tideSub: 'Deep enough for 200-yard rides',
    waterTemp: '79°F',
    airTemp: '82°F',
    swell: 'S 3.2 ft',
    swellSub: 'Southern ocean wrap',
    swellPeriod: '13s',
    skill: 'Beginner',
    distance: 'Hawaii Market',
    vanCount: 3,
    boardCount: 34,
    image: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=1200&q=80',
    description: 'Long rolling waves, warm tropical water, and one of the most celebrated and approachable longboard arenas on earth.',
    recommendation: 'Classic rolling South Shore walls. Classic 9’0+ noseriders and easy-gliding cruisers are scoring 200-yard rides.',
    bestWindow: '7:30 AM – 1:00 PM',
    bestWindowSub: 'Sustained southern swell with mellow rolling peelers all morning.',
    hourly: [
      { time: '7 AM', hourVal: 7, heightFt: 3.2, heightLabel: '3.2 ft', periodSec: 13, tideFt: 1.5, windDir: 'ENE', windSpeed: 8, quality: 'GOOD' },
      { time: '8 AM', hourVal: 8, heightFt: 3.5, heightLabel: '3.5 ft', periodSec: 13, tideFt: 2.1, windDir: 'ENE', windSpeed: 9, quality: 'GOOD' },
      { time: '9 AM', hourVal: 9, heightFt: 3.6, heightLabel: '3.6 ft', periodSec: 13, tideFt: 2.6, windDir: 'E', windSpeed: 10, quality: 'GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 3.4, heightLabel: '3.4 ft', periodSec: 13, tideFt: 2.8, windDir: 'E', windSpeed: 11, quality: 'GOOD' }
    ],
    lat: 21.2765,
    lng: -157.8272
  },
  {
    id: 'outer-banks',
    name: 'Outer Banks - Cape Hatteras',
    breakName: 'Cape Point / Buxton',
    city: 'Buxton',
    state: 'NC',
    region: 'North Carolina',
    waveHeight: '3–5 ft',
    waveDesc: 'Chest to head high',
    waveSub: 'Heavy sandbar barrels & walls',
    quality: 'GOOD',
    wind: 'NW 9 mph offshore',
    windSub: 'Hard offshore spray',
    windMph: 9,
    tide: 'Low rising',
    tideSub: 'Deep sandbars creating hollow peaks',
    waterTemp: '71°F',
    airTemp: '77°F',
    swell: 'E 4.1 ft',
    swellSub: 'Raw Atlantic groundswell',
    swellPeriod: '11s',
    skill: 'Intermediate',
    distance: 'East Coast Market',
    vanCount: 2,
    boardCount: 16,
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80',
    description: 'Raw Atlantic power, shifting sandbars, and dramatic lighthouse coastline in the surf heart of North Carolina.',
    recommendation: 'Punchy peaks near the Cape. Twin fins, daily drivers, and step-up shortboards are finding open faces.',
    bestWindow: '7:00 AM – 10:30 AM',
    bestWindowSub: 'Crisp morning offshore winds grooming powerful Atlantic swell.',
    hourly: [
      { time: '7 AM', hourVal: 7, heightFt: 4.2, heightLabel: '4.2 ft', periodSec: 11, tideFt: 1.4, windDir: 'NW', windSpeed: 8, quality: 'GOOD' },
      { time: '8 AM', hourVal: 8, heightFt: 4.5, heightLabel: '4.5 ft', periodSec: 11, tideFt: 2.1, windDir: 'NW', windSpeed: 9, quality: 'GOOD' },
      { time: '9 AM', hourVal: 9, heightFt: 4.3, heightLabel: '4.3 ft', periodSec: 11, tideFt: 2.8, windDir: 'NNW', windSpeed: 10, quality: 'GOOD' }
    ],
    lat: 35.2638,
    lng: -75.5293
  }
]

const VANS: Van[] = [
  {
    id: 'van-12',
    fleetNumber: 'Van #12',
    nickname: 'Rockaway Runner',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    spot: 'Beach 90th Street Boardwalk',
    status: 'OPEN',
    distance: '0.2 mi',
    walkTime: '3 min walk',
    driveTime: '1 min drive',
    hours: '6:00 AM – 7:30 PM',
    boardsAvailable: 8,
    longboards: 3,
    midsAndFun: 3,
    softTops: 2,
    shortboards: 1,
    fish: 1,
    waitMin: 2,
    lat: 40.5841,
    lng: -73.8152,
    mapX: 48,
    mapY: 52,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-07',
    fleetNumber: 'Van #07',
    nickname: 'Boardwalk Cruiser',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    spot: 'Beach 67th Street Subway Lot',
    status: 'OPEN',
    distance: '0.9 mi',
    walkTime: '14 min walk',
    driveTime: '4 min drive',
    hours: '6:30 AM – 7:00 PM',
    boardsAvailable: 9,
    longboards: 4,
    midsAndFun: 2,
    softTops: 3,
    shortboards: 0,
    fish: 0,
    waitMin: 1,
    lat: 40.5902,
    lng: -73.7951,
    mapX: 72,
    mapY: 38,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-19',
    fleetNumber: 'Van #19',
    nickname: 'Montauk Nomad',
    beachId: 'montauk',
    beachName: 'Montauk - Ditch Plains',
    spot: 'Ditch Plains Main Beach Lot',
    status: 'OPEN',
    distance: '118 mi',
    walkTime: 'East End',
    driveTime: '2.5 hrs',
    hours: '6:00 AM – 8:00 PM',
    boardsAvailable: 11,
    longboards: 5,
    midsAndFun: 3,
    softTops: 2,
    shortboards: 1,
    fish: 1,
    waitMin: 3,
    lat: 41.0480,
    lng: -71.9175,
    mapX: 85,
    mapY: 20,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-31',
    fleetNumber: 'Van #31',
    nickname: 'Huntington Nomad',
    beachId: 'huntington',
    beachName: 'Huntington Beach',
    spot: 'PCH & Twin Dolphins Lot',
    status: 'OPEN',
    distance: 'West Coast Market',
    walkTime: 'SoCal Fleet',
    driveTime: 'PCH',
    hours: '6:00 AM – 7:30 PM',
    boardsAvailable: 14,
    longboards: 3,
    midsAndFun: 4,
    softTops: 2,
    shortboards: 3,
    fish: 2,
    waitMin: 1,
    lat: 33.6590,
    lng: -117.9980,
    mapX: 30,
    mapY: 65,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-45',
    fleetNumber: 'Van #45',
    nickname: 'Cocoa Cruiser',
    beachId: 'cocoa-beach',
    beachName: 'Cocoa Beach',
    spot: 'Pier Boardwalk Access',
    status: 'OPEN',
    distance: 'East Coast Market',
    walkTime: 'Florida Fleet',
    driveTime: 'A1A',
    hours: '7:00 AM – 6:30 PM',
    boardsAvailable: 10,
    longboards: 4,
    midsAndFun: 3,
    softTops: 3,
    shortboards: 0,
    fish: 0,
    waitMin: 2,
    lat: 28.3210,
    lng: -80.6080,
    mapX: 60,
    mapY: 80,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-61',
    fleetNumber: 'Van #61',
    nickname: 'Waikiki Nomad',
    beachId: 'waikiki',
    beachName: 'Waikiki - Canoes & Queens',
    spot: 'Kalakaua Avenue & Beachwalk',
    status: 'OPEN',
    distance: 'Hawaii Market',
    walkTime: 'Oahu South Shore',
    driveTime: 'Kalakaua Ave',
    hours: '6:30 AM – 6:30 PM',
    boardsAvailable: 16,
    longboards: 8,
    midsAndFun: 4,
    softTops: 4,
    shortboards: 0,
    fish: 0,
    waitMin: 2,
    lat: 21.2770,
    lng: -157.8280,
    mapX: 20,
    mapY: 85,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80'
  }
]

const BOARDS: Board[] = [
  {
    id: 'board-01',
    code: 'SP-RKW-0092',
    name: "9'0 Dawn Patrol Log",
    nickname: 'Noserider Classic',
    type: 'Longboard',
    dimensions: "9'0 × 22 3/4 × 3",
    length: "9'0",
    width: '22 3/4"',
    thickness: '3"',
    volume: '72 L',
    finSetup: 'Single Fin Box',
    skill: 'Beginner / Intermediate',
    recommendedWaves: '1–3 ft',
    condition: 'Excellent',
    vanId: 'van-12',
    vanName: 'Van #12 — Rockaway Runner',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    availableCount: 3,
    totalInVan: 3,
    personality: 'Easy glide & early wave entry',
    whyMatch: "Small, clean 2-3 ft surf with a rising tide. The 72L volume lets you paddle in early without pushing water.",
    pricing: {
      twoHours: 25,
      fourHours: 38,
      fullDay: 48
    },
    deposit: 50,
    protectionFee: 3,
    tag: 'Best for today',
    shapeType: 'long'
  },
  {
    id: 'board-02',
    code: 'SP-RKW-0074',
    name: "7'2 Sunday Mid",
    nickname: 'Egg Mid-Length',
    type: 'Mid-Length',
    dimensions: "7'2 × 21 1/2 × 2 3/4",
    length: "7'2",
    width: '21 1/2"',
    thickness: '2 3/4"',
    volume: '54 L',
    finSetup: '2+1 Fin Setup',
    skill: 'All Levels',
    recommendedWaves: '2–4 ft',
    condition: 'Mint',
    vanId: 'van-12',
    vanName: 'Van #12 — Rockaway Runner',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    availableCount: 2,
    totalInVan: 3,
    personality: 'Smooth trim with nimble carving',
    whyMatch: "2-3 ft clean lines with push. Mid-length outline gives speed through flat sections while turning easily off the tail.",
    pricing: {
      twoHours: 28,
      fourHours: 40,
      fullDay: 50
    },
    deposit: 50,
    protectionFee: 3,
    tag: 'Surfer Favorite',
    shapeType: 'mid'
  },
  {
    id: 'board-03',
    code: 'SP-RKW-0080',
    name: "8'0 Boardwalk Soft-Top",
    nickname: 'Foam Cruiser',
    type: 'Soft-Top',
    dimensions: "8'0 × 23 × 3 1/4",
    length: "8'0",
    width: '23"',
    thickness: '3 1/4"',
    volume: '82 L',
    finSetup: 'Safe Flexible Thruster',
    skill: 'Beginner',
    recommendedWaves: '1–3 ft',
    condition: 'Excellent',
    vanId: 'van-12',
    vanName: 'Van #12 — Rockaway Runner',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    availableCount: 2,
    totalInVan: 2,
    personality: 'Ultra-stable & ultra-forgiving',
    whyMatch: "High-volume soft construction makes standing up effortless on smaller morning rollers.",
    pricing: {
      twoHours: 24,
      fourHours: 35,
      fullDay: 45
    },
    deposit: 40,
    protectionFee: 3,
    tag: 'Beginner Choice',
    shapeType: 'soft'
  },
  {
    id: 'board-04',
    code: 'SP-RKW-0058',
    name: "5'10 Fast Fish",
    nickname: 'Twin Keel Retro',
    type: 'Fish',
    dimensions: "5'10 × 20 3/4 × 2 1/2",
    length: "5'10",
    width: '20 3/4"',
    thickness: '2 1/2"',
    volume: '34 L',
    finSetup: 'Twin Keel Fins',
    skill: 'Intermediate',
    recommendedWaves: '2–5 ft',
    condition: 'Mint',
    vanId: 'van-12',
    vanName: 'Van #12 — Rockaway Runner',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    availableCount: 1,
    totalInVan: 1,
    personality: 'Fast down the line in small pockets',
    whyMatch: "Generates its own speed in waist-high surf with wide swallow tail drive.",
    pricing: {
      twoHours: 30,
      fourHours: 42,
      fullDay: 54
    },
    deposit: 75,
    protectionFee: 3,
    tag: 'Speed Machine',
    shapeType: 'fish'
  },
  {
    id: 'board-05',
    code: 'SP-RKW-0062',
    name: "6'2 Daily Driver",
    nickname: 'All-Around Shortboard',
    type: 'Shortboard',
    dimensions: "6'2 × 19 3/4 × 2 5/8",
    length: "6'2",
    width: '19 3/4"',
    thickness: '2 5/8"',
    volume: '33 L',
    finSetup: 'Thruster (Tri-Fin)',
    skill: 'Intermediate',
    recommendedWaves: '3–6 ft',
    condition: 'Good',
    vanId: 'van-12',
    vanName: 'Van #12 — Rockaway Runner',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    availableCount: 1,
    totalInVan: 1,
    personality: 'Punchy turns on steeper faces',
    whyMatch: "Best when the sandbar pitches up at peak mid-tide.",
    pricing: {
      twoHours: 30,
      fourHours: 42,
      fullDay: 54
    },
    deposit: 75,
    protectionFee: 3,
    tag: 'Performance',
    shapeType: 'short'
  },
  {
    id: 'board-06',
    code: 'SP-HB-0060',
    name: "6'0 Pocket Rocket",
    nickname: 'Performance Thruster',
    type: 'Shortboard',
    dimensions: "6'0 × 19 1/4 × 2 7/16",
    length: "6'0",
    width: '19 1/4"',
    thickness: '2 7/16"',
    volume: '30 L',
    finSetup: 'FCS II Thruster',
    skill: 'Advanced',
    recommendedWaves: '3–6 ft',
    condition: 'Mint',
    vanId: 'van-31',
    vanName: 'Van #31 — Huntington Nomad',
    beachId: 'huntington',
    beachName: 'Huntington Beach',
    availableCount: 2,
    totalInVan: 3,
    personality: 'Crisp release in the pocket',
    whyMatch: "Built for punchy Huntington pier bowls and steep drops.",
    pricing: {
      twoHours: 32,
      fourHours: 45,
      fullDay: 58
    },
    deposit: 80,
    protectionFee: 4,
    tag: 'SoCal High Performance',
    shapeType: 'short'
  },
  {
    id: 'board-07',
    code: 'SP-WKK-0096',
    name: "9'6 Waikiki Noserider",
    nickname: 'Island Classic Log',
    type: 'Longboard',
    dimensions: "9'6 × 23 1/2 × 3 1/8",
    length: "9'6",
    width: '23 1/2"',
    thickness: '3 1/8"',
    volume: '78 L',
    finSetup: '10" Pivot Single Fin',
    skill: 'All Levels',
    recommendedWaves: '1–4 ft',
    condition: 'Mint',
    vanId: 'van-61',
    vanName: 'Van #61 — Waikiki Nomad',
    beachId: 'waikiki',
    beachName: 'Waikiki - Canoes & Queens',
    availableCount: 4,
    totalInVan: 5,
    personality: 'Hang-ten stability on rolling walls',
    whyMatch: "Deep concave in the nose locks you in for 200-yard Waikiki runners.",
    pricing: {
      twoHours: 26,
      fourHours: 38,
      fullDay: 48
    },
    deposit: 50,
    protectionFee: 3,
    tag: 'Island Standard',
    shapeType: 'long'
  }
]

// --- BOARD SILHOUETTE VECTOR COMPONENT ---
const BoardSilhouette: React.FC<{
  shapeType: 'long' | 'mid' | 'fish' | 'short' | 'soft'
  className?: string
}> = ({ shapeType, className = 'w-16 h-40' }) => {
  if (shapeType === 'long') {
    return (
      <svg viewBox="0 0 100 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="longGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#0284C7" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0369A1" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="longStringer" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>
        </defs>
        <path d="M50 10 C32 20 22 70 22 140 C22 210 30 260 42 272 C46 276 54 276 58 272 C70 260 78 210 78 140 C78 70 68 20 50 10 Z" fill="url(#longGrad)" stroke="#38BDF8" strokeWidth="2" />
        <line x1="50" y1="12" x2="50" y2="272" stroke="url(#longStringer)" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="50" cy="45" r="3" fill="#E0F2FE" opacity="0.8" />
        <path d="M42 260 L50 268 L58 260" stroke="#E0F2FE" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      </svg>
    )
  }
  if (shapeType === 'mid') {
    return (
      <svg viewBox="0 0 100 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="midGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818CF8" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#6366F1" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#4338CA" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path d="M50 12 C30 26 22 75 22 125 C22 175 32 220 44 230 C47 233 53 233 56 230 C68 220 78 175 78 125 C78 75 70 26 50 12 Z" fill="url(#midGrad)" stroke="#818CF8" strokeWidth="2" />
        <line x1="50" y1="14" x2="50" y2="230" stroke="#E0E7FF" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="3.5" fill="#E0E7FF" opacity="0.9" />
      </svg>
    )
  }
  if (shapeType === 'fish') {
    return (
      <svg viewBox="0 0 100 200" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="fishGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#059669" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#047857" stopOpacity="1" />
          </linearGradient>
        </defs>
        {/* Swallow tail */}
        <path d="M50 12 C28 28 20 70 20 115 C20 160 26 182 32 192 L50 178 L68 192 C74 182 80 160 80 115 C80 70 72 28 50 12 Z" fill="url(#fishGrad)" stroke="#34D399" strokeWidth="2" />
        <line x1="50" y1="14" x2="50" y2="178" stroke="#D1FAE5" strokeWidth="1.5" />
        <circle cx="50" cy="45" r="3.5" fill="#D1FAE5" opacity="0.9" />
        {/* Twin keel fin indicators */}
        <line x1="32" y1="165" x2="32" y2="180" stroke="#D1FAE5" strokeWidth="2" strokeLinecap="round" />
        <line x1="68" y1="165" x2="68" y2="180" stroke="#D1FAE5" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
  if (shapeType === 'soft') {
    return (
      <svg viewBox="0 0 100 260" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="softGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#D97706" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path d="M50 10 C30 22 20 70 20 135 C20 200 30 245 42 254 C46 257 54 257 58 254 C70 245 80 200 80 135 C80 70 70 22 50 10 Z" fill="url(#softGrad)" stroke="#FBBF24" strokeWidth="2" />
        <line x1="50" y1="12" x2="50" y2="254" stroke="#FEF3C7" strokeWidth="2" />
        {/* Soft grip crosshatch subtle lines */}
        <line x1="34" y1="80" x2="66" y2="80" stroke="#FEF3C7" strokeWidth="1" opacity="0.6" />
        <line x1="32" y1="120" x2="68" y2="120" stroke="#FEF3C7" strokeWidth="1" opacity="0.6" />
        <line x1="34" y1="160" x2="66" y2="160" stroke="#FEF3C7" strokeWidth="1" opacity="0.6" />
        <line x1="38" y1="200" x2="62" y2="200" stroke="#FEF3C7" strokeWidth="1" opacity="0.6" />
      </svg>
    )
  }
  // Performance shortboard
  return (
    <svg viewBox="0 0 100 210" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shortGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EC4899" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#BE185D" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#9D174D" stopOpacity="1" />
        </linearGradient>
      </defs>
      {/* Pointy nose and squash tail */}
      <path d="M50 8 C32 30 22 75 22 118 C22 162 30 196 44 204 L56 204 C70 196 78 162 78 118 C78 75 68 30 50 8 Z" fill="url(#shortGrad)" stroke="#F472B6" strokeWidth="2" />
      <line x1="50" y1="10" x2="50" y2="204" stroke="#FCE7F3" strokeWidth="1.5" />
      {/* Tail traction pad */}
      <path d="M38 175 L62 175 L59 198 L41 198 Z" fill="#475569" stroke="#94A3B8" strokeWidth="1" opacity="0.85" />
    </svg>
  )
}

export default function App() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'map' | 'rentals' | 'profile'>('home')
  const [selectedBeach, setSelectedBeach] = useState<Beach>(BEACHES[0])
  const [selectedVan, setSelectedVan] = useState<Van>(VANS[0])
  const [selectedBoard, setSelectedBoard] = useState<Board>(BOARDS[0])
  const [showBeachModal, setShowBeachModal] = useState(false)
  const [showVanModal, setShowVanModal] = useState(false)
  const [showBoardModal, setShowBoardModal] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [showPassModal, setShowPassModal] = useState(false)
  const [showInfraModal, setShowInfraModal] = useState(false)
  const [showTravelModal, setShowTravelModal] = useState(false)
  const [showRideRecommender, setShowRideRecommender] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)

  // Explore filters
  const [regionFilter, setRegionFilter] = useState('All')
  const [qualityFilter, setQualityFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [boardTypeFilter, setBoardTypeFilter] = useState('All')

  // Reservation & Checkout State
  const [rentalDuration, setRentalDuration] = useState<2 | 4 | 24>(2)
  const [includeProtection, setIncludeProtection] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState<'USDC' | 'BTC' | 'CARD'>('USDC')
  const [paymentStep, setPaymentStep] = useState<'SELECT' | 'WAITING' | 'DETECTED' | 'CONFIRMING' | 'CONFIRMED'>('SELECT')
  const [paymentTxHash, setPaymentTxHash] = useState<string>('')
  const [expandedOnchainDetails, setExpandedOnchainDetails] = useState(false)

  // Wallet State
  const [walletConnected, setWalletConnected] = useState(true)
  const [walletAddress] = useState('8xF3...9D2b')
  const [walletBalanceUsdc, setWalletBalanceUsdc] = useState(250.00)
  const [walletBalanceSol, setWalletBalanceSol] = useState(1.45)
  const [walletBalanceBtc, setWalletBalanceBtc] = useState(0.0185)

  // Real-time dynamic inventories
  const [boardInventories, setBoardInventories] = useState<Record<string, number>>({
    'board-01': 3,
    'board-02': 2,
    'board-03': 2,
    'board-04': 1,
    'board-05': 1,
    'board-06': 2,
    'board-07': 4
  })

  // Rentals collection
  const [rentals, setRentals] = useState<RentalPass[]>([
    {
      id: 'pass-sample-1',
      boardName: "9'0 Dawn Patrol Log",
      boardCode: 'SP-RKW-0092',
      boardType: 'Longboard',
      boardDimensions: "9'0 × 22 3/4 × 3 (72L)",
      boardVolume: '72 L',
      vanId: 'van-12',
      vanName: 'Van #12',
      vanNickname: 'Rockaway Runner',
      location: 'Rockaway Beach, NY',
      spot: 'Beach 90th Street Boardwalk',
      startTime: '8:30 AM',
      endTime: '10:30 AM',
      durationLabel: '2 Hours',
      paymentMethod: 'USDC',
      rentalPrice: 28,
      protection: 3,
      deposit: 50,
      depositStatus: 'HELD',
      status: 'ACTIVE',
      txHash: '5Kz2...9Lm4 (Solana)',
      createdAt: Date.now() - 3600000,
      sessionActive: true
    }
  ])

  const [activeRentalPass, setActiveRentalPass] = useState<RentalPass | null>(rentals[0])

  // ESC key handler for all modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowBeachModal(false)
        setShowVanModal(false)
        setShowBoardModal(false)
        setShowCheckoutModal(false)
        setShowPassModal(false)
        setShowInfraModal(false)
        setShowTravelModal(false)
        setShowRideRecommender(false)
        setShowWalletModal(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Calculations for current checkout
  const currentRentalCost = useMemo(() => {
    if (!selectedBoard) return 25
    if (rentalDuration === 2) return selectedBoard.pricing.twoHours
    if (rentalDuration === 4) return selectedBoard.pricing.fourHours
    return selectedBoard.pricing.fullDay
  }, [selectedBoard, rentalDuration])

  const protectionTotal = includeProtection ? (selectedBoard?.protectionFee || 3) : 0
  const depositTotal = selectedBoard?.deposit || 50
  const totalAuthorization = currentRentalCost + protectionTotal + depositTotal
  const netRentalCost = currentRentalCost + protectionTotal

  // Filtered beaches for Explore
  const filteredBeaches = useMemo(() => {
    return BEACHES.filter(b => {
      const matchesRegion = regionFilter === 'All' || b.region === regionFilter
      const matchesQuality = qualityFilter === 'All' || b.quality === qualityFilter
      const matchesSearch = searchQuery === '' ||
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.breakName.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesRegion && matchesQuality && matchesSearch
    })
  }, [regionFilter, qualityFilter, searchQuery])

  // Handlers
  const handleConnectWallet = () => {
    setWalletConnected(true)
    setShowWalletModal(false)
  }

  const handleDisconnectWallet = () => {
    setWalletConnected(false)
    setShowWalletModal(false)
  }

  const handleStartCheckout = (board: Board) => {
    setSelectedBoard(board)
    setPaymentStep('SELECT')
    setPaymentTxHash('')
    setExpandedOnchainDetails(false)
    setShowBoardModal(false)
    setShowBeachModal(false)
    setShowVanModal(false)
    setShowRideRecommender(false)
    setShowCheckoutModal(true)
  }

  const handleExecutePayment = () => {
    if (paymentMethod === 'CARD') {
      setPaymentStep('WAITING')
      setTimeout(() => {
        completeReservation('card-auth-demo')
      }, 1200)
    } else {
      // Crypto flow via Tatum: Waiting -> Detected -> Confirming -> Confirmed
      setPaymentStep('WAITING')
      setTimeout(() => {
        setPaymentStep('DETECTED')
        setTimeout(() => {
          setPaymentStep('CONFIRMING')
          setTimeout(() => {
            const fakeTx = paymentMethod === 'USDC' ? '4Zx9...k7Lm (Solana)' : '1Bv8...8Qz2 (Bitcoin)'
            setPaymentTxHash(fakeTx)
            completeReservation(fakeTx)
          }, 1000)
        }, 1100)
      }, 1000)
    }
  }

  const completeReservation = (txHash: string) => {
    setPaymentStep('CONFIRMED')
    
    // Decrement local inventory
    if (selectedBoard) {
      setBoardInventories(prev => ({
        ...prev,
        [selectedBoard.id]: Math.max(0, (prev[selectedBoard.id] || 1) - 1)
      }))
    }

    // Deduct wallet balance if USDC
    if (paymentMethod === 'USDC' && walletConnected) {
      setWalletBalanceUsdc(prev => Math.max(0, prev - totalAuthorization))
    }

    const durationText = rentalDuration === 2 ? '2 Hours' : rentalDuration === 4 ? '4 Hours' : 'Full Day'
    const newPass: RentalPass = {
      id: `SP-PASS-${Math.floor(100000 + Math.random() * 900000)}`,
      boardName: selectedBoard.name,
      boardCode: selectedBoard.code,
      boardType: selectedBoard.type,
      boardDimensions: `${selectedBoard.dimensions} (${selectedBoard.volume})`,
      boardVolume: selectedBoard.volume,
      vanId: selectedVan.id,
      vanName: selectedVan.fleetNumber,
      vanNickname: selectedVan.nickname,
      location: `${selectedBeach.name}, ${selectedBeach.state}`,
      spot: selectedVan.spot,
      startTime: 'Now',
      endTime: rentalDuration === 2 ? 'In 2 Hours' : rentalDuration === 4 ? 'In 4 Hours' : 'End of Day',
      durationLabel: durationText,
      paymentMethod,
      rentalPrice: currentRentalCost,
      protection: protectionTotal,
      deposit: depositTotal,
      depositStatus: 'HELD',
      status: 'ACTIVE',
      txHash,
      createdAt: Date.now(),
      sessionActive: true
    }

    setRentals(prev => [newPass, ...prev])
    setActiveRentalPass(newPass)

    setTimeout(() => {
      setShowCheckoutModal(false)
      setShowPassModal(true)
    }, 900)
  }

  const handleReturnBoard = (passId: string) => {
    setRentals(prev =>
      prev.map(p => {
        if (p.id === passId) {
          return {
            ...p,
            status: 'COMPLETED',
            depositStatus: 'REFUNDED',
            sessionActive: false
          }
        }
        return p
      })
    )

    // Restore inventory
    if (selectedBoard) {
      setBoardInventories(prev => ({
        ...prev,
        [selectedBoard.id]: (prev[selectedBoard.id] || 0) + 1
      }))
    }

    // Refund USDC to wallet if applicable
    if (walletConnected) {
      setWalletBalanceUsdc(prev => prev + 50)
    }

    if (activeRentalPass?.id === passId) {
      setActiveRentalPass(prev => prev ? { ...prev, status: 'COMPLETED', depositStatus: 'REFUNDED', sessionActive: false } : null)
    }
  }

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 font-sans antialiased pb-28">
      {/* HIGH-CONTRAST HEADER */}
      <header className="sticky top-0 z-40 bg-[#0B0F19]/95 backdrop-blur-md border-b border-slate-800 px-4 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & Slogan */}
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Waves className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white">SurfPass</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
                  Mobile Fleet
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium -mt-0.5 hidden sm:block">
                Rent the perfect board for today’s surf
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#131826] p-1.5 rounded-xl border border-slate-700 shadow-inner">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition ${
                activeTab === 'home'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition ${
                activeTab === 'explore'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition ${
                activeTab === 'map'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Live Map
            </button>
            <button
              onClick={() => setActiveTab('rentals')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 ${
                activeTab === 'rentals'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              My Rentals
              {rentals.some(r => r.status === 'ACTIVE') && (
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition ${
                activeTab === 'profile'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Profile
            </button>
          </nav>

          {/* Action CTAs: Surf Now + Tatum Infra + Connect Wallet */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedBeach(BEACHES[0])
                setSelectedVan(VANS[0])
                setSelectedBoard(BOARDS[0])
                handleStartCheckout(BOARDS[0])
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-md shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition"
            >
              <Zap className="w-4 h-4 fill-current text-amber-300" />
              <span>Surf Now</span>
            </button>

            <button
              onClick={() => setShowInfraModal(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#131826] hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition"
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Tatum Infra</span>
            </button>

            {/* Connect Wallet Button */}
            <button
              onClick={() => setShowWalletModal(true)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition ${
                walletConnected
                  ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/60'
                  : 'bg-[#182032] border-cyan-500/40 text-cyan-300 hover:bg-cyan-950/40 shadow-sm'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span className="font-mono">{walletConnected ? walletAddress : 'Connect Wallet'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* --- TAB: HOME --- */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            {/* HERO SECTION */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-b from-[#0F172A] to-[#090D16] p-6 md:p-10 shadow-2xl">
              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-semibold">
                  <Waves className="w-3.5 h-3.5" />
                  <span>Roaming Van Fleet • Nationwide Surf Discovery</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                  Rent the perfect board for today’s surf.
                </h1>

                <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                  Live surf conditions, nearby mobile rental vans, and instant reservations. Pay with USDC on Solana, Bitcoin, or Apple Pay.
                </p>

                {/* Slogan */}
                <div className="pt-1 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-cyan-400/90">
                  <span>Find waves</span>
                  <span>•</span>
                  <span>Find a board</span>
                  <span>•</span>
                  <span>Go surf</span>
                </div>

                {/* Primary Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => setActiveTab('explore')}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition"
                  >
                    <Search className="w-4 h-4" />
                    <span>Find a Beach</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('map')}
                    className="px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm flex items-center gap-2 transition"
                  >
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span>View Mobile Vans Map</span>
                  </button>
                  <button
                    onClick={() => setShowTravelModal(true)}
                    className="px-4 py-3 rounded-xl bg-[#131826] hover:bg-slate-800 border border-slate-700 text-slate-300 text-sm font-semibold flex items-center gap-1.5 transition"
                  >
                    <Plane className="w-4 h-4 text-purple-400" />
                    <span>Traveling to Surf?</span>
                  </button>
                </div>
              </div>
            </div>

            {/* 5-STEP SURFPASS WORKFLOW BAR */}
            <div className="rounded-2xl bg-[#0E1320] border border-slate-800 p-4 md:p-5 shadow-lg">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  How SurfPass Works
                </span>
                <span className="text-xs text-cyan-400 font-medium">Van-to-water in 3 minutes</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">1</div>
                  <div>
                    <p className="text-xs font-bold text-white">1. Forecast</p>
                    <p className="text-[10px] text-slate-400">Check waves</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">2</div>
                  <div>
                    <p className="text-xs font-bold text-white">2. Van</p>
                    <p className="text-[10px] text-slate-400">Locate fleet</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs">3</div>
                  <div>
                    <p className="text-xs font-bold text-white">3. Board</p>
                    <p className="text-[10px] text-slate-400">Pick quiver</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">4</div>
                  <div>
                    <p className="text-xs font-bold text-white">4. Pay</p>
                    <p className="text-[10px] text-slate-400">USDC / Card</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">5</div>
                  <div>
                    <p className="text-xs font-bold text-white">5. Pass & Surf</p>
                    <p className="text-[10px] text-slate-400">QR van unlock</p>
                  </div>
                </div>
              </div>
            </div>

            {/* BEST MATCH RIGHT NOW (INTELLIGENT SURF + VAN + BOARD COMBO) */}
            <div className="rounded-3xl bg-gradient-to-r from-[#0C1929] via-[#0F172A] to-[#1E1B4B] border border-cyan-500/30 p-6 shadow-xl relative overflow-hidden">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                      Best Match Right Now
                    </span>
                    <span className="text-xs text-slate-400">Rockaway Beach, NY</span>
                  </div>

                  <h3 className="text-2xl font-black text-white">
                    Rockaway Beach • 2–3 ft (GOOD)
                  </h3>

                  <p className="text-slate-300 text-xs md:text-sm">
                    {BEACHES[0].recommendation}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                      <Car className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-xs text-slate-200">Van #12 (Rockaway Runner) • 0.2 mi</span>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-xs text-slate-200">Best Window: 8:30 – 11:30 AM</span>
                    </div>
                  </div>
                </div>

                {/* Recommended Board Preview Card */}
                <div className="bg-slate-900/90 border border-slate-700/80 p-4 rounded-2xl flex items-center gap-4 w-full lg:w-auto min-w-[280px]">
                  <BoardSilhouette shapeType="long" className="w-10 h-24 flex-shrink-0" />
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">Recommended Board</span>
                    <h4 className="text-sm font-bold text-white leading-tight">9'0 Dawn Patrol Log</h4>
                    <p className="text-[11px] text-slate-400">72L • Single Fin • 3 Available</p>
                    <p className="text-xs font-black text-cyan-300 pt-1">$25 / 2 hrs</p>
                    <button
                      onClick={() => handleStartCheckout(BOARDS[0])}
                      className="mt-2 w-full py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs hover:brightness-110 active:scale-95 transition"
                    >
                      Reserve This Board
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* GOOD SURF NEAR YOU */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg md:text-xl font-black text-white tracking-tight">
                    Good Surf Near You
                  </h2>
                  <p className="text-xs text-slate-400">Live wave conditions and roaming SurfPass van availability</p>
                </div>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
                >
                  <span>View All Beaches</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Beach Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {BEACHES.slice(0, 3).map(beach => (
                  <div
                    key={beach.id}
                    className="rounded-2xl bg-[#0E1320] border border-slate-800 hover:border-cyan-500/40 transition overflow-hidden shadow-lg group flex flex-col justify-between"
                  >
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={beach.image}
                        alt={beach.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0E1320] via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                          {beach.quality}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold">
                          {beach.waveHeight}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                        <div>
                          <h3 className="text-base font-bold text-white drop-shadow">{beach.name}</h3>
                          <p className="text-xs text-slate-300">{beach.breakName} • {beach.city}, {beach.state}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      {/* Telemetry row */}
                      <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-800/80 text-center">
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-semibold">Wind</p>
                          <p className="text-xs font-bold text-slate-200">{beach.wind.split(' ')[0]} {beach.windMph}mph</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-semibold">Tide</p>
                          <p className="text-xs font-bold text-slate-200">{beach.tide}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 uppercase font-semibold">Water</p>
                          <p className="text-xs font-bold text-slate-200">{beach.waterTemp}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
                          <Car className="w-3.5 h-3.5" />
                          {beach.vanCount} Vans Nearby
                        </span>
                        <span>{beach.boardCount} boards ready</span>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedBeach(beach)
                          setShowBeachModal(true)
                        }}
                        className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-200 font-bold text-xs transition flex items-center justify-center gap-1.5"
                      >
                        <span>View Forecast & Van Quiver</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AVAILABLE BOARDS (TAILORED QUIVER) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg md:text-xl font-black text-white tracking-tight">
                    Van #12 Quiver (Rockaway Beach)
                  </h2>
                  <p className="text-xs text-slate-400">Real-time surfboard inventory with dimensions and refundable deposits</p>
                </div>
                <button
                  onClick={() => setShowVanModal(true)}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
                >
                  <span>View Van Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {BOARDS.slice(0, 4).map(board => (
                  <div
                    key={board.id}
                    className="rounded-2xl bg-[#0E1320] border border-slate-800 p-4 flex flex-col justify-between space-y-3 hover:border-slate-700 transition"
                  >
                    <div className="flex items-start justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[10px] font-bold uppercase tracking-wider">
                        {board.type}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-400">
                        {boardInventories[board.id] || 0} in stock
                      </span>
                    </div>

                    <div className="py-2 flex items-center justify-center">
                      <BoardSilhouette shapeType={board.shapeType} className="w-12 h-28" />
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white">{board.name}</h4>
                      <p className="text-[11px] text-slate-400">{board.dimensions} • {board.volume}</p>
                      <p className="text-[10px] text-slate-500 italic mt-0.5">{board.personality}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-black text-white">${board.pricing.twoHours}</span>
                        <span className="text-[10px] text-slate-400"> / 2 hrs</span>
                      </div>
                      <button
                        onClick={() => handleStartCheckout(board)}
                        className="py-1.5 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: EXPLORE --- */}
        {activeTab === 'explore' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Explore Surf Destinations
              </h1>
              <p className="text-xs md:text-sm text-slate-400">
                Browse surf breaks, live conditions, and mobile van inventory across the United States.
              </p>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-wrap items-center gap-3 p-4 rounded-2xl bg-[#0E1320] border border-slate-800">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by beach, city, or state..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-[#131826] border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Region Select */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {['All', 'New York', 'New Jersey', 'California', 'Florida', 'Hawaii', 'North Carolina'].map(r => (
                  <button
                    key={r}
                    onClick={() => setRegionFilter(r)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                      regionFilter === r
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-[#131826] text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Beaches Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredBeaches.map(beach => (
                <div
                  key={beach.id}
                  className="rounded-2xl bg-[#0E1320] border border-slate-800 overflow-hidden hover:border-cyan-500/40 transition shadow-lg flex flex-col justify-between"
                >
                  <div className="relative h-48">
                    <img src={beach.image} alt={beach.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1320] via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                        {beach.quality}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-semibold">
                        {beach.waveHeight}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-base font-bold text-white">{beach.name}</h3>
                      <p className="text-xs text-slate-300">{beach.breakName} • {beach.city}, {beach.state}</p>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <p className="text-xs text-slate-400 line-clamp-2">{beach.description}</p>

                    <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800">
                      <span className="flex items-center gap-1 text-cyan-400">
                        <Car className="w-3.5 h-3.5" />
                        {beach.vanCount} Mobile Vans
                      </span>
                      <span>{beach.boardCount} boards available</span>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedBeach(beach)
                        setShowBeachModal(true)
                      }}
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-200 font-bold text-xs transition"
                    >
                      View Conditions & Board Quiver
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB: MAP --- */}
        {activeTab === 'map' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  Live SurfPass Van Fleet Map
                </h1>
                <p className="text-xs md:text-sm text-slate-400">
                  Track mobile surfboard rental vans parked right by active surf breaks.
                </p>
              </div>
            </div>

            {/* Map Container */}
            <div className="relative h-[550px] rounded-3xl overflow-hidden border border-slate-800 bg-[#0B111E] shadow-2xl">
              {/* Coastal Map Simulation */}
              <div className="absolute inset-0 bg-[#071324] flex flex-col justify-between p-6 opacity-90">
                <div className="h-2/3 bg-[#0A1A2F] rounded-2xl border border-cyan-900/30 relative overflow-hidden">
                  {/* Ocean Lines */}
                  <div className="absolute inset-0 flex flex-col justify-around opacity-15">
                    <div className="border-b border-cyan-400 border-dashed" />
                    <div className="border-b border-cyan-400 border-dashed" />
                    <div className="border-b border-cyan-400 border-dashed" />
                  </div>

                  {/* Coastline visual */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#162032] border-t-2 border-amber-300/30 flex items-center justify-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      Rockaway Beach Boardwalk & Ocean Parkway
                    </span>
                  </div>

                  {/* Van Marker 1 */}
                  <div
                    onClick={() => {
                      setSelectedVan(VANS[0])
                      setShowVanModal(true)
                    }}
                    className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 bg-[#0E1320] border-2 border-cyan-400 px-3 py-1.5 rounded-full shadow-lg shadow-cyan-500/30 group-hover:scale-110 transition">
                      <Car className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-bold text-white">Van #12 (Rockaway Runner)</span>
                      <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.5 rounded-full">8 Boards</span>
                    </div>
                  </div>

                  {/* Van Marker 2 */}
                  <div
                    onClick={() => {
                      setSelectedVan(VANS[1])
                      setShowVanModal(true)
                    }}
                    className="absolute top-1/2 right-1/4 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  >
                    <div className="flex items-center gap-2 bg-[#0E1320] border-2 border-blue-400 px-3 py-1.5 rounded-full shadow-lg group-hover:scale-110 transition">
                      <Car className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-bold text-white">Van #07 (Boardwalk Cruiser)</span>
                      <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-1.5 py-0.5 rounded-full">9 Boards</span>
                    </div>
                  </div>
                </div>

                {/* Van Summary Bottom Dock */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {VANS.slice(0, 2).map(van => (
                    <div
                      key={van.id}
                      onClick={() => {
                        setSelectedVan(van)
                        setShowVanModal(true)
                      }}
                      className="p-4 rounded-2xl bg-[#0E1320]/90 backdrop-blur-md border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white">{van.fleetNumber}</h4>
                          <span className="text-xs text-cyan-400 font-medium">({van.nickname})</span>
                        </div>
                        <p className="text-xs text-slate-400">{van.spot}</p>
                        <p className="text-[11px] text-emerald-400 font-semibold">{van.boardsAvailable} boards available right now</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB: RENTALS --- */}
        {activeTab === 'rentals' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                My Rentals & Passes
              </h1>
              <p className="text-xs md:text-sm text-slate-400">
                Active surf passes, van pickup check-in, and automated deposit refund receipts.
              </p>
            </div>

            {rentals.length === 0 ? (
              <div className="rounded-3xl bg-[#0E1320] border border-slate-800 p-12 text-center space-y-4">
                <Ticket className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">No active rentals</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Check out today's waves and reserve a board from the nearest mobile SurfPass van.
                </p>
                <button
                  onClick={() => setActiveTab('home')}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                >
                  Find Waves & Boards
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {rentals.map(rental => (
                  <div
                    key={rental.id}
                    className="rounded-3xl bg-[#0E1320] border border-slate-800 p-6 space-y-4 shadow-xl"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            rental.status === 'ACTIVE'
                              ? 'bg-emerald-500 text-slate-950'
                              : 'bg-slate-800 text-slate-400'
                          }`}>
                            {rental.status}
                          </span>
                          <span className="text-xs font-mono text-slate-400">{rental.id}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mt-1">{rental.boardName}</h3>
                        <p className="text-xs text-slate-400">{rental.location} • {rental.vanName} ({rental.vanNickname})</p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-slate-400">Payment: <span className="font-bold text-white">{rental.paymentMethod}</span></p>
                        <p className="text-xs text-emerald-400 font-semibold">
                          Deposit: ${rental.deposit} ({rental.depositStatus})
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span>Rental Duration: {rental.durationLabel} ({rental.startTime} – {rental.endTime})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setActiveRentalPass(rental)
                            setShowPassModal(true)
                          }}
                          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center gap-1.5"
                        >
                          <QrCode className="w-4 h-4 text-cyan-400" />
                          <span>View Digital Pass</span>
                        </button>

                        {rental.status === 'ACTIVE' && (
                          <button
                            onClick={() => handleReturnBoard(rental.id)}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs hover:brightness-110 transition"
                          >
                            Return Board & Release ${rental.deposit} Deposit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* --- TAB: PROFILE --- */}
        {activeTab === 'profile' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Surfer Profile
              </h1>
              <p className="text-xs md:text-sm text-slate-400">
                Your SurfPass reputation, connected settlement wallet, and rental history.
              </p>
            </div>

            <div className="rounded-3xl bg-[#0E1320] border border-slate-800 p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
                  SP
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Patrick (Surfer)</h3>
                  <p className="text-xs text-slate-400">Home Break: Rockaway Beach, NY</p>
                  <p className="text-xs text-cyan-400 font-semibold mt-0.5">SurfPass Reputation Score: 98/100</p>
                </div>
              </div>

              {/* Wallet Balances Card */}
              <div className="p-4 rounded-2xl bg-[#131826] border border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Connected Wallet</span>
                  <span className="text-xs font-mono text-emerald-400">{walletConnected ? walletAddress : 'Disconnected'}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    <p className="text-[10px] text-slate-400">USDC (Solana)</p>
                    <p className="text-sm font-bold text-white">${walletBalanceUsdc.toFixed(2)}</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    <p className="text-[10px] text-slate-400">SOL</p>
                    <p className="text-sm font-bold text-white">{walletBalanceSol.toFixed(2)} SOL</p>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    <p className="text-[10px] text-slate-400">Bitcoin</p>
                    <p className="text-sm font-bold text-white">{walletBalanceBtc.toFixed(4)} BTC</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* --- PERSISTENT MOBILE / FLOATING BOTTOM NAV BAR --- */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0B0F19]/95 backdrop-blur-lg border-t border-slate-800 py-2.5 px-4 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-around">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 transition ${
              activeTab === 'home' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Waves className="w-5 h-5" />
            <span className="text-[10px] tracking-wider uppercase">Home</span>
          </button>
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex flex-col items-center gap-1 transition ${
              activeTab === 'explore' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px] tracking-wider uppercase">Explore</span>
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`flex flex-col items-center gap-1 transition ${
              activeTab === 'map' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span className="text-[10px] tracking-wider uppercase">Live Map</span>
          </button>
          <button
            onClick={() => setActiveTab('rentals')}
            className={`flex flex-col items-center gap-1 transition relative ${
              activeTab === 'rentals' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Ticket className="w-5 h-5" />
            <span className="text-[10px] tracking-wider uppercase">Rentals</span>
            {rentals.some(r => r.status === 'ACTIVE') && (
              <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-cyan-400" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 transition ${
              activeTab === 'profile' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] tracking-wider uppercase">Profile</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODALS & OVERLAYS (WITH VISIBLE TOP-RIGHT 'X' & ESCAPE HANDLERS) */}
      {/* ========================================================================= */}

      {/* 1. BEACH DETAIL MODAL */}
      {showBeachModal && selectedBeach && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0E1320] border border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowBeachModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] uppercase tracking-wider">
                {selectedBeach.quality} Surf Conditions
              </span>
              <h2 className="text-2xl font-black text-white mt-2">{selectedBeach.name}</h2>
              <p className="text-xs text-slate-400">{selectedBeach.breakName} • {selectedBeach.city}, {selectedBeach.state}</p>
            </div>

            {/* 12-Hour Forecast Curve */}
            <div className="space-y-2 p-4 rounded-2xl bg-[#131826] border border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300">12-Hour Wave Forecast (ft)</span>
                <span className="text-cyan-400 font-semibold">Best: {selectedBeach.bestWindow}</span>
              </div>
              <div className="h-32 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedBeach.hourly}>
                    <defs>
                      <linearGradient id="waveCurve" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
                    <YAxis stroke="#64748b" fontSize={10} domain={[0, 6]} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                    <Area type="monotone" dataKey="heightFt" stroke="#06b6d4" strokeWidth={2} fill="url(#waveCurve)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Van Fleet at this beach */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Nearby Mobile Vans ({selectedBeach.vanCount})
              </h3>
              <div className="space-y-2">
                {VANS.filter(v => v.beachId === selectedBeach.id || v.beachId === 'rockaway').map(van => (
                  <div
                    key={van.id}
                    onClick={() => {
                      setSelectedVan(van)
                      setShowBeachModal(false)
                      setShowVanModal(true)
                    }}
                    className="p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 cursor-pointer flex items-center justify-between transition"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{van.fleetNumber} — {van.nickname}</h4>
                      <p className="text-[11px] text-slate-400">{van.spot}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-400">{van.boardsAvailable} Boards</span>
                      <p className="text-[10px] text-slate-500">{van.distance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. VAN DETAIL MODAL */}
      {showVanModal && selectedVan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0E1320] border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-5 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowVanModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Mobile Rental Van</span>
              <h2 className="text-2xl font-black text-white">{selectedVan.fleetNumber} ({selectedVan.nickname})</h2>
              <p className="text-xs text-slate-400">{selectedVan.spot} • {selectedVan.hours}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Van Inventory Quiver</h4>
              <div className="space-y-2">
                {BOARDS.map(board => (
                  <div
                    key={board.id}
                    className="p-3 rounded-xl bg-[#131826] border border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <BoardSilhouette shapeType={board.shapeType} className="w-8 h-16" />
                      <div>
                        <p className="text-xs font-bold text-white">{board.name}</p>
                        <p className="text-[10px] text-slate-400">{board.dimensions} • ${board.pricing.twoHours}/2h</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleStartCheckout(board)}
                      className="py-1.5 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition"
                    >
                      Reserve
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. CHECKOUT & PAYMENT MODAL (WITH TATUM TRANSACTION DETECTION) */}
      {showCheckoutModal && selectedBoard && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0E1320] border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">Fast Checkout</span>
              <h2 className="text-xl font-black text-white mt-0.5">Reserve {selectedBoard.name}</h2>
              <p className="text-xs text-slate-400">{selectedVan.fleetNumber} ({selectedVan.nickname}) • {selectedBeach.name}</p>
            </div>

            {/* Duration Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Select Duration</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { dur: 2 as const, label: '2 Hours', price: selectedBoard.pricing.twoHours },
                  { dur: 4 as const, label: '4 Hours', price: selectedBoard.pricing.fourHours },
                  { dur: 24 as const, label: 'Full Day', price: selectedBoard.pricing.fullDay }
                ].map(item => (
                  <button
                    key={item.dur}
                    onClick={() => setRentalDuration(item.dur)}
                    className={`p-2.5 rounded-xl border text-center transition ${
                      rentalDuration === item.dur
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <p className="text-xs">{item.label}</p>
                    <p className="text-sm font-black mt-0.5">${item.price}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Payment Rail</label>
                <span className="text-[10px] text-cyan-400 font-medium">Powered by Tatum</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPaymentMethod('USDC')}
                  className={`p-3 rounded-xl border text-center transition ${
                    paymentMethod === 'USDC'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <p className="text-xs font-black">USDC</p>
                  <p className="text-[10px] text-slate-400">Solana (Instant)</p>
                </button>
                <button
                  onClick={() => setPaymentMethod('BTC')}
                  className={`p-3 rounded-xl border text-center transition ${
                    paymentMethod === 'BTC'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <p className="text-xs font-black">Bitcoin</p>
                  <p className="text-[10px] text-slate-400">BTC Rail</p>
                </button>
                <button
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-3 rounded-xl border text-center transition ${
                    paymentMethod === 'CARD'
                      ? 'bg-blue-500/20 border-blue-400 text-blue-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <p className="text-xs font-black">Apple Pay</p>
                  <p className="text-[10px] text-slate-400">Card Auth</p>
                </button>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Surfboard Rental ({rentalDuration === 24 ? 'Full Day' : `${rentalDuration}h`})</span>
                <span className="font-bold text-white">${currentRentalCost}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Damage Protection</span>
                <span className="font-bold text-white">${protectionTotal}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-medium">
                <span>Refundable Deposit (Returned on board return)</span>
                <span className="font-bold">${depositTotal}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-black text-white">
                <span>Total Authorization</span>
                <span className="text-cyan-400">${totalAuthorization}</span>
              </div>
            </div>

            {/* Dynamic Tatum Settlement State Flow */}
            {paymentStep !== 'SELECT' && (
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/50 space-y-2 text-center">
                {paymentStep === 'WAITING' && (
                  <p className="text-xs font-bold text-cyan-300 flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Waiting for {paymentMethod} payment...
                  </p>
                )}
                {paymentStep === 'DETECTED' && (
                  <p className="text-xs font-bold text-cyan-300 flex items-center justify-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    Payment detected <span className="text-[10px] bg-cyan-500/20 px-2 py-0.5 rounded text-cyan-300">via Tatum</span>
                  </p>
                )}
                {paymentStep === 'CONFIRMING' && (
                  <p className="text-xs font-bold text-cyan-300 flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Confirming on {paymentMethod === 'USDC' ? 'Solana' : 'Bitcoin'}...
                  </p>
                )}
                {paymentStep === 'CONFIRMED' && (
                  <p className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Payment confirmed! Generating pass...
                  </p>
                )}
              </div>
            )}

            <button
              onClick={handleExecutePayment}
              disabled={paymentStep !== 'SELECT'}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition disabled:opacity-50"
            >
              {paymentMethod === 'USDC'
                ? `Pay ${totalAuthorization} USDC on Solana`
                : paymentMethod === 'BTC'
                ? `Pay ${totalAuthorization} USD (BTC equivalent)`
                : `Authorize $${totalAuthorization} with Apple Pay / Card`}
            </button>
          </div>
        </div>
      )}

      {/* 4. DIGITAL SURFPASS RENTAL PASS MODAL */}
      {showPassModal && activeRentalPass && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0E1320] border border-cyan-500/40 rounded-3xl max-w-md w-full p-6 space-y-6 relative shadow-2xl">
            <button
              onClick={() => setShowPassModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Pass Card Header */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>SURFPASS RENTAL PASS • ACTIVE</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">{activeRentalPass.boardName}</h2>
              <p className="text-xs text-slate-400">{activeRentalPass.location}</p>
            </div>

            {/* QR Code section */}
            <div className="p-6 rounded-2xl bg-white text-slate-950 flex flex-col items-center justify-center space-y-2 shadow-inner">
              <QrCode className="w-36 h-36" />
              <span className="font-mono text-xs font-bold tracking-wider">{activeRentalPass.id}</span>
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Scan at Van for Instant Board Pickup</span>
            </div>

            {/* Pickup & Van info */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Pickup Location</span>
                <span className="font-bold text-white">{activeRentalPass.spot}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Mobile Van</span>
                <span className="font-bold text-cyan-400">{activeRentalPass.vanName} ({activeRentalPass.vanNickname})</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Deposit Status</span>
                <span className="font-bold text-emerald-400">${activeRentalPass.deposit} HELD (Refundable)</span>
              </div>
            </div>

            {/* Expandable Onchain Details */}
            <div className="space-y-2">
              <button
                onClick={() => setExpandedOnchainDetails(!expandedOnchainDetails)}
                className="w-full text-center text-xs text-slate-400 hover:text-cyan-400 font-semibold py-1 transition flex items-center justify-center gap-1"
              >
                <span>{expandedOnchainDetails ? 'Hide' : 'View'} Onchain Details</span>
                {expandedOnchainDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {expandedOnchainDetails && (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[10px] space-y-1.5 text-slate-400">
                  <div className="flex justify-between">
                    <span>Settlement Network</span>
                    <span className="text-white">Solana Mainnet</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Infrastructure</span>
                    <span className="text-cyan-400">Tatum RPC & Events</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tx Reference</span>
                    <span className="text-slate-300">{activeRentalPass.txHash || '5Kz2...9Lm4'}</span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setShowPassModal(false)
                setActiveTab('map')
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg transition"
            >
              Navigate to Van on Map
            </button>
          </div>
        </div>
      )}

      {/* 5. TATUM INFRASTRUCTURE MODAL */}
      {showInfraModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0E1320] border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowInfraModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold">
                  Powered by Tatum
                </span>
                <span className="text-xs text-emerald-400 font-semibold">• Live Multi-Chain Gateway</span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1">Tatum Blockchain Infrastructure</h2>
              <p className="text-xs text-slate-400">
                Multi-chain settlement, real-time transaction detection, and automated deposit collateral routing.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <h4 className="font-bold text-white">Solana RPC Gateway</h4>
                <p className="text-[11px] text-slate-400">Sub-second USDC settlement & rental pass authorization.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <h4 className="font-bold text-white">Bitcoin Node Access</h4>
                <p className="text-[11px] text-slate-400">BTC rental payments monitored via Tatum blockchain data.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <h4 className="font-bold text-white">Real-Time Events</h4>
                <p className="text-[11px] text-slate-400">Instant deposit unlock & automated return collateral release.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <h4 className="font-bold text-white">Smart Accounts</h4>
                <p className="text-[11px] text-slate-400">Seamless non-custodial onboarding for mainstream consumers.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. TRAVELER MODE MODAL */}
      {showTravelModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0E1320] border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowTravelModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Traveling Surfer</span>
              <h2 className="text-2xl font-black text-white">Traveling Without a Board?</h2>
              <p className="text-xs text-slate-400">
                Reserve your quiver before landing. Your board will be waiting at the beachside SurfPass van.
              </p>
            </div>

            <div className="space-y-2">
              {['Huntington Beach, CA', 'Waikiki, Hawaii', 'Montauk, NY', 'Cocoa Beach, FL'].map(dest => (
                <button
                  key={dest}
                  onClick={() => {
                    setShowTravelModal(false)
                    setActiveTab('explore')
                  }}
                  className="w-full p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left flex items-center justify-between transition"
                >
                  <span className="text-xs font-bold text-white">{dest}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. CONNECT WALLET MODAL */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0E1320] border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowWalletModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Web3 Settlement</span>
              <h2 className="text-xl font-black text-white">Connect Wallet</h2>
              <p className="text-xs text-slate-400">
                Connect your preferred Solana or Bitcoin wallet for automated USDC reservations and deposit release:
              </p>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={handleConnectWallet}
                className="w-full p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-between text-xs font-bold text-white transition"
              >
                <span>Phantom Wallet</span>
                <span className="text-[10px] text-cyan-400">Solana</span>
              </button>
              <button
                onClick={handleConnectWallet}
                className="w-full p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-between text-xs font-bold text-white transition"
              >
                <span>Solflare</span>
                <span className="text-[10px] text-cyan-400">Solana</span>
              </button>
              <button
                onClick={handleConnectWallet}
                className="w-full p-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-between text-xs font-bold text-white transition"
              >
                <span>SurfPass Smart Account (Embedded)</span>
                <span className="text-[10px] text-purple-400">Social Login</span>
              </button>
            </div>

            {walletConnected && (
              <button
                onClick={handleDisconnectWallet}
                className="w-full py-2.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs font-bold hover:bg-rose-900/60 transition"
              >
                Disconnect Current Wallet
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
