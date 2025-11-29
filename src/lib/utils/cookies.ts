import Cookies from 'js-cookie'
export enum CookieKey {
  token = 'token',
}
export function getToken() {
  return Cookies.get(CookieKey.token)
}

export function setToken(token: string) {
  return Cookies.set(CookieKey.token, token)
}
export function removeToken() {
  return Cookies.remove(CookieKey.token)
}
