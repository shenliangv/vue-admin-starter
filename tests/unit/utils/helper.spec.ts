import * as helper from '@/utils/helper'

describe('utils helper', () => {
  it('hasValue', () => {
    expect(helper.hasValue(undefined)).toBe(false)
    expect(helper.hasValue(null)).toBe(false)
    expect(helper.hasValue(NaN)).toBe(false)
    expect(helper.hasValue('')).toBe(false)
    expect(helper.hasValue(0)).toBe(true)
    expect(helper.hasValue({})).toBe(true)
    expect(helper.hasValue([])).toBe(true)
    expect(helper.hasValue(-1)).toBe(true)
    expect(helper.hasValue('test')).toBe(true)
  })

  it('isEmptyObject', () => {
    expect(helper.isEmptyObject({})).toBe(true)
    expect(helper.isEmptyObject({ test: 123 })).toBe(false)
    expect(helper.isEmptyObject([])).toBe(false)
  })

  it('filterObject', () => {
    const data = { a: '', b: 1, c: true, d: 'aa' }

    // expect(helper.filterObject(555, val => val)).toEqual({})
    expect(helper.filterObject({}, val => val)).toEqual({})
    expect(helper.filterObject(data, (val, k) => k < 'c')).toEqual({
      a: '',
      b: 1
    })
    expect(helper.filterObject(data, val => typeof val === 'number')).toEqual({
      b: 1
    })
  })

  it('toDateString', () => {
    expect(
      helper.toDateString(
        new Date(2017, 5, 3, 6, 7, 8),
        'yyyy年MM月dd日 hh:mm:ss'
      )
    ).toBe('2017年06月03日 06:07:08')

    expect(
      helper.toDateString(1502268008000, 'yyyy年MM月dd日 hh:mm:ss', false)
    ).toBe('2017年8月9日 16:40:8')

    expect(
      helper.toDateString('Fri Jun 29 2018 17:20:08 GMT+0800 (中国标准时间)')
    ).toBe('2018-06-29 17:20:08')

    expect(helper.toDateString(new Date(2017, 5, 3), 'MM-dd-yy hh:mm:ss')).toBe(
      '06-03-17 00:00:00'
    )
  })

  it('toWeekString', () => {
    expect(helper.toWeekString(new Date(2019, 9, 28))).toBe('星期一')
    expect(helper.toWeekString(new Date(2019, 9, 29))).toBe('星期二')
    expect(helper.toWeekString(new Date(2019, 9, 30))).toBe('星期三')
    expect(helper.toWeekString(new Date(2019, 9, 31))).toBe('星期四')
    expect(helper.toWeekString(new Date(2019, 10, 1))).toBe('星期五')
    expect(helper.toWeekString(new Date(2019, 10, 2))).toBe('星期六')
    expect(helper.toWeekString(new Date(2019, 10, 3))).toBe('星期日')
    expect(helper.toWeekString(1572710400000)).toBe('星期日')
    expect(
      helper.toWeekString('Sun Nov 03 2019 00:00:00 GMT+0800 (中国标准时间)')
    ).toBe('星期日')
  })

  it('toCurrencyString', () => {
    expect(helper.toCurrencyString('-12345678.789')).toBe('-12,345,678.79')
    expect(helper.toCurrencyString('12345678.789')).toBe('12,345,678.79')
    expect(helper.toCurrencyString('-12345678.789', 5)).toBe(
      '-12,345,678.78900'
    )
    expect(helper.toCurrencyString(-12345678.789, 5)).toBe('-12,345,678.78900')
    expect(helper.toCurrencyString(-12345678.789, 0)).toBe('-12,345,679')
    expect(helper.toCurrencyString(0)).toBe('0.00')
    // expect(helper.toCurrencyString(null)).toBe(NaN)
    expect(helper.toCurrencyString(NaN)).toBe(NaN)
    // expect(helper.toCurrencyString(undefined)).toBe(NaN)
  })

  it('enc', () => {
    expect(helper.decrypt(helper.encrypt('test 123 abc,.;'))).toBe(
      'test 123 abc,.;'
    )
    expect(
      helper.decrypt(helper.encrypt(JSON.stringify({ a: 1, b: { c: 2 } })))
    ).toBe(JSON.stringify({ a: 1, b: { c: 2 } }))
    expect(helper.decrypt(helper.encrypt(''))).toBe('')
  })
})
