// src/App.tsx - Complete, Polished SurfPass Application
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
  CheckCheck,
  TrendingUp,
  Sun,
  Eye,
  Radio,
  Crosshair
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { FleetGpsMap } from './FleetGpsMap'

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
  quality: 'GOOD' | 'FAIR-GOOD' | 'FAIR' | 'POOR-FAIR' | 'EPIC' | 'POOR'
  wind: string
  windSub: string
  windMph: number
  windDirectionDeg: number
  tide: string
  tideSub: string
  nextHighTide: string
  nextLowTide: string
  waterTemp: string
  waterTempC: string
  airTemp: string
  suitRecommendation: string
  swell: string
  swellSub: string
  swellPeriod: string
  swellAngle: string
  skill: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'
  distance: string
  vanCount: number
  boardCount: number
  image: string
  imageFallback: string
  description: string
  recommendation: string
  bestWindow: string
  bestWindowSub: string
  updatedMinutesAgo: number
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
  streetAddress: string
  phone: string
  status: 'ACTIVE' | 'TRANSIT' | 'BUSY'
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

// Helper for Surf Quality Semantic Badges
function getQualityBadgeStyle(quality: string) {
  switch (quality) {
    case 'EPIC':
      return 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
    case 'GOOD':
      return 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40'
    case 'FAIR-GOOD':
      return 'bg-lime-500/20 text-lime-300 border-lime-400/40'
    case 'FAIR':
      return 'bg-amber-500/20 text-amber-300 border-amber-400/40'
    case 'POOR-FAIR':
    case 'POOR':
    default:
      return 'bg-slate-700/50 text-slate-300 border-slate-600/40'
  }
}

// --- 100% DISTINCT, ACCURATE REGIONAL DESTINATION DATA ---
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
    windDirectionDeg: 315,
    tide: 'Rising',
    tideSub: 'Best push around 9–11 AM',
    nextHighTide: '11:15 AM (4.8 ft)',
    nextLowTide: '5:40 PM (1.1 ft)',
    waterTemp: '68°F',
    waterTempC: '20°C',
    airTemp: '74°F',
    suitRecommendation: 'Boardshorts or 2mm Top',
    swell: 'SE 2.8 ft',
    swellSub: 'Consistent groundswell',
    swellPeriod: '11s',
    swellAngle: '142° SE',
    skill: 'Intermediate',
    distance: '0.2 mi',
    vanCount: 2,
    boardCount: 22,
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80',
    imageFallback: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80',
    description: 'Urban beach-break surfing with multiple jetty sandbar peaks and easy boardwalk access from New York City.',
    recommendation: 'Cleanest conditions before the afternoon wind shift. Longboards, classic mid-lengths, and forgiving fish are catching everything on the incoming push.',
    bestWindow: '8:30 AM – 11:30 AM',
    bestWindowSub: 'Cleanest conditions before the afternoon wind shift.',
    updatedMinutesAgo: 4,
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
    id: 'sunset-cliffs',
    name: 'San Diego - Sunset Cliffs',
    breakName: 'Osprey Point Reef',
    city: 'San Diego',
    state: 'CA',
    region: 'California',
    waveHeight: '4–6 ft',
    waveDesc: 'Head high to overhead sets',
    waveSub: 'Firing reef sets',
    quality: 'EPIC',
    wind: '4 kts Offshore (E)',
    windSub: 'Clean Offshore Glass',
    windMph: 4,
    windDirectionDeg: 90,
    tide: 'Incoming High',
    tideSub: 'Optimal push into 11:45 AM',
    nextHighTide: '11:45 AM (5.2 ft)',
    nextLowTide: '5:50 PM (0.4 ft)',
    waterTemp: '65°F',
    waterTempC: '18°C',
    airTemp: '72°F',
    suitRecommendation: '3/2mm Fullsuit or Springsuit',
    swell: 'SW 4.5 ft @ 14s',
    swellSub: 'Groundswell from Southern Pacific',
    swellPeriod: '14s',
    swellAngle: '210° SW',
    skill: 'Intermediate',
    distance: 'San Diego Market',
    vanCount: 1,
    boardCount: 14,
    image: 'https://images.unsplash.com/photo-1529553815871-df205a9a2891?auto=format&fit=crop&w=1200&q=80',
    imageFallback: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1200&q=80',
    description: 'Iconic sandstone cliff reef break with long rolling lefts, cobblestone shoulders, and dramatic California coastal vistas.',
    recommendation: 'Groundswell firing on the reef with light morning offshore wind. Performance fish and refined mid-lengths are carrying momentum through every section.',
    bestWindow: '7:30 AM – 11:30 AM',
    bestWindowSub: 'Incoming high tide push with glassy offshore morning winds.',
    updatedMinutesAgo: 3,
    hourly: [
      { time: '6 AM', hourVal: 6, heightFt: 4.2, heightLabel: '4.2 ft', periodSec: 14, tideFt: 2.1, windDir: 'E', windSpeed: 3, quality: 'EPIC' },
      { time: '7 AM', hourVal: 7, heightFt: 4.8, heightLabel: '4.8 ft', periodSec: 14, tideFt: 3.2, windDir: 'E', windSpeed: 4, quality: 'EPIC' },
      { time: '8 AM', hourVal: 8, heightFt: 5.2, heightLabel: '5.2 ft', periodSec: 14, tideFt: 4.3, windDir: 'E', windSpeed: 4, quality: 'EPIC' },
      { time: '9 AM', hourVal: 9, heightFt: 5.6, heightLabel: '5.6 ft', periodSec: 14, tideFt: 4.9, windDir: 'ENE', windSpeed: 5, quality: 'EPIC' },
      { time: '10 AM', hourVal: 10, heightFt: 5.4, heightLabel: '5.4 ft', periodSec: 13, tideFt: 5.2, windDir: 'NE', windSpeed: 6, quality: 'EPIC' },
      { time: '11 AM', hourVal: 11, heightFt: 4.9, heightLabel: '4.9 ft', periodSec: 13, tideFt: 5.1, windDir: 'W', windSpeed: 7, quality: 'GOOD' }
    ],
    lat: 32.7157,
    lng: -117.2530
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
    windDirectionDeg: 337,
    tide: 'Incoming Mid-Tide',
    tideSub: 'Optimal depth over cobblestone',
    nextHighTide: '12:30 PM (4.2 ft)',
    nextLowTide: '6:50 PM (0.8 ft)',
    waterTemp: '64°F',
    waterTempC: '17°C',
    airTemp: '69°F',
    suitRecommendation: '3/2mm Fullsuit',
    swell: 'E 3.8 ft',
    swellSub: 'Well-spaced ocean swell',
    swellPeriod: '12s',
    swellAngle: '95° E',
    skill: 'Intermediate',
    distance: '118 mi',
    vanCount: 1,
    boardCount: 12,
    image: 'https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?auto=format&fit=crop&w=1200&q=80',
    imageFallback: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?auto=format&fit=crop&w=1200&q=80',
    description: 'Longer peeling waves and classic Long Island cobblestone point-break character framed by dramatic bluffs.',
    recommendation: 'Cobblestone point breaking clean. High-volume mid-lengths and traditional noseriders are gliding through the full section.',
    bestWindow: '8:00 AM – 1:00 PM',
    bestWindowSub: 'Long incoming tide window with sustained groundswell push.',
    updatedMinutesAgo: 6,
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
    windDirectionDeg: 270,
    tide: 'Outgoing Mid',
    tideSub: 'Peaking on sandbar shelf',
    nextHighTide: '9:40 AM (4.1 ft)',
    nextLowTide: '4:15 PM (1.2 ft)',
    waterTemp: '69°F',
    waterTempC: '20°C',
    airTemp: '76°F',
    suitRecommendation: 'Boardshorts or 1mm Top',
    swell: 'ESE 2.4 ft',
    swellSub: 'Mid-period windswell blend',
    swellPeriod: '9s',
    swellAngle: '112° ESE',
    skill: 'Beginner',
    distance: '48 mi',
    vanCount: 1,
    boardCount: 11,
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
    imageFallback: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=80',
    description: 'New Jersey boardwalk, historic stone jetties, and classic East Coast beach-town vibe with punchy inside peaks.',
    recommendation: 'Soft waves right next to the 8th Avenue stone jetty. Perfect for high-volume soft-tops and stable logs.',
    bestWindow: '9:00 AM – 11:30 AM',
    bestWindowSub: 'Mid-tide sweet spot before water gets too shallow on the inside bar.',
    updatedMinutesAgo: 11,
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
    windDirectionDeg: 45,
    tide: 'Low rising',
    tideSub: 'Gaining push on outer bar',
    nextHighTide: '10:45 AM (4.9 ft)',
    nextLowTide: '4:20 PM (0.6 ft)',
    waterTemp: '65°F',
    waterTempC: '18°C',
    airTemp: '71°F',
    suitRecommendation: '3/2mm Springsuit or Fullsuit',
    swell: 'SSW 3.8 ft',
    swellSub: 'Southern hemi groundswell',
    swellPeriod: '14s',
    swellAngle: '198° SSW',
    skill: 'Intermediate',
    distance: 'West Coast Market',
    vanCount: 1,
    boardCount: 16,
    image: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&w=1200&q=80',
    imageFallback: 'https://images.unsplash.com/photo-1516815231560-8f41ec531527?auto=format&fit=crop&w=1200&q=80',
    description: 'High-energy Southern California beach breaks with iconic pier backdrop and consistent year-round surf culture.',
    recommendation: 'Consistent pier bowls with good shoulder taper. Twin fish and high-performance daily drivers are ripping.',
    bestWindow: '6:30 AM – 10:30 AM',
    bestWindowSub: 'Glassy morning low-tide push right under the south pier runway.',
    updatedMinutesAgo: 2,
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
    quality: 'EPIC',
    wind: 'Calm 2 mph',
    windSub: 'Sheet of pure glass',
    windMph: 2,
    windDirectionDeg: 0,
    tide: 'Mid incoming',
    tideSub: 'Reef shelf firing on both sides',
    nextHighTide: '11:00 AM (4.7 ft)',
    nextLowTide: '5:30 PM (0.4 ft)',
    waterTemp: '66°F',
    waterTempC: '19°C',
    airTemp: '73°F',
    suitRecommendation: '3/2mm Springsuit',
    swell: 'S 4.6 ft',
    swellSub: 'Long-period Pacific groundswell',
    swellPeriod: '16s',
    swellAngle: '185° S',
    skill: 'Advanced',
    distance: 'West Coast Market',
    vanCount: 1,
    boardCount: 13,
    image: 'https://images.unsplash.com/photo-1504681869696-d977211a5f4c?auto=format&fit=crop&w=1200&q=80',
    imageFallback: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1200&q=80',
    description: 'World-famous cobblestone skatepark wave with peeling lefts and rippable rights inside San Onofre State Park.',
    recommendation: 'A-frame perfection with wide open faces. Performance shortboards, step-downs, and refined fish are the weapon of choice.',
    bestWindow: '7:00 AM – 11:30 AM',
    bestWindowSub: 'Peak long-period southern groundswell window before sea breeze.',
    updatedMinutesAgo: 5,
    hourly: [
      { time: '7 AM', hourVal: 7, heightFt: 5.0, heightLabel: '5.0 ft', periodSec: 16, tideFt: 2.2, windDir: 'Calm', windSpeed: 2, quality: 'EPIC' },
      { time: '8 AM', hourVal: 8, heightFt: 5.4, heightLabel: '5.4 ft', periodSec: 16, tideFt: 2.9, windDir: 'Calm', windSpeed: 2, quality: 'EPIC' },
      { time: '9 AM', hourVal: 9, heightFt: 5.3, heightLabel: '5.3 ft', periodSec: 16, tideFt: 3.8, windDir: 'Calm', windSpeed: 3, quality: 'EPIC' },
      { time: '10 AM', hourVal: 10, heightFt: 4.8, heightLabel: '4.8 ft', periodSec: 15, tideFt: 4.4, windDir: 'WSW', windSpeed: 5, quality: 'GOOD' }
    ],
    lat: 33.3853,
    lng: -117.5898
  },
  {
    id: 'cocoa-beach',
    name: 'Cocoa Beach',
    breakName: 'Cocoa Beach Pier',
    city: 'Cocoa Beach',
    state: 'FL',
    region: 'Florida',
    waveHeight: '2–3 ft',
    waveDesc: 'Thigh to waist high',
    waveSub: 'Gentle rolling Atlantic peelers',
    quality: 'GOOD',
    wind: 'WNW 6 mph light offshore',
    windSub: 'Clean & inviting texture',
    windMph: 6,
    windDirectionDeg: 292,
    tide: 'Incoming push',
    tideSub: 'Filling the sandbars softly',
    nextHighTide: '10:15 AM (3.9 ft)',
    nextLowTide: '4:45 PM (0.8 ft)',
    waterTemp: '79°F',
    waterTempC: '26°C',
    airTemp: '84°F',
    suitRecommendation: 'Boardshorts / Swimwear',
    swell: 'ENE 2.6 ft',
    swellSub: 'Trade wind swell',
    swellPeriod: '10s',
    swellAngle: '70° ENE',
    skill: 'Beginner',
    distance: 'East Coast Market',
    vanCount: 1,
    boardCount: 14,
    image: 'https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1200&q=80',
    imageFallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'Warm-water Florida surf capital with approachable beach-break sandbars, vibrant pier energy, and beginner-friendly waves.',
    recommendation: 'Soft, playful wave shoulders peeling right off the pier. Perfect for longboards, soft-tops, and relaxed cruising.',
    bestWindow: '8:00 AM – 12:00 PM',
    bestWindowSub: 'Warm morning incoming tide before afternoon thermal wind.',
    updatedMinutesAgo: 8,
    hourly: [
      { time: '7 AM', hourVal: 7, heightFt: 2.2, heightLabel: '2.2 ft', periodSec: 10, tideFt: 1.8, windDir: 'WNW', windSpeed: 5, quality: 'FAIR-GOOD' },
      { time: '8 AM', hourVal: 8, heightFt: 2.6, heightLabel: '2.6 ft', periodSec: 10, tideFt: 2.7, windDir: 'WNW', windSpeed: 6, quality: 'GOOD' },
      { time: '9 AM', hourVal: 9, heightFt: 2.8, heightLabel: '2.8 ft', periodSec: 10, tideFt: 3.4, windDir: 'W', windSpeed: 6, quality: 'GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 2.7, heightLabel: '2.7 ft', periodSec: 9, tideFt: 3.9, windDir: 'W', windSpeed: 7, quality: 'GOOD' },
      { time: '11 AM', hourVal: 11, heightFt: 2.3, heightLabel: '2.3 ft', periodSec: 9, tideFt: 3.7, windDir: 'ESE', windSpeed: 9, quality: 'FAIR' }
    ],
    lat: 28.3200,
    lng: -80.6076
  },
  {
    id: 'waikiki',
    name: 'Waikiki - Queens & Canoes',
    breakName: 'Queens Reef Runway',
    city: 'Honolulu',
    state: 'HI',
    region: 'Hawaii',
    waveHeight: '3–4 ft',
    waveDesc: 'Waist to chest high',
    waveSub: 'Endless rolling tropical rights',
    quality: 'GOOD',
    wind: 'ENE 10 mph trades',
    windSub: 'Warm groomed trade winds',
    windMph: 10,
    windDirectionDeg: 67,
    tide: 'Mid-tide full push',
    tideSub: 'Deep rolling reef shelf',
    nextHighTide: '1:20 PM (2.4 ft)',
    nextLowTide: '7:40 PM (0.2 ft)',
    waterTemp: '78°F',
    waterTempC: '25°C',
    airTemp: '83°F',
    suitRecommendation: 'Boardshorts / Swimwear',
    swell: 'S 3.5 ft',
    swellSub: 'Southern ocean groundswell',
    swellPeriod: '15s',
    swellAngle: '190° S',
    skill: 'All Levels',
    distance: 'Hawaii Market',
    vanCount: 1,
    boardCount: 15,
    image: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=1200&q=80',
    imageFallback: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'Long rolling waves, crystal-clear warm water, Diamond Head backdrop, and the world birthplace of modern board-riding.',
    recommendation: 'Endless 150-yard rights rolling across the outer reef into Queens bay. Pure noserider and classic log paradise.',
    bestWindow: '7:00 AM – 1:30 PM',
    bestWindowSub: 'All-day approachable rolling swell with predictable reef breaks.',
    updatedMinutesAgo: 1,
    hourly: [
      { time: '6 AM', hourVal: 6, heightFt: 3.2, heightLabel: '3.2 ft', periodSec: 15, tideFt: 1.0, windDir: 'ENE', windSpeed: 8, quality: 'GOOD' },
      { time: '7 AM', hourVal: 7, heightFt: 3.6, heightLabel: '3.6 ft', periodSec: 15, tideFt: 1.4, windDir: 'ENE', windSpeed: 9, quality: 'GOOD' },
      { time: '8 AM', hourVal: 8, heightFt: 3.8, heightLabel: '3.8 ft', periodSec: 15, tideFt: 1.8, windDir: 'ENE', windSpeed: 10, quality: 'GOOD' },
      { time: '9 AM', hourVal: 9, heightFt: 3.9, heightLabel: '3.9 ft', periodSec: 14, tideFt: 2.1, windDir: 'E', windSpeed: 11, quality: 'GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 3.7, heightLabel: '3.7 ft', periodSec: 14, tideFt: 2.3, windDir: 'E', windSpeed: 12, quality: 'GOOD' }
    ],
    lat: 21.2762,
    lng: -157.8272
  },
  {
    id: 'outer-banks',
    name: 'Outer Banks - Cape Hatteras',
    breakName: 'Lighthouse Sandbars',
    city: 'Buxton',
    state: 'NC',
    region: 'North Carolina',
    waveHeight: '3–5 ft',
    waveDesc: 'Chest to head high',
    waveSub: 'Heavy punchy A-frame peaks',
    quality: 'GOOD',
    wind: 'SW 7 mph offshore',
    windSub: 'Clean grooming off dunes',
    windMph: 7,
    windDirectionDeg: 225,
    tide: 'Low rising',
    tideSub: 'Spitting sandbar barrels',
    nextHighTide: '11:30 AM (3.8 ft)',
    nextLowTide: '5:15 PM (0.7 ft)',
    waterTemp: '71°F',
    waterTempC: '21°C',
    airTemp: '77°F',
    suitRecommendation: '2mm Springsuit or Top',
    swell: 'E 3.6 ft',
    swellSub: 'Open Atlantic groundswell',
    swellPeriod: '11s',
    swellAngle: '90° E',
    skill: 'Intermediate',
    distance: 'Atlantic Market',
    vanCount: 1,
    boardCount: 10,
    image: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=1200&q=80',
    imageFallback: 'https://images.unsplash.com/photo-1414609245224-afa02bfb3fda?auto=format&fit=crop&w=1200&q=80',
    description: 'Dynamic barrier island surf destination with powerful shifting sandbars and deep open-ocean swell access.',
    recommendation: 'Fast breaking peaks with hollow reform sections. Fast twin fish and responsive shortboards are ideal.',
    bestWindow: '7:30 AM – 10:30 AM',
    bestWindowSub: 'Crisp morning low-tide push right off the Buxton sand spit.',
    updatedMinutesAgo: 9,
    hourly: [
      { time: '7 AM', hourVal: 7, heightFt: 3.6, heightLabel: '3.6 ft', periodSec: 11, tideFt: 1.2, windDir: 'SW', windSpeed: 6, quality: 'GOOD' },
      { time: '8 AM', hourVal: 8, heightFt: 4.2, heightLabel: '4.2 ft', periodSec: 11, tideFt: 2.1, windDir: 'SW', windSpeed: 7, quality: 'GOOD' },
      { time: '9 AM', hourVal: 9, heightFt: 4.0, heightLabel: '4.0 ft', periodSec: 11, tideFt: 3.0, windDir: 'WSW', windSpeed: 8, quality: 'GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 3.5, heightLabel: '3.5 ft', periodSec: 10, tideFt: 3.6, windDir: 'W', windSpeed: 10, quality: 'FAIR-GOOD' }
    ],
    lat: 35.2532,
    lng: -75.5204
  }
]

// --- SURFPASS MOBILE FLEET VANS (With Real Addresses & GPS Coordinates) ---
const VANS: Van[] = [
  {
    id: 'van-12',
    fleetNumber: 'Van #12',
    nickname: 'Rockaway Runner',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach, NY',
    spot: 'Beach 90th Street Boardwalk Lot',
    streetAddress: '90-01 Shore Front Pkwy, Queens, NY 11693',
    phone: '+1 (718) 555-0192',
    status: 'ACTIVE',
    distance: '0.2 mi away',
    walkTime: '3 min walk',
    driveTime: '1 min drive',
    hours: '6:00 AM – 7:30 PM Daily',
    boardsAvailable: 8,
    longboards: 3,
    midsAndFun: 2,
    softTops: 2,
    shortboards: 1,
    fish: 1,
    nextLocation: 'Long Beach, NY',
    eta: 'Tomorrow 7:00 AM',
    waitMin: 0,
    lat: 40.5841,
    lng: -73.8160,
    mapX: 42,
    mapY: 58,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-01-sd',
    fleetNumber: 'Van #01',
    nickname: 'Sunset Nomad',
    beachId: 'sunset-cliffs',
    beachName: 'Sunset Cliffs, San Diego, CA',
    spot: 'Osprey Point Pullout Lot',
    streetAddress: '1250 Sunset Cliffs Blvd, San Diego, CA 92107',
    phone: '+1 (619) 555-0144',
    status: 'ACTIVE',
    distance: '0.1 mi away',
    walkTime: '2 min walk',
    driveTime: '1 min drive',
    hours: '6:30 AM – 7:30 PM Daily',
    boardsAvailable: 5,
    longboards: 2,
    midsAndFun: 2,
    softTops: 1,
    shortboards: 1,
    fish: 1,
    nextLocation: 'Pacific Beach Pier',
    eta: 'Tomorrow 6:00 AM',
    waitMin: 0,
    lat: 32.7157,
    lng: -117.2530,
    mapX: 48,
    mapY: 52,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-07',
    fleetNumber: 'Van #07',
    nickname: 'Boardwalk Cruiser',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach, NY',
    spot: 'Beach 67th Street Subway Lot',
    streetAddress: 'Beach 67th St & Rockaway Beach Blvd, Queens, NY',
    phone: '+1 (718) 555-0188',
    status: 'ACTIVE',
    distance: '0.9 mi away',
    walkTime: '12 min walk',
    driveTime: '3 min drive',
    hours: '6:30 AM – 7:00 PM Daily',
    boardsAvailable: 9,
    longboards: 3,
    midsAndFun: 3,
    softTops: 2,
    shortboards: 1,
    fish: 1,
    nextLocation: 'Beach 92nd Street',
    eta: 'Today 2:00 PM',
    waitMin: 2,
    lat: 40.5898,
    lng: -73.7990,
    mapX: 72,
    mapY: 45,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-31',
    fleetNumber: 'Van #31',
    nickname: 'Huntington Nomad',
    beachId: 'huntington',
    beachName: 'Huntington Beach, CA',
    spot: 'PCH & Main St Southside Lot',
    streetAddress: '315 Pacific Coast Hwy, Huntington Beach, CA 92648',
    phone: '+1 (714) 555-0131',
    status: 'ACTIVE',
    distance: 'West Coast Market',
    walkTime: '4 min walk',
    driveTime: '1 min drive',
    hours: '6:00 AM – 8:00 PM Daily',
    boardsAvailable: 12,
    longboards: 4,
    midsAndFun: 3,
    softTops: 3,
    shortboards: 3,
    fish: 2,
    nextLocation: 'Newport Beach 54th St',
    eta: 'Tomorrow 6:30 AM',
    waitMin: 0,
    lat: 33.6590,
    lng: -117.9992,
    mapX: 50,
    mapY: 50,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-45',
    fleetNumber: 'Van #45',
    nickname: 'Cocoa Cruiser',
    beachId: 'cocoa-beach',
    beachName: 'Cocoa Beach, FL',
    spot: 'Pier Northside Dune Walkway',
    streetAddress: '401 Meade Ave, Cocoa Beach, FL 32931',
    phone: '+1 (321) 555-0145',
    status: 'ACTIVE',
    distance: 'East Coast Market',
    walkTime: '2 min walk',
    driveTime: '1 min drive',
    hours: '7:00 AM – 6:30 PM Daily',
    boardsAvailable: 11,
    longboards: 4,
    midsAndFun: 3,
    softTops: 4,
    shortboards: 1,
    fish: 1,
    nextLocation: 'Minutemen Causeway',
    eta: 'Today 3:00 PM',
    waitMin: 0,
    lat: 28.3205,
    lng: -80.6070,
    mapX: 55,
    mapY: 48,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-61',
    fleetNumber: 'Van #61',
    nickname: 'Waikiki Nomad',
    beachId: 'waikiki',
    beachName: 'Waikiki, Honolulu, HI',
    spot: 'Queens Beach Pavilion Lot',
    streetAddress: '2699 Kalakaua Ave, Honolulu, HI 96815',
    phone: '+1 (808) 555-0161',
    status: 'ACTIVE',
    distance: 'Hawaii Market',
    walkTime: '3 min walk',
    driveTime: '1 min drive',
    hours: '6:30 AM – 6:30 PM Daily',
    boardsAvailable: 14,
    longboards: 6,
    midsAndFun: 4,
    softTops: 4,
    shortboards: 1,
    fish: 1,
    nextLocation: 'Ala Moana Bowls',
    eta: 'Tomorrow 6:00 AM',
    waitMin: 0,
    lat: 21.2760,
    lng: -157.8268,
    mapX: 60,
    mapY: 40,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-22',
    fleetNumber: 'Van #22',
    nickname: 'Ditch Plains Scout',
    beachId: 'montauk',
    beachName: 'Montauk - Ditch Plains, NY',
    spot: 'Ditch Plains Beach Lot',
    streetAddress: 'Ditch Plains Rd, Montauk, NY 11954',
    phone: '+1 (631) 555-0122',
    status: 'ACTIVE',
    distance: '118 mi',
    walkTime: '4 min walk',
    driveTime: '1 min drive',
    hours: '6:30 AM – 6:30 PM Daily',
    boardsAvailable: 7,
    longboards: 3,
    midsAndFun: 2,
    softTops: 1,
    shortboards: 1,
    fish: 1,
    nextLocation: 'Amagansett Main Beach',
    eta: 'Tomorrow 7:00 AM',
    waitMin: 0,
    lat: 41.0395,
    lng: -71.9078,
    mapX: 55,
    mapY: 48,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-18',
    fleetNumber: 'Van #18',
    nickname: 'Asbury Jetty',
    beachId: 'asbury-park',
    beachName: 'Asbury Park, NJ',
    spot: '8th Avenue Jetty Lot',
    streetAddress: '8th Ave & Ocean Ave, Asbury Park, NJ 07712',
    phone: '+1 (732) 555-0118',
    status: 'ACTIVE',
    distance: '48 mi',
    walkTime: '3 min walk',
    driveTime: '1 min drive',
    hours: '7:00 AM – 7:00 PM Daily',
    boardsAvailable: 6,
    longboards: 2,
    midsAndFun: 1,
    softTops: 2,
    shortboards: 1,
    fish: 1,
    nextLocation: 'Belmar Inlet',
    eta: 'Today 4:00 PM',
    waitMin: 1,
    lat: 40.2206,
    lng: -74.0007,
    mapX: 52,
    mapY: 50,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-28',
    fleetNumber: 'Van #28',
    nickname: 'Lowers Local',
    beachId: 'trestles',
    beachName: 'Lower Trestles, San Clemente, CA',
    spot: 'Trailhead Staging Lot',
    streetAddress: 'San Onofre State Beach Access, San Clemente, CA 92672',
    phone: '+1 (949) 555-0128',
    status: 'ACTIVE',
    distance: 'West Coast Market',
    walkTime: '8 min walk',
    driveTime: '2 min drive',
    hours: '6:00 AM – 7:00 PM Daily',
    boardsAvailable: 8,
    longboards: 1,
    midsAndFun: 2,
    softTops: 1,
    shortboards: 3,
    fish: 2,
    nextLocation: 'San Onofre Trails',
    eta: 'Tomorrow 6:00 AM',
    waitMin: 0,
    lat: 33.3853,
    lng: -117.5898,
    mapX: 48,
    mapY: 52,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-55',
    fleetNumber: 'Van #55',
    nickname: 'Hatteras Hauler',
    beachId: 'outer-banks',
    beachName: 'Cape Hatteras, NC',
    spot: 'Lighthouse Beach Access',
    streetAddress: '46368 Lighthouse Rd, Buxton, NC 27920',
    phone: '+1 (252) 555-0155',
    status: 'ACTIVE',
    distance: 'Atlantic Market',
    walkTime: '5 min walk',
    driveTime: '2 min drive',
    hours: '6:30 AM – 6:30 PM Daily',
    boardsAvailable: 6,
    longboards: 1,
    midsAndFun: 2,
    softTops: 1,
    shortboards: 2,
    fish: 1,
    nextLocation: 'Avon Pier',
    eta: 'Tomorrow 7:30 AM',
    waitMin: 0,
    lat: 35.2532,
    lng: -75.5204,
    mapX: 50,
    mapY: 50,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80'
  }
]

type BoardSeed = {
  id: string
  code: string
  name: string
  nickname: string
  type: Board['type']
  dimensions: string
  length: string
  width: string
  thickness: string
  volume: string
  finSetup: string
  skill: Board['skill']
  recommendedWaves: string
  vanId: string
  vanName: string
  beachId: string
  beachName: string
  availableCount: number
  personality: string
  whyMatch: string
  twoHours: number
  fourHours: number
  fullDay: number
  tag: string
  shapeType: Board['shapeType']
  condition?: Board['condition']
}

function createBoard(seed: BoardSeed): Board {
  return {
    id: seed.id,
    code: seed.code,
    name: seed.name,
    nickname: seed.nickname,
    type: seed.type,
    dimensions: seed.dimensions,
    length: seed.length,
    width: seed.width,
    thickness: seed.thickness,
    volume: seed.volume,
    finSetup: seed.finSetup,
    skill: seed.skill,
    recommendedWaves: seed.recommendedWaves,
    condition: seed.condition ?? 'Excellent',
    vanId: seed.vanId,
    vanName: seed.vanName,
    beachId: seed.beachId,
    beachName: seed.beachName,
    availableCount: seed.availableCount,
    totalInVan: seed.availableCount,
    personality: seed.personality,
    whyMatch: seed.whyMatch,
    pricing: {
      twoHours: seed.twoHours,
      fourHours: seed.fourHours,
      fullDay: seed.fullDay
    },
    deposit: 50,
    protectionFee: 3,
    tag: seed.tag,
    shapeType: seed.shapeType
  }
}

// --- HIGH-QUALITY SURFBOARD INVENTORY (With Real Shaper / Model Names) ---
const INITIAL_BOARDS: Board[] = [
  // Rockaway — Van #12
  createBoard({
    id: 'b-bing-94',
    code: 'SP-CL-94-0821',
    name: '9\'4 BING Continental Classic',
    nickname: 'Continental Classic',
    type: 'Longboard',
    dimensions: '9\'4 × 23 1/4 × 3 1/8',
    length: '9\'4',
    width: '23 1/4"',
    thickness: '3 1/8"',
    volume: '74.5 L',
    finSetup: 'Single Fin Box 10"',
    skill: 'All Levels',
    recommendedWaves: '1–4 ft',
    vanId: 'van-12',
    vanName: 'Van #12 (Rockaway Runner)',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    availableCount: 3,
    personality: 'Effortless trim, smooth rail-to-rail transitions, and stable tip-time noseriding.',
    whyMatch: 'The waves are 2–3 ft and clean this morning. The 74.5L volume lets you catch soft peelers 20 yards outside everyone else.',
    twoHours: 25,
    fourHours: 38,
    fullDay: 48,
    tag: 'Best Match for Today',
    shapeType: 'long',
    condition: 'Mint'
  }),
  createBoard({
    id: 'b-hypto-510',
    code: 'SP-HK-510-1092',
    name: '5\'10 Haydenshapes Hypto Krypto',
    nickname: 'Hypto Krypto',
    type: 'Fish',
    dimensions: '5\'10 × 20 1/4 × 2 5/8',
    length: '5\'10',
    width: '20 1/4"',
    thickness: '2 5/8"',
    volume: '33.7 L',
    finSetup: 'FCS II Tri-Quad Setup',
    skill: 'Intermediate',
    recommendedWaves: '2–6 ft',
    vanId: 'van-12',
    vanName: 'Van #12 (Rockaway Runner)',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    availableCount: 2,
    personality: 'Lightning-fast down the line with incredible paddle power and versatile curved outline.',
    whyMatch: 'Waist-to-chest high punchy inside reform. The wide forward outline gives instant speed over flat sections.',
    twoHours: 30,
    fourHours: 42,
    fullDay: 54,
    tag: 'Speed Weapon',
    shapeType: 'fish'
  }),
  createBoard({
    id: 'b-odysea-66',
    code: 'SP-CS-66-3021',
    name: '6\'6 Catch Surf Odysea Skipper',
    nickname: 'Odysea Skipper',
    type: 'Soft-Top',
    dimensions: '6\'6 × 21 1/2 × 3 0/0',
    length: '6\'6',
    width: '21 1/2"',
    thickness: '3.0"',
    volume: '55.0 L',
    finSetup: 'High-Performance Thruster Soft',
    skill: 'Beginner',
    recommendedWaves: '1–4 ft',
    vanId: 'van-12',
    vanName: 'Van #12 (Rockaway Runner)',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    availableCount: 2,
    personality: 'Indestructible, ultra-fun, stable, and forgiving soft construction that carves like a real board.',
    whyMatch: 'Zero stress, high float, and totally safe in crowded beach-break lineups.',
    twoHours: 22,
    fourHours: 32,
    fullDay: 42,
    tag: 'Max Fun / Zero Stress',
    shapeType: 'soft'
  }),
  createBoard({
    id: 'b-sunday-72',
    code: 'SP-SUN-72-4011',
    name: '7\'2 Firewire Rob Machado Sunday',
    nickname: 'Sunday Mid-Length',
    type: 'Mid-Length',
    dimensions: '7\'2 × 21 1/2 × 3 0/0',
    length: '7\'2',
    width: '21 1/2"',
    thickness: '3.0"',
    volume: '53.8 L',
    finSetup: 'Single Fin or Twin Keel',
    skill: 'All Levels',
    recommendedWaves: '2–5 ft',
    vanId: 'van-12',
    vanName: 'Van #12 (Rockaway Runner)',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    availableCount: 2,
    personality: 'Silky smooth glide, effortless wave catching, and buttery high-line speed.',
    whyMatch: 'Perfect balance of paddle ease and flowing turns on mid-tide Atlantic waves.',
    twoHours: 28,
    fourHours: 40,
    fullDay: 50,
    tag: 'All-Around Favorite',
    shapeType: 'mid',
    condition: 'Mint'
  }),
  createBoard({
    id: 'b-ci-60',
    code: 'SP-CI-60-5091',
    name: '6\'0 Channel Islands Happy Everyday',
    nickname: 'Daily Driver',
    type: 'Shortboard',
    dimensions: '6\'0 × 20 0/0 × 2 9/16',
    length: '6\'0',
    width: '20.0"',
    thickness: '2 9/16"',
    volume: '32.6 L',
    finSetup: 'Futures Thruster',
    skill: 'Advanced',
    recommendedWaves: '3–6 ft',
    vanId: 'van-12',
    vanName: 'Van #12 (Rockaway Runner)',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    availableCount: 1,
    personality: 'Crisp pocket snaps, tight rail turns, and explosive pop on beach-break sections.',
    whyMatch: 'When waves hit the sandbar shelf at 10 AM, this board turns on for vertical snaps.',
    twoHours: 32,
    fourHours: 45,
    fullDay: 58,
    tag: 'Performance Ripper',
    shapeType: 'short'
  }),
  // Rockaway — Van #07
  createBoard({
    id: 'b-rkw07-soft',
    code: 'SP-RK07-SOFT-1',
    name: '8\'0 Soft Top Cruiser',
    nickname: 'Boardwalk Floater',
    type: 'Soft-Top',
    dimensions: '8\'0 × 22 × 3 1/4',
    length: '8\'0',
    width: '22"',
    thickness: '3 1/4"',
    volume: '68 L',
    finSetup: 'Soft Thruster',
    skill: 'Beginner',
    recommendedWaves: '1–3 ft',
    vanId: 'van-07',
    vanName: 'Van #07 (Boardwalk Cruiser)',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    availableCount: 3,
    personality: 'Big, buoyant, and friendly for first sessions near Beach 67th.',
    whyMatch: 'Soft morning peelers at Rockaway — max float, zero ding anxiety.',
    twoHours: 20,
    fourHours: 30,
    fullDay: 40,
    tag: 'Beginner Pick',
    shapeType: 'soft'
  }),
  createBoard({
    id: 'b-rkw07-mid',
    code: 'SP-RK07-MID-2',
    name: '7\'0 Mid-Length Twin',
    nickname: 'Jetty Glider',
    type: 'Mid-Length',
    dimensions: '7\'0 × 21 × 2 7/8',
    length: '7\'0',
    width: '21"',
    thickness: '2 7/8"',
    volume: '48 L',
    finSetup: 'Twin Keel',
    skill: 'Intermediate',
    recommendedWaves: '2–4 ft',
    vanId: 'van-07',
    vanName: 'Van #07 (Boardwalk Cruiser)',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    availableCount: 2,
    personality: 'Fast trim with easy rail engagement for sandbar rights.',
    whyMatch: 'Ideal for Rockaway’s mid-tide shoulders without going full shortboard.',
    twoHours: 27,
    fourHours: 39,
    fullDay: 49,
    tag: 'Local Favorite',
    shapeType: 'mid'
  }),
  // Sunset Cliffs — Van #01
  createBoard({
    id: 'b-sd-fish',
    code: 'SP-SD01-FISH-1',
    name: '5\'8 Almond Fish',
    nickname: 'Cliff Runner',
    type: 'Fish',
    dimensions: '5\'8 × 20 1/2 × 2 1/2',
    length: '5\'8',
    width: '20 1/2"',
    thickness: '2 1/2"',
    volume: '34 L',
    finSetup: 'Twin Keel',
    skill: 'Intermediate',
    recommendedWaves: '3–6 ft',
    vanId: 'van-01-sd',
    vanName: 'Van #01 (Sunset Nomad)',
    beachId: 'sunset-cliffs',
    beachName: 'Sunset Cliffs',
    availableCount: 2,
    personality: 'Speedy down-the-line fish tuned for reef shoulders.',
    whyMatch: 'Perfect for Sunset Cliffs’ rolling lefts on SW groundswell.',
    twoHours: 32,
    fourHours: 46,
    fullDay: 58,
    tag: 'Reef Ready',
    shapeType: 'fish'
  }),
  createBoard({
    id: 'b-sd-mid',
    code: 'SP-SD01-MID-2',
    name: '7\'4 Egg Mid',
    nickname: 'Osprey Egg',
    type: 'Mid-Length',
    dimensions: '7\'4 × 21 3/4 × 2 7/8',
    length: '7\'4',
    width: '21 3/4"',
    thickness: '2 7/8"',
    volume: '52 L',
    finSetup: '2+1',
    skill: 'All Levels',
    recommendedWaves: '2–5 ft',
    vanId: 'van-01-sd',
    vanName: 'Van #01 (Sunset Nomad)',
    beachId: 'sunset-cliffs',
    beachName: 'Sunset Cliffs',
    availableCount: 2,
    personality: 'Forgiving paddle with enough rail for cliff-line carve turns.',
    whyMatch: 'Morning offshore glass at Osprey Point loves mid-length glide.',
    twoHours: 30,
    fourHours: 44,
    fullDay: 55,
    tag: 'Crowd Beater',
    shapeType: 'mid'
  }),
  createBoard({
    id: 'b-sd-short',
    code: 'SP-SD01-SH-3',
    name: '6\'1 Performance Short',
    nickname: 'Point Sniper',
    type: 'Shortboard',
    dimensions: '6\'1 × 19 1/4 × 2 7/16',
    length: '6\'1',
    width: '19 1/4"',
    thickness: '2 7/16"',
    volume: '29.8 L',
    finSetup: 'Thruster',
    skill: 'Advanced',
    recommendedWaves: '4–7 ft',
    vanId: 'van-01-sd',
    vanName: 'Van #01 (Sunset Nomad)',
    beachId: 'sunset-cliffs',
    beachName: 'Sunset Cliffs',
    availableCount: 1,
    personality: 'Tight pocket turns when sets jack on the reef.',
    whyMatch: 'For when Sunset Cliffs hits head-high and you want full control.',
    twoHours: 34,
    fourHours: 48,
    fullDay: 60,
    tag: 'Advanced Only',
    shapeType: 'short'
  }),
  // Montauk — Van #22
  createBoard({
    id: 'b-mtk-log',
    code: 'SP-MT22-LOG-1',
    name: '9\'2 Traditional Log',
    nickname: 'Ditch Noserider',
    type: 'Longboard',
    dimensions: '9\'2 × 23 × 3 1/8',
    length: '9\'2',
    width: '23"',
    thickness: '3 1/8"',
    volume: '72 L',
    finSetup: 'Single Fin 9"',
    skill: 'All Levels',
    recommendedWaves: '2–5 ft',
    vanId: 'van-22',
    vanName: 'Van #22 (Ditch Plains Scout)',
    beachId: 'montauk',
    beachName: 'Montauk - Ditch Plains',
    availableCount: 2,
    personality: 'Classic tip time on cobblestone point rights.',
    whyMatch: 'Montauk’s longer lines reward traditional log trim.',
    twoHours: 28,
    fourHours: 42,
    fullDay: 52,
    tag: 'Point Break Classic',
    shapeType: 'long',
    condition: 'Mint'
  }),
  createBoard({
    id: 'b-mtk-mid',
    code: 'SP-MT22-MID-2',
    name: '7\'6 Mid Twin',
    nickname: 'Bluff Cruiser',
    type: 'Mid-Length',
    dimensions: '7\'6 × 21 1/2 × 2 3/4',
    length: '7\'6',
    width: '21 1/2"',
    thickness: '2 3/4"',
    volume: '50 L',
    finSetup: 'Twin + Trailer',
    skill: 'Intermediate',
    recommendedWaves: '2–5 ft',
    vanId: 'van-22',
    vanName: 'Van #22 (Ditch Plains Scout)',
    beachId: 'montauk',
    beachName: 'Montauk - Ditch Plains',
    availableCount: 2,
    personality: 'Flows through Montauk’s mid-tide windows with speed.',
    whyMatch: 'Best all-rounder when Ditch is chest-high and clean.',
    twoHours: 29,
    fourHours: 43,
    fullDay: 54,
    tag: 'East End Pick',
    shapeType: 'mid'
  }),
  createBoard({
    id: 'b-mtk-soft',
    code: 'SP-MT22-SOFT-3',
    name: '8\' Soft Top',
    nickname: 'Camp Hero Softie',
    type: 'Soft-Top',
    dimensions: '8\'0 × 22 × 3',
    length: '8\'0',
    width: '22"',
    thickness: '3"',
    volume: '65 L',
    finSetup: 'Soft Thruster',
    skill: 'Beginner',
    recommendedWaves: '1–3 ft',
    vanId: 'van-22',
    vanName: 'Van #22 (Ditch Plains Scout)',
    beachId: 'montauk',
    beachName: 'Montauk - Ditch Plains',
    availableCount: 2,
    personality: 'Safe, floaty intro board for Montauk first-timers.',
    whyMatch: 'Smaller days at Ditch Plains — easy catch rate.',
    twoHours: 22,
    fourHours: 34,
    fullDay: 44,
    tag: 'Traveler Soft',
    shapeType: 'soft'
  }),
  // Asbury Park — Van #18
  createBoard({
    id: 'b-asb-soft',
    code: 'SP-AP18-SOFT-1',
    name: '7\' Soft Top Funboard',
    nickname: 'Convention Softie',
    type: 'Soft-Top',
    dimensions: '7\'0 × 21 1/2 × 3',
    length: '7\'0',
    width: '21 1/2"',
    thickness: '3"',
    volume: '58 L',
    finSetup: 'Soft Thruster',
    skill: 'Beginner',
    recommendedWaves: '1–3 ft',
    vanId: 'van-18',
    vanName: 'Van #18 (Asbury Jetty)',
    beachId: 'asbury-park',
    beachName: 'Asbury Park',
    availableCount: 3,
    personality: 'Stable and soft for Asbury’s mellow beach-break peaks.',
    whyMatch: 'Perfect next to the 8th Avenue jetty on FAIR-GOOD mornings.',
    twoHours: 20,
    fourHours: 30,
    fullDay: 40,
    tag: 'Boardwalk Beginner',
    shapeType: 'soft'
  }),
  createBoard({
    id: 'b-asb-long',
    code: 'SP-AP18-LOG-2',
    name: '9\'0 Soft-Rail Log',
    nickname: 'Stone Pony Log',
    type: 'Longboard',
    dimensions: '9\'0 × 22 3/4 × 3',
    length: '9\'0',
    width: '22 3/4"',
    thickness: '3"',
    volume: '70 L',
    finSetup: 'Single Fin',
    skill: 'All Levels',
    recommendedWaves: '1–3 ft',
    vanId: 'van-18',
    vanName: 'Van #18 (Asbury Jetty)',
    beachId: 'asbury-park',
    beachName: 'Asbury Park',
    availableCount: 2,
    personality: 'Easy noserides on soft NJ windswell.',
    whyMatch: 'Asbury’s knee-to-waist peaks love volume and length.',
    twoHours: 24,
    fourHours: 36,
    fullDay: 46,
    tag: 'NJ Classic',
    shapeType: 'long'
  }),
  createBoard({
    id: 'b-asb-fish',
    code: 'SP-AP18-FISH-3',
    name: '5\'10 Retro Fish',
    nickname: 'Jetty Twin',
    type: 'Fish',
    dimensions: '5\'10 × 20 3/4 × 2 1/2',
    length: '5\'10',
    width: '20 3/4"',
    thickness: '2 1/2"',
    volume: '36 L',
    finSetup: 'Twin Keel',
    skill: 'Intermediate',
    recommendedWaves: '2–4 ft',
    vanId: 'van-18',
    vanName: 'Van #18 (Asbury Jetty)',
    beachId: 'asbury-park',
    beachName: 'Asbury Park',
    availableCount: 1,
    personality: 'Quick acceleration off the soft NJ sandbar.',
    whyMatch: 'When Asbury gets a bit more punch, this fish lights up.',
    twoHours: 26,
    fourHours: 38,
    fullDay: 48,
    tag: 'Punchy Peaks',
    shapeType: 'fish'
  }),
  // Huntington — Van #31
  createBoard({
    id: 'b-hb-short',
    code: 'SP-HB31-SH-1',
    name: '6\'0 CI Dumpster Diver',
    nickname: 'Pier Sniper',
    type: 'Shortboard',
    dimensions: '6\'0 × 19 1/8 × 2 7/16',
    length: '6\'0',
    width: '19 1/8"',
    thickness: '2 7/16"',
    volume: '30.5 L',
    finSetup: 'Thruster',
    skill: 'Advanced',
    recommendedWaves: '3–6 ft',
    vanId: 'van-31',
    vanName: 'Van #31 (Huntington Nomad)',
    beachId: 'huntington',
    beachName: 'Huntington Beach',
    availableCount: 2,
    personality: 'Tight turns for HB pier bowls and inside reform.',
    whyMatch: 'When southside is waist-to-head, this is the daily driver.',
    twoHours: 33,
    fourHours: 47,
    fullDay: 59,
    tag: 'Surf City Pro',
    shapeType: 'short'
  }),
  createBoard({
    id: 'b-hb-fish',
    code: 'SP-HB31-FISH-2',
    name: '5\'9 Twin Fish',
    nickname: 'PCH Twin',
    type: 'Fish',
    dimensions: '5\'9 × 20 1/4 × 2 1/2',
    length: '5\'9',
    width: '20 1/4"',
    thickness: '2 1/2"',
    volume: '34 L',
    finSetup: 'Twin Keel',
    skill: 'Intermediate',
    recommendedWaves: '2–5 ft',
    vanId: 'van-31',
    vanName: 'Van #31 (Huntington Nomad)',
    beachId: 'huntington',
    beachName: 'Huntington Beach',
    availableCount: 2,
    personality: 'Speed for Huntington’s punchy beach-break sections.',
    whyMatch: 'Great when HB is fun but not quite shortboard-critical.',
    twoHours: 31,
    fourHours: 45,
    fullDay: 56,
    tag: 'Pier Speed',
    shapeType: 'fish'
  }),
  createBoard({
    id: 'b-hb-soft',
    code: 'SP-HB31-SOFT-3',
    name: '7\' Soft Top',
    nickname: 'Main St Softie',
    type: 'Soft-Top',
    dimensions: '7\'0 × 21 × 3',
    length: '7\'0',
    width: '21"',
    thickness: '3"',
    volume: '56 L',
    finSetup: 'Soft Thruster',
    skill: 'Beginner',
    recommendedWaves: '1–3 ft',
    vanId: 'van-31',
    vanName: 'Van #31 (Huntington Nomad)',
    beachId: 'huntington',
    beachName: 'Huntington Beach',
    availableCount: 3,
    personality: 'Easy catch rate for Surf City first sessions.',
    whyMatch: 'Soft mornings south of the pier — max fun, min stress.',
    twoHours: 22,
    fourHours: 34,
    fullDay: 44,
    tag: 'Family Friendly',
    shapeType: 'soft'
  }),
  // Lower Trestles — Van #28
  createBoard({
    id: 'b-lt-short',
    code: 'SP-LT28-SH-1',
    name: '5\'11 JS Monsta Box',
    nickname: 'Lowers Weapon',
    type: 'Shortboard',
    dimensions: '5\'11 × 18 3/4 × 2 5/16',
    length: '5\'11',
    width: '18 3/4"',
    thickness: '2 5/16"',
    volume: '27.5 L',
    finSetup: 'Thruster',
    skill: 'Advanced',
    recommendedWaves: '4–7 ft',
    vanId: 'van-28',
    vanName: 'Van #28 (Lowers Local)',
    beachId: 'trestles',
    beachName: 'Lower Trestles',
    availableCount: 2,
    personality: 'Competition outline for A-frame rights and lefts.',
    whyMatch: 'When Lowers is firing, this is the board that keeps up.',
    twoHours: 38,
    fourHours: 54,
    fullDay: 68,
    tag: 'World-Class Only',
    shapeType: 'short',
    condition: 'Mint'
  }),
  createBoard({
    id: 'b-lt-fish',
    code: 'SP-LT28-FISH-2',
    name: '5\'10 Step-Up Fish',
    nickname: 'Trail Twin',
    type: 'Fish',
    dimensions: '5\'10 × 19 3/4 × 2 7/16',
    length: '5\'10',
    width: '19 3/4"',
    thickness: '2 7/16"',
    volume: '31 L',
    finSetup: 'Quad',
    skill: 'Advanced',
    recommendedWaves: '3–6 ft',
    vanId: 'van-28',
    vanName: 'Van #28 (Lowers Local)',
    beachId: 'trestles',
    beachName: 'Lower Trestles',
    availableCount: 2,
    personality: 'Holds speed through Lowers’ long open faces.',
    whyMatch: 'Slightly softer days at Lowers still reward a refined fish.',
    twoHours: 35,
    fourHours: 50,
    fullDay: 62,
    tag: 'Performance Fish',
    shapeType: 'fish'
  }),
  createBoard({
    id: 'b-lt-mid',
    code: 'SP-LT28-MID-3',
    name: '6\'8 Mid Step-Down',
    nickname: 'Cobble Mid',
    type: 'Mid-Length',
    dimensions: '6\'8 × 20 1/2 × 2 5/8',
    length: '6\'8',
    width: '20 1/2"',
    thickness: '2 5/8"',
    volume: '42 L',
    finSetup: '2+1',
    skill: 'Intermediate',
    recommendedWaves: '2–5 ft',
    vanId: 'van-28',
    vanName: 'Van #28 (Lowers Local)',
    beachId: 'trestles',
    beachName: 'Lower Trestles',
    availableCount: 1,
    personality: 'More paddle for San Onofre days that aren’t full Lowers.',
    whyMatch: 'When the rivermouth is fun but not critical.',
    twoHours: 32,
    fourHours: 46,
    fullDay: 58,
    tag: 'Trail All-Rounder',
    shapeType: 'mid'
  }),
  // Cocoa Beach — Van #45
  createBoard({
    id: 'b-cb-long',
    code: 'SP-CB45-LOG-1',
    name: '9\' Soft-Rail Longboard',
    nickname: 'Pier Noserider',
    type: 'Longboard',
    dimensions: '9\'0 × 23 × 3 1/8',
    length: '9\'0',
    width: '23"',
    thickness: '3 1/8"',
    volume: '73 L',
    finSetup: 'Single Fin',
    skill: 'All Levels',
    recommendedWaves: '1–3 ft',
    vanId: 'van-45',
    vanName: 'Van #45 (Cocoa Cruiser)',
    beachId: 'cocoa-beach',
    beachName: 'Cocoa Beach',
    availableCount: 3,
    personality: 'Warm-water glide for Cocoa’s gentle peelers.',
    whyMatch: 'Classic Cocoa Beach pier rights on trade swell.',
    twoHours: 24,
    fourHours: 36,
    fullDay: 46,
    tag: 'Florida Classic',
    shapeType: 'long'
  }),
  createBoard({
    id: 'b-cb-soft',
    code: 'SP-CB45-SOFT-2',
    name: '8\' Soft Top',
    nickname: 'Space Coast Softie',
    type: 'Soft-Top',
    dimensions: '8\'0 × 22 × 3 1/4',
    length: '8\'0',
    width: '22"',
    thickness: '3 1/4"',
    volume: '67 L',
    finSetup: 'Soft Thruster',
    skill: 'Beginner',
    recommendedWaves: '1–3 ft',
    vanId: 'van-45',
    vanName: 'Van #45 (Cocoa Cruiser)',
    beachId: 'cocoa-beach',
    beachName: 'Cocoa Beach',
    availableCount: 3,
    personality: 'Ultra-stable for warm Atlantic beginners.',
    whyMatch: 'Cocoa’s thigh-to-waist mornings — catch everything.',
    twoHours: 20,
    fourHours: 30,
    fullDay: 40,
    tag: 'Warm Water Fun',
    shapeType: 'soft'
  }),
  createBoard({
    id: 'b-cb-mid',
    code: 'SP-CB45-MID-3',
    name: '7\'2 Fun Mid',
    nickname: 'Meade Ave Mid',
    type: 'Mid-Length',
    dimensions: '7\'2 × 21 1/4 × 2 3/4',
    length: '7\'2',
    width: '21 1/4"',
    thickness: '2 3/4"',
    volume: '49 L',
    finSetup: '2+1',
    skill: 'Intermediate',
    recommendedWaves: '2–4 ft',
    vanId: 'van-45',
    vanName: 'Van #45 (Cocoa Cruiser)',
    beachId: 'cocoa-beach',
    beachName: 'Cocoa Beach',
    availableCount: 2,
    personality: 'More drive than a softie when Cocoa gets a bump.',
    whyMatch: 'When the pier sandbar stands up a little taller.',
    twoHours: 26,
    fourHours: 38,
    fullDay: 48,
    tag: 'Step-Up Fun',
    shapeType: 'mid'
  }),
  // Waikiki — Van #61
  createBoard({
    id: 'b-wk-long',
    code: 'SP-WK61-LOG-1',
    name: '10\' Soft Longboard',
    nickname: 'Queens Glider',
    type: 'Longboard',
    dimensions: '10\'0 × 24 × 3 1/2',
    length: '10\'0',
    width: '24"',
    thickness: '3 1/2"',
    volume: '95 L',
    finSetup: 'Single Fin',
    skill: 'All Levels',
    recommendedWaves: '2–4 ft',
    vanId: 'van-61',
    vanName: 'Van #61 (Waikiki Nomad)',
    beachId: 'waikiki',
    beachName: 'Waikiki',
    availableCount: 4,
    personality: 'The classic Waikiki rental experience — endless rights.',
    whyMatch: 'Queens & Canoes rolling southern swell paradise.',
    twoHours: 30,
    fourHours: 45,
    fullDay: 60,
    tag: 'Island Classic',
    shapeType: 'long',
    condition: 'Mint'
  }),
  createBoard({
    id: 'b-wk-soft',
    code: 'SP-WK61-SOFT-2',
    name: '8\' Soft Top',
    nickname: 'Diamond Softie',
    type: 'Soft-Top',
    dimensions: '8\'0 × 22 1/2 × 3 1/4',
    length: '8\'0',
    width: '22 1/2"',
    thickness: '3 1/4"',
    volume: '70 L',
    finSetup: 'Soft Thruster',
    skill: 'Beginner',
    recommendedWaves: '1–3 ft',
    vanId: 'van-61',
    vanName: 'Van #61 (Waikiki Nomad)',
    beachId: 'waikiki',
    beachName: 'Waikiki',
    availableCount: 3,
    personality: 'Safe tropical intro board under Diamond Head.',
    whyMatch: 'First Hawaiian session — floaty and forgiving.',
    twoHours: 24,
    fourHours: 36,
    fullDay: 48,
    tag: 'Aloha Beginner',
    shapeType: 'soft'
  }),
  createBoard({
    id: 'b-wk-mid',
    code: 'SP-WK61-MID-3',
    name: '8\' Mid-Length',
    nickname: 'Canoes Cruiser',
    type: 'Mid-Length',
    dimensions: '8\'0 × 22 × 3',
    length: '8\'0',
    width: '22"',
    thickness: '3"',
    volume: '62 L',
    finSetup: '2+1',
    skill: 'Intermediate',
    recommendedWaves: '2–4 ft',
    vanId: 'van-61',
    vanName: 'Van #61 (Waikiki Nomad)',
    beachId: 'waikiki',
    beachName: 'Waikiki',
    availableCount: 2,
    personality: 'More rail than a softie for longer Waikiki walls.',
    whyMatch: 'When you want classic Waikiki rides with a bit more performance.',
    twoHours: 28,
    fourHours: 42,
    fullDay: 55,
    tag: 'Reef Glide',
    shapeType: 'mid'
  }),
  // Outer Banks — Van #55
  createBoard({
    id: 'b-obx-short',
    code: 'SP-OB55-SH-1',
    name: '6\'2 Step-Up',
    nickname: 'Lighthouse Step-Up',
    type: 'Shortboard',
    dimensions: '6\'2 × 18 7/8 × 2 3/8',
    length: '6\'2',
    width: '18 7/8"',
    thickness: '2 3/8"',
    volume: '28.5 L',
    finSetup: 'Thruster',
    skill: 'Advanced',
    recommendedWaves: '4–7 ft',
    vanId: 'van-55',
    vanName: 'Van #55 (Hatteras Hauler)',
    beachId: 'outer-banks',
    beachName: 'Outer Banks - Cape Hatteras',
    availableCount: 2,
    personality: 'Holds in punchy Hatteras A-frames.',
    whyMatch: 'When Buxton sandbars start spitting, bring the step-up.',
    twoHours: 34,
    fourHours: 48,
    fullDay: 60,
    tag: 'OBX Power',
    shapeType: 'short'
  }),
  createBoard({
    id: 'b-obx-fish',
    code: 'SP-OB55-FISH-2',
    name: '5\'10 Groveler Fish',
    nickname: 'Buxton Groveler',
    type: 'Fish',
    dimensions: '5\'10 × 20 1/2 × 2 5/8',
    length: '5\'10',
    width: '20 1/2"',
    thickness: '2 5/8"',
    volume: '36 L',
    finSetup: 'Quad',
    skill: 'Intermediate',
    recommendedWaves: '2–5 ft',
    vanId: 'van-55',
    vanName: 'Van #55 (Hatteras Hauler)',
    beachId: 'outer-banks',
    beachName: 'Outer Banks - Cape Hatteras',
    availableCount: 2,
    personality: 'Gets you into slower OBX reform sections early.',
    whyMatch: 'Smaller Hatteras days still reward a wide fish.',
    twoHours: 30,
    fourHours: 44,
    fullDay: 55,
    tag: 'Sandbar Speed',
    shapeType: 'fish'
  }),
  createBoard({
    id: 'b-obx-mid',
    code: 'SP-OB55-MID-3',
    name: '7\'0 Mid',
    nickname: 'Cape Mid',
    type: 'Mid-Length',
    dimensions: '7\'0 × 21 × 2 3/4',
    length: '7\'0',
    width: '21"',
    thickness: '2 3/4"',
    volume: '47 L',
    finSetup: '2+1',
    skill: 'All Levels',
    recommendedWaves: '2–4 ft',
    vanId: 'van-55',
    vanName: 'Van #55 (Hatteras Hauler)',
    beachId: 'outer-banks',
    beachName: 'Outer Banks - Cape Hatteras',
    availableCount: 2,
    personality: 'Versatile paddle power for shifting barrier-island peaks.',
    whyMatch: 'The safest all-rounder when OBX conditions bounce around.',
    twoHours: 28,
    fourHours: 40,
    fullDay: 50,
    tag: 'Barrier Island All-Rounder',
    shapeType: 'mid'
  }),
  // --- Fill every van with a full quiver (Longboard / Mid / Fish / Soft / Short) ---
  createBoard({
    id: 'b-rkw07-long', code: 'SP-RK07-LOG-3', name: '9\'0 Classic Log', nickname: '67th Log',
    type: 'Longboard', dimensions: '9\'0 × 22 3/4 × 3', length: '9\'0', width: '22 3/4"', thickness: '3"', volume: '70 L',
    finSetup: 'Single Fin', skill: 'All Levels', recommendedWaves: '1–3 ft',
    vanId: 'van-07', vanName: 'Van #07 (Boardwalk Cruiser)', beachId: 'rockaway', beachName: 'Rockaway Beach',
    availableCount: 2, personality: 'Easy glide near Beach 67th for mellow morning peelers.', whyMatch: 'Rockaway soft days love length and volume.',
    twoHours: 24, fourHours: 36, fullDay: 46, tag: 'Boardwalk Log', shapeType: 'long'
  }),
  createBoard({
    id: 'b-rkw07-fish', code: 'SP-RK07-FISH-4', name: '5\'9 Twin Fish', nickname: 'Subway Twin',
    type: 'Fish', dimensions: '5\'9 × 20 1/4 × 2 1/2', length: '5\'9', width: '20 1/4"', thickness: '2 1/2"', volume: '34 L',
    finSetup: 'Twin Keel', skill: 'Intermediate', recommendedWaves: '2–4 ft',
    vanId: 'van-07', vanName: 'Van #07 (Boardwalk Cruiser)', beachId: 'rockaway', beachName: 'Rockaway Beach',
    availableCount: 2, personality: 'Quick acceleration off Rockaway sandbars.', whyMatch: 'When Beach 67th gets a bit more punch.',
    twoHours: 28, fourHours: 40, fullDay: 50, tag: 'Speed Twin', shapeType: 'fish'
  }),
  createBoard({
    id: 'b-rkw07-short', code: 'SP-RK07-SH-5', name: '6\'0 Daily Shortboard', nickname: 'Queens Shorty',
    type: 'Shortboard', dimensions: '6\'0 × 19 1/4 × 2 7/16', length: '6\'0', width: '19 1/4"', thickness: '2 7/16"', volume: '30 L',
    finSetup: 'Thruster', skill: 'Advanced', recommendedWaves: '3–5 ft',
    vanId: 'van-07', vanName: 'Van #07 (Boardwalk Cruiser)', beachId: 'rockaway', beachName: 'Rockaway Beach',
    availableCount: 1, personality: 'Pocket snaps for punchier Rockaway sets.', whyMatch: 'Best when the jetty sandbar stands up.',
    twoHours: 32, fourHours: 45, fullDay: 56, tag: 'Performance', shapeType: 'short'
  }),
  createBoard({
    id: 'b-sd-long', code: 'SP-SD01-LOG-4', name: '9\'2 Cliff Log', nickname: 'Osprey Log',
    type: 'Longboard', dimensions: '9\'2 × 23 × 3 1/8', length: '9\'2', width: '23"', thickness: '3 1/8"', volume: '72 L',
    finSetup: 'Single Fin', skill: 'All Levels', recommendedWaves: '2–4 ft',
    vanId: 'van-01-sd', vanName: 'Van #01 (Sunset Nomad)', beachId: 'sunset-cliffs', beachName: 'Sunset Cliffs',
    availableCount: 2, personality: 'Long rolling trim along the cliff line.', whyMatch: 'Morning glass at Sunset Cliffs loves a traditional log.',
    twoHours: 30, fourHours: 44, fullDay: 55, tag: 'Cliff Classic', shapeType: 'long', condition: 'Mint'
  }),
  createBoard({
    id: 'b-sd-soft', code: 'SP-SD01-SOFT-5', name: '8\' Soft Top', nickname: 'Cliff Softie',
    type: 'Soft-Top', dimensions: '8\'0 × 22 × 3 1/4', length: '8\'0', width: '22"', thickness: '3 1/4"', volume: '66 L',
    finSetup: 'Soft Thruster', skill: 'Beginner', recommendedWaves: '1–3 ft',
    vanId: 'van-01-sd', vanName: 'Van #01 (Sunset Nomad)', beachId: 'sunset-cliffs', beachName: 'Sunset Cliffs',
    availableCount: 2, personality: 'Safe intro board for San Diego first sessions.', whyMatch: 'Smaller cliff days — max float, min stress.',
    twoHours: 22, fourHours: 34, fullDay: 44, tag: 'Beginner Safe', shapeType: 'soft'
  }),
  createBoard({
    id: 'b-mtk-fish', code: 'SP-MT22-FISH-4', name: '5\'10 Montauk Fish', nickname: 'Ditch Twin',
    type: 'Fish', dimensions: '5\'10 × 20 1/2 × 2 1/2', length: '5\'10', width: '20 1/2"', thickness: '2 1/2"', volume: '35 L',
    finSetup: 'Twin Keel', skill: 'Intermediate', recommendedWaves: '2–5 ft',
    vanId: 'van-22', vanName: 'Van #22 (Ditch Plains Scout)', beachId: 'montauk', beachName: 'Montauk - Ditch Plains',
    availableCount: 2, personality: 'Speedy down the cobblestone point.', whyMatch: 'When Ditch is chest-high and you want more drive than a log.',
    twoHours: 30, fourHours: 44, fullDay: 54, tag: 'Point Speed', shapeType: 'fish'
  }),
  createBoard({
    id: 'b-mtk-short', code: 'SP-MT22-SH-5', name: '6\'1 East End Short', nickname: 'Bluff Shorty',
    type: 'Shortboard', dimensions: '6\'1 × 19 × 2 3/8', length: '6\'1', width: '19"', thickness: '2 3/8"', volume: '29 L',
    finSetup: 'Thruster', skill: 'Advanced', recommendedWaves: '3–6 ft',
    vanId: 'van-22', vanName: 'Van #22 (Ditch Plains Scout)', beachId: 'montauk', beachName: 'Montauk - Ditch Plains',
    availableCount: 1, personality: 'Holds rail when Montauk jacks on groundswell.', whyMatch: 'Bigger East End days need a proper shortboard.',
    twoHours: 34, fourHours: 48, fullDay: 58, tag: 'Advanced', shapeType: 'short'
  }),
  createBoard({
    id: 'b-asb-mid', code: 'SP-AP18-MID-4', name: '7\'0 Asbury Mid', nickname: 'Convention Mid',
    type: 'Mid-Length', dimensions: '7\'0 × 21 × 2 3/4', length: '7\'0', width: '21"', thickness: '2 3/4"', volume: '48 L',
    finSetup: '2+1', skill: 'All Levels', recommendedWaves: '1–4 ft',
    vanId: 'van-18', vanName: 'Van #18 (Asbury Jetty)', beachId: 'asbury-park', beachName: 'Asbury Park',
    availableCount: 2, personality: 'Balanced paddle and turn for NJ beach-break.', whyMatch: 'Ideal when Asbury is soft but you want more rail than a softie.',
    twoHours: 25, fourHours: 37, fullDay: 47, tag: 'NJ Mid', shapeType: 'mid'
  }),
  createBoard({
    id: 'b-asb-short', code: 'SP-AP18-SH-5', name: '6\'0 Asbury Short', nickname: 'Jetty Shorty',
    type: 'Shortboard', dimensions: '6\'0 × 19 1/4 × 2 7/16', length: '6\'0', width: '19 1/4"', thickness: '2 7/16"', volume: '30.5 L',
    finSetup: 'Thruster', skill: 'Advanced', recommendedWaves: '2–5 ft',
    vanId: 'van-18', vanName: 'Van #18 (Asbury Jetty)', beachId: 'asbury-park', beachName: 'Asbury Park',
    availableCount: 1, personality: 'Quick redirects off the 8th Avenue sandbar.', whyMatch: 'When Asbury gets a real bump of swell.',
    twoHours: 30, fourHours: 44, fullDay: 54, tag: 'Performance', shapeType: 'short'
  }),
  createBoard({
    id: 'b-hb-long', code: 'SP-HB31-LOG-4', name: '9\'0 HB Log', nickname: 'Pier Log',
    type: 'Longboard', dimensions: '9\'0 × 23 × 3 1/8', length: '9\'0', width: '23"', thickness: '3 1/8"', volume: '73 L',
    finSetup: 'Single Fin', skill: 'All Levels', recommendedWaves: '1–4 ft',
    vanId: 'van-31', vanName: 'Van #31 (Huntington Nomad)', beachId: 'huntington', beachName: 'Huntington Beach',
    availableCount: 2, personality: 'Classic Surf City noserider for mellow pier mornings.', whyMatch: 'Soft HB days south of the pier.',
    twoHours: 28, fourHours: 42, fullDay: 52, tag: 'Surf City Log', shapeType: 'long'
  }),
  createBoard({
    id: 'b-hb-mid', code: 'SP-HB31-MID-5', name: '7\'2 HB Mid', nickname: 'PCH Mid',
    type: 'Mid-Length', dimensions: '7\'2 × 21 1/4 × 2 3/4', length: '7\'2', width: '21 1/4"', thickness: '2 3/4"', volume: '49 L',
    finSetup: '2+1', skill: 'Intermediate', recommendedWaves: '2–5 ft',
    vanId: 'van-31', vanName: 'Van #31 (Huntington Nomad)', beachId: 'huntington', beachName: 'Huntington Beach',
    availableCount: 2, personality: 'Flowing mid for Huntington’s all-day beach-break.', whyMatch: 'Waist-high HB with clean shoulders.',
    twoHours: 29, fourHours: 43, fullDay: 54, tag: 'All-Day Mid', shapeType: 'mid'
  }),
  createBoard({
    id: 'b-lt-long', code: 'SP-LT28-LOG-4', name: '9\'0 Trestles Log', nickname: 'Trail Log',
    type: 'Longboard', dimensions: '9\'0 × 22 3/4 × 3', length: '9\'0', width: '22 3/4"', thickness: '3"', volume: '70 L',
    finSetup: 'Single Fin', skill: 'All Levels', recommendedWaves: '2–4 ft',
    vanId: 'van-28', vanName: 'Van #28 (Lowers Local)', beachId: 'trestles', beachName: 'Lower Trestles',
    availableCount: 1, personality: 'Glide for softer San Onofre / Trestles days.', whyMatch: 'When Lowers is fun but not full competition size.',
    twoHours: 32, fourHours: 46, fullDay: 58, tag: 'Trail Log', shapeType: 'long'
  }),
  createBoard({
    id: 'b-lt-soft', code: 'SP-LT28-SOFT-5', name: '8\' Soft Top', nickname: 'SanO Softie',
    type: 'Soft-Top', dimensions: '8\'0 × 22 × 3 1/4', length: '8\'0', width: '22"', thickness: '3 1/4"', volume: '66 L',
    finSetup: 'Soft Thruster', skill: 'Beginner', recommendedWaves: '1–3 ft',
    vanId: 'van-28', vanName: 'Van #28 (Lowers Local)', beachId: 'trestles', beachName: 'Lower Trestles',
    availableCount: 2, personality: 'Safe option for first San Onofre sessions.', whyMatch: 'Smaller trail days before the hike feels intense.',
    twoHours: 24, fourHours: 36, fullDay: 46, tag: 'Beginner Trail', shapeType: 'soft'
  }),
  createBoard({
    id: 'b-cb-fish', code: 'SP-CB45-FISH-4', name: '5\'10 Cocoa Fish', nickname: 'Pier Twin',
    type: 'Fish', dimensions: '5\'10 × 20 1/2 × 2 1/2', length: '5\'10', width: '20 1/2"', thickness: '2 1/2"', volume: '35 L',
    finSetup: 'Twin Keel', skill: 'Intermediate', recommendedWaves: '2–4 ft',
    vanId: 'van-45', vanName: 'Van #45 (Cocoa Cruiser)', beachId: 'cocoa-beach', beachName: 'Cocoa Beach',
    availableCount: 2, personality: 'Speed for Cocoa sandbar sections.', whyMatch: 'When the pier gets a little more punch than softie weather.',
    twoHours: 28, fourHours: 40, fullDay: 50, tag: 'Space Coast Twin', shapeType: 'fish'
  }),
  createBoard({
    id: 'b-cb-short', code: 'SP-CB45-SH-5', name: '6\'0 Cocoa Short', nickname: 'Meade Shorty',
    type: 'Shortboard', dimensions: '6\'0 × 19 1/4 × 2 7/16', length: '6\'0', width: '19 1/4"', thickness: '2 7/16"', volume: '30.5 L',
    finSetup: 'Thruster', skill: 'Advanced', recommendedWaves: '2–5 ft',
    vanId: 'van-45', vanName: 'Van #45 (Cocoa Cruiser)', beachId: 'cocoa-beach', beachName: 'Cocoa Beach',
    availableCount: 1, personality: 'Quick turns when Florida stands up.', whyMatch: 'Better swell windows at Cocoa Beach Pier.',
    twoHours: 30, fourHours: 44, fullDay: 54, tag: 'Florida Performance', shapeType: 'short'
  }),
  createBoard({
    id: 'b-wk-fish', code: 'SP-WK61-FISH-4', name: '5\'10 Waikiki Fish', nickname: 'Canoes Twin',
    type: 'Fish', dimensions: '5\'10 × 20 3/4 × 2 1/2', length: '5\'10', width: '20 3/4"', thickness: '2 1/2"', volume: '36 L',
    finSetup: 'Twin Keel', skill: 'Intermediate', recommendedWaves: '2–4 ft',
    vanId: 'van-61', vanName: 'Van #61 (Waikiki Nomad)', beachId: 'waikiki', beachName: 'Waikiki',
    availableCount: 2, personality: 'Faster trim across Queens walls than a softie.', whyMatch: 'When you want more drive on rolling Waikiki rights.',
    twoHours: 30, fourHours: 44, fullDay: 56, tag: 'Island Twin', shapeType: 'fish'
  }),
  createBoard({
    id: 'b-wk-short', code: 'SP-WK61-SH-5', name: '6\'0 Hawaii Short', nickname: 'Diamond Shorty',
    type: 'Shortboard', dimensions: '6\'0 × 19 × 2 3/8', length: '6\'0', width: '19"', thickness: '2 3/8"', volume: '29.5 L',
    finSetup: 'Thruster', skill: 'Advanced', recommendedWaves: '3–5 ft',
    vanId: 'van-61', vanName: 'Van #61 (Waikiki Nomad)', beachId: 'waikiki', beachName: 'Waikiki',
    availableCount: 1, personality: 'For stronger south swell days beyond beginner Waikiki.', whyMatch: 'When Canoes / Queens has real size.',
    twoHours: 34, fourHours: 48, fullDay: 60, tag: 'Island Performance', shapeType: 'short'
  }),
  createBoard({
    id: 'b-obx-long', code: 'SP-OB55-LOG-4', name: '9\'0 OBX Log', nickname: 'Lighthouse Log',
    type: 'Longboard', dimensions: '9\'0 × 23 × 3 1/8', length: '9\'0', width: '23"', thickness: '3 1/8"', volume: '72 L',
    finSetup: 'Single Fin', skill: 'All Levels', recommendedWaves: '1–4 ft',
    vanId: 'van-55', vanName: 'Van #55 (Hatteras Hauler)', beachId: 'outer-banks', beachName: 'Outer Banks - Cape Hatteras',
    availableCount: 2, personality: 'Glide for softer Hatteras mornings.', whyMatch: 'When Buxton is playful rather than heavy.',
    twoHours: 26, fourHours: 38, fullDay: 48, tag: 'OBX Log', shapeType: 'long'
  }),
  createBoard({
    id: 'b-obx-soft', code: 'SP-OB55-SOFT-5', name: '8\' Soft Top', nickname: 'Hatteras Softie',
    type: 'Soft-Top', dimensions: '8\'0 × 22 × 3 1/4', length: '8\'0', width: '22"', thickness: '3 1/4"', volume: '66 L',
    finSetup: 'Soft Thruster', skill: 'Beginner', recommendedWaves: '1–3 ft',
    vanId: 'van-55', vanName: 'Van #55 (Hatteras Hauler)', beachId: 'outer-banks', beachName: 'Outer Banks - Cape Hatteras',
    availableCount: 2, personality: 'Safe intro board for Outer Banks first sessions.', whyMatch: 'Smaller barrier-island days — float and forgive.',
    twoHours: 22, fourHours: 34, fullDay: 44, tag: 'Beginner OBX', shapeType: 'soft'
  })
]

// --- CLEAN VECTOR SURFBOARD SILHOUETTES ---
function BoardSilhouette({ type, className = "h-40" }: { type: 'long' | 'mid' | 'fish' | 'short' | 'soft', className?: string }) {
  switch (type) {
    case 'long':
      return (
        <svg viewBox="0 0 100 320" className={`w-auto drop-shadow-md mx-auto ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 8 C68 35, 78 110, 78 190 C78 260, 70 298, 56 312 C53 315, 47 315, 44 312 C30 298, 22 260, 22 190 C22 110, 32 35, 50 8 Z" fill="#0E1E2E" stroke="#38BDF8" strokeWidth="2.5" />
          <path d="M50 14 L50 310" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M50 250 L50 295" stroke="#38BDF8" strokeWidth="3" />
          <rect x="42" y="140" width="16" height="50" rx="3" fill="#0284C7" fillOpacity="0.25" stroke="#38BDF8" strokeWidth="1" />
          <text x="50" y="168" textAnchor="middle" fill="#BAE6FD" fontSize="8" fontFamily="sans-serif" fontWeight="bold">9'4 LOG</text>
        </svg>
      )
    case 'fish':
      return (
        <svg viewBox="0 0 110 240" className={`w-auto drop-shadow-md mx-auto ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M55 8 C76 35, 88 90, 88 150 C88 190, 84 218, 76 232 C72 239, 66 230, 55 210 C44 230, 38 239, 34 232 C26 218, 22 190, 22 150 C22 90, 34 35, 55 8 Z" fill="#1C1938" stroke="#A855F7" strokeWidth="2.5" />
          <path d="M55 14 L55 210" stroke="#9333EA" strokeWidth="1.5" />
          <path d="M34 185 L32 215" stroke="#C084FC" strokeWidth="3.5" />
          <path d="M76 185 L78 215" stroke="#C084FC" strokeWidth="3.5" />
          <rect x="44" y="110" width="22" height="40" rx="3" fill="#9333EA" fillOpacity="0.25" stroke="#C084FC" strokeWidth="1" />
          <text x="55" y="134" textAnchor="middle" fill="#F3E8FF" fontSize="8" fontFamily="sans-serif" fontWeight="bold">5'10 FISH</text>
        </svg>
      )
    case 'mid':
      return (
        <svg viewBox="0 0 100 270" className={`w-auto drop-shadow-md mx-auto ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 8 C72 40, 80 100, 80 160 C80 215, 72 248, 56 264 C53 267, 47 267, 44 264 C28 248, 20 215, 20 160 C20 100, 28 40, 50 8 Z" fill="#062E2E" stroke="#10B981" strokeWidth="2.5" />
          <path d="M50 14 L50 262" stroke="#059669" strokeWidth="1.5" />
          <path d="M50 215 L50 252" stroke="#34D399" strokeWidth="2.5" />
          <path d="M36 210 L34 235" stroke="#34D399" strokeWidth="2" />
          <path d="M64 210 L66 235" stroke="#34D399" strokeWidth="2" />
          <rect x="42" y="125" width="16" height="40" rx="3" fill="#059669" fillOpacity="0.25" stroke="#34D399" strokeWidth="1" />
          <text x="50" y="149" textAnchor="middle" fill="#D1FAE5" fontSize="8" fontFamily="sans-serif" fontWeight="bold">7'2 MID</text>
        </svg>
      )
    case 'short':
      return (
        <svg viewBox="0 0 90 230" className={`w-auto drop-shadow-md mx-auto ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M45 4 C65 35, 74 90, 74 145 C74 185, 66 215, 52 226 C48 229, 42 229, 38 226 C24 215, 16 185, 16 145 C16 90, 25 35, 45 4 Z" fill="#2E1B0E" stroke="#F59E0B" strokeWidth="2.5" />
          <path d="M45 10 L45 225" stroke="#D97706" strokeWidth="1.5" />
          <path d="M45 180 L45 215" stroke="#FBBF24" strokeWidth="2.5" />
          <path d="M30 180 L28 208" stroke="#FBBF24" strokeWidth="2" />
          <path d="M60 180 L62 208" stroke="#FBBF24" strokeWidth="2" />
          <rect x="37" y="105" width="16" height="35" rx="3" fill="#D97706" fillOpacity="0.25" stroke="#FBBF24" strokeWidth="1" />
          <text x="45" y="126" textAnchor="middle" fill="#FEF3C7" fontSize="7" fontFamily="sans-serif" fontWeight="bold">6'0 PRO</text>
        </svg>
      )
    case 'soft':
    default:
      return (
        <svg viewBox="0 0 105 280" className={`w-auto drop-shadow-md mx-auto ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M52 8 C75 40, 84 105, 84 170 C84 225, 75 258, 58 274 C55 277, 49 277, 46 274 C29 258, 20 225, 20 170 C20 105, 29 40, 52 8 Z" fill="#2D0B2E" stroke="#EC4899" strokeWidth="2.5" />
          <path d="M52 14 L52 272" stroke="#DB2777" strokeWidth="1.5" strokeDasharray="2 2" />
          <path d="M52 225 L52 260" stroke="#F472B6" strokeWidth="3" />
          <path d="M36 220 L34 248" stroke="#F472B6" strokeWidth="2.5" />
          <path d="M68 220 L70 248" stroke="#F472B6" strokeWidth="2.5" />
          <rect x="42" y="130" width="20" height="42" rx="3" fill="#DB2777" fillOpacity="0.25" stroke="#F472B6" strokeWidth="1" />
          <text x="52" y="154" textAnchor="middle" fill="#FCE7F3" fontSize="8" fontFamily="sans-serif" fontWeight="bold">6'6 SOFT</text>
        </svg>
      )
  }
}

/** Always show a full-color location photo — primary, then curated colorful fallback. */
function BeachCoverImage({ beach, className = 'w-full h-full object-cover' }: { beach: Beach; className?: string }) {
  const [src, setSrc] = useState(beach.image)

  useEffect(() => {
    setSrc(beach.image)
  }, [beach.id, beach.image])

  return (
    <img
      src={src}
      alt={beach.name}
      className={`${className} saturate-150`}
      onError={() => {
        if (src !== beach.imageFallback) {
          setSrc(beach.imageFallback)
        }
      }}
    />
  )
}

// --- MAIN APP COMPONENT ---
export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'map' | 'rentals' | 'profile'>('home')

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState<string>('All')
  const [skillFilter, setSkillFilter] = useState<string>('All')
  const [boardTypeFilter, setBoardTypeFilter] = useState<string>('All')
  const [quiverFilter, setQuiverFilter] = useState<string>('All')
  const [showTravelerModal, setShowTravelerModal] = useState(false)

  // Core Data State
  const [beaches] = useState<Beach[]>(BEACHES)
  const [vans] = useState<Van[]>(VANS)
  const [boards, setBoards] = useState<Board[]>(INITIAL_BOARDS)

  // Selection State
  const [selectedBeach, setSelectedBeach] = useState<Beach>(BEACHES[0])
  const [selectedVan, setSelectedVan] = useState<Van>(VANS[0])
  const [selectedBoard, setSelectedBoard] = useState<Board>(INITIAL_BOARDS[0])

  // Modal State
  const [showBeachModal, setShowBeachModal] = useState(false)
  const [showVanModal, setShowVanModal] = useState(false)
  const [showBoardModal, setShowBoardModal] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showInfraModal, setShowInfraModal] = useState(false)
  const [showRideRecommender, setShowRideRecommender] = useState(false)
  const [showPassModal, setShowPassModal] = useState(false)
  const [showReturnModal, setShowReturnModal] = useState(false)
  const [activePass, setActivePass] = useState<RentalPass | null>(null)

  // Checkout State
  const [durationHours, setDurationHours] = useState<number>(2)
  const [paymentMethod, setPaymentMethod] = useState<'USDC' | 'BTC' | 'CARD'>('USDC')
  const [includeProtection, setIncludeProtection] = useState<boolean>(true)
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false)
  const [paymentStep, setPaymentStep] = useState<number>(0)
  const [walletConnected, setWalletConnected] = useState<boolean>(false)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [walletBalance, setWalletBalance] = useState<{ sol: string; usdc: string }>({ sol: '2.45 SOL', usdc: '145.50 USDC' })

  // Rentals State
  const [rentals, setRentals] = useState<RentalPass[]>([
    {
      id: 'SP-RKW-7F3A92',
      boardName: '9\'4 BING Continental Classic',
      boardCode: 'SP-CL-94-0821',
      boardType: 'Longboard',
      boardDimensions: '9\'4 × 23 1/4 × 3 1/8',
      boardVolume: '74.5 L',
      vanId: 'van-12',
      vanName: 'Van #12',
      vanNickname: 'Rockaway Runner',
      location: 'Rockaway Beach, NY',
      spot: 'Beach 90th Street Boardwalk Lot',
      startTime: '8:30 AM',
      endTime: '10:30 AM',
      durationLabel: '2 Hours',
      paymentMethod: 'USDC',
      rentalPrice: 28,
      protection: 3,
      deposit: 50,
      depositStatus: 'HELD',
      status: 'ACTIVE',
      txHash: '5Knr7J...9bC3sol',
      createdAt: Date.now() - 3600000,
      sessionActive: true
    }
  ])

  // Keyboard Escape Handler for All Modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowBeachModal(false)
        setShowVanModal(false)
        setShowBoardModal(false)
        setShowCheckoutModal(false)
        setShowWalletModal(false)
        setShowInfraModal(false)
        setShowRideRecommender(false)
        setShowPassModal(false)
        setShowReturnModal(false)
        setShowTravelerModal(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Auto-connect Mock Wallet for Smooth Experience
  const handleConnectWallet = (provider: string) => {
    setWalletConnected(true)
    if (provider === 'Phantom') {
      setWalletAddress('7m9H...9bC3')
    } else if (provider === 'Solflare') {
      setWalletAddress('3xKp...8L42')
    } else {
      setWalletAddress('SP-Smart...4d91')
    }
    setShowWalletModal(false)
  }

  const handleDisconnectWallet = () => {
    setWalletConnected(false)
    setWalletAddress('')
  }

  // Filtered Beaches for Explore
  const filteredBeaches = useMemo(() => {
    return beaches.filter(b => {
      const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.region.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRegion = selectedRegion === 'All' || b.region === selectedRegion
      const matchesSkill = skillFilter === 'All' || b.skill === skillFilter || b.skill === 'All Levels'
      return matchesSearch && matchesRegion && matchesSkill
    })
  }, [beaches, searchQuery, selectedRegion, skillFilter])

  // Filtered Boards for Current Selected Van
  const currentVanBoards = useMemo(() => {
    return boards.filter(b => {
      const matchesVan = b.vanId === selectedVan.id
      const matchesType = boardTypeFilter === 'All' || b.type === boardTypeFilter
      return matchesVan && matchesType
    })
  }, [boards, selectedVan, boardTypeFilter])

  // Home quiver showcase (Van #12)
  const filteredQuiverBoards = useMemo(() => {
    return boards.filter(b => {
      if (b.vanId !== 'van-12') return false
      if (quiverFilter === 'All') return true
      if (quiverFilter === 'Longboard') return b.type === 'Longboard' || b.type === 'Soft-Top'
      if (quiverFilter === 'Mid-Length') return b.type === 'Mid-Length'
      if (quiverFilter === 'Fish') return b.type === 'Fish'
      if (quiverFilter === 'Shortboard') return b.type === 'Shortboard'
      return true
    })
  }, [boards, quiverFilter])

  // Live Map: vans for currently selected market only
  const marketVans = useMemo(() => {
    return vans.filter(v => v.beachId === selectedBeach.id)
  }, [vans, selectedBeach])

  const selectedBeachVans = marketVans

  // Handlers
  const handleSelectBeach = (beach: Beach) => {
    setSelectedBeach(beach)
    const matchingVan = vans.find(v => v.beachId === beach.id)
    if (matchingVan) {
      setSelectedVan(matchingVan)
    }
    setShowBeachModal(true)
  }

  const openMarketOnMap = (beach: Beach) => {
    setSelectedBeach(beach)
    const matchingVan = vans.find(v => v.beachId === beach.id)
    if (matchingVan) setSelectedVan(matchingVan)
    setShowBeachModal(false)
    setActiveTab('map')
  }

  const handleSelectVan = (van: Van) => {
    setSelectedVan(van)
    setBoardTypeFilter('All')
    const matchingBeach = beaches.find(b => b.id === van.beachId) || beaches[0]
    setSelectedBeach(matchingBeach)
    setShowVanModal(true)
  }

  const handleOpenCheckout = (board: Board) => {
    setSelectedBoard(board)
    setShowBeachModal(false)
    setShowVanModal(false)
    setShowBoardModal(false)
    setShowRideRecommender(false)
    setShowCheckoutModal(true)
    setPaymentStep(0)
  }

  const handleProcessCheckout = () => {
    setIsProcessingPayment(true)
    setPaymentStep(1) // Step 1: Waiting for payment

    setTimeout(() => {
      setPaymentStep(2) // Step 2: Payment detected via Tatum
      setTimeout(() => {
        setPaymentStep(3) // Step 3: Confirming on Solana / Bitcoin
        setTimeout(() => {
          setPaymentStep(4) // Step 4: Confirmed & Board Reserved
          setTimeout(() => {
            setIsProcessingPayment(false)
            setShowCheckoutModal(false)

            // Calculate final price
            const basePrice = durationHours === 2 ? selectedBoard.pricing.twoHours : durationHours === 4 ? selectedBoard.pricing.fourHours : selectedBoard.pricing.fullDay
            const protectionCost = includeProtection ? selectedBoard.protectionFee : 0
            const totalRental = basePrice + protectionCost

            // Create new Pass
            const newPass: RentalPass = {
              id: `SP-${selectedBeach.name.slice(0, 3).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
              boardName: selectedBoard.name,
              boardCode: selectedBoard.code,
              boardType: selectedBoard.type,
              boardDimensions: selectedBoard.dimensions,
              boardVolume: selectedBoard.volume,
              vanId: selectedVan.id,
              vanName: selectedVan.fleetNumber,
              vanNickname: selectedVan.nickname,
              location: `${selectedBeach.name}, ${selectedBeach.state}`,
              spot: selectedVan.spot,
              startTime: 'Now',
              endTime: `${durationHours} Hours from pickup`,
              durationLabel: `${durationHours} Hours`,
              paymentMethod: paymentMethod,
              rentalPrice: totalRental,
              protection: protectionCost,
              deposit: selectedBoard.deposit,
              depositStatus: 'HELD',
              status: 'ACTIVE',
              txHash: paymentMethod === 'USDC' ? '5Knr7J...9bC3sol' : paymentMethod === 'BTC' ? '3FZbgi...8kP2btc' : undefined,
              createdAt: Date.now(),
              sessionActive: true
            }

            setRentals(prev => [newPass, ...prev])
            setActivePass(newPass)
            setShowPassModal(true)

            // Decrement Board inventory count
            setBoards(prev => prev.map(b => b.id === selectedBoard.id ? { ...b, availableCount: Math.max(0, b.availableCount - 1) } : b))
          }, 1000)
        }, 1200)
      }, 1000)
    }, 1200)
  }

  const handleReturnBoard = (pass: RentalPass) => {
    setActivePass(pass)
    setShowReturnModal(true)
  }

  const handleConfirmReturn = () => {
    if (!activePass) return
    setRentals(prev => prev.map(r => r.id === activePass.id ? { ...r, status: 'COMPLETED', depositStatus: 'REFUNDED', sessionActive: false } : r))
    setShowReturnModal(false)
    setShowPassModal(false)
    // Restore inventory
    setBoards(prev => prev.map(b => b.code === activePass.boardCode ? { ...b, availableCount: b.availableCount + 1 } : b))
  }

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 font-sans antialiased pb-24 md:pb-12 selection:bg-cyan-500 selection:text-white">
      {/* ── TOP NAV / HEADER ── */}
      <header className="sticky top-0 z-40 bg-[#07090E]/90 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Tagline */}
          <div
            onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Waves className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-white font-mono">SurfPass</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono font-semibold">ONCHAIN</span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Rent. Surf. Onchain.</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-xl shadow-inner">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'home' ? 'bg-cyan-500 text-slate-950 shadow-md font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'explore' ? 'bg-cyan-500 text-slate-950 shadow-md font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}
            >
              Explore
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'map' ? 'bg-cyan-500 text-slate-950 shadow-md font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}
            >
              Live Map
            </button>
            <button
              onClick={() => setActiveTab('rentals')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${activeTab === 'rentals' ? 'bg-cyan-500 text-slate-950 shadow-md font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}
            >
              My Rentals
              {rentals.filter(r => r.status === 'ACTIVE').length > 0 && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'profile' ? 'bg-cyan-500 text-slate-950 shadow-md font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-800/60'}`}
            >
              Profile
            </button>
          </nav>

          {/* Quick Actions & Wallet */}
          <div className="flex items-center gap-2.5">
            {/* Quick Action: Surf Now */}
            <button
              onClick={() => handleOpenCheckout(INITIAL_BOARDS[0])}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/10 hover:opacity-90 active:scale-95 transition-all"
            >
              <Zap className="w-3.5 h-3.5" />
              Surf Now
            </button>

            {/* Tatum Infra Gateway */}
            <button
              onClick={() => setShowInfraModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 text-xs font-mono transition-all"
              title="View Tatum Infrastructure Gateway"
            >
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Tatum Infra</span>
            </button>

            {/* Wallet Connect Button */}
            {walletConnected ? (
              <div className="flex items-center gap-2 bg-slate-900 border border-cyan-500/40 px-3 py-1.5 rounded-xl text-xs font-mono">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-cyan-300 font-bold">{walletAddress}</span>
                <span className="hidden xl:inline text-slate-400">({walletBalance.usdc})</span>
              </div>
            ) : (
              <button
                onClick={() => setShowWalletModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-xs shadow-md shadow-indigo-500/20 hover:from-indigo-500 hover:to-blue-500 active:scale-95 transition-all"
              >
                <Wallet className="w-3.5 h-3.5" />
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT ACCORDING TO ACTIVE TAB ── */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-6 space-y-10">

        {/* ══════════════════════════════════════════════════════════════════
            TAB: HOME
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'home' && (
          <div className="space-y-10">
            {/* HERO — matches preferred screenshot style */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-[#07090E] border border-slate-800/90 p-6 md:p-12 shadow-2xl">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>

              <div className="relative max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Nationwide Surf & Mobile Van Marketplace</span>
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                  Rent the perfect board for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">today’s surf.</span>
                </h1>

                <p className="text-base md:text-lg text-slate-300 font-normal leading-relaxed">
                  Live surf conditions, nearby mobile rental vans, and instant reservations. Pay seamlessly with <strong className="text-cyan-300">USDC on Solana</strong>, <strong className="text-amber-400">Bitcoin</strong>, or <strong className="text-white">Apple Pay</strong>.
                </p>

                <p className="text-xs font-mono text-slate-400 flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  Find waves. Find a board. Go surf.
                </p>

                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab('explore')}
                    className="px-6 py-3.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 active:scale-95 transition-all flex items-center gap-2"
                  >
                    Find a Beach
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleSelectBeach(BEACHES[0])}
                    className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-bold text-sm border border-slate-700/80 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4 text-cyan-400" />
                    Rockaway Conditions
                  </button>
                </div>
              </div>
            </div>

            {/* 5-STEP JOURNEY — single number per step */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  How SurfPass Works • Click any step
                </h3>
                <span className="text-xs text-cyan-400 font-mono">Van-to-water in 3 minutes</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-4">
                {[
                  { step: '1. Forecast', label: 'Check live wave conditions', icon: Waves, action: () => handleSelectBeach(selectedBeach) },
                  { step: '2. Van', label: 'Find closest mobile van', icon: Car, action: () => openMarketOnMap(selectedBeach) },
                  { step: '3. Board', label: 'Select tailored surfboard', icon: Compass, action: () => {
                    const van = vans.find(v => v.beachId === selectedBeach.id)
                    if (van) {
                      handleSelectVan(van)
                    } else {
                      openMarketOnMap(selectedBeach)
                    }
                  }},
                  { step: '4. Pay', label: 'USDC, BTC or Apple Pay', icon: CreditCard, action: () => handleOpenCheckout(INITIAL_BOARDS[0]) },
                  { step: '5. Pass & Surf', label: 'Scan QR & get board', icon: QrCode, action: () => {
                    if (rentals.length > 0) {
                      setActivePass(rentals[0])
                      setShowPassModal(true)
                    } else {
                      setActiveTab('rentals')
                    }
                  }}
                ].map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={idx}
                      onClick={item.action}
                      className="text-left p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/40 transition group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-2 transition">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition">{item.step}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{item.label}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* SMART MATCH */}
            <section className="bg-gradient-to-r from-[#0C192E] via-[#0E203B] to-[#0A1628] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500 text-black">
                      BEST MATCH RIGHT NOW
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getQualityBadgeStyle('GOOD')}`}>
                      2–3 FT • GOOD
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Rockaway Beach (Queens, NY)</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    9'4 BING Classic at Rockaway Van #12
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <strong className="text-cyan-300">Why this board: </strong>
                    The waves are small, clean and soft this morning, so the 74.5L volume helps you glide through every set before the afternoon wind shift.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                    <div className="flex items-center gap-1.5 text-slate-200">
                      <Car className="w-4 h-4 text-cyan-400" />
                      <span>Van #12 (Rockaway Runner) • Beach 90th St</span>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <Check className="w-3.5 h-3.5" />
                      <span>3 longboards ready (0.2 mi away)</span>
                    </div>
                    <div className="text-white font-bold">
                      $25 / 2 hrs <span className="text-slate-400 font-normal">($50 refundable deposit)</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                  <button
                    onClick={() => handleOpenCheckout(INITIAL_BOARDS[0])}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition active:scale-95 text-center"
                  >
                    Reserve This Board ($25)
                  </button>
                  <button
                    onClick={() => handleSelectBeach(BEACHES[0])}
                    className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold transition text-center"
                  >
                    View Conditions
                  </button>
                </div>
              </div>
            </section>

            {/* GOOD SURF RIGHT NOW */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-white">Good Surf Right Now</h2>
                  <p className="text-xs text-slate-400">Live conditions feed with SurfPass van inventory by market</p>
                </div>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>Explore All ({beaches.length})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {beaches.slice(0, 6).map((beach) => (
                  <div
                    key={beach.id}
                    className="group bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-cyan-500/50 overflow-hidden transition shadow-lg flex flex-col"
                  >
                    <div className="relative h-44 overflow-hidden bg-slate-950">
                      <BeachCoverImage beach={beach} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${getQualityBadgeStyle(beach.quality)}`}>
                          {beach.quality}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 backdrop-blur-md text-white border border-white/10">
                          {beach.distance}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-lg font-black text-white">{beach.name}</h3>
                        <p className="text-xs text-slate-300">{beach.breakName} • {beach.city}, {beach.state}</p>
                      </div>
                    </div>

                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="grid grid-cols-3 gap-2 text-center p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                        <div>
                          <p className="text-[10px] text-slate-400 font-semibold">WAVE</p>
                          <p className="text-xs font-black text-cyan-400">{beach.waveHeight}</p>
                          <p className="text-[9px] text-slate-400 truncate">{beach.waveSub}</p>
                        </div>
                        <div className="border-x border-slate-800">
                          <p className="text-[10px] text-slate-400 font-semibold">WIND</p>
                          <p className="text-xs font-bold text-white">{beach.windMph} mph</p>
                          <p className="text-[9px] text-slate-400 truncate">{beach.windSub}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-semibold">TIDE</p>
                          <p className="text-xs font-bold text-white">{beach.tide}</p>
                          <p className="text-[9px] text-slate-400 truncate">{beach.waterTemp}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                        <div className="flex items-center gap-1.5">
                          <Car className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{beach.vanCount > 0 ? `${beach.vanCount} Van${beach.vanCount === 1 ? '' : 's'} Nearby` : 'No vans in area'}</span>
                        </div>
                        <div className="font-semibold text-emerald-400">
                          {beach.boardCount} boards available
                        </div>
                      </div>

                      <button
                        onClick={() => handleSelectBeach(beach)}
                        className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-black text-slate-200 font-bold text-xs transition active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <span>View Conditions & Vans</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* VAN #12 QUIVER READY */}
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-white">VAN #12 QUIVER READY</h2>
                  <p className="text-xs text-slate-400">Rockaway Beach • Beach 90th Street (0.2 mi away)</p>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs overflow-x-auto">
                  {['All', 'Longboard', 'Mid-Length', 'Fish', 'Shortboard'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setQuiverFilter(cat)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition whitespace-nowrap ${
                        quiverFilter === cat ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredQuiverBoards.map(board => (
                  <div
                    key={board.id}
                    className="bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-cyan-500/40 p-4 flex flex-col justify-between transition group"
                  >
                    <div>
                      <div className="h-44 bg-slate-950/70 rounded-xl p-2 flex items-center justify-center relative overflow-hidden border border-slate-800/80 mb-3">
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                          {board.tag}
                        </span>
                        <span className="absolute top-2 right-2 text-[10px] font-mono text-cyan-400">
                          {board.volume}
                        </span>
                        <BoardSilhouette type={board.shapeType} className="h-36" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase text-cyan-400">{board.type}</span>
                          <span className="text-[10px] text-emerald-400 font-bold">{board.availableCount} in van</span>
                        </div>
                        <h4 className="text-sm font-black text-white group-hover:text-cyan-300 transition">{board.name}</h4>
                        <p className="text-[11px] text-slate-400 font-mono">{board.dimensions}</p>
                        <p className="text-[11px] text-slate-300 italic pt-1 line-clamp-2">"{board.personality}"</p>
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-black text-white">${board.pricing.twoHours} <span className="text-[10px] font-normal text-slate-400">/ 2h</span></p>
                        <p className="text-[9px] text-slate-400">${board.deposit} deposit</p>
                      </div>
                      <button
                        onClick={() => handleOpenCheckout(board)}
                        className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs shadow-md shadow-cyan-500/20 transition active:scale-95"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB: EXPLORE (Nationwide Search & Filters)
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'explore' && (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white">Explore Surf Coastlines</h2>
              <p className="text-sm text-slate-400">Discover live ocean forecasts and roaming SurfPass van fleets nationwide.</p>
            </div>

            {/* Search and Filters Bar */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="relative">
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search by beach, city, state, or break (e.g. Rockaway, Sunset Cliffs, Montauk)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Regional Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
                <span className="text-slate-500 font-bold mr-1">REGION:</span>
                {['All', 'New York', 'California', 'New Jersey', 'Florida', 'Hawaii', 'North Carolina'].map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRegion(r)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${selectedRegion === r ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Beaches */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredBeaches.map((beach) => (
                <div
                  key={beach.id}
                  className="group rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 transition-all overflow-hidden shadow-lg flex flex-col justify-between"
                >
                  <div className="relative h-44 w-full bg-slate-950 overflow-hidden">
                    <BeachCoverImage beach={beach} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none"></div>
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${getQualityBadgeStyle(beach.quality)}`}>
                        {beach.quality} • {beach.waveHeight}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700 text-[11px] font-mono">
                        {beach.region}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="text-lg font-black text-white">{beach.name}</h4>
                      <p className="text-xs text-slate-300 font-mono">{beach.city}, {beach.state}</p>
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <p className="text-xs text-slate-300 line-clamp-2">{beach.description}</p>
                    <div className="flex items-center justify-between text-xs font-mono pt-1 border-t border-slate-800 text-slate-400">
                      <span>{beach.vanCount > 0 ? `${beach.vanCount} Vans on duty` : 'No vans in area'}</span>
                      <span className="text-emerald-400 font-bold">{beach.boardCount} boards available</span>
                    </div>
                    <button
                      onClick={() => handleSelectBeach(beach)}
                      className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs transition active:scale-95"
                    >
                      View Conditions & Vans
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB: LIVE GPS MAP
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'map' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-3xl font-black text-white">Live Coastal GPS Fleet Map</h2>
                <p className="text-sm text-slate-400">
                  Showing SurfPass vans assigned to <span className="text-cyan-300 font-semibold">{selectedBeach.name}</span>
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl w-fit">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                {marketVans.length} GPS Van{marketVans.length === 1 ? '' : 's'} in Market
              </div>
            </div>

            {/* Market selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
              <span className="text-slate-500 font-bold mr-1 shrink-0">MARKET:</span>
              {beaches.map((beach) => (
                <button
                  key={beach.id}
                  onClick={() => {
                    setSelectedBeach(beach)
                    const van = vans.find(v => v.beachId === beach.id)
                    if (van) setSelectedVan(van)
                  }}
                  className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                    selectedBeach.id === beach.id
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {beach.city === 'Queens' ? 'Rockaway' : beach.city === 'San Diego' ? 'Sunset Cliffs' : beach.city === 'San Clemente' ? 'Trestles' : beach.city === 'Honolulu' ? 'Waikiki' : beach.city}
                </button>
              ))}
            </div>

            <FleetGpsMap
              beach={selectedBeach}
              vans={marketVans}
              onSelectBeach={() => handleSelectBeach(selectedBeach)}
              onSelectVan={(vanId) => {
                const van = vans.find(v => v.id === vanId)
                if (van) handleSelectVan(van)
              }}
              onBrowseMarkets={() => setActiveTab('explore')}
            />

            {/* Fleet List Cards Under Map — market filtered */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white">Active Vans in {selectedBeach.name}</h3>
              {marketVans.length === 0 ? (
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
                  <p className="text-sm font-bold text-white">No SurfPass vans currently in this area</p>
                  <p className="text-xs text-slate-400">Switch markets above to locate available fleet inventory.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {marketVans.map((van) => (
                    <div
                      key={van.id}
                      onClick={() => handleSelectVan(van)}
                      className="cursor-pointer p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all space-y-3 shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-base font-black text-white">{van.fleetNumber} — {van.nickname}</h4>
                          <p className="text-xs text-cyan-400 font-mono">{van.spot}</p>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-mono font-bold">
                          ACTIVE
                        </span>
                      </div>

                      <div className="text-xs text-slate-300 space-y-1 font-mono bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                        <p className="text-slate-400 truncate">{van.streetAddress}</p>
                        <p className="text-slate-400">{van.hours}</p>
                        <div className="flex items-center justify-between pt-1 text-slate-200">
                          <span className="text-emerald-400 font-bold">{van.boardsAvailable} Boards Ready</span>
                          <span>{van.phone}</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelectVan(van)
                        }}
                        className="w-full py-2 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 text-xs font-bold transition-all"
                      >
                        View Van Inventory
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB: MY RENTALS (Passes & Returns)
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'rentals' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-black text-white">My SurfPass Rentals</h2>
              <p className="text-sm text-slate-400">Digital rental boarding passes, active sessions, and refundable deposit releases.</p>
            </div>

            {rentals.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <Ticket className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">No active rentals</h3>
                <p className="text-xs text-slate-400">Check today’s surf forecast and reserve a surfboard from any nearby van.</p>
                <button
                  onClick={() => setActiveTab('home')}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs shadow-md"
                >
                  Browse Forecast & Boards
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {rentals.map((rental) => (
                  <div
                    key={rental.id}
                    className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-2 border-cyan-500/40 shadow-2xl space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">DIGITAL SURFPASS RENTAL PASS</span>
                        <h3 className="text-2xl font-black text-white">{rental.boardName}</h3>
                        <p className="text-xs text-slate-300 font-mono">{rental.location} • {rental.spot}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${rental.status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 animate-pulse' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                          {rental.status === 'ACTIVE' ? 'SESSION ACTIVE' : 'COMPLETED'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-slate-500 text-[10px]">PICKUP VAN</span>
                        <p className="text-white font-bold">{rental.vanName} ({rental.vanNickname})</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-slate-500 text-[10px]">RENTAL WINDOW</span>
                        <p className="text-white font-bold">{rental.startTime} – {rental.endTime}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-slate-500 text-[10px]">PAYMENT METHOD</span>
                        <p className="text-cyan-400 font-bold">{rental.paymentMethod} (via Tatum)</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                        <span className="text-slate-500 text-[10px]">SECURITY DEPOSIT</span>
                        <p className={rental.depositStatus === 'HELD' ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                          ${rental.deposit} {rental.depositStatus}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <button
                        onClick={() => { setActivePass(rental); setShowPassModal(true); }}
                        className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 transition-all"
                      >
                        <QrCode className="w-4 h-4 text-cyan-400" />
                        View QR Boarding Pass
                      </button>

                      {rental.status === 'ACTIVE' && (
                        <button
                          onClick={() => handleReturnBoard(rental)}
                          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition-all flex items-center gap-2"
                        >
                          <CheckCheck className="w-4 h-4" />
                          Return Board & Release ${rental.deposit} Deposit
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            TAB: PROFILE
        ══════════════════════════════════════════════════════════════════ */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl font-black shadow-lg">
                  P
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Patrick (Surfer)</h3>
                  <p className="text-xs text-cyan-400 font-mono">Home Break: Rockaway Beach 90th St</p>
                  <p className="text-xs text-slate-400">SurfPass Member since July 2024</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center font-mono">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500">SESSIONS</span>
                  <p className="text-lg font-black text-white">17</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500">BOARDS RENTED</span>
                  <p className="text-lg font-black text-cyan-400">12</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-[10px] text-slate-500">SURFPASS SCORE</span>
                  <p className="text-lg font-black text-emerald-400">94 / 100</p>
                </div>
              </div>

              <div className="space-y-2 text-xs font-mono text-slate-300">
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-500">Connected Wallet</span>
                  <span className="text-cyan-400">{walletConnected ? walletAddress : 'Not connected'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-500">Preferred Payment</span>
                  <span className="text-white">USDC on Solana</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-500">Favorite Board</span>
                  <span className="text-white">9'4 BING Continental Classic</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowWalletModal(true)}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all"
                >
                  Manage Connected Wallet & Payment Rails
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── MODAL 1: RICH 12-HOUR SURFLINE-STYLE BEACH FORECAST MODAL ── */}
      {showBeachModal && selectedBeach && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border-2 border-slate-700/80 shadow-2xl p-6 md:p-8 space-y-6 my-8">
            {/* Close Button */}
            <button
              onClick={() => setShowBeachModal(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${getQualityBadgeStyle(selectedBeach.quality)}`}>
                  {selectedBeach.quality} SURF
                </span>
                <span className="text-xs font-mono text-slate-400">Updated {selectedBeach.updatedMinutesAgo}m ago</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white">{selectedBeach.name}</h2>
              <p className="text-xs text-slate-300 font-mono">{selectedBeach.breakName} • {selectedBeach.city}, {selectedBeach.state}</p>
            </div>

            {/* RICH 6-BOX SURFLINE-STYLE CONDITIONS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-0.5">
                <span className="text-slate-500 text-[10px]">WAVE HEIGHT</span>
                <p className="text-xl font-black text-cyan-300">{selectedBeach.waveHeight}</p>
                <span className="text-[11px] text-emerald-400 font-bold">{selectedBeach.waveSub}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-0.5">
                <span className="text-slate-500 text-[10px]">SWELL ANGLE & PERIOD</span>
                <p className="text-lg font-bold text-white">{selectedBeach.swellAngle}</p>
                <span className="text-[11px] text-cyan-400 font-semibold">{selectedBeach.swell} @ {selectedBeach.swellPeriod}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-0.5">
                <span className="text-slate-500 text-[10px]">WIND DIRECTION</span>
                <p className="text-lg font-bold text-white">{selectedBeach.wind}</p>
                <span className="text-[11px] text-cyan-400 font-semibold">{selectedBeach.windSub}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-0.5">
                <span className="text-slate-500 text-[10px]">TIDE STAGE</span>
                <p className="text-base font-bold text-white">{selectedBeach.tide}</p>
                <span className="text-[11px] text-emerald-400 font-semibold">{selectedBeach.tideSub}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-0.5">
                <span className="text-slate-500 text-[10px]">WATER TEMPERATURE</span>
                <p className="text-lg font-bold text-white">{selectedBeach.waterTemp} / {selectedBeach.waterTempC}</p>
                <span className="text-[11px] text-slate-400">{selectedBeach.suitRecommendation}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-0.5">
                <span className="text-slate-500 text-[10px]">RECOMMENDED WINDOW</span>
                <p className="text-sm font-bold text-white">{selectedBeach.bestWindow}</p>
                <span className="text-[11px] text-cyan-400 font-semibold">{selectedBeach.bestWindowSub}</span>
              </div>
            </div>

            {/* 12-HOUR FORECAST CHART */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 font-bold uppercase">12-Hour Wave Forecast (ft)</span>
                <span className="text-emerald-400 font-semibold">Best Window: {selectedBeach.bestWindow}</span>
              </div>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedBeach.hourly}>
                    <defs>
                      <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} />
                    <YAxis stroke="#64748b" fontSize={10} tickLine={false} domain={[0, 6]} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', color: '#fff' }}
                      formatter={(val: any) => [`${val} ft`, 'Wave Height']}
                    />
                    <Area type="monotone" dataKey="heightFt" stroke="#06b6d4" strokeWidth={2.5} fill="url(#waveGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Vans Nearby Action — market-aware */}
            <div className="space-y-3">
              {selectedBeachVans.length === 0 ? (
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-3">
                  <p className="text-sm font-bold text-white">No SurfPass vans currently in this area</p>
                  <p className="text-xs text-slate-400">
                    Forecast is live for {selectedBeach.name}, but there’s no assigned fleet van here right now.
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      onClick={() => openMarketOnMap(selectedBeach)}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs"
                    >
                      Open Live Map
                    </button>
                    <button
                      onClick={() => { setShowBeachModal(false); setActiveTab('explore') }}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                    >
                      Browse Other Markets
                    </button>
                  </div>
                </div>
              ) : (
                selectedBeachVans.map((van) => (
                  <div key={van.id} className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <div>
                      <h4 className="text-sm font-bold text-white">{van.fleetNumber} — {van.nickname}</h4>
                      <p className="text-xs text-slate-400">{van.spot} • {van.boardsAvailable} Boards Ready</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => openMarketOnMap(selectedBeach)}
                        className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs"
                      >
                        Map
                      </button>
                      <button
                        onClick={() => {
                          setShowBeachModal(false)
                          handleSelectVan(van)
                        }}
                        className="px-5 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all"
                      >
                        View Van Boards
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 2: VAN QUIVER & BOARD INVENTORY MODAL ── */}
      {showVanModal && selectedVan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl rounded-3xl bg-slate-900 border-2 border-slate-700/80 shadow-2xl p-6 md:p-8 space-y-6 my-8">
            <button
              onClick={() => setShowVanModal(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">VERIFIED PHYSICAL INVENTORY</span>
              <h2 className="text-2xl md:text-3xl font-black text-white">{selectedVan.fleetNumber} — {selectedVan.nickname}</h2>
              <p className="text-xs text-slate-300 font-mono">{selectedVan.spot} • {selectedVan.streetAddress}</p>
            </div>

            {/* Board Type Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
              {['All', 'Longboard', 'Fish', 'Soft-Top', 'Mid-Length', 'Shortboard'].map((type) => (
                <button
                  key={type}
                  onClick={() => setBoardTypeFilter(type)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${boardTypeFilter === type ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Boards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[480px] overflow-y-auto pr-1">
              {currentVanBoards.length === 0 ? (
                <div className="md:col-span-2 p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-2">
                  <p className="text-sm font-bold text-white">No boards in this filter</p>
                  <p className="text-xs text-slate-400">Try another board type — this van still has inventory available.</p>
                  <button
                    onClick={() => setBoardTypeFilter('All')}
                    className="mt-2 px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                  >
                    Show All Boards
                  </button>
                </div>
              ) : (
                currentVanBoards.map((board) => (
                <div
                  key={board.id}
                  className="p-5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-cyan-300">
                        {board.type} • {board.volume}
                      </span>
                      <h3 className="text-base font-black text-white">{board.name}</h3>
                      <p className="text-xs text-slate-400 font-mono">{board.dimensions} • {board.finSetup}</p>
                    </div>
                    <BoardSilhouette type={board.shapeType} className="h-16" />
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                    <strong className="text-cyan-400">Why this board:</strong> {board.whyMatch}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                    <div>
                      <span className="text-sm font-black text-white">${board.pricing.twoHours}</span>
                      <span className="text-xs text-slate-400"> / 2 hrs</span>
                      <p className="text-[10px] text-slate-500 font-mono">+${board.deposit} refundable deposit</p>
                    </div>
                    <button
                      onClick={() => handleOpenCheckout(board)}
                      className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 shadow-md shadow-cyan-500/20 active:scale-95 transition-all"
                    >
                      Reserve Board
                    </button>
                  </div>
                </div>
              ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 3: MULTI-RAIL CHECKOUT (USDC Solana / BTC / Apple Pay) ── */}
      {showCheckoutModal && selectedBoard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border-2 border-cyan-500/40 shadow-2xl p-6 md:p-8 space-y-6 my-8">
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">RESERVATION & CHECKOUT</span>
              <h2 className="text-2xl font-black text-white">{selectedBoard.name}</h2>
              <p className="text-xs text-slate-300 font-mono">Pickup at {selectedVan.fleetNumber} ({selectedVan.nickname})</p>
            </div>

            {/* Duration Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase font-bold">Select Session Duration</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { hours: 2, label: '2 Hours', price: selectedBoard.pricing.twoHours },
                  { hours: 4, label: '4 Hours', price: selectedBoard.pricing.fourHours },
                  { hours: 8, label: 'Full Day', price: selectedBoard.pricing.fullDay }
                ].map((d) => (
                  <button
                    key={d.hours}
                    onClick={() => setDurationHours(d.hours)}
                    className={`p-3 rounded-xl border text-center transition-all ${durationHours === d.hours ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold' : 'bg-slate-950 border-slate-800 text-slate-300'}`}
                  >
                    <span className="text-xs block">{d.label}</span>
                    <span className="text-sm font-black text-cyan-300">${d.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 uppercase font-bold">Choose Payment Rail</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPaymentMethod('USDC')}
                  className={`p-3 rounded-xl border text-left transition-all ${paymentMethod === 'USDC' ? 'bg-cyan-500/20 border-cyan-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-300'}`}
                >
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold block w-fit mb-1">RECOMMENDED</span>
                  <p className="text-xs font-bold text-white">USDC</p>
                  <span className="text-[10px] text-slate-400">Solana Network</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('BTC')}
                  className={`p-3 rounded-xl border text-left transition-all ${paymentMethod === 'BTC' ? 'bg-amber-500/20 border-amber-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-300'}`}
                >
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold block w-fit mb-1">BITCOIN</span>
                  <p className="text-xs font-bold text-white">BTC</p>
                  <span className="text-[10px] text-slate-400">Native BTC</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-3 rounded-xl border text-left transition-all ${paymentMethod === 'CARD' ? 'bg-slate-800 border-slate-600 text-white' : 'bg-slate-950 border-slate-800 text-slate-300'}`}
                >
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-bold block w-fit mb-1">FIAT</span>
                  <p className="text-xs font-bold text-white">Apple Pay / Card</p>
                  <span className="text-[10px] text-slate-400">Traditional</span>
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-300">
                <span>Surfboard Rental ({durationHours}h)</span>
                <span>${durationHours === 2 ? selectedBoard.pricing.twoHours : durationHours === 4 ? selectedBoard.pricing.fourHours : selectedBoard.pricing.fullDay}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Damage Protection</span>
                <span>$3</span>
              </div>
              <div className="flex justify-between text-amber-300 font-bold">
                <span>Refundable Deposit (Returned after session)</span>
                <span>${selectedBoard.deposit}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-black text-white">
                <span>Total Authorization</span>
                <span className="text-cyan-300">
                  ${(durationHours === 2 ? selectedBoard.pricing.twoHours : durationHours === 4 ? selectedBoard.pricing.fourHours : selectedBoard.pricing.fullDay) + 3 + selectedBoard.deposit}
                  {paymentMethod === 'USDC' ? ' USDC' : paymentMethod === 'BTC' ? ' (0.0011 BTC)' : ''}
                </span>
              </div>
            </div>

            {/* Animated Payment Status Steps */}
            {isProcessingPayment && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/50 space-y-3 font-mono text-xs">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  {paymentStep === 1 && 'Waiting for payment authorization...'}
                  {paymentStep === 2 && 'Payment detected via Tatum Infrastructure...'}
                  {paymentStep === 3 && 'Confirming on Solana Network...'}
                  {paymentStep === 4 && 'Payment Confirmed ✓ Generating Rental Pass...'}
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-500 h-full transition-all duration-500"
                    style={{ width: `${paymentStep * 25}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Action CTA */}
            <button
              disabled={isProcessingPayment}
              onClick={handleProcessCheckout}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-slate-950 font-black text-sm hover:opacity-90 shadow-xl shadow-cyan-500/20 active:scale-95 transition-all disabled:opacity-50"
            >
              {isProcessingPayment ? 'Authorizing...' : `Authorize & Reserve Board`}
            </button>
          </div>
        </div>
      )}

      {/* ── MODAL 4: DIGITAL SURFPASS BOARDING PASS ── */}
      {showPassModal && activePass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border-2 border-cyan-500 shadow-2xl p-6 md:p-8 space-y-6 my-8">
            <button
              onClick={() => setShowPassModal(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> SURFPASS RENTAL PASS
              </div>
              <h2 className="text-xl font-black text-white">{activePass.boardName}</h2>
              <p className="text-xs text-slate-400 font-mono">Pass ID: {activePass.id}</p>
            </div>

            {/* QR Code Container */}
            <div className="p-6 bg-white rounded-2xl flex flex-col items-center justify-center shadow-inner space-y-2">
              <QrCode className="w-36 h-36 text-slate-950" />
              <span className="text-[10px] font-mono text-slate-600 font-bold">SCAN AT SURFPASS VAN FOR INSTANT UNLOCK</span>
            </div>

            {/* Rental Details */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">PICKUP VAN</span>
                <span className="font-bold text-white">{activePass.vanName} ({activePass.vanNickname})</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">LOCATION</span>
                <span className="font-bold text-white truncate max-w-[200px]">{activePass.spot}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500">SECURITY DEPOSIT</span>
                <span className="text-amber-400 font-bold">${activePass.deposit} HELD (Auto-Refund)</span>
              </div>
              <div className="flex justify-between text-slate-300 pt-1 border-t border-slate-800">
                <span className="text-slate-500">ONCHAIN SETTLEMENT</span>
                <span className="text-cyan-400 font-bold">Verified via Tatum</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setShowPassModal(false)
                  setActiveTab('map')
                }}
                className="w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                Navigate to Van
              </button>

              <button
                onClick={() => {
                  setShowPassModal(false)
                  handleReturnBoard(activePass)
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
              >
                Return Board Early
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 5: RETURN BOARD & REFUND DEPOSIT MODAL ── */}
      {showReturnModal && activePass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border-2 border-emerald-500/40 shadow-2xl p-6 md:p-8 space-y-6 my-8">
            <button
              onClick={() => setShowReturnModal(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
                <RotateCcw className="w-3.5 h-3.5" /> CONFIRM BOARD RETURN
              </div>
              <h2 className="text-xl font-black text-white">Return {activePass.boardName}</h2>
              <p className="text-xs text-slate-400 font-mono">Van: {activePass.vanName} ({activePass.vanNickname})</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs font-mono">
              <div className="flex justify-between text-slate-300">
                <span>Board Condition Check</span>
                <span className="text-emerald-400 font-bold">Excellent ✓</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Rental Duration</span>
                <span>{activePass.durationLabel}</span>
              </div>
              <div className="flex justify-between text-emerald-300 font-bold pt-2 border-t border-slate-800">
                <span>Refundable Deposit to Release</span>
                <span className="text-base">${activePass.deposit} USDC</span>
              </div>
            </div>

            <button
              onClick={handleConfirmReturn}
              className="w-full py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-sm hover:bg-emerald-400 shadow-xl shadow-emerald-500/20 active:scale-95 transition-all"
            >
              Confirm Return & Release Deposit
            </button>
          </div>
        </div>
      )}

      {/* ── MODAL 6: CONNECT WALLET MODAL ── */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border-2 border-slate-700 shadow-2xl p-6 space-y-5 my-8">
            <button
              onClick={() => setShowWalletModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-white">Connect Wallet</h3>
              <p className="text-xs text-slate-400">Choose your preferred Solana wallet or embedded account.</p>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <button
                onClick={() => handleConnectWallet('Phantom')}
                className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/50 flex items-center justify-between text-white hover:bg-slate-800/60 transition-all"
              >
                <span className="font-bold">Phantom Wallet</span>
                <span className="text-[10px] text-purple-400">Solana</span>
              </button>
              <button
                onClick={() => handleConnectWallet('Solflare')}
                className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 flex items-center justify-between text-white hover:bg-slate-800/60 transition-all"
              >
                <span className="font-bold">Solflare Wallet</span>
                <span className="text-[10px] text-amber-400">Solana</span>
              </button>
              <button
                onClick={() => handleConnectWallet('SmartAccount')}
                className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 flex items-center justify-between text-white hover:bg-slate-800/60 transition-all"
              >
                <span className="font-bold">SurfPass Smart Account</span>
                <span className="text-[10px] text-cyan-400">Gasless / Embedded</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 7: TATUM INFRASTRUCTURE MODAL ── */}
      {showInfraModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border-2 border-cyan-500/40 shadow-2xl p-6 md:p-8 space-y-6 my-8">
            <button
              onClick={() => setShowInfraModal(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">POWERED BY TATUM</span>
              <h2 className="text-2xl font-black text-white">Multi-Chain Infrastructure Architecture</h2>
              <p className="text-xs text-slate-300">Tatum provides universal blockchain RPC routing, event monitoring, and collateral settlement.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-cyan-400 font-bold">1. RPC Gateway</span>
                <p className="text-slate-300">Solana & Bitcoin node connectivity for fast reads and broadcast without separate node clusters.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold">2. Real-Time Events</span>
                <p className="text-slate-300">Instant detection of customer USDC authorizations and deposit hold confirmations.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-indigo-400 font-bold">3. Blockchain Data</span>
                <p className="text-slate-300">Real-time balance queries and onchain transaction history lookups.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold">4. Smart Wallets</span>
                <p className="text-slate-300">Mainstream onboarding with embedded seedless account infrastructure.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Traveling destination picker */}
      {showTravelerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#091122] border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setShowTravelerModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-amber-400" />
              <h3 className="text-base font-black text-white">Traveling to Surf?</h3>
            </div>
            <p className="text-xs text-slate-300">
              Skip paying $150+ airline surfboard bag fees. Reserve high-performance boards waiting for you at your destination van before you land.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => {
                  setSelectedRegion('California')
                  setShowTravelerModal(false)
                  setActiveTab('explore')
                }}
                className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left font-bold text-white"
              >
                California (Trestles/HB)
              </button>
              <button
                onClick={() => {
                  setSelectedRegion('Hawaii')
                  setShowTravelerModal(false)
                  setActiveTab('explore')
                }}
                className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left font-bold text-white"
              >
                Hawaii (Waikiki)
              </button>
              <button
                onClick={() => {
                  setSelectedRegion('Florida')
                  setShowTravelerModal(false)
                  setActiveTab('explore')
                }}
                className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left font-bold text-white"
              >
                Florida (Cocoa)
              </button>
              <button
                onClick={() => {
                  setSelectedRegion('New York')
                  setShowTravelerModal(false)
                  setActiveTab('explore')
                }}
                className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-left font-bold text-white"
              >
                New York (Rockaway)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── PERSISTENT MOBILE BOTTOM NAVIGATION ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#07090E]/95 backdrop-blur-lg border-t border-slate-800/80 px-2 py-2 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-mono transition-all ${activeTab === 'home' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
        >
          <Waves className="w-5 h-5" />
          <span>Home</span>
        </button>
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-mono transition-all ${activeTab === 'explore' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
        >
          <Compass className="w-5 h-5" />
          <span>Explore</span>
        </button>
        <button
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-mono transition-all ${activeTab === 'map' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
        >
          <MapPin className="w-5 h-5" />
          <span>Map</span>
        </button>
        <button
          onClick={() => setActiveTab('rentals')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-mono transition-all relative ${activeTab === 'rentals' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
        >
          <Ticket className="w-5 h-5" />
          <span>Rentals</span>
          {rentals.filter(r => r.status === 'ACTIVE').length > 0 && (
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-emerald-400"></span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-mono transition-all ${activeTab === 'profile' ? 'text-cyan-400 font-bold' : 'text-slate-400'}`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </button>
      </nav>
    </div>
  )
}
