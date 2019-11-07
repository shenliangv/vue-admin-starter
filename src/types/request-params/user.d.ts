export interface LoginAccount {
  username: string
  password: string
  grant_type: string
  mode: string
}

export interface LoginMobile {
  mobile: string
  code: string
  grant_type: string
  mode: string
}
