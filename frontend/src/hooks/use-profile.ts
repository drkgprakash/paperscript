"use client";

import { useUser } from "@insforge/nextjs";
import { insforge } from "@/lib/insforge";
import { useEffect, useState } from "react";
import type { Profile } from "@/types";

export function useProfile() {
  const { user, isLoaded } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) {
      setLoading(false);
      return;
    }

    insforge.database
      .from("profiles")
      .select()
      .eq("id", user.id)
      .single()
      .then(({ data, error }) => {
        if (!error && data) setProfile(data as Profile);
        setLoading(false);
      });
  }, [user, isLoaded]);

  return {
    profile,
    isAdmin: profile?.role === "admin",
    loading: loading || !isLoaded,
  };
}
