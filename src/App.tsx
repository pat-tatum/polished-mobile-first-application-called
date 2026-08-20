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
  Timer
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
  mapX: number // percentage
  mapY: number // percentage
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

// --- DATA DEFINITION WITH HIGH-QUALITY DISTINCT REGIONAL IMAGERY ---
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
    description: 'Urban beach-break surfing with multiple jetty sandbar peaks and easy subway access from New York City.',
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
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80',
    description: 'New Jersey boardwalk, historic casino jetties, and classic East Coast beach-town vibe with punchy inside peaks.',
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
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    description: 'Warm-water Florida surf with approachable beach-break conditions and classic Space Coast surf roots.',
    recommendation: 'Gentle peelers next to the pier. Soft-top logs and high-volume gliders will keep you standing all morning.',
    bestWindow: '8:00 AM – 11:00 AM',
    bestWindowSub: 'Morning offshore wind keeping rolling sandbars clean and fun.',
    hourly: [
      { time: '8 AM', hourVal: 8, heightFt: 2.3, heightLabel: '2.3 ft', periodSec: 9, tideFt: 2.8, windDir: 'WNW', windSpeed: 6, quality: 'FAIR' },
      { time: '9 AM', hourVal: 9, heightFt: 2.6, heightLabel: '2.6 ft', periodSec: 9, tideFt: 3.4, windDir: 'WNW', windSpeed: 6, quality: 'FAIR-GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 2.4, heightLabel: '2.4 ft', periodSec: 9, tideFt: 3.7, windDir: 'W', windSpeed: 7, quality: 'FAIR-GOOD' }
    ],
    lat: 28.3200,
    lng: -80.6076
  },
  {
    id: 'waikiki',
    name: 'Waikiki - Queens',
    breakName: 'Canoes & Queens Reef',
    city: 'Honolulu',
    state: 'HI',
    region: 'Hawaii',
    waveHeight: '3–4 ft',
    waveDesc: 'Waist to chest high',
    waveSub: 'Endless rolling right-handers',
    quality: 'GOOD',
    wind: 'Trade wind 11 mph offshore',
    windSub: 'Clean reef channel push',
    windMph: 11,
    tide: 'High tide peak',
    tideSub: 'Deep water cushioning reef',
    waterTemp: '79°F',
    airTemp: '82°F',
    swell: 'SSW 3.4 ft',
    swellSub: 'South shore summer swell',
    swellPeriod: '13s',
    skill: 'All Levels',
    distance: 'Pacific Market',
    vanCount: 3,
    boardCount: 30,
    image: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=1200&q=80',
    description: 'Long rolling waves, Diamond Head backdrop, and one of the most approachable longboarding environments in the world.',
    recommendation: 'Endless gentle rolling right-handers over Queens reef. 9ft+ classic noseriders and easy gliders are effortless.',
    bestWindow: '7:00 AM – 11:30 AM',
    bestWindowSub: 'Early morning light trades with glassy reef peeling sections.',
    hourly: [
      { time: '7 AM', hourVal: 7, heightFt: 3.4, heightLabel: '3.4 ft', periodSec: 13, tideFt: 1.8, windDir: 'NE', windSpeed: 8, quality: 'GOOD' },
      { time: '8 AM', hourVal: 8, heightFt: 3.8, heightLabel: '3.8 ft', periodSec: 13, tideFt: 2.2, windDir: 'ENE', windSpeed: 9, quality: 'GOOD' },
      { time: '9 AM', hourVal: 9, heightFt: 3.6, heightLabel: '3.6 ft', periodSec: 13, tideFt: 2.4, windDir: 'E', windSpeed: 10, quality: 'GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 3.2, heightLabel: '3.2 ft', periodSec: 12, tideFt: 2.3, windDir: 'E', windSpeed: 11, quality: 'FAIR-GOOD' }
    ],
    lat: 21.2766,
    lng: -157.8275
  }
]

const VANS: Van[] = [
  {
    id: 'van-12',
    fleetNumber: 'Van #12',
    nickname: 'Rockaway Runner',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach, NY',
    spot: 'Beach 90th Street & Boardwalk Lot',
    status: 'OPEN',
    distance: '0.2 mi away',
    walkTime: '4 min walk',
    driveTime: '1 min drive',
    hours: '6:00 AM – 7:30 PM',
    boardsAvailable: 8,
    longboards: 3,
    midsAndFun: 2,
    softTops: 2,
    shortboards: 1,
    fish: 1,
    nextLocation: 'Beach 92nd St (Tomorrow 6 AM)',
    eta: 'Parked & Ready',
    waitMin: 0,
    lat: 40.5845,
    lng: -73.8160,
    mapX: 48,
    mapY: 62,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-07',
    fleetNumber: 'Van #07',
    nickname: 'Boardwalk Cruiser',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach, NY',
    spot: 'Beach 67th Street Subway Lot',
    status: 'OPEN',
    distance: '0.9 mi away',
    walkTime: '18 min walk',
    driveTime: '4 min drive',
    hours: '6:30 AM – 7:00 PM',
    boardsAvailable: 9,
    longboards: 4,
    midsAndFun: 2,
    softTops: 2,
    shortboards: 1,
    fish: 1,
    nextLocation: 'Beach 90th St (4 PM)',
    eta: 'Parked & Ready',
    waitMin: 2,
    lat: 40.5900,
    lng: -73.7950,
    mapX: 74,
    mapY: 42,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-31',
    fleetNumber: 'Van #31',
    nickname: 'Huntington Nomad',
    beachId: 'huntington',
    beachName: 'Huntington Beach, CA',
    spot: 'PCH & Main Street South Lot',
    status: 'OPEN',
    distance: 'West Coast Market',
    walkTime: 'Beachfront',
    driveTime: 'On site',
    hours: '5:30 AM – 8:00 PM',
    boardsAvailable: 14,
    longboards: 4,
    midsAndFun: 3,
    softTops: 2,
    shortboards: 3,
    fish: 2,
    eta: 'Parked & Ready',
    waitMin: 0,
    lat: 33.6590,
    lng: -117.9980,
    mapX: 52,
    mapY: 55,
    image: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-45',
    fleetNumber: 'Van #45',
    nickname: 'Cocoa Cruiser',
    beachId: 'cocoa-beach',
    beachName: 'Cocoa Beach, FL',
    spot: 'Cocoa Beach Pier South Lot',
    status: 'OPEN',
    distance: 'East Coast Market',
    walkTime: 'Pier access',
    driveTime: 'On site',
    hours: '6:30 AM – 6:30 PM',
    boardsAvailable: 10,
    longboards: 4,
    midsAndFun: 3,
    softTops: 2,
    shortboards: 1,
    fish: 1,
    eta: 'Parked & Ready',
    waitMin: 0,
    lat: 28.3200,
    lng: -80.6070,
    mapX: 55,
    mapY: 58,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-61',
    fleetNumber: 'Van #61',
    nickname: 'Waikiki Nomad',
    beachId: 'waikiki',
    beachName: 'Waikiki - Queens, HI',
    spot: 'Kalakaua Ave & Queens Surf Park',
    status: 'OPEN',
    distance: 'Pacific Market',
    walkTime: 'Direct reef walk',
    driveTime: 'On site',
    hours: '6:00 AM – 7:00 PM',
    boardsAvailable: 15,
    longboards: 7,
    midsAndFun: 4,
    softTops: 3,
    shortboards: 1,
    fish: 1,
    eta: 'Parked & Ready',
    waitMin: 0,
    lat: 21.2760,
    lng: -157.8270,
    mapX: 50,
    mapY: 50,
    image: 'https://images.unsplash.com/photo-1542259009477-d625272157b7?auto=format&fit=crop&w=800&q=80'
  }
]

const BOARDS: Board[] = [
  {
    id: 'b-0092',
    code: 'SP-RKW-0092',
    name: "9'0 Dawn Patrol Log",
    nickname: 'Dawn Patrol',
    type: 'Longboard',
    dimensions: "9'0 × 22 3/4\" × 3 1/8\"",
    length: "9'0\"",
    width: "22 3/4\"",
    thickness: "3 1/8\"",
    volume: '72 L',
    finSetup: 'Single Fin Box (9" Center)',
    skill: 'Beginner / Intermediate',
    recommendedWaves: '1–3 ft',
    condition: 'Excellent',
    vanId: 'van-12',
    vanName: 'Van #12 — Rockaway Runner',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach, NY',
    availableCount: 3,
    totalInVan: 3,
    personality: 'Easy glide & noseriding',
    whyMatch: 'The waves are small, clean and soft this morning. The 72L volume and classic outline let you roll into peelers early with zero paddle resistance.',
    pricing: {
      twoHours: 25,
      fourHours: 38,
      fullDay: 48
    },
    deposit: 50,
    protectionFee: 3,
    tag: '👑 Recommended for Today',
    shapeType: 'long'
  },
  {
    id: 'b-0074',
    code: 'SP-RKW-0074',
    name: "8'0 Boardwalk Soft-Top",
    nickname: 'Boardwalk Log',
    type: 'Soft-Top',
    dimensions: "8'0 × 23\" × 3 1/4\"",
    length: "8'0\"",
    width: "23\"",
    thickness: "3 1/4\"",
    volume: '82 L',
    finSetup: 'Thruster (Soft Edge Safe)',
    skill: 'Beginner',
    recommendedWaves: '1–3 ft',
    condition: 'Mint',
    vanId: 'van-12',
    vanName: 'Van #12 — Rockaway Runner',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach, NY',
    availableCount: 2,
    totalInVan: 2,
    personality: 'Stable & ultra forgiving',
    whyMatch: 'Extremely buoyant and durable high-density foam deck. Perfect for beginners and relaxed beach-day cruisers.',
    pricing: {
      twoHours: 22,
      fourHours: 34,
      fullDay: 42
    },
    deposit: 40,
    protectionFee: 3,
    tag: '🏄 Beginner Friendly',
    shapeType: 'soft'
  },
  {
    id: 'b-0081',
    code: 'SP-RKW-0081',
    name: "7'2 Sunday Mid",
    nickname: 'Sunday Mid',
    type: 'Mid-Length',
    dimensions: "7'2 × 21 1/2\" × 2 3/4\"",
    length: "7'2\"",
    width: "21 1/2\"",
    thickness: "2 3/4\"",
    volume: '54 L',
    finSetup: '2+1 (Single + Side Bites)',
    skill: 'All Levels',
    recommendedWaves: '2–4 ft',
    condition: 'Excellent',
    vanId: 'van-12',
    vanName: 'Van #12 — Rockaway Runner',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach, NY',
    availableCount: 2,
    totalInVan: 2,
    personality: 'Best all-around daily pick',
    whyMatch: 'Generous paddle power combined with a pulled-in round pin tail for responsive trimming on chest-high jetty waves.',
    pricing: {
      twoHours: 28,
      fourHours: 42,
      fullDay: 52
    },
    deposit: 50,
    protectionFee: 3,
    tag: '⚡ Surfer Favorite',
    shapeType: 'mid'
  },
  {
    id: 'b-0058',
    code: 'SP-RKW-0058',
    name: "5'10 Twin Fish",
    nickname: 'Fast Fish',
    type: 'Fish',
    dimensions: "5'10 × 20 3/4\" × 2 9/16\"",
    length: "5'10\"",
    width: "20 3/4\"",
    thickness: "2 9/16\"",
    volume: '36 L',
    finSetup: 'Keel Twin (Speed & Flow)',
    skill: 'Intermediate',
    recommendedWaves: '2–5 ft',
    condition: 'Mint',
    vanId: 'van-12',
    vanName: 'Van #12 — Rockaway Runner',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach, NY',
    availableCount: 1,
    totalInVan: 1,
    personality: 'High speed in small clean surf',
    whyMatch: 'Wide swallow tail and parallel rails create instant down-the-line speed across flatter wave sections.',
    pricing: {
      twoHours: 30,
      fourHours: 45,
      fullDay: 55
    },
    deposit: 75,
    protectionFee: 4,
    tag: '🔥 Fast & Lively',
    shapeType: 'fish'
  },
  {
    id: 'b-0062',
    code: 'SP-RKW-0062',
    name: "6'0 Daily Driver",
    nickname: 'Daily Driver',
    type: 'Shortboard',
    dimensions: "6'0 × 19 1/2\" × 2 7/16\"",
    length: "6'0\"",
    width: "19 1/2\"",
    thickness: "2 7/16\"",
    volume: '31 L',
    finSetup: 'Thruster Tri-Fin',
    skill: 'Advanced',
    recommendedWaves: '3–6 ft',
    condition: 'Excellent',
    vanId: 'van-12',
    vanName: 'Van #12 — Rockaway Runner',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach, NY',
    availableCount: 1,
    totalInVan: 1,
    personality: 'Punchy performance turns',
    whyMatch: 'Modern squash tail performance outline tuned for steeper waves and snappy pocket maneuvers.',
    pricing: {
      twoHours: 32,
      fourHours: 48,
      fullDay: 58
    },
    deposit: 80,
    protectionFee: 4,
    tag: '🎯 For Punchy Peaks',
    shapeType: 'short'
  },
  {
    id: 'b-0096-wkk',
    code: 'SP-WKK-0096',
    name: "9'6 Waikiki Noserider",
    nickname: 'Waikiki Classic',
    type: 'Longboard',
    dimensions: "9'6 × 23 1/4\" × 3 1/4\"",
    length: "9'6\"",
    width: "23 1/4\"",
    thickness: "3 1/4\"",
    volume: '78 L',
    finSetup: '10" Pivot Single Fin',
    skill: 'All Levels',
    recommendedWaves: '1–4 ft',
    condition: 'Mint',
    vanId: 'van-61',
    vanName: 'Van #61 — Waikiki Nomad',
    beachId: 'waikiki',
    beachName: 'Waikiki - Queens, HI',
    availableCount: 4,
    totalInVan: 4,
    personality: 'Pure trim and ten toes on nose',
    whyMatch: 'Deep nose concave and wide platform designed specifically for endless gentle Hawaiian reef rollers.',
    pricing: {
      twoHours: 28,
      fourHours: 42,
      fullDay: 54
    },
    deposit: 50,
    protectionFee: 3,
    tag: '🌺 Island Classic',
    shapeType: 'long'
  }
]

// --- HIGH-PRECISION SURFBOARD VECTOR SILHOUETTE COMPONENT ---
// Ensures visual consistency: every board card displays its genuine silhouette shape
const SurfboardGraphic: React.FC<{
  type: 'long' | 'mid' | 'fish' | 'short' | 'soft'
  className?: string
}> = ({ type, className = 'w-16 h-36' }) => {
  const renderShape = () => {
    switch (type) {
      case 'long':
        return (
          <svg viewBox="0 0 100 240" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="longGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="50%" stopColor="#4F46E5" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>
            {/* Outline */}
            <path
              d="M 50 12 C 72 32, 78 80, 78 140 C 78 190, 70 220, 56 230 L 44 230 C 30 220, 22 190, 22 140 C 22 80, 28 32, 50 12 Z"
              fill="url(#longGrad)"
              stroke="#A5B4FC"
              strokeWidth="2"
            />
            {/* Classic Stringer */}
            <line x1="50" y1="14" x2="50" y2="228" stroke="#FDE047" strokeWidth="1.5" strokeOpacity="0.8" />
            {/* Nose Patch */}
            <path d="M 38 45 C 50 48, 50 48, 62 45" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
            {/* Single Fin Outline underneath */}
            <polygon points="48,228 52,228 50,215" fill="#312E81" />
          </svg>
        )
      case 'soft':
        return (
          <svg viewBox="0 0 100 240" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="softGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#0284C7" />
                <stop offset="100%" stopColor="#0369A1" />
              </linearGradient>
            </defs>
            {/* Wide Soft Outline */}
            <rect x="20" y="24" width="60" height="190" rx="30" ry="40" fill="url(#softGrad)" stroke="#7DD3FC" strokeWidth="2.5" />
            {/* Soft-top Cross Hatch lines */}
            <line x1="28" y1="70" x2="72" y2="70" stroke="#BAE6FD" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="26" y1="120" x2="74" y2="120" stroke="#BAE6FD" strokeWidth="1" strokeOpacity="0.4" />
            <line x1="28" y1="170" x2="72" y2="170" stroke="#BAE6FD" strokeWidth="1" strokeOpacity="0.4" />
            {/* Dual Stringers */}
            <line x1="44" y1="28" x2="44" y2="210" stroke="#0C4A6E" strokeWidth="1.5" strokeOpacity="0.6" />
            <line x1="56" y1="28" x2="56" y2="210" stroke="#0C4A6E" strokeWidth="1.5" strokeOpacity="0.6" />
          </svg>
        )
      case 'mid':
        return (
          <svg viewBox="0 0 100 240" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="midGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="50%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>
            {/* Sleek Egg / Mid Outline */}
            <path
              d="M 50 16 C 70 38, 76 90, 76 145 C 76 185, 68 215, 50 232 C 32 215, 24 185, 24 145 C 24 90, 30 38, 50 16 Z"
              fill="url(#midGrad)"
              stroke="#D8B4FE"
              strokeWidth="2"
            />
            {/* Center Stringer & Rail Taper */}
            <line x1="50" y1="18" x2="50" y2="230" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.7" />
            <path d="M 32 100 Q 50 115 68 100" stroke="#F3E8FF" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
          </svg>
        )
      case 'fish':
        return (
          <svg viewBox="0 0 100 240" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="fishGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#EA580C" />
                <stop offset="100%" stopColor="#BE123C" />
              </linearGradient>
            </defs>
            {/* Wide Pointed Nose + Iconic Swallow Tail */}
            <path
              d="M 50 20 C 72 45, 80 90, 80 145 C 80 185, 76 210, 74 230 L 50 208 L 26 230 C 24 210, 20 185, 20 145 C 20 90, 28 45, 50 20 Z"
              fill="url(#fishGrad)"
              stroke="#FDE68A"
              strokeWidth="2"
            />
            {/* Twin Keel Outline Marks */}
            <polygon points="30,195 38,198 32,216" fill="#78350F" opacity="0.8" />
            <polygon points="70,195 62,198 68,216" fill="#78350F" opacity="0.8" />
            <line x1="50" y1="22" x2="50" y2="206" stroke="#FEF3C7" strokeWidth="1.5" strokeOpacity="0.8" />
          </svg>
        )
      case 'short':
      default:
        return (
          <svg viewBox="0 0 100 240" className="w-full h-full drop-shadow-md">
            <defs>
              <linearGradient id="shortGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="50%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#4F46E5" />
              </linearGradient>
            </defs>
            {/* Sharp Performance Pointy Nose + Squash Tail */}
            <path
              d="M 50 10 C 66 38, 73 85, 73 145 C 73 185, 68 215, 62 230 L 38 230 C 32 215, 27 185, 27 145 C 27 85, 34 38, 50 10 Z"
              fill="url(#shortGrad)"
              stroke="#67E8F9"
              strokeWidth="2"
            />
            {/* Carbon Tail Rails */}
            <path d="M 28 190 L 38 230" stroke="#0F172A" strokeWidth="2.5" />
            <path d="M 72 190 L 62 230" stroke="#0F172A" strokeWidth="2.5" />
            <line x1="50" y1="12" x2="50" y2="228" stroke="#E0F2FE" strokeWidth="1.2" strokeOpacity="0.8" />
          </svg>
        )
    }
  }

  return <div className={`flex items-center justify-center ${className}`}>{renderShape()}</div>
}

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'map' | 'rentals' | 'profile'>('home')

  // Selected State
  const [selectedBeach, setSelectedBeach] = useState<Beach>(BEACHES[0])
  const [selectedVan, setSelectedVan] = useState<Van>(VANS[0])
  const [selectedBoard, setSelectedBoard] = useState<Board>(BOARDS[0])

  // Modals / Flow Overlays
  const [showBeachModal, setShowBeachModal] = useState(false)
  const [showVanModal, setShowVanModal] = useState(false)
  const [showBoardModal, setShowBoardModal] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [showPassModal, setShowPassModal] = useState(false)
  const [showReturnModal, setShowReturnModal] = useState(false)
  const [showInfraModal, setShowInfraModal] = useState(false)
  const [showWhatToRideModal, setShowWhatToRideModal] = useState(false)

  // Explore Filters
  const [regionFilter, setRegionFilter] = useState('All')
  const [skillFilter, setSkillFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  // Board Filter inside Van
  const [boardTypeFilter, setBoardTypeFilter] = useState('All')

  // Checkout State
  const [duration, setDuration] = useState<'2hrs' | '4hrs' | 'day'>('2hrs')
  const [includeProtection, setIncludeProtection] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState<'USDC' | 'BTC' | 'CARD'>('USDC')
  const [checkoutStep, setCheckoutStep] = useState<'review' | 'paying' | 'confirmed'>('review')
  const [payStage, setPayStage] = useState<number>(0)

  // Active Rentals State
  const [rentals, setRentals] = useState<RentalPass[]>([
    {
      id: 'SP-RKW-7F3A92',
      boardName: "9'0 Dawn Patrol Log",
      boardCode: 'SP-RKW-0092',
      boardType: 'Longboard',
      boardDimensions: "9'0 × 22 3/4\" × 3 1/8\"",
      boardVolume: '72 L',
      vanId: 'van-12',
      vanName: 'Van #12',
      vanNickname: 'Rockaway Runner',
      location: 'Rockaway Beach, NY',
      spot: 'Beach 90th Street',
      startTime: '8:30 AM',
      endTime: '10:30 AM',
      durationLabel: '2 Hours',
      paymentMethod: 'USDC',
      rentalPrice: 28,
      protection: 3,
      deposit: 50,
      depositStatus: 'HELD',
      status: 'ACTIVE',
      txHash: '5K2b...8Nx9 (Solana)',
      createdAt: Date.now() - 3600000,
      sessionActive: true
    }
  ])
  const [activePass, setActivePass] = useState<RentalPass | null>(rentals[0])

  // Return Flow State
  const [returnStage, setReturnStage] = useState<'inspect' | 'processing' | 'done'>('inspect')
  const [returningPass, setReturningPass] = useState<RentalPass | null>(null)

  // Tatum Live Rates & Infra State
  const [btcRate, setBtcRate] = useState<number>(64250)
  const [solRate, setSolRate] = useState<number>(148)
  const [infraStatus, setInfraStatus] = useState<string>('Operational')

  // Escape key global listener to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowBeachModal(false)
        setShowVanModal(false)
        setShowBoardModal(false)
        setShowCheckoutModal(false)
        setShowPassModal(false)
        setShowReturnModal(false)
        setShowInfraModal(false)
        setShowWhatToRideModal(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Fetch Tatum market data via backend proxy with retry
  useEffect(() => {
    let isMounted = true
    const fetchMarketData = async () => {
      try {
        const res = await fetch('/api/rates')
        if (res.ok) {
          const data = await res.json()
          if (isMounted) {
            if (data.btc) setBtcRate(data.btc)
            if (data.sol) setSolRate(data.sol)
            if (data.status) setInfraStatus(data.status)
          }
        }
      } catch (err) {
        // Backend auto-healing handles retry
      }
    }
    fetchMarketData()
    const interval = setInterval(fetchMarketData, 60000)
    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [])

  // Filtered Beaches
  const filteredBeaches = useMemo(() => {
    return BEACHES.filter(b => {
      const matchRegion = regionFilter === 'All' || b.region === regionFilter
      const matchSkill = skillFilter === 'All' || b.skill === skillFilter || b.skill === 'All Levels'
      const matchSearch =
        searchQuery === '' ||
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.breakName.toLowerCase().includes(searchQuery.toLowerCase())
      return matchRegion && matchSkill && matchSearch
    })
  }, [regionFilter, skillFilter, searchQuery])

  // Filtered Boards for selected Van
  const vanBoards = useMemo(() => {
    return BOARDS.filter(b => {
      const matchVan = b.vanId === selectedVan.id
      const matchType = boardTypeFilter === 'All' || b.type === boardTypeFilter
      return matchVan && matchType
    })
  }, [selectedVan, boardTypeFilter])

  // Calculation helpers
  const currentRentalCost = useMemo(() => {
    if (!selectedBoard) return 25
    if (duration === '2hrs') return selectedBoard.pricing.twoHours
    if (duration === '4hrs') return selectedBoard.pricing.fourHours
    return selectedBoard.pricing.fullDay
  }, [selectedBoard, duration])

  const totalCharge = useMemo(() => {
    const prot = includeProtection ? selectedBoard.protectionFee : 0
    return currentRentalCost + prot
  }, [currentRentalCost, includeProtection, selectedBoard])

  const depositAmount = selectedBoard?.deposit || 50
  const totalAuthorization = totalCharge + depositAmount

  const btcDue = useMemo(() => {
    if (!btcRate || btcRate === 0) return '0.00042'
    return (totalCharge / btcRate).toFixed(6)
  }, [totalCharge, btcRate])

  // Trigger Checkout Flow
  const startPayment = () => {
    setCheckoutStep('paying')
    setPayStage(1) // Waiting for payment

    setTimeout(() => {
      setPayStage(2) // Transaction detected via Tatum
      setTimeout(() => {
        setPayStage(3) // Confirming on Solana
        setTimeout(() => {
          setPayStage(4) // Payment confirmed

          // Create Rental Pass
          const newPass: RentalPass = {
            id: `SP-RKW-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
            boardName: selectedBoard.name,
            boardCode: selectedBoard.code,
            boardType: selectedBoard.type,
            boardDimensions: selectedBoard.dimensions,
            boardVolume: selectedBoard.volume,
            vanId: selectedVan.id,
            vanName: selectedVan.fleetNumber,
            vanNickname: selectedVan.nickname,
            location: selectedBeach.name,
            spot: selectedVan.spot,
            startTime: 'Now',
            endTime: duration === '2hrs' ? 'In 2 Hours' : duration === '4hrs' ? 'In 4 Hours' : 'End of Day (7:30 PM)',
            durationLabel: duration === '2hrs' ? '2 Hours' : duration === '4hrs' ? '4 Hours' : 'Full Day',
            paymentMethod: paymentMethod,
            rentalPrice: totalCharge,
            protection: includeProtection ? selectedBoard.protectionFee : 0,
            deposit: depositAmount,
            depositStatus: 'HELD',
            status: 'ACTIVE',
            txHash: paymentMethod === 'USDC' ? '8H3a...7K9z (Solana)' : paymentMethod === 'BTC' ? '4a1f...90de (Bitcoin)' : 'Auth #9281 (Stripe)',
            createdAt: Date.now(),
            sessionActive: true
          }

          setRentals(prev => [newPass, ...prev])
          setActivePass(newPass)
          setCheckoutStep('confirmed')
        }, 1200)
      }, 1400)
    }, 1200)
  }

  // Handle Board Return
  const executeReturn = () => {
    if (!returningPass) return
    setReturnStage('processing')

    setTimeout(() => {
      setRentals(prev =>
        prev.map(r =>
          r.id === returningPass.id
            ? { ...r, status: 'COMPLETED', depositStatus: 'REFUNDED', sessionActive: false }
            : r
        )
      )
      setReturnStage('done')
    }, 1800)
  }

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-black">
      {/* --- TOP NAVBAR --- */}
      <header className="sticky top-0 z-40 bg-[#0B0F17]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-[1.5px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-[#0B0F17] rounded-[10px] flex items-center justify-center">
                <Waves className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-300">
                  SurfPass
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-400 tracking-wider">
                RENT. SURF. ONCHAIN.
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-[#121824] p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'home' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'explore' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'map' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Live Map
            </button>
            <button
              onClick={() => setActiveTab('rentals')}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'rentals' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Ticket className="w-3.5 h-3.5" />
              My Rentals
              {rentals.some(r => r.status === 'ACTIVE') && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'profile' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Profile
            </button>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowInfraModal(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#161F30] hover:bg-[#1E2B42] border border-slate-700/80 text-cyan-300 transition-all flex items-center gap-1.5"
              title="View Tatum Multi-Chain Infrastructure"
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Infrastructure</span>
            </button>

            <button
              onClick={() => {
                setSelectedBeach(BEACHES[0])
                setSelectedVan(VANS[0])
                setSelectedBoard(BOARDS[0])
                setShowCheckoutModal(true)
              }}
              className="bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:opacity-95 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-cyan-500/10 transition-all active:scale-95 flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
              <span>Surf Now</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- MAIN BODY RENDERER --- */}
      <main className="max-w-6xl mx-auto px-4 py-6 pb-28 md:pb-12">
        {/* ============================================================== */}
        {/* HOME VIEW                                                     */}
        {/* ============================================================== */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fadeIn">
            {/* HERO SECTION */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#111728] via-[#0E1322] to-[#070A12] border border-slate-800/80 p-6 md:p-10 shadow-2xl">
              {/* Background ambient lighting */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-2xl space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
                  Rent the perfect board for today’s surf.
                </h1>

                <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                  Live surf conditions, nearby mobile rental vans, and instant reservations. Pay with USDC on Solana, Bitcoin, or Apple Pay.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedBeach(BEACHES[0])
                      setShowBeachModal(true)
                    }}
                    className="bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:brightness-110 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all active:scale-95 flex items-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    <span>Find a Beach</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('explore')}
                    className="bg-[#161F30] hover:bg-[#1E2B42] text-slate-200 font-semibold text-sm px-5 py-3.5 rounded-xl border border-slate-700/80 transition-all flex items-center gap-2"
                  >
                    <Compass className="w-4 h-4 text-cyan-400" />
                    <span>Explore Conditions</span>
                  </button>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Find waves. Find a board. Go surf.</span>
                </div>
              </div>
            </div>

            {/* --- SMART BEST MATCH RIGHT NOW CARD --- */}
            <div className="rounded-2xl bg-gradient-to-r from-[#131B2E] to-[#16162D] border border-cyan-500/30 p-5 md:p-6 shadow-xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase tracking-wide">
                      Best Match Right Now
                    </span>
                    <span className="text-xs text-slate-400">
                      Rockaway Beach • 2–3 ft • GOOD
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    9'0 Dawn Patrol Log
                    <span className="text-xs font-normal text-slate-400 px-2 py-0.5 rounded bg-slate-800">
                      72 L • Single Fin
                    </span>
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                    The waves are small, clean and soft this morning. The 72L volume and classic outline let you roll into peelers early with zero paddle resistance.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300 pt-1">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <Car className="w-3.5 h-3.5" />
                      Van #12 — Rockaway Runner (Beach 90th St)
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-purple-400" />
                      0.2 mi away
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      3 longboards available
                    </span>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                  <div className="text-left md:text-right">
                    <p className="text-2xl font-black text-white">$25 <span className="text-xs font-medium text-slate-400">/ 2 hrs</span></p>
                    <p className="text-[11px] text-slate-400">$50 refundable deposit</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedBeach(BEACHES[0])
                        setShowBeachModal(true)
                      }}
                      className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#1A2336] text-slate-300 hover:bg-[#222E46] border border-slate-700 transition"
                    >
                      View Conditions
                    </button>
                    <button
                      onClick={() => {
                        setSelectedBeach(BEACHES[0])
                        setSelectedVan(VANS[0])
                        setSelectedBoard(BOARDS[0])
                        setShowCheckoutModal(true)
                      }}
                      className="bg-gradient-to-r from-cyan-500 to-indigo-600 hover:brightness-110 text-white font-bold text-xs px-4 py-2 rounded-xl shadow transition active:scale-95"
                    >
                      Reserve This Board
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* --- GOOD SURF NEAR YOU (HORIZONTAL SCROLL) --- */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Waves className="w-5 h-5 text-cyan-400" />
                    Good Surf Near You
                  </h2>
                  <p className="text-xs text-slate-400">
                    Live wave reports and nearby mobile rental vans ready for pickup
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  See all 7 spots <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {BEACHES.slice(0, 3).map(beach => (
                  <div
                    key={beach.id}
                    className="group rounded-2xl bg-[#0F1420] border border-slate-800/90 overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Image header with conditions badge */}
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={beach.image}
                          alt={beach.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1420] via-transparent to-black/40" />

                        <div className="absolute top-3 left-3">
                          <span
                            className={`text-[11px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider backdrop-blur-md shadow ${
                              beach.quality === 'GOOD'
                                ? 'bg-emerald-500/90 text-white'
                                : 'bg-cyan-600/90 text-white'
                            }`}
                          >
                            {beach.quality} • {beach.waveHeight}
                          </span>
                        </div>

                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2 py-1 rounded-md">
                          {beach.distance}
                        </div>

                        <div className="absolute bottom-2 left-3 right-3">
                          <h3 className="text-lg font-bold text-white tracking-tight">{beach.name}</h3>
                          <p className="text-xs text-slate-300">{beach.breakName} • {beach.city}, {beach.state}</p>
                        </div>
                      </div>

                      {/* Conditions Strip */}
                      <div className="p-4 space-y-3 text-xs">
                        <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-[#141B2B] border border-slate-800/80 text-center">
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase">Wind</p>
                            <p className="font-semibold text-slate-200">{beach.wind.split(' ')[0]} {beach.windMph}mph</p>
                            <p className="text-[9px] text-cyan-400">{beach.windSub}</p>
                          </div>
                          <div className="border-x border-slate-700/50">
                            <p className="text-[10px] text-slate-400 uppercase">Tide</p>
                            <p className="font-semibold text-slate-200">{beach.tide}</p>
                            <p className="text-[9px] text-purple-400">{beach.waterTemp}</p>
                          </div>
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase">Swell</p>
                            <p className="font-semibold text-slate-200">{beach.swell}</p>
                            <p className="text-[9px] text-slate-400">{beach.swellPeriod}</p>
                          </div>
                        </div>

                        <p className="text-slate-300 line-clamp-2 leading-relaxed">
                          {beach.recommendation}
                        </p>

                        <div className="flex items-center justify-between text-slate-400 pt-1 text-[11px]">
                          <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
                            <Car className="w-3.5 h-3.5" />
                            {beach.vanCount} SurfPass vans nearby
                          </span>
                          <span className="font-medium text-emerald-400">
                            {beach.boardCount} boards ready
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <button
                        onClick={() => {
                          setSelectedBeach(beach)
                          setShowBeachModal(true)
                        }}
                        className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#1A2336] hover:bg-gradient-to-r hover:from-cyan-500 hover:to-indigo-600 hover:text-white text-slate-200 border border-slate-700/80 transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>View Beach & Vans</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* --- FEATURED SURFBOARD FLEET SHOWCASE --- */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    Available Boards in Rockaway
                  </h2>
                  <p className="text-xs text-slate-400">
                    Reserve ahead and grab directly from Van #12 at Beach 90th Street
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedVan(VANS[0])
                    setShowVanModal(true)
                  }}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  View full quiver <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {BOARDS.slice(0, 4).map(board => (
                  <div
                    key={board.id}
                    className="rounded-2xl bg-[#0F1420] border border-slate-800/90 p-4 hover:border-slate-700 transition flex flex-col justify-between"
                  >
                    <div>
                      {/* Consistent vector shape illustration */}
                      <div className="h-36 rounded-xl bg-gradient-to-b from-[#141B2C] to-[#0A0D15] flex items-center justify-center p-2 relative overflow-hidden border border-slate-800/50">
                        <SurfboardGraphic type={board.shapeType} className="w-14 h-32" />
                        <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-black/60 text-cyan-300 border border-slate-700/60">
                          {board.type}
                        </span>
                        <span className="absolute bottom-2 right-2 text-[10px] font-semibold text-slate-400">
                          {board.volume}
                        </span>
                      </div>

                      <div className="pt-3 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm text-white tracking-tight">{board.name}</h4>
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                            {board.availableCount} ready
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">{board.dimensions} • {board.finSetup}</p>
                        <p className="text-xs text-slate-300 font-medium">{board.personality}</p>
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <div>
                        <p className="text-base font-extrabold text-white">${board.pricing.twoHours} <span className="text-[10px] text-slate-400 font-normal">/ 2h</span></p>
                        <p className="text-[10px] text-slate-400">${board.deposit} deposit</p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedBoard(board)
                          setSelectedVan(VANS[0])
                          setSelectedBeach(BEACHES[0])
                          setShowCheckoutModal(true)
                        }}
                        className="bg-gradient-to-r from-cyan-500 to-indigo-600 hover:brightness-110 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition active:scale-95"
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

        {/* ============================================================== */}
        {/* EXPLORE VIEW (NATIONWIDE SURF HUBS)                             */}
        {/* ============================================================== */}
        {activeTab === 'explore' && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">Explore Surf & Vans</h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Discover surf conditions, breaks, and mobile SurfPass rental vans nationwide
              </p>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search beach, city, break, or state..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-[#121824] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Region Pill Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {['All', 'New York', 'New Jersey', 'California', 'Florida', 'Hawaii'].map(reg => (
                  <button
                    key={reg}
                    onClick={() => setRegionFilter(reg)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      regionFilter === reg
                        ? 'bg-cyan-500 text-black font-bold'
                        : 'bg-[#121824] text-slate-300 hover:bg-[#1A2336] border border-slate-800'
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>
            </div>

            {/* Beaches Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredBeaches.map(beach => (
                <div
                  key={beach.id}
                  className="group rounded-2xl bg-[#0F1420] border border-slate-800 overflow-hidden hover:border-slate-700 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={beach.image}
                        alt={beach.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1420] via-transparent to-black/40" />

                      <div className="absolute top-3 left-3">
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow ${
                            beach.quality === 'GOOD'
                              ? 'bg-emerald-500 text-white'
                              : 'bg-cyan-600 text-white'
                          }`}
                        >
                          {beach.quality} • {beach.waveHeight}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                        {beach.region}
                      </div>

                      <div className="absolute bottom-2 left-3 right-3">
                        <h3 className="text-lg font-bold text-white tracking-tight">{beach.name}</h3>
                        <p className="text-xs text-slate-300">{beach.breakName} • {beach.city}, {beach.state}</p>
                      </div>
                    </div>

                    <div className="p-4 space-y-3 text-xs">
                      <p className="text-slate-300 line-clamp-2 leading-relaxed">{beach.description}</p>

                      <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-[#141B2B] text-center text-slate-300">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Wind</span>
                          <span className="font-semibold">{beach.windMph} mph</span>
                        </div>
                        <div className="border-x border-slate-700/60">
                          <span className="text-[10px] text-slate-400 block">Water</span>
                          <span className="font-semibold">{beach.waterTemp}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block">Swell</span>
                          <span className="font-semibold">{beach.swell}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                        <span className="text-cyan-400 font-medium">{beach.vanCount} SurfPass vans</span>
                        <span className="text-emerald-400 font-medium">{beach.boardCount} boards ready</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button
                      onClick={() => {
                        setSelectedBeach(beach)
                        setShowBeachModal(true)
                      }}
                      className="w-full py-2.5 rounded-xl font-bold text-xs bg-[#1A2336] hover:bg-cyan-500 hover:text-black text-slate-200 border border-slate-700 transition"
                    >
                      View Conditions & Vans
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* LIVE MAP VIEW (GEOGRAPHIC COASTAL SIMULATION)                  */}
        {/* ============================================================== */}
        {activeTab === 'map' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">Live Surf & Van Map</h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Real-time GPS tracking of SurfPass roaming vans and surf breaks
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Fleet Active: 5 Vans
                </span>
              </div>
            </div>

            {/* Simulated Coastal Map */}
            <div className="relative h-[480px] rounded-3xl bg-[#09121E] border border-slate-800 overflow-hidden shadow-2xl">
              {/* Coastline / Street / Sand Simulation Graphic */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Ocean Area */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#041629] to-[#0A2647] border-t border-cyan-500/30">
                  {/* Wave contour ripples */}
                  <div className="absolute top-4 left-1/4 right-1/4 h-[1px] bg-cyan-400/20" />
                  <div className="absolute top-12 left-1/3 right-1/5 h-[1px] bg-cyan-400/15" />
                  <div className="absolute top-24 left-1/6 right-1/3 h-[1px] bg-cyan-400/10" />
                  <span className="absolute bottom-6 left-8 text-xs font-bold tracking-widest text-cyan-500/40 uppercase">
                    Atlantic Ocean • Clean 2–3ft Groundswell
                  </span>
                </div>

                {/* Beach Sand Strip */}
                <div className="absolute bottom-1/2 left-0 right-0 h-14 bg-[#3D3322]/40 border-y border-[#786138]/40 flex items-center justify-center">
                  <span className="text-[10px] tracking-widest font-bold text-amber-200/40 uppercase">
                    Rockaway Shoreline & Boardwalk
                  </span>
                </div>

                {/* City Blocks / Roads */}
                <div className="absolute top-0 left-0 right-0 h-[calc(50%-56px)] bg-[#0C111C]">
                  {/* Street grid lines */}
                  <div className="absolute inset-0 grid grid-cols-8 grid-rows-3 gap-2 p-4 opacity-30">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} className="border border-slate-700/40 rounded" />
                    ))}
                  </div>
                  <span className="absolute top-4 left-6 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                    Queens Urban Shore • Subway Line A & Shuttle Access
                  </span>
                </div>
              </div>

              {/* User Location Marker */}
              <div className="absolute top-[35%] left-[30%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/30 animate-ping absolute" />
                  <div className="w-4 h-4 rounded-full bg-cyan-400 border-2 border-white shadow-lg shadow-cyan-500" />
                </div>
                <span className="mt-1 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-white border border-slate-700">
                  You are here
                </span>
              </div>

              {/* Van Pins */}
              {VANS.slice(0, 2).map(van => (
                <div
                  key={van.id}
                  onClick={() => {
                    setSelectedVan(van)
                    setShowVanModal(true)
                  }}
                  style={{ left: `${van.mapX}%`, top: `${van.mapY}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
                >
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:scale-110 transition-transform p-2.5 rounded-2xl shadow-xl shadow-purple-600/30 border-2 border-white flex items-center gap-1.5 text-white">
                    <Car className="w-4 h-4" />
                    <span className="text-xs font-black">{van.fleetNumber}</span>
                  </div>
                  <div className="mt-1 bg-black/90 text-white text-[10px] font-semibold px-2 py-1 rounded-lg border border-slate-700 text-center whitespace-nowrap">
                    <span className="text-cyan-400 font-bold">{van.nickname}</span>
                    <span className="block text-slate-400">{van.boardsAvailable} boards • {van.distance}</span>
                  </div>
                </div>
              ))}

              {/* Surf Break Pin */}
              <div
                onClick={() => {
                  setSelectedBeach(BEACHES[0])
                  setShowBeachModal(true)
                }}
                className="absolute top-[68%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
              >
                <div className="bg-cyan-500 group-hover:scale-110 transition p-2.5 rounded-full shadow-xl shadow-cyan-500/40 border-2 border-white text-black flex items-center justify-center">
                  <Waves className="w-5 h-5" />
                </div>
                <div className="mt-1 bg-black/90 text-white text-[10px] font-semibold px-2 py-1 rounded-lg border border-slate-700 text-center whitespace-nowrap">
                  <span className="text-emerald-400 font-bold">Beach 90th Jetty Peak</span>
                  <span className="block text-slate-300">2–3 ft • GOOD</span>
                </div>
              </div>
            </div>

            {/* Van Fleet Cards Under Map */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {VANS.slice(0, 2).map(van => (
                <div
                  key={van.id}
                  className="rounded-2xl bg-[#0F1420] border border-slate-800 p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                      <Car className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm flex items-center gap-2">
                        {van.fleetNumber} — {van.nickname}
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          OPEN
                        </span>
                      </h4>
                      <p className="text-xs text-slate-400">{van.spot}</p>
                      <p className="text-xs text-cyan-400 font-medium">{van.boardsAvailable} boards available • {van.distance}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedVan(van)
                      setShowVanModal(true)
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-black transition"
                  >
                    View Boards
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* RENTALS & DIGITAL PASS VIEW                                   */}
        {/* ============================================================== */}
        {activeTab === 'rentals' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">My Rentals & Passes</h1>
                <p className="text-xs sm:text-sm text-slate-400">
                  Digital SurfPass boarding passes, active sessions, and deposit refund management
                </p>
              </div>
            </div>

            {rentals.length === 0 ? (
              <div className="rounded-2xl bg-[#0F1420] border border-slate-800 p-8 text-center space-y-4">
                <Ticket className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">No active rentals right now</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Check conditions, pick a nearby van, and reserve your surfboard in under 30 seconds.
                </p>
                <button
                  onClick={() => setActiveTab('home')}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 text-black hover:bg-cyan-400 transition"
                >
                  Find a Board
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {rentals.map(pass => (
                  <div
                    key={pass.id}
                    className="rounded-3xl bg-gradient-to-b from-[#131929] to-[#0A0D15] border border-slate-700/80 p-6 shadow-2xl relative overflow-hidden"
                  >
                    {/* Top status & logo bar */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <div className="flex items-center gap-2">
                        <Waves className="w-5 h-5 text-cyan-400" />
                        <span className="font-extrabold text-sm tracking-wider text-white">SURFPASS RENTAL PASS</span>
                      </div>
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          pass.status === 'ACTIVE'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {pass.status}
                      </span>
                    </div>

                    {/* Pass Details */}
                    <div className="py-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[10px] uppercase text-slate-400 font-bold">Surfboard</p>
                          <h3 className="text-lg font-black text-white">{pass.boardName}</h3>
                          <p className="text-xs text-slate-400">{pass.boardDimensions} • {pass.boardVolume}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] uppercase text-slate-400 font-bold">Pass ID</p>
                          <p className="text-xs font-mono font-bold text-cyan-400">{pass.id}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 py-2 px-3 rounded-xl bg-[#0D121E] border border-slate-800 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase">Pickup Van</span>
                          <span className="font-bold text-slate-200">{pass.vanName} ({pass.vanNickname})</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block uppercase">Location</span>
                          <span className="font-bold text-slate-200">{pass.spot}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <div>
                          <span className="text-slate-400">Duration: </span>
                          <span className="font-semibold text-white">{pass.durationLabel} ({pass.startTime} – {pass.endTime})</span>
                        </div>
                        <div>
                          <span className="text-slate-400">Security Deposit: </span>
                          <span className={`font-bold ${pass.depositStatus === 'HELD' ? 'text-amber-400' : 'text-emerald-400'}`}>
                            ${pass.deposit} {pass.depositStatus}
                          </span>
                        </div>
                      </div>

                      {/* Small Tatum Settlement Verification Line */}
                      <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800">
                        <span>Paid with: <strong className="text-white">{pass.paymentMethod}</strong></span>
                        <span className="text-cyan-400 font-medium">Onchain verified via Tatum</span>
                      </div>
                    </div>

                    {/* QR Code & Action Bar */}
                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-white rounded-lg p-1 flex items-center justify-center">
                          <QrCode className="w-8 h-8 text-black" />
                        </div>
                        <span className="text-[10px] text-slate-400 leading-tight">
                          Show QR to van operator for pickup & return
                        </span>
                      </div>

                      {pass.status === 'ACTIVE' && (
                        <button
                          onClick={() => {
                            setReturningPass(pass)
                            setReturnStage('inspect')
                            setShowReturnModal(true)
                          }}
                          className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-white shadow transition"
                        >
                          Return Board & Release ${pass.deposit}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* PROFILE VIEW                                                   */}
        {/* ============================================================== */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
            <div className="rounded-3xl bg-[#0F1420] border border-slate-800 p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[2px]">
                  <div className="w-full h-full bg-[#0F1420] rounded-[14px] flex items-center justify-center">
                    <User className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Patrick V.</h2>
                  <p className="text-xs text-slate-400">Home Break: Rockaway Beach, NY</p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                      SurfPass Score: 94/100
                    </span>
                    <span className="text-[11px] text-slate-400">17 Sessions Completed</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-[#141B2B] border border-slate-800">
                  <p className="text-[10px] text-slate-400 uppercase">Boards Rented</p>
                  <p className="text-lg font-black text-white">12</p>
                </div>
                <div className="p-3 rounded-xl bg-[#141B2B] border border-slate-800">
                  <p className="text-[10px] text-slate-400 uppercase">Deposits Released</p>
                  <p className="text-lg font-black text-emerald-400">100%</p>
                </div>
                <div className="p-3 rounded-xl bg-[#141B2B] border border-slate-800">
                  <p className="text-[10px] text-slate-400 uppercase">Favorite Shape</p>
                  <p className="text-sm font-bold text-purple-300 mt-0.5">7'2 Mid-Length</p>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">Payment & Settlement Preferences</h4>
                <div className="p-3.5 rounded-xl bg-[#121824] border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                      <Wallet className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Solana Wallet Connected</p>
                      <p className="text-[11px] font-mono text-slate-400">8K3...9xL (USDC Ready)</p>
                    </div>
                  </div>
                  <span className="text-emerald-400 font-bold">Active</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ============================================================== */}
      {/* BEACH DETAIL MODAL (WITH POLISHED 12H FORECAST GRAPH)          */}
      {/* ============================================================== */}
      {showBeachModal && selectedBeach && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#0D121E] border border-slate-700 shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col">
            {/* Header with Background Photo */}
            <div className="relative h-56 shrink-0">
              <img src={selectedBeach.image} alt={selectedBeach.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D121E] via-[#0D121E]/60 to-transparent" />

              {/* Explicit Exit X Button */}
              <button
                onClick={() => setShowBeachModal(false)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-slate-600 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500 text-white uppercase tracking-wider">
                    {selectedBeach.quality} • {selectedBeach.waveHeight}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">{selectedBeach.name}</h2>
                  <p className="text-xs text-slate-300">{selectedBeach.breakName} • {selectedBeach.city}, {selectedBeach.state}</p>
                </div>
                <button
                  onClick={() => {
                    setShowBeachModal(false)
                    setShowWhatToRideModal(true)
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white shadow flex items-center gap-1.5 shrink-0"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  <span>What should I ride?</span>
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {/* Conditions Summary Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-[#141B2B] border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block">Wave Height</span>
                  <span className="text-base font-extrabold text-white">{selectedBeach.waveHeight}</span>
                  <span className="text-[10px] text-cyan-400 block">{selectedBeach.waveSub}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#141B2B] border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block">Wind</span>
                  <span className="text-base font-extrabold text-white">{selectedBeach.windMph} mph</span>
                  <span className="text-[10px] text-purple-400 block">{selectedBeach.windSub}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#141B2B] border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block">Tide</span>
                  <span className="text-base font-extrabold text-white">{selectedBeach.tide}</span>
                  <span className="text-[10px] text-slate-400 block">{selectedBeach.tideSub}</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#141B2B] border border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase block">Water Temp</span>
                  <span className="text-base font-extrabold text-white">{selectedBeach.waterTemp}</span>
                  <span className="text-[10px] text-emerald-400 block">Air {selectedBeach.airTemp}</span>
                </div>
              </div>

              {/* --- 12-HOUR SURF FORECAST VISUALIZATION GRAPH --- */}
              <div className="p-4 rounded-2xl bg-[#101726] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    12-Hour Surf Forecast Curve
                  </h4>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    Best Window: {selectedBeach.bestWindow}
                  </span>
                </div>

                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={selectedBeach.hourly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.6} />
                          <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" stroke="#64748B" fontSize={10} tickLine={false} />
                      <YAxis stroke="#64748B" fontSize={10} domain={[0, 4]} tickLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0B0F17', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }}
                        formatter={(value: any) => [`${value} ft`, 'Wave Height']}
                      />
                      <Area type="monotone" dataKey="heightFt" stroke="#06B6D4" strokeWidth={2.5} fill="url(#waveGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-[11px] text-slate-400 text-center">
                  {selectedBeach.bestWindowSub}
                </p>
              </div>

              {/* Vans Near This Beach */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Car className="w-4 h-4 text-purple-400" />
                  SurfPass Vans at {selectedBeach.name}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {VANS.filter(v => v.beachId === selectedBeach.id).map(van => (
                    <div
                      key={van.id}
                      className="p-4 rounded-2xl bg-[#141B2B] border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <h5 className="font-bold text-white text-sm">{van.fleetNumber} — {van.nickname}</h5>
                        <p className="text-xs text-slate-400">{van.spot}</p>
                        <p className="text-xs text-cyan-400 font-semibold">{van.boardsAvailable} boards available</p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedVan(van)
                          setShowBeachModal(false)
                          setShowVanModal(true)
                        }}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-black hover:bg-cyan-400 transition"
                      >
                        View Quiver
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Modal Actions */}
            <div className="p-4 bg-[#090D15] border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setShowBeachModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedVan(VANS[0])
                  setShowBeachModal(false)
                  setShowVanModal(true)
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 text-white hover:brightness-110 shadow"
              >
                Browse Board Inventory
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VAN QUIVER / INVENTORY MODAL                                   */}
      {/* ============================================================== */}
      {showVanModal && selectedVan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl bg-[#0D121E] border border-slate-700 shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col">
            {/* Van Header */}
            <div className="p-6 bg-gradient-to-r from-[#141B2B] to-[#16172E] border-b border-slate-800 flex items-center justify-between shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    OPEN • {selectedVan.hours}
                  </span>
                  <span className="text-xs text-slate-400">{selectedVan.distance}</span>
                </div>
                <h3 className="text-2xl font-black text-white mt-1">
                  {selectedVan.fleetNumber} — {selectedVan.nickname}
                </h3>
                <p className="text-xs text-slate-300">{selectedVan.spot}</p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowVanModal(false)}
                className="w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center border border-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content & Quiver Filter */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <h4 className="text-sm font-bold text-white">
                  Available Quiver ({vanBoards.length} Boards Ready)
                </h4>
                <div className="flex items-center gap-1">
                  {['All', 'Longboard', 'Mid-Length', 'Fish', 'Shortboard', 'Soft-Top'].map(type => (
                    <button
                      key={type}
                      onClick={() => setBoardTypeFilter(type)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                        boardTypeFilter === type
                          ? 'bg-cyan-500 text-black font-bold'
                          : 'bg-[#141B2B] text-slate-400 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Boards in Van Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {vanBoards.map(board => (
                  <div
                    key={board.id}
                    className="p-4 rounded-2xl bg-[#141B2B] border border-slate-800 flex flex-col justify-between"
                  >
                    <div className="flex gap-4">
                      {/* Accurate Vector Graphic */}
                      <div className="w-16 h-28 bg-[#0B0F17] rounded-xl flex items-center justify-center p-1 border border-slate-800 shrink-0">
                        <SurfboardGraphic type={board.shapeType} className="w-12 h-24" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <span className="text-[10px] font-bold text-cyan-400">{board.type}</span>
                        <h5 className="font-bold text-white text-sm">{board.name}</h5>
                        <p className="text-[11px] text-slate-400">{board.dimensions} • {board.volume}</p>
                        <p className="text-xs text-slate-300 font-medium">{board.personality}</p>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <div>
                        <span className="text-sm font-extrabold text-white">${board.pricing.twoHours}</span>
                        <span className="text-[10px] text-slate-400"> / 2 hrs</span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedBoard(board)
                          setShowVanModal(false)
                          setShowCheckoutModal(true)
                        }}
                        className="px-4 py-1.5 rounded-xl text-xs font-bold bg-cyan-500 text-black hover:bg-cyan-400 transition"
                      >
                        Reserve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Modal Actions */}
            <div className="p-4 bg-[#090D15] border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setShowVanModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Back to Map / Beach
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* "WHAT SHOULD I RIDE?" INTERACTIVE RECOMMENDATION MODAL          */}
      {/* ============================================================== */}
      {showWhatToRideModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-[#0D121E] border border-slate-700 p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                Board Recommendation
              </h3>
              <button
                onClick={() => setShowWhatToRideModal(false)}
                className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#141B2C] to-[#181932] border border-purple-500/30 space-y-3">
              <div className="flex items-center gap-3">
                <SurfboardGraphic type="long" className="w-12 h-24" />
                <div>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase">Best Choice Today</span>
                  <h4 className="text-base font-bold text-white">9'0 Dawn Patrol Log</h4>
                  <p className="text-xs text-slate-300">72 Liters • Single Fin Box</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-700/60 pt-2">
                <strong>Why this board?</strong> 2–3 ft clean peeling surf on an incoming push. The high volume lets you glide over soft sections without fighting flat spots.
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Van #12 (0.2 mi away)</span>
              <span className="text-emerald-400 font-bold">3 ready</span>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowWhatToRideModal(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-[#141B2B] text-slate-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedBoard(BOARDS[0])
                  setSelectedVan(VANS[0])
                  setShowWhatToRideModal(false)
                  setShowCheckoutModal(true)
                }}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 text-black hover:bg-cyan-400"
              >
                Reserve This Board
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* CHECKOUT MODAL (USDC ON SOLANA, BITCOIN, CARD)                 */}
      {/* ============================================================== */}
      {showCheckoutModal && selectedBoard && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#0D121E] border border-slate-700 shadow-2xl overflow-hidden my-6">
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-[#141B2B] to-[#171830] border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wide">
                  {checkoutStep === 'review' ? 'Step 1: Reservation & Payment' : checkoutStep === 'paying' ? 'Processing Settlement' : 'Reservation Confirmed'}
                </span>
                <h3 className="text-xl font-black text-white">Reserve {selectedBoard.name}</h3>
              </div>
              <button
                onClick={() => {
                  setShowCheckoutModal(false)
                  setCheckoutStep('review')
                }}
                className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {checkoutStep === 'review' && (
                <>
                  {/* Duration Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase">Select Duration</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setDuration('2hrs')}
                        className={`p-2.5 rounded-xl border text-center transition ${
                          duration === '2hrs'
                            ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold'
                            : 'bg-[#141B2B] border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="block text-xs">2 Hours</span>
                        <span className="text-sm font-extrabold">${selectedBoard.pricing.twoHours}</span>
                      </button>
                      <button
                        onClick={() => setDuration('4hrs')}
                        className={`p-2.5 rounded-xl border text-center transition ${
                          duration === '4hrs'
                            ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold'
                            : 'bg-[#141B2B] border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="block text-xs">4 Hours</span>
                        <span className="text-sm font-extrabold">${selectedBoard.pricing.fourHours}</span>
                      </button>
                      <button
                        onClick={() => setDuration('day')}
                        className={`p-2.5 rounded-xl border text-center transition ${
                          duration === 'day'
                            ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold'
                            : 'bg-[#141B2B] border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="block text-xs">Full Day</span>
                        <span className="text-sm font-extrabold">${selectedBoard.pricing.fullDay}</span>
                      </button>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-300 uppercase">How would you like to pay?</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setPaymentMethod('USDC')}
                        className={`p-3 rounded-xl border text-left transition ${
                          paymentMethod === 'USDC'
                            ? 'bg-gradient-to-br from-indigo-950 to-purple-950 border-cyan-400 text-white'
                            : 'bg-[#141B2B] border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="text-[10px] font-bold text-cyan-400 block">RECOMMENDED</span>
                        <span className="text-sm font-black text-white block">USDC</span>
                        <span className="text-[10px] text-slate-400">Solana Network</span>
                      </button>

                      <button
                        onClick={() => setPaymentMethod('BTC')}
                        className={`p-3 rounded-xl border text-left transition ${
                          paymentMethod === 'BTC'
                            ? 'bg-gradient-to-br from-amber-950 to-slate-900 border-amber-400 text-white'
                            : 'bg-[#141B2B] border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="text-[10px] font-bold text-amber-400 block">CRYPTO</span>
                        <span className="text-sm font-black text-white block">Bitcoin</span>
                        <span className="text-[10px] text-slate-400">{btcDue} BTC</span>
                      </button>

                      <button
                        onClick={() => setPaymentMethod('CARD')}
                        className={`p-3 rounded-xl border text-left transition ${
                          paymentMethod === 'CARD'
                            ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-400 text-white'
                            : 'bg-[#141B2B] border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="text-[10px] font-bold text-slate-300 block">STANDARD</span>
                        <span className="text-sm font-black text-white block">Card / Pay</span>
                        <span className="text-[10px] text-slate-400">Apple / Debit</span>
                      </button>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div className="p-4 rounded-2xl bg-[#0B0F17] border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Board Rental ({duration})</span>
                      <span className="font-semibold text-white">${currentRentalCost}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Damage Protection</span>
                      <span className="font-semibold text-white">${includeProtection ? selectedBoard.protectionFee : 0}</span>
                    </div>
                    <div className="flex justify-between text-cyan-300 font-semibold border-t border-slate-800/80 pt-2">
                      <span>Refundable Security Deposit</span>
                      <span>${depositAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-white border-t border-slate-800 pt-2">
                      <span>Total Authorization</span>
                      <span className="text-cyan-400">
                        {paymentMethod === 'USDC' ? `${totalAuthorization} USDC` : `$${totalAuthorization}`}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 italic">
                      * ${depositAmount} security deposit is instantly released upon returning the board to the van.
                    </p>
                  </div>

                  <button
                    onClick={startPayment}
                    className="w-full py-3.5 rounded-xl font-black text-sm bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:brightness-110 text-white shadow-xl transition active:scale-95"
                  >
                    {paymentMethod === 'USDC'
                      ? `Pay ${totalAuthorization} USDC on Solana`
                      : paymentMethod === 'BTC'
                      ? `Pay ${btcDue} BTC via Bitcoin`
                      : `Authorize $${totalAuthorization} with Card`}
                  </button>
                </>
              )}

              {/* PAYMENT DETECTION ANIMATION */}
              {checkoutStep === 'paying' && (
                <div className="py-8 text-center space-y-6">
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="w-full h-full rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin" />
                    <Waves className="w-8 h-8 text-cyan-400 absolute inset-0 m-auto" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-lg font-black text-white">
                      {payStage === 1 && 'Waiting for Payment...'}
                      {payStage === 2 && 'Payment Detected'}
                      {payStage === 3 && 'Confirming on Solana...'}
                      {payStage === 4 && 'Payment Confirmed!'}
                    </h4>

                    {payStage >= 2 && (
                      <p className="text-xs font-semibold text-cyan-400">
                        via Tatum Infrastructure
                      </p>
                    )}

                    <p className="text-xs text-slate-400">
                      {payStage === 1 && 'Broadcasting transaction payload to network...'}
                      {payStage === 2 && 'Tatum real-time blockchain listener caught incoming tx'}
                      {payStage === 3 && 'Validating signatures and locking rental authorization'}
                      {payStage === 4 && 'Creating digital SurfPass Rental Pass'}
                    </p>
                  </div>
                </div>
              )}

              {/* CONFIRMED STEP */}
              {checkoutStep === 'confirmed' && (
                <div className="text-center space-y-5 py-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xl font-black text-white">Board Reserved!</h4>
                    <p className="text-xs text-slate-300">
                      Your {selectedBoard.name} is waiting at {selectedVan.fleetNumber} ({selectedVan.spot}).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#141B2B] border border-slate-800 text-xs text-left space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Rental Paid</span>
                      <span className="font-bold text-white">${totalCharge}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Deposit Held</span>
                      <span className="font-bold text-amber-400">${depositAmount}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-700/80 pt-1">
                      <span className="text-slate-400">Settlement Rail</span>
                      <span className="font-bold text-cyan-400">{paymentMethod} (Tatum Monitored)</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setShowCheckoutModal(false)
                        setCheckoutStep('review')
                        setActiveTab('rentals')
                      }}
                      className="flex-1 py-3 rounded-xl text-xs font-bold bg-cyan-500 text-black hover:bg-cyan-400 transition"
                    >
                      View Rental Pass
                    </button>
                    <button
                      onClick={() => {
                        setShowCheckoutModal(false)
                        setCheckoutStep('review')
                        setActiveTab('map')
                      }}
                      className="flex-1 py-3 rounded-xl text-xs font-bold bg-[#141B2B] text-white hover:bg-[#1C2538] transition"
                    >
                      Navigate to Van
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* RETURN BOARD & INSTANT DEPOSIT REFUND MODAL                    */}
      {/* ============================================================== */}
      {showReturnModal && returningPass && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-[#0D121E] border border-slate-700 p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white">Return Board & Release Deposit</h3>
              <button
                onClick={() => setShowReturnModal(false)}
                className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {returnStage === 'inspect' && (
              <>
                <div className="p-4 rounded-2xl bg-[#141B2B] border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Board Returned</span>
                    <span className="font-bold text-white">{returningPass.boardName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Van Operator</span>
                    <span className="font-bold text-slate-300">{returningPass.vanName} ({returningPass.vanNickname})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Condition Check</span>
                    <span className="font-bold text-emerald-400">Good / No Damage ✓</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-700 pt-2 font-bold text-white">
                    <span>Refund Amount</span>
                    <span className="text-emerald-400">${returningPass.deposit} (Instant)</span>
                  </div>
                </div>

                <button
                  onClick={executeReturn}
                  className="w-full py-3.5 rounded-xl font-black text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:brightness-110 shadow"
                >
                  Confirm Return & Release ${returningPass.deposit}
                </button>
              </>
            )}

            {returnStage === 'processing' && (
              <div className="py-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin mx-auto" />
                <h4 className="font-bold text-white text-base">Releasing ${returningPass.deposit} Deposit...</h4>
                <p className="text-xs text-slate-400">Settling refund onchain via Tatum infrastructure</p>
              </div>
            )}

            {returnStage === 'done' && (
              <div className="py-4 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-white">Deposit Returned ✓</h4>
                <p className="text-xs text-slate-300">
                  ${returningPass.deposit} has been returned to your original payment method. Hope you caught great waves!
                </p>
                <button
                  onClick={() => setShowReturnModal(false)}
                  className="w-full py-3 rounded-xl text-xs font-bold bg-cyan-500 text-black hover:bg-cyan-400"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TATUM MULTI-CHAIN INFRASTRUCTURE MODAL                         */}
      {/* ============================================================== */}
      {showInfraModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0D121E] border border-slate-700 p-6 sm:p-8 shadow-2xl space-y-6 my-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Multi-Chain Backend</span>
                <h3 className="text-xl sm:text-2xl font-black text-white">Powered by Tatum</h3>
              </div>
              <button
                onClick={() => setShowInfraModal(false)}
                className="w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#141B2B] border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  Solana & Bitcoin RPC Gateway
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Direct blockchain connectivity and transaction broadcasting through high-throughput node infrastructure.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#141B2B] border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Real-Time Blockchain Events
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Real-time event streaming and webhook notifications detecting incoming USDC and BTC payments without poll loops.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#141B2B] border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Deposit & Collateral Escrow
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Automated security deposit locking and onchain release upon physical van check-in and QR verification.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#141B2B] border border-slate-800 space-y-2">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-purple-400" />
                  Multi-Currency Data Feeds
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Live fiat/crypto rates (BTC: ${btcRate.toLocaleString()}, SOL: ${solRate.toLocaleString()}) fetched dynamically.
                </p>
              </div>
            </div>

            {/* Architecture Flow Visual */}
            <div className="p-4 rounded-2xl bg-[#090D15] border border-slate-800 space-y-2 text-xs text-slate-300">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Architecture Pipeline</span>
              <p className="font-mono text-cyan-300">
                Surfer initiates payment → SurfPass Checkout → Tatum Infrastructure → Solana / Bitcoin → Real-Time Detection → Reservation Confirmed
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- BOTTOM MOBILE NAVIGATION BAR --- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B0F17]/95 backdrop-blur-lg border-t border-slate-800 py-2 px-3">
        <div className="flex items-center justify-around text-[10px] font-semibold">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-cyan-400' : 'text-slate-400'}`}
          >
            <Waves className="w-5 h-5" />
            <span>Home</span>
          </button>
          <button
            onClick={() => setActiveTab('explore')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'explore' ? 'text-cyan-400' : 'text-slate-400'}`}
          >
            <Compass className="w-5 h-5" />
            <span>Explore</span>
          </button>
          <button
            onClick={() => setActiveTab('map')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'map' ? 'text-cyan-400' : 'text-slate-400'}`}
          >
            <MapPin className="w-5 h-5" />
            <span>Live Map</span>
          </button>
          <button
            onClick={() => setActiveTab('rentals')}
            className={`flex flex-col items-center gap-1 relative ${activeTab === 'rentals' ? 'text-cyan-400' : 'text-slate-400'}`}
          >
            <Ticket className="w-5 h-5" />
            <span>Rentals</span>
            {rentals.some(r => r.status === 'ACTIVE') && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute top-0 right-2" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-cyan-400' : 'text-slate-400'}`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}
