// app/UserLoader.tsx
"use client";
import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setUser, stopLoading } from "@/lib/features/auth/authSlice";

export default function UserLoader() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/me`, {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((user) => {
        if (user) dispatch(setUser(user));
        else dispatch(stopLoading());
      })
      .catch(() => dispatch(stopLoading()));
  }, [dispatch]);

  return null;
}
