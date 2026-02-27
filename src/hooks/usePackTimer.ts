import { useState, useEffect } from 'react'
import { PACK_COOLDOWN_MS, MAX_PACKS } from '../types'

interface PackTimerResult {
  canClaim: boolean
  timeToNextPack: string
  packCount: number
}

function formatTime(ms: number): string {
  if (ms <= 0) return '00:00:00'

  const totalSeconds = Math.ceil(ms / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [hours, minutes, seconds].map((n) => String(n).padStart(2, '0')).join(':')
}

export function usePackTimer(packCount: number, lastPackTick: number): PackTimerResult {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [])

  if (packCount >= MAX_PACKS) {
    return { canClaim: true, timeToNextPack: 'Cheio', packCount }
  }

  const elapsed = now - lastPackTick
  const msToNext = Math.max(0, PACK_COOLDOWN_MS - (elapsed % PACK_COOLDOWN_MS))

  return { canClaim: packCount > 0, timeToNextPack: formatTime(msToNext), packCount }
}
