export const AUTOMATIONS = {
  PRODUCT_PUBLISHED: 'product-published-flow',
  PURCHASE_COMPLETED: 'purchase-completed-flow',
  ARCHIVE_RELEASED: 'archive-released-flow',
  CHALLENGE_COMPLETED: 'challenge-completed-flow',
  KEEPER_LEVELED_UP: 'keeper-levelup-flow',
  STORY_PUBLISHED: 'story-published-flow',
  QR_SCANNED: 'qr-scanned-flow',
} as const

export interface IAutomationEngine {
  trigger(automationId: string, context: Record<string, unknown>): Promise<{ success: boolean; stepsExecuted: number }>
  getAutomation(id: string): Promise<{ id: string; name: string; trigger: string; steps: string[]; isActive: boolean } | null>
  listAutomations(): Promise<Array<{ id: string; name: string; trigger: string; isActive: boolean }>>
  enableAutomation(id: string): Promise<{ success: boolean }>
  disableAutomation(id: string): Promise<{ success: boolean }>
}

class AutomationEngineImpl implements IAutomationEngine {
  async trigger(_automationId: string, _context: Record<string, unknown>) {
    return { success: true, stepsExecuted: 3 }
  }

  async getAutomation(id: string) {
    return {
      id,
      name: 'Mock Automation',
      trigger: 'product.published',
      steps: ['notify-keepers', 'generate-qr', 'update-analytics'],
      isActive: true,
    }
  }

  async listAutomations() {
    return [
      { id: AUTOMATIONS.PRODUCT_PUBLISHED, name: 'Product Published Flow', trigger: 'product.published', isActive: true },
      { id: AUTOMATIONS.PURCHASE_COMPLETED, name: 'Purchase Completed Flow', trigger: 'order.completed', isActive: true },
      { id: AUTOMATIONS.ARCHIVE_RELEASED, name: 'Archive Released Flow', trigger: 'archive.released', isActive: true },
      { id: AUTOMATIONS.CHALLENGE_COMPLETED, name: 'Challenge Completed Flow', trigger: 'challenge.completed', isActive: true },
      { id: AUTOMATIONS.KEEPER_LEVELED_UP, name: 'Keeper Level Up Flow', trigger: 'keeper.leveled_up', isActive: true },
      { id: AUTOMATIONS.STORY_PUBLISHED, name: 'Story Published Flow', trigger: 'story.published', isActive: false },
      { id: AUTOMATIONS.QR_SCANNED, name: 'QR Scanned Flow', trigger: 'passport.scanned', isActive: true },
    ]
  }

  async enableAutomation(_id: string) {
    return { success: true }
  }

  async disableAutomation(_id: string) {
    return { success: true }
  }
}

export const AutomationEngine: IAutomationEngine = new AutomationEngineImpl()
