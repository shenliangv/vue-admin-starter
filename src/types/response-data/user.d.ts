export interface Jwt {
  access_token: string
  refresh_token: string
  token_type: string
  expires_in: number
  scope: string
  tenant: string | null
  group: string
  jti: string
}
