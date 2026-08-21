import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Keep click handlers fresh without re-binding markers every parent render
function useLatest<T>(value: T) {
  const ref = useRef(value)
  ref.current = value
  return ref
}

type MapBeach = {
  id: string
  name: string
  breakName: string
  waveHeight: string
  city: string
  state: string
  lat: number
  lng: number
}

type MapVan = {
  id: string
  fleetNumber: string
  nickname: string
  boardsAvailable: number
  spot: string
  lat: number
  lng: number
}

type FleetGpsMapProps = {
  beach: MapBeach
  vans: MapVan[]
  emptyMessage?: string
  onSelectBeach: () => void
  onSelectVan: (vanId: string) => void
  onBrowseMarkets?: () => void
}

const vanIcon = L.divIcon({
  className: 'surpass-van-marker',
  html: `
    <div style="display:flex;flex-direction:column;align-items:center;transform:translate(-50%,-100%);">
      <div style="width:40px;height:40px;border-radius:14px;background:linear-gradient(135deg,#06b6d4,#2563eb);border:2px solid #fff;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 20px rgba(0,0,0,.35);">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#020617" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/>
          <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
        </svg>
      </div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
})

const breakIcon = L.divIcon({
  className: 'surpass-break-marker',
  html: `
    <div style="transform:translate(-50%,-100%);">
      <div style="width:18px;height:18px;border-radius:999px;background:#10b981;border:2px solid #fff;box-shadow:0 0 0 6px rgba(16,185,129,.25),0 8px 16px rgba(0,0,0,.35);"></div>
    </div>
  `,
  iconSize: [18, 18],
  iconAnchor: [9, 18],
})

export function FleetGpsMap({
  beach,
  vans,
  onSelectBeach,
  onSelectVan,
  onBrowseMarkets,
}: FleetGpsMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<L.Map | null>(null)
  const layerRef = useRef<L.LayerGroup | null>(null)
  const onSelectBeachRef = useLatest(onSelectBeach)
  const onSelectVanRef = useLatest(onSelectVan)

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = L.map(containerRef.current, {
      zoomControl: true,
      attributionControl: true,
      scrollWheelZoom: true,
    }).setView([beach.lat, beach.lng], 14)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map)

    layerRef.current = L.layerGroup().addTo(map)
    mapRef.current = map

    const resize = () => map.invalidateSize()
    const t = window.setTimeout(resize, 80)
    window.addEventListener('resize', resize)

    return () => {
      window.clearTimeout(t)
      window.removeEventListener('resize', resize)
      map.remove()
      mapRef.current = null
      layerRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const map = mapRef.current
    const layer = layerRef.current
    if (!map || !layer) return

    layer.clearLayers()

    const breakMarker = L.marker([beach.lat, beach.lng], { icon: breakIcon })
    breakMarker.bindTooltip(`${beach.breakName} • ${beach.waveHeight}`, {
      permanent: true,
      direction: 'top',
      offset: L.point(0, -12),
      className: 'surpass-map-tooltip',
    })
    breakMarker.on('click', () => onSelectBeachRef.current())
    breakMarker.addTo(layer)

    vans.forEach((van) => {
      const marker = L.marker([van.lat, van.lng], { icon: vanIcon })
      marker.bindTooltip(`${van.fleetNumber} (${van.boardsAvailable} free)`, {
        permanent: true,
        direction: 'bottom',
        offset: L.point(0, 8),
        className: 'surpass-map-tooltip surpass-van-tooltip',
      })
      marker.on('click', () => onSelectVanRef.current(van.id))
      marker.addTo(layer)
    })

    if (vans.length > 0) {
      const bounds = L.latLngBounds([
        [beach.lat, beach.lng],
        ...vans.map((v) => [v.lat, v.lng] as [number, number]),
      ])
      map.fitBounds(bounds.pad(0.35), { maxZoom: 15, animate: true })
    } else {
      map.setView([beach.lat, beach.lng], 13, { animate: true })
    }

    window.setTimeout(() => map.invalidateSize(), 60)
  }, [beach, vans, onSelectBeachRef, onSelectVanRef])

  return (
    <div className="relative w-full h-[520px] rounded-3xl border-2 border-slate-800 overflow-hidden shadow-2xl bg-slate-950">
      <div ref={containerRef} className="absolute inset-0 z-0" />

      <div className="absolute top-4 left-4 z-[500] p-3 rounded-2xl bg-slate-950/90 border border-slate-800 backdrop-blur-md text-xs font-mono space-y-1.5 shadow-lg pointer-events-none">
        <div className="text-slate-400 font-bold uppercase text-[10px]">
          GPS VIEW • {beach.breakName}
        </div>
        <div className="flex items-center gap-2 text-white">
          <div className="w-3 h-3 rounded-full bg-cyan-500 border border-white" />
          <span>SurfPass Mobile Van</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span>Selected Surf Break</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="text-indigo-400">⌖</span>
          <span>
            {beach.city}, {beach.state}
          </span>
        </div>
      </div>

      {vans.length === 0 && (
        <div className="absolute inset-0 z-[600] flex items-center justify-center p-6 bg-slate-950/40 backdrop-blur-[1px]">
          <div className="max-w-sm text-center p-6 rounded-2xl bg-slate-950/95 border border-slate-700 shadow-2xl space-y-3">
            <h3 className="text-base font-black text-white">No SurfPass vans currently in this area</h3>
            <p className="text-xs text-slate-400">
              {beach.name} doesn’t have an active fleet van right now. The map is still centered on this break.
            </p>
            {onBrowseMarkets && (
              <button
                onClick={onBrowseMarkets}
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs"
              >
                Browse Other Markets
              </button>
            )}
          </div>
        </div>
      )}

      <style>{`
        .surpass-map-tooltip {
          background: rgba(2, 6, 23, 0.92) !important;
          border: 1px solid rgba(6, 182, 212, 0.45) !important;
          color: #fff !important;
          border-radius: 10px !important;
          padding: 4px 8px !important;
          font: 700 11px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace !important;
          box-shadow: 0 8px 18px rgba(0,0,0,.35) !important;
        }
        .surpass-map-tooltip::before {
          border-top-color: rgba(2, 6, 23, 0.92) !important;
        }
        .surpass-van-tooltip {
          border-color: rgba(6, 182, 212, 0.55) !important;
          color: #67e8f9 !important;
        }
        .leaflet-control-attribution {
          font-size: 10px !important;
          background: rgba(2,6,23,.75) !important;
          color: #94a3b8 !important;
        }
        .leaflet-control-attribution a { color: #67e8f9 !important; }
        .leaflet-control-zoom a {
          background: #0f172a !important;
          color: #e2e8f0 !important;
          border-color: #334155 !important;
        }
      `}</style>
    </div>
  )
}
