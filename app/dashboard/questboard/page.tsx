"use client";

import { useEffect, useState } from "react";
import {
  FaPlus,
  FaCheck,
  FaHistory,
  FaLightbulb,
  FaBookOpen,
  FaCrown,
  FaCalendarCheck,
  FaHourglass,
} from "react-icons/fa";
import CreateQuestModal from "@/components/quests/CreateQuestModal";
import CompleteQuestButton from "@/components/quests/CompleteQuestButton";
import QuestDetailsModal from "@/components/quests/QuestDetailsModal";
import type { Quest } from "@/types";

function getStatusStyle(status: Quest["status"]): {
  color: string;
  icon: React.ComponentType<{ className?: string }>;
} {
  switch (status) {
    case "completed":
      return { color: "text-green-600", icon: FaCheck };
    case "in_progress":
      return { color: "text-blue-600", icon: FaHourglass };
    case "not_started":
    default:
      return { color: "text-gray-500", icon: FaCalendarCheck };
  }
}

export default function QuestBoardPage() {
  const [quests, setQuests] = useState<Quest[]>([]);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/quests`,
          {
            credentials: "include",
          }
        );
        if (!res.ok) throw new Error("Failed to fetch quests");
        const data: Quest[] = await res.json();
        setQuests(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuests();
  }, []);

  return (
    <section className="w-full px-4 py-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold font-quicksand text-leather-dark mb-4">
        Quest Board 📜
      </h2>
      <p className="text-leather mb-6">
        Set personal challenges and intentions for your hero’s journey. Track
        your goals and create quests for yourself.
      </p>

      {/* Active Quests */}
      <div className="bg-white border border-mythicalBlue-300 rounded-lg shadow p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-leather-dark font-quicksand">
            Active Quests
          </h3>
          <CreateQuestModal
            onQuestCreated={(newQuest) => setQuests((q) => [...q, newQuest])}
          />
        </div>

        {quests.length === 0 ? (
          <p className="text-gray-500">You have no active quests yet.</p>
        ) : (
          <ul className="space-y-4">
            {quests.map((quest) => {
              const { color, icon: StatusIcon } = getStatusStyle(quest.status);

              return (
                <li
                  key={quest.id}
                  className="border border-gray-300 rounded-md p-4 bg-parchment hover:bg-parchment-light transition"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <StatusIcon className={`w-4 h-4 ${color}`} />
                        <h4 className="text-lg font-semibold text-leather-dark">
                          {quest.title}
                        </h4>
                      </div>
                      {quest.description && (
                        <p className="text-sm text-leather">
                          {quest.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Progress: {quest.progress} / {quest.goal}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <CompleteQuestButton
                        quest={quest}
                        onComplete={(updated) =>
                          setQuests((q) =>
                            q.map((item) =>
                              item.id === updated.id ? updated : item
                            )
                          )
                        }
                      />
                      <QuestDetailsModal
                        quest={quest}
                        onUpdate={(updated) =>
                          setQuests((q) =>
                            q.map((item) =>
                              item.id === updated.id ? updated : item
                            )
                          )
                        }
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Recommendations, Categories, and History */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Quest Categories */}
        <div className="bg-parchment border border-mythicalBlue-300 rounded-lg shadow p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaCrown className="text-yellow-500" />
            <h3 className="font-bold text-leather-dark">Quest Categories</h3>
          </div>
          <p className="text-sm text-leather mb-3">
            Organize quests by theme or goal.
          </p>
          <ul className="space-y-2 text-leather text-sm">
            <li className="flex justify-between">
              <span>Personal Growth</span>
              <span className="text-green-600">3</span>
            </li>
            <li className="flex justify-between">
              <span>Creative Pursuits</span>
              <span className="text-blue-600">2</span>
            </li>
          </ul>
          <button className="text-sm text-blue-600 hover:underline mt-3 flex items-center gap-1">
            <FaPlus /> Add Category
          </button>
        </div>

        {/* Quest History */}
        <div className="bg-parchment border border-mythicalBlue-300 rounded-lg shadow p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaHistory className="text-blue-700" />
            <h3 className="font-bold text-leather-dark">Quest History</h3>
          </div>
          <p className="text-sm text-leather mb-3">
            Your past completed quests:
          </p>
          <ul className="space-y-2 text-leather text-sm">
            <li>
              <span className="font-semibold">Meditate for 7 days</span>
              <br />
              <span className="text-xs text-gray-500">
                Completed 2 weeks ago
              </span>
            </li>
          </ul>
          <button className="text-sm text-blue-600 hover:underline mt-3 flex items-center gap-1">
            <FaBookOpen /> View All Completed
          </button>
        </div>

        {/* Quest Ideas */}
        <div className="bg-parchment border border-mythicalBlue-300 rounded-lg shadow p-4">
          <div className="flex items-center gap-2 mb-2">
            <FaLightbulb className="text-yellow-500" />
            <h3 className="font-bold text-leather-dark">Quest Ideas</h3>
          </div>
          <p className="text-sm text-leather mb-3">
            Based on your archetype and journal entries:
          </p>
          <ul className="space-y-2 text-leather text-sm">
            <li>
              <span className="font-semibold">
                Start a 30-day journaling streak
              </span>
            </li>
            <li>
              <span className="font-semibold">Try a new creative medium</span>
            </li>
          </ul>
          <button className="text-sm text-yellow-600 hover:underline mt-3 flex items-center gap-1">
            <FaLightbulb /> More Ideas
          </button>
        </div>
      </div>
    </section>
  );
}
