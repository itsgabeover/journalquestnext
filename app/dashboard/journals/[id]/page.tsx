"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Edit, Trash2, Save, X } from "lucide-react";

export default function JournalDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [journal, setJournal] = useState(null);
  const [folders, setFolders] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", archetype: "", folder_id: "" });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/journals/${id}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setJournal(data);
        setForm({
          title: data.title,
          body: data.body,
          archetype: data.archetype || "",
          folder_id: data.folder_id || "",
        });
      });
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/folders`, { credentials: "include" })
      .then((res) => res.json())
      .then(setFolders);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/journals/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const updated = await res.json();
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
    <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => router.push("/dashboard/journals")}>
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        {!editMode ? (
          <div className="flex gap-2">
            <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
              <Trash2 className="w-4 h-4 mr-1" /> Delete
            </Button>
            <Button onClick={() => setEditMode(true)}>
              <Edit className="w-4 h-4 mr-1" /> Edit
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setEditMode(false)}>
              <X className="w-4 h-4 mr-1" /> Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-1" /> Save
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {editMode ? (
          <>
            <Input name="title" value={form.title} onChange={handleChange} />
            <Textarea name="body" value={form.body} onChange={handleChange} rows={10} />
            <select
              name="archetype"
              value={form.archetype}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
            >
              <option value="">Select archetype</option>
              {[
                "Seeker", "Innocent", "Orphan", "Fool", "Sage", "King",
                "Creator", "Rebel", "Magician", "Caregiver", "Lover", "Warrior",
              ].map((arch) => (
                <option key={arch} value={arch}>
                  {arch}
                </option>
              ))}
            </select>

            <select
              name="folder_id"
              value={form.folder_id}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded w-full"
            >
              <option value="">No Folder</option>
              {folders.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-leather-dark">{journal.title}</h1>
            <p className="text-sm text-muted-foreground">
              {new Date(journal.created_at).toLocaleDateString()}
            </p>
            <p className="whitespace-pre-wrap text-gray-800">{journal.body}</p>
            <div className="flex gap-2 mt-4">
              {journal.folder_id && (
                <Badge variant="outline">
                  📁 {folders.find((f) => f.id === journal.folder_id)?.name || "Unknown Folder"}
                </Badge>
              )}
              {journal.archetype && <Badge variant="outline">🔮 {journal.archetype}</Badge>}
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <p>This action will permanently delete this journal.</p>
          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
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
