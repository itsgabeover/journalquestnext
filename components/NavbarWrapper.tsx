"use client";

import { useState, useEffect } from "react";
import NavBar from "@/components/Navbar";

export default function NavbarWrapper() {
  const [user, setUser] = useState(null);
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
          credentials: "include",
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);

          if (userData) {
            fetchJournals(userData);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchJournals = async (userData) => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/journals`, {
          credentials: "include",
        });

        if (response.ok) {
          const journalData = await response.json();
          setJournals(journalData);
        }
      } catch (error) {
        console.error("Error fetching journals:", error);
      }
    };

    fetchUserData();
  }, []);

  return <NavBar user={user} setUser={setUser} setJournals={setJournals} />;
}
