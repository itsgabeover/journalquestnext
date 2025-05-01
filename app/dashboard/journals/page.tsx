"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import NewJournalForm from "./NewJournalForm";
import JournalGrid from "./JournalGrid";
import { Button } from "@/components/ui/button";
import { FaBookOpen, FaFeather } from "react-icons/fa";

export default function JournalsPage() {
  const user = useAppSelector((state) => state.auth.user);
  const [activeView, setActiveView] = useState<"write" | "journals">(
    "journals"
  );
  const [journals, setJournals] = useState([]);
  const [folders, setFolders] = useState([]);

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

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
      <div className="flex gap-4">
        <Button
          onClick={() => setActiveView("journals")}
          className={`${
            activeView === "journals"
              ? "bg-leather text-white hover:bg-leather-dark"
              : "border-leather bg-white text-leather hover:bg-parchment"
          }`}
        >
          <FaBookOpen className="mr-2" /> My Journals
        </Button>
        <Button
          onClick={() => setActiveView("write")}
          className={`${
            activeView === "write"
              ? "bg-leather text-white hover:bg-leather-dark"
              : "border-leather bg-white text-leather hover:bg-parchment"
          }`}
        >
          <FaFeather className="mr-2" /> Write New Entry
        </Button>
      </div>
      {activeView === "write" && (
        <NewJournalForm
          folders={folders}
          user={user}
          onSave={(newJournal) => setJournals((prev) => [newJournal, ...prev])}
        />
      )}
      {activeView === "journals" && (
        <JournalGrid
          journals={journals}
          folders={folders}
          onDelete={(id) =>
            setJournals((prev) => prev.filter((j) => j.id !== id))
          }
        />
      )}
    </div>
  );
}
