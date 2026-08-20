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
  ResponsiveContainer,
  ReferenceArea
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
  boardImage: string
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
  boardImage: string
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

// --- DATA DEFINITION ---
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
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1000&q=80',
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
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
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
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1000&q=80',
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
    image: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&w=1000&q=80',
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
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1000&q=80',
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
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    description: 'Warm-water Florida surf with approachable beach-break conditions and classic Space Coast surf roots.',
    recommendation: 'Gentle peelers next to the pier. Soft-top logs and high-volume gliders will keep you standing all morning.',
    bestWindow: '8:00 AM – 11:00 AM',
    bestWindowSub: 'Morning offshore wind keeping rolling sandbars clean and fun.',
    hourly: [
      { time: '8 AM', hourVal: 8, heightFt: 2.3, heightLabel: '2.3 ft', periodSec: 9, tideFt: 2.4, windDir: 'WNW', windSpeed: 6, quality: 'FAIR' },
      { time: '9 AM', hourVal: 9, heightFt: 2.5, heightLabel: '2.5 ft', periodSec: 9, tideFt: 2.9, windDir: 'WNW', windSpeed: 6, quality: 'FAIR-GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 2.2, heightLabel: '2.2 ft', periodSec: 8, tideFt: 3.2, windDir: 'NW', windSpeed: 8, quality: 'FAIR' }
    ],
    lat: 28.3200,
    lng: -80.6076
  },
  {
    id: 'waikiki',
    name: 'Waikiki - Queens',
    breakName: 'Canoes & Queens Outer Reef',
    city: 'Honolulu',
    state: 'HI',
    region: 'Hawaii',
    waveHeight: '3–4 ft',
    waveDesc: 'Waist to chest high',
    waveSub: 'Endless rolling tropical walls',
    quality: 'GOOD',
    wind: 'Trade wind 10 mph offshore',
    windSub: 'Protected by Diamond Head wrap',
    windMph: 10,
    tide: 'High tide peak',
    tideSub: 'Deep water cushion over outer reef',
    waterTemp: '79°F',
    airTemp: '83°F',
    swell: 'SSW 3.2 ft',
    swellSub: 'Clean South Shore groundswell',
    swellPeriod: '13s',
    skill: 'All Levels',
    distance: 'Hawaii Market',
    vanCount: 3,
    boardCount: 28,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    description: 'Long rolling tropical waves and the undisputed birthplace of modern surfing, framed by Diamond Head.',
    recommendation: 'Iconic peeling rights off the reef. 9ft+ noseriders and easy cruisers will give you 100-yard rides straight to the sand.',
    bestWindow: '7:00 AM – Noon',
    bestWindowSub: 'Long rolling rights before afternoon trade wind chop picks up.',
    hourly: [
      { time: '7 AM', hourVal: 7, heightFt: 3.2, heightLabel: '3.2 ft', periodSec: 13, tideFt: 1.8, windDir: 'ENE', windSpeed: 8, quality: 'GOOD' },
      { time: '8 AM', hourVal: 8, heightFt: 3.6, heightLabel: '3.6 ft', periodSec: 13, tideFt: 2.2, windDir: 'ENE', windSpeed: 9, quality: 'GOOD' },
      { time: '9 AM', hourVal: 9, heightFt: 3.7, heightLabel: '3.7 ft', periodSec: 13, tideFt: 2.5, windDir: 'E', windSpeed: 10, quality: 'GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 3.4, heightLabel: '3.4 ft', periodSec: 12, tideFt: 2.4, windDir: 'E', windSpeed: 11, quality: 'GOOD' }
    ],
    lat: 21.2766,
    lng: -157.8275
  }
]

const VANS: Van[] = [
  {
    id: 'van-12',
    fleetNumber: '#12',
    nickname: 'Rockaway Runner',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    spot: 'Beach 90th Street & Boardwalk',
    status: 'OPEN',
    distance: '0.2 mi',
    walkTime: '3 min walk',
    driveTime: '1 min drive',
    hours: '6:00 AM – 7:00 PM',
    boardsAvailable: 8,
    longboards: 3,
    midsAndFun: 2,
    softTops: 2,
    shortboards: 1,
    fish: 0,
    waitMin: 2,
    lat: 40.5841,
    lng: -73.8160,
    mapX: 48,
    mapY: 52,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'van-07',
    fleetNumber: '#07',
    nickname: 'Boardwalk Cruiser',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    spot: 'Beach 67th Street Plaza',
    status: 'OPEN',
    distance: '0.9 mi',
    walkTime: '14 min walk',
    driveTime: '4 min drive',
    hours: '6:30 AM – 6:30 PM',
    boardsAvailable: 9,
    longboards: 3,
    midsAndFun: 3,
    softTops: 2,
    shortboards: 1,
    fish: 0,
    waitMin: 3,
    lat: 40.5898,
    lng: -73.7950,
    mapX: 74,
    mapY: 42,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'van-31',
    fleetNumber: '#31',
    nickname: 'Huntington Nomad',
    beachId: 'huntington',
    beachName: 'Huntington Beach',
    spot: 'Pacific Coast Hwy at Pier South',
    status: 'OPEN',
    distance: '0.1 mi',
    walkTime: '2 min walk',
    driveTime: '1 min drive',
    hours: '6:00 AM – 7:30 PM',
    boardsAvailable: 11,
    longboards: 2,
    midsAndFun: 3,
    softTops: 2,
    shortboards: 2,
    fish: 2,
    waitMin: 1,
    lat: 33.6590,
    lng: -117.9980,
    mapX: 50,
    mapY: 50,
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'van-34',
    fleetNumber: '#34',
    nickname: 'Trestles Runner',
    beachId: 'trestles',
    beachName: 'Lower Trestles',
    spot: 'Cristianitos Trailhead Shuttle Drop',
    status: 'OPEN',
    distance: '0.3 mi',
    walkTime: '5 min walk',
    driveTime: '2 min drive',
    hours: '6:00 AM – 6:00 PM',
    boardsAvailable: 7,
    longboards: 1,
    midsAndFun: 2,
    softTops: 1,
    shortboards: 2,
    fish: 1,
    waitMin: 4,
    lat: 33.3860,
    lng: -117.5870,
    mapX: 52,
    mapY: 48,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'van-45',
    fleetNumber: '#45',
    nickname: 'Cocoa Cruiser',
    beachId: 'cocoa-beach',
    beachName: 'Cocoa Beach',
    spot: 'Meade Ave Pier Access',
    status: 'OPEN',
    distance: '0.2 mi',
    walkTime: '3 min walk',
    driveTime: '1 min drive',
    hours: '7:00 AM – 6:00 PM',
    boardsAvailable: 10,
    longboards: 4,
    midsAndFun: 3,
    softTops: 3,
    shortboards: 0,
    fish: 0,
    waitMin: 2,
    lat: 28.3210,
    lng: -80.6070,
    mapX: 50,
    mapY: 50,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'van-61',
    fleetNumber: '#61',
    nickname: 'Waikiki Nomad',
    beachId: 'waikiki',
    beachName: 'Waikiki',
    spot: 'Kalakaua Ave at Duke Kahanamoku Statue',
    status: 'OPEN',
    distance: '0.1 mi',
    walkTime: '2 min walk',
    driveTime: '1 min drive',
    hours: '6:00 AM – 7:00 PM',
    boardsAvailable: 12,
    longboards: 5,
    midsAndFun: 4,
    softTops: 3,
    shortboards: 0,
    fish: 0,
    waitMin: 1,
    lat: 21.2770,
    lng: -157.8270,
    mapX: 50,
    mapY: 50,
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80'
  }
]

const BOARDS: Board[] = [
  // --- ROCKAWAY VAN #12 (Primary Demo Location) ---
  {
    id: 'brd-rkw-01',
    code: 'SP-RKW-0092',
    name: "9'0 Dawn Patrol Log",
    nickname: 'Classic Noserider',
    type: 'Longboard',
    dimensions: "9'0 × 22 3/4 × 3",
    length: "9'0",
    width: "22 3/4\"",
    thickness: "3\"",
    volume: '72 L',
    finSetup: 'Single Fin Box (9" Fin included)',
    skill: 'Beginner / Intermediate',
    recommendedWaves: '1–3 ft',
    condition: 'Excellent',
    vanId: 'van-12',
    vanName: 'Van #12',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    availableCount: 3,
    totalInVan: 3,
    personality: 'Easy glide & noserides',
    whyMatch: "The waves are 2–3 ft, clean and soft this morning. The 72L volume will help you glide onto every knee-high peak with effortless paddle speed.",
    pricing: {
      twoHours: 25,
      fourHours: 38,
      fullDay: 48
    },
    deposit: 50,
    protectionFee: 3,
    boardImage: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=400&q=80',
    tag: 'Best Match Today',
    shapeType: 'long'
  },
  {
    id: 'brd-rkw-02',
    code: 'SP-RKW-0081',
    name: "8'0 Boardwalk Soft-Top",
    nickname: 'Beach Cruiser',
    type: 'Soft-Top',
    dimensions: "8'0 × 23 × 3 1/4",
    length: "8'0",
    width: "23\"",
    thickness: "3 1/4\"",
    volume: '82 L',
    finSetup: 'Soft Safety Thruster',
    skill: 'Beginner',
    recommendedWaves: '1–3 ft',
    condition: 'Mint',
    vanId: 'van-12',
    vanName: 'Van #12',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    availableCount: 2,
    totalInVan: 2,
    personality: 'Stable & forgiving for any skill level',
    whyMatch: "Generous 82 liters of soft buoyancy. Maximum wave count and complete safety near the crowded swimming zones.",
    pricing: {
      twoHours: 25,
      fourHours: 36,
      fullDay: 45
    },
    deposit: 40,
    protectionFee: 3,
    boardImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    tag: 'Beginner Friendly',
    shapeType: 'soft'
  },
  {
    id: 'brd-rkw-03',
    code: 'SP-RKW-0074',
    name: "7'2 Sunday Mid",
    nickname: 'Magic Mid-Length',
    type: 'Mid-Length',
    dimensions: "7'2 × 21 1/2 × 2 3/4",
    length: "7'2",
    width: "21 1/2\"",
    thickness: "2 3/4\"",
    volume: '54 L',
    finSetup: '2+1 Performance Setup',
    skill: 'All Levels',
    recommendedWaves: '2–4 ft',
    condition: 'Mint',
    vanId: 'van-12',
    vanName: 'Van #12',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    availableCount: 2,
    totalInVan: 2,
    personality: 'Best all-around pick in waist-high surf',
    whyMatch: "Paddles like a mini longboard but turns crisp off the tail. Outstanding pick for intermediate surfers looking for flow.",
    pricing: {
      twoHours: 28,
      fourHours: 42,
      fullDay: 52
    },
    deposit: 60,
    protectionFee: 3,
    boardImage: 'https://images.unsplash.com/photo-1455729552865-3658a5d39692?auto=format&fit=crop&w=400&q=80',
    tag: 'Quiver Favorite',
    shapeType: 'mid'
  },
  {
    id: 'brd-rkw-04',
    code: 'SP-RKW-0062',
    name: "6'2 Daily Driver",
    nickname: 'Everyday Hybrid Shortboard',
    type: 'Shortboard',
    dimensions: "6'2 × 20 1/2 × 2 5/8",
    length: "6'2",
    width: "20 1/2\"",
    thickness: "2 5/8\"",
    volume: '36 L',
    finSetup: 'FCS II Thruster',
    skill: 'Intermediate',
    recommendedWaves: '2–5 ft',
    condition: 'Excellent',
    vanId: 'van-12',
    vanName: 'Van #12',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    availableCount: 1,
    totalInVan: 1,
    personality: 'Generous volume for punchy beach breaks',
    whyMatch: "Wider outline with low entry rocker. Built specifically for East Coast beach break speed generation.",
    pricing: {
      twoHours: 30,
      fourHours: 45,
      fullDay: 55
    },
    deposit: 75,
    protectionFee: 3,
    boardImage: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=400&q=80',
    tag: 'Performance',
    shapeType: 'short'
  },

  // --- CALIFORNIA (HUNTINGTON & TRESTLES) ---
  {
    id: 'brd-hb-01',
    code: 'SP-HB-0051',
    name: "5'10 Fast Fish",
    nickname: 'Twin Keel Flyer',
    type: 'Fish',
    dimensions: "5'10 × 21 × 2 1/2",
    length: "5'10",
    width: "21\"",
    thickness: "2 1/2\"",
    volume: '35 L',
    finSetup: 'Future Keel Twins',
    skill: 'Intermediate',
    recommendedWaves: '2–5 ft',
    condition: 'Mint',
    vanId: 'van-31',
    vanName: 'Van #31',
    beachId: 'huntington',
    beachName: 'Huntington Beach',
    availableCount: 2,
    totalInVan: 2,
    personality: 'Down-the-line speed machine',
    whyMatch: "Twin keels fly through flat sections. Perfect for Huntington Pier southside reform bowls.",
    pricing: {
      twoHours: 32,
      fourHours: 46,
      fullDay: 58
    },
    deposit: 75,
    protectionFee: 3,
    boardImage: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&w=400&q=80',
    tag: 'Speed Machine',
    shapeType: 'fish'
  },
  {
    id: 'brd-hb-02',
    code: 'SP-HB-0060',
    name: "6'0 Pocket Rocket",
    nickname: 'High-Performance Shortboard',
    type: 'Shortboard',
    dimensions: "6'0 × 19 1/8 × 2 7/16",
    length: "6'0",
    width: "19 1/8\"",
    thickness: "2 7/16\"",
    volume: '30 L',
    finSetup: 'FCS II Reactor Thruster',
    skill: 'Advanced',
    recommendedWaves: '3–6 ft',
    condition: 'Excellent',
    vanId: 'van-31',
    vanName: 'Van #31',
    beachId: 'huntington',
    beachName: 'Huntington Beach',
    availableCount: 2,
    totalInVan: 2,
    personality: 'For punchier waves & vertical turns',
    whyMatch: "Sharp rails and continuous rocker for tight pocket surfing in head-high Huntington sets.",
    pricing: {
      twoHours: 35,
      fourHours: 50,
      fullDay: 62
    },
    deposit: 85,
    protectionFee: 3,
    boardImage: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=400&q=80',
    tag: 'Advanced',
    shapeType: 'short'
  },

  // --- HAWAII (WAIKIKI) ---
  {
    id: 'brd-wk-01',
    code: 'SP-WKK-0096',
    name: "9'6 Waikiki Noserider",
    nickname: 'Diamond Head Cruiser',
    type: 'Longboard',
    dimensions: "9'6 × 23 1/4 × 3 1/8",
    length: "9'6",
    width: "23 1/4\"",
    thickness: "3 1/8\"",
    volume: '80 L',
    finSetup: '10" Pivot Single Fin',
    skill: 'All Levels',
    recommendedWaves: '2–4 ft',
    condition: 'Mint',
    vanId: 'van-61',
    vanName: 'Van #61',
    beachId: 'waikiki',
    beachName: 'Waikiki',
    availableCount: 4,
    totalInVan: 4,
    personality: 'Traditional heavy-glass glide',
    whyMatch: "The gold standard for Waikiki. 80 liters of classic Hawaiian glide for unbroken 150-yard rides.",
    pricing: {
      twoHours: 30,
      fourHours: 44,
      fullDay: 56
    },
    deposit: 50,
    protectionFee: 3,
    boardImage: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=400&q=80',
    tag: 'Waikiki Classic',
    shapeType: 'long'
  }
]

// Visual Board Silhouette component (isolated product representation)
const BoardSilhouette = ({ shape, className = "h-28" }: { shape: 'long' | 'mid' | 'fish' | 'short' | 'soft', className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 240" className="h-full w-auto filter drop-shadow-md select-none transition-transform hover:scale-105">
        <defs>
          <linearGradient id={`boardGrad-${shape}`} x1="0%" y1="0%" x2="100%" y2="100%">
            {shape === 'long' && (
              <>
                <stop offset="0%" stopColor="#FAF7F2" />
                <stop offset="50%" stopColor="#F0ECE1" />
                <stop offset="100%" stopColor="#E2DCCE" />
              </>
            )}
            {shape === 'mid' && (
              <>
                <stop offset="0%" stopColor="#E0F2FE" />
                <stop offset="60%" stopColor="#BAE6FD" />
                <stop offset="100%" stopColor="#7DD3FC" />
              </>
            )}
            {shape === 'fish' && (
              <>
                <stop offset="0%" stopColor="#FEF3C7" />
                <stop offset="60%" stopColor="#FDE68A" />
                <stop offset="100%" stopColor="#F59E0B" />
              </>
            )}
            {shape === 'short' && (
              <>
                <stop offset="0%" stopColor="#F1F5F9" />
                <stop offset="50%" stopColor="#CBD5E1" />
                <stop offset="100%" stopColor="#94A3B8" />
              </>
            )}
            {shape === 'soft' && (
              <>
                <stop offset="0%" stopColor="#ECFDF5" />
                <stop offset="50%" stopColor="#A7F3D0" />
                <stop offset="100%" stopColor="#34D399" />
              </>
            )}
          </linearGradient>
        </defs>

        {/* Board Outline Shapes */}
        {shape === 'long' && (
          <path
            d="M 50,10 C 65,30 68,100 66,190 C 65,220 58,230 50,230 C 42,230 35,220 34,190 C 32,100 35,30 50,10 Z"
            fill={`url(#boardGrad-${shape})`}
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
        )}
        {shape === 'mid' && (
          <path
            d="M 50,15 C 64,35 66,110 64,185 C 62,215 56,225 50,225 C 44,225 38,215 36,185 C 34,110 36,35 50,15 Z"
            fill={`url(#boardGrad-${shape})`}
            stroke="#93C5FD"
            strokeWidth="1.5"
          />
        )}
        {shape === 'fish' && (
          <path
            d="M 50,25 C 68,48 69,115 67,185 C 65,208 62,220 60,222 C 55,223 52,210 50,205 C 48,210 45,223 40,222 C 38,220 35,208 33,185 C 31,115 32,48 50,25 Z"
            fill={`url(#boardGrad-${shape})`}
            stroke="#FBBF24"
            strokeWidth="1.5"
          />
        )}
        {shape === 'short' && (
          <path
            d="M 50,12 C 63,38 64,115 62,185 C 60,212 55,225 50,228 C 45,225 40,212 38,185 C 36,115 37,38 50,12 Z"
            fill={`url(#boardGrad-${shape})`}
            stroke="#94A3B8"
            strokeWidth="1.5"
          />
        )}
        {shape === 'soft' && (
          <path
            d="M 50,10 C 67,28 69,95 67,195 C 66,222 60,232 50,232 C 40,232 34,222 33,195 C 31,95 33,28 50,10 Z"
            fill={`url(#boardGrad-${shape})`}
            stroke="#6EE7B7"
            strokeWidth="1.5"
          />
        )}

        {/* Stringer / Center Line */}
        <line x1="50" y1="18" x2="50" y2={shape === 'fish' ? '203' : '222'} stroke="#64748B" strokeWidth="0.8" opacity="0.6" strokeDasharray={shape === 'soft' ? '2,2' : 'none'} />

        {/* SurfPass Emblem Badge */}
        <circle cx="50" cy="70" r="4.5" fill="#0284C7" opacity="0.85" />
        <path d="M 48,70 Q 50,68 52,70" stroke="#FFFFFF" strokeWidth="0.8" fill="none" />
      </svg>
    </div>
  )
}

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'map' | 'rentals' | 'profile'>('home')
  const [selectedBeach, setSelectedBeach] = useState<Beach | null>(null)
  const [selectedVan, setSelectedVan] = useState<Van | null>(null)
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null)
  
  // Interactive Modals
  const [showCheckout, setShowCheckout] = useState(false)
  const [showRentalPass, setShowRentalPass] = useState<RentalPass | null>(null)
  const [showWhatToRide, setShowWhatToRide] = useState(false)
  const [showSurfNow, setShowSurfNow] = useState(false)
  const [showInfraModal, setShowInfraModal] = useState(false)
  const [showReturnModal, setShowReturnModal] = useState<RentalPass | null>(null)
  const [showTravelerModal, setShowTravelerModal] = useState(false)

  // Recommendation & Ride Selector state
  const [userSkill, setUserSkill] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate')
  const [searchQuery, setSearchQuery] = useState('')
  const [regionFilter, setRegionFilter] = useState<string>('All')
  const [boardTypeFilter, setBoardTypeFilter] = useState<string>('All')

  // Checkout State
  const [checkoutDuration, setCheckoutDuration] = useState<'2h' | '4h' | 'day'>('2h')
  const [paymentMethod, setPaymentMethod] = useState<'USDC' | 'BTC' | 'CARD'>('USDC')
  const [isProcessingTx, setIsProcessingTx] = useState(false)
  const [paymentStage, setPaymentStage] = useState<number>(0) // 0: Idle, 1: Waiting, 2: Detected, 3: Confirming, 4: Confirmed, 5: Ready
  const [showOnchainReceiptDetails, setShowOnchainReceiptDetails] = useState(false)

  // Rentals State
  const [rentals, setRentals] = useState<RentalPass[]>([
    {
      id: 'SP-PASS-7842',
      boardName: "9'0 Dawn Patrol Log",
      boardCode: 'SP-RKW-0092',
      boardType: 'Longboard',
      boardDimensions: "9'0 × 22 3/4 × 3",
      boardVolume: '72 L',
      boardImage: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=400&q=80',
      vanId: 'van-12',
      vanName: 'Van #12',
      vanNickname: 'Rockaway Runner',
      location: 'Rockaway Beach, NY',
      spot: 'Beach 90th Street & Boardwalk',
      startTime: '8:30 AM',
      endTime: '10:30 AM',
      durationLabel: '2 Hours',
      paymentMethod: 'USDC',
      rentalPrice: 28,
      protection: 3,
      deposit: 50,
      depositStatus: 'HELD',
      status: 'ACTIVE',
      txHash: '5K2b...8Nx4',
      createdAt: Date.now() - 34 * 60 * 1000,
      sessionActive: true
    }
  ])

  // Real-time Inventory Tracker (decrement when reserved, restore when returned)
  const [boardInventory, setBoardInventory] = useState<Record<string, number>>({
    'brd-rkw-01': 3,
    'brd-rkw-02': 2,
    'brd-rkw-03': 2,
    'brd-rkw-04': 1,
    'brd-hb-01': 2,
    'brd-hb-02': 2,
    'brd-wk-01': 4
  })

  // Global ESC key to close any active modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showCheckout) setShowCheckout(false)
        else if (showRentalPass) setShowRentalPass(null)
        else if (showReturnModal) setShowReturnModal(null)
        else if (showWhatToRide) setShowWhatToRide(false)
        else if (showSurfNow) setShowSurfNow(false)
        else if (showTravelerModal) setShowTravelerModal(false)
        else if (showInfraModal) setShowInfraModal(false)
        else if (selectedBoard) setSelectedBoard(null)
        else if (selectedVan) setSelectedVan(null)
        else if (selectedBeach) setSelectedBeach(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showCheckout, showRentalPass, showReturnModal, showWhatToRide, showSurfNow, showTravelerModal, showInfraModal, selectedBoard, selectedVan, selectedBeach])

  // Filtered Beaches for Explore
  const filteredBeaches = useMemo(() => {
    return BEACHES.filter(beach => {
      const matchesSearch = 
        beach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        beach.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        beach.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        beach.breakName.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesRegion = regionFilter === 'All' || beach.region === regionFilter
      return matchesSearch && matchesRegion
    })
  }, [searchQuery, regionFilter])

  // Current Beach for Context
  const currentBeach = useMemo(() => {
    return selectedBeach || BEACHES[0] // Rockaway as default demo anchor
  }, [selectedBeach])

  // Recommended Board for "Smart Match" & "Surf Now"
  const recommendedBoard = useMemo(() => {
    if (userSkill === 'Beginner') {
      return BOARDS.find(b => b.id === 'brd-rkw-02') || BOARDS[0]
    }
    if (userSkill === 'Advanced') {
      return BOARDS.find(b => b.id === 'brd-rkw-04') || BOARDS[0]
    }
    return BOARDS.find(b => b.id === 'brd-rkw-01') || BOARDS[0]
  }, [userSkill])

  // Calculate pricing for checkout
  const calculatePricing = (board: Board, duration: '2h' | '4h' | 'day') => {
    const rentalCharge = duration === '2h' 
      ? board.pricing.twoHours 
      : duration === '4h' 
        ? board.pricing.fourHours 
        : board.pricing.fullDay
    const protection = board.protectionFee
    const deposit = board.deposit
    const totalAuth = rentalCharge + protection + deposit
    const netCost = rentalCharge + protection
    return { rentalCharge, protection, deposit, totalAuth, netCost }
  }

  // Handle Board Reservation Action
  const startReservation = (board: Board) => {
    setSelectedBoard(board)
    setShowCheckout(true)
    setPaymentStage(0)
    setIsProcessingTx(false)
  }

  // Execute Tatum-Powered Checkout Animation & Confirmation
  const executePayment = () => {
    if (!selectedBoard) return
    setIsProcessingTx(true)
    setPaymentStage(1) // Waiting for payment

    setTimeout(() => {
      setPaymentStage(2) // Transaction detected via Tatum
      setTimeout(() => {
        setPaymentStage(3) // Confirming on Solana
        setTimeout(() => {
          setPaymentStage(4) // Payment confirmed
          setTimeout(() => {
            // Decrement inventory
            setBoardInventory(prev => ({
              ...prev,
              [selectedBoard.id]: Math.max(0, (prev[selectedBoard.id] || 1) - 1)
            }))

            const pricing = calculatePricing(selectedBoard, checkoutDuration)
            const newPass: RentalPass = {
              id: `SP-PASS-${Math.floor(1000 + Math.random() * 9000)}`,
              boardName: selectedBoard.name,
              boardCode: selectedBoard.code,
              boardType: selectedBoard.type,
              boardDimensions: selectedBoard.dimensions,
              boardVolume: selectedBoard.volume,
              boardImage: selectedBoard.boardImage,
              vanId: selectedBoard.vanId,
              vanName: selectedBoard.vanName,
              vanNickname: selectedBoard.vanId === 'van-12' ? 'Rockaway Runner' : 'Boardwalk Cruiser',
              location: selectedBoard.beachName,
              spot: selectedBoard.vanId === 'van-12' ? 'Beach 90th Street' : 'Beach 67th Street',
              startTime: '8:30 AM',
              endTime: checkoutDuration === '2h' ? '10:30 AM' : checkoutDuration === '4h' ? '12:30 PM' : '6:00 PM',
              durationLabel: checkoutDuration === '2h' ? '2 Hours' : checkoutDuration === '4h' ? '4 Hours' : 'Full Day',
              paymentMethod,
              rentalPrice: pricing.rentalCharge,
              protection: pricing.protection,
              deposit: pricing.deposit,
              depositStatus: 'HELD',
              status: 'ACTIVE',
              txHash: paymentMethod === 'USDC' ? `5K2b...8Nx${Math.floor(10 + Math.random() * 89)}` : undefined,
              createdAt: Date.now(),
              sessionActive: true
            }

            setRentals(prev => [newPass, ...prev])
            setIsProcessingTx(false)
            setShowCheckout(false)
            setShowRentalPass(newPass)
          }, 900)
        }, 1100)
      }, 1000)
    }, 1000)
  }

  // Handle Board Return & Deposit Release
  const confirmBoardReturn = (pass: RentalPass) => {
    setRentals(prev => prev.map(r => {
      if (r.id === pass.id) {
        return {
          ...r,
          status: 'COMPLETED',
          depositStatus: 'REFUNDED',
          sessionActive: false
        }
      }
      return r
    }))
    
    // Restore inventory
    const matchedBoard = BOARDS.find(b => b.code === pass.boardCode)
    if (matchedBoard) {
      setBoardInventory(prev => ({
        ...prev,
        [matchedBoard.id]: (prev[matchedBoard.id] || 0) + 1
      }))
    }

    setShowReturnModal(null)
    if (showRentalPass && showRentalPass.id === pass.id) {
      setShowRentalPass({
        ...showRentalPass,
        status: 'COMPLETED',
        depositStatus: 'REFUNDED',
        sessionActive: false
      })
    }
  }

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* --- TOP HEADER NAVIGATION --- */}
      <header className="sticky top-0 z-40 bg-[#0A0F1D]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              setActiveTab('home')
              setSelectedBeach(null)
              setSelectedVan(null)
              setSelectedBoard(null)
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5 shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0A0F1D] rounded-[10px] flex items-center justify-center">
                <Waves className="w-5 h-5 text-sky-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-sky-300 transition-colors">
                  SurfPass
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-sky-400 border border-slate-700/80">
                  NATIONWIDE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Rent. Surf. Onchain.</p>
            </div>
          </div>

          {/* Center Quick Stats / Demo Location Badge */}
          <div 
            onClick={() => {
              setSelectedBeach(BEACHES[0])
              setActiveTab('home')
            }}
            className="hidden md:flex items-center gap-3 bg-slate-900/90 border border-slate-800 rounded-full px-4 py-1.5 cursor-pointer hover:border-sky-500/50 transition-colors"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>Rockaway Beach, NY</span>
            </div>
            <div className="h-3 w-px bg-slate-700" />
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>2–3 ft • GOOD</span>
            </div>
            <div className="h-3 w-px bg-slate-700" />
            <div className="text-[11px] text-slate-400 font-medium">
              3 Vans • 22 Boards
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Travel Mode quick trigger */}
            <button
              onClick={() => setShowTravelerModal(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-xs font-medium text-slate-300 border border-slate-700/60 transition-colors"
              title="Flying to surf without a board?"
            >
              <Plane className="w-3.5 h-3.5 text-sky-400" />
              <span>Traveling?</span>
            </button>

            {/* Fast Surf Now Button */}
            <button
              onClick={() => setShowSurfNow(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-sky-500/20 active:scale-95 transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
              <span>Surf Now</span>
            </button>

            {/* Tatum Infrastructure Inspector Trigger */}
            <button
              onClick={() => setShowInfraModal(true)}
              className="p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-sky-400 border border-slate-800 transition-colors"
              title="View Tatum Multi-Chain Infrastructure"
            >
              <Activity className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* --- SUBHEADER: FEED STATUS --- */}
      <div className="bg-[#0D1424] border-b border-slate-800/60 px-4 py-1.5 text-xs text-slate-400 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-sky-950/80 text-sky-300 text-[11px] font-semibold border border-sky-800/40">
            <RadioWaveIcon className="w-3 h-3 text-sky-400 animate-pulse" />
            Demo Conditions Feed
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Surfline integration-ready telemetry • Conditions refreshed 4 min ago
          </span>
        </div>
        <div className="text-[11px] text-slate-400 flex items-center gap-3 shrink-0">
          <span>Settlement Rail: <strong className="text-slate-300">Solana USDC & BTC via Tatum</strong></span>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 pb-28 md:pb-12">
        {/* =====================================================================
            TAB 1: HOME (Hero, Smart Match, Good Surf Near You, Van Highlights)
           ===================================================================== */}
        {activeTab === 'home' && !selectedBeach && (
          <div className="space-y-8">
            {/* HERO SECTION */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0E1628] via-[#0A0F1D] to-[#060A14] border border-slate-800 p-6 sm:p-10 shadow-2xl">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
              
              <div className="relative z-10 max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Onchain Mobile Surfboard Rental Network</span>
                </div>
                
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                  Find waves. <br />
                  Find a board. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400">
                    Go surf.
                  </span>
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                  Live surf conditions matched with roaming mobile surfboard rental vans parked right at the sand. 
                  Reserve in 2 taps, pay via USDC or Card, scan your pass, and paddle out.
                </p>

                {/* Hero CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <button
                    onClick={() => {
                      setSelectedBeach(BEACHES[0])
                    }}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm shadow-lg shadow-sky-500/25 active:scale-95 transition-all"
                  >
                    <Compass className="w-4 h-4" />
                    <span>View Rockaway Beach (2–3 ft)</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('explore')}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
                  >
                    <Search className="w-4 h-4 text-slate-400" />
                    <span>Explore All 18 Nationwide Breaks</span>
                  </button>
                </div>
              </div>
            </div>

            {/* --- SMART "BEST MATCH RIGHT NOW" CARD --- */}
            <div className="relative rounded-2xl bg-gradient-to-br from-[#0F1A30] to-[#0A1020] border-2 border-sky-500/40 p-5 sm:p-6 shadow-xl overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-l from-sky-500 to-indigo-600 text-[11px] font-extrabold text-white uppercase tracking-wider rounded-bl-xl shadow-md">
                Smart Match Right Now
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left: Location & Conditions Context */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Peak Window Active</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">Rockaway Beach</h2>
                    <p className="text-xs text-slate-400 font-medium">Beach 90th Street • Queens, NY</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-800/50">
                      2–3 ft • GOOD
                    </span>
                    <span className="text-xs text-slate-400">
                      Best through <strong className="text-slate-200">11:30 AM</strong>
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Cleanest conditions before the afternoon wind shift. Incoming push creating peeling knee-to-waist lines.
                  </p>
                </div>

                {/* Center: Recommended Board Silhouette & Specs */}
                <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-24 h-32 bg-[#060B14] rounded-lg border border-slate-800/80 flex items-center justify-center shrink-0">
                    <BoardSilhouette shape={recommendedBoard.shapeType} className="h-28" />
                  </div>
                  <div className="space-y-1.5 flex-1 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-sky-950 text-sky-400 text-[10px] font-bold border border-sky-800/40">
                      {recommendedBoard.tag}
                    </div>
                    <h3 className="font-extrabold text-white text-base">{recommendedBoard.name}</h3>
                    <p className="text-xs text-slate-400 font-medium">{recommendedBoard.dimensions} • {recommendedBoard.volume}</p>
                    <p className="text-[11px] text-slate-300 line-clamp-2 italic">
                      "{recommendedBoard.whyMatch}"
                    </p>
                    <div className="text-xs font-bold text-sky-400 pt-1">
                      ${recommendedBoard.pricing.twoHours} / 2 hrs • ${recommendedBoard.deposit} refundable deposit
                    </div>
                  </div>
                </div>

                {/* Right: Closest Van & Action CTA */}
                <div className="lg:col-span-3 flex flex-col justify-center space-y-3 bg-[#070D1A] rounded-xl p-4 border border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Closest Van:</span>
                    <span className="font-bold text-white">Van #12 (Rockaway Runner)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Location:</span>
                    <span className="text-slate-300 font-medium">0.2 mi • Beach 90th St</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Inventory:</span>
                    <span className="text-emerald-400 font-bold">{boardInventory['brd-rkw-01'] || 0} longboards ready</span>
                  </div>

                  <div className="pt-2 space-y-2">
                    <button
                      onClick={() => startReservation(recommendedBoard)}
                      className="w-full py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold shadow-md shadow-sky-500/20 active:scale-95 transition-all"
                    >
                      Reserve This Board
                    </button>
                    <button
                      onClick={() => setSelectedBeach(BEACHES[0])}
                      className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                    >
                      View Beach & Forecast
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* --- GOOD SURF NEAR YOU (Beach Cards Grid) --- */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-white">Good Surf Near You</h2>
                  <p className="text-xs text-slate-400">Based on your current region and live demo wave conditions</p>
                </div>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1"
                >
                  <span>View All 18</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {BEACHES.slice(0, 3).map(beach => (
                  <div
                    key={beach.id}
                    className="group rounded-2xl bg-[#0A0F1D] border border-slate-800/80 hover:border-sky-500/40 transition-all duration-200 overflow-hidden flex flex-col shadow-lg"
                  >
                    {/* Beach Photo Header */}
                    <div className="relative h-44 overflow-hidden bg-slate-900">
                      <img
                        src={beach.image}
                        alt={beach.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-transparent to-black/30" />
                      
                      {/* Surf Quality Badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold shadow-md ${
                          beach.quality === 'GOOD'
                            ? 'bg-emerald-500 text-white'
                            : beach.quality === 'FAIR-GOOD'
                              ? 'bg-sky-500 text-white'
                              : 'bg-amber-500 text-slate-950'
                        }`}>
                          {beach.waveHeight} • {beach.quality}
                        </span>
                      </div>

                      {/* Van Count Pill */}
                      <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-slate-200 border border-slate-700/80 flex items-center gap-1.5">
                        <Car className="w-3.5 h-3.5 text-sky-400" />
                        <span>{beach.vanCount} Vans</span>
                      </div>

                      {/* Title over bottom */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                          {beach.name}
                        </h3>
                        <p className="text-xs text-slate-300 font-medium">
                          {beach.breakName} • {beach.city}, {beach.state}
                        </p>
                      </div>
                    </div>

                    {/* Conditions Breakdown with Surf Native Labels */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                          <div className="text-[10px] text-slate-400 font-medium">Wind & Texture</div>
                          <div className="font-bold text-slate-200">{beach.wind}</div>
                          <div className="text-[10px] text-sky-400 font-medium">{beach.windSub}</div>
                        </div>

                        <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                          <div className="text-[10px] text-slate-400 font-medium">Tide & Push</div>
                          <div className="font-bold text-slate-200">{beach.tide}</div>
                          <div className="text-[10px] text-emerald-400 font-medium">{beach.tideSub}</div>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2">
                        {beach.recommendation}
                      </p>

                      {/* Action Row */}
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-300">
                          {beach.boardCount} boards available
                        </span>

                        <button
                          onClick={() => setSelectedBeach(beach)}
                          className="px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold flex items-center gap-1 transition-colors"
                        >
                          <span>View Beach</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* --- MOBILE SURFPASS VAN HIGHLIGHTS --- */}
            <div className="rounded-2xl bg-gradient-to-br from-[#0C1222] to-[#070B14] border border-slate-800 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-wider">
                    <Car className="w-4 h-4" />
                    <span>Mobile SurfPass Fleet</span>
                  </div>
                  <h2 className="text-xl font-black text-white">Roaming Vans at Popular Peaks</h2>
                </div>
                <button
                  onClick={() => setActiveTab('map')}
                  className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1"
                >
                  <span>Open Live Map</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {VANS.slice(0, 3).map(van => (
                  <div 
                    key={van.id}
                    className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">Van {van.fleetNumber}</span>
                          <span className="text-xs text-sky-400 font-semibold italic">"{van.nickname}"</span>
                        </div>
                        <p className="text-xs text-slate-400">{van.spot}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800/50">
                        {van.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-slate-300">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Distance</span>
                        <span className="font-semibold">{van.distance}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Wait Time</span>
                        <span className="font-semibold text-emerald-400">~{van.waitMin} min</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Quiver</span>
                        <span className="font-bold text-sky-400">{van.boardsAvailable} boards</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => {
                          const targetBeach = BEACHES.find(b => b.id === van.beachId) || BEACHES[0]
                          setSelectedBeach(targetBeach)
                          setSelectedVan(van)
                        }}
                        className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors text-center"
                      >
                        View Boards ({van.boardsAvailable})
                      </button>
                      <button
                        onClick={() => {
                          setSelectedVan(van)
                          setActiveTab('map')
                        }}
                        className="p-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 transition-colors"
                        title="Navigate on map"
                      >
                        <Navigation className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            VIEW: BEACH DETAIL PAGE (With Forecast Graph & Van Inventory)
           ===================================================================== */}
        {selectedBeach && (
          <div className="space-y-6">
            {/* Top Return Navigation Breadcrumb */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedBeach(null)
                  setSelectedVan(null)
                  setSelectedBoard(null)
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back to {activeTab === 'explore' ? 'Explore' : 'Home'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowWhatToRide(true)}
                  className="px-3 py-1.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 text-xs font-bold border border-sky-500/30 flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>What Should I Ride?</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedBeach(null)
                    setSelectedVan(null)
                  }}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  title="Close beach view"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Beach Hero Header */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 p-6 sm:p-8">
              <div className="absolute inset-0 opacity-20">
                <img src={selectedBeach.image} alt={selectedBeach.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-[#0A0F1D]/80 to-transparent" />

              <div className="relative z-10 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-white text-xs font-black">
                    {selectedBeach.waveHeight} • {selectedBeach.quality}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                    {selectedBeach.waveDesc}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-sky-950 text-sky-300 text-xs font-semibold border border-sky-800/50">
                    {selectedBeach.skill}
                  </span>
                </div>

                <div>
                  <h1 className="text-3xl sm:text-4xl font-black text-white">{selectedBeach.name}</h1>
                  <p className="text-sm text-slate-300 font-medium">
                    {selectedBeach.breakName} • {selectedBeach.city}, {selectedBeach.state}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  {selectedBeach.description}
                </p>

                {/* 4 Conditions Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="bg-[#0D1424]/90 p-3 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                      <Waves className="w-3 h-3 text-sky-400" />
                      <span>Wave & Swell</span>
                    </div>
                    <div className="text-sm font-black text-white mt-1">{selectedBeach.waveHeight}</div>
                    <div className="text-[11px] text-sky-400 font-medium">{selectedBeach.swell} @ {selectedBeach.swellPeriod}</div>
                    <div className="text-[10px] text-slate-400">{selectedBeach.swellSub}</div>
                  </div>

                  <div className="bg-[#0D1424]/90 p-3 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                      <Wind className="w-3 h-3 text-sky-400" />
                      <span>Wind</span>
                    </div>
                    <div className="text-sm font-black text-white mt-1">{selectedBeach.wind}</div>
                    <div className="text-[11px] text-emerald-400 font-medium">{selectedBeach.windSub}</div>
                    <div className="text-[10px] text-slate-400">{selectedBeach.windMph} mph offshore</div>
                  </div>

                  <div className="bg-[#0D1424]/90 p-3 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                      <Droplets className="w-3 h-3 text-sky-400" />
                      <span>Tide</span>
                    </div>
                    <div className="text-sm font-black text-white mt-1">{selectedBeach.tide}</div>
                    <div className="text-[11px] text-sky-400 font-medium">{selectedBeach.tideSub}</div>
                    <div className="text-[10px] text-slate-400">Incoming push</div>
                  </div>

                  <div className="bg-[#0D1424]/90 p-3 rounded-xl border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                      <Thermometer className="w-3 h-3 text-sky-400" />
                      <span>Water & Air</span>
                    </div>
                    <div className="text-sm font-black text-white mt-1">{selectedBeach.waterTemp} water</div>
                    <div className="text-[11px] text-slate-300 font-medium">{selectedBeach.airTemp} air</div>
                    <div className="text-[10px] text-slate-400">Springsuit / 2mm top</div>
                  </div>
                </div>
              </div>
            </div>

            {/* --- 12-HOUR SURF FORECAST VISUALIZATION GRAPH --- */}
            <div className="rounded-2xl bg-[#0A0F1D] border border-slate-800 p-5 sm:p-6 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-sky-400" />
                    <h2 className="text-base font-black text-white">12-Hour Surf Forecast Curve</h2>
                  </div>
                  <p className="text-xs text-slate-400">Wave height (ft) • Tide push • Wind speed over daylight hours</p>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Best Surf Window: {selectedBeach.bestWindow}</span>
                </div>
              </div>

              {/* Recharts Consumer Surf Forecast Graph */}
              <div className="h-56 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={selectedBeach.hourly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="tideGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#34D399" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#34D399" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    
                    <XAxis 
                      dataKey="time" 
                      stroke="#475569" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={{ stroke: '#334155' }}
                    />
                    <YAxis 
                      stroke="#475569" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={{ stroke: '#334155' }}
                      domain={[0, 6]}
                      unit="ft"
                    />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-[#0B1220] border border-slate-700 p-3 rounded-xl shadow-xl text-xs space-y-1">
                              <div className="font-black text-white">{data.time} Forecast</div>
                              <div className="text-sky-400 font-bold">Wave: {data.heightLabel} ({data.quality})</div>
                              <div className="text-emerald-400 font-medium">Tide: {data.tideFt} ft • {data.periodSec}s period</div>
                              <div className="text-slate-400">Wind: {data.windDir} {data.windSpeed} mph</div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    
                    {/* Highlight Best Window Area */}
                    <ReferenceArea x1="8 AM" x2="11 AM" stroke="#10B981" strokeOpacity={0.2} fill="#10B981" fillOpacity={0.08} />

                    <Area 
                      type="monotone" 
                      dataKey="heightFt" 
                      name="Wave Height (ft)" 
                      stroke="#38BDF8" 
                      strokeWidth={2.5} 
                      fill="url(#waveGradient)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="tideFt" 
                      name="Tide (ft)" 
                      stroke="#34D399" 
                      strokeWidth={1.5} 
                      strokeDasharray="3 3"
                      fill="url(#tideGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Supporting Legend / Annotation */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                    <span>Wave Height</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-1 border-b border-emerald-400 border-dashed" />
                    <span>Tide Level</span>
                  </div>
                </div>
                <div className="text-slate-300 italic">
                  💡 {selectedBeach.bestWindowSub}
                </div>
              </div>
            </div>

            {/* --- VANS POSITIONED AT THIS BEACH --- */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-black text-white">SurfPass Vans Near {selectedBeach.name}</h2>
                  <p className="text-xs text-slate-400">Select a van to view its dedicated board quiver</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {VANS.filter(v => v.beachId === selectedBeach.id).map(van => {
                  const isSelected = selectedVan?.id === van.id
                  return (
                    <div
                      key={van.id}
                      onClick={() => setSelectedVan(van)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-slate-900 border-sky-500 ring-1 ring-sky-500/50 shadow-lg' 
                          : 'bg-[#0A0F1D] border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-base font-black text-white">Van {van.fleetNumber}</span>
                            <span className="text-xs text-sky-400 font-bold italic">"{van.nickname}"</span>
                          </div>
                          <p className="text-xs text-slate-300 font-medium mt-0.5">{van.spot}</p>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-extrabold border border-emerald-800/50">
                          {van.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
                        <div className="bg-[#060A14] p-2 rounded-lg border border-slate-800">
                          <span className="text-[10px] text-slate-500 block">Distance</span>
                          <span className="font-bold text-slate-200">{van.distance}</span>
                        </div>
                        <div className="bg-[#060A14] p-2 rounded-lg border border-slate-800">
                          <span className="text-[10px] text-slate-500 block">Walk Time</span>
                          <span className="font-bold text-slate-200">{van.walkTime}</span>
                        </div>
                        <div className="bg-[#060A14] p-2 rounded-lg border border-slate-800">
                          <span className="text-[10px] text-slate-500 block">Ready Quiver</span>
                          <span className="font-black text-sky-400">{van.boardsAvailable} Boards</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80 text-xs">
                        <span className="text-slate-400">Open {van.hours}</span>
                        <span className="text-sky-400 font-bold flex items-center gap-1">
                          <span>Browse Van Quiver</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* --- VAN QUIVER / BOARD INVENTORY --- */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black text-white">
                      {selectedVan ? `Van ${selectedVan.fleetNumber} Quiver` : `Ready Quiver at ${selectedBeach.name}`}
                    </h2>
                    <span className="text-xs px-2 py-0.5 rounded bg-sky-950 text-sky-400 font-bold border border-sky-800/50">
                      Real-Time Board Inventory
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Select any board to view dimensions, fin setup, and reserve</p>
                </div>

                {/* Quiver Shape Filters */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  {['All', 'Longboard', 'Mid-Length', 'Soft-Top', 'Shortboard', 'Fish'].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setBoardTypeFilter(filter)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                        boardTypeFilter === filter
                          ? 'bg-sky-500 text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Board Cards Grid (With High Quality Silhouettes) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {BOARDS
                  .filter(b => b.beachId === selectedBeach.id || selectedBeach.id === 'rockaway')
                  .filter(b => boardTypeFilter === 'All' || b.type === boardTypeFilter)
                  .map(board => {
                    const available = boardInventory[board.id] ?? board.availableCount
                    return (
                      <div
                        key={board.id}
                        className="rounded-2xl bg-[#0A0F1D] border border-slate-800 hover:border-sky-500/40 p-5 flex flex-col justify-between space-y-4 shadow-lg transition-all"
                      >
                        {/* Board Header & Silhouette */}
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-400">
                                {board.type} • {board.volume}
                              </span>
                              <h3 className="text-base font-extrabold text-white">{board.name}</h3>
                              <p className="text-xs text-slate-400 italic">"{board.personality}"</p>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              available > 0 
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' 
                                : 'bg-rose-950 text-rose-400 border border-rose-800/50'
                            }`}>
                              {available > 0 ? `${available} available` : 'Reserved'}
                            </span>
                          </div>

                          {/* Isolated Product Silhouette Showcase */}
                          <div className="h-36 bg-[#060A14] rounded-xl border border-slate-800/80 p-2 flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />
                            <BoardSilhouette shape={board.shapeType} className="h-32" />
                            <div className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-500">
                              {board.code}
                            </div>
                          </div>

                          {/* Technical Specifications */}
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-[#060B14] p-2 rounded-lg border border-slate-800/80">
                              <span className="text-[10px] text-slate-500 block">Dimensions</span>
                              <span className="font-semibold text-slate-200">{board.dimensions}</span>
                            </div>
                            <div className="bg-[#060B14] p-2 rounded-lg border border-slate-800/80">
                              <span className="text-[10px] text-slate-500 block">Fins</span>
                              <span className="font-semibold text-slate-200">{board.finSetup}</span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-400 line-clamp-2">
                            {board.whyMatch}
                          </p>
                        </div>

                        {/* Pricing Schedule & Action */}
                        <div className="pt-3 border-t border-slate-800 space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <div>
                              <span className="text-base font-black text-white">${board.pricing.twoHours}</span>
                              <span className="text-slate-400"> / 2 hrs</span>
                            </div>
                            <div className="text-right text-[11px] text-slate-400">
                              <div>Full Day: <strong className="text-slate-200">${board.pricing.fullDay}</strong></div>
                              <div>Deposit: <strong className="text-slate-200">${board.deposit}</strong></div>
                            </div>
                          </div>

                          <button
                            onClick={() => startReservation(board)}
                            disabled={available <= 0}
                            className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                              available > 0
                                ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-md shadow-sky-500/20 active:scale-95'
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            }`}
                          >
                            <span>{available > 0 ? 'Reserve Board' : 'Currently Rented'}</span>
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 2: EXPLORE (Nationwide US Surf Map & Break Discovery)
           ===================================================================== */}
        {activeTab === 'explore' && !selectedBeach && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">Explore Nationwide Surf</h1>
              <p className="text-xs sm:text-sm text-slate-400">18 premier American surf breaks with simulated mobile SurfPass van networks</p>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by city, beach, break, or state (e.g. Rockaway, Huntington, Montauk)..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-[#0A0F1D] border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {['All', 'New York', 'New Jersey', 'California', 'Florida', 'Hawaii'].map(reg => (
                  <button
                    key={reg}
                    onClick={() => setRegionFilter(reg)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                      regionFilter === reg
                        ? 'bg-sky-500 text-white'
                        : 'bg-[#0A0F1D] text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredBeaches.map(beach => (
                <div
                  key={beach.id}
                  onClick={() => setSelectedBeach(beach)}
                  className="rounded-2xl bg-[#0A0F1D] border border-slate-800 hover:border-sky-500/40 cursor-pointer overflow-hidden transition-all duration-200 group flex flex-col justify-between shadow-lg"
                >
                  <div className="relative h-44 bg-slate-900 overflow-hidden">
                    <img src={beach.image} alt={beach.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-transparent to-black/30" />
                    
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-500 text-white shadow-md">
                        {beach.waveHeight} • {beach.quality}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-slate-200 border border-slate-700">
                      {beach.vanCount} Vans
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">{beach.name}</h3>
                      <p className="text-xs text-slate-300 font-medium">{beach.city}, {beach.state}</p>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {beach.description}
                    </p>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">{beach.wind}</span>
                      <span className="text-sky-400 font-bold flex items-center gap-1">
                        <span>View Conditions</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 3: MAP (Geographic Coastal Experience for Rockaway & Vans)
           ===================================================================== */}
        {activeTab === 'map' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl font-black text-white">Live Surf & Van GPS Map</h1>
                <p className="text-xs text-slate-400">Rockaway Beach shoreline, active van markers, and board pickup points</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedBeach(BEACHES[0])}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700"
                >
                  Focus Rockaway Beach
                </button>
              </div>
            </div>

            {/* Interactive Geographic Map Canvas */}
            <div className="relative rounded-2xl bg-[#081226] border-2 border-slate-800 h-[480px] w-full overflow-hidden shadow-2xl">
              {/* Simulated Coastal Geography */}
              <div className="absolute inset-0 bg-[#061022]">
                {/* Atlantic Ocean */}
                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[#033055] to-[#0a4878] opacity-70">
                  <div className="absolute top-0 inset-x-0 h-2 bg-sky-400/30 blur-sm" />
                  <div className="absolute top-4 left-1/4 text-[10px] font-bold text-sky-200/50 uppercase tracking-widest">
                    Atlantic Ocean • Clean SE Groundswell
                  </div>
                </div>

                {/* Rockaway Peninsula Landmass */}
                <div className="absolute top-0 inset-x-0 h-1/2 bg-[#121B2E] border-b-4 border-amber-600/40">
                  {/* Street Grids */}
                  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#64748b_1px,transparent_1px),linear-gradient(to_bottom,#64748b_1px,transparent_1px)] [background-size:28px_28px]" />
                  
                  {/* Boardwalk Ribbon */}
                  <div className="absolute bottom-0 inset-x-0 h-2 bg-amber-700/60 border-t border-amber-500/50" />
                  <div className="absolute bottom-3 left-10 text-[10px] font-semibold text-amber-200/60 uppercase tracking-wider">
                    Rockaway Boardwalk & Beach Access
                  </div>

                  {/* Street Labels */}
                  <div className="absolute top-8 left-[45%] -translate-x-1/2 text-[10px] font-bold text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                    Beach 90th Street Peak
                  </div>
                  <div className="absolute top-8 left-[72%] -translate-x-1/2 text-[10px] font-bold text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                    Beach 67th Street Plaza
                  </div>
                </div>
              </div>

              {/* Surf Break Pin 1 (Beach 90th) */}
              <div 
                className="absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                onClick={() => setSelectedBeach(BEACHES[0])}
              >
                <div className="p-2 rounded-full bg-sky-500 text-white shadow-lg shadow-sky-500/50 animate-bounce">
                  <Waves className="w-4 h-4" />
                </div>
                <div className="mt-1 bg-slate-900/90 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white border border-slate-700 whitespace-nowrap">
                  Rockaway 90th (2–3 ft)
                </div>
              </div>

              {/* SurfPass Van Pin 1: Van #12 */}
              <div 
                className="absolute top-[38%] left-[49%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group"
                onClick={() => setSelectedVan(VANS[0])}
              >
                <div className="p-2.5 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-xl shadow-sky-500/50 hover:scale-110 transition-transform ring-2 ring-white">
                  <Car className="w-5 h-5" />
                </div>
                <div className="mt-1 bg-slate-900/95 px-2.5 py-1 rounded-lg text-xs font-bold text-white border border-sky-500 shadow-xl whitespace-nowrap flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Van #12 (8 Boards)</span>
                </div>
              </div>

              {/* SurfPass Van Pin 2: Van #07 */}
              <div 
                className="absolute top-[35%] left-[74%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group"
                onClick={() => setSelectedVan(VANS[1])}
              >
                <div className="p-2 rounded-xl bg-slate-800 text-sky-400 border border-slate-600 hover:scale-110 transition-transform">
                  <Car className="w-4 h-4" />
                </div>
                <div className="mt-1 bg-slate-900/90 px-2 py-0.5 rounded text-[10px] font-bold text-slate-200 border border-slate-700 whitespace-nowrap">
                  Van #07 (9 Boards)
                </div>
              </div>

              {/* User Location Marker */}
              <div className="absolute top-[28%] left-[44%] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
                <div className="w-4 h-4 rounded-full bg-blue-500 ring-4 ring-blue-500/30 animate-pulse" />
                <div className="text-[9px] font-bold text-blue-300 mt-1">You (0.2 mi)</div>
              </div>

              {/* Selected Van Floating Drawer Card */}
              {selectedVan && (
                <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-[#0A0F1D]/95 backdrop-blur-md p-4 rounded-2xl border-2 border-sky-500 shadow-2xl z-40 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-white text-base">Van {selectedVan.fleetNumber}</span>
                        <span className="text-xs text-sky-400 font-bold italic">"{selectedVan.nickname}"</span>
                      </div>
                      <p className="text-xs text-slate-300">{selectedVan.spot}</p>
                    </div>
                    <button
                      onClick={() => setSelectedVan(null)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-[#060A14] p-2 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Distance</span>
                      <span className="font-bold text-slate-200">{selectedVan.distance}</span>
                    </div>
                    <div className="bg-[#060A14] p-2 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Walk Time</span>
                      <span className="font-bold text-slate-200">{selectedVan.walkTime}</span>
                    </div>
                    <div className="bg-[#060A14] p-2 rounded-lg border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Quiver</span>
                      <span className="font-black text-sky-400">{selectedVan.boardsAvailable} Boards</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        const b = BEACHES.find(beach => beach.id === selectedVan.beachId) || BEACHES[0]
                        setSelectedBeach(b)
                      }}
                      className="flex-1 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-colors"
                    >
                      View Boards in Van
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =====================================================================
            TAB 4: RENTALS (Active Sessions, Digital Rental Pass & Return Scanner)
           ===================================================================== */}
        {activeTab === 'rentals' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">My Rentals & Sessions</h1>
                <p className="text-xs sm:text-sm text-slate-400">Digital boarding passes, active timer, and refundable deposit releases</p>
              </div>
            </div>

            {rentals.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#0A0F1D] border border-slate-800 space-y-4">
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                  <Ticket className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white">No Active Rentals</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Check conditions at Rockaway Beach and reserve your first board from Van #12.
                </p>
                <button
                  onClick={() => {
                    setSelectedBeach(BEACHES[0])
                    setActiveTab('home')
                  }}
                  className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold"
                >
                  Browse Quiver
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {rentals.map(pass => (
                  <div
                    key={pass.id}
                    className="p-5 rounded-2xl bg-[#0A0F1D] border-2 border-slate-800 hover:border-slate-700 transition-all shadow-xl space-y-4"
                  >
                    {/* Status Ribbon */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                          pass.status === 'ACTIVE'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                          {pass.status === 'ACTIVE' ? '● ACTIVE SESSION' : 'COMPLETED'}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{pass.id}</span>
                      </div>

                      <div className="text-xs font-semibold text-slate-300">
                        {pass.location}
                      </div>
                    </div>

                    {/* Board & Van Information */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#060B14] p-4 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-18 bg-slate-900 rounded-lg flex items-center justify-center p-1 border border-slate-800">
                          <BoardSilhouette shape="long" className="h-16" />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-white text-base">{pass.boardName}</h3>
                          <p className="text-xs text-slate-400">{pass.boardDimensions} • {pass.boardVolume}</p>
                          <p className="text-xs text-sky-400 font-medium">{pass.vanName} ({pass.vanNickname}) • {pass.spot}</p>
                        </div>
                      </div>

                      <div className="text-right sm:border-l sm:border-slate-800 sm:pl-4">
                        <div className="text-xs text-slate-400">Rental Window</div>
                        <div className="font-black text-white text-sm">{pass.startTime} – {pass.endTime}</div>
                        <div className="text-xs text-emerald-400 font-bold mt-0.5">
                          Deposit: ${pass.deposit} ({pass.depositStatus})
                        </div>
                      </div>
                    </div>

                    {/* Pass Action Buttons */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        onClick={() => setShowRentalPass(pass)}
                        className="flex-1 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold flex items-center justify-center gap-1.5"
                      >
                        <QrCode className="w-4 h-4" />
                        <span>View SurfPass Rental Pass</span>
                      </button>

                      {pass.status === 'ACTIVE' && (
                        <button
                          onClick={() => setShowReturnModal(pass)}
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>Return Board & Release Deposit</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =====================================================================
            TAB 5: PROFILE (Consumer Profile & SurfPass Reputation Score)
           ===================================================================== */}
        {activeTab === 'profile' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* User Profile Header */}
            <div className="rounded-2xl bg-[#0A0F1D] border border-slate-800 p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 p-1">
                  <div className="w-full h-full bg-[#0A0F1D] rounded-full flex items-center justify-center font-black text-2xl text-sky-400">
                    P
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h1 className="text-2xl font-black text-white">Patrick</h1>
                    <span className="px-2 py-0.5 rounded-full bg-sky-950 text-sky-400 text-[10px] font-bold border border-sky-800">
                      Verified Surfer
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">Home Break: Rockaway Beach, NY • Member since 2024</p>
                  <div className="text-xs text-slate-300 font-mono">
                    Solana Wallet: <span className="text-sky-400 font-bold">5K2b...8Nx4</span> (via Phantom)
                  </div>
                </div>
              </div>

              {/* SurfPass Score & Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800">
                <div className="bg-[#060B14] p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">SurfPass Score</span>
                  <div className="text-2xl font-black text-emerald-400 mt-1">94 / 100</div>
                  <span className="text-[10px] text-slate-500">Exceptional Return Trust</span>
                </div>

                <div className="bg-[#060B14] p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Sessions</span>
                  <div className="text-2xl font-black text-white mt-1">17</div>
                  <span className="text-[10px] text-slate-500">Across 6 Beaches</span>
                </div>

                <div className="bg-[#060B14] p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Boards Rented</span>
                  <div className="text-2xl font-black text-white mt-1">12</div>
                  <span className="text-[10px] text-slate-500">100% Deposit Refund Rate</span>
                </div>

                <div className="bg-[#060B14] p-3 rounded-xl border border-slate-800 text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Favorite Shape</span>
                  <div className="text-lg font-black text-sky-400 mt-1">7'2 Mid</div>
                  <span className="text-[10px] text-slate-500">Sunday Mid-Length</span>
                </div>
              </div>
            </div>

            {/* Surfer Fit & Preferences */}
            <div className="rounded-2xl bg-[#0A0F1D] border border-slate-800 p-6 space-y-4">
              <h2 className="text-lg font-black text-white">Surfer Profile & Recommendation Calibration</h2>
              <p className="text-xs text-slate-400">We calibrate board volume and fin suggestions based on your skill and comfort</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {(['Beginner', 'Intermediate', 'Advanced'] as const).map(skill => (
                  <button
                    key={skill}
                    onClick={() => setUserSkill(skill)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      userSkill === skill
                        ? 'bg-sky-500/10 border-sky-500 text-white ring-1 ring-sky-500'
                        : 'bg-[#060B14] border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-xs font-bold">{skill}</div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {skill === 'Beginner' ? 'High volume soft-tops & logs' : skill === 'Intermediate' ? 'Mid-lengths, fish & forgiving logs' : 'Performance shortboards & step-downs'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* --- BOTTOM MOBILE NAVIGATION BAR --- */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#0A0F1D]/95 backdrop-blur-md border-t border-slate-800 py-2 px-6 md:hidden">
        <div className="flex items-center justify-around">
          {[
            { id: 'home', label: 'Home', icon: Waves },
            { id: 'explore', label: 'Explore', icon: Compass },
            { id: 'map', label: 'Map', icon: MapPin },
            { id: 'rentals', label: 'Rentals', icon: Ticket, badge: rentals.filter(r => r.status === 'ACTIVE').length },
            { id: 'profile', label: 'Profile', icon: User }
          ].map(item => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any)
                  setSelectedBeach(null)
                  setSelectedVan(null)
                }}
                className={`flex flex-col items-center gap-1 transition-colors relative ${
                  isActive ? 'text-sky-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge && item.badge > 0 ? (
                    <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] font-black flex items-center justify-center">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <span className="text-[10px] font-semibold">{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>

      {/* =====================================================================
          MODAL 1: CHECKOUT MODAL (Multi-Rail, USDC on Solana, BTC, Card)
         ===================================================================== */}
      {showCheckout && selectedBoard && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0F1D] border-2 border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h2 className="text-xl font-black text-white">Reserve Board</h2>
                <p className="text-xs text-slate-400">{selectedBoard.vanName} • {selectedBoard.beachName}</p>
              </div>
              <button
                onClick={() => setShowCheckout(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Board Selected Snapshot */}
            <div className="flex items-center gap-4 bg-[#060B14] p-3 rounded-2xl border border-slate-800">
              <div className="w-16 h-20 bg-slate-900 rounded-xl flex items-center justify-center p-1 border border-slate-800">
                <BoardSilhouette shape={selectedBoard.shapeType} className="h-16" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">{selectedBoard.name}</h3>
                <p className="text-xs text-slate-400">{selectedBoard.dimensions} • {selectedBoard.volume}</p>
                <p className="text-xs text-sky-400 font-semibold">{selectedBoard.finSetup}</p>
              </div>
            </div>

            {/* Step 1: Select Rental Duration */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                1. Select Rental Duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '2h', label: '2 Hours', price: selectedBoard.pricing.twoHours },
                  { id: '4h', label: '4 Hours', price: selectedBoard.pricing.fourHours },
                  { id: 'day', label: 'Full Day', price: selectedBoard.pricing.fullDay }
                ].map(dur => (
                  <button
                    key={dur.id}
                    onClick={() => setCheckoutDuration(dur.id as any)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      checkoutDuration === dur.id
                        ? 'bg-sky-500/10 border-sky-500 text-white ring-1 ring-sky-500'
                        : 'bg-[#060A14] border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-xs font-bold">{dur.label}</div>
                    <div className="text-sm font-black text-sky-400 mt-0.5">${dur.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Transparent Price Schedule Breakdown */}
            <div className="space-y-2 bg-[#060A14] p-4 rounded-2xl border border-slate-800 text-xs">
              <div className="font-bold text-slate-300">Authorization Breakdown</div>
              {(() => {
                const pricing = calculatePricing(selectedBoard, checkoutDuration)
                return (
                  <div className="space-y-1.5 pt-1 text-slate-400">
                    <div className="flex justify-between">
                      <span>Board Rental ({checkoutDuration === '2h' ? '2 Hours' : checkoutDuration === '4h' ? '4 Hours' : 'Full Day'}):</span>
                      <span className="font-semibold text-slate-200">${pricing.rentalCharge}.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Optional Ding / Fin Protection:</span>
                      <span className="font-semibold text-slate-200">${pricing.protection}.00</span>
                    </div>
                    <div className="flex justify-between text-emerald-400">
                      <span>Refundable Security Deposit:</span>
                      <span className="font-bold">${pricing.deposit}.00 (Held)</span>
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-black text-white">
                      <span>Total Authorized Now:</span>
                      <span className="text-sky-400">
                        {paymentMethod === 'USDC' ? `${pricing.totalAuth} USDC` : `$${pricing.totalAuth}.00`}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 pt-1 italic">
                      * ${pricing.deposit}.00 deposit is instantly released when the board is returned to the van.
                    </p>
                  </div>
                )
              })()}
            </div>

            {/* Step 3: Payment Rail Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                2. Choose Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPaymentMethod('USDC')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'USDC'
                      ? 'bg-sky-500/10 border-sky-500 text-white ring-1 ring-sky-500'
                      : 'bg-[#060A14] border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-[10px] font-bold text-sky-400 uppercase">Recommended</div>
                  <div className="text-xs font-black text-white">USDC on Solana</div>
                  <div className="text-[10px] text-slate-500">Fast • Low fee</div>
                </button>

                <button
                  onClick={() => setPaymentMethod('BTC')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'BTC'
                      ? 'bg-amber-500/10 border-amber-500 text-white ring-1 ring-amber-500'
                      : 'bg-[#060A14] border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-[10px] font-bold text-amber-400 uppercase">Alternative</div>
                  <div className="text-xs font-black text-white">Bitcoin</div>
                  <div className="text-[10px] text-slate-500">Rental in BTC</div>
                </button>

                <button
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    paymentMethod === 'CARD'
                      ? 'bg-slate-700/40 border-slate-400 text-white ring-1 ring-slate-400'
                      : 'bg-[#060A14] border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Traditional</div>
                  <div className="text-xs font-black text-white">Apple Pay / Card</div>
                  <div className="text-[10px] text-slate-500">Standard checkout</div>
                </button>
              </div>
            </div>

            {/* Animated Blockchain Status Indicator during Checkout */}
            {isProcessingTx && (
              <div className="p-4 rounded-2xl bg-sky-950/60 border border-sky-500/50 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-sky-400">
                  <RefreshCw className="w-4 h-4 animate-spin text-sky-400" />
                  <span>
                    {paymentStage === 1 && 'Waiting for payment authorization...'}
                    {paymentStage === 2 && 'Payment detected via Tatum infrastructure'}
                    {paymentStage === 3 && 'Confirming settlement on Solana...'}
                    {paymentStage === 4 && 'Payment confirmed ✓ Reserving board in Van #12'}
                  </span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-sky-400 h-full transition-all duration-500"
                    style={{ width: `${(paymentStage / 4) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Execute Payment Action CTA */}
            <div className="pt-2 space-y-2">
              <button
                onClick={executePayment}
                disabled={isProcessingTx}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-sky-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {isProcessingTx ? (
                  <span>Authorizing onchain...</span>
                ) : (
                  <>
                    <span>Confirm & Authorize {paymentMethod === 'USDC' ? `${calculatePricing(selectedBoard, checkoutDuration).totalAuth} USDC` : `$${calculatePricing(selectedBoard, checkoutDuration).totalAuth}`}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-slate-500">
                Protected by SurfPass Guarantee • 100% Refundable Deposit upon Van Return
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: DIGITAL SURFPASS RENTAL PASS MODAL (Boarding Pass View)
         ===================================================================== */}
      {showRentalPass && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0F1D] border-2 border-sky-500/60 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative overflow-hidden">
            {/* Top Brand & Pass Indicator */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Waves className="w-5 h-5 text-sky-400" />
                <span className="font-black text-white tracking-wider text-sm">SURFPASS RENTAL PASS</span>
              </div>
              <button
                onClick={() => setShowRentalPass(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Boarding Pass Ticket Body */}
            <div className="bg-[#060B14] rounded-2xl border border-slate-800 p-5 space-y-4 text-center relative">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-black border border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{showRentalPass.status === 'ACTIVE' ? 'ACTIVE SURF PASS' : 'COMPLETED SESSION'}</span>
              </div>

              <div>
                <h2 className="text-xl font-black text-white">{showRentalPass.boardName}</h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{showRentalPass.boardCode}</p>
              </div>

              {/* QR Code */}
              <div className="w-36 h-36 bg-white rounded-2xl p-2 mx-auto flex items-center justify-center shadow-lg">
                <QrCode className="w-32 h-32 text-slate-900" />
              </div>
              <p className="text-[10px] text-slate-400">Scan at Van for Instant Pickup / Return</p>

              {/* Location & Time Schedule */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800 text-left">
                <div>
                  <span className="text-[10px] text-slate-500 block">Van Location</span>
                  <span className="font-bold text-white">{showRentalPass.vanName}</span>
                  <span className="text-[10px] text-slate-400 block">{showRentalPass.spot}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Session Time</span>
                  <span className="font-bold text-white">{showRentalPass.startTime} – {showRentalPass.endTime}</span>
                  <span className="text-[10px] text-sky-400 block">{showRentalPass.durationLabel}</span>
                </div>
              </div>

              {/* Onchain Verification Footer */}
              <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800">
                <span>Paid with: <strong className="text-slate-200">{showRentalPass.paymentMethod}</strong></span>
                <span className="text-emerald-400 font-bold">Deposit: ${showRentalPass.deposit} ({showRentalPass.depositStatus})</span>
              </div>
            </div>

            {/* Optional Expandable Onchain Receipt Details */}
            <div className="space-y-2">
              <button
                onClick={() => setShowOnchainReceiptDetails(!showOnchainReceiptDetails)}
                className="w-full text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1 py-1"
              >
                <span>{showOnchainReceiptDetails ? 'Hide' : 'View'} Onchain Settlement Details</span>
                {showOnchainReceiptDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showOnchainReceiptDetails && (
                <div className="p-3 bg-[#060B14] rounded-xl border border-slate-800 text-xs space-y-1 text-slate-400 font-mono">
                  <div className="flex justify-between">
                    <span>Network:</span>
                    <span className="text-slate-200">Solana Mainnet</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Asset:</span>
                    <span className="text-sky-400 font-bold">USDC (EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deposit Hold:</span>
                    <span className="text-emerald-400 font-bold">50.00 USDC</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Monitoring:</span>
                    <span className="text-slate-200">Tatum Real-Time Webhook Gateway</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tx Signature:</span>
                    <span className="text-slate-300 truncate max-w-[160px]">{showRentalPass.txHash || '5K2b9Zx8...mP1q'}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Row */}
            <div className="space-y-2">
              <button
                onClick={() => {
                  setShowRentalPass(null)
                  setActiveTab('map')
                }}
                className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-md"
              >
                Navigate to Van #12
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 3: WHAT SHOULD I RIDE? (AI Surf Match Interaction)
         ===================================================================== */}
      {showWhatToRide && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0F1D] border-2 border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-sky-400" />
                <h2 className="text-lg font-black text-white">What Should I Ride?</h2>
              </div>
              <button
                onClick={() => setShowWhatToRide(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              We combine today's 2–3 ft clean conditions, rising tide push, and nearby van inventory to give you the perfect board.
            </p>

            {/* Recommendation Result Card */}
            <div className="bg-[#060B14] p-4 rounded-2xl border border-sky-500/50 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-14 h-18 bg-slate-900 rounded-lg flex items-center justify-center p-1 border border-slate-800">
                  <BoardSilhouette shape={recommendedBoard.shapeType} className="h-16" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-sky-400 uppercase">Top Match For You</span>
                  <h3 className="font-extrabold text-white text-base">{recommendedBoard.name}</h3>
                  <p className="text-xs text-slate-400">{recommendedBoard.dimensions} • {recommendedBoard.volume}</p>
                </div>
              </div>

              <div className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800 italic">
                "{recommendedBoard.whyMatch}"
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>Available at: <strong className="text-slate-200">Van #12 (0.2 mi)</strong></span>
                <span className="font-black text-sky-400">${recommendedBoard.pricing.twoHours} / 2 hrs</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowWhatToRide(false)
                startReservation(recommendedBoard)
              }}
              className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-md shadow-sky-500/20"
            >
              Reserve Recommended Board
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 4: SURF NOW (One-Tap Fast Path)
         ===================================================================== */}
      {showSurfNow && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0F1D] border-2 border-sky-500 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                <h2 className="text-lg font-black text-white">Surf Now • Fast Lane</h2>
              </div>
              <button
                onClick={() => setShowSurfNow(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-slate-400">Target Break:</div>
              <div className="flex items-center justify-between bg-[#060B14] p-3 rounded-xl border border-slate-800">
                <div>
                  <div className="font-bold text-white text-sm">Rockaway Beach 90th St</div>
                  <div className="text-xs text-emerald-400 font-semibold">2–3 ft • GOOD (Best through 11:30 AM)</div>
                </div>
                <div className="text-xs text-slate-400 font-medium">0.2 mi away</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-slate-400">Assigned Board & Van:</div>
              <div className="flex items-center gap-3 bg-[#060B14] p-3 rounded-xl border border-slate-800">
                <BoardSilhouette shape={recommendedBoard.shapeType} className="h-14" />
                <div>
                  <div className="font-bold text-white text-sm">{recommendedBoard.name}</div>
                  <div className="text-xs text-slate-400">{recommendedBoard.dimensions} • Van #12 (Rockaway Runner)</div>
                  <div className="text-xs text-sky-400 font-bold">${recommendedBoard.pricing.twoHours} / 2 hrs</div>
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  setShowSurfNow(false)
                  startReservation(recommendedBoard)
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-xs shadow-lg shadow-sky-500/25"
              >
                Reserve & Go
              </button>
              <button
                onClick={() => {
                  setShowSurfNow(false)
                  setSelectedBeach(BEACHES[0])
                }}
                className="w-full py-2 text-xs text-slate-400 hover:text-white"
              >
                See Other Quiver Options
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 5: RETURN BOARD & DEPOSIT RELEASE
         ===================================================================== */}
      {showReturnModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0F1D] border-2 border-emerald-500 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-black text-white">Return Board & Release Deposit</h2>
              </div>
              <button
                onClick={() => setShowReturnModal(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#060B14] p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Board:</span>
                <span className="font-bold text-white">{showReturnModal.boardName} ({showReturnModal.boardCode})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Return Location:</span>
                <span className="font-bold text-white">{showReturnModal.vanName} ({showReturnModal.spot})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Board Condition Check:</span>
                <span className="text-emerald-400 font-bold">Good • No Ding / Tail Damage ✓</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-sm">
                <span className="text-white font-bold">Deposit to Release:</span>
                <span className="text-emerald-400 font-black">${showReturnModal.deposit}.00 USDC</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => confirmBoardReturn(showReturnModal)}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs shadow-lg shadow-emerald-500/20"
              >
                Confirm Return & Release ${showReturnModal.deposit} Deposit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 6: TRAVELER SURF USE CASE
         ===================================================================== */}
      {showTravelerModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0F1D] border-2 border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-sky-400" />
                <h2 className="text-lg font-black text-white">Traveling Surfer Mode</h2>
              </div>
              <button
                onClick={() => setShowTravelerModal(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Skip $150 airline surfboard baggage fees. Reserve your board at any destination before you fly, and pick it up directly from our mobile beach van when you land.
            </p>

            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Popular Surf Destinations:</div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'Huntington Beach, CA', break: 'HB Pier', id: 'huntington' },
                  { name: 'Lower Trestles, CA', break: 'Lowers Reef', id: 'trestles' },
                  { name: 'Waikiki, HI', break: 'Queens Reef', id: 'waikiki' },
                  { name: 'Montauk, NY', break: 'Ditch Plains', id: 'montauk' }
                ].map(dest => (
                  <button
                    key={dest.id}
                    onClick={() => {
                      const b = BEACHES.find(beach => beach.id === dest.id)
                      if (b) setSelectedBeach(b)
                      setShowTravelerModal(false)
                    }}
                    className="p-2.5 rounded-xl bg-[#060B14] hover:bg-slate-800 border border-slate-800 text-left transition-colors"
                  >
                    <div className="font-bold text-white text-xs">{dest.name}</div>
                    <div className="text-[10px] text-sky-400">{dest.break}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowTravelerModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 7: TATUM MULTI-CHAIN INFRASTRUCTURE INSPECTOR
         ===================================================================== */}
      {showInfraModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0A0F1D] border-2 border-sky-500 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-sky-400" />
                <h2 className="text-xl font-black text-white">Tatum Infrastructure Architecture</h2>
              </div>
              <button
                onClick={() => setShowInfraModal(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              SurfPass leverages Tatum's multi-chain developer APIs to handle blockchain reads, transactions, payment monitoring, and collateral deposits underneath a clean consumer interface.
            </p>

            {/* Architecture Pipeline Flow */}
            <div className="bg-[#060B14] p-4 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs text-slate-300">
              <div className="font-sans font-bold text-sky-400 text-xs uppercase tracking-wider">Settlement Event Pipeline</div>
              <div className="space-y-1.5 text-[11px] text-slate-400">
                <div className="flex items-center gap-2 text-slate-200">
                  <span className="text-sky-400">1.</span> Surfer authorizes rental in app
                </div>
                <div className="text-slate-600 pl-4">↓</div>
                <div className="flex items-center gap-2 text-slate-200">
                  <span className="text-sky-400">2.</span> Tatum Solana RPC monitors wallet address & token accounts
                </div>
                <div className="text-slate-600 pl-4">↓</div>
                <div className="flex items-center gap-2 text-slate-200">
                  <span className="text-sky-400">3.</span> Real-time blockchain event confirms USDC transfer & deposit lock
                </div>
                <div className="text-slate-600 pl-4">↓</div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <span className="text-emerald-400">4.</span> SurfPass issues digital boarding pass QR & decrements van quiver
                </div>
              </div>
            </div>

            {/* 4 Core Tatum Modules */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-[#060B14] p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <span>RPC Gateway</span>
                </div>
                <p className="text-[10px] text-slate-400">High-throughput Solana & Bitcoin node communication.</p>
              </div>

              <div className="bg-[#060B14] p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Blockchain Data</span>
                </div>
                <p className="text-[10px] text-slate-400">Wallet token balances, deposits & transaction histories.</p>
              </div>

              <div className="bg-[#060B14] p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>Real-Time Events</span>
                </div>
                <p className="text-[10px] text-slate-400">Instant deposit & return detection without polling.</p>
              </div>

              <div className="bg-[#060B14] p-3 rounded-xl border border-slate-800 space-y-1">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Wallet Layer</span>
                </div>
                <p className="text-[10px] text-slate-400">Multi-chain non-custodial & future embedded account support.</p>
              </div>
            </div>

            <button
              onClick={() => setShowInfraModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function RadioWaveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 12h2" />
      <path d="M6 8v8" />
      <path d="M10 4v16" />
      <path d="M14 8v8" />
      <path d="M18 10v4" />
      <path d="M22 12h-2" />
    </svg>
  )
}
