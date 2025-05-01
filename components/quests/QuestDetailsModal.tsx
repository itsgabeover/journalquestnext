"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import { Quest } from "@/types";


type QuestDetailsModalProps = {
  quest: Quest;
  onUpdate?: (updated: Quest) => void;
};

export default function QuestDetailsModal({
  quest,
  onUpdate,
}: QuestDetailsModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<Quest>({ ...quest });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "goal" || name === "progress" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/quests/${quest.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ quest: form }),
        }
      );

      if (res.ok) {
        const updated: Quest = await res.json();
        onUpdate?.(updated);
        setIsOpen(false);
      } else {
        console.error("Update failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-xs px-2 py-1 text-blue-600 hover:underline flex items-center gap-1"
      >
        <FaEdit /> Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold text-leather-dark mb-4">
              Edit Quest
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-leather focus:border-leather"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-leather focus:border-leather"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Goal
                  </label>
                  <input
                    type="number"
                    name="goal"
                    value={form.goal}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-leather focus:border-leather"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Progress
                  </label>
                  <input
                    type="number"
                    name="progress"
                    value={form.progress}
                    onChange={handleChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-leather focus:border-leather"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-leather text-white px-4 py-2 rounded hover:bg-leather-dark"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
