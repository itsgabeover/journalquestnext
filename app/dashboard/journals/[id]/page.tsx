"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Edit, Trash2, Save, X } from "lucide-react";
import type { Folder, Journal } from "@/types";

export default function JournalDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [journal, setJournal] = useState<Journal | null>(null);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    title: "",
    body: "",
    archetype: "",
    folder_id: "",
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/journals/${id}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data: Journal) => {
        setJournal(data);
        setForm({
          title: data.title,
          body: data.body,
          archetype: data.archetype || "",
          folder_id: data.folder_id?.toString() || "",
        });
      });

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/folders`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data: Folder[]) => setFolders(data));
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/journals/${id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          folder_id: form.folder_id ? Number(form.folder_id) : null,
        }),
      }
    );
    if (res.ok) {
      const updated: Journal = await res.json();
      setJournal(updated);
      setEditMode(false);
      toast({ title: "Journal updated successfully." });
    } else {
      toast({ title: "Failed to update journal", variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/journals/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    toast({ title: "Journal deleted" });
    router.push("/dashboard/journals");
  };

  if (!journal) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-2">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="text-leather hover:text-leather-dark hover:bg-parchment-light flex items-center gap-1 pl-1 -ml-2 py-0"
        onClick={() => router.push("/dashboard/journals")}
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
            {editMode ? (
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title your journey..."
                className="bg-transparent border-none text-parchment-light text-xl font-semibold text-center w-full max-w-2xl focus:outline-none focus:ring-0 placeholder:text-parchment-light/70"
                required
              />
            ) : (
              <h1 className="text-parchment-light text-xl font-semibold text-center w-full max-w-2xl">
                {journal.title}
              </h1>
            )}
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

        <div className="relative z-10 p-6 pt-4 space-y-6">
          {/* Journal Content */}
          <div className="bg-white/60 backdrop-blur-sm p-4 rounded-md shadow-inner">
            <div className="flex justify-between items-center mb-2">
              <Label className="text-leather-dark font-semibold">
                {editMode ? "Edit Entry" : "Entry"}
              </Label>
              <p className="text-xs text-muted-foreground">
                {new Date(journal.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>

            {editMode ? (
              <Textarea
                name="body"
                value={form.body}
                onChange={handleChange}
                className="min-h-[300px] resize-y border-leather/30 focus:border-leather"
              />
            ) : (
              <div className="whitespace-pre-wrap text-gray-800 min-h-[300px] p-2">
                {journal.body}
              </div>
            )}
          </div>

          {/* Metadata & Action Buttons */}
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
                {editMode ? (
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
                ) : (
                  <div className="h-7 flex items-center">
                    {journal.archetype ? (
                      <Badge
                        variant="outline"
                        className="border-mythicalBlue-500 text-mythicalBlue-700"
                      >
                        🔮 {journal.archetype}
                      </Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        None
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Folder */}
              <div className="w-40">
                <Label
                  htmlFor="folder_id"
                  className="text-leather-dark font-medium text-xs block mb-1"
                >
                  Folder
                </Label>
                {editMode ? (
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
                  </div>
                ) : (
                  <div className="h-7 flex items-center">
                    {journal.folder_id ? (
                      <Badge
                        variant="outline"
                        className="border-black text-black"
                      >
                        📁{" "}
                        {folders.find((f) => f.id === journal.folder_id)
                          ?.name || "Unknown"}
                      </Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        None
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {!editMode ? (
                <>
                  <Button
                    variant="outline"
                    className="border-leather text-leather hover:bg-parchment hover:text-leather-dark"
                    onClick={() => setEditMode(true)}
                  >
                    <Edit className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="border-leather text-leather hover:bg-parchment hover:text-leather-dark"
                    onClick={() => setEditMode(false)}
                  >
                    <X className="w-4 h-4 mr-1" /> Cancel
                  </Button>
                  <Button
                    className="bg-leather text-white hover:bg-leather-dark"
                    onClick={handleSave}
                  >
                    <Save className="w-4 h-4 mr-1" /> Save
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <p>This action will permanently delete this journal.</p>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
