import type { Tag } from '@/interfaces/Tag.ts'

export interface Note {
    id: string
    title: string
    content: string
    tags: Tag[]
    createdAt: Date
}