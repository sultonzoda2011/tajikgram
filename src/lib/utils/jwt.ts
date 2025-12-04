
import { jwtDecode } from 'jwt-decode'
import type { JwtPayload } from '@/types/jwt'
import { getToken } from './cookies'

export function decodeJwt(): JwtPayload | null {
  const token = getToken()
  if (!token) return null
  try {
    return jwtDecode<JwtPayload>(token)
  } catch {
    return null
  }
}
