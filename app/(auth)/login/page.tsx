// app/components/Login.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Login({ setUser, setJournals }: any) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    fetch(`/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((r) => {
        if (r.ok) {
          return r.json().then((user) => {
            setUser(user);
            setJournals(user.journals || []);
            router.push("/");
          });
        } else {
          return r.json().then((err) => {
            setError(err.error || "Invalid login");
          });
        }
      })
      .catch(() => setError("Something went wrong. Please try again."))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-leather-dark font-quicksand">
          Login to Your Journal
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-leather-dark font-medium mb-1 font-quicksand">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leather"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-leather-dark font-medium mb-1 font-quicksand">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-leather"
            />
          </div>

          <Button type="submit" size="lg" className="w-full text-white bg-leather hover:bg-leather-dark">
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <p className="text-center text-leather font-quicksand">
            Don't have an account?{' '}
            <Link href="/signup" className="text-leather-dark underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
