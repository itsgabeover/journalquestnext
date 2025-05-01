"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

export default function NewJournalForm({ folders, user, onSave }) {
  const [form, setForm] = useState({
    title: "",
    body: "",
    archetype: "",
    folder_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
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
      const newJournal = await res.json();
      setForm({ title: "", body: "", archetype: "", folder_id: "" });
      onSave(newJournal);
      toast({ title: "Journal saved" });
    } catch {
      toast({ title: "Failed to save journal", variant: "destructive" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative p-6 bg-[url('/parchment-bg.png')] bg-cover bg-center border border-parchment-dark shadow-md rounded-xl"
    >
      <div className="absolute inset-0 bg-white/50 z-0 rounded-xl pointer-events-none" />

      <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
        {/* Title */}
        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-md shadow-inner space-y-1">
          <Label htmlFor="title" className="text-leather-dark font-semibold">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            placeholder="Title your journey..."
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Body */}
        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-md shadow-inner space-y-1">
          <Label htmlFor="body" className="text-leather-dark font-semibold">
            Entry
          </Label>
          <Textarea
            id="body"
            name="body"
            placeholder="What happened today?"
            value={form.body}
            onChange={handleChange}
          />
        </div>

        {/* Metadata Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/60 backdrop-blur-sm p-4 rounded-md shadow-inner space-y-1">
            <Label
              htmlFor="archetype"
              className="text-leather-dark font-semibold"
            >
              Archetype
            </Label>
            <Input
              id="archetype"
              name="archetype"
              placeholder="Archetype"
              value={form.archetype}
              onChange={handleChange}
            />
          </div>
          <div className="bg-white/60 backdrop-blur-sm p-4 rounded-md shadow-inner space-y-1">
            <Label
              htmlFor="folder_id"
              className="text-leather-dark font-semibold"
            >
              Folder
            </Label>
            <select
              id="folder_id"
              name="folder_id"
              value={form.folder_id}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full"
            >
              <option value="">No folder</option>
              {folders.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <Button
              type="submit"
              className="w-full bg-leather text-white hover:bg-leather-dark"
            >
              Save Entry
            </Button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
