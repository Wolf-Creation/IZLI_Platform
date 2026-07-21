export type WorkflowStatus = 'pending' | 'running' | 'completed' | 'failed' | 'paused'

export interface WorkflowStep {
  id: string
  name: string
  execute: (context: WorkflowContext) => Promise<WorkflowContext>
}

export interface WorkflowContext {
  workflowId: string
  entityId: string
  entityType: string
  data: Record<string, unknown>
  completedSteps: string[]
  errors: string[]
}

export interface WorkflowDefinition {
  id: string
  name: string
  description: string
  trigger: string
  steps: WorkflowStep[]
}

// Product lifecycle workflow
export const ProductLifecycleWorkflow: WorkflowDefinition = {
  id: 'product-lifecycle',
  name: 'Product Lifecycle',
  description: 'Manages the full lifecycle of a product from draft to archive',
  trigger: 'product.created',
  steps: [
    {
      id: 'validate',
      name: 'Validate Product',
      execute: async (ctx) => ({ ...ctx, completedSteps: [...ctx.completedSteps, 'validate'] }),
    },
    {
      id: 'generate-identifier',
      name: 'Generate Identifier',
      execute: async (ctx) => ({
        ...ctx,
        data: { ...ctx.data, identifier: `IZLI-${new Date().getFullYear()}-${Math.floor(Math.random() * 999999).toString().padStart(6, '0')}` },
        completedSteps: [...ctx.completedSteps, 'generate-identifier'],
      }),
    },
    {
      id: 'generate-passport',
      name: 'Generate Product Passport',
      execute: async (ctx) => ({
        ...ctx,
        data: { ...ctx.data, passportId: `PASS-${ctx.entityId}` },
        completedSteps: [...ctx.completedSteps, 'generate-passport'],
      }),
    },
    {
      id: 'generate-qr',
      name: 'Generate QR Code',
      execute: async (ctx) => ({
        ...ctx,
        data: { ...ctx.data, qrCode: `IZLI-QR-${ctx.entityId.toUpperCase()}` },
        completedSteps: [...ctx.completedSteps, 'generate-qr'],
      }),
    },
    {
      id: 'queue-production',
      name: 'Queue Production Assets',
      execute: async (ctx) => ({ ...ctx, completedSteps: [...ctx.completedSteps, 'queue-production'] }),
    },
    {
      id: 'update-search',
      name: 'Update Search Index',
      execute: async (ctx) => ({ ...ctx, completedSteps: [...ctx.completedSteps, 'update-search'] }),
    },
    {
      id: 'update-recommendations',
      name: 'Update Recommendation Hubs',
      execute: async (ctx) => ({ ...ctx, completedSteps: [...ctx.completedSteps, 'update-recommendations'] }),
    },
    {
      id: 'notify-admin',
      name: 'Notify Admin',
      execute: async (ctx) => ({ ...ctx, completedSteps: [...ctx.completedSteps, 'notify-admin'] }),
    },
  ],
}

// Archive lifecycle workflow
export const ArchiveLifecycleWorkflow: WorkflowDefinition = {
  id: 'archive-lifecycle',
  name: 'Archive Lifecycle',
  description: 'Manages archive release, voting, and sealing',
  trigger: 'archive.released',
  steps: [
    { id: 'announce', name: 'Announce Archive', execute: async (ctx) => ({ ...ctx, completedSteps: [...ctx.completedSteps, 'announce'] }) },
    { id: 'open-voting', name: 'Open Voting Session', execute: async (ctx) => ({ ...ctx, completedSteps: [...ctx.completedSteps, 'open-voting'] }) },
    { id: 'notify-keepers', name: 'Notify Eligible Keepers', execute: async (ctx) => ({ ...ctx, completedSteps: [...ctx.completedSteps, 'notify-keepers'] }) },
    { id: 'update-timeline', name: 'Update Legacy Timeline', execute: async (ctx) => ({ ...ctx, completedSteps: [...ctx.completedSteps, 'update-timeline'] }) },
  ],
}

// Keeper lifecycle workflow
export const KeeperLifecycleWorkflow: WorkflowDefinition = {
  id: 'keeper-lifecycle',
  name: 'Keeper Lifecycle',
  description: 'Manages keeper creation, level progression, and rewards',
  trigger: 'purchase.completed',
  steps: [
    { id: 'check-eligibility', name: 'Check Keeper Eligibility', execute: async (ctx) => ({ ...ctx, completedSteps: [...ctx.completedSteps, 'check-eligibility'] }) },
    { id: 'create-keeper', name: 'Create Keeper', execute: async (ctx) => ({ ...ctx, completedSteps: [...ctx.completedSteps, 'create-keeper'] }) },
    { id: 'unlock-circle', name: 'Unlock Keeper Circle', execute: async (ctx) => ({ ...ctx, completedSteps: [...ctx.completedSteps, 'unlock-circle'] }) },
    { id: 'grant-badge', name: 'Grant Welcome Badge', execute: async (ctx) => ({ ...ctx, completedSteps: [...ctx.completedSteps, 'grant-badge'] }) },
    { id: 'grant-reward', name: 'Grant Welcome Reward', execute: async (ctx) => ({ ...ctx, completedSteps: [...ctx.completedSteps, 'grant-reward'] }) },
    { id: 'enable-voting', name: 'Enable Voting Access', execute: async (ctx) => ({ ...ctx, completedSteps: [...ctx.completedSteps, 'enable-voting'] }) },
    { id: 'send-welcome', name: 'Send Welcome Notification', execute: async (ctx) => ({ ...ctx, completedSteps: [...ctx.completedSteps, 'send-welcome'] }) },
  ],
}

// QR workflow
export const QRWorkflow: WorkflowDefinition = {
  id: 'qr-workflow',
  name: 'QR Workflow',
  description: 'Handles QR generation and scan tracking',
  trigger: 'passport.generated',
  steps: [
    { id: 'generate-qr', name: 'Generate QR Code', execute: async (ctx) => ({ ...ctx, completedSteps: [...ctx.completedSteps, 'generate-qr'] }) },
    { id: 'generate-landing', name: 'Generate Landing Page', execute: async (ctx) => ({ ...ctx, completedSteps: [...ctx.completedSteps, 'generate-landing'] }) },
    { id: 'attach-passport', name: 'Attach to Passport', execute: async (ctx) => ({ ...ctx, completedSteps: [...ctx.completedSteps, 'attach-passport'] }) },
  ],
}

// Publishing workflow
export const PublishingWorkflow: WorkflowDefinition = {
  id: 'publishing-workflow',
  name: 'Publishing Workflow',
  description: 'Universal publishing workflow for all publishable entities',
  trigger: 'product.published',
  steps: [
    { id: 'review', name: 'Review Content', execute: async (ctx) => ({ ...ctx, completedSteps: [...ctx.completedSteps, 'review'] }) },
    { id: 'seo', name: 'Generate SEO Metadata', execute: async (ctx) => ({ ...ctx, completedSteps: [...ctx.completedSteps, 'seo'] }) },
    { id: 'publish', name: 'Publish to Website', execute: async (ctx) => ({ ...ctx, completedSteps: [...ctx.completedSteps, 'publish'] }) },
    { id: 'distribute', name: 'Distribute to Channels', execute: async (ctx) => ({ ...ctx, completedSteps: [...ctx.completedSteps, 'distribute'] }) },
  ],
}

export const ALL_WORKFLOWS: WorkflowDefinition[] = [
  ProductLifecycleWorkflow,
  ArchiveLifecycleWorkflow,
  KeeperLifecycleWorkflow,
  QRWorkflow,
  PublishingWorkflow,
]

export async function runWorkflow(
  workflow: WorkflowDefinition,
  entityId: string,
  entityType: string,
  initialData?: Record<string, unknown>,
): Promise<WorkflowContext> {
  let context: WorkflowContext = {
    workflowId: workflow.id,
    entityId,
    entityType,
    data: initialData ?? {},
    completedSteps: [],
    errors: [],
  }
  for (const step of workflow.steps) {
    try {
      context = await step.execute(context)
    } catch (err) {
      context.errors.push(`${step.id}: ${String(err)}`)
    }
  }
  return context
}
