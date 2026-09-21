import type { Category } from '../../entities'
import { api } from './api'

export function getCategories(): Promise<Category[]> {
  return api.get<Category[]>('/resources/categories')
}

export function createCategory(data: Pick<Category, 'slug' | 'label'> & { parent?: string }): Promise<Category> {
  return api.post<Category>('/resources/categories', data)
}

export function updateCategory(id: string, data: Partial<Pick<Category, 'slug' | 'label' | 'parent'>>): Promise<Category> {
  return api.patch<Category>(`/resources/categories/${id}`, data)
}

export function deleteCategory(id: string): Promise<void> {
  return api.del(`/resources/categories/${id}`).then(() => undefined)
}