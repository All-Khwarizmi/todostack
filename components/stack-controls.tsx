"use client";

import { ArrowUp, ArrowDown, Trash2, Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StackControlsProps {
  hasSelectedItem: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  onAdd: () => void;
  onEdit: () => void;
}

export function StackControls({
  hasSelectedItem,
  onMoveUp,
  onMoveDown,
  onDelete,
  onAdd,
  onEdit,
}: StackControlsProps) {
  return (
    <TooltipProvider>
      <div className="flex items-center justify-between  rounded-md  ">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onMoveUp}
                disabled={!hasSelectedItem}
                className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              >
                <ArrowUp className="h-4 w-4" />
                <span className="sr-only">Move Up</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Move Up</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onMoveDown}
                disabled={!hasSelectedItem}
                className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              >
                <ArrowDown className="h-4 w-4" />
                <span className="sr-only">Move Down</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Move Down</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onDelete}
                disabled={!hasSelectedItem}
                className="text-zinc-400 hover:text-red-400 hover:bg-zinc-800"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onEdit}
                className="text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{hasSelectedItem ? "Edit Selected" : "Add New"}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onAdd}
                className="text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800"
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add New</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
