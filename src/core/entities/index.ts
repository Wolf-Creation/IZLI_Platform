// Re-export all entities from the platform entity definitions
export * from '../../entities'

import type { EntityType } from '../registry'

// Cross-entity reference type — used to link any entity to any other
export interface EntityRef {
  type: EntityType
  id: string
  label: string
  slug?: string
  imageUrl?: string
}

// Content graph node — every entity in the content graph
export interface ContentNode {
  ref: EntityRef
  children: EntityRef[]
  parents: EntityRef[]
  linkedAt: string
}

// The central content graph
export interface IZLIContentGraph {
  nodes: Map<string, ContentNode>
  addNode(ref: EntityRef): void
  link(parentId: string, childId: string): void
  getChildren(entityId: string): EntityRef[]
  getParents(entityId: string): EntityRef[]
}

class ContentGraphImpl implements IZLIContentGraph {
  nodes = new Map<string, ContentNode>()

  addNode(ref: EntityRef): void {
    if (!this.nodes.has(ref.id)) {
      this.nodes.set(ref.id, { ref, children: [], parents: [], linkedAt: new Date().toISOString() })
    }
  }

  link(parentId: string, childId: string): void {
    const parent = this.nodes.get(parentId)
    const child = this.nodes.get(childId)
    if (parent && child) {
      if (!parent.children.find(c => c.id === childId)) parent.children.push(child.ref)
      if (!child.parents.find(p => p.id === parentId)) child.parents.push(parent.ref)
    }
  }

  getChildren(entityId: string): EntityRef[] {
    return this.nodes.get(entityId)?.children ?? []
  }

  getParents(entityId: string): EntityRef[] {
    return this.nodes.get(entityId)?.parents ?? []
  }
}

export const ContentGraph = new ContentGraphImpl()
