// All platform events
export type IZLIEvent =
  | { type: 'product.created'; payload: { productId: string; name: string } }
  | { type: 'product.published'; payload: { productId: string; name: string; collectionId?: string } }
  | { type: 'product.archived'; payload: { productId: string } }
  | { type: 'collection.published'; payload: { collectionId: string; name: string } }
  | { type: 'archive.released'; payload: { archiveId: string; name: string } }
  | { type: 'archive.sealed'; payload: { archiveId: string } }
  | { type: 'vote.submitted'; payload: { voteId: string; memberId: string; sessionId: string; option: string } }
  | { type: 'voting.session.opened'; payload: { sessionId: string; archiveId: string } }
  | { type: 'voting.session.closed'; payload: { sessionId: string; winner: string } }
  | { type: 'purchase.completed'; payload: { orderId: string; memberId: string; productIds: string[]; totalAmount: number } }
  | { type: 'keeper.created'; payload: { keeperId: string; memberId: string; archiveId: string; level: string } }
  | { type: 'keeper.levelup'; payload: { keeperId: string; previousLevel: string; newLevel: string } }
  | { type: 'challenge.completed'; payload: { challengeId: string; submissionId: string; memberId: string } }
  | { type: 'story.published'; payload: { storyId: string; title: string; authorId: string } }
  | { type: 'production.generated'; payload: { jobId: string; templateId: string; assetIds: string[] } }
  | { type: 'qr.scanned'; payload: { passportId: string; productId: string; location?: string; device?: string } }
  | { type: 'passport.generated'; payload: { passportId: string; productId: string } }
  | { type: 'badge.granted'; payload: { memberId: string; badgeId: string; reason: string } }
  | { type: 'reward.granted'; payload: { memberId: string; rewardId: string } }
  | { type: 'achievement.unlocked'; payload: { memberId: string; achievementId: string; points: number } }
  | { type: 'notification.sent'; payload: { recipientId: string; channel: string; templateId: string } }
  | { type: 'referral.converted'; payload: { referrerId: string; referredId: string; code: string } }
  | { type: 'search.indexed'; payload: { entityType: string; entityId: string; action: 'add' | 'update' | 'remove' } }

export type EventType = IZLIEvent['type']
export type EventPayload<T extends EventType> = Extract<IZLIEvent, { type: T }>['payload']
type EventHandler<T extends EventType = EventType> = (event: Extract<IZLIEvent, { type: T }>) => void | Promise<void>

class EventBusImpl {
  private handlers = new Map<string, Set<EventHandler>>()

  on<T extends EventType>(type: T, handler: EventHandler<T>): () => void {
    if (!this.handlers.has(type)) this.handlers.set(type, new Set())
    this.handlers.get(type)!.add(handler as unknown as EventHandler)
    return () => this.handlers.get(type)?.delete(handler as unknown as EventHandler)
  }

  async emit<T extends EventType>(type: T, payload: EventPayload<T>): Promise<void> {
    const event = { type, payload } as Extract<IZLIEvent, { type: T }>
    const handlers = this.handlers.get(type)
    if (!handlers) return
    await Promise.all([...handlers].map(h => h(event)))
  }

  off<T extends EventType>(type: T, handler: EventHandler<T>): void {
    this.handlers.get(type)?.delete(handler as unknown as EventHandler)
  }

  clear(): void {
    this.handlers.clear()
  }
}

export const EventBus = new EventBusImpl()
