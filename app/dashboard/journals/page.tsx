"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import NewJournalForm from "./NewJournalForm";
import JournalGrid from "./JournalGrid";
import { Button } from "@/components/ui/button";
import { FaFeather } from "react-icons/fa";
import { Folder, Journal, User } from "@/types";

export default function JournalsPage() {
  const user: User | null = useAppSelector((state) => state.auth.user);
  const [activeView, setActiveView] = useState<"write" | "journals">(
    "journals"
  );
  const [journals, setJournals] = useState<Journal[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/folders`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data: Folder[]) => setFolders(data))
      .catch(console.error);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/journals`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data: Journal[]) => setJournals(data))
      .catch(console.error);
  }, []);

  const handleAddFolder = (newFolder: Folder) => {
    setFolders((prev) => [...prev, newFolder]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex gap-4">
        <Button
          onClick={() => setActiveView("write")}
          className={`my-2 ${
            activeView === "write"
              ? "hidden"
              : "bg-leather text-white hover:bg-leather-dark"
          }`}
        >
          <FaFeather className="mr-2" /> Write New Entry
        </Button>
      </div>

      {activeView === "write" && user && (
        <NewJournalForm
          folders={folders}
          user={user}
          onSave={(newJournal: Journal) =>
            setJournals((prev) => [newJournal, ...prev])
          }
          onAddFolder={handleAddFolder}
          onBack={() => setActiveView("journals")}
        />
      )}

      {activeView === "journals" && (
        <JournalGrid
          journals={journals}
          folders={folders}
          onDelete={(id: number) =>
            setJournals((prev) => prev.filter((j) => j.id !== id))
          }
          onAddFolder={handleAddFolder}
        />
      )}
    </div>
  );
}