export interface StackItem {
  id: string
  title: string
  description: string
  links: string[]
  createdAt: number
  selected: boolean
}

export interface StackSettings {
  maxItems: number
  maxTimeInStack: number // in milliseconds
}

