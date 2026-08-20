// src/App.tsx - Full updated file
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
  Sun
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
  airTemp: string
  swell: string
  swellSub: string
  swellPeriod: string
  swellAngle: string
  skill: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'
  distance: string
  vanCount: number
  boardCount: number
  image: string
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
    windDirectionDeg: 315,
    tide: 'Rising',
    tideSub: 'Best push around 9–11 AM',
    nextHighTide: '11:15 AM (4.8 ft)',
    nextLowTide: '5:40 PM (1.1 ft)',
    waterTemp: '68°F',
    airTemp: '74°F',
    swell: 'SE 2.8 ft',
    swellSub: 'Consistent groundswell',
    swellPeriod: '11s',
    swellAngle: '142° SE',
    skill: 'Intermediate',
    distance: '0.2 mi',
    vanCount: 3,
    boardCount: 22,
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80',
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
    airTemp: '69°F',
    swell: 'E 3.8 ft',
    swellSub: 'Well-spaced ocean swell',
    swellPeriod: '12s',
    swellAngle: '95° E',
    skill: 'Intermediate',
    distance: '118 mi',
    vanCount: 2,
    boardCount: 19,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
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
    airTemp: '76°F',
    swell: 'ESE 2.4 ft',
    swellSub: 'Mid-period windswell blend',
    swellPeriod: '9s',
    swellAngle: '112° ESE',
    skill: 'Beginner',
    distance: '48 mi',
    vanCount: 2,
    boardCount: 15,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
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
    airTemp: '71°F',
    swell: 'SSW 3.8 ft',
    swellSub: 'Southern hemi groundswell',
    swellPeriod: '14s',
    swellAngle: '198° SSW',
    skill: 'Intermediate',
    distance: 'West Coast Market',
    vanCount: 4,
    boardCount: 38,
    image: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&w=1200&q=80',
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
    airTemp: '73°F',
    swell: 'S 4.6 ft',
    swellSub: 'Long-period Pacific groundswell',
    swellPeriod: '16s',
    swellAngle: '185° S',
    skill: 'Advanced',
    distance: 'West Coast Market',
    vanCount: 3,
    boardCount: 26,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'World-famous cobblestone skatepark wave with peeling lefts and rippable rights inside San Onofre State Park.',
    recommendation: 'A-frame perfection with wide open faces. Performance shortboards, step-downs, and refined fish are the weapon of choice.',
    bestWindow: '7:00 AM – 11:30 AM',
    bestWindowSub: 'Peak long-period southern groundswell window before sea breeze.',
    updatedMinutesAgo: 5,
    hourly: [
      { time: '7 AM', hourVal: 7, heightFt: 5.0, heightLabel: '5.0 ft', periodSec: 16, tideFt: 2.2, windDir: 'Calm', windSpeed: 2, quality: 'EPIC' },
      { time: '8 AM', hourVal: 8, heightFt: 5.4, heightLabel: '5.4 ft', periodSec: 16, tideFt: 2.9, windDir: 'Calm', windSpeed: 2, quality: 'EPIC' },
      { time: '9 AM', hourVal: 9, heightFt: 5.3, heightLabel: '5.3 ft', periodSec: 16, tideFt: 3.6, windDir: 'NE', windSpeed: 3, quality: 'EPIC' },
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
    windDirectionDeg: 290,
    tide: 'Mid-tide pushing',
    tideSub: 'Riding over shallow outer sandbar',
    nextHighTide: '10:10 AM (3.8 ft)',
    nextLowTide: '4:45 PM (0.9 ft)',
    waterTemp: '78°F',
    airTemp: '84°F',
    swell: 'E 2.2 ft',
    swellSub: 'Trade swell lines',
    swellPeriod: '9s',
    swellAngle: '88° E',
    skill: 'Beginner',
    distance: 'East Coast Market',
    vanCount: 2,
    boardCount: 18,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'Warm-water Florida surf with approachable beach-break conditions and classic Space Coast surf roots.',
    recommendation: 'Gentle peelers next to the pier. Soft-top logs and high-volume gliders will keep you standing all morning.',
    bestWindow: '8:00 AM – 11:00 AM',
    bestWindowSub: 'Morning offshore wind keeping rolling sandbars clean and fun.',
    updatedMinutesAgo: 8,
    hourly: [
      { time: '8 AM', hourVal: 8, heightFt: 2.3, heightLabel: '2.3 ft', periodSec: 9, tideFt: 2.4, windDir: 'WNW', windSpeed: 6, quality: 'FAIR-GOOD' },
      { time: '9 AM', hourVal: 9, heightFt: 2.5, heightLabel: '2.5 ft', periodSec: 9, tideFt: 3.1, windDir: 'WNW', windSpeed: 7, quality: 'FAIR-GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 2.4, heightLabel: '2.4 ft', periodSec: 8, tideFt: 3.7, windDir: 'W', windSpeed: 8, quality: 'FAIR' }
    ],
    lat: 28.3200,
    lng: -80.6076
  },
  {
    id: 'waikiki',
    name: 'Waikiki - Canoes & Queens',
    breakName: 'Canoes Point',
    city: 'Honolulu',
    state: 'HI',
    region: 'Hawaii',
    waveHeight: '2–4 ft',
    waveDesc: 'Waist to chest high',
    waveSub: 'Endless rolling tropical walls',
    quality: 'GOOD',
    wind: 'ENE 12 mph trades',
    windSub: 'Sideshore grooming',
    windMph: 12,
    windDirectionDeg: 70,
    tide: 'High slack',
    tideSub: 'Deep water cushion over outer coral',
    nextHighTide: '9:15 AM (2.2 ft)',
    nextLowTide: '3:50 PM (0.3 ft)',
    waterTemp: '79°F',
    airTemp: '83°F',
    swell: 'S 3.2 ft',
    swellSub: 'Summer southern groundswell',
    swellPeriod: '13s',
    swellAngle: '175° S',
    skill: 'Beginner',
    distance: 'Hawaii Market',
    vanCount: 3,
    boardCount: 32,
    image: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=1200&q=80',
    description: 'Long rolling waves, Diamond Head vistas, and the world’s most iconic and approachable longboarding venue.',
    recommendation: 'Endless glides through the Canoes channel. High-volume noseriders and classic single fins rule this lineup.',
    bestWindow: '7:00 AM – 12:00 PM',
    bestWindowSub: 'Gentle trades and wide rolling sets spanning hundreds of yards.',
    updatedMinutesAgo: 3,
    hourly: [
      { time: '7 AM', hourVal: 7, heightFt: 3.0, heightLabel: '3.0 ft', periodSec: 13, tideFt: 1.8, windDir: 'ENE', windSpeed: 10, quality: 'GOOD' },
      { time: '8 AM', hourVal: 8, heightFt: 3.4, heightLabel: '3.4 ft', periodSec: 13, tideFt: 2.1, windDir: 'ENE', windSpeed: 11, quality: 'GOOD' },
      { time: '9 AM', hourVal: 9, heightFt: 3.5, heightLabel: '3.5 ft', periodSec: 13, tideFt: 2.2, windDir: 'ENE', windSpeed: 12, quality: 'GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 3.2, heightLabel: '3.2 ft', periodSec: 12, tideFt: 2.0, windDir: 'ENE', windSpeed: 13, quality: 'FAIR-GOOD' }
    ],
    lat: 21.2762,
    lng: -157.8271
  },
  {
    id: 'outer-banks',
    name: 'Outer Banks - Cape Hatteras',
    breakName: 'Lighthouse Jetties',
    city: 'Buxton',
    state: 'NC',
    region: 'North Carolina',
    waveHeight: '3–5 ft',
    waveDesc: 'Chest to head high',
    waveSub: 'Heavy sandbar peaks',
    quality: 'GOOD',
    wind: 'SW 10 mph offshore',
    windSub: 'Offshore groomed tubes',
    windMph: 10,
    windDirectionDeg: 225,
    tide: 'Low rising',
    tideSub: 'Breaking hard on outside bar',
    nextHighTide: '10:50 AM (3.9 ft)',
    nextLowTide: '5:10 PM (0.7 ft)',
    waterTemp: '71°F',
    airTemp: '77°F',
    swell: 'E 3.4 ft',
    swellSub: 'Open Atlantic swell',
    swellPeriod: '11s',
    swellAngle: '90° E',
    skill: 'Intermediate',
    distance: 'East Coast Market',
    vanCount: 2,
    boardCount: 20,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'Raw Atlantic power, shifting sandbars, and hollow beach-break tubes off the North Carolina barrier islands.',
    recommendation: 'Punchy sandbar peaks breaking outside the old lighthouse groin. Twin keels and versatile daily drivers.',
    bestWindow: '8:00 AM – 11:30 AM',
    bestWindowSub: 'Cleanest offshore swell angle with rising tide support.',
    updatedMinutesAgo: 14,
    hourly: [
      { time: '8 AM', hourVal: 8, heightFt: 3.8, heightLabel: '3.8 ft', periodSec: 11, tideFt: 1.8, windDir: 'SW', windSpeed: 9, quality: 'GOOD' },
      { time: '9 AM', hourVal: 9, heightFt: 4.2, heightLabel: '4.2 ft', periodSec: 11, tideFt: 2.8, windDir: 'SW', windSpeed: 10, quality: 'GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 4.0, heightLabel: '4.0 ft', periodSec: 10, tideFt: 3.5, windDir: 'SW', windSpeed: 12, quality: 'GOOD' }
    ],
    lat: 35.2532,
    lng: -75.5262
  }
]

// --- REAL-TIME ROAMING VAN FLEET ---
const VANS: Van[] = [
  {
    id: 'van-12',
    fleetNumber: 'Van #12',
    nickname: 'Rockaway Runner',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach, NY',
    spot: 'Beach 90th Street Boardwalk',
    status: 'OPEN',
    distance: '0.2 mi away',
    walkTime: '3 min walk',
    driveTime: '1 min drive',
    hours: '6:00 AM – 7:30 PM',
    boardsAvailable: 8,
    longboards: 3,
    midsAndFun: 3,
    softTops: 1,
    shortboards: 1,
    fish: 2,
    nextLocation: 'Beach 67th Street',
    eta: '2:30 PM',
    waitMin: 2,
    lat: 40.5841,
    lng: -73.8160,
    mapX: 62,
    mapY: 48,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'van-07',
    fleetNumber: 'Van #07',
    nickname: 'Boardwalk Cruiser',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach, NY',
    spot: 'Beach 67th Street Plaza',
    status: 'OPEN',
    distance: '0.9 mi away',
    walkTime: '12 min walk',
    driveTime: '3 min drive',
    hours: '6:30 AM – 7:00 PM',
    boardsAvailable: 9,
    longboards: 4,
    midsAndFun: 2,
    softTops: 2,
    shortboards: 1,
    fish: 1,
    nextLocation: 'Beach 90th Street',
    eta: '4:00 PM',
    waitMin: 1,
    lat: 40.5898,
    lng: -73.7990,
    mapX: 74,
    mapY: 38,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'van-31',
    fleetNumber: 'Van #31',
    nickname: 'Huntington Nomad',
    beachId: 'huntington',
    beachName: 'Huntington Beach, CA',
    spot: 'Pier Plaza South',
    status: 'OPEN',
    distance: 'West Coast Hub',
    walkTime: 'At Southside Pier',
    driveTime: 'Parking lot 2',
    hours: '6:00 AM – 8:00 PM',
    boardsAvailable: 14,
    longboards: 3,
    midsAndFun: 4,
    softTops: 2,
    shortboards: 3,
    fish: 2,
    waitMin: 3,
    lat: 33.6590,
    lng: -117.9980,
    mapX: 45,
    mapY: 60,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'van-45',
    fleetNumber: 'Van #45',
    nickname: 'Cocoa Cruiser',
    beachId: 'cocoa-beach',
    beachName: 'Cocoa Beach, FL',
    spot: 'Pier Boardwalk Lane',
    status: 'OPEN',
    distance: 'Florida Hub',
    walkTime: 'Pier Entrance',
    driveTime: 'Pier Lot A',
    hours: '7:00 AM – 7:00 PM',
    boardsAvailable: 11,
    longboards: 5,
    midsAndFun: 3,
    softTops: 2,
    shortboards: 1,
    fish: 1,
    waitMin: 2,
    lat: 28.3205,
    lng: -80.6070,
    mapX: 55,
    mapY: 52,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'van-61',
    fleetNumber: 'Van #61',
    nickname: 'Waikiki Nomad',
    beachId: 'waikiki',
    beachName: 'Waikiki, HI',
    spot: 'Kalakaua Promenade',
    status: 'OPEN',
    distance: 'Oahu Hub',
    walkTime: 'At Queens statue',
    driveTime: 'Beach access alley',
    hours: '6:00 AM – 6:30 PM',
    boardsAvailable: 16,
    longboards: 8,
    midsAndFun: 4,
    softTops: 3,
    shortboards: 1,
    fish: 1,
    waitMin: 1,
    lat: 21.2760,
    lng: -157.8268,
    mapX: 50,
    mapY: 50,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=600&q=80'
  }
]

// --- BOARD QUIVER DATA ---
const INITIAL_BOARDS: Board[] = [
  {
    id: 'b-01',
    code: 'SP-RKW-0092',
    name: "9'0 Dawn Patrol Log",
    type: 'Longboard',
    dimensions: "9'0 × 22 3/4 × 3",
    length: "9'0",
    width: "22 3/4",
    thickness: "3.0",
    volume: '72 L',
    finSetup: 'Single Fin Box (9" Pivot Fin included)',
    skill: 'Beginner / Intermediate',
    recommendedWaves: '1–3 ft clean soft lines',
    condition: 'Excellent',
    vanId: 'van-12',
    vanName: 'Van #12 (Rockaway Runner)',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach, NY',
    availableCount: 3,
    totalInVan: 3,
    personality: 'Easy glide & classic noseriding',
    whyMatch: "The waves are small, clean and soft this morning, so the 72L volume will help you catch every rolling set without fighting the conditions.",
    pricing: {
      twoHours: 25,
      fourHours: 38,
      fullDay: 48
    },
    deposit: 50,
    protectionFee: 3,
    tag: 'BEST MATCH',
    shapeType: 'long'
  },
  {
    id: 'b-02',
    code: 'SP-RKW-0081',
    name: "8'0 Boardwalk Soft-Top",
    type: 'Soft-Top',
    dimensions: "8'0 × 23 × 3 1/4",
    length: "8'0",
    width: "23",
    thickness: "3 1/4",
    volume: '82 L',
    finSetup: 'Thruster Safe-Flex Fins',
    skill: 'Beginner',
    recommendedWaves: '1–3 ft gentle waves',
    condition: 'Mint',
    vanId: 'van-12',
    vanName: 'Van #12 (Rockaway Runner)',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach, NY',
    availableCount: 2,
    totalInVan: 2,
    personality: 'Stable, ultra-buoyant & forgiving',
    whyMatch: "Maximum buoyancy and soft deck construction make this the safest, most confidence-inspiring choice for casual morning surfing.",
    pricing: {
      twoHours: 25,
      fourHours: 35,
      fullDay: 45
    },
    deposit: 50,
    protectionFee: 3,
    tag: 'BEGINNER PICK',
    shapeType: 'soft'
  },
  {
    id: 'b-03',
    code: 'SP-RKW-0072',
    name: "7'2 Sunday Mid",
    type: 'Mid-Length',
    dimensions: "7'2 × 21 1/2 × 2 3/4",
    length: "7'2",
    width: "21 1/2",
    thickness: "2 3/4",
    volume: '54 L',
    finSetup: '2+1 Fin Setup',
    skill: 'All Levels',
    recommendedWaves: '2–4 ft peeling surf',
    condition: 'Excellent',
    vanId: 'van-12',
    vanName: 'Van #12 (Rockaway Runner)',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach, NY',
    availableCount: 3,
    totalInVan: 3,
    personality: 'Smooth rail-to-rail trim & paddle power',
    whyMatch: "At 2–3 ft with clean offshore grooming, this 7'2 mid gives you effortless paddle speed with responsive trim off the tail.",
    pricing: {
      twoHours: 28,
      fourHours: 40,
      fullDay: 50
    },
    deposit: 50,
    protectionFee: 3,
    tag: 'ALL-AROUND PICK',
    shapeType: 'mid'
  },
  {
    id: 'b-04',
    code: 'SP-RKW-0058',
    name: "5'10 Twin Fish",
    type: 'Fish',
    dimensions: "5'10 × 20 3/4 × 2 1/2",
    length: "5'10",
    width: "20 3/4",
    thickness: "2 1/2",
    volume: '36 L',
    finSetup: 'Keel Twin Fins included',
    skill: 'Intermediate',
    recommendedWaves: '2–5 ft punchy faces',
    condition: 'Mint',
    vanId: 'van-12',
    vanName: 'Van #12 (Rockaway Runner)',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach, NY',
    availableCount: 2,
    totalInVan: 2,
    personality: 'High speed down the line & skate feel',
    whyMatch: "Waist-to-chest-high surf with rising tide push. The wide fish swallow-tail generates instant speed through flatter sections.",
    pricing: {
      twoHours: 30,
      fourHours: 42,
      fullDay: 52
    },
    deposit: 50,
    protectionFee: 3,
    tag: 'SPEED DEMON',
    shapeType: 'fish'
  },
  {
    id: 'b-05',
    code: 'SP-RKW-0062',
    name: "6'2 Daily Driver",
    type: 'Shortboard',
    dimensions: "6'2 × 19 3/4 × 2 1/2",
    length: "6'2",
    width: "19 3/4",
    thickness: "2 1/2",
    volume: '33 L',
    finSetup: 'Thruster FCS II Setup',
    skill: 'Advanced',
    recommendedWaves: '3–6 ft punchy beach break',
    condition: 'Excellent',
    vanId: 'van-12',
    vanName: 'Van #12 (Rockaway Runner)',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach, NY',
    availableCount: 1,
    totalInVan: 1,
    personality: 'Tight turns in critical pockets',
    whyMatch: "When the outside sandbar sets kick in, this shortboard allows quick snaps and tight pocket turns on steeper faces.",
    pricing: {
      twoHours: 32,
      fourHours: 45,
      fullDay: 55
    },
    deposit: 50,
    protectionFee: 3,
    tag: 'PERFORMANCE',
    shapeType: 'short'
  }
]

// Accurate Vector Surfboard Graphic
function BoardSilhouette({ type, className = "h-40" }: { type: 'long' | 'mid' | 'fish' | 'short' | 'soft', className?: string }) {
  if (type === 'long') {
    return (
      <svg viewBox="0 0 100 320" className={`${className} mx-auto drop-shadow-lg`} fill="none">
        <path d="M 50 15 C 30 50, 24 160, 28 290 C 32 305, 68 305, 72 290 C 76 160, 70 50, 50 15 Z" fill="#E2E8F0" stroke="#06B6D4" strokeWidth="2" />
        <line x1="50" y1="20" x2="50" y2="300" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 2" />
        <path d="M 40 40 Q 50 30 60 40" stroke="#06B6D4" strokeWidth="1.5" fill="none" />
        <circle cx="50" cy="275" r="4" fill="#06B6D4" />
        <rect x="47" y="285" width="6" height="15" rx="2" fill="#0891B2" />
      </svg>
    )
  }
  if (type === 'soft') {
    return (
      <svg viewBox="0 0 105 310" className={`${className} mx-auto drop-shadow-lg`} fill="none">
        <path d="M 52.5 18 C 28 50, 22 160, 26 285 C 30 300, 75 300, 79 285 C 83 160, 77 50, 52.5 18 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="3" />
        <line x1="52.5" y1="22" x2="52.5" y2="295" stroke="#0369A1" strokeWidth="2" />
        <circle cx="52.5" cy="120" r="14" fill="#0284C7" opacity="0.3" />
        <circle cx="52.5" cy="265" r="3" fill="#0369A1" />
        <rect x="49" y="275" width="7" height="15" rx="2" fill="#0369A1" />
      </svg>
    )
  }
  if (type === 'mid') {
    return (
      <svg viewBox="0 0 95 280" className={`${className} mx-auto drop-shadow-lg`} fill="none">
        <path d="M 47.5 15 C 24 55, 20 150, 24 255 C 28 268, 67 268, 71 255 C 75 150, 71 55, 47.5 15 Z" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
        <line x1="47.5" y1="18" x2="47.5" y2="262" stroke="#A16207" strokeWidth="1.5" />
        <path d="M 35 245 L 35 258 M 60 245 L 60 258" stroke="#CA8A04" strokeWidth="2" />
      </svg>
    )
  }
  if (type === 'fish') {
    return (
      <svg viewBox="0 0 90 230" className={`${className} mx-auto drop-shadow-lg`} fill="none">
        <path d="M 45 12 C 18 45, 14 130, 20 205 L 35 220 L 45 198 L 55 220 L 70 205 C 76 130, 72 45, 45 12 Z" fill="#FDBA74" stroke="#EA580C" strokeWidth="2" />
        <line x1="45" y1="15" x2="45" y2="198" stroke="#C2410C" strokeWidth="1.5" />
        <rect x="25" y="195" width="5" height="15" rx="1" fill="#EA580C" />
        <rect x="60" y="195" width="5" height="15" rx="1" fill="#EA580C" />
      </svg>
    )
  }
  // Shortboard
  return (
    <svg viewBox="0 0 85 240" className={`${className} mx-auto drop-shadow-lg`} fill="none">
      <path d="M 42.5 8 C 22 45, 16 130, 22 218 C 26 230, 59 230, 63 218 C 69 130, 63 45, 42.5 8 Z" fill="#F1F5F9" stroke="#64748B" strokeWidth="2" />
      <line x1="42.5" y1="12" x2="42.5" y2="225" stroke="#94A3B8" strokeWidth="1.2" />
      <path d="M 32 205 L 32 218 M 42.5 210 L 42.5 224 M 53 205 L 53 218" stroke="#475569" strokeWidth="1.5" />
    </svg>
  )
}

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'map' | 'rentals' | 'profile'>('home')

  // Core Data State
  const [boards, setBoards] = useState<Board[]>(INITIAL_BOARDS)
  const [selectedBeach, setSelectedBeach] = useState<Beach>(BEACHES[0])
  const [selectedVan, setSelectedVan] = useState<Van>(VANS[0])
  const [selectedBoard, setSelectedBoard] = useState<Board>(INITIAL_BOARDS[0])

  // Modals
  const [showBeachModal, setShowBeachModal] = useState(false)
  const [showVanModal, setShowVanModal] = useState(false)
  const [showBoardModal, setShowBoardModal] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [showPassModal, setShowPassModal] = useState(false)
  const [showInfraModal, setShowInfraModal] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showWhatToRideModal, setShowWhatToRideModal] = useState(false)
  const [showSurfNowModal, setShowSurfNowModal] = useState(false)
  const [showTravelerModal, setShowTravelerModal] = useState(false)

  // Filters & User Settings
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [quiverFilter, setQuiverFilter] = useState<string>('All')
  const [userSkill, setUserSkill] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate')
  const [walletConnected, setWalletConnected] = useState<boolean>(false)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [walletBalanceUsdc, setWalletBalanceUsdc] = useState<number>(250)
  const [walletBalanceSol, setWalletBalanceSol] = useState<number>(3.42)

  // Reservation Flow State
  const [rentalDuration, setRentalDuration] = useState<'2hr' | '4hr' | 'full'>('2hr')
  const [damageProtection, setDamageProtection] = useState<boolean>(true)
  const [paymentMethod, setPaymentMethod] = useState<'USDC' | 'BTC' | 'CARD'>('USDC')
  const [paymentStep, setPaymentStep] = useState<'idle' | 'waiting' | 'detected' | 'confirming' | 'confirmed'>('idle')
  const [activeRentalPass, setActiveRentalPass] = useState<RentalPass | null>(null)
  const [showOnchainReceipt, setShowOnchainReceipt] = useState<boolean>(false)
  const [activeRentalsList, setActiveRentalsList] = useState<RentalPass[]>([
    {
      id: 'SP-RKW-7F3A92',
      boardName: "9'0 Dawn Patrol Log",
      boardCode: 'SP-RKW-0092',
      boardType: 'Longboard',
      boardDimensions: "9'0 × 22 3/4 × 3",
      boardVolume: '72 L',
      vanId: 'van-12',
      vanName: 'Van #12',
      vanNickname: 'Rockaway Runner',
      location: 'Rockaway Beach, NY',
      spot: 'Beach 90th Street',
      startTime: '8:30 AM',
      endTime: '10:30 AM',
      durationLabel: '2 hours',
      paymentMethod: 'USDC',
      rentalPrice: 25,
      protection: 3,
      deposit: 50,
      depositStatus: 'HELD',
      status: 'ACTIVE',
      txHash: '5K2b...9xLm',
      createdAt: Date.now() - 3600000,
      sessionActive: true
    }
  ])
  const [returningId, setReturningId] = useState<string | null>(null)
  const [returnSuccessModal, setReturnSuccessModal] = useState<boolean>(false)

  // Escape key handler for all modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowBeachModal(false)
        setShowVanModal(false)
        setShowBoardModal(false)
        setShowCheckoutModal(false)
        setShowPassModal(false)
        setShowInfraModal(false)
        setShowWalletModal(false)
        setShowWhatToRideModal(false)
        setShowSurfNowModal(false)
        setShowTravelerModal(false)
        setReturnSuccessModal(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Filtered Beaches
  const filteredBeaches = useMemo(() => {
    return BEACHES.filter(b => {
      const matchRegion = selectedRegion === 'All Regions' || b.region === selectedRegion
      const matchSearch =
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.breakName.toLowerCase().includes(searchQuery.toLowerCase())
      return matchRegion && matchSearch
    })
  }, [selectedRegion, searchQuery])

  // Filtered Quiver Boards
  const filteredBoards = useMemo(() => {
    return boards.filter(b => {
      if (quiverFilter === 'All') return true
      if (quiverFilter === 'Longboard') return b.type === 'Longboard' || b.type === 'Soft-Top'
      if (quiverFilter === 'Mid-Length') return b.type === 'Mid-Length' || b.type === 'Funboard'
      if (quiverFilter === 'Fish') return b.type === 'Fish'
      if (quiverFilter === 'Shortboard') return b.type === 'Shortboard'
      return true
    })
  }, [boards, quiverFilter])

  // Pricing calculations
  const currentRentalCost = useMemo(() => {
    if (!selectedBoard) return 25
    if (rentalDuration === '2hr') return selectedBoard.pricing.twoHours
    if (rentalDuration === '4hr') return selectedBoard.pricing.fourHours
    return selectedBoard.pricing.fullDay
  }, [selectedBoard, rentalDuration])

  const protectionTotal = damageProtection ? (selectedBoard?.protectionFee || 3) : 0
  const depositTotal = selectedBoard?.deposit || 50
  const totalAuthorization = currentRentalCost + protectionTotal + depositTotal
  const btcRate = 67000
  const btcRentalCost = (currentRentalCost / btcRate).toFixed(6)

  // Handlers
  const handleSelectBeach = (beach: Beach) => {
    setSelectedBeach(beach)
    setShowBeachModal(true)
  }

  const handleSelectVan = (van: Van) => {
    setSelectedVan(van)
    setShowVanModal(true)
  }

  const handleSelectBoard = (board: Board) => {
    setSelectedBoard(board)
    setShowBoardModal(true)
  }

  const handleOpenCheckout = (board: Board) => {
    setSelectedBoard(board)
    setShowBoardModal(false)
    setShowVanModal(false)
    setShowBeachModal(false)
    setShowSurfNowModal(false)
    setShowWhatToRideModal(false)
    setPaymentStep('idle')
    setShowCheckoutModal(true)
  }

  const handleConnectWallet = (walletType: string) => {
    setWalletConnected(true)
    const mockAddr = walletType === 'phantom'
      ? '8x9P...4kLm'
      : walletType === 'solflare'
      ? '3vN2...8qTx'
      : 'sp_94a2...smart'
    setWalletAddress(mockAddr)
    setShowWalletModal(false)
  }

  const handleDisconnectWallet = () => {
    setWalletConnected(false)
    setWalletAddress('')
  }

  const handleExecutePayment = () => {
    if (paymentMethod === 'CARD') {
      setPaymentStep('waiting')
      setTimeout(() => {
        setPaymentStep('confirmed')
        finalizeReservation()
      }, 1200)
      return
    }

    // Crypto Flow (USDC or BTC via Tatum)
    setPaymentStep('waiting')
    const fakeTx = paymentMethod === 'USDC' ? '4Zx9...k7Lm (Solana)' : '1Bv8...8Qz2 (Bitcoin)'

    setTimeout(() => {
      setPaymentStep('detected')
    }, 1000)

    setTimeout(() => {
      setPaymentStep('confirming')
    }, 2200)

    setTimeout(() => {
      setPaymentStep('confirmed')
      finalizeReservation(fakeTx)
    }, 3600)
  }

  const finalizeReservation = (txHash?: string) => {
    // Deduct stock
    setBoards(prev =>
      prev.map(b => b.id === selectedBoard.id ? { ...b, availableCount: Math.max(0, b.availableCount - 1) } : b)
    )

    if (paymentMethod === 'USDC' && walletConnected) {
      setWalletBalanceUsdc(prev => Math.max(0, prev - totalAuthorization))
    }

    const durationText = rentalDuration === '2hr' ? '2 hours' : rentalDuration === '4hr' ? '4 hours' : 'Full Day'
    const newPass: RentalPass = {
      id: `SP-${selectedBeach.id.slice(0, 3).toUpperCase()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
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
      startTime: '8:30 AM',
      endTime: rentalDuration === '2hr' ? '10:30 AM' : rentalDuration === '4hr' ? '12:30 PM' : '6:00 PM',
      durationLabel: durationText,
      paymentMethod,
      rentalPrice: currentRentalCost,
      protection: protectionTotal,
      deposit: depositTotal,
      depositStatus: 'HELD',
      status: 'ACTIVE',
      txHash: txHash || 'auth_card_9981',
      createdAt: Date.now(),
      sessionActive: true
    }

    setActiveRentalPass(newPass)
    setActiveRentalsList(prev => [newPass, ...prev])

    setTimeout(() => {
      setShowCheckoutModal(false)
      setShowPassModal(true)
      setActiveTab('rentals')
    }, 800)
  }

  const handleReturnBoard = (rentalId: string) => {
    setReturningId(rentalId)
    setTimeout(() => {
      setActiveRentalsList(prev =>
        prev.map(r => r.id === rentalId ? { ...r, depositStatus: 'REFUNDED', status: 'COMPLETED', sessionActive: false } : r)
      )
      if (activeRentalPass?.id === rentalId) {
        setActiveRentalPass(prev => prev ? { ...prev, depositStatus: 'REFUNDED', status: 'COMPLETED', sessionActive: false } : null)
      }
      setBoards(prev =>
        prev.map(b => b.code === (activeRentalPass?.boardCode || 'SP-RKW-0092') ? { ...b, availableCount: b.availableCount + 1 } : b)
      )
      setReturningId(null)
      setReturnSuccessModal(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 font-sans antialiased pb-24 selection:bg-cyan-500 selection:text-black">
      {/* 1. TOP GLOBAL NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#0A0F1D]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Waves className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white">
                  SURF<span className="text-cyan-400">PASS</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                  NATIONAL FLEET
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Rent. Surf. Onchain.</p>
            </div>
          </div>

          {/* Desktop Primary Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-xl shadow-inner">
            {[
              { id: 'home', label: 'Home', icon: Waves },
              { id: 'explore', label: 'Explore', icon: Compass },
              { id: 'map', label: 'Live Map', icon: MapPin },
              { id: 'rentals', label: 'My Rentals', icon: Ticket, badge: activeRentalsList.filter(r => r.status === 'ACTIVE').length },
              { id: 'profile', label: 'Profile', icon: User }
            ].map(tab => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${isActive ? 'bg-black text-cyan-300' : 'bg-cyan-500 text-black'}`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Tatum Infra Quick-Link */}
            <button
              onClick={() => setShowInfraModal(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-300 text-xs font-semibold transition"
              title="Tatum Multi-Chain Blockchain Infrastructure"
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span className="hidden sm:inline">Tatum Infra</span>
            </button>

            {/* Surf Now Fast CTA */}
            <button
              onClick={() => setShowSurfNowModal(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-xs shadow-md shadow-orange-500/20 transition transform active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 fill-black" />
              <span>Surf Now</span>
            </button>

            {/* Connect Wallet */}
            {walletConnected ? (
              <button
                onClick={() => setShowWalletModal(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/90 border border-cyan-500/40 text-cyan-300 text-xs font-semibold hover:bg-slate-800 transition"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{walletAddress}</span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">({walletBalanceUsdc} USDC)</span>
              </button>
            ) : (
              <button
                onClick={() => setShowWalletModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition"
              >
                <Wallet className="w-3.5 h-3.5 text-cyan-400" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. MAIN APP CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        {/* ======================= HOME TAB ======================= */}
        {activeTab === 'home' && (
          <div className="space-y-10">
            {/* HERO SECTION */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1528] via-[#0D1B36] to-[#080E1C] border border-slate-800/90 p-6 sm:p-12 shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                  <Waves className="w-3.5 h-3.5" />
                  <span>Nationwide Surf & Roaming Van Network</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                  Rent the perfect board <br className="hidden sm:inline" />
                  for today’s surf.
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                  Live surf conditions, nearby mobile rental vans, and instant reservations. Pay with USDC on Solana, Bitcoin, or Apple Pay.
                </p>

                <p className="text-xs font-bold tracking-wide uppercase text-cyan-400">
                  Find waves. Find a board. Go surf.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab('explore')}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-sm shadow-lg shadow-cyan-500/25 transition active:scale-95"
                  >
                    <span>Find a Beach</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleSelectBeach(BEACHES[0])}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-semibold text-sm transition"
                  >
                    <Compass className="w-4 h-4 text-cyan-400" />
                    <span>Rockaway Demo Surf</span>
                  </button>

                  <button
                    onClick={() => setShowTravelerModal(true)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-medium text-xs transition"
                  >
                    <Plane className="w-3.5 h-3.5 text-amber-400" />
                    <span>Traveling?</span>
                  </button>
                </div>
              </div>

              {/* 5-STEP CONSUMER JOURNEY BANNER (CLICKABLE) */}
              <div className="mt-10 pt-8 border-t border-slate-800/80">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                  How SurfPass Works (Click any step to explore)
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-4">
                  {[
                    { step: '1. Forecast', label: 'Check live wave conditions', icon: Waves, action: () => handleSelectBeach(BEACHES[0]) },
                    { step: '2. Van', label: 'Find closest mobile van', icon: Car, action: () => handleSelectVan(VANS[0]) },
                    { step: '3. Board', label: 'Select tailored surfboard', icon: Compass, action: () => { setSelectedVan(VANS[0]); setShowVanModal(true); } },
                    { step: '4. Pay', label: 'USDC, BTC or Apple Pay', icon: CreditCard, action: () => handleOpenCheckout(INITIAL_BOARDS[0]) },
                    { step: '5. Pass & Surf', label: 'Scan QR & get board', icon: Ticket, action: () => { if (activeRentalsList.length > 0) { setActiveRentalPass(activeRentalsList[0]); setShowPassModal(true); } else { setActiveTab('rentals'); } } }
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
            </section>

            {/* SMART "BEST MATCH RIGHT NOW" CARD */}
            <section className="bg-gradient-to-r from-[#0C192E] via-[#0E203B] to-[#0A1628] border border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-500 text-black">
                      BEST MATCH RIGHT NOW
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getQualityBadgeStyle('GOOD')}`}>
                      2–3 FT • GOOD
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Rockaway Beach (Queens, NY)</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    9'0 Dawn Patrol Log at Rockaway Van #12
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <strong className="text-cyan-300">Why this board: </strong>
                    The waves are small, clean and soft this morning, so the 72L volume helps you glide through every set before the afternoon wind shift.
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

            {/* GOOD SURF NEAR YOU (BEACH DISCOVERY CAROUSEL) */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-white">GOOD SURF NEAR YOU</h2>
                  <p className="text-xs text-slate-400">Live conditions feed with nearby mobile SurfPass van inventory</p>
                </div>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>View all 8 breaks</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {BEACHES.slice(0, 3).map(beach => (
                  <div
                    key={beach.id}
                    className="group bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-cyan-500/50 overflow-hidden transition shadow-lg flex flex-col"
                  >
                    {/* Beach Cover Image */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={beach.image}
                        alt={beach.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                      <div className="absolute top-3 left-3 flex items-center gap-2">
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

                    {/* Conditions Quick-Stats */}
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
                          <span>{beach.vanCount} Vans Nearby</span>
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

            {/* VAN FLEET & INVENTORY SHOWCASE */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-white">VAN #12 QUIVER READY</h2>
                  <p className="text-xs text-slate-400">Rockaway Beach • Beach 90th Street (0.2 mi away)</p>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                  {['All', 'Longboard', 'Mid-Length', 'Fish', 'Shortboard'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setQuiverFilter(cat)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                        quiverFilter === cat ? 'bg-cyan-500 text-black' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredBoards.map(board => (
                  <div
                    key={board.id}
                    className="bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-cyan-500/40 p-4 flex flex-col justify-between transition group"
                  >
                    <div>
                      {/* Accurate Surfboard Vector Silhouette */}
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

        {/* ======================= EXPLORE TAB ======================= */}
        {activeTab === 'explore' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">NATIONWIDE SURF BREAKS</h1>
                <p className="text-xs text-slate-400">Browse live wave conditions, nearby vans, and board quivers across all US surf regions</p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search beach, city, or break..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Region Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {['All Regions', 'New York', 'New Jersey', 'California', 'Florida', 'Hawaii', 'North Carolina'].map(reg => (
                <button
                  key={reg}
                  onClick={() => setSelectedRegion(reg)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    selectedRegion === reg
                      ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {reg}
                </button>
              ))}
            </div>

            {/* Beach Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredBeaches.map(beach => (
                <div
                  key={beach.id}
                  className="bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-cyan-500/50 overflow-hidden transition shadow-lg flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={beach.image}
                      alt={beach.name}
                      className="w-full h-full object-cover hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${getQualityBadgeStyle(beach.quality)}`}>
                        {beach.quality}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 backdrop-blur-md text-white border border-white/10">
                        {beach.region}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-lg font-black text-white">{beach.name}</h3>
                      <p className="text-xs text-slate-300">{beach.breakName} • {beach.city}, {beach.state}</p>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-slate-300 line-clamp-2">{beach.description}</p>

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
                        <p className="text-[10px] text-slate-400 font-semibold">SWELL</p>
                        <p className="text-xs font-bold text-white">{beach.swellPeriod}</p>
                        <p className="text-[9px] text-slate-400 truncate">{beach.swell}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1 text-slate-300">
                        <Car className="w-3.5 h-3.5 text-cyan-400" />
                        {beach.vanCount} Roaming Vans
                      </span>
                      <span className="text-emerald-400 font-semibold">
                        {beach.boardCount} boards available
                      </span>
                    </div>

                    <button
                      onClick={() => handleSelectBeach(beach)}
                      className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs transition active:scale-95"
                    >
                      View Conditions & Available Boards
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= LIVE MAP TAB ======================= */}
        {activeTab === 'map' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">LIVE SURFPASS MAP</h1>
                <p className="text-xs text-slate-400">Interactive coastal GPS tracking for roaming rental vans and surf breaks</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 text-cyan-400 font-semibold bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                  <Car className="w-3.5 h-3.5" /> 5 Active Vans
                </span>
                <span className="flex items-center gap-1 text-emerald-400 font-semibold bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                  <Waves className="w-3.5 h-3.5" /> 8 Monitored Breaks
                </span>
              </div>
            </div>

            {/* Simulated Coastal Map Viewport */}
            <div className="relative w-full h-[520px] rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
              {/* Map Surface Grid & Ocean Styling */}
              <div className="absolute inset-0 bg-[#06101E]">
                {/* Coastal Wave Pattern */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#06B6D4_1px,transparent_1px)] [background-size:24px_24px]" />
                {/* Shoreline Graphic */}
                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 600">
                  <path d="M 0 350 Q 250 280 500 360 T 1000 300 L 1000 600 L 0 600 Z" fill="#0B1A30" />
                  <path d="M 0 380 Q 250 310 500 390 T 1000 330 L 1000 600 L 0 600 Z" fill="#0F2444" />
                  <text x="60" y="550" fill="#334155" fontSize="24" fontWeight="bold">ATLANTIC OCEAN / ROCKAWAY SHORELINE</text>
                  <line x1="100" y1="360" x2="900" y2="360" stroke="#1E293B" strokeWidth="2" strokeDasharray="8 4" />
                  <text x="350" y="340" fill="#64748B" fontSize="12" fontWeight="600">ROCKAWAY BOARDWALK & JETTY REEFS</text>
                </svg>
              </div>

              {/* Van Pin 1: Van #12 (Rockaway Runner) */}
              <div
                className="absolute top-1/3 left-1/2 -translate-x-1/2 cursor-pointer group z-20"
                onClick={() => handleSelectVan(VANS[0])}
              >
                <div className="relative flex flex-col items-center">
                  <div className="px-3 py-1 rounded-xl bg-cyan-500 text-black font-extrabold text-[11px] shadow-lg flex items-center gap-1.5 group-hover:scale-110 transition">
                    <Car className="w-3.5 h-3.5 fill-black" />
                    <span>Van #12 (8 boards)</span>
                  </div>
                  <div className="w-3 h-3 bg-cyan-500 rotate-45 -mt-1.5 shadow-md" />
                  <div className="w-4 h-4 rounded-full bg-cyan-400/40 animate-ping absolute -bottom-1" />
                </div>
              </div>

              {/* Van Pin 2: Van #07 (Boardwalk Cruiser) */}
              <div
                className="absolute top-1/2 left-2/3 cursor-pointer group z-20"
                onClick={() => handleSelectVan(VANS[1])}
              >
                <div className="relative flex flex-col items-center">
                  <div className="px-2.5 py-1 rounded-xl bg-slate-900 text-cyan-300 border border-cyan-500/50 font-bold text-[10px] shadow-lg flex items-center gap-1.5 group-hover:scale-110 transition">
                    <Car className="w-3.5 h-3.5" />
                    <span>Van #07 (9 boards)</span>
                  </div>
                  <div className="w-2.5 h-2.5 bg-slate-900 border-r border-b border-cyan-500/50 rotate-45 -mt-1 shadow-md" />
                </div>
              </div>

              {/* Surf Break Pin: Beach 90th Street */}
              <div
                className="absolute top-1/4 left-1/3 cursor-pointer group z-20"
                onClick={() => handleSelectBeach(BEACHES[0])}
              >
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/60 text-emerald-300 text-xs font-bold shadow-lg backdrop-blur-md">
                  <Waves className="w-3.5 h-3.5" />
                  <span>Rockaway Beach 90th • 2–3 ft (GOOD)</span>
                </div>
              </div>

              {/* Floating Van Detail Card Bottom-Left */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-96 bg-slate-900/95 backdrop-blur-md border border-slate-800 p-4 rounded-2xl shadow-2xl z-30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <Car className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white">Van #12 (Rockaway Runner)</h4>
                      <p className="text-[10px] text-slate-400">Beach 90th Street • 0.2 mi away</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    OPEN
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs bg-slate-950 p-2 rounded-xl border border-slate-800">
                  <div>
                    <p className="text-[10px] text-slate-400">Available</p>
                    <p className="font-black text-cyan-400">8 Boards</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">Wait Time</p>
                    <p className="font-bold text-white">~2 min</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400">Hours</p>
                    <p className="font-bold text-white">Till 7:30 PM</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSelectVan(VANS[0])}
                    className="flex-1 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs transition"
                  >
                    View Van Boards
                  </button>
                  <button
                    onClick={() => handleSelectBeach(BEACHES[0])}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
                  >
                    Beach Forecast
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================= RENTALS TAB ======================= */}
        {activeTab === 'rentals' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">MY RENTALS & SESSIONS</h1>
                <p className="text-xs text-slate-400">Manage active surfboard sessions, digital passes, and deposit refunds</p>
              </div>
              <button
                onClick={() => setActiveTab('explore')}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs transition"
              >
                + Rent Another Board
              </button>
            </div>

            {activeRentalsList.length === 0 ? (
              <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800 p-8 space-y-3">
                <Ticket className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">No active surf passes</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Reserve a surfboard from any nearby SurfPass van to generate your digital boarding pass.
                </p>
                <button
                  onClick={() => setActiveTab('home')}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-bold text-xs"
                >
                  Browse Quiver
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {activeRentalsList.map(rental => (
                  <div
                    key={rental.id}
                    className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 sm:p-6 shadow-xl space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-black">
                          <Ticket className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-black text-white">{rental.boardName}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                              rental.status === 'ACTIVE'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              {rental.status === 'ACTIVE' ? 'SESSION ACTIVE' : 'COMPLETED'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">{rental.location} • {rental.vanName} ({rental.vanNickname})</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-slate-400 font-mono">Pass: {rental.id}</p>
                        <p className="text-xs text-cyan-400 font-semibold">{rental.startTime} – {rental.endTime}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                      <div>
                        <p className="text-slate-400 text-[10px]">Rental Charge</p>
                        <p className="font-bold text-white">${rental.rentalPrice} ({rental.durationLabel})</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-[10px]">Refundable Deposit</p>
                        <p className={`font-bold ${rental.depositStatus === 'HELD' ? 'text-amber-400' : 'text-emerald-400'}`}>
                          ${rental.deposit} ({rental.depositStatus})
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-[10px]">Payment Rail</p>
                        <p className="font-bold text-white">{rental.paymentMethod} (via Tatum)</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-[10px]">Pickup Location</p>
                        <p className="font-bold text-white truncate">{rental.spot}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setActiveRentalPass(rental)
                            setShowPassModal(true)
                          }}
                          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-1.5"
                        >
                          <QrCode className="w-3.5 h-3.5 text-cyan-400" />
                          <span>View Rental Pass</span>
                        </button>

                        <button
                          onClick={() => handleSelectVan(VANS[0])}
                          className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium transition flex items-center gap-1"
                        >
                          <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Navigate to Van</span>
                        </button>
                      </div>

                      {rental.status === 'ACTIVE' && (
                        <button
                          disabled={returningId === rental.id}
                          onClick={() => handleReturnBoard(rental.id)}
                          className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition active:scale-95 flex items-center gap-1.5"
                        >
                          {returningId === rental.id ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Releasing $50 Deposit...</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Return Board & Release ${rental.deposit} Deposit</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ======================= PROFILE TAB ======================= */}
        {activeTab === 'profile' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center text-2xl font-black text-white shadow-lg">
                  P
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">Patrick (Surfer Account)</h2>
                  <p className="text-xs text-slate-400">Home Break: Rockaway Beach, NY • Level: Intermediate</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      SurfPass Score: 94 / 100
                    </span>
                    <span className="text-[10px] text-slate-400">17 Sessions Completed</span>
                  </div>
                </div>
              </div>

              {/* Wallet & Payment Methods */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Connected Wallet & Balances</span>
                  {walletConnected ? (
                    <button
                      onClick={handleDisconnectWallet}
                      className="text-[11px] text-rose-400 hover:underline font-semibold"
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowWalletModal(true)}
                      className="text-[11px] text-cyan-400 hover:underline font-semibold"
                    >
                      Connect Wallet
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <p className="text-[10px] text-slate-400">Solana USDC Balance</p>
                    <p className="text-sm font-black text-cyan-400">{walletBalanceUsdc} USDC</p>
                    <p className="text-[9px] text-slate-500 font-mono">{walletAddress || '8x9P...4kLm'}</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <p className="text-[10px] text-slate-400">Solana (SOL)</p>
                    <p className="text-sm font-bold text-purple-400">{walletBalanceSol} SOL</p>
                    <p className="text-[9px] text-slate-500 font-mono">Tatum Node Connected</p>
                  </div>
                </div>
              </div>

              {/* SurfPass Skill Preferences */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300">Default Surfer Skill Level for AI Match</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Beginner', 'Intermediate', 'Advanced'] as const).map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => setUserSkill(lvl)}
                      className={`py-2 rounded-xl text-xs font-semibold transition ${
                        userSkill === lvl ? 'bg-cyan-500 text-black font-bold' : 'bg-slate-950 text-slate-400 border border-slate-800'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ======================= MODALS ======================= */}

      {/* 1. BEACH DETAIL & 12-HR SURF FORECAST MODAL */}
      {showBeachModal && selectedBeach && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#091122] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            {/* Top Close Button */}
            <button
              onClick={() => setShowBeachModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${getQualityBadgeStyle(selectedBeach.quality)}`}>
                  {selectedBeach.quality} Surf Conditions
                </span>
                <span className="text-xs text-slate-400">Updated {selectedBeach.updatedMinutesAgo} min ago • Surfline-ready</span>
              </div>
              <h2 className="text-2xl font-black text-white mt-2">{selectedBeach.name}</h2>
              <p className="text-xs text-slate-400">{selectedBeach.breakName} • {selectedBeach.city}, {selectedBeach.state}</p>
            </div>

            {/* EXPANDED RICH SURF TELEMETRY */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-semibold mb-1">
                  <Waves className="w-3.5 h-3.5 text-cyan-400" />
                  <span>WAVE HEIGHT</span>
                </div>
                <p className="text-lg font-black text-cyan-400">{selectedBeach.waveHeight}</p>
                <p className="text-[10px] text-slate-400">{selectedBeach.waveDesc}</p>
                <p className="text-[10px] text-cyan-300 font-medium">{selectedBeach.waveSub}</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-semibold mb-1">
                  <Compass className="w-3.5 h-3.5 text-indigo-400" />
                  <span>PRIMARY SWELL</span>
                </div>
                <p className="text-lg font-black text-white">{selectedBeach.swell}</p>
                <p className="text-[10px] text-slate-400">{selectedBeach.swellPeriod} period • {selectedBeach.swellAngle}</p>
                <p className="text-[10px] text-indigo-300 font-medium">{selectedBeach.swellSub}</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-semibold mb-1">
                  <Wind className="w-3.5 h-3.5 text-teal-400" />
                  <span>WIND</span>
                </div>
                <p className="text-lg font-black text-white">{selectedBeach.windMph} mph</p>
                <p className="text-[10px] text-slate-400">{selectedBeach.wind}</p>
                <p className="text-[10px] text-teal-300 font-medium">{selectedBeach.windSub}</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-semibold mb-1">
                  <Droplets className="w-3.5 h-3.5 text-blue-400" />
                  <span>TIDE & WATER</span>
                </div>
                <p className="text-lg font-black text-white">{selectedBeach.tide}</p>
                <p className="text-[10px] text-slate-400">High: {selectedBeach.nextHighTide}</p>
                <p className="text-[10px] text-blue-300 font-medium">Water: {selectedBeach.waterTemp}</p>
              </div>
            </div>

            {/* 12-HOUR SURF FORECAST GRAPH */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">12-Hour Wave Height & Surf Window Trend</span>
                <span className="text-cyan-400 font-semibold">Best: {selectedBeach.bestWindow}</span>
              </div>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedBeach.hourly}>
                    <defs>
                      <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#64748B" fontSize={10} tickLine={false} />
                    <YAxis stroke="#64748B" fontSize={10} domain={[0, 6]} unit="ft" tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                      formatter={(val: any) => [`${val} ft`, 'Wave Height']}
                    />
                    <Area type="monotone" dataKey="heightFt" stroke="#06B6D4" strokeWidth={2.5} fillOpacity={1} fill="url(#waveGradient)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-[11px] text-slate-400 text-center">{selectedBeach.bestWindowSub}</p>
            </div>

            {/* Nearby Van Quick Picker */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Nearby Mobile Vans ({selectedBeach.vanCount})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VANS.filter(v => v.beachId === selectedBeach.id || v.beachId === 'rockaway').map(van => (
                  <button
                    key={van.id}
                    onClick={() => {
                      setSelectedVan(van)
                      setShowBeachModal(false)
                      setShowVanModal(true)
                    }}
                    className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 text-left transition flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-white">{van.fleetNumber} ({van.nickname})</p>
                      <p className="text-[11px] text-slate-400">{van.spot} • {van.distance}</p>
                      <p className="text-[10px] text-emerald-400 font-semibold">{van.boardsAvailable} boards available</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-cyan-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. VAN DETAIL & INVENTORY MODAL */}
      {showVanModal && selectedVan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#091122] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowVanModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                SURFPASS MOBILE FLEET
              </span>
              <h2 className="text-2xl font-black text-white mt-1">{selectedVan.fleetNumber} — {selectedVan.nickname}</h2>
              <p className="text-xs text-slate-400">{selectedVan.spot} • {selectedVan.beachName} ({selectedVan.distance})</p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs bg-slate-950 p-3 rounded-2xl border border-slate-800">
              <div>
                <p className="text-slate-400 text-[10px]">Operating Hours</p>
                <p className="font-bold text-white">{selectedVan.hours}</p>
              </div>
              <div>
                <p className="text-slate-400 text-[10px]">Total Available</p>
                <p className="font-black text-cyan-400">{selectedVan.boardsAvailable} Boards</p>
              </div>
              <div>
                <p className="text-slate-400 text-[10px]">Next Relocation</p>
                <p className="font-bold text-amber-400">{selectedVan.nextLocation || 'Stationary'}</p>
              </div>
            </div>

            {/* Board Inventory Inside this Van */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Available Quiver in this Van</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {boards.map(board => (
                  <div
                    key={board.id}
                    className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/40 transition flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-16 bg-slate-900 rounded-lg flex items-center justify-center p-1 border border-slate-800">
                        <BoardSilhouette type={board.shapeType} className="h-14" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{board.name}</p>
                        <p className="text-[10px] text-slate-400">{board.dimensions} • {board.volume}</p>
                        <p className="text-[10px] text-cyan-400 font-mono">${board.pricing.twoHours}/2h • ${board.deposit} deposit</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleOpenCheckout(board)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs transition"
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

      {/* 3. CHECKOUT & MULTI-RAIL TATUM PAYMENT MODAL */}
      {showCheckoutModal && selectedBoard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#091122] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                SURFPASS CHECKOUT
              </span>
              <h2 className="text-xl font-black text-white mt-1">Reserve {selectedBoard.name}</h2>
              <p className="text-xs text-slate-400">{selectedVan.fleetNumber} ({selectedVan.nickname}) • {selectedBeach.name}</p>
            </div>

            {/* Duration Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">Select Duration</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '2hr', label: '2 Hours', price: selectedBoard.pricing.twoHours },
                  { id: '4hr', label: '4 Hours', price: selectedBoard.pricing.fourHours },
                  { id: 'full', label: 'Full Day', price: selectedBoard.pricing.fullDay }
                ].map(dur => (
                  <button
                    key={dur.id}
                    onClick={() => setRentalDuration(dur.id as any)}
                    className={`py-2 rounded-xl text-xs transition border ${
                      rentalDuration === dur.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    <p>{dur.label}</p>
                    <p className="font-bold text-white">${dur.price}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Damage Protection Toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-2 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <div>
                  <p className="font-semibold text-white">Board Protection Plan</p>
                  <p className="text-[10px] text-slate-400">Covers minor dings, fin rail scrapes ($3)</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={damageProtection}
                onChange={e => setDamageProtection(e.target.checked)}
                className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
              />
            </div>

            {/* Payment Method Selector (Semantic Colors) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">Choose Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                {/* USDC Option - Cyan */}
                <button
                  onClick={() => setPaymentMethod('USDC')}
                  className={`p-2.5 rounded-xl text-left border transition ${
                    paymentMethod === 'USDC'
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <p className="text-xs font-extrabold text-white">USDC</p>
                  <p className="text-[10px] text-cyan-300 font-semibold">Solana (Instant)</p>
                </button>

                {/* BTC Option - Orange */}
                <button
                  onClick={() => setPaymentMethod('BTC')}
                  className={`p-2.5 rounded-xl text-left border transition ${
                    paymentMethod === 'BTC'
                      ? 'bg-orange-500/20 border-orange-400 text-orange-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <p className="text-xs font-extrabold text-white">Bitcoin</p>
                  <p className="text-[10px] text-orange-300 font-semibold">BTC Rail</p>
                </button>

                {/* Card Option - Slate/White */}
                <button
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-2.5 rounded-xl text-left border transition ${
                    paymentMethod === 'CARD'
                      ? 'bg-slate-800 border-slate-400 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <p className="text-xs font-extrabold text-white">Card / Apple Pay</p>
                  <p className="text-[10px] text-slate-400">Traditional</p>
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Surfboard Rental</span>
                <span className="text-white font-semibold">${currentRentalCost}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Damage Protection</span>
                <span className="text-white font-semibold">${protectionTotal}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span className="flex items-center gap-1">
                  Refundable Security Deposit
                  <Info className="w-3 h-3 text-cyan-400" />
                </span>
                <span className="text-amber-400 font-bold">${depositTotal} (Refunded upon return)</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between font-black text-sm text-white">
                <span>Total Authorization</span>
                <span className="text-cyan-400">${totalAuthorization}</span>
              </div>
            </div>

            {/* Live Tatum Status or Pay Button */}
            {paymentStep !== 'idle' ? (
              <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/40 text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
                  <span className="text-xs font-bold text-white">
                    {paymentStep === 'waiting' && `Waiting for ${paymentMethod} payment...`}
                    {paymentStep === 'detected' && 'Payment detected via Tatum!'}
                    {paymentStep === 'confirming' && `Confirming on ${paymentMethod === 'USDC' ? 'Solana' : 'Bitcoin'}...`}
                    {paymentStep === 'confirmed' && 'Payment confirmed ✓ Board reserved!'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono">Tatum multi-chain settlement gateway active</p>
              </div>
            ) : (
              <button
                onClick={handleExecutePayment}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black text-sm shadow-xl shadow-cyan-500/25 transition active:scale-95"
              >
                {paymentMethod === 'USDC'
                  ? `Pay ${totalAuthorization} USDC on Solana`
                  : paymentMethod === 'BTC'
                  ? `Pay ${totalAuthorization} USD (BTC equivalent)`
                  : `Authorize $${totalAuthorization} with Apple Pay / Card`}
              </button>
            )}
          </div>
        </div>
      )}

      {/* 4. DIGITAL SURFPASS RENTAL PASS MODAL */}
      {showPassModal && activeRentalPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-md bg-gradient-to-b from-[#0C1527] to-[#080E1C] border border-cyan-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 my-8 text-center">
            <button
              onClick={() => setShowPassModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ACTIVE SURFPASS RENTAL PASS</span>
              </div>
              <h2 className="text-xl font-black text-white">{activeRentalPass.boardName}</h2>
              <p className="text-xs text-slate-400">{activeRentalPass.location} • {activeRentalPass.vanName}</p>
            </div>

            {/* QR Code Boarding Pass */}
            <div className="p-5 bg-white rounded-2xl shadow-xl inline-block mx-auto border-4 border-cyan-400">
              <QrCode className="w-36 h-36 text-slate-900 mx-auto" />
              <p className="text-[10px] text-slate-700 font-mono font-bold mt-1">{activeRentalPass.id}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-left text-xs bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <div>
                <p className="text-[10px] text-slate-400">Pickup Spot</p>
                <p className="font-bold text-white">{activeRentalPass.spot}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400">Session Window</p>
                <p className="font-bold text-cyan-400">{activeRentalPass.startTime} – {activeRentalPass.endTime}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400">Deposit Status</p>
                <p className="font-bold text-amber-400">${activeRentalPass.deposit} Held (Refundable)</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400">Payment Rail</p>
                <p className="font-bold text-white">{activeRentalPass.paymentMethod} (via Tatum)</p>
              </div>
            </div>

            {/* Expandable Onchain Details */}
            <div className="text-left">
              <button
                onClick={() => setShowOnchainReceipt(!showOnchainReceipt)}
                className="text-xs font-bold text-cyan-400 flex items-center justify-between w-full p-2 rounded-lg bg-slate-900 border border-slate-800"
              >
                <span>View Onchain Settlement Receipt</span>
                <ChevronDown className={`w-4 h-4 transition ${showOnchainReceipt ? 'rotate-180' : ''}`} />
              </button>

              {showOnchainReceipt && (
                <div className="mt-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-1 text-slate-300">
                  <p>Network: <span className="text-white font-semibold">Solana Mainnet-Beta</span></p>
                  <p>Tx Hash: <span className="text-cyan-400">{activeRentalPass.txHash}</span></p>
                  <p>Verification: <span className="text-emerald-400">Tatum Multi-Chain RPC Node</span></p>
                  <p>Deposit Escrow: <span className="text-amber-400">50.00 USDC Locked</span></p>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                setShowPassModal(false)
                setActiveTab('map')
              }}
              className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs transition"
            >
              Navigate to Van for Pickup
            </button>
          </div>
        </div>
      )}

      {/* 5. TATUM INFRASTRUCTURE MODAL */}
      {showInfraModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#091122] border border-cyan-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <button
              onClick={() => setShowInfraModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                BLOCKCHAIN ARCHITECTURE
              </span>
              <h2 className="text-2xl font-black text-white mt-1">Powered by Tatum Infrastructure</h2>
              <p className="text-xs text-slate-400">
                Solana RPC + real-time blockchain events monitor payment and confirm settlement underneath the consumer experience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <Activity className="w-4 h-4" />
                  <span>RPC Gateway</span>
                </div>
                <p className="text-slate-300">
                  Direct high-throughput JSON-RPC access across Solana & Bitcoin nodes for balance reads and transaction broadcasts.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 font-bold">
                  <Layers className="w-4 h-4" />
                  <span>Real-Time Blockchain Events</span>
                </div>
                <p className="text-slate-300">
                  Instant transaction detection and deposit monitoring without continuous polling.
                </p>
              </div>
            </div>

            {/* Architecture Diagram */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <p className="text-xs font-bold text-white">Payment & Escrow Pipeline</p>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 overflow-x-auto gap-2">
                <span className="p-2 rounded bg-slate-900 text-cyan-300">Surfer Pay</span>
                <span>→</span>
                <span className="p-2 rounded bg-slate-900 text-white">SurfPass</span>
                <span>→</span>
                <span className="p-2 rounded bg-slate-900 text-purple-300 font-bold">Tatum</span>
                <span>→</span>
                <span className="p-2 rounded bg-slate-900 text-emerald-300">Solana / BTC</span>
                <span>→</span>
                <span className="p-2 rounded bg-slate-900 text-cyan-300 font-bold">Rental Pass</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. CONNECT WALLET MODAL */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-[#091122] border border-slate-700 rounded-3xl p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setShowWalletModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-black text-white">Connect Solana Wallet</h3>
            <p className="text-xs text-slate-400">Select your preferred wallet for USDC payments and instant deposit refunds.</p>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleConnectWallet('phantom')}
                className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-xs font-bold text-white transition"
              >
                <span>Phantom Wallet</span>
                <span className="text-[10px] text-purple-400 font-normal">Solana</span>
              </button>
              <button
                onClick={() => handleConnectWallet('solflare')}
                className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-xs font-bold text-white transition"
              >
                <span>Solflare Wallet</span>
                <span className="text-[10px] text-orange-400 font-normal">Solana</span>
              </button>
              <button
                onClick={() => handleConnectWallet('smart')}
                className="w-full p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-xs font-bold text-cyan-300 transition"
              >
                <span>SurfPass Smart Account</span>
                <span className="text-[10px] text-emerald-400 font-normal">Embedded</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. SURF NOW FAST-PATH MODAL */}
      {showSurfNowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#091122] border border-amber-500/50 rounded-3xl p-6 shadow-2xl space-y-4">
            <button
              onClick={() => setShowSurfNowModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              <h3 className="text-base font-black text-white">Surf Now Fast-Path</h3>
            </div>
            <p className="text-xs text-slate-300">
              SurfPass calculated the fastest route to the water based on wave height, clean offshore wind, and nearby van inventory:
            </p>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <p className="font-bold text-white">Go to Rockaway Beach 90th St (2–3 ft, Good)</p>
              <p className="text-cyan-400">Board: 9'0 Dawn Patrol Log ($25/2h)</p>
              <p className="text-slate-400">Van: Van #12 (Rockaway Runner) • 0.2 mi away</p>
            </div>

            <button
              onClick={() => handleOpenCheckout(INITIAL_BOARDS[0])}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs transition"
            >
              Reserve & Go
            </button>
          </div>
        </div>
      )}

      {/* 8. TRAVELER MODAL */}
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
            </div>
          </div>
        </div>
      )}

      {/* 9. DEPOSIT REFUND SUCCESS MODAL */}
      {returnSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-[#091122] border border-emerald-500/50 rounded-3xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">Board Returned Successfully!</h3>
            <p className="text-xs text-slate-300">
              Your $50.00 refundable security deposit has been released back to your payment method via Tatum settlement.
            </p>
            <button
              onClick={() => setReturnSuccessModal(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-500 text-black font-extrabold text-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* 3. PERSISTENT MOBILE BOTTOM NAVIGATION */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0F1D]/95 backdrop-blur-lg border-t border-slate-800 px-4 py-2 flex items-center justify-around">
        {[
          { id: 'home', label: 'Home', icon: Waves },
          { id: 'explore', label: 'Explore', icon: Compass },
          { id: 'map', label: 'Map', icon: MapPin },
          { id: 'rentals', label: 'Rentals', icon: Ticket, badge: activeRentalsList.filter(r => r.status === 'ACTIVE').length },
          { id: 'profile', label: 'Profile', icon: User }
        ].map(tab => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col items-center gap-1 p-1 transition ${
                isActive ? 'text-cyan-400 font-bold' : 'text-slate-400'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2 px-1 rounded-full text-[9px] font-bold bg-cyan-500 text-black">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px]">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
