import { describe, it, expect } from 'vitest'
import { parseCoords } from './coords'

const DEFAULT_COORDS = {
    longitude: 29.076903,
    latitude: 59.896869,
}

describe('parseCoords', () => {
    it('returns default coords for null', () => {
        expect(parseCoords(null)).toEqual(DEFAULT_COORDS)
    })

    it('returns default coords for empty string', () => {
        expect(parseCoords('')).toEqual(DEFAULT_COORDS)
    })

    it('parses valid coordinate string', () => {
        expect(parseCoords('29.076903,59.896869')).toEqual({
            longitude: 29.076903,
            latitude: 59.896869,
        })
    })

    it('parses negative coordinates', () => {
        expect(parseCoords('-73.9857,40.7484')).toEqual({
            longitude: -73.9857,
            latitude: 40.7484,
        })
    })

    it('parses integer coordinates', () => {
        expect(parseCoords('10,20')).toEqual({
            longitude: 10,
            latitude: 20,
        })
    })

    it('returns default coords for single value', () => {
        expect(parseCoords('29.076903')).toEqual(DEFAULT_COORDS)
    })

    it('returns default coords for three values', () => {
        expect(parseCoords('29.076903,59.896869,100')).toEqual(DEFAULT_COORDS)
    })

    it('returns default coords when longitude is not a number', () => {
        expect(parseCoords('abc,59.896869')).toEqual(DEFAULT_COORDS)
    })

    it('returns default coords when latitude is not a number', () => {
        expect(parseCoords('29.076903,xyz')).toEqual(DEFAULT_COORDS)
    })

    it('returns default coords when both are not numbers', () => {
        expect(parseCoords('foo,bar')).toEqual(DEFAULT_COORDS)
    })

    it('parses zero coordinates', () => {
        expect(parseCoords('0,0')).toEqual({
            longitude: 0,
            latitude: 0,
        })
    })
})
