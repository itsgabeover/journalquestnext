"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { FolderPlus, ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Folder, User, Journal } from "@/types";

// Input field component for the folder dialog
function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    />
  );
}

// Props interface
interface NewJournalFormProps {
  folders: Folder[];
  user: User;
  onSave: (journal: Journal) => void;
  onAddFolder: (folder: Folder) => void;
  onBack: () => void;
}

export default function NewJournalForm({
  folders,
  user,
  onSave,
  onAddFolder,
  onBack,
}: NewJournalFormProps) {
  const [form, setForm] = useState({
    title: "",
    body: "",
    archetype: "",
    folder_id: "",
  });

  const [showFolderDialog, setShowFolderDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/newJournalEntry`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ ...form, user_id: user.id }),
        }
      );

      const newJournal: Journal = await res.json();
      setForm({ title: "", body: "", archetype: "", folder_id: "" });
      onSave(newJournal);
      toast({ title: "Journal saved" });
    } catch {
      toast({ title: "Failed to save journal", variant: "destructive" });
    }
  };

  const handleAddFolder = async () => {
    if (!newFolderName.trim()) {
      toast({ title: "Folder name is required", variant: "destructive" });
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/folders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: newFolderName }),
      });

      const newFolder: Folder = await res.json();
      onAddFolder(newFolder);
      setNewFolderName("");
      setShowFolderDialog(false);
      toast({ title: "Folder created" });
    } catch {
      toast({ title: "Failed to create folder", variant: "destructive" });
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        className="text-leather hover:text-leather-dark hover:bg-parchment-light flex items-center gap-1 pl-1 -ml-2 py-0"
        onClick={onBack}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Journals</span>
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative bg-[url('/parchment-bg.png')] bg-cover bg-center border border-parchment-dark shadow-md rounded-xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-white/50 z-0 pointer-events-none" />

        {/* Medieval Banner Title */}
        <div className="relative">
          <div className="h-16 bg-leather/90 shadow-md relative z-10 flex items-center justify-center">
            <div
              className="absolute left-0 bottom-0 h-8 w-8 bg-leather-dark"
              style={{ clipPath: "polygon(0 0, 0% 100%, 100% 100%)" }}
            />
            <div
              className="absolute right-0 bottom-0 h-8 w-8 bg-leather-dark"
              style={{ clipPath: "polygon(100% 0, 0% 100%, 100% 100%)" }}
            />
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title your journey..."
              className="bg-transparent border-none text-parchment-light text-xl font-semibold text-center w-full max-w-2xl focus:outline-none focus:ring-0 placeholder:text-parchment-light/70"
              required
            />
          </div>
          <div className="h-4 bg-leather-dark/80 relative z-10 flex">
            <div
              className="absolute left-0 top-0 h-4 w-8 bg-leather"
              style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
            />
            <div
              className="absolute right-0 top-0 h-4 w-8 bg-leather"
              style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative z-10 p-6 pt-4 space-y-6"
        >
          {/* Entry Body */}
          <div className="bg-white/60 backdrop-blur-sm p-4 rounded-md shadow-inner">
            <Label
              htmlFor="body"
              className="text-leather-dark font-semibold mb-2 block"
            >
              Entry
            </Label>
            <Textarea
              id="body"
              name="body"
              placeholder="What happened today?"
              value={form.body}
              onChange={handleChange}
              className="min-h-[300px] resize-y border-leather/30 focus:border-leather"
            />
          </div>

          {/* Metadata & Submit */}
          <div className="flex flex-wrap items-end gap-3 justify-between">
            <div className="flex flex-wrap gap-2 items-end">
              {/* Archetype */}
              <div className="w-40">
                <Label
                  htmlFor="archetype"
                  className="text-leather-dark font-medium text-xs block mb-1"
                >
                  Archetype
                </Label>
                <select
                  id="archetype"
                  name="archetype"
                  value={form.archetype}
                  onChange={handleChange}
                  className="border border-leather/30 rounded-md px-2 py-1 text-sm w-full bg-white/80"
                >
                  <option value="">Select archetype</option>
                  <option value="Seeker">Seeker</option>
                  <option value="Innocent">Innocent</option>
                  <option value="Orphan">Orphan</option>
                  <option value="Fool">Fool (Jester)</option>
                  <option value="Sage">Sage (Senex)</option>
                  <option value="King">King</option>
                  <option value="Creator">Creator</option>
                  <option value="Rebel">Rebel (Destroyer)</option>
                  <option value="Magician">Magician</option>
                  <option value="Caregiver">Caregiver</option>
                  <option value="Lover">Lover</option>
                  <option value="Warrior">Warrior</option>
                </select>
              </div>

              {/* Folder */}
              <div className="w-40">
                <Label
                  htmlFor="folder_id"
                  className="text-leather-dark font-medium text-xs block mb-1"
                >
                  Folder
                </Label>
                <div className="flex gap-1">
                  <select
                    id="folder_id"
                    name="folder_id"
                    value={form.folder_id}
                    onChange={handleChange}
                    className="border border-leather/30 rounded-md px-2 py-1 text-sm flex-grow bg-white/80"
                  >
                    <option value="">No folder</option>
                    {folders.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => setShowFolderDialog(true)}
                    className="h-7 w-7 border-leather/30"
                  >
                    <FolderPlus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <Button
              type="submit"
              className="bg-leather text-white hover:bg-leather-dark px-6"
            >
              Save Entry
            </Button>
          </div>
        </form>
      </motion.div>

      {/* Folder Creation Dialog */}
      <Dialog open={showFolderDialog} onOpenChange={setShowFolderDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Enter a name for your new folder.
            </DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowFolderDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddFolder}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
