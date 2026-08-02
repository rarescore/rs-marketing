import { describe, expect, it } from 'vitest'
import { articles, plans, services } from './data'

describe('commercial content', () => {
  it('keeps the requested package ladder', () => {
    expect(plans.map(plan => plan.price)).toEqual([500, 1000, 2000, 5000])
    expect(plans.every(plan => plan.features.length >= 7)).toBe(true)
  })
  it('keeps article routes unique and complete', () => {
    expect(new Set(articles.map(article => article.slug)).size).toBe(articles.length)
    expect(articles.every(article => article.sections.length >= 4)).toBe(true)
  })
  it('offers custom and website work', () => {
    expect(services.some(service => service.title === 'Performance websites')).toBe(true)
    expect(services.some(service => service.title === 'Custom projects')).toBe(true)
  })
})
