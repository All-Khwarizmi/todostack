"use client";

import { useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { StackSettings } from "@/types/stack";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SettingsPanelProps {
  settings: StackSettings;
  onUpdateSettings: (settings: Partial<StackSettings>) => void;
}

export function SettingsPanel({
  settings,
  onUpdateSettings,
}: SettingsPanelProps) {
  const [localSettings, setLocalSettings] = useState<StackSettings>(settings);

  const handleSave = () => {
    onUpdateSettings(localSettings);
  };

  const handleMaxItemsChange = (value: number[]) => {
    setLocalSettings((prev) => ({ ...prev, maxItems: value[0] }));
  };

  const handleMaxTimeChange = (value: number) => {
    // Convert hours to milliseconds
    const maxTimeInStack = value * 60 * 60 * 1000;
    setLocalSettings((prev) => ({ ...prev, maxTimeInStack }));
  };

  // Convert milliseconds to hours for display
  const maxTimeInHours = settings.maxTimeInStack / (60 * 60 * 1000);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className=" top-2 right-4 bg-inherit hover-bg-transparent text-zinc-400"
        >
          <Settings className="h-4 w-4 bg-inherit" />
          <span className="sr-only">Settings</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-zinc-950 border-zinc-800 text-zinc-100">
        <SheetHeader>
          <SheetTitle className="text-zinc-100">Stack Settings</SheetTitle>
          <SheetDescription className="text-zinc-400">
            Configure your TodoStack behavior
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="max-items">
              Maximum Stack Items: {localSettings.maxItems}
            </Label>
            <Slider
              id="max-items"
              min={1}
              max={10}
              step={1}
              value={[localSettings.maxItems]}
              onValueChange={handleMaxItemsChange}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max-time">Maximum Time in Stack (hours)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="max-time"
                type="number"
                min={1}
                max={168} // 1 week in hours
                value={localSettings.maxTimeInStack / (60 * 60 * 1000)}
                onChange={(e) => handleMaxTimeChange(Number(e.target.value))}
                className="bg-zinc-900 border-zinc-800"
              />
              <span className="text-zinc-400">hours</span>
            </div>
          </div>

          <Button
            onClick={handleSave}
            className="w-full bg-emerald-600 hover:bg-emerald-700"
          >
            Save Settings
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
