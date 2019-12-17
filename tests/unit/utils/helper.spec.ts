import * as lang from '@/utils/lang'
import * as crypto from '@/utils/crypto'

describe('utils test', () => {
  it('hasValue', () => {
    expect(lang.hasValue(undefined)).toBe(false)
    expect(lang.hasValue(null)).toBe(false)
    expect(lang.hasValue(NaN)).toBe(false)
    expect(lang.hasValue('')).toBe(false)
    expect(lang.hasValue(0)).toBe(true)
    expect(lang.hasValue({})).toBe(true)
    expect(lang.hasValue([])).toBe(true)
    expect(lang.hasValue(-1)).toBe(true)
    expect(lang.hasValue('test')).toBe(true)
  })

  it('isEmptyObject', () => {
    expect(lang.isEmptyObject({})).toBe(true)
    expect(lang.isEmptyObject({ test: 123 })).toBe(false)
    expect(lang.isEmptyObject([])).toBe(false)
  })

  it('filterObject', () => {
    const data = { a: '', b: 1, c: true, d: 'aa' }

    // expect(lang.filterObject(555, val => val)).toEqual({})
    expect(lang.filterObject({}, val => val)).toEqual({})
    expect(lang.filterObject(data, (val, k) => k < 'c')).toEqual({
      a: '',
      b: 1
    })
    expect(lang.filterObject(data, val => typeof val === 'number')).toEqual({
      b: 1
    })
  })

  it('toDateString', () => {
    expect(
      lang.toDateString(
        new Date(2017, 5, 3, 6, 7, 8),
        'yyyy年MM月dd日 hh:mm:ss'
      )
    ).toBe('2017年06月03日 06:07:08')

    expect(
      lang.toDateString(1502268008000, 'yyyy年MM月dd日 hh:mm:ss', false)
    ).toBe('2017年8月9日 16:40:8')

    expect(
      lang.toDateString('Fri Jun 29 2018 17:20:08 GMT+0800 (中国标准时间)')
    ).toBe('2018-06-29 17:20:08')

    expect(lang.toDateString(new Date(2017, 5, 3), 'MM-dd-yy hh:mm:ss')).toBe(
      '06-03-17 00:00:00'
    )
  })

  it('toWeekString', () => {
    expect(lang.toWeekString(new Date(2019, 9, 28))).toBe('星期一')
    expect(lang.toWeekString(new Date(2019, 9, 29))).toBe('星期二')
    expect(lang.toWeekString(new Date(2019, 9, 30))).toBe('星期三')
    expect(lang.toWeekString(new Date(2019, 9, 31))).toBe('星期四')
    expect(lang.toWeekString(new Date(2019, 10, 1))).toBe('星期五')
    expect(lang.toWeekString(new Date(2019, 10, 2))).toBe('星期六')
    expect(lang.toWeekString(new Date(2019, 10, 3))).toBe('星期日')
    expect(lang.toWeekString(1572710400000)).toBe('星期日')
    expect(
      lang.toWeekString('Sun Nov 03 2019 00:00:00 GMT+0800 (中国标准时间)')
    ).toBe('星期日')
  })

  it('toCurrencyString', () => {
    expect(lang.toCurrencyString('-12345678.789')).toBe('-12,345,678.79')
    expect(lang.toCurrencyString('12345678.789')).toBe('12,345,678.79')
    expect(lang.toCurrencyString('-12345678.789', 5)).toBe('-12,345,678.78900')
    expect(lang.toCurrencyString(-12345678.789, 5)).toBe('-12,345,678.78900')
    expect(lang.toCurrencyString(-12345678.789, 0)).toBe('-12,345,679')
    expect(lang.toCurrencyString(0)).toBe('0.00')
    // expect(lang.toCurrencyString(null)).toBe(NaN)
    expect(lang.toCurrencyString(NaN)).toBe(NaN)
    // expect(lang.toCurrencyString(undefined)).toBe(NaN)
  })

  it('enc', () => {
    expect(crypto.decrypt(crypto.encrypt('test 123 abc,.;'))).toBe(
      'test 123 abc,.;'
    )
    expect(
      crypto.decrypt(crypto.encrypt(JSON.stringify({ a: 1, b: { c: 2 } })))
    ).toBe(JSON.stringify({ a: 1, b: { c: 2 } }))
    expect(crypto.decrypt(crypto.encrypt(''))).toBe('')
  })
})
