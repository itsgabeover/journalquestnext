"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Trash2,
  Folder,
  Filter,
  ChevronDown,
  Calendar,
  Search,
} from "lucide-react";
import { FaBookOpen, FaFeather } from "react-icons/fa";

export default function JournalsPage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [journals, setJournals] = useState([]);
  const [folders, setFolders] = useState([]);
  const [form, setForm] = useState({
    title: "",
    body: "",
    archetype: "",
    folder_id: "",
  });
  const [filters, setFilters] = useState({
    search: "",
    folder: "all",
    archetype: "",
    sort: "latest",
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [journalToDelete, setJournalToDelete] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [activeView, setActiveView] = useState("journals");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/folders`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setFolders)
      .catch(console.error);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/journals`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(setJournals)
      .catch(console.error);
  }, []);

  const filteredJournals = journals
    .filter(
      (j) =>
        !filters.search ||
        j.title.toLowerCase().includes(filters.search.toLowerCase())
    )
    .filter(
      (j) =>
        filters.folder === "all" ||
        (filters.folder === "null"
          ? !j.folder_id
          : j.folder_id == filters.folder)
    )
    .filter((j) => !filters.archetype || j.archetype === filters.archetype)
    .sort((a, b) => {
      const dA = new Date(a.created_at);
      const dB = new Date(b.created_at);
      return filters.sort === "latest" ? dB - dA : dA - dB;
    });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }
    const payload = {
      ...form,
      folder_id: form.folder_id || null,
      user_id: user?.id,
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/newJournalEntry`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(payload),
        }
      );
      const newJournal = await res.json();
      setJournals((prev) => [newJournal, ...prev]);
      setForm({ title: "", body: "", archetype: "", folder_id: "" });
      setActiveView("journals");
      toast({ title: "Journal saved" });
    } catch (err) {
      toast({ title: "Failed to save journal", variant: "destructive" });
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/folders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          folder: { name: newFolderName, user_id: user?.id },
        }),
      });
      const newFolder = await res.json();
      setFolders((prev) => [...prev, newFolder]);
      setNewFolderName("");
      setCreatingFolder(false);
      toast({ title: "Folder created" });
    } catch (err) {
      toast({ title: "Failed to create folder", variant: "destructive" });
    }
  };

  const confirmDelete = (journal) => {
    setJournalToDelete(journal);
    setShowDeleteDialog(true);
  };

  const handleDeleteJournal = async () => {
    if (!journalToDelete) return;
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/journals/${journalToDelete.id}`,
        { method: "DELETE", credentials: "include" }
      );
      setJournals((prev) => prev.filter((j) => j.id !== journalToDelete.id));
      toast({ title: "Journal deleted" });
    } catch (err) {
      toast({ title: "Failed to delete journal", variant: "destructive" });
    } finally {
      setShowDeleteDialog(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex gap-4">
        <Button
          variant={activeView === "journals" ? "default" : "outline"}
          onClick={() => setActiveView("journals")}
        >
          <FaBookOpen className="mr-2" /> My Journals
        </Button>
        <Button
          variant={activeView === "write" ? "default" : "outline"}
          onClick={() => setActiveView("write")}
        >
          <FaFeather className="mr-2" /> Write New Entry
        </Button>
      </div>

      {activeView === "write" && (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <Input
            name="title"
            placeholder="Title your journey..."
            value={form.title}
            onChange={handleFormChange}
            required
          />
          <Textarea
            name="body"
            placeholder="What happened today?"
            value={form.body}
            onChange={handleFormChange}
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              name="archetype"
              placeholder="Archetype"
              value={form.archetype}
              onChange={handleFormChange}
            />
            <select
              name="folder_id"
              value={form.folder_id}
              onChange={handleFormChange}
              className="border rounded-md px-3 py-2"
            >
              <option value="">No folder</option>
              {folders.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
            <Button
              type="submit"
              className="bg-leather text-white hover:bg-leather-dark"
            >
              Save Entry
            </Button>
          </div>
        </form>
      )}

      {activeView === "journals" && (
        <>
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Input
              placeholder="Search journals"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
            <select
              value={filters.folder}
              onChange={(e) =>
                setFilters({ ...filters, folder: e.target.value })
              }
              className="border rounded-md px-3 py-2"
            >
              <option value="all">All Folders</option>
              <option value="null">Unassigned</option>
              {folders.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
            <select
              value={filters.archetype}
              onChange={(e) =>
                setFilters({ ...filters, archetype: e.target.value })
              }
              className="border rounded-md px-3 py-2"
            >
              <option value="">All Archetypes</option>
              {[
                ...new Set(journals.map((j) => j.archetype).filter(Boolean)),
              ].map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
            <select
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              className="border rounded-md px-3 py-2"
            >
              <option value="latest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          {/* Journal Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {filteredJournals.length === 0 ? (
              <Card className="p-6 text-center">No journals found</Card>
            ) : (
              filteredJournals.map((j) => (
                <Card
                  key={j.id}
                  onClick={() => router.push(`/dashboard/journals/${j.id}`)}
                  className="relative group cursor-pointer aspect-[3/4] p-0 bg-[url('/journal-bg.png')] bg-contain bg-no-repeat bg-center shadow-none border-none rounded-none bg-transparent"
                >
                  {/* Delete Button */}
                  <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmDelete(j);
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>

                  {/* Content Wrapper */}
                  <div className="h-full w-full px-8 py-8 text-[#4b321b] flex flex-col justify-between overflow-hidden max-w-full break-words">
                    <div>
                      <h3 className="text-fluidLg font-bold mb-2 text-[#4b321b] drop-shadow-sm line-clamp-1">
                        {j.title}
                      </h3>
                      <p className="text-fluidBase text-[#4b321b] drop-shadow-sm whitespace-pre-wrap line-clamp-4 break-words">
                        {j.body}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-1">
                      {j.folder_id && (
                        <Badge
                          variant="outline"
                          className="max-w-full truncate border-[#4b321b] text-[#4b321b] bg-white/80"
                        >
                          📁{" "}
                          <span className="truncate">
                            {folders.find((f) => f.id === j.folder_id)?.name ||
                              "Unknown"}
                          </span>
                        </Badge>
                      )}
                      {j.archetype && (
                        <Badge
                          variant="outline"
                          className="max-w-full truncate border-[#4b321b] text-[#4b321b] bg-white/80"
                        >
                          <span className="font-fluidBase truncate">
                            🔮 {j.archetype}
                          </span>
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
              </DialogHeader>
              <p>This will permanently delete your journal.</p>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteJournal}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
