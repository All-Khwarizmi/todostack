"use client"

import { useState, useEffect, useCallback } from "react"
import { useLocalStorage } from "usehooks-ts"
import type { StackItem, StackSettings } from "@/types/stack"

export function useStack() {
  const [stack, setStack] = useLocalStorage<StackItem[]>("todo-stack", [])
  const [settings, setSettings] = useLocalStorage<StackSettings>("todo-stack-settings", {
    maxItems: 5,
    maxTimeInStack: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  })
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)

  // Clean up expired items
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setStack((currentStack) => currentStack.filter((item) => now - item.createdAt < settings.maxTimeInStack))
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [settings.maxTimeInStack, setStack])

  // Push a new item to the stack
  const pushItem = useCallback(
    (item: Omit<StackItem, "id" | "createdAt" | "selected">) => {
      const newItem: StackItem = {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        selected: false,
        ...item,
      }

      setStack((currentStack) => {
        let newStack = [...currentStack, newItem]
        // If we exceed the max items, remove the bottom item
        if (newStack.length > settings.maxItems) {
          newStack = newStack.slice(1)
        }
        return newStack
      })
    },
    [settings.maxItems, setStack],
  )

  // Pop the top item from the stack
  const popItem = useCallback(() => {
    setStack((currentStack) => {
      if (currentStack.length === 0) return currentStack
      return currentStack.slice(0, -1)
    })
    setSelectedItemId(null)
  }, [setStack])

  // Move an item up in the stack
  const moveItemUp = useCallback(() => {
    if (!selectedItemId) return

    setStack((currentStack) => {
      const index = currentStack.findIndex((item) => item.id === selectedItemId)
      if (index < 0 || index === currentStack.length - 1) return currentStack

      const newStack = [...currentStack]
      const temp = newStack[index]
      newStack[index] = newStack[index + 1]
      newStack[index + 1] = temp
      return newStack
    })
  }, [selectedItemId, setStack])

  // Move an item down in the stack
  const moveItemDown = useCallback(() => {
    if (!selectedItemId) return

    setStack((currentStack) => {
      const index = currentStack.findIndex((item) => item.id === selectedItemId)
      if (index <= 0) return currentStack

      const newStack = [...currentStack]
      const temp = newStack[index]
      newStack[index] = newStack[index - 1]
      newStack[index - 1] = temp
      return newStack
    })
  }, [selectedItemId, setStack])

  // Delete the selected item
  const deleteSelectedItem = useCallback(() => {
    if (!selectedItemId) return

    setStack((currentStack) => currentStack.filter((item) => item.id !== selectedItemId))
    setSelectedItemId(null)
  }, [selectedItemId, setStack])

  // Update an item
  const updateItem = useCallback(
    (id: string, updates: Partial<Omit<StackItem, "id" | "createdAt">>) => {
      setStack((currentStack) => currentStack.map((item) => (item.id === id ? { ...item, ...updates } : item)))
    },
    [setStack],
  )

  // Toggle item selection
  const toggleItemSelection = useCallback(
    (id: string) => {
      setSelectedItemId((current) => (current === id ? null : id))
      setStack((currentStack) =>
        currentStack.map((item) => ({
          ...item,
          selected: item.id === id ? !item.selected : false,
        })),
      )
    },
    [setStack],
  )

  // Update settings
  const updateSettings = useCallback(
    (newSettings: Partial<StackSettings>) => {
      setSettings((current) => ({ ...current, ...newSettings }))
    },
    [setSettings],
  )

  return {
    stack,
    settings,
    selectedItemId,
    pushItem,
    popItem,
    moveItemUp,
    moveItemDown,
    deleteSelectedItem,
    updateItem,
    toggleItemSelection,
    updateSettings,
  }
}

