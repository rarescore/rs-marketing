import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { seoDefaults } from '../data'

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://rsmarketing.com'

function setMeta(selector, attr, value) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    const [key, val] = attr
    element.setAttribute(key, val)
    document.head.appendChild(element)
  }
  element.setAttribute('content', value)
}

export default function Seo({ title = seoDefaults.title, description = seoDefaults.description, image = '/assets/growth-engine.webp', noindex = false, schema }) {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = title
    setMeta('meta[name="description"]', ['name', 'description'], description)
    setMeta('meta[property="og:title"]', ['property', 'og:title'], title)
    setMeta('meta[property="og:description"]', ['property', 'og:description'], description)
    setMeta('meta[property="og:image"]', ['property', 'og:image'], `${SITE_URL}${image}`)
    setMeta('meta[name="robots"]', ['name', 'robots'], noindex ? 'noindex,nofollow' : 'index,follow')
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
    canonical.href = `${SITE_URL}${pathname === '/' ? '' : pathname}`
    const old = document.getElementById('page-schema')
    if (old) old.remove()
    if (schema) {
      const script = document.createElement('script')
      script.id = 'page-schema'; script.type = 'application/ld+json'; script.text = JSON.stringify(schema)
      document.head.appendChild(script)
    }
  }, [title, description, image, noindex, pathname, schema])
  return null
}
