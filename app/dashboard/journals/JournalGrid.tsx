"use client";

import { useState } from "react";
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
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function JournalGrid({ journals, folders, onDelete }) {
  const router = useRouter();
  const [filters, setFilters] = useState({
    search: "",
    folder: "all",
    archetype: "",
    sort: "latest",
  });

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [journalToDelete, setJournalToDelete] = useState(null);

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
      onDelete(journalToDelete.id);
      toast({ title: "Journal deleted" });
    } catch (err) {
      toast({ title: "Failed to delete journal", variant: "destructive" });
    } finally {
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Input
          placeholder="Search journals"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
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

      {/* Journal Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredJournals.length === 0 ? (
          <Card className="p-6 text-center">No journals found</Card>
        ) : (
          filteredJournals.map((j) => (
            <Card
              key={j.id}
              onClick={() => router.push(`/dashboard/journals/${j.id}`)}
              className="relative group cursor-pointer p-4 bg-[url('/parchment-bg.png')] bg-cover bg-center border border-parchment-dark shadow-sm hover:shadow-md rounded-md transition-shadow"
            >
              <div className="absolute inset-0 bg-white/50 z-0 rounded-md" />

              <div className="absolute top-1.5 right-1.5 z-30 opacity-0 group-hover:opacity-100">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmDelete(j);
                  }}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>

              <div className="relative z-10">
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-black line-clamp-1">
                    {j.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(j.created_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <p className="text-sm text-gray-800 line-clamp-3 whitespace-pre-wrap mb-4">
                  {j.body.trim().slice(0, 160)}
                  {j.body.length > 160 && "..."}
                </p>

                <div className="flex flex-wrap gap-2">
                  {j.folder_id && (
                    <Badge
                      variant="outline"
                      className="border-black text-black"
                    >
                      📁{" "}
                      {folders.find((f) => f.id === j.folder_id)?.name ||
                        "Unknown"}
                    </Badge>
                  )}
                  {j.archetype && (
                    <Badge
                      variant="outline"
                      className="border-mythicalBlue-500 text-mythicalBlue-700"
                    >
                      🔮 {j.archetype}
                    </Badge>
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
    </>
  );
}
