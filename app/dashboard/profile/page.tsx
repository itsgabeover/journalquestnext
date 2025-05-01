"use client";

import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { updateUser } from "@/lib/features/auth/authSlice";
import type { User } from "@/types";

export default function UserProfile() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<User | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user || !formData) return;

    setErrors([]);
    setIsLoading(true);

    const previousUser = user;
    const optimisticUser: User = { ...user, ...formData };

    dispatch(updateUser(optimisticUser)); // Optimistically update UI

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/editprofile/${user.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ user: formData }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        setErrors(errorData.errors || ["Profile update failed."]);
        dispatch(updateUser(previousUser)); // Rollback
      } else {
        const updatedUser: User = await res.json();
        dispatch(updateUser(updatedUser)); // Confirm true state
        alert("Profile updated successfully!");
      }
    } catch {
      setErrors(["Network error."]);
      dispatch(updateUser(previousUser)); // Rollback
    } finally {
      setIsLoading(false);
    }
  }

  if (!user || !formData) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
        <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-leather mb-2">
            Loading Your Profile
          </h2>
          <p className="text-leather">
            Please wait while we retrieve your information...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-leather mb-6">
          Your Hero&apos;s Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.length > 0 && (
            <div className="bg-red-100 text-red-800 p-4 rounded-md space-y-1">
              {errors.map((err, idx) => (
                <p key={idx}>{err}</p>
              ))}
            </div>
          )}

          <section>
            <h3 className="text-lg font-semibold text-leather mb-4">
              Account Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Username
                </label>
                <input
                  name="username"
                  value={formData.username ?? ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email ?? ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
          </section>

          <hr className="border-t border-leather/30" />

          <section>
            <h3 className="text-lg font-semibold text-leather mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  name="first_name"
                  value={formData.first_name ?? ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  name="last_name"
                  value={formData.last_name ?? ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Nickname
                </label>
                <input
                  name="nickname"
                  value={formData.nickname ?? ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Your Archetype
                </label>
                <select
                  name="archetype"
                  value={formData.archetype ?? ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                >
                  <option value="">Choose your archetype</option>
                  {[
                    "Seeker",
                    "Innocent",
                    "Orphan",
                    "Fool",
                    "Sage",
                    "King",
                    "Creator",
                    "Rebel",
                    "Magician",
                    "Caregiver",
                    "Lover",
                    "Warrior",
                  ].map((a) => (
                    <option key={a} value={a}>
                      {a === "Fool" ? "Fool (Jester)" : a}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-leather text-white py-3 rounded-md hover:bg-leather-dark transition-colors"
          >
            {isLoading ? "Updating Profile..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
