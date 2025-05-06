import { describe, it, expect } from 'vitest'
import { searchAndFilterData } from './search'

const mockData = [
  { name: 'Juan Pérez', codigo: 'ABC123', age: 30 },
  { name: 'María López', codigo: 'DEF456', age: 25 },
  { name: 'José Núñez', codigo: 'GHI789', age: 40 },
  { name: 'Ana María', codigo: 'JKL000', age: 35 },
  { name: 'João Souza', codigo: 'MNO111', age: 50 },
]

describe('searchAndFilterData', () => {
  it('returns all data if search is undefined', () => {
    const result = searchAndFilterData(mockData, undefined)
    expect(result).toHaveLength(5)
  })

  it('returns all data if search is too short', () => {
    const result = searchAndFilterData(mockData, 'a')
    expect(result).toHaveLength(5)
  })

  it('filters by name (accent and case insensitive)', () => {
    expect(searchAndFilterData(mockData, 'nunez')).toEqual([mockData[2]])
    expect(searchAndFilterData(mockData, 'joao')).toEqual([mockData[4]])
    expect(searchAndFilterData(mockData, 'maria')).toEqual([mockData[1], mockData[3]])
    expect(searchAndFilterData(mockData, 'ANA')).toEqual([mockData[3]])
  })

  it('filters by codigo with dot normalization', () => {
    expect(searchAndFilterData(mockData, '.def')).toEqual([mockData[1]])
    expect(searchAndFilterData(mockData, '.mno')).toEqual([mockData[4]])
  })

  it('filters by number with # prefix', () => {
    expect(searchAndFilterData(mockData, '#30')).toEqual([mockData[0]])
    expect(searchAndFilterData(mockData, '#50')).toEqual([mockData[4]])
    expect(searchAndFilterData(mockData, '#25')).toEqual([mockData[1]])
  })

  it('returns empty if no match', () => {
    expect(searchAndFilterData(mockData, 'xyz')).toEqual([])
    expect(searchAndFilterData(mockData, '#99')).toEqual([])
    expect(searchAndFilterData(mockData, '.zzz')).toEqual([])
  })

  it('handles whitespace in search term', () => {
    expect(searchAndFilterData(mockData, '   pérez   ')).toEqual([mockData[0]])
    expect(searchAndFilterData(mockData, '    #35')).toEqual([mockData[3]])
  })

  it('handles mixed search cases', () => {
    expect(searchAndFilterData(mockData, 'JoSé')).toEqual([mockData[2]])
    expect(searchAndFilterData(mockData, 'pÉrEz')).toEqual([mockData[0]])
  })
})
