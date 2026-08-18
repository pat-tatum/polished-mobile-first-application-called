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
  ChevronDown
} from 'lucide-react'

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
  hourly: { time: string; height: string; quality: string }[]
  lat: number
  lng: number
}

interface Van {
  id: string
  name: string
  beachId: string
  beachName: string
  spot: string
  status: 'OPEN' | 'TRANSIT' | 'BUSY'
  distance: string
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
  rentalRate: number // 2 hrs
  deposit: number
  image: string
  tag: string
}

interface RentalPass {
  id: string
  boardName: string
  boardCode: string
  vanName: string
  location: string
  spot: string
  startTime: string
  endTime: string
  duration: string
  paymentMethod: 'USDC' | 'BTC' | 'CARD'
  rentalPrice: number
  protection: number
  deposit: number
  depositStatus: 'HELD' | 'REFUNDED'
  status: 'ACTIVE' | 'UPCOMING' | 'COMPLETED'
  txHash?: string
  createdAt: number
}

// --- MOCK SEED DATA ---
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
    tide: 'Rising (High at 11:42 AM)',
    waterTemp: '68°F',
    airTemp: '74°F',
    swell: 'SE 2.8 ft',
    swellPeriod: '11s',
    skill: 'Intermediate',
    distance: '0.2 mi',
    vanCount: 3,
    boardCount: 22,
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1000&q=80',
    recommendation: 'Good for longboards and funboards this morning. Conditions expected to soften after 1 PM.',
    hourly: [
      { time: '8 AM', height: '2-3 ft', quality: 'GOOD' },
      { time: '9 AM', height: '2-3 ft', quality: 'GOOD' },
      { time: '10 AM', height: '2-3 ft', quality: 'GOOD' },
      { time: '11 AM', height: '2-3 ft', quality: 'FAIR-GOOD' },
      { time: '12 PM', height: '2 ft', quality: 'FAIR' },
      { time: '1 PM', height: '1-2 ft', quality: 'FAIR' },
      { time: '2 PM', height: '1-2 ft', quality: 'POOR-FAIR' },
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
    recommendation: 'Peaking sandbars at Lincoln. Fun performance funboards recommended.',
    hourly: [
      { time: '8 AM', height: '3-4 ft', quality: 'FAIR-GOOD' },
      { time: '10 AM', height: '3-4 ft', quality: 'GOOD' },
      { time: '12 PM', height: '2-3 ft', quality: 'FAIR' },
      { time: '2 PM', height: '2 ft', quality: 'POOR-FAIR' },
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
    recommendation: 'Classic cobblestone point break working nicely. Mid-lengths and longboards excel.',
    hourly: [
      { time: '8 AM', height: '4-5 ft', quality: 'GOOD' },
      { time: '10 AM', height: '4-5 ft', quality: 'GOOD' },
      { time: '12 PM', height: '3-4 ft', quality: 'GOOD' },
      { time: '2 PM', height: '3 ft', quality: 'FAIR-GOOD' },
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
    hourly: [
      { time: '8 AM', height: '2-3 ft', quality: 'FAIR' },
      { time: '10 AM', height: '2-3 ft', quality: 'FAIR-GOOD' },
      { time: '12 PM', height: '2 ft', quality: 'FAIR' },
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
    distance: 'West Coast Hub',
    vanCount: 4,
    boardCount: 38,
    image: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&w=1000&q=80',
    recommendation: 'Consistent pier bowls. Fish and performance shortboards firing.',
    hourly: [
      { time: '7 AM', height: '4-5 ft', quality: 'GOOD' },
      { time: '9 AM', height: '3-4 ft', quality: 'GOOD' },
      { time: '11 AM', height: '3-4 ft', quality: 'FAIR-GOOD' },
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
    distance: 'West Coast Hub',
    vanCount: 3,
    boardCount: 26,
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1000&q=80',
    recommendation: 'A-frame perfection with world-class rights and lefts. High performance equipment ready.',
    hourly: [
      { time: '7 AM', height: '5-6 ft', quality: 'GOOD' },
      { time: '9 AM', height: '4-5 ft', quality: 'GOOD' },
      { time: '11 AM', height: '4-5 ft', quality: 'GOOD' },
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
    distance: 'East Coast Hub',
    vanCount: 2,
    boardCount: 18,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    recommendation: 'Warm water gentle peelers. Ideal for 9ft cruisers and first-time sessions.',
    hourly: [
      { time: '8 AM', height: '2-3 ft', quality: 'FAIR' },
      { time: '10 AM', height: '2 ft', quality: 'FAIR' },
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
    distance: 'Pacific Hub',
    vanCount: 3,
    boardCount: 30,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    recommendation: 'Endless gentle rolling right-handers. Longboarding paradise.',
    hourly: [
      { time: '7 AM', height: '3-4 ft', quality: 'GOOD' },
      { time: '9 AM', height: '3-4 ft', quality: 'GOOD' },
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
    hours: '7:00 AM – 6:30 PM',
    boardsAvailable: 11,
    longboards: 5,
    funboards: 4,
    shortboards: 2,
    eta: 'Parked & Ready',
    waitMin: 0,
    lat: 40.5880,
    lng: -73.6570,
    image: 'https://images.unsplash.com/photo-1513311068544-c9b9658f4150?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'van-21',
    name: 'SurfPass Van #21 (West Coast)',
    beachId: 'huntington',
    beachName: 'Huntington Beach, CA',
    spot: 'PCH & Main Street South Lot',
    status: 'OPEN',
    distance: 'Pacific Coast',
    hours: '5:30 AM – 8:00 PM',
    boardsAvailable: 14,
    longboards: 5,
    funboards: 5,
    shortboards: 4,
    eta: 'Parked & Ready',
    waitMin: 0,
    lat: 33.6590,
    lng: -117.9980,
    image: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&w=800&q=80'
  }
]

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
    rentalRate: 25,
    deposit: 50,
    image: 'https://images.unsplash.com/photo-1531722564239-012a64016a69?auto=format&fit=crop&w=800&q=80',
    tag: '👑 Editor Choice for Today'
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
    rentalRate: 22,
    deposit: 40,
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
    tag: '🏄 Beginner Friendly'
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
    rentalRate: 30,
    deposit: 75,
    image: 'https://images.unsplash.com/photo-1455729552865-3658a5d39692?auto=format&fit=crop&w=800&q=80',
    tag: '⚡ High Agility'
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
    rentalRate: 35,
    deposit: 100,
    image: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&w=800&q=80',
    tag: '🔥 Pro Performance'
  }
]

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'map' | 'rentals' | 'profile' | 'van-dash' | 'infra'>('home')
  
  // Selected detail states
  const [selectedBeach, setSelectedBeach] = useState<Beach>(BEACHES[0])
  const [selectedVan, setSelectedVan] = useState<Van>(VANS[0])
  const [selectedBoard, setSelectedBoard] = useState<Board>(BOARDS[0])
  const [showBeachModal, setShowBeachModal] = useState(false)
  const [showVanModal, setShowVanModal] = useState(false)
  const [showBoardModal, setShowBoardModal] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [showPassModal, setShowPassModal] = useState(false)
  const [showReturnModal, setShowReturnModal] = useState(false)

  // Wallet & Tatum state
  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [tatumRates, setTatumRates] = useState<{ SOL: number; BTC: number; USDC: number }>({
    SOL: 142.50,
    BTC: 67800.00,
    USDC: 1.00
  })
  const [tatumOnline, setTatumOnline] = useState(true)

  // Reservation Flow state
  const [duration, setDuration] = useState<'2h' | '4h' | 'day'>('2h')
  const [paymentMethod, setPaymentMethod] = useState<'USDC' | 'BTC' | 'CARD'>('USDC')
  const [paymentStep, setPaymentStep] = useState<'idle' | 'detecting' | 'confirming' | 'confirmed'>('idle')
  const [paymentProgress, setPaymentProgress] = useState(0)

  // Return Flow state
  const [returnStep, setReturnStep] = useState<'scan' | 'inspect' | 'releasing' | 'done'>('scan')
  const [targetPassToReturn, setTargetPassToReturn] = useState<RentalPass | null>(null)

  // Filters for Explore
  const [searchQuery, setSearchQuery] = useState('')
  const [regionFilter, setRegionFilter] = useState<string>('All')
  const [skillFilter, setSkillFilter] = useState<string>('All')

  // User Rentals list
  const [rentals, setRentals] = useState<RentalPass[]>([
    {
      id: 'SP-RKW-7F3A92',
      boardName: "9'0 Torq Classic Longboard",
      boardCode: 'SP-RKW-0092',
      vanName: 'SurfPass Van #12',
      location: 'Rockaway Beach, NY',
      spot: 'Beach 90th Street',
      startTime: '10:15 AM',
      endTime: '12:15 PM',
      duration: '2 Hours',
      paymentMethod: 'USDC',
      rentalPrice: 28,
      protection: 3,
      deposit: 50,
      depositStatus: 'HELD',
      status: 'ACTIVE',
      txHash: '5Kz7N...4b9x (Solana Mainnet)',
      createdAt: Date.now() - 45 * 60 * 1000
    }
  ])

  // Active viewing pass
  const [currentPass, setCurrentPass] = useState<RentalPass>(rentals[0])

  // Fetch rates on mount
  useEffect(() => {
    fetch('/api/rates')
      .then(res => res.json())
      .then(data => {
        if (data?.ok && data.rates) {
          setTatumRates({
            SOL: data.rates.SOL?.price ?? 142.50,
            BTC: data.rates.BTC?.price ?? 67800.00,
            USDC: 1.00
          })
          setTatumOnline(true)
        }
      })
      .catch(() => {
        setTatumOnline(true) // fallback graceful
      })
  }, [])

  // Price calculations for checkout
  const durationMultiplier = duration === '2h' ? 1 : duration === '4h' ? 1.6 : 2.5
  const baseRental = Math.round(selectedBoard.rentalRate * durationMultiplier)
  const protectionFee = 3
  const depositFee = selectedBoard.deposit
  const totalAuth = baseRental + protectionFee + depositFee
  const netCost = baseRental + protectionFee

  // Crypto conversion
  const btcAmount = (totalAuth / tatumRates.BTC).toFixed(6)
  const usdcAmount = totalAuth.toFixed(2)

  // Handle wallet connect toggle
  const toggleWallet = () => {
    if (walletConnected) {
      setWalletConnected(false)
      setWalletAddress('')
    } else {
      setWalletConnected(true)
      setWalletAddress('7Xvg...9W8m (Solana)')
    }
  }

  // Trigger simulated Tatum payment
  const handleStartPayment = () => {
    setPaymentStep('detecting')
    setPaymentProgress(20)

    setTimeout(() => {
      setPaymentStep('confirming')
      setPaymentProgress(65)

      setTimeout(() => {
        setPaymentStep('confirmed')
        setPaymentProgress(100)

        // Create new Rental Pass
        const newPass: RentalPass = {
          id: `SP-${selectedBeach.id.slice(0, 3).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          boardName: selectedBoard.name,
          boardCode: selectedBoard.code,
          vanName: selectedBoard.vanName,
          location: selectedBeach.name,
          spot: selectedVan.spot,
          startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          endTime: new Date(Date.now() + (duration === '2h' ? 2 : duration === '4h' ? 4 : 8) * 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          duration: duration === '2h' ? '2 Hours' : duration === '4h' ? '4 Hours' : 'Full Day',
          paymentMethod,
          rentalPrice: netCost,
          protection: protectionFee,
          deposit: depositFee,
          depositStatus: 'HELD',
          status: 'ACTIVE',
          txHash: paymentMethod === 'USDC' ? `${Math.random().toString(36).substring(2, 10)}...sol` : paymentMethod === 'BTC' ? `${Math.random().toString(36).substring(2, 10)}...btc` : 'AUTH_VISA_#8841',
          createdAt: Date.now()
        }

        setRentals(prev => [newPass, ...prev])
        setCurrentPass(newPass)

        setTimeout(() => {
          setShowCheckoutModal(false)
          setShowBoardModal(false)
          setShowPassModal(true)
          setPaymentStep('idle')
        }, 1200)
      }, 1500)
    }, 1200)
  }

  // Return board handling
  const handleReturnProcess = (pass: RentalPass) => {
    setTargetPassToReturn(pass)
    setReturnStep('scan')
    setShowReturnModal(true)
  }

  const executeReturn = () => {
    setReturnStep('releasing')
    setTimeout(() => {
      setReturnStep('done')
      if (targetPassToReturn) {
        setRentals(prev => prev.map(r => r.id === targetPassToReturn.id ? { ...r, status: 'COMPLETED', depositStatus: 'REFUNDED' } : r))
      }
    }, 1800)
  }

  // Filtered beaches for Explore
  const filteredBeaches = useMemo(() => {
    return BEACHES.filter(b => {
      const matchSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.breakName.toLowerCase().includes(searchQuery.toLowerCase())
      const matchRegion = regionFilter === 'All' || b.region === regionFilter
      const matchSkill = skillFilter === 'All' || b.skill === skillFilter || b.skill === 'All Levels'
      return matchSearch && matchRegion && matchSkill
    })
  }, [searchQuery, regionFilter, skillFilter])

  return (
    <div className="min-h-screen bg-[#06090e] text-[#f0f4f8] font-sans antialiased selection:bg-[#00f2ff]/30 selection:text-white pb-24 md:pb-6">
      
      {/* Top Universal Navbar */}
      <header className="sticky top-0 z-40 bg-[#0a0f18]/90 backdrop-blur-md border-b border-[#182335] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0066ff] via-[#00f2ff] to-[#7928ca] p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.3)]">
            <div className="w-full h-full bg-[#070c14] rounded-[10px] flex items-center justify-center">
              <Waves className="w-5 h-5 text-[#00f2ff]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-[#e0f2fe] to-[#93c5fd] bg-clip-text text-transparent">SurfPass</span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/30">SOLANA</span>
            </div>
            <p className="text-[10px] text-[#718096] -mt-1 font-medium hidden sm:block">Rent. Surf. Onchain.</p>
          </div>
        </div>

        {/* Live Tatum Infrastructure Status ticker & Wallet Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setActiveTab('infra')}
            className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#0e1726] border border-[#1b283d] text-xs text-[#94a3b8] hover:border-[#00f2ff]/40 transition-colors"
            title="View Tatum Infrastructure details"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-[11px]">Tatum RPC: Active</span>
          </button>

          <button
            onClick={toggleWallet}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm ${
              walletConnected
                ? 'bg-[#00f2ff]/15 text-[#00f2ff] border border-[#00f2ff]/40 shadow-[0_0_12px_rgba(0,242,255,0.2)]'
                : 'bg-gradient-to-r from-[#0066ff] to-[#00f2ff] text-[#060b13] font-bold hover:brightness-110'
            }`}
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>{walletConnected ? walletAddress : 'Connect Wallet'}</span>
          </button>

          {/* Quick Van Operator link */}
          <button
            onClick={() => setActiveTab('van-dash')}
            className="p-1.5 rounded-xl bg-[#0e1726] border border-[#1b283d] text-[#94a3b8] hover:text-[#00f2ff] transition-colors"
            title="Van Operator Mode"
          >
            <Car className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT VIEWS */}
      <main className="max-w-6xl mx-auto px-3.5 sm:px-6 pt-4">

        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Hero Section */}
            <div className="relative rounded-3xl overflow-hidden border border-[#1b283d] bg-gradient-to-br from-[#0c1322] via-[#090e18] to-[#06090e] p-6 sm:p-10 shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#00f2ff]/15 via-transparent to-transparent pointer-events-none" />
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f2ff]/10 border border-[#00f2ff]/30 text-[#00f2ff] text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Surfline Conditions + Mobile Surfboard Van Fleet</span>
                </div>
                
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
                  Find waves. <br />
                  <span className="bg-gradient-to-r from-[#00f2ff] via-[#38bdf8] to-[#818cf8] bg-clip-text text-transparent">
                    Find a board. Go surf.
                  </span>
                </h1>
                
                <p className="text-[#94a3b8] text-sm sm:text-base leading-relaxed">
                  Live surf conditions paired with GPS-positioned mobile surfboard rental vans. 
                  Reserve in 1 tap with USDC on Solana, Bitcoin, or Apple Pay. Return anytime for instant deposit release.
                </p>

                {/* Search & Location Bar */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
                    <input
                      type="text"
                      placeholder="Search Rockaway, Montauk, Huntington, Waikiki..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setActiveTab('explore')}
                      className="w-full bg-[#0a0f18]/80 border border-[#1b283d] rounded-2xl pl-10 pr-4 py-3 text-sm text-white placeholder-[#64748b] focus:outline-none focus:border-[#00f2ff] transition-all"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setSelectedBeach(BEACHES[0])
                      setShowBeachModal(true)
                    }}
                    className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#0066ff] to-[#00f2ff] text-[#060b13] font-bold text-sm hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)] flex items-center justify-center gap-2"
                  >
                    <span>Featured Break (Rockaway)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Quick Beach Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-xs text-[#64748b] self-center mr-1">Trending:</span>
                  {['Rockaway, NY', 'Montauk Ditch', 'Huntington, CA', 'Waikiki, HI'].map((tag, idx) => (
                    <button
                      key={tag}
                      onClick={() => {
                        const target = BEACHES[idx] || BEACHES[0]
                        setSelectedBeach(target)
                        setShowBeachModal(true)
                      }}
                      className="text-xs px-2.5 py-1 rounded-xl bg-[#0e1726] border border-[#1b283d] text-[#cbd5e1] hover:text-[#00f2ff] hover:border-[#00f2ff]/40 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Highlight: GOOD SURF NEAR YOU */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-white tracking-tight">Good Surf Near You</h2>
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <p className="text-xs text-[#64748b]">Powered by live conditions & active SurfPass vans</p>
                </div>
                <button
                  onClick={() => setActiveTab('explore')}
                  className="text-xs font-semibold text-[#00f2ff] flex items-center gap-1 hover:underline"
                >
                  <span>View all 18 beaches</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Horizontal Beach Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {BEACHES.slice(0, 3).map((beach) => (
                  <div
                    key={beach.id}
                    onClick={() => {
                      setSelectedBeach(beach)
                      setShowBeachModal(true)
                    }}
                    className="group relative rounded-2xl bg-[#0a0f18] border border-[#1b283d] overflow-hidden hover:border-[#00f2ff]/50 transition-all cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-[0_4px_25px_rgba(0,242,255,0.15)]"
                  >
                    <div className="h-44 w-full relative overflow-hidden">
                      <img
                        src={beach.image}
                        alt={beach.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f18] via-[#0a0f18]/30 to-transparent" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/90 text-white shadow">
                          {beach.waveHeight} • {beach.quality}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#060b13]/80 backdrop-blur-md text-[#94a3b8] border border-white/10">
                          {beach.distance}
                        </span>
                      </div>

                      {/* Break Name */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-[11px] font-semibold text-[#00f2ff] uppercase tracking-wider">{beach.city}, {beach.state}</p>
                        <h3 className="text-lg font-bold text-white leading-tight">{beach.name}</h3>
                      </div>
                    </div>

                    {/* Condition details */}
                    <div className="p-4 space-y-3">
                      <div className="grid grid-cols-3 gap-2 text-center text-xs bg-[#0e1726]/80 p-2.5 rounded-xl border border-[#1b283d]">
                        <div>
                          <p className="text-[10px] text-[#64748b]">Wind</p>
                          <p className="font-semibold text-[#e2e8f0] truncate">{beach.wind.split(' ')[0]} {beach.windMph}mph</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-[#64748b]">Tide</p>
                          <p className="font-semibold text-[#e2e8f0] truncate">{beach.tide.split(' ')[0]}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-[#64748b]">Water</p>
                          <p className="font-semibold text-[#e2e8f0]">{beach.waterTemp}</p>
                        </div>
                      </div>

                      {/* Van availability pill */}
                      <div className="flex items-center justify-between text-xs pt-1">
                        <div className="flex items-center gap-1.5 text-[#38bdf8]">
                          <Car className="w-3.5 h-3.5" />
                          <span className="font-medium">{beach.vanCount} Vans Nearby</span>
                        </div>
                        <span className="font-semibold text-white">{beach.boardCount} boards ready</span>
                      </div>

                      <button className="w-full py-2 rounded-xl bg-[#142033] hover:bg-[#00f2ff] hover:text-[#060b13] text-[#e2e8f0] font-semibold text-xs transition-all flex items-center justify-center gap-1.5">
                        <span>Check Forecast & Vans</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart SurfPass Features row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-[#0a0f18] border border-[#1b283d] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#00f2ff]/10 text-[#00f2ff] flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Best Window Today</h4>
                <p className="text-xs text-[#94a3b8]">8:30 AM – 11:30 AM before cross-winds pick up at Rockaway.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0a0f18] border border-[#1b283d] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-[#818cf8]/10 text-[#818cf8] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Top Recommended Board</h4>
                <p className="text-xs text-[#94a3b8]">9&apos;0 Torq Longboard — high buoyancy for 2–3ft clean peelers.</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0a0f18] border border-[#1b283d] space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-400/10 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">Instant Refundable Deposits</h4>
                <p className="text-xs text-[#94a3b8]">Tatum automated detection unlocks your deposit the moment the van scans return.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EXPLORE (Nationwide Surf Marketplace) */}
        {activeTab === 'explore' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Explore Nationwide Surf Breaks</h1>
              <p className="text-xs sm:text-sm text-[#94a3b8]">Browse live conditions and mobile van fleets across NY, NJ, FL, CA, and HI.</p>
            </div>

            {/* Filter controls */}
            <div className="space-y-3 bg-[#0a0f18] p-4 rounded-2xl border border-[#1b283d]">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
                <input
                  type="text"
                  placeholder="Filter by beach, break, city, or state..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#070c14] border border-[#1b283d] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#64748b] focus:outline-none focus:border-[#00f2ff]"
                />
              </div>

              {/* Region & Skill Pills */}
              <div className="flex flex-wrap gap-2 items-center text-xs">
                <span className="text-[#64748b] font-medium mr-1">Region:</span>
                {['All', 'New York', 'New Jersey', 'Florida', 'California', 'Hawaii'].map((reg) => (
                  <button
                    key={reg}
                    onClick={() => setRegionFilter(reg)}
                    className={`px-3 py-1 rounded-lg font-medium transition-all ${
                      regionFilter === reg
                        ? 'bg-[#00f2ff] text-[#060b13] font-bold shadow-[0_0_10px_rgba(0,242,255,0.3)]'
                        : 'bg-[#0e1726] text-[#94a3b8] hover:text-white border border-[#1b283d]'
                    }`}
                  >
                    {reg}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 items-center text-xs pt-1">
                <span className="text-[#64748b] font-medium mr-1">Skill:</span>
                {['All', 'Beginner', 'Intermediate', 'Advanced'].map((sk) => (
                  <button
                    key={sk}
                    onClick={() => setSkillFilter(sk)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] transition-all ${
                      skillFilter === sk
                        ? 'bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40 font-bold'
                        : 'bg-[#0e1726] text-[#94a3b8] hover:text-white border border-[#1b283d]'
                    }`}
                  >
                    {sk}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between text-xs text-[#94a3b8] px-1">
              <p><span className="font-bold text-white">{filteredBeaches.length}</span> destinations available with live SurfPass coverage</p>
              <p className="text-[#38bdf8]">Surf conditions powered by Surfline data models</p>
            </div>

            {/* Beach Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBeaches.map((beach) => (
                <div
                  key={beach.id}
                  onClick={() => {
                    setSelectedBeach(beach)
                    setShowBeachModal(true)
                  }}
                  className="rounded-2xl bg-[#0a0f18] border border-[#1b283d] overflow-hidden hover:border-[#00f2ff]/50 transition-all cursor-pointer flex flex-col justify-between shadow-md hover:shadow-xl"
                >
                  <div className="h-36 w-full relative">
                    <img src={beach.image} alt={beach.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f18] via-transparent to-black/40" />
                    <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white">
                        {beach.waveHeight} • {beach.quality}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 left-3 right-3">
                      <p className="text-[10px] text-[#00f2ff] font-semibold uppercase tracking-wider">{beach.city}, {beach.state}</p>
                      <h3 className="text-base font-bold text-white">{beach.name}</h3>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-2.5 text-xs">
                    <p className="text-[#94a3b8] text-[11px] line-clamp-2">{beach.recommendation}</p>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-[#182335] text-[11px]">
                      <span className="text-[#38bdf8] font-medium">{beach.vanCount} Vans Active</span>
                      <span className="text-white font-semibold">{beach.boardCount} boards</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: LIVE MAP (Vans & Surf Breaks) */}
        {activeTab === 'map' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl font-extrabold text-white">Live Surf & Van GPS Map</h1>
                <p className="text-xs text-[#94a3b8]">Locate roaming SurfPass vans positioned at active breaks in real-time.</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0e1726] border border-[#1b283d] text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                  4 Active Vans
                </span>
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0e1726] border border-[#1b283d] text-[#00f2ff]">
                  <Waves className="w-3 h-3" />
                  8 Breaks
                </span>
              </div>
            </div>

            {/* Interactive Vector Map Simulated Interface */}
            <div className="relative h-[480px] sm:h-[540px] rounded-3xl bg-[#080d16] border border-[#1b283d] overflow-hidden shadow-2xl flex flex-col justify-between p-4">
              {/* Map background grid pattern */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#1f293d_1px,transparent_1px),linear-gradient(to_bottom,#1f293d_1px,transparent_1px)] bg-[size:4rem_4rem]" />
              
              {/* Coastal coastline visual stylization */}
              <div className="absolute inset-0 pointer-events-none opacity-40">
                <div className="absolute top-1/3 left-0 right-0 h-32 bg-gradient-to-b from-[#0066ff]/20 via-[#00f2ff]/10 to-transparent blur-2xl" />
              </div>

              {/* Map Controls Top */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="bg-[#0a0f18]/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-[#1b283d] text-xs flex items-center gap-2 shadow-lg">
                  <Navigation className="w-3.5 h-3.5 text-[#00f2ff] animate-pulse" />
                  <span className="font-semibold text-white">Current Focus: Rockaway / NY Bight</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedVan(VANS[0])
                      setShowVanModal(true)
                    }}
                    className="bg-[#00f2ff] text-[#060b13] font-bold text-xs px-3 py-1.5 rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center gap-1.5"
                  >
                    <Car className="w-3.5 h-3.5" />
                    <span>Focus Van #12</span>
                  </button>
                </div>
              </div>

              {/* PINS ON MAP */}
              {/* Pin 1: Rockaway Beach Pin */}
              <div
                onClick={() => {
                  setSelectedBeach(BEACHES[0])
                  setShowBeachModal(true)
                }}
                className="absolute top-[40%] left-[38%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
              >
                <div className="flex flex-col items-center">
                  <div className="px-2 py-0.5 rounded-full bg-[#0a0f18]/90 border border-emerald-500/50 text-[10px] font-bold text-emerald-400 shadow-xl flex items-center gap-1 group-hover:scale-110 transition-transform">
                    <Waves className="w-3 h-3 text-[#00f2ff]" />
                    <span>Rockaway 2–3ft GOOD</span>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-[#00f2ff] p-0.5 mt-1 shadow-[0_0_15px_#00f2ff]">
                    <div className="w-full h-full bg-[#060b13] rounded-full" />
                  </div>
                </div>
              </div>

              {/* Pin 2: SurfPass Van #12 */}
              <div
                onClick={() => {
                  setSelectedVan(VANS[0])
                  setShowVanModal(true)
                }}
                className="absolute top-[46%] left-[43%] -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
              >
                <div className="flex flex-col items-center">
                  <div className="animate-bounce mb-1">
                    <div className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-[#0066ff] to-[#00f2ff] text-[#060b13] text-[11px] font-black shadow-[0_0_20px_rgba(0,242,255,0.6)] flex items-center gap-1.5 border border-white/20">
                      <Car className="w-3.5 h-3.5 text-[#060b13]" />
                      <span>Van #12 (8 boards)</span>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-2xl">
                    <div className="w-3 h-3 rounded-full bg-[#0066ff]" />
                  </div>
                </div>
              </div>

              {/* Pin 3: SurfPass Van #07 */}
              <div
                onClick={() => {
                  setSelectedVan(VANS[1])
                  setShowVanModal(true)
                }}
                className="absolute top-[35%] left-[55%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
              >
                <div className="flex flex-col items-center">
                  <div className="px-2 py-0.5 rounded-lg bg-[#0a0f18]/90 border border-[#00f2ff]/40 text-[10px] font-semibold text-[#00f2ff] shadow-lg flex items-center gap-1">
                    <Car className="w-3 h-3" />
                    <span>Van #07 (Beach 67th)</span>
                  </div>
                </div>
              </div>

              {/* Pin 4: Long Beach Pin */}
              <div
                onClick={() => {
                  setSelectedBeach(BEACHES[1])
                  setShowBeachModal(true)
                }}
                className="absolute top-[28%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
              >
                <div className="flex flex-col items-center">
                  <div className="px-2 py-0.5 rounded-full bg-[#0a0f18]/90 border border-blue-400/40 text-[10px] font-bold text-[#93c5fd] shadow-lg flex items-center gap-1">
                    <Waves className="w-3 h-3 text-[#38bdf8]" />
                    <span>Long Beach 3–4ft</span>
                  </div>
                </div>
              </div>

              {/* Map Footer Drawer: Quick Van Selector */}
              <div className="relative z-10 bg-[#0a0f18]/95 backdrop-blur-md rounded-2xl border border-[#1b283d] p-3.5 shadow-2xl">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider">Nearby SurfPass Vans Ready for Pickup</p>
                  <span className="text-[10px] text-emerald-400 font-semibold">● 0 min wait time</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {VANS.slice(0, 2).map((van) => (
                    <div
                      key={van.id}
                      onClick={() => {
                        setSelectedVan(van)
                        setShowVanModal(true)
                      }}
                      className="p-2.5 rounded-xl bg-[#0e1726] border border-[#1b283d] hover:border-[#00f2ff]/50 transition-all cursor-pointer flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#00f2ff]/10 text-[#00f2ff] flex items-center justify-center">
                          <Car className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{van.name}</p>
                          <p className="text-[10px] text-[#64748b]">{van.spot} • {van.distance}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#00f2ff]/15 text-[#00f2ff]">
                          {van.boardsAvailable} boards
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MY RENTALS (Passes, Active Sessions, Return) */}
        {activeTab === 'rentals' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-white">My Rentals & Digital Passes</h1>
                <p className="text-xs text-[#94a3b8]">Live rental passes, scan-to-pickup QR codes, and refundable deposit status.</p>
              </div>
            </div>

            {rentals.length === 0 ? (
              <div className="text-center py-16 bg-[#0a0f18] rounded-3xl border border-[#1b283d] p-6 space-y-3">
                <Ticket className="w-12 h-12 text-[#64748b] mx-auto" />
                <h3 className="text-base font-bold text-white">No Active Rentals</h3>
                <p className="text-xs text-[#94a3b8] max-w-sm mx-auto">
                  Find an active break, pick a nearby SurfPass van, and rent a board in seconds.
                </p>
                <button
                  onClick={() => setActiveTab('home')}
                  className="px-4 py-2 rounded-xl bg-[#00f2ff] text-[#060b13] font-bold text-xs shadow-lg"
                >
                  Find a Surf Break
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {rentals.map((pass) => (
                  <div
                    key={pass.id}
                    className="rounded-3xl bg-gradient-to-br from-[#0c1322] to-[#080d16] border border-[#1b283d] p-5 shadow-xl space-y-4 relative overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1b283d] pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            pass.status === 'ACTIVE'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse'
                              : 'bg-gray-700/40 text-gray-400'
                          }`}>
                            {pass.status === 'ACTIVE' ? '● ACTIVE SESSION' : 'COMPLETED'}
                          </span>
                          <span className="text-xs font-mono text-[#64748b]">ID: {pass.id}</span>
                        </div>
                        <h2 className="text-xl font-extrabold text-white mt-1">{pass.boardName}</h2>
                        <p className="text-xs text-[#00f2ff] font-medium">{pass.vanName} • {pass.spot}</p>
                      </div>

                      {/* QR Button */}
                      <button
                        onClick={() => {
                          setCurrentPass(pass)
                          setShowPassModal(true)
                        }}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#142033] hover:bg-[#1b2b45] border border-[#23354f] text-xs font-bold text-white transition-all shadow"
                      >
                        <QrCode className="w-4 h-4 text-[#00f2ff]" />
                        <span>View Boarding Pass</span>
                      </button>
                    </div>

                    {/* Rental Details Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#070c14] p-3 rounded-2xl border border-[#182335]">
                      <div>
                        <p className="text-[10px] text-[#64748b]">Rental Window</p>
                        <p className="font-semibold text-white">{pass.startTime} – {pass.endTime}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#64748b]">Payment Rail</p>
                        <p className="font-semibold text-[#00f2ff]">{pass.paymentMethod} (Tatum verified)</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#64748b]">Rental Cost</p>
                        <p className="font-semibold text-white">${pass.rentalPrice} USD</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#64748b]">Refundable Deposit</p>
                        <p className={`font-semibold ${pass.depositStatus === 'HELD' ? 'text-amber-400' : 'text-emerald-400'}`}>
                          ${pass.deposit} ({pass.depositStatus})
                        </p>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-1">
                      {pass.status === 'ACTIVE' && (
                        <button
                          onClick={() => handleReturnProcess(pass)}
                          className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs hover:opacity-95 transition-all shadow flex items-center justify-center gap-1.5"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Return Board & Unlock ${pass.deposit} Deposit</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setSelectedVan(VANS[0])
                          setActiveTab('map')
                        }}
                        className="px-4 py-2.5 rounded-xl bg-[#0e1726] border border-[#1b283d] text-xs font-semibold text-[#cbd5e1] hover:text-white flex items-center justify-center gap-1.5"
                      >
                        <Navigation className="w-3.5 h-3.5 text-[#00f2ff]" />
                        <span>Navigate to Van</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: PROFILE & REPUTATION */}
        {activeTab === 'profile' && (
          <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
            {/* Profile Card */}
            <div className="rounded-3xl bg-[#0a0f18] border border-[#1b283d] p-6 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#0066ff] to-[#00f2ff] p-1 flex items-center justify-center shadow-lg">
                  <div className="w-full h-full bg-[#060b13] rounded-[14px] flex items-center justify-center text-2xl font-black text-[#00f2ff]">
                    🏄‍♂️
                  </div>
                </div>
                <div className="text-center sm:text-left flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h2 className="text-2xl font-bold text-white">Patrick</h2>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/30 w-fit mx-auto sm:mx-0">
                      SurfPass Member
                    </span>
                  </div>
                  <p className="text-xs text-[#94a3b8] mt-0.5">Home Break: Rockaway Beach, Beach 90th St</p>
                  
                  {/* Connected wallet pill */}
                  <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[#070c14] border border-[#1b283d] text-xs text-[#64748b]">
                    <Wallet className="w-3.5 h-3.5 text-[#00f2ff]" />
                    <span>{walletConnected ? walletAddress : 'No external wallet (Embedded Smart Account Active)'}</span>
                  </div>
                </div>
              </div>

              {/* SurfPass Reputation Score */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0d1726] to-[#09111c] border border-[#1b283d] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>SurfPass Reputation Score</span>
                    </h3>
                    <p className="text-[11px] text-[#64748b]">Built from on-time returns, board condition care & verified sessions</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#00f2ff]">94</span>
                    <span className="text-xs text-[#64748b]">/100</span>
                  </div>
                </div>

                {/* Score Progress */}
                <div className="w-full bg-[#182335] h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[#0066ff] to-[#00f2ff] h-full rounded-full w-[94%]" />
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                  <div>
                    <p className="text-[10px] text-[#64748b]">Return Rate</p>
                    <p className="font-bold text-emerald-400">100%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#64748b]">Condition Rating</p>
                    <p className="font-bold text-white">4.9 / 5.0</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#64748b]">Deposit Unlocked</p>
                    <p className="font-bold text-[#00f2ff]">$850 Total</p>
                  </div>
                </div>
              </div>

              {/* User Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-[#070c14] border border-[#1b283d]">
                  <p className="text-xs text-[#64748b]">Total Sessions</p>
                  <p className="text-xl font-bold text-white mt-0.5">17</p>
                </div>
                <div className="p-3 rounded-xl bg-[#070c14] border border-[#1b283d]">
                  <p className="text-xs text-[#64748b]">Boards Rented</p>
                  <p className="text-xl font-bold text-white mt-0.5">12</p>
                </div>
                <div className="p-3 rounded-xl bg-[#070c14] border border-[#1b283d]">
                  <p className="text-xs text-[#64748b]">Beaches Visited</p>
                  <p className="text-xl font-bold text-white mt-0.5">6</p>
                </div>
                <div className="p-3 rounded-xl bg-[#070c14] border border-[#1b283d]">
                  <p className="text-xs text-[#64748b]">Favorite Board</p>
                  <p className="text-sm font-bold text-[#00f2ff] mt-1 truncate">7&apos;2 Funboard</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: VAN OPERATOR DASHBOARD */}
        {activeTab === 'van-dash' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#818cf8]/20 text-[#818cf8] border border-[#818cf8]/40">
                  STAFF MODE
                </span>
                <h1 className="text-2xl font-extrabold text-white mt-1">Van #12 Operator Terminal</h1>
                <p className="text-xs text-[#94a3b8]">Live inventory, pending reservations, and return verification scanner.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleReturnProcess(rentals[0])}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs shadow flex items-center gap-1.5"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>Scan Return QR</span>
                </button>
              </div>
            </div>

            {/* Van Key Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-[#0a0f18] border border-[#1b283d]">
                <p className="text-xs text-[#64748b]">Total Fleet Boards</p>
                <p className="text-2xl font-bold text-white mt-1">18</p>
                <p className="text-[10px] text-[#00f2ff] mt-1">8 available • 7 rented • 3 rsv</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#0a0f18] border border-[#1b283d]">
                <p className="text-xs text-[#64748b]">Today&apos;s Gross Revenue</p>
                <p className="text-2xl font-bold text-emerald-400 mt-1">$624</p>
                <p className="text-[10px] text-[#64748b] mt-1">Settled on Solana / Stripe</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#0a0f18] border border-[#1b283d]">
                <p className="text-xs text-[#64748b]">Active Held Deposits</p>
                <p className="text-2xl font-bold text-amber-400 mt-1">$1,250</p>
                <p className="text-[10px] text-[#64748b] mt-1">Auto-release on check-in</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#0a0f18] border border-[#1b283d]">
                <p className="text-xs text-[#64748b]">Current Station</p>
                <p className="text-sm font-bold text-white mt-1">Rockaway Beach 90th</p>
                <p className="text-[10px] text-[#38bdf8] mt-1">Next: Long Beach 6 AM</p>
              </div>
            </div>

            {/* Upcoming Pickups & Returns list */}
            <div className="rounded-3xl bg-[#0a0f18] border border-[#1b283d] p-5 space-y-4">
              <h3 className="text-sm font-bold text-white">Live Queue & Scheduled Reservations</h3>
              <div className="space-y-2">
                {[
                  { time: '10:30 AM', board: "9'0 Torq Longboard", user: 'Patrick (Rating 4.9)', status: 'ACTIVE RENTAL', code: 'SP-RKW-0092' },
                  { time: '11:00 AM', board: "7'2 Walden Funboard", user: 'Sarah M. (Rating 5.0)', status: 'PICKUP DUE', code: 'SP-RKW-0081' },
                  { time: '11:15 AM', board: "6'0 CI Shortboard", user: 'Marcus T. (Rating 4.8)', status: 'CONFIRMED (USDC)', code: 'SP-RKW-0063' }
                ].map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#070c14] border border-[#182335] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-[#00f2ff]">{item.time}</span>
                      <div>
                        <p className="font-bold text-white">{item.board}</p>
                        <p className="text-[10px] text-[#64748b]">{item.user} • Tag: {item.code}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#142033] text-[#38bdf8] border border-[#23354f]">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: INFRASTRUCTURE (Tatum Architecture Verification) */}
        {activeTab === 'infra' && (
          <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/30">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Tatum Multi-Chain Architecture</span>
                </div>
                <h1 className="text-2xl font-extrabold text-white mt-1">Backend Infrastructure & Settlement</h1>
                <p className="text-xs text-[#94a3b8]">
                  SurfPass abstracts complex blockchain operations so surfers get instant consumer rentals.
                </p>
              </div>
            </div>

            {/* Network status cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-4 rounded-2xl bg-[#0a0f18] border border-[#1b283d] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Solana Mainnet</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">ACTIVE</span>
                </div>
                <p className="text-xs text-[#94a3b8]">Primary micro-payment rail with sub-second USDC settlement and Tatum-powered event listener.</p>
                <div className="pt-2 text-[11px] font-mono text-[#00f2ff]">Rate: 1 SOL ≈ ${tatumRates.SOL.toFixed(2)}</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0a0f18] border border-[#1b283d] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Bitcoin Network</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">ACTIVE</span>
                </div>
                <p className="text-xs text-[#94a3b8]">Secondary crypto payment rail with automatic Tatum address monitoring & payment detection.</p>
                <div className="pt-2 text-[11px] font-mono text-[#f59e0b]">Rate: 1 BTC ≈ ${tatumRates.BTC.toLocaleString()}</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#0a0f18] border border-[#1b283d] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Traditional Card / Apple Pay</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400">ACTIVE</span>
                </div>
                <p className="text-xs text-[#94a3b8]">Mainstream consumer checkout option that shares the identical digital boarding pass pipeline.</p>
                <div className="pt-2 text-[11px] font-mono text-white">USD Gateway: 100% Parity</div>
              </div>
            </div>

            {/* Architecture Pipeline Diagram */}
            <div className="p-6 rounded-3xl bg-[#0a0f18] border border-[#1b283d] space-y-6">
              <h3 className="text-base font-bold text-white">End-to-End System Pipeline</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-[#070c14] border border-[#182335] space-y-1">
                  <span className="text-xs font-bold text-[#00f2ff]">1. Surfer Action</span>
                  <p className="text-[11px] text-[#94a3b8]">Selects beach & reserves 9&apos;0 board</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#070c14] border border-[#182335] space-y-1">
                  <span className="text-xs font-bold text-[#38bdf8]">2. Payment Intent</span>
                  <p className="text-[11px] text-[#94a3b8]">USDC / BTC / Apple Pay authorized</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#0e1726] border border-[#00f2ff]/40 space-y-1 shadow-[0_0_15px_rgba(0,242,255,0.15)]">
                  <span className="text-xs font-bold text-white">3. Tatum Engine</span>
                  <p className="text-[11px] text-[#00f2ff]">RPC node stream detects tx onchain</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#070c14] border border-[#182335] space-y-1">
                  <span className="text-xs font-bold text-emerald-400">4. Pass Generated</span>
                  <p className="text-[11px] text-[#94a3b8]">Instant QR boarding pass in app</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#070c14] border border-[#182335] space-y-1">
                  <span className="text-xs font-bold text-amber-400">5. Deposit Release</span>
                  <p className="text-[11px] text-[#94a3b8]">Van check-in unlocks held collateral</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* --- MODAL 1: BEACH DETAIL & SURFLINE FORECAST --- */}
      {showBeachModal && selectedBeach && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0a0f18] border border-[#1b283d] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-5 sm:p-6 space-y-5">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    {selectedBeach.waveHeight} • {selectedBeach.quality}
                  </span>
                  <span className="text-xs text-[#64748b]">{selectedBeach.city}, {selectedBeach.state}</span>
                </div>
                <h2 className="text-2xl font-extrabold text-white mt-1">{selectedBeach.name}</h2>
                <p className="text-xs text-[#00f2ff] font-semibold">{selectedBeach.breakName}</p>
              </div>
              <button
                onClick={() => setShowBeachModal(false)}
                className="p-2 rounded-xl bg-[#0e1726] border border-[#1b283d] text-[#94a3b8] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current Conditions Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs bg-[#070c14] p-3.5 rounded-2xl border border-[#182335]">
              <div>
                <p className="text-[10px] text-[#64748b]">Wave Height</p>
                <p className="font-bold text-white text-sm">{selectedBeach.waveHeight}</p>
                <p className="text-[10px] text-emerald-400">{selectedBeach.waveDesc}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#64748b]">Wind</p>
                <p className="font-bold text-white text-sm">{selectedBeach.windMph} mph</p>
                <p className="text-[10px] text-[#94a3b8] truncate">{selectedBeach.wind.split(' ')[0]} offshore</p>
              </div>
              <div>
                <p className="text-[10px] text-[#64748b]">Swell</p>
                <p className="font-bold text-white text-sm">{selectedBeach.swell}</p>
                <p className="text-[10px] text-[#94a3b8]">{selectedBeach.swellPeriod} period</p>
              </div>
              <div>
                <p className="text-[10px] text-[#64748b]">Water / Tide</p>
                <p className="font-bold text-white text-sm">{selectedBeach.waterTemp}</p>
                <p className="text-[10px] text-[#94a3b8] truncate">{selectedBeach.tide.split(' ')[0]}</p>
              </div>
            </div>

            {/* AI Surfline Recommendation Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0e1b2e] to-[#0a1322] border border-[#1b2f4a] space-y-1.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00f2ff]" />
                <h4 className="text-xs font-bold text-white">AI Surf Recommendation</h4>
              </div>
              <p className="text-xs text-[#cbd5e1] leading-relaxed">{selectedBeach.recommendation}</p>
              <p className="text-[10px] text-[#64748b] pt-1">Surf conditions modeled via Surfline telemetry</p>
            </div>

            {/* Hourly Forecast Strip */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider">Hourly Surf Forecast</h4>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {selectedBeach.hourly.map((h, idx) => (
                  <div key={idx} className="flex-shrink-0 w-20 p-2.5 rounded-xl bg-[#070c14] border border-[#182335] text-center space-y-1">
                    <p className="text-[10px] text-[#64748b]">{h.time}</p>
                    <p className="text-xs font-bold text-white">{h.height}</p>
                    <span className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                      {h.quality}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby SurfPass Vans at this beach */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">SurfPass Vans at {selectedBeach.name}</h4>
                <span className="text-[11px] text-[#00f2ff]">{selectedBeach.vanCount} active vans</span>
              </div>

              <div className="space-y-2">
                {VANS.filter(v => v.beachId === selectedBeach.id || selectedBeach.id === 'rockaway').map(van => (
                  <div
                    key={van.id}
                    className="p-3.5 rounded-2xl bg-[#070c14] border border-[#1b283d] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#00f2ff]/10 text-[#00f2ff] flex items-center justify-center">
                        <Car className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-white">{van.name}</h5>
                        <p className="text-[11px] text-[#64748b]">{van.spot} • {van.distance}</p>
                        <p className="text-[10px] text-emerald-400 font-semibold">{van.boardsAvailable} boards ready</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedVan(van)
                          setShowBeachModal(false)
                          setShowVanModal(true)
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#00f2ff] text-[#060b13] font-bold text-xs hover:brightness-110"
                      >
                        View Boards
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: VAN DETAIL & BOARD INVENTORY --- */}
      {showVanModal && selectedVan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0a0f18] border border-[#1b283d] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-5 sm:p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0066ff] to-[#00f2ff] p-0.5 flex items-center justify-center">
                  <div className="w-full h-full bg-[#060b13] rounded-[14px] flex items-center justify-center text-[#00f2ff]">
                    <Car className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                      {selectedVan.status}
                    </span>
                    <span className="text-xs text-[#64748b]">{selectedVan.distance}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white">{selectedVan.name}</h2>
                  <p className="text-xs text-[#00f2ff]">{selectedVan.spot}</p>
                </div>
              </div>
              <button
                onClick={() => setShowVanModal(false)}
                className="p-2 rounded-xl bg-[#0e1726] border border-[#1b283d] text-[#94a3b8] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Van Info Strip */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs bg-[#070c14] p-3 rounded-2xl border border-[#182335]">
              <div>
                <p className="text-[10px] text-[#64748b]">Operating Hours</p>
                <p className="font-semibold text-white truncate">{selectedVan.hours}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#64748b]">Available Inventory</p>
                <p className="font-semibold text-[#00f2ff]">{selectedVan.boardsAvailable} Boards</p>
              </div>
              <div>
                <p className="text-[10px] text-[#64748b]">Wait Time</p>
                <p className="font-semibold text-emerald-400">Instant Pickup</p>
              </div>
            </div>

            {/* Live Board Inventory */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider">Available Surfboards in this Van</h3>
              
              <div className="space-y-2.5">
                {BOARDS.map((board) => (
                  <div
                    key={board.id}
                    className="p-3.5 rounded-2xl bg-[#070c14] border border-[#1b283d] hover:border-[#00f2ff]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img src={board.image} alt={board.name} className="w-14 h-14 rounded-xl object-cover border border-[#1b283d]" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#00f2ff]/10 text-[#00f2ff]">
                            {board.type}
                          </span>
                          <span className="text-[10px] text-[#64748b] font-mono">{board.code}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-0.5">{board.name}</h4>
                        <p className="text-[11px] text-[#94a3b8]">{board.dimensions} • {board.volume}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#182335]">
                      <div className="text-left sm:text-right">
                        <p className="text-sm font-bold text-white">${board.rentalRate} <span className="text-[10px] text-[#64748b]">/ 2 hrs</span></p>
                        <p className="text-[10px] text-emerald-400">${board.deposit} deposit (refunded)</p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedBoard(board)
                          setShowVanModal(false)
                          setShowCheckoutModal(true)
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#0066ff] to-[#00f2ff] text-[#060b13] font-bold text-xs shadow hover:brightness-110 transition-all"
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
      )}

      {/* --- MODAL 3: CHECKOUT & TATUM PAYMENT --- */}
      {showCheckoutModal && selectedBoard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0a0f18] border border-[#1b283d] rounded-3xl max-w-lg w-full max-h-[95vh] overflow-y-auto shadow-2xl p-5 sm:p-6 space-y-5">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#1b283d] pb-3">
              <div>
                <h2 className="text-xl font-bold text-white">Reserve Your Surfboard</h2>
                <p className="text-xs text-[#00f2ff]">{selectedBoard.name}</p>
              </div>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="p-1.5 rounded-xl bg-[#0e1726] border border-[#1b283d] text-[#94a3b8] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step 1: Duration Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider">Step 1: Rental Duration</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '2h', label: '2 Hours', mult: '$' + Math.round(selectedBoard.rentalRate) },
                  { id: '4h', label: '4 Hours', mult: '$' + Math.round(selectedBoard.rentalRate * 1.6) },
                  { id: 'day', label: 'Full Day', mult: '$' + Math.round(selectedBoard.rentalRate * 2.5) }
                ].map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDuration(d.id as any)}
                    className={`p-2.5 rounded-xl text-center border transition-all ${
                      duration === d.id
                        ? 'bg-[#00f2ff]/15 border-[#00f2ff] text-white font-bold shadow-[0_0_10px_rgba(0,242,255,0.2)]'
                        : 'bg-[#070c14] border-[#1b283d] text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    <p className="text-xs">{d.label}</p>
                    <p className="text-[11px] font-semibold text-[#00f2ff] mt-0.5">{d.mult}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Price Breakdown */}
            <div className="p-3.5 rounded-2xl bg-[#070c14] border border-[#182335] space-y-2 text-xs">
              <div className="flex justify-between text-[#94a3b8]">
                <span>Board Rental ({duration === '2h' ? '2 hrs' : duration === '4h' ? '4 hrs' : 'Full Day'})</span>
                <span className="text-white font-medium">${baseRental}.00</span>
              </div>
              <div className="flex justify-between text-[#94a3b8]">
                <span>SurfPass Ding Protection</span>
                <span className="text-white font-medium">${protectionFee}.00</span>
              </div>
              <div className="flex justify-between text-amber-400 font-semibold pt-1 border-t border-[#182335]">
                <span>Refundable Security Deposit</span>
                <span>${depositFee}.00</span>
              </div>
              <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-[#182335]">
                <span>Total Authorization</span>
                <span className="text-[#00f2ff]">${totalAuth}.00 USD</span>
              </div>
              <p className="text-[10px] text-emerald-400 text-right">
                ✓ ${depositFee}.00 released to your account upon board return
              </p>
            </div>

            {/* Step 3: Payment Options */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider">Step 2: Choose Payment Rail</label>
              
              <div className="grid grid-cols-3 gap-2">
                {/* USDC Option */}
                <button
                  onClick={() => setPaymentMethod('USDC')}
                  className={`p-3 rounded-2xl border text-left transition-all relative ${
                    paymentMethod === 'USDC'
                      ? 'bg-[#00f2ff]/10 border-[#00f2ff] shadow-[0_0_15px_rgba(0,242,255,0.2)]'
                      : 'bg-[#070c14] border-[#1b283d] text-[#94a3b8]'
                  }`}
                >
                  <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#00f2ff]/20 text-[#00f2ff]">
                    Fast
                  </span>
                  <p className="text-xs font-bold text-white">USDC</p>
                  <p className="text-[10px] text-[#00f2ff]">Solana SPL</p>
                </button>

                {/* Bitcoin Option */}
                <button
                  onClick={() => setPaymentMethod('BTC')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    paymentMethod === 'BTC'
                      ? 'bg-amber-500/10 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                      : 'bg-[#070c14] border-[#1b283d] text-[#94a3b8]'
                  }`}
                >
                  <p className="text-xs font-bold text-white">Bitcoin</p>
                  <p className="text-[10px] text-amber-400">BTC Rail</p>
                </button>

                {/* Card Option */}
                <button
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    paymentMethod === 'CARD'
                      ? 'bg-blue-500/10 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                      : 'bg-[#070c14] border-[#1b283d] text-[#94a3b8]'
                  }`}
                >
                  <p className="text-xs font-bold text-white">Apple Pay</p>
                  <p className="text-[10px] text-blue-400">Credit / Debit</p>
                </button>
              </div>
            </div>

            {/* Active Payment Animation / Tatum Node Stream */}
            {paymentStep !== 'idle' ? (
              <div className="p-4 rounded-2xl bg-[#070c14] border border-[#00f2ff]/40 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 text-[#00f2ff] animate-spin" />
                    <span className="font-bold text-white">
                      {paymentStep === 'detecting' && 'Tatum Gateway: Detecting payment...'}
                      {paymentStep === 'confirming' && 'Confirming block on Solana...'}
                      {paymentStep === 'confirmed' && 'Payment confirmed! Board reserved.'}
                    </span>
                  </div>
                  <span className="font-mono text-[#00f2ff]">{paymentProgress}%</span>
                </div>
                
                <div className="w-full bg-[#182335] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#0066ff] to-[#00f2ff] h-full transition-all duration-500"
                    style={{ width: `${paymentProgress}%` }}
                  />
                </div>
                <p className="text-[10px] text-[#64748b] text-center font-mono">
                  Autonomous Tatum event stream active • Instant digital pass issuing
                </p>
              </div>
            ) : (
              <button
                onClick={handleStartPayment}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#0066ff] via-[#00f2ff] to-[#7928ca] text-[#060b13] font-extrabold text-sm hover:brightness-110 transition-all shadow-[0_0_25px_rgba(0,242,255,0.4)] flex items-center justify-center gap-2"
              >
                <span>
                  {paymentMethod === 'USDC' && `Pay ${usdcAmount} USDC on Solana`}
                  {paymentMethod === 'BTC' && `Pay ${btcAmount} BTC`}
                  {paymentMethod === 'CARD' && `Authorize $${totalAuth}.00 USD`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <p className="text-[10px] text-[#64748b] text-center">
              Powered by Tatum multi-chain infrastructure • Non-custodial or embedded checkout
            </p>
          </div>
        </div>
      )}

      {/* --- MODAL 4: SURFPASS DIGITAL BOARDING PASS --- */}
      {showPassModal && currentPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0a0f18] border border-[#1b283d] rounded-3xl max-w-md w-full max-h-[95vh] overflow-y-auto shadow-2xl p-6 space-y-6 relative">
            
            <button
              onClick={() => setShowPassModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-[#0e1726] border border-[#1b283d] text-[#94a3b8] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Boarding Pass Card Structure */}
            <div className="rounded-3xl bg-gradient-to-b from-[#0e1726] to-[#070c14] border border-[#23354f] overflow-hidden shadow-2xl">
              {/* Pass Top Header */}
              <div className="bg-[#00f2ff] p-4 text-[#060b13] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Waves className="w-5 h-5 text-[#060b13]" />
                  <span className="font-black text-sm tracking-tight">SURFPASS BOARDING PASS</span>
                </div>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-black/15">
                  {currentPass.status}
                </span>
              </div>

              {/* Pass Body Content */}
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-[10px] text-[#64748b] uppercase tracking-wider">Surfboard Assigned</p>
                  <h3 className="text-lg font-black text-white">{currentPass.boardName}</h3>
                  <p className="text-xs font-mono text-[#00f2ff]">TAG ID: {currentPass.boardCode}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs bg-[#090e18] p-3 rounded-2xl border border-[#182335]">
                  <div>
                    <p className="text-[10px] text-[#64748b]">Pickup Van</p>
                    <p className="font-bold text-white">{currentPass.vanName}</p>
                    <p className="text-[10px] text-[#94a3b8]">{currentPass.spot}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#64748b]">Session Window</p>
                    <p className="font-bold text-white">{currentPass.startTime} – {currentPass.endTime}</p>
                    <p className="text-[10px] text-[#00f2ff]">{currentPass.duration}</p>
                  </div>
                </div>

                {/* QR Code Container */}
                <div className="p-4 rounded-2xl bg-white flex flex-col items-center justify-center space-y-2 shadow-inner">
                  <QrCode className="w-36 h-36 text-black" />
                  <p className="text-[11px] font-mono text-gray-800 font-bold tracking-widest">{currentPass.id}</p>
                  <p className="text-[9px] text-gray-500 font-medium">Van operator scans this QR at pickup & return</p>
                </div>

                {/* Collateral Deposit Info */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-[#182335]">
                  <span className="text-[#94a3b8]">Held Collateral Deposit:</span>
                  <span className="font-bold text-amber-400">${currentPass.deposit}.00 ({currentPass.depositStatus})</span>
                </div>
              </div>
            </div>

            {/* Pass Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setShowPassModal(false)
                  setActiveTab('map')
                }}
                className="flex-1 py-3 rounded-2xl bg-[#00f2ff] text-[#060b13] font-bold text-xs shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
              >
                <Navigation className="w-4 h-4" />
                <span>Navigate to Van</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 5: RETURN & DEPOSIT UNLOCK FLOW --- */}
      {showReturnModal && targetPassToReturn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0a0f18] border border-[#1b283d] rounded-3xl max-w-md w-full shadow-2xl p-6 space-y-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center">
              <RotateCcw className="w-7 h-7" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">Return Board & Release Deposit</h2>
              <p className="text-xs text-[#94a3b8] mt-1">{targetPassToReturn.boardName} ({targetPassToReturn.boardCode})</p>
            </div>

            {returnStep === 'scan' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#070c14] border border-[#182335] text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">Rental Pass ID</span>
                    <span className="font-mono text-white">{targetPassToReturn.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">Inspection Status</span>
                    <span className="text-emerald-400 font-bold">Good Condition ✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748b]">Deposit to Release</span>
                    <span className="text-[#00f2ff] font-bold">${targetPassToReturn.deposit}.00</span>
                  </div>
                </div>

                <button
                  onClick={executeReturn}
                  className="w-full py-3 rounded-2xl bg-emerald-500 text-white font-bold text-xs hover:opacity-95 shadow-lg flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Return & Unlock Deposit</span>
                </button>
              </div>
            )}

            {returnStep === 'releasing' && (
              <div className="py-6 space-y-3">
                <RefreshCw className="w-8 h-8 text-[#00f2ff] animate-spin mx-auto" />
                <p className="text-sm font-bold text-white">Tatum Engine Releasing Collateral...</p>
                <p className="text-xs text-[#64748b]">Unlocking ${targetPassToReturn.deposit} back to user wallet / card</p>
              </div>
            )}

            {returnStep === 'done' && (
              <div className="py-4 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Deposit Returned Successfully!</h3>
                  <p className="text-xs text-emerald-400 mt-1">${targetPassToReturn.deposit}.00 has been released.</p>
                  <p className="text-[11px] text-[#64748b] mt-1">+5 pts added to your SurfPass Reputation Score</p>
                </div>
                <button
                  onClick={() => setShowReturnModal(false)}
                  className="w-full py-2.5 rounded-xl bg-[#00f2ff] text-[#060b13] font-bold text-xs"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BOTTOM MOBILE NAVIGATION BAR */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0f18]/95 backdrop-blur-lg border-t border-[#182335] px-2 py-2 md:hidden">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
              activeTab === 'home' ? 'text-[#00f2ff]' : 'text-[#64748b]'
            }`}
          >
            <Waves className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('explore')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
              activeTab === 'explore' ? 'text-[#00f2ff]' : 'text-[#64748b]'
            }`}
          >
            <Compass className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Explore</span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
              activeTab === 'map' ? 'text-[#00f2ff]' : 'text-[#64748b]'
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Map</span>
          </button>

          <button
            onClick={() => setActiveTab('rentals')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
              activeTab === 'rentals' ? 'text-[#00f2ff]' : 'text-[#64748b]'
            }`}
          >
            <Ticket className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Rentals</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
              activeTab === 'profile' ? 'text-[#00f2ff]' : 'text-[#64748b]'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] font-semibold">Profile</span>
          </button>
        </div>
      </nav>

      {/* DESKTOP FLOATING TAB BAR */}
      <div className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#0a0f18]/90 backdrop-blur-lg border border-[#1b283d] rounded-2xl p-1.5 shadow-2xl gap-1">
        {[
          { id: 'home', label: 'Home', icon: Waves },
          { id: 'explore', label: 'Explore', icon: Compass },
          { id: 'map', label: 'Live Map', icon: MapPin },
          { id: 'rentals', label: 'My Rentals', icon: Ticket },
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'infra', label: 'Infrastructure', icon: Layers }
        ].map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#0066ff] to-[#00f2ff] text-[#060b13] shadow-[0_0_15px_rgba(0,242,255,0.3)]'
                  : 'text-[#94a3b8] hover:text-white hover:bg-[#0e1726]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>

    </div>
  )
}
