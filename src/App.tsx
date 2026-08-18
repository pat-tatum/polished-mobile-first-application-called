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
  Check
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
  quality: 'GOOD' | 'FAIR-GOOD' | 'FAIR' | 'POOR-FAIR'
  wind: string
  windMph: number
  tide: string
  waterTemp: string
  airTemp: string
  swell: string
  swellPeriod: string
  skill: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'
  distance: string
  vanCount: number
  boardCount: number
  image: string
  recommendation: string
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
  bestWindow: string
  bestWindowSub: string
}

interface Van {
  id: string
  name: string
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
  funboards: number
  shortboards: number
  nextLocation?: string
  eta?: string
  waitMin: number
  lat: number
  lng: number
  mapX: number // percentage on custom map
  mapY: number // percentage on custom map
  image: string
}

interface Board {
  id: string
  code: string
  name: string
  type: 'Longboard' | 'Funboard' | 'Shortboard' | 'Soft-top' | 'Performance'
  dimensions: string
  volume: string
  skill: 'Beginner' | 'Beginner / Intermediate' | 'Intermediate' | 'Advanced'
  recommendedWaves: string
  condition: 'Mint' | 'Excellent' | 'Good'
  vanId: string
  vanName: string
  beachName: string
  availableCount: number
  pricing: {
    twoHours: number
    fourHours: number
    fullDay: number
  }
  deposit: number
  protectionFee: number
  boardImage: string // Dedicated board product render
  tag: string
  whyMatch: string
}

interface RentalPass {
  id: string
  boardName: string
  boardCode: string
  boardImage: string
  vanName: string
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
    quality: 'GOOD',
    wind: 'NW 6 mph offshore',
    windMph: 6,
    tide: 'Rising',
    waterTemp: '68°F',
    airTemp: '74°F',
    swell: 'SE 2.8 ft',
    swellPeriod: '11s',
    skill: 'Intermediate',
    distance: '0.2 mi',
    vanCount: 3,
    boardCount: 22,
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1000&q=80',
    recommendation: 'Good for longboards and funboards this morning. Cleanest conditions before the afternoon wind shift.',
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
    id: 'long-beach',
    name: 'Long Beach',
    breakName: 'Lincoln Blvd',
    city: 'Long Beach',
    state: 'NY',
    region: 'New York',
    waveHeight: '3–4 ft',
    waveDesc: 'Waist to chest high',
    quality: 'FAIR-GOOD',
    wind: 'N 8 mph cross-shore',
    windMph: 8,
    tide: 'High Slack',
    waterTemp: '67°F',
    airTemp: '72°F',
    swell: 'SSE 3.2 ft',
    swellPeriod: '10s',
    skill: 'All Levels',
    distance: '14.2 mi',
    vanCount: 2,
    boardCount: 16,
    image: 'https://images.unsplash.com/photo-1455729552865-3658a5d39692?auto=format&fit=crop&w=1000&q=80',
    recommendation: 'Peaking sandbars at Lincoln. High volume funboards and fish shapes excel today.',
    bestWindow: '7:00 AM – 10:00 AM',
    bestWindowSub: 'Early morning glass before cross-shore onshore breeze.',
    hourly: [
      { time: '7 AM', hourVal: 7, heightFt: 3.4, heightLabel: '3.4 ft', periodSec: 10, tideFt: 4.2, windDir: 'N', windSpeed: 6, quality: 'GOOD' },
      { time: '8 AM', hourVal: 8, heightFt: 3.3, heightLabel: '3.3 ft', periodSec: 10, tideFt: 4.5, windDir: 'N', windSpeed: 8, quality: 'FAIR-GOOD' },
      { time: '9 AM', hourVal: 9, heightFt: 3.0, heightLabel: '3.0 ft', periodSec: 9, tideFt: 4.4, windDir: 'NE', windSpeed: 9, quality: 'FAIR-GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 2.8, heightLabel: '2.8 ft', periodSec: 9, tideFt: 3.9, windDir: 'E', windSpeed: 11, quality: 'FAIR' },
      { time: '11 AM', hourVal: 11, heightFt: 2.5, heightLabel: '2.5 ft', periodSec: 8, tideFt: 3.1, windDir: 'ESE', windSpeed: 13, quality: 'FAIR' },
      { time: '12 PM', hourVal: 12, heightFt: 2.1, heightLabel: '2.1 ft', periodSec: 8, tideFt: 2.3, windDir: 'SE', windSpeed: 14, quality: 'POOR-FAIR' }
    ],
    lat: 40.5884,
    lng: -73.6579
  },
  {
    id: 'montauk',
    name: 'Montauk - Ditch Plains',
    breakName: 'Ditch Plains Point',
    city: 'Montauk',
    state: 'NY',
    region: 'New York',
    waveHeight: '4–5 ft',
    waveDesc: 'Chest to head high',
    quality: 'GOOD',
    wind: 'NNW 5 mph light offshore',
    windMph: 5,
    tide: 'Incoming Mid-Tide',
    waterTemp: '64°F',
    airTemp: '69°F',
    swell: 'E 4.1 ft',
    swellPeriod: '12s',
    skill: 'Intermediate',
    distance: '118 mi',
    vanCount: 2,
    boardCount: 19,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    recommendation: 'Classic cobblestone point break working nicely. Mid-lengths and classic longboards recommended.',
    bestWindow: '8:00 AM – 1:00 PM',
    bestWindowSub: 'Long incoming tide window with sustained groundswell.',
    hourly: [
      { time: '7 AM', hourVal: 7, heightFt: 4.2, heightLabel: '4.2 ft', periodSec: 12, tideFt: 2.0, windDir: 'NNW', windSpeed: 4, quality: 'GOOD' },
      { time: '8 AM', hourVal: 8, heightFt: 4.5, heightLabel: '4.5 ft', periodSec: 12, tideFt: 2.8, windDir: 'NNW', windSpeed: 5, quality: 'GOOD' },
      { time: '9 AM', hourVal: 9, heightFt: 4.7, heightLabel: '4.7 ft', periodSec: 12, tideFt: 3.5, windDir: 'NW', windSpeed: 5, quality: 'GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 4.4, heightLabel: '4.4 ft', periodSec: 11, tideFt: 3.9, windDir: 'NW', windSpeed: 6, quality: 'GOOD' },
      { time: '11 AM', hourVal: 11, heightFt: 4.0, heightLabel: '4.0 ft', periodSec: 11, tideFt: 4.1, windDir: 'WNW', windSpeed: 7, quality: 'GOOD' },
      { time: '12 PM', hourVal: 12, heightFt: 3.6, heightLabel: '3.6 ft', periodSec: 10, tideFt: 3.8, windDir: 'W', windSpeed: 9, quality: 'FAIR-GOOD' }
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
    quality: 'FAIR',
    wind: 'W 9 mph offshore',
    windMph: 9,
    tide: 'Outgoing Mid',
    waterTemp: '69°F',
    airTemp: '76°F',
    swell: 'ESE 2.4 ft',
    swellPeriod: '9s',
    skill: 'Beginner',
    distance: '48 mi',
    vanCount: 2,
    boardCount: 14,
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1000&q=80',
    recommendation: 'Soft waves right next to the casino jetty. Perfect for high-volume soft-tops.',
    bestWindow: '9:00 AM – 11:30 AM',
    bestWindowSub: 'Mid-tide sweet spot before water gets too shallow on the inside bar.',
    hourly: [
      { time: '8 AM', hourVal: 8, heightFt: 2.4, heightLabel: '2.4 ft', periodSec: 9, tideFt: 3.2, windDir: 'W', windSpeed: 8, quality: 'FAIR' },
      { time: '9 AM', hourVal: 9, heightFt: 2.6, heightLabel: '2.6 ft', periodSec: 9, tideFt: 2.9, windDir: 'W', windSpeed: 9, quality: 'FAIR-GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 2.5, heightLabel: '2.5 ft', periodSec: 9, tideFt: 2.2, windDir: 'W', windSpeed: 9, quality: 'FAIR-GOOD' },
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
    quality: 'GOOD',
    wind: 'NE 4 mph glassy',
    windMph: 4,
    tide: 'Low rising',
    waterTemp: '65°F',
    airTemp: '71°F',
    swell: 'SSW 3.8 ft',
    swellPeriod: '14s',
    skill: 'Intermediate',
    distance: 'West Coast Demo',
    vanCount: 4,
    boardCount: 38,
    image: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&w=1000&q=80',
    recommendation: 'Consistent pier bowls. Fish and performance shortboards firing.',
    bestWindow: '6:30 AM – 10:30 AM',
    bestWindowSub: 'Glassy morning low tide push at south pier.',
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
    breakName: 'Lowers Rivermouth',
    city: 'San Clemente',
    state: 'CA',
    region: 'California',
    waveHeight: '4–6 ft',
    waveDesc: 'Head high +',
    quality: 'GOOD',
    wind: 'Calm 2 mph',
    windMph: 2,
    tide: 'Mid incoming',
    waterTemp: '66°F',
    airTemp: '73°F',
    swell: 'S 4.6 ft',
    swellPeriod: '16s',
    skill: 'Advanced',
    distance: 'West Coast Demo',
    vanCount: 3,
    boardCount: 26,
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1000&q=80',
    recommendation: 'A-frame perfection with world-class rights and lefts. High performance equipment ready.',
    bestWindow: '7:00 AM – 11:30 AM',
    bestWindowSub: 'Peak southern hemisphere groundswell window.',
    hourly: [
      { time: '7 AM', hourVal: 7, heightFt: 5.2, heightLabel: '5.2 ft', periodSec: 16, tideFt: 2.2, windDir: 'Calm', windSpeed: 2, quality: 'GOOD' },
      { time: '8 AM', hourVal: 8, heightFt: 5.5, heightLabel: '5.5 ft', periodSec: 16, tideFt: 2.9, windDir: 'Calm', windSpeed: 2, quality: 'GOOD' },
      { time: '9 AM', hourVal: 9, heightFt: 5.4, heightLabel: '5.4 ft', periodSec: 16, tideFt: 3.6, windDir: 'NE', windSpeed: 3, quality: 'GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 4.9, heightLabel: '4.9 ft', periodSec: 15, tideFt: 4.1, windDir: 'E', windSpeed: 5, quality: 'GOOD' }
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
    quality: 'FAIR',
    wind: 'WNW 7 mph offshore',
    windMph: 7,
    tide: 'Mid-tide pushing',
    waterTemp: '78°F',
    airTemp: '84°F',
    swell: 'E 2.1 ft',
    swellPeriod: '9s',
    skill: 'Beginner',
    distance: 'East Coast Demo',
    vanCount: 2,
    boardCount: 18,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    recommendation: 'Warm water gentle peelers. Ideal for 9ft cruisers and first-time sessions.',
    bestWindow: '8:00 AM – 11:00 AM',
    bestWindowSub: 'Morning offshore wind keeping rolling sandbars clean.',
    hourly: [
      { time: '8 AM', hourVal: 8, heightFt: 2.3, heightLabel: '2.3 ft', periodSec: 9, tideFt: 2.4, windDir: 'WNW', windSpeed: 7, quality: 'FAIR' },
      { time: '9 AM', hourVal: 9, heightFt: 2.4, heightLabel: '2.4 ft', periodSec: 9, tideFt: 2.9, windDir: 'WNW', windSpeed: 7, quality: 'FAIR' },
      { time: '10 AM', hourVal: 10, heightFt: 2.1, heightLabel: '2.1 ft', periodSec: 8, tideFt: 3.2, windDir: 'NW', windSpeed: 8, quality: 'FAIR' }
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
    quality: 'GOOD',
    wind: 'Trade wind 11 mph offshore',
    windMph: 11,
    tide: 'High tide peak',
    waterTemp: '79°F',
    airTemp: '82°F',
    swell: 'SSW 3.4 ft',
    swellPeriod: '13s',
    skill: 'All Levels',
    distance: 'Pacific Demo',
    vanCount: 3,
    boardCount: 30,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    recommendation: 'Endless gentle rolling right-handers. Longboarding paradise over soft reef.',
    bestWindow: '7:00 AM – 11:00 AM',
    bestWindowSub: 'Early trade wind window before midday gust picks up.',
    hourly: [
      { time: '7 AM', hourVal: 7, heightFt: 3.5, heightLabel: '3.5 ft', periodSec: 13, tideFt: 2.2, windDir: 'ENE', windSpeed: 10, quality: 'GOOD' },
      { time: '8 AM', hourVal: 8, heightFt: 3.6, heightLabel: '3.6 ft', periodSec: 13, tideFt: 2.5, windDir: 'ENE', windSpeed: 11, quality: 'GOOD' },
      { time: '9 AM', hourVal: 9, heightFt: 3.4, heightLabel: '3.4 ft', periodSec: 13, tideFt: 2.7, windDir: 'E', windSpeed: 12, quality: 'GOOD' },
      { time: '10 AM', hourVal: 10, heightFt: 3.1, heightLabel: '3.1 ft', periodSec: 12, tideFt: 2.6, windDir: 'E', windSpeed: 13, quality: 'FAIR-GOOD' }
    ],
    lat: 21.2766,
    lng: -157.8275
  }
]

const VANS: Van[] = [
  {
    id: 'van-12',
    name: 'SurfPass Van #12',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach, NY',
    spot: 'Beach 90th Street & Boardwalk',
    status: 'OPEN',
    distance: '0.2 mi away',
    walkTime: '4 min walk',
    driveTime: '1 min drive',
    hours: '6:00 AM – 7:30 PM',
    boardsAvailable: 8,
    longboards: 3,
    funboards: 3,
    shortboards: 2,
    nextLocation: 'Long Beach, NY (Tomorrow 6 AM)',
    eta: 'Parked & Ready',
    waitMin: 0,
    lat: 40.5845,
    lng: -73.8160,
    mapX: 48,
    mapY: 58,
    image: 'https://images.unsplash.com/photo-1527786356703-4b100091cd2c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-07',
    name: 'SurfPass Van #07',
    beachId: 'rockaway',
    beachName: 'Rockaway Beach, NY',
    spot: 'Beach 67th Street Subway Lot',
    status: 'OPEN',
    distance: '0.9 mi away',
    walkTime: '18 min walk',
    driveTime: '3 min drive',
    hours: '6:30 AM – 7:00 PM',
    boardsAvailable: 9,
    longboards: 4,
    funboards: 3,
    shortboards: 2,
    nextLocation: 'Beach 92nd St (4 PM)',
    eta: 'Parked & Ready',
    waitMin: 2,
    lat: 40.5900,
    lng: -73.7950,
    mapX: 82,
    mapY: 42,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-03',
    name: 'SurfPass Van #03',
    beachId: 'long-beach',
    beachName: 'Long Beach, NY',
    spot: 'Lincoln Blvd Boardwalk Lot',
    status: 'OPEN',
    distance: '14.2 mi away',
    walkTime: 'Short drive',
    driveTime: '22 min drive',
    hours: '7:00 AM – 6:30 PM',
    boardsAvailable: 11,
    longboards: 5,
    funboards: 4,
    shortboards: 2,
    eta: 'Parked & Ready',
    waitMin: 0,
    lat: 40.5880,
    lng: -73.6570,
    mapX: 70,
    mapY: 50,
    image: 'https://images.unsplash.com/photo-1513311068544-c9b9658f4150?auto=format&fit=crop&w=800&q=80'
  }
]

// Product-styled surfboard inventory representations
const BOARDS: Board[] = [
  {
    id: 'b-0092',
    code: 'SP-RKW-0092',
    name: "9'0 Torq Classic Longboard",
    type: 'Longboard',
    dimensions: "9'0 × 22 3/4\" × 3 1/8\"",
    volume: '72 Liters',
    skill: 'Beginner / Intermediate',
    recommendedWaves: '1–4 ft clean peelers',
    condition: 'Excellent',
    vanId: 'van-12',
    vanName: 'SurfPass Van #12',
    beachName: 'Rockaway Beach, NY',
    availableCount: 3,
    pricing: {
      twoHours: 25,
      fourHours: 38,
      fullDay: 48
    },
    deposit: 50,
    protectionFee: 3,
    boardImage: 'https://images.unsplash.com/photo-1531722564239-012a64016a69?auto=format&fit=crop&w=800&q=80',
    tag: '👑 Editor Choice for Today',
    whyMatch: "Good match for today's smaller clean conditions (2–3 ft)."
  },
  {
    id: 'b-0074',
    code: 'SP-RKW-0074',
    name: "8'0 Catch Surf Odysea Log",
    type: 'Soft-top',
    dimensions: "8'0 × 23\" × 3 1/4\"",
    volume: '86 Liters',
    skill: 'Beginner',
    recommendedWaves: '1–3 ft gentle waves',
    condition: 'Mint',
    vanId: 'van-12',
    vanName: 'SurfPass Van #12',
    beachName: 'Rockaway Beach, NY',
    availableCount: 2,
    pricing: {
      twoHours: 22,
      fourHours: 34,
      fullDay: 44
    },
    deposit: 40,
    protectionFee: 3,
    boardImage: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
    tag: '🏄 Beginner Friendly',
    whyMatch: 'Ultra high volume gives effortless wave catching in softer beach breaks.'
  },
  {
    id: 'b-0081',
    code: 'SP-RKW-0081',
    name: "7'2 Walden Mega Magic Funboard",
    type: 'Funboard',
    dimensions: "7'2 × 21 1/2\" × 2 3/4\"",
    volume: '54 Liters',
    skill: 'Intermediate',
    recommendedWaves: '2–5 ft punchy waves',
    condition: 'Excellent',
    vanId: 'van-12',
    vanName: 'SurfPass Van #12',
    beachName: 'Rockaway Beach, NY',
    availableCount: 3,
    pricing: {
      twoHours: 30,
      fourHours: 42,
      fullDay: 54
    },
    deposit: 75,
    protectionFee: 3,
    boardImage: 'https://images.unsplash.com/photo-1455729552865-3658a5d39692?auto=format&fit=crop&w=800&q=80',
    tag: '⚡ High Agility',
    whyMatch: 'Great maneuverability while maintaining paddle power on incoming tides.'
  },
  {
    id: 'b-0063',
    code: 'SP-RKW-0063',
    name: "6'0 Channel Islands CI Pro",
    type: 'Shortboard',
    dimensions: "6'0 × 19 1/8\" × 2 7/16\"",
    volume: '30.5 Liters',
    skill: 'Advanced',
    recommendedWaves: '3–6 ft steep faces',
    condition: 'Excellent',
    vanId: 'van-12',
    vanName: 'SurfPass Van #12',
    beachName: 'Rockaway Beach, NY',
    availableCount: 2,
    pricing: {
      twoHours: 35,
      fourHours: 48,
      fullDay: 62
    },
    deposit: 100,
    protectionFee: 3,
    boardImage: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&w=800&q=80',
    tag: '🔥 Pro Performance',
    whyMatch: 'Responsive shortboard for steep section snaps when swell peaks.'
  }
]

export default function App() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'map' | 'rentals' | 'profile' | 'van-dash' | 'infra'>('home')

  // Selected detail states
  const [selectedBeach, setSelectedBeach] = useState<Beach>(BEACHES[0])
  const [selectedVan, setSelectedVan] = useState<Van>(VANS[0])
  const [selectedBoard, setSelectedBoard] = useState<Board>(BOARDS[0])

  // Modals
  const [showBeachModal, setShowBeachModal] = useState(false)
  const [showVanModal, setShowVanModal] = useState(false)
  const [showBoardModal, setShowBoardModal] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [showPassModal, setShowPassModal] = useState(false)
  const [activePass, setActivePass] = useState<RentalPass | null>(null)
  const [showReturnModal, setShowReturnModal] = useState(false)

  // Map state
  const [mapSelectedVan, setMapSelectedVan] = useState<Van | null>(VANS[0])
  const [mapSelectedBreak, setMapSelectedBreak] = useState<Beach | null>(null)
  const [mapMode, setMapMode] = useState<'map' | 'satellite'>('map')

  // Checkout flow state
  const [rentalDuration, setRentalDuration] = useState<'2hrs' | '4hrs' | 'fullday'>('2hrs')
  const [includeProtection, setIncludeProtection] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState<'USDC' | 'BTC' | 'CARD'>('USDC')
  const [btcDepositMethod, setBtcDepositMethod] = useState<'CARD' | 'USDC'>('CARD')
  const [checkoutStep, setCheckoutStep] = useState<'review' | 'processing' | 'confirmed'>('review')
  const [txStage, setTxStage] = useState<number>(0) // 0: init, 1: detected, 2: confirming, 3: confirmed, 4: reserved, 5: pass ready

  // Filters
  const [searchQuery, setSearchQuery] = useState('')
  const [regionFilter, setRegionFilter] = useState('All')
  const [qualityFilter, setQualityFilter] = useState('All')
  const [boardTypeFilter, setBoardTypeFilter] = useState('All')
  const [boardSkillFilter, setBoardSkillFilter] = useState('All')

  // Wallet
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  // Rentals state
  const [rentals, setRentals] = useState<RentalPass[]>([
    {
      id: 'SP-RKW-7F3A92',
      boardName: "9'0 Torq Classic Longboard",
      boardCode: 'SP-RKW-0092',
      boardImage: 'https://images.unsplash.com/photo-1531722564239-012a64016a69?auto=format&fit=crop&w=800&q=80',
      vanName: 'SurfPass Van #12',
      location: 'Rockaway Beach, NY',
      spot: 'Beach 90th Street Boardwalk',
      startTime: '8:30 AM',
      endTime: '10:30 AM',
      durationLabel: '2 Hours',
      paymentMethod: 'USDC',
      rentalPrice: 25,
      protection: 3,
      deposit: 50,
      depositStatus: 'HELD',
      status: 'ACTIVE',
      txHash: '5Knp7Tz...sol99',
      createdAt: Date.now() - 1000 * 60 * 45
    }
  ])

  // Live Rates / Tatum status
  const [rates, setRates] = useState<{ btcRate: number; solRate: number; tatumConnected: boolean }>({
    btcRate: 64200,
    solRate: 148,
    tatumConnected: true
  })

  // Fetch rates & backend health with fallback
  useEffect(() => {
    let mounted = true
    const fetchRates = async () => {
      try {
        const res = await fetch('/api/rates')
        if (res.ok) {
          const data = await res.json()
          if (mounted && data.btcUsd) {
            setRates({
              btcRate: data.btcUsd,
              solRate: data.solUsd || 148,
              tatumConnected: data.tatumConnected ?? true
            })
          }
        }
      } catch {
        // Safe backend boot fallback
      }
    }
    fetchRates()
    const interval = setInterval(fetchRates, 30000)
    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  // Calculate prices based on selection
  const rentalCost = useMemo(() => {
    if (rentalDuration === '2hrs') return selectedBoard.pricing.twoHours
    if (rentalDuration === '4hrs') return selectedBoard.pricing.fourHours
    return selectedBoard.pricing.fullDay
  }, [rentalDuration, selectedBoard])

  const protectionCost = includeProtection ? selectedBoard.protectionFee : 0
  const depositCost = selectedBoard.deposit
  const totalAuthorization = rentalCost + protectionCost + depositCost
  const btcAmount = useMemo(() => {
    return ((rentalCost + protectionCost) / rates.btcRate).toFixed(6)
  }, [rentalCost, protectionCost, rates.btcRate])

  // Filtered lists
  const filteredBeaches = useMemo(() => {
    return BEACHES.filter((b) => {
      const matchSearch =
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.breakName.toLowerCase().includes(searchQuery.toLowerCase())
      const matchRegion = regionFilter === 'All' || b.region === regionFilter
      const matchQuality = qualityFilter === 'All' || b.quality === qualityFilter
      return matchSearch && matchRegion && matchQuality
    })
  }, [searchQuery, regionFilter, qualityFilter])

  const filteredBoards = useMemo(() => {
    return BOARDS.filter((board) => {
      const matchType = boardTypeFilter === 'All' || board.type === boardTypeFilter
      const matchSkill = boardSkillFilter === 'All' || board.skill.includes(boardSkillFilter)
      return matchType && matchSkill
    })
  }, [boardTypeFilter, boardSkillFilter])

  // Handle Checkout Execution
  const handleStartCheckout = (board: Board) => {
    setSelectedBoard(board)
    setCheckoutStep('review')
    setTxStage(0)
    setShowBoardModal(false)
    setShowCheckoutModal(true)
  }

  const handleExecutePayment = () => {
    setCheckoutStep('processing')
    setTxStage(0) // Waiting for payment

    // Realistic multi-stage animation
    setTimeout(() => setTxStage(1), 800) // Transaction detected via Tatum
    setTimeout(() => setTxStage(2), 2000) // Confirming on Solana / Network
    setTimeout(() => setTxStage(3), 3200) // Payment confirmed ✓
    setTimeout(() => setTxStage(4), 4200) // Board reserved
    setTimeout(() => {
      setTxStage(5) // SurfPass Rental Pass created
      const newPass: RentalPass = {
        id: `SP-RKW-${Math.floor(100000 + Math.random() * 900000).toString(16).toUpperCase()}`,
        boardName: selectedBoard.name,
        boardCode: selectedBoard.code,
        boardImage: selectedBoard.boardImage,
        vanName: selectedBoard.vanName,
        location: selectedBoard.beachName,
        spot: selectedVan.spot,
        startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        endTime: new Date(Date.now() + (rentalDuration === '2hrs' ? 2 : rentalDuration === '4hrs' ? 4 : 8) * 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        durationLabel: rentalDuration === '2hrs' ? '2 Hours' : rentalDuration === '4hrs' ? '4 Hours' : 'Full Day',
        paymentMethod: paymentMethod,
        rentalPrice: rentalCost,
        protection: protectionCost,
        deposit: depositCost,
        depositStatus: 'HELD',
        status: 'ACTIVE',
        txHash: paymentMethod === 'USDC' ? `5Knp7...${Math.random().toString(36).substring(2, 7)}` : undefined,
        createdAt: Date.now()
      }

      setRentals((prev) => [newPass, ...prev])
      setActivePass(newPass)
      setCheckoutStep('confirmed')
    }, 5200)
  }

  // Handle return flow
  const [returnProcessing, setReturnProcessing] = useState(false)
  const [returnSuccess, setReturnSuccess] = useState(false)

  const handleProcessReturn = (pass: RentalPass) => {
    setReturnProcessing(true)
    setTimeout(() => {
      setRentals((prev) =>
        prev.map((r) => (r.id === pass.id ? { ...r, status: 'COMPLETED', depositStatus: 'REFUNDED' } : r))
      )
      setReturnProcessing(false)
      setReturnSuccess(true)
      setTimeout(() => {
        setReturnSuccess(false)
        setShowReturnModal(false)
      }, 2500)
    }, 1800)
  }

  return (
    <div className="min-h-screen bg-[#07090E] text-white flex flex-col font-sans selection:bg-[#0066FF] selection:text-white">
      {/* TOP STATUS / BRAND BAR */}
      <header className="sticky top-0 z-40 bg-[#0A0D14]/90 backdrop-blur-md border-b border-white/10 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0055FF] to-[#00D4FF] flex items-center justify-center shadow-lg shadow-[#0055FF]/20 group-hover:scale-105 transition-transform">
                <Waves className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg tracking-tight text-white">SurfPass</span>
                  <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-white/70">
                    Consumer Beta
                  </span>
                </div>
                <p className="text-[11px] text-white/50 hidden sm:block">Find waves. Find a board. Go surf.</p>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Demo Location Indicator */}
            <button
              onClick={() => {
                setSelectedBeach(BEACHES[0])
                setShowBeachModal(true)
              }}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/80 hover:bg-white/10 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium text-white">Rockaway Beach, NY</span>
              <span className="text-emerald-400 font-semibold">2–3 ft • GOOD</span>
            </button>

            {/* Tatum Infra Quick Link */}
            <button
              onClick={() => setActiveTab('infra')}
              className={`text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 border transition-all ${
                activeTab === 'infra'
                  ? 'bg-[#0066FF] border-[#0066FF] text-white'
                  : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-[#00D4FF]" />
              <span className="hidden sm:inline">Tatum</span> Infra
            </button>

            {/* Wallet Connect */}
            <button
              onClick={() => {
                if (walletConnected) {
                  setWalletConnected(false)
                  setWalletAddress(null)
                } else {
                  setWalletConnected(true)
                  setWalletAddress('7Xwa...v8Lq')
                }
              }}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                walletConnected
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                  : 'bg-white/10 hover:bg-white/15 border border-white/15 text-white'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>{walletConnected ? '7Xwa...v8Lq' : 'Connect'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 pb-24">
        {/* ========================================================================= */}
        {/* 1. HOME SCREEN */}
        {/* ========================================================================= */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fadeIn">
            {/* HERO SECTION */}
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0B132B] via-[#0E1A38] to-[#070D1E] border border-white/10 p-6 sm:p-10 shadow-2xl">
              {/* Background ambient lighting */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0066FF]/20 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#8B5CF6]/15 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-cyan-300 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Surfline Integration-Ready • Roaming Van Fleet</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  Find waves. Find a board. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#0066FF] to-[#A78BFA]">Go surf.</span>
                </h1>

                <p className="text-base sm:text-lg text-white/70 leading-relaxed">
                  Live surf conditions and nearby mobile surfboard rental vans, all in one place. Reserve in seconds with USDC on Solana, Bitcoin, or Apple Pay.
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setSelectedBeach(BEACHES[0])
                      setShowBeachModal(true)
                    }}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052D4] hover:from-[#1A75FF] hover:to-[#005CE6] text-white font-semibold text-sm shadow-lg shadow-[#0066FF]/30 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <span>Check Rockaway Beach (2–3 ft)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setActiveTab('map')}
                    className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium text-sm flex items-center gap-2 transition-all"
                  >
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span>Find Nearest Van</span>
                  </button>
                </div>
              </div>
            </div>

            {/* SMART "BEST MATCH RIGHT NOW" CARD */}
            <div className="rounded-2xl bg-gradient-to-br from-[#0F192E] to-[#0A1020] border-2 border-[#0066FF]/40 p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-l from-[#0066FF] to-transparent text-[11px] font-bold uppercase tracking-wider text-white">
                Smart Match Engine
              </div>

              <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>Best Match Right Now</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left: Beach & Conditions */}
                <div className="lg:col-span-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-white">Rockaway Beach</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                      GOOD
                    </span>
                  </div>
                  <div className="text-sm text-white/80 space-y-1">
                    <p className="font-semibold text-white">2–3 ft • Clean • NW 6 mph offshore</p>
                    <p className="text-xs text-white/60">
                      Best until approximately <span className="text-cyan-300 font-semibold">11:30 AM</span>
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70">
                    💡 <span className="text-white/90">Why this spot?</span> Cleanest incoming tide window with gentle peeling sandbars before the afternoon wind shift.
                  </div>
                </div>

                {/* Middle: Recommended Board */}
                <div className="lg:col-span-5 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                  <img
                    src={BOARDS[0].boardImage}
                    alt={BOARDS[0].name}
                    className="w-20 h-20 rounded-lg object-cover bg-black/40 border border-white/10"
                  />
                  <div className="space-y-1 flex-1">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-cyan-300">
                      Recommended Board
                    </div>
                    <h4 className="text-base font-bold text-white leading-tight">{BOARDS[0].name}</h4>
                    <p className="text-xs text-white/60">{BOARDS[0].whyMatch}</p>
                    <div className="flex items-center gap-3 pt-1 text-xs">
                      <span className="text-white font-bold">${BOARDS[0].pricing.twoHours} / 2 hours</span>
                      <span className="text-white/40">•</span>
                      <span className="text-white/70">{BOARDS[0].dimensions}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Closest Van & Action */}
                <div className="lg:col-span-3 space-y-3">
                  <div className="text-xs text-white/70 space-y-1">
                    <div className="flex items-center gap-1.5 font-semibold text-white">
                      <Car className="w-3.5 h-3.5 text-cyan-400" />
                      <span>SurfPass Van #12</span>
                    </div>
                    <p className="text-white/60">Beach 90th Street (0.2 mi away)</p>
                    <p className="text-emerald-400 font-medium">3 longboards currently available</p>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleStartCheckout(BOARDS[0])}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#0066FF] hover:bg-[#1A75FF] text-white font-bold text-xs shadow-lg shadow-[#0066FF]/20 flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Reserve This Board</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedBeach(BEACHES[0])
                        setShowBeachModal(true)
                      }}
                      className="w-full py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 font-medium text-xs text-center transition-all"
                    >
                      View 12h Forecast
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* GOOD SURF NEAR YOU */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Good Surf Near You</h2>
                  <p className="text-xs text-white/50">Demo conditions feed • Surfline integration-ready</p>
                </div>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
                >
                  <span>Explore 18 beaches</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {BEACHES.slice(0, 3).map((beach) => (
                  <div
                    key={beach.id}
                    onClick={() => {
                      setSelectedBeach(beach)
                      setShowBeachModal(true)
                    }}
                    className="group rounded-2xl bg-[#0C1222] border border-white/10 hover:border-[#0066FF]/50 overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer flex flex-col"
                  >
                    {/* Beach Image */}
                    <div className="relative h-44 w-full overflow-hidden bg-black/40">
                      <img
                        src={beach.image}
                        alt={beach.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0C1222] via-transparent to-black/30"></div>

                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            beach.quality === 'GOOD' ? 'bg-emerald-400' : 'bg-amber-400'
                          }`}
                        ></span>
                        <span>{beach.waveHeight}</span>
                        <span className="text-white/50">•</span>
                        <span className="text-cyan-300">{beach.quality}</span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-lg font-bold text-white leading-tight drop-shadow">{beach.name}</h3>
                        <p className="text-xs text-white/80">{beach.breakName} • {beach.city}, {beach.state}</p>
                      </div>
                    </div>

                    {/* Conditions Breakdown */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="grid grid-cols-2 gap-2 text-xs text-white/70">
                        <div className="flex items-center gap-1.5">
                          <Wind className="w-3.5 h-3.5 text-cyan-400" />
                          <span className="truncate">{beach.wind}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Droplets className="w-3.5 h-3.5 text-blue-400" />
                          <span>{beach.tide}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Thermometer className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{beach.waterTemp} Water</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-purple-400" />
                          <span>{beach.skill}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                        <div className="text-white/60">
                          <span className="text-white font-semibold">{beach.vanCount} SurfPass vans</span>
                          <span className="text-white/40"> • </span>
                          <span className="text-emerald-400 font-medium">{beach.boardCount} boards</span>
                        </div>
                        <span className="text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                          View break <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RENT A BOARD - DEDICATED PRODUCT CARDS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Rent a Board</h2>
                  <p className="text-xs text-white/50">Real-time inventory from SurfPass mobile vans</p>
                </div>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
                >
                  <span>View all models</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {BOARDS.map((board) => (
                  <div
                    key={board.id}
                    className="rounded-2xl bg-[#0C1222] border border-white/10 p-4 flex flex-col justify-between hover:border-[#0066FF]/40 transition-all space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="relative h-36 w-full rounded-xl bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center">
                        <img
                          src={board.boardImage}
                          alt={board.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-bold text-white border border-white/10">
                          {board.type}
                        </div>
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                          {board.availableCount} Available
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] text-cyan-300 font-semibold tracking-wider uppercase">
                          {board.code}
                        </span>
                        <h4 className="text-sm font-bold text-white leading-snug">{board.name}</h4>
                        <p className="text-xs text-white/60">{board.dimensions} • {board.volume}</p>
                      </div>

                      <div className="p-2 rounded-lg bg-white/5 text-[11px] text-white/70 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-white/50">Skill:</span>
                          <span className="text-white font-medium">{board.skill}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/50">Location:</span>
                          <span className="text-cyan-300 font-medium">Van #12 (0.2 mi)</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 space-y-2">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-lg font-extrabold text-white">${board.pricing.twoHours}</span>
                          <span className="text-xs text-white/50"> / 2 hrs</span>
                        </div>
                        <span className="text-[10px] text-white/50">+ ${board.deposit} refundable dep</span>
                      </div>

                      <button
                        onClick={() => handleStartCheckout(board)}
                        className="w-full py-2 px-3 rounded-xl bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-bold shadow-md shadow-[#0066FF]/20 flex items-center justify-center gap-1 transition-all"
                      >
                        <Zap className="w-3 h-3" />
                        <span>Reserve Board</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* HOW SURFPASS WORKS */}
            <div className="rounded-2xl bg-gradient-to-r from-[#0C1428] via-[#0D1836] to-[#0A1020] border border-white/10 p-6 sm:p-8 space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-white">How SurfPass Works</h3>
                <p className="text-xs sm:text-sm text-white/60">
                  Surfline-ready discovery, mobile surf rental vans, and instant payments powered by Tatum blockchain infrastructure.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-[#0066FF]/20 text-[#00D4FF] mx-auto flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h4 className="font-bold text-sm text-white">Check Waves</h4>
                  <p className="text-xs text-white/60">Find breaks with clean swells, favorable winds, and rising tides.</p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-[#0066FF]/20 text-[#00D4FF] mx-auto flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h4 className="font-bold text-sm text-white">Find Van & Board</h4>
                  <p className="text-xs text-white/60">Locate roaming SurfPass vans parked at beach lots with live inventory.</p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-[#0066FF]/20 text-[#00D4FF] mx-auto flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h4 className="font-bold text-sm text-white">Pay & Pass</h4>
                  <p className="text-xs text-white/60">Pay with USDC, BTC, or Card. Instant digital QR pass generated.</p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-[#0066FF]/20 text-[#00D4FF] mx-auto flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <h4 className="font-bold text-sm text-white">Surf & Return</h4>
                  <p className="text-xs text-white/60">Surf the session. Drop board back at van and refundable deposit is released.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. EXPLORE NATIONWIDE SURF SCREEN */}
        {/* ========================================================================= */}
        {activeTab === 'explore' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header & Controls */}
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Explore Surf & Vans</h1>
                <p className="text-xs sm:text-sm text-white/60">
                  Nationwide surf discovery across New York, New Jersey, Florida, California, and Hawaii.
                </p>
                <p className="text-[11px] text-white/40 pt-0.5">
                  Conditions shown are demo data. Production architecture supports integration with a licensed surf-data provider such as Surfline.
                </p>
              </div>

              {/* Search and Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-6 relative">
                  <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by beach, break, city, or state..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0C1222] border border-white/10 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[#0066FF]"
                  />
                </div>

                <div className="sm:col-span-3">
                  <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0C1222] border border-white/10 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                  >
                    <option value="All">All US Regions</option>
                    <option value="New York">New York</option>
                    <option value="New Jersey">New Jersey</option>
                    <option value="California">California</option>
                    <option value="Florida">Florida</option>
                    <option value="Hawaii">Hawaii</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <select
                    value={qualityFilter}
                    onChange={(e) => setQualityFilter(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0C1222] border border-white/10 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                  >
                    <option value="All">All Conditions</option>
                    <option value="GOOD">Good Conditions (2–3 ft+)</option>
                    <option value="FAIR-GOOD">Fair-Good Conditions</option>
                    <option value="FAIR">Fair Conditions</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Count Banner */}
            <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80">
              <span>
                Showing <strong className="text-cyan-400">{filteredBeaches.length}</strong> surf destinations with active SurfPass van hubs
              </span>
              <span className="text-emerald-400 font-semibold">18 beaches with good conditions today</span>
            </div>

            {/* Nationwide Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBeaches.map((beach) => (
                <div
                  key={beach.id}
                  onClick={() => {
                    setSelectedBeach(beach)
                    setShowBeachModal(true)
                  }}
                  className="rounded-2xl bg-[#0C1222] border border-white/10 hover:border-[#0066FF]/60 overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer flex flex-col group"
                >
                  <div className="relative h-48 w-full bg-black/40 overflow-hidden">
                    <img
                      src={beach.image}
                      alt={beach.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0C1222] via-transparent to-black/40"></div>

                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-bold text-white flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          beach.quality === 'GOOD' ? 'bg-emerald-400' : 'bg-amber-400'
                        }`}
                      ></span>
                      <span>{beach.waveHeight}</span>
                      <span className="text-white/40">•</span>
                      <span className="text-cyan-300">{beach.quality}</span>
                    </div>

                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-white/15 backdrop-blur-md text-[10px] font-semibold text-white/90">
                      {beach.region}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-lg font-bold text-white drop-shadow">{beach.name}</h3>
                      <p className="text-xs text-white/80">{beach.breakName}</p>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-white/70 line-clamp-2">{beach.recommendation}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs text-white/60 bg-white/5 p-2.5 rounded-xl">
                      <div>
                        <span className="text-white/40 block text-[10px] uppercase">Wind</span>
                        <span className="text-white font-medium truncate">{beach.wind}</span>
                      </div>
                      <div>
                        <span className="text-white/40 block text-[10px] uppercase">Tide</span>
                        <span className="text-white font-medium">{beach.tide}</span>
                      </div>
                      <div>
                        <span className="text-white/40 block text-[10px] uppercase">Swell</span>
                        <span className="text-white font-medium">{beach.swell} @ {beach.swellPeriod}</span>
                      </div>
                      <div>
                        <span className="text-white/40 block text-[10px] uppercase">Best Window</span>
                        <span className="text-cyan-300 font-medium">{beach.bestWindow}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-white/70">
                        <Car className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{beach.vanCount} vans nearby ({beach.boardCount} boards)</span>
                      </div>
                      <span className="text-[#00D4FF] font-bold flex items-center gap-1">
                        View Break <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. REAL GEOGRAPHIC MAP EXPERIENCE */}
        {/* ========================================================================= */}
        {activeTab === 'map' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Map Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Live Surf & Van Map</h1>
                <p className="text-xs sm:text-sm text-white/60">
                  Real-time geographic tracking for Rockaway Beach, Queens NY and regional mobile hubs.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMapMode('map')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    mapMode === 'map'
                      ? 'bg-[#0066FF] border-[#0066FF] text-white'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  Street Map
                </button>
                <button
                  onClick={() => setMapMode('satellite')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    mapMode === 'satellite'
                      ? 'bg-[#0066FF] border-[#0066FF] text-white'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                  }`}
                >
                  Coastal Satellite
                </button>
              </div>
            </div>

            {/* Interactive Geographic Map Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* Main Visual Map (8 cols) */}
              <div className="lg:col-span-8 rounded-2xl bg-[#091322] border border-white/15 overflow-hidden shadow-2xl relative h-[480px] flex flex-col justify-between">
                {/* SVG/Styled Geographic Map Representation */}
                <div
                  className={`absolute inset-0 ${
                    mapMode === 'satellite'
                      ? 'bg-gradient-to-b from-[#0A1A2F] via-[#0E243F] to-[#041226]'
                      : 'bg-[#0E1726]'
                  }`}
                >
                  {/* Landmass & Coastline Geometry */}
                  <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#0B1E38" />
                        <stop offset="100%" stopColor="#031122" />
                      </linearGradient>
                      <pattern id="streetGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                      </pattern>
                    </defs>

                    {/* Street grid on land */}
                    <rect width="100%" height="60%" fill="url(#streetGrid)" />

                    {/* Shoreline contour */}
                    <path
                      d="M 0 280 Q 200 270, 450 290 T 900 310 L 900 600 L 0 600 Z"
                      fill="url(#oceanGrad)"
                      stroke="#0066FF"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />

                    {/* Boardwalk Strip */}
                    <path
                      d="M 0 274 Q 200 264, 450 284 T 900 304"
                      fill="none"
                      stroke="#A0AEC0"
                      strokeWidth="4"
                      strokeDasharray="8 3"
                    />

                    {/* Roads */}
                    <line x1="0" y1="120" x2="900" y2="140" stroke="rgba(255,255,255,0.12)" strokeWidth="3" />
                    <line x1="240" y1="0" x2="240" y2="280" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                    <line x1="450" y1="0" x2="450" y2="290" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                    <line x1="720" y1="0" x2="720" y2="305" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
                  </svg>

                  {/* Geography Labels */}
                  <div className="absolute top-4 left-4 text-xs font-bold tracking-wider text-white/50 uppercase">
                    Rockaway Peninsula, Queens NY
                  </div>
                  <div className="absolute top-16 left-8 text-[11px] text-white/40">Rockaway Beach Blvd</div>
                  <div className="absolute top-24 left-[46%] text-[11px] text-white/40">Beach 90th St Subway</div>
                  <div className="absolute bottom-6 right-6 text-sm font-semibold tracking-widest text-cyan-400/40 uppercase">
                    Atlantic Ocean (Swell SE 2.8 ft)
                  </div>
                  <div className="absolute top-[48%] left-[20%] text-[10px] text-amber-300/60 font-mono">
                    ━━ Rockaway Boardwalk Strip ━━
                  </div>

                  {/* USER LOCATION PIN */}
                  <div className="absolute top-[38%] left-[36%] -translate-x-1/2 -translate-y-1/2 z-20 group">
                    <div className="relative flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-[#00D4FF] border-2 border-white shadow-lg animate-ping absolute"></div>
                      <div className="w-4 h-4 rounded-full bg-[#00D4FF] border-2 border-white shadow-lg relative z-10"></div>
                    </div>
                    <div className="px-2 py-0.5 rounded bg-black/80 text-[10px] text-white whitespace-nowrap mt-1 border border-white/10">
                      You are here (Beach 84th)
                    </div>
                  </div>

                  {/* SURFPASS VAN #12 PIN (PRIMARY) */}
                  <div
                    onClick={() => {
                      setMapSelectedVan(VANS[0])
                      setMapSelectedBreak(null)
                    }}
                    style={{ left: `${VANS[0].mapX}%`, top: `${VANS[0].mapY}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
                  >
                    <div
                      className={`p-2 rounded-2xl flex items-center gap-1.5 shadow-2xl transition-all ${
                        mapSelectedVan?.id === 'van-12'
                          ? 'bg-[#0066FF] ring-4 ring-[#0066FF]/40 scale-110'
                          : 'bg-[#0A1A35] border-2 border-[#00D4FF] hover:scale-105'
                      }`}
                    >
                      <Car className="w-4 h-4 text-white" />
                      <span className="text-xs font-extrabold text-white">Van #12</span>
                      <span className="px-1.5 py-0.2 rounded bg-emerald-400 text-black text-[9px] font-extrabold">
                        8 bds
                      </span>
                    </div>
                    <div className="text-center mt-1">
                      <span className="px-1.5 py-0.5 rounded bg-black/70 text-[9px] text-white/80 border border-white/10">
                        Beach 90th (0.2 mi)
                      </span>
                    </div>
                  </div>

                  {/* SURFPASS VAN #07 PIN */}
                  <div
                    onClick={() => {
                      setMapSelectedVan(VANS[1])
                      setMapSelectedBreak(null)
                    }}
                    style={{ left: `${VANS[1].mapX}%`, top: `${VANS[1].mapY}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
                  >
                    <div
                      className={`p-1.5 rounded-xl flex items-center gap-1 shadow-xl transition-all ${
                        mapSelectedVan?.id === 'van-07'
                          ? 'bg-[#0066FF] ring-4 ring-[#0066FF]/40 scale-110'
                          : 'bg-[#0A1A35] border-2 border-cyan-400 hover:scale-105'
                      }`}
                    >
                      <Car className="w-3.5 h-3.5 text-white" />
                      <span className="text-[11px] font-bold text-white">Van #07</span>
                      <span className="px-1 py-0.2 rounded bg-emerald-400 text-black text-[8px] font-extrabold">
                        9 bds
                      </span>
                    </div>
                    <div className="text-center mt-1">
                      <span className="px-1.5 py-0.5 rounded bg-black/70 text-[9px] text-white/80 border border-white/10">
                        Beach 67th (0.9 mi)
                      </span>
                    </div>
                  </div>

                  {/* SURF BREAK PIN - BEACH 90th */}
                  <div
                    onClick={() => {
                      setMapSelectedBreak(BEACHES[0])
                      setMapSelectedVan(null)
                    }}
                    className="absolute top-[68%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                  >
                    <div className="p-2 rounded-xl bg-emerald-600/90 border border-white/30 text-white flex items-center gap-1.5 shadow-lg group-hover:scale-110 transition-transform">
                      <Waves className="w-4 h-4 text-white" />
                      <div className="text-left">
                        <div className="text-[10px] font-bold leading-none">Beach 90th Break</div>
                        <div className="text-[9px] text-emerald-200">2–3 ft • GOOD</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Control Overlays */}
                <div className="relative z-10 p-3 flex justify-between items-center bg-black/40 backdrop-blur-sm border-b border-white/10">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="flex items-center gap-1 font-semibold text-white">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span> 2 Vans in Active Fleet
                    </span>
                    <span className="text-white/40">•</span>
                    <span className="text-white/70">17 Boards Available Today</span>
                  </div>
                  <div className="text-[11px] text-white/50">GPS: 40.5843° N, 73.8164° W</div>
                </div>

                <div className="relative z-10 p-3 bg-black/50 backdrop-blur-sm border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-4 text-white/70">
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-[#0066FF]"></div> SurfPass Van
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div> Surf Break
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-[#00D4FF]"></div> Your Location
                    </span>
                  </div>
                </div>
              </div>

              {/* Sidebar Detail Card (4 cols) */}
              <div className="lg:col-span-4 space-y-4">
                {mapSelectedVan && (
                  <div className="rounded-2xl bg-[#0C1222] border-2 border-[#0066FF]/40 p-5 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#0066FF]/20 text-cyan-400 flex items-center justify-center">
                          <Car className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-white">{mapSelectedVan.name}</h3>
                          <p className="text-xs text-white/60">{mapSelectedVan.beachName}</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                        {mapSelectedVan.status}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-white/60">Location:</span>
                        <span className="text-white font-medium">{mapSelectedVan.spot}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Distance:</span>
                        <span className="text-cyan-300 font-bold">{mapSelectedVan.distance} ({mapSelectedVan.walkTime})</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Operating Hours:</span>
                        <span className="text-white">{mapSelectedVan.hours}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Customer Wait:</span>
                        <span className="text-emerald-400 font-medium">0 min (Immediate Pickup)</span>
                      </div>
                    </div>

                    {/* Inventory breakdown */}
                    <div className="space-y-1.5">
                      <div className="text-xs font-bold text-white flex justify-between">
                        <span>Board Inventory ({mapSelectedVan.boardsAvailable} total)</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                          <div className="font-extrabold text-white">{mapSelectedVan.longboards}</div>
                          <div className="text-[10px] text-white/50">Longboards</div>
                        </div>
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                          <div className="font-extrabold text-white">{mapSelectedVan.funboards}</div>
                          <div className="text-[10px] text-white/50">Funboards</div>
                        </div>
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                          <div className="font-extrabold text-white">{mapSelectedVan.shortboards}</div>
                          <div className="text-[10px] text-white/50">Shortboards</div>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-2 pt-2">
                      <button
                        onClick={() => {
                          setSelectedVan(mapSelectedVan)
                          setShowVanModal(true)
                        }}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#0066FF] hover:bg-[#1A75FF] text-white font-bold text-xs shadow-md shadow-[#0066FF]/20 flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>View Boards in Van</span>
                      </button>

                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 font-medium text-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Navigate to Beach 90th Lot</span>
                      </a>
                    </div>
                  </div>
                )}

                {mapSelectedBreak && (
                  <div className="rounded-2xl bg-[#0C1222] border-2 border-emerald-500/40 p-5 space-y-4 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-base text-white">{mapSelectedBreak.name}</h3>
                        <p className="text-xs text-white/60">{mapSelectedBreak.breakName}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                        {mapSelectedBreak.quality}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 text-xs space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-white/60">Wave Height:</span>
                        <span className="text-white font-bold">{mapSelectedBreak.waveHeight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Wind:</span>
                        <span className="text-cyan-300 font-medium">{mapSelectedBreak.wind}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Tide:</span>
                        <span className="text-white">{mapSelectedBreak.tide}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Best Window:</span>
                        <span className="text-emerald-400 font-medium">{mapSelectedBreak.bestWindow}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedBeach(mapSelectedBreak)
                        setShowBeachModal(true)
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#0066FF] hover:bg-[#1A75FF] text-white font-bold text-xs"
                    >
                      View 12-Hour Forecast
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. RENTALS & DIGITAL PASSES */}
        {/* ========================================================================= */}
        {activeTab === 'rentals' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">My Rentals</h1>
                <p className="text-xs sm:text-sm text-white/60">
                  Active SurfPass rental passes, pickup locations, and refundable deposit statuses.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('home')}
                className="px-4 py-2 rounded-xl bg-[#0066FF] text-white text-xs font-semibold hover:bg-[#1A75FF] transition-all"
              >
                + Rent Another Board
              </button>
            </div>

            {rentals.length === 0 ? (
              <div className="p-12 rounded-2xl bg-[#0C1222] border border-white/10 text-center space-y-3">
                <Ticket className="w-12 h-12 text-white/20 mx-auto" />
                <h3 className="text-lg font-bold text-white">No active rentals</h3>
                <p className="text-xs text-white/60 max-w-sm mx-auto">
                  Find the nearest SurfPass van and reserve a board in seconds.
                </p>
                <button
                  onClick={() => setActiveTab('home')}
                  className="px-5 py-2 rounded-xl bg-[#0066FF] text-white text-xs font-bold"
                >
                  Explore Boards
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rentals.map((rental) => (
                  <div
                    key={rental.id}
                    className="rounded-2xl bg-[#0C1222] border border-white/15 p-5 space-y-4 shadow-xl relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold text-cyan-300">{rental.id}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              rental.status === 'ACTIVE'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-white/10 text-white/60'
                            }`}
                          >
                            {rental.status}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-white">{rental.boardName}</h3>
                        <p className="text-xs text-white/60">{rental.location} • {rental.spot}</p>
                      </div>

                      <div className="w-14 h-14 rounded-xl bg-black/40 border border-white/10 overflow-hidden flex-shrink-0">
                        <img
                          src={rental.boardImage}
                          alt={rental.boardName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs p-3 rounded-xl bg-white/5 border border-white/10">
                      <div>
                        <span className="text-white/40 block text-[10px]">Rental Window</span>
                        <span className="text-white font-medium">{rental.startTime} – {rental.endTime}</span>
                      </div>
                      <div>
                        <span className="text-white/40 block text-[10px]">Paid Via</span>
                        <span className="text-cyan-300 font-bold">{rental.paymentMethod}</span>
                      </div>
                      <div>
                        <span className="text-white/40 block text-[10px]">Rental Charge</span>
                        <span className="text-white font-medium">${rental.rentalPrice + rental.protection}</span>
                      </div>
                      <div>
                        <span className="text-white/40 block text-[10px]">Security Deposit</span>
                        <span
                          className={`font-bold ${
                            rental.depositStatus === 'HELD' ? 'text-amber-400' : 'text-emerald-400'
                          }`}
                        >
                          ${rental.deposit} ({rental.depositStatus === 'HELD' ? 'Held' : 'Released ✓'})
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => {
                          setActivePass(rental)
                          setShowPassModal(true)
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#0066FF] hover:bg-[#1A75FF] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>View Rental Pass</span>
                      </button>

                      {rental.status === 'ACTIVE' && (
                        <button
                          onClick={() => {
                            setActivePass(rental)
                            setShowReturnModal(true)
                          }}
                          className="py-2 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-1 transition-all"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Return Board</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. USER PROFILE & REPUTATION */}
        {/* ========================================================================= */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
            {/* User card */}
            <div className="rounded-2xl bg-[#0C1222] border border-white/15 p-6 space-y-5 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#0066FF] to-[#00D4FF] flex items-center justify-center text-white text-xl font-extrabold shadow-lg shadow-[#0066FF]/30">
                  P
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white">Patrick V.</h2>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                      Verified Surfer
                    </span>
                  </div>
                  <p className="text-xs text-white/60">Home Break: Rockaway Beach (Beach 90th)</p>
                  <p className="text-xs text-cyan-300 font-mono pt-0.5">
                    Wallet: {walletConnected ? walletAddress : 'Not connected'}
                  </p>
                </div>
              </div>

              {/* SurfPass Reputation Score */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#0F192E] to-[#0A1020] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">SurfPass Score</span>
                  </div>
                  <span className="text-xl font-extrabold text-cyan-300">94 / 100</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF] rounded-full w-[94%]"></div>
                </div>
                <p className="text-[11px] text-white/60">
                  Calculated from 17 completed sessions, on-time returns, and zero board damage claims.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-lg font-bold text-white">17</div>
                  <div className="text-[11px] text-white/50">Sessions</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-lg font-bold text-white">12</div>
                  <div className="text-[11px] text-white/50">Boards Rented</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-lg font-bold text-white">6</div>
                  <div className="text-[11px] text-white/50">Beaches Visited</div>
                </div>
              </div>

              {/* Favorite equipment */}
              <div className="space-y-2 text-xs">
                <div className="text-white/60 font-semibold uppercase text-[10px]">Surfer Preferences</div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-white/60">Preferred Shape:</span>
                    <span className="text-white font-medium">9'0 Longboard / 7'2 Mid-length</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Preferred Payment:</span>
                    <span className="text-cyan-300 font-bold">USDC on Solana</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 6. TATUM BLOCKCHAIN INFRASTRUCTURE PAGE */}
        {/* ========================================================================= */}
        {activeTab === 'infra' && (
          <div className="space-y-8 max-w-4xl mx-auto animate-fadeIn">
            {/* Header */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>Tatum Blockchain Infrastructure</span>
              </div>
              <h1 className="text-3xl font-extrabold text-white">Multi-Chain Settlement & Node Architecture</h1>
              <p className="text-sm text-white/70">
                How SurfPass integrates traditional consumer payments with multi-chain blockchain settlement through Tatum's unified API abstraction.
              </p>
            </div>

            {/* Architecture Flow Visual */}
            <div className="rounded-2xl bg-[#0C1222] border border-white/15 p-6 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400">Architecture Pipeline</h3>

              <div className="p-5 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-white/80 space-y-3">
                <div className="flex items-center gap-2 text-cyan-300 font-bold">
                  <span>Surfer initiates payment (USDC / BTC / Card)</span>
                </div>
                <div className="text-white/40 pl-4">↓</div>
                <div className="text-white font-semibold">SurfPass Checkout Gateway</div>
                <div className="text-white/40 pl-4">↓</div>
                <div className="text-[#00D4FF] font-bold">Tatum Unified Infrastructure</div>
                <div className="text-white/40 pl-4">↓</div>
                <div className="text-purple-300 font-semibold">Solana RPC + Real-Time Blockchain Events (or Bitcoin Gateway)</div>
                <div className="text-white/40 pl-4">↓</div>
                <div className="text-emerald-300 font-bold">Transaction Detected & Settlement Confirmation Monitored</div>
                <div className="text-white/40 pl-4">↓</div>
                <div className="text-white font-bold bg-white/5 p-2 rounded border border-white/10">
                  SurfPass Rental Pass Generated + Security Deposit Escrow Bound
                </div>
              </div>
            </div>

            {/* Four Infrastructure Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#0C1222] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 text-sm font-bold">
                  <Activity className="w-4 h-4" />
                  <h4>RPC Gateway</h4>
                </div>
                <p className="text-xs text-white/70">
                  Blockchain connectivity, block queries, and raw transaction broadcast access for Solana and Bitcoin.
                </p>
                <div className="pt-2 text-[11px] text-emerald-400 font-mono">
                  Status: Online & Connected via Tatum Gateway
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0C1222] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-purple-400 text-sm font-bold">
                  <Layers className="w-4 h-4" />
                  <h4>Blockchain Data</h4>
                </div>
                <p className="text-xs text-white/70">
                  Unified portfolio, token balances (USDC, SOL, BTC), incoming deposit logs, and onchain transaction history.
                </p>
                <div className="pt-2 text-[11px] text-purple-300 font-mono">
                  Live Rates: BTC ${rates.btcRate.toLocaleString()} • SOL ${rates.solRate}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0C1222] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                  <Zap className="w-4 h-4" />
                  <h4>Real-Time Events</h4>
                </div>
                <p className="text-xs text-white/70">
                  Event-driven payment monitoring and webhook streaming without inefficient continuous client-side polling loops.
                </p>
                <div className="pt-2 text-[11px] text-white/50 font-mono">
                  Subscribed: Deposit addresses & confirmation listeners
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0C1222] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-blue-400 text-sm font-bold">
                  <Wallet className="w-4 h-4" />
                  <h4>Wallet Infrastructure</h4>
                </div>
                <p className="text-xs text-white/70">
                  Seamless client wallet connectivity plus future embedded smart-wallet support so mainstream surfers never manage seed phrases.
                </p>
                <div className="pt-2 text-[11px] text-cyan-300 font-mono">
                  Multi-rail support: USDC / BTC / Apple Pay
                </div>
              </div>
            </div>

            {/* Note on abstraction */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Consumer Principle:</strong> Ordinary surfers never see RPC endpoints, block heights, or gas fees during booking. Blockchain operates as reliable financial plumbing underneath the consumer experience.
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* BOTTOM MOBILE NAVIGATION BAR */}
      {/* ========================================================================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#07090E]/95 backdrop-blur-lg border-t border-white/10 py-2 px-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'home' ? 'text-[#00D4FF]' : 'text-white/50 hover:text-white'
            }`}
          >
            <Waves className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('explore')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'explore' ? 'text-[#00D4FF]' : 'text-white/50 hover:text-white'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Explore</span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'map' ? 'text-[#00D4FF]' : 'text-white/50 hover:text-white'
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Live Map</span>
          </button>

          <button
            onClick={() => setActiveTab('rentals')}
            className={`flex flex-col items-center gap-1 transition-colors relative ${
              activeTab === 'rentals' ? 'text-[#00D4FF]' : 'text-white/50 hover:text-white'
            }`}
          >
            <Ticket className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Rentals</span>
            {rentals.filter((r) => r.status === 'ACTIVE').length > 0 && (
              <span className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-emerald-400"></span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'profile' ? 'text-[#00D4FF]' : 'text-white/50 hover:text-white'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Profile</span>
          </button>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* MODAL 1: BEACH DETAIL + 12-HOUR SURF FORECAST GRAPH */}
      {/* ========================================================================= */}
      {showBeachModal && selectedBeach && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="max-w-2xl w-full bg-[#0C1222] border border-white/15 rounded-3xl overflow-hidden shadow-2xl space-y-5 my-8">
            {/* Header Image */}
            <div className="relative h-56 w-full bg-black/50 overflow-hidden">
              <img
                src={selectedBeach.image}
                alt={selectedBeach.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C1222] via-transparent to-black/60"></div>

              <button
                onClick={() => setShowBeachModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                    {selectedBeach.quality}
                  </span>
                  <span className="text-xs text-white/80">{selectedBeach.region}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{selectedBeach.name}</h2>
                <p className="text-xs text-white/80">{selectedBeach.breakName} • {selectedBeach.city}, {selectedBeach.state}</p>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-6 pt-0">
              {/* Telemetry note */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                  <span className="font-semibold text-white">Demo Conditions Feed</span>
                  <span className="text-white/40">•</span>
                  <span className="text-cyan-300 font-medium">Surfline integration-ready</span>
                </div>
                <span className="text-[10px] text-white/40">Updated 5 min ago</span>
              </div>

              {/* Conditions grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white/40 block text-[10px] uppercase">Wave Height</span>
                  <span className="text-lg font-bold text-white">{selectedBeach.waveHeight}</span>
                  <span className="text-[10px] text-white/60 block">{selectedBeach.waveDesc}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white/40 block text-[10px] uppercase">Wind</span>
                  <span className="text-sm font-bold text-cyan-300">{selectedBeach.wind}</span>
                  <span className="text-[10px] text-white/60 block">Offshore & Clean</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white/40 block text-[10px] uppercase">Tide & Water</span>
                  <span className="text-sm font-bold text-white">{selectedBeach.tide}</span>
                  <span className="text-[10px] text-white/60 block">{selectedBeach.waterTemp} Water Temp</span>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-white/40 block text-[10px] uppercase">Swell</span>
                  <span className="text-sm font-bold text-white">{selectedBeach.swell}</span>
                  <span className="text-[10px] text-white/60 block">{selectedBeach.swellPeriod} period</span>
                </div>
              </div>

              {/* BEST SURF WINDOW HIGHLIGHT */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#0E2040] to-[#0A162C] border border-cyan-500/30 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-cyan-300">Best Surf Window</div>
                  <div className="text-base font-extrabold text-white">{selectedBeach.bestWindow}</div>
                  <p className="text-xs text-white/70 pt-0.5">{selectedBeach.bestWindowSub}</p>
                </div>
              </div>

              {/* 12-HOUR SURF FORECAST GRAPH */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span>12-Hour Surf Forecast Curve</span>
                  </h4>
                  <span className="text-[11px] text-cyan-400 font-semibold">Height vs Tide Trend</span>
                </div>

                <div className="h-44 w-full rounded-2xl bg-black/40 border border-white/10 p-2 pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={selectedBeach.hourly}>
                      <defs>
                        <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#0066FF" stopOpacity={0.0} />
                        </linearGradient>
                        <linearGradient id="tideGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" stroke="#717680" fontSize={10} tickLine={false} />
                      <YAxis stroke="#717680" fontSize={10} domain={[0, 6]} unit="ft" tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0C1222',
                          borderColor: '#0066FF',
                          borderRadius: '8px',
                          fontSize: '12px',
                          color: '#fff'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="heightFt"
                        name="Wave Height"
                        stroke="#00D4FF"
                        strokeWidth={2}
                        fill="url(#waveGrad)"
                      />
                      <Area
                        type="monotone"
                        dataKey="tideFt"
                        name="Tide Level"
                        stroke="#8B5CF6"
                        strokeWidth={1.5}
                        strokeDasharray="3 3"
                        fill="url(#tideGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Hourly Conditions Row */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-white uppercase tracking-wider">Hourly Breakdown</div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {selectedBeach.hourly.slice(0, 7).map((h, i) => (
                    <div
                      key={i}
                      className="min-w-[84px] p-2.5 rounded-xl bg-white/5 border border-white/10 text-center space-y-1 flex-shrink-0"
                    >
                      <div className="text-[11px] text-white/50">{h.time}</div>
                      <div className="text-xs font-extrabold text-white">{h.heightLabel}</div>
                      <div
                        className={`text-[9px] font-bold uppercase ${
                          h.quality === 'GOOD' ? 'text-emerald-400' : 'text-amber-400'
                        }`}
                      >
                        {h.quality}
                      </div>
                      <div className="text-[9px] text-white/40">{h.windDir} {h.windSpeed}m</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vans nearby on this beach */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-white flex items-center justify-between">
                  <span>SurfPass Vans Near {selectedBeach.name}</span>
                  <span className="text-xs text-cyan-300 font-semibold">{selectedBeach.vanCount} Vans Active</span>
                </h4>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">SurfPass Van #12</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                        OPEN
                      </span>
                    </div>
                    <p className="text-xs text-white/60">Beach 90th Street Boardwalk (0.2 mi away)</p>
                    <p className="text-xs text-cyan-300">8 boards available • 0 min wait</p>
                  </div>

                  <button
                    onClick={() => {
                      setShowBeachModal(false)
                      setSelectedVan(VANS[0])
                      setShowVanModal(true)
                    }}
                    className="px-4 py-2 rounded-xl bg-[#0066FF] text-white text-xs font-bold hover:bg-[#1A75FF] transition-all"
                  >
                    View Boards
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: VAN INVENTORY MODAL */}
      {/* ========================================================================= */}
      {showVanModal && selectedVan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="max-w-2xl w-full bg-[#0C1222] border border-white/15 rounded-3xl overflow-hidden shadow-2xl space-y-5 my-8">
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">{selectedVan.name}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                      {selectedVan.status}
                    </span>
                  </div>
                  <p className="text-xs text-white/60">{selectedVan.spot}</p>
                </div>

                <button
                  onClick={() => setShowVanModal(false)}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs text-center p-3 rounded-xl bg-white/5 border border-white/10">
                <div>
                  <span className="text-white/40 block text-[10px]">Distance</span>
                  <span className="text-white font-bold">{selectedVan.distance}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px]">Operating Hours</span>
                  <span className="text-white font-bold">{selectedVan.hours}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px]">Total Available</span>
                  <span className="text-emerald-400 font-bold">{selectedVan.boardsAvailable} Boards</span>
                </div>
              </div>

              {/* Boards in this van */}
              <div className="space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-white">
                  Available Surfboards in {selectedVan.name}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BOARDS.map((board) => (
                    <div
                      key={board.id}
                      className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between space-y-3"
                    >
                      <div className="flex gap-3">
                        <img
                          src={board.boardImage}
                          alt={board.name}
                          className="w-16 h-16 rounded-xl object-cover border border-white/10"
                        />
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-white leading-tight">{board.name}</h4>
                          <p className="text-[10px] text-white/60">{board.dimensions}</p>
                          <span className="inline-block px-1.5 py-0.2 rounded bg-white/10 text-[9px] text-cyan-300">
                            {board.availableCount} in stock
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <div>
                          <span className="text-sm font-extrabold text-white">${board.pricing.twoHours}</span>
                          <span className="text-[10px] text-white/50"> / 2 hrs</span>
                        </div>

                        <button
                          onClick={() => {
                            setShowVanModal(false)
                            handleStartCheckout(board)
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#0066FF] hover:bg-[#1A75FF] text-white font-bold text-xs"
                        >
                          Reserve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: CHECKOUT & TATUM SETTLEMENT SIMULATOR */}
      {/* ========================================================================= */}
      {showCheckoutModal && selectedBoard && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="max-w-lg w-full bg-[#0C1222] border border-white/15 rounded-3xl overflow-hidden shadow-2xl space-y-5 my-8 p-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-300">
                  Step 1 • Board Reservation
                </span>
                <h3 className="text-xl font-extrabold text-white">Reserve {selectedBoard.name}</h3>
                <p className="text-xs text-white/60">Pickup at {selectedBoard.vanName} • {selectedBoard.beachName}</p>
              </div>

              {checkoutStep !== 'processing' && (
                <button
                  onClick={() => setShowCheckoutModal(false)}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* REVIEW STAGE */}
            {checkoutStep === 'review' && (
              <div className="space-y-5">
                {/* Duration Picker */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white">Select Rental Duration</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setRentalDuration('2hrs')}
                      className={`p-3 rounded-xl text-center border transition-all ${
                        rentalDuration === '2hrs'
                          ? 'bg-[#0066FF] border-[#0066FF] text-white shadow-lg shadow-[#0066FF]/20'
                          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-xs font-bold">2 Hours</div>
                      <div className="text-sm font-extrabold mt-0.5">${selectedBoard.pricing.twoHours}</div>
                    </button>

                    <button
                      onClick={() => setRentalDuration('4hrs')}
                      className={`p-3 rounded-xl text-center border transition-all ${
                        rentalDuration === '4hrs'
                          ? 'bg-[#0066FF] border-[#0066FF] text-white shadow-lg shadow-[#0066FF]/20'
                          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-xs font-bold">4 Hours</div>
                      <div className="text-sm font-extrabold mt-0.5">${selectedBoard.pricing.fourHours}</div>
                    </button>

                    <button
                      onClick={() => setRentalDuration('fullday')}
                      className={`p-3 rounded-xl text-center border transition-all ${
                        rentalDuration === 'fullday'
                          ? 'bg-[#0066FF] border-[#0066FF] text-white shadow-lg shadow-[#0066FF]/20'
                          : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-xs font-bold">Full Day</div>
                      <div className="text-sm font-extrabold mt-0.5">${selectedBoard.pricing.fullDay}</div>
                    </button>
                  </div>
                </div>

                {/* Pricing & Deposit Breakdown */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-white/70">Board Rental ({rentalDuration === '2hrs' ? '2 Hours' : rentalDuration === '4hrs' ? '4 Hours' : 'Full Day'}):</span>
                    <span className="text-white font-bold">${rentalCost}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Optional Damage Protection:</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold">${selectedBoard.protectionFee}</span>
                      <input
                        type="checkbox"
                        checked={includeProtection}
                        onChange={(e) => setIncludeProtection(e.target.checked)}
                        className="rounded border-white/20"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between text-amber-300">
                    <span>Refundable Security Deposit:</span>
                    <span className="font-bold">${depositCost}</span>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex justify-between text-sm">
                    <span className="font-bold text-white">Total Authorization:</span>
                    <span className="font-extrabold text-cyan-300">${totalAuthorization} USD</span>
                  </div>

                  <div className="p-2 rounded bg-white/5 text-[10px] text-white/60">
                    💡 <strong className="text-white">${depositCost} deposit</strong> is immediately released upon returning the board in good condition. Net rental cost is <strong className="text-white">${rentalCost + protectionCost}</strong>.
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-white">Payment Method</label>

                  {/* USDC (RECOMMENDED) */}
                  <div
                    onClick={() => setPaymentMethod('USDC')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === 'USDC'
                        ? 'bg-[#0066FF]/20 border-[#0066FF] ring-2 ring-[#0066FF]/40'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#2775CA] text-white flex items-center justify-center font-bold text-xs">
                        $
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">USDC on Solana</span>
                          <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">
                            RECOMMENDED
                          </span>
                        </div>
                        <p className="text-[10px] text-white/60">Fast settlement • Low fees • Stable dollar value</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-cyan-300">{totalAuthorization} USDC</span>
                  </div>

                  {/* BITCOIN */}
                  <div
                    onClick={() => setPaymentMethod('BTC')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col gap-2 ${
                      paymentMethod === 'BTC'
                        ? 'bg-amber-500/10 border-amber-500/50 ring-2 ring-amber-500/30'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#F7931A] text-white flex items-center justify-center font-bold text-xs">
                          ₿
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Bitcoin (BTC)</div>
                          <p className="text-[10px] text-white/60">Rental charge in BTC (${rentalCost + protectionCost} USD)</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-amber-400">{btcAmount} BTC</span>
                    </div>

                    {paymentMethod === 'BTC' && (
                      <div className="p-2.5 rounded-lg bg-black/40 border border-white/10 text-[10px] text-white/70 space-y-1">
                        <p>
                          Due to BTC price volatility, the <strong className="text-white">${depositCost} refundable deposit</strong> is held via card authorization or USDC escrow.
                        </p>
                        <div className="flex gap-3 pt-1">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              name="btcDep"
                              checked={btcDepositMethod === 'CARD'}
                              onChange={() => setBtcDepositMethod('CARD')}
                            />
                            <span>Card Pre-Auth for $50</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="radio"
                              name="btcDep"
                              checked={btcDepositMethod === 'USDC'}
                              onChange={() => setBtcDepositMethod('USDC')}
                            />
                            <span>50 USDC Escrow</span>
                          </label>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* TRADITIONAL CARD / APPLE PAY */}
                  <div
                    onClick={() => setPaymentMethod('CARD')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      paymentMethod === 'CARD'
                        ? 'bg-purple-500/20 border-purple-500 ring-2 ring-purple-500/40'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/15 text-white flex items-center justify-center">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Credit Card / Apple Pay</div>
                        <p className="text-[10px] text-white/60">Standard checkout • No crypto wallet required</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-white">${totalAuthorization}.00</span>
                  </div>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={handleExecutePayment}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#0052D4] hover:from-[#1A75FF] hover:to-[#005CE6] text-white font-extrabold text-sm shadow-xl shadow-[#0066FF]/30 flex items-center justify-center gap-2 transition-all"
                >
                  <Zap className="w-4 h-4" />
                  <span>
                    Pay {paymentMethod === 'USDC' ? `${totalAuthorization} USDC` : paymentMethod === 'BTC' ? `${btcAmount} BTC` : `$${totalAuthorization}`} & Reserve
                  </span>
                </button>
              </div>
            )}

            {/* PROCESSING & SETTLEMENT ANIMATION */}
            {checkoutStep === 'processing' && (
              <div className="py-8 space-y-6 text-center">
                <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-[#0066FF]/20 border-t-[#00D4FF] animate-spin"></div>
                  <Waves className="w-8 h-8 text-[#00D4FF]" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-lg font-bold text-white">
                    {txStage === 0 && 'Waiting for payment'}
                    {txStage === 1 && 'Transaction detected'}
                    {txStage === 2 && 'Confirming on Solana'}
                    {txStage === 3 && 'Payment confirmed ✓'}
                    {txStage === 4 && 'Board reserved'}
                    {txStage === 5 && 'SurfPass Rental Pass created'}
                  </h4>

                  <p className="text-xs text-white/60">
                    {txStage <= 2 && 'Tatum Infrastructure monitoring settlement events...'}
                    {txStage >= 3 && 'Security deposit secured • Pass ready for pickup'}
                  </p>
                </div>

                {/* Status sequence */}
                <div className="max-w-xs mx-auto text-left space-y-2 p-3 rounded-xl bg-black/40 border border-white/10 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    {txStage >= 1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <span className="w-3.5 h-3.5 rounded-full border border-white/30"></span>}
                    <span className={txStage >= 1 ? 'text-white' : 'text-white/40'}>
                      Transaction detected <span className="text-[10px] text-cyan-400">(via Tatum)</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {txStage >= 2 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <span className="w-3.5 h-3.5 rounded-full border border-white/30"></span>}
                    <span className={txStage >= 2 ? 'text-white' : 'text-white/40'}>
                      Confirming on {paymentMethod === 'USDC' ? 'Solana' : paymentMethod === 'BTC' ? 'Bitcoin' : 'Payment Rail'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {txStage >= 3 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <span className="w-3.5 h-3.5 rounded-full border border-white/30"></span>}
                    <span className={txStage >= 3 ? 'text-white' : 'text-white/40'}>Payment confirmed</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {txStage >= 4 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <span className="w-3.5 h-3.5 rounded-full border border-white/30"></span>}
                    <span className={txStage >= 4 ? 'text-white' : 'text-white/40'}>Board reserved in Van #12</span>
                  </div>
                </div>
              </div>
            )}

            {/* CONFIRMED PASS GENERATION */}
            {checkoutStep === 'confirmed' && activePass && (
              <div className="space-y-5 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">Board Reserved!</h3>
                  <p className="text-xs text-white/60">Your SurfPass Rental Pass has been generated.</p>
                </div>

                <button
                  onClick={() => {
                    setShowCheckoutModal(false)
                    setShowPassModal(true)
                  }}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#0066FF] hover:bg-[#1A75FF] text-white font-extrabold text-xs shadow-lg shadow-[#0066FF]/20 flex items-center justify-center gap-2 transition-all"
                >
                  <QrCode className="w-4 h-4" />
                  <span>View SurfPass Rental Pass</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: SURFPASS DIGITAL RENTAL PASS (BOARDING PASS STYLE) */}
      {/* ========================================================================= */}
      {showPassModal && activePass && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="max-w-md w-full bg-[#0C1222] border border-white/20 rounded-3xl overflow-hidden shadow-2xl space-y-4 my-8">
            {/* Pass Top Banner */}
            <div className="bg-gradient-to-r from-[#0055FF] to-[#00A3FF] p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Waves className="w-6 h-6 text-white" />
                <div>
                  <h3 className="font-extrabold text-base tracking-tight">SURFPASS RENTAL PASS</h3>
                  <p className="text-[10px] text-white/80 uppercase font-mono">{activePass.id}</p>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded-full bg-white/20 text-white font-extrabold text-[10px]">
                {activePass.status}
              </span>
            </div>

            {/* Pass Body */}
            <div className="p-6 space-y-5 pt-1">
              <div className="flex items-center gap-3">
                <img
                  src={activePass.boardImage}
                  alt={activePass.boardName}
                  className="w-16 h-16 rounded-xl object-cover border border-white/10"
                />
                <div>
                  <h4 className="font-bold text-sm text-white">{activePass.boardName}</h4>
                  <p className="text-xs text-cyan-300 font-mono">Code: {activePass.boardCode}</p>
                  <p className="text-xs text-white/60">{activePass.vanName}</p>
                </div>
              </div>

              {/* Pass details */}
              <div className="grid grid-cols-2 gap-3 text-xs p-3.5 rounded-2xl bg-black/40 border border-white/10">
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Pickup Spot</span>
                  <span className="text-white font-medium">{activePass.spot}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Time Window</span>
                  <span className="text-white font-bold">{activePass.startTime} – {activePass.endTime}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Rental + Fee</span>
                  <span className="text-white font-medium">${activePass.rentalPrice + activePass.protection} ({activePass.paymentMethod})</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px] uppercase">Security Deposit</span>
                  <span className="text-amber-400 font-bold">${activePass.deposit} Held</span>
                </div>
              </div>

              {/* QR Code container */}
              <div className="p-4 rounded-2xl bg-white text-black text-center space-y-2">
                <div className="w-32 h-32 mx-auto bg-black flex items-center justify-center rounded-xl p-2">
                  {/* Stylized QR representation */}
                  <QrCode className="w-28 h-28 text-white" />
                </div>
                <p className="text-[11px] font-bold text-neutral-800">
                  Scan at SurfPass Van for Board Handover
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#0066FF] hover:bg-[#1A75FF] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Navigation className="w-4 h-4 text-cyan-300" />
                  <span>Navigate to Van (Beach 90th Lot)</span>
                </a>

                <button
                  onClick={() => setShowPassModal(false)}
                  className="w-full py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-xs font-semibold"
                >
                  Close Pass
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: RETURN BOARD & RELEASE DEPOSIT MODAL */}
      {/* ========================================================================= */}
      {showReturnModal && activePass && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="max-w-md w-full bg-[#0C1222] border border-white/20 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Return Board</h3>
                <p className="text-xs text-white/60">Van operator inspection & instant deposit release</p>
              </div>

              <button
                onClick={() => setShowReturnModal(false)}
                className="p-2 rounded-full bg-white/10 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-white/60">Board Code:</span>
                <span className="text-white font-mono font-bold">{activePass.boardCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Operator Van:</span>
                <span className="text-white font-medium">{activePass.vanName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Inspection Condition:</span>
                <span className="text-emerald-400 font-bold">Good (No Dings/Snaps)</span>
              </div>
              <div className="flex justify-between text-amber-300 pt-1 border-t border-white/10">
                <span>Deposit to Release:</span>
                <span className="font-extrabold text-sm">${activePass.deposit}.00 USD</span>
              </div>
            </div>

            {returnProcessing ? (
              <div className="p-4 rounded-xl bg-white/5 text-center space-y-2">
                <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-xs text-cyan-300 font-mono">Releasing deposit escrow via Tatum settlement...</p>
              </div>
            ) : returnSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 mx-auto" />
                <p className="text-xs font-bold text-white">Board Returned & $50 Deposit Released ✓</p>
                <p className="text-[10px] text-emerald-300">Transaction confirmed</p>
              </div>
            ) : (
              <button
                onClick={() => handleProcessReturn(activePass)}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Confirm Return & Release ${activePass.deposit} Deposit</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
