import {
  Aperture, Building2, CircleGauge, Droplets, Flame, ScanLine,
  ShowerHead, Waves, Wrench, type LucideIcon,
} from 'lucide-react'

export const company = {
  name: 'Extreme Plumbing & Rooter',
  shortName: 'Extreme',
  phone: '+1 818-631-7296',
  phoneHref: 'tel:+18186317296',
  secondaryPhone: '+1 800-500-8292',
  secondaryPhoneHref: 'tel:+18005008292',
  email: 'extreme.plumbing@yahoo.com',
  emailHref: 'mailto:extreme.plumbing@yahoo.com',
  address: 'P.O. Box 14641 — Van Nuys, CA 91409',
}

export type Service = { title: string; short: string; description: string; icon: LucideIcon; featured?: boolean }

export const services: Service[] = [
  { title: 'Drain Cleaning & Rooter', short: 'Clear the line', description: 'Professional clearing for stubborn debris, roots and buildup—with 24/7 emergency response.', icon: Waves, featured: true },
  { title: 'Camera Inspection', short: 'See the problem', description: 'Video pipe diagnostics reveal the condition and exact location of trouble inside the line.', icon: Aperture },
  { title: 'Hydro-Jetting', short: 'Restore the flow', description: 'High-pressure water removes heavy buildup and helps keep drains and sewer lines moving.', icon: Droplets },
  { title: 'Leak Detection', short: 'Find it early', description: 'Locate leaks in water lines, fixtures and underground piping before damage spreads.', icon: ScanLine },
  { title: 'Trenchless Sewer Replacement', short: 'Replace with less disruption', description: 'Modern sewer-line replacement designed to avoid the mess of traditional excavation.', icon: CircleGauge, featured: true },
  { title: 'Copper Repipe', short: 'Renew the system', description: 'Replace outdated or deteriorating residential and commercial piping with durable copper.', icon: Wrench },
  { title: 'Water Heaters', short: 'Bring back hot water', description: 'Reliable tank and tankless water-heater repair, replacement and installation.', icon: ShowerHead },
  { title: 'Boiler Repair & Replacement', short: 'Keep the heat on', description: 'Practical repair and replacement options for residential and commercial heating systems.', icon: Flame },
  { title: 'High-Rise Buildings', short: 'Built for vertical systems', description: 'Experienced service for the pressure, access and drainage needs of multi-story properties.', icon: Building2 },
]

export const serviceAreas = [
  'Van Nuys', 'Northridge', 'North Hollywood', 'Reseda', 'Arleta', 'San Fernando',
  'Burbank', 'Pacoima', 'Panorama City', 'Calabasas', 'Malibu', 'Hollywood Hills',
  'Beverly Hills', 'Bel Air', 'Valley Village', 'Sherman Oaks', 'Studio City',
  'Toluca Lake', 'Encino', 'Tarzana', 'Glendale',
]

export const testimonials = [
  {
    quote: 'Hakop recognized the situation right away and got to work. The job was finished quickly, cleanly and with a kindness that is rare to come across these days.',
    name: 'Gina G.', context: 'Local business customer',
  },
  {
    quote: 'Hakob quickly diagnosed the problems and installed a new garbage disposal and a new toilet in just a few hours. I would highly recommend him for quick, reliable service.',
    name: 'Tom M.', context: 'Residential customer',
  },
  {
    quote: 'Amazing team. I canceled last minute and they were very gracious—they even returned the cash tip I gave them. Thank you, Extreme Plumbing!',
    name: 'Ken C.', context: 'Verified customer',
  },
]
