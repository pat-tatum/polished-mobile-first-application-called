import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { Express } from 'express'
import * as serverEntry from '../server/index.js'

function isExpressApp(value: unknown): value is Express {
  return typeof value === 'function'
    && typeof (value as Express).use === 'function'
    && typeof (value as Express).handle === 'function'
}

function pickExpressApp(mod: Record<string, unknown>): Express {
  const candidates: unknown[] = [
    mod.default,
    mod.app,
    (mod.default as Record<string, unknown> | undefined)?.default,
    (mod.default as Record<string, unknown> | undefined)?.app,
  ]
  for (const c of candidates) {
    if (isExpressApp(c)) return c
  }
  for (const v of Object.values(mod)) {
    if (isExpressApp(v)) return v
  }
  const keys = Object.keys(mod).filter((k) => k !== '__esModule').join(', ') || '(none)'
  throw new Error(`Server entry must export an Express app (default or app). Found exports: ${keys}`)
}

const app = pickExpressApp(serverEntry as Record<string, unknown>)

function restoreApiPath(req: VercelRequest) {
  const pathParam = req.query?.path
  const parts = Array.isArray(pathParam) ? pathParam.join('/') : (pathParam ?? '')
  if (!parts) return
  const q = { ...req.query } as Record<string, string | string[] | undefined>
  delete q.path
  const qs = new URLSearchParams(
    Object.entries(q).flatMap(([k, v]) =>
      v == null ? [] : Array.isArray(v) ? v.map((x) => [k, String(x)]) : [[k, String(v)]],
    ),
  ).toString()
  const url = `/api/${parts}${qs ? `?${qs}` : ''}`
  req.url = url
  ;(req as VercelRequest & { originalUrl?: string }).originalUrl = url
}

function runExpress(app: Express, req: VercelRequest, res: VercelResponse) {
  return new Promise<void>((resolve, reject) => {
    let settled = false
    const finish = () => { if (!settled) { settled = true; resolve() } }
    res.on('finish', finish)
    res.on('close', finish)
    try {
      app(req, res, (err: unknown) => {
        if (err) { settled = true; reject(err); return }
        if (!res.writableEnded) finish()
      })
    } catch (err) {
      settled = true
      reject(err)
    }
  })
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    restoreApiPath(req)
    await runExpress(app, req, res)
  } catch (err) {
    console.error('[vercel api]', err)
    if (!res.headersSent) {
      res.status(500).json({
        error: err instanceof Error ? err.message : 'Server failed to start',
      })
    }
  }
}
