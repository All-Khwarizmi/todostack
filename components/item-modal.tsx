"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { StackItem } from "@/types/stack";
import { formatDistanceToNow } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: StackItem | null;
  maxTimeInStack: number;
  onSave: (item: Omit<StackItem, "id" | "createdAt" | "selected">) => void;
  isNew?: boolean;
}

export function ItemModal({
  isOpen,
  onClose,
  item,
  maxTimeInStack,
  onSave,
  isNew = false,
}: ItemModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState<string[]>([]);
  const [newLink, setNewLink] = useState("");

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setDescription(item.description);
      setLinks(item.links);
    } else {
      setTitle("");
      setDescription("");
      setLinks([]);
    }
    setNewLink("");
  }, [item]);

  const handleSave = () => {
    onSave({
      title,
      description,
      links,
    });
    onClose();
  };

  const addLink = () => {
    if (newLink.trim() && !links.includes(newLink.trim())) {
      setLinks([...links, newLink.trim()]);
      setNewLink("");
    }
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const timeLeft = item ? item.createdAt + maxTimeInStack - Date.now() : 0;
  const formattedTimeLeft = item
    ? formatDistanceToNow(new Date(item.createdAt + maxTimeInStack), {
        addSuffix: true,
      })
    : "";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-zinc-950 border-zinc-800 text-zinc-100 sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isNew ? "Add New Task" : "View Task"}</DialogTitle>
          <DialogDescription className="text-zinc-400">
            {isNew
              ? "Add a new task to your stack"
              : `This task will expire ${formattedTimeLeft}`}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              className="bg-zinc-900 border-zinc-800"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
              className="min-h-[100px] bg-zinc-900 border-zinc-800"
            />
          </div>
          <div className="space-y-2">
            <Label>Links</Label>
            <div className="flex space-x-2">
              <Input
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                placeholder="Add a link"
                className="bg-zinc-900 border-zinc-800"
                onKeyDown={(e) => e.key === "Enter" && addLink()}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addLink}
                className="shrink-0 text-black hover:bg-zinc-200"
              >
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add Link</span>
              </Button>
            </div>
            {links.length > 0 && (
              <ul className="mt-2 space-y-2">
                {links.map((link, index) => (
                  <li
                    key={index}
                    className="grid grid-cols-[1fr_auto] bg-zinc-900 p-2 rounded-md gap-2 w-full"
                  >
                    <div className="overflow-hidden">
                      <a
                        href={
                          link.startsWith("http") ? link : `https://${link}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 text-sm hover:underline block whitespace-nowrap overflow-hidden text-ellipsis"
                        title={link}
                      >
                        {link}
                      </a>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeLink(index)}
                      className="h-6 w-6 text-zinc-400 hover:text-red-400"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span className="sr-only">Remove Link</span>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-zinc-700 text-black hover:bg-zinc-200"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {isNew ? "Add to Stack" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
