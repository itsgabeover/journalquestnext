"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/lib/features/auth/authSlice";
import type { User } from "@/types";

export default function SignupForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
    nickname: "",
    archetype: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    const validationErrors: string[] = [];
    if (formData.password !== formData.password_confirmation)
      validationErrors.push("Passwords don't match");
    if (formData.password.length < 6)
      validationErrors.push("Password must be at least 6 characters");
    if (!formData.username) validationErrors.push("Username is required");
    if (!formData.email) validationErrors.push("Email is required");

    if (validationErrors.length) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ user: formData }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Signup failed");
      }

      const user: User = await res.json();
      dispatch(setUser(user));
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrors([err.message]);
      } else {
        setErrors(["Something went wrong."]);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-4xl p-6 space-y-8">
        <h2 className="text-center text-3xl font-quicksand font-semibold text-leather-dark">
          Begin Your Journey
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.length > 0 && (
            <div className="rounded-md bg-red-100 p-4 text-red-700">
              <ul className="list-disc pl-5 space-y-1">
                {errors.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField name="username" label="Username" />
            <FormField name="email" type="email" label="Email" />
            <FormField name="password" type="password" label="Password" />
            <FormField
              name="password_confirmation"
              type="password"
              label="Confirm Password"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField name="first_name" label="First Name" />
            <FormField name="last_name" label="Last Name" />
            <FormField name="nickname" label="Nickname" />
            <div>
              <Label htmlFor="archetype">Archetype</Label>
              <select
                name="archetype"
                value={formData.archetype}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="">Select your archetype</option>
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
                ].map((archetype) => (
                  <option key={archetype} value={archetype}>
                    {archetype}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-leather text-white hover:bg-leather-dark"
          >
            {loading ? "Creating Account..." : "Begin Your Journey"}
          </Button>

          <p className="text-center text-leather mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-leather-dark underline">
              Login
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );

  function FormField({
    name,
    label,
    type = "text",
  }: {
    name: keyof typeof formData;
    label: string;
    type?: string;
  }) {
    return (
      <div>
        <Label htmlFor={name}>{label}</Label>
        <Input
          name={name}
          type={type}
          value={formData[name]}
          onChange={handleChange}
        />
      </div>
    );
  }
}
