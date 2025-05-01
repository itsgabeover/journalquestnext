"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Trash2, FolderPlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { Journal, Folder } from "@/types";

interface Props {
  journals: Journal[];
  folders: Folder[];
  onDelete: (id: number) => void;
  onAddFolder: (folder: Folder) => void;
}

export default function JournalGrid({
  journals,
  folders,
  onDelete,
  onAddFolder,
}: Props) {
  const router = useRouter();

  const [filters, setFilters] = useState({
    search: "",
    folder: "all",
    archetype: "",
    sort: "latest",
  });

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [journalToDelete, setJournalToDelete] = useState<Journal | null>(null);
  const [showFolderDialog, setShowFolderDialog] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  const filteredJournals = journals
    .filter(
      (j) =>
        !filters.search ||
        j.title.toLowerCase().includes(filters.search.toLowerCase())
    )
    .filter((j) => {
      if (filters.folder === "all") return true;
      if (filters.folder === "null") return j.folder_id === null;
      return j.folder_id?.toString() === filters.folder;
    })
    .filter((j) => !filters.archetype || j.archetype === filters.archetype)
    .sort((a, b) => {
      const dA = new Date(a.created_at);
      const dB = new Date(b.created_at);
      return filters.sort === "latest"
        ? dB.getTime() - dA.getTime()
        : dA.getTime() - dB.getTime();
    });

  const confirmDelete = (journal: Journal) => {
    setJournalToDelete(journal);
    setShowDeleteDialog(true);
  };

  const handleDeleteJournal = async () => {
    if (!journalToDelete) return;
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/journals/${journalToDelete.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      onDelete(journalToDelete.id);
      toast({ title: "Journal deleted" });
    } catch {
      toast({ title: "Failed to delete journal", variant: "destructive" });
    } finally {
      setShowDeleteDialog(false);
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

  const truncateText = (text: string, maxLength = 12) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <>
      <div className="flex justify-between items-start mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 flex-grow">
          <Input
            placeholder="Search journals"
            value={filters.search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFilters({ ...filters, search: e.target.value })
            }
            className="border-leather text-leather placeholder:text-leather-dark bg-parchment-light"
          />
          <select
            value={filters.folder}
            onChange={(e) => setFilters({ ...filters, folder: e.target.value })}
            className="border-leather text-leather bg-parchment-light rounded-md px-3 py-2"
          >
            <option value="all">All Folders</option>
            <option value="null">Unassigned</option>
            {folders.map((f) => (
              <option key={f.id} value={f.id.toString()}>
                {f.name}
              </option>
            ))}
          </select>
          <select
            value={filters.archetype}
            onChange={(e) =>
              setFilters({ ...filters, archetype: e.target.value })
            }
            className="border-leather text-leather bg-parchment-light rounded-md px-3 py-2"
          >
            <option value="">All Archetypes</option>
            {[...new Set(journals.map((j) => j.archetype).filter(Boolean))].map(
              (a) => (
                <option key={a}>{a}</option>
              )
            )}
          </select>
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="border-leather text-leather bg-parchment-light rounded-md px-3 py-2"
          >
            <option value="latest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
        <Button
          onClick={() => setShowFolderDialog(true)}
          className="ml-4 bg-leather text-white hover:bg-leather-dark whitespace-nowrap"
        >
          <FolderPlus className="w-4 h-4 mr-2" />
          New Folder
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredJournals.length === 0 ? (
          <Card className="p-6 text-center col-span-full">
            No journals found
          </Card>
        ) : (
          filteredJournals.map((j) => (
            <Card
              key={j.id}
              onClick={() => router.push(`/dashboard/journals/${j.id}`)}
              className="relative group cursor-pointer p-2 bg-[url('/parchment-bg.png')] bg-cover bg-center border border-parchment-dark shadow-sm hover:shadow-md rounded-md transition-shadow h-[200px] flex flex-col"
            >
              <div className="absolute inset-0 bg-white/50 z-0 rounded-md" />

              <div className="absolute top-1 right-1 z-30 opacity-0 group-hover:opacity-100">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmDelete(j);
                  }}
                >
                  <Trash2 className="w-3 h-3 text-destructive" />
                </Button>
              </div>

              <div className="relative z-10 flex flex-col flex-grow">
                <div className="mb-1.5">
                  <h3 className="text-base font-semibold text-leather-dark line-clamp-1">
                    {j.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {new Date(j.created_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <p className="text-xs text-gray-800 line-clamp-2 whitespace-pre-wrap mb-auto">
                  {j.body.trim().slice(0, 120)}
                  {j.body.length > 120 && "..."}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-2 relative z-10">
                  {j.folder_id && (
                    <div className="inline-block overflow-hidden">
                      <Badge
                        variant="outline"
                        className="border-black text-black text-xs py-0.5 inline-flex items-center"
                      >
                        <span className="mr-1">📁</span>
                        {truncateText(
                          folders.find((f) => f.id === Number(j.folder_id))
                            ?.name || "Unknown"
                        )}
                      </Badge>
                    </div>
                  )}
                  {j.archetype && (
                    <div className="inline-block overflow-hidden">
                      <Badge
                        variant="outline"
                        className="border-mythicalBlue-500 text-mythicalBlue-700 text-xs py-0.5 inline-flex items-center text-nowrap"
                      >
                        <span className="mr-1">🔮</span>
                        {truncateText(j.archetype)}
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Delete Confirmation Dialog */}
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

      {/* New Folder Dialog */}
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
