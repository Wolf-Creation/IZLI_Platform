import type { Event } from '../../entities'
import { api } from './api'

const EVENTS: Event[] = [
  {
    id: 'evt-001',
    slug: 'roots-ss25-launch-paris',
    title: 'Roots SS25 — Paris Launch',
    type: 'launch',
    status: 'past',
    format: 'in-person',
    coverImageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=700&fit=crop&auto=format',
    description: 'The official launch of the Roots SS25 collection at Le Marais flagship. An evening of presentations, live Gnawa music, and the first opportunity to experience the collection in person.',
    date: '2025-02-01T00:00:00Z',
    timeStart: '18:00',
    timeEnd: '22:00',
    location: '14 Rue des Rosiers, Paris 75004, France',
    capacity: 120,
    registeredCount: 120,
    relatedProductIds: ['prod-001', 'prod-002', 'prod-005'],
    relatedChallengeIds: [],
    tags: [{ id: 'tag-011', slug: 'ss25', label: 'SS25' }, { id: 'tag-019', slug: 'launch', label: 'Launch' }],
    createdAt: '2025-01-05T10:00:00Z',
  },
  {
    id: 'evt-002',
    slug: 'tifinagh-workshop-london',
    title: 'Tifinagh Lettering Workshop',
    type: 'workshop',
    status: 'upcoming',
    format: 'in-person',
    coverImageUrl: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1200&h=700&fit=crop&auto=format',
    description: 'A hands-on calligraphy and lettering workshop exploring Tifinagh script with Amazigh cultural educator Idir Ait Said. Participants will learn the origins of the alphabet and practice writing their names in Tifinagh.',
    date: '2025-08-16T00:00:00Z',
    timeStart: '10:00',
    timeEnd: '14:00',
    location: 'The Barbican Centre, London EC2Y 8DS, UK',
    capacity: 30,
    registeredCount: 22,
    relatedProductIds: ['prod-001'],
    relatedChallengeIds: [],
    tags: [{ id: 'tag-001', slug: 'tifinagh', label: 'Tifinagh' }, { id: 'tag-020', slug: 'workshop', label: 'Workshop' }],
    createdAt: '2025-05-20T10:00:00Z',
  },
  {
    id: 'evt-003',
    slug: 'community-lab-live-session-june',
    title: 'Community Lab Live — June Session',
    type: 'community',
    status: 'upcoming',
    format: 'online',
    coverImageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&h=700&fit=crop&auto=format',
    description: 'Monthly online gathering for all Community Lab members. Project leads will share progress updates, new open calls will be announced, and members can connect and collaborate.',
    date: '2025-07-25T00:00:00Z',
    timeStart: '18:00',
    timeEnd: '19:30',
    location: 'Zoom (link sent to registered attendees)',
    capacity: 200,
    registeredCount: 87,
    relatedProductIds: [],
    relatedChallengeIds: ['chal-002'],
    tags: [{ id: 'tag-009', slug: 'community-lab', label: 'Community Lab' }],
    createdAt: '2025-06-01T10:00:00Z',
  },
  {
    id: 'evt-004',
    slug: 'izli-pop-up-amsterdam',
    title: 'IZLI Pop-Up — Amsterdam',
    type: 'pop-up',
    status: 'upcoming',
    format: 'in-person',
    coverImageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&h=700&fit=crop&auto=format',
    description: 'A three-day pop-up experience in Amsterdam\'s Jordaan district, featuring the full IZLI range alongside an exhibition of contributions from the Tifinagh Digital Archive project.',
    date: '2025-09-12T00:00:00Z',
    timeStart: '11:00',
    timeEnd: '19:00',
    location: 'Elandsgracht 58, 1016 TX Amsterdam, Netherlands',
    capacity: 300,
    registeredCount: 0,
    relatedProductIds: ['prod-001', 'prod-002', 'prod-003', 'prod-004', 'prod-005', 'prod-006'],
    relatedChallengeIds: [],
    tags: [{ id: 'tag-021', slug: 'pop-up', label: 'Pop-Up' }],
    createdAt: '2025-06-10T10:00:00Z',
  },
]

export async function getEvents(filters?: { status?: string; type?: string }): Promise<Event[]> {
  try {
    let results = await api.get<Event[]>('/resources/events')
    if (filters?.status) results = results.filter(e => e.status === filters.status)
    if (filters?.type) results = results.filter(e => e.type === filters.type)
    return results
  } catch {
    let results = [...EVENTS]
    if (filters?.status) results = results.filter(e => e.status === filters.status)
    if (filters?.type) results = results.filter(e => e.type === filters.type)
    return Promise.resolve(results)
  }
}

export async function getEvent(id: string): Promise<Event | null> {
  try {
    return await api.get<Event>(`/resources/events/${id}`)
  } catch {
    return Promise.resolve(EVENTS.find(e => e.id === id) ?? null)
  }
}

export async function registerForEvent(eventId: string, _customerId: string): Promise<{ success: boolean; message: string }> {
  try {
    const event = await api.get<Event>(`/resources/events/${eventId}`)
    if (!event) return { success: false, message: 'Event not found' }
    if (event.registeredCount >= event.capacity) return { success: false, message: 'Event is at capacity' }
    await api.patch(`/resources/events/${eventId}`, { registeredCount: event.registeredCount + 1 })
    return { success: true, message: 'Registration confirmed' }
  } catch {
    const idx = EVENTS.findIndex(e => e.id === eventId)
    if (idx === -1) return Promise.resolve({ success: false, message: 'Event not found' })
    const event = EVENTS[idx]
    if (event.registeredCount >= event.capacity) {
      return Promise.resolve({ success: false, message: 'Event is at capacity' })
    }
    EVENTS[idx] = { ...event, registeredCount: event.registeredCount + 1 }
    return Promise.resolve({ success: true, message: 'Registration confirmed' })
  }
}
