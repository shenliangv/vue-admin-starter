import CryptoJS from 'crypto-js'
import constants from '@/common/dict/constants'

import { PlainObject } from '@/types/base'
import { Jwt } from '@/types/response-data/user'

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

/**
 * 从 localStorage 获取 jwt
 */
export function jwt(): Jwt {
  const token = localStorage.getItem(constants.TOKEN_KEY)

  return token ? JSON.parse(decrypt(token)) : {}
}

/**
 * 将 jwt 存储到 localStorage
 * @param jwt 登录之后后台返回的 jwt
 */
export function saveJwt(jwt: Jwt) {
  localStorage.setItem(constants.TOKEN_KEY, encrypt(JSON.stringify(jwt)))
}

/**
 * 删除 localStorage 中存储的 jwt
 */
export function clearJwt() {
  localStorage.removeItem(constants.TOKEN_KEY)
}

/**
 * 判断一个对象是否为空对象
 * @param obj 目标对象
 * @return 判断结果
 *
 * @example
 *
 * isEmptyObject({}) // => true
 * isEmptyObject({test: 123}) // => false
 */
export function isEmptyObject(obj: any): boolean {
  return JSON.stringify(obj) === '{}'
}

/**
 * 判断是否有值
 * @param val 待检测值
 * @return 检测结果
 *
 * @example
 *
 * hasValue(0) // => true
 * hasValue({}) // => true
 * hasValue(null) // => false
 * hasValue("") // => false
 */
export const hasValue = (val: any): boolean => (val === 0 ? true : Boolean(val))

/**
 * 筛选对象中符合条件的项
 * @param obj 目标对象
 * @param fn 筛选函数，接受三个参数（val, k, obj）
 *   @param val 属性值
 *   @param k 属性名
 *   @param obj 目标对象
 * @return 筛选函数执行结果为 truthy 的项组成的对象
 *
 * @example
 *
 * filterObject({ a: '', b: 1, c: true, d: 'aa' }, val => typeof val === 'number')
 * // => { b: 1 }
 */
export function filterObject(
  obj: PlainObject,
  predicate: (val: any, k: string, obj: PlainObject) => boolean
): PlainObject {
  obj = new Object(obj)

  const result: PlainObject = {}

  Object.keys(obj).forEach(k => {
    if (predicate(obj[k], k, obj)) {
      result[k] = obj[k]
    }
  })

  return result
}

/**
 * 格式化日期
 * @param time 时间戳或者标准格式的时间对象 | 字符串
 * @param format 描述日期格式的字符串
 * @param fillZero 是否需要补0
 * @return 格式化之后的日期字符串，默认为当前时间
 *         默认格式为'yyyy-MM-dd hh:mm:ss'，且会自动补零
 *
 * @example
 *
 * toDateString(new Date(2017, 5, 3, 6, 7, 8), 'yyyy年MM月dd日 hh:mm:ss')
 * // => "2017年06月03日 06:07:08"
 *
 * toDateString(1502268008000, 'yyyy年MM月dd日 hh:mm:ss', false)
 * // => "2017年8月9日 16:40:8"
 *
 * toDateString('Fri Jun 29 2018 17:20:08 GMT+0800 (中国标准时间)')
 * // => "2018-06-29 17:20:08"
 *
 * toDateString(new Date(2017, 5, 3), 'MM-dd-yy hh:mm:ss')
 * // => "06-03-17 00:00:00"
 */
export function toDateString(
  time: number | string | Date = Date.now(),
  format: string = 'yyyy-MM-dd hh:mm:ss',
  fillZero: boolean = true
): string {
  const d = new Date(time)
  const regDict: PlainObject = {
    'y+': d.getFullYear(),
    'M+': d.getMonth() + 1,
    'd+': d.getDate(),
    'h+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds()
  }

  let result = format

  Object.keys(regDict).forEach(k => {
    result = result.replace(new RegExp(k), m => {
      return fillZero ? ('0' + regDict[k]).slice(-m.length) : regDict[k]
    })
  })

  return result
}

/**
 * 确定给定时间是星期几
 * @param time 时间戳或者标准格式的时间对象 | 字符串
 * @return 中文星期
 *
 * @example
 *
 * toWeekString(1572710400000) // => '星期日'
 * toWeekString(new Date(2019, 10, 3)) // => '星期日'
 */
export function toWeekString(time: number | string | Date): string {
  const weeks = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
  ]

  return weeks[new Date(time).getDay()]
}

/**
 * 格式化金额
 * @param n 金额
 * @param decimalDigit 保留几位小数，默认保留两位小数
 * @return 千分字符串
 *
 * @example
 *
 * toCurrencyString(-12345678.789, 5) // => '-12,345,678.78900'
 * toCurrencyString('12345678.789') // => '12,345,678.79'
 */
export function toCurrencyString(
  amount: number | string,
  decimalDigit: number = 2
) {
  const n = parseFloat(amount as string)

  if (isNaN(n)) {
    return n
  } else {
    return n
      .toFixed(decimalDigit)
      .replace(/^(-)?(\d+)(\.\d+)*$/, (m, $1, $2, $3) => {
        return ($1 || '') + Number($2).toLocaleString() + ($3 || '')
      })
  }
}
