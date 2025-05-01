"use client";

import { useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";
import { FaCheck } from "react-icons/fa";
import { toast } from "@/hooks/use-toast";
import type { Quest } from "@/types";

type CompleteQuestButtonProps = {
  quest: Quest;
  onComplete?: (updated: Quest) => void;
};

export default function CompleteQuestButton({
  quest,
  onComplete,
}: CompleteQuestButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width = 300, height = 300 } = useWindowSize();

  const handleComplete = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/quests/${quest.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            quest: { progress: quest.goal },
          }),
        }
      );

      if (res.ok) {
        const updated: Quest = await res.json();
        onComplete?.(updated);

        setShowConfetti(true);
        toast({
          title: "Quest Complete!",
          description: `"${quest.title}" has been completed. 🏆`,
          duration: 4000,
        });

        setTimeout(() => setShowConfetti(false), 8000);
      } else {
        toast({
          title: "Oops!",
          description: "Failed to complete quest.",
          variant: "destructive",
        });
      }
    } catch (err) {
      const error = err as Error;
      toast({
        title: "Something went wrong",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleComplete}
        disabled={loading || quest.status === "completed"}
        aria-disabled={loading || quest.status === "completed"}
        className="text-xs px-2 py-1 border border-green-500 text-green-600 rounded hover:bg-green-50 flex items-center gap-1 disabled:opacity-50"
      >
        <FaCheck /> {loading ? "Completing..." : "Complete"}
      </button>

      {showConfetti && <Confetti width={width} height={height} />}
    </>
  );
}
