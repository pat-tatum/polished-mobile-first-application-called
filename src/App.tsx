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

// --- DATA DEFINITIONS ---
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
      { time: '8 AM', hourVal: 8, heightFt: 2.3, heightLabel: '2.3 ft', periodSec: 9, tideFt: 2.4, windDir: 'WNW', windSpeed: 6, quality: 'FAIR-GOOD' },
      { time: '9 AM', hourVal: 9, heightFt: 2.5, heightLabel: '2.5 ft', periodSec: 9, tideFt: 3.1, windDir: 'WNW', windSpeed: 6, quality: 'FAIR-GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 2.4, heightLabel: '2.4 ft', periodSec: 8, tideFt: 3.6, windDir: 'NW', windSpeed: 7, quality: 'FAIR-GOOD' },
      { time: '11 AM', hourVal: 11, heightFt: 2.0, heightLabel: '2.0 ft', periodSec: 8, tideFt: 3.8, windDir: 'N', windSpeed: 9, quality: 'FAIR' }
    ],
    lat: 28.3200,
    lng: -80.6076
  },
  {
    id: 'waikiki',
    name: 'Waikiki - Canoes & Queens',
    breakName: 'Canoes Outside Reef',
    city: 'Honolulu',
    state: 'HI',
    region: 'Hawaii',
    waveHeight: '2–4 ft',
    waveDesc: 'Thigh to shoulder high',
    waveSub: 'Endless rolling turquoise waves',
    quality: 'GOOD',
    wind: 'ENE 10 mph gentle trade',
    windSub: 'Pleasant tropical breeze',
    windMph: 10,
    tide: 'Low rising',
    tideSub: 'Shallow tropical reef peeling',
    waterTemp: '79°F',
    airTemp: '83°F',
    swell: 'S 3.0 ft',
    swellSub: 'South Pacific summer groundswell',
    swellPeriod: '13s',
    skill: 'All Levels',
    distance: 'Hawaii Market',
    vanCount: 3,
    boardCount: 30,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    description: 'Long rolling waves and one of the most approachable, iconic longboard environments in the world with Diamond Head views.',
    recommendation: 'Endless peeling rights over the sandy reef. Classic noseriders and easy gliders are trimming all the way to the sand.',
    bestWindow: '7:30 AM – 1:00 PM',
    bestWindowSub: 'Consistent long-period southern lines rolling across the outer reef shelf.',
    hourly: [
      { time: '7 AM', hourVal: 7, heightFt: 2.8, heightLabel: '2.8 ft', periodSec: 13, tideFt: 0.9, windDir: 'ENE', windSpeed: 8, quality: 'GOOD' },
      { time: '8 AM', hourVal: 8, heightFt: 3.2, heightLabel: '3.2 ft', periodSec: 13, tideFt: 1.4, windDir: 'ENE', windSpeed: 9, quality: 'GOOD' },
      { time: '9 AM', hourVal: 9, heightFt: 3.4, heightLabel: '3.4 ft', periodSec: 13, tideFt: 1.8, windDir: 'ENE', windSpeed: 10, quality: 'GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 3.3, heightLabel: '3.3 ft', periodSec: 13, tideFt: 2.1, windDir: 'E', windSpeed: 11, quality: 'GOOD' }
    ],
    lat: 21.2766,
    lng: -157.8275
  }
]

// --- VANS WITH PERSONALITY FLEET NAMES ---
const INITIAL_VANS: Van[] = [
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
    softTops: 1,
    shortboards: 1,
    fish: 1,
    nextLocation: 'Beach 67th St',
    eta: '4:00 PM',
    waitMin: 2,
    lat: 40.5843,
    lng: -73.8164,
    mapX: 42,
    mapY: 62,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-07',
    fleetNumber: 'Van #07',
    nickname: 'Boardwalk Cruiser',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    spot: 'Beach 67th Street Subway Pl',
    status: 'OPEN',
    distance: '0.9 mi',
    walkTime: '12 min walk',
    driveTime: '3 min drive',
    hours: '6:30 AM – 7:00 PM',
    boardsAvailable: 9,
    longboards: 4,
    midsAndFun: 3,
    softTops: 2,
    shortboards: 0,
    fish: 0,
    nextLocation: 'Beach 90th St',
    eta: '5:30 PM',
    waitMin: 3,
    lat: 40.5898,
    lng: -73.7995,
    mapX: 74,
    mapY: 48,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-31',
    fleetNumber: 'Van #31',
    nickname: 'Huntington Nomad',
    beachId: 'huntington',
    beachName: 'Huntington Beach',
    spot: 'Southside Pier Lot 2',
    status: 'OPEN',
    distance: '0.1 mi',
    walkTime: '2 min walk',
    driveTime: '1 min drive',
    hours: '6:00 AM – 8:00 PM',
    boardsAvailable: 14,
    longboards: 3,
    midsAndFun: 4,
    softTops: 2,
    shortboards: 3,
    fish: 2,
    waitMin: 1,
    lat: 33.6595,
    lng: -117.9988,
    mapX: 50,
    mapY: 55,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-45',
    fleetNumber: 'Van #45',
    nickname: 'Cocoa Cruiser',
    beachId: 'cocoa-beach',
    beachName: 'Cocoa Beach',
    spot: 'Meade Ave Pier Access',
    status: 'OPEN',
    distance: '0.3 mi',
    walkTime: '4 min walk',
    driveTime: '1 min drive',
    hours: '7:00 AM – 7:00 PM',
    boardsAvailable: 10,
    longboards: 4,
    midsAndFun: 3,
    softTops: 3,
    shortboards: 0,
    fish: 0,
    waitMin: 2,
    lat: 28.3200,
    lng: -80.6076,
    mapX: 45,
    mapY: 50,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-61',
    fleetNumber: 'Van #61',
    nickname: 'Waikiki Nomad',
    beachId: 'waikiki',
    beachName: 'Waikiki - Canoes & Queens',
    spot: 'Kalakaua Boardwalk Turnout',
    status: 'OPEN',
    distance: '0.1 mi',
    walkTime: '2 min walk',
    driveTime: '1 min drive',
    hours: '6:30 AM – 7:30 PM',
    boardsAvailable: 12,
    longboards: 6,
    midsAndFun: 3,
    softTops: 3,
    shortboards: 0,
    fish: 0,
    waitMin: 1,
    lat: 21.2766,
    lng: -157.8275,
    mapX: 52,
    mapY: 58,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80'
  }
]

// --- BOARDS WITH PRECISE SPECS ---
const INITIAL_BOARDS: Board[] = [
  {
    id: 'b-01',
    code: 'SP-RKW-0092',
    name: "9'0 Dawn Patrol Log",
    nickname: 'Classic Noserider',
    type: 'Longboard',
    dimensions: "9'0 × 22 3/4 × 3",
    length: "9'0",
    width: '22 3/4"',
    thickness: '3"',
    volume: '72 L',
    finSetup: 'Single Fin Box (9.5" Hatchet)',
    skill: 'Beginner / Intermediate',
    recommendedWaves: '1–4 ft soft & clean waves',
    condition: 'Excellent',
    vanId: 'van-12',
    vanName: 'SurfPass Van #12',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    availableCount: 3,
    totalInVan: 3,
    personality: 'Easy glide & noseriding',
    whyMatch: "The waves are 2–3 ft, clean and soft this morning. The 72L volume and wide nose help you glide effortlessly through flatter sections without bogging down.",
    pricing: { twoHours: 25, fourHours: 38, fullDay: 48 },
    deposit: 50,
    protectionFee: 3,
    tag: 'Best for Today',
    shapeType: 'long'
  },
  {
    id: 'b-02',
    code: 'SP-RKW-0072',
    name: "7'2 Sunday Mid",
    nickname: 'Mid-Length Cruiser',
    type: 'Mid-Length',
    dimensions: "7'2 × 21 1/2 × 2 3/4",
    length: "7'2",
    width: '21 1/2"',
    thickness: '2 3/4"',
    volume: '54 L',
    finSetup: '2+1 (7" Center + FCS Sidebites)',
    skill: 'All Levels',
    recommendedWaves: '2–5 ft peeling lines',
    condition: 'Mint',
    vanId: 'van-12',
    vanName: 'SurfPass Van #12',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    availableCount: 3,
    totalInVan: 3,
    personality: 'Best all-around pick',
    whyMatch: 'Smooth paddle power with rail sensitivity. Perfect for surfers wanting maneuverability without sacrificing wave count on the rising tide.',
    pricing: { twoHours: 28, fourHours: 42, fullDay: 54 },
    deposit: 60,
    protectionFee: 3,
    tag: 'Popular',
    shapeType: 'mid'
  },
  {
    id: 'b-03',
    code: 'SP-RKW-0080',
    name: "8'0 Boardwalk Soft-Top",
    nickname: 'Beach Cruiser',
    type: 'Soft-Top',
    dimensions: "8'0 × 22 1/2 × 3 1/8",
    length: "8'0",
    width: '22 1/2"',
    thickness: '3 1/8"',
    volume: '82 L',
    finSetup: 'Safe Flexible Thruster (Tri-Fin)',
    skill: 'Beginner',
    recommendedWaves: '1–3 ft gentle waves',
    condition: 'Excellent',
    vanId: 'van-12',
    vanName: 'SurfPass Van #12',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    availableCount: 1,
    totalInVan: 2,
    personality: 'Stable & forgiving',
    whyMatch: 'Ultra-stable platform with soft deck construction. The easiest board to pop up and catch whitewash or green waves with zero stress.',
    pricing: { twoHours: 22, fourHours: 32, fullDay: 42 },
    deposit: 40,
    protectionFee: 2,
    tag: 'Beginner Friendly',
    shapeType: 'soft'
  },
  {
    id: 'b-04',
    code: 'SP-RKW-0058',
    name: "5'10 Fast Fish",
    nickname: 'Twin Keel Flyer',
    type: 'Fish',
    dimensions: "5'10 × 20 3/4 × 2 9/16",
    length: "5'10",
    width: '20 3/4"',
    thickness: '2 9/16"',
    volume: '36 L',
    finSetup: 'Twin Keel (Futures K2)',
    skill: 'Intermediate',
    recommendedWaves: '2–5 ft punchy faces',
    condition: 'Mint',
    vanId: 'van-12',
    vanName: 'SurfPass Van #12',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    availableCount: 1,
    totalInVan: 1,
    personality: 'Fast & skatey down the line',
    whyMatch: 'High speed across flatter wave sections. The wide swallow tail generates maximum velocity on waist-to-chest high waves.',
    pricing: { twoHours: 30, fourHours: 45, fullDay: 58 },
    deposit: 75,
    protectionFee: 4,
    tag: 'Speed Machine',
    shapeType: 'fish'
  },
  {
    id: 'b-05',
    code: 'SP-RKW-0060',
    name: "6'0 Pocket Rocket",
    nickname: 'Daily Driver Shortboard',
    type: 'Shortboard',
    dimensions: "6'0 × 19 1/4 × 2 3/8",
    length: "6'0",
    width: '19 1/4"',
    thickness: '2 3/8"',
    volume: '31 L',
    finSetup: 'Thruster (FCS II Performer)',
    skill: 'Advanced',
    recommendedWaves: '3–6 ft steep & punchy',
    condition: 'Mint',
    vanId: 'van-12',
    vanName: 'SurfPass Van #12',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach',
    availableCount: 0,
    totalInVan: 1,
    personality: 'High-performance responsiveness',
    whyMatch: 'Aggressive rocker and tight rails for steep beach-break pockets and vertical maneuvers.',
    pricing: { twoHours: 32, fourHours: 48, fullDay: 60 },
    deposit: 100,
    protectionFee: 5,
    tag: 'Performance',
    shapeType: 'short'
  },
  {
    id: 'b-06',
    code: 'SP-HB-0062',
    name: "6'2 Daily Driver",
    nickname: 'Pier Ripper',
    type: 'Shortboard',
    dimensions: "6'2 × 19 1/2 × 2 1/2",
    length: "6'2",
    width: '19 1/2"',
    thickness: '2 1/2"',
    volume: '33 L',
    finSetup: 'Thruster / Quad Convertible',
    skill: 'Advanced',
    recommendedWaves: '3–6 ft punchy waves',
    condition: 'Mint',
    vanId: 'van-31',
    vanName: 'SurfPass Van #31',
    beachId: 'huntington',
    beachName: 'Huntington Beach',
    availableCount: 3,
    totalInVan: 3,
    personality: 'For punchier waves',
    whyMatch: 'Engineered for high-speed turns and steep drops under the pier runway.',
    pricing: { twoHours: 30, fourHours: 45, fullDay: 58 },
    deposit: 80,
    protectionFee: 4,
    tag: 'HB Choice',
    shapeType: 'short'
  },
  {
    id: 'b-07',
    code: 'SP-WAI-0096',
    name: "9'6 Waikiki Noserider",
    nickname: 'Island Glider',
    type: 'Longboard',
    dimensions: "9'6 × 23 1/4 × 3 1/4",
    length: "9'6",
    width: '23 1/4"',
    thickness: '3 1/4"',
    volume: '86 L',
    finSetup: 'Single Fin Pivot (10.0")',
    skill: 'All Levels',
    recommendedWaves: '1–3 ft rolling reef peelers',
    condition: 'Mint',
    vanId: 'van-61',
    vanName: 'SurfPass Van #61',
    beachId: 'waikiki',
    beachName: 'Waikiki - Canoes & Queens',
    availableCount: 4,
    totalInVan: 4,
    personality: 'Endless cross-stepping trim',
    whyMatch: 'The quintessential Hawaiian single-fin. Trims across turquoise reef flats for 200+ yard rides.',
    pricing: { twoHours: 28, fourHours: 42, fullDay: 55 },
    deposit: 60,
    protectionFee: 3,
    tag: 'Island Classic',
    shapeType: 'long'
  }
]

// --- BOARD SILHOUETTES ---
const BoardSilhouette: React.FC<{
  shapeType: 'long' | 'mid' | 'fish' | 'short' | 'soft'
  className?: string
}> = ({ shapeType, className = 'w-16 h-40' }) => {
  if (shapeType === 'long') {
    return (
      <svg viewBox="0 0 100 280" className={className}>
        <defs>
          <linearGradient id="gradLong" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="stripeLong" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#818cf8" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path d="M 50 10 C 65 30 76 80 76 150 C 76 220 68 260 50 270 C 32 260 24 220 24 150 C 24 80 35 30 50 10 Z" fill="url(#gradLong)" stroke="#475569" strokeWidth="2" />
        <line x1="50" y1="12" x2="50" y2="268" stroke="#e2e8f0" strokeWidth="1.5" strokeOpacity="0.4" />
        <rect x="48" y="40" width="4" height="190" rx="2" fill="url(#stripeLong)" />
        <ellipse cx="50" cy="245" rx="2" ry="6" fill="#64748b" />
      </svg>
    )
  }
  if (shapeType === 'mid') {
    return (
      <svg viewBox="0 0 100 260" className={className}>
        <defs>
          <linearGradient id="gradMid" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#2d3748" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>
        <path d="M 50 15 C 68 45 74 95 74 150 C 74 205 65 240 50 248 C 35 240 26 205 26 150 C 26 95 32 45 50 15 Z" fill="url(#gradMid)" stroke="#475569" strokeWidth="2" />
        <line x1="50" y1="18" x2="50" y2="245" stroke="#38bdf8" strokeWidth="2" strokeOpacity="0.8" />
        <ellipse cx="50" cy="150" rx="16" ry="28" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="1" />
      </svg>
    )
  }
  if (shapeType === 'fish') {
    return (
      <svg viewBox="0 0 100 240" className={className}>
        <defs>
          <linearGradient id="gradFish" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>
        <path d="M 50 18 C 72 45 78 95 78 145 C 78 185 70 215 72 225 C 65 220 58 208 50 208 C 42 208 35 220 28 225 C 30 215 22 185 22 145 C 22 95 28 45 50 18 Z" fill="url(#gradFish)" stroke="#475569" strokeWidth="2" />
        <line x1="50" y1="20" x2="50" y2="208" stroke="#cbd5e1" strokeWidth="1.5" strokeOpacity="0.5" />
        <polygon points="50,60 62,90 38,90" fill="#a855f7" fillOpacity="0.4" />
        <circle cx="36" cy="195" r="3" fill="#a855f7" />
        <circle cx="64" cy="195" r="3" fill="#a855f7" />
      </svg>
    )
  }
  if (shapeType === 'soft') {
    return (
      <svg viewBox="0 0 100 270" className={className}>
        <defs>
          <linearGradient id="gradSoft" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>
        <path d="M 50 12 C 68 35 77 85 77 150 C 77 215 68 252 50 260 C 32 252 23 215 23 150 C 23 85 32 35 50 12 Z" fill="url(#gradSoft)" stroke="#bae6fd" strokeWidth="2" />
        <rect x="30" y="60" width="40" height="8" rx="4" fill="#ffffff" fillOpacity="0.6" />
        <rect x="30" y="80" width="40" height="8" rx="4" fill="#ffffff" fillOpacity="0.6" />
        <line x1="50" y1="14" x2="50" y2="258" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.4" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 100 240" className={className}>
      <defs>
        <linearGradient id="gradShort" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="50%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
      </defs>
      <path d="M 50 10 C 66 40 72 90 72 145 C 72 195 62 225 50 232 C 38 225 28 195 28 145 C 28 90 34 40 50 10 Z" fill="url(#gradShort)" stroke="#475569" strokeWidth="2" />
      <line x1="50" y1="12" x2="50" y2="230" stroke="#f43f5e" strokeWidth="2" strokeOpacity="0.8" />
      <polygon points="50,45 60,65 40,65" fill="#f43f5e" fillOpacity="0.5" />
    </svg>
  )
}

// --- MAIN APPLICATION COMPONENT ---
export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'map' | 'rentals' | 'profile'>('home')
  
  const [selectedRegion, setSelectedRegion] = useState<string>('All')
  const [selectedBeach, setSelectedBeach] = useState<Beach>(BEACHES[0])
  const [selectedVan, setSelectedVan] = useState<Van>(INITIAL_VANS[0])
  const [selectedBoard, setSelectedBoard] = useState<Board>(INITIAL_BOARDS[0])
  
  const [vans, setVans] = useState<Van[]>(INITIAL_VANS)
  const [boards, setBoards] = useState<Board[]>(INITIAL_BOARDS)
  
  const [showBeachModal, setShowBeachModal] = useState(false)
  const [showVanModal, setShowVanModal] = useState(false)
  const [showBoardModal, setShowBoardModal] = useState(false)
  const [showReserveModal, setShowReserveModal] = useState(false)
  const [showPassModal, setShowPassModal] = useState(false)
  const [showInfraModal, setShowInfraModal] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showRideRecommender, setShowRideRecommender] = useState(false)
  const [showTravelerModal, setShowTravelerModal] = useState(false)
  
  const [rentalDuration, setRentalDuration] = useState<'2hr' | '4hr' | 'full'>('2hr')
  const [paymentRail, setPaymentRail] = useState<'USDC' | 'BTC' | 'CARD'>('USDC')
  const [paymentStep, setPaymentStep] = useState<'SELECT' | 'WAITING' | 'DETECTED' | 'CONFIRMING' | 'CONFIRMED'>('SELECT')
  const [showOnchainDetails, setShowOnchainDetails] = useState(false)
  const [createdPass, setCreatedPass] = useState<RentalPass | null>(null)
  
  const [returningPassId, setReturningPassId] = useState<string | null>(null)
  const [returnStep, setReturnStep] = useState<'READY' | 'SCANNING' | 'RETURNED' | 'RELEASING' | 'RELEASED'>('READY')
  
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  
  const [rentals, setRentals] = useState<RentalPass[]>([
    {
      id: 'SP-RKW-7F3A92',
      boardName: "9'0 Dawn Patrol Log",
      boardCode: 'SP-RKW-0092',
      boardType: 'Longboard',
      boardDimensions: "9'0 × 22 3/4 × 3",
      boardVolume: '72 L',
      vanId: 'van-12',
      vanName: 'SurfPass Van #12',
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
      txHash: '5UxQ...9mKz',
      createdAt: Date.now() - 3600000 * 1.5,
      sessionActive: true
    }
  ])

  const [viewingPass, setViewingPass] = useState<RentalPass | null>(rentals[0])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowBeachModal(false)
        setShowVanModal(false)
        setShowBoardModal(false)
        setShowReserveModal(false)
        setShowPassModal(false)
        setShowInfraModal(false)
        setShowWalletModal(false)
        setShowRideRecommender(false)
        setShowTravelerModal(false)
        setReturningPassId(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const filteredBeaches = useMemo(() => {
    if (selectedRegion === 'All') return BEACHES
    return BEACHES.filter(b => b.region === selectedRegion)
  }, [selectedRegion])

  const currentPricing = useMemo(() => {
    if (!selectedBoard) return { rental: 25, protection: 3, deposit: 50, total: 78 }
    let rental = selectedBoard.pricing.twoHours
    if (rentalDuration === '4hr') rental = selectedBoard.pricing.fourHours
    if (rentalDuration === 'full') rental = selectedBoard.pricing.fullDay
    const protection = selectedBoard.protectionFee
    const deposit = selectedBoard.deposit
    const total = rental + protection + deposit
    return { rental, protection, deposit, total }
  }, [selectedBoard, rentalDuration])

  const handleConnectWallet = () => {
    setWalletConnected(true)
    setWalletAddress('7xKp...4wL9')
    setShowWalletModal(false)
  }

  const handleDisconnectWallet = () => {
    setWalletConnected(false)
    setWalletAddress('')
    setShowWalletModal(false)
  }

  const handleStartCheckout = () => {
    if (paymentRail === 'CARD') {
      setPaymentStep('WAITING')
      setTimeout(() => {
        setPaymentStep('CONFIRMED')
        finishReservation('CARD')
      }, 1500)
      return
    }

    setPaymentStep('WAITING')
    setTimeout(() => {
      setPaymentStep('DETECTED')
      setTimeout(() => {
        setPaymentStep('CONFIRMING')
        setTimeout(() => {
          setPaymentStep('CONFIRMED')
          finishReservation(paymentRail)
        }, 1200)
      }, 1400)
    }, 1200)
  }

  const finishReservation = (method: 'USDC' | 'BTC' | 'CARD') => {
    const newPassId = `SP-${selectedBeach.id.slice(0, 3).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    const newPass: RentalPass = {
      id: newPassId,
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
      startTime: '10:15 AM',
      endTime: rentalDuration === '2hr' ? '12:15 PM' : rentalDuration === '4hr' ? '2:15 PM' : '6:00 PM',
      durationLabel: rentalDuration === '2hr' ? '2 Hours' : rentalDuration === '4hr' ? '4 Hours' : 'Full Day',
      paymentMethod: method,
      rentalPrice: currentPricing.rental + currentPricing.protection,
      protection: currentPricing.protection,
      deposit: currentPricing.deposit,
      depositStatus: 'HELD',
      status: 'ACTIVE',
      txHash: method === 'USDC' ? '8mZq...5tLp' : method === 'BTC' ? '3a2f...c9b1' : undefined,
      createdAt: Date.now(),
      sessionActive: true
    }

    setBoards(prev => prev.map(b => {
      if (b.id === selectedBoard.id) {
        return { ...b, availableCount: Math.max(0, b.availableCount - 1) }
      }
      return b
    }))

    setVans(prev => prev.map(v => {
      if (v.id === selectedVan.id) {
        return { ...v, boardsAvailable: Math.max(0, v.boardsAvailable - 1) }
      }
      return v
    }))

    setRentals(prev => [newPass, ...prev])
    setCreatedPass(newPass)
    setViewingPass(newPass)
    setShowReserveModal(false)
    setShowPassModal(true)
    setPaymentStep('SELECT')
  }

  const handleReturnBoard = (passId: string) => {
    setReturningPassId(passId)
    setReturnStep('SCANNING')
    setTimeout(() => {
      setReturnStep('RETURNED')
      setTimeout(() => {
        setReturnStep('RELEASING')
        setTimeout(() => {
          setReturnStep('RELEASED')
          setRentals(prev => prev.map(r => {
            if (r.id === passId) {
              return { ...r, depositStatus: 'REFUNDED', status: 'COMPLETED', sessionActive: false }
            }
            return r
          }))
          setBoards(prev => prev.map(b => {
            return { ...b, availableCount: Math.min(b.totalInVan, b.availableCount + 1) }
          }))
          setVans(prev => prev.map(v => {
            return { ...v, boardsAvailable: v.boardsAvailable + 1 }
          }))
        }, 1400)
      }, 1000)
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 font-sans antialiased pb-24 md:pb-12">
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#07090E]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Waves className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-white">SurfPass</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/50 hidden sm:inline-block">FLEET</span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-0.5 hidden xs:block">Rent the perfect board for today’s surf</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-[#0F141E] p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'home' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'explore' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Explore
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'map' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Live Map
            </button>
            <button
              onClick={() => setActiveTab('rentals')}
              className={`px-3 py-1.5 rounded-lg transition relative ${
                activeTab === 'rentals' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Rentals
              {rentals.filter(r => r.status === 'ACTIVE').length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 text-[9px] font-bold bg-cyan-400 text-black rounded-full">
                  {rentals.filter(r => r.status === 'ACTIVE').length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'profile' ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Profile
            </button>
          </nav>

          {/* Action Buttons: Tatum Infra & Connect Wallet */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowInfraModal(true)}
              title="View Tatum Multi-Chain Infrastructure"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0F141E] hover:bg-slate-800 border border-slate-800 hover:border-purple-500/50 text-xs text-purple-300 font-medium transition shadow-sm"
            >
              <Zap className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span className="hidden sm:inline">Tatum Infra</span>
            </button>

            <button
              onClick={() => setShowWalletModal(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition shadow-sm ${
                walletConnected
                  ? 'bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 hover:bg-cyan-900/60'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-600/20'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>{walletConnected ? walletAddress : 'Connect Wallet'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            {/* HERO */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-b from-[#0F1420] to-[#07090E] p-6 sm:p-10 shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
              
              <div className="max-w-2xl space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Nationwide Mobile Surfboard Rental Network</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                  Rent the perfect board for today’s surf.
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Live surf conditions, nearby mobile rental vans, and instant reservations. Pay with USDC on Solana, Bitcoin, or Apple Pay.
                </p>

                <p className="text-xs font-medium text-cyan-400/80 tracking-wide uppercase">
                  Find waves. Find a board. Go surf.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedBeach(BEACHES[0])
                      setShowBeachModal(true)
                    }}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition transform active:scale-95"
                  >
                    <Waves className="w-4 h-4" />
                    <span>View Today’s Waves</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveTab('explore')}
                    className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-sm transition flex items-center gap-2"
                  >
                    <Compass className="w-4 h-4 text-purple-400" />
                    <span>Explore All Beaches</span>
                  </button>

                  <button
                    onClick={() => setShowTravelerModal(true)}
                    className="px-4 py-3 rounded-xl bg-[#121824] hover:bg-slate-800 border border-cyan-900/40 text-cyan-300 font-semibold text-xs transition flex items-center gap-1.5"
                  >
                    <Plane className="w-3.5 h-3.5" />
                    <span>Traveling?</span>
                  </button>
                </div>
              </div>
            </div>

            {/* BEST MATCH RIGHT NOW */}
            <div className="rounded-2xl border border-cyan-800/40 bg-gradient-to-br from-[#0D1422] via-[#0B0F17] to-[#0A0D14] p-5 sm:p-6 shadow-xl relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wider text-cyan-400">Best Match Right Now</h3>
                    <p className="text-xs text-slate-400">Automated surf condition & nearby van inventory match</p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-800/60 text-emerald-400 font-bold">
                  Optimal: 8:30 AM – 11:30 AM
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0F1420] p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>Location & Surf</span>
                      <span className="text-emerald-400 font-bold">GOOD</span>
                    </div>
                    <h4 className="text-base font-bold text-white">Rockaway Beach, NY</h4>
                    <p className="text-xs text-cyan-300 font-medium mt-0.5">2–3 ft • Clean peeling lines</p>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                      NW 6 mph light offshore with rising tide. Cleanest before afternoon wind shift.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedBeach(BEACHES[0])
                      setShowBeachModal(true)
                    }}
                    className="mt-3 text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                  >
                    <span>View Forecast Details</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="bg-[#0F1420] p-4 rounded-xl border border-slate-800 flex gap-3">
                  <div className="w-12 h-24 bg-slate-900/80 rounded-lg flex items-center justify-center p-1 border border-slate-800">
                    <BoardSilhouette shapeType="long" className="w-8 h-20" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-purple-400">Recommended Board</span>
                      <h4 className="text-sm font-bold text-white">9'0 Dawn Patrol Log</h4>
                      <p className="text-xs text-slate-400">72 L • Single Fin • 1–4 ft</p>
                      <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                        Extra volume glides through softer morning sandbar waves effortlessly.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-cyan-400 mt-1">$25 / 2 hours</span>
                  </div>
                </div>

                <div className="bg-[#0F1420] p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                      <span>Nearest Mobile Van</span>
                      <span className="text-emerald-400 font-bold">OPEN</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">SurfPass Van #12</h4>
                    <p className="text-xs text-purple-300 font-medium">Rockaway Runner • Beach 90th St</p>
                    <p className="text-xs text-slate-400 mt-1">0.2 mi away • 3 longboards ready now</p>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedBoard(boards[0])
                        setSelectedVan(vans[0])
                        setShowReserveModal(true)
                      }}
                      className="flex-1 py-2 px-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md transition text-center"
                    >
                      Reserve Board ($25)
                    </button>
                    <button
                      onClick={() => {
                        setSelectedVan(vans[0])
                        setShowVanModal(true)
                      }}
                      className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
                    >
                      Van Quiver
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* GOOD SURF NEAR YOU */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black tracking-tight text-white">Good Surf Near You</h2>
                  <p className="text-xs text-slate-400">Real-time condition forecasts with active mobile van fleets</p>
                </div>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>See all {BEACHES.length} breaks</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {BEACHES.slice(0, 3).map((beach) => (
                  <div
                    key={beach.id}
                    className="group rounded-2xl border border-slate-800 bg-[#0D121D] hover:border-slate-700 transition overflow-hidden shadow-lg flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={beach.image}
                          alt={beach.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0D121D] via-transparent to-black/40" />
                        
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-white border border-white/10">
                            {beach.region}
                          </span>
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-black ${
                              beach.quality === 'GOOD'
                                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                                : 'bg-amber-500 text-black'
                            }`}
                          >
                            {beach.quality} • {beach.waveHeight}
                          </span>
                        </div>

                        <div className="absolute bottom-2 left-3 right-3">
                          <h3 className="text-lg font-black text-white leading-tight">{beach.name}</h3>
                          <p className="text-xs text-slate-300">{beach.breakName} • {beach.city}, {beach.state}</p>
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <div className="grid grid-cols-3 gap-2 text-center bg-[#090C12] p-2.5 rounded-xl border border-slate-800/80">
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase">Wave</span>
                            <span className="text-xs font-bold text-cyan-400">{beach.waveHeight}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase">Wind</span>
                            <span className="text-xs font-bold text-purple-400">{beach.windMph} mph</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 block uppercase">Water</span>
                            <span className="text-xs font-bold text-slate-200">{beach.waterTemp}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-300 px-1">
                          <div className="flex items-center gap-1.5 text-cyan-400 font-medium">
                            <Car className="w-3.5 h-3.5" />
                            <span>{beach.vanCount} SurfPass vans nearby</span>
                          </div>
                          <span className="text-purple-300 font-semibold">{beach.boardCount} boards ready</span>
                        </div>

                        <p className="text-xs text-slate-400 line-clamp-2">
                          {beach.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedBeach(beach)
                          setShowBeachModal(true)
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition text-center"
                      >
                        View Conditions
                      </button>
                      <button
                        onClick={() => {
                          const van = vans.find(v => v.beachId === beach.id) || vans[0]
                          setSelectedBeach(beach)
                          setSelectedVan(van)
                          setShowVanModal(true)
                        }}
                        className="py-2 px-3 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 font-bold text-xs transition"
                      >
                        Find Board
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WHAT SHOULD I RIDE BANNER */}
            <div className="rounded-2xl border border-purple-800/40 bg-gradient-to-r from-[#140F24] via-[#0E121E] to-[#0A1624] p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 text-[11px] font-bold">
                  <Zap className="w-3 h-3 text-purple-400" />
                  <span>Instant Quiver Match</span>
                </div>
                <h3 className="text-xl font-black text-white">Not sure which board to ride today?</h3>
                <p className="text-xs text-slate-300 max-w-lg">
                  Our recommendation engine pairs real-time wave period, wind, tide, and your skill level with immediately available boards in nearby vans.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedBeach(BEACHES[0])
                  setShowRideRecommender(true)
                }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-purple-600/30 flex items-center gap-2 whitespace-nowrap transition transform active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>What Should I Ride?</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: EXPLORE */}
        {activeTab === 'explore' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">Nationwide Surf Discovery</h2>
                <p className="text-xs text-slate-400">Explore active surf breaks and mobile surfboard vans across all major US surf regions</p>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {['All', 'New York', 'New Jersey', 'California', 'Florida', 'Hawaii'].map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                      selectedRegion === region
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow'
                        : 'bg-[#0F141E] text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBeaches.map((beach) => (
                <div
                  key={beach.id}
                  className="rounded-2xl border border-slate-800 bg-[#0D121D] hover:border-slate-700 transition overflow-hidden shadow-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img src={beach.image} alt={beach.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D121D] via-transparent to-black/40" />
                      
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 backdrop-blur-md text-white border border-white/10">
                          {beach.state}
                        </span>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-black ${
                            beach.quality === 'GOOD'
                              ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                              : 'bg-amber-500 text-black'
                          }`}
                        >
                          {beach.quality} • {beach.waveHeight}
                        </span>
                      </div>

                      <div className="absolute bottom-2 left-3 right-3">
                        <h3 className="text-lg font-black text-white leading-tight">{beach.name}</h3>
                        <p className="text-xs text-slate-300">{beach.breakName}</p>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-3 gap-2 text-center bg-[#090C12] p-2.5 rounded-xl border border-slate-800/80">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Wave</span>
                          <span className="text-xs font-bold text-cyan-400">{beach.waveHeight}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Wind</span>
                          <span className="text-xs font-bold text-purple-400">{beach.windMph} mph</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase">Swell</span>
                          <span className="text-xs font-bold text-slate-200">{beach.swellPeriod}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2">
                        {beach.description}
                      </p>

                      <div className="flex items-center justify-between text-xs text-slate-300 pt-1 border-t border-slate-800/60">
                        <span className="text-cyan-400 font-medium">{beach.vanCount} active vans</span>
                        <span className="text-purple-300 font-medium">{beach.boardCount} boards available</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedBeach(beach)
                        setShowBeachModal(true)
                      }}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition text-center"
                    >
                      12h Forecast
                    </button>
                    <button
                      onClick={() => {
                        const van = vans.find(v => v.beachId === beach.id) || vans[0]
                        setSelectedBeach(beach)
                        setSelectedVan(van)
                        setShowVanModal(true)
                      }}
                      className="py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs transition"
                    >
                      Browse Van
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: LIVE MAP */}
        {activeTab === 'map' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-black tracking-tight text-white">Live Van Fleet Map</h2>
                <p className="text-xs text-slate-400">Real-time GPS tracking of mobile rental vans and live beach break conditions</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400 animate-ping" />
                  <span>SurfPass Van</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                  <span>Surf Break</span>
                </span>
              </div>
            </div>

            <div className="relative rounded-3xl border border-slate-800 bg-[#0B0F19] overflow-hidden h-[540px] shadow-2xl">
              <svg className="w-full h-full object-cover" viewBox="0 0 1000 600">
                <defs>
                  <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#061325" />
                    <stop offset="100%" stopColor="#020b17" />
                  </linearGradient>
                  <linearGradient id="sandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1a2436" />
                    <stop offset="100%" stopColor="#101726" />
                  </linearGradient>
                </defs>

                <rect width="1000" height="600" fill="url(#waterGrad)" />
                <path d="M 0 0 L 1000 0 L 1000 280 C 850 260 700 310 550 330 C 400 350 200 310 0 340 Z" fill="url(#sandGrad)" stroke="#2e3d56" strokeWidth="2" />
                <path d="M 0 325 C 200 295 400 335 550 315 C 700 295 850 245 1000 265" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.4" />
                <line x1="220" y1="100" x2="220" y2="320" stroke="#334155" strokeWidth="1" strokeOpacity="0.4" />
                <line x1="420" y1="80" x2="420" y2="330" stroke="#334155" strokeWidth="1" strokeOpacity="0.4" />
                <line x1="740" y1="100" x2="740" y2="290" stroke="#334155" strokeWidth="1" strokeOpacity="0.4" />
                <text x="225" y="150" fill="#64748b" fontSize="11" fontFamily="sans-serif">Beach 92nd St</text>
                <text x="425" y="150" fill="#64748b" fontSize="11" fontFamily="sans-serif">Beach 90th St</text>
                <text x="745" y="150" fill="#64748b" fontSize="11" fontFamily="sans-serif">Beach 67th St</text>
                <text x="80" y="520" fill="#0284c7" fontSize="18" fontWeight="bold" fillOpacity="0.2" fontFamily="sans-serif">ATLANTIC OCEAN</text>
              </svg>

              <div
                className="absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                onClick={() => {
                  setSelectedBeach(BEACHES[0])
                  setShowBeachModal(true)
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="px-2 py-1 rounded-md bg-purple-900/90 border border-purple-500 text-[10px] font-bold text-purple-200 shadow-lg mb-1 whitespace-nowrap">
                    Rockaway 90th • 2–3 ft GOOD
                  </div>
                  <div className="w-7 h-7 rounded-full bg-purple-600 border-2 border-white flex items-center justify-center text-white shadow-lg shadow-purple-600/50 group-hover:scale-110 transition">
                    <Waves className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div
                className="absolute top-[42%] left-[42%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                onClick={() => {
                  setSelectedVan(vans[0])
                  setShowVanModal(true)
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="px-2.5 py-1 rounded-md bg-cyan-950/95 border border-cyan-400 text-xs font-bold text-cyan-300 shadow-xl mb-1 whitespace-nowrap flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Van #12 (8 boards ready)</span>
                  </div>
                  <div className="relative">
                    <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 border-2 border-white flex items-center justify-center text-white shadow-xl shadow-cyan-500/50 group-hover:scale-110 transition">
                      <Car className="w-5 h-5" />
                    </div>
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-black animate-pulse" />
                  </div>
                </div>
              </div>

              <div
                className="absolute top-[38%] left-[74%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                onClick={() => {
                  setSelectedVan(vans[1])
                  setShowVanModal(true)
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="px-2 py-1 rounded-md bg-slate-900/90 border border-slate-700 text-[11px] font-bold text-slate-200 shadow-lg mb-1 whitespace-nowrap">
                    Van #07 (9 boards ready)
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-slate-800 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-lg group-hover:scale-110 transition">
                    <Car className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 max-w-md mx-auto bg-[#0A0E18]/95 backdrop-blur-md border border-slate-800 p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-xs">
                    #12
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">SurfPass Van #12 — Rockaway Runner</h4>
                    <p className="text-[11px] text-cyan-300 font-medium">Beach 90th St • 0.2 mi away (3 min walk)</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedVan(vans[0])
                    setShowVanModal(true)
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition whitespace-nowrap"
                >
                  View Boards
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: RENTALS */}
        {activeTab === 'rentals' && (
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h2 className="text-2xl font-black tracking-tight text-white">My Rentals & Active Passes</h2>
              <p className="text-xs text-slate-400">Manage active surfboard sessions, digital rental passes, and refundable deposits</p>
            </div>

            {rentals.length === 0 ? (
              <div className="rounded-2xl border border-slate-800 bg-[#0F1420] p-12 text-center space-y-4">
                <Ticket className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">No active rentals right now</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Browse nearby mobile vans and reserve a board in seconds with USDC on Solana, BTC, or Apple Pay.
                </p>
                <button
                  onClick={() => setActiveTab('home')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs shadow-md"
                >
                  Rent a Board
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {rentals.map((pass) => (
                  <div
                    key={pass.id}
                    className="rounded-2xl border border-cyan-800/40 bg-gradient-to-b from-[#0F1524] to-[#0A0D15] p-5 shadow-xl space-y-4"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-700/60 flex items-center justify-center text-cyan-400">
                          <Ticket className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">SurfPass Rental Pass</span>
                          <h4 className="text-sm font-black text-white">{pass.id}</h4>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {pass.status === 'ACTIVE' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 border border-emerald-700 text-emerald-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                            SESSION ACTIVE
                          </span>
                        )}
                        {pass.status === 'COMPLETED' && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300">
                            RETURNED & SETTLED
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Board Model</span>
                        <span className="font-bold text-white block truncate">{pass.boardName}</span>
                        <span className="text-[10px] text-slate-400">{pass.boardVolume} • {pass.boardType}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Van Location</span>
                        <span className="font-bold text-white block truncate">{pass.vanNickname}</span>
                        <span className="text-[10px] text-cyan-300">{pass.spot}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Rental Window</span>
                        <span className="font-bold text-white block">{pass.startTime} – {pass.endTime}</span>
                        <span className="text-[10px] text-slate-400">{pass.durationLabel}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Security Deposit</span>
                        <span className={`font-bold block ${pass.depositStatus === 'HELD' ? 'text-amber-400' : 'text-emerald-400'}`}>
                          ${pass.deposit} {pass.depositStatus === 'HELD' ? 'HELD' : 'RELEASED ✓'}
                        </span>
                        <span className="text-[10px] text-slate-400">Paid via {pass.paymentMethod}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
                      <button
                        onClick={() => {
                          setViewingPass(pass)
                          setShowPassModal(true)
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center justify-center gap-1.5"
                      >
                        <QrCode className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Show Rental Pass QR</span>
                      </button>

                      {pass.status === 'ACTIVE' && (
                        <button
                          onClick={() => handleReturnBoard(pass.id)}
                          className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5 shadow-md"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Return Board & Release ${pass.deposit} Deposit</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PROFILE */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-[#0F1420] p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-cyan-500/20">
                  P
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Patrick</h3>
                  <p className="text-xs text-slate-400">Home Break: Rockaway Beach, NY</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px] font-bold">
                      Intermediate Surfer
                    </span>
                    <span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[10px] font-bold">
                      SurfPass Score 94/100
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center bg-[#090C12] p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Sessions</span>
                  <span className="text-base font-extrabold text-white">17</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Boards Rented</span>
                  <span className="text-base font-extrabold text-cyan-400">12</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Beaches Visited</span>
                  <span className="text-base font-extrabold text-purple-400">6</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#0F1420] p-6 shadow-xl space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Payment & Wallet Rails</h4>
              
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-[#090C12] border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-950 flex items-center justify-center text-cyan-400">
                      <Wallet className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Solana Wallet (USDC)</span>
                      <span className="text-[10px] text-slate-400">{walletConnected ? walletAddress : 'Not connected'}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowWalletModal(true)}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 transition"
                  >
                    {walletConnected ? 'Manage' : 'Connect'}
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-[#090C12] border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-950 flex items-center justify-center text-amber-400">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Bitcoin Payment Rail</span>
                      <span className="text-[10px] text-slate-400">Settled via Tatum Blockchain Gateway</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* PERSISTENT BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#07090E]/95 backdrop-blur-lg border-t border-slate-800/90 py-2 px-4">
        <div className="max-w-md mx-auto flex items-center justify-between text-[11px] font-semibold">
          <button
            onClick={() => {
              setActiveTab('home')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className={`flex flex-col items-center gap-1 transition ${
              activeTab === 'home' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Waves className="w-5 h-5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('explore')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className={`flex flex-col items-center gap-1 transition ${
              activeTab === 'explore' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span>Explore</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('map')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className={`flex flex-col items-center gap-1 transition ${
              activeTab === 'map' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span>Live Map</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('rentals')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className={`flex flex-col items-center gap-1 relative transition ${
              activeTab === 'rentals' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Ticket className="w-5 h-5" />
            <span>Rentals</span>
            {rentals.filter(r => r.status === 'ACTIVE').length > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-cyan-400 text-black text-[9px] font-black rounded-full flex items-center justify-center">
                {rentals.filter(r => r.status === 'ACTIVE').length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('profile')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className={`flex flex-col items-center gap-1 transition ${
              activeTab === 'profile' ? 'text-cyan-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
        </div>
      </div>

      {/* MODAL 1: BEACH DETAIL */}
      {showBeachModal && selectedBeach && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0D121D] border border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-8">
            <div className="relative h-56 overflow-hidden">
              <img src={selectedBeach.image} alt={selectedBeach.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D121D] via-black/40 to-transparent" />
              
              <button
                onClick={() => setShowBeachModal(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 left-4 right-4">
                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-500 text-black">
                  {selectedBeach.quality} • {selectedBeach.waveHeight}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">{selectedBeach.name}</h2>
                <p className="text-xs text-slate-300">{selectedBeach.breakName} • {selectedBeach.city}, {selectedBeach.state}</p>
              </div>
            </div>

            <div className="p-5 space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center bg-[#07090E] p-3 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Wave Height</span>
                  <span className="text-base font-extrabold text-white">{selectedBeach.waveHeight}</span>
                  <span className="text-[10px] text-cyan-400 block">{selectedBeach.waveSub}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Wind</span>
                  <span className="text-base font-extrabold text-white">{selectedBeach.windMph} mph</span>
                  <span className="text-[10px] text-purple-400 block">{selectedBeach.windSub}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Tide</span>
                  <span className="text-base font-extrabold text-white">{selectedBeach.tide}</span>
                  <span className="text-[10px] text-slate-400 block">{selectedBeach.tideSub}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Water Temp</span>
                  <span className="text-base font-extrabold text-white">{selectedBeach.waterTemp}</span>
                  <span className="text-[10px] text-emerald-400 block">Air {selectedBeach.airTemp}</span>
                </div>
              </div>

              <div className="bg-[#07090E] p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    12-Hour Wave Height & Forecast Curve
                  </span>
                  <span className="text-[11px] text-emerald-400 font-semibold">
                    Best Window: {selectedBeach.bestWindow}
                  </span>
                </div>

                <div className="h-36 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={selectedBeach.hourly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="waveCurve" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} />
                      <YAxis stroke="#475569" fontSize={10} tickLine={false} domain={[0, 'dataMax + 1']} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }}
                        formatter={(val: number) => [`${val} ft`, 'Wave Height']}
                      />
                      <Area type="monotone" dataKey="heightFt" stroke="#06b6d4" strokeWidth={2.5} fill="url(#waveCurve)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-[11px] text-slate-400 text-center">
                  {selectedBeach.bestWindowSub}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  SurfPass Vans at {selectedBeach.name}
                </h4>
                
                <div className="space-y-2">
                  {vans.filter(v => v.beachId === selectedBeach.id).map(van => (
                    <div
                      key={van.id}
                      className="p-3.5 rounded-xl bg-[#07090E] border border-slate-800 hover:border-slate-700 transition flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 flex items-center justify-center font-bold text-xs">
                          {van.fleetNumber.replace('Van ', '')}
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-white">{van.fleetNumber} — {van.nickname}</h5>
                          <p className="text-[11px] text-slate-400">{van.spot} • {van.distance} ({van.walkTime})</p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedVan(van)
                          setShowBeachModal(false)
                          setShowVanModal(true)
                        }}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs transition whitespace-nowrap"
                      >
                        View {van.boardsAvailable} Boards
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#07090E] border-t border-slate-800/80 flex justify-between items-center">
              <button
                onClick={() => setShowBeachModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowBeachModal(false)
                  setShowRideRecommender(true)
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>What Should I Ride?</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: VAN QUIVER */}
      {showVanModal && selectedVan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0D121D] border border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-8">
            <div className="p-5 bg-gradient-to-r from-[#0F1524] to-[#0A0D15] border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">{selectedVan.fleetNumber} — {selectedVan.nickname}</h3>
                  <p className="text-xs text-cyan-300 font-medium">{selectedVan.spot} • {selectedVan.distance} ({selectedVan.walkTime})</p>
                </div>
              </div>
              <button
                onClick={() => setShowVanModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-1 border-b border-slate-800">
                <span>Available Quiver ({selectedVan.boardsAvailable} boards ready)</span>
                <span>Operating {selectedVan.hours}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {boards.filter(b => b.vanId === selectedVan.id).map(board => (
                  <div
                    key={board.id}
                    className="p-4 rounded-2xl bg-[#07090E] border border-slate-800 flex flex-col justify-between space-y-3"
                  >
                    <div className="flex gap-3">
                      <div className="w-12 h-28 bg-slate-900/90 rounded-xl flex items-center justify-center p-1 border border-slate-800/80">
                        <BoardSilhouette shapeType={board.shapeType} className="w-8 h-24" />
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] uppercase font-bold text-cyan-400 block">{board.type}</span>
                        <h4 className="text-sm font-bold text-white leading-tight">{board.name}</h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">{board.dimensions} • {board.volume}</p>
                        <p className="text-[10px] text-purple-300 mt-1">{board.finSetup}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-black text-cyan-400 block">${board.pricing.twoHours} / 2h</span>
                        <span className="text-[10px] text-slate-400">+${board.deposit} deposit</span>
                      </div>
                      <button
                        disabled={board.availableCount === 0}
                        onClick={() => {
                          setSelectedBoard(board)
                          setShowVanModal(false)
                          setShowReserveModal(true)
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                          board.availableCount > 0
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        {board.availableCount > 0 ? 'Reserve' : 'Reserved'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-[#07090E] border-t border-slate-800/80 flex justify-end">
              <button
                onClick={() => setShowVanModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: CHECKOUT */}
      {showReserveModal && selectedBoard && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0D121D] border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative my-8">
            <div className="p-5 bg-gradient-to-r from-[#0F1524] to-[#0A0D15] border-b border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-cyan-400">Instant Reservation</span>
                <h3 className="text-lg font-black text-white">Reserve {selectedBoard.name}</h3>
              </div>
              <button
                onClick={() => {
                  setShowReserveModal(false)
                  setPaymentStep('SELECT')
                }}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">Select Rental Duration</label>
                <div className="grid grid-cols-3 gap-2">
                  {[ 
                    { id: '2hr', label: '2 Hours', price: selectedBoard.pricing.twoHours },
                    { id: '4hr', label: '4 Hours', price: selectedBoard.pricing.fourHours },
                    { id: 'full', label: 'Full Day', price: selectedBoard.pricing.fullDay }
                  ].map(d => (
                    <button
                      key={d.id}
                      onClick={() => setRentalDuration(d.id as any)}
                      className={`p-2.5 rounded-xl border text-center transition ${
                        rentalDuration === d.id
                          ? 'bg-cyan-950/80 border-cyan-500 text-white'
                          : 'bg-[#07090E] border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xs font-bold block">{d.label}</span>
                      <span className="text-[11px] text-cyan-400 font-semibold">${d.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#07090E] p-3.5 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Board Rental ({rentalDuration === '2hr' ? '2 Hours' : rentalDuration === '4hr' ? '4 Hours' : 'Full Day'})</span>
                  <span className="font-semibold text-white">${currentPricing.rental}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Damage & Ding Protection</span>
                  <span className="font-semibold text-white">${currentPricing.protection}</span>
                </div>
                <div className="flex justify-between text-amber-400 font-medium">
                  <span>Refundable Security Deposit</span>
                  <span>${currentPricing.deposit} (Returned at drop-off)</span>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between font-black text-sm text-white">
                  <span>Total Authorization</span>
                  <span className="text-cyan-400">${currentPricing.total}</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-2">Choose Payment Method</label>
                <div className="space-y-2">
                  <div
                    onClick={() => setPaymentRail('USDC')}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      paymentRail === 'USDC'
                        ? 'bg-cyan-950/60 border-cyan-400 text-white'
                        : 'bg-[#07090E] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-900/80 flex items-center justify-center text-cyan-300 font-black text-xs">
                        $
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">USDC on Solana</span>
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-400 text-black">RECOMMENDED</span>
                        </div>
                        <span className="text-[10px] text-slate-400">Instant settlement via Tatum multi-chain gateway</span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-cyan-400">{currentPricing.total} USDC</span>
                  </div>

                  <div
                    onClick={() => setPaymentRail('BTC')}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      paymentRail === 'BTC'
                        ? 'bg-amber-950/60 border-amber-400 text-white'
                        : 'bg-[#07090E] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-900/80 flex items-center justify-center text-amber-300 font-black text-xs">
                        ₿
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">Bitcoin (BTC)</span>
                        <span className="text-[10px] text-slate-400">Tatum mempool monitoring</span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-amber-400">0.00078 BTC</span>
                  </div>

                  <div
                    onClick={() => setPaymentRail('CARD')}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      paymentRail === 'CARD'
                        ? 'bg-purple-950/60 border-purple-400 text-white'
                        : 'bg-[#07090E] border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-900/80 flex items-center justify-center text-purple-300">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">Credit Card / Apple Pay</span>
                        <span className="text-[10px] text-slate-400">Traditional consumer payment rail</span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-white">${currentPricing.total}</span>
                  </div>
                </div>
              </div>

              {paymentStep !== 'SELECT' && (
                <div className="p-4 rounded-xl bg-[#07090E] border border-cyan-500/50 space-y-2 text-center animate-fadeIn">
                  {paymentStep === 'WAITING' && (
                    <div className="space-y-1">
                      <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin mx-auto" />
                      <p className="text-xs font-bold text-white">Waiting for payment broadcast...</p>
                      <p className="text-[10px] text-slate-400">Listening on Tatum node listener</p>
                    </div>
                  )}
                  {paymentStep === 'DETECTED' && (
                    <div className="space-y-1">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mx-auto animate-bounce" />
                      <p className="text-xs font-bold text-cyan-300">Transaction detected via Tatum</p>
                      <p className="text-[10px] text-slate-400">Routing through Solana validator network</p>
                    </div>
                  )}
                  {paymentStep === 'CONFIRMING' && (
                    <div className="space-y-1">
                      <Activity className="w-5 h-5 text-purple-400 animate-pulse mx-auto" />
                      <p className="text-xs font-bold text-purple-300">Confirming on Solana block finality...</p>
                      <p className="text-[10px] text-slate-400">Deposit held in escrow lock</p>
                    </div>
                  )}
                  {paymentStep === 'CONFIRMED' && (
                    <div className="space-y-1">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" />
                      <p className="text-xs font-bold text-emerald-400">Payment confirmed ✓</p>
                      <p className="text-[10px] text-slate-400">SurfPass Rental Pass generated!</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="p-4 bg-[#07090E] border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => setShowReserveModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition"
              >
                Cancel
              </button>

              <button
                onClick={handleStartCheckout}
                disabled={paymentStep !== 'SELECT'}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 transition disabled:opacity-50"
              >
                {paymentRail === 'USDC' ? `Pay ${currentPricing.total} USDC` : paymentRail === 'BTC' ? 'Pay with Bitcoin' : `Pay $${currentPricing.total}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: RENTAL PASS */}
      {showPassModal && viewingPass && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-gradient-to-b from-[#0D1526] to-[#080B12] border border-cyan-500/40 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative my-8">
            <div className="p-5 bg-gradient-to-r from-cyan-900/60 to-blue-900/60 border-b border-cyan-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-400 text-black flex items-center justify-center font-black">
                  <Waves className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] uppercase font-black tracking-widest text-cyan-300 block">DIGITAL RENTAL PASS</span>
                  <h3 className="text-sm font-black text-white">{viewingPass.id}</h3>
                </div>
              </div>
              <button
                onClick={() => setShowPassModal(false)}
                className="w-8 h-8 rounded-full bg-black/50 hover:bg-black text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Board Model</span>
                  <h4 className="text-base font-black text-white">{viewingPass.boardName}</h4>
                  <p className="text-xs text-cyan-400 font-medium">{viewingPass.boardDimensions} • {viewingPass.boardVolume}</p>
                </div>
                <div className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 border border-emerald-700 text-emerald-400">
                  ACTIVE PASS
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-[#06080F] p-3 rounded-2xl border border-slate-800">
                <div>
                  <span className="text-slate-400 block text-[10px]">Pickup Location</span>
                  <span className="font-bold text-white block">{viewingPass.location}</span>
                  <span className="text-[10px] text-cyan-300">{viewingPass.spot}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Van</span>
                  <span className="font-bold text-white block">{viewingPass.vanNickname}</span>
                  <span className="text-[10px] text-purple-300">{viewingPass.vanName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Session Window</span>
                  <span className="font-bold text-white block">{viewingPass.startTime} – {viewingPass.endTime}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Security Deposit</span>
                  <span className="font-bold text-amber-400 block">${viewingPass.deposit} HELD</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center space-y-2 shadow-xl">
                <QrCode className="w-36 h-36 text-black" />
                <p className="text-[11px] font-mono font-bold text-slate-800 text-center">
                  Scan at {viewingPass.vanName} to pick up board
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={() => setShowOnchainDetails(!showOnchainDetails)}
                  className="w-full flex items-center justify-between text-xs text-slate-400 hover:text-white transition py-1"
                >
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-purple-400" />
                    Onchain Settlement Details
                  </span>
                  {showOnchainDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showOnchainDetails && (
                  <div className="mt-2 p-3 rounded-xl bg-[#06080F] border border-slate-800 text-xs space-y-1 font-mono text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Network:</span>
                      <span className="text-cyan-400">Solana Mainnet</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Settlement Rail:</span>
                      <span className="text-purple-300">Tatum Multi-Chain Gateway</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tx Signature:</span>
                      <span className="text-white">{viewingPass.txHash || '5UxQ...9mKz'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Deposit Escrow:</span>
                      <span className="text-amber-400">50 USDC Verified</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-[#06080F] border-t border-slate-800 flex gap-2">
              <button
                onClick={() => {
                  setShowPassModal(false)
                  setActiveTab('map')
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Navigate to Van</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: WHAT SHOULD I RIDE */}
      {showRideRecommender && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0D121D] border border-slate-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative my-8">
            <div className="p-5 bg-gradient-to-r from-purple-900/60 to-cyan-900/60 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-black text-white">What Should I Ride?</h3>
              </div>
              <button
                onClick={() => setShowRideRecommender(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <p className="text-slate-300 leading-relaxed">
                Based on <strong>Rockaway Beach</strong>’s 2–3 ft clean wave shape and rising tide, here is your customized match:
              </p>

              <div className="p-4 rounded-2xl bg-[#07090E] border border-cyan-500/40 flex gap-3">
                <div className="w-12 h-24 bg-slate-900 rounded-lg flex items-center justify-center p-1">
                  <BoardSilhouette shapeType="long" className="w-8 h-20" />
                </div>
                <div className="flex-1 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-cyan-400">Top Recommendation</span>
                  <h4 className="text-sm font-bold text-white">9'0 Dawn Patrol Log</h4>
                  <p className="text-slate-300">72 L • 1–4 ft wave range</p>
                  <p className="text-[11px] text-slate-400">
                    Clean, softer morning conditions make this higher-volume noserider the easiest option to glide through every set wave.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#07090E] border-t border-slate-800 flex justify-between">
              <button
                onClick={() => setShowRideRecommender(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowRideRecommender(false)
                  setSelectedBoard(boards[0])
                  setShowReserveModal(true)
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-md"
              >
                Reserve Board ($25)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 6: TRAVELER MODE */}
      {showTravelerModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0D121D] border border-slate-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative my-8">
            <div className="p-5 bg-gradient-to-r from-[#0F1524] to-[#0A0D15] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Plane className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-black text-white">Traveling to Surf?</h3>
              </div>
              <button
                onClick={() => setShowTravelerModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3 text-xs">
              <p className="text-slate-300 leading-relaxed">
                Avoid costly airline board fees ($150+ each way) and the hassle of lugging surfboards through airport terminals. Reserve your board online and have it waiting in a mobile SurfPass van right at the break.
              </p>
              
              <div className="p-3 rounded-xl bg-[#07090E] border border-slate-800 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-purple-400">Supported Travel Markets</span>
                <p className="text-slate-200">• California: Huntington Beach & Lower Trestles</p>
                <p className="text-slate-200">• Hawaii: Waikiki & Oahu South Shore</p>
                <p className="text-slate-200">• New York: Rockaway Beach & Montauk</p>
                <p className="text-slate-200">• Florida: Cocoa Beach Pier</p>
              </div>
            </div>

            <div className="p-4 bg-[#07090E] border-t border-slate-800 flex justify-end">
              <button
                onClick={() => {
                  setShowTravelerModal(false)
                  setActiveTab('explore')
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs shadow-md"
              >
                Explore Travel Destinations
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 7: WALLET CONNECTION */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0D121D] border border-slate-800 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative my-8">
            <div className="p-5 bg-gradient-to-r from-[#0F1524] to-[#0A0D15] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Wallet className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-black text-white">Connect Wallet</h3>
              </div>
              <button
                onClick={() => setShowWalletModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              <p className="text-xs text-slate-300">
                Connect your preferred wallet for fast USDC on Solana payments and automated deposit settlement:
              </p>

              <div className="space-y-2">
                <button
                  onClick={handleConnectWallet}
                  className="w-full p-3 rounded-xl bg-[#07090E] border border-slate-800 hover:border-cyan-500 transition flex items-center justify-between text-xs font-bold text-white"
                >
                  <span className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-purple-900 flex items-center justify-center text-purple-300 font-bold">
                      P
                    </div>
                    <span>Phantom (Solana)</span>
                  </span>
                  <span className="text-[10px] text-cyan-400 font-semibold">Connect</span>
                </button>

                <button
                  onClick={handleConnectWallet}
                  className="w-full p-3 rounded-xl bg-[#07090E] border border-slate-800 hover:border-cyan-500 transition flex items-center justify-between text-xs font-bold text-white"
                >
                  <span className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-blue-900 flex items-center justify-center text-blue-300 font-bold">
                      S
                    </div>
                    <span>Solflare (Solana)</span>
                  </span>
                  <span className="text-[10px] text-cyan-400 font-semibold">Connect</span>
                </button>

                <button
                  onClick={handleConnectWallet}
                  className="w-full p-3 rounded-xl bg-[#07090E] border border-slate-800 hover:border-cyan-500 transition flex items-center justify-between text-xs font-bold text-white"
                >
                  <span className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-md bg-cyan-900 flex items-center justify-center text-cyan-300 font-bold">
                      SP
                    </div>
                    <span>SurfPass Smart Account (Embedded)</span>
                  </span>
                  <span className="text-[10px] text-purple-400 font-semibold">No seed phrase</span>
                </button>
              </div>
            </div>

            <div className="p-4 bg-[#07090E] border-t border-slate-800 flex justify-between">
              {walletConnected ? (
                <button
                  onClick={handleDisconnectWallet}
                  className="px-4 py-2 rounded-xl bg-red-950/80 border border-red-800 text-red-300 text-xs font-bold"
                >
                  Disconnect
                </button>
              ) : <div />}
              <button
                onClick={() => setShowWalletModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 8: INFRASTRUCTURE */}
      {showInfraModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0D121D] border border-purple-500/40 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-8">
            <div className="p-5 bg-gradient-to-r from-purple-950/80 to-[#0A0D15] border-b border-purple-800/60 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-purple-400" />
                <div>
                  <h3 className="text-base font-black text-white">Tatum Multi-Chain Infrastructure</h3>
                  <p className="text-xs text-purple-300">Solana RPC + real-time blockchain event monitoring</p>
                </div>
              </div>
              <button
                onClick={() => setShowInfraModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#07090E] border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Network #1</span>
                    <span className="font-bold text-white">Solana (USDC)</span>
                  </div>
                  <span className="text-emerald-400 font-bold text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                    CONNECTED
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#07090E] border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Network #2</span>
                    <span className="font-bold text-white">Bitcoin (BTC)</span>
                  </div>
                  <span className="text-emerald-400 font-bold text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                    CONNECTED
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#07090E] border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-cyan-400 block">Payment & Settlement Flow</span>
                <p className="text-slate-300 font-mono text-[11px] leading-relaxed">
                  Surfer initiates payment → SurfPass Checkout → Tatum Infrastructure → Solana / Bitcoin → Real-Time Detection → Reservation Confirmed
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[#07090E] border border-slate-800">
                  <span className="font-bold text-white block mb-1">RPC Gateway</span>
                  <p className="text-slate-400 text-[11px]">Direct blockchain connectivity and transaction broadcasting through node infrastructure.</p>
                </div>
                <div className="p-3 rounded-xl bg-[#07090E] border border-slate-800">
                  <span className="font-bold text-white block mb-1">Real-Time Events</span>
                  <p className="text-slate-400 text-[11px]">Instant payment detection and deposit release without manual user polling.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#07090E] border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setShowInfraModal(false)}
                className="px-5 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
