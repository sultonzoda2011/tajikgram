export interface JwtPayload {
  // Custom simplified fields
  id: string
  email: string
  userName: string
  nickname: string
  fullName: string
  profilePictureUrl: string

  // Standard JWT claims
  exp: number
  iss: string
  aud: string

  // Microsoft Identity-compatible fields
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string
}
