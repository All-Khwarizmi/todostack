"use client";

import { useState } from "react";
import { useStack } from "@/hooks/use-stack";
import { StackItem } from "@/components/stack-item";
import { StackControls } from "@/components/stack-controls";
import { SettingsPanel } from "@/components/settings-panel";
import { ItemModal } from "@/components/item-modal";
import type { StackItem as StackItemType } from "@/types/stack";
import { Terminal } from "lucide-react";

export default function TodoStack() {
  const {
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
  } = useStack();

  const [modalOpen, setModalOpen] = useState(false);
  const [isNewItem, setIsNewItem] = useState(false);

  const selectedItem = stack.find((item) => item.id === selectedItemId);
  const topItem = stack.length > 0 ? stack[stack.length - 1] : null;

  const handleOpenModal = (id: string) => {
    toggleItemSelection(id);
    setIsNewItem(false);
    setModalOpen(true);
  };

  const handleAddNew = () => {
    setIsNewItem(true);
    setModalOpen(true);
  };

  const handleEditSelected = () => {
    if (selectedItemId) {
      setIsNewItem(false);
      setModalOpen(true);
    } else {
      handleAddNew();
    }
  };

  const handleSaveItem = (
    itemData: Omit<StackItemType, "id" | "createdAt" | "selected">
  ) => {
    if (isNewItem) {
      pushItem(itemData);
    } else if (selectedItemId) {
      updateItem(selectedItemId, itemData);
    }
  };

  return (
    <div className="">
      <div className="flex justify-between p-2 items-center mb-4 bg-zinc-900 border border-zinc-800 rounded-md ">
        <StackControls
          hasSelectedItem={!!selectedItemId}
          onMoveUp={moveItemUp}
          onMoveDown={moveItemDown}
          onDelete={deleteSelectedItem}
          onEdit={handleEditSelected}
        />
        <SettingsPanel settings={settings} onUpdateSettings={updateSettings} />
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-md p-4 min-h-[400px] relative">
        {stack.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[300px] text-zinc-500">
            <Terminal className="h-12 w-12 mb-4" />
            <p>Your stack is empty</p>
            <p className="text-sm mt-2">Add items to get started</p>
          </div>
        ) : (
          <div className="space-y-1">
            {/* Stack visualization */}
            <div className="flex justify-between text-xs text-zinc-500 mb-2 px-2">
              <span>Bottom</span>
              <span>Top (Last In, First Out)</span>
            </div>

            {/* Stack items */}
            <div className="space-y-2">
              {stack.map((item, index) => (
                <StackItem
                  key={item.id}
                  item={item}
                  maxTimeInStack={settings.maxTimeInStack}
                  onSelect={toggleItemSelection}
                  onOpenModal={handleOpenModal}
                  isTop={index === stack.length - 1}
                />
              ))}
            </div>
          </div>
        )}

        {/* Stack info */}
        <div className="absolute bottom-4 right-4 text-xs text-zinc-500">
          {stack.length} / {settings.maxItems} items
        </div>
      </div>

      <ItemModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item={isNewItem ? null : selectedItem}
        maxTimeInStack={settings.maxTimeInStack}
        onSave={handleSaveItem}
        isNew={isNewItem}
      />
    </div>
  );
}
