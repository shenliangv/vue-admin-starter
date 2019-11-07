export function isValidMobile(val: any): boolean {
  return /^1\d{10}$/.test(val)
}

export function isValidEmail(val: any): boolean {
  return /^[a-z0-9_.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z0-9]{2,6}$/i.test(val)
}

export function isValidCurrency(val: any): boolean {
  return /^(\d+)(\.(\d{1,2})){0,1}$/.test(val)
}
