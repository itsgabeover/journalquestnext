"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import type { Quest } from "@/types";

type CreateQuestForm = {
  title: string;
  description: string;
  goal: number;
};

type CreateQuestModalProps = {
  onQuestCreated?: (quest: Quest) => void;
};

export default function CreateQuestModal({
  onQuestCreated,
}: CreateQuestModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<CreateQuestForm>({
    title: "",
    description: "",
    goal: 1,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "goal" ? parseInt(value, 10) || 1 : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/quests`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            quest: {
              ...form,
              status: "not_started",
              progress: 0,
            },
          }),
        }
      );

      if (res.ok) {
        const data: Quest = await res.json();
        onQuestCreated?.(data);
        setForm({ title: "", description: "", goal: 1 });
        setIsOpen(false);
      } else {
        console.error("Failed to create quest");
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm bg-leather text-white px-3 py-1 rounded hover:bg-leather-dark flex items-center gap-1"
      >
        <FaPlus /> New Quest
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold text-leather-dark mb-4">
              Create New Quest
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
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-leather focus:border-leather"
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
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Goal (e.g. 5 journal entries)
                </label>
                <input
                  type="number"
                  name="goal"
                  value={form.goal}
                  min={1}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-leather focus:border-leather"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-leather text-white px-4 py-2 rounded hover:bg-leather-dark"
                >
                  {loading ? "Creating..." : "Create Quest"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
