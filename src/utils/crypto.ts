import CryptoJS from 'crypto-js'

const KEY = CryptoJS.MD5('test key').toString()
const IV = CryptoJS.MD5('test iv').toString()

const options = {
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7
}

/**
 * AES 加密字符串
 * @param str 待加密的字符串
 * @param k 密匙
 * @param iv 偏移量
 */
export function encrypt(str: string, k: string = KEY, iv: string = IV): string {
  const encrypted = CryptoJS.AES.encrypt(str, CryptoJS.enc.Utf8.parse(k), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    ...options
  })

  return encrypted.toString()
}

/**
 * AES 解密字符串
 * @param str AES 加密的字符串
 * @param k 密匙
 * @param iv 偏移量
 */
export function decrypt(str: string, k: string = KEY, iv: string = IV): string {
  const decrypted = CryptoJS.AES.decrypt(str, CryptoJS.enc.Utf8.parse(k), {
    iv: CryptoJS.enc.Utf8.parse(iv),
    ...options
  })

  return decrypted.toString(CryptoJS.enc.Utf8)
}
